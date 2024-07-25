import { defineApi, defineApiTest } from "milkio";
import {getSessData} from "../../bilibili-api/data.ts";
import {getUserCard} from "../../bilibili-api/user.ts";

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
            photo: boolean;
        },
        context,
    ) {
        const sessdata: string = getSessData();

        return await getUserCard(params.mid, params.photo, sessdata)
    },
});

export const test = defineApiTest(api, [
    {
        name: "Basic",
        handler: async (test) => {
            const result = await test.execute({
                params: {
                    mid: 367877,
                    photo: false
                },
            });

            if (!result.success) return test.reject("The result was not success");
        },
    },
]);
