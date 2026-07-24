import { $cms } from "@jx3box/jx3box-common/js/api";

export const getPz = (id) => $cms({ mute: true }).get(`/api/cms/app/pz/${id}`);
