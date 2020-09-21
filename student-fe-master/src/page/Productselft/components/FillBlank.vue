<template>
	<div class="fill-blank-box" :style="'height: ' + FillBlankHeight + 'px'"></div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex';
	const { mapGetters: ProductSelftGetters } = createNamespacedHelpers('Productselft')
	export default {
		name: 'FillBlank',
		computed: {
			...ProductSelftGetters(['FillBlankHeight'])
		}
	}
</script>

<style lang="stylus" scoped>
	// @import '~@/assets/varibles.styl'
</style>