# Stocktree Auth API Documentation

## Overview

The Stocktree Auth API is a Node.js application built with the Express framework, written in TypeScript. It provides authentication-related functionality for the Stocktree project.

## Table of Contents

- [Stocktree Auth API Documentation](#stocktree-auth-api-documentation)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Database](#database)
  - [Contributing](#contributing)
  - [License](#license)

## Prerequisites

Before running the Stocktree Auth API, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (v6.0.0 or higher)
- [TypeScript](https://www.typescriptlang.org/) (v4.0.0 or higher)
- [Knex.js](http://knexjs.org/) (v0.95.0 or higher)
- [MySQL](https://www.mysql.com/) (v8.0.0 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ahsanf/stocktree-auth-api.git
cd stocktree-auth-api
```

2. Install dependencies:

```bash
npm install
```

3. Build the TypeScript code:

```bash
npm run build
```

## Configuration

Configure the application by creating a `.env` file in the root directory:

```env
cp .env .env.example
```

## Usage

Run the application in development mode:

```bash
npm run dev
```

Or run in production mode:

```bash
npm start
```

## Database

The Stocktree Auth API uses Knex.js as the query builder for PostgreSQL. Migrations and seeds are located in the `migrations` directory.

To run migrations and seeds, use the following commands:

```bash
npm run knex migrate:latest
npm run knex seed:run
```

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
