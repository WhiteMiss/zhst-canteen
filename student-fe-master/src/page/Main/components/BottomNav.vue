<template>
	<mu-bottom-nav :value="NavSelect" color="#fff">
		<mu-bottom-nav-item value="/main/home" title="首页" icon="home" to="/main/home"></mu-bottom-nav-item>
		<mu-bottom-nav-item value="/main/orderlist" title="订单" icon="assignment" to="/main/orderlist"></mu-bottom-nav-item>
		<mu-bottom-nav-item value="/main/shopcar" title="购物车" icon="local_grocery_store" to="/main/shopcar"></mu-bottom-nav-item>
		<mu-bottom-nav-item value="/main/user" title="我的" icon="person" to="/main/user"></mu-bottom-nav-item>
	</mu-bottom-nav>
</template>

<script>
	export default {
		name: 'BottomNav',
		data() {
			return {}
		},
		computed: {
			NavSelect() {
				return this.$route.path
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/position.styl'
	.mu-bottom-nav-item
		color: #ccc;
	.mu-bottom-nav
		blr()
		box-sizing: border-box;
		border-top: 1px solid #ccc;
		background: #2196f3;
</style>