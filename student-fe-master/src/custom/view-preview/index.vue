<template>
	<div class="preview-box" :class="{ show: show }" v-if="open">
		<div class="content-box" v-click-outside="Close">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'view-preview',
		data() {
			return {
				show: false
			}
		},
		methods: {
			Close() {
				this.show = false;
				setTimeout(() => {
					this.$emit('update:open', false)
				}, 300)
			}
		},
		props: {
			open: Boolean
		},
		watch: {
			open() {
				if(this.open) {
					setTimeout(() => {
						this.show = true;
					}, 100)
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.preview-box
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .3);
		transition: 0.3s;
		transform: scale(1.1, 1.1);
		opacity: 0;
		z-index: 999999;
		&.show
			opacity: 1;
			transform: scale(1, 1);
		.content-box
			background: #fff;
			top: 50%;
			left: 50%;
			position: fixed;
			transform: translate(-50%, -50%);
			z-index: 999999;
			box-shadow: 1px 1px 40px rgba(0,0,0,.2);
</style>