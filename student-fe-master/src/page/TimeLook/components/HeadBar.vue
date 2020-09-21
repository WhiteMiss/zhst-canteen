<template>
	<div class="headbar-box">
		<mu-ripple class="back-icon" @click="GoBack">
			<span class="iconfont">&#xe629;</span>
		</mu-ripple>
		<span class="title">查看时间段</span>
		<div class="refresh" @click="RefreshTime">
			<span class="iconfont">&#xe63e;</span>
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapActions: SaveListActions } = createNamespacedHelpers('SaveList')
	export default {
		name: 'HeadBar',
		data() {
			return {
				loading: null
			}
		},
		methods: {
			GoBack() {
				this.$router.go(-1)
			},
			async RefreshTime() {
				this.loading = this.$loading({
					overlayColor: 'rgba(0, 0, 0, 0.2)'
				})
				await this.GetModeTime()
				await setTimeout(() => {
					this.loading.close()
				}, 500)
			},
			...SaveListActions(['GetModeTime'])
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
			font-size: .3rem;
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