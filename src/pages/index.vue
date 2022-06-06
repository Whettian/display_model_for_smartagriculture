<template>
	<el-row>
		<el-col :span="6">
			<div class="chart" :style="{height:((height-80)/3 - 40)+'px'}">
				<div class="itemtitle" style="">基本情况</div>
				<el-row :style="{paddingTop:((((height-80)/3 - 40)/2)/2 - 35)/2+'px'}">
					<el-col :span="12">
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
					<el-col :span="12">
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
				</el-row>
				<el-row :style="{paddingTop:((((height-80)/3 - 40)/2)/2 - 35)/2+'px'}">
					<el-col :span="12">
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
					<el-col :span="12">
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
				</el-row>
			</div>
			<div class="chart" :style="{height:((height-80)/3 - 40)+'px'}">
				<div class="itemtitle" style="">气象信息</div>
				<el-row :style="{paddingTop:((((height-80)/3 - 40)/2 - 75)/2)+'px'}">
					<el-col :span="8">
						<div style="width:80%;margin: 0 auto;">
							<div style="line-height: 40px;color: #fff;font-size: 16px;" :style="{}">
								<el-icon :size="18" style="position: relative;top: 3px;">
									<hot-water />
								</el-icon>
								<span style="margin-left: 5px;">温度</span>
							</div>
							<div style="line-height: 40px;color: #24fda3;">
								<span style="font-size: 24px;font-weight: bold;">{{temp}}</span>
								<span style="font-size:20px;margin-left:5px">℃</span>
							</div>
						</div>
					</el-col>
					<el-col :span="8">
						<div style="width:80%;margin: 0 auto;">
							<div style="line-height: 40px;color: #fff;font-size: 16px;">
								<el-icon :size="18" style="position: relative;top: 3px;">
									<flag />
								</el-icon>
								<span style="margin-left: 5px;">风速</span>
							</div>
							<div style="line-height: 40px;color: #24fda3;">
								<span style="font-size: 24px;font-weight: bold;">{{spedd}}</span>
								<span style="font-size:20px;margin-left:5px">km/h</span>
							</div>
						</div>
					</el-col>
					<el-col :span="8">
						<div style="width:80%;margin: 0 auto;">
							<div style="line-height: 40px;color: #fff;font-size: 16px;">
								<el-icon :size="18" style="position: relative;top: 3px;">
									<back />
								</el-icon>
								<span style="margin-left: 5px;">风向</span>
							</div>
							<div style="line-height: 40px;color: #24fda3;">
								<span style="font-size: 24px;font-weight: bold;">{{deriction}}</span>
								<span style="font-size:20px;margin-left:5px"></span>
							</div>
						</div>
					</el-col>
				</el-row>
				<el-row :style="{paddingTop:((((height-80)/3 - 40)/2 - 75)/2)+'px'}">
					<el-col :span="8">
						<div style="width:80%;margin: 0 auto;">
							<div style="line-height: 40px;color: #fff;font-size: 16px;">
								<el-icon :size="18" style="position: relative;top: 3px;">
									<umbrella />
								</el-icon>
								<span style="margin-left: 5px;">湿度</span>
							</div>
							<div style="line-height: 40px;color: #24fda3;">
								<span style="font-size: 24px;font-weight: bold;">{{water}}</span>
								<span style="font-size:20px;margin-left:5px">rh</span>
							</div>
						</div>
					</el-col>
					<el-col :span="8">
						<div style="width:80%;margin: 0 auto;">
							<div style="line-height: 40px;color: #fff;font-size: 16px;">
								<el-icon :size="18" style="position: relative;top: 3px;">
									<sunny />
								</el-icon>
								<span style="margin-left: 5px;">光照</span>
							</div>
							<div style="line-height: 40px;color: #24fda3;">
								<span style="font-size: 24px;font-weight: bold;">{{lint}}</span>
								<span style="font-size:20px;margin-left:5px">lx</span>
							</div>
						</div>
					</el-col>
					<el-col :span="8">
						<div style="width:80%;margin: 0 auto;">
							<div style="line-height: 40px;color: #fff;font-size: 16px;">
								<el-icon :size="18" style="position: relative;top: 3px;">
									<pouring />
								</el-icon>
								<span style="margin-left: 5px;">降雨量</span>
							</div>
							<div style="line-height: 40px;color: #24fda3;">
								<span style="font-size: 24px;font-weight: bold;">{{wend}}</span>
								<span style="font-size:20px;margin-left:5px">cm</span>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="chart" :style="{height:((height-80)/3 + 30)+'px',padding:0}">
				<div class="itemtitle" style="">环境监控</div>
				<v-chart ref="emvorromntchart" :style="{height:((height/3 - 20 - 15)+'px')}"
					:option="emvorromntchart" />
			</div>
		</el-col>
		<el-col :span="12">
			<div class="chart" :style="{height:((height-80)/3 - 30)*2+'px'}">
				<div id="mapchart" style="position: relative;" :style="{height:(((height-80)/3 - 40)*2)+'px'}"></div>
			</div>
			<div class="chart" :style="{height:((height-80)/3+10)+'px'}">
				<div class="itemtitle flex" style="">
					<div class="flex_item">物联网设备状况</div>
					<div style="width: 250px;">
						<span class="device_status_item">
							正常({{device.status.ok}})
						</span>
						<span class="device_status_item" style="color:#FF8A26">
							预警({{device.status.alert}})
						</span>
						<span class="device_status_item" style="color:#FF5252">
							异常({{device.status.error}})
						</span>
					</div>
				</div>
				<div class="devices">
					<div v-for="(item,index) in device.datas" class="deviceitem">
						<div class="inner"
							:class="item.status == '2' ? 'deviceitemalert':(item.status == '3'?'deviceitemerror':'')">
							<div class="name">{{item.name}}</div>
							<div class="name_border"></div>
							<div class="flex">
								<div class="flex_item">PM2.5：{{item.pm2_5}}</div>
								<div class="flex_item">PM10：{{item.pm10}}</div>
							</div>
							<div class="flex">
								<div class="flex_item">温度：{{item.temp}}℃</div>
								<div class="flex_item">湿度：{{item.shidu}}%</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</el-col>
		<el-col :span="6">
			<div class="chart" :style="{}">
				<div class="itemtitle" style="">视频监控</div>
				<div style="margin: 10px 0px;margin-bottom: 0;border:1px solid rgba(255,255,255,0.6);border-radius: 5px;">
					<video :style="{width:'100%',height:((height-80)/3 - 40 - 35 - 20)+'px'}" src="../assets/1.mp4"
						controls="controls" autoplay="false"></video>
				</div>
			</div>
			<div class="chart" :style="{height:((height-80)/3 - 40)+'px'}">
				<div class="itemtitle" style="">市场信息</div>
				<div>
					<div class="swiper-container" :style="{height:(((height-80)/3 - 40 - 35)+'px')}">
						<div class="swiper-wrapper" :style="{height:(((height-80)/3 - 40 - 35)+'px')}">
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
			<div class="chart" :style="{height:((height-80)/3 - 20)+'px'}">
				<div class="itemtitle" style="">作物状况</div>
				<div>
					<!-- 展示字符云，各种作物占比 -->
					<v-chart ref="cropchart" :style="{height:(((height-80)/3 - 20 - 15)+'px')}" :option="cropoption" />
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

	import Swiper from 'swiper';
	import 'swiper/dist/css/swiper.min.css';

	import 'echarts-wordcloud';

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
				device: {
					status: {
						ok: 11,
						error: 2,
						alert: 4
					},
					datas: [{
						name: '设备0012410',
						status: '1',
						pm2_5: 11,
						pm10: 1,
						tsp: 11,
						temp: 25,
						shidu: 30
					}, {
						name: '设备0012410',
						status: '2',
						pm2_5: 11,
						pm10: 1,
						tsp: 11,
						temp: 25,
						shidu: 30
					}, {
						name: '设备0012410',
						status: '1',
						pm2_5: 11,
						pm10: 1,
						tsp: 11,
						temp: 25,
						shidu: 30
					}, {
						name: '设备0012410',
						status: '3',
						pm2_5: 11,
						pm10: 1,
						tsp: 11,
						temp: 25,
						shidu: 30
					}, {
						name: '设备0012410',
						status: '1',
						pm2_5: 11,
						pm10: 1,
						tsp: 11,
						temp: 25,
						
						shidu: 30
					}, {
						name: '设备0012410',
						status: '1',
						pm2_5: 11,
						pm10: 1,
						tsp: 11,
						temp: 25,
						shidu: 30
					}, {
						name: '设备0012410',
						status: '1',
						pm2_5: 11,
						pm10: 1,
						tsp: 11,
						temp: 25,
						shidu: 30
					}, {
						name: '设备0012410',
						status: '2',
						pm2_5: 11,
						pm10: 1,
						tsp: 11,
						temp: 25,
						shidu: 30
					}]
				},
				categorys:['玉米', '水稻', '小麦', '大豆', '青稞', '蔬菜', '水果', '花卉', '薯类', '药材', '蚕豆', '油籽', '蔓青', '大芥', '花生',
					'胡麻', '大麻', '向日葵', '梨', '苹果', '桃', '杏', '核桃', '李子', '樱桃', '草莓', '酸梨', '野杏', '毛桃', '苞瑙', '山樱桃',
					'沙棘', '草莓'
				],
				emvorromntchart: {},
				cropoption: {},
				charts: {},
				swiper: null,
				timer: null,
				size: (Math.random(100) * 1000).toFixed(0),
				count: (Math.random(100) * 1000).toFixed(0),
				category: (Math.random(100) * 1000).toFixed(0),
				cost: (Math.random(100) * 1000).toFixed(0),
				temp: (Math.random(100) * 40).toFixed(0),
				spedd: (Math.random(100) * 100).toFixed(0),
				deriction: '东南',
				water: (Math.random(100) * 50).toFixed(0),
				lint: (Math.random(100) * 1000).toFixed(0),
				wend: (Math.random(100) * 1000).toFixed(0),
			}
			
			
		},
		mounted: function() {
			var that = this;
			$(window).resize(function() {
				this.height = $(window).height() - this.titleheight;

				for (var key in that.charts) {
					that.charts[key].resize();
				}
				that.$refs['emvorromntchart'].resize();
				that.$refs['cropchart'].resize();
			});

			this.loadData();

			this.swiper = new Swiper('.swiper-container', {
				autoplay: 1000, //可选选项，自动滑动
				loop: true,
				direction: 'vertical',
				slidesPerView: (((this.height - 80) / 3 - 40 - 35)) / 110,
			})

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
					that.size = (Math.random(100) * 1000).toFixed(0);
					that.count = (Math.random(100) * 1000).toFixed(0);
					that.category = (Math.random(100) * 1000).toFixed(0);
					that.cost = (Math.random(100) * 1000).toFixed(0);
					that.temp = (Math.random(100) * 40).toFixed(0);
					that.spedd = (Math.random(100) * 100).toFixed(0);
					that.deriction = '东南';
					that.water = (Math.random(100) * 50).toFixed(0);
					that.lint = (Math.random(100) * 1000).toFixed(0);
					that.wend = (Math.random(100) * 1000).toFixed(0);
					//------------------------------

					that.emvorromntchart.series[0].data = [(Math.random(100) * 1000).toFixed(0), (Math.random(
						100) * 1000).toFixed(0), (Math.random(100) * 1000).toFixed(0), (Math.random(
						100) * 1000).toFixed(0), (Math.random(100) * 1000).toFixed(0), (Math.random(
						100) * 1000).toFixed(0), (Math.random(100) * 1000).toFixed(0)];
					//------------------------------
					that.device.status.ok = (Math.random(100) * 1000).toFixed(0);
					that.device.status.error = (Math.random(100) * 1000).toFixed(0);
					that.device.status.alert = (Math.random(100) * 1000).toFixed(0);
					that.device.datas.forEach(function(item, index) {
						var status = (Math.random(100) * 3);
						item.status = status % 3 == 0 ? '1' : status % 3 == 1 ? '2' : status % 3 == 2 ?
							'3' : "1";
						item.pm2_5 = (Math.random(100) * 100).toFixed(0);
						item.pm10 = (Math.random(100) * 100).toFixed(0);
						item.tsp = (Math.random(100) * 100).toFixed(0);
						item.temp = (Math.random(100) * 100).toFixed(0);
						item.shidu = (Math.random(100) * 100).toFixed(0);
					});
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

					that.swiper.slideNext();
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
				
				this.emvorromntchart = this.initemvorromntchart();
				this.cropoption = this.initcropoption();
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
						center: [112.938814,28.228209],
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
								color: '#ee6666', //标志颜色
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

				// // 获取百度地图实例，使用百度地图自带的控件
				// var bmap = myChart.getModel().getComponent('bmap').getBMap();
				// bmap.addControl(new BMap.MapTypeControl());

				// 获取 ECharts 高德地图组件
				var amapComponent = mapchart.getModel().getComponent('amap');
				// 获取高德地图实例，使用高德地图自带的控件(需要在高德地图js API script标签手动引入)
				var amap = amapComponent.getAMap();
				// 添加控件
				amap.addControl(new AMap.Scale());
				amap.addControl(new AMap.ToolBar());
				amap.addControl(new AMap.ControlBar());
				// 禁用 ECharts 图层交互，从而使高德地图图层可以点击交互
				amapComponent.setEChartsLayerInteractive(false);

				var disProvince = new AMap.DistrictLayer.Province({
					zIndex: 1000,
					adcode: [430000],
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
							return colors[adcode % colors.length] + '66';

							// return 'red';
						},
						'province-stroke': 'cornflowerblue',
						'city-stroke': 'white', // 中国地级市边界
						'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
					}
				});
				disProvince.setMap(amap);

				this.charts['mapchart'] = mapchart;
			},
			initemvorromntchart:function() {
				return {
					backgroundColor:'#000000',
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
						data: ['土壤湿度', '降雨量', '二氧化碳', '日照时间'],
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
						data: [120, 200, 150, 80, 70, 110, 140],
						type: 'bar',
						barWidth: '20px',
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#fac858ff',
								},
								{
									offset: 1,
									color: '#fac858bb',
								},
							]),
							barBorderRadius: 20
						}
					}]
				}
			},
			initcropoption:function() {
				var datas = [];
				this.categorys.forEach(function(item, index) {
					datas.push({
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
						data: datas
					}]
				}
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

	.device_status_item {
		display: inline-block;
		text-align: center;
		font-size: 14px;
		cursor: pointer;
		width: 33.3%;
		min-height: 30px;
		line-height: 30px;
	}

	.devices {
		overflow: hidden;
	}

	.deviceitem {
		display: inline-block;
		width: 25%;
	}

	.deviceitem .inner {
		width: 80%;
		margin: 0 auto;
		background: #f8f8f844;
		margin-top: 10px;
		margin-bottom: 5px;
		padding: 10px;
		border-radius: 3px;
		font-size: 12px;
		line-height: 25px;
		color: #bbb;
	}

	.deviceitem .inner .name {
		text-align: center;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		color: #fff;
	}

	.deviceitem .inner .name_border {
		width: 100%;
		height: 1px;
		margin: 5px auto;
		background: linear-gradient(90deg, rgba(0, 0, 0, 0), #40a55f, rgba(0, 0, 0, 0));
	}

	.deviceitem .deviceitemalert {
		background: #FF8A26aa;
	}

	.deviceitem .deviceitemerror {
		background: #FF5252aa;
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
