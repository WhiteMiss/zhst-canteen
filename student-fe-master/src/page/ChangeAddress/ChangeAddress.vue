<template>
	<div class="change-address-container">
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
					<mu-option v-for="option,index in options" :key="option.areaNumber" :label="option.areaName+'('+option.areaNumber+')'" :value="option.areaNumber"></mu-option>
				</mu-select>
			</div>
		</div>
		<div class="btn">
			<mu-button full-width color="primary" @click="change">确定</mu-button>
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters: SaveListGetters, mapActions: SaveListActions } = createNamespacedHelpers('SaveList')
	import * as Api from '@/unit/ApiInterface'
	import Axios from 'axios'
	import qs from 'qs'
	import { GetToken } from '@/unit/DealFun'

	import HeadBar from './components/HeadBar'
	export default {
		name: 'ChangeAddress',
		data() {
			return {
				addressInfo: {
					id: '',
					name: '',
					phone: '',
					address: '',
				},
				options: [],
			}
		},
		methods: {
			change() {
				for(var i in this.addressInfo) {
					if(this.addressInfo[i] == "") {
						this.$toast('请完善信息');
						return;
					}
				}
				const number = /^1[34578]\d{9}$/
				const name = /^[\u4E00-\u9FA5A-Za-z]+$/;
				if(!name.test(this.addressInfo['name'])){
					this.$toast('只能输入中文和英文')
					return;
				}

				if(!number.test(this.addressInfo['phone'])){
					this.$toast('请输入正确的手机号码')
					return;
				}
				const addressDetail = this.options.filter(item => item.areaNumber == this.addressInfo.address)[0];
				const formData = {
					Token: GetToken(),
					caId: this.$route.params.id,
					caShoppingName: this.addressInfo.name,
					caTele: this.addressInfo.phone,
					caStoreyName: addressDetail.areaName,
					caStorey: addressDetail.areaNumber
				}
				const loading = this.$loading();
				Axios.post(Api.UPDATA_ADDRESS, qs.stringify(formData)).then(res => {
					res = res.data;
					loading.close();
					if(res.code == 1001000) {
						this.GetAddressList(true);
						this.$toasts.success('修改成功');
						this.$router.go(-1)
					} else {
						this.$toast('修改失败')
					}
				});
			},
			...SaveListActions(['GetAddressList'])
		},
		created() {
			Axios.get(Api.GET_USEABLE_ADDRESS_LIST).then(res => {
				res = res.data;
				this.options = res.data
			})
		},
		components: {
			HeadBar
		},
		computed: {
			...SaveListGetters(['GetAddressDetail'])
		},
		activated() {
			const id = this.$route.params.id;
			this.addressInfo = {
				id: this.GetAddressDetail(id).caId,
				name: this.GetAddressDetail(id).caShoppingName,
				phone: this.GetAddressDetail(id).caTele,
				address: this.GetAddressDetail(id).caStorey
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.change-address-container >>> .mu-text-field-input
		height: .9rem;
		font-size: .28rem;
		padding-left: 1.6rem;
	.change-address-container >>> .mu-select-input
		height: .9rem;
		font-size: .3rem;
		padding-left: 1.6rem;
	.change-address-container >>> .mu-input
		width: 100%;
		min-height: 0;
		padding-top: 0;
		padding-bottom: 0;
		margin-bottom: 0;
	.change-address-container
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
			text-align: center;
</style>