export default {
	colors: ["rgba(245, 166, 35, 1)", "rgba(19, 173, 255, 1)", '#9689FF', '#FF8A26', '#5FB878', '#73c0de',
		'#4ED33C',
		'#FF5252', '#01AAED', '#FF5722',
		'#6648FF', '#2A8BFD', '#BAFF7F', '#00FAC1', '#00CAFF', '#FDE056', 'rgba(245, 166, 35, 1)',
		'#fac858', '#ee6666', '#91cc75', '#38cafb', '#4caff9', '#4adeca', '#2aa7ee', '#0270f2', '#488cf7'
	],
	bmapstyle: {
		styleJson: [{
				featureType: "water",
				elementType: "all",
				stylers: {
					color: "#021019"
				}
			},
			{
				featureType: "highway",
				elementType: "geometry.fill",
				stylers: {
					color: "#000000"
				}
			},
			{
				featureType: "highway",
				elementType: "geometry.stroke",
				stylers: {
					color: "#147a92"
				}
			},
			{
				featureType: "arterial",
				elementType: "geometry.fill",
				stylers: {
					color: "#000000"
				}
			},
			{
				featureType: "arterial",
				elementType: "geometry.stroke",
				stylers: {
					color: "#0b3d51"
				}
			},
			{
				featureType: "local",
				elementType: "geometry",
				stylers: {
					color: "#000000"
				}
			},
			{
				featureType: "land",
				elementType: "all",
				stylers: {
					color: "#08304b"
				}
			},
			{
				featureType: "railway",
				elementType: "geometry.fill",
				stylers: {
					color: "#000000"
				}
			},
			{
				featureType: "railway",
				elementType: "geometry.stroke",
				stylers: {
					color: "#08304b"
				}
			},
			{
				featureType: "subway",
				elementType: "geometry",
				stylers: {
					lightness: -70
				}
			},
			{
				featureType: "building",
				elementType: "geometry.fill",
				stylers: {
					color: "#000000"
				}
			},
			{
				featureType: "all",
				elementType: "labels.text.fill",
				stylers: {
					color: "#857f7f"
				}
			},
			{
				featureType: "all",
				elementType: "labels.text.stroke",
				stylers: {
					color: "#000000"
				}
			},
			{
				featureType: "building",
				elementType: "geometry",
				stylers: {
					color: "#022338"
				}
			},
			{
				featureType: "green",
				elementType: "geometry",
				stylers: {
					color: "#062032"
				}
			},
			{
				featureType: "boundary",
				elementType: "all",
				stylers: {
					color: "#1e1c1c"
				}
			},
			{
				featureType: "manmade",
				elementType: "geometry",
				stylers: {
					color: "#022338"
				}
			},
			{
				featureType: "poi",
				elementType: "all",
				stylers: {
					visibility: "off"
				}
			},
			{
				featureType: "all",
				elementType: "labels.icon",
				stylers: {
					visibility: "off"
				}
			},
			{
				featureType: "all",
				elementType: "labels.text.fill",
				stylers: {
					color: "#2da0c6",
					visibility: "on"
				}
			},
			{
				featureType: "background",
				elementType: "all",
				stylers: {
					color: "#200000"
				}
			}
		]
	},
	defaultconfig: [{
		key: 'theme',
		value: 'dark',
		label: '????????????',
		type: 'select',
		required: true,
		options: [{
			value: 'dark',
			label: '????????????'
		}, {
			value: 'red',
			label: '????????????'
		}]
	}, {
		key: 'refreshtime',
		value: 10 * 1000,
		label: '????????????',
		type: 'number',
		required: true
	}, {
		key: 'turntime',
		value: 20 * 1000,
		label: '????????????',
		type: 'select',
		required: true,
		options: [{
			value: 20 * 1000,
			label: '20???'
		}, {
			value: 60 * 1000,
			label: '1??????'
		}, {
			value: 2 * 60 * 1000,
			label: '2??????'
		}, {
			value: 5 * 60 * 1000,
			label: '5??????'
		}]
	}, {
		key: 'serverurl',
		value: '/',
		label: '????????????',
		type: 'text',
		required: true
	}],
	/**
	 * ??????????????????
	 */
	getConfig: function() {
		var config = localStorage.getItem("config");
		if (!config) {
			config = this.defaultconfig;
		} else {
			config = JSON.parse(config);
		}
		return config;
	}
}
