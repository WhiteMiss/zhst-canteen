<template>
	<div id="app">
		<!-- <transition :name="transitionName"> -->
			<keep-alive exclude="Product,OrderDetail,OpenBox,PaySuccess,Payment,ChangePsw,OrderTypeList,Evaluate,Recovery,RecoveryList">
				<router-view />
			</keep-alive>
		<!-- </transition> -->
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapActions: SaveListActions } = createNamespacedHelpers('SaveList')
	import Axios from 'axios'
	import qs from 'qs'
	import * as Api from '@/unit/ApiInterface'
	import { GetToken } from './unit/DealFun.js'
	import { version } from '@/unit/Version'

	export default {
		name: 'App',
		methods: {
			GetLoginInfo() {
				Axios.get(`${Api.LOGIN_BIND_CHECK}?Token=${GetToken()}`).then(res => {
					res = res.data;
					if(res.code == 1001006) {
						localStorage.setItem(version, GetToken())
					} else if(res == 1001007) {
						localStorage.removeItem(version);
					}
				})
			},
			...SaveListActions(['GetModeTime'])
		},
		created() {
			// this.GetLoginInfo()
			// console.log(this.$route)
			// this.$rouer.replace(this.toRoute)
			// 首次打开时验证是否已保存token(绑定标志)，并验证token合法性，若合法则跳首页，不合法则跳登录页面
			// 防止恶意直接打开某个页面
			// const rout = ['/', '/lawlessopen'];
			// if(!rout.indexOf(this.$route.fullPath)) {
			// 	return;
			// }
			// if(localStorage.getItem("token")) {
			// 	Axios.post(Api.CHECK_TOKEN, qs.stringify({
			// 		Token: localStorage.getItem("token")
			// 	})).then(res => {
			// 		res = res.data;
			// 		if(res.code == 1001000) {
			// 			this.$router.replace('/main/home')
			// 		}
			// 	})
			// } else {
			// 	this.$router.replace('/')
			// }
		},
		mounted() {
			this.GetModeTime()
		}
	}
</script>

<style lang="stylus" scoped>
	#app
		position: fixed;
		top: 0;
		width: 100%;
		bottom: 0;
		overflow: hidden;
		// overflow-y: scroll;
</style>
