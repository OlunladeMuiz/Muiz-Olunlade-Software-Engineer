import { writable } from 'svelte/store';
import type { ChatMessage } from '$lib/types/ai';

export const aiConversation = writable<ChatMessage[]>([]);

export function resetConversation() {
  aiConversation.set([]);
}

export function pushMessage(message: ChatMessage) {
  aiConversation.update((items) => [...items, message]);
}
