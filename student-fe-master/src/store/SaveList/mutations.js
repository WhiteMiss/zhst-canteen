import { version } from '@/unit/Version'
export default {
	// 保存食堂列表信息
	SaveCanteenList(state, list) {
		sessionStorage.setItem('CanteenList', JSON.stringify(list))
		state.CanteenList = list
	},
	// 添加购物车并缓存购物车
	ChangeCarList(state, list) {
		sessionStorage.setItem('CarList', JSON.stringify(list))
		state.CarList = list;
	},
	// 清空指定食堂的购物车
	ClearCar(state, id) {
		const list = state.CarList;
		list.map((item, index) => {
			if(item.restaurant_id == id) {
				state.CarList.splice(index, 1);
			}
		})
		sessionStorage.setItem('CarList', JSON.stringify(state.CarList))
	},
	// 购物车下的添加或减少产品数量
	// 此方法要优化！！！！！！！！！！！！！！！！！！！！！！
	AddMinusCount(state, info) {
		const { CarList } = state;
		CarList.map((item, index) => {
			if(item.restaurant_id == info.canteenid) {
				item.goods.map((gitem, gindex) => {
					if(gitem.thisid == info.thisid && info.type == 'add') {
						state.CarList[index].goods[gindex].count++;
					} else if(gitem.thisid == info.thisid && info.type == 'minus') {
						if(gitem.count == 1) {
							if(state.CarList[index].goods.length == 1) {
								state.CarList.splice(index, 1);
							} else {
								state.CarList[index].goods.splice(gindex, 1);
							}
						} else {
							state.CarList[index].goods[gindex].count--;
						}
					}
				})
			}
		})
		sessionStorage.setItem('CarList', JSON.stringify(state.CarList))
	},
	// 保存用户收货地址
	SaveAddressList(state, info) {
		state.AddressList = info;
		sessionStorage.setItem('AddressList', JSON.stringify(state.AddressList))
	},
	// 保存用户信息
	SaveUserInfo(state, info) {
		state.UserInfo = info;
		sessionStorage.setItem('UserInfo', JSON.stringify(state.UserInfo))
	},
	// 保存订单列表
	SaveOrderList(state, list) {
		state.OrderList = list;
		sessionStorage.setItem('OrderList', JSON.stringify(state.OrderList))
	},
	//保存待领取订单列表
	SaveTypeOrderList(state, list) {
		state.TypeOrderList = list;
		console.log(state.TypeOrderList)
	},
	ClearSaveList(state) {
		localStorage.removeItem(version);
		sessionStorage.removeItem('UserInfo');
		sessionStorage.removeItem('AddressList');
		sessionStorage.removeItem('CanteenList');
		sessionStorage.removeItem('CarList');
		sessionStorage.removeItem('OrderList');
		state.CanteenList = [];
		state.CarList = [];
		state.AddressList = [];
		state.OrderList = [];
		state.UserInfo = { uickname: '', usernum: '', headimgurl: '', sex: '' };
	},
	// 保存模式时间
	SaveModeTimeList(state, list) {
		state.ModelTime = list;
	},
}