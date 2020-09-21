<template>
	<div class="NullFood-box">
		<div class="text">
			<div class="value">
				<img src="@/assets/image/mygod.png" /> 没有菜品呀
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'NullFood',
		data() {
			return {}
		},
		methods: {},
		computed: {},
		components: {}
	}
</script>

<style lang="stylus" scoped>
	.NullFood-box
		position: fixed;
		top: 4.3rem;
		left: 0;
		right: 0;
		bottom: 1rem;
		overflow: hidden;
		background: #fff;
		z-index: 2001;
		.text
			height: 100%;
			position: relative;
			.value
				position: absolute;
				height: 1rem;
				line-height: 1rem;
				top: 50%;
				left: 50%;
				font-size: .35rem;
				transform: translate(-50%, -50%);
				img
					width: 1rem;
					height: 1rem;
					float: left;
					margin-right: .2rem;
</style>