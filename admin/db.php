<?php
/**
 * Connexion MySQL — mon-agenceweb.fr
 */

define('DB_HOST', 'localhost');
define('DB_NAME', ''); // Nom de la base sur o2switch
define('DB_USER', ''); // Utilisateur MySQL o2switch
define('DB_PASS', ''); // Mot de passe MySQL o2switch

function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        if (!DB_NAME || !DB_USER) {
            throw new RuntimeException('Base de données non configurée. Remplir admin/db.php.');
        }
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    }
    return $pdo;
}
