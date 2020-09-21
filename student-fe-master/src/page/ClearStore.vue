<template>
	<div class="CleareStore-box">
		<div class="add" @click="AddToken">插入当前token</div>
		<div class="add" @click="ClearToken">仅清除浏览器缓存</div>
		<div class="add" @click="Customer">清除浏览器缓存并发送解绑请求</div>
		<div>{{WeiXinOpen}}</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapMutations: SaveListMutations } = createNamespacedHelpers('SaveList')
	import Axios from 'axios';
	import qs from 'qs';
	import * as Api from '@/unit/ApiInterface';
	import { GetToken } from '@/unit/DealFun';
	import { version } from '@/unit/Version'
	export default {
		name: 'CleareStore',
		data() {
			return {}
		},
		methods: {
			AddToken() {
				localStorage.setItem(version, GetToken())
			},
			ClearToken() {
				this.ClearSaveList();
			},
			Customer() {
				Axios.post(Api.UNBIND_USER, qs.stringify({
					'Token': GetToken()
				})).then((res) => {})
				this.ClearSaveList();
			},
			...SaveListMutations(['ClearSaveList'])
		},
		computed: {
			WeiXinOpen() {
				var ua = navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i)=="micromessenger") {
					return '是';
				} else {
					return '不是';
				}
			}
		},
		components: {}
	}
</script>

<style lang="stylus" scoped>
	.add
		width: 2rem;
		height: 2rem;
		background: red;
		color: #fff;
		margin-bottom: .5rem;
</style>