<template>
	<div :class="'tab-bar-box ' + position">
		<div
		:class="'tab-bar-item '+(index == tab ? 'itemActive' : '')"
		v-for="(item, index) in BarList"
		:key="item"
		@click="Choose(index, item)">
			{{item}}
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters: ProductGetters } = createNamespacedHelpers('Product')
	import Bus from '@/unit/Bus'
	import { GoToBscroll } from '@/unit/EmitType'
	export default {
		name: 'TabBar',
		data() {
			return {
				BarList: ['点餐', '商家'],
			}
		},
		methods: {
			Choose(index, type) {
				if(index != 0) {
					// console.log(index)
					let { name, type } = this.ScrollDom[0]
					Bus.$emit(GoToBscroll, { name, type, top: 0, time: 1 });
				}
				// if (index == 1) {
				// 	this.$router.push('/productselft')
				// 	return
				// }
				this.$emit('update:tab', index);
			}
		},computed: {
			...ProductGetters(['ScrollDom']),
		},
		props: {
			tab: Number,
			position: {
				type: String,
				default: 'absolute'
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.absolute
		position: absolute;
		top: 2.5rem;
	.fixed
		position: fixed;
		top: 1rem;
		z-index: 3000;
	.tab-bar-box
		height: .8rem;
		background: #fff;
		overflow: hidden;
		width: 100%;
		box-sizing: border-box;
		border-bottom: 1px solid #cccccc;
		.tab-bar-item
			float: left;
			width: 50%;
			text-align: center;
			line-height: .8rem;
			height: .8rem;
			color: rgb(156, 156, 156);
			position: relative;
			&:nth-child(-n+1)
				&::before
					content: '';
					position: absolute;
					border-right: 1px solid #ccc;
					height: .4rem;
					top: .2rem;
					right: 0;
			&.itemActive
				color: #000000;
</style>