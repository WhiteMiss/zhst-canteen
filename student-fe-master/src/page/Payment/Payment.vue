<template>
	<div class="payment-box">
		<HeadBar />
		<FlowText text="下单成功，等待支付" />
		<FlowChart :flow="1" />
		<OrderInfo />
		<PayMode />
		<PayBottom />
	</div>
</template>

<script>
	import HeadBar from './components/HeadBar'
	import FlowText from '@/common/FlowText'
	import FlowChart from '@/common/FlowChart'
	import OrderInfo from './components/OrderInfo'
	import PayMode from './components/PayMode'
	import PayBottom from './components/PayBottom'
	export default {
		name: 'Payment',
		data() {
			return {}
		},
		methods: {},
		computed: {},
		components: {
			HeadBar,
			FlowText,
			FlowChart,
			OrderInfo,
			PayMode,
			PayBottom
		},
		// deactivated () {
		// 	this.$destroy(true)
		// }
	}
</script>

<style lang="stylus" scoped>
	.payment-box
		position: absolute;
		width: 100%;
		top: 0;
		background: #eee;
		bottom: 0;
		overflow: scroll;
</style>