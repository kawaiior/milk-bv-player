<template>
  <audio style="position: absolute;top: 0;opacity: 0;" ref="audioDom" id="audio-item" :src="audioUrl"></audio>

  <a-scrollbar id="video-view-scrollbar">
    <div style="flex-direction: column;flex: 1;">
      <a-space style="height: 32px;margin: 12px 12px 4px 0">
        <a-button @click="goIndex">返回首页</a-button>
        <a-button @click="goBack">返回上一级</a-button>

        <a-button @click="downloadVideo" :loading="videoDownloading">下载视频</a-button>
        <a-button @click="openDownloadFolder">打开下载文件夹</a-button>
      </a-space>
      <div style="display: flex;flex: 1;position: relative;">
        <div id="left-container">

          <div style="height: 28px;margin: 13px 0;width: 100%;position: relative;">
            <p id="video-title">{{ videoInfo.title }}</p>
          </div>

          <div id="video-info">
            <span class="video-show-count"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="20" height="20" fill="#ffffff" class="bili-video-card__stats--icon"><!--[--><path d="M12 4.99805C9.48178 4.99805 7.283 5.12616 5.73089 5.25202C4.65221 5.33949 3.81611 6.16352 3.72 7.23254C3.60607 8.4998 3.5 10.171 3.5 11.998C3.5 13.8251 3.60607 15.4963 3.72 16.76355C3.81611 17.83255 4.65221 18.6566 5.73089 18.7441C7.283 18.8699 9.48178 18.998 12 18.998C14.5185 18.998 16.7174 18.8699 18.2696 18.74405C19.3481 18.65655 20.184 17.8328 20.2801 16.76405C20.394 15.4973 20.5 13.82645 20.5 11.998C20.5 10.16965 20.394 8.49877 20.2801 7.23205C20.184 6.1633 19.3481 5.33952 18.2696 5.25205C16.7174 5.12618 14.5185 4.99805 12 4.99805zM5.60965 3.75693C7.19232 3.62859 9.43258 3.49805 12 3.49805C14.5677 3.49805 16.8081 3.62861 18.3908 3.75696C20.1881 3.90272 21.6118 5.29278 21.7741 7.09773C21.8909 8.3969 22 10.11405 22 11.998C22 13.88205 21.8909 15.5992 21.7741 16.8984C21.6118 18.7033 20.1881 20.09335 18.3908 20.23915C16.8081 20.3675 14.5677 20.498 12 20.498C9.43258 20.498 7.19232 20.3675 5.60965 20.2392C3.81206 20.0934 2.38831 18.70295 2.22603 16.8979C2.10918 15.5982 2 13.8808 2 11.998C2 10.1153 2.10918 8.39787 2.22603 7.09823C2.38831 5.29312 3.81206 3.90269 5.60965 3.75693z" fill="currentColor"></path><path d="M14.7138 10.96875C15.50765 11.4271 15.50765 12.573 14.71375 13.0313L11.5362 14.8659C10.74235 15.3242 9.75 14.7513 9.75001 13.8346L9.75001 10.1655C9.75001 9.24881 10.74235 8.67587 11.5362 9.13422L14.7138 10.96875z" fill="currentColor"></path><!--]--></svg>
              <span class="video-show-count-text">{{ formatNumber(videoInfo.stat.view) }}</span>
            </span>
            <span class="video-danmu-count"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="20" height="20" fill="#ffffff" class="bili-video-card__stats--icon"><!--[--><path d="M12 4.99805C9.48178 4.99805 7.283 5.12616 5.73089 5.25202C4.65221 5.33949 3.81611 6.16352 3.72 7.23254C3.60607 8.4998 3.5 10.171 3.5 11.998C3.5 13.8251 3.60607 15.4963 3.72 16.76355C3.81611 17.83255 4.65221 18.6566 5.73089 18.7441C7.283 18.8699 9.48178 18.998 12 18.998C14.5185 18.998 16.7174 18.8699 18.2696 18.74405C19.3481 18.65655 20.184 17.8328 20.2801 16.76405C20.394 15.4973 20.5 13.82645 20.5 11.998C20.5 10.16965 20.394 8.49877 20.2801 7.23205C20.184 6.1633 19.3481 5.33952 18.2696 5.25205C16.7174 5.12618 14.5185 4.99805 12 4.99805zM5.60965 3.75693C7.19232 3.62859 9.43258 3.49805 12 3.49805C14.5677 3.49805 16.8081 3.62861 18.3908 3.75696C20.1881 3.90272 21.6118 5.29278 21.7741 7.09773C21.8909 8.3969 22 10.11405 22 11.998C22 13.88205 21.8909 15.5992 21.7741 16.8984C21.6118 18.7033 20.1881 20.09335 18.3908 20.23915C16.8081 20.3675 14.5677 20.498 12 20.498C9.43258 20.498 7.19232 20.3675 5.60965 20.2392C3.81206 20.0934 2.38831 18.70295 2.22603 16.8979C2.10918 15.5982 2 13.8808 2 11.998C2 10.1153 2.10918 8.39787 2.22603 7.09823C2.38831 5.29312 3.81206 3.90269 5.60965 3.75693z" fill="currentColor"></path><path d="M15.875 10.75L9.875 10.75C9.46079 10.75 9.125 10.4142 9.125 10C9.125 9.58579 9.46079 9.25 9.875 9.25L15.875 9.25C16.2892 9.25 16.625 9.58579 16.625 10C16.625 10.4142 16.2892 10.75 15.875 10.75z" fill="currentColor"></path><path d="M17.375 14.75L11.375 14.75C10.9608 14.75 10.625 14.4142 10.625 14C10.625 13.5858 10.9608 13.25 11.375 13.25L17.375 13.25C17.7892 13.25 18.125 13.5858 18.125 14C18.125 14.4142 17.7892 14.75 17.375 14.75z" fill="currentColor"></path><path d="M7.875 10C7.875 10.4142 7.53921 10.75 7.125 10.75L6.625 10.75C6.21079 10.75 5.875 10.4142 5.875 10C5.875 9.58579 6.21079 9.25 6.625 9.25L7.125 9.25C7.53921 9.25 7.875 9.58579 7.875 10z" fill="currentColor"></path><path d="M9.375 14C9.375 14.4142 9.03921 14.75 8.625 14.75L8.125 14.75C7.71079 14.75 7.375 14.4142 7.375 14C7.375 13.5858 7.71079 13.25 8.125 13.25L8.625 13.25C9.03921 13.25 9.375 13.5858 9.375 14z" fill="currentColor"></path><!--]--></svg><span class="video-danmu-count-text">{{ formatNumber(videoInfo.stat.danmaku) }}</span>
            </span>
            <span style="position: relative;top: -3px;margin-left: 16px;">{{ getAccurateTime(videoInfo.pubdate) }}</span>
          </div>
          <div ref="videoContainer" id="video-container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
            <video ref="videoDom" id="video-item" :src="videoUrl"
                     @timeupdate="updateProgress"
                     @ended="videoPlayEnd"
                     @loadeddata="onVideoLoad"
                     @click="playPause"
            >

            </video>

            <div ref="controlPanel" class="control-panel" :class="{ visible: isControlVisible }">
              <div style="cursor: pointer;top: -3px;position: absolute;left: 12px;right: 12px;margin: 0;padding: 0;width: auto;" @click="clickVideoProgressBar">
                <div ref="progressBarBackRef" id="video-progress-back"></div>
                <div ref="progressBarRef" id="video-progress" :style="{width: progress + '%'}"></div>
              </div>

              <div style="display: flex;align-items: center;">
                <div style="font-size: 24px;cursor:pointer;" @click="playPause">
                  <icon-pause v-if="isPlaying"/>
                  <icon-play-arrow v-else/>
                </div>

                <span style="font-size: 13px;margin-left: 12px;">
                  {{ formatSecondTime(videoSecond) }} / {{ formatSecondTime(videoDuration) }}
                </span>
              </div>

              <div>
                <div style="font-size: 24px;">
                  <icon-fullscreen-exit v-if="videoFullScreen" @click="videoOffFullScreen" />
                  <icon-fullscreen v-else @click="videoShowFullScreen" />
                </div>
              </div>

            </div>
          </div>

          <div style="height: 46px;box-shadow: 0 0 8px #F1F2F3;display: flex;align-items: center;">
            <span>弹幕工具栏 待实现</span>
          </div>

          <div id="video-action-container">

            <div class="video-action-inner">
              <svg width="28" height="28" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" class="video-like-icon video-toolbar-item-icon">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.77234 30.8573V11.7471H7.54573C5.50932 11.7471 3.85742 13.3931 3.85742 15.425V27.1794C3.85742 29.2112 5.50932 30.8573 7.54573 30.8573H9.77234ZM11.9902 30.8573V11.7054C14.9897 10.627 16.6942 7.8853 17.1055 3.33591C17.2666 1.55463 18.9633 0.814421 20.5803 1.59505C22.1847 2.36964 23.243 4.32583 23.243 6.93947C23.243 8.50265 23.0478 10.1054 22.6582 11.7471H29.7324C31.7739 11.7471 33.4289 13.402 33.4289 15.4435C33.4289 15.7416 33.3928 16.0386 33.3215 16.328L30.9883 25.7957C30.2558 28.7683 27.5894 30.8573 24.528 30.8573H11.9911H11.9902Z" fill="currentColor"></path>
              </svg>
              <span>{{ videoInfo.stat.like }}</span>
            </div>

            <div class="video-action-inner">
              <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" class="video-coin-icon video-toolbar-item-icon" data-v-331e415b="">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.045 25.5454C7.69377 25.5454 2.54504 20.3967 2.54504 14.0454C2.54504 7.69413 7.69377 2.54541 14.045 2.54541C20.3963 2.54541 25.545 7.69413 25.545 14.0454C25.545 17.0954 24.3334 20.0205 22.1768 22.1771C20.0201 24.3338 17.095 25.5454 14.045 25.5454ZM9.66202 6.81624H18.2761C18.825 6.81624 19.27 7.22183 19.27 7.72216C19.27 8.22248 18.825 8.62807 18.2761 8.62807H14.95V10.2903C17.989 10.4444 20.3766 12.9487 20.3855 15.9916V17.1995C20.3854 17.6997 19.9799 18.1052 19.4796 18.1052C18.9793 18.1052 18.5738 17.6997 18.5737 17.1995V15.9916C18.5667 13.9478 16.9882 12.2535 14.95 12.1022V20.5574C14.95 21.0577 14.5444 21.4633 14.0441 21.4633C13.5437 21.4633 13.1382 21.0577 13.1382 20.5574V12.1022C11.1 12.2535 9.52148 13.9478 9.51448 15.9916V17.1995C9.5144 17.6997 9.10883 18.1052 8.60856 18.1052C8.1083 18.1052 7.70273 17.6997 7.70265 17.1995V15.9916C7.71158 12.9487 10.0992 10.4444 13.1382 10.2903V8.62807H9.66202C9.11309 8.62807 8.66809 8.22248 8.66809 7.72216C8.66809 7.22183 9.11309 6.81624 9.66202 6.81624Z" fill="currentColor"></path>
              </svg>
              <span>{{ videoInfo.stat.coin }}</span>
            </div>

            <div class="video-action-inner">
              <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" class="video-fav-icon video-toolbar-item-icon" data-v-b42ec39c="">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8071 9.26152C18.7438 9.09915 17.7624 8.36846 17.3534 7.39421L15.4723 3.4972C14.8998 2.1982 13.1004 2.1982 12.4461 3.4972L10.6468 7.39421C10.1561 8.36846 9.25639 9.09915 8.19315 9.26152L3.94016 9.91102C2.63155 10.0734 2.05904 11.6972 3.04049 12.6714L6.23023 15.9189C6.96632 16.6496 7.29348 17.705 7.1299 18.7605L6.39381 23.307C6.14844 24.6872 7.62063 25.6614 8.84745 25.0119L12.4461 23.0634C13.4276 22.4951 14.6544 22.4951 15.6359 23.0634L19.2345 25.0119C20.4614 25.6614 21.8518 24.6872 21.6882 23.307L20.8703 18.7605C20.7051 17.705 21.0339 16.6496 21.77 15.9189L24.9597 12.6714C25.9412 11.6972 25.3687 10.0734 24.06 9.91102L19.8071 9.26152Z" fill="currentColor"></path>
              </svg>
              <span>{{ videoInfo.stat.favorite }}</span>
            </div>

            <div class="video-action-inner">
              <svg data-v-e5c2b51c="" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" class="video-share-icon video-toolbar-item-icon">
                <path d="M12.6058 10.3326V5.44359C12.6058 4.64632 13.2718 4 14.0934 4C14.4423 4 14.78 4.11895 15.0476 4.33606L25.3847 12.7221C26.112 13.3121 26.2087 14.3626 25.6007 15.0684C25.5352 15.1443 25.463 15.2144 25.3847 15.2779L15.0476 23.6639C14.4173 24.1753 13.4791 24.094 12.9521 23.4823C12.7283 23.2226 12.6058 22.8949 12.6058 22.5564V18.053C7.59502 18.053 5.37116 19.9116 2.57197 23.5251C2.47607 23.6489 2.00031 23.7769 2.00031 23.2122C2.00031 16.2165 3.90102 10.3326 12.6058 10.3326Z" fill="currentColor"></path>
              </svg>
              <span>{{ videoInfo.stat.share }}</span>
            </div>

          </div>

          <div style="margin: 16px 0;border-bottom: 1px solid #E3E5E7;">
            <div id="video-desc-container" style="max-height: 84px;overflow: hidden;">
              <span id="video-desc-span">{{ videoInfo.desc }}</span>
            </div>
            <div @click="clickShowVideoDescSpan" style="margin: 10px 0;font-size: 13px;line-height: 18px;">
              <span class="primary-click-span" style="cursor: pointer;color: #61666D;">
                {{ showVideoDescAuto ? "收起" : "展开更多" }}
              </span>
            </div>

          </div>


          <div>
            <a-comment
                v-for="comment in videoCommentList"
                :author="comment.uname"
                :avatar="comment.member.avatar"
                :content="comment.content.message"
                :datetime="comment.reply_control.time_desc"
                style="border-bottom: 1px solid #E3E5E7;padding-bottom: 12px;"
            >
            </a-comment>
            <a-button style="margin: 12px;" @click="loadMoreVideoComment">加载更多</a-button>
          </div>

        </div>

        <div id="right-container">
          <div style="display: flex;margin-bottom: 8px;">
            <img style="height: 72px;width: 72px;border-radius: 50%;object-fit: cover;" :src="videoInfo.owner.face" alt="头像">

            <div style="display: flex;flex-direction: column;flex: 1;position: relative;padding-left: 12px;width: 266px;">
              <span style="font-size: 15px;">{{ videoInfo.owner.name }}</span>
              <span style="margin: 4px 0;font-size: 13px;color: #9499A0;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ authorInfo.card.sign }}</span>
              <div style="flex: 1;display: flex;">
                <a-button type="primary" class="bili-primary-button">+ 关注 {{ formatNumber(authorInfo.follower) }}</a-button>
              </div>
            </div>
          </div>
          <div v-if="videoInfo.pages.length>1" style="margin: 12px 0;padding: 16px 6px 0 6px;background-color: #F1F2F3;border-radius: 4px;">
            <div style="padding: 0 10px;margin-bottom: 8px;">
              <span style="color: #18191C;margin-right: 4px;">视频选集</span>
              <span style="color: #9499A0;font-size: 12px;">({{ videoPage }}/{{ videoInfo.pages.length }})</span>
            </div>
            <a-scrollbar style="font-size: 13px;max-height: 400px;overflow: auto;">
              <div @click="clickOtherVideo('', item.page-1)"
                   v-for="item in videoInfo.pages"
                   :key="item.page"
                   class="video-part-item"
                   :style="{backgroundColor: item.page-1 === videoPage ? '#FFFFFF' : ''}"
              >
                <div :style="{color: item.page-1 === videoPage ? '#00AEEC' : '#18191C',}">
                  <img :style="{display: item.page-1 === videoPage ? '' : 'none'}"
                       class="video-part-playing"
                       src="//i0.hdslb.com/bfs/static/jinkela/video/asserts/playing.gif"
                       alt="播放中"
                  >
                  <span style="margin-right: 10px;">P{{ item.page }}</span>
                  <span>{{ item.part }}</span>
                </div>
                <span style="color: #9499A0">{{ formatSecondTime(item.duration) }}</span>
              </div>
            </a-scrollbar>
          </div>
          <div class="related-video-container" v-for="item in relatedVideoList" :key="item.aid">
            <img @click="clickOtherVideo(item.bvid)" class="related-video-img" :src="item.pic" alt="视频封面">
            <div class="related-video-info">
              <p @click="clickOtherVideo(item.bvid)" class="related-video-title">{{ item.title }}</p>
              <div class="related-video-info-bottom">
                <div class="related-video-author-container">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" class="bili-video-card__info--owner__up"><!--[--><path d="M6.15 8.24805C6.5642 8.24805 6.9 8.58383 6.9 8.99805L6.9 12.7741C6.9 13.5881 7.55988 14.248 8.3739 14.248C9.18791 14.248 9.8478 13.5881 9.8478 12.7741L9.8478 8.99805C9.8478 8.58383 10.1836 8.24805 10.5978 8.24805C11.012 8.24805 11.3478 8.58383 11.3478 8.99805L11.3478 12.7741C11.3478 14.41655 10.01635 15.748 8.3739 15.748C6.73146 15.748 5.4 14.41655 5.4 12.7741L5.4 8.99805C5.4 8.58383 5.73578 8.24805 6.15 8.24805z" fill="currentColor"></path><path d="M12.6522 8.99805C12.6522 8.58383 12.98795 8.24805 13.4022 8.24805L15.725 8.24805C17.31285 8.24805 18.6 9.53522 18.6 11.123C18.6 12.71085 17.31285 13.998 15.725 13.998L14.1522 13.998L14.1522 14.998C14.1522 15.4122 13.8164 15.748 13.4022 15.748C12.98795 15.748 12.6522 15.4122 12.6522 14.998L12.6522 8.99805zM14.1522 12.498L15.725 12.498C16.4844 12.498 17.1 11.8824 17.1 11.123C17.1 10.36365 16.4844 9.74804 15.725 9.74804L14.1522 9.74804L14.1522 12.498z" fill="currentColor"></path><path d="M12 4.99805C9.48178 4.99805 7.283 5.12616 5.73089 5.25202C4.65221 5.33949 3.81611 6.16352 3.72 7.23254C3.60607 8.4998 3.5 10.171 3.5 11.998C3.5 13.8251 3.60607 15.4963 3.72 16.76355C3.81611 17.83255 4.65221 18.6566 5.73089 18.7441C7.283 18.8699 9.48178 18.998 12 18.998C14.5185 18.998 16.7174 18.8699 18.2696 18.74405C19.3481 18.65655 20.184 17.8328 20.2801 16.76405C20.394 15.4973 20.5 13.82645 20.5 11.998C20.5 10.16965 20.394 8.49877 20.2801 7.23205C20.184 6.1633 19.3481 5.33952 18.2696 5.25205C16.7174 5.12618 14.5185 4.99805 12 4.99805zM5.60965 3.75693C7.19232 3.62859 9.43258 3.49805 12 3.49805C14.5677 3.49805 16.8081 3.62861 18.3908 3.75696C20.1881 3.90272 21.6118 5.29278 21.7741 7.09773C21.8909 8.3969 22 10.11405 22 11.998C22 13.88205 21.8909 15.5992 21.7741 16.8984C21.6118 18.7033 20.1881 20.09335 18.3908 20.23915C16.8081 20.3675 14.5677 20.498 12 20.498C9.43258 20.498 7.19232 20.3675 5.60965 20.2392C3.81206 20.0934 2.38831 18.70295 2.22603 16.8979C2.10918 15.5982 2 13.8808 2 11.998C2 10.1153 2.10918 8.39787 2.22603 7.09823C2.38831 5.29312 3.81206 3.90269 5.60965 3.75693z" fill="currentColor"></path></svg>
                  <span class="related-video-author-name">{{ item.owner.name }}</span>
                </div>
                <div class="related-video-icon">
                  <span class="video-show-count"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="16" height="16" fill="#ffffff" class="bili-video-card__stats--icon"><!--[--><path d="M12 4.99805C9.48178 4.99805 7.283 5.12616 5.73089 5.25202C4.65221 5.33949 3.81611 6.16352 3.72 7.23254C3.60607 8.4998 3.5 10.171 3.5 11.998C3.5 13.8251 3.60607 15.4963 3.72 16.76355C3.81611 17.83255 4.65221 18.6566 5.73089 18.7441C7.283 18.8699 9.48178 18.998 12 18.998C14.5185 18.998 16.7174 18.8699 18.2696 18.74405C19.3481 18.65655 20.184 17.8328 20.2801 16.76405C20.394 15.4973 20.5 13.82645 20.5 11.998C20.5 10.16965 20.394 8.49877 20.2801 7.23205C20.184 6.1633 19.3481 5.33952 18.2696 5.25205C16.7174 5.12618 14.5185 4.99805 12 4.99805zM5.60965 3.75693C7.19232 3.62859 9.43258 3.49805 12 3.49805C14.5677 3.49805 16.8081 3.62861 18.3908 3.75696C20.1881 3.90272 21.6118 5.29278 21.7741 7.09773C21.8909 8.3969 22 10.11405 22 11.998C22 13.88205 21.8909 15.5992 21.7741 16.8984C21.6118 18.7033 20.1881 20.09335 18.3908 20.23915C16.8081 20.3675 14.5677 20.498 12 20.498C9.43258 20.498 7.19232 20.3675 5.60965 20.2392C3.81206 20.0934 2.38831 18.70295 2.22603 16.8979C2.10918 15.5982 2 13.8808 2 11.998C2 10.1153 2.10918 8.39787 2.22603 7.09823C2.38831 5.29312 3.81206 3.90269 5.60965 3.75693z" fill="currentColor"></path><path d="M14.7138 10.96875C15.50765 11.4271 15.50765 12.573 14.71375 13.0313L11.5362 14.8659C10.74235 15.3242 9.75 14.7513 9.75001 13.8346L9.75001 10.1655C9.75001 9.24881 10.74235 8.67587 11.5362 9.13422L14.7138 10.96875z" fill="currentColor"></path><!--]--></svg>
                    <span class="video-show-count-text">{{ formatNumber(item.stat.view) }}</span>
                  </span>
                  <span class="video-danmu-count"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="16" height="16" fill="#ffffff" class="bili-video-card__stats--icon"><!--[--><path d="M12 4.99805C9.48178 4.99805 7.283 5.12616 5.73089 5.25202C4.65221 5.33949 3.81611 6.16352 3.72 7.23254C3.60607 8.4998 3.5 10.171 3.5 11.998C3.5 13.8251 3.60607 15.4963 3.72 16.76355C3.81611 17.83255 4.65221 18.6566 5.73089 18.7441C7.283 18.8699 9.48178 18.998 12 18.998C14.5185 18.998 16.7174 18.8699 18.2696 18.74405C19.3481 18.65655 20.184 17.8328 20.2801 16.76405C20.394 15.4973 20.5 13.82645 20.5 11.998C20.5 10.16965 20.394 8.49877 20.2801 7.23205C20.184 6.1633 19.3481 5.33952 18.2696 5.25205C16.7174 5.12618 14.5185 4.99805 12 4.99805zM5.60965 3.75693C7.19232 3.62859 9.43258 3.49805 12 3.49805C14.5677 3.49805 16.8081 3.62861 18.3908 3.75696C20.1881 3.90272 21.6118 5.29278 21.7741 7.09773C21.8909 8.3969 22 10.11405 22 11.998C22 13.88205 21.8909 15.5992 21.7741 16.8984C21.6118 18.7033 20.1881 20.09335 18.3908 20.23915C16.8081 20.3675 14.5677 20.498 12 20.498C9.43258 20.498 7.19232 20.3675 5.60965 20.2392C3.81206 20.0934 2.38831 18.70295 2.22603 16.8979C2.10918 15.5982 2 13.8808 2 11.998C2 10.1153 2.10918 8.39787 2.22603 7.09823C2.38831 5.29312 3.81206 3.90269 5.60965 3.75693z" fill="currentColor"></path><path d="M15.875 10.75L9.875 10.75C9.46079 10.75 9.125 10.4142 9.125 10C9.125 9.58579 9.46079 9.25 9.875 9.25L15.875 9.25C16.2892 9.25 16.625 9.58579 16.625 10C16.625 10.4142 16.2892 10.75 15.875 10.75z" fill="currentColor"></path><path d="M17.375 14.75L11.375 14.75C10.9608 14.75 10.625 14.4142 10.625 14C10.625 13.5858 10.9608 13.25 11.375 13.25L17.375 13.25C17.7892 13.25 18.125 13.5858 18.125 14C18.125 14.4142 17.7892 14.75 17.375 14.75z" fill="currentColor"></path><path d="M7.875 10C7.875 10.4142 7.53921 10.75 7.125 10.75L6.625 10.75C6.21079 10.75 5.875 10.4142 5.875 10C5.875 9.58579 6.21079 9.25 6.625 9.25L7.125 9.25C7.53921 9.25 7.875 9.58579 7.875 10z" fill="currentColor"></path><path d="M9.375 14C9.375 14.4142 9.03921 14.75 8.625 14.75L8.125 14.75C7.71079 14.75 7.375 14.4142 7.375 14C7.375 13.5858 7.71079 13.25 8.125 13.25L8.625 13.25C9.03921 13.25 9.375 13.5858 9.375 14z" fill="currentColor"></path><!--]--></svg>
                    <span class="video-danmu-count-text">{{ formatNumber(item.stat.danmaku) }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-scrollbar>

</template>

<script setup>
import pkg from '@arco-design/web-vue/es/icon';
import {onMounted, onUnmounted, ref} from "vue";
import {client} from "../utils/client.ts";
import {formatNumber} from "../utils/number_util.ts";
import {formatSecondTime, getAccurateTime} from "../utils/time_util.ts";
import {useRouter} from "vue-router";
import {Message} from "@arco-design/web-vue";

const {IconFullscreen, IconFullscreenExit, IconPause, IconPlayArrow} = pkg;

const props = defineProps({
  bv: String,
  p: {
    type: Number,
    default: 0
  }
})

const videoHistory = [];
let bv = props.bv;

const videoPage = ref(props.p);

const videoInfo = ref({
  stat: {
    "aid": 1,
    "view": 0,
    "danmaku": 0,
    "reply": 0,
    "favorite": 0,
    "coin": 0,
    "share": 0,
    "now_rank": 0,
    "his_rank": 0,
    "like": 0,
    "dislike": 0,
    "evaluation": "",
    "vt": 0
  },
  pubdate: 0,
  owner: {
    face: "",
    name: ""
  },
  pages: [

  ],
  desc: ""
});
const videoUrlInfo = ref({});
const videoUrl = ref("");
const audioUrl = ref("");

const videoContainer = ref();
const videoDom = ref();
const audioDom = ref();
const hasAudio = ref(false);

const progressBarBackRef = ref(null);
const progressBarRef = ref(null);

const isControlVisible = ref(true);
const isPlaying = ref(true);
const progress = ref(0);
const videoSecond = ref(0);
const videoDuration = ref(0);
const videoFullScreen = ref(false);
let hideTimeout;

const relatedVideoList = ref([]);

const videoDownloading = ref(false);
const videoCommentData = ref({
  replies: []
});
const videoCommentList = ref([]);
const videoCommentPage = ref(1);

const authorInfo = ref({
  follower: 0,
  card: {
    sign: ""
  }
});

const handleMouseMove = () => {
  clearTimeout(hideTimeout);
  isControlVisible.value = true;

  hideTimeout = setTimeout(() => {
    isControlVisible.value = false;
  }, 3000);
};

const handleMouseLeave = () => {
  clearTimeout(hideTimeout);
  isControlVisible.value = false;
};

const updateProgress = () => {
  if (videoDom.value) {
    videoSecond.value = parseInt(videoDom.value.currentTime);
    progress.value = (videoDom.value.currentTime / videoDom.value.duration) * 100;
  }
};

const clickVideoProgressBar = (e) => {
  const video = videoDom.value;
  const progressBarBack = progressBarBackRef.value;
  const rect = progressBarBack.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  video.currentTime = (clickX / progressBarBack.offsetWidth) * video.duration;
}

const playPause = () => {
  if (videoDom.value.paused) {
    videoDom.value.play();
    isPlaying.value = true;
  } else {
    videoDom.value.pause();
    isPlaying.value = false;
  }
};

const videoPlayEnd = () => {
  isPlaying.value = false;
}

const videoShowFullScreen = () => {
  if (videoContainer.value.requestFullscreen) {
    videoFullScreen.value = false;
    videoContainer.value.requestFullscreen();
  }
  videoFullScreen.value = true;
}

const videoOffFullScreen = () => {
  if (document.exitFullscreen) {
    videoFullScreen.value = false;
    document.exitFullscreen();
  }
}

const fullscreenChangeHandler = () => {
  videoFullScreen.value = document.fullscreen;
}

const createFullScreenEventListener = () => {
  document.addEventListener("fullscreenchange", fullscreenChangeHandler, false);
}

const removeFullScreenEventListener = () => {
  if (fullscreenChangeHandler) {
    document.removeEventListener("fullscreenchange", fullscreenChangeHandler, false);
  }
}

const handleSpaceKeyDown = (event) => {
  if (event.code === 'Space') {
    playPause();
  }
};

const createKeyDownEventListener = () => {
  document.addEventListener('keydown', handleSpaceKeyDown, false);
}

const removeKeyDownEventListener = () => {
  document.removeEventListener('keydown', handleSpaceKeyDown, false);
}

const showVideoDescAuto = ref(false);

const clickShowVideoDescSpan = async () => {
  const descDiv = document.getElementById("video-desc-container");
  if (descDiv) {
    showVideoDescAuto.value = !showVideoDescAuto.value;
    if (showVideoDescAuto.value) {
      descDiv.style.maxHeight = "999px";
    }else {
      descDiv.style.maxHeight = "84px";
    }
  }
}

const onVideoLoad = async () => {
  if (videoDom.value && audioDom.value) {
    videoDom.value.onplay = () => {
      if (hasAudio) {
        audioDom.value.play();
      }
      videoDuration.value = parseInt(videoDom.value.duration);
    }
    videoDom.value.onpause = () => {
      if (hasAudio.value) {
        audioDom.value.pause();
      }
    }
    videoDom.value.onseeked = () => {
      if (hasAudio.value){
        audioDom.value.currentTime = videoDom.value.currentTime;
      }
    }

    videoDom.value.play();
  }
}

const router = useRouter();

const goIndex = async () => {
  await router.back();
}

const goBack = async () => {
  if (videoHistory.length > 0){
    bv = videoHistory.pop();
    await loadVideoData();
  }else {
    await router.back();
  }
}

const downloadVideo = async () => {
  videoDownloading.value = true;
  try{
    const cid = videoInfo.value.pages[videoPage.value].cid;
    const response = await client.execute("video/download", {
      params: {
        aid: videoInfo.value.aid,
        bvid: bv,
        cid: cid
      }
    });
    console.log(response)
    if (response.success){
      Message.success("下载成功");
    }
  }finally {
    videoDownloading.value = false;
  }
}

const openDownloadFolder = async () => {
  const response = await client.execute("video/opendf", {
    params: {

    }
  });
  if (!response.success){
    Message.error("文件夹打开失败")
  }
}

const clickOtherVideo = async (_bv, _p=0) => {
  if (bv === _bv || _bv === ''){
    if (videoPage.value === _p){
      videoDom.value.play();
    }else{
      videoPage.value = _p;
      await loadVideoData();
      isPlaying.value = true;
    }
    return;
  }
  videoPage.value = 0;
  videoHistory.push(bv);
  bv = _bv;
  await loadVideoData();
  isPlaying.value = true;
}

const getVideoInfo = async () => {
  const response = await client.execute("video/info", {
    params: {
      bvid: bv
    }
  });
  if (response.success){
    videoInfo.value = response.data.data;
    console.log(videoInfo.value);
    return true;
  }
  return false;
}

const getVideoUrl = async () => {
  const cid = videoInfo.value.pages[videoPage.value].cid;
  const response = await client.execute("video/playurl", {
    params: {
      aid: videoInfo.value.aid,
      bvid: bv,
      cid: cid
    }
  });

  // 充电视频
  if (response.data.code === 87008){
    videoUrl.value = "";
    audioUrl.value = "";

    isPlaying.value = false;
    return;
  }

  console.log(response)

  videoUrlInfo.value = response.data.data;

  console.log(response.data.data);

  // 处理没有音频的情况
  if (!response.data.data.dash.audio || response.data.data.dash.audio.length===0){
    audioUrl.value = "";
    hasAudio.value = false;
    videoUrl.value = response.data.data.dash.video[0].baseUrl;
    return;
  }
  hasAudio.value = true;
  audioUrl.value = response.data.data.dash.audio[0].baseUrl;
  videoUrl.value = response.data.data.dash.video[0].baseUrl;
}

const getRelatedVideoList = async () => {
  const response = await client.execute("video/related", {
    params: {
      bvid: bv
    }
  });
  console.log(response);

  relatedVideoList.value = response.data.data;
}

const getAuthorInfo = async () => {
  const response = await client.execute("user/card", {
    params: {
      mid: videoInfo.value.owner.mid,
      photo: false
    }
  });
  console.log(response);
  authorInfo.value = response.data.data;
}

const getVideoComment = async () => {
  const response = await client.execute("video/comment", {
    params: {
      aid: videoInfo.value.aid,
      sort: 0,
      nohot: 0,
      ps: 20,
      pn: videoCommentPage.value
    }
  });
  videoCommentData.value = response.data.data;
  videoCommentList.value = videoCommentData.value.replies;
}

const loadMoreVideoComment = async () => {
  videoCommentPage.value += 1;
  const response = await client.execute("video/comment", {
    params: {
      aid: videoInfo.value.aid,
      sort: 0,
      nohot: 0,
      ps: 20,
      pn: videoCommentPage.value
    }
  });
  console.log(response.data.data.replies)
  videoCommentList.value.push(...response.data.data.replies);
}

const loadVideoData = async () => {
  // videoPage.value = 0;
  if (await getVideoInfo()){
    await getVideoUrl();
  }
  if (videoInfo.value.owner.mid){
    await getAuthorInfo();
  }
  await getRelatedVideoList();
  await getVideoComment();
}

onMounted(async () => {
  createFullScreenEventListener();
  createKeyDownEventListener();
  await loadVideoData();
})

onUnmounted(() => {
  removeFullScreenEventListener();
  removeKeyDownEventListener();
  clearTimeout(hideTimeout);
});

</script>

<style>
#video-view-scrollbar{
  flex: 1;
  height: 100vh;
  overflow: auto;
}
</style>

