#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Living in the Library
# @raycast.mode fullOutput

# Optional parameters:
# @raycast.icon images/apple-music-logo.png

osascript -e 'tell application "Music" to play (some playlist whose name is "Living in the Library")'