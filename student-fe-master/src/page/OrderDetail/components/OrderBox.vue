<template>
	<div class="order-box-box">
		<div class="box-list" v-if="ShowState == 1">
			<div class="box-item" v-for="item in BoxList" @click="GoOpenBox(item)">
				<span class="iconfont" v-if="OrderState(item.odbOrderStatus).state">&#xe602;</span>
				<span class="iconfont" v-if="!OrderState(item.odbOrderStatus).state">{{OrderState(item.odbOrderStatus).value}}</span>
				<div class="info">
					<div class="infos">分单编号：{{item.odbId}}</div>
					<div class="infos">取餐位置：{{OrderInfo.omCiAddr | address}}-{{item.tcNumber}}柜{{item.tbNumber}}箱</div>
				</div>
			</div>
		</div>
		<div class="not-look" v-if="ShowState == 2">
			无法查看分箱情况
		</div>
		<div class="not-look" v-if="ShowState == 0">
			请支付后再查看分箱情况
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: SaveListState, mapGetters: SaveListGetters } = createNamespacedHelpers('SaveList')
	const { mapState: BoxInfoState, mapMutations: BoxInfoMutations } = createNamespacedHelpers('BoxInfo')
	import Axios from 'axios'
	import * as Api from '@/unit/ApiInterface'
	import { GetTime, GetNowDate } from '@/unit/DealFun'
	import moment from 'moment/moment'

	export default {
		name: 'OrderBox',
		methods: {
			GetBinning() {
				if(this.OrderInfo.omOrderStatus > 0) {
					Axios.get(Api.GET_ORDER_BINNING, { params: {
						ordersn: this.OrderInfo.omOrderSn
					}}).then(res => {
						res = res.data;
						this.SaveBoxList(res.data.orderDistributionBoxFrontDTOList);
					})
				}
			},
			GoOpenBox(info) {
				// if(!info.odbOrderStatus) {
				// 	this.$router.replace(`/openbox/${info.odbId}`);
				// }
				// const formatString = 'YYYY-MM-DD HH:mm:ss';
				// let orderTime = moment(this.OrderInfo.omCreateTime).format(formatString).split(' ')[0];
				// if(GetNowDate() != orderTime) {
				// 	this.$toast('取餐只能在当天内进行');
				// 	return;
				// }

				if(this.OrderInfo.omOrderStatus == 40 || this.OrderInfo.omOrderStatus == 50) {
					let formatString = 'HH:mm';
					const { ModelTime } = this;
					let time1 = GetTime(moment(ModelTime[2].startTime).format(formatString), moment(ModelTime[2].endTime).format(formatString));
					let time2 = GetTime(moment(ModelTime[6].startTime).format(formatString), moment(ModelTime[6].endTime).format(formatString));
					if(time1 || time2) {
						this.$router.push(`/openbox/${info.odbId}`);
					} else {
						this.$toast('当前时间非取餐时间')
					}
				} else {
					this.$toast('当前订单状态不允许开箱')
				}
			},
			OrderState(boxstate) {
				let r = {
					state: false,
					value: ''
				}
				switch (this.OrderInfo.omOrderStatus) {
					case 10:
						r.value = '待接单';
						break;
					case 20:
						r.value = '待派送';
						break;
					case 30:
						r.value = '待派送';
						break;
					case 40:
						r.value = '可领取';
						r.state = true;
						break;
					case 50:
						r.value = '已领取';
						break;
				}
				if(boxstate) {
					r.value = '已领取';
					r.state = false;
				}
				return r;
			},
			...BoxInfoMutations(['SaveBoxList'])
		},
		mounted() {
			this.GetBinning();
		},
		computed: {
			OrderInfo() {
				if(this.$route.params.state){
					let id = this.$route.params.orderid;
					console.log(this.GetTypeOrderList(id))
					return this.GetTypeOrderList(id)
				}
				else{
					let id = this.$route.params.orderid;
					return this.OrderInfoDetail(id)
				}
			},
			ShowState() {
				if(this.OrderInfo.omOrderStatus == 0) {
					return 0;
				} else if(this.OrderInfo.omOrderStatus < 60) {
					return 1;
				} else {
					return 2;
				}
			},
			...BoxInfoState(['BoxList']),
			...SaveListState(['ModelTime']),
			...SaveListGetters(['OrderInfoDetail','GetTypeOrderList'])
		},
		filters: {
			address: (value) => {
				return value.replace(':', '(') + ')'
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.order-box-box
		position: fixed;
		top: 1.8rem;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		overflow-y: scroll;
		.not-look
			line-height: 1rem;
			text-align: center;
			color: #666;
		.box-item
			height: 1.5rem;
			border-bottom: 1px solid #eee;
			.iconfont
				height: 1.5rem;
				line-height: 1.5rem;
				float: right;
				margin-right: .3rem;
			.info
				float: left;
				height: 1.5rem;
				padding-left: .3rem;
				.infos
					font-size: .3rem;
					&:nth-child(1)
						margin-top: .21rem;
					&:nth-child(2)
						margin-top: .1rem;
</style>