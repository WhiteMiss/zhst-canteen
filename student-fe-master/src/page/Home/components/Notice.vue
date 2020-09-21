<template>
	<div class="content-box">
		<div class="title">下单时间</div>
		<div>上午时间: {{SetMorning.startTime | moment}} - {{SetMorning.endTime | moment}}</div>
		<div>下午时间: {{SetAfternoon.startTime | moment}} - {{SetAfternoon.endTime | moment}}</div>
		<div>晚上时间: {{SetEvening.startTime | moment}} - {{SetEvening.endTime | moment}}</div>
		<div class="border-line"></div>
		<div class="title">取餐时间</div>
		<div>上午时间: {{GetMorning.startTime | moment}} - {{GetMorning.endTime | moment}}</div>
		<div>下午时间: {{GetAfternoon.startTime | moment}} - {{GetAfternoon.endTime | moment}}</div>
		<div class="border-line"></div>
		<div class="time-value">请在规定时间内取餐，逾期不取，将自动作废，不可再次取餐</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: SaveListState } = createNamespacedHelpers('SaveList')
	import moment from 'moment/moment'
	export default {
		name: 'HeadBar',
		data() {
			return {}
		},
		methods: {
			OpenTime() {
				this.$emit("update:noticeShow", true);
			}
		},
		computed: {
			SetMorning() {
				return this.ModelTime[0]
			},
			SetAfternoon() {
				return this.ModelTime[4]
			},
			SetEvening() {
				return this.ModelTime[8]
			},
			GetMorning() {
				return this.ModelTime[2]
			},
			GetAfternoon() {
				return this.ModelTime[6]
			},
			...SaveListState(['ModelTime'])
		},
		filters: {
			moment: (value) => {
				let formatString = 'HH:mm';
				return moment(value).format(formatString)
			},
		},
		props: {
			noticeShow: null
		}
	}
</script>

<style lang="stylus" scoped>
	.content-box
		width: 4rem;
		text-align: center;
		border-radius: .2rem;
		padding: .3rem 0;
		.title
			margin-bottom: .03rem;
		.border-line
			margin: .2rem .3rem;
			border-bottom: 1px solid #ccc;
		.time-value
			text-align: left;
			padding: 0 .3rem;
</style>