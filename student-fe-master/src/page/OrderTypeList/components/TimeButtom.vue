<template>
	<span>
		<mu-ripple class="order-buttom-box" v-if="btnState" @click.stop="GotoPay">支付( 还剩{{timeInfo.minute}}分{{timeInfo.second}}秒 )</mu-ripple>
		<div class="order-buttom-box" v-if="!btnState">支付超时</div>
	</span>
</template>

<script>
	export default {
		name: 'OrderButtom',
		data() {
			return {
				timeInterval: null,
				time: 300,
				btnState: true
			}
		},
		methods: {
			InitInterval() {
				if(this.timeDiff > 0) {
					if(this.severTime != 0) {
						this.time = this.timeDiff;
						this.timeInterval = setInterval(() => {
							this.time -= 1;
							if(this.time == 0) {
								clearInterval(this.timeInterval)
								this.btnState = false
							}
						}, 1000)
					} else {
						setTimeout(this.InitInterval, 100)
					}
				} else {
					this.btnState = false
				}
			},
			GotoPay() {
				this.$router.replace(`/payment/${this.orderinfo.omOrderSn}/${this.orderinfo.omPaymentMoney}/${this.time}?createtime=${this.orderinfo.omCreateTime}`)
			}
		},
		computed: {
			timeDiff() {
				let createtime = new Date(this.orderinfo.omCreateTime).valueOf();
				return 300 - ((this.severTime - createtime) / 1000)
			},
			timeInfo() {
				let minute = parseInt(this.time / 60);
				let second = parseInt(this.time % 60);
				return { minute, second };
			}
		},
		mounted() {
			this.InitInterval()
		},
		props: {
			severTime: Number,
			orderinfo: Object
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.order-buttom-box
		position: relative;
		float: right;
		padding: .07rem .2rem;
		border: 1px solid #576EF8;
		font-size: .24rem;
		margin-top: .24rem;
		color: #576EF8;
		border-radius: 3px;
		margin-left: .2rem;
</style>