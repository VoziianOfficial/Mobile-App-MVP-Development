<?php
declare(strict_types=1);

ini_set('display_errors', '0');
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $success, string $message, array $errors = []): void
{
    http_response_code($status);
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'errors' => (object) $errors
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'This endpoint accepts POST requests only.');
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 102400) {
    respond(413, false, 'The request is too large. Please shorten the message and try again.');
}

$configPath = __DIR__ . '/config/config.js';
$configSource = @file_get_contents($configPath);
if ($configSource === false || !preg_match('/window\.SITE_CONFIG\s*=\s*(\{.*\})\s*;\s*$/s', trim($configSource), $match)) {
    respond(500, false, 'Server configuration error. Please contact the studio by email.');
}

$config = json_decode($match[1], true);
if (!is_array($config) || json_last_error() !== JSON_ERROR_NONE) {
    respond(500, false, 'Server configuration error. Please contact the studio by email.');
}

$recipient = $config['contact']['recipientEmail'] ?? '';
$successMessage = $config['forms']['successMessage'] ?? '';
$serverError = $config['forms']['serverError'] ?? 'We could not send your request. Please try again or contact us by email.';
if (!is_string($recipient) || !filter_var($recipient, FILTER_VALIDATE_EMAIL) || !is_string($successMessage) || $successMessage === '') {
    respond(500, false, 'Server configuration error. Please contact the studio by email.');
}

session_name('kovexa_form');
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    'httponly' => true,
    'samesite' => 'Lax'
]);
@session_start();
if (isset($_SESSION['last_success']) && (time() - (int) $_SESSION['last_success']) < 10) {
    respond(429, false, 'Please wait a few seconds before sending another request.');
}

function normalise($value, int $maxLength = 5000): string
{
    if (!is_string($value)) {
        return '';
    }
    $value = str_replace(["\r\n", "\r", "\0"], ["\n", "\n", ''], $value);
    $value = trim(strip_tags($value));
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength, 'UTF-8');
    }
    return substr($value, 0, $maxLength);
}

function bodyValue(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

if (normalise($_POST['website'] ?? '', 200) !== '') {
    respond(422, false, 'The submission could not be accepted.');
}

$fields = [
    'full_name' => normalise($_POST['full_name'] ?? '', 160),
    'email' => normalise($_POST['email'] ?? '', 254),
    'company' => normalise($_POST['company'] ?? '', 180),
    'inquiry_type' => normalise($_POST['inquiry_type'] ?? '', 120),
    'service' => normalise($_POST['service'] ?? '', 160),
    'product_stage' => normalise($_POST['product_stage'] ?? '', 120),
    'timeline' => normalise($_POST['timeline'] ?? '', 120),
    'message' => normalise($_POST['message'] ?? '', 8000),
    'privacy_consent' => normalise($_POST['privacy_consent'] ?? '', 20)
];

$errors = [];
foreach (['full_name', 'email', 'inquiry_type', 'service', 'message'] as $required) {
    if ($fields[$required] === '') {
        $errors[$required] = 'This field is required.';
    }
}
if ($fields['email'] !== '' && !filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Enter a valid email address.';
}
if ($fields['privacy_consent'] !== 'yes') {
    $errors['privacy_consent'] = 'Privacy consent is required.';
}

$allowedInquiry = $config['forms']['inquiryOptions'] ?? [];
$allowedServices = $config['forms']['serviceOptions'] ?? [];
$allowedStages = $config['forms']['stageOptions'] ?? [];
$allowedTimelines = $config['forms']['timelineOptions'] ?? [];
if (!in_array($fields['inquiry_type'], $allowedInquiry, true)) {
    $errors['inquiry_type'] = 'Select a valid inquiry type.';
}
if (!in_array($fields['service'], $allowedServices, true)) {
    $errors['service'] = 'Select a valid service.';
}
if ($fields['product_stage'] !== '' && !in_array($fields['product_stage'], $allowedStages, true)) {
    $errors['product_stage'] = 'Select a valid product stage.';
}
if ($fields['timeline'] !== '' && !in_array($fields['timeline'], $allowedTimelines, true)) {
    $errors['timeline'] = 'Select a valid timeline.';
}
if ($errors) {
    respond(422, false, 'Please review the highlighted fields and try again.', $errors);
}

$sourceInput = normalise($_POST['source_page'] ?? '', 160);
$sourcePage = preg_match('/^[a-z0-9][a-z0-9\-]*\.html(?:#[a-z0-9\-]+)?$/i', $sourceInput) ? $sourceInput : 'Unverified website page';
$safeEmail = str_replace(["\r", "\n"], '', $fields['email']);
$recipientDomain = substr(strrchr($recipient, '@') ?: '@localhost', 1);
$fromEmail = 'no-reply@' . preg_replace('/[^a-z0-9.\-]/i', '', $recipientDomain);
$subjectText = 'Kovexa Studio enquiry: ' . $fields['inquiry_type'];
$subject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';

$lines = [
    'New website enquiry',
    '-------------------',
    'Inquiry Type: ' . bodyValue($fields['inquiry_type']),
    'Service: ' . bodyValue($fields['service']),
    'Full Name: ' . bodyValue($fields['full_name']),
    'Email: ' . bodyValue($safeEmail),
    'Company / Project: ' . bodyValue($fields['company'] ?: 'Not provided'),
    'Product Stage: ' . bodyValue($fields['product_stage'] ?: 'Not provided'),
    'Timeline: ' . bodyValue($fields['timeline'] ?: 'Not provided'),
    '',
    'Message:',
    bodyValue($fields['message']),
    '',
    'Source Page: ' . bodyValue($sourcePage),
    'Submission Date: ' . gmdate('Y-m-d H:i:s') . ' UTC'
];
$body = implode("\r\n", $lines);
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: Kovexa Studio Website <' . $fromEmail . '>',
    'Reply-To: ' . $safeEmail,
    'X-Mailer: PHP/' . PHP_VERSION
];

if (!function_exists('mail') || !@mail($recipient, $subject, $body, implode("\r\n", $headers))) {
    respond(502, false, $serverError);
}

$_SESSION['last_success'] = time();
respond(200, true, $successMessage);
