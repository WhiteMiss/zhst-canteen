<template>
	<div>
		<div class="user-list-box">
			<mu-ripple class="user-list-item" v-for="item in list" :key="item.title" @click="GoRouter(item.type)">
				<div class="item-left">
					<span class="iconfont" :style="'color: ' + item.iconColor" v-html="item.icon"></span>
				</div>
				<div class="item-right">
					{{item.title}}
					<span class="iconfont icon-arrow-right-copy"></span>
				</div>
			</mu-ripple>
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapMutations: SaveListMutations } = createNamespacedHelpers('SaveList')
	import Axios from 'axios';
	import qs from 'qs';
	import * as Api from '@/unit/ApiInterface';
	import { GetToken } from '@/unit/DealFun';

	export default {
		name: 'UserList',
		data() {
			return {
				list: [{
					icon: "&#xe604;",
					iconColor: "orange",
					title: "我的信息",
					type: "user"
				}, {
					icon: "&#xe622;",
					iconColor: "blue",
					title: "收货地址",
					type: "address"
				}, {
				// 	icon: "&#xe665;",
				// 	iconColor: "gray",
				// 	title: "查看时间段",
				// 	type: "time"
				// }, {
					icon: "&#xe652;",
					iconColor: "peru",
					title: "修改密码",
					type: "changepsw"
				// }, {
				// 	icon: "&#xe649;",
				// 	iconColor: "#E5C129",
				// 	title: "联系客服",
				// 	type: "customer"
				}, {
					icon: "&#xe64f;",
					iconColor: "gray",
					title: "解除绑定",
					type: "unbind"
				}]
			}
		},
		methods: {
			GoRouter(type) {
				switch(type) {
					case 'user':
						this.GotoUserInfo()
						break;
					case 'unbind':
						this.UnBind()
						break;
					case 'address':
						this.GoAddress()
						break;
					case 'changepsw':
						this.$router.push('/changepsw')
						break;
					case 'time':
						this.$router.push('/timelook')
						break;
					case 'customer':
						this.Customer()
				}
			},
			GotoUserInfo() {
				this.$router.push('/userinfo')
			},
			GoAddress() {
				this.$router.push('/address')
			},
			Customer() {
				this.$toast('此功能暂未开放')
			},
			UnBind() {
				this.$confirm('确认解除绑定吗?').then(() => {
					let loading = this.$loading()
					Axios.post(Api.UNBIND_USER, qs.stringify({
						'Token': GetToken()
					})).then((res) => {
						res = res.data;
						loading.close();
						if(res.code == 1001005) {
							this.ClearSaveList();
							this.$router.push('/');
							this.$toast('解除绑定成功', {
								durtaion: 200
							})
						} else {
							this.$toast(this.$getCode(Api.UNBIND_USER, res.code))
						}
					})
				}).catch(() => {})
			},
			...SaveListMutations(['ClearSaveList'])
		}
	}
</script>

<style lang="stylus" scoped>
	.user-list-box
		margin-top: .3rem;
		background: #ffffff;
		.user-list-item
			height: 1rem;
			line-height: 1rem;
			display: flex;
			position: relative;
			.item-left
				width: 1rem;
				height: 1rem;
				float: left;
				text-align: center;
				.iconfont
					font-size: .4rem;
			.item-right
				flex: 1;
				border-bottom: 1px solid #ccc;
				.icon-arrow-right-copy
					float: right;
					margin-right: .3rem;
			&:nth-last-child(1)
				.item-right
					border-bottom: none;
</style>