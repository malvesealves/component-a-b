# Pós-Graduação em Engenharia de Software - MVP SPRINT 2 

Componentes A e B - Frontend para cadastro de pets e API externa do ViaCep

---
## Como executar 

Requisitos:
- É necessário possuir o [Docker](https://docs.docker.com/engine/install/) instalado e em execução.

API externa:
- A documentação da API externa ViaCep encontra-se no [link](https://viacep.com.br/)

Etapas:


1 - Clonar o repositório e descompactar da pasta .zip.

2 - Ir ao diretório raiz, onde contém o Dockerfile, e executar como administrador o seguinte comando para construir a imagem Docker:
```
$ docker build -t component-a-b
```

3 - Após a criação da imagem, executar como adminitrador o seguinte comando para rodar o container:
```
$ docker run -p 5000:80 component-a-b
```

Após seguir todos os passos, abrir o link abaixo no bavegador para verificar o status da API em execução
- [http://localhost:5000/#/](http://localhost:5000/#/)

