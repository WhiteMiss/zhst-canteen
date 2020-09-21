<template>
	<div>
		<div class="shopping-car-box" @click="showList=!showList">
			<div :class="'shopping-car-icon ' + (ShopCar.length > 0 ? 'car-have' : '')">
				<span class="iconfont">&#xe603;</span>
			</div>

			<div class="shopping-car-number" v-if="ShopCar.length > 0">{{ShopCar.length}}</div>
			<div :class="'shopping-product-count ' + (ShopCar.length > 0 ? 'have' : '')">
				{{ShopCar.length > 0 ? '￥' + Money : '未选购商品'}}
			</div>
			<div class="shopping-btn">￥0起送</div>
		</div>
		<mu-ripple class="shopping-btn buy-btn"  @click="Settlement">生成套餐</mu-ripple>
		<ShopList v-if="showList" @CloseEvent="CloseCar" />
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapMutations:ProductselftMutation,mapState:ProductselftState} = createNamespacedHelpers('Productselft')
	import Bus from '@/unit/Bus'
	import { SolveAccuracy } from '@/unit/DealFun'
	import { ResetAddress } from '@/unit/EmitType'
	import ShopList from './ShopList'
	export default {
		name: 'ShoppingCar',
		data() {
			return {
				showList: false
			}
		},
		methods: {
			...ProductselftMutation(['SaveFoodSelft','ClearCar']),
			CloseCar() {
				this.showList = false;
			},
			Settlement() {
				if(this.ShopCar.length<1){
					this.$toast('未选择菜品，无法生成套餐', 500);
				}
				else{
					console.log(this.ShopCar)
					this.SaveFoodSelft(this.Money)
					this.ClearCar()
					this.$router.push('/ProductselftPay')
				}

			}
		},
		computed: {
			...ProductselftState(['ShopCar']),
			Money(){
				let money='';
				this.ShopCar.map(item => {
					money=SolveAccuracy(item.count*item.price+money,2)
				})
				return money
			}

		},
		mounted(){
			console.log(this.ShopCar.length)
		},
		components: {
			ShopList
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