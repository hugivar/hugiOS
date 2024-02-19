#!/bin/bash


# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Love Current Track
# @raycast.mode fullOutput

# Optional parameters:
# @raycast.icon images/apple-music-logo.png

osascript -e '
tell application "Music"
    if player state is playing then
        if kind of current track contains "song" then
            set loved of current track to true
        else
            return "The current track is not a song."
        end if
    else
        return "No track is currently playing."
    end if
end tell'

osascript -e 'tell application "Music" to get kind of current track'

osascript -e '
tell application "Music"
    if player state is playing then
        set trackName to name of current track
        set artistName to artist of current track
        set albumName to album of current track
        return "Track: " & trackName & ", Artist: " & artistName & ", Album: " & albumName
    else
        return "No track is currently playing."
    end if
end tell'

osascript -e '
tell application "Music"
    if player state is playing then
        get kind of current track
    else
        return "No track is currently playing."
    end if
end tell'