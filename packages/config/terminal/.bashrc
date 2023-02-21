# Fig pre block. Keep at the top of this file.
[[ -f "$HOME/.fig/shell/bashrc.pre.bash" ]] && builtin source "$HOME/.fig/shell/bashrc.pre.bash"

export ANDROID_HOME=/Users/${USER}/Library/Android/sdk
export ANDROID_SDK_ROOT=/Users/${USER}/Library/Android/sdk
export ANDROID_AVD_HOME=/Users/${USER}/.android/avd
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"

. "$HOME/.cargo/env"

source ~/.bash_prompt
source ~/.aliases 
source ~/.profile

# NPM global installs
export PATH=$PATH:~/.npm-global/bi

# Fig post block. Keep at the bottom of this file.
[[ -f "$HOME/.fig/shell/bashrc.post.bash" ]] && builtin source "$HOME/.fig/shell/bashrc.post.bash"