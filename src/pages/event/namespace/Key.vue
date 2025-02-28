<template>
    <div>[<a href="https://剑网3.com">剑网3.com</a>]正在为您导航……</div>
</template>

<script>
const jx3box = "https://www.jx3box.com";
const homepage = "https://剑网3.com";
const api = "https://cms.jx3box.com/api/cms/namespace-key";
const pathname =
    (location.pathname.startsWith("/namespace") && location.pathname?.replace(/\/namespace/g, "")) || location.pathname;
const key = decodeURIComponent(pathname.slice(1));
let link = "";

// 统计
fetch(`https://next2.jx3box.com/api/summary-any/namespace-${key}`);

// 获取namespace信息
fetch(`${api}?key=${key}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        if (data && data.code == 0) {

            // 构建链接
            const namespace = data.data;
            if (namespace.source_type == "team") {
                link = jx3box + "/team/org/" + namespace.source_id;
            } else {
                link = namespace.link || homepage;
            }
        } else {
            link = homepage + "?namespace=" + key;
        }
    })
    .catch((err) => {
        console.log(err);
        // 网络请求异常时跳转到homepage
        link = homepage + "?namespace=" + key;
    }).finally(() => {

        // 跳转
        location.href = link;
    })

export default {
    name: "Key",
};
</script>
