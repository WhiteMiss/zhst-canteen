<template>
	<div class="product-selft">
		<!-- 顶部标题 -->
		<HeadBar />
		<selftlist />
		<listleft  />
		<ProductList />
		<Shoppingcar />
		<SelftSpecs />
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapActions: ProductselftActions,mapMutations:ProductselftMutation } = createNamespacedHelpers('Productselft')
	import HeadBar from './components/HeadBar'
	import listleft from './components/listleft'
	import selftlist from './components/selftlist'
	import ProductList from './components/ProductList'
	import Shoppingcar from  './components/ShoppingCar'
	import SelftSpecs from './components/ProductSelftSpecs'
	export default {
		name: 'Product',
		data() {
			return {
				Loading: false,
				tab: 0,
				fixed: false,
			}
		},
		components: {
			HeadBar,
			listleft,
			selftlist,
			ProductList,
			Shoppingcar,
			SelftSpecs
		},
		methods:{
			GetHeightInfo() {
				// 处理安卓和苹果手机高度兼容性问题
				let info = {
					page: window.innerHeight-50,
					title: 21,
					selft:40,
					content: 115,
					shopcar: 50
				}
				this.SaveHeightInfo(info)
			},
			...ProductselftMutation(['SaveHeightInfo']),
			...ProductselftActions(['GetProductSelftList']),
		},
		async mounted(){
			this.GetHeightInfo()
			await this.GetProductSelftList()
		}

	}
</script>

<style lang="stylus" scoped>

</style>