<template>
	<el-row>
		<el-col :span="18">
			<el-row>
				<el-col :span="12">
					<!-- 采购需求 -->
					<div class="chart" :style="{height:((height-80)/2 - 30)+'px'}">
						<div class="itemtitle" style="">市场采购需求</div>
						<v-chart ref="xuqiuchart" :style="{height:(((height-80)/2 - 30 - 25)+'px')}" :option="xuqiuchart" />
					</div>
				</el-col>
				<el-col :span="12">
					<!-- 在售产品 -->
					<div class="chart" :style="{height:((height-80)/2 - 30)+'px'}">
						<div class="itemtitle" style="">产品供应排行</div>
						<v-chart ref="goodschart" :style="{height:(((height-80)/2 - 30 - 25)+'px')}" :option="goodschart" />
					</div>
				</el-col>
			</el-row>
			<div>
				<!-- 价格走势 -->
				<div class="chart" :style="{height:((height-80)/2 - 30)+'px'}">
					<div class="itemtitle" style="">价格走势</div>
					<v-chart ref="costchart" :style="{height:(((height-80)/2 - 30 - 25)+'px')}" :option="costchart" />
				</div>
			</div>
		</el-col>
		<el-col :span="6">
			<!-- 市场资讯 -->
			<div class="chart" :style="{height:((height-80 - 20) )+'px'}">
				<div class="itemtitle" style="">市场资讯</div>
				<div>
					<div class="swiper-container" :style="{height:(((height-80) - 20  - 45)+'px')}">
						<div class="swiper-wrapper" :style="{height:(((height-80) - 20 - 45)+'px')}">
							<div v-for="(item,index) in news" class="swiper-slide newitem" style="height: 110px;">
								<div class="innner">
									<div class="title">{{item.title}}</div>
									<div class="flex">
										<div class="flex_item">时间：{{item.date}}</div>
										<div class="flex_item">来源：{{item.from_}}</div>
									</div>
									<div class="desc">
										{{item.desc}}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	import $ from 'jquery'
	import config from '/public/config.js'
	import utils from '/public/utils.js'
	import api from '/public/api.js'
	import VChart, {
		THEME_KEY
	} from "vue-echarts";
	import * as echarts from 'echarts';
	
	import Swiper from 'swiper';
	import 'swiper/dist/css/swiper.min.css';

	export default {
		components: {
			VChart
		},
		provide: {
			[THEME_KEY]: "dark"
		},
		data() {
			return {
				height: $(window).height(),
				charts: {},
				timer: null,
				xuqiuchart: {},
				goodschart: {},
				costchart: {},
				categorys : ['玉米', '水稻', '小麦', '大豆', '青稞'],
				news: [{
					id: 1,
					title: '江苏东海给农业插上“数字化”翅膀',
					desc: '5月份,这些葡萄就可以销售了。”走进东海县石梁河镇金朵家庭农场,农场主曹桂林与父亲曹玉早正在种植的60亩温室内依据县农业物联网信息中心专家的“指令”,对葡萄进行抹芽、定梢和花穗',
					date: '2022-04-09 12:11',
					from_: '百度一下'
				}, {
					id: 1,
					title: '中国农业智能装备亮相哥伦比亚农科创新博览会',
					desc: '人民网里约热内卢4月8日电 (记者吴杰)当地时间4月6日至8日,由华南农业大学牵头组织的中国水果采摘机器人、播种及施肥无人机等智能装备亮相哥伦比亚农业科技国际云博览会,展示了中国精准农业、智慧农业、现代农业智能装备等领域的优势,',
					date: '2022-04-09 12:11',
					from_: '百度一下'
				}, {
					id: 1,
					title: '安徽出台规划助推农业农村现代化',
					desc: '安徽出台规划助推农业农村现代化作者:李应松 张守营 来源:中国经济导报 字数:839本报讯 李应松 记者张守营报道 日前',
					date: '2022-04-09 12:11',
					from_: '百度一下'
				}, {
					id: 1,
					title: '战疫情、保春耕、促生产,崇明现代农业园区做好春耕备耕',
					desc: '“东风吹绿草,布谷劝春耕。”春耕农时不等人,当前正处于疫情防控攻坚阶段,也是春耕生产备耕的关键时间节点,崇明现代农业园区以“战疫情、保春耕、促生产”为着力点,抢农时、抓备耕,确保',
					date: '2022-04-09 12:11',
					from_: '百度一下'
				}, {
					id: 1,
					title: '江苏东海给农业插上“数字化”翅膀',
					desc: '5月份,这些葡萄就可以销售了。”走进东海县石梁河镇金朵家庭农场,农场主曹桂林与父亲曹玉早正在种植的60亩温室内依据县农业物联网信息中心专家的“指令”,对葡萄进行抹芽、定梢和花穗',
					date: '2022-04-09 12:11',
					from_: '百度一下'
				}, {
					id: 1,
					title: '江苏东海给农业插上“数字化”翅膀',
					desc: '5月份,这些葡萄就可以销售了。”走进东海县石梁河镇金朵家庭农场,农场主曹桂林与父亲曹玉早正在种植的60亩温室内依据县农业物联网信息中心专家的“指令”,对葡萄进行抹芽、定梢和花穗',
					date: '2022-04-09 12:11',
					from_: '百度一下'
				}],
				swiper:null
			}
		},
		mounted: function() {
			var that = this;
			$(window).resize(function() {
				this.height = $(window).height() - this.titleheight;

				for (var key in that.charts) {
					that.charts[key].resize();
				}
				that.$refs['xuqiuchart'].resize();
				that.$refs['goodschart'].resize();
				that.$refs['costchart'].resize();
			});
			
			this.swiper = new Swiper('.swiper-container', {
				autoplay: 1000, //可选选项，自动滑动
				loop: true,
				direction: 'vertical',
				slidesPerView: (((this.height - 80) - 35)) / 110,
			})

			this.initcharts();

			//开始定时刷新报表数据
			this.startRefreshChart();
		},
		unmounted: function() {
			if (this.timer) {
				clearInterval(this.timer);
			}
		},
		methods: {
			/**
			 * 定时刷新报表数据
			 */
			startRefreshChart: function() {
				if (this.timer) {
					clearInterval(this.timer);
				}
				var that = this;

				//获取刷新周期，TODO 配置变动时，此处需自动更新
				var refreshtime = 60 * 1000;
				config.getConfig().forEach(function(item, index) {
					if (item.key == 'refreshtime') {
						refreshtime = item.value;
					}
				});

				this.timer = setInterval(function() {
					that.swiper.slideNext();
					
					//---------------
					var values = [(Math.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
							.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
							.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
							.random(100) * 100).toFixed(0)];
					that.xuqiuchart.series[0].data = values;
					that.xuqiuchart.series[1].data = values;
					that.xuqiuchart.series[2].data = values;
							
					//---------------
					var values = [(Math.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
							.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
							.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
							.random(100) * 100).toFixed(0)];
					that.goodschart.series[0].data = values;
					that.goodschart.series[1].data = values;
					that.goodschart.series[2].data = values;
							
					//---------------
					var dates = [];
					var start = new Date();
					start.setDate(start.getDate()-30);
					for(var i=new Date(start.getTime());i.getTime()<new Date().getTime();i.setDate(i.getDate()+1)){
						dates.push(i.format('MM-dd'));
					}
					
					var series = [];
					var xData = [];
					that.categorys.forEach(function (item,index){
						xData.push(item);
						series.push({
							name: item,
							data: [],
							type: 'line',
							stack:'1',
							// smooth:true,
							lineStyle: {
								nomal:{
									width:1,
									color: config.colors[index%config.colors.length]
								}
							},
							label: {
								show: true,
								formatter: '{c}%',
								position: 'top',
								color: 'rgba(255,228,59,1)',
								fontSize: 12,
								textAlign: 'center',
							}
						});
						for(var i=new Date(start.getTime());i.getTime()<new Date().getTime();i.setDate(i.getDate()+1)){
							series[index].data.push((Math.random(100) * 100).toFixed(0));
						}
					});		
					that.costchart.xAxis.data = dates;
					that.costchart.series = series;
				}, refreshtime);
			},
			initcharts: function() {
				this.xuqiuchart = this.initxuqiuchart();
				this.goodschart = this.initgoodschart();
				this.costchart = this.initcostchart();
			},
			initxuqiuchart: function() {
				var values = [(Math.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
							.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
							.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
							.random(100) * 100).toFixed(0)];
				return {
					backgroundColor: '#000000',
					grid: utils.createChartGaid(null, null, "20px", "20px"),
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow',
						},
					},
					xAxis: {
						axisLine: {
							show: true,
							lineStyle: {
								color: utils.getChartXColor()
							}
						},
						axisLabel: {
							color: utils.getChartXTextColor()
						},
						axisTick: {
							show: false
						},
						splitLine: {
							show: false
						},
						// boundaryGap: false,//
						data: this.categorys,
						type: 'category',
					},
					yAxis: {
						axisLabel: {
							color: utils.getChartYTextColor(),
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: utils.getChartXColor()
							}
						},
						splitLine: {
							lineStyle: {
								color: utils.getChartYColor(),
								type: 'dashed'
							},
						},
						name: '',
					},
					series: [
					// 	{
					// 	name: "含量",
					// 	data: [(Math.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
					// 		.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
					// 		.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
					// 		.random(100) * 100).toFixed(0)],
					// 	type: 'bar',
					// 	barWidth: '20px',
					// 	label: {
					// 		show: true,
					// 		formatter: '{c}%',
					// 		position: 'top',
					// 		color: 'rgba(255,228,59,1)',
					// 		fontSize: 12,
					// 		textAlign: 'center',
					// 	},
					// 	itemStyle: {
					// 		color: function(pama) {
					// 			var colors = ['#fac858', '#2aa7ee', '#ee6666', '#91cc75', '#38cafb',
					// 				'#4caff9', '#4adeca', '#0270f2', '#488cf7'
					// 			];
					// 			return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					// 					offset: 0,
					// 					color: colors[pama.dataIndex % colors.length] + 'ff',
					// 				},
					// 				{
					// 					offset: 1,
					// 					color: colors[pama.dataIndex % colors.length] + '66',
					// 				},
					// 			])
					// 		},
					// 		barBorderRadius: 20
					// 	}
					// },
					{
						name: '光照',
						type: 'bar',
						barWidth: '20px',
						barGap: '60%',
						itemStyle: {
							color: '#FF5252aa',
							borderColor: '#FF5252aa',
							borderWidth: 1,
							borderType: 'solid',
						},
						label: {
							show: true,
							formatter: '{c}' + '%',
							position: 'top',
							color: 'rgba(255,228,59,1)',
							fontSize: 12,
							textAlign: 'center',
						},
						zlevel: 2,
						data: values,
					},
					{
						name: '光照',
						type: 'pictorialBar',
						symbolSize: [20, 10],
						symbolOffset: [0, -5],
						symbolPosition: 'end',
						z: 15,
						color: '#FF5252',
						zlevel: 3,
						data: values,
					},
					{
						name: '光照',
						type: 'pictorialBar',
						symbolSize: [20, 10],
						symbolOffset: [0, 5],
						symbolPosition: 'start',
						z: 15,
						color: '#FF5252',
						zlevel: 3,
						data: values,
					}]
				};
			},
			initgoodschart: function() {
				var values = [(Math.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
							.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
							.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
							.random(100) * 100).toFixed(0)];
				return {
					backgroundColor: '#000000',
					grid: utils.createChartGaid(null, null, "20px", "20px"),
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow',
						},
					},
					xAxis: {
						axisLine: {
							show: true,
							lineStyle: {
								color: utils.getChartXColor()
							}
						},
						axisLabel: {
							color: utils.getChartXTextColor()
						},
						axisTick: {
							show: false
						},
						splitLine: {
							show: false
						},
						// boundaryGap: false,//
						data: this.categorys,
						type: 'category',
					},
					yAxis: {
						axisLabel: {
							color: utils.getChartYTextColor(),
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: utils.getChartXColor()
							}
						},
						splitLine: {
							lineStyle: {
								color: utils.getChartYColor(),
								type: 'dashed'
							},
						},
						name: '',
					},
					series: [
					// 	{
					// 	name: "含量",
					// 	data: [(Math.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
					// 		.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
					// 		.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math
					// 		.random(100) * 100).toFixed(0)],
					// 	type: 'bar',
					// 	barWidth: '20px',
					// 	label: {
					// 		show: true,
					// 		formatter: '{c}%',
					// 		position: 'top',
					// 		color: 'rgba(255,228,59,1)',
					// 		fontSize: 12,
					// 		textAlign: 'center',
					// 	},
					// 	itemStyle: {
					// 		color: function(pama) {
					// 			var colors = ['#fac858', '#4adeca', '#0270f2', '#488cf7', '#2aa7ee', '#ee6666', '#91cc75', '#38cafb',
					// 				'#4caff9'
					// 			];
					// 			return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					// 					offset: 0,
					// 					color: colors[pama.dataIndex % colors.length] + 'ff',
					// 				},
					// 				{
					// 					offset: 1,
					// 					color: colors[pama.dataIndex % colors.length] + '66',
					// 				},
					// 			])
					// 		},
					// 		barBorderRadius: 20
					// 	}
					// },
						{
							name: '光照',
							type: 'bar',
							barWidth: '20px',
							barGap: '60%',
							itemStyle: {
								color: '#BAFF7Faa',
								borderColor: '#BAFF7Faa',
								borderWidth: 1,
								borderType: 'solid',
							},
							label: {
								show: true,
								formatter: '{c}' + '%',
								position: 'top',
								color: 'rgba(255,228,59,1)',
								fontSize: 12,
								textAlign: 'center',
							},
							zlevel: 2,
							data: values,
						},
						{
							name: '光照',
							type: 'pictorialBar',
							symbolSize: [20, 10],
							symbolOffset: [0, -5],
							symbolPosition: 'end',
							z: 15,
							color: '#BAFF7F',
							zlevel: 3,
							data: values,
						},
						{
							name: '光照',
							type: 'pictorialBar',
							symbolSize: [20, 10],
							symbolOffset: [0, 5],
							symbolPosition: 'start',
							z: 15,
							color: '#BAFF7F',
							zlevel: 3,
							data: values,
						}
					]
				};
			},
			initcostchart: function() {
				var dates = [];
				var start = new Date();
				start.setDate(start.getDate()-30);
				for(var i=new Date(start.getTime());i.getTime()<new Date().getTime();i.setDate(i.getDate()+1)){
					dates.push(i.format('MM-dd'));
				}
				
				var series = [];
				var xData = [];
				this.categorys.forEach(function (item,index){
					xData.push(item);
					series.push({
						name: item,
						data: [],
						type: 'line',
						stack:'1',
						// smooth:true,
						lineStyle: {
							nomal:{
								width:1,
								color: config.colors[index%config.colors.length]
							}
						},
						label: {
							show: true,
							formatter: '{c}%',
							position: 'top',
							color: 'rgba(255,228,59,1)',
							fontSize: 12,
							textAlign: 'center',
						}
					});
					for(var i=new Date(start.getTime());i.getTime()<new Date().getTime();i.setDate(i.getDate()+1)){
						series[index].data.push((Math.random(100) * 100).toFixed(0));
					}
				});
				return {
					backgroundColor: '#000000',
					grid: utils.createChartGaid(null, null, "20px", "40px"),
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow',
						},
					},
					legend:{
						bottom:'0',
						x:'center',
						data:xData
					},
					xAxis: {
						axisLine: {
							show: true,
							lineStyle: {
								color: utils.getChartXColor()
							}
						},
						axisLabel: {
							color: utils.getChartXTextColor()
						},
						axisTick: {
							show: false
						},
						splitLine: {
							show: false
						},
						boundaryGap: false,//
						data: dates,
						type: 'category',
					},
					yAxis: {
						axisLabel: {
							color: utils.getChartYTextColor(),
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: utils.getChartXColor()
							}
						},
						splitLine: {
							lineStyle: {
								color: utils.getChartYColor(),
								type: 'dashed'
							},
						},
						name: '',
					},
					series: series
				};
			}
		}
	}
