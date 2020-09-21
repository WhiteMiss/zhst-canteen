<template>
	<div class="fixed-title-box">{{TypeActive.name}}</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: ProductState } = createNamespacedHelpers('Product')
	export default {
		name: 'FixedTitle',
		computed: {
			...ProductState(['TypeActive'])
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.fixed-title-box
		position: fixed;
		left: 1.6rem;
		right: 0;
		height: .6rem;
		top: 1.8rem;
		font-size: .24rem;
		padding-left: .3rem;
		background: #F8E7D9
		line-height: .6rem;
		z-index: 3000;
</style>