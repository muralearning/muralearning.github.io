/* MuraLearning — Bento Grid, live OpenAlex indicators, and GitHub repositories */
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const root = document.documentElement;
  let currentLanguage = "pt";

  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  const translations = {
    pt: {
      eyebrow: "Pesquisa · Inovação",
      tagAI: "Inteligência Artificial", tagIndustry: "Indústria 4.0", tagComplex: "Sistemas Complexos", tagData: "Ciência de Dados", tagDigital: "Transformação Digital",
      heroRole: "Professor e pesquisador na Universidade SENAI CIMATEC",
      heroSubtitle: "Coordeno o Programa de Pós-Graduação em Gestão e Tecnologia Industrial (GETEC) e atuo como professor no Programa de Pós-Graduação em Modelagem Computacional e Tecnologia Industrial (MCTI). Minha pesquisa integra inteligência artificial, inovação industrial, ciência de dados e sistemas complexos para desenvolver métodos e soluções aplicadas para desafios industriais e para a sociedade.",
      areasLabel: "Áreas de atuação", socialProfilesLabel: "Perfis sociais",
      pub1Link: "Abrir artigo sobre mobilidade urbana sustentável na Scientific Reports",
      pub2Link: "Abrir artigo sobre reconhecimento de sinais de trânsito na revista Sensors",
      pub3Link: "Abrir publicação selecionada na ScienceDirect",
      linkedinLabel: "LinkedIn de Thiago Barros Murari",
      xLabel: "Perfil de Thiago Barros Murari no X (@tmurari)",
      emailLabel: "Enviar e-mail para Thiago Barros Murari",
      linksTitle: "Perfis acadêmicos",
      featuredBadge: "Projetos abertos", featuredTitle: "Código, notebooks e pesquisa aplicada",
      featuredText: "Explore repositórios, scripts e recursos técnicos publicados no GitHub.",
      featuredCta: "Explorar repositórios",
      topicsTitle: "Temas de Atuação", worksCount: "Trabalhos", citationCount: "Citações",
      hIndex: "Índice h", i10Index: "Índice i10", topicsHeading: "Tópicos de pesquisa",
      openalexLoading: "Carregando dados do OpenAlex…", topicsLoading: "Consultando tópicos de pesquisa…",
      openalexSource: "Fonte: OpenAlex", openalexUpdated: "Atualizado às ",
      openalexUnavailable: "Não foi possível carregar os dados. Consulte o perfil OpenAlex.",
      topicsUnavailable: "Os tópicos não puderam ser carregados.",
      reposTitle: "Repositórios recentes", viewAll: "Ver todos",
      publicationsTitle: "Publicações selecionadas", allPublications: "Ver mais publicações",
      contactTitle: "Colaboração",
      contactText: "Para colaborações acadêmicas, projetos de pesquisa e iniciativas de inovação, entre em contato por e-mail.",
      footer: "Publicado com GitHub Pages.",
      loadingReposTitle: "A carregar repositórios…", loadingReposText: "A consultar os repositórios públicos de @muralearning.",
      repoDefaultDescription: "Repositório público no GitHub.", repoCode: "Ver código →", repoExplore: "Explorar →",
      repoFallbackTitle: "Explore todos os repositórios",
      repoFallbackText: "Consulte os projetos, bibliotecas e recursos públicos disponíveis.",
      pageTitle: "Dr. Thiago Barros Murari | Pesquisa e Inovação",
      themeLight: "Ativar tema claro", themeDark: "Ativar tema escuro",
      switchLanguage: "Switch language to English"
    },
    en: {
      eyebrow: "Research · Innovation",
      tagAI: "Artificial Intelligence", tagIndustry: "Industry 4.0", tagComplex: "Complex Systems", tagData: "Data Science", tagDigital: "Digital Transformation",
      heroRole: "Professor and researcher at Universidade SENAI CIMATEC",
      heroSubtitle: "I coordinate the Graduate Program in Industrial Management and Technology (GETEC) and teach in the Graduate Program in Computational Modeling and Industrial Technology (MCTI). My research integrates artificial intelligence, industrial innovation, data science, and complex systems to develop applied methods and solutions for industrial and societal challenges.",
      areasLabel: "Research areas", socialProfilesLabel: "Social profiles",
      pub1Link: "Open the sustainable urban mobility article in Scientific Reports",
      pub2Link: "Open the traffic sign recognition article in Sensors",
      pub3Link: "Open the selected ScienceDirect publication",
      linkedinLabel: "Thiago Barros Murari on LinkedIn",
      xLabel: "Thiago Barros Murari on X (@tmurari)",
      emailLabel: "Email Thiago Barros Murari",
      linksTitle: "Academic profiles",
      featuredBadge: "Open projects", featuredTitle: "Code, notebooks, and applied research",
      featuredText: "Explore repositories, scripts, and technical resources published on GitHub.",
      featuredCta: "Explore repositories",
      topicsTitle: "Research Areas", worksCount: "Works count", citationCount: "Citation count",
      hIndex: "H-index", i10Index: "I10-index", topicsHeading: "Topics",
      openalexLoading: "Loading OpenAlex data…", topicsLoading: "Loading research topics…",
      openalexSource: "Source: OpenAlex", openalexUpdated: "Updated at ",
      openalexUnavailable: "Could not load data. Visit the OpenAlex profile.",
      topicsUnavailable: "Research topics could not be loaded.",
      reposTitle: "Recent repositories", viewAll: "View all",
      publicationsTitle: "Selected publications", allPublications: "More publications",
      contactTitle: "Collaboration",
      contactText: "For academic collaborations, research projects, and innovation initiatives, please get in touch by email.",
      footer: "Published with GitHub Pages.",
      loadingReposTitle: "Loading repositories…", loadingReposText: "Fetching public repositories for @muralearning.",
      repoDefaultDescription: "Public GitHub repository.", repoCode: "View code →", repoExplore: "Explore →",
      repoFallbackTitle: "Explore all repositories",
      repoFallbackText: "Browse available public projects, libraries, and resources.",
      pageTitle: "Dr. Thiago Barros Murari | Research and Innovation",
      themeLight: "Switch to light theme", themeDark: "Switch to dark theme",
      switchLanguage: "Mudar idioma para português"
    }
  };

  // Theme toggle with persistence where localStorage is available.
  const themeButton = $("#theme-toggle");
  let initialTheme = "light";
  try {
    initialTheme = localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  } catch (_) {}
  root.setAttribute("data-theme", initialTheme);
  function updateThemeLabel() {
    if (!themeButton) return;
    const dark = root.getAttribute("data-theme") === "dark";
    const label = dark ? translations[currentLanguage].themeLight : translations[currentLanguage].themeDark;
    themeButton.setAttribute("aria-label", label);
    themeButton.title = label;
    themeButton.setAttribute("aria-pressed", String(dark));
  }
  updateThemeLabel();
  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (_) {}
      updateThemeLabel();
    });
  }

  const languageButton = $("#lang-toggle");
  function setLanguage(language) {
    currentLanguage = language;
    root.lang = language === "pt" ? "pt-BR" : "en";
    document.title = translations[language].pageTitle;
    $$("[data-i18n]").forEach((element) => {
      const value = translations[language][element.getAttribute("data-i18n")];
      if (typeof value === "string") element.textContent = value;
    });
    $$("[data-i18n-aria-label]").forEach((element) => {
      const value = translations[language][element.getAttribute("data-i18n-aria-label")];
      if (typeof value === "string") element.setAttribute("aria-label", value);
    });
    const avatar = $("#profile-avatar");
    if (avatar) avatar.alt = language === "pt"
      ? "Foto de perfil de Thiago Barros Murari"
      : "Profile photo of Thiago Barros Murari";
    if (languageButton) {
      languageButton.textContent = language === "pt" ? "EN" : "PT";
      languageButton.setAttribute("aria-label", translations[language].switchLanguage);
      languageButton.title = language === "pt" ? "English" : "Português";
    }
    updateThemeLabel();
    $$(".repo-link-text").forEach((element) => {
      element.textContent = translations[language].repoCode;
    });
    const fallback = $("#github-repos[data-fallback='true']");
    if (fallback) renderFallbackRepos(fallback);
    const openAlexStatus = $("#openalex-status");
    if (openAlexStatus && openAlexStatus.dataset.state === "unavailable") {
      openAlexStatus.textContent = translations[language].openalexUnavailable;
    } else if (openAlexStatus && openAlexStatus.dataset.updated) {
      updateOpenAlexTimestamp(openAlexStatus.dataset.updated);
    }
  }
  if (languageButton) languageButton.addEventListener("click", () => {
    setLanguage(currentLanguage === "pt" ? "en" : "pt");
  });

  // Load the two most recently updated non-fork GitHub repositories.
  function renderFallbackRepos(container) {
    container.replaceChildren();
    container.dataset.fallback = "true";
    const t = translations[currentLanguage];
    const cards = [
      { title: "muralearning", href: "https://github.com/muralearning", meta: "GitHub", description: t.repoDefaultDescription },
      { title: t.repoFallbackTitle, href: "https://github.com/muralearning?tab=repositories", meta: currentLanguage === "pt" ? "Repositórios" : "Repositories", description: t.repoFallbackText }
    ];
    cards.forEach((item) => {
      const card = document.createElement("a");
      card.href = item.href;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.className = "repo-card";
      const top = document.createElement("div");
      top.className = "repo-top";
      const title = document.createElement("h3");
      title.textContent = item.title;
      const badge = document.createElement("span");
      badge.className = "repo-stars";
      badge.textContent = item.meta;
      top.append(title, badge);
      const description = document.createElement("p");
      description.textContent = item.description;
      const footer = document.createElement("div");
      footer.className = "repo-footer";
      const language = document.createElement("span");
      language.className = "repo-lang";
      language.textContent = "GitHub";
      const linkText = document.createElement("span");
      linkText.className = "repo-link-text";
      linkText.textContent = t.repoExplore;
      footer.append(language, linkText);
      card.append(top, description, footer);
      container.append(card);
    });
    container.setAttribute("aria-busy", "false");
  }

  async function loadGitHubRepos() {
    const container = $("#github-repos");
    if (!container) return;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch("https://api.github.com/users/muralearning/repos?sort=updated&per_page=100", { signal: controller.signal });
      if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
      const repositories = await response.json();
      const selected = repositories
        .filter((repo) => !repo.fork)
        .sort((a, b) => new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at))
        .slice(0, 2);
      if (!selected.length) throw new Error("No public repositories found");

      container.replaceChildren();
      delete container.dataset.fallback;
      selected.forEach((repo) => {
        const card = document.createElement("a");
        card.className = "repo-card";
        card.href = repo.html_url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        const top = document.createElement("div");
        top.className = "repo-top";
        const title = document.createElement("h3");
        title.textContent = repo.name;
        const stars = document.createElement("span");
        stars.className = "repo-stars";
        stars.textContent = `★ ${Number(repo.stargazers_count) || 0}`;
        top.append(title, stars);
        const description = document.createElement("p");
        description.textContent = repo.description || translations[currentLanguage].repoDefaultDescription;
        const footer = document.createElement("div");
        footer.className = "repo-footer";
        const lang = document.createElement("span");
        lang.className = "repo-lang";
        lang.textContent = repo.language || (currentLanguage === "pt" ? "Código" : "Code");
        const open = document.createElement("span");
        open.className = "repo-link-text";
        open.textContent = translations[currentLanguage].repoCode;
        footer.append(lang, open);
        card.append(top, description, footer);
        container.append(card);
      });
      container.setAttribute("aria-busy", "false");
    } catch (_) {
      renderFallbackRepos(container);
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  // OpenAlex: current author-level metrics and top research topics.
  function updateOpenAlexTimestamp(isoTimestamp) {
    const status = $("#openalex-status");
    if (!status) return;
    const timeText = new Date(isoTimestamp).toLocaleTimeString(
      currentLanguage === "pt" ? "pt-BR" : "en-US",
      { hour: "2-digit", minute: "2-digit" }
    );
    status.textContent = translations[currentLanguage].openalexUpdated + timeText;
    status.dataset.updated = isoTimestamp;
    status.dataset.state = "updated";
  }

  async function loadOpenAlexData() {
    const status = $("#openalex-status");
    const topicsContainer = $("#openalex-topics");
    if (!status || !topicsContainer) return;

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(
        "https://api.openalex.org/authors/A5030022714?select=id,works_count,cited_by_count,summary_stats,topics,updated_date",
        { signal: controller.signal, headers: { "Accept": "application/json" } }
      );
      if (!response.ok) throw new Error(`OpenAlex API returned ${response.status}`);
      const data = await response.json();
      const stats = data.summary_stats || {};
      const numberFormat = new Intl.NumberFormat(currentLanguage === "pt" ? "pt-BR" : "en-US");
      const values = {
        "#openalex-works": data.works_count,
        "#openalex-citations": data.cited_by_count,
        "#openalex-hindex": stats.h_index,
        "#openalex-i10index": stats.i10_index
      };
      Object.entries(values).forEach(([selector, value]) => {
        const node = $(selector);
        if (node) node.textContent = Number.isFinite(Number(value)) ? numberFormat.format(Number(value)) : "—";
      });

      topicsContainer.replaceChildren();
      const topics = Array.isArray(data.topics) ? data.topics.slice(0, 6) : [];
      if (!topics.length) {
        const empty = document.createElement("span");
        empty.className = "topic-placeholder";
        empty.textContent = translations[currentLanguage].topicsUnavailable;
        topicsContainer.append(empty);
      } else {
        topics.forEach((topic) => {
          const chip = document.createElement("a");
          chip.className = "topic-chip";
          chip.href = topic.id || "https://openalex.org/authors/A5030022714";
          chip.target = "_blank";
          chip.rel = "noopener noreferrer";
          chip.textContent = topic.display_name || topic.name || "Topic";
          chip.title = currentLanguage === "pt" ? "Abrir tópico no OpenAlex" : "Open topic in OpenAlex";
          topicsContainer.append(chip);
        });
      }
      topicsContainer.setAttribute("aria-busy", "false");
      status.dataset.state = "updated";
      updateOpenAlexTimestamp(new Date().toISOString());
    } catch (_) {
      ["#openalex-works", "#openalex-citations", "#openalex-hindex", "#openalex-i10index"].forEach((selector) => {
        const node = $(selector);
        if (node) node.textContent = "—";
      });
      topicsContainer.replaceChildren();
      const unavailable = document.createElement("span");
      unavailable.className = "topic-placeholder";
      unavailable.textContent = translations[currentLanguage].topicsUnavailable;
      topicsContainer.append(unavailable);
      topicsContainer.setAttribute("aria-busy", "false");
      status.textContent = translations[currentLanguage].openalexUnavailable;
      status.dataset.state = "unavailable";
      delete status.dataset.updated;
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  setLanguage("pt");
  loadGitHubRepos();
  loadOpenAlexData();
  // Refresh during long visits; a page load also fetches fresh OpenAlex data.
  window.setInterval(loadOpenAlexData, 30 * 60 * 1000);
})();
