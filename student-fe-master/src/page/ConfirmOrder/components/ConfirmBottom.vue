<template>
	<div class="confirm-bottom-box">
		<div class="number">待支付￥{{realPay}}</div>
		<mu-ripple class="confirm-bottom" @click="confirmOrder">确认下单</mu-ripple>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters: SaveListGetters, mapMutations: SaveListMutations } = createNamespacedHelpers('SaveList')
	import Bus from '@/unit/Bus'
	import { ChooseAddress, RefreshOrderList, ResetAddress } from '@/unit/EmitType'
	import { GetToken } from '@/unit/DealFun'
	import { CheckProductStateCode } from '@/unit/ReturnCode'
	import Axios from 'axios'
	import qs from 'qs'
	import * as Api from '@/unit/ApiInterface'

	export default {
		name: 'ConfirmBottom',
		data() {
			return {
				realPay: 0,
				address: {},
				choose: false,
				loading: null
			}
		},
		methods: {
			confirmOrder() {
				if(this.choose) {
					this.loading = this.$loading();
					// 检查用户是否存在未支付的订单，若存在则禁止下单，否则允许下单
					Axios.get(Api.CHECK_PAY_STATE + '?token=' + GetToken()).then(res => {
						res = res.data;
						// console.log(res)
						if(res.code == 0 && res.data) {
							this.checkState()
						} else if(res.code == 0 && !res.data) {
							this.loading.close()
							this.$toast('你有一笔订单尚未支付，请支付后再下单');
							return;
						} else {
							this.loading.close()
							this.$toast(this.$getCode(Api.CHECK_PAY_STATE, res.code))
							return;
						}
					})
				} else {
					this.$toast('请选择收货地址', {
						durtaion: 200
					})
				}
			},
			checkState() {
				const option = {
					canteenId: this.$route.params.id,
					caId: this.address.caId,
					token: GetToken()
				};
				let formdata = this.CreateOrderForm(option);
				// 检查商品状态是否可购买
				Axios.post(Api.CHECK_PRODUCT_STATE, qs.stringify({
					orderItem: formdata.cartItems
				}), {
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).then(res => {
					res = res.data;
					if(res.code == 0) {
						this.addOrder(formdata)
					} else {
						this.loading.close()
						this.$toast(this.$getCode(Api.CHECK_PRODUCT_STATE, res.code))
					}
				})
			},
			addOrder(formdata) {
				// 下单请求
				Axios.post(Api.ORDER_ADD, qs.stringify(formdata), {
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).then(async res => {
					res = res.data;
					this.loading.close()
					if(res.code == 9001000) {
						let id = this.$route.params.id;
						let orderId = res.data;
						await this.ClearCar(id)
						await this.$router.replace(`/payment/${orderId}/${this.realPay}/9999`)
						await this.loading.close()
						await Bus.$emit(RefreshOrderList)
					} else {
						this.$toast(this.$getCode(Api.ORDER_ADD, res.code))
					}
				})
			},
			...SaveListMutations(['ClearCar'])
		},
		computed: {
			...SaveListGetters(['OrderDetail', 'CreateOrderForm'])
		},
		mounted() {
			Bus.$on(ChooseAddress, (info) => {
				if(info.caId) {
					this.address = info;
					this.choose = true
				} else {
					this.address = {};
					this.choose = false
				}
			});
			Bus.$on(ResetAddress, () => {
				this.address = {};
				this.choose = false
			});
		},
		activated() {
			const id = this.$route.params.id;
			if(this.OrderDetail(id)) {
				this.realPay = this.OrderDetail(id).realPay;
			}
			// console.log(this.$route)
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.confirm-bottom-box
		position: fixed;
		bottom: 0;
		width: 100%
		height: 1rem;
		line-height: 1rem;
		color: #F61616;
		background: #fff;
		display: flex;
		.number
			padding-left: .3rem;
			flex: 1;
			border-top: 2px solid $styleColor
		.confirm-bottom
			float: right;
			width: 2.4rem;
			height: 1rem;
			line-height: 1rem;
			color: #fff;
			text-align: center;
			position: relative;
			background: $styleColor;
</style>