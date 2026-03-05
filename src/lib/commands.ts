import { resumeData } from "@/data/resumeData";

const GREEN = "\x1b[32m";
const BRIGHT_GREEN = "\x1b[92m";
const CYAN = "\x1b[36m";
const YELLOW = "\x1b[33m";
const WHITE = "\x1b[97m";
const DIM = "\x1b[2m";
const BOLD = "\x1b[1m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const asciiLogo = [
  "        .--.        ",
  "       |o_o |       ",
  "       |:_/ |       ",
  "      //   \\ \\      ",
  "     (|     | )     ",
  "    /'\\_   _/`\\     ",
  "    \\___)=(___/     ",
];

export function getWelcomeBanner(): string {
  const lines = [
    "",
    `${BRIGHT_GREEN}${BOLD}  ╔════════════════════════════════════════════════╗${RESET}`,
    `${BRIGHT_GREEN}${BOLD}  ║                                                ║${RESET}`,
    `${BRIGHT_GREEN}${BOLD}  ║   ██████╗ ██╗███╗   ███╗██╗    ██╗  ██╗        ║${RESET}`,
    `${BRIGHT_GREEN}${BOLD}  ║   ██╔══██╗██║████╗ ████║██║    ██║ ██╔╝        ║${RESET}`,
    `${BRIGHT_GREEN}${BOLD}  ║   ██║  ██║██║██╔████╔██║██║    █████╔╝         ║${RESET}`,
    `${BRIGHT_GREEN}${BOLD}  ║   ██║  ██║██║██║╚██╔╝██║██║    ██╔═██╗         ║${RESET}`,
    `${BRIGHT_GREEN}${BOLD}  ║   ██████╔╝██║██║ ╚═╝ ██║██║    ██║  ██╗        ║${RESET}`,
    `${BRIGHT_GREEN}${BOLD}  ║   ╚═════╝ ╚═╝╚═╝     ╚═╝╚═╝    ╚═╝  ╚═╝        ║${RESET}`,
    `${BRIGHT_GREEN}${BOLD}  ║                                                ║${RESET}`,
    `${BRIGHT_GREEN}${BOLD}  ║     ${WHITE}Cybersecurity & Networks Student${RESET}${BRIGHT_GREEN}${BOLD}           ║${RESET}`,
    `${BRIGHT_GREEN}${BOLD}  ╚════════════════════════════════════════════════╝${RESET}`,
    "",
    `${DIM}  Welcome to ${GREEN}${resumeData.name}${RESET}${DIM}'s interactive resume terminal.${RESET}`,
    `${DIM}  Type '${GREEN}help${RESET}${DIM}' to see available commands.${RESET}`,
    "",
  ];
  return lines.join("\r\n");
}

export function getPrompt(): string {
  return `${GREEN}${resumeData.username}@${resumeData.hostname}${RESET}:${CYAN}~${RESET}$ `;
}

export function processCommand(input: string, history: string[]): string {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return "";

  switch (trimmed) {
    case "help":
      return cmdHelp();
    case "about":
      return cmdAbout();
    case "name":
      return cmdName();
    case "skills":
      return cmdSkills();
    case "education":
      return cmdEducation();
    case "contact":
      return cmdContact();
    case "experience":
      return cmdExperience();
    case "projects":
      return cmdProjects();
    case "neofetch":
      return cmdNeofetch();
    case "history":
      return cmdHistory(history);
    case "clear":
      return "__CLEAR__";
    case "whoami":
      return `${GREEN}${resumeData.username}${RESET}`;
    case "pwd":
      return `/home/${resumeData.username}`;
    case "ls":
      return `${CYAN}about.txt  skills.md  education.txt  projects/  contact.txt  resume.pdf${RESET}`;
    case "date":
      return new Date().toString();
    case "uname":
    case "uname -a":
      return `Linux ${resumeData.hostname} 5.15.0-portfolio #1 SMP x86_64 GNU/Linux`;
    case "cat resume.pdf":
      return `${DIM}Opening resume PDF...${RESET}\r\n${YELLOW}Download: ${CYAN}/resume.pdf${RESET}`;
    default:
      return `${RED}${trimmed}${RESET}: command not found. Type '${GREEN}help${RESET}' for available commands.`;
  }
}

function cmdHelp(): string {
  const cmds = [
    ["about",      "Display bio and summary"],
    ["name",       "Show full name and title"],
    ["skills",     "List technical skills"],
    ["education",  "Show education history"],
    ["experience", "Show work experience"],
    ["contact",    "Display contact information"],
    ["projects",   "Show notable projects"],
    ["neofetch",   "Display system-style summary"],
    ["history",    "Show command history"],
    ["clear",      "Clear the terminal"],
    ["help",       "Show this help message"],
  ];

  const lines = [
    "",
    `${BOLD}${BRIGHT_GREEN}Available Commands:${RESET}`,
    "",
    ...cmds.map(([cmd, desc]) => `  ${GREEN}${cmd.padEnd(14)}${RESET}${DIM}${desc}${RESET}`),
    "",
    `${DIM}Also try: whoami, pwd, ls, date, uname${RESET}`,
    "",
  ];
  return lines.join("\r\n");
}

function cmdAbout(): string {
  const lines = [
    "",
    `${BOLD}${BRIGHT_GREEN}About Me${RESET}`,
    `${DIM}${"─".repeat(60)}${RESET}`,
    ...resumeData.about.map(l => `  ${WHITE}${l}${RESET}`),
    "",
  ];
  return lines.join("\r\n");
}

