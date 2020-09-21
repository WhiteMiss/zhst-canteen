<template>
	<div class="HandleBook">
		<div class="img " v-if="img1">
			<img class="item" src="@/assets/image/handleBook/fetch/1.png">
			<img class="item-bottom" src="@/assets/image/handleBook/fetch/2.png">
			<img class="item-shadow" src="@/assets/image/handleBook/fetch/3.png">
			<img class="next" @click="next(1)" src="@/assets/image/handleBook/next.png">
			<img class="skip" @click="goHome()" src="@/assets/image/handleBook/skip.png">
		</div>
		<div class="img " v-if="img2">
			<img class="item" src="@/assets/image/handleBook/fetch/4.png">
			<img class="item-shadow" src="@/assets/image/handleBook/fetch/5.png">
			<img class="next" @click="next(2)" src="@/assets/image/handleBook/next.png">
			<img class="skip" @click="goHome()" src="@/assets/image/handleBook/skip.png">
		</div>
		<div class="img " v-if="img3">
			<img class="item" src="@/assets/image/handleBook/fetch/6.png">
			<img class="item-shadow" src="@/assets/image/handleBook/fetch/7.png">
			<img class="next" @click="next(3)" src="@/assets/image/handleBook/next.png">
			<img class="skip" @click="goHome()" src="@/assets/image/handleBook/skip.png">
		</div>
		<div class="img " v-if="img4">
			<img class="item" src="@/assets/image/handleBook/fetch/8.png">
			<img class="item-bottom" src="@/assets/image/handleBook/fetch/9.png">
			<img class="item-center" src="@/assets/image/handleBook/fetch/12.png">
			<img class="item-bottom" src="@/assets/image/handleBook/fetch/10.png">
			<img class="item-center" src="@/assets/image/handleBook/fetch/11.png">
			<img class="next" @click="next(4)" src="@/assets/image/handleBook/finish.png">
			<img class="skip" @click="goHome()" src="@/assets/image/handleBook/skip.png">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'FetchHandleBook',
		data() {
			return{
				img1: true,
				img2: false,
				img3: false,
				img4: false
			}
		},
		methods: {
			next(type){
				switch(type){
					case 1:
						this.img1 = false
						this.img2 = true
						break;
					case 2:
						this.img2 = false
						this.img3 = true
						break;
					case 3:
						this.img3 = false
						this.img4 = true
						break;
					case 4:
						this.img1 = true
						this.img2 = false
						this.img3 = false
						this.img4 = false
						this.goHome()
				}
			},
			goHome(){
				this.$router.push('/main/home')
			}
		},
	}
</script>

<style lang="stylus" scoped>
	.img
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		.item
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		.item-center
			position: fixed;
			top: 30%;
			width: 100%;
		.item-shadow
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			width: 100%;
		.item-bottom
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
		.next
			position: absolute;
			top: 60%;
			right: 5%;
		.skip
			position: absolute;
			top: 0;
			right: 0;
</style>