import { ref } from 'vue'
import { defineStore } from 'pinia'
import { saveData, getData, removeData } from '@/utils/pinia-to-storage.js'

// 用于设置页 提供修改选项 影响配方计算的材料数量
// 在设置页修改选项后 同步修改到 uni.storage 中
export const useMaterialListStore = defineStore('gtnh-material-list', () => {
	const UNISTORAGENAME = 'material-list'
	
	const list = ref()
	
	
	// 在使用的页面 onLoad 中使用
	const initializa = () => {
		const result = getData(UNISTORAGENAME)
		if(result !== undefined){
			console.log(result)
			// Object.keys(result).forEach((keyName, index) => {
			// 	if('check' in result[keyName]){
			// 		list.value[keyName].check = result[keyName].check
			// 	}else if('option' in result[keyName]) {
			// 		list.value[keyName].option = result[keyName].option
			// 	}else {
			// 		console.log('storage not exist data: ', keyName)
			// 	}
			// })
		}else {
			console.log('数据读取失败，uni.storage 仓库数据未初始化，即将初始化 ' + UNISTORAGENAME +' 仓库数据')
			// list.value = JSON.parse(JSON.stringify(originList))
			saveData(UNISTORAGENAME, list.value)
		}
	}
	
	return {
		list,
		initializa,
	}
})