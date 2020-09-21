<template>
	<div class="product-list-box">
		<div class="product-list-type" v-for="(item, key) in ProductGoodList"  :key="item.type">
			<div class="list-type-title">{{item.name}}</div>
			<div class="list-item" v-for="pitem in item.foods" :key="pitem.food_id">
				<img :src="pitem.image" class="food-icon" @click="OpenPreview(pitem.image)" />
				<div class="food-info">
					<div class="food-name">{{pitem.name}}</div>
					<div class="food-desc">{{pitem.description}}</div>
					<div class="food-rate">
						<!-- <axc-start :number="pitem.rating / 20" /> -->
						<div class="foot-rate-number">{{pitem.rating}}</div>
					</div>
				</div>
				<div class="foot-money">
					￥
					<span class="foot-money-money">{{pitem.specs[0].price}}</span>
					起
				</div>
				<span class="iconfont food-add">&#xe606;</span>
			</div>
		</div>
		<FillBlank />
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters: FoodGetters } = createNamespacedHelpers('Food')

	import FillBlank from './FillBlank.vue';
	export default {
		name: 'ProductList',
		methods: {
			OpenPreview(url) {
				let urls = [url]
				this.$Tool.previewImage([url]);
			},
		},
		computed: {
			...FoodGetters(['ProductGoodList']),
		},
		components: {
			FillBlank
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.product-list-box
		margin-left: 1.6rem;
		margin-top: .8rem;
		background: #fff;
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
			box-sizing: border-box;
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
					font-size: .32rem;
					margin-top: .2rem;
					ellipsis()
				.food-desc
					font-size: .24rem;
					color: #666666;
					ellipsis()
				.food-rate
					overflow: hidden;
					.foot-rate-number
						float: left;
						font-size: .24rem;
						margin-top: .05rem;
						margin-left: .05rem;
			.foot-money
				position: absolute;
				bottom: .2rem;
				left: 2.3rem;
				color: #FB6464;
				margin-top: .14rem;
				.foot-money-money
					margin-left: -.1rem;
					font-size: .4rem;
			.food-add
				position: absolute;
				bottom: .2rem;
				right: .3rem;
				color: $styleColor;
				z-index: 999;
				font-size: .48rem;
</style>