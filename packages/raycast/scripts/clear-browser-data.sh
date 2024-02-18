#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Clear Browser Data
# @raycast.mode fullOutput

# Define the path to Arc's cache and history
ARC_CACHE_PATH="$HOME/Library/Application Support/Arc/User Data/Default"
ARC_HISTORY_PATH="$HOME/Library/Application Support/Arc/User Data/Default/History"
ARC_COOKIES_PATH="$HOME/Library/Application Support/Arc/User Data/Default/Cookies"
ORION_CACHE_PATH="$HOME/Library/Application Support/Orion/Defaults"


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

# Delete the Orion Browser cache
if [ -d "$ORION_CACHE_PATH" ]; then
    rm -rf "$ORION_CACHE_PATH/Local Storage"
    rm -rf "$ORION_CACHE_PATH/Session Storage"
    echo "Orion browser cache deleted."
else
    echo "Orion browser cache not found."
fi

# Delete the Orion Browser history
if [ -d "$ORION_CACHE_PATH" ]; then
    rm -f "$ORION_CACHE_PATH/history"
    rm -f "$ORION_CACHE_PATH/history-wal"
    rm -f "$ORION_CACHE_PATH/history-shm"
    echo "Orion browser history deleted."
else
    echo "Orion browser history not found."
fi