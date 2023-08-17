import {
  utcDateStringToString,
  dateToUtcDateString,
  dateToString,
  getfirstDateOfAfterNthMonth,
  getlastDateOfAfterNthMonth,
  createTestIds,
} from '../'

describe('utils/index.ts', () => {
  describe('utcDateStringToString', () => {
    it('UTC 時刻文字列が、タイムゾーンを考慮した時刻文字列に変換される（Date 型）', () => {
      expect(utcDateStringToString('2023-10-10', 'Date', 'yyyy-MM-dd')).toBe(
        '2023-10-10',
      )
      expect(
        utcDateStringToString('2023-01-05', 'Date', 'yyyy-MM-dd HH:mm:ss'),
      ).toBe('2023-01-05 09:00:00')
    })
    it('UTC 時刻文字列が、タイムゾーンを考慮した時刻文字列に変換される（DateTime 型）', () => {
      expect(
        utcDateStringToString('2023-10-10 00:00:00', 'DateTime', 'yyyy-MM-dd'),
      ).toBe('2023-10-10')
      expect(
        utcDateStringToString(
          '2023-01-05 00:00:00',
          'DateTime',
          'yyyy-MM-dd HH:mm:ss',
        ),
      ).toBe('2023-01-05 09:00:00')
      expect(
        utcDateStringToString(
          '2023-01-05 23:00:00',
          'DateTime',
          'yyyy-MM-dd HH:mm:ss',
        ),
      ).toBe('2023-01-06 08:00:00')
    })
  })

  describe('dateToUtcDateString', () => {
    it('Date が UTC の時刻文字列に変換される', () => {
      expect(dateToUtcDateString(new Date(2023, 7, 15, 0, 0, 0), 'Date')).toBe(
        '2023-08-14',
      )
      expect(
        dateToUtcDateString(new Date(2023, 7, 15, 0, 0, 0), 'DateTime'),
      ).toBe('2023-08-14 15:00:00')
    })
  })

  describe('dateToString', () => {
    it('Date が時刻文字列に変換される', () => {
      expect(
        dateToString(new Date(2023, 7, 15, 0, 0, 0), 'yyyy-MM-dd HH:mm:ss'),
      ).toBe('2023-08-15 00:00:00')
      expect(
        dateToString(new Date(2023, 7, 15, 0, 0, 0), 'yyyy年MM月dd日'),
      ).toBe('2023年08月15日')
    })
  })

  describe('getfirstDateOfAfterNthMonth', () => {
    it('n ヶ月月後の初日を取得できる', () => {
      expect(
        getfirstDateOfAfterNthMonth(new Date(2023, 7, 15), 0),
      ).toStrictEqual(new Date(2023, 7, 1))
      expect(
        getfirstDateOfAfterNthMonth(new Date(2023, 7, 15), 3),
      ).toStrictEqual(new Date(2023, 10, 1))
      expect(
        getfirstDateOfAfterNthMonth(new Date(2023, 7, 15), -2),
      ).toStrictEqual(new Date(2023, 5, 1))
    })
  })

  describe('getlastDateOfAfterNthMonth', () => {
    it('n ヶ月後の月末日を取得', () => {
      expect(
        getlastDateOfAfterNthMonth(new Date(2023, 7, 15), 0),
      ).toStrictEqual(new Date(2023, 7, 31))
      expect(
        getlastDateOfAfterNthMonth(new Date(2023, 7, 15), -2),
      ).toStrictEqual(new Date(2023, 5, 30))
      expect(
        getlastDateOfAfterNthMonth(new Date(2023, 7, 15), 2),
      ).toStrictEqual(new Date(2023, 9, 31))
    })
  })

  describe('createTestIds', () => {
    it('正しい値が得られる', () => {
      expect(
        createTestIds<'child1' | 'child2' | 'child3'>('Parent', [
          'child1',
          'child2',
          'child3',
        ]),
      ).toStrictEqual({
        child1: {
          'data-testid': 'Parent__child1',
        },
        child2: {
          'data-testid': 'Parent__child2',
        },
        child3: {
          'data-testid': 'Parent__child3',
        },
      })
      expect(
        createTestIds<'child1'>('Parent', ['child1', 'child1']),
      ).toStrictEqual({
        child1: {
          'data-testid': 'Parent__child1',
        },
      })
    })
  })
})
