<template>
	<div class="qrcode-box" @click="CloseQRCode">
		<div ref="qrcodeEl" class="QRCode-img"></div>
	</div>
</template>

<script>
	import QRCode from 'qrcodejs2'
	export default {
		name: 'QRCode',
		data() {
			return {}
		},
		methods: {
			InitQRCode () {
		      let qrcode = new QRCode(this.$refs.qrcodeEl, {
		        width: 250,
		        height: 250,
		        text: this.qrcode
		      })
		    },
		    CloseQRCode() {
		    	this.$emit('update:showQRCode', false)
		    }
		},
		props: {
			qrcode: String,
			showQRCode: Boolean
		},
		mounted() {
			this.InitQRCode()
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.qrcode-box
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255, 255, 255, .7)
		.QRCode-img
			position: absolute;
			max-width: 100%;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		.QRCode-img >>> img
			max-width: 100%;
</style>
