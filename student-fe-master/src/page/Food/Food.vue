<template>
	<div class="food-box" id="foodbox">
		<Banner />
		<TabBars />
		<TabBars position='fixed' v-if="fixed" />
		<LeftType />
		<LeftType position='fixed' v-if="fixed" />
		<ProductList />
		<FixedTitle v-if="fixed" />
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex';
	const { mapState: FoodState, mapGetters: FoodGetters, mapActions: FoodActions, mapMutations: FoodMutations } = createNamespacedHelpers('Food')
	import Banner from './components/Banner.vue'
	import TabBars from './components/TabBars.vue'
	import LeftType from './components/LeftType.vue'
	import ProductList from './components/ProductList.vue'
	import FixedTitle from './components/FixedTitle.vue'
	export default {
		name: 'Food',
		data() {
			return {
				fixed: false,
			}
		},
		methods: {
			GetHeightInfo() {
				// 处理安卓和苹果手机高度兼容性问题
				let info = {
					page: window.screen.availHeight,
					banner: 125,
					title: 30,
					content: 115,
					tabbar: 40
				}
				this.SaveHeightInfo(info)
			},
			onPageScroll(e) {
				if(e.scrollTop >= this.HeightInfo.banner) {
					this.fixed = true;
				} else {
					this.fixed = false;
				}
			},
			BscrollEvent(pos) {
				let scollY = pos.scrollTop;
				let typeIndex = 0;
				this.ScrollDom.map((item, index) => {
					if(scollY >= (item.top-1)) {
						typeIndex = index;
					}
				});
				const item = {
					name: this.ScrollDom[typeIndex].name,
					type: this.ScrollDom[typeIndex].type
				};
				if(item.type != this.TypeActive.type) {
					this.SetTypeActive(item)
				}
			},
			...FoodActions(['GetProductList']),
			...FoodMutations(['SaveHeightInfo', 'SetTypeActive'])
		},
		computed: {
			...FoodState(['CanteenInfo', 'HeightInfo', 'TypeActive']),
			...FoodGetters(['ScrollDom'])
		},
		components: {
			Banner,
			TabBars,
			LeftType,
			ProductList,
			FixedTitle
		},
		mounted() {
			window.onscroll = e => {
				let scrollInfo = {
					scrollTop: window.scrollY
				}
				this.onPageScroll(scrollInfo)
				this.BscrollEvent(scrollInfo)
			}
			this.GetHeightInfo()
			this.GetProductList(this.$route.query.id)
		}
	}
</script>

<style lang="stylus" scoped>
	// @import '~@/assets/varibles.styl'
	.food-box
		position: relative;
</style>