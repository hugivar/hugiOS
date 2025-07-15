#!/bin/bash

# Vivaldi Settings Restore Script for macOS
# Run this script on your DESTINATION Mac to restore Vivaldi settings from backup

set -e  # Exit on any error

echo "🦊 Vivaldi Settings Restore Script"
echo "==================================="

# Check if Vivaldi is running
if pgrep -x "Vivaldi" > /dev/null; then
    echo "⚠️  Vivaldi is currently running. Please quit Vivaldi before proceeding."
    echo "   You can quit Vivaldi by pressing Cmd+Q or from the menu."
    read -p "Press Enter after quitting Vivaldi to continue..."
    
    # Double-check if Vivaldi is still running
    if pgrep -x "Vivaldi" > /dev/null; then
        echo "❌ Vivaldi is still running. Please quit it completely and run this script again."
        exit 1
    fi
fi

# Function to find backup file
find_backup_file() {
    echo "🔍 Looking for backup files..."
    
    # Common locations to check
    LOCATIONS=(
        "$HOME/Desktop"
        "$HOME/Downloads"
        "$HOME/Documents"
    )
    
    for location in "${LOCATIONS[@]}"; do
        if [ -d "$location" ]; then
            BACKUP_FILES=($(find "$location" -name "vivaldi_profile_backup*.tar.gz" 2>/dev/null))
            if [ ${#BACKUP_FILES[@]} -gt 0 ]; then
                echo "📁 Found backup files in $location:"
                for i in "${!BACKUP_FILES[@]}"; do
                    echo "  $((i+1)). $(basename "${BACKUP_FILES[$i]}")"
                done
                echo ""
                read -p "Enter the number of the backup file to restore (or 'c' to specify custom path): " choice
                
                if [ "$choice" = "c" ] || [ "$choice" = "C" ]; then
                    read -p "Enter the full path to your backup file: " BACKUP_FILE
                elif [[ "$choice" =~ ^[0-9]+$ ]] && [ "$choice" -ge 1 ] && [ "$choice" -le ${#BACKUP_FILES[@]} ]; then
                    BACKUP_FILE="${BACKUP_FILES[$((choice-1))]}"
                    return 0
                else
                    echo "❌ Invalid selection"
                    continue
                fi
                
                if [ -f "$BACKUP_FILE" ]; then
                    return 0
                fi
            fi
        fi
    done
    
    # If no backup found, ask for manual path
    echo "❌ No backup files found automatically."
    read -p "Enter the full path to your backup file: " BACKUP_FILE
}

# Find the backup file
find_backup_file

# Verify backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Backup file not found: $BACKUP_FILE"
    exit 1
fi

echo "📦 Using backup file: $BACKUP_FILE"

# Define paths
VIVALDI_PATH="$HOME/Library/Application Support/Vivaldi"
BACKUP_DIR="$HOME/Library/Application Support/Vivaldi_backup_$(date +%Y%m%d_%H%M%S)"

# Create backup of existing Vivaldi data (if it exists)
if [ -d "$VIVALDI_PATH" ]; then
    echo "📋 Backing up existing Vivaldi data to: $BACKUP_DIR"
    mv "$VIVALDI_PATH" "$BACKUP_DIR"
    echo "✅ Existing data backed up"
fi

# Create Application Support directory if it doesn't exist
mkdir -p "$HOME/Library/Application Support"

echo "🔄 Restoring Vivaldi settings from backup..."

# Extract the backup
cd "$HOME/Library/Application Support"
if tar -xzf "$BACKUP_FILE"; then
    echo "✅ Vivaldi settings restored successfully!"
    echo ""
    echo "🎉 Restoration complete!"
    echo "📁 Vivaldi data restored to: $VIVALDI_PATH"
    
    if [ -d "$BACKUP_DIR" ]; then
        echo "💾 Your previous Vivaldi data was backed up to: $BACKUP_DIR"
        echo "   You can delete this backup folder if the restoration works correctly."
    fi
    
    echo ""
    echo "🚀 Next steps:"
    echo "1. Launch Vivaldi"
    echo "2. Verify that your settings, bookmarks, and extensions are restored"
    echo "3. If passwords don't work, you may need to migrate the 'Vivaldi Safe Storage'"
    echo "   item from your old Mac's Keychain Access"
    echo ""
    echo "⚠️  If something goes wrong, you can restore your previous data by running:"
    if [ -d "$BACKUP_DIR" ]; then
        echo "   rm -rf '$VIVALDI_PATH'"
        echo "   mv '$BACKUP_DIR' '$VIVALDI_PATH'"
    fi
else
    echo "❌ Failed to restore backup"
    echo "🔄 Attempting to restore previous data..."
    
    if [ -d "$BACKUP_DIR" ]; then
        rm -rf "$VIVALDI_PATH" 2>/dev/null || true
        mv "$BACKUP_DIR" "$VIVALDI_PATH"
        echo "✅ Previous data restored"
    fi
    
    exit 1
fi