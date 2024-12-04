#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Notion
# @raycast.mode inline

# Optional parameters:
# @raycast.icon images/notion-logo-no-background.png

osascript <<EOD
tell application "Notion" to activate
delay 1
tell application "System Events"
    keystroke "f" using {control down, command down}
end tell
EOD