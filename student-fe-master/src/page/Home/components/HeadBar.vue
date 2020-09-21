<template>
	<div class="home-head-bar">
		校园智慧饭堂
		<span ref="icon" @click="OpenTime" class="iconfont">&#xe73f;</span>
	</div>
</template>

<script>
	export default {
		name: 'HeadBar',
		data() {
			return {}
		},
		methods: {
			OpenTime() {
				this.$emit("update:noticeShow", true);
			}
		},
		props: {
			noticeShow: null
		},
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.mu-popover
		top: 1rem;
		right: 0;
		padding: .2rem;
	.title
		text-align: center;
		margin-bottom: .05rem;
	.Set-time
		margin-top: .2rem;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		padding-top: .2rem;
		padding-bottom: .2rem;
	.time-value
		width: 2.5rem;
		padding-top: .2rem;
	.home-head-bar
		background: $styleColor;
		height: 1rem;
		line-height: 1rem;
		color: #ffffff;
		font-size: .3rem;
		padding-left: .4rem;
		.iconfont
			float: right;
			margin-right: .4rem;
			color: #ffffff;
			font-size: .37rem;
</style>