<template>
  <n-h1>Archive List</n-h1>
  <n-space vertical>
    <n-list v-if="showList">
      <draggable
        :list="list"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ index, element }">
          <inComplete-task-item
            v-if="element.status == 'COMPLETED'"
            :key="element.id"
            :taskIndex="index"
            :task="element"
            @InComplete="() => onInComplete(index)"
            @edit="() => onEdit(index, element)"
          />
        </template>
      </draggable>
    </n-list>
    <n-thing v-else> 还没有任务被完成 </n-thing>
  </n-space>

  <n-modal
    v-model:show="showEditModal"
    preset="dialog"
    title="Dialog"
    :show-icon="false"
  >
    <template #header>
      <div>任务详情</div>
    </template>
    <div>
      <n-input
        v-model:value="editContent"
        type="input"
        placeholder="请填写任务信息..."
      />
    </div>
    <template #action>
      <n-button @click="onUpdate">提交</n-button>
    </template>
  </n-modal>
</template>

<script setup>
import { NH1 } from "naive-ui";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import {
  NList,
  NListItem,
  NButton,
  NSpace,
  NThing,
  NModal,
  NInput,
} from "naive-ui";
import InCompleteTaskItem from "../components/InCompleteTaskItem.vue";
import draggable from "vuedraggable";
import { cloneDeep } from "lodash";

const store = useStore();
const list = computed(() => store.state.list);

const initTask = {
  id: "",
  content: "",
  status: "COMPLETED",
};

let showEditModal = ref(false);
let editContent = ref("");
let editTaskIndex = ref(0);
let editTask = {...initTask};

const showList = computed(() => {
  for (let i = 0; i < store.state.list.length; i++) {
    if (store.state.list[i].status === "COMPLETED") {
      return true;
    }
  }
  return false;
});

const onInComplete = (index) => {
  store.commit("inCompleteTask", index);
};

const onEdit = (index, task) => {
  editTask = task
  showEditModal.value = true;
  editTaskIndex.value = index;
  editContent.value = task.content;
};


const onUpdate = () => {
  let task = {
    ...editTask,
    content: editContent.value,
  };
  store.commit("updateTask", {
    idx: editTaskIndex.value,
    task: task,
  });
  showEditModal.value = false;
};
</script>

<style scope>
.extra {
  display: flex;
  justify-content: center;
}
</style>
