import { __cdn } from "@/utils/config";

// 统一复用 2026 素材，仅未选中的深色按钮按年份调色。
const buttonRoot = `${__cdn}design/event/mid_autumn/2026/phone/`;
const filters = {
    2024: "hue-rotate(65deg) saturate(0.7)",
    2025: "grayscale(1) sepia(0.7) hue-rotate(200deg) saturate(2.5) brightness(1)",
};

export default {
    computed: {
        buttonThemeStyle() {
            return {
                "--tab-inactive-filter": filters[this.year] || "none",
                "--home-button-background": `url('${buttonRoot}button1.png')`,
                "--tab-active-background": `url('${buttonRoot}button2.2.png')`,
                "--tab-inactive-background": `url('${buttonRoot}button2.1.png')`,
            };
        },
    },
};
