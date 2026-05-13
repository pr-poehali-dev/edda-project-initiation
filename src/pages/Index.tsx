import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PROJECTS = [
  {
    id: 1,
    title: "Архитектурный интерьер",
    category: "Фотография",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/5ca0df0d-d7a6-4832-8b6a-4f7d8beb8a8e/files/da6585ec-370b-41a1-9a27-01aa64276658.jpg",
    description: "Серия фотографий, исследующих взаимодействие света и геометрии в современной архитектуре.",
  },
  {
    id: 2,
    title: "Предметная съёмка",
    category: "Фотография",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/5ca0df0d-d7a6-4832-8b6a-4f7d8beb8a8e/files/bb11fe8b-a7f4-4845-afd2-0986659374c5.jpg",
    description: "Минималистичная предметная съёмка для брендов, где чистота формы — главный язык.",
  },
  {
    id: 3,
    title: "Абстрактная графика",
    category: "Графика",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/5ca0df0d-d7a6-4832-8b6a-4f7d8beb8a8e/files/b51835f4-95d9-4769-9805-b65eb509e2f9.jpg",
    description: "Цифровые абстракции на стыке геометрии и интуиции.",
  },
  {
    id: 4,
    title: "Типографический постер",
    category: "Графика",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/5ca0df0d-d7a6-4832-8b6a-4f7d8beb8a8e/files/62f9b23d-6a21-4156-97cf-58488c97832c.jpg",
    description: "Серия плакатов, исследующих выразительный потенциал шрифта.",
  },
  {
    id: 5,
    title: "Айдентика бренда",
    category: "Брендинг",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/5ca0df0d-d7a6-4832-8b6a-4f7d8beb8a8e/files/9d249ac9-9218-4dae-a603-30be41f16b0c.jpg",
    description: "Разработка фирменного стиля для премиального косметического бренда.",
  },
  {
    id: 6,
    title: "Цифровой продукт",
    category: "Брендинг",
    year: "2022",
    image: "https://cdn.poehali.dev/projects/5ca0df0d-d7a6-4832-8b6a-4f7d8beb8a8e/files/cdd1b9d2-8bc5-4c9c-b4a5-a22fb87f80b9.jpg",
    description: "Дизайн интерфейса мобильного приложения с фокусом на простоте.",
  },
];

const SKILLS = [
  { name: "Визуальный дизайн", level: 95 },
  { name: "Брендинг", level: 88 },
  { name: "Типографика", level: 92 },
  { name: "Фотография", level: 80 },
  { name: "UI/UX", level: 85 },
];

