# 移动端适配台账（2026-11-23）

## 初始风险快照（执行进展见下方专题记录）

| 优先级 | 专题 | 改动文件 / 提交 | 改动类型或状态 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- | --- |
| P0 | 万灵当歌 wanlingdangge | `index.js`、`Index.vue`、`index.less` | 补 viewport、弹窗、手机章节及剧情和对比图布局 | 375/390/414/430 | 是 | 手机视觉尚未实测；剧情切换过渡、按钮及两组画质图边框对齐需核，弹窗和触摸行为需真机确认 |
| P0 | 巴蜀风云 bashufengyun | `reflow.less`（已保存补丁） | 已保存补丁 | 375/390/414/430 | 是 | `.u-six .m-slider`、`.u-two .u-img` 未找到当前模板匹配；页头页脚隐藏及轮播改动待决策 |
| P0 | 通用外壳 app.less | `app.less`（已保存补丁） | 已保存补丁 | 375/390/414/430 | 是 | 新增条件隐藏页头页脚；`:has()` 在部分兼容底线浏览器无效 |
| P1 | 五毒现世 wuduxianshi | `reflow.less`（已保存补丁） | 已保存补丁 | 375/390/414/430 | 是 | 两列重排、动画与背景隐藏；本轮禁止重排及隐藏调整 |
| P1 | 剑胆琴心 jiandanqinxin | `reflow.less`（已保存补丁） | 已保存补丁 | 375/390/414/430 | 是 | 轮播高宽比、内容定位和图片透明度改动待决策 |
| P1 | 烽火燎原 fenghuoliaoyuan | `reflow.less`（已保存补丁） | 已保存补丁 | 375/390/414/430 | 是 | 轮播比例、幻灯片可见性、箭头及标题间距改动待决策 |
| P1 | 暗影千机 anyingqianji | `Index.vue`、`reflow.less` | 恢复移动标题修正，图片正文改为手机可读文本 | 375/390/414/430 | 是 | 标题、图片文字与字体比例需手机截图确认；轮播尺寸与交互不变 |
| P1 | 奕血上阳 yixueshangyang | `Index.vue`、`reflow.less` | 手机首屏构图、轮播图文与控件修复 | 375/390/414/430 | 是 | 需核对四组轮播的实际切换、自动播放与图文完整性 |
| P1 | 丝路风语 silufengyu | `reflow.less`（已保存补丁） | 已保存补丁 | 375/390/414/430 | 是 | 首屏标题尺寸、间距和裁切调整待决策；工具图标逻辑不动 |
| P1 | 江湖无限 jianghuwuxian | `Index.vue`、`reflow.less` | 试点及移动端隐藏页头后的占位修复 | 375/390/393/399/400/414/430 | 是 | 需截图核对首屏顶部与轮播；PC 样式不受本次移动覆盖影响 |
| P1 | 北天药宗 beitianyaozong | `Index.vue`；f15ede6f | 副本入口、按钮平铺及名称 | 375/390/414/430 | 是 | `/fb` 落地页移动端和 CMS 动态链接待核 |
| P1 | 藏剑山庄 cangjianshanzhuang | `reflow.less`（已保存补丁） | 已保存补丁 | 375/390/414/430 | 是 | `body:has` 上边距；秘境图片按钮平铺风险待验证 |
| P1 | 圣殿云起 shengdianyunqi | `info.less`（已保存补丁） | 已保存补丁 | 375/390/414/430 | 是 | 详情顶部间距意图待确认；秘境图片按钮平铺风险待验证 |
| P1 | 横刀断浪 hengdaoduanlang | `index.less`（已保存补丁） | 独立适配；已保存补丁 | 375/390/414/430 | 是 | 首屏顶部间距变动与页头隐藏关联待核 |
| P1 | 群侠万变 qunxiawanbian | `index.less`（已保存补丁） | 独立适配；已保存补丁 | 375/390/414/430 | 是 | 首屏顶部间距变动与页头隐藏关联待核 |
| P1 | 安史之乱 anshizhiluan | — | 待处理 | 375/390/414/430 | 是 | 视频内联播放属性及轮播需人工核查 |
| P1 | 雾海寻龙 wuhaixunlong | — | 待处理 | 375/390/414/430 | 是 | 视频内联播放及弹窗、安全区待核 |
| P1 | 山海源流 shanhaiyuanliu | `Index.vue`、`App.vue`、`index.less` | 修复移动布局重复、分页异常、资料图溢出及首屏与背景对齐 | 375/390/414/430 | 是 | 需核对首屏构图、纸张背景、六项秘境切换及两组分页的实际效果 |
| P1 | 无界 wujie | — | 待处理 | 375/390/414/430 | 是 | 垂直轮播与页面滚动冲突待真机验证 |
| P2 | 剑湖神宫 jianhushengong | — | 待处理 | 375/390/414/430 | 是 | 首领选择与图文可读性待核 |
| P2 | 苍雪龙城 cangxuelongcheng | — | 待处理 | 375/390/414/430 | 是 | `reflow.less` 合并分支的 `.u-title` / `.icon` 未在当前模板找到；首领切换、文字及裁切待核 |
| P2 | 血战天策 xuezhantiance | — | 待处理 | 375/390/414/430 | 是 | 富文本及图片文字可读性待核 |
| P2 | 太极秘录 taijimilu | — | 待处理 | 375/390/414/430 | 是 | 首领背景裁切和长内容待核 |
| 排除 | 苍生铸世 cangshengzhushi | — | 独立 App 适配 | — | — | 按现有范围不改 |
| P1 | 风骨霸刀 fenggubadao | `index.js`、`Index.vue` | 手机网页复用原 App 布局与初始选项 | 375/390/414/430 | 是 | 实际 App 和普通手机在原设计下的观感、交互仍需真机核对 |
| 排除 | 日月明尊 riyuemingzun | — | 独立 App 适配 | — | — | 按现有范围不改 |
| 排除 | 专题总入口 index | — | P0 暂缓 | — | — | 已按用户要求暂缓入口调整 |

## 第二轮手机专题排版复查

兼容底线为 iOS 15+ / Android Chrome 100+，微信内置浏览器需真机核对。

