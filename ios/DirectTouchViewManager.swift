import Foundation
import UIKit

@objc(DirectTouchViewManager)
class DirectTouchViewManager: RCTViewManager {
  
  override func view() -> UIView {
    let view = UIView()
    view.accessibilityTraits = UIAccessibilityTraits.allowsDirectInteraction
    view.isAccessibilityElement = true
    return view
  }

@objc
override static func requiresMainQueueSetup() -> Bool {
  return true
}
}
