import {
  format,
  parse,
  subMinutes,
  addMinutes,
  getYear,
  getMonth,
  setMonth,
  setDate,
} from 'date-fns'

// 日付フォーマット文字列
type Formatter =
  | 'yyyy/MM/dd'
  | 'yyyy-MM-dd'
  | 'yyyy-MM'
  | 'yyyy年MM月'
  | 'yyyy年MM月dd日'
  | 'yyyy/MM/dd HH:mm'
  | 'yyyy-MM-dd HH:mm'
  | 'yyyy年'
  | 'M'
  | 'd'
  | 'yyyy年MM月'
  | 'yyyy年MM月dd日 HH:mm'
  | 'yyyy年MM月dd日 HH:mm:ss'
  | 'yyyy-MM-dd HH:mm:ss'
  | 'yyyy_MM_dd_HH_mm_ss'
  | 'HH:mm'
  | 'E'
  | 'EEEE'
  | 'E..EEE'
  | 'yyyy, MMMM'

// utc 日付文字列を、実行環境のタイムゾーンを考慮して Date に変換
export const utcDateStringToDate = (
  utcDateString: string,
  type: 'Date' | 'DateTime',
): Date => {
  const date = parse(
    utcDateString,
    type === 'Date' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss',
    new Date(),
  )

  return subMinutes(date, date.getTimezoneOffset())
}

// Date を タイムゾーンを考慮して日付文字列に変換
export const dateToUtcDateString = (date: Date, type: 'Date' | 'DateTime') =>
  format(
    addMinutes(date, date.getTimezoneOffset()),
    type === 'Date' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss',
  )

// Date を 文字列に変換
export const dateToString = (date: Date, formatter: Formatter) =>
  format(date, formatter)

// utc 日付文字列を、タイムゾーンに合った日付文字列に変換
export const utcDateStringToString = (
  utcDateString: string,
  type: 'Date' | 'DateTime',
  formatter: Formatter,
) => {
  try {
    return dateToString(utcDateStringToDate(utcDateString, type), formatter)
  } catch (e) {
    return null
  }
}

// n ヶ月月後の初日を取得
export const getfirstDateOfAfterNthMonth = (currentDate: Date, month: number) =>
  new Date(getYear(currentDate), getMonth(currentDate) + month, 1)

// n ヶ月後の月末日を取得
export const getlastDateOfAfterNthMonth = (
  currentDate: Date,
  month: number,
) => {
  const firstDateOfCurrentMonth = new Date(
    getYear(currentDate),
    getMonth(currentDate),
    1,
  )

  return setDate(
    setMonth(
      firstDateOfCurrentMonth,
      getMonth(firstDateOfCurrentMonth) + 1 + month,
    ),
    0,
  )
}
