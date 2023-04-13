# TP2 - Autentikasi Laravel

Tugas personal 2 yang dibuat dengan Autentikasi web pada Laravel 10

## Technology Used

-   Laravel 10 (for backend REST-API)
-   InertiaJS (for ReactJS frontend)
-   TailwindCSS (for UI Styling)
-   SQLite (for database)

## Getting Started

Run:

```bash
composer install
cp .env.example .env
touch database/database.sqlite
php artisan key:generate
php artisan jwt:secret
```

Edit `.env` file:

```env
DB_CONNECTION=sqlite
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD=

...

JWT_SHOW_BLACKLIST_EXCEPTION=true
```

> NOTE: For mail setup, we use smtp service from outlook.

Finally, run:

```bash
php artisan migrate:fresh --seed
```

## Start Local Development

To start local development, we must open 2 tabs terminal

-   Tab 1:

```bash
npm run dev
```

-   Tab 2:

```bash
php artisan serve
```

Finally, open [localhost:8000](http://localhost:8000/)

## References

Below are references to create this project:

-   [Laravel 10](https://laravel.com/)
-   [Inertia JS](https://inertiajs.com/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [JWT-AUTH by PHP Open Source Saver](https://github.com/PHP-Open-Source-Saver/jwt-auth)
-   [Email Template](https://github.com/ColorlibHQ/email-templates/tree/master/10)
