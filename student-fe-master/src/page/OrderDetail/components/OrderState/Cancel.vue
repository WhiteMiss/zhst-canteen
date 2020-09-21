<template>
	<timeline>
		<timeline-item :hollow="false">
			<div class="info-item">
				<div class="info-content">
					<p class="info-stauts">订单已提交</p>
				</div>
				<p class="info-time">{{OrderInfo.omCreateTime | moment}}</p>
			</div>
		</timeline-item>
		<timeline-item :hollow="false">
			<div class="info-item">
				<div class="info-content">
					<p class="info-stauts">订单已取消</p>
					<p class="info-mark">提交订单后5分钟内尚未支付，自动取消订单</p>
				</div>
			</div>
		</timeline-item>
	</timeline>
</template>

<script>
	import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
	import moment from 'moment/moment'

	export default {
		name: 'Cancel',
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
				.info-time
					white-space: nowrap
</style>