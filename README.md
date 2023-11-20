```markdown
# Hexagonal Architecture with TypeScript

## Overview

This project demonstrates the implementation of a Hexagonal Architecture using TypeScript. The Hexagonal Architecture, also known as Ports and Adapters, emphasizes the separation of concerns and the independence of application core logic from external concerns such as databases, user interfaces, and frameworks.

## Project Structure

```
project-root
|-- src
|   |-- application
|   |   |-- usecases
|   |   |   |-- createOrder.ts
|   |   |   |-- updateOrder.ts
|   |   |-- ports
|   |   |   |-- orderRepository.ts
|   |   |-- services
|   |       |-- orderService.ts
|   |-- domain
|   |   |-- entities
|   |   |   |-- order.ts
|   |   |-- value-objects
|   |       |-- orderId.ts
|   |-- infrastructure
|   |   |-- adapters
|   |   |   |-- in-memory-order-repository.ts
|   |   |-- main.ts
|-- test
|   |-- application
|   |   |-- usecases
|   |   |   |-- createOrder.test.ts
|   |   |   |-- updateOrder.test.ts
|   |   |-- ports
|   |       |-- orderRepository.test.ts
|   |-- domain
|   |   |-- entities
|   |       |-- order.test.ts
|   |   |-- value-objects
|   |       |-- orderId.test.ts
|   |   |-- services
|   |       |-- orderService.test.ts
|   |-- infrastructure
|       |-- adapters
|           |-- in-memory-order-repository.test.ts
|-- tsconfig.json
|-- package.json
|-- README.md
```

## Components

- **Application Layer**: Contains use cases that define the application's behavior. These use cases interact with the domain layer through ports.

- **Domain Layer**: Defines the core business logic, including entities and value objects.

- **Infrastructure Layer**: Contains adapters that implement ports defined in the application layer. Also includes the `main.ts` file where dependencies are wired together.

- **Test Directory**: Corresponding test files for each component to ensure the correctness of the implementation.

## How to Run

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Run the application using `npm start`.

## Testing

Run tests using `npm test` to ensure the correctness of the application logic.

## Dependencies

- Node.js
- TypeScript
- Jest (for testing)
```

Silakan sesuaikan dengan struktur proyek dan ketergantungan spesifik dari proyek TypeScript Hexagonal Architecture Anda.