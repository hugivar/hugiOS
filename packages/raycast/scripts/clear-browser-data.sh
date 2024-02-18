#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Clear Browser Data
# @raycast.mode fullOutput
# @raycast.packageName Web Searches


# Define the path to Arc's cache and history
ARC_CACHE_PATH="$HOME/Library/Application Support/Arc/User Data/Default"
ARC_HISTORY_PATH="$HOME/Library/Application Support/Arc/User Data/Default/History"
ARC_COOKIES_PATH="$HOME/Library/Application Support/Arc/User Data/Default/Cookies"


# Delete the Arc Browser cache
if [ -d "$ARC_CACHE_PATH" ]; then
    rm -rf "$ARC_CACHE_PATH/Local Storage"
    rm -rf "$ARC_CACHE_PATH/Session Storage"
    rm -rf "$ARC_CACHE_PATH/Sessions"
    echo "Arc browser cache deleted."
else
    echo "Arc browser cache not found."
fi

# Delete the Arc Browser history
if [ -f "$ARC_HISTORY_PATH" ]; then
    rm -f "$ARC_HISTORY_PATH"
    echo "Arc browser history deleted."
else
    echo "Arc browser history not found."
fi

# Delete the Arc Browser cookies
if [ -f "$ARC_COOKIES_PATH" ]; then
    rm -f "$ARC_COOKIES_PATH"
    echo "Arc browser cookies deleted."
else
    echo "Arc browser cookies not found."
fi
