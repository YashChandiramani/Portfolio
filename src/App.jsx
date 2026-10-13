import { useEffect, useRef, useState } from 'react';

const iconPaths = {
  github: 'M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z',
  contact: 'M9 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.7a3.5 3.5 0 0 1 0 6.6M18 14.3c2 .7 3.5 2.5 3.5 5.7',
  mail: 'M4 5h16v14H4z M4 7l8 6 8-6',
  person: 'M12 8a4 4 0 1 0 0 .01zM4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5',
  education: 'M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5',
  work: 'M3 7h18v13H3zM9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18',
};
function Icon({ name }) { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={iconPaths[name]} /></svg>; }

const techGroups = [
  { name: 'Programming', items: [['Python','60,170,230','python'],['C++','60,130,230','cplusplus'],['C','150,150,170','c'],['SQL','80,140,190',null]] },
  { name: 'AI / Machine Learning', items: [['PyTorch','230,70,50','pytorch'],['Scikit-learn','245,140,40','scikitlearn'],['NumPy','60,160,200','numpy'],['Pandas','130,90,230','pandas'],['Matplotlib','60,140,200','matplotlib'],['Deep Learning','140,90,240',null],['Computer Vision','70,130,240',null]] },
  { name: 'Web & APIs', items: [['HTML5','230,90,50','html5'],['CSS3','50,130,220','css3'],['JavaScript','240,210,40','javascript'],['React','40,190,220','react'],['FastAPI','20,184,140','fastapi'],['Node.js','70,170,70','nodejs']] },
  { name: 'Tools & Platforms', items: [['Git','240,80,50','git'],['GitHub','150,150,170','github'],['Docker','40,140,230','docker'],['Jenkins','200,70,60','jenkins'],['Jupyter','230,120,40','jupyter']] },
];
const projects = [
  { title: 'ECG Noise Analyzer', description: 'A web app that classifies ECG segments as clean or noisy and predicts noise categories. Uses continuous wavelet transform scalograms with deep-learning inference; it is a signal-quality tool, not a heart-disease diagnosis system.', tags: ['PyTorch','ResNet-18','1D CNN','CWT','React','FastAPI'] },
  { title: 'Student Score Predictor', description: 'A Streamlit machine-learning application using linear regression to estimate student scores from input features, with model evaluation and a simple interactive interface.', tags: ['Python','Scikit-learn','Pandas','Streamlit'] },
  { title: 'Campus Event Management', description: 'A team-built event management system with role-based access for students, faculty, organizers, and admins, backed by an Express API and MongoDB. The project also includes DevOps workflow practice.', tags: ['Node.js','Express','MongoDB','Docker','Jenkins'] },
  { title: 'Research-led Learning', description: 'I study deep-learning papers and build understanding of the model choices, preprocessing, and evaluation methods behind applied AI projects.', tags: ['Deep Learning','Research Papers','Model Evaluation'] },
];

function Starfield() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let stars = [], width = 0, height = 0, frame;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round(width * height / 9000) }, () => ({ x: Math.random()*width, y: Math.random()*height, r: Math.random()*1.2+.3, a: Math.random()*.6+.2, s: Math.random()*.02+.004, o: Math.random()*6.28 }));
      draw(0);
    };
    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);
      const col = getComputedStyle(document.documentElement).getPropertyValue('--star').trim() || '255,255,255';
      stars.forEach(star => { const alpha = star.a*(.6+.4*Math.sin(t*star.s*.05+star.o)); ctx.fillStyle = `rgba(${col},${alpha.toFixed(3)})`; ctx.beginPath(); ctx.arc(star.x,star.y,star.r,0,Math.PI*2); ctx.fill(); });
    };
    const animate = (t) => { draw(t); frame = requestAnimationFrame(animate); };
    resize(); window.addEventListener('resize', resize);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) frame = requestAnimationFrame(animate);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(frame); };
  }, []);
  return <canvas id="stars" ref={canvasRef} aria-hidden="true" />;
}

