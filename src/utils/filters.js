function mask (value, mask) {
  if (value) {
    // example de mask : `###### ## ## #### # ##### ### ####### ##`
    const arr = value.split("")
    arr.forEach(arr => {
      mask = mask.replace('#', arr)
    })

    return mask
  } else {
    return 'Informe um valor'
  }
}

function inverterData (date) {
  return window.inverterData(date)
}

export {
  mask,
  inverterData
}
