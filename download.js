// ==UserScript==
// @name         Xiaoya Download
// @namespace    http://tampermonkey.net/
// @version      2024-10-30
// @description  下载小雅中的word、pdf和ppt文件
// @author       Rkgn
// @match        https://whut.ai-augmented.com/app/jx-web/mycourse/*
// @connect      vip.ow365.cn
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ai-augmented.com
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// ==/UserScript==

(function () {
    'use strict';
    var button = document.createElement("button");
    button.textContent = "下载资源";
    button.style.position = "fixed";
    button.style.top = "10px";
    button.style.left = "10px";
    button.onclick = function () {
        let pptFrame = document.getElementById("file_preview")
        let src = pptFrame.src;
        src = src.replace("&ssl=1", "")
        GM_xmlhttpRequest({
            method: "GET",
            url: src,
            onload: function (response) {
                let resp = response.responseText
                let temp = document.createElement("span")
                temp.innerHTML = resp
                let url = temp.querySelector("div").textContent
                temp.remove()
                let filename
                let h5 = document.querySelector("#xy_app_content > div.ta-frame > div.ta_panel.ta_panel_group.ta_group > section > section > main > div > div.group-resource-body > div > div.disk_previewer_with_banner > div.common_node_content_banner.flex_panel.hor > h5")
                if (h5.title) {
                    filename = h5.title
                } else {
                    filename = h5.textContent
                }
                const download = GM_download({
                    url: url,
                    name: filename,
                    saveAs: true,
                    onerror: function (err) {
                        console.error("下载失败", err)
                    }
                });
            },
            onerror: function (err) {
                console.error("请求失败", err);
            }
        });
    };
    document.body.appendChild(button);
})();