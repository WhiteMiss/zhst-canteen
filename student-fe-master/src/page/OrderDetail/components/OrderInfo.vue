<template>
	<div class="order-info-box">
		<DetailInfo :OrderInfo="OrderInfo" />
		<AddressInfo :OrderInfo="OrderInfo" />
		<IdentInfo :OrderInfo="OrderInfo" />
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters: SaveListGetters } = createNamespacedHelpers('SaveList')

	import DetailInfo from './OrderInfo/DetailInfo'
	import AddressInfo from './OrderInfo/AddressInfo'
	import IdentInfo from './OrderInfo/IdentInfo'
	export default {
		name: 'OrderInfo',
		data() {
			return {}
		},
		methods: {},
		computed: {
			OrderInfo() {
				if(this.$route.params.state){
					let id = this.$route.params.orderid;
					console.log(this.GetTypeOrderList(id))
					return this.GetTypeOrderList(id)
				}
				else{
					let id = this.$route.params.orderid;
					return this.OrderInfoDetail(id)
				}
			},
			...SaveListGetters(['OrderInfoDetail']),
			...SaveListGetters(['GetTypeOrderList'])
		},
		components: {
			DetailInfo,
			AddressInfo,
			IdentInfo
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.order-info-box
		position: fixed;
		top: 1.8rem;
		bottom: 0;
		left: 0;
		right: 0;
		overflow-y: scroll;
		background: #f2f2f2;
		padding: .2rem;
</style>