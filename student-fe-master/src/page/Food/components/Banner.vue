<template>
	<div class="banner-box">
		<img src="http://www.hrzhst.com/shopping/zhst/static/img/product-banner.c6b2543.jpg" class="banner-bg" />
		<div class="banner-content"></div>
	</div>
</template>

<script>
	export default {
		name: 'Banner'
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.banner-box
		height: 2.5rem;
		background: $styleColor;
		overflow: hidden;
		position: relative;
		.banner-bg
			position: absolute;
			width: 100%;
			height: 2.5rem;
			top: 0;
			left: 0;
		.banner-content
			position: absolute;
			left: 0;
			right: 0;
			height: 2.5rem;
			background: rgba(34, 36, 167, .4);
</style>