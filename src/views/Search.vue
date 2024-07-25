<template>

  <a-scrollbar id="search-view-scrollbar">

    <div style="flex: 1;display: flex;flex-direction: column;">
      <div style="margin: 12px;display: flex;justify-content: center;">
        <a-input-search v-model="searchParams.keyword" placeholder="请输入关键词" @search="clickSearchButton" style="width: calc(100% - 36px); max-width: 500px; margin: 0 auto;"/>
      </div>

      <a-tabs v-model:active-key="searchParams.search_type" default-active-key="video" style="flex: 1;" lazy-load size="large">
        <a-tab-pane key="video">
          <template #title>
            <span class="a-tab-title">视频</span>
          </template>
          <div id="video-container">
            <div @click="goBv(video.bvid)" class="video-box" v-for="video in videoRenderList.result" :key="video.id" v-show="video.type==='video'">
              <div style="position: relative;">
                <img class="video-img" :src="video.pic" alt="封面">
                <div class="video-mask">
                  <div>
                    <span class="video-show-count"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="16" height="16" fill="#ffffff" class="bili-video-card__stats--icon"><!--[--><path d="M12 4.99805C9.48178 4.99805 7.283 5.12616 5.73089 5.25202C4.65221 5.33949 3.81611 6.16352 3.72 7.23254C3.60607 8.4998 3.5 10.171 3.5 11.998C3.5 13.8251 3.60607 15.4963 3.72 16.76355C3.81611 17.83255 4.65221 18.6566 5.73089 18.7441C7.283 18.8699 9.48178 18.998 12 18.998C14.5185 18.998 16.7174 18.8699 18.2696 18.74405C19.3481 18.65655 20.184 17.8328 20.2801 16.76405C20.394 15.4973 20.5 13.82645 20.5 11.998C20.5 10.16965 20.394 8.49877 20.2801 7.23205C20.184 6.1633 19.3481 5.33952 18.2696 5.25205C16.7174 5.12618 14.5185 4.99805 12 4.99805zM5.60965 3.75693C7.19232 3.62859 9.43258 3.49805 12 3.49805C14.5677 3.49805 16.8081 3.62861 18.3908 3.75696C20.1881 3.90272 21.6118 5.29278 21.7741 7.09773C21.8909 8.3969 22 10.11405 22 11.998C22 13.88205 21.8909 15.5992 21.7741 16.8984C21.6118 18.7033 20.1881 20.09335 18.3908 20.23915C16.8081 20.3675 14.5677 20.498 12 20.498C9.43258 20.498 7.19232 20.3675 5.60965 20.2392C3.81206 20.0934 2.38831 18.70295 2.22603 16.8979C2.10918 15.5982 2 13.8808 2 11.998C2 10.1153 2.10918 8.39787 2.22603 7.09823C2.38831 5.29312 3.81206 3.90269 5.60965 3.75693z" fill="currentColor"></path><path d="M14.7138 10.96875C15.50765 11.4271 15.50765 12.573 14.71375 13.0313L11.5362 14.8659C10.74235 15.3242 9.75 14.7513 9.75001 13.8346L9.75001 10.1655C9.75001 9.24881 10.74235 8.67587 11.5362 9.13422L14.7138 10.96875z" fill="currentColor"></path><!--]--></svg>
                      <span class="video-show-count-text">{{ formatNumber(video.play) }}</span>
                    </span>
                      <span class="video-danmu-count"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="16" height="16" fill="#ffffff" class="bili-video-card__stats--icon"><!--[--><path d="M12 4.99805C9.48178 4.99805 7.283 5.12616 5.73089 5.25202C4.65221 5.33949 3.81611 6.16352 3.72 7.23254C3.60607 8.4998 3.5 10.171 3.5 11.998C3.5 13.8251 3.60607 15.4963 3.72 16.76355C3.81611 17.83255 4.65221 18.6566 5.73089 18.7441C7.283 18.8699 9.48178 18.998 12 18.998C14.5185 18.998 16.7174 18.8699 18.2696 18.74405C19.3481 18.65655 20.184 17.8328 20.2801 16.76405C20.394 15.4973 20.5 13.82645 20.5 11.998C20.5 10.16965 20.394 8.49877 20.2801 7.23205C20.184 6.1633 19.3481 5.33952 18.2696 5.25205C16.7174 5.12618 14.5185 4.99805 12 4.99805zM5.60965 3.75693C7.19232 3.62859 9.43258 3.49805 12 3.49805C14.5677 3.49805 16.8081 3.62861 18.3908 3.75696C20.1881 3.90272 21.6118 5.29278 21.7741 7.09773C21.8909 8.3969 22 10.11405 22 11.998C22 13.88205 21.8909 15.5992 21.7741 16.8984C21.6118 18.7033 20.1881 20.09335 18.3908 20.23915C16.8081 20.3675 14.5677 20.498 12 20.498C9.43258 20.498 7.19232 20.3675 5.60965 20.2392C3.81206 20.0934 2.38831 18.70295 2.22603 16.8979C2.10918 15.5982 2 13.8808 2 11.998C2 10.1153 2.10918 8.39787 2.22603 7.09823C2.38831 5.29312 3.81206 3.90269 5.60965 3.75693z" fill="currentColor"></path><path d="M15.875 10.75L9.875 10.75C9.46079 10.75 9.125 10.4142 9.125 10C9.125 9.58579 9.46079 9.25 9.875 9.25L15.875 9.25C16.2892 9.25 16.625 9.58579 16.625 10C16.625 10.4142 16.2892 10.75 15.875 10.75z" fill="currentColor"></path><path d="M17.375 14.75L11.375 14.75C10.9608 14.75 10.625 14.4142 10.625 14C10.625 13.5858 10.9608 13.25 11.375 13.25L17.375 13.25C17.7892 13.25 18.125 13.5858 18.125 14C18.125 14.4142 17.7892 14.75 17.375 14.75z" fill="currentColor"></path><path d="M7.875 10C7.875 10.4142 7.53921 10.75 7.125 10.75L6.625 10.75C6.21079 10.75 5.875 10.4142 5.875 10C5.875 9.58579 6.21079 9.25 6.625 9.25L7.125 9.25C7.53921 9.25 7.875 9.58579 7.875 10z" fill="currentColor"></path><path d="M9.375 14C9.375 14.4142 9.03921 14.75 8.625 14.75L8.125 14.75C7.71079 14.75 7.375 14.4142 7.375 14C7.375 13.5858 7.71079 13.25 8.125 13.25L8.625 13.25C9.03921 13.25 9.375 13.5858 9.375 14z" fill="currentColor"></path><!--]--></svg>
                      <span class="video-danmu-count-text">{{ formatNumber(video.danmaku) }}</span>
                    </span>
                  </div>
                  <span class="video-size">{{ formatVideoDuration(video.duration) }}</span>
                </div>
              </div>
              <p class="video-title" v-html="video.title"></p>
              <div class="video-info">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" class="bili-video-card__info--owner__up"><!--[--><path d="M6.15 8.24805C6.5642 8.24805 6.9 8.58383 6.9 8.99805L6.9 12.7741C6.9 13.5881 7.55988 14.248 8.3739 14.248C9.18791 14.248 9.8478 13.5881 9.8478 12.7741L9.8478 8.99805C9.8478 8.58383 10.1836 8.24805 10.5978 8.24805C11.012 8.24805 11.3478 8.58383 11.3478 8.99805L11.3478 12.7741C11.3478 14.41655 10.01635 15.748 8.3739 15.748C6.73146 15.748 5.4 14.41655 5.4 12.7741L5.4 8.99805C5.4 8.58383 5.73578 8.24805 6.15 8.24805z" fill="currentColor"></path><path d="M12.6522 8.99805C12.6522 8.58383 12.98795 8.24805 13.4022 8.24805L15.725 8.24805C17.31285 8.24805 18.6 9.53522 18.6 11.123C18.6 12.71085 17.31285 13.998 15.725 13.998L14.1522 13.998L14.1522 14.998C14.1522 15.4122 13.8164 15.748 13.4022 15.748C12.98795 15.748 12.6522 15.4122 12.6522 14.998L12.6522 8.99805zM14.1522 12.498L15.725 12.498C16.4844 12.498 17.1 11.8824 17.1 11.123C17.1 10.36365 16.4844 9.74804 15.725 9.74804L14.1522 9.74804L14.1522 12.498z" fill="currentColor"></path><path d="M12 4.99805C9.48178 4.99805 7.283 5.12616 5.73089 5.25202C4.65221 5.33949 3.81611 6.16352 3.72 7.23254C3.60607 8.4998 3.5 10.171 3.5 11.998C3.5 13.8251 3.60607 15.4963 3.72 16.76355C3.81611 17.83255 4.65221 18.6566 5.73089 18.7441C7.283 18.8699 9.48178 18.998 12 18.998C14.5185 18.998 16.7174 18.8699 18.2696 18.74405C19.3481 18.65655 20.184 17.8328 20.2801 16.76405C20.394 15.4973 20.5 13.82645 20.5 11.998C20.5 10.16965 20.394 8.49877 20.2801 7.23205C20.184 6.1633 19.3481 5.33952 18.2696 5.25205C16.7174 5.12618 14.5185 4.99805 12 4.99805zM5.60965 3.75693C7.19232 3.62859 9.43258 3.49805 12 3.49805C14.5677 3.49805 16.8081 3.62861 18.3908 3.75696C20.1881 3.90272 21.6118 5.29278 21.7741 7.09773C21.8909 8.3969 22 10.11405 22 11.998C22 13.88205 21.8909 15.5992 21.7741 16.8984C21.6118 18.7033 20.1881 20.09335 18.3908 20.23915C16.8081 20.3675 14.5677 20.498 12 20.498C9.43258 20.498 7.19232 20.3675 5.60965 20.2392C3.81206 20.0934 2.38831 18.70295 2.22603 16.8979C2.10918 15.5982 2 13.8808 2 11.998C2 10.1153 2.10918 8.39787 2.22603 7.09823C2.38831 5.29312 3.81206 3.90269 5.60965 3.75693z" fill="currentColor"></path></svg>
                <span>{{ video.author }} · {{ formatTimestamp(video.pubdate) }}</span>
              </div>
            </div>
          </div>
          <div v-if="videoRenderList.result.length===0">
            <a-empty />
          </div>
          <a-pagination v-if="videoRenderList.result.length!==0"
                        v-model:current="searchParams.search_page"
                        v-model:page-size="searchParams.search_page_size"
                        :total="videoRenderList.numResults"
                        show-page-size
                        @change="clickSearchButton"
          />
        </a-tab-pane>
        <a-tab-pane key="live_room">
          <template #title>
            <span class="a-tab-title">直播</span>
          </template>
        </a-tab-pane>
        <a-tab-pane key="article">
          <template #title>
            <span class="a-tab-title">专栏</span>
          </template>
        </a-tab-pane>
        <a-tab-pane key="bili_user">
          <template #title>
            <span class="a-tab-title">用户</span>
          </template>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-scrollbar>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {client} from "../utils/client.ts";
