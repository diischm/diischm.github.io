import { useEffect, useRef } from "react";
import { Terminal as XTerminal } from "xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import "xterm/css/xterm.css";
import { getWelcomeBanner, getPrompt, processCommand } from "@/lib/commands";

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerminal | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerminal({
      cursorBlink: true,
      cursorStyle: "block",
      fontSize: 15,
      fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
      theme: {
        background: "#0a0a0a",
        foreground: "#00ff41",
        cursor: "#00ff41",
        cursorAccent: "#0a0a0a",
        selectionBackground: "#00ff4133",
        black: "#0a0a0a",
        green: "#00ff41",
        brightGreen: "#39ff14",
        cyan: "#00d4ff",
        brightCyan: "#00e5ff",
        yellow: "#ffd700",
        brightYellow: "#ffea00",
        white: "#e0e0e0",
        brightWhite: "#ffffff",
        red: "#ff3333",
        brightRed: "#ff5555",
        blue: "#4488ff",
        brightBlue: "#5599ff",
        magenta: "#ff44ff",
        brightMagenta: "#ff77ff",
      },
      allowTransparency: true,
      scrollback: 1000,
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);
    term.open(terminalRef.current);

    // Small delay to ensure DOM is ready
    setTimeout(() => fitAddon.fit(), 50);

    xtermRef.current = term;

    // State
    let currentLine = "";
    const commandHistory: string[] = [];
    let historyIndex = -1;

    // Write welcome banner
    term.write(getWelcomeBanner());
    term.write(getPrompt());

    // Handle input
    term.onKey(({ key, domEvent }) => {
      const code = domEvent.keyCode;
      const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

      // Enter
      if (code === 13) {
        term.write("\r\n");
        if (currentLine.trim()) {
          commandHistory.push(currentLine.trim());
          const output = processCommand(currentLine, commandHistory);
          if (output === "__CLEAR__") {
            term.clear();
            term.write(getPrompt());
          } else {
            if (output) term.write(output + "\r\n");
            term.write(getPrompt());
          }
        } else {
          term.write(getPrompt());
        }
        currentLine = "";
        historyIndex = -1;
        return;
      }

      // Backspace
      if (code === 8) {
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          term.write("\b \b");
        }
        return;
      }

      // Up arrow
      if (code === 38) {
        if (commandHistory.length > 0) {
          if (historyIndex === -1) historyIndex = commandHistory.length;
          if (historyIndex > 0) {
            historyIndex--;
            // Clear current line
            while (currentLine.length > 0) {
              term.write("\b \b");
              currentLine = currentLine.slice(0, -1);
            }
            currentLine = commandHistory[historyIndex];
            term.write(currentLine);
          }
        }
        return;
      }

      // Down arrow
      if (code === 40) {
        if (historyIndex !== -1) {
          // Clear current line
          while (currentLine.length > 0) {
            term.write("\b \b");
            currentLine = currentLine.slice(0, -1);
          }
          historyIndex++;
          if (historyIndex < commandHistory.length) {
            currentLine = commandHistory[historyIndex];
            term.write(currentLine);
          } else {
            historyIndex = -1;
            currentLine = "";
          }
        }
        return;
      }

      // Tab (autocomplete)
      if (code === 9) {
        domEvent.preventDefault();
        const cmds = ["help", "about", "name", "skills", "education", "contact", "projects", "neofetch", "history", "clear", "whoami", "pwd", "ls", "date", "uname"];
        const matches = cmds.filter(c => c.startsWith(currentLine));
        if (matches.length === 1) {
          const rest = matches[0].slice(currentLine.length);
          currentLine += rest;
          term.write(rest);
        }
        return;
      }

      // Ctrl+C
      if (domEvent.ctrlKey && code === 67) {
        term.write("^C\r\n");
        currentLine = "";
        term.write(getPrompt());
        return;
      }

      // Ctrl+L (clear)
      if (domEvent.ctrlKey && code === 76) {
        term.clear();
        currentLine = "";
        term.write(getPrompt());
        return;
      }

      // Printable characters
      if (printable && key.length === 1) {
        currentLine += key;
        term.write(key);
      }
    });

    // Handle paste
    term.onData((data) => {
      // Only handle paste (multi-char data that isn't from onKey)
      if (data.length > 1 && !data.startsWith("\x1b")) {
        currentLine += data;
        term.write(data);
      }
    });

    // Resize handler
    const handleResize = () => {
      try {
        fitAddon.fit();
      } catch {
        // ignore fit errors during unmount
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      term.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Ubuntu-style title bar */}
      <div
        className="flex items-center px-4 py-2 select-none"
        style={{ backgroundColor: "#1a1a1a", borderBottom: "1px solid #333" }}
      >
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff5f56" }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ffbd2e" }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#27c93f" }} />
        </div>
        <span
          className="text-sm font-mono flex-1 text-center"
          style={{ color: "#888" }}
        >
          diischm@portfolio: ~
        </span>
      </div>

      {/* Terminal area */}
      <div ref={terminalRef} className="flex-1 p-1" style={{ backgroundColor: "#0a0a0a" }} />
    </div>
  );
};

export default Terminal;
