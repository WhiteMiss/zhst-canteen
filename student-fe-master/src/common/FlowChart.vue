<template>
	<div class="flow-chart-box">
		<div class="flow-chart-contain">
			<span v-for="(item, index) in flowlist">
				<div :class="'flow-item ' + (flow >= index ? 'flow-active' : '')">
					<div class="flow-icon">
						<span :class="'iconfont ' + item.icon"></span>
					</div>
					<div class="flow-text">{{item.value}}</div>
				</div>
				<div :class="'flow-arrow ' + (flow > index ? 'flow-arrow-active' : '')" v-if="index != flowlist.length-1">
					<span class="iconfont">&#xe76c;</span>
				</div>
			</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'FlowChart',
		data() {
			return {
				flowlist: [{
					icon: 'icon-dingdan',
					value: '确认订单'
				}, {
					icon: 'icon-zhifu',
					value: '支付订单'
				}, {
					icon: 'icon-dppj',
					value: '食堂接单'
				}, {
					icon: 'icon-peisong_icon',
					value: '配送饭菜'
				}, {
					icon: 'icon-querenqucan',
					value: '扫码取餐'
				}]
			}
		},
		methods: {},
		computed: {},
		components: {},
		props: {
			flow: Number
		}
	}
</script>

<style lang="stylus" scoped>
	.flow-chart-box
		height: 1.6rem;
		background: #FCB850;
		.flow-chart-contain
			height: 1.5rem;
			width: 6.5rem;
			margin: auto;
			.flow-item
				float: left;
				width: .9rem;
				position: relative;
				height: 1.5rem;
				.flow-icon
					width: .9rem;
					line-height: .87rem;
					text-align: center;
					height: .9rem;
					border-radius: .45rem;
					border: 1px solid #666;
					margin-top: .2rem;
					.iconfont
						font-size: .4rem;
						color: #666;
				.flow-text
					position: absolute;
					font-size: .24rem;
					text-align: center;
					width: 1.1rem;
					left: -.1rem;
					margin-top: .05rem;
					color: #666;
			.flow-active
				.flow-icon
					background: #fff;
					border: 1px solid #fff;
					.iconfont
						color: #FCB850;
				.flow-text
					color: #fff;
			.flow-arrow
				float: left;
				width: .5rem;
				height: 1.5rem;
				text-align: center;
				line-height: 1.5rem;
			.flow-arrow-active
				color: #fff;
</style>