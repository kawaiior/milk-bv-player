import {defineApi, defineApiTest} from "milkio";
import {getRawCookies} from "../../../bilibili-api/data.ts";

export const api = defineApi({
    meta: {
        //
    },
    async action(
        params: {

        },
        context,
    ) {
        return getRawCookies();
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
