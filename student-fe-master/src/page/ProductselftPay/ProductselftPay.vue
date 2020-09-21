<template>
	<div class="content">
		<HeadBar />
		<div v-if="FoodSelft.length>0">
			<div class="taocan" v-for="(item,index) in FoodSelft">
				<div class="title">{{title}}</div>
				<div class="food" v-for="items in item.foodlist ">
					<span class="food-name">{{items.name}}-{{items.speceName}}</span>
					<span class="price">￥ {{items.price}}</span>
					<span class="count">数量 * {{items.count}}</span>
				</div>
				<div class="totalPrice">
					<span class="number">总价：{{item.totalPrice}}</span>
					<mu-ripple class="btnOrder" @click="Order(index)">下单</mu-ripple>
					<div class="btncount">
						<span class="iconfont minus" @click="minus(index)">&#xe601;</span>
						<span class="food-number">{{item.number}}</span>
						<span class="iconfont add" @click="add(index)">&#xe600;</span>
					</div>
					

				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapMutations:ProductselftMutation,mapState:ProductselftState} = createNamespacedHelpers('Productselft')
	import HeadBar from './components/header'
	export default{
		name:'ProductselftPay',
		data() {
			return{
				title:"自选餐"
			}
		},
		components: {
			HeadBar
		},

		methods: {
			...ProductselftMutation(['SaveFoodSelft','addNumberFoodSelft','minusNumberFoodSelft']),
			add(index) {
				this.addNumberFoodSelft(index)
			},
			minus(index) {
				this.minusNumberFoodSelft(index)
			},
			Order(index) {
				
			}
		},
		computed: {
			...ProductselftState(['Shopcar','FoodSelft']),
		},
		mounted() {
			
		},
	}
	

</script>

<style lang="stylus" scoped="">
	.content
		position:absolute;
		top:0;
		left:0;
		right:0;
		bottom:0;
		background:#eee
		.taocan
			width:98%
			height:auto
			margin:auto
			background:#fff;
			margin-top: .2rem
			.totalPrice
				height: 0.8rem;
				line-height: 0.8rem;
				padding-left: .3rem ;
				.btnOrder
					float: right;
					margin-top: .13rem
					height: .5rem
					line-height: .5rem;
					background: #2196f3;
					text-align: center;
					color: #fff;
					width: 1.5rem;
					position: relative;
				.btncount
					float:right;
					.iconfont
						font-size: .3rem;
						border-radius: 4rem;
						border: 1px solid #2196f3;
						text-align: center;
						background: #2196f3;
						color: #fff;
						&.add
							margin-left:.1rem
							margin-right:.5rem
						&.minus
							margin-right:.1rem
						
			
			.food
				height: 0.8rem;
				line-height: 0.8rem;
				padding-left: .4rem ;
				border-bottom:1px solid #eee;
				.price
					position:absolute
					right: 2.5rem
				.count
					position:absolute
					right: .4rem
			.title
				width:100%
				height: 0.8rem;
				line-height: 0.8rem;
				text-align:center;
				border-bottom:1px solid #eee;
</style>