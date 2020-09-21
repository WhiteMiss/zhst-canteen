import * as Api from '@/unit/ApiInterface'
import Axios from 'axios'
import qs from 'qs'
import { GetToken } from '@/unit/DealFun'

export default {
	// 获取食堂列表并缓存
	async GetCanteenList({ commit, state }) {
		if(state.CanteenList.length == 0) {
			let length = 0;
			await Axios.get(Api.GET_CANTEEN_LIST, {
				params: {
					page: 1,
					limit: 10
				}
			}).then(res => {
				res = res.data;
				if(res.code == 2001000) {
					commit('SaveCanteenList', res.data);
				}
			});
		}
	},
	// 获取用户收货地址列表
	GetAddressList({ commit, state }, refesh = false) {
		if(state.AddressList.length == 0 || refesh) {
			Axios.post(Api.GET_ADDRESS_LIST, qs.stringify({
				Token: GetToken()
			})).then(res => {
				res = res.data;
				if(res.code == 1001000) {
					commit('SaveAddressList', res.data);
				} else if(!res.success) {
					commit('SaveAddressList', []);
				}
			})
		}
	},
	// 获取用户信息
	GetUserInfo({ commit, state }) {
		if(state.UserInfo.usernum == "") {
			Axios.post(Api.GET_USER_INFO, qs.stringify({
				'Token': GetToken()
			})).then((res) => {
				res = res.data;
				if(res.code == 1001000) {
					commit('SaveUserInfo', res.data);
				}
			})
		}
	},
	// 获取订单列表
	async GetOrderList({ commit, state }, { refesh = false, loadmore = false, token, page, size }) {
		if(state.OrderList.length == 0 || refesh) {
			let more = 1;
			await Axios.get(Api.GET_ORDER_LIST, {
				params: { token, page, size }
			}).then(res => {
				res = res.data;
				if(res.code == 0 && loadmore && res.data === undefined) {
					more = 2;
				} else if(res.code == 0 && loadmore && res.data !== undefined) {
					let list = [ ...state.OrderList, ...res.data ];
					commit('SaveOrderList', list)
				} else if(res.code == 0 && refesh && res.data !== undefined) {
					let list = res.data;
					commit('SaveOrderList', list)
				} else if(res.code == 0 && res.data !== undefined) {
					let list = [ ...state.OrderList, ...res.data ];
					console.log(list);
					commit('SaveOrderList', list)
				}
			})
			return more;
		}
	},
	// 获取模式时间
	async GetModeTime({ commit }) {
		await Axios.get(Api.GET_MODE_TIME).then(res => {
			res = res.data;
			commit('SaveModeTimeList', res.data)
		})
	}
}