import {Message} from "@arco-design/web-vue";
import {formatNumber} from "../utils/number_util.ts";
import {formatTimestamp, formatVideoDuration} from "../utils/time_util.ts";
import {useRouter} from "vue-router";

const searchParams = ref({
  keyword: "",
  search_type: "video",
  search_order: "totalrank",
  search_order_sort: 0,
  user_type: 0,
  search_duration: 0,
  search_tids: 0,
  category_id: 0,
  search_page: 1,
  search_page_size: 20
})

// const searchPageSize = ref(20);

// 视频列表
const videoRenderList = ref({
  numPages: 1,
  numResults: 1,
  result: []
})

// 直播列表
const liveRenderList = ref({

})
// 专栏列表
const articleRenderList = ref({

})
// 用户列表
const userRenderList = ref({

})

const router = useRouter();

const goBv = async (bv) => {
  await router.push(`/video/${bv}`);
}

const searchAll = async (_keyword) => {
  const response = await client.execute("search/all", {
    params: {
      keyword: _keyword
    }
  });
}

const clickSearchButton = async () => {
  if (searchParams.value.keyword === "") {
    Message.warning("请输入关键词")
    return;
  }

  console.log(searchParams.value)

  const response = await client.execute("search/st", {
    params: {
      search_type: searchParams.value.search_type,
      keyword: searchParams.value.keyword,
      order: searchParams.value.search_order,
      order_sort: searchParams.value.search_order_sort,
      user_type: searchParams.value.user_type,
      duration: searchParams.value.search_duration,
      tids: searchParams.value.search_tids,
      category_id: searchParams.value.category_id,
      page: searchParams.value.search_page,
      page_size: searchParams.value.search_page_size
    }
  });

  console.log(response);

  if (searchParams.value.search_type === "video"){
    videoRenderList.value = {
      numPages: response.data.data.numPages,
      numResults: response.data.data.numResults,
      result: response.data.data.result
    }
  }
}

