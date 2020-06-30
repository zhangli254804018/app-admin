
```bash
# clone the project
git clone https://github.com/PanJiaChen/vue-admin-template.git

# enter the project directory
cd vue-admin-template

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

# 管理后台

- 1. 页面路由完成
- 2. 调整axios. 可以直接在页面使用 this.$ax.post(url, data) / this.$ax.get(url, params)
- 3. 增加 DataRow & DataTable & FormRender 组件(开发中)
[接口文档](https://docs.google.com/spreadsheets/d/1EgJ3Py2lcnYO12S24WYxBLm-qNJsojp3OKotDvc1kPw/edit#gid=1775478639)


# 构建步骤
# 
```
//下载依赖包
npm install 

//构建
npm run build
  
```