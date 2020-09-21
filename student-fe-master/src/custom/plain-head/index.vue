<template>
	<div class="plain-head-box">
		<mu-ripple class="back-left" @click="leftIconClick">
			<span class="iconfont">&#xe629;</span>
		</mu-ripple>
		<span class="title">{{title}}</span>
	</div>
</template>

<script>
	export default {
		name: 'plain-head',
		data() {
			return {}
		},
		methods: {
			leftIconClick() {
				if(this.backPrev) {
					this.$router.go(-1)
				} else {
					this.$emit('backClick');
				}
			}
		},
		computed: {},
		props: {
			title: { type: String, default: "标题" },
			backPrev: { type: Boolean, default: true }
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.plain-head-box
		height: 1rem;
		background: $styleColor;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		line-height: 1rem;
		color: #ffffff;
		.back-left
			float: left;
			color: #ffffff;
			width: .8rem;
			height: .8rem;
			border-radius: .4rem;
			overflow: hidden;
			margin-top: .1rem;
			line-height: .8rem;
			text-align: center;
			position: relative;
		.title
			font-size: .34rem;
</style>