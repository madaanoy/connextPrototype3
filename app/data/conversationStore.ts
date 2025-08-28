// project-root/data/conversationStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultConversations from './conversations';
import type { Conversation, Message } from './conversations';

const STORAGE_KEY = 'myapp:conversations_v1';

let conversations: Conversation[] = [];
let initialized = false;
const listeners: Array<() => void> = [];

async function init() {
  if (initialized) return;
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      conversations = JSON.parse(raw) as Conversation[];
    } else {
      conversations = defaultConversations;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    }
  } catch (err) {
    // fallback: use default mock
    conversations = defaultConversations;
    console.warn('conversationStore init error', err);
  } finally {
    initialized = true;
  }
}

function getConversations(): Conversation[] {
  return conversations;
}

function getConversation(id: string): Conversation | undefined {
  return conversations.find((c) => c.id === id);
}

async function save() {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch (err) {
    console.warn('conversationStore save error', err);
  }
}

/** Adds a message to a conversation and persists. Creates conversation skeleton if missing. */
async function addMessage(conversationId: string, message: Message) {
  let conv = conversations.find((c) => c.id === conversationId);
  if (!conv) {
    conv = {
      id: conversationId,
      participants: { employer: 'Unknown', jobseeker: 'Unknown' },
      messages: [message],
    };
    conversations.push(conv);
  } else {
    conv.messages.push(message);
  }
  await save();
  listeners.forEach((l) => l());
}

/** Subscribe to store updates. Returns an unsubscribe function. */
function subscribe(cb: () => void) {
  listeners.push(cb);
  return () => {
    const i = listeners.indexOf(cb);
    if (i !== -1) listeners.splice(i, 1);
  };
}

export default {
  init,
  getConversations,
  getConversation,
  addMessage,
  subscribe,
};
