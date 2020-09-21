<template>
	<span>
		<p class="not-list" v-if="OrderList.length == 0 && !NullText">当前没有订单</p>
		<div class="list-box" ref="ListBscroll">
			<div class="list-container">
				<p class="drop-down">{{scrollText}}</p>
				<p class="not-list" v-if="OrderList.length == 0 && NullText">当前没有订单</p>
				<div class="order-list">
					<div
					class="order-item"
					v-for="item in OrderList"
					:key="item.omOrderSn"
					@click="GoToDetail(item.omOrderSn)"
					:style="'height: ' + ItemHeight(item.omOrderStatus) + 'rem'">
						<img :src="item.canteenPicture" class="item-img" />
						<div class="order-info">
							<div class="canteen-name">{{item.canteenName}}</div>
							<div class="create-time">{{item.omCreateTime | moment}}</div>
							<div class="order-state">{{item.omOrderStatus | changeCode}}</div>
							<div class="order-food">
								<div class="food-name-icon">
									<span class="food-name">{{item.orderDetailDTOList[0].piName}}</span>
									<span v-if="item.orderDetailDTOList.length > 1">等{{item.orderDetailDTOList.length}}种商品</span>
									<span class="iconfont">&#xe602;</span>
								</div>
								<span class="money">￥{{item.omPaymentMoney}}</span>
							</div>
							<OrderButtom :orderinfo="item" :severTime="severTime" :Loading.sync="Loading" />
						</div>
					</div>
				</div>
				<p class="drop-up" v-if="OrderList.length >= 10">{{scrollDownText}}</p>
			</div>
		</div>
		<div
			class="muse-load-box"
			data-mu-loading-color="white"
			data-mu-loading-overlay-color="rgba(0, 0, 0, .4)"
			v-loading="Loading"
			:hidden="!Loading"></div>
	</span>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: SaveListState, mapActions: SaveListActions } = createNamespacedHelpers('SaveList')
	import Bus from '@/unit/Bus'
	import { RefreshOrderList, BscrollToTop } from '@/unit/EmitType'
	import { GetToken } from '@/unit/DealFun'
	import Bscroll from 'better-scroll'
	import moment from 'moment/moment'
	import { GetOrderState } from '@/unit/OrderStateCode'
	import Axios from 'axios'
	import * as Api from '@/unit/ApiInterface'

	import OrderButtom from './OrderButtom'
	export default {
		name: 'List',
		data() {
			return {
				scroll: null,
				scrollText: '下拉刷新订单信息',
				scrollDownText: '上拉加载更多',
				page: 0,
				severTime: 0,
				Loading: false,
				LoadMoreState: true,
				NullText: false
			}
		},
		methods: {
			async refreshOrderList(allrefresg = false) {
				let page, size;
				if(allrefresg) {
					page = 0;
					size = (this.page + 1) * 10
				} else {
					this.page = 0;
					page = this.page;
					size = 10
				}
				this.Loading = true
				await this.GetOrderList({
					refesh: true,
					token: GetToken(),
					page,
					size
				})
				await (this.Loading = false)
				await this.scroll.refresh()
				this.LoadMoreState = true;
				this.scrollDownText = '上拉加载更多'
				this.GetSeverTime();
			},
			async LoadMoreOrderList() {
				if(this.LoadMoreState && this.OrderList.length >= 10) {
					this.page += 1;
					this.Loading = true;
					let have;
					await this.GetOrderList({
						refesh: true,
						loadmore: true,
						token: GetToken(),
						page: this.page,
						size: 10
					}).then(res => {
						if(res == 2) {
							this.scrollDownText = '没有更多了';
							this.LoadMoreState = false;
						}
					})
					await (this.Loading = false)
					await this.scroll.refresh()
					this.GetSeverTime();
				}
			},
			ItemHeight(state) {
				if(state == 0 || state == 10 || state == 40 || state == 50) {
					return '3'
				} else {
					return '2.3'
				}
			},
			GoToDetail(id) {
				this.$router.push(`/orderdetail/${id}`)
			},
			InitBetterScroll() {
				this.scroll = new Bscroll(this.$refs.ListBscroll, {
					click: true,
					taps: true,
					probeType: 3
				});
				Bus.$on(BscrollToTop, this.BscrollTop)
				// 监听滚动改变下拉刷新文字
				this.scroll.on('scroll', pos => {
					if(pos.y > 0) {
						this.NullText = true;
					} else {
						this.NullText = false;
					}

					if(pos.y > 50){
						this.scrollText = '松手进行刷新';
					} else {
						this.scrollText = '下拉刷新订单信息';
					}
					if(this.scroll.maxScrollY > pos.y + 30 && this.LoadMoreState) {
						this.scrollDownText = '松手进行加载更多'
					} else if(this.LoadMoreState) {
						this.scrollDownText = '上拉加载更多'
					}
				});
				this.scroll.on('touchEnd', pos => {
					if(pos.y > 50){
						this.refreshOrderList()
					}
					if(this.scroll.maxScrollY > pos.y + 30) {
						this.LoadMoreOrderList()
					}
				})
			},
			GetSeverTime() {
				Axios.get(Api.GET_SEVER_TIME).then(res => {
					res = res.data;
					// alert(JSON.stringify(res))
					this.severTime = res.serverCurrentTime;
				})
			},
			BscrollTop() {
				this.scroll.scrollTo(0, 0, 500)
			},
			...SaveListActions(['GetOrderList'])
		},
		computed: {
			...SaveListState(['OrderList'])
		},
		components: {
			OrderButtom
		},
		filters: {
			moment: (value, formatString) => {
				formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
				return moment(value).format(formatString)
			},
			changeCode: code => {
				return GetOrderState(code)
			}
		},
		activated() {
			this.scroll.refresh()
			let pagelen = parseInt(this.OrderList.length / 10);
			if(pagelen != this.page) {
				this.page = pagelen;
			}
		},
		mounted() {
			Bus.$on(RefreshOrderList, this.refreshOrderList);
			this.GetOrderList({
				token: GetToken(),
				page: this.page,
				size: 10
			});
			this.InitBetterScroll();
			this.GetSeverTime();
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.not-list
		position: absolute;
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		text-align: center;
		font-size: .32rem;
		color: #666;
	.list-box
		position: absolute;
		top: 1rem;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		.list-container
			width: 100%;
			min-height: 100.5%;
			position: relative;
			.drop-down
				position: absolute;
				top: -.8rem;
				left: 0;
				width: 100%;
				height: .8rem;
				line-height: .8rem;
				text-align: center;
				font-size: .32rem;
				color: #666;
			.drop-up
				height: .8rem;
				line-height: .8rem;
				text-align: center;
				font-size: .32rem;
				color: #666;
			.order-list
				padding-top: .2rem;
				.order-item
					background: #fff;
					padding: .3rem;
					box-sizing: border-box;
					margin-bottom: .2rem;
					position: relative;
					&:nth-last-child(1)
						margin-bottom: 0;
					.item-img
						width: .9rem;
						height: .9rem;
						float: left;
						border-radius: 3px;
					.order-info
						position: absolute;
						top: .3rem;
						right: .3rem;
						left: 1.44rem;
						bottom: 0;
						.canteen-name
							width: 4rem;
							ellipsis();
							height: .5rem;
							line-height: .5rem;
							font-size: .32rem;
						.create-time
							font-size: .24rem;
							color: #999;
							padding-bottom: .1rem;
							border-bottom: 1px solid #ccc;
						.order-state
							position: absolute;
							top: 0;
							right: 0;
							font-size: .28rem;
						.order-food
							height: .7rem;
							line-height: .7rem;
							border-bottom: 1px solid #ccc;
							position: relative;
							.food-name-icon
								position: absolute;
								top: 0;
								left: 0;
								.food-name
									display: inline-block;
									max-width: 2rem;
									float: left;
									ellipsis()
								.iconfont
									font-size: .24rem;
							.money
								position: absolute;
								top: 0;
								right: 0;
</style>