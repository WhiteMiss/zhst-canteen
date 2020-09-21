<template>
	<timeline>
		<timeline-item :hollow="AxisHollow[0]">
			<div class="info-item">
				<div class="info-content">
					<p class="info-stauts">订单已提交</p>
				</div>
				<p class="info-time">{{OrderInfo.omCreateTime | moment}}</p>
			</div>
		</timeline-item>
		<timeline-item :hollow="AxisHollow[1]" v-if="!AxisHollow[0]">
			<div class="info-item">
				<div class="info-content" @click="GotoPay">
					<p class="info-stauts">{{AxisHollow[1] ? '等待支付' : '支付成功'}}</p>
					<p class="info-mark" v-if="AxisHollow[1] && payState">请在{{timeInfo.minute}}分{{timeInfo.second}}秒内点击此处并完成支付</p>
					<p class="info-mark not-pay" v-if="AxisHollow[1] && !payState">支付超时，请重新下单</p>
				</div>
				<p class="info-time">{{OrderInfo.omPayTime | moment}}</p>
			</div>
		</timeline-item>
		<timeline-item :hollow="AxisHollow[2]" v-if="!AxisHollow[1]">
			<div class="info-item">
				<div class="info-content">
					<p class="info-stauts">{{AxisHollow[2] ? '等待接单' : '商家已接单'}}</p>
					<p class="info-mark" v-if="AxisHollow[2]">支付成功，请等待商家接单</p>
				</div>
				<!-- <p class="info-time">{{OrderInfo.omDeliveryTime | moment}}</p> -->
			</div>
		</timeline-item>
		<timeline-item :hollow="AxisHollow[3]" v-if="!AxisHollow[2]">
			<div class="info-item">
				<div class="info-content">
					<p class="info-stauts">{{AxisHollow[3] ? '等待配送' : '配送完成'}}</p>
					<p class="info-mark" v-if="AxisHollow[3]">商品准备中，等待配送</p>
				</div>
				<p class="info-time">{{OrderInfo.omDeliveryTime | moment}}</p>
			</div>
		</timeline-item>
		<timeline-item :hollow="AxisHollow[4]" v-if="!AxisHollow[3]">
			<div class="info-item">
				<div class="info-content">
					<p class="info-stauts">{{AxisHollow[4] ? '等待领取' : '订单完成'}}</p>
					<p class="info-mark" v-if="AxisHollow[4]">配送完成，等待领取</p>
				</div>
				<p class="info-time">{{OrderInfo.omReceiveTime | moment}}</p>
			</div>
		</timeline-item>
	</timeline>
</template>

<script>
	import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
	import moment from 'moment/moment'
	import Axios from 'axios'
	import * as Api from '@/unit/ApiInterface'

	export default {
		name: 'Normal',
		data() {
			return {
				severTime: 0,
				timeInterval: null,
				time: 300,
				payState: true
			}
		},
		methods: {
			GetSeverTime() {
				Axios.get(Api.GET_SEVER_TIME).then(res => {
					res = res.data;
					this.severTime = res.serverCurrentTime;
				})
			},
			InitInterval() {
				if(this.timeDiff > 0) {
					if(this.severTime != 0) {
						this.time = this.timeDiff;
						this.timeInterval = setInterval(() => {
							this.time -= 1;
							if(this.time == 0) {
								clearInterval(this.timeInterval)
								this.payState = false
							}
						}, 1000)
					} else {
						setTimeout(this.InitInterval, 100)
					}
				} else {
					this.payState = false
				}
			},
			GotoPay() {
				if(this.payState && this.OrderInfo.omOrderStatus == 0) {
					this.$router.replace(`/payment/${this.OrderInfo.omOrderSn}/${this.OrderInfo.omPaymentMoney}/${this.time}?createtime=${this.OrderInfo.omCreateTime}`)
				}
			}
		},
		mounted() {
			if(this.OrderInfo.omOrderStatus == 0) {
				this.InitInterval();
				this.GetSeverTime();
			}
		},
		computed: {
			timeDiff() {
				let createtime = new Date(this.OrderInfo.omCreateTime).valueOf();
				return 300 - ((this.severTime - createtime) / 1000)
			},
			timeInfo() {
				let minute = parseInt(this.time / 60);
				let second = parseInt(this.time % 60);
				return { minute, second };
			}
		},
		filters: {
			moment: function (value, formatString) {
				formatString = formatString || 'MM-DD HH:mm:ss';
				if(value) {
					return moment(value).format(formatString)
				} else {
					return '--'
				}
			}
		},
		components: {
			Timeline,
			TimelineItem,
			TimelineTitle
		},
		props: {
			AxisHollow: Array,
			OrderInfo: Object
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.timeline
		li >>> .timeline-circle
			top: .15rem
		.timeline-item
			margin-top: .15rem;
			padding-bottom: .22rem;
			.timeline-circle
				font-size: .24rem
			.info-item
				display: -webkit-flex
				display: flex
				justify-content: flex-start
				align-items: center
				padding-top: .08rem
				.info-content
					flex: 2
					word-wrap: break-word
					word-break: break-all
					overflow: hidden
					.info-stauts
						display: -webkit-flex
						display: flex
						align-items: flex-start
					.info-mark
						padding-top: .1rem
						font-size: .26rem
						color: #969696
						&.not-pay
							color: red;
				.info-time
					white-space: nowrap
</style>