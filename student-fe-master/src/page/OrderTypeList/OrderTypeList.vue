<template>
	<div class="order-type-list-box">
		<HeadBar />
		<List />
	</div>
</template>

<script>
	import Axios from 'axios'
	import * as Api from '@/unit/ApiInterface'
	import { GetToken } from '@/unit/DealFun'

	import HeadBar from './components/HeadBar'
	import List from './components/List'
	export default {
		name: 'OrderTypeList',
		components: {
			HeadBar,
			List
		}
	}
</script>