| 专题 | 改动文件 | 改动类型 | 人工核对 URL、宽度与预期 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |
| 血战天策 xuezhantiance | `src/pages/topic/xuezhantiance/Index.vue`、`src/assets/css/topic/xuezhantiance/mobile.less`、本台账 | 理顺章节标题、首领卡、镇派整板、装备图文、成长和赠礼层级 | `/topic/xuezhantiance/`，375/390/414/430px。核对首屏衔接、五张首领卡，切换新旧镇派，逐件看装备文字，检查成长卡内边距和赠礼拼图。 | 是 | Safari、Chrome 和微信实机的点按及图像表现待核。 |
| 苍雪龙城 cangxuelongcheng | `src/pages/topic/cangxuelongcheng/Index.vue`、`src/assets/css/topic/yuanqicangyun/mobile.less`、本台账 | 恢复首屏、门派、秘境首领、奇遇、玩法和页尾的专题排版 | `/topic/cangxuelongcheng/`，375/390/414/430px。切换两套心法和五位首领，箭头同排，三张宠物卡及页尾完整。 | 是 | 首领介绍中的图内小字仍受原图限制，触感待真机。 |
| 安史之乱 anshizhiluan | `src/pages/topic/anshizhiluan/Index.vue`、`src/assets/css/topic/anshizhiluan/mobile.less`、本台账 | 合并首屏与题字，恢复章节背景，重组场景轮播、副本和资讯卡 | `/topic/anshizhiluan/`，375/390/414/430px。逐张切换五张场景图，两侧按钮与分页对齐，核对三张副本卡、双玩法入口和两列资讯。 | 是 | 微信内联视频、链接及触摸需实机核对。 |
| 日月明尊 riyuemingzun | `src/pages/topic/riyuemingzun/index.js`、`src/assets/css/topic/riyuemingzun/index.less`、本台账 | 补普通网页 viewport，重排章节导航、抓马标签、首领和活动卡 | `/topic/riyuemingzun/`，375/390/414/430px。刷新后页面无左右拖动，点章导航、三组抓马标签及首领头像，检查正文与题字可读性。 | 是 | 微信内嵌页面和外链仍需实机核对。 |
| 剑湖神宫 jianhushengong | `src/pages/topic/jianhushengong/Index.vue`、`src/assets/css/topic/jianhushengong/index.less`、本台账 | 统一题字画幅，资料正文底板随内容延展，五位首领头像与详情成组 | `/topic/jianhushengong/`，375/390/414/430px。点五位首领确认选中态、图和正文同步；读剑湖宫与觅宝奇缘完整段落，检查原首屏。 | 是 | 真机点击和外链待核。 |
| 巴蜀风云 bashufengyun | `src/pages/topic/bashufengyun/Index.vue`、`src/assets/css/topic/bashufengyun/mobile.less`、本台账 | 恢复心法图文叠层，两组轮播全宽等比，减小可见箭头 | `/topic/bashufengyun/`，375/390/414/430px。两组轮播逐张切到边界再回退，两箭头同排且靠近画面，核对心法和龙渊泽成组。 | 是 | 沿用箭头切换，原轮播没有滑动与自动播放；外嵌视频及触摸待真机。 |
| 五毒现世 wuduxianshi | `src/pages/topic/wuduxianshi/Index.vue`、`src/assets/css/topic/wuduxianshi/index.less`、本台账 | 约束徽记和荻花主图，六工具两列，恢复剧情叠层及更多入口，原图正文改为可换行文字 | `/topic/wuduxianshi/`，375/390/414/430px。点职业攻略、荻花主图及六个工具，确认标题方向、入口大小和 IF 线图文完整。 | 是 | 微信和 Safari 的外链跳转待真机。 |
| 藏剑山庄 cangjianshanzhuang | `src/pages/topic/cangjianshanzhuang/Index.vue`、`src/pages/topic/cangjianshanzhuang/cangjian/index.vue`、本台账 | 整理首页视频、秘境图、按钮与资料轮播，按 CMS 匹配手机签图，适配详情五项内容 | `/topic/cangjianshanzhuang/` 和 `/topic/cangjianshanzhuang/#/cangjian`，375/390/414/430px。点剑冢与荻花宫后山，核对签图、图片和首领入口，再核对详情菜单与背景、武器翻页。 | 是 | 桌面固定签图顺序与当前 CMS 反序，列为桌面遗留问题。B 站内嵌播放和真机跳转待核。 |
| 圣殿云起 shengdianyunqi | `src/pages/topic/shengdianyunqi/Index.vue`、`src/assets/css/topic/shengdianyunqi/info.less`、本台账 | 整理首页导览、秘境标签、归墟奖励图和阵营图，修复详情直达视口及首领按钮 | `/topic/shengdianyunqi/` 和 `/topic/shengdianyunqi/#/shengdian`，375/390/414/430px。点两个秘境标签，核对图和单个资料入口。直达详情及 `?tab=2`、`?tab=3`，核对背景、首领翻页、掉落图和页面宽度。 | 是 | 内嵌视频已核容器，实际播放、真机触控及早期 Safari 的详情直达待确认。 |

| 五毒现世首屏回归 wuduxianshi | `src/pages/topic/wuduxianshi/Index.vue`、`src/assets/css/topic/wuduxianshi/index.less`、本台账 | 移动首屏按容器宽度合成原背景和三层标识，正文和章节标题按视口显示 | `/topic/wuduxianshi/`，375/390/414/430px。从顶部刷新，首屏能看见人物、剑网3缘起标识、主标题和魔盒竖标；向下核对五毒教、荻花圣殿及 IF 线正文和「更多精彩」标题。 | 是 | iOS Safari、Android Chrome、微信内首次进入的素材载入与显示待真机确认。 |

## 手机专题专项排版复查

以下专题的兼容底线为 iOS 15+ / Android Chrome 100+。桌面按专题在 1440px 或 1600px 对照，真机项包含 iOS Safari、Android Chrome 和微信内置浏览器。历史风险快照保留，当前状态以专项记录为准。

| 专题 | 改动文件 | 改动类型 | 人工核对 URL、宽度与预期 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |
| 烽火燎原 fenghuoliaoyuan | `src/pages/topic/fenghuoliaoyuan/Index.vue`、`src/assets/css/topic/fenghuoliaoyuan/mobile.less`、本台账 | 重组首屏、章节标题、地图、秘境首领和侠客图文，统一原素材比例和正文间距 | `/topic/fenghuoliaoyuan/`，375/390/414/430px。核对标题清楚，地图箭头在两侧，切换地图、首领与侠客并核对画面，点秘境传说和体型详情。320px 另看侠客头像 3+3。 | 是 | 秘境和侠客沿用原头像 hover 事件，Safari 与微信点按映射及两处链接跳转待实机检查。 |
| 剑胆琴心 jiandanqinxin | `src/pages/topic/jiandanqinxin/Index.vue`、`src/assets/css/topic/jiandanqinxin/mobile.less`、本台账 | 首屏及各章节采用独立手机样式，重排心法、场景、首领与阵营控件，联名图独立收尾 | `/topic/jiandanqinxin/`，375/390/414/430px。核对首领六分页与左右箭头对齐，五张场景完整，切换剑踪幻域与阵营玩法，页尾联名图与卡片不重叠。320px 另核两行控件。 | 是 | 按原有箭头和分页切换；触摸、微信内表现及素材内嵌文字需真机核对。 |
| 丝路风语 silufengyu | `src/pages/topic/silufengyu/Index.vue`、`src/assets/css/topic/silufengyu/mobile.less`、本台账 | 剧情和段氏图文分区，资料卡 3+2，段氏选项与首领 3+3，统一标题、正文和间距，颜值拼图分开展示 | `/topic/silufengyu/`，375/390/414/430px。核对剧情、段氏无压字，切换标签、展示图和首领，点报名及两行工具入口，检查地图和引擎自动切换。 | 是 | 部分素材内嵌字号仍受源图限制，触摸及微信内跳转待验证。 |
| 奕血上阳 yixueshangyang | `src/pages/topic/yixueshangyang/Index.vue`、本台账 | 双曜亭和观风殿统一人物、14px 正文与箭头的卡片布局，展示三张不同的奇遇正面，收紧页尾联名图 | `/topic/yixueshangyang/`，375/390/414/430px。两组首领各点左右箭头与全部分页，文字完整，箭头在正文下方，三张奇遇图完整同排。 | 是 | 轮播触摸、自动播放时的视觉变化和微信首屏待真机检查。 |
| 太极秘录 taijimilu | `src/pages/topic/taijimilu/Index.vue`、本台账 | 六位首领共用同一画框，标签集中置顶，按原图还原可换行介绍 | `/topic/taijimilu/`，375/390/414/430px。滚至最后的首领模块依次切换六项，检查选中状态、人物、背景与介绍同步，长段落完整。 | 是 | 真机点按后的轮替和滚动定位待确认。 |

## 本轮逐专题执行记录

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |
| 风骨霸刀 fenggubadao | `index.js`、`Index.vue`、本台账 | 767px 及以下普通网页使用既有 App 样式、文案和初始选项，原生 App 标记独立 | 375/390/414/430 | 是 | 打开 `/topic/fenggubadao/`，分别检查普通手机、微信、App 和桌面。切换秘境、试炼和奇遇选项，调整窗口宽度后应保留当前选中。复用的 App viewport 禁用页面缩放 |

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |
| 暗影千机 anyingqianji | `src/pages/topic/anyingqianji/Index.vue`、`src/assets/css/topic/mobile/reflow.less`、`docs/topic-mobile-audit.md` | 从已保存补丁恢复标题大小调整；第三区图内正文在手机显示为 16px 原文 | 375/390/414/430 | 是 | 检查四处标题的视觉比例、文本与背景对比；轮播内文字是图片，因轮播尺寸与裁切保护未调整 |

暗影千机的原修正是此前未提交的工作区改动，按当时指令保存补丁并清理工作区后未及时恢复，导致标题大小回退。本批只取回标题相关设计，未整体应用含轮播、隐藏等其他改动的补丁；第三区原图内正文经逐字核对后以手机文本呈现，PC 保留原图。

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |
| 江湖无限 jianghuwuxian | `src/assets/css/topic/mobile/reflow.less`、`docs/topic-mobile-audit.md` | 删除公共头隐藏后仍保留的 60px 移动端顶部占位 | 375/390/414/430 | 是 | 首屏背景与屏幕顶部衔接需手机 UA 下截图及真机确认；PC 与轮播不变 |

