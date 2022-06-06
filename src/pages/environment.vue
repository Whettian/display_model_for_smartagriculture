<template>
	<!-- 天气相关情况：温度、湿度、降雨量、光照、二氧化碳等 -->
	<!-- 土壤相关情况：PH值、虫灾情况、土壤盐度、灌溉情况、风向、风速、实时天气情况 -->
	<el-row>
		<el-col :span="7">
			<!-- 实时天气情况 -->
			<div class="chart" :style="{height:((height-80)/3 - 40)+'px'}">
				<div class="itemtitle" style="">实时天气情况</div>
				<div style="padding:10px;;">
					<div class="flex" style="height:30px;line-height: 30px;">
						<div class="flex_item">
							<el-icon style="position: relative;top:2px">
								<add-location />
							</el-icon>
							<span style="margin-left: 5px;">北京</span>
						</div>
						<div class="flex_item" style="text-align: right;color:#999;font-size:12px">高德地图</div>
					</div>
					<!-- TODO 此处的尺寸写死不太对，需要自适应 -->
					<div style="height: 100px;margin-top: 20px" class="flex">
						<div class="flex_item">
							<div class="flex" style="line-height:35px;text-align: center;">
								<div class="flex_item">
									<div style="font-size:20px;color:#FF5252">{{wendu}}℃</div>
									<div>温度</div>
								</div>
								<div class="name_v_border"></div>
								<div class="flex_item">
									<div style="font-size:20px;color:#5FB878">东南</div>
									<div>风向</div>
								</div>
							</div>
							<div class="name_border"></div>
							<div class="flex" style="line-height:35px;text-align: center;">
								<div class="flex_item">
									<div style="font-size:20px;color:#2A8BFD">{{fensu}}km/h</div>
									<div>分速</div>
								</div>
								<div class="name_v_border"></div>
								<div class="flex_item">
									<div style="font-size:20px;color:#4adeca">{{shidu}}rh</div>
									<div>湿度</div>
								</div>
							</div>
						</div>
						<div style="width:100px;line-height:30px;">
							<div style="text-align: center;padding-top: 20px;">
								<img src="../assets/5.png" style="width:60px" />
								<div style="font-size: 28px;">晴</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 土地类型分布，旱地、水地、山地 -->
			<div class="chart" :style="{height:((height-80)/3 - 10)+'px'}">
				<div class="itemtitle" style="">耕地类型分布</div>
				<v-chart ref="categorychart" :style="{height:(((height-80)/3 - 30 - 15)+'px')}"
					:option="categorychart" />
			</div>
			<!-- 历史降雨量走势 -->
			<div class="chart" :style="{height:((height-80)/3 - 20)+'px'}">
				<div class="itemtitle" style="">降雨量走势</div>
				<v-chart ref="yushuichart" :style="{height:(((height-80)/3 - 30 - 15)+'px')}" :option="yushuichart" />
			</div>
		</el-col>
		<el-col :span="10">
			<!-- 当前光照、湿度、温度等 -->
			<div class="chart" :style="{height:(height-80 - 20)+'px'}">
				<div class="itemtitle" style="">光照、湿度、温度、氮磷钾含量</div>
				<div>
					<div class="flex">
						<div class="flex_item">
							<!-- 土壤温度 -->
							<v-chart ref="tempchart" :style="{height:((height-80 - 65)/3+'px')}" :option="tempchart" />
						</div>
						<div class="flex_item">
							<!-- 土壤湿度 -->
							<v-chart ref="shiduchart" :style="{height:((height-80 - 65)/3+'px')}"
								:option="shiduchart" />
						</div>
					</div>
					<div class="name_border"></div>
					<div class="flex">
						<div class="flex_item">
							<!-- 光照情况 -->
							<v-chart ref="ligtechart" :style="{height:((height-80 - 65)/3+'px')}"
								:option="ligtechart" />
						</div>
						<div class="flex_item">
							<!-- 土壤磷含量 -->
							<v-chart ref="linchart" :style="{height:((height-80 - 65)/3+'px')}" :option="linchart" />
						</div>
					</div>
					<div class="name_border"></div>
					<div class="flex">
						<div class="flex_item">
							<!-- 土壤氮含量 -->
							<v-chart ref="danchart" :style="{height:((height-80 - 65)/3+'px')}" :option="danchart" />
						</div>
						<div class="flex_item">
							<!-- 土壤钾含量 -->
							<v-chart ref="jiachart" :style="{height:((height-80 - 65)/3+'px')}" :option="jiachart" />
						</div>
					</div>
				</div>
			</div>
		</el-col>
		<el-col :span="7">
			<!-- PH值 -->
			<div class="chart" :style="{height:((height-80)/3 - 20)+'px'}">
				<div class="itemtitle" style="">土壤PH值</div>

				<v-chart ref="phchart" :style="{height:(((height-80)/3 - 40 - 15)+'px')}" :option="phchart" />
			</div>
			<!-- 土壤盐度 -->
			<div class="chart" :style="{height:((height-80)/3 - 20)+'px'}">
				<div class="itemtitle" style="">土壤盐度</div>
				<v-chart ref="yanchart" :style="{height:(((height-80)/3 - 40 - 15)+'px')}" :option="yanchart" />
			</div>

			<!-- 灌溉情况 -->
			<div class="chart" :style="{height:((height-80)/3 - 10)+'px'}" style="padding:0px">
				<div class="itemtitle" style="">灌溉情况</div>
				<v-chart ref="guangaichart" :style="{height:(((height-80)/3 - 40 - 15)+'px')}" :option="guangaichart" />
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
				wendu:(Math.random(38) * 100).toFixed(0),
				fensu:(Math.random(38) * 100).toFixed(0),
				shidu:(Math.random(38) * 100).toFixed(0),
				areas: ['穆家村', '王李村', '曹家湾', '刘家湾', '潘家集', '赵家村'],
				categorychart: {},
				yushuichart: {},
				tempchart: {},
				shiduchart: {},
				ligtechart: {},
				linchart: {},
				danchart: {},
				jiachart: {},
				phchart: {},
				yanchart: {},
				guangaichart: {},
			}
		},
		mounted: function() {
			var that = this;
			$(window).resize(function() {
				this.height = $(window).height() - this.titleheight;

				for (var key in that.charts) {
					that.charts[key].resize();
				}
				that.$refs['categorychart'].resize();
				that.$refs['yushuichart'].resize();
				that.$refs['tempchart'].resize();
				that.$refs['shiduchart'].resize();
				that.$refs['ligtechart'].resize();
				that.$refs['linchart'].resize();
				that.$refs['danchart'].resize();
				that.$refs['jiachart'].resize();
				that.$refs['phchart'].resize();
				that.$refs['yanchart'].resize();
				that.$refs['guangaichart'].resize();
			});

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
					that.wendu = (Math.random(38) * 100).toFixed(0);
					that.fensu = (Math.random(38) * 100).toFixed(0);
					that.shidu = (Math.random(38) * 100).toFixed(0);
					//------------
					// 	this.categorychart = this.initcategorychart();
					that.categorychart.series[0].data = [(Math.random(38) * 100).toFixed(0), (Math.random(
						100) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(
						100) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(
						100) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0)];
					//------------
					// 	this.yushuichart = this.inityushuichart();
					that.yushuichart.series[0].data = [(Math.random(38) * 100).toFixed(0), (Math.random(38) *
							100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100)
						.toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(
							0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (
							Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0)
					];
					//------------
					// 	this.tempchart = this.inittempchart();
					that.tempchart.series[0].data = [(Math.random(38) * 100).toFixed(0), (Math.random(38) *
							100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100)
						.toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(
							0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (
							Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0)
					];
					//------------
					// 	this.shiduchart = this.initshiduchart();
					that.shiduchart.series[0].data = [(Math.random(38) * 100).toFixed(0), (Math.random(38) *
							100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100)
						.toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(
							0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (
							Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0)
					];
					//------------
					// 	this.ligtechart = this.initligtechart();
					var values = [(Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (
						Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
						.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
						.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
						.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
						.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0)];
					that.ligtechart.series[0].data = values;
					that.ligtechart.series[1].data = values;
					//------------
					// 	this.linchart = this.initlinchart();
					that.linchart.series[0].data = [(Math.random(38) * 100).toFixed(0), (Math.random(38) *
							100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100)
						.toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(
							0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (
							Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0)
					];
					//------------
					// 	this.danchart = this.initdanchart();
					that.danchart.series[0].data = [(Math.random(38) * 100).toFixed(0), (Math.random(38) *
							100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100)
						.toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(
							0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (
							Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0)
					];
					//------------
					// 	this.jiachart = this.initjiachart();
					that.jiachart.series[0].data = [(Math.random(38) * 100).toFixed(0), (Math.random(38) *
							100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100)
						.toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(
							0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (
							Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0)
					];
					//------------
					// 	this.phchart = this.initphchart();
					that.phchart.series[0].data = [(Math.random(38) * 14).toFixed(1), (Math.random(38) *
							14).toFixed(1), (Math.random(38) * 14).toFixed(1), (Math.random(38) * 14).toFixed(1), (Math.random(38) * 14).toFixed(1), (Math.random(38) * 14).toFixed(1), (Math.random(38) * 14).toFixed(1), (Math.random(38) * 14).toFixed(1), (
							Math.random(38) * 14).toFixed(1), (Math.random(38) * 14).toFixed(1), (Math
							.random(38) * 14).toFixed(1), (Math.random(38) * 14).toFixed(1)
					];
					//------------
					// 	this.yanchart = this.inityanchart();
					that.yanchart.series[0].data = [(Math.random(38) * 100).toFixed(0), (Math.random(38) *
							100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100)
						.toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(
							0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (
							Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0)
					];
					//------------
					// 	this.guangaichart = this.initguangaichart();
					that.guangaichart.series[0].data = [(Math.random(38) * 100).toFixed(0), (Math.random(
						100) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(
						100) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(
						100) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(
						100) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(
						100) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(
						100) * 100).toFixed(0)];
				}, refreshtime);
			},
			initcharts: function() {
				this.categorychart = this.initcategorychart();
				this.yushuichart = this.inityushuichart();
				this.tempchart = this.inittempchart();
				this.shiduchart = this.initshiduchart();
				this.ligtechart = this.initligtechart();
				this.linchart = this.initlinchart();
				this.danchart = this.initdanchart();
				this.jiachart = this.initjiachart();
				this.phchart = this.initphchart();
				this.yanchart = this.inityanchart();
				this.guangaichart = this.initguangaichart();
			},
			initcategorychart: function() {
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
						data: ['旱地', '水地', '山地', '大棚', '产业园'],
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
					series: [{
						name: "含量",
						data: [(Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0)],
						type: 'bar',
						barWidth: '20px',
						label: {
							show: true,
							formatter: '{c}',
							position: 'top',
							color: 'rgba(255,228,59,1)',
							fontSize: 12,
							textAlign: 'center',
						},
						itemStyle: {
							color: function(pama) {
								var colors = ['#fac858', '#2aa7ee', '#ee6666', '#91cc75', '#38cafb',
									'#4caff9', '#4adeca', '#0270f2', '#488cf7'
								];
								return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: colors[pama.dataIndex % colors.length] + 'ff',
									},
									{
										offset: 1,
										color: colors[pama.dataIndex % colors.length] + '66',
									},
								])
							},
							barBorderRadius: 20
						}
					}]
				};
			},
			inityushuichart: function() {
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
						boundaryGap: false, //
						data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
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
					series: [{
						name: "含量",
						data: [120, 200, 150, 80, 70, 110, 140, 140, 140, 140, 140, 140],
						type: 'line',
						lineStyle: {
							normal: {
								width: 1,
								color: "#00CAFF", // 线条颜色
							}
						},
						label: {
							show: true,
							formatter: '{c}',
							position: 'top',
							color: '#00CAFF',
							fontSize: 12,
							textAlign: 'center',
						}
					}]
				}
			},
			inittempchart: function() {
				return {
					backgroundColor: '#000000',
					title: utils.createChartTitle('温度'),
					grid: utils.createChartGaid(null, '20px', "50px", "40px"),
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
						boundaryGap: false, //
						data: this.areas,
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
					series: [{
						name: "含量",
						data: [(Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0)],
						type: 'line',
						lineStyle: {
							normal: {
								width: 1,
								color: "#FF8A26", // 线条颜色
							}
						},
						label: {
							show: true,
							formatter: '{c}',
							position: 'top',
							color: 'rgba(255,228,59,1)',
							fontSize: 12,
							textAlign: 'center',
						},
						areaStyle: { //区域填充样式
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: "#FF8A26ff"
									},
									{
										offset: 1,
										color: "#FF8A2600"
									}
								], false),
								shadowColor: '#FF8A2688', //阴影颜色
								shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
							}
						}
					}]
				}
			},
			initshiduchart: function() {
				return {
					backgroundColor: '#000000',
					title: utils.createChartTitle('湿度'),
					grid: utils.createChartGaid(null, '20px', "50px", "40px"),
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
						boundaryGap: false, //
						data: this.areas,
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
					series: [{
						name: "含量",
						data: [(Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0)],
						type: 'line',
						lineStyle: {
							normal: {
								width: 1,
								color: "#01AAED", // 线条颜色
							}
						},
						label: {
							show: true,
							formatter: '{c}',
							position: 'top',
							color: 'rgba(255,228,59,1)',
							fontSize: 12,
							textAlign: 'center',
						},
						areaStyle: { //区域填充样式
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: "#01AAEDff"
									},
									{
										offset: 1,
										color: "#01AAED00"
									}
								], false),
								shadowColor: '#01AAED88', //阴影颜色
								shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
							}
						}
					}]
				}
			},
			initligtechart: function() {
				var value = [(Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(
						100) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100)
					.toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0)
				];
				return {
					backgroundColor: '#000000',
					title: utils.createChartTitle('光照'),
					grid: utils.createChartGaid(null, '20px', "50px", "40px"),
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
						data: this.areas,
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
					series: [{
						name: '光照',
						type: 'bar',
						barWidth: '20px',
						barGap: '60%',
						itemStyle: {
							color: '#FF5252',
							borderColor: '#FF5252',
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
						data: value,
					},
					{
						name: '光照',
						type: 'pictorialBar',
						symbolSize: [20, 10],
						symbolOffset: [0, -5],
						symbolPosition: 'end',
						z: 15,
						color: '#ffc241',
						zlevel: 2,
						data: value,
					}]
				}
			},
			initlinchart: function() {
				return {
					backgroundColor: '#000000',
					title: utils.createChartTitle('磷含量'),
					grid: utils.createChartGaid(null, '20px', "50px", "40px"),
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
						data: this.areas,
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
					series: [{
						// name: "含量",
						// data: [(Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0)],
						// type: 'line',
						// itemStyle:{
						// 	color:'#6648FF'
						// }
						type: 'pictorialBar',
						itemStyle: {
							normal: {
								color: '#6DF95A',
							},
						},
						symbolRepeat: 'fixed',
						symbolMargin: 4,
						symbol: 'rect',
						symbolClip: true,
						symbolSize: [20, 8],
						symbolPosition: 'start',
						symbolOffset: [0, -1],
						data: [(Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0)],
						z: 0,
						zlevel: 8
					}]
				}
			},
			initdanchart: function() {
				return {
					backgroundColor: '#000000',
					title: utils.createChartTitle('氮含量'),
					grid: utils.createChartGaid(null, '20px', "50px", "40px"),
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
						data: this.areas,
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
					series: [{
						// name: "含量",
						// data: [(Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0)],
						// type: 'line',
						// itemStyle:{
						// 	color:'#ee6666'
						// },
						type: 'pictorialBar',
						itemStyle: {
							normal: {
								color: '#ee6666',
							},
						},
						symbolRepeat: 'fixed',
						symbolMargin: 4,
						symbol: 'rect',
						symbolClip: true,
						symbolSize: [20, 8],
						symbolPosition: 'start',
						symbolOffset: [0, -1],
						data: [(Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0)],
						z: 0,
						zlevel: 8,
					}]
				}
			},
			initjiachart: function() {
				return {
					backgroundColor: '#000000',
					title: utils.createChartTitle('钾含量'),
					grid: utils.createChartGaid(null, '20px', "50px", "40px"),
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
						data: this.areas,
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
					series: [{
						// name: "含量",
						// data: [(Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0)],
						// type: 'line',
						// itemStyle:{
						// 	color:'#488cf7'
						// }
						type: 'pictorialBar',
						itemStyle: {
							normal: {
								color: '#488cf7',
							},
						},
						symbolRepeat: 'fixed',
						symbolMargin: 4,
						symbol: 'rect',
						symbolClip: true,
						symbolSize: [20, 8],
						symbolPosition: 'start',
						symbolOffset: [0, -1],
						data: [(Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0)],
						z: 0,
						zlevel: 8,
					}]
				}
			},
			initphchart: function() {
				return {
					backgroundColor: '#000000',
					// title:utils.createChartTitle('钾含量'),
					grid: utils.createChartGaid(null, '20px', "20px", "20px"),
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
						data: this.areas,
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
					series: [{
						name: "含量",
						data: [(Math.random(38) * 14).toFixed(1), (Math.random(38) * 14).toFixed(1), (Math
							.random(38) * 14).toFixed(1), (Math.random(38) * 14).toFixed(1), (Math
							.random(38) * 14).toFixed(1), (Math.random(38) * 14).toFixed(1), (Math
							.random(38) * 14).toFixed(1)],
						type: 'bar',
						barWidth: '20px',
						itemStyle: {
							color: function(pama){
								if(pama.value > 7){
									return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 0,
											color: '#488cf7ff',
										},
										{
											offset: 1,
											color: '#488cf7bb',
										},
									])
								}else{
									return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 0,
											color: '#FF5252ff',
										},
										{
											offset: 1,
											color: '#FF5252bb',
										},
									])
								}
							},
							barBorderRadius: 20
						},
						label: {
							show: true,
							formatter: '{c}',
							position: 'top',
							color: '#fff',
							fontSize: 12,
							textAlign: 'center',
						}
					}]
				};
			},
			inityanchart: function() {
				return {
					backgroundColor: '#000000',
					// title:utils.createChartTitle('钾含量'),
					grid: utils.createChartGaid(null, '20px', "20px", "20px"),
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
						data: this.areas,
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
					series: [{
						name: "含量",
						data: [(Math.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0), (Math.random(38) * 100).toFixed(0), (Math
							.random(38) * 100).toFixed(0)],
						type: 'bar',
						barWidth: '20px',
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#FF5722ff',
								},
								{
									offset: 1,
									color: '#FF5722bb',
								},
							]),
							barBorderRadius: 20
						},
						label: {
							show: true,
							formatter: '{c}',
							position: 'top',
							color: '#FF5722',
							fontSize: 12,
							textAlign: 'center',
						}
					}]
				};
			},
			initguangaichart: function() {
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
						boundaryGap: false, //
						data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
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
					series: [{
						name: "含量",
						data: [120, 200, 150, 80, 70, 110, 140, 140, 140, 140, 140, 140],
						type: 'line',
						itemStyle: {
							color: '#00FAC1'
						},
						label: {
							show: true,
							formatter: '{c}',
							position: 'top',
							color: '#00FAC1',
							fontSize: 12,
							textAlign: 'center',
						}
					}]
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
</style>
