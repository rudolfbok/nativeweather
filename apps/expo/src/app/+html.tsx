import type { PropsWithChildren } from 'react';

// Web only: the root HTML document, rendered on the server during static export. It has no access to browser APIs
// or app providers, so keep it to <head> tags and the document shell.
export default function Root({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" />
				{/* Resets the body scroll so the app's own scroll views handle scrolling. */}
			</head>
			<body>{children}</body>
		</html>
	);
}
