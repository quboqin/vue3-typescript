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