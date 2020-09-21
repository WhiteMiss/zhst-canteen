<template>
	<div class="tabbar-box">
		<div :class="'tabbar-item ' + (item.num == tabnum ? 'tabbar-active' : '')" v-for="item in list" @click="chooseTab(item.num)">{{item.value}}</div>
	</div>
</template>

<script>
	export default {
		name: 'TabBar',
		data() {
			return {
				list: [{
					num: 1,
					value: '订单详细'
				}, {
					num: 2,
					value: '订单状态'
				}, {
					num: 3,
					value: '分单领取'
				}]
			}
		},
		methods: {
			chooseTab(num) {
				this.$emit('update:tabnum', num)
			}
		},
		props: {
			tabnum: [Number, String]
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.tabbar-box
		height: .8rem;
		width: 100%;
		border-bottom: 1px solid #eee;
		.tabbar-item
			float: left;
			padding: 0 .2rem;
			height: .8rem;
			line-height: .8rem;
			color: #999;
			box-sizing: border-box;
			&.tabbar-active
				color: #000;
				border-bottom: 2px solid $styleColor;
</style>