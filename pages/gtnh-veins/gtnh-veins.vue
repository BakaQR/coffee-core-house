<template>
	<view class="container">
		<view class="coordinates-input">
			<text class="title-text">GTNH 矿脉区块定位器</text>
			<text class="description-text">
				通过输入坐标及半径计算附近矿脉原点坐标，矿脉原点分布步长为48
			</text>
			<uni-section title="请输入x坐标" type="line" padding titleFontSize='22rpx' >
				<uni-easyinput type="text" trim="all" placeholder="请输入x坐标"
					v-model="xInput.display" @input="xInput.onInput" @blur="xInput.onBlur" 
					@clear="xInput.onClear">
				</uni-easyinput>
			</uni-section>
			<uni-section title="请输入z坐标" type="line" padding titleFontSize='22rpx' >
				<uni-easyinput type="text" trim="all" placeholder="请输入z坐标"
					v-model="zInput.display" @input="zInput.onInput" @blur="zInput.onBlur"
					@clear="zInput.onClear">
				</uni-easyinput>
			</uni-section>
			<uni-section title="请输入搜索半径" type="line" padding titleFontSize='22rpx' >
				<uni-easyinput type="number" trim="all" placeholder="请输入搜索半径"
					v-model="rInput.display" @input="rInput.onInput" @blur="rInput.onBlur"
					@clear="rInput.onClear">
				</uni-easyinput>
			</uni-section>
			
			<text class="title-text">矿脉坐标</text>
			<uni-section title="请注意坐标，使用的是 X 和 Z" type="line" titleFontSize='22rpx' ></uni-section>
			<view class="echarts">
				<l-echart ref="chartRef" @finished="initChart" ></l-echart>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { getVeinOriginsSquare } from '@/utils/veins-calculater.js'
import { useIntegerInput } from '@/utils/integer-input.js'

const xInput = useIntegerInput(0)
const zInput = useIntegerInput(0)
const rInput = useIntegerInput(100)

// ECharts
const chartRef = ref(null)
// 仅在小程序环境下引入 ECharts
// #ifdef MP
const echarts = require('../../static/echarts.min.js')
// #endif
// #ifndef MP
const echarts = null // H5 和 App 环境不需要手动引入
// #endif

// 渲染点数据
const points = ref(getVeinOriginsSquare(parseInt(xInput.display), parseInt(zInput.display), parseInt(rInput.display)))
// 偏移坐标并设置距离
const pointsOffset = ref(points.value.map(p => [
	p[0] - parseInt(xInput.display),
	p[1] - parseInt(zInput.display),
	Math.hypot(p[0] - parseInt(xInput.display), p[1] - parseInt(zInput.display))
]))

// echarts 选项
const option = {
  tooltip: { 
		trigger:'item',
		formatter(params) {
			return `X : ${params.data[0] + parseInt(xInput.display)}, Z: ${params.data[1] + parseInt(zInput.display)}`
		}
	},
  xAxis: { 
		type: 'value',
		name: 'X',
		axisLabel: { formatter: v => v + parseInt(xInput.display) },
	},
  yAxis: { 
		type:'value' ,
		name: 'Z',
		inverse: true,
		nameLocation: 'start',
		axisLabel: { formatter: v => v + parseInt(zInput.display) },
	},
  series: [
    {
      type: 'scatter',
      symbolSize: 16,
      data: pointsOffset.value,
    }
  ],
	visualMap: {
		show: false,
	  min: 0,
	  max: rInput.display,
	  dimension: 2,
	  inRange: {
	    color: ['#ff2600', '#ffff00', '#22ff00', '#0000ff']
	  },
	},
}

// 初始化
const initChart = async () => {
	console.log('init chart')
	if (!chartRef.value) return
	
	try {
	  const chart = await chartRef.value.init(echarts)
	  chart.setOption(option)
	} catch (error) {
	  console.error('图表初始化失败:', error)
	}
}

watch([() => xInput.display, () => zInput.display, () => rInput.display], () => {
	// 更新渲染点数据
	points.value = getVeinOriginsSquare(parseInt(xInput.display), parseInt(zInput.display), parseInt(rInput.display))
	// 更新偏移渲染点
	pointsOffset.value = points.value.map(p => [
		p[0] - parseInt(xInput.display),
		p[1] - parseInt(zInput.display),
		Math.hypot(p[0] - parseInt(xInput.display), p[1] - parseInt(zInput.display))
	])
	
	// 更新图表渲染点
	chartRef.value?.setOption({
		series: [{ data: pointsOffset.value }]
	}, true)
	// 更新渲染点距离
	chartRef.value?.setOption({
		visualMap: { max: parseInt(rInput.display) || 0 }
	})
})

</script>

<style lang="scss">
.container{
	padding: 16rpx;
}

.coordinates-input {
	background-color: #fff;
	border-radius: 8rpx;
	overflow: hidden;
	padding: 16rpx 32rpx;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.echarts	{
	width: 600rpx;
	height: 600rpx;
	margin: auto;
}


</style>
