<template>
    <div class="m-content">
        <div class="m-page-tabs">
            <div class="u-slider"></div>
            <div
                class="m-item"
                v-for="(item, index) in pageTabsColor"
                :key="index"
                :data-gradient="item"
                @click="scrollToSection(index)"
            >
                <img class="u-img" :src="imgSrc(`nav/${index + 1}.svg`)" alt="" />
            </div>
            <div class="m-item" @click="scrollToSection(-1)">
                <img class="u-img" :src="imgSrc(`nav/8.svg`)" alt="" />
            </div>
        </div>
        <div class="m-page-0" id="start">
            <div class="u-top__bg"></div>
            <div class="m-img-box">
                <div v-for="(item, index) in 12" :key="index">
                    <img class="u-img" :src="imgSrc(`0/${index}.png`)" alt="" @mouseover="playAudio(item)" />
                </div>
            </div>
            <img class="u-top-kv" :src="imgSrc(`0/top_kv.png`)" alt="" />
        </div>
        <div class="m-page-1 m-page-layout" id="mv">
            <img class="u-mark" :src="imgSrc(`1/1.svg`)" alt="" />
            <img class="u-bg" :src="imgSrc(`1/bg.jpg`)" alt="" />
            <div class="m-main">
                <img class="u-title" :src="imgSrc(`1/title.svg`)" alt="" />
                <iframe
                    class="u-video"
                    src="//player.bilibili.com/player.html?isOutside=true&aid=113689210392373&bvid=BV1ypk4YcEA1&cid=27451787183&p=1"
                    scrolling="no"
                    border="0"
                    frameborder="no"
                    framespacing="0"
                    allowfullscreen="true"
                ></iframe>
                <div class="u-links">
                    <a class="u-link" href="https://www.bilibili.com/video/BV1ypk4YcEA1/" target="_blank"
                        >魔盒团队&签约作者<br />
                        “年度巨献”</a
                    >
                </div>
            </div>
            <div class="u-face" :class="`u-face-${item}`" v-for="(item, index) in 4" :key="item">
                <img class="u-img" :src="imgSrc(`1/Ellipse${index}.png`)" alt="" />
                <img class="u-code" :src="imgSrc(`miniprogram.jpg`)" alt="" />
            </div>
        </div>
        <div class="m-page-2 m-page-layout" id="medal">
            <img class="u-mark" :src="imgSrc(`2/2.svg`)" alt="" />
            <img class="u-bg" :src="imgSrc(`2/bg.jpg`)" alt="" />
            <div class="m-main">
                <img class="u-title" :src="imgSrc(`2/title.svg`)" alt="" />

                <div class="m-medal-box">
                    <img class="u-medal" :src="imgSrc(`medal.png`)" alt="" />
                    <img class="u-medal__mask" :src="imgSrc(`medal-bg.png`)" alt="" />
                </div>
                <!-- <div class="m-medal-text"> -->
                    <!-- <img :src="imgSrc(`2/thx.svg`)" alt="" /> -->
                <!-- </div> -->
                <img
                    class="u-get"
                    v-if="!birthdayMedalCheck"
                    style="cursor: pointer"
                    :src="imgSrc(`get.png`)"
                    alt=""
                    @click="getBirthdayMedal"
                />
                <img class="u-get" v-else style="cursor: no-drop" :src="imgSrc(`get1.png`)" alt="" />
            </div>
            <div class="u-face" :class="`u-face-${item}`" v-for="(item, index) in 3" :key="item">
                <img class="u-img" :src="imgSrc(`2/Ellipse${index}.png`)" alt="" />
                <img class="u-code" :src="imgSrc(`miniprogram.jpg`)" alt="" />
            </div>
        </div>
        <div class="m-page-3 m-page-layout" id="decoration">
            <img class="u-mark" :src="imgSrc(`3/3.svg`)" alt="" />
            <img class="u-bg" :src="imgSrc(`3/bg.jpg`)" alt="" />
            <div class="m-main">
                <img class="u-title" :src="imgSrc(`3/title.svg`)" alt="" />
                <div class="m-plate">
                    <img class="u-plate-bg" :src="imgSrc(`3/line.svg`)" alt="" />
                    <div
                        class="m-item u-calendar"
                        @mouseover="page3ClassType = 'calendar'"
                        :class="{
                            'u-hover': page3ClassType == 'calendar',
                        }"
                    >
                        <div class="m-info m-calendar">
                            <div class="m-plate__content">
                                <div class="m-welcome">
                                    <img class="u-pic" :src="imgSrc(`calendar.webp`)" alt="" />
                                    <div class="u-hook u-hook-left"></div>
                                    <div class="u-hook u-hook-right"></div>
                                </div>
                                <div class="m-news">
                                    <div class="m-news-header">
                                        <div class="u-left"></div>
                                        <div class="u-right"></div>
                                    </div>
                                    <div class="m-news-list">
                                        <div class="u-item" v-for="item in 5" :key="item">
                                            <div class="u-time"></div>
                                            <div>/</div>
                                            <div
                                                class="u-content"
                                                :style="{
                                                    width: `${Math.floor(Math.random() * (80 - 40 + 1) + 40)}%`,
                                                }"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="m-info-hover">
                                <div class="u-plate__title">魔盒5周年限定主题·日历</div>
                                <div class="u-plate__sub">实装位置：魔盒官网-首页-最新动态上方</div>
                                <div class="m-plate__tip">
                                    <div>
                                        <div class="u-tip__title">仅限魔盒会员领取</div>
                                        <div class="u-tip__time">领取时间：2024.12.28~2025.2.28</div>
                                    </div>
                                    <div>
                                        <img
                                            v-if="!userDecorationList.includes('calendar')"
                                            class="u-tip__get"
                                            @click="getDecoration('calendar')"
                                            :src="imgSrc(`get.png`)"
                                            alt=""
                                        />
                                        <img
                                            class="u-tip__get"
                                            v-else
                                            style="cursor: no-drop"
                                            :src="imgSrc(`get1.png`)"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-plate__title">
                            <div class="u-plate__title">魔盒5周年限定主题·日历</div>
                        </div>
                    </div>

                    <div
                        class="m-item u-sidebar"
                        @mouseover="page3ClassType = 'sidebar'"
                        :class="{
                            'u-hover': page3ClassType == 'sidebar',
                        }"
                    >
                        <div class="m-info m-sidebar">
                            <div class="m-plate__content">
                                <div class="c-sidebar">
                                    <div class="m-author">
                                        <div class="u-avatar__img"></div>
                                        <div class="u-info">
                                            <div class="u-name"></div>
                                            <div class="u-extend">
                                                <div class="u-extend__item"></div>
                                                <div class="u-extend__item"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="u-bio"></div>
                                    <div class="u-interact">
                                        <div class="u-interact__item"></div>
                                        <div class="u-interact__item"></div>
                                    </div>
                                    <div class="c-author-link">
                                        <div class="u-link"></div>
                                        <div class="u-link"></div>
                                    </div>
                                    <div class="c-author-label"></div>
                                    <div class="m-author-teams"></div>
                                </div>
                            </div>
                            <div class="m-info-hover">
                                <div class="u-plate__title">魔盒5周年限定主题·侧边栏</div>
                                <div class="u-plate__sub">实装位置：魔盒帖子-页面左侧</div>
                                <div class="m-plate__tip">
                                    <div>
                                        <div class="u-tip__title">仅限魔盒会员领取</div>
                                        <div class="u-tip__time">领取时间：2024.12.28~2025.2.28</div>
                                    </div>
                                    <div>
                                        <img
                                            class="u-tip__get"
                                            v-if="!userDecorationList.includes('sidebar')"
                                            @click="getDecoration('sidebar')"
                                            :src="imgSrc(`get.png`)"
                                            alt=""
                                        />
                                        <img
                                            class="u-tip__get"
                                            v-else
                                            style="cursor: no-drop"
                                            :src="imgSrc(`get1.png`)"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-plate__title">
                            <div class="u-plate__title">魔盒5周年限定主题·侧边栏</div>
                        </div>
                    </div>

                    <div
                        class="m-item u-people__card"
                        @mouseover="page3ClassType = 'people__card'"
                        :class="{
                            'u-hover': page3ClassType == 'people__card',
                        }"
                    >
                        <div class="m-info m-people__card">
                            <div class="m-plate__content">
                                <div class="c-sidebar">
                                    <div class="m-author">
                                        <div class="u-avatar__img"></div>
                                        <div class="u-info">
                                            <div class="u-name"></div>
                                            <div class="u-extend">
                                                <div class="u-extend__item"></div>
                                                <div class="u-extend__item"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="u-bio"></div>
                                    <div class="u-interact">
                                        <div class="u-interact__item"></div>
                                        <div class="u-interact__item"></div>
                                    </div>
                                    <div class="c-author-link">
                                        <div class="u-link"></div>
                                        <div class="u-link"></div>
                                    </div>
                                    <div class="c-author-label"></div>
                                    <div class="m-author-teams"></div>
                                </div>
                            </div>
                            <div class="m-info-hover">
                                <div class="u-plate__title">魔盒5周年限定主题·圈人卡</div>
                                <div class="u-plate__sub">实装位置：创作中心-魔盒资源-@人</div>
                                <div class="m-plate__tip">
                                    <div>
                                        <div class="u-tip__title">仅限魔盒会员领取</div>
                                        <div class="u-tip__time">领取时间：2024.12.28~2025.2.28</div>
                                    </div>
                                    <div>
                                        <img
                                            class="u-tip__get"
                                            v-if="!userDecorationList.includes('atcard')"
                                            @click="getDecoration('atcard')"
                                            :src="imgSrc(`get.png`)"
                                            alt=""
                                        />
                                        <img
                                            class="u-tip__get"
                                            v-else
                                            style="cursor: no-drop"
                                            :src="imgSrc(`get1.png`)"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-plate__title">
                            <div class="u-plate__title">魔盒5周年限定主题·圈人卡</div>
                        </div>
                    </div>

                    <div
                        class="m-item u-personal"
                        @mouseover="page3ClassType = 'personal'"
                        :class="{
                            'u-hover': page3ClassType == 'personal',
                        }"
                    >
                        <div class="m-info m-personal">
                            <div
                                class="m-plate__content"
                                :style="{
                                    backgroundImage: `url(${imgSrc('3/homebg.png?2024')})`,
                                }"
                            ></div>
                            <div class="m-info-hover">
                                <div class="u-plate__title">魔盒5周年限定主题·个人主页</div>
                                <div class="u-plate__sub">
                                    实装位置：<br />
                                    1.魔盒官网-个人主页<br />
                                    2.剑三魔盒小程序-我的
                                </div>
                                <div class="m-plate__tip">
                                    <div>
                                        <div class="u-tip__title">仅限魔盒会员领取</div>
                                        <div class="u-tip__time">领取时间：2024.12.28~2025.2.28</div>
                                    </div>
                                    <div>
                                        <img
                                            class="u-tip__get"
                                            v-if="!userDecorationList.includes('homebg')"
                                            @click="getDecoration('homebg')"
                                            :src="imgSrc(`get.png`)"
                                            alt=""
                                        />
                                        <img
                                            class="u-tip__get"
                                            v-else
                                            style="cursor: no-drop"
                                            :src="imgSrc(`get1.png`)"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-plate__title">
                            <div class="u-plate__title">魔盒5周年限定主题·个人主页</div>
                        </div>
                    </div>

                    <div
                        class="m-item u-comment"
                        @mouseover="page3ClassType = 'comment'"
                        :class="{
                            'u-hover': page3ClassType == 'comment',
                        }"
                    >
                        <div class="m-info m-comment">
                            <div class="m-plate__content">
                                <div class="c-comment-cmt__box">
                                    <div class="c-comment-avatar">
                                        <div class="u-avatar__img"></div>
                                    </div>
                                    <div class="c-comment-content">
                                        <div class="c-comment-cmt__author"></div>
                                        <div class="u-cmt">
                                            <div class="u-text"></div>
                                            <div class="u-toolbar">
                                                <div class="u-toolbar__item" v-for="item in 5" :key="item"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="m-info-hover">
                                <div class="u-plate__title">魔盒5周年限定主题·评论</div>
                                <div class="u-plate__sub">实装位置：魔盒帖子-评论</div>
                                <div class="m-plate__tip">
                                    <div class="u-tip__box">
                                        <div class="u-tip__title">仅限魔盒会员领取</div>
                                        <div class="u-tip__time">领取时间：2024.12.28~2025.2.28</div>
                                    </div>
                                    <div>
                                        <img
                                            class="u-tip__get"
                                            v-if="!userDecorationList.includes('comment')"
                                            @click="getDecoration('comment')"
                                            :src="imgSrc(`get.png`)"
                                            alt=""
                                        />
                                        <img
                                            class="u-tip__get"
                                            v-else
                                            style="cursor: no-drop"
                                            :src="imgSrc(`get1.png`)"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-plate__title">
                            <div class="u-plate__title">魔盒5周年限定主题·评论</div>
                        </div>
                    </div>

                    <div
                        class="m-item u-card"
                        @mouseover="page3ClassType = 'card'"
                        :class="{
                            'u-hover': page3ClassType == 'card',
                        }"
                    >
                        <div class="m-info m-card">
                            <div class="m-plate__content">
                                <div class="m-topic-box">
                                    <div class="m-topic-top">
                                        <div class="m-topic-top__time"></div>
                                        <div class="m-topic-top_right">
                                            <div class="u-item"></div>
                                            <div class="u-item"></div>
                                            <div class="u-item"></div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="272.114"
                                                height="27"
                                                viewBox="0 0 272.114 27"
                                                fill="none"
                                                svg-inline=""
                                                role="presentation"
                                                focusable="false"
                                                tabindex="-1"
                                                class="u-mocha"
                                            >
                                                <path
                                                    fill="#FFF"
                                                    d="M4.334 26.5h267.28v-16c0-5.523-4.576-10-10.099-10H93.264c-42.018 0-47.452 26-88.93 26z"
                                                ></path>
                                                <path
                                                    fill="rgba(236, 236, 236, 1)"
                                                    d="M93.264 0H261.515c5.799 0 10.599 4.701 10.599 10.5V27h-.5.5H.5v-1h3.834q7.342 0 13.883-1.103 5.824-.983 11.37-2.908 4.627-1.606 9.723-4.12 2.042-1.007 4.511-2.33 1.484-.796 4.42-2.414 2.961-1.632 4.462-2.436 2.505-1.343 4.584-2.367 5.206-2.565 9.956-4.208Q72.95 2.139 78.956 1.13 85.696 0 93.264 0v1q-7.485 0-14.142 1.117-5.925.994-11.552 2.942-4.691 1.623-9.841 4.16-2.064 1.017-4.553 2.351-1.496.802-4.453 2.43-2.94 1.621-4.43 2.42-2.483 1.331-4.54 2.346-5.153 2.54-9.838 4.167-5.625 1.953-11.532 2.95Q11.76 27 4.333 27H.5c-.667 0-.667-1 0-1h271.114v.5-.5.5h-.5v-16c0-5.247-4.352-9.5-9.599-9.5H93.264V0z"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="m-topic-box__content">
                                        <div class="u-content-aside">
                                            <div class="u-cover"></div>
                                            <div class="m-topic-tag"></div>
                                            <div class="m-topic-userInfo">
                                                <div class="m-topic-userInfo__avatar"></div>
                                                <div class="m-topic-userInfo__name"></div>
                                            </div>
                                        </div>
                                        <div class="u-box-content">
                                            <div class="m-topic-title">
                                                <div class="u-item"></div>
                                                <div class="u-item"></div>
                                                <div class="u-item"></div>
                                            </div>
                                            <div class="u-introduction">
                                                <div class="u-item"></div>
                                                <div class="u-item"></div>
                                                <div class="u-item"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="m-info-hover">
                                <div class="u-plate__title">魔盒5周年限魔卡</div>
                                <div class="u-plate__sub">实装位置：魔盒论坛（魔吧）</div>
                                <div class="m-plate__tip">
                                    <div class="u-tip__box">
                                        <div class="u-tip__title">仅限魔盒会员领取</div>
                                        <div class="u-tip__time">领取时间：2024.12.28~2025.2.28</div>
                                    </div>
                                    <div>
                                        <img
                                            class="u-tip__get"
                                            v-if="!userDecorationList.includes('palu')"
                                            @click="getDecoration('palu')"
                                            :src="imgSrc(`get.png`)"
                                            alt=""
                                        />
                                        <img
                                            class="u-tip__get"
                                            v-else
                                            style="cursor: no-drop"
                                            :src="imgSrc(`get1.png`)"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-plate__title">
                            <div class="u-plate__title">魔盒5周年限魔卡</div>
                        </div>
                    </div>

                    <div
                        class="m-item u-avatar"
                        @mouseover="page3ClassType = 'avatar'"
                        :class="{
                            'u-hover': page3ClassType == 'avatar',
                        }"
                    >
                        <div class="m-info m-avatar">
                            <div class="m-plate__content">
                                <img class="u-user__avatar" :src="userInfo.user_avatar" alt="" />
                                <img
                                    class="u-user__avatar-border"
                                    src="https://img.jx3box.com/avatar/images/jx3box-birthday-5/jx3box-birthday-5.svg"
                                    alt=""
                                />
                            </div>
                            <div class="m-info-hover">
                                <div class="u-plate__title">五周年限定头像框</div>
                                <div class="u-plate__sub">实装位置：魔盒帖子-头像</div>
                                <div class="m-plate__tip">
                                    <div class="u-tip__box">
                                        <div class="u-tip__title">仅限魔盒会员领取</div>
                                        <div class="u-tip__time">领取时间：2024.12.28~2025.2.28</div>
                                    </div>
                                    <div>
                                        <img
                                            class="u-tip__get"
                                            v-if="!userDecorationList.includes('avatar')"
                                            @click="getDecoration('avatar')"
                                            :src="imgSrc(`get.png`)"
                                            alt=""
                                        />
                                        <img
                                            class="u-tip__get"
                                            v-else
                                            style="cursor: no-drop"
                                            :src="imgSrc(`get1.png`)"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-plate__title">
                            <div class="u-plate__title">五周年限定头像框</div>
                        </div>
                    </div>

                    <img
                        class="u-getAll"
                        v-if="userDecorationList.length < 7"
                        :src="imgSrc(`gets.png`)"
                        @click="getDecoration('atcard,homebg,sidebar,calendar,comment,avatar,palu')"
                        alt=""
                    />
                    <img class="u-getAll" v-else style="cursor: no-drop" :src="imgSrc(`get1.png`)" alt="" />
                </div>
            </div>
            <div class="u-face" :class="`u-face-${item}`" v-for="(item, index) in 4" :key="item">
                <img class="u-img" :src="imgSrc(`3/Ellipse${index}.png`)" alt="" />
                <img class="u-code" :src="imgSrc(`miniprogram.jpg`)" alt="" />
            </div>
        </div>
        <div class="m-page-4 m-page-layout" id="feature">
            <img class="u-mark" :src="imgSrc(`4/4.svg`)" alt="" />
            <img class="u-bg" :src="imgSrc(`4/bg.jpg`)" alt="" />
            <div class="m-main">
                <img class="u-title" :src="imgSrc(`4/title.svg`)" alt="" />
                <div class="m-fun">
                    <div class="m-item" v-for="(item, index) in page4Arr" :key="index">
                        <img class="u-fun__img" :src="imgSrc(`4/V${index + 1}.svg`)" alt="" />
                        <div class="u-fun__label">{{ item }}</div>
                    </div>
                </div>
                <!-- <div class="m-tips" style="visibility: hidden">
                    <div class="u-tips__title">这一次，普通用户也能体验</div>
                    <div class="u-tips__sub">[ 每项功能可试用X次 ]</div>
                </div> -->
            </div>
            <div class="u-face" :class="`u-face-${item}`" v-for="(item, index) in 2" :key="item">
                <img class="u-img" :src="imgSrc(`4/Ellipse${index}.png`)" alt="" />
                <img class="u-code" :src="imgSrc(`miniprogram.jpg`)" alt="" />
            </div>
        </div>
        <div class="m-page-5 m-page-layout" id="buy">
            <img class="u-mark" :src="imgSrc(`5/5.svg`)" alt="" />
            <img class="u-bg" :src="imgSrc(`5/bg.jpg`)" alt="" />
            <div class="m-main">
                <img class="u-title" :src="imgSrc(`5/title.svg`)" alt="" />
                <div class="m-info">
                    <img class="u-top" :src="imgSrc(`5/page-title.png`)" alt="" />
                    <div class="u-top__tip">[ 非活动时期 ]</div>
                    <img class="u-points" @click="openNewWindow('/vip/premium')" :src="imgSrc(`5/points.png`)" alt="" />
                    <img class="u-open" @click="openNewWindow('/vip/premium')" :src="imgSrc(`6/open.svg`)" alt="" />
                    <!-- <div class="u-points__tip" style="visibility: hidden">错过再等一整年！</div> -->
                    <img class="u-box__logo" :src="imgSrc(`5/box-logo.png`)" alt="" />
                </div>
            </div>
            <div class="u-face" :class="`u-face-${item}`" v-for="(item, index) in 2" :key="item">
                <img class="u-img" :src="imgSrc(`5/Ellipse${index}.png`)" alt="" />
                <img class="u-code" :src="imgSrc(`miniprogram.jpg`)" alt="" />
            </div>
        </div>
        <div class="m-page-6 m-page-layout" id="gift">
            <img class="u-mark" :src="imgSrc(`6/6.svg`)" alt="" />
            <img class="u-bg" :src="imgSrc(`6/bg.png`)" alt="" />
            <div class="m-main">
                <img class="u-title" :src="imgSrc(`6/title.svg`)" alt="" />
                <div class="m-info">
                    <div class="u-top">B5 40P横线本 4选1</div>
                    <div class="m-book">
                        <el-image
                            class="u-book"
                            v-for="(item, index) in shopList"
                            :key="item.id"
                            :src="item.goods_images[0]"
                            @click="openShopImgViewer(item.id, index)"
                        >
                        </el-image>
                    </div>
                    <div class="u-book__tip">
                        活动期间购买年费会员，即可领取「一套」精美笔记本（每套4本）
                        <span class="u-tips"> （可重复购买与领取） </span>
                    </div>
                    <div class="u-time">[ 活动时间：2024.12.28~2025.2.28 ]</div>
                    <img class="u-get" style="cursor: pointer" @click="openGetGift" :src="imgSrc(`get.png`)" alt="" />
                </div>
            </div>
            <div class="u-face" :class="`u-face-${item}`" v-for="(item, index) in 5" :key="item">
                <img class="u-img" :src="imgSrc(`6/Ellipse${index}.png`)" alt="" />
                <img class="u-code" :src="imgSrc(`miniprogram.jpg`)" alt="" />
            </div>
        </div>
        <div class="m-page-7 m-page-layout" id="pro">
            <img class="u-mark" :src="imgSrc(`7/7.svg`)" alt="" />
            <img class="u-bg" :src="imgSrc(`7/bg.png`)" alt="" />
            <div class="m-main">
                <img class="u-title" :src="imgSrc(`7/title.svg`)" alt="" />
                <div class="m-info">
                    <div class="m-item">
                        <img class="u-get__title" :src="imgSrc(`7/get_1.png`)" alt="" />
                        <div class="m-text">
                            <div class="u-text__title">使用200积分兑换1个月会员</div>
                            <div class="u-text__sub">我的积分：{{ getVipInfo.points }}</div>
                            <div class="u-text__tip">（剩余领取次数：{{ pointCashNum }}）</div>
                        </div>
                        <div>
                            <img class="u-get" @click="pointCash" :src="imgSrc(`get.png`)" alt="" v-if="pointCashNum" />
                            <img class="u-get" v-else style="cursor: no-drop" :src="imgSrc(`get1.png`)" alt="" />
                        </div>
                    </div>
                    <div class="m-item">
                        <img class="u-get__title" :src="imgSrc(`7/get_2.png`)" alt="" />
                        <div class="m-text">
                            <div class="u-text__title">于2021年12月28日之前注册的用户<br />可以领取3个月会员</div>
                            <div class="u-text__sub">我的注册时间：{{ getVipInfo.register_time }}</div>
                            <div class="u-text__tip">（剩余领取次数：{{ oldUserVipNum }}）</div>
                        </div>
                        <div>
                            <img class="u-get" @click="getOldUserVip" :src="imgSrc(`get.png`)" alt="" v-if="oldUserVipNum" />
                            <img class="u-get" v-else style="cursor: no-drop" :src="imgSrc(`get1.png`)" alt="" />
                        </div>
                    </div>
                    <div class="m-item">
                        <img class="u-get__title" :src="imgSrc(`7/get_3.png`)" alt="" />
                        <div class="m-text">
                            <div class="u-text__title">
                                Lv4可领取1个月
                                <br />
                                Lv5可领取2个月
                                <br />
                                Lv6及以上可领取3个月
                            </div>
                            <div class="u-text__sub">我的等级：{{ getVipInfo.level }}</div>
                            <div class="u-text__tip">（剩余领取次数：{{ activeUserVipNum }}）</div>
                        </div>
                        <div>
                            <img
                                class="u-get"
                                @click="getActiveUserVip"
                                style="cursor: pointer"
                                :src="imgSrc(`get.png`)"
                                alt=""
                                v-if="activeUserVipNum"
                            />
                            <img class="u-get" v-else style="cursor: no-drop" :src="imgSrc(`get1.png`)" alt="" />
                        </div>
                    </div>
                </div>
                <div class="m-info m-extra">
                    <div class="m-item">
                        <img class="u-get__title" :src="imgSrc(`7/get_4.svg`)" alt="" />
                        <div class="m-text">
                            <div class="u-qrcode">
                                <div class="u-qrcode-dynamic" v-if="isLogin">
                                    <BindWxMp  @bind-success="getMyInfo" />
                                </div>
                                <div class="u-qrcode-static" v-else @click="toLogin">
                                    <img :src="imgSrc(`wxmp.jpg`)" alt="微信公众号：剑三魔盒" />
                                    <i class="u-qrcode-mask"> 请先登录 </i>
                                </div>
                            </div>
                            <div class="u-text__title">
                                <span class="u-title">关注魔盒公众号：<b>剑三魔盒</b></span>
                                <span class="u-desc">即可免费领取1个月会员</span>
                                <div class="u-text__sub">我的状态：{{ hasBindMp ? '已关注' : '未关注' }}</div>
                            <div class="u-text__tip">（剩余领取次数：{{ userDecorationList.includes('vip') ? 0 : 1 }}）</div>
                            </div>
                        </div>
                        <div>
                            <img
                                class="u-get"
                                v-if="!userDecorationList.includes('vip')"
                                @click="getVip"
                                :src="imgSrc(`get.png`)"
                                alt=""
                            />
                            <img class="u-get" v-else style="cursor: no-drop" :src="imgSrc(`get1.png`)" alt="" />
                        </div>
                    </div>
                </div>
                <!-- <div class="u-time">[ 活动时间：2024.12.28~2025.2.28 ]</div> -->
            </div>
        </div>
        <div class="m-page-8 m-page-layout" id="end">
            <div class="m-author">
                <div class="m-author__list" v-for="(item, index) in authorList" :key="index">
                    <img class="u-author" v-for="author in item" :src="author.user_avatar" :key="author.ID" alt="" />
                </div>
                <img class="u-center__title" :src="imgSrc(`8/center-title.svg`)" alt="" />
            </div>
            <img class="u-bottom" :src="imgSrc(`8/bottom.jpg`)" alt="" />
        </div>

        <!--领取礼品弹窗-->
        <el-dialog title="领取赠礼" :visible.sync="getGiftVisible" class="m-gift-dialog">
            <el-form :model="getGiftForm" :rules="getGiftRules" ref="getGiftRef" label-position="top">
                <div class="u-gift-count">
                    当前可领取次数：<b class="u-count" :class="{ isValid: getGiftNum }">{{ getGiftNum || 0 }}</b>
                </div>
                <el-form-item label="选择福利" prop="mall_good_id">
                    <div class="u-notice">
                        注：将优先发送选择的主题，当主题无存货时，将随机发送其它主题或同款商品的其它风格。
                    </div>
                    <el-radio-group class="m-get-gift" v-model="getGiftForm.mall_good_id">
                        <el-radio class="m-get__radio" v-for="item in shopList" :key="item.id" :label="item.id">
                            <el-image class="u-book" :src="item.goods_images[0]"></el-image>
                            <span class="u-title">{{ item.title }}</span>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="收货地址" prop="address_id">
                    <div class="m-get-gift-address">
                        <el-select placeholder="请选择收货地址" v-model="getGiftForm.address_id">
                            <el-option
                                v-for="item in userAddress"
                                :key="item.id"
                                :label="`${item.contact_name}-${item.contact_phone}-${item.province}${item.city}${item.area}${item.address}`"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                        <el-button
                            @click="openAddAddress"
                            type="primary"
                            icon="el-icon-add-location"
                            circle
                        ></el-button>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="getGiftVisible = false">取 消</el-button>
                <el-button type="primary" @click="getGiftSubmit" :disabled="!getGiftNum">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 地址表单 -->
        <el-dialog custom-class="m-address-dialog" :visible.sync="addAddressVisible" title="我的地址" width="750px">
            <el-form :model="addAddressForm" :rules="addAddressRules" ref="addAddressRef" label-position="top">
                <el-form-item label="联系人" prop="contact_name">
                    <el-input placeholder="请输入名称" v-model="addAddressForm.contact_name"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="contact_phone">
                    <el-input placeholder="请输入手机号" v-model="addAddressForm.contact_phone"></el-input>
                </el-form-item>
                <el-form-item label="联系地址" prop="address">
                    <div class="m-line">
                        <el-cascader
                            class="u-address"
                            v-model="address"
                            :options="addressList"
                            @change="addAddressCascaderChange"
                        ></el-cascader>
                        <el-input placeholder="详细地址" v-model="addAddressForm.address"></el-input>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="m-footer">
                <el-button @click="addAddressVisible = false">取 消</el-button>
                <el-button type="primary" @click="addAddressSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 查看大图 -->
        <el-image-viewer
            v-if="showShopImgViewer"
            :initialIndex="showShopImgIndex"
            :on-close="closeShopImgViewer"
            :url-list="shopList.map((item) => item.goods_images[0])"
        />
    </div>