// 数据缓存
const saveData = () => {
  sessionStorage.setItem("searchParams", JSON.stringify(searchParams.value));
  sessionStorage.setItem("videoRenderList", JSON.stringify(videoRenderList.value));
  sessionStorage.setItem("liveRenderList", JSON.stringify(liveRenderList.value));
  sessionStorage.setItem("articleRenderList", JSON.stringify(articleRenderList.value));
  sessionStorage.setItem("userRenderList", JSON.stringify(userRenderList.value));
}

const loadData = () => {
  const _searchParams = sessionStorage.getItem("searchParams");
  if (_searchParams) {
    searchParams.value = JSON.parse(_searchParams);
  }

  const _videoRenderList = sessionStorage.getItem("videoRenderList");
  if (_videoRenderList) {
    videoRenderList.value = JSON.parse(_videoRenderList);
  }

  const _liveRenderList = sessionStorage.getItem("liveRenderList");
  if (_liveRenderList) {
    liveRenderList.value = JSON.parse(_liveRenderList);
  }

  const _articleRenderList = sessionStorage.getItem("articleRenderList");
  if (_articleRenderList) {

    articleRenderList.value = JSON.parse(_articleRenderList);
  }

  const _userRenderList = sessionStorage.getItem("userRenderList");
  if (_userRenderList) {
    userRenderList.value = JSON.parse(_userRenderList);
  }
}

