<template>
	<div class="paymode-box">
		<div class="pay-icon">
			<span class="iconfont">&#xe682;</span>
		</div>
		<div class="pay-value">
			<p>微信支付</p>
			<p>极速、安全、方便</p>
		</div>
		<div class="ok-icon">
			<span class="iconfont">&#xe687;</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'PayMode',
		data() {
			return {}
		},
		methods: {}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.paymode-box
		height: 1.2rem;
		background: #fff;
		margin-top: .3rem;
		border-top: 1px solid #e0e0e0;
		border-bottom: 1px solid #e0e0e0;
		position: relative;
		.pay-icon
			height: 1.2rem;
			line-height: 1.2rem;
			position: absolute;
			left: .4rem;
			.iconfont
				font-size: .7rem;
				color: #07CA17;
		.pay-value
			position: absolute;
			left: 1.4rem;
			top: .24rem;
			line-height: .35rem;
			p
				&:nth-last-child(1)
					color: #999;
		.ok-icon
			position: absolute;
			right: .3rem;
			height: 1.2rem;
			line-height: 1.2rem;
			.iconfont
				color: #07CA17;
				font-size: .36rem;
</style>