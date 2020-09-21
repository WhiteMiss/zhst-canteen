<template>
	<div class="loading-page-box">
		<div class="banner">
			<img src="/static/images/product/banner.png" />
		</div>
		<div class="tabbar">
			<img src="/static/images/product/tabbar.png" />
		</div>
		<div class="lefttype">
			<div><img src="/static/images/product/lefttypeactive.png" /></div>
			<div v-for="item in LeftTypeCount" :key="item"><img src="/static/images/product/lefttype.png" /></div>
		</div>
		<div class="fixedt-title">
			<img src="/static/images/product/fixedtitle.png" />
		</div>
		<div class="food-list">
			<div v-for="item in FoodCount" :key="item"><img src="/static/images/product/food.png" /></div>
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex';
	const { mapState: ProductState } = createNamespacedHelpers('Product')
	export default {
		name: 'LoadingPage',
		data() {
			return {}
		},
		methods: {},
		computed: {
			LeftTypeCount() {
				let { page } = this.HeightInfo;
				let count = 0;
				if(page == 0) {
					count =  10;
				} else {
					count = parseInt((page - 125 - 40 - 55) / 55) + 1;
				}
				let arr = [];
				for (let i = 0; i < count; i++) {
					arr = [...arr, 'lefttypr' + i]
				}
				return arr;
			},
			FoodCount() {
				let { page } = this.HeightInfo;
				let count = 0;
				if(page == 0) {
					count =  10;
				} else {
					count = parseInt((page - 125 - 40 - 30) / 113) + 1;
				}
				let arr = [];
				for (let i = 0; i < count; i++) {
					arr = [...arr, 'food' + i]
				}
				return arr;
			},
			...ProductState(['HeightInfo'])
		},
		components: {}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/varibles.styl'
	.loading-page-box
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999997;
		background: #fff;
		overflow: hidden;
		.banner
			width: 750rpx;
			height: 250rpx;
			overflow: hidden;
			border-bottom: 2rpx solid #f6f6f6;
			box-sizing: border-box;
			img
				width: 750rpx;
				height: 250rpx;
		.tabbar
			width: 750rpx;
			height: 80rpx;
			overflow: hidden;
			border-bottom: 2rpx solid #f6f6f6;
			box-sizing: border-box;
			img
				width: 750rpx;
				height: 80rpx;
		.lefttype
			width: 160rpx;
			position: fixed;
			top: 330rpx;
			left: 0;
			bottom: 0;
			background: #f6f6f6;
			div
				width: 160rpx;
				height: 110rpx;
				overflow: hidden;
				img
					width: 160rpx;
					height: 110rpx;
					margin-bottom: 0;
		.fixedt-title
			position: fixed;
			left: 180rpx;
			height: 60rpx;
			overflow: hidden;
			right: 0;
			border-bottom: 2rpx solid #f6f6f6;
			box-sizing: border-box;
			img
				width: 570rpx;
				height: 60rpx;
		.food-list
			width: 590rpx;
			position: fixed;
			top: 390rpx;
			left: 160rpx;
			width: 590rpx;
			background: #fff;
			div
				width: 590rpx;
				height: 226rpx;
				overflow: hidden;
				position: relative;
				&::before
					position: absolute;
					content: '';
					bottom: 0;
					right: 0;
					height: 1px;
					border-bottom: 2rpx solid #f6f6f6;
					left: 20rpx;
				img
					width: 590rpx;
					height: 226rpx;
</style>