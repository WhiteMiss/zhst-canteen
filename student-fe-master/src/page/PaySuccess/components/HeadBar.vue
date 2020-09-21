<template>
	<div class="headbar-box">
		支付成功
	</div>
</template>

<script>
	export default {
		name: 'HeadBar',
		data() {
			return {}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.headbar-box
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		background: $styleColor;
		color: #fff;
		font-size: .3rem;
		position: relative;
		.back-icon
			width: .8rem;
			height: 1rem;
			line-height: 1rem;
			text-align: center;
			float: left;
			position: absolute;
			left: 0;
			top: 0;
</style>