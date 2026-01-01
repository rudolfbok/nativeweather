import Svg, { G, Path, Defs, LinearGradient, Stop, ClipPath } from 'react-native-svg';

export const SnowLandscape = () => {
	return (
		<Svg width={600} height={710} viewBox="0 0 600 710">
			<G clipPath="url(#clip0_40_7)">
				<Path fill="url(#paint0_linear_40_7)" d="M0 0H600V710H0z" />
				<Path
					d="M53.966 718.627c170.614-75.156 672.848-142.831 925.774-91.668 252.93 51.162 8.711 87.975 8.711 87.975L62.678 806.603l-8.712-87.976z"
					fill="#6DA6C6"
				/>
				<Path
					d="M-203.562 711.725c-242.232-184.695 630.267-62.195 818.769 93.304 188.501 155.498-228.195 102.416-228.195 102.416l-603.258-53.988s254.916 42.962 12.684-141.732z"
					fill="#659EBB"
				/>
			</G>
			<Defs>
				<LinearGradient id="paint0_linear_40_7" x1={300} y1={0} x2={300} y2={710} gradientUnits="userSpaceOnUse">
					<Stop stopColor="#27496D" />
					<Stop offset={1} stopColor="#6197B8" />
				</LinearGradient>
				<ClipPath id="clip0_40_7">
					<Path fill="#fff" d="M0 0H600V710H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
};