const CATEGORIES = ["Все", "Фотография", "Графика", "Брендинг"];

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("Все");
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const filtered =
    activeFilter === "Все"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">

      {/* Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <span className="font-display text-xl font-light tracking-widest uppercase">
            Портфолио
          </span>
          <div className="hidden md:flex items-center gap-10">
            {(
              [
                ["hero", "Главная"],
                ["about", "О нас"],
                ["gallery", "Работы"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {label}
              </button>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-background border-b border-border px-6 pb-6 flex flex-col gap-5">
            {(
              [
                ["hero", "Главная"],
                ["about", "О нас"],
                ["gallery", "Работы"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-xs tracking-widest uppercase text-left text-muted-foreground hover:text-foreground"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex flex-col justify-between px-6 md:px-12 max-w-6xl mx-auto"
      >
        <div className="pt-36 pb-12 flex-1 flex flex-col justify-center">
          <p
            className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Дизайнер · Визуальный художник
          </p>
          <h1
            className="font-display text-6xl md:text-8xl lg:text-[9rem] font-light leading-[0.9] tracking-tight mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.25s" }}
          >
            Алина
            <br />
            <em className="not-italic text-muted-foreground">Морозова</em>
          </h1>
          <div
            className="w-16 h-px bg-foreground mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.55s" }}
          />
          <p
            className="max-w-md text-base font-light leading-relaxed text-muted-foreground opacity-0 animate-fade-up"
            style={{ animationDelay: "0.65s" }}
          >
            Создаю визуальные истории через минимализм и точность. Работаю с
            брендами, которые ценят эстетику молчания.
          </p>
          <div
            className="flex items-center gap-6 mt-12 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.8s" }}
          >
            <button
              onClick={() => scrollTo("gallery")}
              className="text-xs tracking-[0.2em] uppercase border border-foreground px-8 py-3 hover:bg-foreground hover:text-primary-foreground transition-all duration-300"
            >
              Смотреть работы
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2"
            >
              О нас <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        </div>
        <div
          className="pb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: "1.1s" }}
        >
          <button
            onClick={() => scrollTo("gallery")}
            className="flex flex-col items-start gap-1 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-xs tracking-widest uppercase">Прокрутите</span>
            <Icon
              name="ArrowDown"
              size={16}
              className="group-hover:translate-y-1 transition-transform"
            />
          </button>
        </div>
      </section>

      {/* Stats strip */}
      <div className="border-y border-border py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4">
          {(
            [
              ["120+", "Проектов"],
              ["8", "Лет опыта"],
              ["40+", "Клиентов"],
            ] as const
          ).map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="font-display text-3xl md:text-5xl font-light">{num}</div>
              <div className="text-xs tracking-widest uppercase text-muted-foreground mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <section
        id="about"
        className="px-6 md:px-12 py-24 md:py-40 max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              О нас
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-8">
              Форма
              <br />
              <em>следует</em>
              <br />
              за смыслом
            </h2>
            <div className="w-10 h-px bg-foreground mb-8" />
            <p className="text-sm font-light leading-relaxed text-muted-foreground mb-6">
              Меня зовут Алина — визуальный дизайнер из Москвы с 8 годами опыта
              в создании идентичностей для брендов, которые умеют говорить
              меньше, но значить больше.
            </p>
            <p className="text-sm font-light leading-relaxed text-muted-foreground mb-12">
              Я верю, что настоящая красота живёт в пространстве между
              элементами — в паузах, в воздухе, в том, чего нет. Каждый проект
              начинается с вопроса: что здесь лишнее?
            </p>
            <button className="text-xs tracking-[0.2em] uppercase border border-foreground px-8 py-3 hover:bg-foreground hover:text-primary-foreground transition-all duration-300">
              Написать мне
            </button>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">
              Навыки
            </p>
            <div className="flex flex-col gap-6">
              {SKILLS.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-light">{skill.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-px bg-border overflow-hidden">
                    <div
                      className="h-full bg-foreground"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-16 grid grid-cols-2 gap-5">
              {[
                { icon: "MapPin", text: "Москва, Россия" },
                { icon: "Mail", text: "hello@alina.design" },
                { icon: "Globe", text: "alina.design" },
                { icon: "Instagram", text: "@alina_design" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <Icon name={item.icon} size={14} />
                  <span className="font-light">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section
        id="gallery"
        className="px-6 md:px-12 py-24 md:py-40 max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Работы
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-light">
              Избранное
            </h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-xs tracking-widest uppercase px-5 py-2 border transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-foreground text-primary-foreground border-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden cursor-pointer aspect-square"
              onClick={() => setSelectedProject(project)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/75 transition-all duration-500 flex items-end p-6">
                <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-xs tracking-widest uppercase text-white/60 mb-1">
                    {project.category} · {project.year}
                  </p>
                  <h3 className="font-display text-2xl text-white font-light">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 md:px-12 py-12 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <span className="font-display text-2xl font-light tracking-widest uppercase">
            Алина Морозова
          </span>
          <p className="text-xs text-muted-foreground tracking-wider">
            © 2024 · Все права защищены
          </p>
        </div>
      </footer>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-background border border-border max-w-4xl w-full max-h-[90vh] overflow-auto animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full aspect-video object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
              >
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="p-8">
              <div className="mb-4">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  {selectedProject.category} · {selectedProject.year}
                </p>
                <h2 className="font-display text-4xl font-light">
                  {selectedProject.title}
                </h2>
              </div>
              <div className="w-10 h-px bg-border mb-6" />
              <p className="text-sm font-light leading-relaxed text-muted-foreground max-w-lg">
                {selectedProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
