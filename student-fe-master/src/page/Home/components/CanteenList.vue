<template>
	<div class="canteen-list-box">
		<mu-ripple
		class="canteen-list-item"
		v-for="(item, key) in CanteenList"
		@click="GoToProduct(item.restaurant_id)"
		:key="key">
			<div class="item-canteen-info">
				<div class="item-canteen-head">
					<img class="head-pic" :src="item.avatar" />
				</div>
				<div class="item-canteen-text">
					<div class="canteen-name"><b>{{item.name}}</b></div>
					<div class="canteen-star">
						<el-rate
							v-model="item.rating"
							:max="5"
							disabled
							text-color="#ff9900"></el-rate>
						<span class="star-text">{{item.rating}}</span>
						<span class="mount-count">月售{{item.sellCount}}单</span>
					</div>
					<div class="canteen-distribution">配送费￥{{item.distributionFee}}</div>
				</div>
			</div>
			<div class="item-admin-info">
				<span class="iconfont">&#xe63a;</span>
				食堂管理员电话：{{item.phone}}
			</div>
		</mu-ripple>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: SaveListState } = createNamespacedHelpers('SaveList')
	export default {
		name: 'CanteenList',
		data() {
			return {}
		},
		methods: {
			GoToProduct(id) {
				this.$router.push(`/product/${id}`);
			}
		},
		computed: {
			...SaveListState(['CanteenList'])
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~@/assets/styles/varibles.styl"
	.canteen-list-box >>> .el-rate
		height: auto;
		float: left;
	.canteen-list-box >>> .el-rate__icon
		margin: 0;
		font-size: .26rem;
	.canteen-list-box
		background: #fff;
		.canteen-list-item
			padding: 0 .3rem;
			position: relative;
			border-bottom: 1px solid #ccc;
			.item-canteen-info
				height: 1.7rem;
				border-bottom: 1px solid #ccc;
				position: relative;
				.item-canteen-head
					width: 1.3rem;
					height: 1.3rem;
					float: left;
					margin-top: .2rem;
					.head-pic
						width: 100%;
						height: 100%;
				.item-canteen-text
					position: absolute;
					top: 0;
					left: 1.3rem;
					right: 0;
					bottom: 0;
					padding-left: .24rem;
					padding-top: .2rem;
					box-sizing: border-box;
					.canteen-name
						font-size: .33rem;
						width: 100%;
						margin-bottom: .1rem;
						ellipsis()
					.canteen-star
						overflow: hidden;
						.star-text
							font-size: .24rem;
							margin-top: -.02rem;
							margin-left: .1rem;
							color: #ff9900;
							float: left;
						.mount-count
							float: left;
							font-size: .24rem;
							color: #666666;
							margin-top: -.02rem;
							margin-left: .1rem;
					.canteen-distribution
						font-size: .24rem;
						margin-top: .05rem;
			.item-admin-info
				line-height: .6rem;
				font-size: .22rem;
				.iconfont
					color: #1296db;
					font-size: .26rem;
</style>