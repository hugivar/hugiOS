# Setting PATH for Python 3.7
# The original version is saved in .bash_profile.pysave
# PATH="/Library/Frameworks/Python.framework/Versions/3.7/bin:${PATH}"
# export PATH
export PATH="/usr/local/bin:$PATH"

# If you are on macOS or Linux, add the Android SDK location to your PATH using ~/.bash_profile or ~/.bash_rc. 
# You can do this by adding a line like export ANDROID_SDK=/Users/myuser/Library/Android/sdk
export ANDROID_SDK=/Users/${USER}/Library/Android/sdk

# On macOS, you will also need to add platform-tools to your ~/.bash_profile or ~/.bash_rc., 
# by adding a line like export PATH=/Users/myuser/Library/Android/sdk/platform-tools:$PATH
export PATH=/Users/${USER}/Library/Android/sdk/platform-tools:$PATH
# Setting PATH for Python 3.9
# The original version is saved in .bash_profile.pysave
PATH="/Library/Frameworks/Python.framework/Versions/3.9/bin:${PATH}"
export PATH

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

export ANDROID_HOME=~/Library/Android/sdk       
export ANDROID_SDK_ROOT=~/Library/Android/sdk       
export ANDROID_AVD_HOME=~/.android/avd

export ANDROID_HOME=~/Library/Android/sdk
export ANDROID_SDK_ROOT=~/Library/Android/sdk
export ANDROID_AVD_HOME=~/.android/avd
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"

. "$HOME/.cargo/env"

source ~/.bash_prompt
source ~/.aliases 

# NPM global installs
export PATH=$PATH:/usr/local/Cellar/node/12.4.0/bin

echo $nu.env-path