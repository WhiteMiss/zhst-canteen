<template>
	<div class="product-list-box">
		<div class="product-list-type" v-for="item in ProductGoodList" :key="item.name">
			<div class="list-type-title" :ref="item.type">{{item.name}}</div>
			<div class="list-item" v-for="pitem in item.foods" :key="pitem.food_id">
				<div class="not-buy" v-if="pitem.buyStatus != 0">已售完</div>
				<img :src="pitem.image" class="food-icon" @click="OpenPreview(pitem.image)" />
				<div class="food-info">
					<div class="food-name">{{pitem.name}}</div>
					<div class="food-desc">{{pitem.description}}</div>
					<div class="food-rate">
						<el-rate
							v-model="pitem.rating / 20"
							:max="5"
							disabled
							text-color="#ff9900"></el-rate>
						<!-- <div class="foot-rate-number">{{pitem.rating}}</div> -->
					</div>
				</div>
				<div class="foot-money">
					￥
					<span class="foot-money-money">{{pitem.specs[0].price}}</span>
				</div>
				<div class="have-state" v-if="GetProductCount(pitem.food_id) > 0">{{GetProductCount(pitem.food_id)}}</div>
				<div class="food-add" @click="ChooseSpecs(pitem.food_id, pitem.name, pitem.specs)"><span class="iconfont">&#xe600;</span></div>
			</div>
		</div>
		<FillBlank />
	</div>
</template>

<script>
	import * as Api from '@/unit/ApiInterface'
	import Axios from 'axios'
	import qs from 'qs'
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: ProductState, mapGetters: ProductGetters, mapMutations: ProductMutations } = createNamespacedHelpers('Product')
	const { mapGetters: SaveListGetters } = createNamespacedHelpers('SaveList')
	import Bus from '@/unit/Bus'
	import { GoToBscroll, OpenSpecsContainer, OpenImgLook } from '@/unit/EmitType'

	import Bscroll from 'better-scroll'
	import FillBlank from './FillBlank.vue'
	export default {
		name: 'ProductList',
		data() {
			return {
				FixedTitle: true,
				scroll: null,
			}
		},
		methods: {
			ChooseSpecs(food_id, name, specs) {
				Bus.$emit(OpenSpecsContainer, { food_id, name, specs });
			},
			OpenPreview(image) {
				Bus.$emit(OpenImgLook, image)
			},
			...ProductMutations(['SetTypeActive'])
		},
		computed: {
			...ProductState(['TypeActive']),
			...ProductGetters(['ProductGoodList', 'ScrollDom']),
			...SaveListGetters(['GetProductCount'])
		},
		components: {
			FillBlank
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.product-list-box >>> .el-rate
		height: auto;
		float: left;
	.product-list-box >>> .el-rate__icon
		margin: 0;
		font-size: .26rem;
	.product-bscroll
		position: fixed;
		top: 4.3rem;
		left: 1.6rem;
		right: 0;
		bottom: 1rem;
		overflow: hidden;
	.product-list-box
		margin-left: 1.6rem;
		margin-top: .8rem;
		.list-type-title
			height: .6rem;
			font-size: .24rem;
			padding-left: .3rem;
			background: #F8E7D9
			line-height: .6rem;
		.list-item
			width: 100%;
			height: 2.3rem;
			position: relative;
			.not-buy
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(0, 0, 0, .7)
				z-index: 1000;
				color: #fff;
				line-height: 2.3rem;
				text-align: center;
				font-size: .35rem;
			.food-icon
				width: 1.9rem;
				height: 1.9rem;
				margin-top: .2rem;
				margin-left: .2rem;
			.food-info
				position: absolute;
				left: 2.3rem;
				top: 0;
				right: 0;
				bottom: 0;
				padding-right: .2rem;
				.food-name
					width: 100%;
					font-size: .36rem;
					margin-top: .2rem;
					ellipsis()
				.food-desc
					font-size: .2rem;
					color: #666666;
					ellipsis()
				.food-rate
					overflow: hidden;
					.foot-rate-number
						float: left;
						font-size: .24rem;
						margin-top: -.03rem;
						margin-left: .1rem;
			.foot-money
				position: absolute;
				bottom: .1rem;
				left: 2.3rem;
				color: #FB6464;
				margin-top: .14rem;
				.foot-money-money
					margin-left: -.1rem;
					font-size: .4rem;
			.have-state
				position: absolute;
				bottom: .2rem;
				right: .9rem;
				width: .5rem;
				height: .5rem;
				line-height: .5rem;
				text-align: center;
				border-radius: .25rem;
				border: 1px solid #2196f3;
				z-index: 999;
				color: #2196f3;
			.food-add
				position: absolute;
				bottom: .2rem;
				right: .2rem;
				width: .5rem;
				height: .5rem;
				line-height: .5rem;
				text-align: center;
				border-radius: .25rem;
				background: #3782FA;
				color: #fff;
				z-index: 999;
</style>