/**
 * clamp
 * 引数に与えられたvalを最小値がmin以下ならminの値を
 * max以上ならmaxの値を返す
 * valがmin~maxの範囲であればそのまま返す
 *
 * @param {number} val 範囲に収める数値
 * @param {number} min 最小値
 * @param {number} max 最大値
 * @return {number} min ~ max の数値
 */
const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(min, val), max);

/**
 * mapLinear
 * 引数に与えられたvalをinMin ~ inMaxの範囲からoutMin ~ outMaxの範囲に適応して返す
 * clampがtrueのときは出力範囲外でも無理やり範囲に収める
 *
 * @param {number} val 範囲に収める数値
 * @param {number} inMin 入力の最小値
 * @param {number} inMax 入力の最大値
 * @param {number} outMin 出力の最小値
 * @param {number} outMax 出力の最大値
 * @param {boolean} clampOutput 出力値をclampするかどうか
 * @return {number} outMin ~ outMax の数値
 */
export const mapLinear = (
  val: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clampOutput: boolean
): number => {
  const v = outMin + ((val - inMin) * (outMax - outMin)) / (inMax - inMin);
  return clampOutput ? clamp(v, outMin, outMax) : v;
};

export default {
  mapLinear,
};
