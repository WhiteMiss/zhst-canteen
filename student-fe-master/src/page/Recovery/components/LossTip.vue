<template>
	<span>
		<mu-ripple class="LossTip-box" @click="show = true">找回二维码</mu-ripple>
		<mu-slide-top-transition>
			<div style="overflow: hidden" v-show="show">
				<div class="catch-text">请核对订单号</div>
				<div class="order-id">订单编号：{{orId}}</div>
				<div class="order-id" v-if="getState">待归还餐具数量：{{num}}</div>
				<div class="order-id" v-if="getState">已归还餐具数量：{{numed}}</div>
				<div ref="qrcodeEl" v-if="getState" class="QRCode-img"></div>
				<mu-ripple class="btn-confirm" v-if="!getState" @click="GetInfo">确认</mu-ripple>
				<mu-ripple class="btn-return" v-if="!getState" @click="GoBack">返回</mu-ripple>
			</div>
		</mu-slide-top-transition>
	</span>
</template>

<script>
	import Axios from 'axios';
	import * as Api from '@/unit/ApiInterface'
	import QRCode from 'qrcodejs2'
	export default {
		name: 'LossTip',
		data() {
			return {
				show: false,
				getState: false,
				loading: null,
				num: 0,
				numed: 0
			}
		},
		methods: {
			GoBack() {
				this.$router.go(-1)
			},
			InitQRCode (text) {
		      let qrcode = new QRCode(this.$refs.qrcodeEl, {
		        width: 200,
		        height: 200,
		        text
		      })
		    },
		    GetInfo() {
		    	this.loading = this.$loading({
		    		overlayColor: "hsla(0,0%,100%,.5)"
		    	});
		    	Axios.get(`${Api.GET_RECPVERY_CODE}?orderSn=${this.$route.params.id}`).then(res => {
		    		res = res.data;
		    		this.loading.close();
		    		if(res.code == 0) {
		    			this.getState = true;
		    			setTimeout(() => {
		    				this.num = res.data.riRecoveryNum
		    				this.numed = res.data.riRecoveryEd
		    				this.InitQRCode(res.data.riQrcode);
		    			}, 100)
		    		} else {
		    			this.$toast(this.$getCode(Api.GET_RECPVERY_CODE, res.code))
		    		}
		    	})
		    },
		    RefreshNum(num, numed) {
		    	if(this.getState) {
		    		this.num = num
		    		this.numed = numed
		    	}
		    }
		},
		computed: {
			orId() {
				return this.$route.params.id
			}
		},
	}
</script>

<style lang="stylus" scoped>
	.LossTip-box
		height: .8rem;
		line-height: .8rem;
		text-align: center;
		color: #fff;
		font-size: .26rem;
		background: #2196f3;
		border-radius: .1rem;
		position: relative;
	.catch-text
		text-align: center;
		color: #666;
		margin: .2rem 0 .15rem;
	.order-id
		background: #fff;
		padding: .1rem .15rem;
		border: 1px solid #ccc;
		margin-bottom: .2rem;
	.btn-confirm
		position: relative;
		float: left;
		width: 2.5rem;
		height: .7rem;
		line-height: .7rem;
		background: #2196f3;
		text-align: center;
		border-radius: .1rem;
		color: #fff;
		margin-top: .2rem;
		margin-left: .2rem;
		max-width: 40%;
	.btn-return
		max-width: 40%;
		position: relative;
		float: right;
		margin-top: .2rem;
		margin-right: .2rem;
		width: 2.5rem;
		height: .7rem;
		line-height: .7rem;
		background: #fff;
		border: 1px solid #ccc;
		box-sizing: border-box;
		text-align: center;
		border-radius: .1rem;
	.QRCode-img
		text-align: center;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		margin-bottom: .3rem;
</style>