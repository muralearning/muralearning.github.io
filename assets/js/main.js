/* MuraLearning — academic Bento Grid interactions */
(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const root = document.documentElement;

  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Color theme: prefer a saved choice, otherwise use the OS preference.
  const themeButton = $("#theme-toggle");
  let initialTheme = "light";
  try {
    initialTheme = localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  } catch (_) { /* localStorage can be unavailable in restricted contexts */ }
  root.setAttribute("data-theme", initialTheme);
  if (themeButton) {
    themeButton.setAttribute("aria-pressed", String(initialTheme === "dark"));
    themeButton.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") !== "dark";
      const nextTheme = isDark ? "dark" : "light";
      root.setAttribute("data-theme", nextTheme);
      themeButton.setAttribute("aria-pressed", String(isDark));
      const themeLabel = currentLanguage === "pt"
        ? (isDark ? "Ativar tema claro" : "Ativar tema escuro")
        : (isDark ? "Switch to light theme" : "Switch to dark theme");
      themeButton.setAttribute("aria-label", themeLabel);
      themeButton.title = themeLabel;
      try { localStorage.setItem("theme", nextTheme); } catch (_) {}
    });
  }

  const translations = {
    pt: {
      status: "Professor e pesquisador", eyebrow: "Pesquisa · Ensino · Inovação",
      tagAI: "Inteligência Artificial", tagIndustry: "Indústria 4.0", tagComplex: "Sistemas Complexos", tagData: "Ciência de Dados", tagDigital: "Transformação Digital",
      heroRole: "Professor e pesquisador no Centro Universitário SENAI CIMATEC",
      heroSubtitle: "Coordenador do PPG em Gestão e Tecnologia Industrial (GETEC) e professor no PPG em Modelagem Computacional e Tecnologia Industrial (MCTI). Desenvolvo pesquisa aplicada em inteligência artificial, inovação industrial e sistemas complexos.",
      areasLabel: "Áreas de atuação", socialProfilesLabel: "Perfis sociais", linkedinLabel: "LinkedIn de Thiago Barros Murari", xLabel: "Abrir X", linksTitle: "Perfis acadêmicos", cvLink: "Currículo — Ciência Vitae",
      fapespLink: "Perfil FAPESP / Lattes", bibliographyLink: "Produção bibliográfica",
      featuredBadge: "Projetos abertos", featuredTitle: "Código, notebooks e pesquisa aplicada",
      featuredText: "Explore repositórios, scripts e recursos técnicos publicados no GitHub.", featuredCta: "Explorar repositórios",
      researchTitle: "Pesquisa e temas de atuação", researchAreaOne: "IA APLICADA",
      researchOneTitle: "Inteligência artificial e aprendizagem de máquina",
      researchOneText: "Modelos preditivos e métodos computacionais aplicados a problemas reais.",
      researchAreaTwo: "INDÚSTRIA 4.0", researchTwoTitle: "Inovação industrial e transformação digital",
      researchTwoText: "Tecnologias digitais, sistemas complexos, mobilidade e sustentabilidade.",
      reposTitle: "Repositórios recentes", viewAll: "Ver todos", publicationsTitle: "Publicações selecionadas",
      pubAuthorsOne: "Coautoria em estudo de previsão de velocidade do vento.",
      pubAuthorsTwo: "Pesquisa sobre detecção de Parkinson usando técnicas de IA.",
      pubAuthorsThree: "Pesquisa sobre diretrizes de design para ferramentas de autoria em realidade virtual.",
      allPublications: "Ver mais publicações", contactTitle: "Colaboração",
      contactText: "Para conhecer a trajetória acadêmica e iniciativas de pesquisa, consulte os perfis e projetos públicos.",
      contactCta: "Ver perfil acadêmico", footer: "Publicado com GitHub Pages.",
      loadingReposTitle: "A carregar repositórios…", loadingReposText: "A consultar os repositórios públicos de @muralearning.",
      repoDefaultDescription: "Repositório público no GitHub.", repoCode: "Ver código →", repoExplore: "Explorar →",
      repoFallbackTitle: "Explore todos os repositórios", repoFallbackText: "Consulte os projetos, bibliotecas e recursos públicos disponíveis."
    },
    en: {
      status: "Professor and researcher", eyebrow: "Research · Teaching · Innovation",
      tagAI: "Artificial Intelligence", tagIndustry: "Industry 4.0", tagComplex: "Complex Systems", tagData: "Data Science", tagDigital: "Digital Transformation",
      heroRole: "Professor and researcher at Centro Universitário SENAI CIMATEC",
      heroSubtitle: "Coordinator of the Graduate Program in Industrial Management and Technology (GETEC) and faculty member in the Graduate Program in Computational Modeling and Industrial Technology (MCTI). My applied research focuses on artificial intelligence, industrial innovation, and complex systems.",
      areasLabel: "Research areas", socialProfilesLabel: "Social profiles", linkedinLabel: "Thiago Barros Murari on LinkedIn", xLabel: "Open X", linksTitle: "Academic profiles", cvLink: "Curriculum — Ciência Vitae",
      fapespLink: "FAPESP researcher profile", bibliographyLink: "Bibliographic record",
      featuredBadge: "Open projects", featuredTitle: "Code, notebooks, and applied research",
      featuredText: "Explore repositories, scripts, and technical resources published on GitHub.", featuredCta: "Explore repositories",
      researchTitle: "Research areas", researchAreaOne: "APPLIED AI",
      researchOneTitle: "Artificial intelligence and machine learning",
      researchOneText: "Predictive models and computational methods applied to real-world problems.",
      researchAreaTwo: "INDUSTRY 4.0", researchTwoTitle: "Industrial innovation and digital transformation",
      researchTwoText: "Digital technologies, complex systems, mobility, and sustainability.",
      reposTitle: "Recent repositories", viewAll: "View all", publicationsTitle: "Selected publications",
      pubAuthorsOne: "Co-authored research on short-term wind speed forecasting.",
      pubAuthorsTwo: "Research on Parkinson’s disease detection using AI techniques.",
      pubAuthorsThree: "Research on design guidelines for virtual reality authoring tools.",
      allPublications: "View more publications", contactTitle: "Collaboration",
      contactText: "For academic background and research initiatives, see the public profiles and projects.",
      contactCta: "View academic profile", footer: "Published with GitHub Pages.",
      loadingReposTitle: "Loading repositories…", loadingReposText: "Fetching public repositories for @muralearning.",
      repoDefaultDescription: "Public GitHub repository.", repoCode: "View code →", repoExplore: "Explore →",
      repoFallbackTitle: "Explore all repositories", repoFallbackText: "Browse available public projects, libraries, and resources."
    }
  };

  let currentLanguage = "pt";
  const languageButton = $("#lang-toggle");
  function setLanguage(language) {
    currentLanguage = language;
    root.lang = language === "pt" ? "pt-BR" : "en";
    document.title = language === "pt"
      ? "Dr. Thiago Barros Murari | Pesquisa, Ensino e Tecnologia"
      : "Dr. Thiago Barros Murari | Research, Teaching & Technology";
    $$('[data-i18n]').forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const value = translations[language][key];
      if (typeof value === "string") element.textContent = value;
    });
    $$('[data-i18n-aria-label]').forEach((element) => {
      const key = element.getAttribute("data-i18n-aria-label");
      const value = translations[language][key];
      if (typeof value === "string") element.setAttribute("aria-label", value);
    });
    const avatar = $("#profile-avatar");
    if (avatar) avatar.alt = language === "pt" ? "Foto de perfil de Thiago Barros Murari" : "Profile photo of Thiago Barros Murari";
    if (themeButton) {
      const darkNow = root.getAttribute("data-theme") === "dark";
      themeButton.setAttribute("aria-label", language === "pt" ? (darkNow ? "Ativar tema claro" : "Ativar tema escuro") : (darkNow ? "Switch to light theme" : "Switch to dark theme"));
      themeButton.title = language === "pt" ? (darkNow ? "Ativar tema claro" : "Ativar tema escuro") : (darkNow ? "Switch to light theme" : "Switch to dark theme");
    }
    if (languageButton) {
      languageButton.textContent = language === "pt" ? "EN" : "PT";
      languageButton.setAttribute("aria-label", language === "pt" ? "Switch language to English" : "Mudar idioma para português");
      languageButton.title = language === "pt" ? "English" : "Português";
    }
    $$(".repo-link-text").forEach((element) => {
      element.textContent = language === "pt" ? translations.pt.repoCode : translations.en.repoCode;
    });
    // Update static fallback-card text when the user switches language after an API error.
    const fallback = $("#github-repos[data-fallback='true']");
    if (fallback) renderFallbackRepos(fallback);
  }
  if (languageButton) {
    languageButton.addEventListener("click", () => setLanguage(currentLanguage === "pt" ? "en" : "pt"));
  }

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
      const meta = document.createElement("span");
      meta.className = "repo-lang";
      meta.textContent = currentLanguage === "pt" ? "GitHub" : "GitHub";
      const linkText = document.createElement("span");
      linkText.className = "repo-link-text";
      linkText.textContent = t.repoExplore;
      footer.append(meta, linkText);
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

  loadGitHubRepos();
})();
