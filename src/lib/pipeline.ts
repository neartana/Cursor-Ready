/**
 * CURSOR READY — Pipeline Step Definitions
 */

export interface PipelineStep {
  id: number;
  key: string;
  icon: string;
}

export const pipelineSteps: PipelineStep[] = [
  { id: 0, key: "idea", icon: "Lightbulb" },
  { id: 1, key: "prd", icon: "FileText" },
  { id: 2, key: "features", icon: "ListChecks" },
  { id: 3, key: "architecture", icon: "Network" },
  { id: 4, key: "database", icon: "Database" },
  { id: 5, key: "api", icon: "Globe" },
  { id: 6, key: "tasks", icon: "ListTodo" },
  { id: 7, key: "prompt", icon: "Terminal" },
];

export interface TargetTool {
  id: string;
  name: string;
  description: string;
}

export const targetTools: TargetTool[] = [
  { id: "cursor", name: "Cursor", description: "Default — generates .cursor/rules, phased prompts, and AGENTS.md" },
  { id: "claude-code", name: "Claude Code", description: "Generates CLAUDE.md and task prompts" },
  { id: "lovable", name: "Lovable", description: "Generates Lovable-optimized prompts" },
  { id: "bolt", name: "Bolt", description: "Generates Bolt.new project prompts" },
  { id: "v0", name: "v0", description: "Generates v0-optimized prompts" },
  { id: "generic", name: "Generic", description: "Universal prompts for any AI coding tool" },
];
