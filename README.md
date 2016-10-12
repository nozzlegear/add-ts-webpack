#add-ts-webpack

This is a small command line tool for adding a webpack configuration file and dependencies to a JS project. It should eventually be turned into a Yeoman generator, but for now you can use it like so:

```bash
add-ts-webpack -f ./package.json
```

That command will add all of the necessary dev dependencies to your package.json file, and copy a webpack.sample.config.js file to your project folder. 

Remember to rename the webpack.sample.config.js file to webpack.config.js and then run `npm install` or `yarn install`.