<template>
	<div class="sort-item-box" v-if="open">
		<mu-slide-bottom-transition>
			<div class="sort-item-content" v-show="show" v-click-outside="CloseSortItem">
				<div
				:class="'sort-item ' + (item.value == SortSelect.value ? 'sort-active' : '')"
				v-for="item in SortItemList"
				@click="SelectSort(item)"
				:key="item.value">
					{{item.value}}
					<span class="iconfont">&#xe605;</span>
				</div>
			</div>
		</mu-slide-bottom-transition>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: SaveListState, mapMutations: SaveListMutations } = createNamespacedHelpers('SaveList')
	import { CanteenSort } from '@/unit/CanteenSort'
	export default {
		name: 'SortItem',
		data() {
			return {
				show: false,
				SortItemList: [{
					type: 'distributionFee',
					value: '配送费低',
					desc: false
				}, {
					type: 'rating',
					value: '评分最高',
					desc: true
				}, {
					type: 'sellCount',
					value: '销量最高',
					desc: true
				}],
			}
		},
		methods: {
			CloseSortItem() {
				this.show = false;
				setTimeout(() => {
					this.$emit('update:open', false)
				}, 300)
			},
			SelectSort(item) {
				this.$emit('update:SortSelect', item)
				let list = [...this.CanteenList];
				list = CanteenSort(list, item.type, item.desc)
				this.SaveCanteenList(list);
				this.CloseSortItem();
			},
			...SaveListMutations(['SaveCanteenList'])
		},
		computed: {
			...SaveListState(['CanteenList'])
		},
		props: {
			open: Boolean,
			SortSelect: Object
		},
		watch: {
			open() {
				if(this.open) {
					setTimeout(() => {
						this.show = true
					}, 100)
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.sort-item-box
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 1.12rem;
		z-index: 3000;
		background: rgba(156, 156, 156, .5);
		overflow: hidden;
		.sort-item-content
			background: #ffffff;
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			transition: 0.3s;
			.sort-item
				line-height: 1rem;
				padding: 0 .3rem;
				.iconfont
					float: right;
					font-size: .36rem;
			.sort-active
				color: #2196f3;
</style>