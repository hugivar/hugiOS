#!/usr/bin/swift

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Quit All Applications
// @raycast.mode silent

// Optional parameters:
// @raycast.icon 💥

import AppKit

let finderBundleIdentifier = "com.apple.finder"

let runningApps = NSWorkspace.shared.runningApplications
let filteredApps = runningApps.filter { app in
    let appName = app.localizedName ?? ""
    return appName != "Motion" && appName != "Apple Music"
}

filteredApps
  .filter { $0 != NSRunningApplication.current }
  .filter { $0.activationPolicy == .regular }
  .filter { $0.bundleIdentifier != finderBundleIdentifier }
  .forEach { $0.terminate() }

print("Quit all applications")
