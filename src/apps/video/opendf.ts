import { defineApi, defineApiTest } from "milkio";
import {openDownloadFolder} from "../../utils/file_util.ts";

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

        },
        context,
    ) {
        await openDownloadFolder();
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
