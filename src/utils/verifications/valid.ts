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
