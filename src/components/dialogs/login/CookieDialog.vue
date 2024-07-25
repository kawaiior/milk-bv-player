<template>

  <a-modal v-model:visible="show"
           @open="onopen"
           @beforeClose="beforeClose"
           :width="'60%'">
    <template #title>
      cookies
    </template>

    <a-input class="cookie-input" v-model="cookiesObj.DedeUserID">
      <template #prepend>
        DedeUserID
      </template>
    </a-input>
    <a-input class="cookie-input" v-model="cookiesObj.DedeUserID__ckMd5">
      <template #prepend>
        DedeUserID__ckMd5
      </template>
    </a-input>
    <a-input class="cookie-input" v-model="cookiesObj.SESSDATA">
      <template #prepend>
        SESSDATA
      </template>
    </a-input>
    <a-input class="cookie-input" v-model="cookiesObj.bili_jct">
      <template #prepend>
        bili_jct
      </template>
    </a-input>
    <a-input class="cookie-input" v-model="cookiesObj.buvid3">
      <template #prepend>
        buvid3
      </template>
    </a-input>
    <a-input class="cookie-input" v-model="cookiesObj.buvid4">
      <template #prepend>
        buvid4
      </template>
    </a-input>

    <template #footer>
      <a-button @click="()=>{show=false;}">关闭</a-button>
    </template>
  </a-modal>

</template>

<script setup>
import {ref} from "vue";
import {client} from "../../../utils/client.ts";

const show = defineModel();

const props = defineProps({
  after: {
    type: Function,
    required: true
  }
});

const cookiesObj = ref({
  DedeUserID: "",
  DedeUserID__ckMd5: "",
  SESSDATA: "",
  bili_jct: "",
  buvid3: "",
  buvid4: ""
})

const getCookies = async () => {
  const response = await client.execute("login/data/get", {
    params: {

    }
  });
  cookiesObj.value = response.data;
}

async function onopen(){
  await getCookies();
}

const beforeClose = async () => {

}

</script>

<style>
.cookie-input>.arco-input-prepend{
  width: 165px!important;
}
</style>

<style scoped>

</style>