</template>

<script>
import _ from "lodash";
import {
    medalCheck,
    superAuthor,
    medalReceive,
    decorationCheck,
    decorationReceive,
    addAddress,
    getAddress,
    getMyInfo,
    pointsExchangeVip,
    activityUserApplyVipChance,
    activityUserApplyVipApplyVip,
    oldUserApplyVipChance,
    oldUserApplyVip,
    eventRecordItem,
    mallGoodsAwardChanceSync,
    mallGoodsAwardChanceList,
    mallGoodsAwardApply,
    getEventGiftRecord,
    receiveVip,
    pointsExchangeVipChance,
} from "@/service/event/birthday";
import User from "@jx3box/jx3box-common/js/user";
import addressList from "@/assets/data/event/address.json";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import BindWxMp from "./components/BindWxMp.vue";

export default {
    components: {
        ElImageViewer,
        BindWxMp,
    },
    inject: ["__imgRoot", "__Links", "__imgPath"],
    data() {
        const checkPhone = (rule, value, callback) => {
            if (value) {
                const num = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!num.test(value)) {
                    callback(new Error("请输入正确的手机号"));
                } else {
                    callback();
                }
            }
        };
        const checkAddress = (rule, value, callback) => {
            if (value) {
                if (this.addAddressForm.province) {
                    callback();
                } else {
                    callback(new Error("请选择省市区"));
                }
            } else {
                callback(new Error("请输入具体地址"));
            }
        };
        return {
            pageTabsColor: [
                "linear-gradient(180deg, rgba(151, 71, 255, 0.50) 0%, rgba(151, 71, 255, 0.00) 100%)",
                "linear-gradient(180deg, rgba(206, 0, 0, 0.50) 0%, rgba(206, 0, 0, 0.00) 100%)",
                "linear-gradient(180deg, rgba(239, 98, 22, 0.50) 0%, rgba(239, 98, 22, 0.00) 100%)",
                "linear-gradient(180deg, rgba(239, 206, 22, 0.50) 0%, rgba(239, 206, 22, 0.00) 100%)",
                "linear-gradient(180deg, rgba(48, 236, 89, 0.50) 0%, rgba(48, 236, 89, 0.00) 100%)",
                "linear-gradient(180deg, rgba(64, 128, 255, 0.50) 0%, rgba(64, 128, 255, 0.00) 100%)",
                "linear-gradient(180deg, rgba(64, 128, 255, 0.50) 0%, rgba(64, 128, 255, 0.00) 100%)",
            ],
            page4Arr: [
                "新功能提前体验",
                "团队应用高级功能",
                "个人战斗数据仓库",
                "魔盒助手高级功能",
                "专属虚拟装扮",
                "亲友名单无上限",
                "专属昵称尾巴标识",
                "签到双倍积分",
            ],
            page3ClassType: "",
            pageElements: [], // 存储所有页面的元素
            lastActiveElement: null, // 用于存储上一个活跃的元素
            halfViewportHeight: 0, // 窗口一半的高度

            // ----------交互数据-----------
            birthdayMedalCheck: false,
            authorList: [],
            getGiftVisible: false,
            isLogin: User.isLogin(),
            login_url: this.__Links.account.login + "?redirect=" + location.href,
            userDecorationList: [],

            getGiftForm: {
                mall_good_id: "",
                address_id: "",
            },
            getGiftRules: {
                mall_good_id: [{ required: true, message: "请选择福利", trigger: "change" }],
                address_id: [{ required: true, message: "请选择收货地址", trigger: "change" }],
            },
            getGiftNum: 0,
            mallGoodsAwardChanceId: "",
            userAddress: [],
            address: "",
            addressList,
            addAddressVisible: false,
            addAddressForm: {
                contact_name: "",
                contact_phone: "",
                province: "",
                city: "",
                area: "",
                address: "",
            },
            addAddressRules: {
                contact_name: [{ required: true, message: "请输入联系人名称", trigger: "blur" }],
                contact_phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
                address: [{ required: true, validator: checkAddress, trigger: "blur" }],
            },

            userInfo: {
                uid: 8,
                name: "匿名",
                user_avatar: `${this.__imgPath}/image/common/avatar.png`,
                user_avatar_frame: "default",
                bio: "-",
                sign: 0,
            },
            getVipInfo: {
                points: 0,
                register_time: "",
                oldUserGetNum: "",
                isEarlier: false,
                level: 0,
                activeGetNum: 0,
                point_got: 0,
            },

            shopList: [],
            showShopImgViewer: false,
        };
    },
    computed: {
        pointCashNum: function () {
            return 5 - this.getVipInfo.point_got;
        },
        activeUserVipNum: function () {
            if (this.getVipInfo.activeGetNum == 1) {
                return 0;
            } else if (this.getVipInfo.level <= 3) {
                return 0;
            } else {
                return 1;
            }
        },
        oldUserVipNum: function () {
            if (this.getVipInfo.oldUserGetNum == 1) {
                return 0;
            } else if (!this.getVipInfo.isEarlier) {
                return 0;
            } else {
                return 1;
            }
        },
        hasBindMp() {
            return !!this.userInfo.wechat_mp_openid;
        },
    },
    watch: {},
    created() {
        this.checkMedal();
        this.checkDecoration();
        this.getUserAddress();
        this.loadUserInfo();
        this.getOldUserNum();
        this.getActiveUserNum();
        this.getPointCashNum();
        // 获取可领取的福利商品信息
        eventRecordItem(1).then((res) => {
            this.shopList = res.data.data.mall_goods_list;
            // this.getGiftForm.mall_good_id = this.shopList[0].id;
        });
        // 获取所有签约作者
        superAuthor().then((res) => {
            const tempList = res.data.data;
            const result = [];
            for (let i = 0; i < tempList.length; i += 16) {
                const item = tempList.slice(i, i + 16);
                if (item.length === 16) {
                    result.push(item);
                } else {
                    break;
                }
            }
            this.authorList = result;
        });
    },

    mounted() {
        this.halfViewportHeight = window.innerHeight / 2;
        this.pageElements = Array.from(document.querySelectorAll(`.m-page-layout:not(.m-page-8)`));
        const scrollableElement = document.querySelector(".birthday");
        this.handleScrollThrottled = _.throttle(this.handleScroll, 500);
        scrollableElement.addEventListener("scroll", this.handleScrollThrottled, { passive: true });
        setTimeout(() => {
            this.moveSliderToItem(1);
        }, 500);

        this.Init();
    },
    beforeDestroy() {
        const element = document.querySelector(".birthday");
        element.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
        Init() {
            this.goToAnchor();
            this.loadGiftStatus();
        },
        // 跳转
        goToAnchor(part) {
            const anchor = part || this.$route.query.anchor;
            anchor &&
                document.getElementById(anchor).scrollIntoView({
                    behavior: "smooth", // 平滑滚动
                    block: "start", // 滚动到元素的顶部
                });
        },
        // 检查是否领取了勋章
        checkMedal() {
            this.checkLogin(true).then(() => {
                medalCheck({
                    medal_name: "jx3box-birthday-5",
                }).then((res) => {
                    this.birthdayMedalCheck = res.data.data;
                });
            });
        },
        // 领取生日勋章
        getBirthdayMedal() {
            this.checkLogin().then(() => {
                medalReceive({
                    medal_name: "jx3box-birthday-5",
                }).then((res) => {
                    this.$message({
                        message: "恭喜你，领取成功",
                        type: "success",
                    });
                    this.checkMedal();
                });
            });
        },
        // 检查限定装扮领取状态
        checkDecoration() {
            this.checkLogin(true).then(() => {
                decorationCheck({
                    key: "jx3box-birthday-5",
                    type: `atcard,homebg,sidebar,calendar,comment,avatar,palu,vip`,
                }).then((res) => {
                    this.userDecorationList = res.data.data;
                });
            });
        },
        // 领取装扮
        getDecoration(type) {
            this.checkLogin().then(() => {
                decorationReceive({
                    key: "jx3box-birthday-5",
                    type,
                }).then((res) => {
                    this.$message({
                        message: "恭喜你，领取成功",
                        type: "success",
                    });
                    this.checkDecoration();
                });
            });
        },
        // 打开新窗口
        openNewWindow(url) {
            window.open(url, "_blank");
        },
        // 打开领取礼品弹窗
        openGetGift() {
            this.checkLogin().then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: "Loading",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)",
                });
                mallGoodsAwardChanceSync(1).then((res) => {
                    mallGoodsAwardChanceList(1).then((res) => {
                        loading.close();
                        if (!res.data.data.list) {
                            this.$message({
                                message: "您的可用领取次数不足",
                                type: "warning",
                            });
                        } else {
                            this.getGiftVisible = true;
                            this.mallGoodsAwardChanceId = res.data.data.list[0].id;
                            this.getGiftForm.mall_good_id = this.shopList[0].id;
                        }
                    });
                });
            });
        },
        // 预览商品图片
        openShopImgViewer(shopId, shopIndex) {
            this.showShopImgViewer = true;
            this.showShopImgIndex = shopIndex;
        },
        closeShopImgViewer() {
            this.showShopImgViewer = false;
        },
        // 检查用户的登录状态
        checkLogin(noTip = false) {
            return new Promise((resolve, reject) => {
                if (User.isLogin()) {
                    resolve();
                } else {
                    if (!noTip) {
                        this.$confirm("登录后才可领取，是否前往登录", "您还未登录", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning",
                        }).then(() => {
                            User.toLogin();
                        });
                    }
                }
            });
        },
        toLogin() {
            User.toLogin();
        },
        // 获取用户地址列表
        getUserAddress() {
            this.checkLogin(true).then(() => {
                getAddress().then((res) => {
                    this.userAddress = res.data.data.list;
                });
            });
        },
        loadUserInfo() {
            this.checkLogin(true).then(() => {
                User.getAsset().then((data) => {
                    this.getVipInfo.points = data.points;
                });
                getMyInfo().then((res) => {
                    let userInfo = res.data.data;
                    this.userInfo = userInfo;
                    const apiDateTime = new Date(userInfo.user_registered);
                    this.getVipInfo.register_time = `${apiDateTime.getFullYear()}年${
                        apiDateTime.getMonth() + 1
                    }月${apiDateTime.getDate()}日`;
                    const compareDateTime = new Date("2021-12-28T00:00:00.000Z");
                    // 比较两个时间
                    this.getVipInfo.isEarlier = apiDateTime < compareDateTime;
                    this.getVipInfo.level = User.getLevel(userInfo?.experience || 0);
                });
            });
        },
        getMyInfo() {
            getMyInfo().then((res) => {
                this.userInfo = res.data.data;
            });
        },
        // 使用积分兑换会员
        pointCash() {
            this.checkLogin().then(() => {
                if (this.pointCashNum) {
                    this.$confirm("是否使用200积分兑换一个月会员?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    }).then(() => {
                        pointsExchangeVip(1).then((res) => {
                            this.loadUserInfo();
                            this.getPointCashNum();
                            this.$message({
                                message: "恭喜您，领取成功",
                                type: "success",
                            });
                        });
                    });
                } else {
                    this.$message({
                        message: "您的积分不足",
                        type: "warning",
                    });
                }
            });
        },
        // 查询积分兑换次数
        getPointCashNum() {
            pointsExchangeVipChance(1).then((res) => {
                this.getVipInfo.point_got = res.data.data.got;
            });
        },
        // 关注微信公众号领取会员
        getVip() {
            this.checkLogin().then(() => {
                if (this.hasBindMp) {
                    receiveVip({ key: "jx3box-birthday-5" }).then(() => {
                        this.$message({
                            message: "恭喜您，领取成功",
                            type: "success",
                        });

                        this.userDecorationList.push("vip");
                    });
                } else {
                    // 提醒未关注并且跳转关注
                    this.$message({
                        message: "您尚未绑定微信公众号，不能够领取哦",
                        type: "warning",
                    });
                }
            });
        },
        // 查询活跃会员领取次数
        getActiveUserNum() {
            this.checkLogin(true).then(() => {
                activityUserApplyVipChance(1).then((res) => {
                    this.getVipInfo.activeGetNum = res.data.data.got;
                });
            });
        },
        // 用户领取活跃会员
        getActiveUserVip() {
            this.checkLogin().then(() => {
                if (this.getVipInfo.activeGetNum) {
                    this.$message({
                        message: "您已经领取过活跃用户会员了",
                        type: "warning",
                    });
                } else if (this.getVipInfo.level <= 3) {
                    this.$message({
                        message: "您的等级不够，无法领取活跃用户会员",
                        type: "warning",
                    });
                } else {
                    activityUserApplyVipApplyVip(1).then(() => {
                        this.getActiveUserNum();
                        this.$message({
                            message: "恭喜您，领取成功",
                            type: "success",
                        });
                    });
                }
            });
        },
        // 查询老用户会员领取次数
        getOldUserNum() {
            this.checkLogin(true).then(() => {
                oldUserApplyVipChance(1).then((res) => {
                    this.getVipInfo.oldUserGetNum = res.data.data.got;
                });
            });
        },
        // 用户领取老用户会员
        getOldUserVip() {
            this.checkLogin().then(() => {
                if (this.getVipInfo.oldUserGetNum) {
                    this.$message({
                        message: "您已经领取过老用户会员了",
                        type: "warning",
                    });
                } else if (!this.getVipInfo.isEarlier) {
                    this.$message({
                        message: "只有在2021年12月28日之前注册的用户才能领取老用户会员",
                        type: "warning",
                    });
                } else {
                    oldUserApplyVip(1).then(() => {
                        this.getOldUserNum();
                        this.$message({
                            message: "恭喜您，领取成功",
                            type: "success",
                        });
                    });
                }
            });
        },
        // 打开添加地址弹窗
        openAddAddress() {
            this.addAddressVisible = true;
            this.addAddressForm = {
                contact_name: "",
                contact_phone: "",
                province: "",
                city: "",
                area: "",
                address: "",
            };
            this.address = "";
        },
        // 领取年费会员福利
        getGiftSubmit() {
            this.$refs.getGiftRef.validate((valid) => {
                if (valid) {
                    mallGoodsAwardApply(1, this.mallGoodsAwardChanceId, this.getGiftForm).then((res) => {
                        this.getGiftVisible = false;
                        this.$message({
                            message: "恭喜您，领取成功",
                            type: "success",
                        });
                    });
                }
            });
        },
        // 添加地址 地址变更
        addAddressCascaderChange(list) {
            this.addAddressForm.province = list[0];
            this.addAddressForm.city = list[1];
            this.addAddressForm.area = list[2];
        },
        // 添加地址
        addAddressSubmit() {
            this.$refs.addAddressRef.validate((valid) => {
                if (valid) {
                    addAddress(this.addAddressForm).then((res) => {
                        this.addAddressVisible = false;
                        this.$message({
                            message: "添加成功",
                            type: "success",
                        });
                        this.getUserAddress();
                    });
                }
            });
        },
        handleScroll(event) {
            let activeElement = null;
            for (const element of this.pageElements) {
                const elementTop = element.getBoundingClientRect().top + event.target.scrollTop;
                if (event.target.scrollTop + this.halfViewportHeight >= elementTop) {
                    activeElement = element;
                }
            }
            if (activeElement && activeElement !== this.lastActiveElement) {
                this.lastActiveElement = activeElement;
                let classArr = activeElement.classList[0].split("-");
                let domIndex = classArr[classArr.length - 1];
                this.moveSliderToItem(domIndex);
            }
        },
        moveSliderToItem(index) {
            if (index < 1 || index > document.querySelectorAll(".m-page-tabs .m-item").length) {
                console.error("Invalid index");
                return;
            }
            const items = document.querySelectorAll(".m-page-tabs .m-item");
            const item = items[index - 1]; // 索引是从1开始的，而数组索引是从0开始的
            const itemRect = item.getBoundingClientRect();
            const itemWidth = itemRect.width;
            const itemLeft = itemRect.left;
            const gradient = item.getAttribute("data-gradient");
            const slider = document.querySelector(".m-page-tabs .u-slider");
            slider.style.width = `${itemWidth}px`;
            slider.style.transform = `translateX(${itemLeft}px)`;
            slider.style.backgroundImage = gradient;
        },
        scrollToSection(index) {
            const scrollableElement = document.querySelector(".birthday");
            let scrollNum = 0;
            if (index != -1) {
                const element = document.querySelector(`.m-page-${index + 1}`);
                scrollNum = element.offsetTop;
            }
            scrollableElement.scrollTo({
                top: scrollNum,
                behavior: "smooth",
            });
        },
        playAudio(itemData) {
            const audio = new Audio(this.imgSrc(`music/C4_${itemData}.mp3`));
            audio.play();
        },
        imgSrc(src) {
            return this.__imgRoot + src;
        },
        loadGiftStatus() {
            getEventGiftRecord(1).then((res) => {
                this.getGiftNum = res.data.data.list?.length || 0;
            });
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/birthday/birthday5.less";
</style>
