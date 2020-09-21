<template>
	<div class="headbar-box">
		<mu-ripple class="back-icon" @click="GoBack">
			<span class="iconfont">&#xe629;</span>
		</mu-ripple>
		<span class="title">订单分类-{{GetOrderValue}}</span>
		<mu-ripple class="my-order" @click="GoToOrderList">我的订单</mu-ripple>
	</div>
</template>

<script>
	import { GetOrderState } from '@/unit/OrderStateCode'
	export default {
		name: 'HeadBar',
		methods: {
			GoBack() {
				this.$router.go(-1)
			},
			GoToOrderList() {
				this.$router.push('/main/orderlist')
			}
		},
		computed: {
			GetOrderValue() {
				let value;
				switch (this.$route.params.state) {
					case '0':
						value = '待付款';
						break;
					case '10':
						value = '待接单';
						break;
					case '40':
						value = '待领取';
						break;
				}
				return value
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.headbar-box
		background: $styleColor;
		height: 1rem;
		line-height: 1rem;
		color: #ffffff;
		font-size: .3rem;
		position: relative;
		.back-icon
			width: .8rem;
			height: 1rem;
			line-height: 1rem;
			text-align: center;
			float: left;
			position: relative;
		.title
			position: absolute;
			top: 0;
			bottom: 0;
			left: .8rem;
			right: .5rem;
			font-size: .3rem;
			ellipsis()
		.my-order
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			padding: 0 .2rem;
</style>