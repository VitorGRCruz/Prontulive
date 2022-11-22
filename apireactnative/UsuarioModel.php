<?php

require_once "Conexao.php";

class UsuarioModel
{

    private $db;
    public $tabela = "usuarios";

    function __construct()
    {
        $this->db = new Conexao();
    }

    public function formatar_data($dataBR)
    {
        $LIST = explode("/", $dataBR);
        $format_data = $LIST[1] . '/' . $LIST[0] . '/' . $LIST[2];
        $newdata = date('Y-m-d', strtotime($format_data));
        return $newdata;
    }

    public function add($body)
    {
        $dados = json_decode($body, true);

        $nome = $dados['nome'];
        $cpf = $dados['cpf'];
        $data_nasc = $this->formatar_data($dados['data_nasc']);
        $senha = $dados['senha'];
        $senha2 = $dados['senha2'];
        $telefone = $dados['telefone'];
        $email = $dados['email'];
        $endereco = $dados['endereco'];




        if ($senha == $senha2) {
            $senha_md5 = md5($senha);
            $query = "INSERT INTO pessoa(nome,cpf,data_nasc) VALUES ('$nome', '$cpf', '$data_nasc')";

            $this->db->executeSQL($query);

            $query_id = "SELECT id FROM pessoa WHERE cpf = '$cpf'";
            $cadastro_usuario_id = $this->db->executeSQL($query_id);
            $obj = $cadastro_usuario_id->fetch_object();

            $query2 = "INSERT INTO usuario(pessoa_id,senha_md5) VALUES ($obj->id,'$senha_md5')";
            $this->db->executeSQL($query2);

            $query3 = "INSERT INTO requisitante(pessoa_id,telefone,email,endereco) VALUES ($obj->id,'$telefone','$email','$endereco')";
            $this->db->executeSQL($query3);
            $return = 1;
        } else {
            $return = 0;
        }
        return json_encode($return);
    }


    public function edit($body)
    {
        $dados = json_decode($body, true);

        $id = $dados['id'];
        $email = $dados['email'];
        $telefone = $dados['telefone'];
        $endereco = $dados['endereco'];


        $sql = "UPDATE requisitante SET telefone = '$telefone', email = '$email', endereco = '$endereco'
         where pessoa_id = $id ";
        $rs = $this->db->executeSQL($sql);






        return json_encode($rs);
    }

    public function edit_senha($body)
    {
        $dados = json_decode($body, true);
        $id = $dados['id'];
        $senha_antiga = $dados['senha_antiga'];
        $senha_atual = md5($dados['senha_atual']);

        if ($senha_atual  == $senha_antiga) {
            $nova_senha = $dados['nova_senha'];
            $senha2 = $dados['senha2'];
            if ($nova_senha == $senha2) {
                $nova_senha = md5($nova_senha);
                $query = "UPDATE usuario SET senha_md5 = '$nova_senha' WHERE usuario.pessoa_id = $id;";
                $this->db->executeSQL($query);

                $return = ['retorno' => 1, 'senha' => $nova_senha];
            } else {
                $return = ['retorno' => 3];
            }
        } else {
            $return = ['retorno' => 2];
        }
        return json_encode($return);
    }

    public function enviarLogin($body)
    {
        $dados = json_decode($body, true);
        $cpf = $dados['cpf'];
        $senha = md5($dados['senha']);
        $sql = "SELECT id,nome,cpf,data_nasc,senha_md5, email, telefone, endereco FROM pessoa, usuario, requisitante 
    WHERE usuario.pessoa_id = pessoa.id and cpf = '$cpf' and senha_md5 = '$senha' and usuario.pessoa_id = requisitante.pessoa_id;";
        $rs = $this->db->executeSQL($sql);

        $linha = mysqli_num_rows($rs);

        $array = array();

        if ($linha != 0) {
            while ($obj = $rs->fetch_object()) {
                $arrayDados = array(
                    'id' => $obj->id, 'nome' => $obj->nome,
                    'cpf' => $obj->cpf, 'data_nasc' => $obj->data_nasc, 'senha_md5' => $obj->senha_md5,
                    'email' => $obj->email,
                    'telefone' => $obj->telefone, 'endereco' => $obj->endereco
                );
                $array[] = $arrayDados;
            }
        } else {
            $array[] = "0";
        }
        return json_encode($array);
    }

