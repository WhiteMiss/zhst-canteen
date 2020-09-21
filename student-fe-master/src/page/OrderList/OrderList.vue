<template>
	<div class="order-list-box">
		<HeadBar />
		<List />
	</div>
</template>

<script>
	import HeadBar from './components/HeadBar'
	import List from './components/List'
	export default {
		name: 'OrderList',
		components: {
			HeadBar,
			List
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.order-list-box
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 1.12rem;
		background: #eee;
</style>