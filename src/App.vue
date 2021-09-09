<template>
  <div id="app">
    <n-layout><!--布局-->
    <n-layout-header><!--布局头部-->
     <h1>mini TO-DO</h1>
     <n-button-group>
      <n-button round @click="toMain" ghost >主页</n-button>
      <n-button round @click="toArchive" ghost>归档页</n-button>
     </n-button-group>
    </n-layout-header>
    <n-layout-content><!--布局正文--->
  <router-view/>
    </n-layout-content>
    </n-layout>
  </div>
</template>
<script setup>
import{
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NGridItem,
  NGrid,
  NH1,
  NButton,
  NButtonGroup,
} from "naive-ui"
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();

const toMain = () => {
  router.push({ path: "/" });
};
const toArchive = () => {
  router.push({ path: "/archive" });
};

</script>

<style lang="postcss" scoped>
#app{
  background: #f5f5f5;
  width:500px;
  height:200px;
  margin:100px auto;
  & .n-layout-header{
    text-align: center;
    border-bottom:1px solid #e6e6e6
  }
  & .n-layout-content{
   margin: auto;
   padding:16px;
   max-width:380px;
  }
  &.n-button{
    margin:5px;
  }
}
</style>