### 藏剑山庄 cangjianshanzhuang

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |
| 藏剑山庄 cangjianshanzhuang | `src/pages/topic/cangjianshanzhuang/Index.vue`、`docs/topic-mobile-audit.md` | 秘境按钮背景防平铺；数据名称用于图片链接 | 375/390/414/430 | 是 | CMS 详情链接、轮播及图片可读性需人工验证；页面内 aria-label 不覆盖组件库内部控件 |
<!-- topic-audit:cangjianshanzhuang -->







### 圣殿云起 shengdianyunqi

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |
| 圣殿云起 shengdianyunqi | `src/pages/topic/shengdianyunqi/Index.vue`、`docs/topic-mobile-audit.md` | 秘境按钮背景防平铺；数据名称用于图片链接 | 375/390/414/430 | 是 | 详情子路由、CMS 链接与轮播表现需人工验证 |
<!-- topic-audit:shengdianyunqi -->







### 雾海寻龙 wuhaixunlong

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |
| 雾海寻龙 wuhaixunlong | `src/pages/topic/wuhaixunlong/Index.vue`、`docs/topic-mobile-audit.md` | 首屏视频补充内联播放属性 | 375/390/414/430 | 是 | 弹窗滚动、键盘遮挡、媒体尺寸与 iOS / 微信播放需验证 |
<!-- topic-audit:wuhaixunlong -->







### 安史之乱 anshizhiluan

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |
| 安史之乱 anshizhiluan | `src/pages/topic/anshizhiluan/Index.vue`、`docs/topic-mobile-audit.md` | 首屏视频补充 webkit 内联播放属性 | 375/390/414/430 | 是 | 轮播卡片、CMS 内容及 iOS / 微信播放需验证 |
<!-- topic-audit:anshizhiluan -->







### 剑湖神宫 jianhushengong

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |
| 剑湖神宫 jianhushengong | `src/pages/topic/jianhushengong/Index.vue`、`docs/topic-mobile-audit.md` | 首领选择项增加 44px 最小触控区域 | 375/390/414/430 | 是 | 五个首领需逐项核对可见状态、命中区域和切换；动态富文本及键盘操作待验证 |
<!-- topic-audit:jianhushengong -->







### 丝路风语 silufengyu

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |
| 丝路风语 silufengyu | `src/pages/topic/silufengyu/Index.vue`、`docs/topic-mobile-audit.md` | 段氏选项使用已有 label 字段补充名称 | 375/390/414/430 | 是 | 列表项角色、键盘与点击尺寸需核查；轮播及工具图标专用逻辑未改 |
<!-- topic-audit:silufengyu -->







## 其余专题逐项核查

### 巴蜀风云 bashufengyun

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |

| 巴蜀风云 bashufengyun | `docs/topic-mobile-audit.md` | 静态核查；未修改专题代码 | 375/390/414/430 | 是 | 模块的 100vh 来自组件配置；轮播尺寸与整体缩放按要求未改；旧选择器仅存于已保存补丁，需核视口及触摸 |
<!-- topic-audit:bashufengyun -->








### 五毒现世 wuduxianshi

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |

| 五毒现世 wuduxianshi | `docs/topic-mobile-audit.md` | 静态核查；未修改专题代码 | 375/390/414/430 | 是 | 图片入口名称来源为 CMS 样式键，不能直接作为可读标签；动态内容、图片文字及触点需核实 |
<!-- topic-audit:wuduxianshi -->








### 剑胆琴心 jiandanqinxin

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |

| 剑胆琴心 jiandanqinxin | `docs/topic-mobile-audit.md` | 静态核查；未修改专题代码 | 375/390/414/430 | 是 | 图片点击入口的 44px 命中区域及轮播展示需实测；未调整轮播尺寸 |
<!-- topic-audit:jiandanqinxin -->








### 烽火燎原 fenghuoliaoyuan

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |

| 烽火燎原 fenghuoliaoyuan | `docs/topic-mobile-audit.md` | 静态核查；未修改专题代码 | 375/390/414/430 | 是 | 人物选择仅依赖 mouseover；按要求未改交互，轮播及图片内文字需真机核查 |
<!-- topic-audit:fenghuoliaoyuan -->








### 暗影千机 anyingqianji

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |

| 暗影千机 anyingqianji | `docs/topic-mobile-audit.md` | 静态核查；未修改专题代码 | 375/390/414/430 | 是 | 第二组轮播箭头现为 32×44；专门轮播逻辑按要求未动，首组裁切与触摸需核查 |
<!-- topic-audit:anyingqianji -->








### 奕血上阳 yixueshangyang

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |

| 奕血上阳 yixueshangyang | `docs/topic-mobile-audit.md` | 静态核查；未修改专题代码 | 375/390/414/430 | 是 | 卡片使用 mouseenter／mouseleave；专门轮播与 hover 逻辑按要求未改 |
| 奕血上阳 yixueshangyang | `Index.vue`、`reflow.less`、本台账 | 首屏背景按原图比例显示；定位品牌标识与专题名；轮播容器由当前内容撑开，箭头居中靠下，分页单行，卡片正反面共用位置 | 375/390/414/430 | 是 | 在 `/topic/yixueshangyang/` 切换四组轮播的全部画面，检查人物和说明完整、箭头与分页可点、卡片无双层占位。真实触摸和切换仍需复核 |
<!-- topic-audit:yixueshangyang -->








### 苍雪龙城 cangxuelongcheng

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |

| 苍雪龙城 cangxuelongcheng | `docs/topic-mobile-audit.md` | 静态核查；未修改专题代码 | 375/390/414/430 | 是 | reflow 合并分支的 u-title、icon 未找到当前模板匹配；Index.vue 第70行有裸文本 / >，不在本轮允许修改范围 |
<!-- topic-audit:cangxuelongcheng -->








### 血战天策 xuezhantiance

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |

| 血战天策 xuezhantiance | `docs/topic-mobile-audit.md` | 静态核查；未修改专题代码 | 375/390/414/430 | 是 | 图片切换入口实际触点、富文本与图片内文字需核查；未改切换逻辑 |
<!-- topic-audit:xuezhantiance -->








### 山海源流 shanhaiyuanliu

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |

| 山海源流 shanhaiyuanliu | `docs/topic-mobile-audit.md` | 静态核查；未修改专题代码 | 375/390/414/430 | 是 | 页面级触摸切换可能与内层手势冲突，页码点击区域需核查；禁止项保持原样 |
| 山海源流 shanhaiyuanliu | `src/pages/topic/shanhaiyuanliu/Index.vue`、`src/assets/css/topic/shanhaiyuanliu/index.less`、`docs/topic-mobile-audit.md` | 地图图文改为纵向阅读；六个秘境选项与图文、百强榜分开；武学改革与表现升级并排，分页按钮 44px，按各自原尺寸的 45% 显示详情图。宽图在区块内滑动 | 375/390/414/430 | 是 | 图片内小字需借助原图或局部横滑；需验证 iOS Safari、Android Chrome 和微信内预览。竖屏入口的旧 `#box` 旋转代码引用空节点，留作单独清理 |
| 山海源流 shanhaiyuanliu | `Index.vue`、`index.less`、`docs/topic-mobile-audit.md` | 手机与桌面秘境区按同一 CSS 断点互斥；恢复原选项字图；左侧排版首领介绍、右侧适配人物图；资料图改为等比满宽并移除横滑提示；修复分页访问空容器、旧加载请求覆盖新页；首屏标题靠左、羊皮纸背景铺满 | 375/390/414/430 | 是 | 图片内原生小字随满宽图一起缩小。首屏人物与标题的位置、秘境图文比例和真机触控待复核 |
| 山海源流 shanhaiyuanliu | `App.vue` | 去除访问不存在的 `#box` 的旧竖屏旋转逻辑 | 375/390/414/430 | 是 | 竖屏直接加载和横竖屏切换待真机核对 |
<!-- topic-audit:shanhaiyuanliu -->

