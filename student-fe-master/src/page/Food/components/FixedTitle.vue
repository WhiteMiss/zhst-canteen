<template>
	<div class="fixed-title-box">{{TypeActive.name}}</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: FoodState } = createNamespacedHelpers('Food')
	export default {
		name: 'FixedTitle',
		computed: {
			...FoodState(['TypeActive'])
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
		top: .8rem;
		font-size: .24rem;
		padding-left: .3rem;
		background: #F8E7D9
		line-height: .6rem;
		z-index: 99999;
</style>