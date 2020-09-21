<template>
	<div class="HandleBook">
		<Header />
		<div class="item" @click='goOrder'>
			<span class="title">点餐教程</span>
			<span class="iconfont icon-arrow-right-copy"></span>
		</div>
		<div class="item" @click='goFetch'>
			<span class="title">取餐教程</span>
			<span class="iconfont icon-arrow-right-copy"></span>
		</div>
	</div>
</template>


<script>
	import Header from './components/Header'
	export default {
		name: 'HandleBook',
		data() {
			return {
			}
		},
		components: {
			Header
		},
		methods: {
			goOrder() {
				this.$router.push('/OrderHandleBook')

			},
			goFetch() {
				this.$router.push('/FetchHandleBook')
			}
		},
	}
</script>
<style lang="stylus" scoped>
		.HandleBook
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #eee;
			.item
				margin-top: .2rem;
				width: 100%;
				height: .8rem;
				line-height: .8rem;
				background-color: white;
				flex: 1;
				border-bottom: 1px solid #ccc;
				.title
					margin-left: .3rem;
				.iconfont
					font-size: .4rem;
					position:absolute;
					right: .1rem;
</style>