| 山海源流 5 分钟自验 | 预期 |
| --- | --- |
| 1. 打开 `/topic/shanhaiyuanliu/`，以 375、390、414、430px 查看首屏及后三节。 | 首屏标题在右侧人物的对侧，内容完整，没有页面横向溢出。 |
| 2. 滚到地图说明底部，点击两张原图链接。 | 羊皮纸延伸至最后一项，每个链接打开对应素材。 |
| 3. 依次切换会战弓月城的五位首领及獭山岛，检查首领卡片和百强榜。 | 手机只显示一套原样式选项，卡片仅展示介绍和画面。前五项打开对应的百强榜，獭山岛不显示百强榜。 |
| 4. 快速切换武学改革第 1、6 页，切至表现升级第 7 页，再切回武学改革。 | 无运行时错误，图片完整适配可用宽度，分类切换回第 1 页并保持选中状态正确。 |
| 5. 切换至桌面宽度再切回手机宽度，用 Safari、Chrome 和微信复测。 | 两套秘境界面从不同时显示，桌面分页淡入淡出，竖屏首访无报错遮罩。 |








### 无界 wujie

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |

| 无界 wujie | `docs/topic-mobile-audit.md` | 静态核查；未修改专题代码 | 375/390/414/430 | 是 | 纵向轮播及嵌入视频需核查；通用样式对 m-excessive 的隐藏用途未确认，按要求未改 |
<!-- topic-audit:wujie -->








### 太极秘录 taijimilu

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |

| 太极秘录 taijimilu | `docs/topic-mobile-audit.md` | 静态核查；未修改专题代码 | 375/390/414/430 | 是 | 排行入口触点和 Boss 背景裁切需核查；轮播、布局和背景取舍未改 |
<!-- topic-audit:taijimilu -->








| 清理状态 | 补丁文件 | 校验 | 恢复方式 |
| --- | --- | --- | --- |
| 原有六文件差异已保存并从工作区还原 | `/Users/xuan/Desktop/jx3box/activity-mobile-pre-clean-20261123-rebased.patch` | 当前版本 `git apply --check` 通过；增删行与原补丁逐行一致 | 原始 `.patch` 文件仍保留；重新应用前先执行 `git apply --check` |

## 清理前既有改动逐项归类

| 文件 / 位置 | 所属专题 | 代码可确认的效果 | 原因 / 处理 |
| --- | --- | --- | --- |
| `mobile/reflow.less:244` | 巴蜀风云 | 为 `.u-six .m-slider` 和 `.u-two .u-img` 增加轮播尺寸、箭头及图片间距 | 当前模板未找到这些类，旧样式有相似类；用途待确认，且涉及轮播与 `!important` |
| `mobile/reflow.less:547` | 五毒现世 | 新增两列网格、动画与图片按钮规则，并隐藏背景 | 涉及本轮禁止的布局重排和隐藏；原始意图待确认 |
| `mobile/reflow.less:739` | 奕血上阳 | 轮播指示器增加 20px 下边距 | 涉及不动的专门轮播逻辑；原始意图待确认 |
| `mobile/reflow.less:816` | 暗影千机 | 删除 `.m-instance > .u-title` 原有尺寸和裁切规则 | 与未提交专题标题样式有关，不能孤立推断用途 |
| `mobile/reflow.less:870` | 丝路风语 | 调整首屏标题图上间距、最大高度和 `object-fit` | 是标题图而非工具图标；属于视觉尺寸、间距与裁切变化，待确认 |
| `mobile/reflow.less:900` | 剑胆琴心 | 修改轮播尺寸与比例，调整内容定位和透明度 | 轮播取舍属本轮禁止项；其余效果待确认 |
| `mobile/reflow.less:928` | 江湖无限、藏剑山庄、巴蜀风云 | 删除江湖页头留白；新增藏剑 `:has()` 上边距及巴蜀页头页脚隐藏 | 与公共页头改动可能关联；隐藏属禁止项，且部分目标浏览器不支持 `:has()` |
| `mobile/reflow.less:949` | 烽火燎原 | 修改轮播尺寸比例、活动项可见性和箭头，并增加标题间距 | 涉及轮播和视觉间距；原始意图待确认 |
| `app.less:40` | 跨专题公共外壳 | 移动端条件隐藏公共页头页脚 | 影响站点导航且依赖 `:has()`；隐藏意图待确认 |
| `hengdaoduanlang/index.less:792` | 横刀断浪 | 首屏顶部间距从页头高度改为 0 | 可能与隐藏页头相关，原始意图待确认 |
| `qunxiawanbian/index.less:550` | 群侠万变 | 首屏顶部间距从页头高度改为 0 | 可能与隐藏页头相关，原始意图待确认 |
| `shengdianyunqi/info.less:248` | 圣殿云起 | 详情页新增 16px 顶部间距 | 代码显示间距变化，具体原因待确认 |
| `anyingqianji/Index.vue:198` | 暗影千机 | 调整首屏标题图宽度、裁切及负外边距 | 改的是标题图而非轮播项，但属于视觉调整，待确认 |
| `anyingqianji/Index.vue:260` | 暗影千机 | 调整大会与更新区的高度、留白和标题宽度 | 属于视觉尺寸和间距调整，原始意图待确认 |


---

# 修复与复测记录（2026-11-06）

本轮仅为没有独立手机版的 20 个专题首页接入移动端重排。排除苍生铸世、风骨霸刀、横刀断浪、日月明尊、万灵当歌和专题总入口；这些目录没有源码差异，入口 viewport 配置也保持原状。

- 删除上一轮通用 px → vw 转换，恢复 PostCSS 默认配置。
- 新样式仅由接入页面加载，767px 以下启用；正文自然换行、自动高度、16px 字号；图片保留比例，部分卡片改两列。
- 取消页面及祖先容器的整体 zoom；修复巴蜀风云手机竖屏旋转，以及烽火燎原强制 1600px 宽度。
- 太极秘录、苍雪龙城、剑胆琴心的悬停控制增加点击事件。
- 内置浏览器对 20 页分别检查 375px、414px：文档未超过视口宽度，根节点与祖先 zoom 均为 1。无界、雾海预留 12px 浏览器滚动条。
- 逐页检查了首屏截图；抽查太极秘录两列卡片、长正文、点击首领切换，以及暗影千机轮播点击。1440px 下抽查太极秘录仍使用桌面布局。
- Vue 静态检查、开发模式构建通过。

验证边界：这不是所有子路由、所有弹窗、视频和外链的全量验收；美术图片内部文字仍属于原图片，未转换为 HTML 正文。旧报告保留作为修复前的记录，不能视为当前测试结果。

---

# 专题手机布局核查（2026-11-05）

通过内置浏览器访问本地开发服务，逐一打开 topic_map.json 中全部 25 个专题首页。主要视口 390 × 844；苍生铸世另检查 375 × 812；总入口使用 375 × 812。核查对象包含当前尚未提交的通用 PostCSS 转换。此记录为首页布局筛查，不代表全部子路由、视频播放及外链功能验收。

标准：内容应针对手机重排、文字可读、按钮可触控，无非预期溢出或遮挡；桌面长图按比例缩小不算适配。

| 专题 | 结论 | 浏览器观察 |
| --- | --- | --- |
| 苍生铸世 | 有独立手机版，需改善 | 地图、PVE卡片、PVP/PVX正文重排，地图与翻页切换有效；375px 下地图正文约 9.94px，偏小 |
| 风骨霸刀 | 不通过 | 内容缩成屏幕中央窄条，文字与按钮过小 |
| 北天药宗 | 不通过 | 桌面内容缩小，技能入口、秘境介绍狭窄，文字截断 |
| 藏剑山庄 | 不通过 | 大标题背景裁切，攻略列表挤压 |
| 圣殿云起 | 不通过 | 标题背景裁切，攻略列表文字挤压截断 |
| 江湖无限 | 不通过 | 标题截断，副本列表过窄 |
| 五毒现世 | 不通过 | 背景文字与装饰被裁切，内容未正常重排 |
| 巴蜀风云 | 不通过 | 竖屏内容旋转；390px 视口页面宽度约 617px |
| 横刀断浪 | 不通过 | 标题超出画面，正文与背景叠压 |
| 剑湖神宫 | 不通过 | 正文大量重叠，固定容器高度不足 |
| 日月明尊 | 不通过 | 标题裁切，卡片仍为缩小的桌面横排 |
| 群侠万变 | 不通过 | 大幅背景与缩小元素比例不匹配，标题裁切 |
| 万灵当歌 | 不通过 | 门派与副本文字密集重叠 |
| 安史之乱 | 不通过 | 预览及交互卡片过小，未形成手机阅读布局 |
| 无界 | 不通过 | 桌面内容整体压缩至约一屏，卡片及二维码过小 |
| 血战天策 | 不通过 | 标题超出屏幕，首领介绍叠压；页面宽约 515px |
| 雾海寻龙 | 不通过 | 仍为桌面长页缩小，正文与攻略入口过小 |
| 苍雪龙城 | 不通过 | 权益介绍及门派正文重叠 |
| 丝路风语 | 不通过 | 标题裁切、正文相互覆盖；页面宽约 479px |
| 烽火燎原 | 不通过 | 场景轮播在手机呈狭长比例，内容未合理重排 |
| 太极秘录 | 不通过 | 四列卡片与双栏正文等比缩小，文字难读 |
| 山海源流 | 不通过 | 四列入口、地图侧栏保持桌面比例，内容过小 |
| 剑胆琴心 | 不通过 | 桌面布局缩小，正文、入口及轮播内容需重排 |
| 奕血上阳 | 不通过 | 活动介绍与剧情文字过小，保留桌面比例 |
| 暗影千机 | 不通过 | 整页内容压缩为约半屏，导航与正文难读 |

