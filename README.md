# Site pessoal — Thiago Murari

Site acadêmico bilíngue (português/inglês) para publicação com GitHub Pages.

## Publicar

1. Entre em sua conta `muralearning` no GitHub.
2. Crie um repositório público chamado **`muralearning.github.io`**.
3. Envie todos os arquivos e pastas deste pacote para a raiz do repositório. O arquivo `index.html` precisa ficar na raiz.
4. No repositório, abra **Settings → Pages**.
5. Em **Build and deployment**, escolha **Deploy from a branch**; selecione `main` e `/ (root)` e salve.
6. Aguarde a publicação. O endereço esperado é <https://muralearning.github.io/>.

## Estrutura

```text
.
├── index.html
├── README.md
└── assets/
    ├── favicon.svg
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

## Personalização antes da publicação

- Revise a biografia, os cargos e as afiliações no `index.html`.
- Substitua os espaços reservados de publicações por títulos, autores, ano e DOI verificados.
- Acrescente links confirmados para ORCID, Google Scholar, Currículo Lattes e e-mail institucional.
- Inclua links para repositórios específicos, com README, licença, exemplos e instruções de citação.
- Se quiser usar fotografia, adicione um arquivo próprio em `assets/` e atualize o HTML.
- Revise as versões em português e inglês em `assets/js/main.js`.
- Confirme que não há informações internas, dados pessoais ou material não autorizado para publicação.

## Notas técnicas

- HTML, CSS e JavaScript puros; sem etapa de build.
- O seletor PT/EN altera os textos da página no navegador.
- O site usa Google Fonts como aprimoramento visual; fontes de sistema permanecem como alternativa.
- O conteúdo é público quando publicado. Não inclua informações confidenciais.
