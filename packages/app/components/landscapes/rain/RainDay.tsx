import { ClipPath, Defs, G, Mask, Path } from 'react-native-svg';

export const RainDayLandscape = () => {
	return (
		<>
			<G clipPath="url(#clip0_1_195)">
				<Mask
					id="a"
					style={{
						maskType: 'luminance',
					}}
					maskUnits="userSpaceOnUse"
					x={0}
					y={0}
					width={600}
					height={710}
				>
					<Path d="M0 0h600v710H0V0z" fill="#fff" />
				</Mask>
				<G mask="url(#a)">
					<Path d="M0 0h600v710H0V0z" fill="#567D99" />
					<Path
						d="M53.966 718.627c170.614-75.156 672.848-142.831 925.774-91.668 252.93 51.162 8.711 87.975 8.711 87.975L62.678 806.603l-8.712-87.976z"
						fill="#699E40"
					/>
					<Path
						d="M-203.562 711.725c-242.232-184.695 630.267-62.195 818.768 93.304 188.501 155.498-228.194 102.416-228.194 102.416l-603.258-53.988s254.916 42.962 12.684-141.732z"
						fill="#609249"
					/>
				</G>
			</G>
			<Defs>
				<ClipPath id="clip0_1_195">
					<Path fill="#fff" d="M0 0H600V710H0z" />
				</ClipPath>
			</Defs>
		</>
	);
};
