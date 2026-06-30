import { nextTick, reactive, ref } from "vue"

// 用于规范化获取 uni-data-select 组件的数据
export const useUniDataSelect = () => {
	const val = ref(0)
	const display = ref([])
	
	// 传入数组定义选项  [ '选项1', '选项2', '选项3', ... ]
	const initializa = (array, baseValue) => {
		array.forEach((option, index, arr) => {
			display.value[index] = { value: index, text: option }
		})
		val.value = parseInt(baseValue)
		
		// 微信小程序会在传入初始值 0 时 uni-data-select 组件不会初始化 v-model 的值
		// 需要先改变该值 后续再改回 0 才能正确选择对应的选项
		if(baseValue === 0){
			val.value = 1
			nextTick(() => {
				val.value = 0
			})
		}
	}
	
	const getCurrentSelectValue = () => {
		return val.value
	}
	
	return reactive({ val, display, initializa, getCurrentSelectValue})
}