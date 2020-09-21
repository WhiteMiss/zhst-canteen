<template>
	<div class="order-list-box">
		<div class="list-item" v-for="(item, key) in orderInfo.goods" :key="key">
			<span class="name">{{item.specsname}}-{{item.name}}</span>
			<span class="money">￥{{(item.count*item.price) | SolveAccuracy}}</span>
			<span class="count">×{{item.count}}</span>
		</div>
		<div class="list-item">
			餐盒费
			<span class="money">￥{{orderInfo.boxInfo.money}}</span>
			<span class="count">×{{orderInfo.boxInfo.count}}</span>
		</div>
		<div class="list-item">
			配送费
			<span class="money">￥{{orderInfo.distPrice}}</span>
		</div>
		<div class="real-pay">
			实付费￥{{orderInfo.realPay}}
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters: SaveListGetters } = createNamespacedHelpers('SaveList')
	import { SolveAccuracy } from '@/unit/DealFun'
	export default {
		name: 'OrderList',
		data() {
			return {
				orderInfo: { name:'', realPay: 0, distPrice: 0, goods: [], boxInfo: { count: 0, money: 0 } }
			}
		},
		computed: {
			...SaveListGetters(['OrderDetail'])
		},
		activated() {
			const id = this.$route.params.id;
			if(this.OrderDetail(id)) {
				this.orderInfo = this.OrderDetail(id)
			}
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
	.order-list-box
		margin-top: .2rem;
		background: #fff;
		padding-left: .4rem;
		.list-item
			height: .9rem;
			position: relative;
			line-height: .9rem;
			border-bottom: 1px solid #eeeeee;
			.name
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 2.1rem;
				ellipsis()
			.money
				float: right;
				width: 1.3rem;
				display: block;
			.count
				width: .8rem;
				float: right;
				display: block;
		.real-pay
			text-align: right;
			padding-right: .5rem;
			line-height: .9rem;
			color: #FF0000;
</style>