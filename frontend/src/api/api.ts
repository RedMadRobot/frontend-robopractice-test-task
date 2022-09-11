const fetchData = async () => {
  const response = await fetch("http://localhost:8080/api/users");
  const json = await response.json();
  localStorage.setItem("serverData", JSON.stringify(json));
  return JSON.stringify(json);
}

const api = {
  fetchData
}

export default api;
