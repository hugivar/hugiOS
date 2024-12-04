#!/bin/bash

# Required Raycast script commands
# @raycast.schemaVersion 1
# @raycast.title Free Up RAM
# @raycast.mode fullOutput
# @raycast.packageName System
# @raycast.icon 🧹

# Function to display memory usage
show_memory_usage() {
    echo "Current memory usage:"
    vm_stat | perl -ne '/page size of (\d+)/ and $size=$1; /Pages\s+([^:]+)[^\d]+(\d+)/ and printf("%-16s % 16.2f Mi\n", "$1:", $2 * $size / 1048576);'
}

# Function to clear application caches
clear_app_caches() {
    echo "Clearing application caches..."
    find ~/Library/Application\ Support/Google/Chrome/Default/Cache -type f -delete 2>/dev/null
}

# Function to close inactive apps
close_inactive_apps() {
    echo "Closing inactive applications..."
    osascript -e 'tell application "System Events" to set the visible of every process to true'
    osascript -e 'tell application "System Events" to set frontmost of every process where visible is true and name is not "Finder" to false'
    osascript -e 'tell application "System Events" to tell every process where visible is true and name is not "Finder" and frontmost is false to quit'
}

# Main script
echo "Free Up RAM Script (No sudo)"
echo "============================"

# Show initial memory usage
show_memory_usage

# Perform cleanup operations
clear_app_caches
close_inactive_apps

# Force garbage collection in Python (if installed)
if command -v python3 &> /dev/null; then
    echo "Running Python garbage collection..."
    python3 -c "import gc; gc.collect()"
fi

# Clear system log files
echo "Clearing system log files..."
rm -rf ~/Library/Logs/*

# Show final memory usage
echo "Memory usage after cleanup:"
show_memory_usage

echo "RAM cleanup complete!"