专题总入口 `/topic/`：独立手机卡片布局，375px 首屏显示正常，未发现横向溢出；未做所有卡片跳转的功能验收。

## 根因及后续处理

上一轮 `scripts/topic-mobile.cjs` 将固定像素按 1920px 画布批量转为 vw，这属于缩放兜底，不符合本次标准。它保留最小字号却同步压缩行高和容器高度，导致文字重叠；背景未统一调整尺寸，导致标题裁切；还可能覆盖已有移动规则。

应以逐专题的媒体查询或独立移动组件替代该转换：正文恢复自然文档流、单列或两列卡片、自动高度，使用可读字号和足够的触控尺寸，分别处理美术背景及带文字图片。现有浏览器结果不能标记为全部适配完成。

## 后续交互优化（2026-11-06）

- 太极秘录图片正文卡片改为单列，首领选择增加焦点、键盘操作和选中状态。
- 暗影千机轮播控制在 320px 下保持一行，增加当前页提示和键盘操作。
- 雾海寻龙修复 Element Plus 弹窗双向绑定，详情正文可独立滚动，顶部提供关闭按钮。
- 内置浏览器实测 320px：秘境详情打开、等待关闭动画后隐藏均通过；暗影轮播及太极首领按 Enter 切换通过。
- 本轮播放器出现“无法播放媒体”提示，外部视频播放未验收通过。


## 万灵当歌补充记录

| 专题 | 改动文件 | 改动类型 | 待人工核对宽度 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |
| 万灵当歌 wanlingdangge | `src/pages/topic/wanlingdangge/Index.vue`、`docs/topic-mobile-audit.md` | 首屏与弹窗视频补充内联播放属性 | 375/390/414/430 | 是 | 手机适配未完成；缺 viewport、桌面宽度、弹窗、可读性与安全区需另行处理 |
| 万灵当歌 wanlingdangge | `src/pages/topic/wanlingdangge/index.js`、`src/pages/topic/wanlingdangge/Index.vue`、`docs/topic-mobile-audit.md` | 补移动 viewport；专题内取消移动端 body 最小宽；弹窗视频限宽、动态视口高度、安全区、关闭触点和背景滚动恢复 | 375/390/414/430 | 是 | 页面仍有 3840px 大画布、固定高度及文字裁切风险；副本描述宽 756px，剧情描述可能超内容盒，更多内容标题固定宽并省略；受禁止重排限制未改。首屏视频原大画布未改；弹窗焦点管理、滚动穿透与播放需真机核验 |
| 万灵当歌 wanlingdangge | `src/assets/css/topic/wanlingdangge/index.less`、`src/pages/topic/wanlingdangge/Index.vue`、`docs/topic-mobile-audit.md` | 手机端首屏限宽、门派与副本自然高度、剧情文字滚动、画质说明流式排列、捏脸头像及更多内容重排 | 375/390/414/430 | 是 | 剧情轮播画布与按钮、画质对比图原尺寸和裁切不动，仍需确认剧情背景及按钮挤压、对比图边框；首屏视频 cover 和文字对比度需视觉核对。头像数据初始为字符串，接口空/失败时可能无图；弹窗及内层滚动需真机核验 |
| 万灵当歌 wanlingdangge | `src/assets/css/topic/wanlingdangge/index.less`、`docs/topic-mobile-audit.md` | 剧情图片限宽、文字自然展开、切换按钮并列；画质对比图按边框比例排列并修正图层盒模型 | 375/390/414/430 | 是 | 剧情过渡、两侧按钮可点击区域与实际画面需人工核对；对比图五组切换后的透明边框对齐需截图验证；保留原上下裁切方向。首屏、头像数据和弹窗真机问题仍按上条记录 |
| 万灵当歌 wanlingdangge | `src/assets/css/topic/wanlingdangge/index.less`、`src/pages/topic/wanlingdangge/Index.vue`、`docs/topic-mobile-audit.md` | 首屏按钮避开标题；门派说明增加底色；副本和视频入口名称；捏脸两列与手机空数据兜底 | 375/390/414/430 | 是 | 首屏画面和门派文字对比度需截图；捏脸无数据时不显示头像入口，接口失败仍无提示；副本、头像与更多动态链接的实际落地需核验 |
| 万灵当歌 wanlingdangge | `src/assets/css/topic/wanlingdangge/index.less`、`src/pages/topic/wanlingdangge/Index.vue`、`docs/topic-mobile-audit.md` | 手机端保留门派按钮素材比例，缩小画质切换和捏脸提示素材；按用户截图隐藏捏脸头像列表，保留捏脸入口；补充画质切换名称 | 375/390/414/430 | 是 | 门派按钮、画质切换点击和捏脸入口实际显示需截图及真机确认；头像入口仅手机隐藏，桌面不变 |
| 万灵当歌 wanlingdangge | `src/assets/css/topic/wanlingdangge/index.less`、`docs/topic-mobile-audit.md` | 手机端调整门派攻略和宏库文字，使其对齐按钮素材的金色横幅中心 | 375/390/414/430 | 是 | 素材画布底部含透明区域及装饰；真实字体的视觉居中、按钮点击与安全区域需截图及真机确认 |

以上各行是按批次记录的历史状态；最新结论以最后一行为准。

| 万灵当歌静态核查项 | 结果及限制 |
| --- | --- |
| viewport、桌面最小宽度 | 入口仅在缺少 viewport 时补入 `width=device-width, initial-scale=1, viewport-fit=cover`；专题根标记限定 767px 以下的 body 最小宽覆盖。现有移动样式依赖手机 UA，不只依赖视口宽度。 |
| 页面溢出 | 剧情背景图片按宽度和固有比例显示；两张画质对比图按边框 1281×710 的比例分别排列。`.m-index` 原有裁切不代表内容完整，实际显示仍需人工核对。 |
| 文字 | 门派、副本、剧情、画质说明与更多标题改为自然高度或自动换行；门派正文增加移动端底色，需实测背景对比度和图片文字。 |
| 入口与动态数据 | 视频入口名称为静态动作，副本名称取现有数据；移动端捏脸列表接口成功但为空时不再生成 undefined 条目。接口失败、缺少链接或图片时的表现仍需检查，未虚构落地地址。 |
| 新增样式选择器 | `html.topic-wanlingdangge` 由入口添加；`.p-topic` 来自 `App.vue`，`.m-cg-box`、`.u-cg` 和 `.u-close-button` 均在 `Index.vue` 模板中。 |
| 弹窗 | Vue 模板、Less、ESLint 和滚动锁状态模拟通过；关闭按钮依赖现有图标字体。真实浏览器内按钮图标可见性、触摸滚动、iOS Safari 与微信行为需人工验证。桌面 UA 缩窄窗口会触发既有 `.m-index` 的 `zoom`，可能同时缩小弹窗，需另行确认。 |

