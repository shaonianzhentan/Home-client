

简单介绍（代码全部合并到服务端了，客户端停止更新）
===
本程序依赖[Electron](https://github.com/electron/electron)、[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)


这个是我准备做的家庭中心整套程序的客户端，需要配合服务端使用

暂时的功能就是，可以用手机操作音乐播放，也可以用电视遥控器控制音乐播放

随时随地享受到无处不在的音乐

下载到本地 git clone https://github.com/shaonianzhentan/Home-client

# 安装 `electron` 全局命令到你的 $PATH
[electron](https://github.com/electron/electron)推荐使用[cnpm](https://github.com/cnpm/cnpm)安装，不然会很慢很慢

    npm install electron -g

    安装成功后执行命令： electron 项目所在的文件夹名称

    例 ：electron Home-client

![Image text](https://github.com/shaonianzhentan/Home-client/blob/master/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE(1).png)

![Image text](https://github.com/shaonianzhentan/Home-client/blob/master/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE(2).png)

![Image text](https://github.com/shaonianzhentan/Home-client/blob/master/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE(3).png)

# 替换本地文件到最新版
git reset --hard

git pull
