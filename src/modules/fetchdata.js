export async function fetchData(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
