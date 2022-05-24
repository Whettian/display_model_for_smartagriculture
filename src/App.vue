<template>
	<transition name="bounce">
		<welcome v-if="welcome" @loaddingend="loaddingend"></welcome>
	</transition>
	<transition name="bounce">
		<div v-if="!welcome" class="container" :class="curTheme">
			<el-row class="title">
				<el-col :span="8">
					<div class="time_div flex">
						<div class="time " style="width:200px">
							<el-icon>
								<alarm-clock />
							</el-icon>
							<span>{{time}}</span>
						</div>
						<div class="flex_item weather">
							<!-- 展示当前天气情况 -->
							<!-- 天气 -->
							<span class="item"><img style="width: 20px;position: relative;top: 5px;" src="./assets/5.png"></span>
							<!-- 地区 -->
							<span class="item">西安</span>
							<!-- 温度 -->
							<span class="item">23℃~25℃</span>
							<!-- 空气质量 -->
							<span class="item">空气质量 <span style="color:orangered">差</span></span>
						</div>
					</div>
				</el-col>
				<el-col :span="8" style="position: relative;">
					<div
						style="position: absolute; background: #26871a; left: -8px; width: 54px; height: 2px; transform: rotate(45deg); top: 59px;">
					</div>
					<div class="header">智慧农业监控平台</div>
					<div
						style="position: absolute; background: #26871a; right: -9px; width: 55px; height: 2px; transform: rotate(-45deg); top: 59px;">
					</div>
					<div
						style="position: absolute; left: 0px; bottom: 0px; height: 2px; width: 36px; background: rgb(0 0 0);border-radius: 10px;">
					</div>
					<div style="position: absolute;right:0px;bottom: 0px;height: 2px;width: 36px;background: #100c2a;">
					</div>
				</el-col>
				<el-col :span="8">
					<div class="flex menus_div">
						<div class="menus flex_item flex">
							<div class="flex_item">
								<div class="menu_item" @click="turnPage('/index')">综合监控</div>
							</div>
							<div class="flex_item">
								<div class="menu_item" @click="turnPage('/crop')">作物监控</div>
							</div>
							<div class="flex_item">
								<div class="menu_item" @click="turnPage('/environment')">环境监控</div>
							</div>
							<div class="flex_item">
								<div class="menu_item" @click="turnPage('/market')">市场监控</div>
							</div>
							<div class="flex_item">
								<div class="menu_item" @click="turnPage('/device')">设备监控</div>
							</div>
						</div>
						<div class="tools  flex" style="">
							<div class="flex_item">
								<div class="tool_item" @click="screen">
									<el-icon>
										<full-screen />
									</el-icon>
									<span>{{screenText}}</span>
								</div>
							</div>
							<div class="flex_item">
								<div class="tool_item" @click="showSetting">
									<el-icon>
										<setting />
									</el-icon>
									<span>配置</span>
								</div>
							</div>
							<div class="flex_item">
								<div class="tool_item" @click="exit">
									<el-icon>
										<switch-button />
									</el-icon>
									<span>退出</span>
							</div>
								</div>
						</div>
					</div>
				</el-col>
			</el-row>

			<div>
				<transition name="bounce" mode="out-in">
					<router-view></router-view>
				</transition>
			</div>

			<!-- 系统菜单选择弹框 -->
			<div class="menu_panel" v-if="menushow">
				<div class="menu_panel_maker" @click="hideMenu">
					<div class="inner_contaner" @click.stop="stopPropagation">
						<el-row style="margin-top: 20px;" v-for="(item,index) in menus" :key="item.id">
							<el-col :span="6" v-for="(subitem,subindex) in item" :key="subitem.id">
								<div class="menu_item" @click="turnPage(subitem.url)">
									<div class="icon">
										<el-icon :size="40">
											<component :is="subitem.icon" :size="40"></component>
										</el-icon>
									</div>
									<div class="text">{{subitem.name}}</div>
								</div>
							</el-col>
						</el-row>
						<el-icon :size="25" class="menuPanelCloseBtn" @click="hideMenu">
							<Close-bold :size="25" />
						</el-icon>
					</div>
				</div>
			</div>
			<!-- 系统配置弹框 -->
			<div class="setting_panel" v-if="settingshow">
				<div class="setting_panel_maker" @click="hideSetting">
					<div class="inner_contaner" @click.stop="stopPropagation">
						<el-icon :size="25" class="settingPanelCloseBtn" @click="hideSetting">
							<Close-bold :size="25" />
						</el-icon>
						<div class="setting_panel_title">
							系统配置
						</div>
						<el-form ref="settingFormRef" :model="settingForm" status-icon :rules="rules"
							label-width="120px" class="settingForm">
							<el-form-item :label="item.label+':'" prop="item.type" v-for="(item,index) in configs">
								<!-- 识别配置项类型并创建对应组件 -->
								<el-input v-if="item.type != 'select'" v-model="settingForm[item.key]"
									placeholder="请输入{{item.label}}" type="item.type" autocomplete="off" />
								<el-select v-if="item.type == 'select'" style="width:100%"
									v-model="settingForm[item.key]" placeholder="请选择{{item.label}}">
									<el-option v-for="(optionitem,index1) in item.options" :label="optionitem.label"
										:value="optionitem.value" />
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-row style="width:100%">
									<el-col :span="11">
										<el-button style="width:100%" type="primary"
											@click="submitForm(settingFormRef)">
											保存配置</el-button>
									</el-col>
									<el-col :span="2">
									</el-col>
									<el-col :span="11">
										<el-button style="width:100%" @click="defalutForm(settingFormRef)">恢复默认
										</el-button>
									</el-col>
								</el-row>
							</el-form-item>
						</el-form>

					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import "/public/dark_theme.css"

	import $ from 'jquery'
	import config from '/public/config.js'
	import utils from '/public/utils.js'
	import api from '/public/api.js'


	import welcome from "./pages/welcome.vue"

	export default {
		components: {
			welcome
		},
		data() {
			return {
				welcome: true,
				titleHeight: 80,
				menuHeight: 35,
				time: new Date().format('yyyy-MM-dd hh:mm:ss'),
				//当前主题，可以通过设置进行控制
				curTheme: "dark",
				turntime: 60 * 1000,

				//菜单居中
				settingPanelTop: 11,
				//菜单居中
				settingPanelLeft: 11,
				settingPanelWidth: 600,
				settingPanelHeight: 350,

				settingshow: false,

				configs: config.getConfig(),
				settingForm: {},
				rules: {},
				timer: null,
				isfullscreen: false,
				screenText: '全屏'
			}
		},
		unmounted: function() {
			if (this.timer) {
				clearInterval(this.timer);
			}
		},
		mounted: function() {
			this.settingPanelTop = ($(window).height() - this.settingPanelHeight) / 2;
			this.settingPanelLeft = ($(window).width() - this.settingPanelWidth) / 2;

			var that = this;
			this.timer = setInterval(function() {
				that.time = new Date().format('yyyy-MM-dd hh:mm:ss');
			}, 1000);

			this.configs.forEach(function(item, index, arr) {
				that.settingForm[item.key] = item.value;

				that.rules[item.key] = [{
					required: item.required,
					message: '请输入' + item.label,
					trigger: 'blur'
				}];

				//更新界面主题
				if (item.key == 'theme') {
					that.curTheme = item.value
				}
				//更细切换周期
				if (item.key == 'turntime') {
					that.turntime = item.value * 1
				}
			});
		},
		methods: {
			loaddingend: function() {
				this.welcome = false;
			},
			/**
			 * 切换界面
			 * @param {Object} path
			 */
			turnPage: function(path) { //切换界面
				this.$router.push(path);
				this.hideSetting(); //切换界面
			},
			/**
			 * 全屏切换
			 */
			screen: function() {
				if (this.isfullscreen) {
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.webkitExitFullscreen) {
						document.webkitExitFullscreen();
					}
					this.screenText = '全屏';
				} else {
					var element = document.documentElement;
					if (element.requestFullscreen) {
						element.requestFullscreen();
					} else if (element.msRequestFullscreen) {
						element.msRequestFullscreen();
					} else if (element.mozRequestFullScreen) {
						element.mozRequestFullScreen();
					} else if (element.webkitRequestFullscreen) {
						element.webkitRequestFullscreen();
					}
					this.screenText = '恢复';
				}
				this.isfullscreen = !this.isfullscreen;
			},
			/**
			 * 退出系统
			 */
			exit: function() {
				utils.showconfirm('确定要退出吗？');
			},
			/**
			 * 显示设置框
			 */
			showSetting: function() {
				this.settingshow = true;
			},
			/**
			 * 显示设置框
			 */
			hideSetting: function() {
				this.settingshow = false;
			},
			/**
			 * 阻止事件冒泡
			 */
			stopPropagation: function() {},
			/**
			 * 恢复默认
			 */
			defalutForm: function() {
				var that = this;
				this.configs = config.defaultconfig;
				this.configs.forEach(function(item, index, arr) {
					that.settingForm[item.key] = item.value;

					that.rules[item.key] = [{
						required: item.required,
						message: '请输入' + item.label,
						trigger: 'blur'
					}];
				});
			},
			/**
			 * 提交表单
			 */
			submitForm: function() {
				var that = this;
				this.$refs.settingFormRef.validate((valid, fields) => {
					if (!valid) {
						return;
					}
					//将数据组合成数组格式
					var configdata = [];
					for (var key in that.settingForm) {
						var itemconfig = null;
						for (var i = 0; i < that.configs.length; i++) {
							if (that.configs[i].key == key) {
								itemconfig = that.configs[i];
								break;
							}
						}
						if (!itemconfig) { //未识别的配置项
							continue;
						}
						//更新数据
						itemconfig.value = that.settingForm[key];
						configdata.push(itemconfig);
					}

					//保存系统配置
					utils.saveConfig(configdata);

					//刷新并应用系统配置
					this.refreshConfig();
				});
			},
			/**
			 * 刷新并应用系统配置
			 */
			refreshConfig: function() {
				//更新配置表单对应数据
				this.configs = config.getConfig();
				var that = this;
				this.configs.forEach(function(item, index, arr) {
					that.settingForm[item.key] = item.value;

					that.rules[item.key] = [{
						required: item.required,
						message: '请输入' + item.label,
						trigger: 'blur'
					}];

					//更新界面主题
					if (item.key == 'theme') {
						that.curTheme = item.value
					}

					//简单期间，直接刷新界面
					window.location.reload();
				});
			}
		}
	}
