import { BASE_URI } from '@/utils';

class UserApi {
  private _baseUri: string;

  constructor() {
    this._baseUri = BASE_URI;
  }

  get(url: string) {
    return fetch(`${this._baseUri}/${url}`);
  }
}

export default new UserApi();
