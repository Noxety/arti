# Project Setup

This repository contains the setup for a Laravel-based project with additional integration for Laravel Reverb.

## Prerequisites

Ensure you have the following installed:
- PHP >= 8.0
- Composer
- Node.js and npm
- MySQL or any other supported database
- Laravel Reverb package

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. Install PHP dependencies:
    ```bash
    composer install
    ```

3. Install JavaScript dependencies:
    ```bash
    npm install
    ```

4. Copy the `.env.example` file to `.env` and configure your environment variables:
    ```bash
    cp .env.example .env
    ```

5. Generate the application key:
    ```bash
    php artisan key:generate
    ```

6. Run database migrations:
    ```bash
    php artisan migrate
    ```

7. (Optional) Seed the database:
    ```bash
    php artisan db:seed
    ```

8. Build frontend assets:
    ```bash
    npm run dev
    ```

## Laravel Reverb Integration

Laravel Reverb is already included in this project. To configure it:
1. Publish the Reverb configuration:
    ```bash
    php artisan vendor:publish --tag=reverb-config
    ```
2. Update the configuration in `config/reverb.php` as needed.

## Running the Application

Start the development server:
```bash
php artisan serve
```

Visit the application at `http://localhost:8000`.

## Testing

Run the test suite:
```bash
php artisan test
```

## Contributing

Feel free to submit issues or pull requests to improve the project.

## License

This project is licensed under the [MIT License](LICENSE).