<template>

  <a-modal v-model:visible="show"
           @open="onopen"
           @beforeClose="beforeClose"
           :close-on-click-modal="true"
           :width="'60%'">
    <template #title>
      扫码登录
    </template>
    <div style="padding: 12px;display: flex;justify-content: center;">
      <div v-if="loginState===4">

      </div>
      <div v-else style="display: flex;flex-direction: column;align-items: center;">
        <a-button @click="getLoginQrcode()">刷新</a-button>
        <!--判断两种情况，1: 二维码过期 2: 扫码未确认 3: 登录成功-->
        <canvas ref="qrcode"></canvas>
        <h1>{{ getLoginStateText() }}</h1>
      </div>
    </div>
    <template #footer>
      <a-button @click="()=>{show=false;}">关闭</a-button>
    </template>
  </a-modal>

</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {client} from "../../../utils/client.ts";
import QRCode from "qrcode";

const show = defineModel();

const props = defineProps({
  after: {
    type: Function,
    required: true
  }
});


// 0: 未扫码 1: 扫码未确认 2: 登录成功 3: 二维码已过期 4: 获取二维码失败
const loginState = ref(0);

const getLoginStateText = () => {
  switch (loginState.value){
    case 0:
      return "请使用bilibili客户端扫描二维码";
    case 1:
      return "请使用bilibili客户端确认登录";
    case 2:
      return "登录成功";
    case 3:
      return "二维码已过期";
    case 4:
      return "获取二维码失败";
  }
}

const qrcodeData = ref({
  key: "",
  url: ""
});
const qrcode = ref(null);

const getLoginQrcode = async () => {
  const response = await client.execute("login/qrcode/generate", {
    params: {

    }
  });
  if (response.success){
    qrcodeData.value.url = response.data.data.url;
    qrcodeData.value.key = response.data.data.qrcode_key;
    // 生成二维码
    if (qrcode.value){
      qrcode.value.innerHTML = "";
      await QRCode.toCanvas(qrcode.value, qrcodeData.value.url);
      console.log(qrcodeData.value);
    }
  }
}

let loginStateTimer = void 0;

const checkLoginState = async () => {
  console.log(loginState.value)

  if (loginState.value===2 || loginState.value===3 || loginState.value===4){
    return;
  }
  const response = await client.execute("login/qrcode/poll", {
    params: {
      qrcode_key: qrcodeData.value.key
    }
  });
  console.log(response);
  const code = response.data.data.code;
  if (code===86101){
    // 未扫码
    loginState.value = 0;
  }else if (code===86090){
    // 扫码未确认
    loginState.value = 1;
  }else if (code===0){
    // 登录成功
    const url = response.data.data.url;
    // 解析URL到一个对象里
    const params = new URLSearchParams(url.split("?")[1]);
    const DedeUserID = params.get("DedeUserID");
    const DedeUserID__ckMd5 = params.get("DedeUserID__ckMd5");
    const SESSDATA = params.get("SESSDATA");
    const bili_jct = params.get("bili_jct");

    const loginParams = {
      dui: DedeUserID,
      duim: DedeUserID__ckMd5,
      sessdata: SESSDATA,
      jct: bili_jct
    }

    console.log(loginParams)

    // 存储
    const saveResponse = await client.execute("login/data/save", {
      params: {
        ...loginParams
      }
    })
    console.log(saveResponse);

    loginState.value = 2;
    await props.after();
    show.value = false;
  }else if (code===86038){
    // 二维码已过期
    loginState.value = 3;
  }else {
    // 获取二维码失败
    loginState.value = 4;
  }
}

onMounted(async () => {

})

onUnmounted(async () => {
  if (loginStateTimer) {
    clearInterval(loginStateTimer);
  }
})

async function onopen(){
  await getLoginQrcode();
  loginStateTimer = setInterval(async () => {
    await checkLoginState();
  }, 3000);
}

const beforeClose = async () => {
  if (loginStateTimer) {
    clearInterval(loginStateTimer);
  }
}

</script>

<style scoped>

</style>