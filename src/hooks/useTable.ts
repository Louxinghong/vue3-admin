import { ref, watch, onMounted } from "vue";
import { Message } from "@arco-design/web-vue";

interface Pagination {
  size: number;
  current: number;
  total: number;
  onChange(size: number, current: number): void;
}

interface TableResultData {
  list: [];
  page: {
    size: number;
    current: number;
    total: number;
  };
}

type TableResult = CommonConfig.RequestResult<TableResultData>;

/**
 * @name: useTable
 * @description: 获取列表数据
 */
const useTable = <T>(api: Function, params: T) => {
  const loading = ref<boolean>(false);
  const pagination = ref<Pagination>({
    total: 0,
    current: 1,
    size: 1,
    onChange: (current, size) => {
      pagination.value.current = current;
      pagination.value.size = size;
    },
  });
  const tableData = ref<TableResultData[]>([]);
  const getTableData = async () => {
    loading.value = true;
    const result: TableResult = await api({
      params,
      page: {
        current: pagination.value.current,
        size: pagination.value.size,
      },
    }).finally(() => (loading.value = false));
    if (result.success) {
      tableData.value = result.data.list;
      pagination.value.total = result.data.page.total;
    } else {
      Message.error(result.msg);
    }
  };

  watch(
    () => pagination.value.current,
    () => {
      getTableData();
    },
  );
  watch(
    () => pagination.value.size,
    () => {
      pagination.value.current = 1;
    },
  );

  onMounted(() => getTableData());

  return {
    loading,
    pagination,
    tableData,
    getTableData,
  };
};

export default useTable;
