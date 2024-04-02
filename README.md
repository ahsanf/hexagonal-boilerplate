# Hexagonal Architecture Boilerplate with TypeScript

This repository provides a boilerplate for implementing a Hexagonal Architecture using TypeScript. Hexagonal Architecture, also known as Ports and Adapters Architecture, is a software architectural pattern that aims to create loosely coupled application components that are independent of the external interfaces.

## Features

- **Hexagonal Architecture**: Implementing a clear hexagonal architecture to separate core business logic from external concerns.
- **TypeScript**: Utilizing TypeScript for static typing and better maintainability.
- **Dependency Injection**: Implementing dependency injection to decouple components and facilitate testing.
- **Test-Driven Development (TDD)**: Encouraging the practice of TDD to ensure code quality and reliability.
- **Ready-to-Use Structure**: Provides a basic structure to kickstart your project development.
- **MySQL Service**: Integrates a MySQL service for relational database management.
- **MongoDB Service**: Includes a MongoDB service for NoSQL database management.
- **RabbitMQ Service**: Incorporates a RabbitMQ service for message queueing and asynchronous communication.
- **JWT Utility**: Provides a utility for JSON Web Token (JWT) generation and verification for secure authentication and authorization.
- **Logger Service**: Implements a logger service for centralized logging and better debugging capabilities.

## Getting Started

To get started with this boilerplate, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using:

    ```bash
    git clone https://github.com/ahsanf/hexagonal-boilerplate.git
    ```

2. **Install Dependencies**: Navigate to the project directory and install dependencies:

    ```bash
    cd hexagonal-boilerplate
    npm install
    ```

3. **Start Development Server**: Start the development server:

    ```bash
    npm start
    ```

4. **Build for Production**: When ready to deploy, build the project for production:

    ```bash
    npm run build
    ```

5. **Run Tests**: Run tests to ensure everything is working as expected:

    ```bash
    npm test
    ```

## Folder Structure

```
├── src/
│   ├── adapter/                # Adapters layer
│   │   ├── in/                 # Input adapters (HTTP controllers)
│   │   └── out/                # Output adapters (Database, External APIs)
│   ├── app/                    # Application layer
│   │   ├── services/           # Business logic services
│   │   └── port/               # Ports (interfaces for external concerns)
|   |        └── out/           # Output ports (interfaces for external concerns)
|   |           └── use_case/   # Use cases (application logic)
│   ├── domain/                 # Domain layer (core business logic)
|   |-- util/                   # Utility functions
│   └── index.ts                # Main entry point
├── tests/                      # Test files
├── .gitignore                  # Git ignore file
├── package.json                # npm package configuration
└── tsconfig.json               # TypeScript configuration
```

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or feature requests, feel free to open an issue or create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.