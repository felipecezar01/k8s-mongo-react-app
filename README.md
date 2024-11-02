# Projeto de API com Autenticação

## Status: **Abandonado**

<div align="center">
   <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExanV2djN0eDVsY3M0aGw3ZHhyeDAxMjBwN2M5MjBjdzhrOXd0bGV0dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/udoce5CHY5kZSY031S/giphy.gif" alt="4k">
</div>

---

> [!IMPORTANT]
> **Motivo da Desistência**  
> Este projeto foi oficialmente abandonado devido aos inúmeros problemas e bugs encontrados ao tentar implementar a atualização das credenciais do usuário (como `username` e `password`) e a geração do JWT. Abaixo, detalho as principais dificuldades que levaram à decisão de recomeçar em uma nova abordagem.

---

> [!NOTE]
> **Dificuldades Enfrentadas**  
> 1. **Inconsistência do MongoDB com Docker Compose**  
>    Tive problemas iniciais com a configuração do Docker Compose. O MongoDB estava rodando tanto localmente quanto no container, o que gerou várias inconsistências de dados.  
>    Foi uma luta entender o que estava realmente acontecendo, e foram necessárias **7 horas** para configurar corretamente o Docker e o MongoDB.
>
> 2. **Atualização de Credenciais e JWT no Node.js**  
>    A lógica de atualização das credenciais do usuário com `username` e `password` usando JWT foi extremamente problemática.  
>    Este não é o primeiro projeto em que o **Node.js e o JavaScript** me deram muito trabalho no backend, especialmente ao lidar com autenticação JWT.  
>    Em projetos anteriores, ao trabalhar com **Java**, essa funcionalidade foi muito mais tranquila e intuitiva de implementar.  
>    Já são **3 horas** tentando corrigir problemas relacionados ao JWT no Node.js sem sucesso, mesmo após múltiplas tentativas de depuração e ajustes.

<div align="center">
   <img src="./5rl5u6xcwh851.png" alt="Descrição da Imagem">
</div>


---

> [!TIP]
> **Próximos Passos**  
> Pretendo recomeçar o projeto utilizando **NestJS**, que é um framework inspirado no Spring Boot do Java e promete simplificar o desenvolvimento backend com Node.js. O NestJS aparenta ter uma estrutura mais organizada e recursos nativos para lidar com autenticação e JWT, o que pode facilitar o processo.  
> Se o NestJS ainda apresentar desafios similares, considerarei voltar ao **Java com Spring Boot**, que já provou ser mais robusto e confiável para mim.

<div align="center">
   <img src="./nest.png" alt="Nest">
</div>


---

> [!WARNING]
> **Aprendizados Importantes**  
> Nem sempre as coisas saem como planejado. Esta experiência foi frustrante, mas também foi uma lição valiosa sobre o quão importante é a escolha das ferramentas e a configuração inicial do projeto. Em resumo:
> - **Estudar mais profundamente o JWT** e buscar alternativas mais eficientes para autenticação no Node.js.
> - Dar uma chance ao **NestJS**, mas sem hesitar em retornar ao Java, se necessário.


---

> [!CAUTION]
> **Nota Final**  
> Abandonar projetos faz parte do processo de aprendizado, e já estou ansioso para recomeçar com uma abordagem mais eficiente. Vamos em frente! Matenho minha cabeça erguida perdendo ou ganhando 🤺 

<div align="center">
   <img src="./rock.gif" alt="Rock">
</div>