function cmdName(): string {
  return [
    "",
    `${BOLD}${BRIGHT_GREEN}  ${resumeData.name}${RESET}`,
    `${DIM}  ${resumeData.title}${RESET}`,
    "",
  ].join("\r\n");
}

function cmdSkills(): string {
  const lines = [
    "",
    `${BOLD}${BRIGHT_GREEN}Technical Skills${RESET}`,
    `${DIM}${"─".repeat(60)}${RESET}`,
  ];
  for (const [category, skills] of Object.entries(resumeData.skills)) {
    lines.push(`  ${YELLOW}${category.padEnd(16)}${RESET}${WHITE}${(skills as string[]).join(", ")}${RESET}`);
  }
  lines.push("");
  return lines.join("\r\n");
}

function cmdEducation(): string {
  const lines = [
    "",
    `${BOLD}${BRIGHT_GREEN}Education${RESET}`,
    `${DIM}${"─".repeat(60)}${RESET}`,
  ];
  for (const edu of resumeData.education) {
    lines.push(`  ${CYAN}${edu.degree}${RESET}`);
    lines.push(`  ${WHITE}${edu.school}${RESET} ${DIM}(${edu.year})${RESET}`);
    lines.push(`  ${DIM}${edu.details}${RESET}`);
    lines.push("");
  }
  return lines.join("\r\n");
}

function cmdExperience(): string {
  const lines = [
    "",
    `${BOLD}${BRIGHT_GREEN}Experience${RESET}`,
    `${DIM}${"─".repeat(60)}${RESET}`,
  ];
  for (const exp of resumeData.experience) {
    lines.push(`  ${CYAN}${exp.role}${RESET} ${DIM}(${exp.period})${RESET}`);
    for (const d of exp.details) {
      lines.push(`  ${DIM}•${RESET} ${WHITE}${d}${RESET}`);
    }
    lines.push("");
  }
  return lines.join("\r\n");
}

function cmdContact(): string {
  const c = resumeData.contact;
  const lines = [
    "",
    `${BOLD}${BRIGHT_GREEN}Contact Information${RESET}`,
    `${DIM}${"─".repeat(40)}${RESET}`,
    `  ${YELLOW}Email     ${RESET}${WHITE}\x1b]8;;mailto:${c.email}\x07${c.email}\x1b]8;;\x07${RESET}`,
    `  ${YELLOW}GitHub    ${RESET}${CYAN}\x1b]8;;${c.github}\x07${c.github}\x1b]8;;\x07${RESET}`,
    `  ${YELLOW}LinkedIn  ${RESET}${CYAN}\x1b]8;;${c.linkedin}\x07${c.linkedin}\x1b]8;;\x07${RESET}`,
    `  ${YELLOW}Location  ${RESET}${WHITE}${c.location}${RESET}`,
    "",
  ];
  return lines.join("\r\n");
}

function cmdProjects(): string {
  const lines = [
    "",
    `${BOLD}${BRIGHT_GREEN}Projects${RESET}`,
    `${DIM}${"─".repeat(60)}${RESET}`,
  ];
  for (const p of resumeData.projects) {
    lines.push(`  ${CYAN}${BOLD}${p.name}${RESET}`);
    lines.push(`  ${WHITE}${p.description}${RESET}`);
    lines.push(`  ${DIM}Tech: ${p.tech}${RESET}`);
    if (p.details.length > 0) {
      for (const d of p.details) {
        lines.push(`  ${DIM}•${RESET} ${WHITE}${d}${RESET}`);
      }
    }
    lines.push("");
  }
  return lines.join("\r\n");
}

function cmdNeofetch(): string {
  const info = resumeData.neofetch;
  const infoLines = [
    `${BOLD}${GREEN}${resumeData.username}${RESET}@${BOLD}${GREEN}${resumeData.hostname}${RESET}`,
    `${DIM}${"─".repeat(25)}${RESET}`,
    `${YELLOW}OS${RESET}:         ${WHITE}${info.os}${RESET}`,
    `${YELLOW}Host${RESET}:       ${WHITE}${info.host}${RESET}`,
    `${YELLOW}Kernel${RESET}:     ${WHITE}${info.kernel}${RESET}`,
    `${YELLOW}Uptime${RESET}:     ${WHITE}${info.uptime}${RESET}`,
    `${YELLOW}Packages${RESET}:   ${WHITE}${info.packages}${RESET}`,
    `${YELLOW}Shell${RESET}:      ${WHITE}${info.shell}${RESET}`,
  ];

  const combined: string[] = [""];
  const maxLines = Math.max(asciiLogo.length, infoLines.length);
  for (let i = 0; i < maxLines; i++) {
    const art = i < asciiLogo.length ? `${GREEN}${asciiLogo[i]}${RESET}` : " ".repeat(20);
    const inf = i < infoLines.length ? infoLines[i] : "";
    combined.push(`  ${art}   ${inf}`);
  }
  combined.push("");
  return combined.join("\r\n");
}

function cmdHistory(history: string[]): string {
  if (history.length === 0) return `${DIM}No commands in history.${RESET}`;
  const lines = history.map((cmd, i) => `  ${DIM}${String(i + 1).padStart(4)}${RESET}  ${cmd}`);
  return ["", ...lines, ""].join("\r\n");
}
