import { UserApi } from '@/Api';
import { URI } from '@/utils';
import { RowType, DayType } from '@/types';

class UserService {
  public getStatistics() {
    return UserApi.get(URI.GET_STATISTICS)
      .then((response) => response.json())
      .then((dataTable) => {
        const getMockData = () => {
          return {
            Date: null,
            End: null,
            Start: null,
          };
        };

        const setNullElement = (row: RowType) => {
          const length = row.Days.length;

          if (length < 31) {
            row.Days.forEach((day: DayType, index: number) => {
              if (
                typeof day.Date === 'string' &&
                new Date(day.Date).getDate() !== index + 1
              ) {
                row.Days.splice(index, 0, getMockData());
              }
            });
          }
        };

        dataTable.forEach((row: RowType) => {
          setNullElement(row);

          const length = 31 - row.Days.length;

          for (let i = 0; i < length; i++) {
            row.Days.push(getMockData());
          }
        });

        return dataTable;
      })
      .catch((err) => console.log(err));
  }
}

export default new UserService();
