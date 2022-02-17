import React from "react";

export const BACKEND_HOST =
  process.env.REACT_APP_BACKEND_HOST ||
  "https://operations-development.herokuapp.com/";
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
export const cargasHorarias_t = ["monthly", "weekly"];
export const cargasHorarias_tFormateadas = {
  monthly: "Mensuales",
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

export const PROJECT_LABELS = {
  ESTADO: "Estado",
  TIPO: "Tipo",
  FECHA_INICIO: "Fecha de inicio",
  FECHA_FIN: "Fecha de fin",
  ORGANIZACION: "Organización",
  TIPO_PROYECTO: "Tipo de proyecto",
  INDEFINIDA: "Indefinida",
  BUDGET: "Presupuesto",
  APPLY_CHANGES: "Aplicar cambios",
  PERSONAS: "Personas",
  TECNOLOGIAS: "Tecnologías",
  NOMBRE: "Nombre",
  ACCIONES: "Acciones",
  ID: "ID",
};

export const SWITCHER_LABELS = {
  PROYECTOS: "'Proyectos'",
  PERSONAS: "'Personas'",
};

export const FILTER_FORM_LABELS = {
  FILTRAR_POR: "Filtrar por",
  CUALQUIERA: "Cualquiera",
  STAFF_AUGMENTATION: "Staff Augmentation",
  END_TO_END: "End to End",
  TERCERIZADO: "Tercerizado",
  HIBIRDO: "Híbrido",
  LIMPIAR_FILTROS: "Limpiar filtros",
};

export const PERSON_LABELS = {
  TIPO_CARGA_HORARIA: "Tipo de carga horaria",
  CARGA_HORARIA: "Carga horaria",
  CARGA_HORARIA_SEMANAL: "Carga horaria semanal",
  TECNOLOGIAS: "Tecnologías",
  ROL: "Rol",
  EMAIL: "Email",
  NOMBRE: "Nombre",
  NOMBRE_COMPLETO: "Nombre completo",
  ACCIONES: "Acciones",
  ID: "ID",
};

export const HEADER_LABELS = {
  INICIO: "Inicio",
  PROYECTOS: "Proyectos",
  PERSONAS: "Personas",
  ADMINS: "Admins",
  CERRAR_SESION: "Cerrar sesión",
  CONFIGURACION_DE_CUENTA: "Configuración de la cuenta",
};

export const BUTTON_LABELS = {
  APPLY_CHANGES: "Aplicar cambios",
  CANCEL: "Cancelar",
  UNASSIGN: "Desasignar",
  AGREGAR_PROYECTO: "Agregar proyecto",
  AGREGAR_PERSONA: "Agregar persona",
  AGREGAR_ADMINISTRADOR: "Agregar administrador",
};

export const LOGIN_LABELS = {
  INICIAR_SESION: "Iniciar sesión",
  EMAIL: "Email",
  CONTRASENA: "Contraseña",
  CAMBIO_TEXTO:
    "Parece que es la primera vez que inicia sesión. Por favor, ingrese una nueva contraseña.",
  CONFIRMAR_CONTRASENA: "Confirme su contraseña",
  CAMBIO_BUTTON: "Establecer nueva contraseña e iniciar sesión",
};
