<template>
	<div class="headbar-box">收银台</div>
</template>

<script>
	export default {
		name: 'HeadBar',
		data() {
			return {}
		},
		methods: {},
		computed: {},
		components: {},
		props: {}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.headbar-box
		height: 1rem;
		background: $styleColor
		line-height: 1rem;
		text-align: center;
		color: #fff;
		font-size: .34rem;
</style>