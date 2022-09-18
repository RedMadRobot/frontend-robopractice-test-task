import { UserApi } from '@/Api';

class UserService {
  public getStatistics() {
    return UserApi.get('users')
      .then((response) => response.json())
      .catch((err) => console.log(err));
  }
}

export default new UserService();
