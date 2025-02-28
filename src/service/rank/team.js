import { $team } from "@jx3box/jx3box-common/js/https.js";

function getMyTeams() {
    return $team().get(`/api/team/my-team`);
}

export { getMyTeams };
