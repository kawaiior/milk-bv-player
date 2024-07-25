import {defineApi, defineApiTest} from "milkio";
import {checkLoginStatus} from "../../../bilibili-api/login.ts";

export const api = defineApi({
    meta: {
        //
    },
    async action(
        params: {
            qrcode_key: string;
        },
        context,
    ) {
        return await checkLoginStatus(params.qrcode_key);
    },
});

export const test = defineApiTest(api, [
    {
        name: "Basic",
        handler: async (test) => {
            const result = await test.execute({
                params: {
                    qrcode_key: "test",
                },
            });

            if (!result.success) return test.reject("The result was not success");
        },
    },
]);
