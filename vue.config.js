const path = require("path");
const pkg = require("./package.json");
const { JX3BOX, SEO } = require("@jx3box/jx3box-common");
const topics = require("./src/assets/data/topic/topic_map.json")
let topicPages = {
	topic: {
		title: "JX3BOX - 魔盒专题导航",
		entry: `src/pages/topic/main.js`,
		template: "public/pc.html",
		filename: `topic/index.html`,
	},
};

topics.forEach((topic) => {
	topicPages[topic.key] = {
		title: topic.title + ' » 魔盒（JX3BOX） - 一站式剑网3资源工具站',
		entry: `src/pages/topic/${topic.key}/index.js`,
		template: "public/pc.html",
		filename: `topic/${topic.key}/index.html`,
	};
});

module.exports = {
    //❤️ Multiple pages ~
    pages: {
        rank: {
            title: "剑三秘境百强榜 - JX3BOX",
            entry: "src/pages/rank/rank/index.js",
            template: "public/rank.html",
            filename: "rank/index.html",
        },
        lover: {
            title: "剑三情缘杯 - JX3BOX",
            entry: "src/pages/rank/lover/index.js",
            template: "public/lover.html",
            filename: "lover/index.html",
        },
        superstar: {
            title: "剑三门派天团 - JX3BOX",
            entry: "src/pages/rank/superstar/index.js",
            template: "public/superstar.html",
            filename: "superstar/index.html",
        },
        ...topicPages,
    },

    outputDir: process.env["BUILD_MODE"] == "preview" ? path.resolve(__dirname, pkg.name) : "dist", // 指定构建输出的目录

    //❤️ define path for static files ~
    publicPath:
        //FOR Localhost => development
        (process.env.NODE_ENV === "development" && "/") ||
        //BY relative path
        (process.env.BUILD_MODE === "preview" && `/${pkg.name}/`) ||
        //BY origin
        (process.env.STATIC_PATH === "origin" && `${JX3BOX.__staticPath["origin"]}${pkg.name}/`) ||
        //BY github
        (process.env.STATIC_PATH === "github" && `${JX3BOX.__staticPath["github"]}${pkg.name}/`) ||
        //BY jsdelivr
        (process.env.STATIC_PATH === "jsdelivr" && `${JX3BOX.__staticPath["jsdelivr"]}${pkg.name}@gh-pages/`) ||
        //BY OSS=>CDN
        (process.env.STATIC_PATH === "mirror" && `${JX3BOX.__staticPath["mirror"]}${pkg.name}/`) ||
        //BY relative path
        (process.env.STATIC_PATH === "repo" && `/${pkg.name}/`) ||
        //BY root path or bind a domain
        (process.env.STATIC_PATH == "root" && "/") ||
        //for lost
        "/",


    chainWebpack: (config) => {
        //💘 html-webpack-plugin ~
        // Multiple pages disable the block below
        // config.plugin("html").tap(args => {
        //     args[0].meta = {                            //------设置SEO信息
        //         Keywords: Setting.keys,
        //         Description: Setting.desc
        //     };
        //     args[0].title = Setting.title + SEO.title;  //------自动添加标题后缀
        //     return args;
        // });

        //💝 in-line small imgs ~
        config.module
            .rule("images")
            .use("url-loader")
            .loader("url-loader")
            .tap((options) => Object.assign(options, { limit: 10240, esModule: false }));

        //💝 in-line svg imgs ~
        config.module.rule("vue").use("vue-svg-inline-loader").loader("vue-svg-inline-loader");

        //💖 import common less var * mixin ~
        const types = ["vue-modules", "vue", "normal-modules", "normal"];
        var preload_styles = [];
        preload_styles.push(
            path.resolve(__dirname, "./node_modules/csslab/base.less"),
            path.resolve(__dirname, "./node_modules/@jx3box/jx3box-common/css/var.less"),
            path.resolve(__dirname, "./src/assets/css/var.less"),
            path.resolve(__dirname, "./src/assets/css/rank/var.less"),
            path.resolve(__dirname, "./src/assets/css/topic/var.less"),
        );
        function addStyleResource(rule) {
            rule.use("style-resource").loader("style-resources-loader").options({
                patterns: preload_styles,
            });
        }
        types.forEach((type) => addStyleResource(config.module.rule("less").oneOf(type)));
    },
};
