<template>
	<div class="order-box">
		<HeadBar />
		<ChooseAddress />
		<PayMethods />
		<OrderList />
		<ConfirmBottom />
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters: SaveListGetters } = createNamespacedHelpers('SaveList')

	import HeadBar from './components/HeadBar'
	import ChooseAddress from './components/ChooseAddress'
	import PayMethods from './components/PayMethods'
	import OrderList from './components/OrderList'
	import ConfirmBottom from './components/ConfirmBottom'
	export default {
		name: 'ConfirmOrder',
		data() {
			return {}
		},
		components: {
			HeadBar,
			ChooseAddress,
			PayMethods,
			OrderList,
			ConfirmBottom
		},
		computed: {
			...SaveListGetters(['OrderDetail'])
		},
		activated() {
			let id = this.$route.params.id;
			if(!this.OrderDetail(id)) {
				this.$router.replace('/lawlessopen')
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/position.styl'
	.order-box
		tlrb()
		z-index: 100;
		overflow-y: scroll;
		background: #eeeeee;
</style>