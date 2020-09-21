<template>
	<div class="product-scroll" ref="wrapper">
		<div class="content">
			<span :class="'item' +(ActiveTaocan == item.id ? 'active' : '' )" 
			v-for="item in ProductSelft" @click="choseSelft(item)" :key="item.id">
				{{item.name}}
			</span>
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: ProductselftState, mapMutations: ProductselftMutations } = createNamespacedHelpers('Productselft')
	import BScroll from 'better-scroll'
	export default {
		name: 'selftlist',
		methods: {
			choseSelft(item){
				if(this.ShopCar.length>0){

					this.$confirm('更改自选套餐后，会清空购物车的菜品，还要继续吗').then(() => {
						this.ClearCar()
					}).catch(() => {})
				}
				else{
				console.log(item.type[0].name)
				this.SetLeftType(item.type[0].name)
				this.SaveActiveTaocan(item.id)
				}
			},
			...ProductselftMutations(['SaveActiveTaocan','SetLeftType','ClearCar'])
		},
		async mounted() {

			this.scroll = new BScroll(this.$refs.wrapper, {
				scrollX: true,
			})
		},
		computed: {
			...ProductselftState(['ProductSelft','ActiveTaocan','ActiveLeftType','ShopCar'])
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.product-scroll
		top:1rem;
		height: .8rem;
		width: 100%;
		background: #eee;
		.content
			height:.8rem;
			white-space: nowrap;
			display: inline-block;
			.item
				display: inline-block;
				background: #eee;
				width: 1.5rem;
				text-align: center;
				height: .8rem;
				line-height: .8rem
				&active
					display: inline-block;
					width: 1.5rem;
					text-align: center;
					height: .8rem;
					line-height: .8rem
					border-bottom:.01rem solid #409eff;
					color: #000;

</style>