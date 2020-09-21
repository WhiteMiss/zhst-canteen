<template>
	<div class="user-box">
		<HeadBar />
		<div class="user-content">
			<UserInfo />
			<UserOrder />
			<UserList />
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapActions: SaveListActions } = createNamespacedHelpers('SaveList')

	import HeadBar from './components/HeadBar'
	import UserInfo from './components/UserInfo'
	import UserOrder from './components/UserOrder'
	import UserList from './components/UserList'
	export default {
		name: 'User',
		methods: {
			...SaveListActions(['GetUserInfo'])
		},
		components: {
			HeadBar,
			UserInfo,
			UserList,
			UserOrder
		},
		mounted() {
			this.GetUserInfo()
		}
	}
</script>

<style lang="stylus" scoped>
	.user-box
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #eeeeee;
	.user-content
		position: absolute;
		top: 1rem;
		left: 0;
		right: 0;
		bottom: 1.12rem;
		overflow: scroll;
</style>