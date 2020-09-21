<template>
	<div class="shopping-car-box">
		<div :class="'shopping-car-icon ' + (CarInfo.good_count > 0 ? 'car-have' : '')" :animation="anim">
			<span class="iconfont">&#xe603;</span>
		</div>
		<div class="shopping-car-number" v-if="CarInfo.good_count > 0">{{CarInfo.good_count}}</div>
		<div :class="'shopping-product-count ' + (CarInfo.good_count > 0 ? 'have' : '')">
			{{CarInfo.good_count > 0 ? '￥' + CarInfo.money : '未选购商品'}}
		</div>
		<div class="shopping-btn">￥0起送</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters: SaveListGetters } = createNamespacedHelpers('SaveList')
	export default {
		name: 'ShoppingCar',
		data() {
			return {
				anim: ''
			}
		},
		methods: {
			ShopIconAnim() {
				let anim = wx.createAnimation({
					duration: 100
				});
				anim.scale(0.8, 0.8).step().scale(1.1, 1.1).step().scale(0.8, 0.8).step().scale(1, 1).step();
				this.anim = anim.export()
				setTimeout(() => {
					this.anim = ''
				}, 400)
			}
		},
		computed: {
			CarInfo() {
				const id = 23;
				return this.ShopCarDetail(id);
			},
			...SaveListGetters(['ShopCarDetail'])
		},
		components: {},
		mounted() {
			this.$Bus.$on(this.$EmitType.ShopIconAnim, this.ShopIconAnim)
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/varibles.styl'
	.shopping-car-box
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 50px;
		z-index: 99999;
		background: #4c5053;
		.shopping-car-icon
			width: 84rpx;
			height: 84rpx;
			line-height: 84rpx;
			background: #353535;
			position: absolute;
			border-radius: 50%;
			left: 30rpx;
			bottom: 20rpx;
			text-align: center;
			border: 4px solid #444444;
			box-shadow: 0 0 10px #4c5053;
			&.car-have
				background: #457DFD;
				.iconfont
					color: #fff;
			.iconfont
				color: #5b5a5f;
				font-size: 45rpx;
		.shopping-car-number
			position: absolute;
			background: red;
			color: #fff;
			height: 30rpx;
			line-height: 30rpx;
			padding: 0 10rpx;
			bottom: 90rpx;
			left: 105rpx;
			font-size: 20rpx;
			border-radius: 15rpx;
		.shopping-product-count
			float: left;
			line-height: 100rpx;
			color: #959595;
			margin-left: 160rpx;
			&.have
				color: #fff;
		.shopping-btn
			float: right;
			width: 220rpx;
			line-height: 100rpx;
			background: #505457;
			text-align: center;
			color: #ffffff;
	.buy-btn
		position: fixed;
		right: 0;
		bottom: 0;
		width: 220rpx;
		line-height: 100rpx;
		text-align: center;
		background: #2196f3;
		color: #ffffff;
		z-index: 3101;
</style>