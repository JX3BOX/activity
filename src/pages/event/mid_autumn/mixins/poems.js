import { getProgramDetail } from "@/service/event/vote";
import { shuffle } from "lodash";
import { normalizeAvatar } from "../components_app/poemCommon";

export default {
    data() {
        return {
            list: [],
            loading: false,
            latestProgramId: 0,
        };
    },
    watch: {
        voteId: {
            handler(id) {
                this.list = [];
                if (!id) {
                    this.loading = false;
                    return;
                }
                this.loadPoems(id);
            },
            immediate: true,
        },
    },
    methods: {
        loadPoems(id) {
            this.latestProgramId = id;
            this.loading = true;
            getProgramDetail(id)
                .then((res) => {
                    if (this.latestProgramId !== id) return;

                    this.list = shuffle(res?.data?.data?.vote_items || []).map((item) => {
                        const info = item.user_info || (item.user_info = {});
                        info.avatar = normalizeAvatar(info.avatar || info.user_avatar);
                        return item;
                    });
                })
                .catch(() => {
                    if (this.latestProgramId === id) {
                        this.list = [];
                    }
                })
                .finally(() => {
                    if (this.latestProgramId === id) {
                        this.loading = false;
                    }
                });
        },
    },
};
