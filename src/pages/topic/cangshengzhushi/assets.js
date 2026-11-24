export const asset = (name) => `https://cdn.jx3box.com/design/topic/cangshengzhushi/${name}`;

export const chapters = ["50级新世代", "新地图上线", "PVE新秘境", "PVP新改革", "PVX新圈子"];
export const chapterIds = ["journey", "maps", "dungeons", "pvp", "pvx"];

// Keep section navigation inside the page without changing the hash router.
export function scrollToChapter(id) {
    document.getElementById(id)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
    });
}
