export const resumeData = {
  name: "Dimitar Karadjovski",
  title: "Cybersecurity & Networks Student",
  username: "diischm",
  hostname: "portfolio",

  about: [
    "Computer Science student specializing in Internet, Networks and Security,",
    "with hands-on experience in Linux environments, network monitoring, and",
    "cybersecurity projects. Built security tools and home labs, actively",
    "developing skills in detection, automation, system hardening and system",
    "administration.",
  ],

  skills: {
    "OS & Envs":       ["Ubuntu Linux", "Ubuntu Server", "Kali Linux", "Windows", "VMware"],
    "Cybersecurity":   ["TCP/IP", "Log Analysis", "Threat Detection", "IDS", "Red/Blue Team", "Port Scanning"],
    "Sys Admin":       ["Linux Hardening", "UFW", "Fail2Ban", "SSH", "Nginx", "systemctl"],
    "Programming":     ["Python", "C++", "Java", "Bash"],
    "Tools":           ["Wireshark", "Nmap", "Suricata", "Git", "GitHub Actions", "Tailscale"],
    "Languages":       ["Macedonian (native)", "English (fluent)"],
  },

  education: [
    {
      degree: "B.Sc. Computer Science – Internet, Networks & Security",
      school: "Faculty of Computer Science and Engineering",
      year: "2023 – Present",
      details: "Networks, cybersecurity principles, system security, safe data handling & sysadmin",
    },
  ],

  contact: {
    email: "dimitarkaradjovski@gmail.com",
    github: "https://github.com/diischm",
    linkedin: "https://www.linkedin.com/in/dimitar-karadjovski-55b4a3355/",
    location: "Skopje, North Macedonia",
  },

  experience: [
    {
      role: "Freelance Creative Work",
      period: "2022 – 2025",
      details: [
        "Worked with clients, managed deadlines, delivered technical creative projects",
        "Developed communication, documentation, and problem-solving skills",
      ],
    },
  ],

  projects: [
    {
      name: "Linux Server Home Lab",
      description: "Secure Game Server & Network Infrastructure",
      tech: "Ubuntu Server, Tailscale, UFW, Fail2Ban, Nginx, SSH",
      details: [
        "Optimized a low-end Linux system into a stable server, achieving massive RAM and CPU efficiency improvements",
        "Tuned Java-based game server workloads for reliable, lag-free multi-user performance",
        "Configured port forwarding and NAT to enable external connectivity while isolating administrative access",
        "Implemented a secure remote access model using Tailscale; disabled public SSH and enforced SSH key-only authentication",
        "Hardened the system with UFW, Fail2Ban, restricted port exposure and Nginx reverse proxy",
        "Applied production-style security and networking practices in a resource-constrained environment",
        "Designed a public vs private traffic separation, exposing only required services while keeping management interfaces on a private overlay network",
        "Built a web-based file manager and service dashboard, secured behind authenticated access",
      ],
    },
    {
      name: "CTF – Red vs Blue Team Competition",
      description: "Faculty of Computer Science and Engineering – Cybersecurity course",
      tech: "Suricata, Fail2Ban, NFS, WordPress exploitation, Linux logs",
      details: [
        "Participated in a Red vs Blue cybersecurity competition involving 22 machines",
        "Successfully compromised 21/22 systems and captured flags while following competition rules",
        "Service enumeration, exploitation and post-exploitation",
        "Identified and exploited vulnerabilities in open ports, NFS services and WordPress deployments",
        "Used compromised systems as pivot points to bypass network restrictions",
        "Log monitoring and intrusion detection using Suricata and Linux logs",
        "Assisted in securing systems through port hardening, monitoring and Fail2Ban usage",
        "Contributed to our team achieving 1st place",
      ],
    },
    {
      name: "CTF Log Pager",
      description: "Security monitoring tool for Suricata and auth.log parsing",
      tech: "Python, Discord Webhooks, Suricata",
      details: [
        "Built a Python-based security monitoring tool to parse Suricata and auth.log files",
        "Implemented detection of suspicious authentication attempts and network events",
        "Built a real-time alerting system using Discord webhooks",
        "Automated log processing to improve incident visibility",
        "Strengthened practical understanding of intrusion detection, log analysis and security alerting",
      ],
    },
    {
      name: "Server Status Monitor",
      description: "Automated server monitoring with scheduled checks and real-time alerts",
      tech: "Python, Bash, cron",
      details: [
        "Created an automated server monitoring script with scheduled availability checks and real-time alerting",
        "Supporting system uptime monitoring and operational reliability",
      ],
    },
    {
      name: "TCP Port Checker",
      description: "Python-based TCP port scanning tool for open port detection",
      tech: "Python, socket, networking",
      details: [
        "Developed a Python-based TCP port scanning tool to detect open ports",
        "Applied networking fundamentals, socket communication, and basic security assessment",
      ],
    },
  ],

  neofetch: {
    os: "Ubuntu 24.04 LTS",
    host: "Portfolio Terminal",
    kernel: "Cybersecurity & Networks",
    uptime: "Third year student in cybersecurity",
    packages: "5 projects deployed",
    shell: "bash 5.1",
  },
};
