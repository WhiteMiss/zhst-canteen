<template>
	<div class="box-info-box">
		<div class="title">菜品信息</div>
		<div class="food-list">
			<div class="food-item" v-for="item in BoxInfo.orderDistributionBoxDetailFrontDTOList">
				<img :src="item.odbdProductUrl" />
				<span class="item-name">{{item.odbdPcName}}</span>
				<span class="item-money">￥{{item.odbdPsPrice}}</span>
				<span class="item-count">×{{item.odbdProductAmount}}</span>
			</div>
		</div>
		<div class="title">分箱信息</div>
		<div class="box-info-list">
			<div class="box-info-item">订单编号：{{BoxInfo.odbOrderSn}}</div>
			<div class="box-info-item">分单编号：{{BoxInfo.odbId}}</div>
			<div class="box-info-item">取餐位置：{{Address | address}}-{{BoxInfo.tcNumber}}柜{{BoxInfo.tbNumber}}箱</div>
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters: SaveListGetters } = createNamespacedHelpers('SaveList')
	const { mapGetters: BoxInfoGetters } = createNamespacedHelpers('BoxInfo')
	export default {
		name: 'BoxInfo',
		data() {
			return {}
		},
		methods: {},
		computed: {
			OrderInfo() {
				return this.OrderInfoDetail(this.BoxInfo.odbOrderSn)
			},
			Address() {
				if(this.OrderInfo != undefined) {
					return this.OrderInfo.omCiAddr;
				} else {
					return ''
				}
			},
			BoxInfo() {
				let id = this.$route.params.boxid;
				return this.BoxDetail(id)
			},
			...SaveListGetters(['OrderInfoDetail']),
			...BoxInfoGetters(['BoxDetail'])
		},
		filters: {
			address: (value) => {
				return value.replace(':', '(') + ')'
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.box-info-box
		position: absolute;
		top: 1rem;
		bottom: 3.6rem;
		left: 0;
		right: 0;
		overflow: scroll;
		.title
			height: .6rem;
			line-height: .6rem;
			color: #666;
			background: #eee;
			padding-left: .2rem;
		.food-list
			padding-left: .3rem;
			.food-item
				height: 1rem;
				position: relative;
				line-height: 1rem;
				border-bottom: 1px solid #eee;
				&:nth-last-child(1)
					border: none;
				img
					width: .6rem;
					height: .6rem;
					float: left;
					margin-top: .2rem;
				.item-name
					position: absolute;
					left: .8rem;
					top: 0;
					bottom: 0;
					right: 2.4rem;
					ellipsis()
				.item-money
					width: 1.4rem;
					height: 1rem;
					float: right;
				.item-count
					width: 1rem;
					height: 1rem;
					float: right;
		.box-info-list
			padding-left: .3rem;
			.box-info-item
				height: .8rem;
				line-height: .8rem;
				border-bottom: 1px solid #eee;
				&:nth-last-child(1)
					border: none;
</style>