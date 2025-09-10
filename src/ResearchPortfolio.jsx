// ResearchPortfolio.jsx
import React, { useState, useEffect } from "react";
import "./App.css";

export default function ResearchPortfolio() {
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("light");

  // Apply theme to <html> element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

const publications = [
  // Conference Papers
  {
    title: "Emergence of Transfer Learning towards Specific Identification of Alzheimer’s Disease – A Prospective Approach",
    type: "Conference Paper",
    year: 2025,
    doi: "10.1109/IEEECONF64992.2025.10962879",
    description: "This conference paper explores the application of transfer learning for early and specific detection of Alzheimer’s Disease, leveraging medical imaging datasets to improve diagnostic accuracy."
  },  
  {
    title: "Design and Development of a Multi-Functional Interactive Robot with Handshake, AI Voice Assistance, Projection, and Mobility",
    type: "Journal Article",
    year: 2024,
    url: "https://ijsci.com/index.php/home/article/view/314",
    description: "This journal article details the design of an interactive robot combining AI-driven voice assistance, physical interaction via handshake, projection features, and mobility for human-robot interaction applications."
  },
   {
    title: "Use of Artificial Intelligence in Engineering",
    type: "Book",
    year: 2023,
    isbn: "979-8264115646",
    asin: "B0FQ6HY8SX",
    url:"https://www.amazon.com/dp/B0FQ6HY8SX",
    description: "A comprehensive book on applications of artificial intelligence in engineering domains, covering theory, frameworks, and real-world use cases."
  },
  {
    title: "Prospects of Hybrid LoRa Communication Framework for Ultra-Efficient UAV Mediated Disaster Management",
    type: "Conference Paper",
    year: 2025,
    doi: "Not Available Yet",
    description: "The paper discusses hybrid LoRa communication frameworks to enhance UAV-based disaster management systems, focusing on efficiency and reliability of data transmission."
  },
  {
    title: "Prospects and Challenges in UAV-Based Communication for Disaster Management",
    type: "Conference Paper",
    year: 2024,
    doi: "Not Available Yet",
    description: "A review of UAV-enabled communication systems in disaster scenarios, analyzing opportunities and challenges in maintaining connectivity and data accuracy."
  },

  // Journal Articles

  {
    title: "TinyML Enabled Smart T-Shirt for Multimodal Epileptic Seizure Detection and Prediction",
    type: "Journal Article",
    year: 2023,
    doi: "Not Available Yet",
    description: "Presents a smart wearable integrating TinyML techniques to monitor physiological signals and predict epileptic seizures, enabling proactive intervention."
  },

  // Books
 

  // Book Chapters
  {
    title: "System Framework for Seizure Administration",
    type: "Book Chapter",
    year: 2023,
    doi: "Not Available Yet",
    description: "Chapter discussing a system architecture for seizure monitoring and administration using smart wearable devices and real-time data analysis."
  },

  // Patents
  {
    title: "IoT-based Heat Stress Adaptive Crop Recommendation System",
    type: "Patent",
    year: 2023,
    doi: "Not Available Yet",
    description: "Patent covering an IoT system that monitors environmental and plant parameters to recommend adaptive crop management strategies for heat stress conditions."
  },
  {
    title: "Medicinal Plant Identification and Classification of Himalayan Region with UAV",
    type: "Patent",
    year: 2023,
    doi: "Not Available Yet",
    description: "Covers UAV-based systems for accurate identification and classification of medicinal plants in the Himalayan region, integrating AI and imaging techniques."
  },
  {
    title: "IoT-Based Smart Solar Charging Bag with Integrated Security and Emergency Features",
    type: "Patent",
    year: 2023,
    doi: "Not Available Yet",
    description: "A patent for a smart solar-powered bag with IoT integration providing charging, security alerts, and emergency SOS functionalities."
  },
  {
    title: "Smart T-Shirt with Medical Monitoring",
    type: "Patent",
    year: 2023,
    doi: "Not Available Yet",
    description: "Describes a wearable T-shirt capable of monitoring medical parameters like heart rate, SpO2, and temperature, integrated with alert systems for health safety."
  },
];


  const filteredPublications =
    filter === "all" ? publications : publications.filter((p) => p.type === filter);

  return (
    <div className={`portfolio-container ${theme}`}>
      {/* Sidebar */}
     <aside className="sidebar">
  <img
    src="https://media.licdn.com/dms/image/v2/D5603AQGGZ-v9U2nylA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728062431795?e=2147483647&v=beta&t=8ThumINCZb8nZ_zUCkzyWH0elH5hdIrbsayRk-8sc5c"
    alt="Profile"
    className="profile-pic"
  />
  <h1 className="name">Chandramouli Haldar</h1>
    <p className="role">Student | Researcher | Innovator</p>
  <p className="tagline">Passionate about bridging hardware & software</p>
  <p className="location"> 📍 Kolkata, India</p>
    <div className="contact-emails">
  </div>

  <div className="social-links">
 <a className="no-hover">
      <img src="https://img.icons8.com/?size=100&id=P7UIlhbpWzZm&format=png&color=000000" className="social-icon" /> Chandramoulihaldar@gmail.com
    </a>
<a className="no-hover">
      <img src="https://img.icons8.com/?size=100&id=35084&format=png&color=000000" alt="GitHub" className="social-icon" /> chandramouli@novatech-is.in
    </a>
    <a href="https://www.linkedin.com/in/chandramouli01/" target="_blank" rel="noopener noreferrer">
      <img src="https://img.icons8.com/?size=100&id=13930&format=png&color=000000" alt="LinkedIn" className="social-icon" /> LinkedIn
    </a>
    <a href="https://github.com/Chandramouli001" target="_blank" rel="noopener noreferrer">
      <img src="https://img.icons8.com/?size=100&id=63777&format=png&color=000000" alt="GitHub" className="social-icon" /> GitHub
    </a>
    <a href="https://www.youtube.com/@Chandram0uli" target="_blank" rel="noopener noreferrer">
      <img src="https://img.icons8.com/?size=100&id=19318&format=png&color=000000" alt="YouTube" className="social-icon" /> YouTube
    </a>
    <a href="https://scholar.google.com/citations?user=VXo1zqUAAAAJ&hl=en&oi=ao" target="_blank" rel="noopener noreferrer">
      <img src="https://img.icons8.com/?size=100&id=drPiDBy9kkJ3&format=png&color=000000" alt="Google Scholar" className="social-icon" /> Google Scholar
    </a>
    <a href="https://orcid.org/0009-0004-9759-194X" target="_blank" rel="noopener noreferrer">
      <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/orcid.svg" alt="ORCID" className="social-icon" /> ORCID
    </a>
    <a href="https://www.researchgate.net/profile/YourProfile" target="_blank" rel="noopener noreferrer">
      <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/researchgate.svg" alt="ResearchGate" className="social-icon" /> ResearchGate
    </a>
  </div>

  {/* Language Switch Flags */}
  <div className="language-switch">
    <img 
      src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" 
      alt="English" 
      onClick={() => console.log("Translate to English")} 
    />
    <img 
      src="https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg" 
      alt="Japanese" 
      onClick={() => console.log("Translate to Japanese")} 
    />
  </div>
</aside>


      {/* Main Content */}
      <main className="main-content">
        {/* Bio Section */}
        <section className="bio-section">
          <div className="bio-header">
            <h2>Bio</h2>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="theme-toggle-btn"
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Lite"}
            </button>
          </div>
          <p className="bio-text">
            Chandramouli Haldar is a student of Computer Science and Engineering [2023-26] at Guru Nanak Institute of Technology, Kolkata. He also holds a Diploma in Electronics and Telecommunication Engineering [2020-23]. His areas of research interest are IoT, Embedded Systems, AI, TinyML, UAVs, LoRa, and other new-generation technologies.
          </p>
          <p className="bio-text">
            He also has professional experience as a Junior Technical Faculty at Euphoria GenX, where he engaged in mentoring students, guiding projects, and imparting hands-on training in MongoDB in BCT Training.
          </p>
          <p className="bio-text">
            Apart from his educational and career endeavors, Chandramouli is an avid learner of the Japanese language. He has always been fascinated by Japan’s vibrant culture and advanced technology, and is inspired by the nation's capability to balance tradition with innovation.
          </p>
        </section>

        {/* Experience Section */}
        <section>
          <h2>Experience</h2>
          <ul>
            <li>
              <strong>Junior Technical Faculty</strong> – Euphoria GenX (2025)
            </li>
          </ul>
        </section>

        {/* Education Section */}
        <section>
          <h2>Education</h2>
          <ul>
            <li>B.Tech in Computer Science & Engineering, GNIT, Kolkata, 2026</li>
            <li>Diploma in Electronics & Telecommunication Engineering, GNIT, Kolkata, 2023</li>
          </ul>
        </section>

        {/* Research Interests Section */}
        <section>
          <h2>Research Interests</h2>
          <div className="grid">
            {[
              "Artificial Intelligence & Machine Learning",
              "Internet of Things (IoT)",
              "Embedded Systems & Hardware Design",
              "TinyML",
              "Edge & Fog Computing",
              "UAVs & Drone Systems",
              "Robotics",
              "Smart Wearables",
              "Wireless Sensor Networks",
              "Cloud & Distributed Computing",
              "Cyber-Physical Systems",
              "Human-Computer Interaction",
            ].map((interest, i) => (
              <div key={i} className="card">{interest}</div>
            ))}
          </div>
        </section>

        {/* Publications Section */}
       <section>
  <h2>Publications</h2>

  {/* Filter Buttons */}
  <div className="filters">
    {["all", "Conference Paper", "Journal Article", "Book Chapter", "Book", "Patent"].map(
      (type) => (
        <button
          key={type}
          className={filter === type ? "active" : ""}
          onClick={() => setFilter(type)}
        >
          {type}
        </button>
      )
    )}
  </div>

  {/* Publications List */}
  <ul>
    {filteredPublications.map((pub, i) => (
      <li key={i} className="card">
        <h3>{pub.title}</h3>
        <p>
          <strong>{pub.type}</strong> | {pub.year}
        </p>
        {/* DOI / ISBN / URL */}
        {pub.doi && pub.doi !== "Not Available Yet" && (
          <p>DOI: <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">{pub.doi}</a></p>
        )}
        {pub.isbn && (
          <p>ISBN: {pub.isbn} {pub.asin && `(ASIN: ${pub.asin})`}</p>
        )}
        {pub.url && (
          <p>URL: <a href={pub.url} target="_blank" rel="noopener noreferrer">{pub.url}</a></p>
        )}
        {/* Description */}
        <p>{pub.description}</p>
      </li>
    ))}
  </ul>
</section>


        {/* Achievements Section */}
        <section>
          <h2>Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <img src="https://raw.githubusercontent.com/soulhydra101/img/refs/heads/main/jispuraskar.jpg" alt="Award" />
              <h3>JIS Puraskar</h3>
              <p>Highest DGPA 2024</p>
            </div>
            <div className="card">
              <img src="https://raw.githubusercontent.com/soulhydra101/img/refs/heads/main/kritiaward.jpg" alt="Grant" />
              <h3>Kriti Award</h3>
              <p>Highest GPA 2023</p>
            </div>
          </div>
        </section>

        {/* Courses & Certifications Section */}
        <section>
          <h2>Courses & Certifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card">Embedded Systems Desgin - NPTEL</div>
            <div className="card">Delta Full Stack Web Development Course - Apnacollege</div>
            <div className="card">Object Oriented Desging C++ – Coursera</div>
            <div className="card">Introduction to IoT – NPTEL</div>
          </div>
        </section>

      </main>
    </div>
  );
}
