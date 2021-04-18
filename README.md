# vue3-typescript

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 用命令行 vue-cli 创建 vue3 的应用框架
1. 安装或更新 vue-cli
``` shell
npm install -g @vue/cli
```
或
``` shell
npm update -g @vue/cli
```

2. 创建应用
  - ![vue-create-app](./doc/vue-create-app.png)
  - ![vue-select-options](./doc/vue-select-options.png)
## Lint
1. 添加 .prettierrc.js 文件
```javascript
module.exports = {
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
}
```
2. 修改 workspace 的配置, ** 一定要重新打开 vscode **
```json
{ 
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
}
```

3. 运行 npm run lint

## 编译打包确认环境变量
1. Mode 的概念
Mode is an important concept in Vue CLI projects. By default, there are three modes:

- development is used by vue-cli-service serve
- test is used by vue-cli-service test:unit
- production is used by vue-cli-service build and vue-cli-service test:e2e

You can overwrite the default mode used for a command by passing the --mode option flag. For example, if you want to use development variables in the build command:
``` json
  "scripts": {
    "dev": "vue-cli-service serve",
    "test": "vue-cli-service serve --https --mode mytest",
    "staging": "vue-cli-service build --mode staging",
```
2. mode 决定了打包用哪个环境变量文件 
```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```

In addition to VUE_APP_* variables, there are also two special variables that will always be available in your app code:

- NODE_ENV - this will be one of "development", "production" or "test" depending on the mode the app is running in.
- BASE_URL - this corresponds to the publicPath option in vue.config.js and is the base path your app is deployed at.
- 环境变量文件中可以再申明 NODE_ENV, 例如在 .env.staging 中设置 ** NODE_ENV=production **, 确认打包时可以优化 staging 下的代码