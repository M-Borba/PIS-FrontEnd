import randomColor from "randomcolor";
import moment from "moment";

export default function (groupCount = 30, itemCount = 100) {
  let randomSeed = Math.floor(Math.random() * 1000);
  let groups = [];
  for (let i = 0; i < groupCount; i++) {
    groups.push({
      id: `${i + 1}`,
      title: "Nombre " + `${i}`,
      bgColor: randomColor({ luminosity: "light", seed: randomSeed + i }),
    });
  }
  let items = [];
  for (let i = 0; i < itemCount; i++) {
    const startDate = new Date(2021, 8, 1, 0, 0); //dia de setiembre
    //const day = 86400000 * Math.floor(Math.random() * 30); si se quiere hacer random el dia
    const day = 86400000;
    const startValue = moment(startDate).valueOf() + day; //dia random del mes de setiembre
    const endValue = moment(startValue + 86400000 * 20).valueOf(); //86400000 = 24h (trabajo duracion 20 dias)

    items.push({
      id: i + "",
      group: Math.ceil((groupCount * i) / itemCount),
      start: startValue,
      end: endValue,
      title: "Proyecto " + `${i % 30}`,
      canMove: startValue > new Date().getTime(),
      canResize: "both",
      canChangeGroup: true,
      className:
        moment(startDate).day() === 6 || moment(startDate).day() === 0
          ? "item-weekend"
          : "",
    });
  }

  items = items.sort((a, b) => b - a);

  return { groups, items };
}
