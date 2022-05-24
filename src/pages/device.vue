<template>
	<!-- 设备种类
	设备状态
	设备告警
	设备分布 -->
	<el-row>
		<el-col :span="18">
			<div style="padding:10px;position: relative;">
				<!-- 展示可搜索的地图 -->
				<div id="mapchart" style="position: relative;" :style="{height:(height-80 - 20)+'px'}"></div>
			</div>
		</el-col>
		<el-col :span="6">
			<div class="chart" :style="{height:((height-80)/3 - 40)+'px'}">
				<div class="itemtitle" style="">设备种类</div>
				<v-chart ref="categorychart" :style="{height:(((height-80)/3 - 20 - 35)+'px')}" :option="categorychart" />
			</div>
			<div class="chart" :style="{height:((height-80)/3 - 40)+'px'}">
				<div class="itemtitle" style="">设备状态</div>
				<v-chart ref="statuschart" :style="{height:(((height-80)/3 - 20 - 35)+'px')}" :option="statuschart" />
			</div>
			<div class="chart" :style="{height:((height-80)/3+15)+'px'}">
				<div class="itemtitle" style="">设备告警</div>
				<div :style="{height:(((height-80)/3)+'px')}">
					<div v-for="(item,index) in alerts" class="alertitem" >
						<div class="innner flex">
							<div><el-icon size="22" style="position: relative;top:2px;color:#FF5722"><warning /></el-icon></div>
							<div class="flex_item title">{{item.title}}</div>
							<div style="width:200px;font-size:12px;text-align: right;padding-right: 15px;">时间：{{item.date}}</div>
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
	import 'echarts-extension-amap';

	import 'echarts-wordcloud';
		
	export default{
		components: {
			VChart
		},
		provide: {
			[THEME_KEY]: "dark"
		},
		data(){
			 return{
				height: $(window).height(),
				categorychart: {},
				statuschart: {},
				charts: {},
				timer: null,
				alerts:[{
					id:1,
					title:'设备0011离线了',
					date:'2022-04-10 23:12:11'
				},{
					id:1,
					title:'设备002电量低',
					date:'2022-04-10 23:12:11'
				},{
					id:1,
					title:'设备003型号差',
					date:'2022-04-10 23:12:11'
				},{
					id:1,
					title:'设备005被拆卸',
					date:'2022-04-10 23:12:11'
				},{
					id:1,
					title:'设备006离线了',
					date:'2022-04-10 23:12:11'
				},{
					id:1,
					title:'设备0011离线了',
					date:'2022-04-10 23:12:11'
				},{
					id:1,
					title:'设备0011离线了',
					date:'2022-04-10 23:12:11'
				},{
					id:1,
					title:'设备0011离线了',
					date:'2022-04-10 23:12:11'
				},{
					id:1,
					title:'设备0011离线了',
					date:'2022-04-10 23:12:11'
				}]
			 }
		},
		mounted:function(){
			var that = this;
			$(window).resize(function() {
				this.height = $(window).height() - this.titleheight;
			
				for (var key in that.charts) {
					that.charts[key].resize();
				}
				that.$refs['categorychart'].resize();
				that.$refs['statuschart'].resize();
			});
			
			this.loadData();
			
			//开始定时刷新报表数据
			this.startRefreshChart();
		},
		unmounted:function(){
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
					let echartData = [{
						name: "监控摄像头",
						value: (Math.random(100) * 100).toFixed(0)
					},
					{
						name: "雨水采集器",
						value: (Math.random(100) * 100).toFixed(0)
					},
					{
						name: "土壤湿度检测仪",
						value: (Math.random(100) * 100).toFixed(0)
					},
					{
						name: "温度检测器",
						value: (Math.random(100) * 100).toFixed(0)
					},
					{
						name: "土壤元素检测",
						value: (Math.random(100) * 100).toFixed(0)
					},
					{
						name: "空气湿度检测仪",
						value: (Math.random(100) * 100).toFixed(0)
					}];
					let total = echartData.reduce((a, b) => {
					    return a + b.value * 1
					}, 0);
					that.categorychart.title[0].text = '{name|总量}\n{val|' + total + '}';
					that.categorychart.series[0].data = echartData;
					
					that.statuschart.series[0].data[0].value = [(Math.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0), (Math.random(100) * 100).toFixed(0)];
				}, refreshtime);
			},
			loadData: function() {
				var that = this;
				api.loadMapData(function(res) {
					if (!res || res.status != 200) {
						utils.showerror("数据加载失败！");
						return;
					}
					that.initMapChart(res);
				});
				
				this.categorychart = this.initcategorychart();
				this.statuschart = this.initstatuschart();
			},
			initcategorychart: function(res) {
				let bgColor = '#001037';
				let title = '总量';
				let color = ['#fac858', '#ee6666', '#91cc75', '#38cafb', '#4caff9', '#4adeca', '#2aa7ee', '#0270f2', '#488cf7','#38cafb', '#4caff9', '#4adeca', '#2aa7ee', '#0270f2', '#488cf7'];
				let echartData = [{
					name: "监控摄像头",
					value: (Math.random(100) * 100).toFixed(0)
				},
				{
					name: "雨水采集器",
					value: (Math.random(100) * 100).toFixed(0)
				},
				{
					name: "土壤湿度检测仪",
					value: (Math.random(100) * 100).toFixed(0)
				},
				{
					name: "温度检测器",
					value: (Math.random(100) * 100).toFixed(0)
				},
				{
					name: "土壤元素检测",
					value: (Math.random(100) * 100).toFixed(0)
				},
				{
					name: "空气湿度检测仪",
					value: (Math.random(100) * 100).toFixed(0)
				}];
				let total = echartData.reduce((a, b) => {
				    return a + b.value * 1
				}, 0);
				return {
					backgroundColor: '#000000',//此处背景色需要共主题处获取
					color: color,
					title: [{
						text: '{name|' + title + '}\n{val|' + total + '}',
						top: 'center',
						left: 'center',
						textStyle: {
							rich: {
								name: {
									fontSize: 12,
									fontWeight: 'normal',
									color: '#fefefe',
									padding: [10, 0]
								},
								val: {
									fontSize: 16,
									fontWeight: 'bolder',
									color: '#fefefe',
								}
							}
						}
					}],
					series: [{
						type: 'pie',
						roseType: 'radius',
						radius: ['25%', '60%'],
						center: ['50%', '50%'],
						data: echartData,
						hoverAnimation: false,
						itemStyle: {
							normal: {
								borderColor: bgColor,
								borderWidth: 1
							}
						},
						labelLine: {
							normal: {
								length: 10,
								length2: 20
							}
						},
						label: {
							normal: {
								formatter: params => {
									return (
										'{icon|●}{name|' + params.name + '}\n{value|' +
										params.value + '}'
									);
								},
								rich: {
									icon: {
										fontSize: 12,
										color: 'inherit'
									},
									name: {
										fontSize: 12,
										padding: [0, 0, 0, 10],
										color: '#fefefe'
									},
									value: {
										fontSize: 12,
										fontWeight: 'bolder',
										padding: [10, 0, 0, 20],
										color: 'inherit'
										// color: '#333333'
									}
								}
							}
						},
					}]
				};
			},
			initstatuschart: function(res) {
				var indicator = [{
					text: '正常设备',
					max: 100,
				},
				{
					text: '故障设备',
					max: 100
				},
				{
					text: '报警设备',
					max: 100
				},
				{
					text: '离线设备',
					max: 100,
					//  axisLabel: {show: true, textStyle: {fontSize: 18, color: '#333'}}
				}];
				var dataArr = [
				    {
				        value: [24, 35, 22, 33, 20, 16],
				        itemStyle: {
				            normal: {
				                lineStyle: {
									width:1,
				                    color: '#FF8A26',
				                },
				                shadowColor: '#FF8A26',
				                shadowBlur: 10,
				            },
				        },
				        areaStyle: {
							normal: { // 单项区域填充样式
								color: {
									type: 'radial',
									x: 0.5, //右
									y: 0.5, //下
									r: 1,
									colorStops: [{
										offset: 1,
										color: '#FF8A26'
									}, {
										offset: 0,
										color: 'rgba(0,0,0,0)'
									}],
									globalCoord: false
								},
								opacity: 0.8 // 区域透明度
							}
						}
				    }
				];
				var colorArr = ['#FF8A26']; //颜色
				return {
				    backgroundColor: '#000000',
				    color: colorArr,
				    radar: {
				        shape: 'polygon',
				        name: {
				            textStyle: {
				                color: '#fff',
				                fontSize: 14
				            },
				        },
				        label:{
							distance:5,  
				        },
						radius:'60%',
				        indicator: indicator,
				        splitNumber:3,
				        splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
				            show: true,
				            areaStyle: { // 分隔区域的样式设置。
				                color: ['rgba(24,60,108,.5)', 'rgba(15,36,80,.5)','rgba(12,25,59,.5)'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
				            }
				        },
				        axisLine: { //指向外圈文本的分隔线样式
				            lineStyle: {
				                color: utils.getChartXColor()
				            }
				        },
				        splitLine: {
				            lineStyle: {
				                color: utils.getChartXColor(), // 分隔线颜色
				                width: 1, // 分隔线线宽
				            }
				        },
				    },
				    series: [{
				        type: 'radar',
				        symbolSize: 5,
				        data: dataArr
				    }]
				};
			},
			initMapChart: function(res) {
				var mapchart = this.$echarts.init(document.getElementById('mapchart'));
				var values1 = [];
				var values2 = [];
				for (var i = 0; i < res.data.geoCoordMap.length; i++) {
					if(i%2 == 0){
						values1.push([res.data.geoCoordMap[i][0], res.data.geoCoordMap[i][1]], (Math.random() * 1000)
							.toFixed(0));
					}else{
						values2.push([res.data.geoCoordMap[i][0], res.data.geoCoordMap[i][1]], (Math.random() * 1000)
							.toFixed(0));
					}
				}
			
				var option = {
					geoCoordMap: res.data.geoCoordMap,
					title: utils.createChartTitle('设备分布概览'),
					legend:{
						bottom:'0',
						x:'center',
						data:['正常设备','异常设备'],
						textStyle:{
							color:'#fff'
						}
					},
					amap: {
						rotateEnable: true,
						pitchEnable: true,
						pitch: 45,
						// rotation: -45,
						// 3D模式，无论你使用的是1.x版本还是2.x版本，都建议开启此项以获得更好的渲染体验
						viewMode: '3D',
						// 高德地图支持的初始化地图配置
						// 高德地图初始中心经纬度
						center: [116.436561, 39.897346],
						// 高德地图初始缩放级别
						zoom: 9,
						// 是否开启resize
						resizeEnable: true,
						// 自定义地图样式主题
						mapStyle: 'amap://styles/darkblue',
						// 移动过程中实时渲染 默认为true 如数据量较大 建议置为false
						renderOnMoving: true,
						// ECharts 图层的 zIndex 默认 2000
						// 从 v1.9.0 起 此配置项已被弃用 请使用 `echartsLayerInteractive` 代替
						echartsLayerZIndex: 2019,
						// 设置 ECharts 图层是否可交互 默认为 true
						// 设置为 false 可实现高德地图自身图层交互
						// 此配置项从 v1.9.0 起开始支持
						echartsLayerInteractive: true,
						// 是否启用大数据模式 默认为 false
						// 此配置项从 v1.9.0 起开始支持
						layers: [new AMap.TileLayer.Satellite()],
						largeMode: false
						// 说明：如果想要添加卫星、路网等图层
						// 暂时先不要使用layers配置，因为存在Bug
						// 建议使用amap.add的方式，使用方式参见最下方代码
					},
					series: [{
						name:'正常设备',
						type: 'effectScatter',
						// 使用百度地图坐标系
						coordinateSystem: 'amap',
						//设置图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
						// symbol: 'image://http://localhost:3000/src/assets/video.png',
						symbol: 'pin',
						// //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10
						symbolSize: [20, 20],
						itemStyle: {
							normal: {
								color: '#FF5252', //标志颜色
							}
						},
						// 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
						data: values1,
						rippleEffect: {
							scale: 6,
							brushType: "stroke"
						},
						hoverAnimation: true, //是否开启鼠标 hover 的提示动画效果。
					},{
						name:'异常设备',
						type: 'effectScatter',
						// 使用百度地图坐标系
						coordinateSystem: 'amap',
						//设置图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
						// symbol: 'image://http://localhost:3000/src/assets/video.png',
						symbol: 'pin',
						// //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10
						symbolSize: [20, 20],
						itemStyle: {
							normal: {
								color: '#00FAC1', //标志颜色
							}
						},
						// 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
						data: values2,
						rippleEffect: {
							scale: 6,
							brushType: "stroke"
						},
						hoverAnimation: true, //是否开启鼠标 hover 的提示动画效果。
					}]
				}
				// 使用刚指定的配置项和数据显示图表。
				mapchart.setOption(option);
			
				// 获取 ECharts 高德地图组件
				var amapComponent = mapchart.getModel().getComponent('amap');
				// 获取高德地图实例，使用高德地图自带的控件(需要在高德地图js API script标签手动引入)
				var amap = amapComponent.getAMap();
				// 添加控件
				amap.addControl(new AMap.Scale());
				amap.addControl(new AMap.ToolBar());
				amap.addControl(new AMap.ControlBar({
					position: {
						left: '10px',
						top: '10px'
					},
					showControlButton: true,  // 是否显示倾斜、旋转按钮。默认为 true
				}));
				// amap.addControl(new AMap.MapType({
				// 	defaultType: 1,
				// 	position: {
				// 		right: '30px',
				// 		top: '10px'
				// 	}
				// }));
				// 禁用 ECharts 图层交互，从而使高德地图图层可以点击交互
				amapComponent.setEChartsLayerInteractive(false);
				
				var disProvince = new AMap.DistrictLayer.Province({
					zIndex: 1000,
					adcode: [110000],
					depth: 2,
					styles: {
						'fill': function(properties) {
							// properties为可用于做样式映射的字段，包含
							// NAME_CHN:中文名称
							// adcode_pro
							// adcode_cit
							// adcode
							// console.log(properties)
							var adcode = properties.adcode;
							// var colors = {};
							// if (!colors[adcode]) {
							// 	var gb = Math.random() * 155 + 50;
							// 	colors[adcode] = 'rgb(' + gb + ',' + gb + ',255)';
							// }
							// return colors[adcode];
							var colors = ['#fac858', '#ee6666', '#91cc75', '#38cafb', '#4caff9', '#4adeca',
								'#2aa7ee', '#0270f2', '#488cf7'
							];
							return colors[adcode % colors.length] + 'aa';
			
							// return 'red';
						},
						'province-stroke': 'cornflowerblue',
						'city-stroke': 'white', // 中国地级市边界
						'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
					}
				});
				disProvince.setMap(amap);
			
				this.charts['mapchart'] = mapchart;
				
				// setTimeout(function(){
				// 	amap.setZoom(9,false,30000);
				// 	amap.setPitch(45,false,30000);
				// },1000);
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
	.alertitem{
		line-height: 30px;
		height: 30px;
		font-size: 14px;
		color:#fff;
		background-color: #FF572233;
		padding-left: 15px;
		border-radius: 35px;
		margin-top: 10px;
	}
	.alertitem .title{
		margin-left: 5px;
		text-align: left;
		font-size: 14px;
	}
</style>

