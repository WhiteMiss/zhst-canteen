<template>
	<div class="Tip-box">
		<div>提示：请到回收机扫描餐盒上的二维码</div>
		<div>注意：每个餐盒均需扫描一次二维码</div>
		<div style="margin-top: .25rem;">如餐盒上的二维码损坏，请点击下方的“找回二维码”，以便归还餐具</div>
	</div>
</template>

<script>
	export default {
		name: 'Tip',
	}
</script>

<style lang="stylus" scoped>
	.Tip-box
		margin: .2rem 0;
		background: #fff;
		border: 1px solid #ccc;
		border-radius: .15rem;
		padding: .15rem .2rem;
		font-size: .31rem;
</style>