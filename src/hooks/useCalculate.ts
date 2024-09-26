import { ref, watch } from 'vue'

const useCalculate = (calNum1: object, calNum2: object, calType: string) => {
  const calculateResult = ref<number>(0)

  watch([calNum1, calNum2], ([newCalNum1, newCalNum2], [oldCalNum1, oldCalNum2]) => {
    calculateFnOptions(newCalNum1, newCalNum2)
  })

  const calculateFnOptions = (value1: any, value2: any) => {
    calculateResult.value = calType === 'add' ? value1 + value2 : value1 - value2
  }

  return {
    calculateFnOptions,
    calculateResult
  }
}

export default useCalculate
