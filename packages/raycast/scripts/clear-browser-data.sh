#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Clear Browser Data
# @raycast.mode fullOutput

# Define the path to Vivaldi's cache and history
VIVALDI_CACHE_PATH="$HOME/Library/Application Support/Vivaldi/Default"
VIVALDI_HISTORY_PATH="$HOME/Library/Application Support/Vivaldi/Default/History"
VIVALDI_COOKIES_PATH="$HOME/Library/Application Support/Vivaldi/Default/Cookies"

# Delete the Vivaldi Browser cache
if [ -d "$VIVALDI_CACHE_PATH" ]; then
    rm -rf "$VIVALDI_CACHE_PATH/Local Storage"
    rm -rf "$VIVALDI_CACHE_PATH/Session Storage"
    rm -rf "$VIVALDI_CACHE_PATH/Sessions"
    echo "Vivaldi browser cache deleted."
else
    echo "Vivaldi browser cache not found."
fi

# Delete the Vivaldi Browser history
if [ -f "$VIVALDI_HISTORY_PATH" ]; then
    rm -f "$VIVALDI_HISTORY_PATH"
    echo "Vivaldi browser history deleted."
else
    echo "Vivaldi browser history not found."
fi

# Delete the Vivaldi Browser cookies
if [ -f "$VIVALDI_COOKIES_PATH" ]; then
    rm -f "$VIVALDI_COOKIES_PATH"
    echo "Vivaldi browser cookies deleted."
else
    echo "Vivaldi browser cookies not found."
fi
