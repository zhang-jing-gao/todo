<template>
  <n-space vertical>
    <n-list v-if="showList">
      <draggable
        :list="list"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ index, element }">
          <task-item
            v-if="element.status == 'INCOMPLETE'"
            :taskIndex="index"
            :task="element"
            :key="element.id"
            @delete="() => onDelete(index)"
            @complete="() => onComplete(index)"
            @edit="() => onEdit(index, element)"
          />
        </template>
      </draggable>
    </n-list>
    <n-thing v-else> 请添加待办任务 </n-thing>
    <div class="extra">
      <n-button @click="showModal = true"> 添加 </n-button>
    </div>
  </n-space>

  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="Dialog"
    :show-icon="false"
  >
    <template #header>
      <div>添加任务</div>
    </template>
    <div>
      <n-input
        v-model:value="content"
        type="input"
        placeholder="请填写任务信息..."
      />
    </div>

    <template #action>
      <n-button @click="onAdd">添加</n-button>
    </template>
  </n-modal>

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
import { computed, ref, watch } from "vue";
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
import TaskItem from "../components/TaskItem.vue";
import draggable from "vuedraggable";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from 'uuid';

const store = useStore();
const list = computed(() => store.state.list);

const initTask = {
  id: "",
  content: "",
  status: "INCOMPLETE",
};

let showModal = ref(false);
let content = ref(initTask.content);
let showEditModal = ref(false);
let editContent = ref("");
let editTaskIndex = ref(0);
let editTask = { ...initTask };

const showList = computed(() => {
  for (let i = 0; i < store.state.list.length; i++) {
    if (store.state.list[i].status === "INCOMPLETE") {
      return true;
    }
  }
  return false;
});

const onAdd = () => {
  store.commit("addTask", {
    ...initTask,
    content: content.value,
    id: uuidv4(),
  });
  showModal.value = false;
  content.value = "";
};

const onComplete = (index) => {
  store.commit("completeTask", index);
};

const onDelete = (index) => {
  store.commit("deleteTask", index);
};

const onEdit = (index, task) => {
  editTask = task;
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

<style scoped>
.n-thing {
  text-align: center;
}

.extra {
  display: flex;
  justify-content: center;
}
</style>
