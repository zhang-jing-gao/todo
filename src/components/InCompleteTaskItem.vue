<template>
  <n-list-item class="task-item-wrapper">
    <template #prefix>
      <n-icon size="16">
        <drag-indicator-outlined />
      </n-icon>
    </template>
    <swiper
      :initial-slide="1"
      :slides-per-view="1"
      :resistance-ratio="0"
      :speed="200"
      @activeIndexChange="onActiveIndexChange"
      @tap="onTap"
    >
      <swiper-slide class="left-unfinish-slide">取消完成</swiper-slide>
      <swiper-slide>{{ task.content }}</swiper-slide>
      <swiper-slide class="right-unfinish-slide">取消完成</swiper-slide>
    </swiper>
  </n-list-item>
</template>

<script setup>
import { defineProps, defineEmit, ref } from "vue";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { DragIndicatorOutlined } from "@vicons/material";
import { NListItem, NIcon } from "naive-ui";

const props = defineProps({
  task: Object,
  taskIndex: Number,
});

const emit = defineEmit(["InComplete"]);

const onActiveIndexChange = (instance) => {
  const { activeIndex } = instance;
  if (activeIndex === 0 || activeIndex === 2) {
    emit("InComplete");
    setTimeout(() => {
      instance.destroy();
    }, 1);
  }
};

const onTap = () => {
  emit("edit");
};
</script>

<style lang="postcss">
.task-item-wrapper {
  padding: 0 !important;
  border: 1px solid var(--merged-border-color);
  cursor: move;

  & .n-list-item__prefix {
    margin: 0px !important;
    padding: 8px;
    display: flex;
  }

  & .swiper-container {
    width: 100%;
    height: 100%;
    cursor: default;
  }

  & .swiper-slide {
    padding: 8px 0;
    display: flex;
    align-items: center;
    width: 100% !important;
  }

  & .left-unfinish-slide {
    color: white;
    background: #00cc66;
    justify-content: flex-end;
    box-sizing:border-box;
  }

  & .right-unfinish-slide {
    color: white;
    background: #00cc66;
    justify-content: flex-start;
    box-sizing:border-box;
  }
}

.task-item-wrapper:not(:last-child) {
  border-bottom: none !important;
}
</style>
