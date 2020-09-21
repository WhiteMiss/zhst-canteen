<template>
	<div :class="'tab-bars-box ' + position">
		<div
		v-for="(item, key) in BarList"
		:class="'tab-bar-item ' + (TabBarActive == key ? 'active' : '')"
		:key="key">
			{{item.value}}
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex';
	const { mapState: FoodState, mapMutations: FoodMutations } = createNamespacedHelpers('Food')
	export default {
		name: 'TabBars',
		data() {
			return {
				BarList: [{
					value: '菜品'
				}, {
					value: '商家'
				}]
			}
		},
		methods: {
			...FoodMutations(['SelectTabBarActive'])
		},
		computed: {
			...FoodState(['TabBarActive'])
		},
		props: {
			position: {
				type: String,
				default: 'absolute'
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.absolute
		position: absolute;
		top: 2.5rem;
	.fixed
		position: fixed;
		top: 0;
		z-index: 9999;
	.tab-bars-box
		height: .8rem;
		width: 100%;
		background: #fff;
		overflow: hidden;
		box-sizing: border-box;
		border-bottom: 1px solid #cccccc;
		.tab-bar-item
			width: 50%;
			height: .8rem;
			text-align: center;
			line-height: .8rem
			position: relative;
			float: left;
			color: rgb(156, 156, 156);
			&:nth-child(1)
				&::before
					content: '';
					position: absolute;
					border-right: 1px solid #ccc;
					height: .4rem;
					top: .2rem;
					right: 0;
			&.active
				color: #000000;
</style>