<template>
	<div class="Evaluate-box">
		<HeadBar/>
		<div class="page-content">
			<mu-paper class="info-paper" :z-depth="1">
				<div class="info-title">订单详细</div>
				<div class="info-detail">
					<mu-ripple class="canteen-img-name" @click="GoToCanteen(OrderInfo.canteenId)">
						<img :src="OrderInfo.canteenPicture" />
						{{OrderInfo.canteenName}}
						<span class="iconfont">&#xe602;</span>
					</mu-ripple>
					<div v-for="item in OrderInfo.orderDetailDTOList">
						<mu-ripple class="food-item">
							<div class="food-name">{{item.pcName}} - {{item.piName}}</div>
							<div class="food-money">￥{{item.price}}</div>
							<div class="food-count">×{{item.amount}}</div>
						</mu-ripple>
					</div>
					<mu-ripple class="food-item">
						<div class="food-name">餐盒费</div>
						<div class="food-money">￥{{OrderInfo.omLunchBoxFree}}</div>
						<div class="food-count">×{{OrderInfo.orderDetailDTOList.length}}</div>
					</mu-ripple>
					<mu-ripple class="food-item">
						<div class="food-name">配送费</div>
						<div class="food-money">￥{{OrderInfo.omShoppingMoney}}</div>
					</mu-ripple>
					<div class="order-money">实付 ￥{{OrderInfo.omPaymentMoney}}</div>
				</div>
			</mu-paper>
			<div class="rate-content">
				<div class="m-top">
					{{finshed ? '已评价，感谢您的支持' : '请您对本次服务进行评价'}}
				</div>
				<el-rate
					class="m-top"
					v-model="value"
					:texts="['极差', '失望', '一般', '满意', '非常满意']"
					show-text
					:colors="['#99A9BF', '#F7BA2A', '#FF9900']">
				</el-rate>
				<div class="baffle" v-if="finshed"></div>
			</div>
			<div class="button">
				<el-button v-if="!finshed" type="primary" @click="DoEval()">完成评价</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters: SaveListGetters } = createNamespacedHelpers('SaveList')
	import Axios from 'axios'
	import * as Api from '@/unit/ApiInterface'
	import qs from 'qs'
	import { GetToken } from '@/unit/DealFun'

	import HeadBar from './components/HeadBar'
	export default {
		name: 'Evaluate',
		data() {
			return {
				value: null,
				finshed: true
			}
		},
		methods: {
			GoToCanteen(id) {
				this.$router.push(`/product/${id}`)
			},
			DoEval(){
				let { orderid } = this.$route.params
				const rates = this.value * 2
				const rate = {
					Token: GetToken(),
					ocOrderSn: orderid,
					ocServiceAssessment: rates
				}
				let loading = this.$loading();
				Axios.post(Api.ORDER_COMMENT_ADD, qs.stringify(rate)).then(res => {
					res = res.data;
					loading.close();
					if(res.code == 9001403) {
						setTimeout(() => {
							this.$toast('评价成功,谢谢支持')
						}, 100)
						this.$router.go(-1)
					} else {
						this.$toast(this.$getCode(Api.ORDER_COMMENT_ADD, res.code))
					}
				});
			},
			CheckEvalFinsh(){
				let { orderid } = this.$route.params
				Axios.get(Api.ORDER_COMMENT_FINDONEBYID + `?ocOrderSn=${orderid}`).then(res =>{
					res = res.data
					if (res.code === 9001405) {
						this.value = res.data.ocServiceAssessment/2
						this.finshed = true
					} else if(res.code === 9001406){
						this.finshed = false
					} else {
						this.$toast(this.$getCode(Api.ORDER_COMMENT_FINDONEBYID, res.code))
					}
				})
			}
		},
		mounted() {
			this.CheckEvalFinsh()
		},
		components: {
			HeadBar,
		},
		computed: {
			OrderInfo() {
				let { orderid } = this.$route.params
				return this.OrderInfoDetail(orderid)
			},
			...SaveListGetters(['OrderInfoDetail']),
		}

	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.page-content
		position: fixed;
		top: 1rem;
		bottom: 0;
		left: 0;
		right: 0;
		overflow-y: scroll;
		background: #f2f2f2;
		padding: .2rem;
		.info-paper
			margin-bottom: .2rem;
			.info-title
				height: .8rem;
				line-height: .8rem;
				padding-left: .26rem;
				border-bottom: 1px solid #ccc;
			.info-detail
				padding: 0 .3rem;
				.canteen-img-name
					height: 1rem;
					line-height: 1rem;
					position: relative;
					border-bottom: 1px solid #ccc;
					position: relative;
					img
						height: .6rem;
						width: .6rem;
						margin-right: .1rem;
					.iconfont
						height: 1rem;
						line-height: 1rem;
						position: absolute;
						right: 0;
						top: 0;
				.food-item
					height: .9rem;
					line-height: .9rem;
					position: relative;
					border-bottom: 1px solid #ccc;
					.food-name
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						right: 1.7rem;
						ellipsis()
					.food-money
						float: right;
						width: 1rem;
						text-align: right;
						margin-right: .2rem;
					.food-count
						float: right;
						width: .5rem;
				.order-money
					height: 1rem;
					line-height: 1rem;
					text-align: right;
					padding-right: .2rem;
		.rate-content
			margin-top: .4rem
			position: relative;
			.baffle
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
			.m-top
				margin-top: .3rem
				text-align: center;
		.button
			text-align: center
			margin-top: .4rem
		.text-center
			text-align: center
			margin-top: .4rem
</style>