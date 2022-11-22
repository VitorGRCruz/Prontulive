<!DOCTYPE html>
<?php

session_start();
if (!isset($_SESSION['login'])) {
    header('location:index.php');
}

include '../config/menu.php';

?>

<html>

<head>
    <meta charset="UTF-8">
    <title>Prontulive</title>
    <link rel="stylesheet" type="text/css" href="../estilos/estilos.css">
    <link href="../estilos/css/bootstrap.min.css" rel="stylesheet">

</head>

<body class="container">

    <ul>
        <?php menu('cadastro') ?>
    </ul>

    <img src="../assets/imagens/Logo.png" class="img" alt="...">

    <form style="width: 80%;" method="post" action="cadastro_usuario.php">
        <div id="campos">
            <Text>Cadastro</Text>
            <div style="display: flex;">

                <div class="label-input input-cadastro">
                    <label class="labelss"> Nome</label>
                    <input placeholder="Digite seu Nome" type="text" name="nome" class="inputss placeholder-text">
                </div>

                <div class="label-input input-cadastro">
                    <label class="labelss"> CPF</label>
                    <input id="cpf" name="cpf" placeholder="Digite seu CPF" type="text" class="inputss placeholder-text">
                </div>

                <div class="label-input input-cadastro">
                    <label class="labelss">Nascimento</label>
                    <input id="data" name="data_nasc" placeholder="Data de Nascimento" type="text" class="inputss placeholder-text">
                </div>

            </div>


            <div style="display: flex;width: 30vw;">

                <div class="label-input input-cadastro">
                    <label class="labelss"> Senha</label>
                    <input name="senha" placeholder="Escolha uma Senha" type="password" class="inputss placeholder-text">
                </div>

                <div class="label-input input-cadastro">
                    <label class="labelss"> Confirme a Senha</label>
                    <input name="confirmasenha" placeholder="Digite a senha novamente" type="password" class="inputss placeholder-text">
                </div>


            </div>


            <label class="labelss"> Tipo de usuario</label>
            <select name="tipo_u" class="inputss">
                <option disabled selected>Selecione o Tipo de Usuário</option>
                <option value="JUR">Jurídico</option>
                <option value="ADM">Administrativo</option>
                <option value="SUPER">Administrador Geral</option>
            </select>
            <button class="button button1" type="submit">CADASTRAR</button>
        </div>
    </form>

    <?php if (isset($_GET['sucess'])) { ?>
        <div class="alert sucess" role="alert">
            NOVO USUÁRIO CADASTRADO !
        </div>
    <?php  } else if (isset($_GET['erro3'])) { ?>
        <div class="alert erro" role="alert">
            Confirmação da senha incorreta !
        </div>
    <?php } ?>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery.maskedinput/1.4.1/jquery.maskedinput.min.js"></script>
    <script>
        $(document).ready(function() {
            let cpf = document.getElementById('cpf');
            cpf.style.color = 'rgba(18,65,180,1)';
            cpf.style.fontFamily = 'Staatliches';
            let data = document.getElementById('data');
            data.style.color = 'rgba(18,65,180,1)';
            data.style.fontFamily = 'Staatliches';
            $("#cpf").mask("999.999.999-99");
            $("#data").mask("99/99/9999");

        });
    </script>

</body>

</html>