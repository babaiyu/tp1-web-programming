# TP2 - Autentikasi Laravel

Tugas personal 2 yang dibuat dengan Autentikasi web pada Laravel 10

### Prerequisite

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

Finally, run:

```bash
php artisan migrate:fresh --seed
```
