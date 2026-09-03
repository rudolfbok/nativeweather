import React from 'react';
import { Image as ReactNativeImage } from 'react-native';

const fillStyle = { width: '100%', height: '100%' };

export const Image = React.forwardRef(({ contentFit, ...props }, ref) => {
	const resizeMode = contentFit === 'fill' ? 'stretch' : contentFit === 'none' ? 'center' : contentFit;

	return <ReactNativeImage {...props} ref={ref} resizeMode={resizeMode ?? props.resizeMode} style={fillStyle} />;
});
