import { ref } from 'vue'
import { defineStore } from 'pinia'
import { saveData, getData, removeData } from '@/utils/pinia-to-storage.js'

// 用于设置页 提供修改选项 影响配方计算的材料数量
// 在设置页修改选项后 同步修改到 uni.storage 中
export const useMaterialSettingsStore = defineStore('gtnh-material-settings', () => {
	const UNISTORAGENAME = 'material-settings'
	
	const list = ref({
		CokeOvenBrickUseAlloySmelter: {
			descriptions: '焦炉砖使用合金炉制作',
			check: false,
		},
		PlateMethod: {
			descriptions: '板类材料制作方式',
			option: 'hammer_tool',  // hammer_tool, hammer_machine, bending
			display: [ '锻造锤（工具）', '锻造锤（机器）', '卷板机' ],
			map: { 0: 'hammer_tool', 1: 'hammer_machine', 2: 'bending'},
		},
		
	})
	
	const originList = JSON.parse(JSON.stringify(list.value))
	
	// 开关切换
	const toggle = (name) => {
		list.value[name].check = !list.value[name].check
		
		// 存储到 uni.storage
		saveData(UNISTORAGENAME, list.value)
	}
	
	// 设置选项
	const setOption = (name, option) => {
		list.value[name].option = option
		
		// 存储到 uni.storage
		saveData(UNISTORAGENAME, list.value)
	}
	
	// 根据 option 的字符串获取对应 map 中的 key 用于初始化 uni-data-select 选择的选项
	const getOptionMapReverse = (map, stringValue) => {
		return parseInt(Object.keys(map).find(key => map[key] === stringValue))
	}
	
	const reset = () => {
		removeData(UNISTORAGENAME)
		initializa()
	}
	
	// 在使用的页面 onLoad 中使用
	const initializa = () => {
		const result = getData(UNISTORAGENAME)
		if(result !== undefined){
			// list.value = result
			Object.keys(result).forEach((keyName, index) => {
				if('check' in result[keyName]){
					list.value[keyName].check = result[keyName].check
				}else if('option' in result[keyName]) {
					list.value[keyName].option = result[keyName].option
				}else {
					console.log('storage not exist data: ', keyName)
				}
			})
		}else {
			console.log('数据读取失败，uni.storage 仓库数据未初始化，即将初始化 uni.storage 仓库数据')
			list.value = JSON.parse(JSON.stringify(originList))
			saveData(UNISTORAGENAME, list.value)
		}
	}
	
	return {
		list,
		toggle,
		setOption,
		getOptionMapReverse,
		reset,
		initializa,
	}
})