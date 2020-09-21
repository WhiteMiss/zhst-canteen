<template>
	<div class="order-detail-box">
		<HeadBar />
		<TabBar :tabnum.sync="tabnum" />
		<OrderInfo v-show="tabnum == 1" />
		<OrderState v-show="tabnum == 2" />
		<OrderBox v-show="tabnum == 3" />
	</div>
</template>

<script>
	import HeadBar from './components/HeadBar'
	import TabBar from './components/TabBar'
	import OrderInfo from './components/OrderInfo'
	import OrderState from './components/OrderState'
	import OrderBox from './components/OrderBox'
	export default {
		name: 'OrderDetail',
		data() {
			return {
				tabnum: 1
			}
		},
		methods: {},
		components: {
			HeadBar,
			TabBar,
			OrderInfo,
			OrderState,
			OrderBox
		},
		mounted() {
			if(this.$route.query.tab) {
				this.tabnum = this.$route.query.tab
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
</style>