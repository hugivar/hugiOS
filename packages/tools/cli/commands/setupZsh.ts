import { program } from 'commander';
import { execSync } from 'child_process';

const setupZsh = () => {
    program
        .action(() => {
            execSync(`
                git config --global user.name "hugivar"
                
                git config --global core.excludesfile ~/.gitignore_global
                
                ## Setup zsh environment
                
                cd ~
                
                sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
                
                git clone https://github.com/romkatv/powerlevel10k.git ~/themes/powerlevel10k
                
                git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting
                
                git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions
                
                git clone https://github.com/rupa/z.git

                brew install exa

                cd ~/.oh-my-zsh && git clone https://github.com/zsh-users/zsh-completions ~/.oh-my-zsh/custom/plugins/zsh-completions

                cp -R .zshrc ~/.zshrc

                brew install --cask notunes 

                ## Setup node environment

                brew install node

                // curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
                curl https://get.volta.sh | bash

                curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

                npm i -g expo-cli
                npm i -g eas-cli

                brew install fzf
                brew install fd
                brew install gh
            `);
        })
        .configureOutput({
            writeOut: (str) => console.log(`[OUT] ${str}`),
            writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
        });

    program.parse();
}

export default setupZsh;