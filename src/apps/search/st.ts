import { defineApi, defineApiTest } from "milkio";
import {getSessData} from "../../bilibili-api/data.ts";
import {searchType} from "../../bilibili-api/search.ts";

type SearchOrderType = "totalrank" | "click" | "pubdate" | "dm" | "stow" | "scores" | "attention" | "online" |
	"live_time" | "0" | "fans" | "level";

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
			search_type: "video" | "live_room" | "article" | "bili_user";
			keyword: string;
			order: SearchOrderType;
			order_sort: number;
			user_type: number;
			duration: number;
			tids: number;
			category_id: number;
			page: number;
		},
		context,
	) {
		const sessdata: string = getSessData();

		return await searchType(
			params.search_type,
			params.keyword,
			params.order,
			params.order_sort,
			params.user_type,
			params.duration,
			params.tids,
			params.category_id,
			params.page,
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
					search_type: "video",
					keyword: "可莉姆船长",
					order: "totalrank",
					order_sort: 0,
					user_type: 0,
					duration: 0,
					tids: 0,
					category_id: 0,
					page: 1,
				},
			});

			if (!result.success) return test.reject("The result was not success");
		},
	},
]);
