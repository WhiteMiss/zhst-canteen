import Vue from 'vue'
import Vuex from 'vuex'
import SaveList from './SaveList'
import Product from '@/page/Product/store'
import Productselft from '@/page/Productselft/store'
// import Food from '@/page/Food/store'
import BoxInfo from '@/page/OrderDetail/store'
// import Address from '@/page/Address/store'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		SaveList,
		Product,
		BoxInfo,
		Productselft
	}
})