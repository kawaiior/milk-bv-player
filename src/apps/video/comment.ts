import { defineApi, defineApiTest } from "milkio";
import {getCookies} from "../../bilibili-api/data.ts";
import {getVideoComment} from "../../bilibili-api/video.ts";

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
            sort: number;
            nohot: number;
            ps: number;
            pn: number;
        },
        context,
    ) {
        const cookie = getCookies();
        return await getVideoComment(params.aid, params.sort, params.nohot, params.ps, params.pn, cookie);
    },
});

export const test = defineApiTest(api, [
    {
        name: "Basic",
        handler: async (test) => {
            const result = await test.execute({
                params: {
                    aid: 1152544585,
                    sort: 0,
                    nohot: 0,
                    ps: 20,
                    pn: 1,
                },
            });

            if (!result.success) return test.reject("The result was not success");
        },
    },
]);
