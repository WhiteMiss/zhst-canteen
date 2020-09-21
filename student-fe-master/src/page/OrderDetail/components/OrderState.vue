<template>
	<div class="order-state-box">
		<Normal v-if="OrderInfo.omOrderStatus < 60" :OrderInfo="OrderInfo" :AxisHollow="AxisHollow" />
		<Refund v-if="OrderInfo.omOrderStatus > 60" :OrderInfo="OrderInfo" :AxisHollow="AxisHollow" />
		<Cancel v-if="OrderInfo.omOrderStatus == 60" :OrderInfo="OrderInfo" :AxisHollow="AxisHollow" />
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters: SaveListGetters } = createNamespacedHelpers('SaveList')
	import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
	import moment from 'moment/moment'
	import Axios from 'axios'
	import * as Api from '@/unit/ApiInterface'

	import Normal from './OrderState/Normal'
	import Refund from './OrderState/Refund'
	import Cancel from './OrderState/Cancel'
	export default {
		name: 'OrderState',
		data() {
			return {
				severTime: 0,
				timeInterval: null,
				time: 300,
				btnState: true
			}
		},
		methods: {},
		computed: {
			OrderInfo() {
				if(this.$route.params.state){
					let id = this.$route.params.orderid;
					console.log(this.GetTypeOrderList(id))
					return this.GetTypeOrderList(id)
				}
				else{
					let id = this.$route.params.orderid;
					return this.OrderInfoDetail(id)
				}
			},
			AxisHollow() {
				if(this.OrderInfo.omOrderStatus < 60) {
					// 正常时间轴
					let index = 0;
					let defaultAxis = [true, true, true, true, true];
					for(let i = 0;i <= this.OrderInfo.omOrderStatus; i += 10) {
						if(i != 30) {
							defaultAxis[index] = false;
							index++;
						}
					}
					return defaultAxis;
				} else if(this.OrderInfo.omOrderStatus > 60){
					// 退款时间轴
					let index = 0;
					let defaultAxis = [true, true];
					for(let i = 70;i <= this.OrderInfo.omOrderStatus; i += 10) {
						defaultAxis[index] = false;
						index++;
					}
					return defaultAxis;
				}
			},
			...SaveListGetters(['OrderInfoDetail','GetTypeOrderList'])
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
			TimelineTitle,
			Normal,
			Refund,
			Cancel
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.order-state-box
		position: fixed;
		top: 1.8rem;
		bottom: 0;
		left: 0;
		right: 0;
		overflow-y: scroll;
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
					.info-time
						white-space: nowrap
		.order-cancel
			display: -webkit-flex
			display: flex
			justify-content center
			align-items center
			line-height: 1rem
			color: #999
</style>