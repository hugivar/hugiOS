#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Code
# @raycast.mode inline

# Optional parameters:
# @raycast.icon images/vscode.png
# @raycast.description Opens VS Code workspace file from path specified in .env

# Load environment variables from .env file
ENV_FILE="../../../.env"

# Read and export the WORKSPACE_PATH
while IFS= read -r line || [ -n "$line" ]; do
    if [[ $line =~ ^WORKSPACE_PATH= ]]; then
        export "$line"
        break
    fi
done < "$ENV_FILE"

# Check if WORKSPACE_PATH is defined in .env
if [ -z "$WORKSPACE_PATH" ]; then
    echo "Error: WORKSPACE_PATH not defined in .env file"
    exit 1
fi

# Open workspace in VS Code
open "$WORKSPACE_PATH"
 
#  The script reads the  WORKSPACE_PATH  variable from the  .env  file and opens the workspace in VS Code. 
#  To use the script, you need to create a  .env  file in the root of your project directory and define the  WORKSPACE_PATH  variable. 
#  Here is an example of the  .env  file: 
#  WORKSPACE_PATH="/path/to/workspace.code-workspace"
 
#  You can now run the script from Raycast to open the workspace in VS Code. 
#  # Open a specific file in VS Code 
#  You can also create a script to open a specific file in VS Code. 
#  Here is an example script that opens a specific file in VS Code: