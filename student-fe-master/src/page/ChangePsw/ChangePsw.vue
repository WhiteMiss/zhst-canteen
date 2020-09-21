<template>
	<div class="ChangePsw-box">
		<HeadBar />
		<div class="input-container">
			<div class="input-item">
				<div class="input-title"><b>原密码</b></div>
				<mu-text-field v-model="oldPsw" placeholder="原密码" type="password"></mu-text-field>
			</div>
			<div class="input-item">
				<div class="input-title"><b>新密码</b></div>
				<mu-text-field v-model="newPsw" placeholder="新密码" type="password"></mu-text-field>
			</div>
			<div class="input-item">
				<div class="input-title"><b>确认密码</b></div>
				<mu-text-field v-model="newPsws" placeholder="确认密码" type="password"></mu-text-field>
			</div>
		</div>
		<div class="btn">
			<mu-button full-width color="primary" @click="testPassword">确定</mu-button>
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapMutations: SaveListMutations } = createNamespacedHelpers('SaveList')
	import Axios from 'axios'
	import qs from 'qs'
	import * as Api from '@/unit/ApiInterface'
	import { GetToken } from '@/unit/DealFun'
	import HeadBar from './components/HeadBar'
	export default {
		name: 'ChangePsw',
		data() {
			return {
				oldPsw: '',
				newPsw: '',
				newPsws: ''
			}
		},
		methods: {
			testPassword (){
				let reg = /^[a-zA-Z0-9]{4,18}$/;
				if(!reg.test(this.newPsw)){
					this.$toasts.error('密码应为4-18位的数字或字母');
					this.newPsw = ""
					this.newPsws = ""
				} else if(this.newPsw != this.newPsws){
					this.$toasts.error('两次输入的新密码不一致');
				} else if(this.oldPsw == '') {
					this.$toasts.error('旧密码为空');
				} else if(this.oldPsw == this.newPsw){
					this.$toasts.error('新密码和旧密码一样');
				} else {
					this.ChangePswPost()
				}
			},
			ChangePswPost() {
				let loading = this.$loading()
				Axios.post(Api.CHANGE_PASSWORD, qs.stringify({
					Token: GetToken(),
					oldpwd: this.oldPsw,
					newpwd: this.newPsw
				})).then(res => {
					res = res.data;
					loading.close();
					if(res.code == 1001000) {
						this.ClearSaveList();
						this.$router.push('/');
						setTimeout(() => {
							this.$toast('修改成功，请重新登录', {
								durtaion: 200
							})
						}, 100)
					} else {
						this.$toast(this.$getCode(Api.CHANGE_PASSWORD, res.code))
					}
				})
			},
			...SaveListMutations(['ClearSaveList'])
		},
		computed: {},
		components: {
			HeadBar
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/position.styl'
	.ChangePsw-box >>> .mu-text-field-input
		height: .9rem;
		font-size: .28rem;
		padding-left: 1.6rem;
	.ChangePsw-box >>> .mu-input
		width: 100%;
		min-height: 0;
		padding-top: 0;
		padding-bottom: 0;
		margin-bottom: 0;
	.ChangePsw-box
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 102;
		background: #eee;
		.input-container
			padding-left: .3rem;
			margin-top: .3rem;
			background: #fff;
			.input-item
				position: relative;
				.input-title
					position: absolute;
					left: 0;
					height: .9rem;
					line-height: .9rem;
		.btn
			padding: .3rem
</style>