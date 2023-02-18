## Educational institution management system client side application

  
## Setup

  

Install the dependencies...

  

```bash

npm install

```

  

Run dev server

  

```bash

npm run dev

```

  

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

  

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

  

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

  

## Building and running in production mode

  

To create an optimised version of the app:

  

```bash

npm run build

```
If you want to use `baseUrl` or `path` aliases within your `tsconfig`, you need to set up `@rollup/plugin-alias` to tell Rollup to resolve the aliases. For more info, see [this StackOverflow question](https://stackoverflow.com/questions/63427935/setup-tsconfig-path-in-svelte).


## Deploying to the web

Github actions have been set up on the `master` branch to deliver the app to an AWS cloudfront distribution available at https://app.eduadministrator.com
