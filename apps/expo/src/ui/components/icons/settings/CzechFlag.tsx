import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

export const CzechFlag = () => {
	return (
		<Svg width={20} height={20} viewBox="0 0 18 18" fill="none">
			<G clipPath="url(#clip0_286_54)">
				<Path
					d="M.482 3.313A1.345 1.345 0 000 4.345v9.097c0 .415.187.785.482 1.033L9 8.893.482 3.312z"
					fill="#41479B"
				/>
				<Path
					d="M.484 14.48c.235.196.537.315.867.315h15.304c.744 0 1.348-.604 1.348-1.348V8.898h-9L.484 14.48z"
					fill="#FF4B55"
				/>
				<Path
					d="M16.655 3H1.35c-.33 0-.632.119-.867.316l8.519 5.58h9V4.349c0-.744-.604-1.348-1.348-1.348z"
					fill="#F5F5F5"
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_286_54">
					<Path fill="#fff" d="M0 0H18V18H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
};
