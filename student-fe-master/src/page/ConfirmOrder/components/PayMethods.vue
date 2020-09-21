<template>
	<div>
		<div class="pay-methods-box" @click="open = true">
			支付方式
			<span class="pay-right">
				微信支付<span class="iconfont">&#xe602;</span>
			</span>
		</div>
		<mu-bottom-sheet :open.sync="open">
			<mu-list @item-click="open = true">
				<mu-sub-header>请选择支付方式</mu-sub-header>
				<mu-list-item button>
					<mu-list-item-title>
						微信支付
						<span class="pay-tips">( 目前暂不支持其他方式 )</span>
						<span class="iconfont greenicon">&#xe687;</span>
					</mu-list-item-title>
				</mu-list-item>
			</mu-list>
		</mu-bottom-sheet>
	</div>
</template>

<script>
	export default {
		name: 'PayMethods',
		data() {
			return {
				open: false
			}
		},
		methods: {},
		computed: {}
	}
</script>

<style lang="stylus" scoped>
	.mu-sub-header
		background: #eee;
		line-height: .8rem;
		font-size: .28rem;
	.mu-list
		padding: .16rem 0 0 0;
	.pay-methods-box
		margin-top: .2rem
		height: .9rem;
		line-height: .9rem;
		padding-left: .3rem
		padding: 0 .3rem 0 .4rem;
		font-size: .3rem;
		position: relative;
		background: #fff;
		.pay-right
			float: right;
			.iconfont
				margin-left: .1rem;
	.pay-tips
		color: #ccc;
		font-size: .26rem;
	.greenicon
		float: right;
		color: #00FF3E
</style>