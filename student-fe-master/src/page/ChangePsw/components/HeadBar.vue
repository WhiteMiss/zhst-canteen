<template>
	<div class="headbar-box">
		<mu-ripple class="back-icon" @click="GoBack">
			<span class="iconfont">&#xe629;</span>
		</mu-ripple>
		修改密码
	</div>
</template>

<script>
	export default {
		name: 'HeadBar',
		data() {
			return {}
		},
		methods: {
			GoBack() {
				this.$router.go(-1)
			}
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