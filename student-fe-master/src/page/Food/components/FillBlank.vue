<template>
	<div class="fill-blank-box" :style="'height: ' + FillBlankHeight + 'px'"></div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex';
	const { mapGetters: ProductGetters } = createNamespacedHelpers('Food')
	export default {
		name: 'FillBlank',
		computed: {
			...ProductGetters(['FillBlankHeight'])
		}
	}
</script>

<style lang="stylus" scoped>
	// @import '~@/assets/varibles.styl'
</style>