<template>
	<div class="user-headbar-box">
		<mu-icon value="person" class="head-left-icon"></mu-icon>
		<span class="user-head-bar-title">我的</span>
		<!-- <mu-menu placement="bottom-end" open-on-hover :open.sync="open">
			<mu-button icon @click="open = !open">
				<mu-icon value="more_vert"></mu-icon>
			</mu-button>
			<mu-list slot="content">
				<mu-list-item button>
					<mu-list-item-title>Head Item 1</mu-list-item-title>
				</mu-list-item>
				<mu-list-item button>
					<mu-list-item-title>Head Item 2</mu-list-item-title>
				</mu-list-item>
				<mu-list-item button>
					<mu-list-item-title>Head Item 3</mu-list-item-title>
				</mu-list-item>
			</mu-list>
		</mu-menu> -->
	</div>
</template>

<script>
	export default {
		name: 'HeadBar',
		data() {
			return {
				open: false
			}
		},
		methods: {},
		computed: {}
	}
</script>

<style lang="stylus" scoped>
	.user-headbar-box >>> .mu-menu
		float: right;
	.user-headbar-box
		background: #2196f3;
		height: 1rem;
		line-height: 1rem;
		color: #ffffff;
		font-size: .3rem;
		padding-left: .4rem;
		.head-left-icon
			float: left;
			display: block;
			line-height: 1rem;
			margin-right: .1rem;
			font-size: .4rem;
		.mu-head-bar-title
			float: left;
</style>