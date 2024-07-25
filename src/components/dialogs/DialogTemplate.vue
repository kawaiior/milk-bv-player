<template>

  <a-modal v-model:visible="show"
           @open="onopen"
           @beforeClose="beforeClose"
           :width="'60%'">
    <template #title>

    </template>
    <div style="padding: 12px;display: flex;justify-content: center;">

    </div>
    <template #footer>
      <a-button @click="()=>{show=false;}">关闭</a-button>
    </template>
  </a-modal>

</template>

<script setup>
import {ref} from "vue";

const show = defineModel();

const props = defineProps({
  after: {
    type: Function,
    required: true
  }
});

async function onopen(){

}

const beforeClose = async () => {

}

</script>

<style scoped>

</style>