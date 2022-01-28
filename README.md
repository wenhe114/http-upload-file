# 上传插件
>基于xmlhttprequest封装的请求

## 安装依赖
```

npm i http-upload-file

```
## 导入
```
import httpUpload from "http-upload-file"
```

## 实例化
```js
var httpupload=new httpUpload(options)
// 开始上传
httpupload.request()

// 终止上传
httpupload.abort()
```

## options配置介绍
|属性|介绍|默认
|-|-|-|
|url|必填请求url||
|body|必填请求携带参数|{}|
|headers|可选，请求头|{}|
|success|成功回掉方法|返回成功返回的数据|
|progress|可选，进度条实时进度，单位%||
|error|可选，出错返回的回掉|报错信息|