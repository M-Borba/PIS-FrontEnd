# PIS-FrontEnd
Repositorio dedicado al frontendend para el proyecto de ingeniería de software de la facultad de ingeniería UDELAR 2021.
El mismo fue creado con el comando [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) el cual genera dependencias y una estructura básica para el proyecto.

# Comandos importantes
- Para instalar las dependencias del proyecto correr el comando `npm install`.
- Para levantar el proyecto localmente correr el comando `npm start`
- Para ejecutar los tests correr el comando `npm run test`
- Para el buildear el proyecto para deploy correr el comando `npm run build`

# Linter: ESLint
Las reglas se encuentran configuradas en el archivo `.eslintrc.json` en la clave "rules"
Se recomienda instalar las extension ESLint (dbaeumer.vscode-eslint)

# Formatter: Prettier
Para formatear los archivos `.js`,`.jsx` y `.json` antes de commitear, se puede correr el comando `npm run format` configurado en el archivo `package.json`. Se podrían agregar por ejemplo también que se formateen los archivos `.md`
Se recomienda instalar las extension Prettier (esbenp.prettier-vscode)

# Pre-commit
Para simplificar los code reviews, antes de realizar un commit se corre `npm run format` para que todos los archivos subidos al repositorio sean consistentes en formato. Para agregar o quitar comandos al pre-commit se debe editar el archivo `.husky/pre-commit`
