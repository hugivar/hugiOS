/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Notion token - Notion api access token */
  "accessToken": string,
  /** Path to Vault - Specify the path or multiple paths (comma separated) to your vault/vaults */
  "vaultPath"?: string,
  /** Exclude following folders - Specify which folders to exclude (comma separated) */
  "excludedFolders"?: string,
  /** Remove content - Hide YAML frontmatter for copying and viewing notes */
  "removeYAML"?: boolean,
  /**  - Hide LaTeX (surrounded by $$ or $) for copying and viewing notes */
  "removeLatex"?: boolean,
  /**  - Hide links for copying and viewing notes */
  "removeLinks"?: boolean
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `createNoteCommand` command */
  export type CreateNoteCommand = ExtensionPreferences & {
  /** Blank Note - Create a blank note */
  "blankNote"?: boolean,
  /** Open Note on Creation - Open the created note in Obsidian */
  "openOnCreate"?: boolean,
  /** Default Path - The default path where a new note will be created */
  "prefPath"?: string,
  /** Default Note Name - The default note name if no name is specified */
  "prefNoteName"?: string,
  /** Default Note Content - The default note content (supports templates) */
  "prefNoteContent"?: string,
  /** Fill form with defaults - Fill form with default values */
  "fillFormWithDefaults"?: boolean,
  /** Default Tag - The default selected tag */
  "prefTag"?: string,
  /** Tags - The tags which will be suggested on note creation */
  "tags"?: string,
  /** Folder Actions - Add actions to folders (comma separated) */
  "folderActions"?: string
}
}

declare namespace Arguments {
  /** Arguments passed to the `createNoteCommand` command */
  export type CreateNoteCommand = {}
}
