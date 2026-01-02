'use client';

import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import { StyledText } from './common/StyledText';

export const MotiExample = () => {
	// const [isClient, setIsClient] = useState(false);

	// useEffect(() => {
	// 	setIsClient(true);
	// }, []);

	// if (!isClient) return null;
	return (
		<MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 4000 }}>
			<StyledText type="title" className="!text-red-600">
				✨ Hello from Moti!
			</StyledText>
		</MotiView>
	);
};
