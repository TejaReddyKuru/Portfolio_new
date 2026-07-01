import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Activity } from 'lucide-react';

const filters = ["All", "Live Projects", "Full Stack", "Frontend", "Backend"];

const specialProjects = [
  {
    title: "Gamify ECO-LEARNER",
    description: "A web platform for gamifying the learning experience for students on environmental science.",
    image: "https://opengraph.githubassets.com/1/TejaReddyKuru/Gamify_ECO-LEARNER",
    tags: ["JavaScript", "Frontend"],
    category: "Frontend",
    github: "https://github.com/TejaReddyKuru/Gamify_ECO-LEARNER",
    live: "https://gamify-eco-learner-hwwp.vercel.app/",
    features: ["⭐ Featured Project", "Gamified Learning", "Live on Vercel"]
  },
  {
    title: "Swepper",
    description: "Modern platform and services - Swepper.",
    image: "https://opengraph.githubassets.com/1/TejaReddyKuru/Swepper.com",
    tags: ["JavaScript", "React"],
    category: "Frontend",
    github: "https://github.com/TejaReddyKuru/Swepper.com",
    live: "https://swepper-com.vercel.app/",
    features: ["⭐ Featured Project", "Modern UI", "Live on Vercel"]
  },
  {
    title: "VantixTech",
    description: "Official website and tech solutions for VantixTech.",
    image: "https://ui-avatars.com/api/?name=VantixTech&background=fb923c&color=fff&size=512",
    tags: ["Web", "Full Stack"],
    category: "Full Stack",
    github: "https://github.com/TejaReddyKuru/vantixtech", 
    live: "https://vantixtech.vercel.app/",
    features: ["⭐ Featured Project", "Live on Vercel"]
  }
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState(specialProjects);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllRepos = async () => {
      try {
        let page = 1;
        let allRepos = [];
        let keepFetching = true;
        
        while (keepFetching) {
          const res = await fetch(`https://api.github.com/users/TejaReddyKuru/repos?sort=updated&per_page=100&page=${page}`);
          const data = await res.json();
          
          if (!Array.isArray(data)) {
            if (page === 1) {
              console.error("GitHub API Error:", data.message || "Failed to fetch repos array");
              setProjects(specialProjects);
              setIsLoading(false);
            }
            break;
          }
          
          if (data.length === 0) {
            keepFetching = false;
            break;
          }
          
          allRepos = [...allRepos, ...data];
          page++;
        }
        
        if (allRepos.length > 0) {
          const specialRepoNames = ["Gamify_ECO-LEARNER", "Swepper.com", "vantixtech"];
          
          const fetchedProjects = allRepos
            .filter(repo => !specialRepoNames.some(s => repo.name.toLowerCase().includes(s.toLowerCase())))
            .map(repo => {
              let category = "Other";
              const lang = repo.language;
              if (lang) {
                if (["JavaScript", "TypeScript", "HTML", "CSS", "Vue", "Svelte", "React"].includes(lang)) category = "Frontend";
                else if (["Python", "PHP", "Java", "C++", "C#", "Go", "Ruby", "Rust", "C", "Jupyter Notebook"].includes(lang)) category = "Backend";
              }
              
              return {
                title: repo.name.replace(/[-_]/g, ' '),
                description: repo.description || "No description available.",
                image: `https://opengraph.githubassets.com/1/TejaReddyKuru/${repo.name}`,
                tags: lang ? [lang] : [],
                category: category,
                github: repo.html_url,
                live: repo.homepage || "#",
                features: ["Fetched dynamically from GitHub", `Stars: ${repo.stargazers_count}`, `Forks: ${repo.forks_count}`]
              };
            });
            
          setProjects([...specialProjects, ...fetchedProjects]);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching repos:", err);
        setProjects(specialProjects);
        setIsLoading(false);
      }
    };
    
    fetchAllRepos();
  }, []);

  useEffect(() => {
    const handleFilterChange = (e) => {
      setActiveFilter(e.detail);
    };
    window.addEventListener('filterProjects', handleFilterChange);
    return () => window.removeEventListener('filterProjects', handleFilterChange);
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Live Projects") return project.live && project.live !== "#";
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="py-24 relative bg-white dark:bg-[#050505] min-h-screen transition-colors duration-500">
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tight"
          >
            Featured <span className="text-peach">Projects</span>
          </motion.h2>
          <div className="w-24 h-1 bg-peach mx-auto rounded-full" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-bold transition-all duration-300 border ${
                activeFilter === filter
                  ? "bg-peach/10 text-peach border-peach/50 shadow-lg"
                  : "bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-12">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-[40px] overflow-hidden group border border-gray-100 dark:border-white/10 hover:border-peach/50 transition-all duration-300 shadow-sm hover:shadow-2xl"
              >
                {/* Image Handle */}
                <div className="relative h-72 overflow-hidden bg-gray-100 dark:bg-gray-900 border-b border-gray-100 dark:border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover origin-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(project.title) + '&background=fb923c&color=fff&size=512'; }}
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-sm">
                    <div className="flex gap-4">
                      <a href={project.github} className="p-4 bg-white/20 hover:bg-peach rounded-full text-white transition-all hover:scale-110">
                        <Github size={24} />
                      </a>
                      <a href={project.live} className="p-4 bg-white/20 hover:bg-peach rounded-full text-white transition-all hover:scale-110">
                        <ExternalLink size={24} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-10 relative">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white group-hover:text-peach transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium text-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-8 space-y-3">
                    <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center">
                      <Activity size={18} className="mr-2 text-peach" /> Key Highlights
                    </h4>
                    <ul className="text-sm text-gray-500 dark:text-gray-400 font-bold space-y-1">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-center space-x-2">
                           <div className="w-1.5 h-1.5 bg-peach rounded-full" />
                           <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4 pt-6 border-t border-gray-100 dark:border-white/10">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 bg-gray-50 dark:bg-peach/10 text-gray-400 dark:text-peach rounded-full border border-gray-100 dark:border-peach/20 group-hover:bg-peach group-hover:text-white transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>


        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-400 mt-12 text-lg">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
}
