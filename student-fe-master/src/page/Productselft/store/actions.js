import * as Api from '@/unit/ApiInterface'
import Axios from 'axios'
import qs from 'qs'

export default {
	async GetProductSelftList({ commit, state }){
		await Axios.get(Api.GET_CANTEEN_PRODUCTSELFT_LIST).then(res => {
			res = res.data;
			if(res.code == 9999999) {
				commit('SaveProductSelftList', res.data);
			}
		});
	}
}