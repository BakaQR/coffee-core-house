import { reactive, ref } from "vue"

// 用于规范化获取 uni-data-select 组件的数据
export const useUniDataSelect = () => {
	const value = ref(0)
	const display = ref([])
	
	// 传入数组定义选项  [ '选项1', '选项2', '选项3', ... ]
	const initializa = (array, baseValue) => {
		array.forEach((option, index, arr) => {
			display.value[index] = { value: index, text: option }
		})
		value.value = baseValue
	}
	
	const getCurrentSelectValue = () => {
		return value.value
	}
	
	return reactive({ value, display, initializa, getCurrentSelectValue})
}