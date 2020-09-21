<template>
	<div class="product-box">
		<!-- 顶部标题 -->
		<ProductHeadBar />
		<div class="product-scroll" ref="foodbox">
			<div class="product-content">
				<ProductCanteenBanner />
				<ProductTabBar :tab.sync="tab" />
				<ProductLeftType v-show="tab == 0"/>
				<ProductList v-show="tab == 0" />
			</div>
		</div>
		<!-- 没有菜品时的显示 -->
		<ProductNullFood v-if="!have" />
		<!-- 商家信息 -->
		<ProductCanteenInfo v-show="tab == 1" />
		<!-- 底部弹起规格选择区域 -->
		<ProductSpecsContainer />
		<!-- 底部购物车 -->
		<ProductShoppingCar />
		<!-- 加载层 -->
		<ProductTabBar position='fixed' v-if="fixed" :tab.sync="tab" />
		<FixedTitle v-if="fixed" />
		<ProductLeftType position='fixed' v-if="fixed" />
		<div
		class="muse-load-box"
		data-mu-loading-color="#333"
		data-mu-loading-overlay-color="rgba(0, 0, 0, .4)"
		data-mu-loading-text="获取菜品信息中"
		v-loading="Loading"
		:hidden="!Loading"></div>
		<div class="page-get">
			<div id="page-get"></div>
		</div>
		<axc-photo-preview :open.sync="preview" :image="imgUrl" :bgOpacity="0.7" />
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: ProductState, mapGetters: ProductGetters, mapActions: ProductActions, mapMutations: ProductMutations } = createNamespacedHelpers('Product')
	import BScroll from 'better-scroll'
	import Bus from '@/unit/Bus'
	import { GoToBscroll, OpenImgLook } from '@/unit/EmitType'

	import ProductHeadBar from './components/HeadBar'
	import ProductCanteenBanner from './components/CanteenBanner'
	import ProductTabBar from './components/TabBar'
	import ProductLeftType from './components/LeftType'
	import ProductList from './components/ProductList'
	import ProductNullFood from './components/NullFood'
	import ProductCanteenInfo from './components/CanteenInfo'
	import ProductSpecsContainer from './components/SpecsContainer'
	import ProductShoppingCar from './components/ShoppingCar'
	import FixedTitle from './components/FixedTitle.vue'
	export default {
		name: 'Product',
		data() {
			return {
				Loading: false,
				tab: 0,
				fixed: false,
				preview: false,
				imgUrl: ""
			}
		},
		methods: {
			onPageScroll(e) {
				// 当页面滚动到指定位置时出现固定的tabbar组件和lefttype组件
				if(e.scrollTop >= 125) {
					this.fixed = true;
				} else {
					this.fixed = false;
				}
			},
			OpenPreview(image) {
				this.imgUrl = image;
				this.preview = true;
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
			GoBscroll(item) {
				let { name, type, top } = item;
				this.SetTypeActive({ name, type });
				if(!item.time) {
					this.scroll.scrollTo(0, top*(-1), 300);
				} else {
					this.fixed = false;
					this.scroll.scrollTo(0, top*(-1), 0);
				}
			},
			GetHeightInfo() {
				// 处理安卓和苹果手机高度兼容性问题
				let info = {
					page: $('#page-get').height() - 100,
					banner: 125,
					title: 30,
					content: 115,
					tabbar: 40,
					shopcar: 50
				}
				// console.log(info.page)
				this.SaveHeightInfo(info)
			},
			...ProductActions(['GetProductList']),
			...ProductMutations(['SetTypeActive', 'SaveHeightInfo'])
		},
		computed: {
			...ProductState(['have', 'CanteenProduct', 'TypeActive']),
			...ProductGetters(['ScrollDom'])
		},
		components: {
			ProductHeadBar,
			ProductCanteenBanner,
			ProductTabBar,
			ProductLeftType,
			ProductList,
			ProductNullFood,
			ProductCanteenInfo,
			ProductSpecsContainer,
			ProductShoppingCar,
			FixedTitle
		},
		async mounted() {
			this.scroll = new BScroll(this.$refs.foodbox, {
				click: true,
				tap: true,
				probeType: 3,
				bounce: {
					top: false,
					bottom: false
				}
			});
			this.scroll.on('scroll', pos => {
				let scrollInfo = {
					scrollTop: pos.y * (-1)
				}
				this.onPageScroll(scrollInfo)
				this.BscrollEvent(scrollInfo)
			});
			this.GetHeightInfo();
			Bus.$on(GoToBscroll, this.GoBscroll)
			Bus.$on(OpenImgLook, this.OpenPreview)
			this.Loading = true;
			const id = this.$route.params.canteenid;
			await this.GetProductList(id)
			await this.$nextTick(() => {
				// 下一帧并100毫秒后关闭加载框，防止短暂的空屏
				setTimeout(() => {
					this.Loading = false
				}, 100)
			})
		},
		beforeDestroy() {
			// 注销总线程监听
			Bus.$off(GoToBscroll);
		}
	}
</script>

<style lang="stylus" scoped>
	.page-get
		position: fixed;
		top: 0;
		bottom: 0;
		width: 1rem;
		z-index: -1;
		div
			width: 100%;
			height: 100%;
	.product-scroll
		position: absolute;
		top: 1rem;
		left: 0;
		bottom: 1rem;
		right: 0;
		overflow: hidden;
		.product-content
			min-height: 100%;
	.muse-load-box
		z-index: 9999;
		position: fixed;
		top: 4.3rem;
		left: 0;
		right: 0;
		bottom: 0;
</style>