<template>
	<el-row>
		<el-col :span="6">
			<div class="chart" :style="{height:((height-80)/3 - 40)+'px'}">
				<div class="itemtitle" style="">基本情况</div>
				<el-row :style="{paddingTop:((((height-80)/3 - 40)/2)/2 - 35)/2+'px'}">
					<el-col :span="8">
						<div class="flex">
							<div style="width:60px;text-align: center;line-height: 100px;">
								<el-icon :size="40" style="">
									<football />
								</el-icon>
							</div>
							<div class="flex_item" style="text-align: center;">
								<div style="line-height: 40px;color: #24fda3;">
									<span style="font-size: 24px;font-weight: bold;">{{size}}</span>
									<span style="font-size:20px;margin-left:5px">㎡</span>
								</div>
								<div style="line-height: 40px;color: #fff;font-size: 16px;">
									<span style="margin-left: 5px;">种植面积</span>
								</div>
							</div>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="flex">
							<div style="width:60px;text-align: center;line-height: 100px;">
								<el-icon :size="40" style="">
									<user />
								</el-icon>
							</div>
							<div class="flex_item" style="text-align: center;">
								<div style="line-height: 40px;color: #24fda3;">
									<span style="font-size: 24px;font-weight: bold;">{{count}}</span>
									<span style="font-size:20px;margin-left:5px">户</span>
								</div>
								<div style="line-height: 40px;color: #fff;font-size: 16px;">
									<span style="margin-left: 5px;">农户数量</span>
								</div>
							</div>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="flex">
							<div style="width:60px;text-align: center;line-height: 100px;">
								<el-icon :size="40" style="">
									<cellphone />
								</el-icon>
							</div>
							<div class="flex_item" style="text-align: center;">
								<div style="line-height: 40px;color: #24fda3;">
									<span style="font-size: 24px;font-weight: bold;">{{devicecount}}</span>
									<span style="font-size:20px;margin-left:5px">个</span>
								</div>
								<div style="line-height: 40px;color: #fff;font-size: 16px;">
									<span style="margin-left: 5px;">注册设备</span>
								</div>
							</div>
						</div>
					</el-col>
				</el-row>
				<el-row :style="{paddingTop:((((height-80)/3 - 40)/2)/2 - 55)/2+'px'}">
					<el-col :span="8">
						<div class="flex">
							<div style="width:60px;text-align: center;line-height: 100px;">
								<el-icon :size="40" style="">
									<SetUp />
								</el-icon>
							</div>
							<div class="flex_item" style="text-align: center;">
								<div style="line-height: 40px;color: #24fda3;">
									<span style="font-size: 24px;font-weight: bold;">{{category}}</span>
									<span style="font-size:20px;margin-left:5px">种</span>
								</div>
								<div style="line-height: 40px;color: #fff;font-size: 16px;">
									<span style="margin-left: 5px;">作物种类</span>
								</div>
							</div>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="flex">
							<div style="width:60px;text-align: center;line-height: 100px;">
								<el-icon :size="40" style="">
									<money />
								</el-icon>
							</div>
							<div class="flex_item" style="text-align: center;">
								<div style="line-height: 40px;color: #24fda3;">
									<span style="font-size: 24px;font-weight: bold;">{{cost}}</span>
									<span style="font-size:20px;margin-left:5px">元</span>
								</div>
								<div style="line-height: 40px;color: #fff;font-size: 16px;">
									<span style="margin-left: 5px;">作物销量</span>
								</div>
							</div>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="flex">
							<div style="width:60px;text-align: center;line-height: 100px;">
								<el-icon :size="40" style="">
									<basketball />
								</el-icon>
							</div>
							<div class="flex_item" style="text-align: center;">
								<div style="line-height: 40px;color: #24fda3;">
									<span style="font-size: 24px;font-weight: bold;">{{deviceonlinecount}}</span>
									<span style="font-size:20px;margin-left:5px">个</span>
								</div>
								<div style="line-height: 40px;color: #fff;font-size: 16px;">
									<span style="margin-left: 5px;">活跃设备</span>
								</div>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="chart" :style="{height:((height-80)/3 - 10)+'px'}">
				<div class="itemtitle" style="">视频监控</div>
				<div style="padding:10px">
					<div>
						<div v-for="(item,index) in videos" class="vidoeitem" :style="{height:(((height-80)/3 - 10 - 35 - 20)/2)+'px'}">
							<div class="flex" style="height:30px;line-height: 30px;">
								<div class="flex_item" style="font-size:16px">
									{{item.name}}
								</div>
								<div class="flex_item" style="font-size:12px;text-align: right;padding-right:10px">
									<span v-if="item.status == '1'" style="color:#00FAC1">监测正常</span>
									<span v-if="item.status != '1'" style="color:#FF5722">监测异常</span>
								</div>
							</div>
							<div style="position: relative;width:100%;margin: 0 auto;">
								<div :style="{background:item.status == '1'?'#00FAC1':'#FF5722'}" style="position: absolute;left:0px;top:0px;width:20px;height:2px;:"></div>
								<div :style="{background:item.status == '1'?'#00FAC1':'#FF5722'}" style="position: absolute;left:0px;top:0px;width:2px;height:20px;"></div>
								
								<div :style="{background:item.status == '1'?'#00FAC1':'#FF5722'}" style="position: absolute;right:10px;top:0px;width:20px;height:2px;"></div>
								<div :style="{background:item.status == '1'?'#00FAC1':'#FF5722'}" style="position: absolute;right:10px;top:0px;width:2px;height:20px;"></div>
								
								<div class="inner" :style="{height:(((height-80)/3 - 10 - 35 - 20 - 30 - 30)/2)+'px'}">
									<img :src="item.url" style="height:100%;width:105%"/>
								</div>
								
								<div :style="{background:item.status == '1'?'#00FAC1':'#FF5722'}" style="position: absolute;left:0px;bottom:0px;width:20px;height:2px;"></div>
								<div :style="{background:item.status == '1'?'#00FAC1':'#FF5722'}" style="position: absolute;left:0px;bottom:0px;width:2px;height:20px;"></div>
								
								<div :style="{background:item.status == '1'?'#00FAC1':'#FF5722'}" style="position: absolute;right:10px;bottom:0px;width:20px;height:2px;"></div>
								<div :style="{background:item.status == '1'?'#00FAC1':'#FF5722'}" style="position: absolute;right:10px;bottom:0px;width:2px;height:20px;"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="chart" :style="{height:((height-80)/3 - 40)+'px'}">
				<div class="itemtitle" style="">作物种类</div>
				<!-- 展示字符云，各种作物占比 -->
				<v-chart ref="cropchart" :style="{height:(((height-80)/3 - 20)+'px')}" :option="cropoption" />
			</div>
		</el-col>
		<el-col :span="18" >
			<div style="padding:10px;position: relative;">
				<!-- 展示可搜索的地图 -->
				<div id="mapchart" style="position: relative;" :style="{height:(height-80 - 20)+'px'}"></div>
				
				<div style="position: absolute;left:0px;top:0px;width:20px;height:2px;background:#FF5722"></div>
				<div style="position: absolute;left:0px;top:0px;width:2px;height:20px;background:#FF5722"></div>
				
				<div style="position: absolute;right:10px;top:0px;width:20px;height:2px;background:#FF5722"></div>
				<div style="position: absolute;right:10px;top:0px;width:2px;height:20px;background:#FF5722"></div>
				
				<div style="position: absolute;left:0px;bottom:0px;width:20px;height:2px;background:#FF5722"></div>
				<div style="position: absolute;left:0px;bottom:0px;width:2px;height:20px;background:#FF5722"></div>
				
				<div style="position: absolute;right:10px;bottom:0px;width:20px;height:2px;background:#FF5722"></div>
				<div style="position: absolute;right:10px;bottom:0px;width:2px;height:20px;background:#FF5722"></div>
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
				size: (Math.random(100) * 1000).toFixed(0),
				count: (Math.random(100) * 1000).toFixed(0),
				category: (Math.random(100) * 1000).toFixed(0),
				cost: (Math.random(100) * 1000).toFixed(0),
				devicecount: (Math.random(100) * 1000).toFixed(0),
				deviceonlinecount: (Math.random(100) * 100).toFixed(0),
				videos:[{
					id:1,
					name:'摄像001',
					url:'/src/assets/111.webp',
					status:'1'
				},{
					id:2,
					name:'摄像002',
					url:'/src/assets/222.webp',
					status:'2'
				},{
					id:3,
					name:'摄像003',
					url:'/src/assets/333.webp',
					status:'1'
				},{
					id:4,
					name:'摄像004',
					url:'/src/assets/444.webp',
					status:'1'
				}],
				categorys:['玉米', '水稻', '小麦', '大豆', '青稞', '蔬菜', '水果', '花卉', '薯类', '药材', '蚕豆', '油籽', '蔓青', '大芥', '花生',
					'胡麻', '大麻', '向日葵', '梨', '苹果', '桃', '杏', '核桃', '李子', '樱桃', '草莓', '酸梨', '野杏', '毛桃', '苞瑙', '山樱桃',
					'沙棘', '草莓'
				],
				cropoption: {},
				charts: {},
				timer: null,
			 }
		},
		mounted:function(){
			var that = this;
			$(window).resize(function() {
				this.height = $(window).height() - this.titleheight;
			
				for (var key in that.charts) {
					that.charts[key].resize();
				}
				that.$refs['cropchart'].resize();
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
					that.size = (Math.random(100) * 1000).toFixed(0);
					that.count = (Math.random(100) * 1000).toFixed(0);
					that.category = (Math.random(100) * 1000).toFixed(0);
					that.cost = (Math.random(100) * 1000).toFixed(0);
					that.devicecount = (Math.random(100) * 1000).toFixed(0);
					that.deviceonlinecount = (Math.random(100) * 100).toFixed(0);
					//------------------------------
					that.cropoption.series[0].data = [];
					that.categorys.forEach(function(item, index) {
						that.cropoption.series[0].data.push({
							name: item,
							value: (Math.random(100) * 1000).toFixed(0),
							textStyle: {
								color: config.colors[index % config.colors.length]
							}
						});
					})
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
				this.cropoption = this.initcropoption();
			},
			initcropoption: function() {
				var data = [];
				this.categorys.forEach(function(item, index) {
					data.push({
						name: item,
						value: (Math.random(100) * 1000).toFixed(0),
						textStyle: {
							color: config.colors[index % config.colors.length]
						}
					});
				})
				return {
					backgroundColor:'#000000',
					tooltip: {
						show: true,
						position: 'top',
						textStyle: {
							fontSize: 14
						}
					},
					grid: {
						top: '40px'
					},
					series: [{
						type: "wordCloud",
						// 网格大小，各项之间间距
						gridSize: 20,
						// 形状 circle 圆，cardioid  心， diamond 菱形，
						// triangle-forward 、triangle 三角，star五角星
						shape: 'circle',
						// 字体大小范围
						sizeRange: [12, 30],
						// 文字旋转角度范围
						rotationRange: [0, 90],
						// 旋转步值
						rotationStep: 90,
						// 自定义图形
						// maskImage: maskImage,
						left: 'center',
						top: '40px',
						right: null,
						bottom: null,
						// 画布宽
						width: '90%',
						// 画布高
						height: '80%',
						// 是否渲染超出画布的文字
						drawOutOfBound: false,
						data: data
					}]
				};
			},
			initMapChart: function(res) {
				var mapchart = this.$echarts.init(document.getElementById('mapchart'));
				var values = [];
				for (var i = 0; i < res.data.geoCoordMap.length; i++) {
					values.push([res.data.geoCoordMap[i][0], res.data.geoCoordMap[i][1]], (Math.random() * 1000)
						.toFixed(0));
				}
			
				var option = {
					geoCoordMap: res.data.geoCoordMap,
					title: utils.createChartTitle('产区概览'),
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
						data: values,
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
				amap.addControl(new AMap.MapType({
					defaultType: 1,
					position: {
						right: '30px',
						top: '10px'
					}
				}));
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
				// 	amap.setZoom(10,false,30000);
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
	.vidoeitem{
		width:50%;display: inline-block;
		position: relative;
	}
	.inner{
		width:90%;
	}
</style>
