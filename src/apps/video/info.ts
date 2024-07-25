import { defineApi, defineApiTest } from "milkio";
import {getSessData} from "../../bilibili-api/data.ts";
import {getVideoInfo} from "../../bilibili-api/video.ts";

/**
 * 获取视频基本信息
 *
 */
export const api = defineApi({
    meta: {
        //
    },
    async action(
        params: {
            bvid: string;
        },
        context,
    ) {
        const sessdata: string = getSessData();
        return await getVideoInfo(params.bvid, sessdata);
    },
});

export const test = defineApiTest(api, [
    {
        name: "Basic",
        handler: async (test) => {
            const result = await test.execute({
                params: {
                    bvid: "BV1dZ421q7tb",
                },
            });

            if (!result.success) return test.reject("The result was not success");
        },
    },
]);
