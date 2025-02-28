// import axios from 'axios'
import { $cms } from "@jx3box/jx3box-common/js/https";

function getEventAc(id) {
    return $cms().get(`/api/cms/post/${id}`).then((res) => {
        return res?.data?.data?.post_content
    })
}

export { getEventAc }
