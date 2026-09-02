#import "NWLocation.h"

@interface NWLocation ()
@property(nonatomic, strong) CLLocationManager *locationManager;
@property(nonatomic, copy) RCTPromiseResolveBlock resolve;
@property(nonatomic, copy) RCTPromiseRejectBlock reject;
@end

@implementation NWLocation

RCT_EXPORT_MODULE(NWLocation);

- (instancetype)init
{
  self = [super init];
  if (self) {
    _locationManager = [CLLocationManager new];
    _locationManager.delegate = self;
    _locationManager.desiredAccuracy = kCLLocationAccuracyKilometer;
  }
  return self;
}

RCT_REMAP_METHOD(getCurrentPosition,
                 getCurrentPositionWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  self.resolve = resolve;
  self.reject = reject;

  if (![CLLocationManager locationServicesEnabled]) {
    [self rejectWithCode:@"unavailable" message:@"Location services are disabled."];
    return;
  }

  CLAuthorizationStatus status = self.locationManager.authorizationStatus;
  if (status == kCLAuthorizationStatusDenied || status == kCLAuthorizationStatusRestricted) {
    [self rejectWithCode:@"permission" message:@"Location permission was denied."];
    return;
  }

  if (status == kCLAuthorizationStatusNotDetermined) {
    [self.locationManager requestWhenInUseAuthorization];
    return;
  }

  [self.locationManager startUpdatingLocation];
}

- (void)locationManagerDidChangeAuthorization:(CLLocationManager *)manager
{
  CLAuthorizationStatus status = manager.authorizationStatus;

  [self handleAuthorizationStatus:status manager:manager];
}

- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status
{
  [self handleAuthorizationStatus:status manager:manager];
}

- (void)handleAuthorizationStatus:(CLAuthorizationStatus)status manager:(CLLocationManager *)manager
{
  if (status == kCLAuthorizationStatusAuthorized || status == kCLAuthorizationStatusAuthorizedAlways) {
    [manager startUpdatingLocation];
  } else if (status == kCLAuthorizationStatusDenied || status == kCLAuthorizationStatusRestricted) {
    [self rejectWithCode:@"permission" message:@"Location permission was denied."];
  }
}

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations
{
  CLLocation *location = locations.lastObject;
  if (!location) {
    [self rejectWithCode:@"unavailable" message:@"Your Mac could not determine its location."];
    return;
  }

  [manager stopUpdatingLocation];
  RCTPromiseResolveBlock resolve = self.resolve;
  self.resolve = nil;
  self.reject = nil;
  if (!resolve) return;

  resolve(@{
    @"latitude": @(location.coordinate.latitude),
    @"longitude": @(location.coordinate.longitude),
  });
}

- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error
{
  [manager stopUpdatingLocation];
  [self rejectWithCode:@"unavailable" message:error.localizedDescription ?: @"Your Mac could not determine its location."];
}

- (void)rejectWithCode:(NSString *)code message:(NSString *)message
{
  RCTPromiseRejectBlock reject = self.reject;
  self.resolve = nil;
  self.reject = nil;
  if (reject) reject(code, message, nil);
}

@end
