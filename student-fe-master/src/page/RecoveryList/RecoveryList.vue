<template>
	<div class="RecoveryList-box">
		<HeadBar @refresh="GetData" />
		<div class="list">
			<div
			class="item"
			v-for="item in list"
			:key="item.omOrderSn"
			:style="'height: ' + ItemHeight(item.recoveryStatus) + 'rem'">
				<img :src="item.canteenPicture" class="item-img" />
				<div class="order-info">
					<div class="canteen-name">{{item.canteenName}}</div>
					<div class="create-time">{{item.omCreateTime | moment}}</div>
					<div class="order-state">{{item.recoveryStatus | changeCode}}</div>
					<div class="order-number">
						订单编号: {{item.omOrderSn}}
					</div>
					<div class="order-number">
						<div class="number-item">
							需归还: {{item.recoveryAll}}
						</div>
						<div class="number-item">
							已归还: {{item.recoveryEd}}
						</div>
						<div class="number-item">
							待归还: {{item.recoveryNot}}
						</div>
					</div>
					<mu-ripple class="order-buttom-box" v-if="item.recoveryStatus == 0" @click="GoToRecovery(item.omOrderSn)">归还餐具</mu-ripple>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Axios from 'axios';
	import * as Api from '@/unit/ApiInterface'
	import qs from 'qs';
	import { GetToken } from '@/unit/DealFun'
	import { RefreshRecovery } from '@/unit/EmitType'
	import Bus from '@/unit/Bus'
	import HeadBar from './components/HeadBar.vue'
	import moment from 'moment/moment'
	export default {
		name: 'RecoveryList',
		data() {
			return {
				list: []
			}
		},
		methods: {
			GetData() {
				let loading = this.$loading()
				Axios.post(Api.GET_RECOVERY_LIST, qs.stringify({
					token: GetToken()
				})).then(res => {
					res = res.data;
					loading.close();
					console.log(res)
					if(res.code == 0) {
						this.list = res.data
					} else {
						this.$toast('获取信息出错')
					}
				}).catch(() => {
					loading.close();
					this.$toast('获取信息出错')
				})
			},
			ItemHeight(state) {
				if(state == 0) {
					return '3.7'
				} else {
					return '3';
				}
			},
			GoToRecovery(id) {
				this.$router.push(`/recovery/${id}`);
			},
		},
		components: {
			HeadBar
		},
		filters: {
			moment: (value, formatString) => {
				formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
				return moment(value).format(formatString)
			},
			changeCode: code => {
				if(code == 0) {
					return '待归还'
				} else {
					return '归还完成'
				}
			}
		},
		mounted() {
			this.GetData()
			Bus.$on(RefreshRecovery, this.GetData);
		}
	}
</script>

<style lang="stylus" scoped>
	.order-buttom-box
		position: relative;
		float: right;
		padding: .07rem .2rem;
		border: 1px solid #576EF8;
		font-size: .24rem;
		margin-top: .24rem;
		color: #576EF8;
		border-radius: 3px;
		margin-left: .2rem;
	.list
		position: fixed;
		top: 1rem;
		left: 0;
		right: 0;
		bottom: 0;
		background: #eee;
		overflow-y: scroll;
		.item
			margin-top: .2rem;
			background: #fff;
			padding: .3rem;
			box-sizing: border-box;
			margin-bottom: .2rem;
			position: relative;
			.item-img
				width: .9rem;
				height: .9rem;
				float: left;
				border-radius: 3px;
			.order-info
				position: absolute;
				top: .3rem;
				right: .3rem;
				left: 1.44rem;
				bottom: 0;
				.canteen-name
					width: 4rem;
					ellipsis();
					height: .5rem;
					line-height: .5rem;
					font-size: .32rem;
				.create-time
					font-size: .24rem;
					color: #999;
					padding-bottom: .1rem;
					border-bottom: 1px solid #ccc;
				.order-state
					position: absolute;
					top: 0;
					right: 0;
					font-size: .28rem;
				.order-number
					height: .7rem;
					line-height: .7rem;
					border-bottom: 1px solid #ccc;
					position: relative;
					.number-item
						float: left;
						width: 33.3333%;
</style>