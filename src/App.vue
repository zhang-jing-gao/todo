<template>
  <div id="app">
    <n-layout>
      <n-layout-header>
        <h1>mini TO-DO</h1>
        <n-button-group>
          <n-button round @click="toMain"> 主页 </n-button>
          <n-button round @click="toArchive"> 归档页 </n-button>
        </n-button-group>
      </n-layout-header>
      <n-layout-content>
        <router-view />
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script setup>
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NGridItem,
  NGrid,
  NH1,
  NButton,
  NButtonGroup,
} from "naive-ui";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, onBeforeUnmount } from "vue";

const router = useRouter();
const store = useStore();

const toMain = () => {
  router.push({ path: "/" });
};
const toArchive = () => {
  router.push({ path: "/archive" });
};

onMounted(() => {
  let myData = localStorage.getItem("myData");
  if (myData) {
    let list = JSON.parse(myData);
    store.commit("updateTasks", list);
  }
});

window.onbeforeunload = (event) => {
  let list = store.state.list;
  localStorage.setItem("myData", JSON.stringify(list));
};
</script>



<style lang="postcss" scoped>
#app {
  background: #f5f5f5;

  & .n-layout-header {
    text-align: center;
    border-bottom: 1px solid #e6e6e6;
  }

  & .n-layout-content {
    margin: auto;
    padding: 16px;
    max-width: 380px;
  }

  & .n-button {
    margin: 5px;
  }
}
</style>
