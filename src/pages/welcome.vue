<template>
	<div class="welcome">
		<div style="width:50%;margin: 0 auto;color:#fff" :style="{marginTop:marginTop+'px'}">
			<el-progress :percentage="100" status="exception" :show-text="false" :stroke-width="20" :format="format" :indeterminate="true" />
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	export default {
		data(){
			return {
				marginTop:$(window).height()/2
			}
		},
		mounted:function(){
			var that = this;
			setTimeout(function(){
				that.$emit("loaddingend","")
			},1000);
		}
	}
</script>

<style >
	.welcome{
		position:fixed;
		left: 0;
		top:0;
		width:100%;
		height:100%;
		background: #000000;
	}
</style>
