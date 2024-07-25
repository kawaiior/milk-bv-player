import { defineApi, defineApiTest } from "milkio";
import type typia from "typia";
import {getSessData} from "../../bilibili-api/data.ts";
import {searchAll} from "../../bilibili-api/search.ts";

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
			keyword: string;
		},
		context,
	) {
		const sessdata: string = getSessData();

		return await searchAll(params.keyword, sessdata);
	},
});

export const test = defineApiTest(api, [
	{
		name: "Basic",
		handler: async (test) => {
			const result = await test.execute({
				params: {
					keyword: "可莉姆船长",
				},
			});

			if (!result.success) return test.reject("The result was not success");
		},
	},
]);
