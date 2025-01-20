<?php
require_once 'db.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

$allowedTables = ['utilisateur', 'administrateur', 'reservations', 'evenements'];

if (isset($_GET['table']) && in_array($_GET['table'], $allowedTables)) {
    $table = $_GET['table'];
} else {
    echo json_encode(['message' => 'Table non valide']);
    exit;
}

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM $table");
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $e) {
            echo json_encode(['message' => 'Erreur lors de la récupération des données', 'error' => $e->getMessage()]);
        }
        break;

    case 'POST':
        if (!empty($input)) {
            try {
                $columns = implode(', ', array_keys($input));
                $values = implode(', ', array_fill(0, count($input), '?'));
                $stmt = $pdo->prepare("INSERT INTO $table ($columns) VALUES ($values)");
                $stmt->execute(array_values($input));
                echo json_encode(['message' => 'Ajout réussi']);
            } catch (PDOException $e) {
                echo json_encode(['message' => 'Erreur lors de l\'ajout', 'error' => $e->getMessage()]);
            }
        } else {
            echo json_encode(['message' => 'Données manquantes']);
        }
        break;

    case 'PUT':
        if (isset($_GET['id']) && !empty($input)) {
            $id = $_GET['id'];
            try {
                $updates = [];
                foreach ($input as $key => $value) {
                    $updates[] = "$key = ?";
                }
                $updates = implode(', ', $updates);
                $stmt = $pdo->prepare("UPDATE $table SET $updates WHERE idUser = ? OR idAdmin = ? OR idReserve = ? OR idEvent = ?");
                $stmt->execute([...array_values($input), $id, $id, $id, $id]);
                echo json_encode(['message' => 'Mise à jour réussie']);
            } catch (PDOException $e) {
                echo json_encode(['message' => 'Erreur lors de la mise à jour', 'error' => $e->getMessage()]);
            }
        } else {
            echo json_encode(['message' => 'ID ou données manquantes']);
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            try {
                $stmt = $pdo->prepare("DELETE FROM $table WHERE idUser = ? OR idAdmin = ? OR idReserve = ? OR idEvent = ?");
                $stmt->execute([$id, $id, $id, $id]);
                echo json_encode(['message' => 'Suppression réussie']);
            } catch (PDOException $e) {
                echo json_encode(['message' => 'Erreur lors de la suppression', 'error' => $e->getMessage()]);
            }
        } else {
            echo json_encode(['message' => 'ID manquant']);
        }
        break;

    default:
        echo json_encode(['message' => 'Méthode non prise en charge']);
        break;
}
?>