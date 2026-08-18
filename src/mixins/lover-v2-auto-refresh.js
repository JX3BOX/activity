const DEFAULT_AUTO_REFRESH_INTERVAL = 8000;

export default {
    data: function () {
        return {
            autoRefreshTimer: null,
            autoRefreshRunning: false,
        };
    },
    mounted() {
        document.addEventListener("visibilitychange", this.handleAutoRefreshVisibilityChange);
        this.scheduleAutoRefresh();
    },
    beforeUnmount() {
        document.removeEventListener("visibilitychange", this.handleAutoRefreshVisibilityChange);
        window.clearTimeout(this.autoRefreshTimer);
    },
    methods: {
        scheduleAutoRefresh() {
            window.clearTimeout(this.autoRefreshTimer);
            if (document.hidden || typeof this.refreshPollingData !== "function") return;
            const interval = Number(this.$options.autoRefreshInterval) || DEFAULT_AUTO_REFRESH_INTERVAL;
            this.autoRefreshTimer = window.setTimeout(this.runAutoRefresh, interval);
        },
        async runAutoRefresh() {
            window.clearTimeout(this.autoRefreshTimer);
            if (document.hidden || this.autoRefreshRunning) {
                this.scheduleAutoRefresh();
                return;
            }
            this.autoRefreshRunning = true;
            try {
                await this.refreshPollingData();
            } catch (error) {
                console.error(`[${this.$options.name || "LoverV2"}.autoRefresh]`, error);
            } finally {
                this.autoRefreshRunning = false;
                this.scheduleAutoRefresh();
            }
        },
        handleAutoRefreshVisibilityChange() {
            if (document.hidden) {
                window.clearTimeout(this.autoRefreshTimer);
                return;
            }
            this.runAutoRefresh();
        },
    },
};
