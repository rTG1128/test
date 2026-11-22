# 触碰风味 H5 展示页

这是与 NFC 写入 App 配套的静态网页。网页不依赖后端或云服务器，包含小游戏、视频、图片、文字和四款风味收藏记录。

## 页面入口

部署后，把下面的示例域名替换为实际 HTTPS 域名：

```text
https://example.com/nfc/
https://example.com/nfc/?type=random&series=coffee
https://example.com/nfc/?type=game&series=coffee&flavor=ethiopia&lot=ETH-01
https://example.com/nfc/?type=game&series=coffee&flavor=colombia&lot=COL-02
https://example.com/nfc/?type=game&series=coffee&flavor=brazil&lot=BRA-03
https://example.com/nfc/?type=game&series=coffee&flavor=yunnan&lot=YUN-04
https://example.com/nfc/?type=collection&series=coffee
```

网站根地址就是 NFC 的统一网址。直接打开根地址，网页会自动从埃塞俄比亚、哥伦比亚、巴西、云南中随机选择一款，并避免连续两次抽到同一款；选中后地址会固定为该口味，刷新或分享时不会再次随机。`?type=random&series=coffee` 是可选的显式随机入口。

也可以使用同一套页面展示其他类型：

```text
?type=video
?type=image
?type=text&text=这里可以放置最长约 1200 字的展示文本
?type=image&src=https://example.com/path/to/image.jpg
?type=video&src=https://example.com/path/to/video.mp4
```

`src` 只接受 HTTP 或 HTTPS 地址。直接上传图片或视频后，把公开地址填入 URL 参数即可。

## 本地预览

在工程根目录运行：

```powershell
py -m http.server 8080 --directory "nfc网页"
```

然后访问：

```text
http://localhost:8080/?type=game
http://localhost:8080/qr.html
```

本地 HTTP 地址只用于网页测试。写入正式 NFC 标签时必须使用公网 HTTPS 地址。

## 部署

可以使用腾讯云 CloudBase、阿里云 OSS、腾讯云 COS、Vercel、Netlify 或 Cloudflare Pages 等静态托管服务。上传整个 `nfc网页` 目录，保持以下相对路径不变：

```text
index.html
styles.css
app.js
qr.html
assets/poster.svg
assets/flavor-film.mp4
vendor/qrcode.min.js
```

部署完成后先确认：

1. 手机使用移动数据也能打开页面；
2. HTTPS 地址没有登录或访问权限限制；
3. 小游戏、图片和视频均可正常加载；
4. 页面地址可以直接写入 NFC 标签。

## 二维码备用入口

访问：

```text
https://example.com/nfc/qr.html?url=需要编码的目标网址
```

二维码页面支持修改地址、预览和打印。App 填写目标 URL 后，点击“生成二维码备用页”也会打开此页面。

建议二维码成品边长不小于 2.5 cm，四周留白不少于 4 个二维码模块。打印后分别使用安卓和 iPhone 的相机或浏览器扫描。

## 浏览器自动验收

访问 `smoke-test.html` 可以自动完成一轮三轮小游戏、风味收藏、视频/图片/文字视图切换和二维码生成测试。页面显示 `RESULT PASS` 才表示当前浏览器环境通过。

## 内容替换

- 替换视频：覆盖 `assets/flavor-film.mp4`；
- 替换海报：覆盖 `assets/poster.svg`，或传入图片 URL；
- 修改风味文案和题目：编辑 `app.js` 中的 `profiles`；
- 修改视觉样式：编辑 `styles.css`；
- 修改文字展示：编辑 `index.html`，或使用 `text` URL 参数。

## 第三方资源

- 二维码生成：qrcodejs 1.0.0，MIT License；
- 示例视频：MDN Web Docs CC0 示例视频，仅作为演示素材，正式展示时应替换为自有产品内容。
