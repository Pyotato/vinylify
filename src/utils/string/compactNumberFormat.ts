/**
 * 팔로워 수를 한국식으로 간략화 (ex. 5650186 => 565만)
 */

export default function compactNumberFormat(
  text: number | bigint,
  region = 'ko-KR',
) {
  return new Intl.NumberFormat(region, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(text);
}
