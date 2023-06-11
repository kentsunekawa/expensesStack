export const BREAK_POINTS = {
  tbMin: 768,
  pc: 1280,
  pcMidium: 1440,
  pcMax: 1800,
} as const

export const mq = {
  // ~ 1279
  pc_lt: `(max-width: ${BREAK_POINTS.pc - 1}px)`,
  // 1280 ~
  pc_gt: `(min-width: ${BREAK_POINTS.pc}px)`,
  // ~ 1439
  pcMidium_lt: `(max-width: ${BREAK_POINTS.pcMidium - 1}px)`,
  // 1440 ~
  pcMidium_gt: `(min-width: ${BREAK_POINTS.pcMidium}px)`,
  // 1800 ~
  pcMax_gt: `(min-width: ${BREAK_POINTS.pcMax}px)`,
}
