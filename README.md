# MuraLearning — perfil acadêmico Bento Grid

Site estático para GitHub Pages, com apresentação acadêmica, links oficiais, publicações selecionadas, repositórios públicos e indicadores dinâmicos de OpenAlex.

## Estrutura

- `index.html` — página principal, perfil, links acadêmicos e publicações.
- `assets/css/style.css` — layout Bento Grid, temas claro/escuro e responsividade.
- `assets/js/main.js` — alternância PT/EN, tema, repositórios do GitHub e métricas/tópicos dinâmicos de OpenAlex.
- `assets/favicon.svg` — ícone do site.

## Publicar ou atualizar

1. Extraia o ZIP.
2. Copie os arquivos para a raiz do repositório `muralearning.github.io`, mantendo a pasta `assets/`.
3. Faça commit e push para a branch `main`.
4. Em **Settings → Pages**, confirme `Deploy from a branch`, branch `main`, pasta `/ (root)`.
5. A publicação ficará disponível em `https://muralearning.github.io/`.

## Alterações desta versão

- Atualização do texto de apresentação e do vínculo institucional para a redação solicitada.
- Inclusão do perfil no X (`@tmurari`) e do e-mail institucional `thiago.murari@fieb.org.br`.
- Seção de perfis acadêmicos reduzida a ORCID, Lattes e Google Scholar.
- Seção renomeada para **Temas de Atuação**.
- Métricas de trabalhos, citações, índice h e índice i10 e tópicos de pesquisa carregados diretamente do perfil OpenAlex `A5030022714` ao abrir a página; atualização periódica a cada 30 minutos durante visitas longas.
- Publicações selecionadas substituídas pelas três URLs fornecidas.
- Link “Ver mais publicações” apontando para o Google Scholar informado.

## Fontes dinâmicas e observações

- Métricas e tópicos: [OpenAlex — A5030022714](https://openalex.org/authors/A5030022714), consultado pela API pública `https://api.openalex.org/authors/A5030022714`.
- Repositórios: API pública do GitHub. Ambos os serviços dependem de acesso à internet; se uma API falhar, a página informa que os dados não estão disponíveis em vez de inventar valores.
- O título completo e os metadados da terceira publicação (link ScienceDirect fornecido) não foram recuperados na consulta de edição; por isso, o cartão usa uma descrição neutra e abre o URL indicado.
- A fonte Inter e os ícones Lucide são carregados por CDN.
