#!/bin/bash

# Vivaldi Settings Backup Script for macOS
# Run this script on your SOURCE Mac to create a backup of all Vivaldi settings

set -e  # Exit on any error

echo "🦊 Vivaldi Settings Backup Script"
echo "=================================="

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

# Define paths
VIVALDI_PATH="$HOME/Library/Application Support/Vivaldi"
BACKUP_FILE="$HOME/Desktop/vivaldi_profile_backup_$(date +%Y%m%d_%H%M%S).tar.gz"

# Check if Vivaldi directory exists
if [ ! -d "$VIVALDI_PATH" ]; then
    echo "❌ Vivaldi directory not found at: $VIVALDI_PATH"
    echo "   Make sure Vivaldi is installed and has been run at least once."
    exit 1
fi

echo "📁 Found Vivaldi directory: $VIVALDI_PATH"
echo "💾 Creating backup archive..."

# Create the backup
cd "$HOME/Library/Application Support"
if tar -czf "$BACKUP_FILE" Vivaldi; then
    echo "✅ Backup created successfully!"
    echo "📦 Backup file: $BACKUP_FILE"
    
    # Show backup file size
    BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo "📊 Backup size: $BACKUP_SIZE"
    
    echo ""
    echo "🚀 Next steps:"
    echo "1. Transfer the backup file to your new Mac using:"
    echo "   - AirDrop"
    echo "   - USB drive"
    echo "   - Cloud storage (iCloud, Dropbox, etc.)"
    echo "   - Network transfer"
    echo ""
    echo "2. Run the restore script on your destination Mac"
    echo ""
    echo "⚠️  Note: Saved passwords may not transfer unless you also migrate"
    echo "   the 'Vivaldi Safe Storage' item from your macOS Keychain."
else
    echo "❌ Failed to create backup archive"
    exit 1
fi