<template>
	<span>
		<p class="not-list" v-if="OrderList.length == 0 && !NullText && ShowRefresh">当前没有订单</p>
		<div class="list-box" ref="ListBscroll">
			<div class="list-container">
				<p class="drop-down">{{scrollText}}</p>
				<p class="not-list" v-if="OrderList.length == 0 && NullText && ShowRefresh">当前没有订单</p>
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
								<span class="food-name">{{item.orderDetailDTOList[0].piName}}</span>
								<span v-if="item.orderDetailDTOList.length > 1">等{{item.orderDetailDTOList.length}}件商品</span>
								<span class="iconfont">&#xe602;</span>
								<span class="money">￥{{item.omPaymentMoney}}</span>
							</div>
							<OrderButtom :orderinfo="item" :severTime="severTime" :Loading.sync="Loading" />
						</div>
					</div>
				</div>
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
	const { mapState: SaveListState,mapMutations:SaveListMutations, mapActions: SaveListActions } = createNamespacedHelpers('SaveList')
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
				severTime: 0,
				Loading: false,
				NullText: false,
				ShowRefresh: false,
				OrderList: []
			}
		},
		methods: {
			...SaveListMutations(['SaveTypeOrderList']),
			refreshOrderList() {
				this.GetOrderList()
				this.scroll.refresh()
				this.GetSeverTime();
			},
			GetOrderList() {
				this.Loading = true
				Axios.get(Api.GET_ORDER_LIST + `?token=${GetToken()}&status=${this.$route.params.state}`).then(res => {
					this.Loading = false
					this.ShowRefresh = true
					res = res.data
					this.OrderList = res.data ? res.data : [];
					this.SaveTypeOrderList(res.data)
				})
			},
			ItemHeight(state) {
				if(state == 0 || state == 10 || state == 40 || state == 50) {
					return '3'
				} else {
					return '2.3'
				}
			},
			GoToDetail(id) {
				this.$router.push(`/orderdetail/${id}/${this.$route.params.state}`)
			},
			InitBetterScroll() {
				this.scroll = new Bscroll(this.$refs.ListBscroll, {
					click: true,
					taps: true,
					probeType: 3
				});

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
				});
				this.scroll.on('touchEnd', pos => {
					if(pos.y > 50){
						this.refreshOrderList()
					}
				})
			},
			GetSeverTime() {
				Axios.get(Api.GET_SEVER_TIME).then(res => {
					res = res.data;
					this.severTime = res.serverCurrentTime;
				})
			},
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
		},
		mounted() {
			this.GetOrderList();
			this.InitBetterScroll();
			this.GetSeverTime();
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.muse-load-box
		position: absolute;
		top: 1rem;
		left: 0;
		right: 0;
		bottom: 0;
	.not-list
		position: absolute;
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		text-align: center;
		font-size: .32rem;
		color: #666;
		z-index: 100;
	.list-box
		position: absolute;
		top: 1rem;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		background: #eee;
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
							.food-name
								display: inline-block;
								max-width: 2rem;
								float: left;
								ellipsis()
							.iconfont
								font-size: .24rem;
							.money
								float: right;
</style>