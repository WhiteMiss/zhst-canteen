<template>
	<div class="order-info-box">
		<div class="order-info-title"><span class="iconfont">&#xe607;</span> 支付信息</div>
		<div class="order-info-item">
			<div class="order-info">
				<span class="iconfont">&#xe681;</span> 订单编号：{{orderid}}
			</div>
		</div>
		<div class="order-info-item">
			<div class="order-info">
				<span class="iconfont money-icon">&#xe60f;</span> 订单金额：{{money}}元
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'OrderInfo',
		data() {
			return {}
		},
		methods: {},
		computed: {
			money() {
				return this.$route.params.money
			},
			orderid() {
				return this.$route.params.orderid
			}
		},
		components: {},
		props: {}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.order-info-box
		background: #fff;
		margin-top: .3rem;
		.order-info-title
			height: .7rem;
			line-height: .7rem;
			padding-left: .2rem;
			border-bottom: 1px solid #ccc;
			.iconfont
				font-size: .24rem;
		.order-info-item
			height: .8rem;
			line-height: .8rem;
			padding-left: .4rem;
			&:nth-last-child(1)
				.order-info
					border: none;
			.order-info
				border-bottom: 1px solid #ccc;
				.iconfont
					font-size: .36rem;
				.money-icon
					margin-right: .12rem;
</style>