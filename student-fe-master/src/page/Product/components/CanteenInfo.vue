<template>
	<div class="canteen-info-box">
		<div class="title">食堂信息</div>
		<div class="info">食堂电话: {{CanteenInfo.phone}}</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters: SaveListGetters } = createNamespacedHelpers('SaveList')
	export default {
		name: 'CanteenInfo',
		data() {
			return {
				CanteenInfo: { phone: '' }
			}
		},
		methods: {},
		computed: {
			...SaveListGetters(['CanteenDetail'])
		},
		mounted() {
			const id = this.$route.params.canteenid;
			this.CanteenInfo = this.CanteenDetail(id)
		}
	}
</script>

<style lang="stylus" scoped>
	.canteen-info-box
		position: absolute;
		top: 4.3rem;
		left: 0;
		right: 0;
		bottom: 1rem;
		overflow: hidden;
		background: #fff;
		z-index: 2001;
		.title
			height: .7rem;
			line-height: .7rem;
			padding-left: .2rem;
			border-bottom: 1px solid #eee;
		.info
			margin-left: .5rem;
			height: .7rem;
			line-height: .7rem;
			border-bottom: 1px solid #eee;
</style>