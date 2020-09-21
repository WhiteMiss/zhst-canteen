<template>
	<div class="address-box">
		<AddressHeadBar />
		<div class="address-container">
			<div class="list-item" v-for="(item, key) in AddressList" :key="key">
				<div class="address-info" @click="chooseFun(item)">
					<div class="people">
						<span class="name"><b>{{item.caShoppingName}}</b></span>
						<span class="phone">{{item.caTele}}</span>
					</div>
					<div class="address">
						地址名称：<span class="adname">{{item.caStoreyName}}</span>
						区号：{{item.caStorey}}
					</div>
				</div>
				<div class="change-icon" @click.stop="GoToChange(item.caId)">
					<span class="iconfont">&#xe63c;</span>
				</div>
				<div class="del-icon" @click.stop="del(item.caId)">
					<span class="iconfont">&#xe623;</span>
				</div>
			</div>
			<div class="address-null" v-if="AddressList.length == 0">收货地址为空，请添加收货地址</div>
		</div>
		<mu-ripple class="add-new" @click="GotoNewAddress">
			<span class="iconfont">&#xe650;</span>新增收货地址
		</mu-ripple>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: SaveListState, mapActions: SaveListActions } = createNamespacedHelpers('SaveList')
	import Axios from 'axios'
	import qs from 'qs'
	import * as Api from '@/unit/ApiInterface'
	import Bus from '@/unit/Bus'
	import { ChooseAddress } from '@/unit/EmitType'

	import AddressHeadBar from './components/HeadBar'
	export default {
		name: 'Address',
		data() {
			return {
				NewChangeOpen: false,
				chooseAddress: {},
				parentRoute: ''
			}
		},
		methods: {
			del(caId) {
				this.$confirm('确定要删除该地址吗').then(() => {
					const loading = this.$loading();
					Axios.post(Api.DELETE_ADDRESS, qs.stringify({ caId })).then(res => {
						res = res.data;
						loading.close();
						if(res.code == 1001000) {
							this.GetAddressList(true);
							this.$toast('删除成功')
						}
					})
				}).catch(() => {})
			},
			chooseFun(info) {
				if(this.parentRoute.name == 'ConfirmOrder') {
					this.chooseAddress = info;
					Bus.$emit(ChooseAddress, this.chooseAddress);
					this.$router.go(-1)
				}
			},
			GotoNewAddress() {
				this.$router.push('/newaddress')
			},
			GoToChange(id) {
				this.$router.push(`/changeaddress/${id}`)
			},
			...SaveListActions(['GetAddressList'])
		},
		computed: {
			...SaveListState(['AddressList'])
		},
		components: {
			AddressHeadBar
		},
		activated() {
			this.GetAddressList()
		},
		beforeRouteEnter (to, from, next) {
			if(from.name == 'ConfirmOrder') {
				next(vm => {
					vm.$data.chooseAddress = {};
					vm.$data.parentRoute = from;
				})
			} else {
				next()
			}
		},
		// beforeRouteLeave (to, from, next) {
		// 	if(to.name == 'ConfirmOrder') {
		// 		Bus.$emit(ChooseAddress, this.chooseAddress);
		// 	}
		// 	next()
		// }
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.address-box
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		.address-null
			text-align: center;
			line-height: .8rem;
			font-size: .3rem;
			color: #999;
		.address-container
			background: #eeeeee;
			position: absolute;
			top: 1rem;
			left: 0;
			right: 0;
			bottom: 1rem;
			overflow-y: scroll;
			.list-item
				position: relative;
				display: flex;
				background: #fff;
				height: 1.2rem;
				border-bottom: 1px solid #ececec;
				.address-info
					flex: 1;
					padding-left: .3rem;
					.people
						margin-top: .15rem;
						overflow: hidden;
						.name
							font-size: .3rem;
							max-width: 2.5rem;
							float: left;
							display: inline-block;
							margin-right: .2rem;
							ellipsis()
						.phone
							float: left;
							margin-top: .07rem;
							display: inline-block;
							font-size: .24rem;
					.address
						font-size: .24rem;
						margin-top: .04rem;
						color: rgb(156, 156, 156)
						.adname
							margin-right: .25rem;
				.change-icon
					width: .5rem;
					height: .5rem;
					line-height: .5rem;
					float: right;
					margin-top: .34rem;
					margin-right: .3rem;
					.iconfont
						font-size: .5rem;
						color: rgb(156, 156, 156);
				.del-icon
					width: .5rem;
					height: .5rem;
					line-height: .5rem;
					float: right;
					margin-top: .34rem;
					margin-right: .2rem;
					.iconfont
						font-size: .45rem;
						color: rgb(156, 156, 156);
		.add-new
			height: 1rem;
			line-height: 1rem;
			text-align: center;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background: #ffffff;
			color: #2196f3;
			font-size: .32rem;
			.iconfont
				margin-right: .05rem;
</style>