| 万灵当歌 5 分钟自验步骤 | 期望 |
| --- | --- |
| 1. 打开 `/topic/wanlingdangge/`，DevTools 开启手机设备模拟并选用手机 UA，刷新后依次切换 375、390、414、430px。 | viewport 为设备宽度，公共头底隐藏；如首屏或章节被裁切，记录截图及宽度，不能把无滚动条当作完整显示。 |
| 2. 在每个宽度检查首屏播放按钮、门派正文和三个入口、两个副本入口，再检查捏脸提示和入口、更多内容链接；来回切换两组剧情，并刷新五组画质图。 | 标题和按钮不遮挡、文字完整、链接到原目的地；手机头像列表隐藏且捏脸入口保留；剧情按钮不重叠，对比图和边框对齐。 |
| 3. 点击首屏或门派视频入口。 | 视频在屏幕内显示，关闭按钮位于安全区内且可点，弹窗内容可滚动。 |
| 4. 滚动到页面中部后打开弹窗，尝试滚动背景，再关闭。 | 背景不应滚动，关闭后应回到打开前位置；旋转设备或改变窗口宽度后再检查。 |
| 5. 关闭设备模拟并刷新桌面页面；用 iPhone Safari、Android Chrome 和微信内浏览器复查前四步。 | 桌面表现保持原样；手机视频可内联播放、弹窗关闭可用、安全区和滚动锁正常。 |

| 公共改动 | 影响范围 | 待验证 |
| --- | --- | --- |
| 4813bc53 隐藏移动端公共头部和底部 | 全部专题及专题总入口；普通窄视口及设备宽度兜底 | 需真机验证缺 viewport 页面及横屏；部分专题仍有页头占位 |

## 需人工核对清单（高风险优先）

| 专题 | 打开 URL | 宽度 | 看什么 | 期望 |
| --- | --- | --- | --- | --- |
| 万灵当歌 | `/topic/wanlingdangge/` | 375/390/414/430px | 手机 UA 下检查首屏、门派按钮、两张副本、剧情切换、画质切换及图片边框、捏脸说明和入口、更多标题；打开关闭视频弹窗 | 剧情图片完整、文字可读、按钮不挤压；画质切换可点，捏脸头像列表隐藏且入口保留；弹窗可关闭、不穿透且恢复位置。发现异常时截图记录 |
| 巴蜀风云 | `/topic/bashufengyun/` | 375/390/414/430px | 模块首屏及各章节高度、箭头与侧边内容 | 内容不被地址栏或固定高度裁切，页面可正常纵向滚动 |
| 五毒现世 | `/topic/wuduxianshi/` | 375/390/414/430px | 图片入口、背景和 Safari 15.0–15.3 的布局 | 所有入口可见可点，无依赖不支持的 :has() 导致丢失 |
| 剑胆琴心 | `/topic/jiandanqinxin/` | 375/390/414/430px | 大战与奇遇图片入口、轮播叠层 | 入口命中区域至少 44×44px，文字和画面完整 |
| 烽火燎原 | `/topic/fenghuoliaoyuan/` | 375/390/414/430px | 两组人物切换、轮播与图片文字 | 触屏可使用的现状需确认，画面和文字可读 |
| 暗影千机 | `/topic/anyingqianji/` | 375/390/414/430px | 首轮播裁切和第二组 32×44 箭头 | 设计认可现有裁切，控制可操作且触点满足 44×44px |
| 奕血上阳 | `/topic/yixueshangyang/` | 375/390/414/430px | 卡片 hover、四组轮播和分页 | 触屏可用性及文字图层完整性需确认 |
| 苍雪龙城 | `/topic/cangxuelongcheng/` | 375/390/414/430px | 首领区第 70 行裸文本及图片切换 | 不出现多余字符，图片与切换入口完整 |
| 血战天策 | `/topic/xuezhantiance/` | 375/390/414/430px | 镇派图片点击项、富文本和长文本 | 触点至少 44×44px，内容不溢出且可读 |
| 山海源流 | `/topic/shanhaiyuanliu/` | 375/390/414/430px | 首屏标题、地图背景、六项秘境和百强榜、武学两组分页 | 标题避开人物、背景铺满内容、手机只显示一套秘境区、资料图完整无溢出，触点至少 44×44px |
| 无界 | `/topic/wujie/` | 375/390/414/430px | 纵向轮播、视频 iframe 与被隐藏的过渡内容 | 纵向滚动不被劫持，媒体不溢出，确认隐藏内容用途 |
| 太极秘录 | `/topic/taijimilu/` | 375/390/414/430px | 排行图片入口、Boss 背景与长文 | 入口触点至少 44×44px，裁切与文字显示符合设计 |
| 藏剑山庄 | `/topic/cangjianshanzhuang/` | 375/390/414/430px | 秘境按钮背景、名称与目标 | 按钮只显示一次，数据名称与链接一致，轮播保持原样 |
| 圣殿云起 | `/topic/shengdianyunqi/` | 375/390/414/430px | 秘境按钮背景、名称和详情页 | 按钮只显示一次，链接正确，详情内容不溢出 |
| 雾海寻龙 | `/topic/wuhaixunlong/` | 375/390/414/430px | 首屏视频、两个弹窗和关闭控件 | 视频内联播放，弹窗可滚动且关闭控件可点 |
| 安史之乱 | `/topic/anshizhiluan/` | 375/390/414/430px | 首屏视频与卡片轮播 | 视频内联播放，卡片不遮挡且可操作 |
| 剑湖神宫 | `/topic/jianhushengong/` | 375/390/414/430px | 五个首领选择项 | 五项均可见、至少 44×44px，选择内容正确变化 |
| 丝路风语 | `/topic/silufengyu/` | 375/390/414/430px | 段氏六个选项、工具图标与图片切换 | 名称正确，触点和图片状态正常，工具图标未失真 |
| 江湖无限 | `/topic/jianghuwuxian/` | 375/390/414/430px | 六个竖向入口、图片按钮和新闻列表；补测 393/399/400 | 390/393 为 3+3，400 为一排；按钮不平铺，标题可读 |
| 北天药宗 | `/topic/beitianyaozong/` | 375/390/414/430px | 首领数据按钮、切换秘境及副本攻略入口 | 按钮各显示一次、链接正确，两个入口均可点 |

## 未修改问题汇总

| 专题 / 范围 | 未修改问题 | 原因 |
| --- | --- | --- |
| 通用重排 | 现有宽泛覆盖、隐藏规则、部分 `:has()` | 用户要求保持不动；Safari 15.0–15.3 对 `:has()` 的效果需核查 |
| 暗影千机、奕血上阳、剑胆琴心、烽火燎原等 | 轮播容器尺寸、比例、裁切、分页逻辑 | 用户明确禁止修改，不能按原图比例推导设计 |
| 烽火燎原、奕血上阳 | 仅 hover 的人物或卡片交互 | 用户禁止改为点击；触屏行为需人工核实 |
| 巴蜀风云 | 通过 JS 配置传入的 `100vh` | 直接调整可能影响 PC，未发现满足隔离约束的确定修复 |
| 苍雪龙城 | 模板图片后裸文本 `/>`；部分选择器未找到当前节点 | 不属于本轮允许修改类型；选择器待确认，未删除 |
| 五毒现世 | CMS 的样式键不能作为可读名称 | 无可靠名称字段，不猜测 aria-label |
| 专题总入口、独立 App 专题 | PC 视口及各自移动布局 | 总入口主体暂缓；苍生铸世、风骨霸刀、日月明尊的既有专门布局未重做 |
| 所有受影响专题 | 图片内文字、动态 CMS / 富文本、长链接和外链落地页 | 不能仅凭静态源码确认当前数据与视觉结果 |

## 选择器与模板核对补充

| 范围 | 核对结果 | 遗留 |
| --- | --- | --- |
| 巴蜀风云 | `index.less` 中 `.fullPageContainer` / `.child` 未在当前专题模板或脚本找到 | 可能为旧版或动态节点，未删除；先前补丁中的 `.u-six` 等不在当前工作树 |
| 苍雪龙城 | 通用重排合并分支中 `.u-title` / `.icon` 未在当前专题模板找到 | `.m-logo` 等同组选择器有匹配；仅记录未匹配部分 |
| 丝路风语 | `.new-map__mainpic`、`.new-map__textbg`、`.new-map__text`、`.hero-section`、`.full-skill-image` 未在当前专题模板或脚本找到 | 可能是旧版样式或外部动态内容，未删除 |
| 血战天策 | `.u-title-7` 至 `.u-title-10` 未在当前模板找到 | `.m-item-*` 是动态拼接，不能当作失效选择器 |
| 北天、藏剑、圣殿、江湖、安史、剑湖等 | 数字后缀及 Boss 类部分由数据或方法动态生成；Element Plus 类由组件生成 | 不将这些动态类当作缺失；CMS / v-html 和共享通用选择器仍需运行时核验 |
| 所有专题 | 本轮新增的专题作用域选择器已对照根节点与模板层级 | 通用样式库包含为其他专题预留的类；未找到静态节点不等同应删除 |

