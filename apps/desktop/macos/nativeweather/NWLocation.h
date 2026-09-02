#import <CoreLocation/CoreLocation.h>
#import <React/RCTBridgeModule.h>

@interface NWLocation : NSObject <RCTBridgeModule, CLLocationManagerDelegate>
@end
