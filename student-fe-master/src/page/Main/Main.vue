<template>
	<div class="main-box">
		<router-view></router-view>
		<BottomNav />
	</div>
</template>

<script>
	import BottomNav from './components/BottomNav'
	export default {
		name: 'Main',
		data() {
			return {}
		},
		components: {
			BottomNav
		}
	}
</script>

<style lang="stylus" scoped></style>