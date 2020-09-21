<template>
	<div class="headbar-box">
		<mu-ripple class="back-icon" @click="GoBack">
			<span class="iconfont">&#xe629;</span>
		</mu-ripple>
		开箱取餐
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters: BoxInfoGetters } = createNamespacedHelpers('BoxInfo')
	export default {
		name: 'HeadBar',
		data() {
			return {}
		},
		methods: {
			GoBack() {
				this.$router.go(-1)
				// this.$router.replace(`/orderdetail/${this.BoxInfo.odbOrderSn}?tab=3`);
			}
		},
		computed: {
			BoxInfo() {
				let id = this.$route.params.boxid;
				return this.BoxDetail(id)
			},
			...BoxInfoGetters(['BoxDetail'])
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.headbar-box
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		background: $styleColor;
		color: #fff;
		font-size: .3rem;
		position: relative;
		.back-icon
			width: .8rem;
			height: 1rem;
			line-height: 1rem;
			text-align: center;
			float: left;
			position: absolute;
			left: 0;
			top: 0;
</style>