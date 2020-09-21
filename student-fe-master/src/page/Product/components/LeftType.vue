<template>
	<div :class="'left-type-box ' + position">
		<mu-ripple
			:class="'left-type-item ' + (TypeActive.type == item.type?'item-active':'')"
			v-for="item in ScrollDom"
			@click="LeftTypeClick(item)"
			:key="item.type">{{item.name}}</mu-ripple>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: ProductState, mapGetters: ProductGetters } = createNamespacedHelpers('Product')
	import Bus from '@/unit/Bus'
	import { GoToBscroll } from '@/unit/EmitType'

	export default {
		name: 'LeftType',
		data() {
			return {}
		},
		methods: {
			LeftTypeClick(item) {
				console.log(item)
				Bus.$emit(GoToBscroll, item)
			}
		},
		computed: {
			...ProductState(['TypeActive']),
			...ProductGetters(['ProductTypeList', 'ScrollDom']),
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
	.absolute
		position: absolute;
		top: 3.3rem;
		bottom: 0;
	.fixed
		position: fixed;
		top: 1.8rem;
		bottom: 1rem;
	.left-type-box
		left: 0;
		background: #f3f3f3;
		width: 1.6rem;
		overflow-y: scroll;
		z-index: 3000;
		.left-type-item
			color: #666;
			position: relative;
			padding: .3rem .4rem .3rem .2rem;
			&.item-active
				background: #fff;
				color: #000;
</style>