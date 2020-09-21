<template>
	<div class="headbar-box">
		<mu-ripple class="back-icon" @click="GoBack">
			<span class="iconfont">&#xe629;</span>
		</mu-ripple>
		<span class="title">{{title}}</span>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters: SaveListGetters } = createNamespacedHelpers('SaveList')
	export default {
		name: 'HeadBar',
		data() {
			return {
				title: ''
			}
		},
		methods: {
			GoBack() {
				this.$router.go(-1)
			}
		},
		computed: {
			...SaveListGetters(['CanteenDetail'])
		},
		mounted() {
			const id = this.$route.params.canteenid;
			this.title = this.CanteenDetail(id).name
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