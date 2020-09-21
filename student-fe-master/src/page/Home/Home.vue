<template>
	<div class="home-box">
		<HomeHeadBar :noticeShow.sync="noticeShow" />
		<HomeSearch />
		<HomeSortScreen :itemOpen.sync="itemOpen" :SortSelect.sync="SortSelect" />
		<div class="home-content" ref="homeBscroll">
			<div class="home-more">
				<HomeCanteenList />
				<div class="load-more" v-if="CanteenList.length >= 10">{{LoadMoreText}}</div>
			</div>
		</div>
		<HomeSortItem :open.sync="itemOpen" :SortSelect.sync="SortSelect" />
		<HomeNullCanteen v-if="CanteenList.length == 0 && nollShow" />
		<div
		class="muse-load-box"
		data-mu-loading-color="white"
		data-mu-loading-overlay-color="rgba(0, 0, 0, .3)"
		data-mu-loading-text="获取食堂信息中"
		v-loading="Loading"
		:hidden="!Loading"></div>
		<axc-view-preview :open.sync="noticeShow">
			<HomeNotice />
		</axc-view-preview>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: SaveListState, mapActions: SaveListActions } = createNamespacedHelpers('SaveList')
	import { GetToken } from '@/unit/DealFun'
	import Bscroll from 'better-scroll'

	import HomeHeadBar from './components/HeadBar'
	import HomeSearch from './components/Search'
	import HomeSortScreen from './components/SortScreen'
	import HomeSortItem from './components/SortItem'
	import HomeCanteenList from './components/CanteenList'
	import HomeNullCanteen from './components/NullCanteen'
	import HomeNotice from "./components/Notice";
	export default {
		name: 'Home',
		data() {
			return {
				itemOpen: false,
				Loading: false,
				SortSelect: {
					type: 'distributionFee',
					value: '综合排序',
					desc: false
				},
				nollShow: false,
				noticeShow: false,
				LoadMoreText: '点击加载更多'
			}
		},
		methods: {
			LoadMore() {

			},
			...SaveListActions(['GetCanteenList'])
		},
		components: {
			HomeHeadBar,
			HomeSearch,
			HomeSortScreen,
			HomeSortItem,
			HomeCanteenList,
			HomeNullCanteen,
			HomeNotice
		},
		computed: {
			...SaveListState(['CanteenList'])
		},
		async mounted() {
			this.Loading = true;
			await this.GetCanteenList()
			await (this.nollShow = true)
			await this.$nextTick(() => {
				this.Loading = false;
				this.scroll = new Bscroll(this.$refs.homeBscroll, {
					click: true,
					taps: true,
					bounce: {
						top: false,
						bottom: false
					}
				})
			})
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/position.styl'
	.home-box
		tlrb()
		background: #ffffff;
		.home-content
			position: absolute;
			// top: 1.8rem;
			top: 2.9rem;
			left: 0;
			right: 0;
			bottom: 1.12rem;
			overflow: hidden;
			background: #ffff;
			.home-more
				.load-more
					text-align: center;
					height: .9rem;
					line-height: .9rem;
					color: #666;
					font-size: .28rem;
		.muse-load-box
			z-index: 9999;
			position: fixed;
			top: 2.9rem;
			left: 0;
			right: 0;
			bottom: 1.12rem;
</style>