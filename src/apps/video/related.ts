import {defineApi, defineApiTest} from "milkio";
import {getSessData} from "../../bilibili-api/data.ts";
import {getRelatedVideoList} from "../../bilibili-api/video.ts";

/**
 * 获取单视频推荐列表
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

        return await getRelatedVideoList(params.bvid, sessdata);
    },
});

export const test = defineApiTest(api, [
    {
        name: "Basic",
        handler: async (test) => {
            const result = await test.execute({
                params: {
                    bvid: "BV1b4421U7JC",
                },
            });

            if (!result.success) return test.reject("The result was not success");
        },
    },
]);
