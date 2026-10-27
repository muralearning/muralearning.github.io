# MuraLearning — Bento Grid

Site estático para GitHub Pages, baseado nos arquivos HTML e CSS fornecidos.

## Estrutura

- `index.html` — página principal
- `assets/css/style.css` — estilos Bento Grid
- `assets/js/main.js` — alternância de tema, idioma, ano e carregamento dos repositórios públicos do GitHub
- `assets/favicon.svg` — ícone do site

## Publicar no GitHub Pages

1. Crie ou abra o repositório `muralearning.github.io`.
2. Copie todos os arquivos desta pasta para a raiz do repositório, mantendo a estrutura `assets/`.
3. Faça commit e push para a branch `main`.
4. Em **Settings → Pages**, selecione **Deploy from a branch**, branch `main`, pasta `/ (root)`.
5. A página deverá ficar disponível em `https://muralearning.github.io/`.

## Antes de publicar

- Substitua os links genéricos de ORCID/Lattes, Google Scholar e LinkedIn pelos perfis corretos.
- Atualize as publicações e os materiais de ensino com títulos, URLs, DOI e informações verificadas.
- Se desejar disponibilizar um endereço de e-mail, substitua o link do botão de contato pelo endereço correto.
- O carregamento automático dos repositórios depende do acesso à API pública do GitHub e de disponibilidade da conexão.
- A fonte Inter e os ícones Lucide são carregados por CDN, portanto dependem de conexão à internet.

O site inclui alternância de tema claro/escuro, alternância de idioma Português/Inglês e layout responsivo para computadores, tablets e telemóveis.
