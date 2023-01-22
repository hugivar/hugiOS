#!/usr/bin/swift

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Quit All Applications
// @raycast.mode silent

// Optional parameters:
// @raycast.icon 💥

import AppKit

let finderBundleIdentifier = "com.apple.finder"

NSWorkspace.shared.runningApplications
  .filter { $0 != NSRunningApplication.current }
  .filter { $0.activationPolicy == .regular }
  .filter { $0.bundleIdentifier != finderBundleIdentifier }
  .forEach { $0.terminate() }

print("Quit all applications")
