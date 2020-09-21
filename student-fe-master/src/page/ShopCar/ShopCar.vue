<template>
	<div class="shop-car-box">
		<HeadBar :editMode.sync="editMode" />
		<CarList :editMode.sync="editMode" />
	</div>
</template>

<script>
	import HeadBar from './components/HeadBar'
	import CarList from './components/CarList'
	export default {
		name: 'ShopCar',
		data() {
			return {
				editMode: false
			}
		},
		methods: {},
		computed: {},
		components: {
			HeadBar,
			CarList
		},
		activated() {
			this.editMode = false
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
</style>