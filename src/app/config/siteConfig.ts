export const siteConfig = {
  title: "NextJs App",
  description: "Study Next.js",
  navItems: [
    { label: "Рецепты", href: "/" },
    { label: "Ингридиенты", href: "/ingredients" },
    { label: "О нас", href: "/about" },
  ],
  pagesContent: {
    "/": {
      title: "Рецепты",
      description: `<p>Здесь вы найдете лучшие рецепты для вашего стола.</p>`,
    },
    "/ingredients": {
      title: "Ингридиенты",
      description: `<p>Узнайте о различных ингридиентах и их свойствах.</p>`,
    },
    "/about": {
      title: "О нас",
      description: `<p>Мы - команда энтузиастов, любящих готовить и делиться рецептами.</p>`,
    },
  },
};
