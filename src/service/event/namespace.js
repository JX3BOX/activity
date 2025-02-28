import { $cms } from "@jx3box/jx3box-common/js/https";

// 获取公开铭牌
function getNamespaceList(params) {
    return $cms().get("/api/cms/namespace", {
        params,
    });
}
// 获取我的铭牌
function getNamespace(params) {
    return $cms().get("/api/cms/namespace/mine", {
        params,
    });
}

function updateNamespace(id, data) {
    return $cms().put(`/api/cms/namespace/${id}`, data)
}

function createNamespace(data) {
    return $cms().post('/api/cms/namespace', data)
}

function getNamespaceByKey(key) {
    return $cms().get(`/api/cms/namespace/key`, {
        params: {
            key,
        },
    })
}

export { getNamespaceList, getNamespace, updateNamespace, createNamespace, getNamespaceByKey };