</script>

<style scoped="scoped">
	.chart {
		padding: 10px;
		overflow: hidden;
	}

	.itemtitle {
		background: linear-gradient(to right, #40a55f, #000, #000);
		height: 35px;
		line-height: 35px;
		padding-left: 10px;
	}

	.name_border {
		width: 100%;
		height: 1px;
		margin: 5px auto;
		background: linear-gradient(90deg, rgba(0, 0, 0, 0), #40a55f, #40a55f, #40a55f, #40a55f, rgba(0, 0, 0, 0));
	}

	.name_v_border {
		width: 1px;
		height: 70px;
		background: linear-gradient(0deg, rgba(0, 0, 0, 0), #40a55f, #40a55f, rgba(0, 0, 0, 0));
	}
	
	
	.newitem {
		height: 110px;
		border-bottom: 1px dotted rgba(255, 255, 255, 0.5);
		font-size: 14px;
		line-height: 20px;
		color: #999;
		cursor: pointer;
	}
	
	.newitem .title {
		font-size: 16px;
		line-height: 35px;
		height: 35px;
		text-align: left;
		color: #FF5722;
	}
	
	.newitem .desc {
		height: 40px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* // 显示的行 */
	}
	
	.newitem:hover {
		color: #fac858aa;
	}
</style>
