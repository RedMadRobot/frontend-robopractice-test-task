type DateString = `${number}-${number}-${number}`;

interface IUserDays{
  "Date": DateString,
  "End": string,
  "Start": string
}

export default interface IUserRaw{
  "id": number,
  "Fullname": string,
  "Days": IUserDays[]
}