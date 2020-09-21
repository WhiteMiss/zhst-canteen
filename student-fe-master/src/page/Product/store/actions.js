import * as Api from '@/unit/ApiInterface'
import Axios from 'axios'
import qs from 'qs'

export default {
	async GetProductList({ commit }, canteenId) {
		commit('ClearProductList');
		commit('SetTypeActive', { name: '', type: 99999 })
		await Axios.get(Api.GET_CANTEEN_PRODUCT_LIST, {
			params: {
				canteenId
			}
		}).then(res => {
			res = res.data;
			if(res.code == "0" && !res.data) {
				commit('ChangeHave', false);
			} else if(res.code == "0" && res.data.goods.length == 0) {
				commit('ChangeHave', false);
			} else if(res.code == "0" && res.data) {
				commit('ChangeProductList', res.data);
			} else {
				commit('ChangeHave', false);
			}
		});
	}
}