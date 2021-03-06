# 组件开发工具

## 1. 介绍

### 1.1. 目的

为了方便业务组件的开发于接入，需要一个承载组件开发的工程。以及对应的开发工具。

### 1.2. 工程包含的模块

1. 业务组件
   1. 组件编译模块
2. 业务组件开发工具

---

## 2. 环境准备

注意: **需要同时启动 watcher 和 dev-tool 两个服务!**

### 2.1. 启动组件编译的 watcher 功能

```shell
yarn start
```

通过 `http://localhost:22111` 可以获取组件资源

#### 2.1.1. watcher 的工作原理

1. 入口：`webpack watching` `./src` 目录
2. webpack 递归编译 ./src 目录下的组件
3. 输出：`./.bundles`
4. 启动静态资源服务，提供 http 获取资源的服务

### 2.2. 启动开发工具 dev-tool

```shell
yarn start:dev-tool
```

通过 `http://localhost:33222` 可以对组件进行开发，组件的改动无需刷新页面，只需要切换组件即可

#### 2.2.1. 工作原理

开发工具在目录 `./dev-tool` 下，依赖由组件编译模块编译的组件集合文件 `__dev_tool__.json`

`dev-tool` 通过 `http://localhost:22111/__dev_tool__.json` 获取并解析，生成组件列表。

#### 2.2.2. 技术选型

`dev-tool` 采用以下基础库：

1. tailwindcss 作为基础样式库，所以对 rem 会有一定影响
2. ...

---

## 3. 组件开发

### 3.1. 通过自动化脚本创建组件

达芬奇组件开发工具提供了自动化组件脚本，轻松创建组件：

```shell
sh ./scripts/create-widget.sh {widgetName}
```

注意： **`{widgetName}` 替换成对应的组件名**，并且不允许重名

例如

```shell
sh ./scripts/create-widget.sh DvButton
```

脚本将自动在 `./src` 目录下创建 {widgetName} 的组件

### 3.2. 深入了解

#### 3.2.1. 组件模板

模板目录 `./tmpl`

#### 3.2.2. 组件工作区

在目录 `./src` 之下，根据业务需求创建如下组件的目录结构：

```pre
├── {widgetName}
│   ├── comp
│   │   ├── index.less
│   │   ├── index.tsx
│   │   └── meta.json
│   └── form
│       ├── index.tsx
│       └── meta.json
```

必要的文件结构说明：

| 目录/文件       | 说明                           |
| --------------- | ------------------------------ |
| comp/           | 存放组件实现目录的目录         |
| comp/index.less | 组件的样式文件                 |
| comp/index.tsx  | 组件的实现的入口文件           |
| comp/meta.json  | 组件元数据                     |
| form/           | 存放组件属性编辑表单的目录     |
| form/index.tsx  | 组件属性编辑表单的实现入口文件 |
| form/meta.json  | 描述组件属性编辑表单的元数据   |

### 3.3. 元数据描述

作用：业务组件接入 B 端编辑器时需要的元数据信息。

示例：

| prop key       | 类型                                | 说明                                                                                                                                                                                    |
| -------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| version        | string                              | 业务组件版本                                                                                                                                                                            |
| elementRef     | string                              | 对页面 DSL 的 elementRef，B 端编辑器在编辑时会使用该 prop key                                                                                                                           |
| logo           | string                              | 组件在 B 端编辑器组件面板显示的 logo                                                                                                                                                    |
| label          | string                              | 组件在 B 端编辑器组件面板显示的 label                                                                                                                                                   |
| eventAttr      | ({ alias: string, type: string })[] |                                                                                                                                                                                         |
| propFormConfig |                                     | 编辑表单描述<br/>useSystemForm 是否使用系统默认的配器表单<br/>useCustomForm 是否使用自定义表单<br/>customFormRef 自定义表单的引用，指向业务<br/>件属性编辑表单的 meta.json 中的 formRef |
| classification | string                              | 在 b 端编辑器左侧分类的类型                                                                                                                                                             |

### 3.4. 依赖范围

组件的依赖范围不可超过自身工程，否则编译不会通过。例如：

```tsx
// comp/index.tsx
import * from '../../xx' //这是不生效的
```

原因：**由于组件编译环境并不包含组件目录以外的文件，所以编译不会通过。**

### 3.5. 业务组件可以使用的库

由于达芬奇的架构采用『运行时依赖』，暂时不支持 package.json 中的 dependencies。以下会列举出达芬奇支持的库：

1. react
2. react-dom
3. antd
4. axios
5. taro/components

如果有新的库的需求，请联系 [`建业` | `炳瑞` | `相杰`] 协助。

---

## 4. 发布组件

### 4.1. 通过自动化脚本发布

```shell
sh ./scripts/upload-widget-2-oss.sh -c AdmissionsFormForZhiwei -i 15 -e dev
```

sh 参数说明：

- -c --comp: 组件名，对应 `./packages/widgets/{comp}`
- -i --id: 组件 id
  - 如果没填，则认为是新增组件，通过 POST 上传
  - 如果填了，则认为是更新组件，通过 PUT 上传
- -e --env: 环境
  - dev 默认
  - prod
  - local

### 4.2. API

详情查看 [yapi](http://mock.guorou.local/project/206/interface/api/19017)

---

## 5. 发布 action

### 5.1. 通过自动化脚本发布

```shell
sh ./scripts/release-action.sh -a toast -e dev
```

sh 参数说明：

- -a --action: action 名，对应 `./packages/actions/{action}`
- -i --id: 组件 id
  - 如果没填，则认为是新增组件，通过 POST 上传
  - 如果填了，则认为是更新组件，通过 PUT 上传
- -e --env: 环境
  - dev 默认
  - prod
  - local

## 6. 时序图

![](./docs/asserts/组件开发工具.jpg)

---

## 7. 未来 TODO

1. 工具集成组件管理功能（平台化二期），实现自动 zip、上传、版本管理
   1. 组件版本管理
   2. 组件发布
   3. 组件更新
   4. 新建组件工程
   5. 集成 monaco 编辑器，在线开发组件
2. 开发工具云化：将组件的开发环境集成在达芬奇上（平台化三期）
