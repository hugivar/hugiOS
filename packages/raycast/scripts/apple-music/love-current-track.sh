#!/bin/bash


# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Love Current Track
# @raycast.mode silent

# Optional parameters:
# @raycast.icon images/apple-music-logo.png

osascript -e '
tell application "Music"
    if player state is playing then
        set favorited of current track to true
        log "<3 Yeah, that song is rad."
    else
        return "No track is currently playing."
    end if
end tell'