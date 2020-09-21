<template>
	<mu-paper class="info-paper" :z-depth="1">
		<div class="info-title">配送信息</div>
		<div class="info-detail">
			<mu-ripple class="address-info info-item">
				<div class="title">送货地址:</div>
				<div class="info">
					<div class="name">{{OrderInfo.omShoppingUserName}}（{{OrderInfo.omCiAddr}}）</div>
					<div class="phone">{{OrderInfo.omShoppingUserTele}}</div>
				</div>
			</mu-ripple>
			<mu-ripple class="distr-time info-item" v-if="OrderInfo.omDeliveryTime">
				<div class="title">配送时间:</div>
				<div class="desc">{{OrderInfo.omDeliveryTime | moment}}</div>
			</mu-ripple>
		</div>
	</mu-paper>
</template>

<script>
	import moment from 'moment/moment'
	export default {
		name: 'AddressInfo',
		methods: {},
		props: {
			OrderInfo: Object
		},
		filters: {
			moment: (value, formatString) => {
				formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
				return moment(value).format(formatString)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.info-paper
		margin-bottom: .2rem;
		.info-title
			height: .8rem;
			line-height: .8rem;
			padding-left: .26rem;
			border-bottom: 1px solid #ccc;
		.info-detail
			padding-left: .3rem;
			.info-item:nth-last-child(1)
				border: none;
			.address-info
				position: relative;
				overflow: hidden;
				padding: .15rem 0;
				height: 1.2rem;
				border-bottom: 1px solid #ccc;
				.title
					float: left;
				.info
					float: left;
					margin-left: .17rem;
			.distr-time
				position: relative;
				height: .84rem;
				line-height: .84rem;
				.title
					position: absolute;
					top: 0;
					left: 0;
					width: 1.2rem;
					ellipsis()
				.desc
					position: absolute;
					top: 0;
					left: 1.35rem;
					right: 0;
					ellipsis()
</style>