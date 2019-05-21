### 开始：配置多git账号在同一台电脑使用
为什么会有多个账号配置需求？

主要是由于现在代码管理平台越来越多，且个人选择和公司选择仓库管理平台有差异，因此可以配置一下多账号在同一台电脑上使用。

##### 前提：

##### 第一步：生成key
- 为账号 生成key
    ```
    // 命令
    ssh-keygen -t rsa -C '账号邮箱'
    // demo
    ssh-keygen -t rsa -C '12345678@qq.com'
    //  enter 键确认
    ```

- 提示需要输入相关信息
    ```
    // 这里是带路径的，路径建议不更改~ 只需要修改名字
    Enter file in which to save the key (/Users/your-mac-home-name/.ssh/id_rsa):
    // enter：/Users/your-mac-home-name/.ssh/xxx_rsa 
    // 输入密码，创建该key的密码
    Enter passphrase (empty for no passphrase):
    // 确认密码
    Enter same passphrase again:
    ```

##### 第二步：识别新的私钥
- 使用ssh的ssh-add命令将密钥添加到 ssh-agent 的高速缓存中，这样在当前会话中就不需要再次输入密码了 。

```

// 识别
ssh-add ~/.ssh/gitlab_rsa
// 需要输入 当时 生成key的时候 的密码
// 添加成功提示
Identity added: /Users/your-mac-home-name/.ssh/gitlab_rsa (/Users/your-mac-home-name/.ssh/gitlab_rsa)

```


##### 第三步：配置config

##### 第四部：测试验收

##### 参考
https://blog.csdn.net/onTheRoadToMine/article/details/79029331
http://www.cnblogs.com/popfisher/p/5731232.html
https://www.jianshu.com/p/89cb26e5c3e8
