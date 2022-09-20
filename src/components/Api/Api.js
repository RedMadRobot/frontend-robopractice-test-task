export function Api() {
    return fetch('http://localhost:8080/api/users').then((res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// export const resultHandler = (res) => {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(`Ошибка: ${res.status}`);
// };

// class Api {
//   constructor(baseUrl) {
//     this._baseUrl = baseUrl;
//   }

//   getUsers() {
//     return fetch(this._baseUrl).then(resultHandler)
// }
// }

// export const api = new Api('http://localhost:8080/api/users');