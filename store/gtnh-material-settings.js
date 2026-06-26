import { ref } from 'vue'
import { defineStore } from 'pinia'
import { saveData, getData } from '@/utils/pinia-to-storage.js'

// 用于设置页 提供修改选项 影响配方计算的材料数量
// 在设置页修改选项后 通过 pinia 仓库同步修改到 uni.storage 中
export const useMaterialSettingsStore = defineStore('gtnh-material-settings', () => {
	const UNISTORAGENAME = 'material-settings'
	
	// 材料制作路线
	const descriptions = {
		CokeOvenBrickUseAlloySmelter: '焦炉砖使用合金炉制作(1黏土+1沙子=2焦炉砖)',
		PlateMethod: '板类材料制作方式'
	}
	
	// 选项
	const check = ref({
		CokeOvenBrickUseAlloySmelter: false,
		PlateMethod: 'hammer'
	})
	
	// 开关切换
	const toggle = (name) => {
		check.value[name] = !check.value[name]
		
		// 存储到 uni.storage
		saveData(UNISTORAGENAME, check.value)
	}
	
	// 设置选项
	const setOption = (name, methodName) => {
		check.value[name] = methodName
	}
	
	// 在使用的页面 onLoad 中使用
	const initializa = () => {
		const result = getData(UNISTORAGENAME)
		if(result !== undefined){
			check.value = result
		}else {
			console.log('数据读取失败，uni.storage 仓库数据未初始化，即将初始化 uni.storage 仓库数据')
			saveData(UNISTORAGENAME, check.value)
		}
	}
	
	
	return {
		descriptions,
		check,
		toggle,
		setOption,
		initializa
	}
})