</script>

<style>
	.flex {
		display: flex;
	}

	.flex_item {
		flex: 1;
	}

	.title {
		height: v-bind(titleHeight+'px');
		position: relative;
	}

	.title .time_div {
		border-bottom: 1px solid #26871a;
		line-height: 40px;
		height: 40px;
	}

	.title .menus_div {
		border-bottom: 1px solid #26871a;
		height: 40px;
	}

	.title .time {
		line-height: 40px;
		height: 40px;
		font-size: 14px;
		text-align: left;
		padding-left: 10px;
	}

	.title .time i {
		margin-right: 5px;
		position: relative;
		top: 2px;
	}

	.title .header {
		line-height: v-bind(titleHeight+'px');
		letter-spacing: 3px;
		height: 79px;
		border-bottom: 1px solid #26871a;
		background: linear-gradient(to left, #30a55f, #24fda3, #2f9737);
		-webkit-background-clip: text;
		color: transparent;
	}

	.title .menus {
		display: flex;
		height: 60px;
		line-height: 60px;
	}

	.title .menus .menu_item {
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		margin: 0 auto;
		width: 90%;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 3px;
		margin-top: 5px;
		cursor: pointer;
	}

	.title .menus .menu_item:hover {
		background: #26871a;
	}

	.title .tools {
		width: 180px;
		padding-top: 5px;
		height: 60px;
	}

	.title .tool_item {
		font-size: 14px;
		cursor: pointer;
	}

	.title .tool_item i {
		height: 30px;
		line-height: 30px;
		margin-right: 5px;
		position: relative;
		top: 2px;
	}

	.title .tool_item:hover {
		color: #26871a;
	}

	.anchorBL {
		display: none !important;
	}

	.container {
		position: fixed;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;
		overflow: auto;
	}

	.setting_panel .inner_contaner {
		width: v-bind(settingPanelWidth+"px");
		height: v-bind(settingPanelHeight+"px");
		top: v-bind(settingPanelTop+"px");
		left: v-bind(settingPanelLeft+"px");
	}

	.bounce-enter-active {
		animation: bounce-in .5s ease-out both;
	}

	.bounce-leave-active {
		animation: bounce-in .5s reverse ease-in both;
	}

	.weather {
		font-size: 14px;
		text-align: left;
	}

	.weather .item {
		margin: 0 10px;
	}

	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}

		50% {
			transform: scale(1.25);
		}

		100% {
			transform: scale(1);
		}
	}
</style>