<style scoped>

#left-container{
  flex: 1;
  position: relative;
}

#right-container{
  width: 350px;
  margin: 0 24px;
  overflow: hidden;
}

.video-part-item{
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  margin: 5px 0;
  border-radius: 4px;
}

.video-part-item:hover{
  background-color: #FFFFFF;
}

.video-part-playing{
  height: 14px;
  width: 14px;
  font-size: 14px;
  margin-right: 5px;
  position: relative;
  top: 3px;
}

#video-title{
  width: calc(100% - 36px);
  position: absolute;
  top: 0;
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #18191C;
}

#video-info{
  display: flex;
  align-items: flex-end;
  position: relative;
  top: -6px;
  font-size: 13px;
  color: #9499A0;
  margin-bottom: 8px;
}

.video-show-count{
  display: flex;
  align-items: center;
}

.video-show-count-text{
  margin-left: 6px;
}

.video-danmu-count{
  display: flex;
  align-items: center;
  margin-left: 16px;
}

.video-danmu-count-text{
  margin-left: 6px;
}

#video-container {
  position: relative;
  width: 100%;
  background-color: black;
}

#video-item {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.control-panel {
  position: absolute;
  bottom: 0;
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .5) 100%);

  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  padding: 12px;
  margin: 0;
  left: 0;
  right: 0;
  width: auto;
}

