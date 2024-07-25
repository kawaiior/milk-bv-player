import { defineApi, defineApiTest } from "milkio";
import {getSessData} from "../../bilibili-api/data.ts";
import {getUserInfo} from "../../bilibili-api/user.ts";

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
            mid: number;
        },
        context,
    ) {
        const sessdata: string = getSessData();

        return await getUserInfo(params.mid, sessdata)
    },
});

export const test = defineApiTest(api, [
    {
        name: "Basic",
        handler: async (test) => {
            const result = await test.execute({
                params: {
                    mid: 367877,
                },
            });

            if (!result.success) return test.reject("The result was not success");
        },
    },
]);
