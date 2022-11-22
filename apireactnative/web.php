<?php
header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");
$body = file_get_contents("php://input");
$query = $_SERVER['QUERY_STRING'];
require "UsuarioModel.php";
$UsuarioModel = new UsuarioModel();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    switch ($query) {
        case "cadastrar_usuario":
            echo $UsuarioModel->add($body);
            break;
        case "editar_usuario":
            echo $UsuarioModel->edit($body);
            break;
        case "editar_senha":
            echo $UsuarioModel->edit_senha($body);
            break;
        case "fazer_login":
            echo $UsuarioModel->enviarLogin($body);
            break;
        case "cadastrar_requerimento":
            echo $UsuarioModel->cadastrar_requerimento($body);
            break;
        case "carregar_requisicao":
            echo $UsuarioModel->carregar_requisicao($body);
            break;
        case "carregar_prontuario":
            echo $UsuarioModel->carregar_prontuario($body);
            break;
        default:
            echo json_encode(
                array(
                    "status" => 404,
                    "message" => "Método não encontrado",
                )
            );
            break;
    }
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    switch ($query) {

        default:
            echo json_encode(
                array(
                    "status" => 404,
                    "message" => "Método não encontrado",
                )
            );
            break;
    }
}