    public function salvar_caminho($zip)
    {

        $num_file = count($_FILES);
        $i = 0;
        while ($i < $num_file) {

            $nome_arquivo = $_FILES['file' . $i]['name'];
            $caminho =  $_FILES['file' . $i]['tmp_name'];         
            if ($zip->addFile($caminho,$nome_arquivo)) {
                $i++;
            } else {
                return json_encode(false);
            
        }}
        $zip->close();
        return json_encode(true);
    }

    public function cadastrar_requerimento($body)
    {
        $dados = $_POST;
        $flag = $dados['flag'];
        $idR = $dados['idR'];
        $idP = $dados['idR'];
        $finalidade = $dados['finalidade'];
        $data_atendimento = $this->formatar_data($dados['data_atendimento']);
        $data_alta = $this->formatar_data($dados['data_alta']);

        //Nome da Pasta
        date_default_timezone_set('America/Sao_Paulo');
        $date = date('Y-m-d H:i:s');
        $query = "SELECT cpf from pessoa where id = $idR ";
        $rs = $this->db->executeSQL($query);
        $obj = $rs->fetch_object();
        $pasta = md5($date . ' ' . $obj->cpf);
        //Criar pasta
        $zip = new ZipArchive();
        $filename ="/"."Arquivos/".$pasta.".zip";
        $zip->open(".".$filename, ZipArchive::CREATE);
        //salvar arquivo
         $save = $this->salvar_caminho($zip);

        
        if ($save) {
            if ($flag == 1) {
                $query = "INSERT INTO requisicao(id, requisitante_id, paciente_id, data_hora,
            finalidade, arquivo_autorizacao, data_atendimento, data_alta, status, observacao) 
         VALUES (NULL,$idR,$idP,null, '$finalidade','$filename',
         '$data_atendimento','$data_alta', 1, NULL)";
                $this->db->executeSQL($query);

                $return = 1;
            } else if ($flag == 2) {
                $nomeP = $dados['nomeP'];
                $cpfP = $dados['cpfP'];

                $data_nascP = $this->formatar_data($dados['data_nascP']);
                $query = "INSERT INTO pessoa (id, nome, cpf, data_nasc) 
         VALUES (NULL, '$nomeP', '$cpfP', '$data_nascP')";
                $this->db->executeSQL($query);

                $query_id = "SELECT id from pessoa where cpf = '$cpfP'";
                $rs = $this->db->executeSQL($query_id);
                $obj = $rs->fetch_object();

                $query2 = "INSERT INTO requisicao(id, requisitante_id, paciente_id, data_hora,
            finalidade, arquivo_autorizacao, data_atendimento, data_alta, status, observacao) 
         VALUES (NULL,$idR,$obj->id,null, '$finalidade','$filename',
         '$data_atendimento','$data_alta', 1, NULL)";
                $this->db->executeSQL($query2);

                $return = 2;
            } else {
                $return = 0;
            }
        } else {
            $return = 3;
        }
        $return = 1;

        return json_encode($return);
    }


    public function carregar_requisicao($body)
    {
        $dados = json_decode($body, true);
        $idR = $dados['idR'];

        $query = "SELECT RQC.id as id, P.nome as nome, finalidade, data_atendimento, status, observacao  FROM requisicao RQC, pessoa P, 
        pessoa R WHERE P.id = paciente_id and requisitante_id = R.id and R.id =$idR";
        $buscar_requisicoes = $this->db->executeSQL($query);
        $linha = mysqli_num_rows($buscar_requisicoes);

        $array = array();

        if ($linha != 0) {
            while ($obj = $buscar_requisicoes->fetch_object()) {
                $arrayDados = array(
                    'id'=>$obj->id,'nome' => $obj->nome, 'finalidade' => $obj->finalidade,
                    'data_atendimento' => $obj->data_atendimento,
                    'status' => $obj->status, 'observacao' => $obj->observacao
                );
                $array[] = $arrayDados;
            }
        } else {
            $array[] = "0";
        }
        return json_encode($array);
    }

    public function carregar_prontuario($body)
    {  
        $dados = json_decode($body, true);
        $idRC = $dados['idRC'];
        $query = "SELECT arquivo FROM prontuarios WHERE id_requisicao = $idRC";
        $buscar_prontuario = $this->db->executeSQL($query);
        $obj = $buscar_prontuario->fetch_object();
        $caminho = $obj->arquivo;
        return  json_encode($caminho);

    }
}
