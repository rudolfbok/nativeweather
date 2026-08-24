/**
 * React Native equivalent of a 1px black text outline.
 * Text nodes do not support CSS `outline` on native/macOS, so use a
 * zero-offset text shadow to draw the outline around each glyph.
 */
export const textOutline = {
	textShadowColor: '#000000',
	textShadowOffset: { width: 0, height: 0 },
	textShadowRadius: 1,
};
