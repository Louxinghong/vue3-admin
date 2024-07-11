<template>
  <div class="file-upload">
    <a-upload :custom-request="onCustomRequest" :show-file-list="showFileList">
      <template #upload-button>
        <a-button type="primary">
          <template #icon>
            <svg-icon name="upload" size="15px" />
          </template>
          {{ btnName }}
        </a-button>
      </template>
    </a-upload>
  </div>
</template>

<script lang="ts" setup>
import * as XLSX from "xlsx";
import { ExcelFileResult } from "@/utils/interface";

interface Props {
  btnName?: string;
  showFileList?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  btnName: "上传文件",
  showFileList: false
});

const readFile = (file: any) => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      let workbook = XLSX.read(e.target?.result, {
        type: "binary"
      });
      let result: Array<ExcelFileResult> = [];
      workbook.SheetNames.map((item) => {
        result.push({
          sheetName: item,
          sheetList: XLSX.utils.sheet_to_json(workbook.Sheets[item])
        });
      });
      resolve(result);
    };
  });
};
const emit = defineEmits(["success"]);
const onCustomRequest = (option: any): any => {
  readFile(option.fileItem.file).then((result) => {
    emit("success", result);
  });
};
</script>
