**RELATÓRIO TÉCNICO**

**1.	Escopo do Projeto**

O projeto consiste no desenvolvimento de um formulário modular para anamnese e avaliação psicológica, implementado integralmente em HTML, CSS e JavaScript, com arquitetura client-side e abordagem offline-first. Garantir uma interface de usuário intuitiva e acessível para facilitar o registro em ambiente clínico. O sistema renderiza formulários de forma dinâmica a partir de arquivos JSON, permitindo a criação e manutenção de checklists, escalas psicológicas, perguntas objetivas (Sim/Não) e campos abertos. As respostas do usuário são persistidas localmente utilizando IndexedDB, garantindo funcionamento mesmo sem conexão com a internet e sem um banco de dados externo. Ao final do preenchimento, o sistema permite a exportação de um arquivo HTML editável, contendo todas as respostas e mantendo o layout visual do formulário, possibilitando reabertura e edição posterior sem dependência de servidor, API ou banco de dados externo. O projeto inclui ainda a estrutura para cálculo de escores psicológicos (ex.: ansiedade, depressão), de forma modular e extensível, respeitando boas práticas de organização de código e separação de responsabilidades.
Tecnologias envolvidas:
•	HTML5;
•	CSS3;
•	JavaScript (ES Modules);
•	JSON (estrutura de formulários);
•	IndexedDB (persistência local);
•	v0(postar o site online);


**2. Objetivos do Sistema**

•	Digitalizar formulários de anamnese e avaliação psicológica;
•	Permitir uso offline, sem dependência de backend;
•	Facilitar manutenção e expansão por meio de estrutura modular;
•	Garantir persistência segura de dados no navegador;
•	Exportar registros em formato HTML editável;
•	Suportar avaliações com escores e escalas psicológicas;

**3. Necessidades do Projeto**

•	Aperfeiçoamento através da digitalização de documentos
Conversão de formulários físicos ou estáticos para formato digital dinâmico, estruturado em JSON.
•	Acessibilidade, uso de marcação semântica, formulários navegáveis por teclado, responsividade  e estrutura compatível com leitores de tela.

**4. Arquitetura Geral**

•	JSON: Define perguntas, seções, tipos de campo e pesos de escala
•	JavaScript modular:
o	Renderização dinâmica;
o	Controle de estado do formulário;
o	Persistência no IndexedDB;
o	Exportação para HTML;
•	CSS: Estilização e controle visual de seções colapsáveis
•	HTML: É a parte estrutural do documento contendo a interpretação.

**5. Diário de Bordo**

Data	Tarefa Executada	Tempo Gasto	Problemas / Decisões Tomadas
20/11/2025	Definição do escopo e realinhamento do projeto	2h	Redução do escopo para solução client-side
22/11/2025	Estruturação do JSON base de formulários	3h	Padronização de campos e tipos
22/11/2025	Implementação da renderização dinâmica em JavaScript	4h	Separação por módulos ES
24/11/2025	Implementação de persistência com IndexedDB	3h	Escolha por armazenamento local
25/11/2025	Implementação de exportação para HTML editável	2h	Substituição da geração de DOCX
26/11/2025	Testes funcionais e ajustes de usabilidade	2h	Ajustes em inputs Sim/Não e textareas
27/11/2025	Teste gerais de usabilidade	4h	Conferencia entre o documento Word e o formulário Web


**6. Comprovação de Horas Utilizadas**

**Atividade	Horas**
Planejamento e definição de escopo	2h
Modelagem de dados (JSON)	3h
Desenvolvimento front-end (JS/HTML/CSS)	9h
Persistência local (IndexedDB)	3h
Exportação de dados (HTML editável)	2h
Testes e refinamentos	2h
Total estimado	23h


**7. Considerações Finais**
   
O projeto entrega uma solução leve, modular, offline e de fácil manutenção, adequada à realidade de profissionais de psicologia que necessitam registrar atendimentos e avaliações sem depender de infraestrutura complexa. O sistema foi projetado para crescimento incremental, permitindo a inclusão de novos formulários, escalas e cálculos sem reescrita estrutural.
