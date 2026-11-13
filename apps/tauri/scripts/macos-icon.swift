// Builds src-tauri/icons/icon.icns from the Expo app icon in the macOS icon shape: the artwork is inset on the
// 1024 canvas and clipped to a rounded square, as the Dock expects. The other platforms' icons stay full-bleed.
// Run from apps/tauri: swift scripts/macos-icon.swift
import AppKit

let source = NSImage(contentsOfFile: "../expo/assets/icon.png")!
let iconset = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent("icon.iconset")
try? FileManager.default.removeItem(at: iconset)
try! FileManager.default.createDirectory(at: iconset, withIntermediateDirectories: true)

// Apple's grid: an 824 square with a 185 corner radius, centred on 1024.
func render(_ size: Int) -> Data {
	let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: size, pixelsHigh: size, bitsPerSample: 8,
		samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
	NSGraphicsContext.saveGraphicsState()
	NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)
	let scale = CGFloat(size) / 1024
	let rect = NSRect(x: 100 * scale, y: 100 * scale, width: 824 * scale, height: 824 * scale)
	NSBezierPath(roundedRect: rect, xRadius: 185 * scale, yRadius: 185 * scale).addClip()
	source.draw(in: rect)
	NSGraphicsContext.restoreGraphicsState()
	return rep.representation(using: .png, properties: [:])!
}

for base in [16, 32, 128, 256, 512] {
	try! render(base).write(to: iconset.appendingPathComponent("icon_\(base)x\(base).png"))
	try! render(base * 2).write(to: iconset.appendingPathComponent("icon_\(base)x\(base)@2x.png"))
}

let iconutil = Process()
iconutil.executableURL = URL(fileURLWithPath: "/usr/bin/iconutil")
iconutil.arguments = ["-c", "icns", iconset.path, "-o", "src-tauri/icons/icon.icns"]
try! iconutil.run()
iconutil.waitUntilExit()
