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

    <div class="test-five">
      <a-input-number v-model="calNum3"></a-input-number>
      <a-input-number v-model="calNum4"></a-input-number>
      <p>{{ calculateResult2 }}</p>
    </div>

    <waterfall-flow></waterfall-flow>

    <!-- <a-button @click="onTestAI">测试普通AI</a-button> -->

    <!-- 将元素添加到body上 -->
    <!-- <teleport to="body">
      <span>12321</span>
    </teleport> -->

    <!-- 只更新一次 -->
    <p v-once>count: {{ count }}</p>

    <!-- customRef封装localStorageAPI -->
    <a-button @click="onAddLocalStorageCount">localStorage-count + 1</a-button>

    <!-- 可复用性 - 鼠标坐标 -->
    <p>x: {{ point.x }}, y: {{ point.y }}</p>
  </div>
</template>

<script name="TestDemo" lang="ts" setup>
import { ref, computed, watch, customRef, onMounted, onUnmounted } from "vue";
import TestSon from "./components/TestSon.vue";
import { getAIData } from "@/api/index";
import useCalculate from "@/hooks/useCalculate";
import WaterfallFlow from "./components/WaterfallFlow.vue";
import useTable from "@/hooks/useTable";

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
console.log("x", x.value, "y", y.value);
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

const calNum3 = ref<number>(1);
const calNum4 = ref<number>(7);
const calTyp2 = ref<string>("add");
const { calculateFnOptions: calculateFnOptions2, calculateResult: calculateResult2 } = useCalculate(
  calNum3,
  calNum4,
  calTyp2.value
);
calculateFnOptions2(calNum1.value, calNum2.value);
console.log(calculateResult2);

// const {
//   loading: tableLoading,
//   tableData,
//   pagination,
//   getTableData
// } = useTable<{msg: number}>(api, { msg: 123 });
// getTableData();

// const onTestAI = async () => {
//   const resultTest = await getAIData("我想拉屎");
//   console.log(resultTest);
// };
const useLocakStorage = (key: string, initialValue: any) => {
  const value = customRef((track, trigger) => {
    return {
      get() {
        track();
        return localStorage.getItem(key) ?? initialValue;
      },
      set(newValue: any) {
        localStorage.setItem(key, newValue);
        trigger();
      }
    };
  });

  return value;
};
const localStorageCount = useLocakStorage("localStorageCount", 0);
const onAddLocalStorageCount = () => {
  localStorageCount.value++;
};

// 可复用性 - 鼠标坐标
const useEventListener = (target: any, event: string, callback: Function) => {
  onMounted(() => {
    target.addEventListener(event, callback);
  });

  onUnmounted(() => {
    target.removeEventListener(event, callback);
  });
};

const useMouse = () => {
  const point = ref({
    x: 0,
    y: 0
  });
  useEventListener(window, "mousemove", (e: any) => {
    point.value.x = e.clientX;
    point.value.y = e.clientY;
  });
  return point;
};
const point = useMouse();
</script>

<style lang="scss" scoped>
// 在局部文件了里全局生效
// :global(body) {
//   width: 100vw;
//   height: 100vh;
//   background-color: burlywood;
// }
</style>
