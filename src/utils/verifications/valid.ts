export function verifyString<T> (stringFields: Array<T>) {
  for (let num = 0; num < stringFields.length; num++) {
    if (
      stringFields[num] === null ||
      stringFields[num] === undefined ||
      typeof stringFields[num] !== 'string' ||
      (stringFields[num] as string).trim() === ''
    ) {
      return true
    }
  }

  return false
}

export function verifyNumber<T> (numberFields: Array<T>) {
  for (let num = 0; num < numberFields.length; num++) {
    if (
      numberFields[num] === null ||
      numberFields[num] === undefined ||
      typeof numberFields[num] !== 'number'
    ) {
      return true
    }
  }

  return false
}

export function verifyArray<T> (arrayFields: Array<T>, type: string) {
  if (Array.isArray(arrayFields) === false) return true

  switch (type) {
    case 'string':
      for (let num = 0; num < arrayFields.length; num++) {
        if (typeof arrayFields[num] !== 'string') {
          return true
        }
      }
      break

    case 'number':
      for (let num = 0; num < arrayFields.length; num++) {
        if (typeof arrayFields[num] !== 'number') {
          return true
        }
      }
      break

    default:
  }

  return false
}