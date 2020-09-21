<template>
	<div class="user-order-box">
		<mu-ripple class="user-order-all" @click="GoToOrderList">
			我的订单
			<span class="iconfont icon-arrow-right-copy"></span>
			<span class="look-all-order">查看所有订单</span>
		</mu-ripple>
		<div class="user-order-type">
			<mu-ripple class="user-order-type-item" @click="OrderType(0)">待付款</mu-ripple>
			<mu-ripple class="user-order-type-item" @click="OrderType(10)">待接单</mu-ripple>
			<mu-ripple class="user-order-type-item" @click="OrderType(40)">待领取</mu-ripple>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'UserOrder',
		data() {
			return {}
		},
		methods: {
			GoToOrderList() {
				this.$router.push('/main/orderlist')
			},
			OrderType(type) {
				this.$router.push(`/ordertypelist/${type}`)
			}
		},
		computed: {}
	}
</script>

<style lang="stylus" scoped>
	.user-order-box
		background: #ffffff;
		margin-top: .3rem;
		.user-order-all
			position: relative;
			padding-left: .4rem;
			height: 1rem;
			line-height: 1rem;
			border-bottom: 1px solid #eeeeee;
			.icon-arrow-right-copy
				float: right;
				margin-right: .3rem;
			.look-all-order
				color: rgb(156, 156, 156);
				float: right;
				font-size: .25rem;
				margin-right: .2rem;
		.user-order-type
			overflow: hidden;
			.user-order-type-item
				height: .8rem;
				position: relative;
				line-height: .8rem;
				float: left;
				width: 33.3333%;
				box-sizing: border-box;
				text-align: center;
				&:before
					content: "";
					height: .4rem;
					position: absolute;
					border-left: 1px solid #cccccc;
					top: .2rem;
					right: 0;
				&:nth-last-child(1)
					&:before
						border-left: none;
</style>