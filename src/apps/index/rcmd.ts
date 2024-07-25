import {defineApi, defineApiTest} from "milkio";
import {getSessData} from "../../bilibili-api/data.ts";
import {getRcmdVideoList} from "../../bilibili-api/video.ts";

/**
 * 获取首页推荐视频
 * fresh_type: 相关性 默认为3 值越大推荐内容越相关
 * version: web端新旧版本:0为旧版本1为新版本
 * ps: page size 单页返回的记录条数默认为10或8
 * fresh_idx: 翻页相关，疑似为页码
 * fresh_idx_1h: 翻页相关，暂不清楚具体意义
 */
export const api = defineApi({
    meta: {
        //
    },
    async action(
        params: {
            fresh_type: number;
            version: number;
            ps: number;
            fresh_idx: number;
            fresh_idx_1h: number;
        },
        context,
    ) {
        const sessdata: string = getSessData();

        return await getRcmdVideoList(
            params.fresh_type,
            params.version,
            params.ps,
            params.fresh_idx,
            params.fresh_idx_1h,
            sessdata
        );
    },
});

export const test = defineApiTest(api, [
    {
        name: "Basic",
        handler: async (test) => {
            const result = await test.execute({
                params: {
                    fresh_type: 3,
                    version: 1,
                    ps: 8,
                    fresh_idx: 1,
                    fresh_idx_1h: 1
                },
            });

            if (!result.success) return test.reject("The result was not success");
        },
    },
]);
