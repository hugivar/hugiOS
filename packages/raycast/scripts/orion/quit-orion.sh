#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Quit Orion
# @raycast.mode silent

# Optional parameters:
# @raycast.icon images/orion-logo.png

osascript -e 'tell application "Orion" to quit'