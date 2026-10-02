#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <ReactAppDependencyProvider/RCTAppDependencyProvider.h>

static const CGFloat kWindowControlInset = 14.0;

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)notification
{
  self.moduleName = @"nativeweather";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  self.dependencyProvider = [RCTAppDependencyProvider new];
  
  [super applicationDidFinishLaunching:notification];
  self.window.title = @"NativeWeather";
  self.window.titleVisibility = NSWindowTitleHidden;
  self.window.titlebarAppearsTransparent = YES;
  self.window.styleMask |= NSWindowStyleMaskFullSizeContentView;
  const NSSize windowSize = NSMakeSize(1125, 789);
  [self.window setFrame:NSMakeRect(self.window.frame.origin.x, self.window.frame.origin.y,
                                   windowSize.width, windowSize.height)
                 display:NO];
  self.window.minSize = windowSize;
  self.window.styleMask |= NSWindowStyleMaskResizable;
  self.window.delegate = self;
  self.window.collectionBehavior =
      NSWindowCollectionBehaviorFullScreenNone | NSWindowCollectionBehaviorFullScreenDisallowsTiling;
  [self.window standardWindowButton:NSWindowZoomButton].enabled = YES;
  dispatch_async(dispatch_get_main_queue(), ^{
    [self positionWindowControls];
  });
}

- (void)positionWindowControls
{
  NSButton *closeButton = [self.window standardWindowButton:NSWindowCloseButton];
  NSButton *miniaturizeButton = [self.window standardWindowButton:NSWindowMiniaturizeButton];
  NSButton *zoomButton = [self.window standardWindowButton:NSWindowZoomButton];
  NSView *buttonContainer = closeButton.superview;

  if (!buttonContainer || miniaturizeButton.superview != buttonContainer || zoomButton.superview != buttonContainer) {
    return;
  }

  NSRect closeFrame = closeButton.frame;
  const CGFloat targetY = NSMaxY(buttonContainer.bounds) - kWindowControlInset - NSHeight(closeFrame);
  const CGFloat deltaX = kWindowControlInset - NSMinX(closeFrame);
  const CGFloat deltaY = targetY - NSMinY(closeFrame);

  for (NSButton *button in @[closeButton, miniaturizeButton, zoomButton]) {
    NSRect frame = button.frame;
    frame.origin.x += deltaX;
    frame.origin.y += deltaY;
    button.frame = frame;
  }
}

- (void)windowDidResize:(NSNotification *)notification
{
  [self positionWindowControls];
}

- (void)windowDidBecomeKey:(NSNotification *)notification
{
  [self positionWindowControls];
}

- (NSSize)windowWillResize:(NSWindow *)sender toSize:(NSSize)frameSize
{
  return NSMakeSize(1125, 789);
}

- (BOOL)windowShouldZoom:(NSWindow *)window toFrame:(NSRect)newFrame
{
  return NO;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
#ifdef RN_FABRIC_ENABLED
  return true;
#else
  return false;
#endif
}

@end
