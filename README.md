# Webpack React App
This is my own setup for React Apps.
Contains the initial state similar to that of npx create-react-app but with my configurations.

If you want to use this setup for your applications you can use the following function to your .bashrc/.zshrc or other files:

```shell
function react-app() {
  git clone git@github.com:thomasjodt/webpack-react-app.git
  mv webpack-react-app $1
  cd $1
  rm -rf .git
  npm install
  echo "Type $(tput setaf 6)npm start $(tput sgr 0)to launch your app."
  echo "Type $(tput setaf 6)npm run build $(tput sgr 0)to build your app."
}
```

and enjoy it. :)
