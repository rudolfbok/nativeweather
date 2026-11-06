import { useId } from 'react';
import { ClipPath, Defs, G, Mask, Path } from 'react-native-svg';

export const ClearDayLandscape = () => {
	const id = useId();
	return (
		<>
			<G clipPath={`url(#${id}clip0_1_115)`}>
				<Mask
					id={`${id}a`}
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
				<G mask={`url(#${id}a)`}>
					<Path d="M0 0h600v710H0V0z" fill="#49AADF" />
					<Path
						d="M53.966 718.627c170.614-75.156 672.848-142.831 925.774-91.669 252.93 51.163 8.711 87.976 8.711 87.976L62.678 806.602l-8.712-87.975z"
						fill="#7DB835"
					/>
					<Path
						d="M-203.562 711.725c-242.232-184.695 630.267-62.195 818.768 93.304 188.501 155.498-228.194 102.416-228.194 102.416l-603.258-53.988s254.916 42.962 12.684-141.732z"
						fill="#6BA92E"
					/>
				</G>
			</G>
			<Defs>
				<ClipPath id={`${id}clip0_1_115`}>
					<Path fill="#fff" d="M0 0H600V710H0z" />
				</ClipPath>
			</Defs>
		</>
	);
};
