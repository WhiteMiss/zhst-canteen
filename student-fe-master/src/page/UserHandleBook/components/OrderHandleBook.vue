<template>
	<div class="HandleBook">
         <div class="div-relative" v-if="indexImg">
            <img class="baseImg" src="@/assets/image/handleBook/order/index.png" />
            <img class="bottomImg" src="@/assets/image/handleBook/order/index_b.png" />
            <img class="index_m" src="@/assets/image/handleBook/order/index_m.png"/>
            <img class="indexNext" src="@/assets/image/handleBook/next.png" @click="go(1)" />
            <img class="pass" src="@/assets/image/handleBook/skip.png" @click="skip()" />
        </div>
		<div class="div-relative " v-if="menuImg">
			<img class="baseImg" src="@/assets/image/handleBook/order/menu.png" />
			<img class="bottomImg" src="@/assets/image/handleBook/order/menu_bottom.png" />
      		<img class="menu_m" src="@/assets/image/handleBook/order/menu_m.png" />
      		<img class="menuNext" src="@/assets/image/handleBook/next.png"  @click="go(2)" />
      		<img class="pass" src="@/assets/image/handleBook/skip.png"  @click="skip()"/>
		</div>
		<div class="div-relative " v-if="endImg">
			<img class="baseImg" src="@/assets/image/handleBook/order/order.png" />
			<img class="bottomImg" src="@/assets/image/handleBook/order/order_bottom.png" />
      		<img class="order_success" src="@/assets/image/handleBook/order/order_success.png" />
      		<img class="orderNext" src="@/assets/image/handleBook/finish.png"  @click="go(3)" />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'OrderHandleBook',
		data() {
			return {
				indexImg: true,
				menuImg: false,
				endImg: false
			}
		},
		methods: {
			go(type) {
				switch(type) {
					case 1:
						this.indexImg = false
						this.menuImg = true
						break;
					case 2:
						this.menuImg = false
						this.endImg = true
						break;
					case 3:
						this.endImg = false
						this.indexImg = true
						this.skip()
				}
			},
			skip(){
				this.$router.push('/main/home')
			}
		},
	}
</script>

<style lang="stylus" spoced>
    .div-relative
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        .baseImg
            position: absolute;
            z-index: 2;
            width: 100%;
        .bottomImg
            position: fixed;
            bottom: 0;
            z-index: 3;
            width: 100%;
        .pass
            position: absolute;
            top: 1%;
            right : 0;
            width: 20%;
            z-index: 3;
        .index_m
            position: absolute;
            z-index: 3;
            width: 100%;
        .indexNext
            position: absolute;
            bottom: 4rem;
            left: 38%;
            z-index: 3;
            width: 30%;
        .menu_m
            position: absolute;
            z-index: 3;
            width: 100%;
            height: 100%
        .menuNext
            position: absolute;
            top: 70%;
            left: 50%;
            z-index: 3;
            width: 30%;
        .order_success
            position: absolute;
            z-index: 3;
            width: 100%;
        .orderNext
            position: absolute;
            top: 60%;
            left: 38%;
            z-index: 3;
            width: 30%;
</style>