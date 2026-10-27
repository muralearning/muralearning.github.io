/* MuraLearning — Bento Grid interactions */
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  // Icons and current year.
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Theme: use saved preference, otherwise follow the operating system.
  const root = document.documentElement;
  const themeButton = $("#theme-toggle");
  let initialTheme = "light";
  try {
    initialTheme = localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  } catch (_) {}
  root.setAttribute("data-theme", initialTheme);

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", nextTheme);
      try { localStorage.setItem("theme", nextTheme); } catch (_) {}
    });
  }

  // Portuguese/English toggle. Content not included here can be edited directly in index.html.
  const translations = {
    pt: {
      status: "Ativo em Pesquisa & Ensino",
      heroSubtitle: "Espaço dedicado a <strong>Aprendizagem de Máquina, Ciência de Dados e Desenvolvimento</strong>, com materiais educativos e científicos.",
      linksTitle: "Links & Perfis",
      featuredBadge: "Em Destaque",
      featuredTitle: "Laboratório & Notebooks",
      featuredText: "Coleção interativa de scripts, notebooks práticos e experimentos aplicados.",
      featuredCta: "Explorar Projetos",
      coursesTitle: "Materiais de Ensino & Guias",
      moduleOne: "MÓDULO 01",
      courseOneTitle: "Fundamentos & Programação",
      courseOneText: "Apostilas, listas de exercícios e códigos de base.",
      moduleTwo: "MÓDULO 02",
      courseTwoTitle: "Análise de Dados & Modelagem",
      courseTwoText: "Tutoriais práticos, conjuntos de dados e notebooks comentados.",
      reposTitle: "Repositórios Recentes",
      viewAll: "Ver todos",
      publicationsTitle: "Publicações & Notas Técnicas",
      publicationPlaceholderTitle: "Adicionar publicação científica selecionada",
      publicationPlaceholderText: "Autores, periódico/conferência, ano e DOI — preencher com dados verificados.",
      publicationLink: "Adicionar DOI / PDF",
      resourcesTitle: "Materiais técnicos e recursos de pesquisa",
      resourcesText: "Inclua aqui guias, notebooks ou recursos públicos que deseja destacar.",
      resourcesLink: "Aceder",
      contactTitle: "Contato",
      contactText: "Aberto a colaborações em projetos, ensino e pesquisa.",
      contactCta: "Visitar GitHub",
      footer: "Publicado com GitHub Pages.",
      loadingReposTitle: "A carregar repositórios...",
      loadingReposText: "A ligar à API do GitHub @muralearning"
    },
    en: {
      status: "Active in Research & Teaching",
      heroSubtitle: "A space for <strong>machine learning, data science, and software development</strong>, with educational and scientific resources.",
      linksTitle: "Links & Profiles",
      featuredBadge: "Featured",
      featuredTitle: "Lab & Notebooks",
      featuredText: "A curated collection of scripts, practical notebooks, and applied experiments.",
      featuredCta: "Explore Projects",
      coursesTitle: "Teaching Materials & Guides",
      moduleOne: "MODULE 01",
      courseOneTitle: "Fundamentals & Programming",
      courseOneText: "Lecture notes, exercise lists, and starter code.",
      moduleTwo: "MODULE 02",
      courseTwoTitle: "Data Analysis & Modeling",
      courseTwoText: "Hands-on tutorials, datasets, and annotated notebooks.",
      reposTitle: "Recent Repositories",
      viewAll: "View all",
      publicationsTitle: "Publications & Technical Notes",
      publicationPlaceholderTitle: "Add a selected scientific publication",
      publicationPlaceholderText: "Authors, journal/conference, year, and DOI — replace with verified details.",
      publicationLink: "Add DOI / PDF",
      resourcesTitle: "Technical Materials & Research Resources",
      resourcesText: "Add guides, notebooks, or public resources you would like to feature here.",
      resourcesLink: "Open item",
      contactTitle: "Contact",
      contactText: "Open to collaboration in projects, teaching, and research.",
      contactCta: "Visit GitHub",
      footer: "Published with GitHub Pages.",
      loadingReposTitle: "Loading repositories...",
      loadingReposText: "Connecting to the GitHub API for @muralearning"
    }
  };

  let currentLanguage = "pt";
  const langButton = $("#lang-toggle");
  function setLanguage(language) {
    currentLanguage = language;
    root.lang = language === "pt" ? "pt-BR" : "en";
    $$("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (Object.prototype.hasOwnProperty.call(translations[language], key)) {
        element.innerHTML = translations[language][key];
      }
    });
    if (langButton) langButton.textContent = language === "pt" ? "EN" : "PT";
    // Update repository-card action labels after the language is changed.
    $$(".repo-link-text").forEach((element) => {
      element.textContent = language === "pt" ? "Ver código →" : "View code →";
    });
  }
  if (langButton) {
    langButton.addEventListener("click", () => setLanguage(currentLanguage === "pt" ? "en" : "pt"));
  }

  // Load public, non-fork repositories from the user's GitHub account.
  // Repo information is inserted as text nodes rather than HTML to avoid injection.
  async function loadGitHubRepos() {
    const container = $("#github-repos");
    if (!container) return;

    try {
      const response = await fetch("https://api.github.com/users/muralearning/repos?sort=updated&per_page=100");
      if (!response.ok) throw new Error("GitHub API request failed");
      const repositories = await response.json();
      const selected = repositories
        .filter((repo) => !repo.fork)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 2);

      if (!selected.length) throw new Error("No public repositories found");
      container.replaceChildren();

      selected.forEach((repo) => {
        const card = document.createElement("a");
        card.className = "repo-card";
        card.href = repo.html_url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";

        const top = document.createElement("div");
        top.className = "repo-top";
        const title = document.createElement("h4");
        title.textContent = repo.name;
        const stars = document.createElement("span");
        stars.className = "repo-stars";
        stars.textContent = `★ ${repo.stargazers_count}`;
        top.append(title, stars);

        const description = document.createElement("p");
        description.textContent = repo.description || (
          currentLanguage === "pt" ? "Repositório público no GitHub." : "Public GitHub repository."
        );

        const footer = document.createElement("div");
        footer.className = "repo-footer";
        const language = document.createElement("span");
        language.className = "repo-lang";
        language.textContent = repo.language || (currentLanguage === "pt" ? "Código" : "Code");
        const open = document.createElement("span");
        open.className = "repo-link-text";
        open.textContent = currentLanguage === "pt" ? "Ver código →" : "View code →";
        footer.append(language, open);

        card.append(top, description, footer);
        container.append(card);
      });
    } catch (_) {
      container.replaceChildren();
      const fallbackCards = [
        {
          title: "muralearning",
          descriptionPt: "Explore projetos públicos, códigos e recursos de pesquisa.",
          descriptionEn: "Explore public projects, code, and research resources.",
          href: "https://github.com/muralearning",
          metaPt: "GitHub",
          metaEn: "GitHub"
        },
        {
          title: currentLanguage === "pt" ? "Todos os repositórios" : "All repositories",
          descriptionPt: "Consulte os repositórios públicos e os projetos disponíveis.",
          descriptionEn: "Browse all available public repositories and projects.",
          href: "https://github.com/muralearning?tab=repositories",
          metaPt: "Repositórios",
          metaEn: "Repositories"
        }
      ];

      fallbackCards.forEach((item) => {
        const card = document.createElement("a");
        card.href = item.href;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        card.className = "repo-card";

        const top = document.createElement("div");
        top.className = "repo-top";
        const title = document.createElement("h4");
        title.textContent = item.title;
        const badge = document.createElement("span");
        badge.className = "repo-stars";
        badge.textContent = "GitHub";
        top.append(title, badge);

        const description = document.createElement("p");
        description.textContent = currentLanguage === "pt" ? item.descriptionPt : item.descriptionEn;

        const footer = document.createElement("div");
        footer.className = "repo-footer";
        const meta = document.createElement("span");
        meta.className = "repo-lang";
        meta.textContent = currentLanguage === "pt" ? item.metaPt : item.metaEn;
        const open = document.createElement("span");
        open.className = "repo-link-text";
        open.textContent = currentLanguage === "pt" ? "Explorar →" : "Explore →";
        footer.append(meta, open);

        card.append(top, description, footer);
        container.append(card);
      });
    }
  }

  loadGitHubRepos();
})();
