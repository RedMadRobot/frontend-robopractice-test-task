import React from "react";

const DateTime: string | any = ({ date }) => {
  // создаем массив с датами за май
  const check = new Array(31)
    .fill(new Date("2021-04-30"))
    .map((d) =>
      new Date(d.setDate(d.getDate() + 1)).toISOString().slice(0, 10)
    );

  // создаем массив объектов с днем и разницей во времени
  const days_diff = date.map((d) => {
    let s = `${d.Date}T${d.Start.replace("-", ":")}`;
    let f = `${d.Date}T${d.End.replace("-", ":")}`;
    return {
      date: d.Date,
      diff: new Date(new Date(f).valueOf() - new Date(s).valueOf())
        .toISOString()
        .slice(11, 16),
    };
  });

  // проверяем пропуски в днях и заполняем нулями
  const diffs = check.map((dc) => {
    const index = days_diff.map((d) => d.date).indexOf(dc);
    return index >= 0 ? days_diff.at(index).diff : "0";
  });

  // получаем общее время за месяц
  const getTotal = () => {
    const total = date.reduce((p, c) => {
      let s = `${c.Date}T${c.Start.replace("-", ":")}`;
      let f = `${c.Date}T${c.End.replace("-", ":")}`;
      return p + (new Date(f).valueOf() - new Date(s).valueOf());
    }, 0);

    const hour = 60 * 60 * 1000;
    const minute = 60 * 1000;
    const h = Math.floor(total / hour);
    const m = Math.floor((total - hour * h) / minute);
    return `${h < 10 ? "0" : ""}${h}:${m < 10 ? "0" : ""}${m}`;
  };

  diffs.push(getTotal());

  return diffs.map((value, index) => (
    <td key={index}>
      {" "}
      <div className="td-resize">{value}</div>
    </td>
  ));
};

export default DateTime;
