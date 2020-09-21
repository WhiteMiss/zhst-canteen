<template>
	<div class="search-box">
		<div class="search-input" v-loading="loading" data-mu-loading-size="24">
			<!-- <span class="iconfont">&#xe60d;</span>
			搜索饭堂、菜品名称 -->
			当前时间段：{{NowTime}}
			<div class="refresh" @click="RefreshModeTime">
				<span class="iconfont">&#xe63e;</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: SaveListState, mapActions: SaveListActions } = createNamespacedHelpers('SaveList')
	import { GetTime } from '@/unit/DealFun'
	import moment from 'moment/moment'
	export default {
		name: 'Search',
		data() {
			return {
				loading: false
			}
		},
		methods: {
			async RefreshModeTime() {
				await (this.loading = true)
				await this.GetModeTime()
				await setTimeout(() => {
					this.loading = false
				}, 500)
			},
			...SaveListActions(['GetModeTime'])
		},
		computed: {
			NowTime() {
				let value = '休息中';
				this.ModelTime.map(item => {
					let formatString = 'HH:mm';
					if(GetTime(moment(item.startTime).format(formatString), moment(item.endTime).format(formatString))) {
						value = item.modeName.replace('模式', '时间')
					}
				});
				return value;
			},
			...SaveListState(['ModelTime'])
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.search-box
		background: $styleColor;
		padding: .2rem .3rem;
		.search-input
			width: 100%;
			height: .7rem;
			overflow: hidden;
			background: #ffffff;
			border-radius: .35rem;
			text-align: center;
			line-height: .7rem;
			color: #666;
			position: relative;
			.refresh
				width: .5rem;
				height: .5rem;
				line-height: .5rem;
				text-align: center;
				position: absolute;
				top: .1rem;
				right: .1rem;
				color: #666;
				border-radius: .25rem;
				.iconfont
					font-size: .32rem;
</style>