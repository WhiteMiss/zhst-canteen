<template>
	<div class="product-scroll" ref="wrapper">
		<div class="content">
			<div :class="'item ' + (ActiveLeftType==item.name ? 'active' :'') " v-for="item in GetType"
				@click="skipTitle(item.name)">
				{{item.name}}
			</div>
		</div>
	</div>
</template>

<script>
	import Bus from '@/unit/Bus'
	import { skip } from '@/unit/EmitType'
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters:ProductSelftGetter,mapState:ProductselftState } = createNamespacedHelpers('Productselft')
	import BScroll from 'better-scroll'
	export default {
		name: 'HeadBar',
		mounted() {
			this.scroll = new BScroll(this.$refs.wrapper, {
				click: true,
				tap: true,
				probeType: 3,
				bounce: {
					top: false,
					bottom: false
				}
			})
		},
		methods: {
			skipTitle(name){
				let top=this.ScrollDom.find(item=>item.name===name).top
				Bus.$emit(skip,top)
			}
		},
		computed:{
			...ProductselftState(['ActiveLeftType']),
			...ProductSelftGetter(['GetType','GetBscrollTop','ScrollDom'])
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.product-scroll
		left:0;
		top:1.8rem
		width: 1.4rem
		height: 14rem;
		background: #eee;
		.content
			height:auto;
			.item
				border-bottom:.01rem solid  #fff
				width: 1.4rem;
				text-align: center;
				height: .8rem;
				line-height: .8rem
				&.active
					background: #fff;
				


</style>