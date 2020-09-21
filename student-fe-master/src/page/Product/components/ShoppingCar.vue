<template>
	<div>
		<div class="shopping-car-box" @click="showList=!showList">
			<div :class="'shopping-car-icon ' + (CarInfo.good_count > 0 ? 'car-have' : '')">
				<span class="iconfont">&#xe603;</span>
			</div>
			<div class="shopping-car-number" v-if="CarInfo.good_count > 0">{{CarInfo.good_count}}</div>
			<div :class="'shopping-product-count ' + (CarInfo.good_count > 0 ? 'have' : '')">
				{{CarInfo.good_count > 0 ? '￥' + CarInfo.money : '未选购商品'}}
			</div>
			<div class="shopping-btn">￥0起送</div>
		</div>
		<mu-ripple class="shopping-btn buy-btn" v-if="CarInfo.good_count > 0" @click="Settlement">去结算</mu-ripple>
		<ShoppingCarList v-if="showList" @CloseEvent="CloseCar" />
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters: SaveListGetters } = createNamespacedHelpers('SaveList')
	import ShoppingCarList from './ShoppingCarList'
	import Bus from '@/unit/Bus'
	import { ResetAddress } from '@/unit/EmitType'
	export default {
		name: 'ShoppingCar',
		data() {
			return {
				showList: false
			}
		},
		methods: {
			CloseCar() {
				console.log("bb")
				this.showList = false;
			},
			Settlement() {
				Bus.$emit(ResetAddress)
				this.$router.push(`/confirmorder/${this.$route.params.canteenid}`);
			}
		},
		computed: {
			CarInfo() {
				const id = this.$route.params.canteenid;
				return this.ShopCarDetail(id);
			},
			...SaveListGetters(['ShopCarDetail'])
		},
		components: {
			ShoppingCarList
		},
	}
</script>

<style lang="stylus" scoped>
	.shopping-car-box
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1rem;
		z-index: 3100;
		background: #4c5053;
		.shopping-car-icon
			width: 1rem;
			height: 1rem;
			line-height: .85rem;
			background: #353535;
			position: absolute;
			border-radius: .5rem;
			left: .3rem;
			bottom: .2rem;
			text-align: center;
			border: 4px solid #444444;
			&.car-have
				background: #457DFD;
				.iconfont
					color: #fff;
			.iconfont
				color: #5b5a5f;
				font-size: .45rem;
		.shopping-car-number
			position: absolute;
			background: red;
			color: #fff;
			height: .3rem;
			line-height: .3rem;
			padding: 0 .1rem;
			bottom: .9rem;
			left: 1.05rem;
			font-size: .2rem;
			border-radius: .15rem;
		.shopping-product-count
			float: left;
			line-height: 1rem;
			color: #959595;
			margin-left: 1.6rem;
			&.have
				color: #fff;
		.shopping-btn
			float: right;
			width: 2.2rem;
			line-height: 1rem;
			background: #505457;
			text-align: center;
			color: #ffffff;
	.buy-btn
		position: fixed;
		right: 0;
		bottom: 0;
		width: 2.2rem;
		line-height: 1rem;
		text-align: center;
		background: #2196f3;
		color: #ffffff;
		z-index: 3101;
</style>