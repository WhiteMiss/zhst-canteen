<template>
	<div class="sort-screen-box">
		<mu-container>
			<mu-row>
				<mu-col span="3" @click="OpenItem">
					<div class="sort-screen-item sort-screen-item-acitve">
						所有排序
						<span class="iconfont sort-icon">&#xe63d;</span>
					</div>
				</mu-col>
				<mu-col span="3">
					<div
					:class="'sort-screen-item ' + (SortSelect.value == '销量最高' ? 'sort-screen-item-acitve' : '')"
					@click="Choose(0)">销量最高</div>
				</mu-col>
				<mu-col span="3">
					<div
					:class="'sort-screen-item ' + (SortSelect.value == '配送费低' ? 'sort-screen-item-acitve' : '')"
					@click="Choose(1)">配送费低</div>
				</mu-col>
				<mu-col span="3">
					<div
					:class="'sort-screen-item ' + (SortSelect.value == '评分最高' ? 'sort-screen-item-acitve' : '')"
					@click="Choose(2)">评分最高</div>
				</mu-col>
				<!-- <mu-col span="3" @click="screen">
					<div class="sort-screen-item">
						筛选
						<span class="iconfont screen-icon">&#xe66a;</span>
					</div>
				</mu-col> -->
			</mu-row>
		</mu-container>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: SaveListState, mapMutations: SaveListMutations } = createNamespacedHelpers('SaveList')
	import { CanteenSort } from '@/unit/CanteenSort'
	export default {
		name: 'SortScreen',
		data() {
			return {}
		},
		methods: {
			OpenItem() {
				this.$emit('update:itemOpen', true)
			},
			screen() {
				this.$toast('此功能暂未开放')
			},
			Choose(index) {
				let list = [...this.CanteenList];
				if(index == 0) {
					list = CanteenSort(list, 'sellCount', true);
					this.$emit('update:SortSelect', {
						type: 'sellCount',
						value: '销量最高',
						desc: true
					});
				} else if(index == 1){
					list = CanteenSort(list, 'distributionFee', false);
					this.$emit('update:SortSelect', {
						type: 'distributionFee',
						value: '配送费低',
						desc: false
					});
				} else {
					list = CanteenSort(list, 'rating', true);
					this.$emit('update:SortSelect', {
						type: 'rating',
						value: '评分最高',
						desc: true
					});
				}
				this.SaveCanteenList(list);
			},
			...SaveListMutations(['SaveCanteenList'])
		},
		computed: {
			...SaveListState(['CanteenList'])
		},
		props: {
			itemOpen: Boolean,
			SortSelect: Object
		}
	}
</script>

<style lang="stylus" scoped>
	.sort-screen-box >>> .container
		padding: 0;
	.sort-screen-box
		background: #ffffff;
		height: .8rem;
		border-bottom: 1px solid #ccc;
		.sort-screen-item
			line-height: .8rem;
			text-align: center;
			color: rgb(156, 156, 156);
			&.sort-screen-item-acitve
				color: #000000;
			.sort-icon
				font-size: .2rem;
				margin-left: -.06rem;
			.screen-icon
				font-size: .25rem;
				margin-left: -.06rem;
</style>