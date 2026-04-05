export type Locale = "es" | "en";

export type HighlightMetric = {
  label: string;
  value: string;
  copy: string;
};

export type Strength = {
  title: string;
  copy: string;
  outcome: string;
  skills: readonly string[];
};

export type StructuredFact = {
  label: string;
  value: string;
};

export type SkillDomain = {
  code: string;
  title: string;
  copy: string;
  skills: readonly string[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  tags: readonly string[];
  bullets: readonly string[];
  note?: string;
};

export type CredentialGroup = {
  title: string;
  description: string;
  items: readonly string[];
};

export type NavigationItem = {
  href: string;
  label: string;
};

export type PublicLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  jobTitle: string;
  roleLine: string;
  headline: string;
  intro: string;
  seoDescription: string;
  location: string;
  availability: string;
  email: string;
  linkedinUrl: string;
  linkedinLabel: string;
  resumeEsUrl: string;
  resumeEnUrl: string;
  portraitAlt: string;
};

export type PortfolioContent = {
  profile: Profile;
  navigationItems: readonly NavigationItem[];
  hero: {
    kicker: string;
    primaryAction: string;
    emailAction: string;
    resumeEsAction: string;
    resumeEnAction: string;
    viewProfileAction: string;
    localeLabel: string;
    quickFacts: readonly StructuredFact[];
  };
  strengthsSection: {
    eyebrow: string;
    title: string;
    copy: string;
    strengthLabel: string;
    outcomeLabel: string;
  };
  profileSection: {
    eyebrow: string;
    title: string;
    copy: string;
    summaryEyebrow: string;
    factsEyebrow: string;
    factsTitle: string;
    factsTag: string;
    keywordsEyebrow: string;
    keywordsTitle: string;
    keywordsCopy: string;
  };
  trajectorySection: {
    eyebrow: string;
    title: string;
    copy: string;
    currentLabel: string;
  };
  credentialsSection: {
    eyebrow: string;
    title: string;
    copy: string;
    accessEyebrow: string;
    accessTitle: string;
    accessCopy: string;
    linkedinPriorityLabel: string;
    publicLinks: readonly PublicLink[];
  };
  contactSection: {
    eyebrow: string;
    title: string;
    copy: string;
    openLinkedInAction: string;
    writeEmailAction: string;
    resumeEsAction: string;
    resumeEnAction: string;
    formEyebrow: string;
    formTitle: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    submitAction: string;
    submittingLabel: string;
    validationNameRequired: string;
    validationEmailInvalid: string;
    validationSubjectRequired: string;
    validationMessageRequired: string;
    validationMessageLength: string;
    helperCopy: string;
    successMessage: string;
    errorMessage: string;
    fallbackMessage: string;
  };
  heroMetrics: readonly HighlightMetric[];
  heroChips: readonly string[];
  strengths: readonly Strength[];
  humanSummaryParagraphs: readonly string[];
  summaryParagraphs: readonly string[];
  structuredFacts: readonly StructuredFact[];
  skillDomains: readonly SkillDomain[];
  experienceItems: readonly ExperienceItem[];
  credentialGroups: readonly CredentialGroup[];
  technicalKeywords: readonly string[];
};

export const defaultLocale: Locale = "es";

const sharedProfile = {
  name: "Jose Luis Riascos Murillo",
  email: "riascos_96@hotmail.com",
  linkedinUrl: "https://www.linkedin.com/in/jose-luis-riascos-murillo",
  linkedinLabel: "linkedin.com/in/jose-luis-riascos-murillo",
  resumeEsUrl: "/jose-riascos-cv-es.pdf",
  resumeEnUrl: "/jose-riascos-resume-en.pdf",
} as const;

