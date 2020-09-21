<template>
	<div class="paybottom-box">
		<div class="paybotom-value">
			<div>支付:￥{{money}}</div>
			<div v-if="payState">
				请于{{timeInfo.minute}}分{{timeInfo.second}}秒内完成支付
			</div>
			<div class="outtime" v-if="!payState">
				订单支付已超时，请重新下单
			</div>
		</div>
		<mu-ripple class="pay-btn" v-if="payState" @click="PayEvent">付款</mu-ripple>
		<div class="pay-btn display-btn" v-if="!payState">付款</div>
	</div>
</template>

<script>
	import Axios from 'axios'
	import qs from 'qs'
	import * as Api from '@/unit/ApiInterface'
	import Bus from '@/unit/Bus'
	import { RefreshOrderList } from '@/unit/EmitType'
	import moment from 'moment/moment'

	export default {
		name: 'PayBottom',
		data() {
			return {
				time: 300,
				timeInterval: null,
				payState: true,
				clickState: true,
				loading: null
			}
		},
		methods: {
			PayEvent() {
				if(this.payState && this.clickState) {
					this.clickState = false;
					this.loading = this.$loading();
					Axios.post(Api.GET_PAYMENT_INFO, qs.stringify({
						omOrderSn: this.orderid
					})).then(res => {
						res = res.data;
						if(res.code == 0) {
							this.WechatPayment(res.data)
						} else {
							// 失败了提示~！！！！！！！！！！！！！！！
							this.$toast(this.$getCode(Api.GET_PAYMENT_INFO, res.code))
							this.clickState = true
							this.loading.close();
						}
					})
				}
			},
			parseParams(data) {
				try {
					var tempArr = [];
					for (var i in data) {
						var key = encodeURIComponent(i);
						var value = encodeURIComponent(data[i]);
						tempArr.push(key + '=' + value);
					}
					var urlParamsStr = tempArr.join('&');
					return urlParamsStr;
				} catch (err) {
					return '';
				}
			},
			WechatPayment({ appId, nonceStr, paySign, prepayId, signType, timeStamp }) {
				let payConfig = {
					"appId": appId,
					"nonceStr": nonceStr,
					"paySign": paySign,
					"package": `prepay_id=${prepayId}`,
					"signType": signType,
					"timeStamp": timeStamp,
					"redirect_success": `${window.location.origin}${window.location.pathname}${window.location.search}#/paysuccess`,
					"redirect_fail": window.location.href
				}
				console.log("payConfig:", payConfig)
				console.log(this.parseParams(payConfig))
				window.location.href = "http://pay.hrzhst.com/pay.html?" + this.parseParams(payConfig);
			},
			InitInterval() {
				this.timeInterval = setInterval(() => {
					this.time -= 1;
					if(this.time == 0) {
						clearInterval(this.timeInterval);
						this.payState = false;
					}
				}, 1000)
			}
		},
		computed: {
			orderid() {
				return this.$route.params.orderid
			},
			money() {
				return this.$route.params.money
			},
			timeInfo() {
				let minute = parseInt(this.time / 60);
				let second = this.time % 60;
				return { minute, second };
			}
		},
		mounted() {
			if(this.$route.params.time != 9999) {
				let time = moment(this.$route.query.createtime.replace(' ', '+')).format('YYYY/MM/DD HH:mm:ss')
				let createtime = new Date(time).valueOf();
				Axios.get(Api.GET_SEVER_TIME).then(res => {
					res = res.data;
					this.time = 300 - ((res.serverCurrentTime - createtime) / 1000);
					this.InitInterval();
				})
			} else {
				this.InitInterval()
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.paybottom-box
		height: 1.1rem;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		border-top: 1px solid #ccc;
		.paybotom-value
			float: left;
			font-size: .24rem;
			margin-top: .15rem;
			margin-left: .3rem;
			.outtime
				color: red;
		.pay-btn
			position: relative;
			float: right;
			margin-right: .3rem;
			width: 1.9rem;
			height: .7rem;
			border-radius: 3px;
			color: #fff;
			line-height: .7rem;
			background: #F94C4C;
			text-align: center;
			margin-top: .18rem;
			&.display-btn
				background: #ccc;
</style>
