import { getArticle } from "@jx3box/jx3box-common/js/system";

const FORBIDDEN_TAGS = [
    "script",
    "style",
    "iframe",
    "object",
    "embed",
    "link",
    "meta",
    "base",
    "form",
    "input",
    "button",
    "textarea",
];
const UNSAFE_PROTOCOL = /^(javascript|vbscript|data:text\/html):/i;

export function sanitizeArticleHtml(html) {
    if (!html) return "";

    const doc = new DOMParser().parseFromString(String(html), "text/html");
    const walk = (parent) => {
        Array.from(parent.children).forEach((el) => {
            if (FORBIDDEN_TAGS.includes(el.tagName.toLowerCase())) {
                el.remove();
                return;
            }
            Array.from(el.attributes).forEach(({ name, value }) => {
                if (name.toLowerCase().startsWith("on") || UNSAFE_PROTOCOL.test((value || "").replace(/\s+/g, ""))) {
                    el.removeAttribute(name);
                }
            });
            walk(el);
        });
    };

    walk(doc.body);
    return doc.body.innerHTML;
}

export default {
    data() {
        return {
            articleHtml: "",
            articleLoading: false,
            latestArticleId: 0,
        };
    },
    watch: {
        articleId: {
            handler(id) {
                this.articleHtml = "";
                if (!id) {
                    this.articleLoading = false;
                    return;
                }
                this.loadArticle(id);
            },
            immediate: true,
        },
    },
    methods: {
        loadArticle(id) {
            this.latestArticleId = id;
            this.articleLoading = true;
            getArticle(id)
                .then((html) => {
                    if (this.latestArticleId === id) {
                        this.articleHtml = sanitizeArticleHtml(html);
                    }
                })
                .catch(() => {
                    if (this.latestArticleId === id) {
                        this.articleHtml = "";
                    }
                })
                .finally(() => {
                    if (this.latestArticleId === id) {
                        this.articleLoading = false;
                    }
                });
        },
    },
};
