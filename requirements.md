### **AI Generation Prompt: Personal Portfolio Website (`rushh.dev`)**

**Context:** This prompt is being run in the root of an existing React + TypeScript + Vite project named `rushh.dev`. Your task is to provide the necessary code to **modify** existing files (like `App.tsx`) and **create** new component and section files.

**Goal:** Transform the base Vite React project into a highly-personalized, responsive personal portfolio for **Rushabh Vakharwala**. The site must use the specific professional content provided below, built with React, TypeScript, and DaisyUI, and feature a retro-coding aesthetic.

**User Content to Inject:**

* **Personal Details:**
    * Name: Rushabh Vakharwala
    * Email: `rushhv@gmail.com`
    * LinkedIn: `linkedin.com/in/your-profile` (AI: Use this as the href for the LinkedIn icon)
    * GitHub: `github.com/your-profile` (AI: Use this as the href for the GitHub icon)
* **Hero Section Content:**
    * Title: Lead Software Developer
    * Tagline (for typewriter): "Senior Software Developer with a focus on cloud-native architectures."
* **About Section Content:**
    * **Bio:** "Senior Software Developer with over 6 years of experience leading successful software design and development projects with a strong focus on cloud-native architectures. Proven track record in enhancing security features, implementing SSO functionality, insight & projection features and optimizing application performance. Adept at translating business requirements into scalable solutions and managing cross-functional teams to ensure high-quality deliverables."
    * **Technical Skills (Use "Technical Acumen" from resume):**
        * **Web Development:** Spring Boot, .NET, Django, Tomcat, Node.js, HTML, CSS, Angular, ReactJS, JavaScript, TypeScript, Bootstrap
        * **Programming Languages:** Java, J2EE, C/C++, C#, Go, Python, Kotlin, Objective C, JavaScript, TypeScript
        * **Containerization & Cloud:** Docker, Kubernetes, Openshift, AWS, Azure, GCP
        * **Frameworks:** Ember.js, Express.js, Angular, React
        * **Database Systems:** MySQL, SQLite, PL/SQL, Oracle SQL, MS-SQL, MongoDB, Firebase, JDBC, GraphQL
        * **DevOps Tools:** Kubernetes, Docker, Openshift, Ansible, ArgoCD, Jenkins, Bamboo, Gradle, Maven, Ant
        * **Version Control:** Github (Git), Bitbucket (Git)
* **Projects Section Content (Use "Selected Accomplishments" from resume):**
    * **Project 1:** Title: "Cloud-Native Insights Engine", Description: "Predicted upcoming debit/credit transactions, notifying customers via Amazon SQS and SNS to provide insights on monthly activities.", Tech: AWS SQS, AWS SNS, Java.
    * **Project 2:** Title: "Enterprise Security Hub", Description: "Developed security features and a relational database (Oracle DB) to store login metadata, enabling suspicious login identification and mitigating security risks.", Tech: Oracle DB, Java, Security.
    * **Project 3:** Title: "SSO Vendor Integration", Description: "Implemented SSO (SAML) for retail/business customers, enabling seamless vendor platform access via iframes within the bank's Angular SPA.", Tech: SAML, Angular, Java.
    * **Project 4:** Title: "Optimized Multithreaded Solution", Description: "Designed a multithreaded solution for asynchronous calls, improving response times, reducing vendor communication by 25%, and minimizing resource consumption.", Tech: Java, Multithreading, Async API.
    * **Project 5:** Title: "Cloud Migration & CI/CD", Description: "Led migration of on-premise Java/Spring Boot applications to AWS, re-architecting services using Spring Cloud, AWS Lambdas, and building new CI/CD pipelines.", Tech: AWS, Spring Boot, AWS Lambda, CI/CD.
    * **Project 6:** Title: "BMO / Bank of the West Merger", Description: "Led development and integration of a scalable microservices platform to facilitate the seamless onboarding of 1.8 million new customers post-merger.", Tech: Microservices, Java, Spring Boot.
