<template>
	<div class="null-box">
		<div class="text">
			<div class="text-value">
				<span class="iconfont">&#xe6e3;</span> 饭堂都打烊啦
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'NullCanteen',
		data() {
			return {}
		},
		methods: {},
		computed: {},
		components: {}
	}
</script>

<style lang="stylus" scoped>
	.null-box
		position: absolute;
		top: 2.9rem;
		left: 0;
		right: 0;
		bottom: 1.12rem;
		overflow: hidden;
		z-index: 300;
		.text
			height: 100%;
			position: relative;
			.text-value
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				font-size: .4rem;
				.iconfont
					font-size: .4rem;
</style>