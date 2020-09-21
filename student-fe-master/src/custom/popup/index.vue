<template>
	<div class="popup-box" v-if="open" :style="'background: rgba(0, 0, 0, ' + bgOpacity + ');'">
		<mu-scale-transition>
			<div class="popup-container inquiry-c" v-if="category == 'inquiry'" v-click-outside="clickBg" v-show="show">
				<div class="inquiry">{{title}}</div>
				<div class="btn-group">
					<mu-ripple class="btn" @click="confirm">确认</mu-ripple>
					<mu-ripple class="btn" @click="cancel">取消</mu-ripple>
				</div>
			</div>
		</mu-scale-transition>
		<mu-scale-transition>
			<div class="popup-container" v-if="category == 'toast'" v-click-outside="clickBg" v-show="show">
				<div class="toast">{{title}}</div>
			</div>
		</mu-scale-transition>
	</div>
</template>

<script>
	export default {
		name: 'popup',
		data() {
			return {
				show: false
			}
		},
		methods: {
			confirm() {
				setTimeout(() => {
					this.show = false
				}, 50)
				setTimeout(() => {
					this.$emit('update:open', false)
					this.$emit('confirm');
				}, 150)
			},
			cancel() {
				setTimeout(() => {
					this.show = false
				}, 50)
				setTimeout(() => {
					this.$emit('update:open', false)
					this.$emit('cancel');
				}, 150)
			},
			close() {
				this.show = false
				setTimeout(() => {
					this.$emit('update:open', false)
				}, 150)
			},
			clickBg() {
				if(this.clickBgClose) {
					this.close()
				}
			}
		},
		computed: {},
		props: {
			option: Object,
			title: {
				type: String,
				default: "这是一条消息"
			},
			open: Boolean,
			category: String,
			bgOpacity: {
				type: Number,
				default: 0.4
			},
			clickBgClose: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			open() {
				if(this.open) {
					switch(this.category) {
						case 'inquiry':
							setTimeout(() => {
								this.show = true
							}, 100)
							break;
						case 'toast':
							this.show = true
							setTimeout(() => {
								this.show = false
								setTimeout(() => {
									this.$emit('update:open', false)
								}, 300)
							}, 1000)
							break;
					}
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.popup-box
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000;
		z-index: 9999;
		.popup-container
			position: absolute;
			top: 50%;
			left: 50%;
			overflow: hidden;
			transform: translate(-50%,-50%);
			border-radius: 4px;
			&.inquiry-c
				width: 70%;
			.inquiry
				text-align: center;
				background: #fff;
				padding: .44rem .36rem;
				font-size: .3rem;
				letter-spacing: .02rem;
			.btn-group
				height: .9rem;
				background: #fff;
				border-top: 1px solid #ccc;
				.btn
					float: left;
					position: relative;
					width: 50%;
					line-height: .9rem;
					text-align: center;
					font-size: .28rem;
					box-sizing: border-box;
					border-right: 1px solid #ccc;
					&:nth-last-child(1)
						border: none;
			.toast
				padding: .4rem;
				background: rgba(0, 0, 0, .7);
				color: #fff;
</style>