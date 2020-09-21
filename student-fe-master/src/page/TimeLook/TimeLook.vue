<template>
	<div class="time-look-box">
		<HeadBar />
		<div class="time-list">
			<div class="time-item" v-for="item in ModelTime">
				<span class="value">{{item.modeName | replaceName}}</span>
				<span class="time">{{item.startTime | moment}} - {{item.endTime | moment}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: SaveListState } = createNamespacedHelpers('SaveList')
	import HeadBar from './components/HeadBar'
	import moment from 'moment/moment'
	export default {
		name: 'TimeLook',
		data() {
			return {}
		},
		computed: {
			...SaveListState(['ModelTime'])
		},
		filters: {
			moment: (value) => {
				let formatString = 'HH:mm';
				return moment(value).format(formatString)
			},
			replaceName: (value) => {
				return value.replace('模式', '时间')
			}
		},
		components: {
			HeadBar
		}
	}
</script>

<style lang="stylus" scoped>
	.time-list
		background: #eee;
		position: absolute;
		top: 1rem;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: scroll;
		padding: .2rem;
		.time-item
			height: .9rem;
			line-height: .9rem;
			background: #fff;
			border-radius: .1rem;
			margin-bottom: .2rem;
			padding: 0 .3rem;
			.time
				float: right;
</style>