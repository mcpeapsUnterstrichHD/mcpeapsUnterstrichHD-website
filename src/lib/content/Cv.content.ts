/**
 * @module Cv.content
 *
 * @description
 * Intlayer content dictionary for the Curriculum Vitae (Resume) section.
 * This is the largest dictionary in the application and provides comprehensive
 * translations for the entire CV, organized into the following sections:
 *
 * - **recommendation** -- Print settings guidance and PDF download notice
 * - **about** -- Professional title, contact labels (email, phone), address,
 *   and date of birth label
 * - **education** -- Section heading, qualification badges (vocational training,
 *   technical diploma, bachelor's degree, semesters, years), and detailed
 *   entries for TU Berlin, OSZ IMT, Carl-von-Linne-Schule, and a gap year
 * - **experience** -- Section heading and detailed entries for KfW internship,
 *   Academy of Arts, Tosa Security, and Pfennigpfeiffer, each with name,
 *   image alt, description bullets, and skill badges
 * - **skills** -- Section heading, category badges (development, frontend,
 *   automation, languages, etc.), duration labels with `{count}` placeholders,
 *   and skill category titles (programming, databases, DevOps, networking,
 *   operating systems, dev environments, office)
 *
 * Translations are available in German (de-DE) and English (en-US).
 *
 * Dictionary key: `"cv"`
 *
 * @see {@link src/routes/[[locale=locale]]/cv/+page.svelte} -- main CV page
 * @see {@link src/routes/[[locale=locale]]/cv/+layout.svelte} -- CV layout (print notice)
 * @see {@link src/routes/[[locale=locale]]/cv/ats/+page.svelte} -- ATS-optimized CV variant
 * @see {@link src/routes/[[locale=locale]]/imprint/+page.svelte} -- imprint (contact info)
 * @see {@link src/lib/components/Footer.svelte} -- footer (contact details)
 */
import { Locales, t, type Dictionary } from "intlayer";

