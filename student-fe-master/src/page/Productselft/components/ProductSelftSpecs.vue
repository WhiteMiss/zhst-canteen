<template>
	<div class="specs-container-box" v-if="open">
		<mu-slide-bottom-transition>
			<div
			class="specs-container"
			v-show="show"
			v-click-outside="CloseContainer">
				<div class="specs-title">规格</div>
				<mu-container :fluid="true">
					<mu-row>
						<mu-col
						span="4"
						v-for="(item, key) in specsList"
						:key="'name' + item.specName"
						class="specs-name-col">
							<mu-ripple
							:class="'specs-name ' + (SpecsSelect.specName == item.specName ? 'specs-name-active' : '')"
							@click="ChooseSpecs(item)">{{item.specName}}</mu-ripple>
						</mu-col>
					</mu-row>
				</mu-container>
				<div class="specs-title">价格及库存</div>
				<div class="price-sellcount">
					<div class="price-sellcount-item">单价：{{SpecsSelect.price}}元</div>
					<div class="price-sellcount-item">餐盒费：{{SpecsSelect.boxFee}}元</div>
					<div class="price-sellcount-item">库存：{{stock}}</div>
				</div>
				<div class="specs-bottom-container">
					<div class="total-price">{{money}}</div>
					<mu-ripple class="specs-bottom-btn" @click="Choosed">选好了</mu-ripple>
					<div class="choose-number">
						<div class="choose-btn minus-btn" @click="Minus">
							<span class="iconfont">&#xe601;</span>
						</div>
						<div class="choose-btn number-btn">{{this.count}}</div>
						<div class="choose-btn add-btn" @click="Add">
							<span class="iconfont">&#xe600;</span>
						</div>
					</div>
				</div>
			</div>
		</mu-slide-bottom-transition>
	</div>
</template>

<script>
	import Bus from '@/unit/Bus'
	import { SolveAccuracy } from '@/unit/DealFun'
	import {  OpenSelftSpecs } from '@/unit/EmitType'
	import { createNamespacedHelpers } from 'vuex'
	const { mapMutations:ProductselftMutation,mapState:ProductselftState} = createNamespacedHelpers('Productselft')

	export default {
		name: 'SpecsContainer',
		data() {
			return {
				show: false,
				open: false,
				count:1,
				specsList:[{
					id: '',name:'', sellCount: '50', price: '', boxFee: '1', specName: '标配',count: 1
					},{
					id: '',name:'', sellCount: '60', price: '', boxFee: '2', specName: '大份',count:1
					}
				],
				SpecsSelect: { id:' ',name:' ', sellCount: '', price: '', boxFee: '', specName: '' ,count: 1},
				stock: 0
			}
		},
		methods: {
			...ProductselftMutation(['SaveShopCar']),
			Choosed() {
				this.SaveShopCar(this.SpecsSelect)
				this.CloseContainer()
			},
			Minus() {
				if(this.count>=2){
					this.count--
					this.SpecsSelect.count=this.count
				}
			},
			Add() {
					this.count++
					this.SpecsSelect.count=this.count

			},
			ChooseSpecs(item) {
				 this.SpecsSelect=item
			},
			OpenSelftSpecs(item) {
				console.log(item)
				this.specsList.map(items=>{
					items.name=item.name
					items.price=item.price
					items.id=item.id
				})
				this.open = true;
				setTimeout(() => {
					this.show = true;
					this.count=1
					this.SpecsSelect.count=this.count
				}, 100)
				this.SpecsSelect=this.specsList[0]
			},
			CloseContainer() {
				this.show = false
				setTimeout(() => {
					this.open = false
				}, 300)
			}

		},
		computed: {
			...ProductselftState(['ShopCar']),
			money(){

				let money=SolveAccuracy(this.SpecsSelect.count*this.SpecsSelect.price,2)
				return money

			}

		},
		watch: {


		},
		mounted() {
			Bus.$on(OpenSelftSpecs, this.OpenSelftSpecs)

		}
	}
</script>

<style lang="stylus" scoped>
	.specs-container-box
		position: fixed;
		top: 1rem;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(156, 156, 156, .5);
		z-index: 5000;
		.specs-container
			position: fixed;
			right: 0;
			left: 0;
			bottom: 0;
			background: #fff;
			.specs-title
				height: .8rem;
				line-height: .8rem;
				padding-left: .3rem;
				color: #666;
			.specs-name-col
				padding: 0 .14rem;
				margin-bottom: .3rem;
				.specs-name
					height: .66rem;
					position: relative;
					line-height: .66rem;
					text-align: center;
					background: #eee;
					border-radius: .02rem;
					&.specs-name-active
						background: #cecece;
						color: #2196f3;
			.price-sellcount
				padding: 0 .3rem;
				margin-bottom: .4rem;
				overflow: hidden;
				.price-sellcount-item
					float: left;
					width: 33.333%;
			.specs-bottom-container
				height: .8rem;
				border-top: 1px solid #2196f3;
				.total-price
					float: left;
					line-height: .8rem;
					margin-left: .3rem;
					font-size: .36rem;
					color: #EC3434;
				.choose-number
					float: right;
					overflow: hidden;
					margin-top: .2rem;
					margin-right: .2rem;
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
							width: auto;
							background: #fff;
							padding: 0 .15rem;
							margin: 0 .1rem;
							border: none;
							line-height: .4rem;
						&.add-btn
							background: #2196f3;
							color: #fff;
						.iconfont
							font-size: .24rem;
				.specs-bottom-btn
					float: right;
					line-height: .8rem;
					background: #2196f3;
					text-align: center;
					color: #fff;
					width: 2rem;
					position: relative;
</style>