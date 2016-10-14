# ticketing

> Customer Support Ticketing SPA System with Vue.js and Webpack.

## Backend
The backend data for this project comes from [https://github.com/gazeldx/rails5-api-rspec-example](https://github.com/gazeldx/rails5-api-rspec-example)
So if you want to run this project properly, please run the backend program `rails5-api-rspec-example` first.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
cd /path/to/ticketing
npm install -g karma-cli

Download and install PhantomJS by following http://phantomjs.org/download.html
Add `export PHANTOMJS_BIN=/Applications/phantomjs-2.1.1/bin/phantomjs` to ~/.bash_profile

npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

# TODO
* Use https://github.com/pugjs/pug for every *.vue files.

* Add tests.

* Replace http://localhost:3000 to computed function.

* 'customer-id', 'agent-id' should be shown as 'customer-name' and 'agent-name'.

* All date should be formatted.

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


