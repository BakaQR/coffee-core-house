<template>
	<view>
		<text>{{ materialStore.list.CokeOvenBrickUseAlloySmelter.descriptions }}: </text>
		<text>{{ materialStore.list.CokeOvenBrickUseAlloySmelter.check }}</text>
		<switch @change="change" 
		:checked="materialStore.list.CokeOvenBrickUseAlloySmelter.check" />
		
		<uni-data-select v-model="plateModeSelecter.value" :localdata="plateModeSelecter.display" @change="uniDataSelectChange(plateModeSelecter, 'PlateMethod', plateMap)" :clear="false" />
		
		<button @click="checkStorageInfo">check storage info</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
import { useMaterialSettingsStore } from '../../store/gtnh-material-settings';
import { ITEMLIST, CREATINGMETHOD } from '@/utils/gtnh-material-dictionary.js'
import { removeData } from '../../utils/pinia-to-storage';
import { useUniDataSelect } from '@/utils/uni-selecter-data.js'
import { getData } from '@/utils/pinia-to-storage.js'

const materialStore = useMaterialSettingsStore()

const plateModeSelecter = useUniDataSelect()
const plateModeDisplay = [ '锻造锤（工具）', '锻造锤（机器）', '卷板机' ]
const plateMap = { 0: 'hammer_tool', 1: 'hammer_machine', 2: 'bending'}
const plateMapReverse = { 'hammer_tool': 0, 'hammer_machine': 1, 'bending': 2}

const change = () => {
	materialStore.toggle('CokeOvenBrickUseAlloySmelter')
	// recipe.value = ITEMLIST.Coke_Oven.recipe.get(2)
}

// selecterItem 是 useUniDataSelect() 创建的对象
// checkId 是 pinia 仓库中定义的 check 选项的对象名称
// map 是 key : value 键值对 传递给 pinia 设置对应选项的值
const uniDataSelectChange = (selecterItem, checkId, map) => {
	const option = selecterItem.getCurrentSelectValue()
	materialStore.setOption(checkId, map[option])
}

const checkStorageInfo = () => {
	getData('material-settings')
}

onLoad(() => {
	materialStore.initializa()
	
	plateModeSelecter.initializa(plateModeDisplay, plateMapReverse[materialStore.list.PlateMethod.option])
})
</script>

<style>

</style>
