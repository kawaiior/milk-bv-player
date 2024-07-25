import {defineApi, defineApiTest} from "milkio";
import {getCookies} from "../../bilibili-api/data.ts";
import {getLoginInfo} from "../../bilibili-api/login.ts";

export const api = defineApi({
    meta: {
        //
    },
    async action(
        params: {

        },
        context,
    ) {
        const cookies = getCookies();

        return await getLoginInfo(cookies);
    },
});

export const test = defineApiTest(api, [
    {
        name: "Basic",
        handler: async (test) => {
            const result = await test.execute({
                params: {

                },
            });

            if (!result.success) return test.reject("The result was not success");
        },
    },
]);
