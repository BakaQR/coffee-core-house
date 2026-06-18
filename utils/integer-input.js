import { reactive, ref } from 'vue';

export function useIntegerInput(initialValue = '') {
  const display = ref(String(initialValue))
	
  function onInput(val) {
    let result = ''
    let hasSign = false
    for (const ch of (val || '')) {
      if (ch >= '0' && ch <= '9') {
        result += ch
      } else if (ch === '-' && !hasSign && result.length === 0) {
        result += '-'
        hasSign = true
      }
    }

    display.value = result
  }

  function onBlur() {
    let v = display.value

    if (v === '' || v === '-') {
      display.value = '0'
      return
    }

    const isNegative = v.startsWith('-')
    let numPart = isNegative ? v.slice(1) : v

    numPart = numPart.replace(/^0+/, '') || '0'

    v = isNegative ? '-' + numPart : numPart
    if (v === '-0') v = '0'

    display.value = v
  }
	
	const onClear = () => {
		display.value = '0'
	}

  return reactive({ display, onInput, onBlur, onClear })
}