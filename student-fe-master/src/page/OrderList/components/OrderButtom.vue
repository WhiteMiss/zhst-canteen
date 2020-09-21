<template>
	<span>
		<TimeButtom v-if="orderinfo.omOrderStatus == 0" :severTime="severTime" :orderinfo="orderinfo" />
		<mu-ripple v-if="orderinfo.omOrderStatus == 0" class="order-buttom-box" @click.stop="CloseOrder">取消订单</mu-ripple>
		<mu-ripple v-if="orderinfo.omOrderStatus == 10" class="order-buttom-box" @click.stop="RefundMoney">申请退款</mu-ripple>
		<mu-ripple v-if="orderinfo.omOrderStatus == 40" class="order-buttom-box" @click.stop="GoToOpenBox">点击取餐</mu-ripple>
		<mu-ripple v-if="orderinfo.omOrderStatus == 50" class="order-buttom-box" @click.stop="GoToEvaluation">订单评价</mu-ripple>
		<!-- <mu-ripple v-if="orderinfo.omOrderStatus == 50" class="order-buttom-box" @click.stop="GoToRecovery">归还餐具</mu-ripple> -->
	</span>
</template>

<script>
	import Axios from 'axios'
	import qs from 'qs'
	import * as Api from '@/unit/ApiInterface'
	import Bus from '@/unit/Bus'
	import { RefreshOrderList } from '@/unit/EmitType'
	import { GetToken } from '@/unit/DealFun'

	import TimeButtom from './TimeButtom'
	export default {
		name: 'OrderButtom',
		data() {
			return {}
		},
		methods: {
			RefundMoney() {
				this.$confirm('确定要退款吗?').then(() => {
					console.log(this.orderinfo.omOrderSn)
					this.$emit('update:Loading', true)
					Axios.post(Api.REFUND_MONEY, qs.stringify({
						omOrderSn: this.orderinfo.omOrderSn
					})).then(res => {
						console.log(res)
						res = res.data
						this.$emit('update:Loading', false)
						if(res.code == 9001503) {
							this.$toast('退款成功')
							Bus.$emit(RefreshOrderList)
						} else {
							this.$toast(res.msg)
						}
					})
				})
			},
			GoToOpenBox() {
				this.$router.push(`/orderdetail/${this.orderinfo.omOrderSn}?tab=3`);
			},
			GoToEvaluation() {
				this.$router.push(`/evaluate/${this.orderinfo.omOrderSn}`);
			},
			GoToRecovery() {
				this.$router.push(`/recovery/${this.orderinfo.omOrderSn}`);
			},
			CloseOrder() {
				this.$confirm('确定要取消订单吗?').then(() => {
					this.$emit('update:Loading', true)
					Axios.post(Api.CLOSE_ORDER, qs.stringify({
						omOrderSn: this.orderinfo.omOrderSn,
						token: GetToken()
					})).then(res => {
						res = res.data
						this.$emit('update:Loading', false)
						if(res.code == 9001601) {
							this.$toast('取消成功')
							Bus.$emit(RefreshOrderList)
						} else {
							this.$toast(this.$getCode(Api.CLOSE_ORDER, res.code))
						}
					})
				})
			}
		},
		components: {
			TimeButtom
		},
		props: {
			severTime: Number,
			orderinfo: Object,
			Loading: Boolean
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.order-buttom-box
		position: relative;
		float: right;
		padding: .07rem .2rem;
		border: 1px solid #576EF8;
		font-size: .24rem;
		margin-top: .24rem;
		color: #576EF8;
		border-radius: 3px;
		margin-left: .2rem;
</style>