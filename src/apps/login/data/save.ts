import {defineApi, defineApiTest} from "milkio";
import path from "path";
import fs from "fs";
import {saveLoginCookie} from "../../../bilibili-api/data.ts";

export const api = defineApi({
    meta: {
        //
    },
    async action(
        params: {
            dui: string;
            duim: string;
            sessdata: string;
            jct: string;
        },
        context,
    ) {
        const cookieData = {
            DedeUserID: params.dui,
            DedeUserID__ckMd5: params.duim,
            SESSDATA: params.sessdata,
            bili_jct: params.jct,
        };

        return await saveLoginCookie(cookieData);
    },
});

export const test = defineApiTest(api, [
    {
        name: "Basic",
        handler: async (test) => {
            const result = await test.execute({
                params: {
                    dui: "",
                    duim: "",
                    sessdata: "",
                    jct: ""
                },
            });

            if (!result.success) return test.reject("The result was not success");
        },
    },
]);
