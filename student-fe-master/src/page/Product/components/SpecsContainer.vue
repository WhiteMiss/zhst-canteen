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
						v-for="(item, key) in ProductSpecsInfo.specs"
						:key="'name' + item.id"
						class="specs-name-col">
							<mu-ripple
							:class="'specs-name ' + (SpecsSelect.id == item.id ? 'specs-name-active' : '')"
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
					<div class="total-price">￥{{TotalPrice}}元</div>
					<mu-ripple class="specs-bottom-btn" @click="Choosed">选好了</mu-ripple>
					<div class="choose-number">
						<div class="choose-btn minus-btn" @click="Minus">
							<span class="iconfont">&#xe601;</span>
						</div>
						<div class="choose-btn number-btn">{{number}}</div>
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
	import { createNamespacedHelpers as createHelper } from 'vuex'
	const { mapState: SaveListState, mapGetters: SaveListGetters, mapMutations: SaveListMutations } = createHelper('SaveList')
	import Bus from '@/unit/Bus'
	import { SolveAccuracy } from '@/unit/DealFun'
	import { OpenSpecsContainer } from '@/unit/EmitType'
	import Axios from 'axios'
	import * as Api from '@/unit/ApiInterface'

	export default {
		name: 'SpecsContainer',
		data() {
			return {
				show: false,
				open: false,
				number: 1,
				CanteenInfo: {},
				ProductSpecsInfo: {},
				SpecsSelect: { id: '', sellCount: '', price: '', boxFee: '', specName: '' },
				stock: 0
			}
		},
		methods: {
			OpenSpecsContainer(info) {
				const canteenid = this.$route.params.canteenid;
				this.ProductSpecsInfo = info;
				this.SpecsSelect = info.specs[0];
				this.CanteenInfo = this.CanteenDetail(canteenid);
				this.open = true;
				setTimeout(() => {
					this.show = true;
				}, 100)
			},
			GetStock() {
				Axios.get(Api.PRODUCTS_GETSTOCK + `?list=${this.SpecsSelect.id}`).then(res => {
					res = res.data;
					this.stock = res.data.psStock;
				})
			},
			CloseContainer() {
				this.show = false
				setTimeout(() => {
					this.number = 1;
					this.open = false
				}, 300)
			},
			Minus() {
				if(this.number > 1) {
					this.number--
				}
			},
			Add() {
				if(this.number >= 6) {
					this.$toast('最多只能添加6件商品')
				} else {
					this.number++;
				}
			},
			ChooseSpecs(info) {
				this.SpecsSelect = info
			},
			Choosed() {
				// 加入购物车
				const M = 99999;

				let { CarList, ProductSpecsInfo, SpecsSelect, number } = this;
				console.log(ProductSpecsInfo)
				if(number > 6) {
					this.$toast('最多只能添加6件商品');
					return;
				}

				// 选取规格后的菜品ID拼接规格ID
				const thisid = ProductSpecsInfo.food_id + '_' + SpecsSelect.id;
				// 组建商品信息
				const goodsItem = {
					thisid,
					food_id: ProductSpecsInfo.food_id,
					name: ProductSpecsInfo.name,
					count: number,
					specs: SpecsSelect.id,
					specsname: SpecsSelect.specName,
					boxFee: SpecsSelect.boxFee,
					price: SpecsSelect.price
				};

				const CarIndex = CarList.indexOf(CarList.filter(item => item.restaurant_id == this.CanteenInfo.restaurant_id )[0])
				if(CarIndex == -1) {
					// 当购物车不存在当前食堂的情况下，创建当前食堂的购物车并添加商品
					CarList = [...CarList, {
						restaurant_id: this.CanteenInfo.restaurant_id,
						name: this.CanteenInfo.name,
						distPrice: this.CanteenInfo.distributionFee,
						goods: [goodsItem]
					}]
				} else {
					// 当购物车存在当前食堂情况下，添加当前食堂的购物车商品
					if(this.ShopCarCount(this.CanteenInfo.restaurant_id) == 6) {
						this.$toast('最多只能添加6件商品');
						return;
					} else if(this.ShopCarCount(this.CanteenInfo.restaurant_id) + number > 6) {
						this.$toast('最多只能添加6件商品');
						return;
					}



					const ThisidIndex = CarList[CarIndex].goods.indexOf(CarList[CarIndex].goods.filter(item => item.thisid == thisid )[0]);
					if(ThisidIndex == -1) {
						// 购物车存在当前食堂不存在当前菜品的规格下，添加菜品规格到购物车
						CarList[CarIndex].goods = [...CarList[CarIndex].goods, goodsItem]
					} else {
						// 购物车存在当前食堂存在当前菜品的规格下，当前食堂的菜品数累加添加数量
						let n = CarList[CarIndex].goods[ThisidIndex].count + number;
						CarList[CarIndex].goods[ThisidIndex].count = n;
					}
				}
				this.ChangeCarList(CarList);
				this.CloseContainer();
			},
			...SaveListMutations(['ChangeCarList'])
		},
		computed: {
			TotalPrice() {
				return SolveAccuracy((this.SpecsSelect.price + this.SpecsSelect.boxFee) * this.number, 2);
			},
			...SaveListState(['CarList']),
			...SaveListGetters(['CanteenDetail', 'ShopCarCount'])
		},
		watch: {
			SpecsSelect() {
				this.GetStock()
			}
		},
		mounted() {
			Bus.$on(OpenSpecsContainer, this.OpenSpecsContainer)
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