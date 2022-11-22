<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" type="text/css" href="../estilos/estilos.css">
    <link href="../estilos/css/bootstrap.min.css" rel="stylesheet">
    <meta charset='utf-8'>
    <title>Faça o Login</title>

</head>

<body class="container">
    <img src="../assets/imagens/Logo.png" class="img" alt="...">


    <form style="width: 30%;" method="post" action="login.php">
        <div id="campos">
            <Text>LOGIN</Text>
            <div class="label-input">
                <label class="labelss"> CPF</label>
                <input name="cpf" id="cpf" placeholder="Digite seu CPF" type="text" class="inputss placeholder-text">
            </div>

            <div class="label-input">
                <label class="labelss">Senha</label>
                <input name="senha" placeholder="Digite sua Senha" type="password" class="inputss placeholder-text">
            </div>
            <button class="button button1">ENTRAR</button>
        </div>
    </form>



    <?php if (isset($_GET['erro1'])) { ?>
        <div class="erro" role="alert">
            CPF E/OU SENHA NÃO ENCONTRADOS !
        </div>
    <?php  } else if (isset($_GET['erro2'])) { ?>
        <div class="erro" role="alert">
            ESSE USUÁRIO NÃO TEM PERMISSÃO DE ACESSO !
        </div>
    <?php } ?>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery.maskedinput/1.4.1/jquery.maskedinput.min.js"></script>
    <script>
        $(document).ready(function() {
            let input = document.getElementById('cpf');
            input.style.color = 'rgba(18,65,180,1)';
            input.style.fontFamily = 'Staatliches';

            $("#cpf").mask("999.999.999-99");

        });
    </script>

</body>

</html>