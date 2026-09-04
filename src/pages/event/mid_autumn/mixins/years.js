import { getBreadcrumb } from "@jx3box/jx3box-common/js/system";
export default {
    data () {
        return {
            years: [],
            yearsLoading: false,
            pickedYear: "",
        };
    },
    computed: {
        currentYear () {
            return this.pickedYear || (this.years.length ? this.years[0].year : "");
        },
    },
    created () {
        this.loadYears();
    },
    methods: {
        async loadYears () {
            this.yearsLoading = true;

            try {
                const res = await getBreadcrumb("mid_autumn_map");
                this.years = JSON.parse(res).reverse();
            } catch {
                this.years = [];
            }
            finally {
                this.yearsLoading = false;
            }
        },
        selectYear (year) {
            this.pickedYear = year;
        },
    },
};
