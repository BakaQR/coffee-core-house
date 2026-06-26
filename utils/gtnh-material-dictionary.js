// uni.storage 仓库 id
const UNISTORAGENAME = 'material-settings'

// 原材料对象字典
export const RAWLIST = {
	/*
		模板
		xx: { name: 'xxx', icon: '/static/gtnh/material/xxxx.png' },
	*/
	cobblestone: { name: '圆石', icon: '/static/gtnh/material/cobblestone.png' },
	flint: { name: '燧石', icon: '/static/gtnh/material/flint.png' },
	iron: { name: '铁锭', icon: '/static/gtnh/material/iron.png' },
	bronze: { name: '青铜锭', icon: '/static/gtnh/material/bronze.png' },
	clay: { name: '黏土球', icon: '/static/gtnh/material/clay.png' },
	sand: { name: '沙子', icon: '/static/gtnh/material/sand.png' },
	
}

// 制作方式
export const CREATINGMETHOD = {
	creating: '工作台',
	alloySmelter: '合金炉'
}

// 从 uni.storage 中获取对应材料处理方式 根据处理方式计算 get 返回的材料数量
// 使用 pinia 仓库搭配 gtnh-material-settings.vue 页面修改 uni.storage 数据
const getCreatingMethod = () => {
	return uni.getStorageSync(UNISTORAGENAME)
}

// 方块
export const ITEMLIST = {
	/*
		方块数据结构
		ITEMLIST.Coke_Oven.recipe.get(2) 获取制作 2 个该方块的材料配方
		xx: {
			id: 'x', name: 'xxx', 
			icon: '/static/gtnh/block/xxxx.png',
			recipe: {
				get: (createNumber) => {
					return [ [], [] ]
				}
			},
		}
	*/
	
	Coke_Oven: {
		id: 'Coke_Oven', name: '焦炉', 
		icon: '/static/gtnh/block/Icon_gregtech_gt.blockmachines_236.png',
		recipe: {
			get: (createNumber) => {
				let clay = 0; let sand = 0; let cobblestone = 0; let flint = 0;
				if(getCreatingMethod().CokeOvenBrickUseAlloySmelter){
					clay = 4 * createNumber
					sand = 4 * createNumber
					cobblestone = 6 * createNumber
					flint = 3 * createNumber
				}else {
					clay = Math.ceil(createNumber * 4 / 3) * 6
					sand = Math.ceil(createNumber * 4 / 3) * 10
					cobblestone = 6 * createNumber
					flint = 3 * createNumber
				}
				return [ [ RAWLIST.clay, clay ], [ RAWLIST.sand, sand ], [ RAWLIST.cobblestone, cobblestone], [ RAWLIST.flint, flint ] ]
			}
		}
	},
	
	Coke_Oven_Bricks: { 
		id: 'Coke_Oven_Bricks', name: '焦炉砖墙', 
		icon: '/static/gtnh/block/Icon_gregtech_gt.blockcasings12.png',
		recipe: {
			get: (createNumber) => {
				let clay = 0; let sand = 0;
				if(getCreatingMethod().CokeOvenBrickUseAlloySmelter){
					clay = 2 * createNumber
					sand = 2 * createNumber
				}else {
					clay = Math.ceil(createNumber * 4 / 3) * 3
					sand = Math.ceil(createNumber * 4 / 3) * 5
				}
				return [ [ RAWLIST.clay, clay ], [ RAWLIST.sand, sand ] ]
			}
		}
	},
	
	
	
	
}