'use client';

export default function GlobalError(reset: () => void) {
	return (
		<html lang="en">
			<body>
				<main style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
					<p style={{ fontSize: 24, fontWeight: 800 }}>NativeWeather couldn't start</p>
					<p>Something went wrong. Please try again.</p>
					<button
						onClick={() => reset()}
						style={{
							borderWidth: 1,
							// borderColor: 'blue',
							backgroundColor: 'transparent',
							padding: 8,
							borderRadius: 20,
						}}
					>
						Try again
					</button>
				</main>
			</body>
		</html>
	);
}
