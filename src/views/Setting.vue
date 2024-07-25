<template>
  <div style="padding: 20px 12px;">

    <a-space>
      <a-button v-if="loginInfo.isLogin" @click="openCookieDialog" >cookies</a-button>
      <a-button v-else @click="qrcodeLogin">扫码登录</a-button>
      <a-button v-if="loginInfo.isLogin" @click="cleanLoginData">退出登录</a-button>
    </a-space>

  </div>

  <QrcodeLoginDialog
      :after="()=>{}"
      v-model="showQrcodeLoginDialog"
  />

  <CookieDialog
      :after="()=>{}"
      v-model="showCookieDialog"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {client} from "../utils/client.ts";

const loginInfo = ref({
  isLogin: false,
})

const showQrcodeLoginDialog = ref(false);

const qrcodeLogin = async () => {
  showQrcodeLoginDialog.value = true;
}

const showCookieDialog = ref(false);

const openCookieDialog = async () => {
  showCookieDialog.value = true;
}

const getLoginInfo = async () => {
  const response = await client.execute("login/info", {
    params: {

    }
  });
  loginInfo.value = response.data.data;
}

const cleanLoginData = async () => {
  const response = await client.execute("login/data/clean", {
    params: {

    }
  });
  if (response.success){
    loginInfo.value = {
      isLogin: false
    }
  }
}

onMounted(async () => {
  await getLoginInfo();
})

</script>
