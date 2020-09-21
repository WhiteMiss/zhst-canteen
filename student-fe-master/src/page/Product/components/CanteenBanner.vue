<template>
	<div class="canteen-banner-box">
		<div class="banner-bg"><img src="@/assets/image/product-banner.jpg" alt="banner" /></div>
		<div class="banner-contant">
			<div class="canteen-head">
				<img :src="CanteenInfo.avatar" alt="head" class="canteen-img" />
			</div>
			<div class="canteen-info">
				<div class="canteen-name">{{CanteenInfo.name}}</div>
				<div class="canteen-rate">
					<el-rate
						v-model="CanteenInfo.rating"
						:max="5"
						disabled
						text-color="#ff9900"></el-rate>
					<span class="rate-number">{{CanteenInfo.rating}}分</span>
				</div>
				<div class="canteen-distribution">配送费：￥{{CanteenInfo.distributionFee}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters: SaveListGetters } = createNamespacedHelpers('SaveList')
	export default {
		name: 'CanteenBanner',
		data() {
			return {
				CanteenInfo: {}
			}
		},
		methods: {},
		computed: {
			...SaveListGetters(['CanteenDetail'])
		},
		mounted() {
			const id = this.$route.params.canteenid;
			this.CanteenInfo = this.CanteenDetail(id)
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.canteen-banner-box >>> .el-rate
		height: auto;
		float: left;
	.canteen-banner-box >>> .el-rate__icon
		margin: 0;
		font-size: .26rem;
	.canteen-banner-box
		height: 2.5rem;
		position: relative;
		.banner-bg
			position: absolute;
			height: 2.5rem;
			left: 0;
			right: 0;
			img
				width: 100%;
				height: 100%;
		.banner-contant
			position: absolute;
			left: 0;
			right: 0;
			height: 2.5rem;
			background: rgba(34, 36, 167, .4);
			.canteen-head
				height: 1.6rem;
				width: 1.6rem;
				border: 3px solid #fff;
				border-radius: .32rem;
				overflow: hidden;
				margin-top: .45rem;
				margin-left: .4rem;
				.canteen-img
					margin-left: -.06rem;
					margin-top: -.06rem;
					width: 1.6rem;
					height: 1.6rem;
			.canteen-info
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 2rem;
				color: #ffffff;
				padding-left: .25rem;
				padding-top: .62rem;
				.canteen-name
					width: 100%;
					font-size: .35rem;
					ellipsis()
					letter-spacing: .04rem;
				.canteen-rate
					overflow: hidden;
					.rate-number
						margin-left: .1rem;
						margin-top: -.03rem;
						letter-spacing: .02rem;
						float: left;
				.canteen-distribution
					font-size: .26rem;
</style>