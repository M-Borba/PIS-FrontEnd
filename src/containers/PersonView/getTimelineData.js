import React from "react";
import moment from "moment";
import { ViewArray } from "@mui/icons-material";

export default function () {
  let items = [];
  let groups = [];

  const data = {
    "people": [
      {
        "id": 1,
        "full_name": "Nicolas Adrien",
        "projects": [
          {
            "id": 1,
            "name": "Proyecto 1",
            "dates": [
              {
                "rol": "developer",
                "start_date": "2021-05-29",
                "end_date": "2021-07-25"
              },
              {
                "rol": "developer",
                "start_date": "2021-09-29",
                "end_date": "2021-12-25"
              }
            ]
          },
          {
            "id": 2,
            "name": "Proyecto 2",
            "dates": [
              {
                "rol": "architect",
                "start_date": "2021-10-29",
                "end_date": "2022-12-27"
              }
            ]
          }
        ]
      },
      {
        "id": 2,
        "full_name": "Juancho Baz",
        "projects": [
          {
            "id": 1,
            "name": "Proyecto 2",
            "dates": [
              {
                "rol": "developer",
                "start_date": "2021-09-29",
                "end_date": "2021-12-25"
              },
              {
                "rol": "developer",
                "start_date": "2021-01-29",
                "end_date": "2021-05-25"
              }
            ]
          },
          {
            "id": 2,
            "name": "Proyecto 20",
            "dates": [
              {
                "rol": "architect",
                "start_date": "2021-10-29",
                "end_date": "2022-12-27"
              }
            ]
          }
        ]
      }
    ]
  }



  var itemId = 0;

  data.people.map((ppl) => {
    groups.push({
      id: ppl.id,
      title: ppl.full_name
    });

    ppl.projects.map((proj) => {


      proj.dates.map((dt) => {

        const startValue = moment(dt.start_date).valueOf();

        var a = moment(dt.start_date, 'YYYY/M/D/');
        var b = moment(dt.end_date, 'YYYY/M/D/');
        var diffDays = b.diff(a, 'days');

        const endValue = moment(startValue + 86400000 * diffDays).valueOf();

        items.push({
          id: itemId + 1,
          group: ppl.id,
          start: startValue,
          end: endValue,
          canResize: "both",
          canMove: false,
          title: proj.name
        })

        itemId++;
      })
    })
  });
  return { groups, items };
}