const cvContent = {
  key: "cv",
  content: {
    recommendation: {
      printingSettings: {
        title: t({
          [Locales.ENGLISH_UNITED_STATES]: "Optimal Print Settings",
          [Locales.GERMAN_GERMANY]: "Beste Druckeinstellungen",
        }),
        description: t({
          [Locales.ENGLISH_UNITED_STATES]:
            "Scale: 62%, Margins: Default, Background Graphics: On",
          [Locales.GERMAN_GERMANY]:
            "Skalierung 62 %, Ränder: Standard, Hintergrundgrafiken ein",
        }),
      },
      printingNotice: {
        title: t({
          [Locales.ENGLISH_UNITED_STATES]: "Print Recommendation",
          [Locales.GERMAN_GERMANY]: "Empfehlung für den Druck",
        }),
        description: t({
          [Locales.ENGLISH_UNITED_STATES]:
            "Use the PDF button in the top right corner for optimal printing.",
          [Locales.GERMAN_GERMANY]:
            "Nutzen Sie den PDF-Button oberen rechts, um den Lebenslauf optimal zu drucken.",
        }),
      },
    },
    about: {
      title: t({
        [Locales.ENGLISH_UNITED_STATES]:
          "Certified IT Assistant | Software Developer",
        [Locales.GERMAN_GERMANY]:
          "Staatlich geprüfter IT-Assistent | Softwareentwickler",
      }),
      email: t({
        [Locales.ENGLISH_UNITED_STATES]: "Email",
        [Locales.GERMAN_GERMANY]: "E-Mail",
      }),
      telnum: t({
        [Locales.ENGLISH_UNITED_STATES]: "Phone",
        [Locales.GERMAN_GERMANY]: "Telefon",
      }),
      address: {
        germany: t({
          [Locales.ENGLISH_UNITED_STATES]: "Germany",
          [Locales.GERMAN_GERMANY]: "Deutschland",
        }),
        berlin: t({
          [Locales.ENGLISH_UNITED_STATES]: "Berlin",
          [Locales.GERMAN_GERMANY]: "Berlin",
        }),
      },
      birthday: t({
        [Locales.ENGLISH_UNITED_STATES]: "Date of Birth",
        [Locales.GERMAN_GERMANY]: "Geburtsdatum",
      }),
    },
    education: {
      title: t({
        [Locales.ENGLISH_UNITED_STATES]: "Education",
        [Locales.GERMAN_GERMANY]: "Bildungsweg",
      }),
      badges: {
        ausbildung: t({
          [Locales.ENGLISH_UNITED_STATES]: "Vocational Training",
          [Locales.GERMAN_GERMANY]: "Berufsausbildung",
        }),
        fachabitur: t({
          [Locales.ENGLISH_UNITED_STATES]: "Technical Diploma",
          [Locales.GERMAN_GERMANY]: "Fachhochschulreife",
        }),
        batchlor_of_science: t({
          [Locales.ENGLISH_UNITED_STATES]: "Bachelor of Science",
          [Locales.GERMAN_GERMANY]: "Bachelor of Science",
        }),
        studies: t({
          [Locales.ENGLISH_UNITED_STATES]: "University Studies",
          [Locales.GERMAN_GERMANY]: "Studium",
        }),
        it: t({
          [Locales.ENGLISH_UNITED_STATES]: "Computer Science",
          [Locales.GERMAN_GERMANY]: "Informatik",
        }),
        msaMitOG: t({
          [Locales.ENGLISH_UNITED_STATES]:
            "Secondary School Certificate (College Prep)",
          [Locales.GERMAN_GERMANY]:
            "MSA mit Berechtigung zum Übergang in die gymnasiale Oberstufe",
        }),
      },
      items: {
        tuberlin: {
          name: t({
            [Locales.ENGLISH_UNITED_STATES]: "Technical University of Berlin",
            [Locales.GERMAN_GERMANY]: "Technische Universität Berlin",
          }),
          imgAlt: t({
            [Locales.ENGLISH_UNITED_STATES]:
              "Technical University of Berlin Logo",
            [Locales.GERMAN_GERMANY]: "Logo der Technischen Universität Berlin",
          }),
          description: t({
            [Locales.ENGLISH_UNITED_STATES]:
              "Bachelor of Science in Computer Science – Focus areas: Algorithms, Data Structures, Software Engineering",
            [Locales.GERMAN_GERMANY]:
              "Informatik-Studium (B.Sc.) – Schwerpunkte: Algorithmen, Datenstrukturen, Softwareentwicklung",
          }),
          badges: t({
            [Locales.ENGLISH_UNITED_STATES]: [
              "Berlin",
              "Bachelor of Science",
              "Computer Science",
            ],
            [Locales.GERMAN_GERMANY]: [
              "Berlin",
              "Bachelor of Science",
              "Informatik",
            ],
          }),
        },
        lookingForApprenticeship: {
          name: t({
            [Locales.ENGLISH_UNITED_STATES]: "Gap Year",
            [Locales.GERMAN_GERMANY]: "Überbrückungsjahr",
          }),
          imgAlt: t({
            [Locales.ENGLISH_UNITED_STATES]: "Actively Seeking Position",
            [Locales.GERMAN_GERMANY]: "Aktiv auf Stellensuche",
          }),
          description: t({
            [Locales.ENGLISH_UNITED_STATES]:
              "I spent this period actively seeking an apprenticeship as an IT Specialist for Application Development or a dual studies programs in the field of Computer Science while continuing my personal coding projects.",
            [Locales.GERMAN_GERMANY]:
              "Ich habe in dieser Zeit aktiv nach einem Ausbildungsplatz als Fachinformatiker für Anwendungsentwicklung oder ein Duales Studiium im Bereich Informatik gesucht und meine persönlichen Programmierprojekte weitergeführt.",
          }),
        },
        oszimt: {
          name: t({
            [Locales.ENGLISH_UNITED_STATES]:
              "Berlin Technical College for IT and Medical Technology",
            [Locales.GERMAN_GERMANY]:
              "OSZ Informations- und Medizintechnik Berlin",
          }),
          imgAlt: t({
            [Locales.ENGLISH_UNITED_STATES]: "OSZ IMT Berlin Logo",
            [Locales.GERMAN_GERMANY]: "Logo des OSZ IMT Berlin",
          }),
          description: t({
            [Locales.ENGLISH_UNITED_STATES]:
              "Dual qualification: Certified IT Assistant with Technical Diploma. Core competencies: Software Development (Java), Network Administration (Cisco), Database Management (MySQL)",
            [Locales.GERMAN_GERMANY]:
              "Doppelqualifizierende Berufsausbildung: Staatlich geprüfter IT-Assistent mit Fachhochschulreife. Schwerpunkte: Softwareentwicklung (Java), Netzwerktechnik (Cisco), Datenbanken (MySQL)",
          }),
          badges: t({
            [Locales.ENGLISH_UNITED_STATES]: [
              "Berlin",
              "Vocational Training",
              "Technical Diploma",
              "Computer Science",
            ],
            [Locales.GERMAN_GERMANY]: [
              "Berlin",
              "Berufsausbildung",
              "Fachhochschulreife",
              "Informatik",
            ],
          }),
        },
        cvl: {
          name: t({
            [Locales.ENGLISH_UNITED_STATES]: "Carl-von-Linné-School Berlin",
            [Locales.GERMAN_GERMANY]: "Carl-von-Linné-Schule Berlin",
          }),
          imgAlt: t({
            [Locales.ENGLISH_UNITED_STATES]: "Carl-von-Linné-School Logo",
            [Locales.GERMAN_GERMANY]: "Logo der Carl-von-Linné-Schule",
          }),
          description: t({
            [Locales.ENGLISH_UNITED_STATES]:
              "Secondary School Certificate with qualification for advanced secondary education",
            [Locales.GERMAN_GERMANY]:
              "Mittlerer Schulabschluss (MSA) mit Berechtigung zum Übergang in die gymnasiale Oberstufe",
          }),
          badges: t({
            [Locales.ENGLISH_UNITED_STATES]: [
              "Berlin",
              "Secondary School Certificate (College Prep)",
            ],
            [Locales.GERMAN_GERMANY]: [
              "Berlin",
              "MSA mit Berechtigung zur gymnasialen Oberstufe",
            ],
          }),
        },
      },
    },
    experience: {
      title: t({
        [Locales.ENGLISH_UNITED_STATES]: "Professional Experience",
        [Locales.GERMAN_GERMANY]: "Berufserfahrung",
      }),
      items: {
        kfw: {
          name: t({
            [Locales.ENGLISH_UNITED_STATES]:
              "KfW Banking Group – IT Department",
            [Locales.GERMAN_GERMANY]: "KfW Bankengruppe – IT-Abteilung",
          }),
          imgAlt: t({
            [Locales.ENGLISH_UNITED_STATES]: "KfW Banking Group Logo",
            [Locales.GERMAN_GERMANY]: "Logo der KfW Bankengruppe",
          }),
          description: t({
            [Locales.ENGLISH_UNITED_STATES]:
              "• Developed and implemented automation scripts using Ansible to streamline IT operations\n• Created technical documentation in Confluence for knowledge management\n• Collaborated with IT team to improve infrastructure processes",
            [Locales.GERMAN_GERMANY]:
              "• Entwickelte und implementierte Automatisierungsskripte mit Ansible zur Optimierung von IT-Prozessen\n• Erstellte technische Dokumentation in Confluence für nachhaltige Wissenssicherung\n• Arbeitete im Team zur Verbesserung der IT-Infrastruktur",
          }),
          badges: t({
            [Locales.ENGLISH_UNITED_STATES]: [
              "Berlin",
              "IT Internship",
              "Ansible",
              "Automation",
              "Confluence",
            ],
            [Locales.GERMAN_GERMANY]: [
              "Berlin",
              "IT-Praktikum",
              "Ansible",
              "Automatisierung",
              "Confluence",
            ],
          }),
        },
        adk: {
          name: t({
            [Locales.ENGLISH_UNITED_STATES]: "Academy of Arts Berlin",
            [Locales.GERMAN_GERMANY]: "Akademie der Künste Berlin",
          }),
          imgAlt: t({
            [Locales.ENGLISH_UNITED_STATES]: "Academy of Arts Logo",
            [Locales.GERMAN_GERMANY]: "Logo der Akademie der Künste",
          }),
          description: t({
            [Locales.ENGLISH_UNITED_STATES]:
              "• Assisted in digital synthesizer software development\n• Gained experience at the intersection of technology and creative arts",
            [Locales.GERMAN_GERMANY]:
              "• Unterstützte bei der Entwicklung digitaler Synthesizer-Software\n• Sammelte Erfahrung an der Schnittstelle von Technologie und Kreativität",
          }),
          badges: t({
            [Locales.ENGLISH_UNITED_STATES]: [
              "Berlin",
              "Software Development",
              "Music Technology",
              "Student Internship",
            ],
            [Locales.GERMAN_GERMANY]: [
              "Berlin",
              "Softwareentwicklung",
              "Musik",
              "Schülerpraktikum",
            ],
          }),
        },
        tosa: {
          name: t({
            [Locales.ENGLISH_UNITED_STATES]:
              "Tosa Security & Service GmbH & Co KG",
            [Locales.GERMAN_GERMANY]: "Tosa Security & Service GmbH & Co KG",
          }),
          imgAlt: t({
            [Locales.ENGLISH_UNITED_STATES]: "Tosa Security & Service Logo",
            [Locales.GERMAN_GERMANY]: "Logo der Tosa Security & Service GmbH",
          }),
          description: t({
            [Locales.ENGLISH_UNITED_STATES]:
              "• Handled administrative tasks and office organization\n• Developed understanding of business operations",
            [Locales.GERMAN_GERMANY]:
              "• Übernahm administrative Aufgaben und Büroorganisation\n• Erlernte Grundlagen der Unternehmensabläufe",
          }),
          badges: t({
            [Locales.ENGLISH_UNITED_STATES]: [
              "Trebbin",
              "Office Administration",
              "Student Internship",
            ],
            [Locales.GERMAN_GERMANY]: [
              "Trebbin",
              "Büroorganisation",
              "Schülerpraktikum",
            ],
          }),
        },
        pfennig: {
          name: t({
            [Locales.ENGLISH_UNITED_STATES]: "Pfennigpfeiffer Retail GmbH",
            [Locales.GERMAN_GERMANY]: "Pfennigpfeiffer Handels GmbH",
          }),
          imgAlt: t({
            [Locales.ENGLISH_UNITED_STATES]: "Pfennigpfeiffer Logo",
            [Locales.GERMAN_GERMANY]: "Logo von Pfennigpfeiffer",
          }),
          description: t({
            [Locales.ENGLISH_UNITED_STATES]:
              "• First work experience in retail: Product merchandising and customer service",
            [Locales.GERMAN_GERMANY]:
              "• Erste Berufserfahrung im Einzelhandel: Warenpräsentation und Kundenservice",
          }),
          badges: t({
            [Locales.ENGLISH_UNITED_STATES]: [
              "Berlin",
              "Retail",
              "Student Internship",
            ],
            [Locales.GERMAN_GERMANY]: [
              "Berlin",
              "Einzelhandel",
              "Schülerpraktikum",
            ],
          }),
        },
      },
    },
    skills: {
      title: t({
        [Locales.ENGLISH_UNITED_STATES]: "Skills & Abilities",
        [Locales.GERMAN_GERMANY]: "Kenntnisse & Fähigkeiten",
      }),
      badges: {
        development: t({
          [Locales.ENGLISH_UNITED_STATES]: "Software Development",
          [Locales.GERMAN_GERMANY]: "Softwareentwicklung",
        }),
        configuration: t({
          [Locales.ENGLISH_UNITED_STATES]: "System Configuration",
          [Locales.GERMAN_GERMANY]: "Systemkonfiguration",
        }),
        operatingSystem: t({
          [Locales.ENGLISH_UNITED_STATES]: "Operating System",
          [Locales.GERMAN_GERMANY]: "Betriebssystem",
        }),
        frontend: t({
          [Locales.ENGLISH_UNITED_STATES]: "Frontend Development",
          [Locales.GERMAN_GERMANY]: "Frontend-Entwicklung",
        }),
        automation: t({
          [Locales.ENGLISH_UNITED_STATES]: "IT Automation",
          [Locales.GERMAN_GERMANY]: "IT-Automatisierung",
        }),
        office: t({
          [Locales.ENGLISH_UNITED_STATES]: "Office Applications",
          [Locales.GERMAN_GERMANY]: "Office-Anwendungen",
        }),
        textEditor: t({
          [Locales.ENGLISH_UNITED_STATES]: "Text Editor",
          [Locales.GERMAN_GERMANY]: "Text-Editor",
        }),
        multifunctional: t({
          [Locales.ENGLISH_UNITED_STATES]: "Multifunctional",
          [Locales.GERMAN_GERMANY]: "Multifunktional",
        }),
        retail: t({
          [Locales.ENGLISH_UNITED_STATES]: "Retail",
          [Locales.GERMAN_GERMANY]: "Einzelhandel",
        }),
        language: t({
          [Locales.ENGLISH_UNITED_STATES]: "Language",
          [Locales.GERMAN_GERMANY]: "Sprache",
        }),
        native: t({
          [Locales.ENGLISH_UNITED_STATES]: "Native Speaker",
          [Locales.GERMAN_GERMANY]: "Muttersprache",
        }),
      },
      categories: {
        languages: {
          title: t({
            [Locales.ENGLISH_UNITED_STATES]: "Languages",
            [Locales.GERMAN_GERMANY]: "Sprachen",
          }),
        },
        programming: {
          title: t({
            [Locales.ENGLISH_UNITED_STATES]: "Programming Languages",
            [Locales.GERMAN_GERMANY]: "Programmiersprachen",
          }),
        },
        databases: {
          title: t({
            [Locales.ENGLISH_UNITED_STATES]: "Databases",
            [Locales.GERMAN_GERMANY]: "Datenbanken",
          }),
        },
        automation: {
          title: t({
            [Locales.ENGLISH_UNITED_STATES]: "Automation & DevOps",
            [Locales.GERMAN_GERMANY]: "Automatisierung & DevOps",
          }),
        },
        operatingSystems: {
          title: t({
            [Locales.ENGLISH_UNITED_STATES]: "Operating Systems",
            [Locales.GERMAN_GERMANY]: "Betriebssysteme",
          }),
        },
        networking: {
          title: t({
            [Locales.ENGLISH_UNITED_STATES]: "Networking",
            [Locales.GERMAN_GERMANY]: "Netzwerk",
          }),
        },
        devEnvironments: {
          title: t({
            [Locales.ENGLISH_UNITED_STATES]: "Development Environments",
            [Locales.GERMAN_GERMANY]: "Entwicklungsumgebungen",
          }),
        },
        office: {
          title: t({
            [Locales.ENGLISH_UNITED_STATES]: "Office & Collaboration",
            [Locales.GERMAN_GERMANY]: "Office & Kollaboration",
          }),
        },
      },
    },
    durationKeys: {
      years: t({
        [Locales.ENGLISH_UNITED_STATES]: "{count} Years",
        [Locales.GERMAN_GERMANY]: "{count} Jahre",
      }),
      year: t({
        [Locales.ENGLISH_UNITED_STATES]: "{count} Year",
        [Locales.GERMAN_GERMANY]: "{count} Jahr",
      }),
      semesters: t({
        [Locales.ENGLISH_UNITED_STATES]: "{count} Semesters",
        [Locales.GERMAN_GERMANY]: "{count} Semester",
      }),
      semester: t({
        [Locales.ENGLISH_UNITED_STATES]: "{count} Semester",
        [Locales.GERMAN_GERMANY]: "{count} Semester",
      }),
      quarters: t({
        [Locales.ENGLISH_UNITED_STATES]: "{count} Quarters",
        [Locales.GERMAN_GERMANY]: "{count} Quartale",
      }),
      quarter: t({
        [Locales.ENGLISH_UNITED_STATES]: "{count} Quarter",
        [Locales.GERMAN_GERMANY]: "{count} Quartal",
      }),
      months: t({
        [Locales.ENGLISH_UNITED_STATES]: "{count} Months",
        [Locales.GERMAN_GERMANY]: "{count} Monate",
      }),
      month: t({
        [Locales.ENGLISH_UNITED_STATES]: "{count} Month",
        [Locales.GERMAN_GERMANY]: "{count} Monat",
      }),
      weeks: t({
        [Locales.ENGLISH_UNITED_STATES]: "{count} Weeks",
        [Locales.GERMAN_GERMANY]: "{count} Wochen",
      }),
      week: t({
        [Locales.ENGLISH_UNITED_STATES]: "{count} Week",
        [Locales.GERMAN_GERMANY]: "{count} Woche",
      }),
      days: t({
        [Locales.ENGLISH_UNITED_STATES]: "{count} Days",
        [Locales.GERMAN_GERMANY]: "{count} Tage",
      }),
      day: t({
        [Locales.ENGLISH_UNITED_STATES]: "{count} Day",
        [Locales.GERMAN_GERMANY]: "{count} Tag",
      }),
    },
  },
} satisfies Dictionary;

export default cvContent;
