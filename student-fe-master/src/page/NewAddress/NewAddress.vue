<template>
	<div class="new-address-container">
		<HeadBar />
		<div class="input-container">
			<div class="input-item">
				<div class="input-title"><b>姓名</b></div>
				<mu-text-field v-model="addressInfo.name" placeholder="请输入姓名"></mu-text-field>
			</div>
			<div class="input-item">
				<div class="input-title"><b>手机号</b></div>
				<mu-text-field v-model="addressInfo.phone" placeholder="请输入手机号"></mu-text-field>
			</div>
			<div class="input-item">
				<div class="input-title"><b>取餐区域</b></div>
				<mu-select v-model="addressInfo.address" full-width placeholder="请选择取餐区域">
					<mu-option v-for="option,index in options" :key="option.id" :label="option.areaName+'('+option.areaNumber+')'" :value="option.id"></mu-option>
				</mu-select>
			</div>
		</div>
		<div class="btn">
			<mu-button full-width color="primary" @click="add">确定</mu-button>
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapActions: SaveListActions } = createNamespacedHelpers('SaveList')
	import * as Api from '@/unit/ApiInterface'
	import Axios from 'axios'
	import qs from 'qs'
	import { GetToken } from '@/unit/DealFun'

	import HeadBar from './components/HeadBar'
	export default {
		name: 'NewAddress',
		data() {
			return {
				addressInfo: {
					name: '',
					phone: '',
					address: '',
				},
				options: [],
			}
		},
		methods: {
			add() {
				for(var i in this.addressInfo) {
					if(this.addressInfo[i] == "") {
						this.$toast('请完善信息');
						return;
					}
				}
				const number = /^1[34578]\d{9}$/;
				const name = /^[\u4E00-\u9FA5A-Za-z]+$/;
				if(!name.test(this.addressInfo['name'])){
					this.$toast('只能输入中文和英文')
					return;
				}

				if(!number.test(this.addressInfo['phone'])){
					this.$toast('请输入正确的手机号码')
					return;
				}
				const addressDetail = this.options.filter(item => item.id == this.addressInfo.address)[0];
				const formData = {
					Token: GetToken(),
					caShoppingName: this.addressInfo.name,
					caTele: this.addressInfo.phone,
					caStoreyName: addressDetail.areaName,
					caStorey: addressDetail.areaNumber
				}
				const loading = this.$loading();
				Axios.post(Api.ADD_ADDRESS, qs.stringify(formData)).then(res => {
					res = res.data;
					loading.close();
					if(res.code == 1001000) {
						this.GetAddressList(true);
						this.$toasts.success('添加成功');
						this.$router.go(-1)
					} else {
						this.$toast(this.$getCode(Api.ADD_ADDRESS, res.code))
					}
				});
			},
			...SaveListActions(['GetAddressList'])
		},
		created() {
			Axios.get(Api.GET_USEABLE_ADDRESS_LIST).then(res => {
				res = res.data;
				if(res.code == 1001000) {
					this.options = res.data
				} else {
					this.$toast(this.$getCode(Api.GET_USEABLE_ADDRESS_LIST, res.code))
				}
			})
		},
		components: {
			HeadBar
		}
	}
</script>

<style lang="stylus" scoped>
	.new-address-container >>> .mu-text-field-input
		height: .9rem;
		font-size: .28rem;
		padding-left: 1.6rem;
	.new-address-container >>> .mu-select-input
		height: .9rem;
		font-size: .3rem;
		padding-left: 1.6rem;
	.new-address-container >>> .mu-input
		width: 100%;
		min-height: 0;
		padding-top: 0;
		padding-bottom: 0;
		margin-bottom: 0;
	.new-address-container
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