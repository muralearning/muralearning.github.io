# MuraLearning — perfil acadêmico Bento Grid

Site estático para GitHub Pages, baseado no HTML/CSS Bento Grid fornecido e atualizado para uma apresentação acadêmica pessoal.

## Estrutura

- `index.html` — página principal, perfis acadêmicos e publicações selecionadas.
- `assets/css/style.css` — layout Bento Grid, temas claro/escuro e responsividade.
- `assets/js/main.js` — alternância PT/EN, tema, ano do rodapé e carregamento de repositórios públicos.
- `assets/favicon.svg` — ícone do site.

## Publicar ou atualizar

1. Extraia o ZIP.
2. Copie os arquivos para a raiz do repositório `muralearning.github.io`, mantendo a pasta `assets/`.
3. Faça commit e push para a branch `main`.
4. Em **Settings → Pages**, confirme `Deploy from a branch`, branch `main`, pasta `/ (root)`.
5. A página deverá ser publicada em `https://muralearning.github.io/`.

## O que foi corrigido

- Identidade acadêmica, instituição, áreas de atuação e resumo profissional no cartão principal.
- Links substituídos por perfis específicos: ORCID, Ciência Vitae, FAPESP e DBLP.
- Publicações selecionadas substituídas por trabalhos com DOI verificável.
- Cartões que antes levavam a `#` passaram a apontar para publicações ou perfis correspondentes.
- Metadados SEO e Open Graph/Twitter adicionados.
- JavaScript separado e melhorado: timeout da API do GitHub, fallback em caso de erro, manipulação segura do texto dos repositórios e tradução PT/EN dos novos conteúdos.
- Melhorias de acessibilidade com labels, foco visível e respeito a `prefers-reduced-motion`.

## Observações

- A API pública do GitHub, os ícones Lucide e a fonte Inter dependem de acesso à internet. Se a API do GitHub falhar, a página exibe cartões de fallback em vez de permanecer indefinidamente no estado de carregamento.
- O link FAPESP aponta para o perfil de pesquisador que também remete ao currículo Lattes, ORCID e citações. O perfil individual do Google Scholar e um e-mail de contato não foram adicionados porque os endereços exatos não foram confirmados. A área de contato encaminha ao perfil acadêmico, evitando um endereço fictício.
- Os títulos e DOIs das publicações foram conferidos em páginas bibliográficas públicas. Revise periodicamente a seleção e os metadados.


## Nota sobre as redes sociais

O LinkedIn está ligado ao perfil público identificado para Thiago Murari. O botão do X está temporariamente ligado a `https://x.com/`; substitua esse destino pelo URL do perfil pessoal antes de publicar, pois não foi possível confirmar um identificador público inequívoco.
