export const mapColorTheme = (layer: string) => {
	const isCloudLayer = layer === 'clouds_new';
	const backgroundColor = isCloudLayer ? '#000000' : '#ffffff';
	const textColor = isCloudLayer ? '#ffffff' : '#000000';
	const textStroke = isCloudLayer ? '#000000' : '#ffffff';
	const waterColor = isCloudLayer ? '#333333' : '#dddddd';
	const waterTextColor = isCloudLayer ? '#ffffff' : '#333333';

	return [
		{ elementType: 'geometry', stylers: [{ color: backgroundColor }] },
		{ elementType: 'labels.icon', stylers: [{ visibility: 'on' }] },
		{ elementType: 'labels.text.fill', stylers: [{ color: textColor }] },
		{ elementType: 'labels.text.stroke', stylers: [{ color: textStroke }] },
		{
			featureType: 'administrative',
			elementType: 'geometry',
			stylers: [{ color: isCloudLayer ? '#444444' : '#cccccc' }],
		},
		{
			featureType: 'administrative.country',
			elementType: 'geometry.stroke',
			stylers: [{ color: isCloudLayer ? '#666666' : '#999999' }, { weight: 1 }],
		},
		{
			featureType: 'administrative.province',
			elementType: 'geometry.stroke',
			stylers: [{ color: isCloudLayer ? '#555555' : '#bbbbbb' }, { weight: 0.5 }],
		},
		{
			featureType: 'administrative.locality',
			elementType: 'geometry.stroke',
			stylers: [{ color: isCloudLayer ? '#444444' : '#cccccc' }],
		},
		{
			featureType: 'poi',
			elementType: 'geometry',
			stylers: [{ color: isCloudLayer ? '#222222' : '#f5f5f5' }],
		},
		{
			featureType: 'poi',
			elementType: 'labels.text.fill',
			stylers: [{ color: isCloudLayer ? '#cccccc' : '#333333' }],
		},
		{
			featureType: 'poi.park',
			elementType: 'geometry',
			stylers: [{ color: isCloudLayer ? '#333333' : '#e8e8e8' }],
		},
		{
			featureType: 'road',
			elementType: 'geometry',
			stylers: [{ color: isCloudLayer ? '#444444' : '#cccccc' }],
		},
		{ featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: textColor }] },
		{ featureType: 'road', elementType: 'labels.text.stroke', stylers: [{ color: textStroke }] },
		{
			featureType: 'road.highway',
			elementType: 'geometry',
			stylers: [{ color: isCloudLayer ? '#666666' : '#aaaaaa' }],
		},
		{ featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: textColor }] },
		{
			featureType: 'road.local',
			elementType: 'geometry',
			stylers: [{ color: isCloudLayer ? '#333333' : '#dddddd' }],
		},
		{
			featureType: 'transit',
			elementType: 'geometry',
			stylers: [{ color: isCloudLayer ? '#333333' : '#e0e0e0' }],
		},
		{ featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: textColor }] },
		{ featureType: 'water', elementType: 'geometry', stylers: [{ color: waterColor }] },
		{ featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: waterTextColor }] },
	];
};
