<template>
	<div class="CarList-box">
		<div class="null-list" v-if="CarList.length == 0">购物车是空的，快去添加菜品吧</div>
		<div class="car-item" v-for="item in CarList" :key="item.restaurant_id">
			<div class="content-top">
				<div class="car-title" @click="GoToCanteen(item.restaurant_id)">
					{{item.name}}
					<div v-if="editMode" class="clear-car" @click.stop="Clear(item.restaurant_id)">
						<span class="iconfont">&#xe623;</span>
					</div>
				</div>
				<div class="car-goods-item" v-for="gitem in item.goods">
					<span class="name">{{gitem.specsname}}-{{gitem.name}}</span>
					<span class="count" v-if="!editMode">×{{gitem.count}}</span>
					<span class="money" v-if="!editMode">￥{{gitem.count*gitem.price}}</span>
					<div class="goods-tool" v-if="editMode">
						<div class="minus" @click="AddMinus('minus', gitem.thisid, item.restaurant_id)">-</div>
						<div class="num">{{gitem.count}}</div>
						<div class="add" @click="AddMinus('add', gitem.thisid, item.restaurant_id)">+</div>
					</div>
				</div>
			</div>
			<div class="content-bottom">
				合计: {{GetAllMoney(item.goods)}}元
				<mu-ripple v-if="!editMode" class="settlement" @click="Settlement(item.restaurant_id)">结算</mu-ripple>
			</div>
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState: SaveListState, mapGetters: SaveListGetters, mapMutations: SaveListMutations } = createNamespacedHelpers('SaveList')
	import { SolveAccuracy } from '@/unit/DealFun'
	import Bus from '@/unit/Bus'
	import { ResetAddress } from '@/unit/EmitType'

	export default {
		name: 'CarList',
		data() {
			return {}
		},
		methods: {
			GetAllMoney(list) {
				let money = 0;
				list.map(item => {
					money = SolveAccuracy(money += item.count * item.price, 2);
				});
				return money;
			},
			Settlement(id) {
				Bus.$emit(ResetAddress)
				this.$router.push(`/confirmorder/${id}`);
			},
			GoToCanteen(id) {
				this.$router.push(`/product/${id}`);
			},
			Clear(id) {
				this.$confirm('确定要情况该购物车吗').then(() => {
					this.ClearCar(id);
				}).catch(() => {})
			},
			AddMinus(type, thisid, canteenid) {
				if(type == 'add' && this.ShopCarDetail(canteenid).good_count >= 6) {
					this.$toast('购物车最多只能有6件商品');
					return;
				}
				this.AddMinusCount({ type, canteenid, thisid })
			},
			...SaveListMutations(['ClearCar', 'AddMinusCount'])
		},
		computed: {
			...SaveListState(['CarList']),
			...SaveListGetters(['ShopCarDetail'])
		},
		props: {
			editMode: Boolean
		},
		components: {}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.CarList-box
		position: fixed;
		top: 1rem;
		left: 0;
		right: 0;
		bottom: 1.12rem;
		background: #eee;
		overflow: scroll;
		padding-top: .2rem;
		.null-list
			height: .6rem;
			line-height: .6rem;
			text-align: center;
			color: #666;
		.car-item
			background: #fff;
			margin-bottom: .2rem;
			.content-top
				padding: 0 0.3rem;
				.car-title
					text-align: center;
					height: .8rem;
					position: relative;
					line-height: .8rem;
					border-bottom: 1px solid #eee;
					.clear-car
						position: absolute;
						top: 0;
						right: 0;
						width: .6rem;
						text-align: center;
				.car-goods-item
					height: .9rem;
					line-height: .9rem;
					position: relative;
					border-bottom: 1px solid #eee;
					.goods-tool
						position: absolute;
						right: .1rem;
						top: .2rem;
						height: .5rem;
						width: 2rem;
						.minus
							width: .5rem;
							height: .5rem;
							line-height: .5rem;
							text-align: center;
							float: left;
							background: #eee;
						.add
							width: .5rem;
							height: .5rem;
							line-height: .5rem;
							text-align: center;
							float: left;
							background: #ccc;
						.num
							width: .8rem;
							margin: 0 .1rem;
							height: .5rem;
							line-height: .5rem;
							text-align: center;
							float: left;
							background: #e5e5e5;
					&:last-child
						border: none;
					.name
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 2.1rem;
						padding-left: .1rem;
						ellipsis()
					.money
						float: right;
						width: 1.3rem;
						display: block;
						ellipsis()
					.count
						width: .8rem;
						float: right;
						display: block;
						ellipsis()
			.content-bottom
				height: .9rem;
				line-height: .9rem;
				padding: 0 0.3rem;
				border-top: 1px solid #eee;
				.settlement
					float: right;
					width: 1.2rem;
					text-align: center;
					position: relative;
</style>