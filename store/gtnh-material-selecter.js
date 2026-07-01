import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMaterialSelecterStore = defineStore('material-selecter', () => {
	const UNISTORAGENAME = 'material-selecter'
	
	// 在 gtnh-material.vue 中使用 watch 监听该变量 触发 popup 弹出层
	const isShow = ref(false)

	const recipeKey = ref('')
	const recipeNumber = ref(0)
	
	const open = () => {
		isShow.value = true
	}
	
	const close = () => {
		isShow.value = false
	}
	
	const setRecipeInfo = (key, number) => {
		recipeKey.value = key
		recipeNumber.value = number
	}
	
	const getRecipeInfo = () => {
		return { key: recipeKey, number: recipeNumber }
	}
	
	return {
		isShow,
		open,
		close,
		setRecipeInfo,
		getRecipeInfo
	}
})