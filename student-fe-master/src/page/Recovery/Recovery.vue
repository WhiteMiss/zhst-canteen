<template>
	<div class="Recovery-box">
		<HeadBar />
		<Tip />
		<LossTip ref="loss" />
	</div>
</template>

<script>
	import HeadBar from './components/HeadBar.vue'
	import Tip from './components/Tip.vue'
	import LossTip from './components/LossTip.vue'

	import { GetToken } from '@/unit/DealFun'
	import * as Api from '@/unit/ApiInterface'
	export default {
		name: 'Recovery',
		data() {
			return {
				websock: null
			}
		},
		methods: {
			websocketonopen() {
				console.log('success')
			},
			websocketonerror() {
				console.log('erro')
			},
			websocketonmessage(e) {
				let res = JSON.parse(e.data)
				if(res.code !== undefined && res.code == 1) {
					this.$toast(`回收成功,待归还数量:${res.count}`)
					this.$refs.loss.RefreshNum(res.count, res.counted)
				} else {
					this.$toast('回收失败')
				}
			},
			websocketclose() {
				console.log('close')
			}
		},
		computed: {},
		components: {
			HeadBar,
			Tip,
			LossTip
		},
		mounted() {
			const wsuri = Api.WEBSTOCKET_URL + GetToken();
			// const wsuri = 'ws://zhst.hrzhst.com/recycling/ws/myWebSocket/' + GetToken();
			this.websock = new WebSocket(wsuri);
			this.websock.onopen = this.websocketonopen;
			this.websock.onerror = this.websocketonerror;
			this.websock.onmessage = this.websocketonmessage;
			this.websock.onclose = this.websocketclose;
		},
		beforeRouteLeave(to, from, next) {
			this.websock.onmessage = null
			next()
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.Recovery-box
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #f2f2f2;
		padding: 1rem .2rem .3rem;
		overflow-y: scroll;
</style>