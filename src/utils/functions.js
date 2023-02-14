'use strict'

export function removeDuplicatesFromArray (array, field) {
  return array.filter((arr, index, self) => index === self.findIndex((t) => (t.save === arr.save && t[field] === arr[field])))
}
