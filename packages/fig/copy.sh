export "$(grep -vE "^(#.*|\s*)$" .env)"

cp -R ./src/*.ts ${PATH_TO_FIG_REPO}/src
