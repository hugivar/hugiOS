#!/bin/sh

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Capture Screen Selection
# @raycast.mode silent
# @raycast.packageName System
#
# Optional parameters:
# @raycast.icon 💻
#
# Documentation:
# @raycast.description This script screenshots the selected area and saves it to the desktop with the input title name
# @raycast.author Hugo
# @raycast.authorURL https://github.com/hugivar
# @raycast.argument1 { "type": "text", "placeholder": "Title" }

screencapture -i ~/Desktop/"${1}".png
echo "${1} saved to desktop"