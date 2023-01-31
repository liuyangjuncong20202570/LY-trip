import dayjs from 'dayjs'
export function formatMonthDay(time, format = 'MM月DD日') {
  return dayjs(time).format(format)
}

export function getDiffDay(startDay, endDay) {
  return dayjs(endDay).diff(startDay, 'day')
}
