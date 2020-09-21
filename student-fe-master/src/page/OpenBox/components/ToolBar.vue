<template>
	<span>
		<div class="toolbar-box">
			<div class="title">开锁取餐</div>
			<div class="open-box">
				<mu-ripple class="open-item" @click="RemoteUnlock">
					<span class="iconfont">&#xe651;</span>
					<div class="text">远程开锁</div>
				</mu-ripple>
				<mu-ripple class="open-item" @click="QRCodeUnlock">
					<span class="iconfont">&#xe609;</span>
					<div class="text">二维码开锁</div>
				</mu-ripple>
			</div>
		</div>
		<mu-scale-transition>
			<QRCode :qrcode="BoxInfo.odbQrcode" v-show="showQRCode" :showQRCode.sync="showQRCode" />
		</mu-scale-transition>
	</span>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters: BoxInfoGetters } = createNamespacedHelpers('BoxInfo')
	import Axios from 'axios'
	import qs from 'qs'
	import * as Api from '@/unit/ApiInterface'
	import Bus from '@/unit/Bus'
	import { RefreshOrderList } from '@/unit/EmitType'

	import QRCode from './QRCode'
	export default {
		name: 'ToolBar',
		data() {
			return {
				showQRCode: false
			}
		},
		methods: {
			RemoteUnlock() {
				this.$confirm('确认要开锁吗').then(() => {
					const loading = this.$loading({
						text: '开锁中'
					})
					Axios.post(Api.OPEN_UNLOCK, qs.stringify({
						qctoken: this.BoxInfo.odbQrcode
					})).then(res => {
						loading.close();
						res = res.data;
						if(res.code == 1401000) {
							this.$toast('开锁成功')
							Bus.$emit(RefreshOrderList, true);
							Axios.post(Api.CHUANGJIE, qs.stringify({
								orderSn: this.BoxInfo.odbOrderSn
							}))
							this.$router.replace(`/orderdetail/${this.BoxInfo.odbOrderSn}?tab=3`)
						} else {
							this.$toast(this.$getCode(Api.OPEN_UNLOCK, res.code))
						}
					})
				}).catch(() => {})
			},
			QRCodeUnlock() {
				this.showQRCode = true
			}
		},
		computed: {
			BoxInfo() {
				let id = this.$route.params.boxid;
				return this.BoxDetail(id)
			},
			...BoxInfoGetters(['BoxDetail'])
		},
		components: {
			QRCode
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.toolbar-box
		position: fixed;
		height: 3.6rem;
		bottom: 0;
		left: 0;
		right: 0;
		.title
			height: .6rem;
			line-height: .6rem;
			color: #666;
			background: #eee;
			padding-left: .2rem;
		.open-box
			height: 3rem;
			width: 100%;
			.open-item
				position: relative;
				text-align: center;
				float: left;
				width: 50%;
				height: 3rem;
				box-sizing: border-box;
				display: -webkit-flex
				display: flex
				flex: 1
				flex-direction: column
				justify-content: center
				align-items: center
				&:nth-child(1)
					border-right: 1px solid #eee;
				.iconfont
					font-size: 1rem;
				.text
					margin-top: -.2rem;
</style>