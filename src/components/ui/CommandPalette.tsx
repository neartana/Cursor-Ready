import { useState, useEffect, useRef } from "react";
import { Button } from "./primitives";
import { Search, FileText, Terminal, Layout, Users, Home } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

interface Command {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  group: string;
}

export function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    {
      id: "home",
      label: "Go to Home",
      icon: <Home size={16} strokeWidth={1.5} />,
      action: () => { onNavigate("home"); onClose(); },
      group: "Navigation",
    },
    {
      id: "workspace",
      label: "Open Workspace",
      icon: <Terminal size={16} strokeWidth={1.5} />,
      action: () => { onNavigate("workspace"); onClose(); },
      group: "Navigation",
    },
    {
      id: "dashboard",
      label: "Go to Dashboard",
      icon: <Layout size={16} strokeWidth={1.5} />,
      action: () => { onNavigate("dashboard"); onClose(); },
      group: "Navigation",
    },
    {
      id: "community",
      label: "Browse Community",
      icon: <Users size={16} strokeWidth={1.5} />,
      action: () => { onNavigate("community"); onClose(); },
      group: "Navigation",
    },
    {
      id: "new-project",
      label: "New Project",
      icon: <FileText size={16} strokeWidth={1.5} />,
      action: () => { onNavigate("workspace"); onClose(); },
      group: "Actions",
    },
    {
      id: "export",
      label: "Export Cursor Pack",
      icon: <FileText size={16} strokeWidth={1.5} />,
      action: () => { onNavigate("workspace"); onClose(); },
      group: "Actions",
    },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const groups = [...new Set(filtered.map((c) => c.group))];

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/20"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Palette */}
      <div className="relative w-full max-w-lg border-2 border-ink bg-paper shadow-[4px_4px_0_0_#111]">
        {/* Search input */}
        <div className="flex items-center gap-3 p-4 border-b-2 border-ink">
          <Search size={18} strokeWidth={1.5} className="text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command..."
            className="flex-1 bg-transparent font-mono text-sm focus:outline-none placeholder:text-neutral-400"
          />
          <kbd className="font-mono text-[10px] border border-muted px-1.5 py-0.5 text-neutral-400">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {groups.map((group) => (
            <div key={group} className="mb-2">
              <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 px-3 py-1">
                {group}
              </div>
              {filtered
                .filter((c) => c.group === group)
                .map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={cmd.action}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    <span className="text-neutral-500">{cmd.icon}</span>
                    <span className="font-sans text-sm">{cmd.label}</span>
                  </button>
                ))}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-8">
              <p className="font-mono text-xs text-neutral-400">No commands found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-muted px-4 py-2 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
            Cursor Ready
          </span>
          <span className="font-mono text-[9px] text-neutral-400">
            ↑↓ navigate · ↵ select
          </span>
        </div>
      </div>
    </div>
  );
}
