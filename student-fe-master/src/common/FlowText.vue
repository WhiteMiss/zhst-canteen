<template>
	<div class="flow-text-box">{{text}}</div>
</template>

<script>
	export default {
		name: 'FlowText',
		data() {
			return {}
		},
		methods: {},
		computed: {},
		components: {},
		props: {
			text: String
		}
	}
</script>

<style lang="stylus" scoped>
	.flow-text-box
		height: 1.1rem;
		background-image: url('~@/assets/image/flow.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		text-align: center;
		line-height: 1rem;
		color: #999;
		font-size: .3rem;
</style>