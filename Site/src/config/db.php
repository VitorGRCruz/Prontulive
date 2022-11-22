<?php

$servidor ='localhost';
$usuario = 'root';
$senha = '';
$db = 'prontulive';

$conexao = mysqli_connect($servidor, $usuario, $senha, $db);
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
if($_SESSION['login_tipo'] == 'ADM' || $_SESSION['login_tipo'] == 'SUPER' ){
    $query = "SELECT RQ.id as idR ,R.nome as nomeR, P.nome as nomeP, data_hora 
            FROM pessoa P, pessoa R, requisicao RQ 
            WHERE RQ.requisitante_id = R.id 
            AND RQ.paciente_id = P.id and RQ.status = 1";
			
    $consulta_requisicoes = mysqli_query($conexao, $query);
    $linhas = mysqli_num_rows($consulta_requisicoes);
    $_SESSION['qtd_requisicoes'] = $linhas;
   
}
else if($_SESSION['login_tipo'] == 'JUR'){
    $query = "SELECT RQ.id as idR, R.nome as nomeR, P.nome as nomeP, data_hora 
            FROM pessoa P, pessoa R, requisicao RQ 
            WHERE RQ.requisitante_id = R.id 
            AND RQ.paciente_id = P.id and RQ.status = 2";
			
    $consulta_requisicoes = mysqli_query($conexao, $query);
    $linhas = mysqli_num_rows($consulta_requisicoes);
    $_SESSION['qtd_requisicoes'] = $linhas;

}
else{
    header('location:index.php');
}