## 需真机验证项

| 环境 | 检查内容 | 状态 |
| --- | --- | --- |
| iOS Safari 15+ | 地址栏高度、视频内联播放、弹窗与焦点、:has() 降级、安全区 | 需真机验证 |
| Android Chrome 100+ | 触点、纵横滚动、视频与弹窗、旧版 :has() 降级 | 需真机验证 |
| 微信内置浏览器 | 内联视频、链接打开方式、触摸滑动、底部安全区 | 需真机验证 |
| 所有目标设备 | 暗影千机、奕血上阳轮播与丝路风语工具图标 | 专门逻辑未改，需核查原状 |

## 本轮提交与回滚边界

| 范围 | 已验证情况 | 限制 |
| --- | --- | --- |
| 本轮 17 个专题记录 | 通过临时 Git 索引和三方合并逐笔验证反向应用 | 后续再次修改同一区块仍可能造成冲突 |
| 江湖无限试点 | 已在旧提交 `8fa14550` 中 | 该提交同时包含公共基线；整笔回滚不能独立保留基线，需按文件/代码块处理 |
| 清理前六文件修改 | 已保存为仓库外补丁并经清理后 apply 检查 | 后续代码变化可能使重新应用产生冲突，先执行 `git apply --check` |
| 页面运行和真机 | 未进行 | 静态模板、Less、ESLint 通过不等于视觉或交互验收通过 |

## PC 样式复查（2026-11-23）

移动重排和基线规则仅在 767px 以下生效；PC 页头页脚的设备宽度例外也不匹配常规桌面设备。Tailwind 4 的实际编译产物仍包含 preflight 的 `border-box`，即使配置声明关闭 preflight；这项历史重置早于本次移动适配。图片显示仍需以专题和公共样式的 CSS 层叠为准，不能单凭 preflight 断言被设为块级。

| 专题 | 改动文件 | PC 改动 | 人工核对 | 遗留问题 |
| --- | --- | --- | --- | --- |
| 北天药宗 beitianyaozong | `src/assets/css/topic/beitianyaozong/index.less` | 限桌面恢复指定内容盒、原始标题比例和章节间距 | `/topic/beitianyaozong/`，1280/1440/1920px；对照介绍图、视频下方间距、雷雨大泽选项及更多玩法标题 | 未进行浏览器视觉验证；原素材及固定背景对齐需人工确认 |
| 藏剑山庄 cangjianshanzhuang | `src/assets/css/topic/cangjianshanzhuang/index.less` | 限桌面恢复标题和入口区域的内容盒间距 | `/topic/cangjianshanzhuang/`，1280/1440/1920px；查看两个章节标题与内容、视频下方入口的间距 | 未进行浏览器视觉验证；保留已明确设为 `border-box` 的卷轴和轮播容器 |
| 横刀断浪 hengdaoduanlang | `src/assets/css/topic/hengdaoduanlang/index.less` | 限桌面恢复 498px 分隔图和两侧 711px 留白所构成的 1920px 画布 | `/topic/hengdaoduanlang/`，1280/1440/1920px；查看各章节分隔图是否居中及章节衔接 | 未进行浏览器视觉验证；手机样式仍采用原有盒模型 |
| 江湖无限 jianghuwuxian | `src/pages/topic/jianghuwuxian/Index.vue` | 限桌面恢复入口的 50px 留白与 250px 内容高度；将首屏装饰宽度改回 515px 素材尺寸 | `/topic/jianghuwuxian/`，1280/1440/1920px；查看首屏装饰及六个竖向入口与下方标题间距 | 未进行浏览器视觉验证；第二板块的背景对齐仍需截图确认 |
| 圣殿云起 shengdianyunqi | `src/pages/topic/shengdianyunqi/Index.vue` | 限桌面恢复视频下方入口的 50px 顶部留白与 250px 内容高度 | `/topic/shengdianyunqi/`，1280/1440/1920px；查看视频下方竖向入口与副本板块间距 | 未进行浏览器视觉验证；第二板块的背景对齐仍需截图确认 |
| 五毒现世 wuduxianshi | `src/pages/topic/wuduxianshi/Index.vue` | 限桌面恢复五毒介绍、第四部分和底部图的内容盒高度 | `/topic/wuduxianshi/`，1280/1440/1920px；查看首段、第四部分和底部标志图 | 未进行浏览器视觉验证；第二部分与下一节的衔接需截图确认 |
| 太极秘录 taijimilu | `src/pages/topic/taijimilu/Index.vue` | 限桌面恢复秘境介绍内容盒，使半宽图片匹配 1440×840 原始比例 | `/topic/taijimilu/`，1280/1440/1920px；查看秘境介绍图片、文本框与下方按钮 | 未进行浏览器视觉验证；需要检查相邻元素与背景的对齐 |

### PC 待人工核对的静态候选

以下是固定高度、内边距等组合的源码筛查结果，并非已确认的视觉缺陷。页面可能有更高优先级的盒模型声明、固定背景或设计留白；需先检查画面，再决定是否修改。轮播高度、比例与裁切均未调整。

| 专题 / URL | 宽度 | 核对位置与期望 |
| --- | --- | --- |
| 五毒现世 `/topic/wuduxianshi/` | 1440 | 截“荻花圣殿”下方文字图与下一节“IF剧情”的交界；静态尺寸存在重叠可能，实际素材是否有透明留白及预期层叠需确认 |
| 丝路风语 `/topic/silufengyu/` | 1440 | 截“段氏”大图底部及下一节顶部；内容尺寸超出本节高度，可能是有意叠放 |
| 万灵当歌 `/topic/wanlingdangge/` | 1440 | 截“旗舰画质”两张对比图及边框，切换画面后再截；图片与边框高度差 6px，裁切意图未明；另截捏脸滚动框首尾 |
| 剑湖神宫 `/topic/jianhushengong/` | 1440 | 截首屏介绍文字与背景边界；另截“八荒衡鉴”“觅宝奇缘”和二维码区，用于确认文字宽度和章节衔接 |
| 血战天策 `/topic/xuezhantiance/` | 1440 | 截“萌新成长”四张卡片及第五张宽卡，确认文字未溢出；卡片已明确使用 border-box |
| 奕血上阳 `/topic/yixueshangyang/` | 1440 | 截“黑市寻影”“厄境余息”标题和背景的交界；章节已明确使用 border-box，轮播不动 |
| 暗影千机 `/topic/anyingqianji/` | 1440 | 截日常、发布会和更新板块的标题及上下边界；背景素材高度与现有盒高吻合 |
| 江湖无限 `/topic/jianghuwuxian/` | 1440 | 截第二板块整体及与上下章节的交界，确认内容与背景对齐 |
| 圣殿云起 `/topic/shengdianyunqi/` | 1440 | 截第二板块整体及与上下章节的交界，确认内容与背景对齐 |
| 太极秘录 `/topic/taijimilu/` | 1440 | 截秘境介绍图片、文本框及下方按钮，确认修复后与背景对齐 |
| 安史之乱 `/topic/anshizhiluan/` | 1280/1440/1920 | 核对标题、图片与章节间距；静态筛查未找到可直接判定的同类问题 |
| 巴蜀风云 `/topic/bashufengyun/` | 1920 | 截第四屏“龙渊泽之擂”标题、人物、说明与第五屏的交界；背景素材高度与现有盒高吻合 |
| 苍生铸世 `/topic/cangshengzhushi/` | 1280/1440/1920 | 核对标题、图片与章节间距；静态筛查未找到可直接判定的同类问题 |
| 苍雪龙城 `/topic/cangxuelongcheng/` | 1280/1440/1920 | 核对标题、图片与章节间距；静态筛查未找到可直接判定的同类问题 |
| 风骨霸刀 `/topic/fenggubadao/` | 1280/1440/1920 | 核对标题、图片与章节间距；静态筛查未找到可直接判定的同类问题 |
| 烽火燎原 `/topic/fenghuoliaoyuan/` | 1280/1440/1920 | 核对标题、图片与章节间距；静态筛查未找到可直接判定的同类问题 |
| 剑胆琴心 `/topic/jiandanqinxin/` | 1280/1440/1920 | 核对标题、图片与章节间距；静态筛查未找到可直接判定的同类问题 |
| 群侠万变 `/topic/qunxiawanbian/` | 1280/1440/1920 | 核对标题、图片与章节间距；静态筛查未找到可直接判定的同类问题 |
| 日月明尊 `/topic/riyuemingzun/` | 1280/1440/1920 | 核对标题、图片与章节间距；静态筛查未找到可直接判定的同类问题 |
| 山海源流 `/topic/shanhaiyuanliu/` | 1280/1440/1920 | 核对标题、图片与章节间距；静态筛查未找到可直接判定的同类问题 |
| 雾海寻龙 `/topic/wuhaixunlong/` | 1280/1440/1920 | 核对标题、图片与章节间距；静态筛查未找到可直接判定的同类问题 |
| 无界 `/topic/wujie/` | 1280/1440/1920 | 核对标题、图片与章节间距；静态筛查未找到可直接判定的同类问题 |

