export function FormatSeconds(inputSec: number | undefined) {
  if (inputSec) {
    let minutes: number = Math.floor(inputSec / 60);
    let seconds = Math.floor(inputSec) - minutes * 60;
    return `${minutes}:${seconds > 9 ? "" : "0"}${seconds}`;
  }
  return `0:00`;
}
