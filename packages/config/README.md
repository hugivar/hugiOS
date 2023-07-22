# Shared configs between work environments

## Terminal Configs

**List of terminal config files:**

1. bash_profile
2. bash_prompt
3. bashrc
4. vimrc
5. zshrc

### Symlink HugiOS dotfiles to the local dotfiles

```
hugios update dotfiles 
```
### Useful Links

1. https://www.swyx.io/new-mac-setup

### List of plugins

1. zsh-completions: https://github.com/zsh-users/zsh-completions

## OhMyZsh configuration

Find my forked configruations of oh-my-zsh
https://github.com/hugivar/ohmyzsh 

## VSCode Config
 
https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf

### Find json files

To open the User settings:

    Open the command palette (either with F1 or Ctrl+Shift+P)
    Type "open settings"
    You are presented with two options, choose Open Settings (JSON)

Which, depending on platform, is one of:

    Windows %APPDATA%\Code\User\settings.json
    macOS $HOME/Library/Application\ Support/Code/User/settings.json
    Linux $HOME/.config/Code/User/settings.json

The Workspace settings will be in a {workspaceName}.code-workspace file where you saved it, and the Folder settings will be in a .vscode folder if and when it has been created.