

# Plantilla de Arquitectura Hexagonal con TypeScript

Este repositorio proporciona una plantilla para implementar una Arquitectura Hexagonal usando TypeScript. La Arquitectura Hexagonal, también conocida como Arquitectura de Puertos y Adaptadores, es un patrón arquitectónico de software que busca crear componentes de aplicación débilmente acoplados e independientes de las interfaces externas.

## Características

- **Arquitectura Hexagonal**: Implementación de una arquitectura hexagonal clara para separar la lógica central del negocio de las preocupaciones externas.
- **TypeScript**: Uso de TypeScript para tipado estático y mejor mantenibilidad.
- **Inyección de Dependencias**: Implementación de inyección de dependencias para desacoplar componentes y facilitar las pruebas.
- **Desarrollo Guiado por Pruebas (TDD)**: Fomento de la práctica de TDD para garantizar la calidad y fiabilidad del código.
- **Estructura Lista para Usar**: Proporciona una estructura básica para iniciar el desarrollo de tu proyecto.
- **Servicio MySQL**: Integra un servicio MySQL para la gestión de bases de datos relacionales.
- **Servicio MongoDB**: Incluye un servicio MongoDB para la gestión de bases de datos NoSQL.
- **Servicio RabbitMQ**: Incorpora un servicio RabbitMQ para colas de mensajes y comunicación asíncrona.
- **Utilidad JWT**: Proporciona una utilidad para la generación y verificación de JSON Web Token (JWT) para autenticación y autorización seguras.
- **Servicio de Registro (Logger)**: Implementa un servicio de registro para el registro centralizado y mejores capacidades de depuración.

## Primeros Pasos

Para comenzar con esta plantilla, sigue estos pasos:

1. **Clonar el Repositorio**: Clona este repositorio en tu máquina local usando:

    ```bash
    git clone https://github.com/ahsanf/hexagonal-boilerplate.git
    ```

2. **Instalar Dependencias**: Navega al directorio del proyecto e instala las dependencias:

    ```bash
    cd hexagonal-boilerplate
    npm install
    ```

3. **Iniciar el Servidor de Desarrollo**: Inicia el servidor de desarrollo:

    ```bash
    npm start
    ```

4. **Compilar para Producción**: Cuando estés listo para desplegar, compila el proyecto para producción:

    ```bash
    npm run build
    ```

5. **Ejecutar Pruebas**: Ejecuta las pruebas para asegurar que todo funcione como se espera:

    ```bash
    npm test
    ```

## Estructura de Carpetas

```
├── src/
│   ├── adapter/                # Capa de adaptadores
│   │   ├── in/                 # Adaptadores de entrada (controladores HTTP)
│   │   └── out/                # Adaptadores de salida (Base de datos, APIs externas)
│   ├── app/                    # Capa de aplicación
│   │   ├── services/           # Servicios de lógica de negocio
│   │   └── port/               # Puertos (interfaces para preocupaciones externas)
|   |        └── out/           # Puertos de salida (interfaces para preocupaciones externas)
|   |           └── use_case/   # Casos de uso (lógica de aplicación)
│   ├── domain/                 # Capa de dominio (lógica central del negocio)
|   |-- util/                   # Funciones utilitarias
│   └── index.ts                # Punto de entrada principal
├── tests/                      # Archivos de prueba
├── .gitignore                  # Archivo de exclusión de Git
├── package.json                # Configuración del paquete npm
└── tsconfig.json               # Configuración de TypeScript
```

## Contribuciones

¡Las contribuciones son bienvenidas! Si tienes sugerencias, mejoras o solicitudes de funciones, no dudes en abrir un issue o crear un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.
