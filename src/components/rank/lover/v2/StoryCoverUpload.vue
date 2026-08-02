<template>
    <div class="c-story-cover-upload">
        <div v-if="modelValue" class="u-current">
            <el-image :src="modelValue" fit="cover" />
            <el-button text type="danger" @click="$emit('update:modelValue', null)">清除已有封面</el-button>
        </div>
        <el-upload
            ref="upload"
            action="https://cms.jx3box.com/api/cms/upload"
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            accept="image/jpeg,image/png,image/webp"
            :headers="uploadHeaders"
            :file-list="fileList"
            with-credentials
            :on-change="onChange"
            :on-remove="onRemove"
            :on-success="onSuccess"
            :on-error="onError"
        >
            <el-icon><Plus /></el-icon>
        </el-upload>
        <p>可选。支持一张合照作为封面；未上传时会尝试使用正文第一张图片。</p>
    </div>
</template>

<script>
import { getTokenFromUrl } from "@jx3box/jx3box-common/js/utils";

export default {
    name: "LoverV2StoryCoverUpload",
    emits: ["update:modelValue", "finish", "error"],
    props: {
        modelValue: { type: String, default: "" },
    },
    data: function () {
        return { fileList: [] };
    },
    computed: {
        hasPending() {
            return this.fileList.length > 0;
        },
        uploadHeaders() {
            const token = getTokenFromUrl() || localStorage.getItem("__token") || localStorage.getItem("token") || "";
            return token ? { Authorization: `Basic ${btoa(`${token}:cms common request`)}` } : {};
        },
    },
    methods: {
        upload() {
            this.$refs.upload?.submit();
        },
        onChange(_file, files) {
            this.fileList = files;
        },
        onRemove(_file, files) {
            this.fileList = files;
        },
        onSuccess(response) {
            const url = response?.data?.[0];
            this.fileList = [];
            if (!url) return this.onError();
            this.$emit("update:modelValue", url);
            this.$emit("finish", url);
        },
        onError() {
            this.fileList = [];
            this.$message.error("匿名江湖笺封面上传失败");
            this.$emit("error");
        },
    },
};
</script>

<style scoped lang="less">
.c-story-cover-upload {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 14px;

    .u-current {
        display: flex;
        flex-direction: column;
        align-items: center;

        .el-image {
            width: 120px;
            height: 180px;
            border: 1px solid #e4d1c4;
            border-radius: 8px;
        }
    }

    p {
        flex-basis: 100%;
        margin: 0;
        color: #a18a83;
        font-size: 12px;
    }

    :deep(.el-upload-list--picture-card .el-upload-list__item),
    :deep(.el-upload--picture-card) {
        width: 120px;
        height: 180px;
    }
}
</style>
