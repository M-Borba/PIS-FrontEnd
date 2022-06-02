import React from "react";

export const BACKEND_HOST =
  process.env.REACT_APP_BACKEND_HOST ||
  "https://operations-development.herokuapp.com";
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

export const DATE_FORMAT = "DD/MM/YYYY";

export const PROJECT_LABELS = {
  AGREGAR_NOTA: "Agregar nota",
  ESTADO: "Estado",
  TIPO: "Tipo",
  DESCRIPCION: "Descripción",
  FECHA_INICIO: "Fecha de inicio",
  FECHA_FIN: "Fecha de fin",
  ORGANIZACION: "Organización",
  TIPO_PROYECTO: "Tipo de proyecto",
  INDEFINIDA: "Indefinida",
  CREACION_PROYECTO: "Creación de proyecto",
  MODIFICACION_PROYECTO: "Modificación de proyecto",
  BUDGET: "Presupuesto",
  APPLY_CHANGES: "Aplicar cambios",
  PERSONAS: "Personas",
  TECNOLOGIAS: "Tecnologías",
  NOMBRE: "Nombre",
  ACCIONES: "Acciones",
  ID: "ID",
  NO_TECNOLOGIAS: "Aún no hay tecnologías asociadas",
  NO_EXISTEN_PROYECTOS_PARA_MOSTRAR: "NO EXISTEN PROYECTOS PARA MOSTRAR",
  NO_EXISTEN_PROYECTOS_AUN: "AÚN NO EXISTEN PROYECTOS EN EL SISTEMA",
  NUEVA_NOTA: "Nueva nota",
  FECHA_INDEFINIDA: "Fecha indefinida",
  EXTENSION_ASIGNACION: "Extensión de asignación",
};

export const PROJECT_STATE_VALUES = {
  VERDE: "verde",
  AMARILLO: "amarillo",
  ROJO: "rojo",
  UPCOMING: "upcoming",
  VERDE_MAYUS: "Verde",
  AMARILLO_MAYUS: "Amarillo",
  ROJO_MAYUS: "Rojo",
  UPCOMING_MAYUS: "Upcoming",
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
  OCULTAR_TERMINADOS: "Ocultar proyectos finalizados",
};

export const PERSON_LABELS = {
  PERSONAS: "Personas",
  PERSONAS_ASIGNADAS: "Personas asignadas",
  AUN_NO_HAY_PERSONAS_ASIGNADAS: "Aún no hay personas asignadas",
  CONFIRMAR_ELIMINACION: "Confirmar eliminación",
  MODIFICA_PERSONA: "Modificación de Persona",
  TIPO_CARGA_HORARIA: "Tipo de carga horaria",
  HORAS: "Horas",
  CARGA_HORARIA: "Carga horaria",
  CARGA_HORARIA_SEMANAL: "Carga horaria semanal",
  TECNOLOGIAS: "Tecnologías",
  ROL: "Rol",
  EMAIL: "Email",
  NOMBRE: "Nombre",
  NOMBRE_COMPLETO: "Nombre completo",
  ACCIONES: "Acciones",
  ID: "ID",
  SEMANALES: "Semanales",
  MENSUALES: "Mensuales",
  NO_EXISTEN_PERSONAS_PARA_MOSTRAR: "No existen personas para mostrar",
  APELLIDO: "Apellido",
  SENIORITY: "Seniority",
  SENIOR: "Senior",
  SEMI_SENIOR: "Semi-Senior",
  JUNIOR: "Junior",
  NO_HAY_COMENTARIOS: "No hay comentarios",
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
  SAVE: "Guardar",
  DELETE: "Eliminar",
  ASSIGN: "Asignar",
  UNASSIGN: "Desasignar",
  AGREGAR_PROYECTO: "Agregar proyecto",
  AGREGAR_PERSONA: "Agregar persona",
  AGREGAR_ADMINISTRADOR: "Agregar administrador",
  ADD: "Agregar",
  EXTEND_ASSIGNATIONS: "Extender asignaciones",
  DESCARGAR_REPORTE: "Descargar reporte",
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

export const ADMIN_LABELS = {
  CREAR_ADMIN: "Creación de administrador",
  EMAIL: PERSON_LABELS.EMAIL,
  NOMBRE: PERSON_LABELS.NOMBRE,
  APELLIDO: PERSON_LABELS.APELLIDO,
  CONTRASENA: LOGIN_LABELS.CONTRASENA,
  CONFIRMAR_CONTRASENA: LOGIN_LABELS.CONFIRMAR_CONTRASENA,
};

export const REQUEST_LABELS = {
  UPDATE_SUCCESS: "Los cambios se aplicaron con éxito",
};

export const COLORS = {
  white: "#fff",
  black: "#000",
  menuItemHover: "#EEEFF6",
  menuItemSelected: "#E3E1F3",
  primaryPurple: "#6B5ECD",
  containerBorder: "#e3e3e3",
  primaryPurpleHover: "#504699",
  textFieldBorder: "#F8F8FA",
  stateGreen: "#7EDE6D",
  stateRed: "#E87272",
  stateYellow: "#FAE269",
  stateUpcoming: "#B0CFCB",
  timelineRed: "#C14B3A",
  buttonRed: "#C21321",
  buttonRedHover: "#990F1B",
  backgroundDarkestGrey: "#252525",
  backgroundDarkGrey: "#404040",
  backgroundBlack: "#1C1C1C",
  backgroundWhite: "#FAFAFA",
  filterFormBackground: "#E2E0F2",
  scrollThumb: "#C7C7C7",
  scrollThumbHover: "#999999",
};
