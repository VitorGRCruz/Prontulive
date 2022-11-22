<!DOCTYPE html>

<?php
session_start();
if (!isset($_SESSION['login'])) {

    header('location:index.php');
}
include '../config/menu.php';
?>

<head>
    <meta charset="UTF-8">
    <title>Requisições</title>
    <link rel="stylesheet" type="text/css" href="../estilos/estilos.css">
    <link href="../estilos/css/bootstrap.min.css" rel="stylesheet">
    <script src="../config/modalReq.js">
    </script>
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
</head>

<body class="container">
    <ul>
        <?php menu('requisicoes') ?>
    </ul>
    <img src="../assets/imagens/Logo.png" class="img" alt="...">

    <Text>Requisições</Text>
    <table id="customers">
        <tr>
            <th>Nome do Requisitante</th>
            <th>Nome do Paciente</th>
            <th>Data da requisição</th>
        </tr>
        <?php
        include './db.php';
        while ($linha = mysqli_fetch_array($consulta_requisicoes)) {
            echo '<tr  onclick="dados(' . $linha["idR"] . ',1);" data-bs-toggle="modal" data-bs-target="#requisicao"><td >' . $linha['nomeR'] . '</td>';
            echo '<td>' . $linha['nomeP'] . '</td>';
            $data = $linha['data_hora'];
            $div_datahora = explode(" ", $data);
            $LIST = explode("-", $div_datahora[0]);
            $format_data = $LIST[2] . '/' . $LIST[1] . '/' . $LIST[0];
            $datahoraBR = $format_data . ' ' . $div_datahora[1];
            echo '<td>' . $datahoraBR . '</td></tr>';
        }

        ?>


    </table>
    <!-- Modal -->
    <div class="modal fade" id="requisicao" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <Text> Requisição </Text>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div style="display:flex">
                    <button onclick="reqt();" class="button-modal"> Requisitante </button>
                    <button onclick="pac();" class="button-modal"> Paciente </button>
                    <button onclick="reqs();" class="button-modal"> Requisição </button>
                    <button onclick="dec();" class="button-modal"> Decisão </button>
                </div>

                <div id="r1">
                    <Text> Requisitante</Text>

                    <div class="div-dados"><Text class="dados-index">Nome :</Text>
                        <Text id="nomeR" class="dados-item" />
                    </div>

                    <div class="div-dados"><Text class="dados-index">CPF:</Text>
                        <Text id="cpfR" class="dados-item" />
                    </div>

                    <div class="div-dados"><Text class="dados-index">Data de Nascimento:</Text>
                        <Text id="data_nascR" class="dados-item" />
                    </div>

                    <div class="div-dados"><Text class="dados-index">Telefone:</Text>
                        <Text id="telefone" class="dados-item" />
                    </div>

                    <div class="div-dados"><Text class="dados-index">E-mail:</Text>
                        <Text id="email" class="dados-item" />
                    </div>

                    <div class="div-dados"><Text class="dados-index">Endereço:</Text>
                        <Text id="endereco" class="dados-item" />
                    </div>

                </div>


                <div id="p2" style="display:none;">
                    <Text> PACIENTE</Text>
                    <div class="div-dados"><Text class="dados-index">Nome :</Text>
                        <Text id="nomeP" class="dados-item" />
                    </div>
                    <div class="div-dados"><Text class="dados-index">CPF:</Text>
                        <Text id="cpfP" class="dados-item" />
                    </div>

                    <div class="div-dados"><Text class="dados-index">Data de Nascimento:</Text>
                        <Text id="data_nascP" class="dados-item" />
                    </div>

                    <div class="div-dados"><Text class="dados-index">Data Atendimento:</Text>
                        <Text id="data_atendimento" class="dados-item" />
                    </div>

                    <div class="div-dados"><Text class="dados-index">Data Alta:</Text>
                        <Text id="data_alta" class="dados-item" />
                    </div>


                </div>

                <div id="r3" style="display:none;">
                    <Text> REQUISIÇÃO</Text>
                    <div class="div-dados"><Text class="dados-index">FINALIDADE :</Text>
                        <Text id="finalidade" class="dados-item"> </Text>
                    </div>

                    <div class="div-dados"><Text class="dados-index">Horário da solicitação:</Text>
                        <Text id="data_hora" class="dados-item"> </Text>
                    </div>

                    <div class="div-dados">
                        <Text class="dados-index">Arquivos de autorização:</Text>
                        <a type="button" class="button fas fa-download " id="button2" download>Clique Aqui</a>
                    </div>

                </div>

                <div id="d4" style="display:none;">
                    <form method="post" onsubmit=" event.preventDefault();Prosseguir
                        ('<?php echo $_SESSION['login_tipo']; ?>')" enctype="multipart/form-data" id="formData">
                        <Text id="txt_prontuario" style="display:none;">Envie o prontuario</Text>
                        <input style="display:none;" type='file' name='file' accept='.pdf' class="button" id="inpFile" />
                        <!--aceitar-->
                        <button type="button" onclick="confirmar('<?php echo $_SESSION['login_tipo']; ?>');" class="button button4" id="aceitar">Aceitar</button>
                        <!--rejeitar-->
                        <button onclick="rejeitar('<?php echo $_SESSION['login_tipo']; ?>');" type="button" class="button button3" id="REJ">Recusar</button>
                        <!--Prosseguir-->
                        <button style="display:none" type="submit"  class="button button4" id="pross">Prosseguir</button>
                        <!--voltar-->
                        <button style="display:none" onclick="Voltar();" type="button" class="button button3" id="volt">Voltar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- /Modal -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="../estilos/js/bootstrap.min.js"></script>


</body>

</html>