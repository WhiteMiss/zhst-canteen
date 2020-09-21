<template>
	<div class="headbar-box">
		购物车
		<mu-ripple v-if="CarList.length > 0" class="edit" @click="ChangeEdit">{{editMode ? '完成': '编辑'}}</mu-ripple>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: SaveListState } = createNamespacedHelpers('SaveList')

	export default {
		name: 'HeadBar',
		methods: {
			ChangeEdit() {
				this.$emit('update:editMode', !this.editMode)
			}
		},
		props: {
			editMode: Boolean
		},
		computed: {
			...SaveListState(['CarList'])
		},
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
		.edit
			width: 1.2rem;
			position: absolute;
			top: 0;
			right: 0;
			text-align: center;
			font-size: .28rem;
</style>