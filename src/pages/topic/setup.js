import {  isApp } from "@jx3box/jx3box-common/js/utils";

/**
 * Initialize topic page environment
 * Handles viewport for mobile/app and sets localStorage for app environment
 */
export function initTopicEnv() {
    if (isApp()) {
        localStorage.setItem("__env", "app");
    }
}
