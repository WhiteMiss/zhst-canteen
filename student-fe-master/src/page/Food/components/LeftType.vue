<template>
	<div :class="'left-type-box ' + position">
		<div
			:class="'left-type-item ' + (TypeActive.type == item.type?'item-active':'')"
			v-for="item in ScrollDom"
			@click="GoToType(item)"
			:key="item.type">{{item.name}}</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: FoodState, mapGetters: FoodGetters } = createNamespacedHelpers('Food')
	export default {
		name: 'LeftType',
		methods: {
			GoToType(item) {
				window.scrollTo(0,item.top);
				// this.$Tool.pageScrollTo(item.top)
			}
		},
		computed: {
			...FoodState(['TypeActive']),
			...FoodGetters(['ScrollDom']),
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
		top: 3.3rem;
	.fixed
		position: fixed;
		top: .8rem;
		z-index: 9999;
	.left-type-box
		left: 0;
		bottom: 0;
		width: 1.6rem;
		background: #f3f3f3;
		overflow-y: scroll;
		.left-type-item
			color: #666;
			padding: .3rem .4rem .3rem .2rem;
			&.item-active
				background: #fff;
				color: #000;
</style>