export const portfolioContent: Record<Locale, PortfolioContent> = {
  es: {
    profile: {
      ...sharedProfile,
      jobTitle: "Cloud & DevOps Engineer",
      roleLine:
        "Cloud & DevOps Engineer | AWS | Serverless Architecture | Full Stack (Node.js / React)",
      headline:
        "Construyo arquitectura cloud, automatización y ejecución full stack para equipos y proyectos que necesitan avanzar con criterio.",
      intro:
        "Ingeniero Cloud y DevOps con más de 6 años de experiencia en AWS, arquitecturas serverless, Infrastructure as Code, CI/CD y desarrollo de APIs con Node.js. También aporto en React, Next.js y TypeScript, lo que me permite moverme con solvencia entre arquitectura, automatización, backend, frontend y conversación con negocio.",
      seoDescription:
        "Jose Luis Riascos Murillo es un Cloud & DevOps Engineer con más de 6 años de experiencia en AWS, arquitectura serverless, Infrastructure as Code, CI/CD, Node.js, React, Next.js y TypeScript.",
      location: "Ciudad de Panamá, Panamá",
      availability: "Abierto a oportunidades remotas y presenciales",
      portraitAlt: "Retrato profesional de Jose Luis Riascos Murillo.",
    },
    navigationItems: [
      { href: "#fortalezas", label: "Fortalezas" },
      { href: "#ficha", label: "Perfil" },
      { href: "#trayectoria", label: "Trayectoria" },
      { href: "#contacto", label: "Contacto" },
    ],
    hero: {
      kicker: "Cloud & DevOps Engineer",
      primaryAction: "LinkedIn",
      emailAction: "Email",
      resumeEsAction: "CV ES",
      resumeEnAction: "CV EN",
      viewProfileAction: "LinkedIn",
      localeLabel: "Idioma",
      quickFacts: [
        { label: "Base", value: "Panamá" },
        { label: "Disponibilidad", value: "Remoto y presencial" },
        { label: "Formato", value: "Rol fijo o freelance" },
        { label: "Enfoque", value: "AWS · DevOps · full stack" },
      ],
    },
    strengthsSection: {
      eyebrow: "Fortalezas",
      title: "Virtudes profesionales que vale la pena poner al frente.",
      copy:
        "Esta sección resume el tipo de aporte que llevo a un equipo o a un proyecto freelance: criterio de arquitectura, automatización de entrega y ejecución técnica con suficiente rango para moverme entre cloud, backend y frontend.",
      strengthLabel: "Fortaleza",
      outcomeLabel: "Lo que aporta",
    },
    profileSection: {
      eyebrow: "Ficha profesional",
      title: "Un perfil técnico que también entiende entrega, producto y operación.",
      copy:
        "Combino arquitectura cloud en AWS, automatización DevOps y ejecución full stack. Esa mezcla me permite participar con criterio desde la definición técnica hasta la implementación, la mejora continua y la conversación con negocio, tanto dentro de un equipo como en iniciativas freelance.",
      summaryEyebrow: "Resumen profesional",
      factsEyebrow: "Datos clave",
      factsTitle: "Instantánea profesional.",
      factsTag: "Perfil",
      keywordsEyebrow: "Tecnologías y dominios",
      keywordsTitle: "Stack, herramientas y áreas donde aporta valor directo.",
      keywordsCopy:
        "AWS, Node.js, React, Next.js, TypeScript, automatización de despliegues, arquitecturas serverless y colaboración con equipos de producto y diseño.",
    },
    trajectorySection: {
      eyebrow: "Trayectoria",
      title: "Una evolución profesional que conecta sistemas, producto y operación.",
      copy:
        "Mi trayectoria va desde administración de sistemas y frontend hasta cloud y DevOps sobre AWS. Ese recorrido explica por qué puedo moverme con contexto entre infraestructura, APIs, interfaces y entrega continua.",
      currentLabel: "Actual",
    },
    credentialsSection: {
      eyebrow: "Credenciales",
      title: "Certificaciones, formación y hábitos de trabajo que respaldan el perfil.",
      copy:
        "Aquí están las credenciales que refuerzan la experiencia: certificaciones AWS, formación técnica y una forma de trabajo que complementa la profundidad técnica.",
      accessEyebrow: "Acceso rápido",
      accessTitle: "Currículum y canal principal de contacto.",
      accessCopy:
        "Lo esencial para una revisión rápida: LinkedIn, CV en español y resume en inglés.",
      linkedinPriorityLabel: "LinkedIn prioritario",
      publicLinks: [
        { label: "CV en español", href: sharedProfile.resumeEsUrl },
        { label: "CV en inglés", href: sharedProfile.resumeEnUrl },
        { label: "LinkedIn", href: sharedProfile.linkedinUrl },
      ],
    },
    contactSection: {
      eyebrow: "Contacto",
      title: "Canales directos para conversar sobre una próxima oportunidad.",
      copy:
        "Prefiero centralizar el contacto por LinkedIn y email. Estoy abierto a oportunidades remotas, posiciones presenciales con buen encaje, y también a proyectos freelance o consultoría técnica donde pueda aportar desde arquitectura, automatización o ejecución full stack.",
      openLinkedInAction: "Abrir LinkedIn",
      writeEmailAction: "Escribir email",
      resumeEsAction: "Descargar CV ES",
      resumeEnAction: "Descargar CV EN",
      formEyebrow: "Formulario directo",
      formTitle: "Escríbeme desde aquí",
      nameLabel: "Tu nombre",
      emailLabel: "Correo electrónico",
      subjectLabel: "Asunto",
      messageLabel: "Mensaje",
      namePlaceholder: "Tu nombre completo",
      emailPlaceholder: "tu-correo@empresa.com",
      subjectPlaceholder: "Rol, proyecto u oportunidad",
      messagePlaceholder:
        "Cuéntame qué estás buscando, el contexto del rol o proyecto, y cómo crees que puedo aportar.",
      submitAction: "Enviar mensaje",
      submittingLabel: "Enviando...",
      validationNameRequired: "Escribe un nombre válido para poder contactarte.",
      validationEmailInvalid: "Ingresa un correo electrónico válido.",
      validationSubjectRequired: "Escribe un asunto breve para contextualizar el mensaje.",
      validationMessageRequired: "Cuéntame qué necesitas o qué oportunidad quieres conversar.",
      validationMessageLength: "El mensaje debe tener al menos 20 caracteres para dar contexto suficiente.",
      helperCopy:
        "Si prefieres un canal directo, también puedes escribirme por email o LinkedIn. Este espacio funciona igual para oportunidades laborales, consultoría técnica o proyectos freelance que necesiten contexto desde el primer mensaje.",
      successMessage:
        "Tu mensaje fue enviado correctamente. Revisaré el correo y responderé por el canal que indiques.",
      errorMessage:
        "No pude enviar el formulario en este momento. Intenta de nuevo o usa el email directo.",
      fallbackMessage:
        "El formulario aún no está conectado al envío automático en este entorno. De momento abriré tu cliente de correo con el mensaje precargado.",
    },
    heroMetrics: [
      {
        label: "Experiencia",
        value: "6+ años",
        copy: "Trayectoria combinando cloud, automatización, backend y frontend.",
      },
      {
        label: "Certificación",
        value: "AWS Certified",
        copy: "Perfil validado para entornos AWS y arquitectura moderna.",
      },
      {
        label: "Entrega",
        value: "CI/CD + IaC",
        copy: "AWS SAM y CloudFormation como parte del flujo real de despliegue.",
      },
      {
        label: "Modalidad",
        value: "Roles + freelance",
        copy: "Disponible para integrarme a equipos o apoyar proyectos concretos.",
      },
    ],
    heroChips: [
      "AWS Lambda",
      "Serverless Architecture",
      "CloudFormation",
      "AWS SAM",
      "CI/CD",
      "Node.js APIs",
      "React / Next.js",
      "TypeScript",
    ],
    strengths: [
      {
        title: "Arquitectura cloud que reduce complejidad",
        copy:
          "Diseño soluciones escalables en AWS con criterio práctico: servicios gestionados, serverless, observabilidad y una estructura que facilita evolución y operación.",
        outcome:
          "Menos fricción operativa, más claridad técnica y mejor capacidad para escalar.",
        skills: [
          "AWS",
          "Lambda",
          "API Gateway",
          "RDS",
          "IAM",
          "VPC",
          "CloudWatch",
          "Step Functions",
        ],
      },
      {
        title: "Automatización que acelera releases",
        copy:
          "Llevo disciplina DevOps a equipos que necesitan moverse más rápido sin comprometer control: pipelines, entornos, Infrastructure as Code y estándares técnicos.",
        outcome:
          "Despliegues repetibles, menos trabajo manual y mejor confiabilidad de entrega.",
        skills: [
          "CI/CD",
          "Infrastructure as Code",
          "AWS SAM",
          "CloudFormation",
          "Automation",
          "Release Workflows",
        ],
      },
      {
        title: "Ejecución full stack con sentido de producto",
        copy:
          "No me limito a la capa de infraestructura. También construyo APIs con Node.js y puedo aportar en interfaces con React, Next.js, TypeScript y TailwindCSS.",
        outcome:
          "Mejor diálogo entre producto, frontend, backend y operaciones.",
        skills: [
          "Node.js",
          "REST APIs",
          "React",
          "Next.js",
          "TypeScript",
          "TailwindCSS",
          "Figma",
        ],
      },
    ],
    humanSummaryParagraphs: [
      "He construido mi perfil alrededor de tres capacidades que rara vez aparecen juntas con el mismo nivel de solidez: arquitectura cloud en AWS, automatización DevOps y ejecución full stack.",
      "Mi experiencia reciente se concentra en arquitecturas serverless, Infrastructure as Code con AWS SAM y CloudFormation, automatización CI/CD y desarrollo de APIs backend con Node.js.",
      "Ese núcleo técnico se complementa con experiencia en React, Next.js, TypeScript, TailwindCSS y colaboración con diseño, lo que me permite participar con criterio en decisiones que afectan tanto la entrega como la experiencia final.",
      "También me siento cómodo entendiendo el negocio, aterrizando ideas y proponiendo mejoras que hagan más fuerte el producto, el equipo y la forma de ejecutar.",
      "Me adapto bien a distintos contextos de trabajo, disfruto aportar mi opinión y convertir esa visión en mejoras concretas para la arquitectura, el proceso y la calidad del resultado final.",
    ],
    summaryParagraphs: [
      "Jose Luis Riascos Murillo ha construido su perfil alrededor de tres capacidades que rara vez aparecen juntas con el mismo nivel de solidez: arquitectura cloud en AWS, automatización DevOps y ejecución full stack.",
      "Su experiencia reciente se concentra en arquitecturas serverless, Infrastructure as Code con AWS SAM y CloudFormation, automatización CI/CD y desarrollo de APIs backend con Node.js.",
      "Ese núcleo técnico se complementa con experiencia en React, Next.js, TypeScript, TailwindCSS y colaboración con diseño, lo que le permite participar con criterio en decisiones que afectan tanto la entrega como la experiencia final.",
      "También destaca por su capacidad para entender el negocio, proponer mejoras, adaptarse a distintos equipos de trabajo y aportar ideas que elevan tanto la ejecución como el resultado final.",
    ],
    structuredFacts: [
      { label: "Nombre", value: sharedProfile.name },
      { label: "Rol principal", value: "Cloud & DevOps Engineer" },
      {
        label: "Especialidad",
        value: "AWS, arquitectura serverless, CI/CD e Infrastructure as Code",
      },
      { label: "Backend", value: "Node.js, REST APIs, microservicios, PostgreSQL" },
      { label: "Frontend", value: "React, Next.js, TypeScript, JavaScript, TailwindCSS" },
      { label: "Ubicación", value: "Ciudad de Panamá, Panamá" },
      { label: "Disponibilidad", value: "Remoto y presencial" },
      { label: "Canal prioritario", value: "LinkedIn para entrevistas y contacto profesional" },
      { label: "Idiomas", value: "Español nativo e inglés técnico / comunicación funcional" },
      { label: "Certificación clave", value: "AWS Certified Developer - Associate" },
    ],
    skillDomains: [
      {
        code: "AWS",
        title: "AWS y arquitectura serverless",
        copy:
          "Diseño soluciones sobre servicios gestionados y patrones serverless para reducir fricción operativa, escalar con criterio y sostener decisiones de arquitectura.",
        skills: [
          "AWS Lambda",
          "API Gateway",
          "RDS",
          "IAM",
          "VPC",
          "CloudWatch",
          "Step Functions",
        ],
      },
      {
        code: "CI",
        title: "CI/CD y automatización de entrega",
        copy:
          "Estructuro flujos de despliegue repetibles para reducir trabajo manual, elevar confiabilidad y acelerar releases sin perder control técnico.",
        skills: [
          "CI/CD",
          "Release workflows",
          "Git workflows",
          "Deployment automation",
          "Technical standards",
        ],
      },
      {
        code: "API",
        title: "Backend y APIs con Node.js",
        copy:
          "Construyo servicios backend y APIs pensando en mantenibilidad, integración con producto y operación real sobre infraestructura cloud.",
        skills: ["Node.js", "REST APIs", "Microservices", "PostgreSQL", "Serverless services"],
      },
      {
        code: "FE",
        title: "Frontend y experiencia web",
        copy:
          "Puedo moverme en la capa de interfaz cuando el producto necesita cerrar el ciclo entre backend, UI y experiencia final.",
        skills: ["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "HTML", "CSS"],
      },
      {
        code: "IAC",
        title: "Infrastructure as Code",
        copy:
          "Trabajo la infraestructura como código para mantener trazabilidad, consistencia entre entornos y despliegues más seguros.",
        skills: [
          "AWS SAM",
          "CloudFormation",
          "Infrastructure as Code",
          "Template design",
          "Environment parity",
        ],
      },
      {
        code: "TEAM",
        title: "Colaboración técnica y producto",
        copy:
          "Entiendo negocio, propongo mejoras y colaboro con diseño y equipos técnicos para aterrizar decisiones con impacto real.",
        skills: [
          "Figma",
          "Agile / Scrum",
          "Technical mentoring",
          "Business understanding",
          "Cross-team collaboration",
        ],
      },
    ],
    experienceItems: [
      {
        role: "Consultor Cloud & DevOps",
        company: "Freelance",
        location: "Panamá",
        period: "Nov 2023 - Actualidad",
        summary:
          "Acompaño proyectos que necesitan arquitectura cloud con criterio, backend sólido y automatización real para llegar a producción con menos fricción y mejor capacidad de crecimiento.",
        tags: ["AWS", "Serverless", "Node.js", "CI/CD", "Mentoría"],
        bullets: [
          "Diseño arquitecturas serverless en AWS para aplicaciones web, mejorando escalabilidad y automatizando despliegues mediante CI/CD.",
          "Desarrollo APIs backend con Node.js y AWS Lambda para servicios con foco en mantenibilidad y crecimiento.",
          "Implemento pipelines CI/CD utilizando AWS SAM y CloudFormation para reducir trabajo manual y dar consistencia al despliegue.",
          "Defino estándares técnicos para mejorar la calidad del código y los flujos de desarrollo.",
          "Acompaño a otros desarrolladores con mentoría práctica en automatización y DevOps.",
        ],
      },
      {
        role: "DevOps Engineer (AWS)",
        company: "IVCISA",
        location: "Panamá",
        period: "May 2022 - Oct 2023",
        summary:
          "En esta etapa trabajé sobre entornos empresariales donde el reto era modernizar infraestructura, ordenar despliegues y llevar soluciones cloud de AWS a un contexto real de negocio.",
        tags: ["AWS", "Migración", "Serverless", "Node.js", "IaC"],
        bullets: [
          "Implementé soluciones cloud en AWS para clientes empresariales, apoyando procesos de migración y modernización de infraestructura.",
          "Diseñé infraestructuras escalables con AWS Lambda, API Gateway y RDS para responder mejor a necesidades de crecimiento.",
          "Desarrollé servicios backend con Node.js en entornos serverless.",
          "Automaticé despliegues mediante Infrastructure as Code para dar trazabilidad y repetibilidad a la entrega.",
        ],
      },
      {
        role: "Desarrollador Web / Frontend",
        company: "Merkadoo / XPLOR Digital Experience",
        location: "Panamá",
        period: "Feb 2021 - May 2022",
        summary:
          "Aquí consolidé mi criterio de interfaz, mi colaboración con diseño y mi capacidad de construir experiencias web orientadas a conversión y continuidad de producto.",
        tags: ["Magento", "React", "Frontend", "JavaScript", "Figma"],
        note:
          "Ambas empresas pertenecían al mismo grupo empresarial; las operaciones de desarrollo pasaron de Merkadoo a XPLOR Digital Experience durante una reestructuración, manteniendo continuidad en los proyectos.",
        bullets: [
          "Desarrollé interfaces de comercio electrónico en Magento orientadas a una experiencia más clara para el usuario final.",
          "Implementé aplicaciones frontend con React, HTML, CSS y JavaScript.",
          "Trabajé de forma cercana con diseño utilizando Figma para aterrizar decisiones visuales en producto real.",
        ],
      },
      {
        role: "Administrador de Sistemas",
        company: "Fuzion Salon",
        location: "Panamá",
        period: "Mar 2019 - Feb 2021",
        summary:
          "Esta etapa me dio una base muy fuerte de operación: infraestructura, redes, ERP y sitio web, siempre con foco en sostener el negocio y acompañar su crecimiento desde la tecnología.",
        tags: ["Infraestructura", "Redes", "ERP", "Sitio web", "Operación"],
        bullets: [
          "Administré la infraestructura tecnológica y las redes para sostener la operación diaria del negocio.",
          "Implementé y mantuve sistemas ERP para apoyar procesos internos con mayor orden y continuidad.",
          "Diseñé redes para nuevos locales, acompañando la expansión desde la base tecnológica.",
          "Desarrollé y mantuve el sitio web corporativo como parte de la presencia digital de la empresa.",
        ],
      },
    ],
    credentialGroups: [
      {
        title: "Certificaciones",
        description:
          "Credenciales que refuerzan experiencia real en AWS, negocio y arquitectura cloud.",
        items: [
          "AWS Certified Developer - Associate",
          "AWS Partner Accreditation - Technical",
          "AWS Partner Accreditation - Business",
          "AWS Cloud Economics Accreditation",
          "AWS Glue Immersion Day",
        ],
      },
      {
        title: "Educación",
        description: "Formación académica y técnica orientada a ingeniería de software.",
        items: [
          "Universidad Tecnológica de Panamá - Licenciatura en Desarrollo de Software",
          "Instituto Colombo Americano Andrés Bello - Analista y Programador de Sistemas",
        ],
      },
      {
        title: "Colaboración y trabajo diario",
        description: "Hábitos de trabajo que complementan la profundidad técnica.",
        items: [
          "Git",
          "Agile / Scrum",
          "Mentoría técnica",
          "Colaboración con diseño en Figma",
          "Español nativo",
          "Inglés técnico / comunicación funcional",
        ],
      },
    ],
    technicalKeywords: [
      "Cloud & DevOps Engineer",
      "AWS",
      "Serverless Architecture",
      "Infrastructure as Code",
      "AWS SAM",
      "CloudFormation",
      "CI/CD",
      "AWS Lambda",
      "API Gateway",
      "RDS",
      "Node.js",
      "REST APIs",
      "Microservices",
      "PostgreSQL",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "TailwindCSS",
    ],
  },
  en: {
    profile: {
      ...sharedProfile,
      jobTitle: "Cloud & DevOps Engineer",
      roleLine:
        "Cloud & DevOps Engineer | AWS | Serverless Architecture | Full Stack (Node.js / React)",
      headline:
        "I build cloud architecture, automation, and full stack execution for teams and products that need to move with confidence.",
      intro:
        "Cloud and DevOps Engineer with 6+ years of experience across AWS, serverless architecture, Infrastructure as Code, CI/CD, and Node.js API development. I also contribute in React, Next.js, and TypeScript, which allows me to operate across architecture, automation, backend, frontend, and business-facing discussions.",
      seoDescription:
        "Jose Luis Riascos Murillo is a Cloud & DevOps Engineer with 6+ years of experience in AWS, serverless architecture, Infrastructure as Code, CI/CD, Node.js, React, Next.js, and TypeScript.",
      location: "Panama City, Panama",
      availability: "Open to remote and onsite opportunities",
      portraitAlt: "Professional portrait of Jose Luis Riascos Murillo.",
    },
    navigationItems: [
      { href: "#fortalezas", label: "Strengths" },
      { href: "#ficha", label: "Profile" },
      { href: "#trayectoria", label: "Trajectory" },
      { href: "#contacto", label: "Contact" },
    ],
    hero: {
      kicker: "Cloud & DevOps Engineer",
      primaryAction: "LinkedIn",
      emailAction: "Email",
      resumeEsAction: "CV ES",
      resumeEnAction: "CV EN",
      viewProfileAction: "LinkedIn",
      localeLabel: "Language",
      quickFacts: [
        { label: "Base", value: "Panama" },
        { label: "Availability", value: "Remote and onsite" },
        { label: "Format", value: "Role or freelance" },
        { label: "Focus", value: "AWS · DevOps · full stack" },
      ],
    },
    strengthsSection: {
      eyebrow: "Strengths",
      title: "Professional strengths worth putting up front.",
      copy:
        "This section captures the contribution I bring into a team or a freelance engagement: architecture judgment, delivery automation, and the technical range to operate across cloud, backend, and frontend.",
      strengthLabel: "Strength",
      outcomeLabel: "What it brings",
    },
    profileSection: {
      eyebrow: "Professional profile",
      title: "A technical profile that also understands delivery, product, and operations.",
      copy:
        "I combine AWS cloud architecture, DevOps automation, and full stack execution. That mix allows me to contribute with sound judgment from technical definition through implementation, continuous improvement, and product-facing decisions, whether inside a team or in freelance delivery.",
      summaryEyebrow: "Professional summary",
      factsEyebrow: "Key facts",
      factsTitle: "Professional snapshot.",
      factsTag: "Profile",
      keywordsEyebrow: "Domains and tools",
      keywordsTitle: "Stack, tooling, and areas where I create direct value.",
      keywordsCopy:
        "AWS, Node.js, React, Next.js, TypeScript, deployment automation, serverless architecture, and close collaboration with product and design teams.",
    },
    trajectorySection: {
      eyebrow: "Career path",
      title: "A career path that connects systems, product, and operations.",
      copy:
        "My trajectory goes from systems administration and frontend work to cloud and DevOps on AWS. That journey explains why I can operate with context across infrastructure, APIs, interfaces, and continuous delivery.",
      currentLabel: "Current",
    },
    credentialsSection: {
      eyebrow: "Credentials",
      title: "Certifications, education, and work habits that support the profile.",
      copy:
        "This block concentrates the credentials behind the experience: AWS certifications, technical education, and working habits that complement technical depth.",
      accessEyebrow: "Quick access",
      accessTitle: "Resumes and primary contact channel.",
      accessCopy:
        "The essentials for a fast review: LinkedIn, the Spanish CV, and the English resume.",
      linkedinPriorityLabel: "LinkedIn priority",
      publicLinks: [
        { label: "CV en español", href: sharedProfile.resumeEsUrl },
        { label: "Resume in English", href: sharedProfile.resumeEnUrl },
        { label: "LinkedIn", href: sharedProfile.linkedinUrl },
      ],
    },
    contactSection: {
      eyebrow: "Contact",
      title: "Direct channels to discuss the next opportunity.",
      copy:
        "I prefer to centralize outreach through LinkedIn and email. I am open to remote roles, onsite opportunities with the right fit, and freelance or consulting projects where I can contribute across architecture, automation, and full stack execution.",
      openLinkedInAction: "Open LinkedIn",
      writeEmailAction: "Send email",
      resumeEsAction: "Download CV ES",
      resumeEnAction: "Download CV EN",
      formEyebrow: "Direct form",
      formTitle: "Write to me here",
      nameLabel: "Your name",
      emailLabel: "Email address",
      subjectLabel: "Subject",
      messageLabel: "Message",
      namePlaceholder: "Your full name",
      emailPlaceholder: "your-email@company.com",
      subjectPlaceholder: "Role, project, or opportunity",
      messagePlaceholder:
        "Tell me what you are looking for, the context of the role or project, and how you think I can help.",
      submitAction: "Send message",
      submittingLabel: "Sending...",
      validationNameRequired: "Please enter a valid name so I can identify you.",
      validationEmailInvalid: "Please enter a valid email address.",
      validationSubjectRequired: "Please add a short subject for context.",
      validationMessageRequired: "Please tell me what you need or what opportunity you want to discuss.",
      validationMessageLength: "Your message should be at least 20 characters to provide enough context.",
      helperCopy:
        "If you prefer a direct channel, you can also reach out by email or LinkedIn. This form works equally well for job opportunities, consulting conversations, or freelance project inquiries.",
      successMessage:
        "Your message was sent successfully. I will review it and reply through the channel you provided.",
      errorMessage:
        "I could not send the form right now. Please try again or use direct email instead.",
      fallbackMessage:
        "The form is not connected to automatic delivery in this environment yet. I will open your email client with the message prefilled for now.",
    },
    heroMetrics: [
      {
        label: "Experience",
        value: "6+ years",
        copy: "Trajectory spanning cloud, automation, backend, and frontend work.",
      },
      {
        label: "Certification",
        value: "AWS Certified",
        copy: "Validated profile for AWS environments and modern architecture.",
      },
      {
        label: "Delivery",
        value: "CI/CD + IaC",
        copy: "AWS SAM and CloudFormation as part of real deployment workflows.",
      },
      {
        label: "Work mode",
        value: "Roles + freelance",
        copy: "Available for team integration or focused technical engagements.",
      },
    ],
    heroChips: [
      "AWS Lambda",
      "Serverless Architecture",
      "CloudFormation",
      "AWS SAM",
      "CI/CD",
      "Node.js APIs",
      "React / Next.js",
      "TypeScript",
    ],
    strengths: [
      {
        title: "Cloud architecture that reduces complexity",
        copy:
          "I design scalable AWS solutions with practical judgment: managed services, serverless patterns, observability, and structures that support evolution and operations.",
        outcome:
          "Less operational friction, clearer technical direction, and better scalability.",
        skills: [
          "AWS",
          "Lambda",
          "API Gateway",
          "RDS",
          "IAM",
          "VPC",
          "CloudWatch",
          "Step Functions",
        ],
      },
      {
        title: "Automation that speeds up releases",
        copy:
          "I bring DevOps discipline to teams that need to move faster without losing control: pipelines, environments, Infrastructure as Code, and technical standards.",
        outcome:
          "Repeatable deployments, less manual effort, and more reliable delivery.",
        skills: [
          "CI/CD",
          "Infrastructure as Code",
          "AWS SAM",
          "CloudFormation",
          "Automation",
          "Release Workflows",
        ],
      },
      {
        title: "Full stack execution with product awareness",
        copy:
          "I do not stop at infrastructure. I also build Node.js APIs and can contribute to interfaces with React, Next.js, TypeScript, and TailwindCSS.",
        outcome:
          "Stronger alignment across product, frontend, backend, and operations.",
        skills: [
          "Node.js",
          "REST APIs",
          "React",
          "Next.js",
          "TypeScript",
          "TailwindCSS",
          "Figma",
        ],
      },
    ],
    humanSummaryParagraphs: [
      "I have built my profile around three capabilities that rarely appear together with the same level of solidity: AWS cloud architecture, DevOps automation, and full stack execution.",
      "My recent experience centers on serverless architecture, Infrastructure as Code with AWS SAM and CloudFormation, CI/CD automation, and backend API development with Node.js.",
      "That technical core is complemented by experience in React, Next.js, TypeScript, TailwindCSS, and collaboration with design teams, which allows me to contribute to decisions that affect both delivery and the end-user experience.",
      "I am also comfortable understanding business needs, shaping ideas into implementation paths, and proposing improvements that strengthen both the product and the way teams execute.",
      "Adaptability is a real part of how I work: I integrate well into different teams, bring ideas to the table, and turn feedback and opinion into concrete improvements.",
    ],
    summaryParagraphs: [
      "Jose Luis Riascos Murillo has built his profile around three capabilities that rarely show up together with the same level of solidity: AWS cloud architecture, DevOps automation, and full stack execution.",
      "His recent experience centers on serverless architecture, Infrastructure as Code with AWS SAM and CloudFormation, CI/CD automation, and backend API development with Node.js.",
      "That technical core is complemented by experience in React, Next.js, TypeScript, TailwindCSS, and collaboration with design teams, which allows him to contribute to decisions that affect both delivery and the end-user experience.",
      "He also stands out for understanding business context, adapting quickly to different teams, and contributing ideas that improve execution and outcomes.",
    ],
    structuredFacts: [
      { label: "Name", value: sharedProfile.name },
      { label: "Primary role", value: "Cloud & DevOps Engineer" },
      {
        label: "Focus",
        value: "AWS, serverless architecture, CI/CD, and Infrastructure as Code",
      },
      { label: "Backend", value: "Node.js, REST APIs, microservices, PostgreSQL" },
      { label: "Frontend", value: "React, Next.js, TypeScript, JavaScript, TailwindCSS" },
      { label: "Location", value: "Panama City, Panama" },
      { label: "Availability", value: "Remote and onsite opportunities" },
      { label: "Priority channel", value: "LinkedIn for interviews and professional outreach" },
      { label: "Languages", value: "Native Spanish and technical / functional English" },
      { label: "Key certification", value: "AWS Certified Developer - Associate" },
    ],
    skillDomains: [
      {
        code: "AWS",
        title: "AWS and serverless architecture",
        copy:
          "I design solutions around managed services and serverless patterns to reduce operational friction, scale with judgment, and support architecture decisions.",
        skills: [
          "AWS Lambda",
          "API Gateway",
          "RDS",
          "IAM",
          "VPC",
          "CloudWatch",
          "Step Functions",
        ],
      },
      {
        code: "CI",
        title: "CI/CD and delivery automation",
        copy:
          "I structure repeatable deployment flows that cut manual work, improve reliability, and help teams release faster without losing technical control.",
        skills: [
          "CI/CD",
          "Release workflows",
          "Git workflows",
          "Deployment automation",
          "Technical standards",
        ],
      },
      {
        code: "API",
        title: "Backend and APIs with Node.js",
        copy:
          "I build backend services and APIs with maintainability, product integration, and real cloud operations in mind.",
        skills: ["Node.js", "REST APIs", "Microservices", "PostgreSQL", "Serverless services"],
      },
      {
        code: "FE",
        title: "Frontend and web experience",
        copy:
          "I can contribute at the interface layer when a product needs tighter alignment between backend work, UI, and the final user experience.",
        skills: ["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "HTML", "CSS"],
      },
      {
        code: "IAC",
        title: "Infrastructure as Code",
        copy:
          "I use infrastructure as code to keep deployments traceable, environments consistent, and delivery workflows safer.",
        skills: [
          "AWS SAM",
          "CloudFormation",
          "Infrastructure as Code",
          "Template design",
          "Environment parity",
        ],
      },
      {
        code: "TEAM",
        title: "Technical collaboration and product sense",
        copy:
          "I understand business context, propose improvements, and work well with design and technical teams to land decisions with practical impact.",
        skills: [
          "Figma",
          "Agile / Scrum",
          "Technical mentoring",
          "Business understanding",
          "Cross-team collaboration",
        ],
      },
    ],
    experienceItems: [
      {
        role: "Cloud & DevOps Consultant",
        company: "Freelance",
        location: "Panama",
        period: "Nov 2023 - Present",
        summary:
          "I support products that need cloud architecture, solid backend work, and real automation to reach production with less friction and better scalability.",
        tags: ["AWS", "Serverless", "Node.js", "CI/CD", "Mentoring"],
        bullets: [
          "Designed AWS serverless architectures for web applications, improving scalability and automating deployments through CI/CD.",
          "Built backend APIs with Node.js and AWS Lambda with maintainability and growth in mind.",
          "Implemented CI/CD pipelines using AWS SAM and CloudFormation to reduce manual work and improve deployment consistency.",
          "Defined technical standards to improve code quality and development workflows.",
          "Mentored developers in practical DevOps practices.",
        ],
      },
      {
        role: "DevOps Engineer (AWS)",
        company: "IVCISA",
        location: "Panama",
        period: "May 2022 - Oct 2023",
        summary:
          "This stage placed me in enterprise cloud delivery, combining modernization efforts, AWS architecture, and stronger deployment discipline.",
        tags: ["AWS", "Cloud migration", "Serverless", "Node.js", "IaC"],
        bullets: [
          "Implemented AWS cloud solutions for enterprise clients while supporting infrastructure migration and modernization efforts.",
          "Designed scalable environments with AWS Lambda, API Gateway, and RDS.",
          "Built backend services with Node.js in serverless environments.",
          "Automated deployments through Infrastructure as Code to improve traceability and repeatability.",
        ],
      },
      {
        role: "Web / Frontend Developer",
        company: "Merkadoo / XPLOR Digital Experience",
        location: "Panama",
        period: "Feb 2021 - May 2022",
        summary:
          "This role strengthened my interface judgment, design collaboration, and ability to build web experiences aligned with product and business needs.",
        tags: ["Magento", "React", "Frontend", "JavaScript", "Figma"],
        note:
          "Both companies belonged to the same business group; development operations moved from Merkadoo to XPLOR Digital Experience during a restructuring while keeping project continuity.",
        bullets: [
          "Built e-commerce interfaces in Magento focused on a clearer user experience.",
          "Implemented frontend applications with React, HTML, CSS, and JavaScript.",
          "Worked closely with design teams using Figma to turn visual decisions into production-ready interfaces.",
        ],
      },
      {
        role: "Systems Administrator",
        company: "Fuzion Salon",
        location: "Panama",
        period: "Mar 2019 - Feb 2021",
        summary:
          "This role gave me a strong operational foundation across infrastructure, networks, ERP systems, and the corporate website, always tied to business continuity and growth.",
        tags: ["Infrastructure", "Networks", "ERP", "Website", "Operations"],
        bullets: [
          "Managed technology infrastructure and networks to support day-to-day business operations.",
          "Implemented and maintained ERP systems that supported internal processes.",
          "Designed network layouts for new locations as part of the company’s expansion.",
          "Developed and maintained the corporate website as part of the company’s digital presence.",
        ],
      },
    ],
    credentialGroups: [
      {
        title: "Certifications",
        description:
          "Credentials that reinforce hands-on experience in AWS, business context, and cloud architecture.",
        items: [
          "AWS Certified Developer - Associate",
          "AWS Partner Accreditation - Technical",
          "AWS Partner Accreditation - Business",
          "AWS Cloud Economics Accreditation",
          "AWS Glue Immersion Day",
        ],
      },
      {
        title: "Education",
        description: "Academic and technical background oriented toward software engineering.",
        items: [
          "Universidad Tecnológica de Panamá - Software Development degree",
          "Instituto Colombo Americano Andrés Bello - Systems Analyst and Programmer",
        ],
      },
      {
        title: "Collaboration and daily work",
        description: "Working habits that complement technical depth.",
        items: [
          "Git",
          "Agile / Scrum",
          "Technical mentoring",
          "Design collaboration in Figma",
          "Native Spanish",
          "Technical / functional English",
        ],
      },
    ],
    technicalKeywords: [
      "Cloud & DevOps Engineer",
      "AWS",
      "Serverless Architecture",
      "Infrastructure as Code",
      "AWS SAM",
      "CloudFormation",
      "CI/CD",
      "AWS Lambda",
      "API Gateway",
      "RDS",
      "Node.js",
      "REST APIs",
      "Microservices",
      "PostgreSQL",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "TailwindCSS",
    ],
  },
};

export function getPortfolioContent(locale: Locale = defaultLocale) {
  return portfolioContent[locale];
}

const defaultContent = getPortfolioContent();

export const profile = defaultContent.profile;
export const navigationItems = defaultContent.navigationItems;
export const heroMetrics = defaultContent.heroMetrics;
export const heroChips = defaultContent.heroChips;
export const strengths = defaultContent.strengths;
export const summaryParagraphs = defaultContent.summaryParagraphs;
export const structuredFacts = defaultContent.structuredFacts;
export const skillDomains = defaultContent.skillDomains;
export const experienceItems = defaultContent.experienceItems;
export const credentialGroups = defaultContent.credentialGroups;
export const technicalKeywords = defaultContent.technicalKeywords;
