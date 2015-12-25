<?php
if (PHP_SAPI == 'cli-server') {
    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $file = __DIR__ . $_SERVER['REQUEST_URI'];
    if (is_file($file)) {
        return false;
    }
}
date_default_timezone_set('Europe/Istanbul');

require __DIR__ . '/../vendor/autoload.php';

// Database information
$settings = array(
    'driver' => 'mysql',
    'host' => 'localhost',
	'port' => 3306,
    'database' => 'wtf_db',
    'username' => 'root',
    'password' => '',
    'collation' => 'utf8_turkish_ci',
    'charset' => 'utf8',
    'prefix' => ''
);

// Bootstrap Eloquent ORM
$container = new Illuminate\Container\Container;
$connFactory = new \Illuminate\Database\Connectors\ConnectionFactory($container);
$conn = $connFactory->make($settings);

$resolver = new \Illuminate\Database\ConnectionResolver;
$resolver->addConnection('default', $conn);
$resolver->setDefaultConnection('default');

\Illuminate\Database\Eloquent\Model::setConnectionResolver($resolver);

session_start();

// Instantiate the app
$settings = require __DIR__ . '/../src/settings.php';
$app = new \Slim\App($settings);

// Set up dependencies
require __DIR__ . '/../src/dependencies.php';

// Register middleware
require __DIR__ . '/../src/middleware.php';

// Register routes
require __DIR__ . '/../src/routes.php';

// Run app
$app->run();
