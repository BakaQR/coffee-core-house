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

// 方块
export const ITEMLIST = {
	/*
		方块数据结构
		ITEMLIST[0].get() 默认配方
		使用 method 标记制作路线
		使用数组下标表示其他制作路径的配方 ITEMLIST[1].get()
		get() 返回一个数组 [0][0]表示RAWLIST字典中的材料 [0][1] 表示所需数量
		模板:
		xx: {
			id: 'x', name: 'xxx', 
			icon: '/static/gtnh/block/xxxx.png',
			material: [
				{
					get: (createNumber) => {
						return [ [], [] ]
					},
				},
			],
			method: []
		}
	*/
	
	Coke_Oven: {
		id: 'Coke_Oven', name: '焦炉', 
		icon: '/static/gtnh/block/Icon_gregtech_gt.blockmachines_236.png',
		material: [
			{
				get: (createNumber) => {
					const clay = Math.ceil(createNumber * 4 / 3) * 6
					const sand = Math.ceil(createNumber * 4 / 3) * 10
					const cobblestone = 6 * createNumber
					const flint = 3 * createNumber
					return [ [ RAWLIST.clay, clay ], [ RAWLIST.sand, sand ], [ RAWLIST.cobblestone, cobblestone], [ RAWLIST.flint, flint ] ]
				},
			},{
				get: (createNumber) => {
					const clay = 4 * createNumber
					const sand = 4 * createNumber
					const cobblestone = 6 * createNumber
					const flint = 3 * createNumber
					return [ [ RAWLIST.clay, clay ], [ RAWLIST.sand, sand ], [ RAWLIST.cobblestone, cobblestone], [ RAWLIST.flint, flint ] ]
				},
			},
		],
		method: [ CREATINGMETHOD.creating, CREATINGMETHOD.alloySmelter ]
	},
	
	Coke_Oven_Bricks: { 
		id: 'Coke_Oven_Bricks', name: '焦炉砖', 
		icon: '/static/gtnh/block/Icon_gregtech_gt.blockcasings12.png',
		material: [
			{
				get: (createNumber) => {
					const clay = Math.ceil(createNumber * 4 / 3) * 3
					const sand = Math.ceil(createNumber * 4 / 3) * 5
					return [ [ RAWLIST.clay, clay ], [ RAWLIST.sand, sand ] ]
				},
			},{
				get: (createNumber) => {
					const clay = 2 * createNumber
					const sand = 2 * createNumber
					return [ [ RAWLIST.clay, clay ], [ RAWLIST.sand, sand ] ]
				},
			}
		],
		method: [ CREATINGMETHOD.creating, CREATINGMETHOD.alloySmelter ]
	}
}