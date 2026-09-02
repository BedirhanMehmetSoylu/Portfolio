<?php

// Nur diese Origin darf das Skript aufrufen (statt "*")
$allowedOrigin = 'https://bedirhan-soylu.de'; // ggf. an deine echte Domain anpassen
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Vary: Origin");

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): // Preflight
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;

    case ("POST"):
        header('Content-Type: application/json; charset=utf-8');

        $json = file_get_contents('php://input');
        $params = json_decode($json);

        if (!$params) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid payload']);
            exit;
        }

        $name = trim((string)($params->name ?? ''));
        $email = trim((string)($params->email ?? ''));
        $userMessage = trim((string)($params->message ?? ''));

        // Pflichtfelder pruefen
        if ($name === '' || $email === '' || $userMessage === '') {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Missing required fields']);
            exit;
        }

        // E-Mail-Format validieren
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid email address']);
            exit;
        }

        // Header-Injection verhindern: Zeilenumbrueche aus Name/E-Mail entfernen,
        // bevor sie in Betreff/Header verwendet werden
        $safeName = str_replace(["\r", "\n"], '', $name);
        $safeEmail = str_replace(["\r", "\n"], '', $email);

        // Nachrichtentext fuer HTML-Ausgabe escapen
        $safeMessage = nl2br(htmlspecialchars($userMessage, ENT_QUOTES, 'UTF-8'));
        $safeNameHtml = htmlspecialchars($safeName, ENT_QUOTES, 'UTF-8');

        $recipient = 'bedirhanmehmetsoylu@gmail.com';
        $subject = "Contact from <$safeEmail>";
        $body = "From: " . $safeNameHtml . "<br>" . $safeMessage;

        $headers   = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = 'From: noreply@bedirhan-soylu.de';
        $headers[] = 'Reply-To: ' . $safeEmail;

        $sent = mail($recipient, $subject, $body, implode("\r\n", $headers));

        echo json_encode(['success' => (bool)$sent]);
        exit;

    default: // Nur POST oder OPTIONS erlaubt
        header("Allow: POST", true, 405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        exit;
}
