import { UserApi } from '@/Api';
import { URI } from '@/utils';

class UserService {
  public getStatistics() {
    return UserApi.get(URI.GET_STATISTICS)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  }
}

export default new UserService();
