export USER="${USER}"

export PATH=$PATH:~/flutter/bin
export PATH=$PATH:~/go/bin
export PATH=~/Library/Android/sdk/tools:$PATH
export PATH=~/Library/Android/sdk/platform-tools:$PATH

export ANDROID_HOME=/Users/${USER}/Library/Android/sdk
export ANDROID_SDK_ROOT=/Users/${USER}/Library/Android/sdk
export ANDROID_AVD_HOME=/Users/${USER}/.android/avd
export ANDROID_NDK_HOME=/Users/${USER}/Android/sdk/ndk/22.1.7171670
# export JAVA_HOME=/Library/Internet Plug-Ins/JavaAppletPlugin.plugin/Contents/Home
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_291.jdk/Contents/Home

source $(brew --prefix)/opt/powerlevel10k/powerlevel10k.zsh-theme

# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

plugins=(
  git
  git-extra-commands
  macos
  zsh-autosuggestions
  zsh-autocomplete
  zsh-syntax-highlighting
  you-should-use
)
  
# DISABLE_AUTO_TITLE="true"

# Alias
if [ -x "$(command -v exa)" ]; then
  alias ls="exa"
  alias l="exa -lbF --git"
  alias ll="exa -lbGF --git"
  alias llm="exa -lbGF --git --sort=modified"
  alias la="exa --long --all --group"
  alias lx="exa -lbhHigUmuSa@ --time-style=long-iso --git --color-scale"
fi

alias bertyAndroid="cd ~/repos/berty/js/android"
alias repos="cd ~/repos/"

# Git
alias ga="git add"
alias gc="git commit"
alias gl="git pull"
alias gcb="git checkout -b"
alias gcf="git config --list"
alias gcmsg="git commit --message"
alias gf="git fetch"
alias gp="git push"
alias g="git"

# Misc
alias sgrep="grep -R -n -H -C 5 --exclude-dir={.git,.svn,CVS}"
alias t="tail -f"
alias h="history"
alias hs="history | grep"
alias hsi="history | grep -i"
alias help="man"
alias rm="rm -i"
alias cp="cp -i"
alias mv="mv -i"
alias kill="sudo kill"

# User configuration

export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
if [[ -n $SSH_CONNECTION ]]; then
  export EDITOR='vim'
else
  export EDITOR='mvim'
fi

# Compilation flags
export ARCHFLAGS="-arch x86_64"

alias zshconfig="mate ~/.zshrc"

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

bindkey \^U backward-kill-line
# 
typeset -g POWERLEVEL9K_INSTANT_PROMPT=quiet

export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
export NVM_DIR="$HOME/.config/nvm"
export VOLTA_HOME=$HOME/.volta
export PATH=$VOLTA_HOME/bin:$PATH


# pnpm
export PNPM_HOME="/Users/${USER}/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"
# pnpm end


# oh-my-zsh
export ZSH="$HOME/repos/ohmyzsh"
ZSH_THEME="robbyrussell"
source $ZSH/oh-my-zsh.sh
# on-my-zsh end