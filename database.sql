-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 28-Set-2022 às 03:36
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `prontulive`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `pessoa`
--

CREATE TABLE `pessoa` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `data_nasc` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `pessoa`
--

INSERT INTO `pessoa` (`id`, `nome`, `cpf`, `data_nasc`) VALUES
(3, 'Super', '222.222.222-22', '2003-03-07');

-- --------------------------------------------------------

--
-- Estrutura da tabela `prontuarios`
--

CREATE TABLE `prontuarios` (
  `id_requisicao` int(11) NOT NULL,
  `arquivo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `requisicao`
--

CREATE TABLE `requisicao` (
  `id` int(11) NOT NULL,
  `requisitante_id` int(11) NOT NULL,
  `paciente_id` int(11) NOT NULL,
  `data_hora` timestamp NOT NULL DEFAULT current_timestamp(),
  `finalidade` varchar(45) NOT NULL,
  `arquivo_autorizacao` varchar(512) NOT NULL,
  `data_atendimento` date NOT NULL,
  `data_alta` date NOT NULL,
  `status` int(11) NOT NULL,
  `observacao` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `requisitante`
--

CREATE TABLE `requisitante` (
  `pessoa_id` int(11) NOT NULL,
  `telefone` varchar(14) NOT NULL,
  `email` varchar(60) NOT NULL,
  `endereco` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `pessoa_id` int(11) NOT NULL,
  `senha_md5` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`pessoa_id`, `senha_md5`) VALUES
(3, '202cb962ac59075b964b07152d234b70');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_administrativo`
--

CREATE TABLE `usuario_administrativo` (
  `pessoa_id` int(11) NOT NULL,
  `adm_geral` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuario_administrativo`
--

INSERT INTO `usuario_administrativo` (`pessoa_id`, `adm_geral`) VALUES
(3, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_juridico`
--

CREATE TABLE `usuario_juridico` (
  `pessoa_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `vusuario`
-- (Veja abaixo para a view atual)
--
CREATE TABLE `vusuario` (
`id` int(11)
,`nome` varchar(100)
,`tipo_usuario` varchar(5)
,`cpf` varchar(14)
,`data_nasc` date
,`senha_md5` char(32)
);

-- --------------------------------------------------------

--
-- Estrutura para vista `vusuario`
--
DROP TABLE IF EXISTS `vusuario`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vusuario`  AS SELECT `p`.`id` AS `id`, `p`.`nome` AS `nome`, CASE WHEN `p`.`id` in (select `usuario_juridico`.`pessoa_id` from `usuario_juridico`) THEN 'JUR' WHEN `p`.`id` in (select `usuario_administrativo`.`pessoa_id` from `usuario_administrativo` where `usuario_administrativo`.`adm_geral` = 0) THEN 'ADM' WHEN `p`.`id` in (select `usuario_administrativo`.`pessoa_id` from `usuario_administrativo` where `usuario_administrativo`.`adm_geral` = 1) THEN 'SUPER' ELSE 'BLOQ' END AS `tipo_usuario`, `p`.`cpf` AS `cpf`, `p`.`data_nasc` AS `data_nasc`, `u`.`senha_md5` AS `senha_md5` FROM (`pessoa` `p` left join `usuario` `u` on(`p`.`id` = `u`.`pessoa_id`))  ;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `pessoa`
--
ALTER TABLE `pessoa`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `prontuarios`
--
ALTER TABLE `prontuarios`
  ADD PRIMARY KEY (`id_requisicao`);

--
-- Índices para tabela `requisicao`
--
ALTER TABLE `requisicao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_requisitante_req_idx` (`requisitante_id`),
  ADD KEY `fk_paciente_req_idx` (`paciente_id`);

--
-- Índices para tabela `requisitante`
--
ALTER TABLE `requisitante`
  ADD PRIMARY KEY (`pessoa_id`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`pessoa_id`);

--
-- Índices para tabela `usuario_administrativo`
--
ALTER TABLE `usuario_administrativo`
  ADD PRIMARY KEY (`pessoa_id`);

--
-- Índices para tabela `usuario_juridico`
--
ALTER TABLE `usuario_juridico`
  ADD PRIMARY KEY (`pessoa_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `pessoa`
--
ALTER TABLE `pessoa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT de tabela `requisicao`
--
ALTER TABLE `requisicao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `prontuarios`
--
ALTER TABLE `prontuarios`
  ADD CONSTRAINT `fk_requisicao_id` FOREIGN KEY (`id_requisicao`) REFERENCES `requisicao` (`id`);

--
-- Limitadores para a tabela `requisicao`
--
ALTER TABLE `requisicao`
  ADD CONSTRAINT `fk_paciente_req` FOREIGN KEY (`paciente_id`) REFERENCES `pessoa` (`id`),
  ADD CONSTRAINT `fk_requisitante_req` FOREIGN KEY (`requisitante_id`) REFERENCES `requisitante` (`pessoa_id`);

--
-- Limitadores para a tabela `requisitante`
--
ALTER TABLE `requisitante`
  ADD CONSTRAINT `fk_usuario_requisitante` FOREIGN KEY (`pessoa_id`) REFERENCES `usuario` (`pessoa_id`);

--
-- Limitadores para a tabela `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_pessoa_usuario` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa` (`id`);

--
-- Limitadores para a tabela `usuario_administrativo`
--
ALTER TABLE `usuario_administrativo`
  ADD CONSTRAINT `fk_usuario_adm` FOREIGN KEY (`pessoa_id`) REFERENCES `usuario` (`pessoa_id`);

--
-- Limitadores para a tabela `usuario_juridico`
--
ALTER TABLE `usuario_juridico`
  ADD CONSTRAINT `fk_usuario_jur` FOREIGN KEY (`pessoa_id`) REFERENCES `usuario` (`pessoa_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
