// ResearchPortfolio.jsx
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./App.css";

// ─── JSON DATA IMPORTS ────────────────────────────────────────────────────────
import publications from "./data/publications.json";
import experience from "./data/experience.json";
import education from "./data/education.json";
import awards from "./data/achievements.json";
import certificates from "./data/certificates.json";
import gallery from "./data/gallery.json";

// Research interests — UI metadata with icons
const researchInterests = [
  { label: "Artificial Intelligence & Machine Learning", icon: "🧠" },
  { label: "TinyML & Edge AI", icon: "⚡" },
  { label: "Internet of Things (IoT)", icon: "🌐" },
  { label: "Embedded Systems", icon: "🔌" },
  { label: "Computer Vision", icon: "👁️" },
  { label: "Medical AI & Digital Healthcare", icon: "🏥" },
  { label: "Robotics & Intelligent Automation", icon: "🤖" },
  { label: "UAVs & Smart Communication Networks", icon: "🚁" },
];

// ─── TRANSLATION ──────────────────────────────────────────────────────────────
const translateText = async (text, targetLang) => {
  try {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await res.json();
    return data[0].map((item) => item[0]).join("");
  } catch {
    return text;
  }
};

const translatePage = async (targetLang) => {
  const els = document.querySelectorAll("h1, h2, h3, p, li, button");
  for (const el of els) {
    const orig = el.innerText.trim();
    if (orig && orig.length < 500) {
      el.innerText = await translateText(orig, targetLang);
    }
  }
};

// ─── NORMALISE item from any JSON shape ───────────────────────────────────────
const normaliseItem = (item, srcKey, titleKey, captionKey) => ({
  src: item[srcKey] || item.src || item.image || "",
  title: item[titleKey] || item.title || "",
  caption: item[captionKey] || item.caption || item.description || item.issuer || "",
});

// ─── LIGHTBOX — rendered via Portal onto document.body ────────────────────────
// This completely escapes any parent overflow / stacking context.
function Lightbox({ images, startIndex, srcKey, titleKey, captionKey, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const touchStartX = useRef(null);
  const item = normaliseItem(images[idx], srcKey, titleKey, captionKey);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && idx < images.length - 1) setIdx((i) => i + 1);
      if (e.key === "ArrowLeft" && idx > 0) setIdx((i) => i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, images.length, onClose]);

  const modal = (
    <div
      className="lb-overlay"
      onClick={onClose}
      onTouchStart={(e) => (touchStartX.current = e.changedTouches[0].screenX)}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].screenX;
        if (diff > 50 && idx < images.length - 1) setIdx((i) => i + 1);
        if (diff < -50 && idx > 0) setIdx((i) => i - 1);
      }}
    >
      {/* Close button */}
      <button className="lb-close" onClick={onClose} aria-label="Close">✕</button>

      {/* Prev */}
      {idx > 0 && (
        <button
          className="lb-nav lb-prev"
          onClick={(e) => { e.stopPropagation(); setIdx((i) => i - 1); }}
          aria-label="Previous"
        >‹</button>
      )}

      {/* Image + caption */}
      <div className="lb-content" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.title || item.caption} className="lb-img" />
        {(item.title || item.caption) && (
          <div className="lb-caption">
            {item.title && <strong>{item.title}</strong>}
            {item.caption && <span>{item.caption}</span>}
          </div>
        )}
        <p className="lb-counter">{idx + 1} / {images.length}</p>
      </div>

      {/* Next */}
      {idx < images.length - 1 && (
        <button
          className="lb-nav lb-next"
          onClick={(e) => { e.stopPropagation(); setIdx((i) => i + 1); }}
          aria-label="Next"
        >›</button>
      )}
    </div>
  );

  // Portal: render directly on <body>, outside all React tree stacking contexts
  return ReactDOM.createPortal(modal, document.body);
}

