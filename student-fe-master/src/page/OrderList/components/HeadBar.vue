<template>
	<div class="headbar-box" @click="GoToTop">
		我的订单
		<!-- <div class="recovery-btn" @click.stop="GoToRecoveryList">
			<span class="iconfont">&#xe60a;</span>
		</div> -->
	</div>
</template>

<script>
	import Bus from '@/unit/Bus'
	import { BscrollToTop } from '@/unit/EmitType'
	export default {
		name: 'HeadBar',
		data() {
			return {
				count: 0
			}
		},
		methods: {
			GoToTop() {
				this.count++
				setTimeout(() => {
					if (this.count === 2) {
						Bus.$emit(BscrollToTop)
					}
					this.count = 0
				}, 300)
			},
			GoToRecoveryList() {
				this.$router.push('/recoverylist')
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.headbar-box
		height: 1rem;
		line-height: 1rem;
		color: #fff;
		text-align: center;
		font-size: .32rem;
		background: $styleColor;
		position: relative;
		.recovery-btn
			width: 1rem;
			height: 1rem;
			line-height: 1rem;
			text-align: center;
			position: absolute;
			right: 0;
			top: 0;
			.iconfont
				font-size: .32rem;
</style>