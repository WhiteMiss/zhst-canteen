<template>
	<div class="UserInfo-box">
		<HeadBar />
		<div class="user-info-list">
			<div class="content">
				<div class="head-item">
					头像
					<img :src="UserInfo.headimgurl" />
				</div>
				<div class="user-item">
					学号
					<span>{{UserInfo.usernum}}</span>
				</div>
				<div class="user-item">
					姓名
					<span>{{UserInfo.uickname}}</span>
				</div>
				<div class="user-item">
					性别
					<span>{{UserInfo.sex}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: SaveListState } = createNamespacedHelpers('SaveList')
	import HeadBar from './components/HeadBar'
	export default {
		name: 'UserInfo',
		data() {
			return {}
		},
		methods: {},
		computed: {
			...SaveListState(['UserInfo'])
		},
		components: {
			HeadBar
		}
	}
</script>

<style lang="stylus" scoped>
	.user-info-list
		position: absolute;
		top: 1rem;
		left: 0;
		right: 0;
		bottom: 0;
		background: #eee;
		overflow: scroll;
		padding: .4rem 0;
		.content
			background: #fff;
			padding: 0 .36rem;
			.head-item
				height: 1.7rem;
				line-height: 1.7rem;
				border-bottom: 1px solid #eee;
				img
					width: 1.4rem;
					height: 1.4rem;
					float: right;
					margin-top: .15rem;
			.user-item
				height: 1rem;
				line-height: 1rem;
				border-bottom: 1px solid #eee;
				&:last-child
					border: none;
				span
					float: right;
</style>