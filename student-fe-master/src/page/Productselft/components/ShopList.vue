<template>
	<div>
		<div class="shopping-car-list-box">
			<div class="close-bg" @click="CloseContainer"></div>
			<mu-slide-bottom-transition>
				<div class="car-container" v-show="show">
					<div class="car-title">
						已选商品
						<div class="clear-car" @click="OpenAlertDialog"><span class="iconfont">&#xe631;</span>清空</div>
					</div>
					<div class="null-item" v-if="ShopCar.length == 0">空空如也~</div>
					<div class="list-box">
						<div class="list-item" v-for="(item, index) in ShopCar">
							<div class="name-info">
								<div class="name">{{item.name}}</div>
								<div class="specs">{{item.speceName}}</div>
							</div>
							<div class="choose-number">
								<div class="choose-btn minus-btn" @click="AddMinus('minus', item.id)">
									<span class="iconfont">&#xe601;</span>
								</div>
								<div class="choose-btn number-btn">{{item.count}}</div>
								<div class="choose-btn add-btn" @click="AddMinus('add', item.id)">
									<span class="iconfont">&#xe600;</span>
								</div>
							</div>
							<div class="price">￥<span class="price-number">{{(item.price * item.count) | SolveAccuracy}}</span></div>
						</div>
						<div class="boxFee" v-if="boxFee > 0">
							餐盒
							<span class="money">￥<span>{{boxFee}}</span></span>
						</div>
					</div>
				</div>
			</mu-slide-bottom-transition>
		</div>
		<axc-popup @cancel="CloseAlertDialog" @confirm="Clear" title="确定要清空吗？" :open.sync="openAlert" category="inquiry"></axc-popup>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapMutations:ProductselftMutation,mapState:ProductselftState} = createNamespacedHelpers('Productselft')
	import { SolveAccuracy } from '@/unit/DealFun'
	export default {
		name: 'ShoppingCarList',
		data() {
			return {
				show: false,
				openAlert: false
			}
		},
		methods: {

			CloseContainer() {
				this.show = false
				setTimeout(() => {
					this.$emit('CloseEvent');
				}, 100)
			},
			OpenAlertDialog() {
				if(this.ShopCar.length != 0) {
					this.openAlert = true
				}
			},
			CloseAlertDialog() {
				this.openAlert = false
			},
			Clear() {
				this.ClearCar();
				this.openAlert = false;
			},
			AddMinus(type, id) {
				this.AddMinusCount({ type, id })
			},
			...ProductselftMutation(['ClearCar', 'AddMinusCount'])
		},
		computed: {
			boxFee(){
				let money='';
				this.ShopCar.map(item => {
					money=item.boxFee
				})
				return money
			},
			...ProductselftState(['ShopCar']),
		},
		mounted() {
			setTimeout(() => {
				this.show = true
			}, 1);
		},
		filters: {
			SolveAccuracy: value => {
				return SolveAccuracy(value, 2)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.shopping-car-list-box
		position: fixed;
		top: 1rem;
		left: 0;
		right: 0;
		bottom: 1rem;
		background: rgba(0, 0, 0, .38);
		z-index: 3050;
		.close-bg
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		.car-container
			position: absolute;
			background: #fff;
			bottom: 0;
			width: 100%;
			.car-title
				height: .8rem;
				line-height: .8rem;
				padding: 0 .4rem;
				background: #dedede;
				color: #666;
				border-bottom: 1px solid #cccccc;
				overflow: hidden;
				.clear-car
					float: right;
					.iconfont
						font-size: .28rem;
						margin-right: .05rem;
			.null-item
				height: 1.1rem;
				line-height: 1.1rem;
				text-align: center;
			.list-box
				padding-left: .3rem;
				max-height: 5rem;
				overflow: scroll;
				.list-item
					height: 1.1rem;
					border-bottom: 1px solid #ccc;
					position: relative;
					.name-info
						position: absolute;
						left: 0;
						top: 0;
						bottom: 0;
						right: 3.2rem;
						.name
							ellipsis()
							font-size: .32rem;
							margin-top: .14rem;
						.specs
							font-size: .2rem;
							color: #666;
							margin-top: -.05rem;
					.choose-number
						float: right;
						width: 1.9rem;
						margin-left: .1rem;
						overflow: hidden;
						margin-top: .35rem;
						.choose-btn
							float: left;
							border-radius: .2rem;
							border: 1px solid #2196f3;
							text-align: center;
							height: .4rem;
							width: .4rem;
							line-height: .3rem;
							&.minus-btn
								background: #fff;
								color: #2196f3;
							&.number-btn
								width: .86rem;
								background: #fff;
								text-align: center;
								border: none;
								line-height: .4rem;
							&.add-btn
								background: #2196f3;
								color: #fff;
							.iconfont
								font-size: .24rem;
					.price
						float: right;
						color: #F73E3E;
						font-size: .24rem;
						margin-top: .3rem;
						width: 1.1rem;
						.price-number
							font-size: .3rem;
				.boxFee
					height: 1.1rem;
					line-height: 1.1rem;
					.money
						width: 1.1rem;
						margin-right: 2rem;
						float: right;
						color: #F73E3E;
						font-size: .24rem;
						span
							font-size: .3rem;
</style>