* **Experience Section Content:**
    * Entry 1: **Senior Technical Lead** | BMO, Bank of Montreal (Sept 2024 – Present)
    * Entry 2: **Senior Development Lead** | BMO, Bank of Montreal (Feb 2022 – Sept 2024)
    * Entry 3: **Senior Software Developer** | BMO, Bank of Montreal (June 2020 – Feb 2022)
    * Entry 4: **Software Developer (Co-op)** | BMO Bank of Montreal (Sept 2019 – April 2020)
    * Entry 5: **Junior Android Developer** | Samay Software (July 2017 – August 2018)
* **Education & Certs Content:**
    * Entry 1: **Certified AWS Developer Associate** (Link: `https://www.credly.com/badges/7195af3f-fe69-464b-80df-6697db95a5d7/`)
    * Entry 2: **Master of Applied Computing** | University of Windsor
    * Entry 3: **Bachelor of Computer Science & Engineering** | Babaria Institute of Technology

---

**AI Generation Instructions:**

1.  **Framework & Technologies:**
    * React (functional components), TypeScript, DaisyUI, Tailwind CSS, Vite.

2.  **Core Sections (Create/Modify Files):**
    * **`tailwind.config.js` (Modify):** Configure with DaisyUI and two custom themes: `retro-dark` (dark bg, bright green/cyan primary text) and `retro-light` (clean light bg, darker text). Set `font-family` to `mono`.
    * **`src/index.css` (Modify):** Import Tailwind and set base font to `font-mono`.
    * **`src/contexts/ThemeContext.tsx` (Create):** A React context to manage and persist the theme state (`retro-dark` / `retro-light`) using `localStorage`.
    * **`src/components/ThemeSwitcher.tsx` (Create):** A button component that uses the `ThemeContext` to toggle the theme.
    * **`src/components/Header.tsx` (Create):** A sticky navbar with the site name `rushh.dev` and links to: About, Projects, Experience, Education, Contact. Include the `ThemeSwitcher` component.
    * **`src/sections/Hero.tsx` (Create):** Use the **Hero Section Content**. Display "Rushabh Vakharwala" and "Lead Software Developer." Use a typewriter animation for the tagline.
    * **`src/sections/About.tsx` (Create):** Use the **About Section Content**. Display the **Bio** paragraph. Below that, create a responsive grid to display the **Technical Skills**, grouped by their categories (Web Development, Programming Languages, etc.).
    * **`src/sections/Projects.tsx` (Create):** Use the **Projects Section Content**. Create a responsive grid of DaisyUI cards. Each card should display the Project Title, Description, and Tech (as DaisyUI badges).
    * **`src/sections/Experience.tsx` (Create):** Use the **Experience Section Content**. Display as a vertical timeline or clean list, with Title, Company, and Dates for each entry.
    * **`src/sections/Education.tsx` (Create):** Use the **Education & Certs Content**. Display this as a simple list. Make the AWS cert a link.
    * **`src/sections/Contact.tsx` (Create):** Use the **Personal Details**. Display icons/links for LinkedIn, GitHub, and the email `rushhv@gmail.com`. (Do not display the phone number or address).
    * **`src/components/Footer.tsx` (Create):** A simple footer: "© [Current Year] Rushabh Vakharwala".
    * **`src/main.tsx` (Modify):** Wrap the `<App />` component with your `ThemeProvider`.
    * **`src/App.tsx` (Modify):** Import and render the components in order: `Header`, `Hero`, `About`, `Projects`, `Experience`, `Education`, `Contact`, `Footer`.

3.  **Theming & Aesthetics:**
    * **Dark/Light Toggle:** The `ThemeSwitcher` must toggle the `data-theme` attribute on the `<html>` tag.
    * **Retro Vibe:** All text must be monospaced. UI elements (buttons, cards) should have sharp corners (e.g., `rounded-btn: 0.1rem`). The `retro-dark` theme should be the default and feature a near-black background with bright, "glowing" text (like green or cyan) for accents.
    * **Responsiveness:** Must be mobile-first and fully responsive, readable on all screen sizes.