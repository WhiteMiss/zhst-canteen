<template>
	<div class="open-box-box">
		<HeadBar />
		<BoxInfo />
		<ToolBar />
	</div>
</template>

<script>
	import HeadBar from './components/HeadBar'
	import BoxInfo from './components/BoxInfo'
	import ToolBar from './components/ToolBar'
	export default {
		name: 'OpenBox',
		data() {
			return {}
		},
		methods: {},
		components: {
			HeadBar,
			BoxInfo,
			ToolBar
		},
		beforeRouteEnter(to, from, next) {
			if(from.name != 'OrderDetail') {
				next('/main/orderlist')
			} else {
				next();
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
</style>