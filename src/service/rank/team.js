import { $team } from "@jx3box/jx3box-common/js/api.js";

function getMyTeams() {
    return $team().get(`/api/team/my-team`);
}

export { getMyTeams };
