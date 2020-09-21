<template>
	<span>
		<mu-ripple class="choose-address-box" @click="changeAddress">
			<span v-if="!choose">请选择收货地址</span>
			<span v-if="choose">
				{{chooseAddress.caShoppingName}}
				<span class="phone">({{chooseAddress.caTele}})</span>
				<span class="address">{{chooseAddress.caStoreyName}}{{chooseAddress.caStorey}}</span>
			</span>
			<span class="iconfont">&#xe602;</span>
		</mu-ripple>
	</span>
</template>

<script>
	import Bus from '@/unit/Bus'
	import { ChooseAddress, ResetAddress } from '@/unit/EmitType'

	export default {
		name: 'ChooseAddress',
		data() {
			return {
				chooseAddress: { caShoppingName:'', caTele:'', caStoreyName:'', caStorey:'' },
				choose: false
			}
		},
		methods: {
			changeAddress() {
				this.$router.push('/address')
			}
		},
		mounted() {
			Bus.$on(ChooseAddress, (info) => {
				if(info.caId) {
					this.chooseAddress = info;
					this.choose = true
				} else {
					this.chooseAddress = { caShoppingName:'', caTele:'', caStoreyName:'', caStorey:'' };
					this.choose = false
				}
			});
			Bus.$on(ResetAddress, () => {
				this.address = {};
				this.choose = false
			});
		}
	}
</script>

<style lang="stylus" scoped>
	.choose-address-box
		height: 1rem;
		line-height: 1rem;
		background: #fff;
		margin-top: .2rem;
		padding: 0 .3rem 0 .4rem;
		font-size: .32rem;
		position: relative;
		border-bottom: 1px solid #eeeeee;
		.phone
			color: #666;
			font-size: .24rem;
			margin-right: .1rem;
		.address
			font-size: .24rem;
		.iconfont
			float: right;
</style>