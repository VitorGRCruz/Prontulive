<?php

$servidor ='localhost';
$usuario = 'root';
$senha = '';
$db = 'prontulive';

$conexao = mysqli_connect($servidor, $usuario, $senha, $db);

//realizar filtragem dos dados e preparação da consulta
$idR = $_POST['idR'];
$flag = $_POST['flag'];
if($flag ==1){
   
$query = "SELECT RQ.id,R.nome as nomeR,R.cpf as cpfR,R.data_nasc as data_nascR ,RQT.telefone,RQT.email, RQT.endereco,
P.nome as nomeP, p.cpf as cpfP, p.data_nasc as data_nascP ,data_atendimento,data_alta,
 finalidade,arquivo_autorizacao,data_hora, status, observacao
 FROM pessoa P, pessoa R, requisitante RQT,requisicao RQ 
            WHERE RQ.requisitante_id = R.id 
            AND RQ.paciente_id = P.id 
            AND RQT.pessoa_id = RQ.requisitante_id and RQ.id = $idR";


$consulta_requisicoes = mysqli_query($conexao, $query);   


echo json_encode(mysqli_fetch_all($consulta_requisicoes,MYSQLI_ASSOC));

}
else if($flag ==2){
  $query ="UPDATE requisicao SET status = 2 WHERE id = $idR ";
  mysqli_query($conexao, $query);
}

else if($flag ==3){

    // fazer try catch

$target_dir = "../../prontuarios/";
$target_file = $target_dir . basename($_FILES["inpFile"]["name"]);
$uploadOk = 1;
$file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

if (file_exists($target_file)) {
  $uploadOk = 0;
}

if ($file_type != "pdf") {
  $uploadOk = 0;
}
if ($uploadOk == 0) {
  var_dump("Não foi possivel fazer upload do arquivo");
} else {
  date_default_timezone_set('America/Sao_Paulo');
  $date = date('Y-m-d H:i:s');

  $query = "SELECT cpf from pessoa P, requisicao RQ WHERE RQ.paciente_id = P.id and RQ.id = $idR";
  $rs = mysqli_query($conexao, $query);
  $obj = $rs->fetch_object();

  $nome_pasta = md5($date.' '.$obj->cpf);
  mkdir('../../prontuarios/'.$nome_pasta, 0777, true);
  $caminho = $target_dir.$nome_pasta.'/'.basename($_FILES["inpFile"]["name"]);

  if (move_uploaded_file($_FILES["inpFile"]["tmp_name"],$caminho)) {
      $caminho_prontuario = $nome_pasta.'/'.basename($_FILES["inpFile"]["name"]);
      $query ="INSERT INTO prontuarios(id_requisicao, arquivo) VALUES ($idR,'$caminho_prontuario')";
      mysqli_query($conexao, $query);
      $query ="UPDATE requisicao SET status = 3 WHERE id = $idR ";
      mysqli_query($conexao, $query);
      echo mysqli_affected_rows($conexao);
    var_dump("Sucesso!");
  } else {
    var_dump("Ocorreu um erro durante o upload");
  }
}


}

else if($flag ==4){

$obs = $_POST['obs'];
$status = $_POST['status'];
$query = "UPDATE requisicao SET observacao = '$obs' WHERE id = $idR ";
mysqli_query($conexao, $query);

$query2 = "UPDATE requisicao SET status = $status WHERE id = $idR ";
mysqli_query($conexao, $query2);
echo mysqli_affected_rows($conexao);
}
