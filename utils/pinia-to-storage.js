// 用于 pinia 中存储读取 uni.storage 的数据

export const saveData = (keyName, dataValue) => {
	uni.setStorage({
		key: keyName,
		data: dataValue,
		success() {
			console.log('storage存储成功: ' + keyName)
		},
		fail() {
			console.log('storage存储失败: ' + keyName)
		}
	})
}

export const getData = (keyName) => {
	console.log('初始化数据仓库: ' + keyName)
	const result = uni.getStorageSync(keyName)
	if(result !== ''){
		console.log('storage获取数据: ' + result)
		return result
	}else{
		console.log('uni仓库数据不存在')
		return undefined
	}
}

export const removeData = (keyName) => {
	uni.removeStorageSync(keyName)
}
