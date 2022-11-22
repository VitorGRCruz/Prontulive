<?php 

include 'db.php';

$busca = $_POST['busca'];
$status = $_POST['status'];
$count_busca = strlen($busca);

switch([$busca,$status]){
    case $count_busca!=0 && $status !=0 :
        $query ="SELECT RQ.id as idR, R.nome as nomeR,P.nome as nomeP,data_hora 
                FROM pessoa P, pessoa R, requisitante RQT,requisicao RQ 
               WHERE RQ.requisitante_id = R.id 
               AND RQ.paciente_id = P.id 
               AND RQT.pessoa_id = RQ.requisitante_id and P.nome LIKE '%$busca%' and RQ.status = $status;";
    break;

    case $status !=0 && $count_busca == 0 :
        $query ="SELECT RQ.id as idR, R.nome as nomeR,P.nome as nomeP,data_hora 
        FROM pessoa P, pessoa R, requisitante RQT,requisicao RQ 
       WHERE RQ.requisitante_id = R.id 
       AND RQ.paciente_id = P.id 
       AND RQT.pessoa_id = RQ.requisitante_id and RQ.status = $status;";
    break;

    case  $status == 0 && $count_busca!=0:
        $query ="SELECT RQ.id as idR, R.nome as nomeR,P.nome as nomeP,data_hora 
            FROM pessoa P, pessoa R, requisitante RQT,requisicao RQ 
            WHERE RQ.requisitante_id = R.id 
            AND RQ.paciente_id = P.id 
            AND RQT.pessoa_id = RQ.requisitante_id and P.nome LIKE '%$busca%';";      
    break;

    case  $count_busca == 0 && $status ==0 :
        $query ="SELECT RQ.id as idR, R.nome as nomeR,P.nome as nomeP,data_hora 
            FROM pessoa P, pessoa R, requisitante RQT,requisicao RQ 
            WHERE RQ.requisitante_id = R.id 
            AND RQ.paciente_id = P.id 
            AND RQT.pessoa_id = RQ.requisitante_id;";      
    break;
    }

$buscar_requisicao = mysqli_query($conexao, $query);  
echo json_encode(mysqli_fetch_all($buscar_requisicao,MYSQLI_ASSOC));

