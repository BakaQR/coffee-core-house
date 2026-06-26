<template>
	<view>
		<text>{{ materialStore.descriptions.CokeOvenBrickUseAlloySmelter }}: </text>
		<text>{{ materialStore.check.CokeOvenBrickUseAlloySmelter }}</text>
		<switch @change="change" 
		:checked="materialStore.check.CokeOvenBrickUseAlloySmelter" />
		<view v-for="item in recipe" :key="item.name">{{ item[0].name }} {{ item[1] }} <image :src="item[0].icon" style="width: 50rpx;height: 50rpx;"></image></view>
		
		<view v-for="item in CokeOvenBricks.recipe" :key="item.name">{{ item[0].name }} {{ item[1] }} <image :src="item[0].icon" style="width: 50rpx;height: 50rpx;"></image></view>
		
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
import { useMaterialSettingsStore } from '../../store/gtnh-material-settings';
import { ITEMLIST, CREATINGMETHOD } from '@/utils/gtnh-material-dictionary.js'
import { removeData } from '../../utils/pinia-to-storage';

const materialStore = useMaterialSettingsStore()
const recipe = ref()

const CokeOvenBricks = ref()

const change = () => {
	materialStore.toggle('CokeOvenBrickUseAlloySmelter')
	recipe.value = ITEMLIST.Coke_Oven.recipe.get(2)
	
}

onLoad(() => {
	materialStore.initializa()
	CokeOvenBricks.value = { recipe: ITEMLIST.Coke_Oven_Bricks.recipe.get(22) }
	
	recipe.value = ITEMLIST.Coke_Oven.recipe.get(2)
	console.log(materialStore.check)
})
</script>

<style>
	       
</style>
