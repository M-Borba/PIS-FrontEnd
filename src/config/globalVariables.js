export const BACKEND_HOST =
  process.env.BACKEND_HOST || "https://operations-development.herokuapp.com/";
export const NOT_LOGGED = "Aún no inició sesión";
export const roles = [
  "Desarrollador",
  "PM",
  "Tester",
  "Arquitecto",
  "Analista",
  "Diseñador",
];
export const rolesTraducidos = {
  Desarrollador: "developer",
  PM: "pm",
  Tester: "tester",
  Arquitecto: "architect",
  Analista: "analyst",
  Diseñador: "designer",
  desarrollador: "developer",
  pm: "pm",
  tester: "tester",
  arquitecto: "architect",
  analista: "analyst",
  diseñador: "designer",
};
export const rolesFormateados = {
  developer: "Desarrollador",
  pm: "PM",
  tester: "Tester",
  architect: "Arquitecto",
  analyst: "Analista",
  designer: "Diseñador",
};
export const ROLES_CHECKBOX = [
  ["Desarrollador", false],
  ["PM", false],
  ["Tester", false],
  ["Arquitecto", false],
  ["Analista", false],
  ["Diseñador", false],
];
export const cargasHorarias_t = ["daily", "weekly"];
export const cargasHorarias_tFormateadas = {
  daily: "Diarias",
  weekly: "Semanales",
};

export const customTimeSteps = {
  second: 0,
  minute: 0,
  hour: 0,
  day: 1,
  month: 1,
  year: 1,
};
