WebCadastramento
Software de cadastramento de Corredores.

Sistema para cadastramento de corredores, cadeirantes e gerenciamento de duplas, conforme requisitos levantados em reunião realizada no dia 22/02/2025 com o cliente. Sistema será desenvolvido para a Ong Pernas Solidárias, tem como objetivo principal realizar inscrição de corredores e cadeirantes em corrida, possibilitando que todos possam correr. Objetivo do software é otimizar o processo de inscrição de corredores, cadeirantes para atividades esportivas, funcionando como uma agenda otimizada.

1.0) Objetivos do Projeto:

1.1 Desenvolver um sistema web intuitivo e de fácil utilização para o cadastro de corredores, cadeirantes e cadeirantes que já possuem sua própria cadeira.

1.2. Implementar funcionalidades de cadastro, edição e exclusão de informações dos corredores

1.3. Fornecer relatórios dos corredores cadastrados para inscrição em sites.

2.0) Equipe de Desenvolvimento: O desenvolvimento do projeto será realizado por dois desenvolvedores:

Luiz Felipe Schroder Marcon Maria Eduarda Nunes de Souza
3.0) Tecnologias Utilizadas:

A arquitetura do sistema será baseada na seguinte stack de desenvolvimento:

3.1. Front-end: React.js 3.2. Back-end: C# com ASP.NET 3.3. Banco de Dados: SQL Server

4.0) Funcionalidades Principais não funcionais:

4.1. Funcionais:

4.1.1. Registro de novos corredores com dados pessoais.

4.1.2. Validação de dados obrigatórios

4.1.3. Emissão do relatório com nomes dos corredores com suas duplas.

4.1.4. Registro de Corridas.

4.1.5. Apresentar lista com funcionalidade de vincular corredor e cadeirante.

4.1.6. Controle de status das inscrições(pagamento).

4.2. Não Funcionais:

4.2.1. apresentar uma lista de corredores na tela.

4.2.2. apresentar uma lista de cadeirantes na tela.

4.2.3. apresentar uma lista de cadeirantes que possuem sua cadeira.

4.2.4. Login e controle de acesso.

4.2.5. Atualização da tela de graficos após adicionar algum dado.

4.2.6. Atualização da tela de membros após adicionar algum membro.

A seguir apresentação do software no canva: https://www.canva.com/design/DAGgJffJCYk/ViDorR_SujCG4ZiUTeNCqA/edit?utm_content=DAGgJffJCYk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

A seguir apresentação do software no figma: https://www.figma.com/design/lDpXeBYppONI9Gug3MTxNu/Projeto-Pernas-Solidarias?node-id=0-1&m=dev&t=SwZWadsFRWJbEPdP-1

Arquitetura:

Utilizaremos modelo monólitico, mantendo tudo no mesmo servidor.
tela reresentado a Arquietura na tela 10: https://www.canva.com/design/DAGgJffJCYk/ViDorR_SujCG4ZiUTeNCqA/edit

Não usaremos APIs, está no mesmo local, com base nesta questão nossa arquitetura se encaixa nas caracteriza-se com monolítica, com isso usaremos o padrão de design MVC.

Cronograma de Entregas (Quinzenal), levando em consideração que ambos os desenvolvedores dividiram cada atividade:
08/03/2025 Definição do banco de dados e estrutura inicial do back-end.

22/03/2025 Desenvolvimento dos endpoints de cadastro de corredores.

29/03/2025 Andamento de 50% do trabalho.

05/04/2025 Implementação do front-end para cadastro e listagem de corredores.

19/04/2025 Autenticação de usuários e adicionar o token.

03/05/2025 integração do back com o front.

17/05/2025 Implementação dos relatórios e exportação, Funcionalidades de integração

31/05/2025 Testes e correções finais

14/06/2025 Entrega e apresentação ao cliente, semanas de testes.

Havera encontros semanalmente entre os devenvolvedores para acompanhamento do projeto e troca de conhecimentos.

6.0) Considerações Finais:

Este escopo está sujeito a alterações mediante acordo entre as partes.