onMounted(async () => {
  loadData()
})

onUnmounted(async () => {
  saveData()
})

</script>

<style>
#search-view-scrollbar{
  flex: 1;
  height: 100vh;
  overflow: auto;
}

.keyword{
  color: #f25d8e!important;
  font-style: normal;
}
</style>

<style scoped>

.a-tab-title{
  padding: 0 12px;
}

.arco-scrollbar{
  flex: 1;
  overflow: hidden;
}

#video-container {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.video-box {
  margin: 8px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.video-img{
  width: var(--index-video-width);
  height: var(--index-video-height);
  object-fit: inherit;
  border-radius: 6px;
  margin-bottom: 10px;
}

.video-mask{
  position: absolute;
  z-index: 999;
  bottom: 10px;
  display: flex;
  width: 100%;
  height: 25%;
  justify-content: space-between;
  color: white;
  font-size: 13px;

  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .8) 100%);
}

.video-mask>div{
  display: flex;
  align-items: flex-end;
  position: relative;
  top: -6px;
}

.video-show-count{
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.video-show-count-text{
  margin-left: 2px;
}

.video-danmu-count{
  display: flex;
  align-items: center;
  margin-left: 12px;
}

.video-danmu-count-text{
  margin-left: 2px;
}

.video-size{
  display: flex;
  align-items: flex-end;
  margin-right: 8px;

  position: relative;
  top: -6px;
}

.video-title {
  width: var(--index-video-width);
  display: block;
  height: 2.1rem;
  font-weight: 500;
  color: #18191C;
  font-family: PingFang SC, HarmonyOS_Medium, Helvetica Neue, Microsoft YaHei, sans-serif;
  margin: 0 0 6px 0;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 显示的行数，可以根据需要修改 */
  overflow: hidden;
  text-overflow: ellipsis;

  transition: .2s;
}

.video-title:hover{
  color: #00AEEC;
}

.video-info{
  font-size: 13px;
  color: #9499A0;
  display: flex;
  align-items: center;

  transition: .2s;
}

.video-info>span{
  position: relative;
  top: -1px;
  margin-left: 6px;
}

.video-info:hover{
  color: #00AEEC;
}

#fresh-recommend{
  margin: 24px 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

</style>
