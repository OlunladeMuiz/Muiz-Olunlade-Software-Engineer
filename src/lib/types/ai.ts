export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface CommandItem {
  id: string;
  title: string;
  description: string;
  kind: 'navigation' | 'action' | 'project' | 'ai';
  href?: string;
  projectId?: string;
}
