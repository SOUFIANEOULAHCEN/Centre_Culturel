<?php
require_once './db.php';

// header('Content-Type: application/json');

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

try {
    switch ($method) {
        case 'GET':
            if (isset($_GET['id'])) {
                $stmt = $conn->prepare("SELECT * FROM Utilisateur WHERE idUser = ?");
                $stmt->execute([$_GET['id']]);
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($result) {
                    echo json_encode($result);
                } else {
                    echo json_encode(["error" => "Utilisateur non trouvé"]);
                }
            } else {
                $stmt = $conn->query("SELECT * FROM Utilisateur");
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($result);
            }
            break;

        case 'POST':
            if (!empty($data['nom']) && !empty($data['prenom']) && !empty($data['email']) && !empty($data['MotDePass'])) {
                $stmt = $conn->prepare("INSERT INTO Utilisateur (nom, prenom, email, MotDePass) VALUES (?, ?, ?, ?)");
                if ($stmt->execute([$data['nom'], $data['prenom'], $data['email'], $data['MotDePass']])) {
                    echo json_encode(["message" => "Utilisateur ajouté avec succès"]);
                } else {
                    echo json_encode(["error" => "Erreur lors de l'ajout de l'utilisateur"]);
                }
            } else {
                echo json_encode(["error" => "Données manquantes"]);
            }
            break;

        case 'PUT':
            if (isset($_GET['id']) && !empty($data['nom']) && !empty($data['prenom']) && !empty($data['email']) && !empty($data['MotDePass'])) {
                $stmt = $conn->prepare("UPDATE Utilisateur SET nom = ?, prenom = ?, email = ?, MotDePass = ? WHERE idUser = ?");
                if ($stmt->execute([$data['nom'], $data['prenom'], $data['email'], $data['MotDePass'], $_GET['id']])) {
                    echo json_encode(["message" => "Utilisateur mis à jour avec succès"]);
                } else {
                    echo json_encode(["error" => "Erreur lors de la mise à jour de l'utilisateur"]);
                }
            } else {
                echo json_encode(["error" => "ID ou données manquantes"]);
            }
            break;

        case 'DELETE':
            if (isset($_GET['id'])) {
                $stmt = $conn->prepare("DELETE FROM Utilisateur WHERE idUser = ?");
                if ($stmt->execute([$_GET['id']])) {
                    echo json_encode(["message" => "Utilisateur supprimé avec succès"]);
                } else {
                    echo json_encode(["error" => "Erreur lors de la suppression de l'utilisateur"]);
                }
            } else {
                echo json_encode(["error" => "ID manquant"]);
            }
            break;

        default:
            echo json_encode(["error" => "Méthode non supportée"]);
            break;
    }
} catch (Exception $e) {
    echo json_encode(["error" => "Une erreur est survenue : " . $e->getMessage()]);
}
