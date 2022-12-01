import moment from 'moment'

export function $date (inp?: moment.MomentInput, strict?: boolean | undefined) {
  return moment(inp, strict)
}

export function reverseDateFormat (date: string) {
  return date.split('-').reverse().join('-')
}