function Header({ theme, toggleTheme }) {
  return <header>
    <a className="pill" href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /> GitHub</a>
    <div className="hright">
      <button className="icon-btn" id="theme" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}><Icon name="moon" /></button>
      <a className="icon-btn" href="#contact" aria-label="Contact"><Icon name="contact" /><span className="badge">0</span></a>
    </div>
  </header>;
}
function Hero() {
  return <section className="hero" id="top">
    <div>
      <p className="hi">Hi, I am</p>
      <h1 className="display">Yash Chandiramani</h1>
      <p className="role">AI/ML Engineer in the making · Deep Learning · Python &amp; C++</p>
      <div className="cols">
        <div>
          <h3><Icon name="person" />About me</h3>
          <p>I'm a Computer Science and Engineering student at SKIT Jaipur who enjoys turning machine-learning ideas into working projects. My main interests are deep learning, applied AI, and research-driven problem solving.</p>
          <p>I build end-to-end prototypes, keep strengthening my DSA fundamentals, and like understanding the research behind the models I use.</p>
          <div className="edu"><h3><Icon name="education" />Education</h3><b>B.Tech in Computer Science and Engineering</b><span className="sub">Swami Keshvanand Institute of Technology, Jaipur</span><span className="yr">2024 – 2028 · CGPA: 9.5/10</span></div>
        </div>
        <div>
          <h3><Icon name="work" />Experience &amp; internships</h3>
          <div className="job"><b><span className="logo" />MNIT Jaipur · MIIC Summer Internship Programme</b><p className="dt">15 May – 29 June 2026</p><ul><li>Participated in an AI/ML healthcare-focused internship programme.</li><li>Worked in the AAMIH / Svaarogym project context.</li></ul></div>
          <div className="job"><b><span className="logo" />Current focus · Deep Learning &amp; DSA</b><p className="dt">Ongoing</p><ul><li>Building applied ML/DL projects and studying research papers.</li><li>Practising problem solving with C++ and data structures.</li></ul></div>
        </div>
      </div>
      <div className="actions" id="contact">
        <a className="btn light" href="mailto:yash.chandiramani@example.com"><Icon name="mail" />Contact Me</a>
        <a className="btn teal" href="#projects">Explore Projects</a>
        <a className="soc" href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
        <a className="soc linkedin" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
      </div>
    </div>
    <div className="photo-wrap"><div className="frame"><div className="avatar" role="img" aria-label="Yash Chandiramani monogram">YC</div></div><div className="avail"><i />Open to learning &amp; collaboration</div></div>
  </section>;
}
function TechStack() {
  const [progress, setProgress] = useState(.35);
  useEffect(() => {
    const update = () => { const section = document.getElementById('stack'); if (!section) return; const p = Math.min(1, Math.max(0, (window.innerHeight - section.getBoundingClientRect().top)/(window.innerHeight*.9))); setProgress(.35 + .65*p); };
    window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update); update();
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  return <section className="stack" id="stack"><div className="stack-head"><h2 className="display" style={{ '--p': progress }}>Tech Stack</h2></div><div className="groups">{techGroups.map(group => <div className="group" key={group.name}><h3>{group.name}</h3><div className="grid">{group.items.map(([name, color, icon]) => <div className="tech" style={{ '--c': color }} key={name}><span className="ti">{icon ? <img loading="lazy" alt="" src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`} onError={e => { e.currentTarget.style.display='none'; e.currentTarget.parentElement.textContent=name[0]; }} /> : name[0]}</span><span>{name}</span></div>)}</div></div>)}</div></section>;
}
function Projects() { return <section className="projects" id="projects"><h2 className="display section-title">Selected Projects</h2><p className="section-intro">A few projects where I have explored machine learning, deep learning, and full-stack development. I focus on building working prototypes and learning from the implementation details.</p><div className="project-grid">{projects.map(project => <article className="project-card" key={project.title}><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></article>)}</div></section>; }
export default function App() {
  const [theme, setTheme] = useState('dark');
  useEffect(() => { document.documentElement.removeAttribute('data-theme'); document.title = 'Yash Chandiramani | AI/ML Engineer'; }, []);
  const toggleTheme = () => { const next = theme === 'dark' ? 'light' : 'dark'; setTheme(next); if (next === 'light') document.documentElement.setAttribute('data-theme', 'light'); else document.documentElement.removeAttribute('data-theme'); };
  return <><Starfield /><Header theme={theme} toggleTheme={toggleTheme} /><main><Hero /><TechStack /><Projects /></main><footer>© {new Date().getFullYear()} Yash Chandiramani · Built with curiosity and code</footer></>;
}
