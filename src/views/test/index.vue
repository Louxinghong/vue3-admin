<template>
  <div class="test">
    <div class="test-one">
      <a-button @click="onAddCount">给我+1</a-button>
      <test-son :count="count" @addCount="onAddCount"></test-son>

      <p>state.count: {{ state.count }}</p>
      <p>computedEven2: {{ computedEven2 }}</p>
      <a-button type="primary" @click="onChangeComputed">改变计算属性</a-button>
    </div>

    <div class="test-two">
      <a-button @click="onChangeX">改变X</a-button>
      <a-button @click="onChangeY">改变Y</a-button>
    </div>

    <div class="test-three">
      <a-button :loading="loading" @click="onChangeOptions">获取Options</a-button>
      <a-select :options="demoOptions"></a-select>
    </div>

    <div class="test-four">
      <a-input-number v-model="calNum1"></a-input-number>
      <a-input-number v-model="calNum2"></a-input-number>
      <p>{{ calculateResult }}</p>
    </div>

    <waterfall-flow></waterfall-flow>
  </div>
</template>

<script setup lang="ts" name="TestDemo">
import { ref, computed, watch, watchEffect } from "vue";
import TestSon from "./components/TestSon.vue";
import { getAIData } from "@/api/index";
import useCalculate from "@/hook/useCalculate";
import WaterfallFlow from "./components/WaterfallFlow.vue";

const count = ref<number>(12);
const state = ref({
  count: 1,
  userInfo: {
    name: "xiaohong",
    age: 25,
    gender: "男"
  }
});
const nameOptions = ref({
  name: "xiaohong"
});
console.log(nameOptions.value.name);

interface EnumOptions {
  label: string;
  value: number;
}
const options = ref<EnumOptions[]>([
  {
    label: "123",
    value: 1
  }
]);

console.log(options.value[0].label);

// 只读计算属性
const computedEven1 = computed(() => state.value.count % 2);
// 可读可写
const computedEven2 = computed<number>({
  get: () => {
    return state.value.count + 1;
  },
  set: (value) => {
    state.value.count = value;
  }
});
watch(
  () => state.value.count,
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
  },
  {
    immediate: true
  }
);

const onAddCount = () => count.value++;
const onChangeComputed = async () => {
  computedEven2.value += 2;
  // const result = await getAIData()
  // console.log(result)
};

const swap = <T, U>(tuple: [T, U]): [U, T] => {
  return [tuple[1], tuple[0]];
};
const result = swap<string, number>(["xiaohong", 111]);
console.log(result);

interface Iprint<T, U> {
  (param1: T, param2: U): U;
}
const myPrint: Iprint<number, string> = (param1, param2) => {
  return `${param1} + 1 + ${param2}`;
};
console.log(myPrint(123, "小红"));

const x = ref<number>(0);
const y = ref<number>(1);
// 单个
watch(x, (newX) => {
  console.log(`x is ${newX}`);
});
// getter函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`${x.value} + ${y.value} = ${sum}`);
  }
);
// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`);
});
const onChangeX = () => {
  x.value = 3;
};
const onChangeY = () => {
  y.value = 3;
};

const aOptions: CommonConfig.OptionsConfig<string, number>[] = [
  {
    label: "1",
    value: 1
  }
];
const bOptions: CommonConfig.OptionsConfig<string, string>[] = [
  {
    label: "标题1",
    value: "1"
  }
];
console.log(aOptions, bOptions);

const loading = ref<boolean>(false);
const getRemoteData = () => {
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          label: "小红1号",
          value: 1
        },
        {
          label: "小红2号",
          value: 2
        }
      ]);
    }, 3000);
  });
};
const demoOptions = ref<any[]>([]);
const onChangeOptions = async () => {
  console.log(1);
  loading.value = true;
  const result = await getRemoteData();
  loading.value = false;
  demoOptions.value = result;
  console.log(result);
};

const calNum1 = ref<number>(1);
const calNum2 = ref<number>(7);
const calType = ref<string>("add");
const { calculateFnOptions, calculateResult } = useCalculate(calNum1, calNum2, calType.value);
calculateFnOptions(calNum1.value, calNum2.value);
</script>
