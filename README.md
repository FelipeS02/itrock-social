## Sobre la solucion

En este proyecto busqué crear una red social exclusiva para los trabajadores de ITROCK, donde mi objetivo es expresar la vision artistica de la marca a traves de los diferentes elementos de la interfaz (colores, bordes en punta, background visual de papel, etc.)

Algunos de los puntos claves:

- Construccion de requerimientos aplicando Clean Architecture y SOLID
- Creacion del diseño en [Figma](https://www.figma.com/design/xw89dGWQxuN3TRKjtQ0oRA/ITROCK-Social-media?node-id=0-1&p=f&t=SmrNK91yKoclYHUy-0)
- Configuracion de elementos SEO para posicionamiento de la aplicacion
- Prettier configurado para funcionar con clases de TailwindCSS
- Eslint con reglas establecidas para respetar un orden especifico de imports (ver .eslintrc.json)
- Uso de zod para validar estructura de objetos y formularios
- Posibilidad de crear posts y comentarios con imagenes
- Posibilidad de dar like a las publicaciones
- Manteniendo la simplicidad del requerimiento, se creo un sistema de expiracion de sesiones
- Componentes accesibles construidos en base a shadcn y radix ui
- Uso de lenis para mejorar la lectura de los posts
- Creacion de store siguiendo los patrones recomendados por redux-toolkit realizando la persitencia de forma manual

A mejorar:

- Documentacion de componentes en storybook

## Iniciar el proyecto

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Storybook

```bash
npm run storybook
# or
yarn storybook
# or
pnpm storybook
# or
bun storybook
```

## Inicio de sesion

Para iniciar sesion, se puede utilizar cualquier e-mail con el dominio "itrocksweb.com", aunque, los listados dentro del archivo "mock-posts.ts" contienen elementos personalizados para cada uno de ellos

contraseña: ITROCK2025

## Deploy

El deploy fue realizado de manera sencilla con el flujo proporcionado por la plataforma de vercel
