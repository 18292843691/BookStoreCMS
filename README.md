# 运行环境
> 此系统由 [nodejs](https://nodejs.org/zh-cn/) 编写，因此需要 [nodejs](https://nodejs.org/zh-cn/) 运行环境，
点击前往 [node 官网](https://nodejs.org/zh-cn/)下载安装

# 技术栈

> node + express + mongodb + mongoose + grunt +
 Bootstrap + pug + jQuery + bower + npm ( cnpm )
## 树形图
 ├─app                       
│  ├─controllers    # 控制层            
│  ├─schemas    # 数据库模型       
│  └─views    # 视图文件          
│      ├─includes           
│      └─pages              
├─dist    # 静态文件打包 ( 待 )    
├─public    # 静态文件  
│  ├─img                    
│  │  ├─bg                  
│  │  ├─books               
│  │  └─icon                
│  ├─js    # JS 代码
│  │  ├─includes            
│  │  └─pages               
│  ├─libs    # 依赖库
│  │  ├─bootstrap           
│  │  └─jquery              
│  ├─stylesheets    # CSS 代码
│  └─upload    # 文件上传 ( 待 )
└─router    # 路由控制

# 运行前

## 安装依赖

```
npm install

```
## 下载 [bower](https://bower.io/) 及安装依赖

*浏览器使用推荐( chrome )， 运行时请确保有网*

1. ``` npm install bower ```
2. ``` bower install ```

# 运行

``` node app.js ```

# 完成功能

- 用户及用户权限管理
- 图书的增删改查
- 用户购物车管理
- 用户订单管理
- 利用 cookies 实现记住密码
- ajax 用户名验证

# 待完成

- 用户个人信息管理
- 购买时填写个人地址
- 用户评论
- ajax 图片上传
- 图片拖动上传
- 第三方登陆及邮件通知
- 订单生成及发货时邮件通知
- 界面优化及广告位添加
- 购物车添加动画