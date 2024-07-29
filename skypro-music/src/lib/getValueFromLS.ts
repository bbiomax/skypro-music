export function getValueFromLocalStorage(key: string) {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch (error) {
    console.log(error);
    return null;
  }
}
