<template>
	<mu-paper class="info-paper" :z-depth="1">
		<div class="info-title">订单详细</div>
		<div class="info-detail">
			<mu-ripple class="canteen-img-name" @click="GoToCanteen(OrderInfo.canteenId)">
				<img :src="OrderInfo.canteenPicture" />
				{{OrderInfo.canteenName}}
				<span class="iconfont">&#xe602;</span>
			</mu-ripple>
			<div v-for="item in OrderInfo.orderDetailDTOList">
				<mu-ripple class="food-item">
					<div class="food-name">{{item.pcName}} - {{item.piName}}</div>
					<div class="food-money">￥{{item.price * item.amount}}</div>
					<div class="food-count">×{{item.amount}}</div>
				</mu-ripple>
			</div>
			<mu-ripple class="food-item">
				<div class="food-name">餐盒费</div>
				<div class="food-money">￥{{OrderInfo.omLunchBoxFree}}</div>
				<div class="food-count">×{{BoxLength(OrderInfo.orderDetailDTOList)}}</div>
			</mu-ripple>
			<mu-ripple class="food-item">
				<div class="food-name">配送费</div>
				<div class="food-money">￥{{OrderInfo.omShoppingMoney}}</div>
			</mu-ripple>
			<div class="order-money">实付 ￥{{OrderInfo.omPaymentMoney}}</div>
		</div>
	</mu-paper>
</template>

<script>
	export default {
		name: 'DetailInfo',
		data() {
			return {}
		},
		methods: {
			GoToCanteen(id) {
				this.$router.push(`/product/${id}`)
			},
			BoxLength(list) {
				let count = 0;
				list.map(item => {
					count += item.amount
				})
				return count;
			}
		},
		props: {
			OrderInfo: Object
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.info-paper
		margin-bottom: .2rem;
		.info-title
			height: .8rem;
			line-height: .8rem;
			padding-left: .26rem;
			border-bottom: 1px solid #ccc;
		.info-detail
			padding: 0 .3rem;
			.canteen-img-name
				height: 1rem;
				line-height: 1rem;
				position: relative;
				border-bottom: 1px solid #ccc;
				position: relative;
				img
					height: .6rem;
					width: .6rem;
					margin-right: .1rem;
				.iconfont
					height: 1rem;
					line-height: 1rem;
					position: absolute;
					right: 0;
					top: 0;
			.food-item
				height: .9rem;
				line-height: .9rem;
				position: relative;
				border-bottom: 1px solid #ccc;
				.food-name
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					right: 1.7rem;
					ellipsis()
				.food-money
					position: absolute;
					width: 1rem;
					text-align: right;
					top: 0;
					right: .2rem;
					ellipsis()
				.food-count
					position: absolute;
					width: .5rem;
					top: 0;
					right: 1.2rem;
			.order-money
				height: 1rem;
				line-height: 1rem;
				text-align: right;
				padding-right: .2rem;
</style>