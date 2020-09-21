<template>
	<div class="login-page">
		<div class="login-logo">
			<img :src="headImg" class="logo" v-if="headImg != ''" alt="logo">
		</div>
		<div class="input-box">
			<div class="input-item">
				<label class="input-icon">
					<span class="iconfont">&#xe639;</span>
				</label>
				<div class="input-text">
					<input type="text" class="input-field" placeholder="请输入帐号" v-model="stuno" />
				</div>
			</div>
			<div class="input-item">
				<label class="input-icon">
					<span class="iconfont">&#xe652;</span>
				</label>
				<div class="input-text">
					<input type="password" class="input-field" placeholder="请输入密码" v-model="psw" />
				</div>
			</div>
		</div>
		<div class="login-btn">
			<mu-button full-width color="primary" @click="btnClick">登录</mu-button>
		</div>
	</div>
</template>

<script>
	import * as Api from '@/unit/ApiInterface'
	import Axios from 'axios'
	import qs from 'qs'
	import { GetToken } from '@/unit/DealFun'
	import { version } from '@/unit/Version'
	export default {
		name: "Logo",
		data() {
			return {
				headImg: '',
				stuno: '',
				psw: '',
				token: ''
			}
		},
		methods: {
			btnClick() {
				// 账号与密码的正则验证
				let noreg = /^[0-9]{1,11}$/;
				let pswreg = /^[a-zA-Z0-9]{4,18}$/;
				const toastOpt = { time: 500 };
				if(this.stuno == '') {
					this.$toasts.error('请输入账号', toastOpt);
					return;
				} else if(this.psw == '') {
					this.$toasts.error('请输入密码', toastOpt);
					return;
				} else if(!noreg.test(this.stuno)) {
					this.$toasts.error('账号应为11位以下的数字', toastOpt);
					return;
				} else if(!pswreg.test(this.psw)) {
					this.$toasts.error('密码应为4-18位的数字或字母', toastOpt);
					return;
				}
				const stu_info = {
					Token: this.token,
					number: this.stuno,
					password: this.psw
				};
				const loading = this.$loading();
				Axios.post(Api.LOGIN_BIND_STUDENT, qs.stringify(stu_info)).then(res => {
					res = res.data;
					loading.close();
					// console.log(res)
					if(res.code == 1001004) {
						this.$toast('登录成功')
						localStorage.setItem(version, GetToken())
						this.$router.push('/main/home');
					} else {
						this.$toast(this.$getCode(Api.LOGIN_BIND_STUDENT, res.code))
					}
				});
			},
			GetUserHead() {
				Axios.get(Api.GET_USER_HEAD_IMG(this.token)).then((res) => {
					res = res.data;
					if(res.code == 1001000) {
						this.headImg = res.data;
					} else {
						this.$toast(this.$getCode(Api.GET_USER_HEAD_IMG, res.code))
					}
				})
			}
		},
		mounted() {
			this.token = GetToken();
			this.$nextTick(() => {
				this.GetUserHead()
			});
		}
	}
</script>

<style lang="stylus" scoped>
	.login-page
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding-top: .6rem;
		z-index: 2000;
		background: linear-gradient(#1D68F8, #fff);
		// background: linear-gradient(#3AB7F0, #fff);
		.login-logo
			width: 2rem;
			height: 2rem;
			border-radius: .34rem;
			margin: 0 auto;
			overflow: hidden;
			background: #fff;
			border: 3px solid #fff;
			.logo
				width: 2rem;
		.input-box
			margin-top: .6rem;
			width: 100%;
			background: #ffffff;
			margin-bottom: .4rem;
			.input-item
				border-bottom: 1px solid #ccc;
				height: 1rem;
				display: flex;
				&:nth-last-child(1)
					border-bottom: none;
				.input-icon
					text-align: center;
					line-height: 1rem;
					width: 1rem;
					height: 1rem;
					display: block;
					float: left;
					.iconfont
						font-size: .4rem;
						color: #666;
				.input-text
					flex: 1;
					height: 1rem;
					.input-field
						width: 100%;
						line-height: 50px;
						font-size: .3rem;
						height: 1rem;
						background: none;
		.login-btn
			width: 90%;
			margin: 0 auto;
</style>