<template>
	<div class="content" ref="food">
		<div class="content-scroll">
			<div v-for="item in GetType" :key="item.id" >
				<div class="title" >{{item.name}}</div>
				<div class="list" v-for="list in item.goods">
					<img class="img" :src="list.img">
					<div class="food-info">
						<div class="food-name">{{list.name}}</div>
						<div class="food-desc">{{list.desc}}</div>
						<div class="food-rate">
							<el-rate
								v-model="list.rating / 20"
								:max="5"
								disabled
								text-color="#ff9900"></el-rate>
						</div>
					</div>
					<div class="foot-money">
						￥
						<span class="foot-money-money">{{list.price}}</span>
					</div>
					<div class="food-add" @click="ChooseSpecs(list)"><span class="iconfont">&#xe600;</span></div>
				</div>
			</div>
			<Fillblank />
		</div>
	</div>
</template>

<script>
	import Bus from '@/unit/Bus'
	import { skip } from '@/unit/EmitType'
	import { createNamespacedHelpers} from 'vuex'
	const { mapGetters:ProductSelftGetter,mapMutations:ProductselftMutations} = createNamespacedHelpers('Productselft')
	import BScroll from 'better-scroll'
	import Fillblank from './FillBlank'
	import {  OpenSelftSpecs } from '@/unit/EmitType'
	export default {
		name: 'selftlist',
		data() {
			return {
			}

		},
		components: {
			Fillblank
		},
		methods: {
			...ProductselftMutations(['SetLeftType']),
			ChooseSpecs(food) {
				Bus.$emit(OpenSelftSpecs,  food );
			},
			GoBscroll(top){
				this.scroll.scrollTo(0, top*(-1), 300);
			},
			BScrollEvent(pos){
				let Typename=''
				let Topy=pos.y*(-1)
				this.ScrollDom.map(item=>{
					if (Topy>=item.top) {
						Typename=item.name
					}
				})
				this.SetLeftType(Typename)

			}

		},
		mounted() {
			this.scroll = new BScroll(this.$refs.food, {
				click: true,
				tap: true,
				probeType: 3,
				bounce: {
					top: false,
					bottom: false
				}
			})
			this.scroll.on('scroll',pos=>{
				this.BScrollEvent(pos)
			})
			Bus.$on(skip, this.GoBscroll)

		},
		computed: {
			...ProductSelftGetter(['GetType','ScrollDom'])

		}
	}
</script>

<style lang="stylus" scoped>
	@import '~@/assets/styles/varibles.styl'
	.content
		position: fixed;
		top: 1.8rem;
		left: 1.3rem;
		right: 0;
		bottom: 0rem;
		overflow: hidden;
		.content-scroll
			width:100%
			.title
				margin-left: .1rem;
				width: 100%
				background:#f8e7d9;
			.list
				position: relative;
				margin-top: .1rem
				.img
					width:2rem;
					height: 2rem;
					margin-top: .2rem;
					margin-left: .2rem;
				.foot-money
					position: absolute;
					bottom: .1rem;
					left: 2.3rem;
					color: #FB6464;
					margin-top: .14rem;
					.foot-money-money
						margin-left: -.1rem;
						font-size: .4rem;
				.food-add
					position: absolute;
					bottom: .2rem;
					right: .2rem;
					width: .5rem;
					height: .5rem;
					line-height: .5rem;
					text-align: center;
					border-radius: .25rem;
					background: #3782FA;
					color: #fff;
					z-index: 999;
				.food-info
						position: absolute;
						left: 2.3rem;
						top: 0;
						right: 0;
						bottom: 0;
						padding-right: .2rem;
						.food-name
							width: 100%;
							font-size: .36rem;
							margin-left: .5rem
							ellipsis()
						.food-desc
							font-size: .2rem;
							color: #666666;
							ellipsis()
						.food-rate
							overflow: hidden;
							.foot-rate-number
								float: left;
								font-size: .24rem;
								margin-top: -.03rem;
								margin-left: .1rem;

</style>