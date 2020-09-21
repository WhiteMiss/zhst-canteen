<template>
	<mu-paper class="info-paper" :z-depth="1">
		<div class="info-title">订单信息</div>
		<div class="info-detail">
			<mu-ripple class="info-item">
				<div class="title">订单编号:</div>
				<div class="desc">{{OrderInfo.omOrderSn}}</div>
			</mu-ripple>
			<mu-ripple class="info-item">
				<div class="title">下单时间:</div>
				<div class="desc">{{OrderInfo.omCreateTime | moment}}</div>
			</mu-ripple>
			<mu-ripple class="info-item" v-if="OrderInfo.omPayTime">
				<div class="title">支付方式:</div>
				<div class="desc">微信支付</div>
			</mu-ripple>
			<mu-ripple class="info-item" v-if="OrderInfo.omPayTime">
				<div class="title">支付时间:</div>
				<div class="desc">{{OrderInfo.omPayTime | moment}}</div>
			</mu-ripple>
			<mu-ripple class="info-item" v-if="OrderInfo.omReceiveTime">
				<div class="title">取餐时间:</div>
				<div class="desc">{{OrderInfo.omReceiveTime | moment}}</div>
			</mu-ripple>
		</div>
	</mu-paper>
</template>

<script>
	import moment from 'moment/moment'
	export default {
		name: 'IdentInfo',
		methods: {},
		props: {
			OrderInfo: Object
		},
		filters: {
			moment: (value, formatString) => {
				formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
				return moment(value).format(formatString)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.info-paper
		margin-bottom: .2rem;
		.info-title
			height: .8rem;
			line-height: .8rem;
			padding-left: .26rem;
			border-bottom: 1px solid #ccc;
		.info-detail
			padding-left: .3rem;
			.info-item
				height: .84rem;
				position: relative;
				line-height: .84rem;
				border-bottom: 1px solid #ccc;
				&:nth-last-child(1)
					border: none;
				.title
					position: absolute;
					top: 0;
					left: 0;
					width: 1.2rem;
					ellipsis()
				.desc
					position: absolute;
					top: 0;
					left: 1.35rem;
					right: 0;
					ellipsis()
</style>