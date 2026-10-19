import { useEffect, useRef, useState } from 'react';
import yashPhoto from "./assets/yash.png";

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
  { name: 'Programming', items: [['Python', '60,170,230', 'python'], ['C++', '60,130,230', 'cplusplus'], ['C', '150,150,170', 'c'], ['SQL', '80,140,190', null]] },
  { name: 'AI / Machine Learning', items: [['PyTorch', '230,70,50', 'pytorch'], ['Scikit-learn', '245,140,40', 'scikitlearn'], ['NumPy', '60,160,200', 'numpy'], ['Pandas', '130,90,230', 'pandas'], ['Matplotlib', '60,140,200', 'matplotlib'], ['Deep Learning', '140,90,240', null], ['Computer Vision', '70,130,240', null]] },
  { name: 'Web & APIs', items: [['HTML5', '230,90,50', 'html5'], ['CSS3', '50,130,220', 'css3'], ['JavaScript', '240,210,40', 'javascript'], ['React', '40,190,220', 'react'], ['FastAPI', '20,184,140', 'fastapi'], ['Node.js', '70,170,70', 'nodejs']] },
  { name: 'Tools & Platforms', items: [['Git', '240,80,50', 'git'], ['GitHub', '150,150,170', 'github'], ['Docker', '40,140,230', 'docker'], ['Jenkins', '200,70,60', 'jenkins'], ['Jupyter', '230,120,40', 'jupyter']] },
];
const projects = [
  {title: 'Personal Portfolio', description: 'A personal portfolio showcasing my skills, projects, and experience in Artificial Intelligence, Machine Learning, and Deep Learning. It highlights my technical expertise, projects, internship experience, and learning journey, along with links to my GitHub, LinkedIn, and coding profiles.', tags: ['React.js', 'CSS'], github: "https://github.com/YashChandiramani/Portfolio"},
  { title: 'Event Management System', description: 'A team-built event management system with role-based access for students, faculty, organizers, and admins, backed by an Express API and MongoDB. The project also includes DevOps workflow practice.', tags: ['Node.js', 'Express', 'MongoDB', 'Docker', 'Jenkins'], github: "https://github.com/VKJAIN2006/Devops-2026-CS-F-04" },
  { title: 'ECG Noise Analyzer', description: 'A web app that classifies ECG segments as clean or noisy and predicts noise categories. Uses continuous wavelet transform scalograms with deep-learning inference; it is a signal-quality tool, not a heart-disease diagnosis system.', tags: ['PyTorch', 'ResNet-18', '1D CNN', 'CWT', 'React', 'FastAPI'], github: "https://github.com/YashChandiramani/ECG_Noise_Analyser" },
  { title: 'Student Score Predictor', description: 'A Streamlit machine-learning application using linear regression to estimate student scores from input features, with model evaluation and a simple interactive interface.', tags: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit'], github: "" },
  { title: 'Vehicle Service Booking', description: 'A web-based application designed to simplify vehicle maintenance by allowing users to book service appointments online. Users can explore available services, schedule appointments, manage their bookings, and access service-related information through a user-friendly interface.', tags: ['HTML', 'CSS', 'JavaScript', 'XAMPP','Render'], github: "https://github.com/YashChandiramani/WebDeveleopmentProject"},
  { title: 'Heart Disease Prediction', description: 'A machine learning project that analyzes patient health parameters to predict the likelihood of heart disease. The model uses data preprocessing, feature analysis, and classification algorithms to generate predictions based on the provided medical attributes.', tags: ['Machine Learning', 'SVM', 'Random Forest','Logistic Regression'], github: "https://github.com/YashChandiramani/AI-ML-Project" },
];


function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars = [];
    let width = 0;
    let height = 0;
    let frame;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = Array.from(
        { length: Math.round(width * height / 9000) },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.2 + 0.3,
          a: Math.random() * 0.6 + 0.2,
          s: Math.random() * 0.02 + 0.004,
          o: Math.random() * 6.28
        })
      );
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);

      const col =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--star")
          .trim() || "255,255,255";

      stars.forEach((star) => {
        const alpha =
          star.a * (0.6 + 0.4 * Math.sin(t * star.s * 0.05 + star.o));

        ctx.fillStyle = `rgba(${col},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = (t) => {
      draw(t);
      frame = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame = requestAnimationFrame(animate);
    } else {
      draw(0);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas id="stars" ref={canvasRef} aria-hidden="true" />;
}


function Header({ theme, toggleTheme }) {
  return <header>
    <a className="pill" href="https://github.com/YashChandiramani" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /> YashChandiramani</a>
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
          <p>I'm a Computer Science and Engineering student at SKIT Jaipur who enjoys turning machine-learning ideas into working projects. My main interests are Deep Learning, applied AI, and research-driven problem solving.</p>
          <p>I build end-to-end prototypes, keep strengthening my DSA fundamentals, and like understanding the research behind the models I use.</p>
          <div className="edu"><h3><Icon name="education" />Education</h3><b>B.Tech in Computer Science and Engineering</b><span className="sub">Swami Keshvanand Institute of Technology, Jaipur</span><span className="yr">2024 – 2028 · CGPA: 9.5/10</span></div>
        </div>
        <div>
          <h3><Icon name="work" />Experience &amp; internships</h3>
          <div className="job"><b><span className="logo" />Current focus · Deep Learning &amp; DSA</b><p className="dt">Ongoing</p><ul><li>Building applied ML/DL projects and studying research papers.</li><li>Practising problem solving with C++ and data structures.</li></ul></div>
          <div className="job"><b><span className="logo" />MNIT Jaipur · MIIC Summer Internship Programme</b><p className="dt">15 May – 29 June 2026</p><ul><li>Participated in an AI/ML healthcare-focused internship programme.</li><li>Made a working Deep Learning Project on ECG Noise Analyser. Which classifies ECG Signals into clean and noisy signals.</li> <li>
  Running Live at:{" "}
  <a
    href="https://ecg-noise-analyser.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      textDecoration: "underline",
      color: "var(--accent)",
      cursor: "pointer"
    }}
  >
    ECG Noise Analyser
  </a>
</li></ul></div>
        </div>
      </div>
      <div className="actions" id="hero-actions">
        <a className="btn light" href="mailto:chandiramaniyash@gmail.com"><Icon name="mail" />Contact Me</a>
        <a className="btn teal" href="#projects">Explore Projects</a>
        <a className="soc" href="https://github.com/YashChandiramani" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
        <a className="soc linkedin" href="https://www.linkedin.com/in/yash-chandiramani-589699352/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
        <a className="soc leetcode" href="https://leetcode.com/u/Yash_Chandiramani/" target="_blank" rel="noreferrer" aria-label="LeetCode">LC</a>
        <a className="soc gfg" href="https://www.geeksforgeeks.org/profile/b240r779" target="_blank" rel="noreferrer" aria-label="LeetCode">GFG</a>
      </div>
    </div>
    <div className="photo-wrap">
  <div className="frame">
    <img
      src={yashPhoto}
      alt="Yash Chandiramani"
      className="profile-photo"
    />
  </div>
  <div className="avail">
    <i />Open to learning &amp; collaboration
  </div>
</div>
  </section>;
}
function TechStack() {
  const [progress, setProgress] = useState(.35);
  useEffect(() => {
    const update = () => { const section = document.getElementById('stack'); if (!section) return; const p = Math.min(1, Math.max(0, (window.innerHeight - section.getBoundingClientRect().top) / (window.innerHeight * .9))); setProgress(.35 + .65 * p); };
    window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update); update();
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  return <section className="stack" id="stack"><div className="stack-head"><h2 className="display" style={{ '--p': progress }}>Tech Stack</h2></div><div className="groups">{techGroups.map(group => <div className="group" key={group.name}><h3>{group.name}</h3><div className="grid">{group.items.map(([name, color, icon]) => <div className="tech" style={{ '--c': color }} key={name}><span className="ti">{icon ? <img loading="lazy" alt="" src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`} onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.textContent = name[0]; }} /> : name[0]}</span><span>{name}</span></div>)}</div></div>)}</div></section>;
}
function Projects() {
  return <section className="projects section-shell" id="projects">
    <div className="section-heading reveal"><span className="eyebrow">A selection of things I’ve built</span><h2 className="display section-title">Projects</h2><p className="section-intro">Experiments, applications, and ideas turned into working projects.</p></div>
    <div className="project-grid">
      {projects.map((project, index) => <article className={`project-card reveal reveal-delay-${index % 3}`} key={project.title}>
        <div className={`project-visual project-visual-${index + 1}`}><span className="visual-label">PROJECT / 0{index + 1}</span><span className="visual-mark">{['FSD','FSD', 'DL', 'ML', 'FSD', 'ML'][index]}</span></div>
        
<div className="project-card-content">
  <h3>{project.title}</h3>
  <p>{project.description}</p>

  <a
    href={project.github}
    target="_blank"
    rel="noopener noreferrer"
    className="project-github"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.71 2.62 1.22 3.26.93.1-.72.39-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.24-5.1 5.52.4.35.76 1.03.76 2.08v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"
      />
    </svg>
    View on GitHub
  </a>

  <div className="tags">
    {project.tags.map(tag => (
      <span className="tag" key={tag}>{tag}</span>
    ))}
  </div>
</div>

      </article>)}
    </div>
  </section>;
}
const experienceItems = [
  { role: 'Deep Learning & DSA', place: 'Personal learning journey', date: 'Ongoing', text: 'Building applied deep-learning projects, reading research papers, and strengthening problem-solving fundamentals with C++.', tags: ['PyTorch', 'Deep Learning', 'C++'] },
  { role: 'AI/ML Summer Intern', place: 'MNIT Jaipur · MIIC', date: 'May – June 2026 (45 Days)', text: 'Participated in the summer internship programme with an AI/ML healthcare focus, in the AAMIH / Svaarogym project context.', tags: ['Machine Learning', 'Healthcare AI', 'Research'] },
  { role: 'Web Development Intern', place: 'SKIT Jaipur(Inhouse Internship)', date: 'July – July 2025 (15 Days)', text: 'Participated in the summer internship programme with the college involving the Web Dev Project, and implemented a website for the service booking for the vehicles', tags: ['HTML', 'CSS', 'JavaScript','XAMPP Server', 'Render'] },
  { role: 'AI/ML Summer Intern', place: 'MNIT Jaipur · MIIC', date: 'June – June 2025 (15 Days)', text: 'Participated in the summer internship programme with an AI/ML healthcare focus, and made heart dieases prediction model based on Logistic Regression, SVM & Random Forest', tags: ['Basic Machine Learning', 'Healthcare AI'] },
  { role: 'B.Tech · Computer Science', place: 'SKIT Jaipur', date: '2024 – 2028', text: 'Exploring the intersection of AI, software engineering, and practical problem solving while pursuing a strong academic foundation.', tags: ['CSE', 'AI/ML', 'Software'] },
  {role: 'Student', place: 'Jayshree Periwal High School, Jaipur', date: '2011-2023', text: 'Sports Enthusiast specially football, Quizzes,  Secured 100 marks in Informatics Practices in 12th Board Exam', tags:['Coding','Football', 'Quiz', 'Chess']}
];
function Experience() {
  return <section className="experience section-shell" id="experience">
    <div className="section-heading reveal"><span className="eyebrow">My professional journey</span><h2 className="display section-title">Experience</h2><p className="section-intro">A little about what I’ve been learning and working on.</p></div>
    <div className="timeline">{experienceItems.map((item, i) => <article className={`experience-card reveal reveal-delay-${i % 3}`} key={item.role}>
      <div className="timeline-dot" /><div className="experience-top"><div><h3>{item.role}</h3><p className="experience-place">{item.place}</p></div><span className="experience-date">{item.date}</span></div>
      <p className="experience-copy">{item.text}</p><div className="tags">{item.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
    </article>)}</div>
  </section>;
}
function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio contact from ${form.get('name')}`);
    const body = encodeURIComponent(`Name: ${form.get('name')}\nEmail: ${form.get('email')}\n\n${form.get('message')}`);
    window.location.href = `mailto:chandiramaniyash@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };
  return <section className="contact-section section-shell" id="contact">
    <div className="contact-title reveal"><span className="eyebrow">Have an idea in mind?</span><h2 className="display">LET’S WORK<br />TOGETHER</h2><p>Have a project, opportunity, or just want to talk about AI? Send me a message.</p></div>
    <form className="contact-form reveal" onSubmit={handleSubmit}>
      <h3>Contact Form</h3><p className="form-note">Please share a few details and I’ll get back to you.</p>
      <div className="form-row"><label>Full name<input name="name" placeholder="Your name" required /></label><label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label></div>
      <label>Your message<textarea name="message" rows="5" placeholder="Tell me a little about your project..." required /></label>
      <p className="privacy-note">Your details are used only to help respond to your message.</p>
      <button className="btn teal submit-btn" type="submit">Send Message <span aria-hidden="true">↗</span></button>
      {sent && <p className="form-feedback" role="status">Your email app should open with the message ready to send.</p>}
    </form>
  </section>;
}
function ScrollReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { nodes.forEach(node => node.classList.add('is-visible')); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}
export default function App() {
  const [theme, setTheme] = useState('dark');
  useEffect(() => { document.documentElement.removeAttribute('data-theme'); document.title = 'Yash Chandiramani | AI/ML Engineer'; }, []);
  const toggleTheme = () => { const next = theme === 'dark' ? 'light' : 'dark'; setTheme(next); if (next === 'light') document.documentElement.setAttribute('data-theme', 'light'); else document.documentElement.removeAttribute('data-theme'); };
  return <><Starfield /><Header theme={theme} toggleTheme={toggleTheme} /><ScrollReveal /><main><Hero /><TechStack /><Projects /><Experience /><Contact /></main><footer>© {new Date().getFullYear()} Yash Chandiramani · Built with curiosity and code <span className="footer-links"><a href="https://github.com/YashChandiramani/Portfolio" target="_blank" rel="noreferrer">GitHub</a><a href="#top">Back to top ↑</a></span></footer></>;
}
