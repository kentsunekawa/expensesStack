// import from libraries
import { css } from 'styled-components'

// import from this project
import { StyleBaseData } from 'src/hooks'

type Args = {
  color?: string | null
}

export const createStyles = (_: StyleBaseData, args?: Args) => ({
  container: css`
    display: flex;
    gap: 0 8px;
    width: 100%;
    padding: 8px 16px;
    align-items: center;
    justify-content: space-between;
    border-left: 4px solid ${args?.color};
  `,
  left: css`
    display: flex;
    align-items: center;
    align-content: center;
    gap: 0 16px;
    width: calc(100% - 168px);
  `,
  dateArea: {
    container: css`
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      align-items: center;
      justify-content: center;
      gap: 4px 0;
      width: 32px;
    `,
    dateText: css`
      font-size: 22px;
      line-height: 1em;
    `,
    dayText: css`
      font-size: 14px;
      line-height: 1em;
    `,
  },
  iconArea: {
    container: css``,
    icon: css``,
  },
  amoutArea: {
    container: css`
      display: flex;
      align-items: flex-end;
      align-content: flex-end;
      justify-content: flex-end;
      width: 160px;
    `,
    text: css`
      span {
        font-size: 80%;
      }
    `,
  },
  date: css`
    font-size: 24px;
  `,
})
