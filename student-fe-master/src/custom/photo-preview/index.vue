<template>
	<div class="photo-preview-box" v-if="open" :style="bgStyle">
		<mu-scale-transition>
			<img :src="image" v-show="show" class="image" :style="imgStyle" v-click-outside="close" @click="enlarge" />
		</mu-scale-transition>
	</div>
</template>

<script>
	export default {
		name: 'photo-preview',
		data() {
			return {
				show: false,
				clickCount: 0,
				imgWdith: 70
			}
		},
		methods: {
			close() {
				this.show = false
				setTimeout(() => {
					this.$emit('update:open', false)
				}, 150)
			},
			enlarge() {
				this.clickCount++;
				setTimeout(() => {
					if (this.clickCount === 2) {
						this.imgWdith == 70 ? this.imgWdith = 100 : this.imgWdith = 70
					}
					this.clickCount = 0
				}, 300)
			}
		},
		computed: {
			bgStyle() {
				return {
					background: "rgba(0, 0, 0, " + this.bgOpacity + ")"
				}
			},
			imgStyle() {
				return {
					width: this.imgWdith + "%"
				}
			}
		},
		props: {
			open: Boolean,
			bgOpacity: {
				type: Number,
				default: 0.4
			},
			image: String
		},
		watch: {
			open() {
				if(this.open) {
					setTimeout(() => {
						this.show = true
					}, 100)
				} else {
					this.imgWdith = 70
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.photo-preview-box
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 5000;
		.image
			position: absolute;
			top: 50%;
			left: 50%;
			transition: 0.3s;
			transform: translate(-50%,-50%);
</style>