## 公共头隐藏后的顶部占位检查

| 专题 | 改动文件 | 改动类型 | 人工核对 URL / 宽度与预期 | 需真机 | 遗留问题 |
| --- | --- | --- | --- | --- | --- |
| 北天药宗详情 beitianyaozong | `src/assets/css/topic/beitianyaozong/yaozong.less`、`docs/topic-mobile-audit.md` | 详情根容器 margin-top 清零 | `/topic/beitianyaozong/#/yaozong`；375/390/414/430px，手机 UA 刷新，首屏或详情内容顶部不保留公共头空白 | 是 | 需截图检查首屏裁切、安全区及原有内容布局 |
| 圣殿云起详情 shengdianyunqi | `src/assets/css/topic/shengdianyunqi/info.less`、`docs/topic-mobile-audit.md` | 详情容器 padding-top 清零 | `/topic/shengdianyunqi/#/shengdian`；375/390/414/430px，手机 UA 刷新，首屏或详情内容顶部不保留公共头空白 | 是 | 需截图检查首屏裁切、安全区及原有内容布局 |
| 横刀断浪 hengdaoduanlang | `src/assets/css/topic/hengdaoduanlang/index.less`、`docs/topic-mobile-audit.md` | 首屏 margin-top 清零 | `/topic/hengdaoduanlang/`；375/390/414/430px，手机 UA 刷新，首屏或详情内容顶部不保留公共头空白 | 是 | 需截图检查首屏裁切、安全区及原有内容布局 |
| 群侠万变 qunxiawanbian | `src/assets/css/topic/qunxiawanbian/index.less`、`docs/topic-mobile-audit.md` | 首屏 margin-top 清零 | `/topic/qunxiawanbian/`；375/390/414/430px，手机 UA 刷新，首屏或详情内容顶部不保留公共头空白 | 是 | 需截图检查首屏裁切、安全区及原有内容布局 |
| 日月明尊 riyuemingzun | `src/assets/css/topic/riyuemingzun/index.less`、`docs/topic-mobile-audit.md` | 首屏 margin-top 清零，含设备宽度兜底 | `/topic/riyuemingzun/`；375/390/414/430px，手机 UA 刷新，首屏或详情内容顶部不保留公共头空白 | 是 | 需截图检查首屏裁切、安全区及原有内容布局 |
| 血战天策 xuezhantiance | `src/assets/css/topic/xuezhantiance/index.less`、`docs/topic-mobile-audit.md` | 专题外壳 margin-top 清零 | `/topic/xuezhantiance/`；375/390/414/430px，手机 UA 刷新，首屏或详情内容顶部不保留公共头空白 | 是 | 需截图检查首屏裁切、安全区及原有内容布局 |
| 藏剑山庄 cangjianshanzhuang | `src/pages/topic/cangjianshanzhuang/index.js`、`src/assets/css/topic/cangjianshanzhuang/common.less`、`docs/topic-mobile-audit.md` | 专题根类隔离下 body padding-top 清零 | `/topic/cangjianshanzhuang/ 和 #/cangjian`；375/390/414/430px，手机 UA 刷新，首屏或详情内容顶部不保留公共头空白 | 是 | 需截图检查首屏裁切、安全区及原有内容布局 |

| 恢复补丁 | 当前状态 |
| --- | --- |
| `/Users/xuan/Desktop/jx3box/activity-mobile-pre-clean-20261123.patch` 和 `activity-mobile-pre-clean-20261123-rebased.patch` | 原文件保留；本轮提交与其中部分改动重叠，旧版不能直接应用到当前 HEAD。 |
| `/Users/xuan/Desktop/jx3box/activity-mobile-pre-clean-20261123-header-rebased.patch` | 已针对本轮提交重算并通过 `git apply --check`。仅为历史改动的恢复副本，未经重新审查不得当成当前适配方案；其中圣殿云起详情的历史 `padding-top:16px` 会覆盖本轮的 0。 |

专题总入口此前暂缓，未修改其 `body` 的 1280px 和顶部占位；普通手机页面可能仍有页头预留空间。苍生铸世手机分支已通过现有 `v-app` 样式清除首屏占位，未重复修改。

## 手机首屏专项检查

| 专题 | 改动文件 | 改动类型 | URL、宽度与预期 | 需真机 |
| --- | --- | --- | --- | --- |
| 丝路风语 | `src/assets/css/topic/silufengyu/index.less`、本台账 | 移除桌面 560px 的标题占位，按原图画幅显示首屏，把标题叠在人物下方。 | `/topic/silufengyu/`，375/390/414/430px。首图高度随宽度变化，人物头部与标题都可见。 | 是 |
| 剑胆琴心 | `src/assets/css/topic/jiandanqinxin/index.less`、本台账 | 首屏按背景图比例收短，主标安排到人物下方。 | `/topic/jiandanqinxin/`，375/390/414/430px。左上品牌标识仍可见，背景和主标完整，第一章节紧随首屏。 | 是 |
| 太极秘录 | `src/pages/topic/taijimilu/Index.vue`、本台账 | 清除首图区域的通用内边距和图片外边距。 | `/topic/taijimilu/`，375/390/414/430px。首图等比贴齐页面两侧，图片四周没有额外深色边框。 | 是 |
| 血战天策 | `src/assets/css/topic/xuezhantiance/index.less`、本台账 | 恢复首屏背景与四张标识图的叠放，清除额外首屏内边距。 | `/topic/xuezhantiance/`，375/390/414/430px。首图紧贴顶部，品牌、标题、副标与底部提示各在其位。 | 是 |
| 五毒现世 | `src/assets/css/topic/wuduxianshi/index.less`、本台账 | 首屏背景按原图比例贴顶，品牌、题字及竖标按原构图叠放。 | `/topic/wuduxianshi/`，375/390/414/430px。首屏保留三张原素材，标识大小协调。 | 是 |
| 剑湖神宫 | `src/assets/css/topic/jianhushengong/index.less`、本台账 | 恢复首屏原画幅，重定位联名标识和资料片标题。 | `/topic/jianhushengong/`，375/390/414/430px。背景自带的主标题完整，联名标识与下方标题分别贴合原画。 | 是 |
| 藏剑山庄 | `src/pages/topic/cangjianshanzhuang/Index.vue`、本台账 | 按 1920×1200 原画幅贴顶显示背景，标题和魔盒字图分别按素材比例叠放。 | `/topic/cangjianshanzhuang/`，375/390/414/430px。标题和魔盒字图留在同一画面内，不产生独立高占位。 | 是 |
| 圣殿云起 | `src/pages/topic/shengdianyunqi/Index.vue`、本台账 | 将背景层及三张字图合在同一首屏画幅，去掉背景层单独占高。 | `/topic/shengdianyunqi/`，375/390/414/430px。首屏只用一个背景画幅，品牌、标题和魔盒字图完整显示。 | 是 |
