export function Api() {
    return fetch('http://localhost:8080/api/users').then((res) => {
    // if (res.ok) {
        return res.json();
    // }
    // return Promise.reject(`Ошибка: ${res.status}`);
    });
}
