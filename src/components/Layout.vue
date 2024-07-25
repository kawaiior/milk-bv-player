<template>
  <div class="layout">
    <div class="menubar">
      <a-menu v-model:selected-keys="menubarSelectedKeys" :style="{ width: '200px', height: '100%' }"
              :default-selected-keys="['/']" show-collapse-button breakpoint="xl" id="menu-container"
              @menuItemClick="onClickMenuItem">
        <a-menu-item key="/">
          <icon-apps />
          首页
        </a-menu-item>
        <a-menu-item key="/search">
          <icon-search />
          搜索
        </a-menu-item>
        <a-menu-item key="/favlist">
          <icon-star />
          收藏
        </a-menu-item>
        <a-menu-item key="/history">
          <icon-history />
          历史
        </a-menu-item>
        <a-menu-item key="/setting">
          <icon-settings />
          设置
        </a-menu-item>
      </a-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import pkg from '@arco-design/web-vue/es/icon';
import { useRouter } from 'vue-router';

const { IconApps, IconSearch, IconStar, IconHistory, IconSettings } = pkg;


const menubarSelectedKeys = ref(['/']);
const router = useRouter();

// // 当点击导航栏上的按钮时，自动跳转到和导航栏的 key 相同的 url 去
// watchEffect(() => {
//   console.log("watchEffect: " + menubarSelectedKeys.value.at(-1))
//   router.push(menubarSelectedKeys.value.at(-1))
// });

const onClickMenuItem = async (key) => {
  await router.push(key)
}

</script>

<style>
#menu-container>.arco-menu-collapse-button {
  width: 32px;
  height: 32px;
}
</style>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.menubar {
  width: max-content;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.content {
  flex: 1;
  width: 0;
  margin-left: 8px;
  display: flex;
}
</style>