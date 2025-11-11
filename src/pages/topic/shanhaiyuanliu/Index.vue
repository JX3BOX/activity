<template>
    <div class="m-index" @touchstart="handleTouchstart" @touchend="handleTouchend">
        <transition name="fade">
            <div v-show="active===1" class="m-first">
                <video :src="imgurl+'KV/WXL_KW_MP4.mp4'" autoplay loop muted playsinline />
                <img :src="imgurl+'KV/kv.png'" class="u-img" />
            </div>
        </transition>
        <!--TODO        区域二内容-->
        <transition name="fade">
            <div v-show="active===2" class="m-two">
                <div class="u-content">
                    <div
                        v-for="(item,index) in twoImg"
                        v-show="showOptions"
                        :key="index"
                        class="u-item"
                        @click="showDetail(item)"
                        @mouseenter="handleMouseEnter(item)"
                        @mouseleave="handleMouseLeave(item)"
                    >
                        <img :src="imgurl+'1/'+item.current" class="u-four-img" />
                    </div>

                    <transition name="fade">
                        <!-- 详情图片展示区域 -->
                        <div v-if="!showOptions && currentDetail && currentDetail.value<4" class="u-detail">
                            <div :style="{backgroundImage: `url(${imgurl}1/${currentDetail.det})`}"
                                 class="u-detail-box">
                                <img v-show="currentDetail.value===2" :src="imgurl+'1/check.png'" class="u-check-img"
                                     @click="open(currentDetail.link)" />
                            </div>

                            <img :src="imgurl+'1/close.png'" class="u-close" @click="backToOptions" />
                        </div>
                    </transition>
                    <!--                驻地单独实现-->
                    <transition name="fade">
                        <div v-if="!showOptions && currentDetail && currentDetail.value===4" class="u-detail">
                            <div :style="{backgroundImage: `url(${imgurl}1/yongningwan/${currentDetail.active}.jpg)`}"
                                 class="u-detail-box">
                                <img :src="imgurl+'1/'+currentDetail.det" class="u-shade-img" />
                                <!--                        9个循环图-->
                                <div class="u-for-img">
                                    <div v-for="(item,index) in currentDetail.options" :key="index"
                                         class="u-for-img-box" :class="{active:currentDetail.active===item}" @click="handleThumbEnter(item, index)">
                                        <img :src="imgurl+'1/yongningwan/slider/'+item+'.jpg'" class="u-for-img-item" />
                                    </div>
                                </div>
                            </div>

                            <img :src="imgurl+'1/close.png'" class="u-close" @click="backToOptions" />
                        </div>
                    </transition>
                </div>
            </div>
        </transition>
        <!--        区域三内容-->
        <transition name="fade">
            <div v-show="active===3" class="m-three">
                <img :src="imgurl+'2/icon.png'" class="u-icon-img" />
                <img :src="imgurl+'2/bg_2.jpg'" class="u-bg-img" />
                <!--            右侧区域-->
                <div id="three-box" :style="{backgroundImage: `url(${imgurl}2/bg_2_2.jpg)`}" class="u-right"
                     @scroll="uRightScroll">
                    <div class="u-content">
                        <img :src="imgurl+'2/1.png'" />
                        <img :src="imgurl+'2/2.png'" />
                    </div>

                    <!--                首次提醒-->
                    <transition name="fade">
                        <img v-show="showTips" :src="imgurl+'2/jianbian2.png'" class="u-first-tip" />
                    </transition>
                </div>
            </div>
        </transition>
        <!--        区域四内容-->
        <transition name="fade">
            <div v-show="active===4" class="m-four" :style="{backgroundImage: `url(${imgurl}3/${fourActive}.jpg)`}">
                <div class="u-content">
                    <!--                    底部区域图标及切换区域-->
                    <!--                        百强图片链接-->
                    <img :src="`${imgurl}3/jdt.jpg`" class="u-jdt-img" @click="jdtClick"  v-if="fourActive!==6"/>
                    <div class="u-bottom">
                        <img :src="`${imgurl}3/icon_2.png`" class="u-img" v-if="fourActive!==6"/>
                        <div class="u-bottom-page">
                            <img v-for="item in 6" :key="item" :src="`${imgurl}3/tab/${item}.png`"
                                 :style="{ opacity: getTabOpacity(item) }"
                                 class="u-page-img"
                                 :class="{other:item===6}"
                                 @click="handleTabClick(item)"
                                 @mouseenter="handleTabMouseEnter(item)"
                                 @mouseleave="handleTabMouseLeave(item)" />
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!--        区域五内容-->
        <transition name="fade">
            <div v-show="active===5" class="m-five">

                <!--                容器分左右，中间竖向线条间隔-->
                <div class="u-content">
                    <div class="u-left">
                        <img :src="imgurl+'4/tab/1.png'" :style="{ opacity: getTabOpacity5(1) }" class="u-img"
                             @click="selectTab(1)"
                             @mouseenter="hoverTab5 = 1"
                             @mouseleave="hoverTab5 = null"/>
                        <img :src="imgurl+'4/tab/2.png'" :style="{ opacity: getTabOpacity5(2) }" class="u-img"
                             @click="selectTab(2)"
                             @mouseenter="hoverTab5 = 2"
                             @mouseleave="hoverTab5 = null"/>
                    </div>
                    <div class="u-line"></div>
                    <div class="u-right">
                        <div ref="pageContainer"  class="u-right-box">
                            <img  :key="`${selectedTab}_${currentPage}`" :src="`${imgurl}4/${selectedTab}_${currentPage}.png`" class="u-right-img"/>
                        </div>
                        <div class="pagination">
                            <div
                                v-for="page in totalPages[selectedTab-1]"
                                :key="page"
                                :class="['page-item', { 'active': currentPage === page }]"
                                @click="handlePageClick(page)"
                            >
                                {{ page }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "Index",
    props: [],
    components: {},
    data: function() {
        return {
            imgurl: "https://cdn.jx3box.com/design/topic/shanhaiyuanliu/",
            active:1,
            scrollCooldown: false, // 防止快速滚动
            currentDetail: "", // 当前2显示的详情图片
            showOptions: true, // 控制是否显示选项
            twoImg: [
                { value: 1, def: "gushi_def.png", act: "gushi_act.png", current: "gushi_def.png", det: "gushi.jpg" },
                {
                    value: 2,
                    def: "xinfa_def.png",
                    act: "xinfa_act.png",
                    current: "xinfa_def.png",
                    det: "xinfa.jpg",
                    link: "https://www.jx3box.com/bps/?subtype=幽罗引",
                },
                {
                    value: 3,
                    def: "waiguan_def.png",
                    act: "waiguan_act.png",
                    current: "waiguan_def.png",
                    det: "waiguan.jpg",
                },
                {
                    value: 4,
                    def: "zhudi_def.png",
                    act: "zhudi_act.png",
                    current: "zhudi_def.png",
                    det: "zhudi.png",
                    options: 9,
                    active: 1,
                },
            ],
            showTips: true,
            fourActive: 1,
            hoverTab: null, // 添加悬停tab状态
            // 区域五内容
            selectedTab: 1, // 添加选中tab状态
            hoverTab5: null,
            totalPages: [6,7], // 固定7个页码
            currentPage:1,
            //竖屏下
            startTime:null
        };
    },

    computed: {},
    watch: {},
    mounted() {
        // 获取 m-index 元素并添加鼠标滚轮事件监听
        this.mIndexElement = document.querySelector(".m-index");
        if (this.mIndexElement) {
            this.mIndexElement.addEventListener("wheel", this.handleWheel, { passive: false });
        }
        document.addEventListener(
            "touchmove",
            function (ev) {
                ev.preventDefault();
            },
            { passive: false }
        );
        // this.handleOrientationChange()
    },

    beforeDestroy() {
        // 移除 m-index 元素上的鼠标滚轮事件监听
        if (this.mIndexElement) {
            this.mIndexElement.removeEventListener("wheel", this.handleWheel);
        }
    },
    methods: {
        //屏幕滑动
        //手指按下屏幕
        handleTouchstart(event) {
            this.startTime = Date.now();
            this.startX = event.changedTouches[0].clientX;
            this.startY = event.changedTouches[0].clientY;
        },
        //手指离开屏幕
        handleTouchend(event) {
            const endTime = Date.now();
            const endX = event.changedTouches[0].clientX;
            const endY = event.changedTouches[0].clientY;
            //判断按下的时长
            if (endTime - this.startTime < 200) {
                if (event.target.tagName == "A" || event.target.tagName == "a") {
                    event.preventDefault();
                    return window.open(event.target.href, "_self");
                }
            }

            if (endTime - this.startTime > 2000) {
                return;
            }
            //滑动的方向
            let direction = "";

            if (Math.abs(endX - this.startX) > 10) {
                if (Math.abs(endY - this.startY) > 100) {
                    return;
                } else {
                    direction = endX - this.startX > 0 ? "right" : "left";
                }
            } else {
                return;
            }
            //用户做了合法的滑动操作
            if (direction === "right") {
                // 向下滚动，进入下一页
                if (this.active < 5) { // 假设总共有6页
                    this.active++;
                }
            } else {
                // 向上滚动，返回上一页
                if (this.active > 1) {
                    this.active--;
                }
            }
        },
        // 添加滚轮事件处理函数
        handleWheel(event) {
            // 如果正在冷却中则不处理
            if (this.scrollCooldown) return;

            // 设置冷却时间，防止连续触发
            this.scrollCooldown = true;

            setTimeout(() => {
                this.scrollCooldown = false;
            }, 800); // 800ms 内只能翻页一次
            if (this.active == 3 && event.target.className != "u-bg-img") return;

            if (event.deltaY > 0) {
                // 向下滚动，进入下一页
                if (this.active < 5) { // 假设总共有6页
                    this.active++;
                }
            } else if (event.deltaY < 0) {
                // 向上滚动，返回上一页
                if (this.active > 1) {
                    this.active--;
                }
            }

        },
        //------------------------------------区域二相关处理函数-------------------------------
        // 点击选项显示详情
        showDetail(item) {
            this.showOptions = false;
            this.currentDetail = item;
        },
        // 鼠标进入小图，切换大背景图
        handleThumbEnter(item, index) {
            if (this.currentDetail && this.currentDetail.value === 4) {
                // 预加载目标图片
                const img = new Image();
                img.src = `${this.imgurl}1/yongningwan/${item}.jpg`;

                img.onload = () => {
                    // 获取 detail box 元素
                    const detailBox = document.querySelector(".u-detail-box");
                    if (detailBox) {
                        // 创建新背景层
                        const newBackground = document.createElement("div");
                        newBackground.className = "new-background-layer";
                        newBackground.style.cssText = `
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            aspect-ratio:64/15;
                            background-image: url(${this.imgurl}1/yongningwan/${item}.jpg);
                            background-size:cover;
                            background-repeat: no-repeat;
                            background-position: right;
                            opacity: 0;
                            z-index: 2;
                            transition: opacity 400ms ease-in-out;
                        `;
                        // 添加新背景层到容器
                        detailBox.appendChild(newBackground);
                        // 触发重排
                        newBackground.offsetHeight;
                        // 开始淡入动画
                        newBackground.style.opacity = "1";
                        // 旧背景淡出（通过降低当前元素的opacity）
                        detailBox.style.transition = "opacity 400ms ease-in-out";
                        detailBox.style.opacity = "0.8";
                        // 动画完成后更新背景并清理
                        setTimeout(() => {
                            // 更新数据
                            this.currentDetail.active = item;
                            // 移除临时元素和样式
                            if (newBackground.parentNode) {
                                newBackground.parentNode.removeChild(newBackground);
                            }
                            // 恢复主容器的opacity
                            detailBox.style.transition = "";
                            detailBox.style.opacity = "";
                        }, 400);
                    }
                };
            }
        },
        // 返回选项界面
        backToOptions() {
            this.showOptions = true;
            this.currentDetail = null;
        },
        // 鼠标进入事件
        handleMouseEnter(item) {
            // 300ms动画放大20%并切换到act图片
            item.current = item.act;
            const imgElement = event.target.querySelector(".u-four-img") || event.target;
            if (imgElement) {
                imgElement.style.transition = "transform 300ms ease";
                imgElement.style.transform = "scale(1.2)";
            }
        },

        // 鼠标离开事件
        handleMouseLeave(item) {
            // 300ms动画恢复并切换回def图片
            item.current = item.def;
            const imgElement = event.target.querySelector(".u-four-img") || event.target;
            if (imgElement) {
                imgElement.style.transition = "transform 300ms ease";
                imgElement.style.transform = "scale(1)";
            }
        },

        //-----------------------------------------------区域三-------------------------------------
        uRightScroll() {
            this.showTips = false;
        },
        //-----------------------------------------------区域四-------------------------------------
        // tab鼠标进入事件
        handleTabMouseEnter(tabIndex) {
            this.hoverTab = tabIndex;
        },

        // tab鼠标离开事件
        handleTabMouseLeave(tabIndex) {
            this.hoverTab = null;
        },
        // 获取tab透明度
        getTabOpacity(tabIndex) {
            // 当前激活的tab保持100%透明度
            if (this.fourActive === tabIndex) {
                return 1;
            }
            // 鼠标悬停的tab保持100%透明度
            if (this.hoverTab === tabIndex) {
                return 1;
            }
            // 其他tab保持30%透明度
            return 0.3;
        },

        // handleTabClick 方法
        handleTabClick(tabIndex) {
            if (this.fourActive === tabIndex) return;

            // 获取当前背景容器元素
            const fourContainer = document.querySelector(".m-four");

            if (fourContainer) {
                // 预加载新背景图
                const img = new Image();
                img.src = `${this.imgurl}3/${tabIndex}.jpg`;

                img.onload = () => {
                    // 创建新的背景层
                    const newBackground = document.createElement("div");
                    newBackground.className = "new-background-layer";
                    newBackground.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: url(${this.imgurl}3/${tabIndex}.jpg);
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                    opacity: 0;
                    z-index: 1;
                    transition: opacity 400ms ease-in-out;
                  `;

                    // 添加新背景层到容器
                    fourContainer.appendChild(newBackground);

                    // 触发重排
                    newBackground.offsetHeight;

                    // 开始淡入动画
                    newBackground.style.opacity = "1";

                    // 旧背景淡出
                    fourContainer.style.transition = "opacity 400ms ease-in-out";
                    fourContainer.style.opacity = "0.8";


                    // 动画完成后更新背景并清理
                    setTimeout(() => {
                        // 更新数据
                        this.fourActive = tabIndex;
                        // 移除临时元素和样式
                        if (newBackground.parentNode) {
                            newBackground.parentNode.removeChild(newBackground);
                        }
                        // 恢复主容器的opacity
                        fourContainer.style.transition = "";
                        fourContainer.style.opacity = "";
                    }, 400);
                };
            } else {
                // 如果找不到容器元素，直接更新状态
                this.fourActive = tabIndex;
            }
        },
        jdtClick(tabIndex) {
            let index = tabIndex - 1 || this.fourActive - 1;
            let arr = [
                "12372", "12373", "12374", "12375", "12376",
            ];
            window.open(`https://www.jx3box.com/rank/#/gongyuecheng/rank?aid=${arr[index]}`, "_blank");
        },

        //-----------------------------------------------区域五-------------------------------------
        // 获取tab透明度的方法
        getTabOpacity5(tabIndex) {
            // 选中状态或鼠标悬停时完全不透明
            if (this.selectedTab === tabIndex || this.hoverTab5 === tabIndex) {
                return 1;
            }
            // 其他情况30%透明度
            return 0.3;
        },

        // 选择tab的方法
        selectTab(tabIndex) {
            this.$nextTick(() => {
                this.selectedTab = tabIndex;
                this.handlePageClick(1,true);
            })
        },
        handlePageClick(page, isReload=false) {
            if (this.currentPage === page && !isReload) return;

            // 获取当前图片元素
            const currentImg = this.$refs.pageContainer.querySelector('.u-right-img');

            if (currentImg) {
                // 预加载新图片
                const img = new Image();
                const newSrc = `${this.imgurl}4/${this.selectedTab}_${page}.png`;
                img.src = newSrc;

                img.onload = () => {
                    // 创建新图片元素
                    const newImg = document.createElement('img');
                    newImg.src = img.src;
                    newImg.className = 'u-right-img';
                    newImg.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    height:88.8%;
                    object-fit: contain;
                    object-position: center top;
                    opacity: 0;
                    transition: opacity 300ms ease-in-out;
                  `;

                    // 插入到当前图片后面
                    currentImg.parentNode.insertBefore(newImg, currentImg.nextSibling);

                    // 触发重排
                    newImg.offsetHeight;

                    // 执行淡入淡出动画：旧图片淡出，新图片淡入
                    currentImg.style.opacity = "0";
                    currentImg.style.transition = "opacity 300ms ease-in-out";
                    newImg.style.opacity = "1";


                    // 动画完成后更新状态并清理
                    setTimeout(() => {
                        this.currentPage = page;
                        // 移除旧图片元素
                        if (currentImg.parentNode) {
                            currentImg.parentNode.removeChild(currentImg);
                        }
                    }, 300);
                };
            } else {
                this.currentPage = page;
            }
        },
        open(url) {
            window.open(url, "_blank");
        },
    },
};
</script>
<!--<style>-->
<!--html,body{-->
<!--    min-height: 100vh;-->
<!--    width: 100%;-->
<!--}-->
<!--</style>-->
<style lang="less" >

@import "~@/assets/css/topic/shanhaiyuanliu/index.less";
</style>
