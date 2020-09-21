<template>
	<div>
		<mu-ripple class="user-info-box" @click="GotoUserInfo">
			<img :src="UserInfo.headimgurl" class="user-info-head" />
			<div class="user-info-text">
				<div class="user-info-name">{{UserInfo.uickname}}</div>
				<div class="user-info-phone">{{UserInfo.usernum}}</div>
			</div>
			<div class="iconfont">&#xe602;</div>
		</mu-ripple>
		<mu-ripple class="user-info-course" @click="GoToTime">
			<span class="iconfont icon-chakantiezishijian"></span>
			<span class="course-title">查看时间段</span>
			<span class="iconfont icon-arrow-right-copy"></span>
		</mu-ripple>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: SaveListState } = createNamespacedHelpers('SaveList')
	export default {
		name: 'UserInfo',
		data() {
			return {}
		},
		methods: {
			GotoUserInfo() {
				this.$router.push('/userinfo')
			},
			GoToTime() {
				this.$router.push('/timelook')
			}
		},
		computed: {
			...SaveListState(['UserInfo'])
		}
	}
</script>

<style lang="stylus" scoped>
	.user-info-box
		position: relative;
		height: 2.2rem;
		background: #2196f3;
		padding-top: .2rem;
		padding-left: .5rem;
		.user-info-head
			float: left;
			overflow: hidden;
			width: 1.6rem;
			height: 1.6rem;
			margin-top: .1rem;;
			border: 3px solid white;
			border-radius: .1rem;
		.user-info-text
			float: left;
			padding-left: .4rem;
			margin-top: .2rem;
			.user-info-name
				color: #ffffff;
				font-size: .46rem;
			.user-info-phone
				color: #cccccc;
				margin-top: .2rem;
		.iconfont
			float: right;
			margin-right: .3rem;
			color: #ffffff;
			line-height: 1.7rem;
	.user-info-course
		height: 1rem;
		position: relative;
		background: #ffffff;
		line-height: 1rem;
		.icon-chakantiezishijian
			font-size: .34rem;
			float: left;
			color: orange;
			display: block;
			width: 1rem;
			text-align: center;
		.course-title
			font-size: .3rem;
			float: left;
		.icon-arrow-right-copy
			float: right;
			margin-right: .3rem;
</style>