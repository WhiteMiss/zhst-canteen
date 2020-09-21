<template>
	<div class="headbar-box">
		<mu-ripple class="back-icon" @click="GoBack">
			<span class="iconfont">&#xe629;</span>
		</mu-ripple>
		<span class="title">归还餐具</span>
		<!-- <div class="refresh">
			<span class="iconfont">&#xe73f;</span>
		</div> -->
	</div>
</template>

<script>
	export default {
		name: 'HeadBar',
		methods: {
			GoBack() {
				this.$router.go(-1)
			},
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.headbar-box
		background: $styleColor;
		height: 1rem;
		line-height: 1rem;
		color: #ffffff;
		font-size: .28rem;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		.back-icon
			width: .8rem;
			height: 1rem;
			line-height: 1rem;
			text-align: center;
			float: left;
			position: relative;
		.title
			position: absolute;
			top: 0;
			bottom: 0;
			left: .8rem;
			right: .5rem;
			font-size: .32rem;
			ellipsis()
		.refresh
			width: 1rem;
			height: 1rem;
			line-height: 1rem;
			text-align: center;
			position: absolute;
			right: 0;
			top: 0;
			.iconfont
				font-size: .32rem;
</style>