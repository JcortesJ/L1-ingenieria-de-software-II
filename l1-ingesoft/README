# Sistema de Gestión de Viviendas y Habitantes

Este sistema permite gestionar información sobre viviendas y sus habitantes, incluyendo cabezas de familia y relaciones entre personas.

## Funcionalidades Principales

### Gestión de Personas

- Registro de personas con información básica:
  - Nombre
  - Fecha de nacimiento
  - Género
  - Indicador de cabeza de familia
  - Relación con cabeza de familia
- Validación de datos personales
- Manejo de relaciones familiares

### Gestión de Viviendas

- Registro de viviendas con:
  - Tipo de vivienda (casa, apartamento, conjunto)
  - Dirección
  - Municipio
  - Propietario/Responsable
- Control de viviendas ocupadas y disponibles
- Asignación de habitantes a viviendas

### Funcionalidades Especiales

- Traslado de habitantes entre viviendas
- Registro de modalidades de ocupación (propiedad, arriendo, otro)
- Gestión de fechas de ocupación
- Eliminación de viviendas con reasignación de habitantes

## Tecnologías Utilizadas

- TypeScript
- React/Next.js
- API REST
- Tailwind CSS
- clsx para manejo de clases condicionales

## Estructura del Proyecto

El proyecto está organizado en varios módulos:

- `actions/`: Contiene las funciones para interactuar con el backend
- `lib/`: Utilidades y funciones auxiliares
- `api/`: Endpoints para operaciones CRUD

## Utilidades Principales

- `getInputData`: Genera formularios dinámicos según la entidad
- `getAllCdf`: Obtiene lista de cabezas de familia
- `getViviendasVacias`: Consulta viviendas disponibles
- `formatearFecha`: Formatea fechas al formato español

## Instalación y Uso

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno
4. Ejecutar en desarrollo: `npm run dev`

## Notas Importantes

- El sistema maneja validaciones para datos faltantes o incorrectos
- Se implementan verificaciones de roles (cabeza de familia)
- Incluye manejo de errores y logging
- Interface amigable con formularios dinámicos
