<template>
	<div class="headbar-box" >
		<mu-ripple  class="back-icon" @click="Goback">
			<span class="iconfont">&#xe629;</span>
		</mu-ripple>
		<span class="title">订单评价</span>
</div>
</template>

<script>
	import Bus from '@/unit/Bus'
	import { BscrollToTop } from '@/unit/EmitType'
	export default {
		name: 'HeadBar',
		data() {
			return {
				count: 0
			}
		},
		methods: {
			Goback() {
				this.$router.go(-1)
			}
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
		font-size: .3rem;
		position: relative;
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
			font-size: .34rem;
			ellipsis()
</style>