.control-panel.visible {
  opacity: 1;
}

#video-progress-back{
  position: absolute;
  height: 3px;
  background-color: hsla(0,0%,100%,.3);
  width: 100%;
}

#video-progress{
  position: absolute;
  height: 3px;
  background-color: #00a1d6;
  transition: .1s;
  z-index: 999;
}

#video-action-container{
  color: #61666D;
  display: flex;
  align-items: center;
  font-size: 13px;
  border-bottom: 1px solid #E3E5E7;
}

.video-action-inner{
  display: flex;
  align-items: center;
  margin: 12px 24px 12px 0;
  cursor: pointer;
}

.video-action-inner>svg{
  margin-right: 6px;
}

#video-desc-span{
  white-space: pre-line;
  letter-spacing: 0;
  color: #18191C;
  font-size: 15px;
  line-height: 24px;
  overflow: hidden;
}

.arco-scrollbar{
  overflow: hidden;
  flex: 1;
}

.related-video-container{
  display: flex;
  margin-bottom: 16px;
}

.related-video-img{
  width: 141px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
}

.related-video-info{
  width: 199px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.related-video-title{
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 显示的行数，可以根据需要修改 */
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.related-video-title:hover{
  color: #00AEEC;
}

.related-video-info-bottom{
  color: #9499A0;
}

.related-video-author-container{
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.related-video-author-name{
  margin-left: 4px;
  position: relative;
  top: -2px;
  cursor: pointer;
}

.related-video-author-name:hover{
  color: #00AEEC;
}

.related-video-icon{
  display: flex;
}

</style>