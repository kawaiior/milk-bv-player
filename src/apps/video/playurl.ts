import { defineApi, defineApiTest } from "milkio";
import {getSessData} from "../../bilibili-api/data.ts";
import {getVideoPlayUrl} from "../../bilibili-api/video.ts";

/**
 * This is an API that greets you!
 * 🌟 These ~~comments~~ will be presented by the **Cookbook**
 */
export const api = defineApi({
    meta: {
        //
    },
    async action(
        params: {
            aid: number;
            bvid: string;
            cid: number;
        },
        context,
    ) {
        const sessdata: string = getSessData();
        return await getVideoPlayUrl(params.aid, params.bvid, params.cid, sessdata);
    },
});

export const test = defineApiTest(api, [
    {
        name: "Basic",
        handler: async (test) => {
            const result = await test.execute({
                params: {
                    aid: 1152544585,
                    bvid: "BV1dZ421q7tb",
                    cid: 1493104552,
                },
            });

            if (!result.success) return test.reject("The result was not success");
        },
    },
]);
