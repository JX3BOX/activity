import { $cms } from "@jx3box/jx3box-common/js/https";
function getTopic(topic) {
    return $cms().get("/api/cms/topic", {
        params: {
            type: topic,
            status: 1,
            _no_cache: process.env.NODE_ENV == "development" ? 1 : 0,
        },
    });
}

async function getBreadcrumb(key) {
    const res = await $cms()
        .get(`/api/cms/breadcrumb/${key}`);
    return res.data.data.html || "";
}

function getUsers(params) {
    return $cms().get("/api/cms/user/list/info", {
        params
    });
}

function getTopicDetail(id) {
    return $cms().get(`/api/cms/topic/${id}`);
}


export { getTopic, getUsers, getBreadcrumb, getTopicDetail };
