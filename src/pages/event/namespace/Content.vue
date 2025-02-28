<template>
    <div class="m-content">
        <div class="m-user-info">
            <div class="m-name">
                <template v-if="isLogin">
                    <img :src="userInfo.avatar" class="u-img" />
                    <span class="u-name">{{ userInfo.name }}</span>
                </template>
            </div>
            <div class="m-button">
                <el-button class="u-btn u-register" @click="add">注册铭牌</el-button>
                <el-button class="u-btn u-mine" @click="changeList" v-if="isDefaultHost && isLogin">
                    {{ isMyList ? "全部铭牌" : "我的铭牌" }}
                </el-button>
            </div>
        </div>
        <div class="m-namespace">
            <!-- 搜索 -->
            <div class="m-tool">
                <span class="u-title">{{ title }}</span>
                <div class="m-search">
                    <div class="m-tabs">
                        <span
                            :class="[{ active: type == item.value }, 'u-tab']"
                            v-for="(item, i) in tabs"
                            :key="i"
                            @click="change(item.value)"
                            >{{ item.label }}</span
                        >
                    </div>
                    <div class="u-search" slot="search-before" key="namespace-search">
                        <el-input
                            placeholder="请输入搜索内容"
                            v-model.trim.lazy="search"
                            clearable
                            @clear="onSearch"
                            @keydown.native.enter="onSearch"
                            class="u-input"
                        >
                            <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
                        </el-input>
                    </div>
                </div>
            </div>
            <!-- 列表 -->
            <div class="m-list" v-loading="loading" :class="{ isMyList }">
                <template v-if="list.length">
                    <div class="m-item" v-for="(item, i) in list" :key="i">
                        <a target="_blank" :href="buildLink(item)" class="m-title">
                            <div class="u-title">
                                <i class="el-icon-postcard"></i><span>{{ item.key }}</span>
                            </div>
                            <el-tag class="u-tag" v-if="item.status == 2" type="danger">被驳回</el-tag>
                            <el-tag class="u-tag" :type="item.status ? 'success' : 'info'" v-else-if="isMyList">
                                {{ item.status ? "生效中" : "审核中" }}
                            </el-tag>
                            <span class="u-tag u-jx3" v-else>剑网3.com/{{ item.key }}</span>
                        </a>
                        <span class="u-desc">{{ item.desc }}</span>
                        <div class="m-info">
                            <div class="m-text">
                                <span class="u-name" v-if="item.user">
                                    <i class="el-icon-user"></i>{{ item.user.display_name }}
                                </span>
                                <span><i class="el-icon-date"></i>{{ dataFormat(item.created) }}</span>
                            </div>
                            <el-button class="u-edit" size="mini" @click.stop="edit(item, i)">
                                <i class="el-icon-edit"></i> 编辑
                            </el-button>
                        </div>
                    </div>
                </template>
                <span v-else class="m-item m-no-item"> 暂无对应铭牌 </span>
            </div>
            <!-- 分页 -->
            <div class="m-namespace-pages">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :hide-on-single-page="true"
                    :page-size="per"
                    :total="total"
                    :current-page.sync="page"
                ></el-pagination>
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog title="铭牌注册" :visible.sync="visible" width="600" :before-close="close">
            <Form :data="data" @close="close" @update="update" />
        </el-dialog>
    </div>
</template>

<script>
import { getNamespaceList, getNamespace } from "@/service/event/namespace.js";
import { publishLink } from "@jx3box/jx3box-common/js/utils.js";
import { showDate } from "@jx3box/jx3box-common/js/moment";
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";
import { cloneDeep } from "lodash";
import User from "@jx3box/jx3box-common/js/user";
import Form from "./Form";

export default {
    name: "Content",
    data: function () {
        return {
            type: "all",
            tabs: [
                { label: "全部", value: "all" },
                { label: "玩家", value: "player" },
                { label: "团队", value: "team" },
                { label: "系统", value: "system" },
                { label: "自定义", value: "custom" },
            ],

            list: "",
            per: 8,
            total: 1,
            page: 1,

            search: "",
            query: "",
            loading: false,

            isLogin: User.isLogin(),
            userInfo: User.getInfo(),
            isMyList: false,

            visible: false,
            form: {
                key: "",
                desc: "",
                link: "",
            },
            data: {},

            isDefaultHost: !location.origin.includes("jx3box.com"),
        };
    },
    components: {
        Form,
    },
    computed: {
        register_link: function () {
            return publishLink("namespace");
        },
        params: function () {
            let _params = {
                source_type: this.type == "all" ? "" : this.type,
                page: this.page,
                per: this.per,
            };
            return _params;
        },
        title() {
            return this.isMyList ? "我的铭牌" : "铭牌大厅";
        },
    },
    watch: {
        type: function () {
            this.page = 1;
        },
        params: {
            deep: true,
            immediate: true,
            handler: function (newVal) {
                this.query = "";
                this.isMyList ? this.loadMyData() : this.loadData();
            },
        },
        "$route.query": {
            deep: true,
            immediate: true,
            handler: function (newVal) {
                if (newVal.namespace) {
                    this.search = newVal.namespace;
                    setTimeout(() => {
                        this.onSearch();
                    }, 1000);
                }
            },
        },
    },
    methods: {
        change(key) {
            this.type = key;
        },
        loadData() {
            this.loading = true;
            const params = this.removeEmpty(
                Object.assign({}, this.params, {
                    key: this.search,
                })
            );
            getNamespaceList(params)
                .then((res) => {
                    this.list =
                        res.data.data.list.map((item) => {
                            item._link = cloneDeep(item.link);
                            return item;
                        }) || [];
                    this.total = res.data.data.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        loadMyData() {
            this.loading = true;
            const { source_type, page, per } = this.params;
            const params = this.removeEmpty({
                _search: this.search,
                source_type,
                page,
                per: per,
            });
            getNamespace(params)
                .then((res) => {
                    const list = res.data.data.list || [];
                    this.list = list.map((item) => {
                        item._link = cloneDeep(item.link);
                        item.user.display_name = item.user.nickname;
                        return item;
                    });
                    this.total = res.data.data.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        removeEmpty(obj) {
            Object.keys(obj).forEach((key) => {
                if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
                    delete obj[key];
                }
            });
            return obj;
        },
        onSearch() {
            if (this.page != 1) return (this.page = 1);
            this.loadData();
        },
        dataFormat(val) {
            return (val && showDate(~~val * 1000)) || "-";
        },
        changeList() {
            if (!this.isLogin) return;
            this.isMyList = !this.isMyList;
            this.isMyList ? this.loadMyData() : this.loadData();
        },
        close(key) {
            this.visible = false;
            if (key == "success") this.loadMyData();
        },
        add() {
            if (!this.isDefaultHost) {
                location.href = `${__Root}event/namespace`;
                return;
            }

            if (!this.isLogin) return User.toLogin();

            this.visible = true;
            this.data = {
                mode: "add",
                form: cloneDeep(this.form),
            };
        },
        edit(item, i) {
            this.visible = true;
            this.data = {
                mode: "edit",
                form: cloneDeep(item),
                index: i,
            };
        },
        update(form) {
            if (form.ID) {
                this.list[form.__index] = form;
            } else {
                if (this.isMyList) this.loadMyData();
            }
        },
        buildLink(item) {
            if (item.source_type == "team") {
                return __Root + "team/org/" + item.source_id;
            } else {
                return item._link || __Root + "?namespace=" + item.key;
            }
        },
    },
    created() {
        this.query = this.$route.query.namespace;
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/namespace/index.less";
</style>
