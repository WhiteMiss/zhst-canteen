<template>
	<div class="pay-success-box">
		<HeadBar />
		<img src="@/assets/image/success.png" class="success-img" />
		<p class="pay-success">支付成功</p>
		<p class="pay-desc">您的订单已提交到食堂，我们将尽快处理...</p>
		<p class="pay-desc">请您耐心等候</p>
		<div class="pay-btn">
			<div class="btn" @click="GoToRoute('orderlist')">订单列表</div>
			<div class="btn" @click="GoToRoute('home')">回到首页</div>
		</div>
	</div>
</template>

<script>
	import HeadBar from './components/HeadBar'
	export default {
		name: 'PaySuccess',
		methods: {
			GoToRoute(route) {
				this.$router.push(`/main/${route}`)
			}
		},
		components: {
			HeadBar
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.pay-success-box
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		.success-img
			width: 3rem;
			display: block;
			margin: .5rem auto .3rem;
		.pay-success
			text-align: center;
			font-size: .4rem;
		.pay-desc
			text-align: center;
			margin-top: .1rem;
		.pay-btn
			width: 100%;
			text-align: center;
			margin-top: .4rem;
			.btn
				display: inline-block;
				width: 1.6rem;
				height: .7rem;
				line-height: .7rem;
				border-radius: 3px;
				color: #fff;
				margin: 0 .17rem;
				background: #2196f3;
</style>