// ─── CAROUSEL ─────────────────────────────────────────────────────────────────
function Carousel({ id, title, items, srcKey = "src", titleKey = "title", captionKey = "caption" }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const didDrag = useRef(false); // distinguish drag from click

  const onMouseDown = (e) => {
    isDragging.current = true;
    didDrag.current = false;
    dragStartX.current = e.pageX - trackRef.current.offsetLeft;
    dragScrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.2;
    if (Math.abs(walk) > 5) didDrag.current = true;
    trackRef.current.scrollLeft = dragScrollLeft.current - walk;
  };

  const stopDrag = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  const handleCardClick = (i) => {
    // Only open lightbox if not dragging
    if (!didDrag.current) setLightboxIndex(i);
  };

  return (
    <section className="rp-section" id={id}>
      <SectionHeading>{title}</SectionHeading>

      <div
        className="carousel-track"
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {items.map((item, i) => {
          const norm = normaliseItem(item, srcKey, titleKey, captionKey);
          return (
            <div
              key={i}
              className="carousel-card"
              onClick={() => handleCardClick(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(i)}
              aria-label={norm.title || norm.caption || `Image ${i + 1}`}
            >
              <div className="carousel-img-wrap">
                <img
                  src={norm.src}
                  alt={norm.title || norm.caption}
                  loading="lazy"
                  draggable="false"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.classList.add("img-error");
                  }}
                />
                <div className="carousel-overlay">
                  <span className="zoom-icon">⊕</span>
                </div>
              </div>
              {(norm.title || norm.caption) && (
                <div className="carousel-caption">
                  {norm.title && <strong>{norm.title}</strong>}
                  {norm.caption && <span>{norm.caption}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox rendered via Portal — completely outside this DOM tree */}
      {lightboxIndex !== null && (
        <Lightbox
          images={items}
          startIndex={lightboxIndex}
          srcKey={srcKey}
          titleKey={titleKey}
          captionKey={captionKey}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}

// ─── SECTION HEADING ──────────────────────────────────────────────────────────
function SectionHeading({ children }) {
  return (
    <div className="section-heading">
      <h2>{children}</h2>
      <div className="heading-rule" />
    </div>
  );
}

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────
export default function ResearchPortfolio() {
  const [pubFilter, setPubFilter] = useState("all");
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

const filteredPubs = publications.filter((pub) => {
  if (pubFilter === "all") return true;

  const type = pub.type.toLowerCase();

  if (pubFilter === "Journal")
    return type.includes("journal");

  if (pubFilter === "Conference")
    return type.includes("conference");

  // Check Chapter BEFORE Book
  if (pubFilter === "Chapter")
    return type.includes("chapter");

  if (pubFilter === "Book")
    return type === "book";

  if (pubFilter === "Patent")
    return type.includes("patent");

  if (pubFilter === "Others")
    return type.includes("preprint") || type.includes("arxiv");

  return false;
});

const pubTypes = [
  "all",
  "Journal",
  "Conference",
  "Book",
  "Chapter",
  "Patent",
  "Others",
];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "interests", label: "Research" },
    { id: "publications", label: "Publications" },
    { id: "awards", label: "Awards" },
    { id: "certificates", label: "Certificates" },
    { id: "gallery", label: "Gallery" },
  ];

  return (
    <>
      {/* ══════════════════════════════════ HEADER ══ */}
      <header className="rp-header">
        <div className="header-inner">

          <div className="header-brand" onClick={() => scrollTo("about")}>
            <span className="brand-initials">CH</span>
            <span className="brand-name">Chandramouli Haldar</span>
          </div>

          <nav className={`header-nav${menuOpen ? " open" : ""}`}>
            {navLinks.map((l) => (
              <button key={l.id} className="nav-item" onClick={() => scrollTo(l.id)}>
                {l.label}
              </button>
            ))}
          </nav>

          <div className="header-controls">
            <div className="lang-flags">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                alt="English" title="English"
                onClick={() => window.location.reload()}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg"
                alt="日本語" title="Japanese"
                onClick={() => translatePage("ja")}
              />
            </div>
            <button
              className="theme-toggle"
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              title="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button
              className="hamburger"
              onClick={() => setMenuOpen((m) => !m)}
              aria-label="Menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>

        </div>
      </header>

      {/* ══════════════════════════════════ LAYOUT ══ */}
      <div className="rp-layout">

        {/* ════════════════ SIDEBAR ════ */}
        <aside className="rp-sidebar">

          <div className="profile-photo-wrap">
            <img
              src="/img/dp.png"
              alt="Chandramouli Haldar"
              className="profile-photo"
              onError={(e) => {
                e.target.src =
                  "https://api.dicebear.com/7.x/initials/svg?seed=CH&backgroundColor=1b2d4f&textColor=ffffff&fontSize=38";
              }}
            />
          </div>

          <h1 className="sidebar-name">Chandramouli Haldar</h1>
          <p className="sidebar-title">Student · Researcher · Innovator</p>
          <p className="sidebar-sub">Bridging Hardware &amp; Software</p>

          <hr className="sidebar-divider" />

          <div className="sidebar-meta">
            <div className="meta-row"><span>📍</span><span>Kolkata, India</span></div>
          </div>

          <div className="sidebar-stats">
            <div className="stat-item">
              <span className="stat-val">15+</span>
              <span className="stat-lbl">Publications</span>
            </div>
            <div className="stat-div" />
            <div className="stat-item">
              <span className="stat-val">2+</span>
              <span className="stat-lbl">Yrs Exp</span>
            </div>
            <div className="stat-div" />
            <div className="stat-item">
              <span className="stat-val">2</span>
              <span className="stat-lbl">Countries</span>
            </div>
          </div>

          <hr className="sidebar-divider" />

<nav className="sidebar-links">
  <a href="mailto:Chandramoulihaldar@gmail.com" className="s-link">
    <img src="https://cdn.simpleicons.org/gmail/EA4335" alt="Email" className="s-icon" />
    <span className="s-label">chandramoulihaldar@gmail.com</span>
  </a>

  <a href="mailto:chandramouli@novatech-is.in" className="s-link">
    <img src="https://cdn.simpleicons.org/gmail/0061FF" alt="Email" className="s-icon" />
    <span className="s-label">chandramouli@novatech-is.in</span>
  </a>

  <a
    href="https://www.linkedin.com/in/chandramouli01/"
    target="_blank"
    rel="noreferrer"
    className="s-link"
  >
    <span className="s-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 382 382"
        width="22"
        height="22"
      >
        <path
          fill="#0077B5"
          d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889
          C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z
          M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056H65.345
          c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806
          c5.554,0,10.056,4.502,10.056,10.056V329.844z
          M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1
          s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z
          M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73
          c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021
          c-28.309,0-34.051,29.066-35.204,42.11v97.079c0,5.106-4.139,9.246-9.246,9.246h-44.426
          c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426
          c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912
          c73.552,0,73.131,68.716,73.131,106.472V330.654z"
        />
      </svg>
    </span>
    <span className="s-label">LinkedIn Profile</span>
  </a>

   <a
    href="https://github.com/Chandramouli001"
    target="_blank"
    rel="noreferrer"
    className="s-link"
  >
    <img src="https://cdn.simpleicons.org/github/181717" alt="GitHub" className="s-icon" />
    <span className="s-label">GitHub — Chandramouli001</span>
  </a>

  <a
    href="https://www.youtube.com/@Chandram0uli"
    target="_blank"
    rel="noreferrer"
    className="s-link"
  >
    <img src="https://cdn.simpleicons.org/youtube/FF0000" alt="YouTube" className="s-icon" />
    <span className="s-label">YouTube Channel</span>
  </a>

  <a
    href="https://scholar.google.com/citations?user=VXo1zqUAAAAJ&hl=en&oi=ao"
    target="_blank"
    rel="noreferrer"
    className="s-link"
  >
    <img src="https://cdn.simpleicons.org/googlescholar/4285F4" alt="Google Scholar" className="s-icon" />
    <span className="s-label">Google Scholar</span>
  </a>

  <a
    href="https://orcid.org/0009-0004-9759-194X"
    target="_blank"
    rel="noreferrer"
    className="s-link"
  >
    <img src="https://cdn.simpleicons.org/orcid/A6CE39" alt="ORCID" className="s-icon" />
    <span className="s-label">ORCID: 0009-0004-9759-194X</span>
  </a>

  <a
    href="https://www.researchgate.net/profile/Chandramouli-Haldar-4"
    target="_blank"
    rel="noreferrer"
    className="s-link"
  >
    <img src="https://cdn.simpleicons.org/researchgate/00CCBB" alt="ResearchGate" className="s-icon" />
    <span className="s-label">ResearchGate Profile</span>
  </a>
</nav>

        </aside>

        {/* ════════════════ MAIN ═══════ */}
        <main className="rp-main">
{/* ABOUT */}
<section className="rp-section" id="about">
  <SectionHeading>About</SectionHeading>

  <div className="bio-text">
    <p>
      <strong>Chandramouli Haldar</strong> is a graduate researcher, technology
      professional, and entrepreneur based in Kolkata, India. He holds a{" "}
      <strong>Bachelor of Technology in Computer Science &amp; Engineering</strong>{" "}
      and a{" "}
      <strong>Diploma in Electronics &amp; Telecommunication Engineering</strong>{" "}
      from Guru Nanak Institute of Technology, providing a strong interdisciplinary
      foundation across both hardware and software engineering.
    </p>

    <p>
      He gained international research experience through the{" "}
      <strong>Global Innovation Internship Program</strong> at the{" "}
      <strong>Asian Institute of Technology (AIT), Bangkok, Thailand</strong>,
      where he contributed to projects involving geospatial data analysis, QGIS,
      and IoT-based solutions for carbon footprint monitoring and sustainability,
      strengthening his commitment to innovation-driven research with real-world
      impact.
    </p>

    <p>
      As the{" "}
      <strong>Founder and Chief Executive Officer of NovaTech Innovative Solutions</strong>,
      Chandramouli leads research, engineering, and product development in the
      fields of IoT, Embedded Systems, Artificial Intelligence, and Smart
      Technologies. He also serves as a{" "}
      <strong>Junior Technical Faculty at Euphoria GenX</strong>, mentoring
      students in software development, database systems, Embedded Systems, IoT,
      and VLSI through hands-on, project-based learning.
    </p>

    <p>
      Beyond his professional work, he is an enthusiastic learner of the Japanese
      language, inspired by Japan's unique ability to preserve its rich cultural
      heritage while remaining at the forefront of global technological
      innovation.
    </p>
  </div>
</section>

          {/* EXPERIENCE */}
          <section className="rp-section" id="experience">
            <SectionHeading>Professional Experience</SectionHeading>
            <div className="timeline">
              {experience.map((exp, i) => (
                <div key={i} className="tl-item">
                  <div className="tl-marker">
                    <div className="tl-dot" />
                    {i < experience.length - 1 && <div className="tl-line" />}
                  </div>
                  <div className="tl-body">
                    <div className="tl-top">
                      <div>
                        <h3 className="tl-role">{exp.role}</h3>
                        <p className="tl-org">{exp.organization}</p>
                      </div>
                      <span className="tl-year">{exp.year}</span>
                    </div>
                    <p className="tl-desc">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section className="rp-section" id="education">
            <SectionHeading>Education</SectionHeading>
            <div className="edu-list">
              {education.map((edu, i) => (
                <div key={i} className="edu-card">
                  <div className="edu-icon">🎓</div>
                  <div className="edu-info">
                    <h3 className="edu-degree">{edu.degree}</h3>
                    <p className="edu-inst">{edu.institution}</p>
                    <div className="edu-pills">
                      <span className="pill pill-yr">{edu.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RESEARCH INTERESTS */}
          <section className="rp-section" id="interests">
            <SectionHeading>Research Interests</SectionHeading>
            <div className="interest-grid">
              {researchInterests.map((r, i) => (
                <div key={i} className="interest-tag">
                  <span>{r.icon}</span>
                  <span>{r.label}</span>
                </div>
              ))}
            </div>
          </section>

      {/* PUBLICATIONS */}
<section className="rp-section" id="publications">
  <SectionHeading>Publications</SectionHeading>

  <div className="pub-filters">
    {pubTypes.map((t) => (
      <button
        key={t}
        className={`pub-filter${pubFilter === t ? " active" : ""}`}
        onClick={() => setPubFilter(t)}
      >
        {t === "all"
  ? "All Publications"
  : t === "Journal"
  ? "Journal Articles"
  : t === "Conference"
  ? "Conference Papers"
  : t === "Book"
  ? "Books"
  : t === "Chapter"
  ? "Book Chapters"
  : t === "Patent"
  ? "Patents"
  : t === "Others"
  ? "Others"
  : t}
      </button>
    ))}
  </div>

  <ol className="pub-list">
    {filteredPubs.map((pub, i) => (
      <li key={i} className="pub-item">
        <div className="pub-num">
          {String(i + 1).padStart(2, "0")}
        </div>

        <div className="pub-body">
          <span className="pub-type-badge">{pub.type}</span>

          <h3 className="pub-title">{pub.title}</h3>

          <p className="pub-desc">{pub.description}</p>

          <div className="pub-foot">
            <span className="pub-year">{pub.year}</span>

            {pub.doi && (
              <a
                href={`https://doi.org/${pub.doi}`}
                target="_blank"
                rel="noreferrer"
                className="pub-link"
              >
                DOI: {pub.doi}
              </a>
            )}

            {pub.url && (
              <a
                href={pub.url}
                target="_blank"
                rel="noreferrer"
                className="pub-link"
              >
                View Publication →
              </a>
            )}
          </div>
        </div>
      </li>
    ))}
  </ol>
</section>

      {/* AWARDS — achievements.json: { title, description, image } */}
      <Carousel
        id="awards"
        title="Awards & Recognitions"
        items={awards}
        srcKey="image"
        titleKey="title"
        captionKey="description"
      />

      {/* CERTIFICATES — certificates.json: { src, title, issuer } */}
      <Carousel
        id="certificates"
        title="Certificates"
        items={certificates}
        srcKey="src"
        titleKey="title"
        captionKey="issuer"
      />

      {/* GALLERY — replace `certificates` with galleryData once gallery.json exists */}
      <Carousel
        id="gallery"
        title="Gallery"
        items={gallery}
        srcKey="src"
        titleKey="title"
        captionKey="issuer"
      />

      {/* FOOTER */}
      <footer className="rp-footer">
        <p>© {new Date().getFullYear()} Chandramouli Haldar &nbsp;·&nbsp; All rights reserved</p>
        <p className="footer-sub">
          Kolkata, India &nbsp;|&nbsp; chandramouli@novatech-is.in &nbsp;|&nbsp;
          <a href="https://orcid.org/0009-0004-9759-194X" target="_blank" rel="noreferrer">
            ORCID: 0009-0004-9759-194X
          </a>
        </p>
      </footer>

    </main >
      </div >
    </>
  );
}
