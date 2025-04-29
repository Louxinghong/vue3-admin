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

    <search-table
      :search-config="searchConfig"
      :search-form="searchForm"
      :table-config="tableConfig"
    >
      <template #userNo="{ record }">
        {{ record }}
      </template>
    </search-table>
  </div>
</template>

<script name="TestDemo" lang="ts" setup>
import { ref, computed, watch, customRef, onMounted, onUnmounted, provide } from "vue";
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

class Person {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public getName() {
    return this.name;
  }

  public getAge() {
    return this.age;
  }
}

const person = new Person("Linbudu", 18);

// console.log(person.name); // 属性“name”为私有属性，只能在类“Person”中访问。
console.log(person.getName()); // Linbudu

interface User {
  name: string;
  age: number;
}
const userData: User = {
  name: "Linbudu",
  age: 18
};
type PartialUser = Partial<User>; // 全变为可选，Required全变为必选
const partiaUser: PartialUser = {
  name: "Linbudu"
};

type UserProps = "name" | "age" | "job";
type RecordUser = Record<UserProps, string>; // 声明一个内部属性键类型一致、键值类型也一致的对象类型，Pick选择，Omit排除
const recordUser: RecordUser = {
  name: "Linbudu",
  age: "18",
  job: "programmer"
};

// type UserProps = 'name' | 'age' | 'email' | 'phone' | 'address';
// type RequiredUserProps = 'name' | 'email';

// // OptionalUserProps = UserProps - RequiredUserProps
// type OptionalUserProps = Exclude<UserProps, RequiredUserProps>;

// const optionalUserProps: OptionalUserProps = 'age'; // 'age' | 'phone' | 'address';

// type UserProps = 'name' | 'age' | 'email' | 'phone' | 'address';
// type RequiredUserProps = 'name' | 'email';

// type RequiredUserPropsOnly = Extract<UserProps, RequiredUserProps>;

// const requiredUserPropsOnly: RequiredUserPropsOnly = 'name'; // 'name' | 'email';

type Add = (x: number, y: number) => number;
type AddParams = Parameters<Add>; // [number, number] 类型
type AddResult = ReturnType<Add>; // number 类型
const addParams: AddParams = [1, 2];
const addResult: AddResult = 3;

// 定义一个函数，该函数返回一个 Promise 对象
const getPromise = async () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Hello, World!");
    }, 1000);
  });
};
type Result = Awaited<ReturnType<typeof getPromise>>; // string 类型

// type Version = `${number}.${number}.${number}`;
// const v1: Version = "1.1.0";
// const v2: Version = "1.0"; // 报错：类型 "1.0" 不能赋值给类型 `${number}.${number}.${number}`
// const v3: Version = "a.0.0"; // 报错：类型 "a.0" 不能赋值给类型 `${number}.${number}.${number}`

// 字符串字面量类型自动分发
type Brand = "iphone" | "xiaomi" | "honor";
type SKU = `${Brand}`; // "iphone" | "xiaomi" | "honor"

const tupleData = ["tesla", "model 3", "model X", "model Y"] as const;
type TupleToObject<T extends readonly PropertyKey[]> = {
  [Key in T[number]]: Key;
};

interface SearchForm {
  name: string;
  post: string;
  isRead: boolean;
  date: Date[];
  borrowDate: Date[];
}

// 搜索配置
const searchConfig = [
  {
    prop: "name",
    label: "用户手机号",
    type: "input"
  },
  {
    prop: "post",
    label: "注册渠道",
    key: "post",
    type: "select",
    options: [
      {
        label: "微信",
        value: "1"
      },
      {
        label: "支付宝",
        value: "2"
      },
      {
        label: "其他",
        value: "3"
      }
    ]
  },
  {
    prop: "post",
    label: "押金状态",
    type: "select",
    options: [
      {
        label: "微信",
        value: "1"
      },
      {
        label: "支付宝",
        value: "2"
      },
      {
        label: "其他",
        value: "3"
      }
    ]
  },
  {
    prop: "post",
    label: "用户来源",
    type: "select",
    options: [
      {
        label: "微信",
        value: "1"
      },
      {
        label: "支付宝",
        value: "2"
      },
      {
        label: "其他",
        value: "3"
      }
    ]
  },
  {
    prop: "date",
    label: "注册日期",
    type: "dateRange"
  },
  {
    prop: "borrowDate",
    label: "最近租借日期",
    type: "dateRange"
  }
];
// 搜索表单
const searchForm = ref<SearchForm>({
  name: "",
  post: "",
  isRead: false,
  date: [],
  borrowDate: []
});
// 表格配置
const tableConfig = [
  {
    title: "用户编号",
    dataIndex: "userNo",
    align: "center",
    slotName: "userNo"
  },
  {
    title: "用户手机号",
    align: "center",
    children: [
      {
        title: "手机号1",
        dataIndex: "phone",
        align: "center"
      },
      {
        title: "手机号2",
        dataIndex: "phone",
        align: "center"
      }
    ]
  },
  {
    title: "注册渠道",
    dataIndex: "phone",
    align: "center",
    filterOptions: "testOptions"
  },
  {
    title: "押金金额",
    dataIndex: "phone",
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "phone",
    align: "center"
  },
  {
    title: "优惠券",
    dataIndex: "phone",
    align: "center"
  },
  {
    title: "累计租借次数",
    dataIndex: "phone",
    align: "center"
  },
  {
    title: "最近租借时间",
    dataIndex: "phone",
    align: "center"
  },
  {
    title: "最近访问时间",
    dataIndex: "phone",
    align: "center"
  },
  {
    title: "注册时间",
    dataIndex: "phone",
    align: "center"
  },
  {
    title: "用户来源",
    dataIndex: "phone",
    align: "center"
  },
  {
    title: "操作",
    dataIndex: "action",
    fixed: "right",
    align: "center",
    width: 100,
    actions: [
      {
        label: "编辑",
        type: "primary",
        methods: "onEdit"
      }
    ]
  }
];
const onEdit = (rowIndex: any) => {
  console.log(rowIndex);
};
// 数据传送
provide("provideData", { searchConfig, searchForm, tableConfig, onEdit });

// 实现一个Pick方法，从类型T中选择出一组属性K，构造一个新的类型
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type TodoPreview = MyPick<Todo, "title" | "completed">;
const todo: TodoPreview = {
  title: "Clean room",
  completed: false
};
</script>

<style lang="less" scoped>
// 在局部文件了里全局生效
// :global(body) {
//   width: 100vw;
//   height: 100vh;
//   background-color: burlywood;
// }
</style>
