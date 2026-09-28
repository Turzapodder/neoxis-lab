'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowUp,
  RefreshCw,
  ChevronDown,
  Sparkles,
  User,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/cn';

const SUGGESTED_PROMPTS = [
  'What services does neoxis offer?',
  'Show me the pricing plans',
  'Tell me about the Neon Frame System project',
  'How can we get in touch?',
];

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

const WELCOME_MESSAGE =
  "Hi! I'm the neoxis AI assistant. Ask me about our services, pricing, case studies or the team — or start a project.";

const STORAGE_KEY = 'neoxis-ai-chat';

/** Restore the last conversation so the chat survives reloads and route changes. */
function loadMessages(): ChatMessage[] {
  if (typeof window === 'undefined') {
    return [{ id: 'welcome', role: 'assistant', content: WELCOME_MESSAGE, createdAt: new Date(0) }];
  }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((m) => ({ ...m, createdAt: new Date(m.createdAt) }));
      }
    }
  } catch {
    // Corrupt storage — fall through to the welcome message.
  }
  return [{ id: 'welcome', role: 'assistant', content: WELCOME_MESSAGE, createdAt: new Date(0) }];
}

/* neoxis design tokens: black/white glass pills, neutral-950 ink, emerald presence dot. */
const CHIP_CLASS =
  'rounded-full border border-black/10 bg-black/[0.03] px-3.5 py-1.5 font-neue text-xs text-neutral-600 hover:bg-neutral-950 hover:border-neutral-950 hover:text-white transition-colors cursor-pointer text-left';
const CLOSE_BUTTON_CLASS =
  'w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-neutral-700 transition-all cursor-pointer';

export function AiCopilotWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>(loadMessages);
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  /* Persist the conversation (last 20 messages). */
  React.useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
    } catch {
      // Storage full or unavailable — non-critical.
    }
  }, [messages]);

  /* Close on Escape, like the modals. */
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const adjustTextareaHeight = React.useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(Math.max(textareaRef.current.scrollHeight, 46), 120)}px`;
    }
  }, []);

  React.useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue, adjustTextareaHeight]);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior, block: 'end' });
  };

  React.useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      scrollToBottom('auto');
      textareaRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [isOpen]);

  React.useEffect(() => {
    const timer = setTimeout(() => scrollToBottom('smooth'), 50);
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const history = messages
      .filter((m) => m.id !== 'welcome' && m.id !== 'welcome-reset')
      .slice(-4)
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: 'user', content: query, createdAt: new Date() },
    ]);
    setInputValue('');
    if (textareaRef.current) textareaRef.current.style.height = '46px';
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, conversationHistory: history }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content:
            data.message ||
            "I couldn't reach the AI service. Email us directly at hello@neoxis.design!",
          createdAt: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          content:
            "I couldn't reach the AI service right now. Email us at hello@neoxis.design — we respond within 24h!",
          createdAt: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift+Enter inserts a newline — same contract as the contact form.
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: 'Chat cleared! Ask me anything else about neoxis.',
        createdAt: new Date(),
      },
    ]);
  };

  // The AI copilot is a public-site affordance; keep the admin UI clean.
  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      {/* Floating trigger — mirrors the hero "Let's Build" pill: label + icon circle. */}
      <div className="fixed bottom-6 right-6 z-[90]">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-3 rounded-full bg-neutral-950/90 backdrop-blur-xl border border-white/15 pl-6 pr-1.5 py-1.5 text-white shadow-2xl hover:bg-neutral-900 hover:border-white/30 transition-colors duration-300 cursor-pointer select-none"
          aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
          aria-expanded={isOpen}
        >
          <span className="font-clash text-sm font-semibold tracking-tight">
            {isOpen ? 'Close' : 'Ask AI'}
          </span>
          <span className="relative flex w-9 h-9 rounded-full bg-white text-neutral-950 items-center justify-center shrink-0">
            {isOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Sparkles className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
            )}
            {/* Presence dot — same green pulse as the contact section */}
            {!isOpen && (
              <span className="absolute -top-0.5 -right-0.5 flex w-2.5 h-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 animate-ping opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-green-500 border border-neutral-950" />
              </span>
            )}
          </span>
        </motion.button>
      </div>

      {/* Chat panel — same surface language as ConnectModal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            role="dialog"
            aria-label="neoxis AI assistant"
            className="fixed bottom-24 right-4 sm:right-6 z-[90] w-[94vw] max-w-sm sm:max-w-md rounded-[28px] bg-[#FAFBFD]/95 backdrop-blur-2xl border border-black/10 shadow-2xl overflow-hidden flex flex-col h-[560px] max-h-[82vh]"
          >
            {/* Header — ConnectModal header pattern */}
            <div className="flex items-center justify-between pb-4 pt-5 px-5 sm:px-6 border-b border-black/10">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-10 h-10 shrink-0 rounded-full bg-neutral-950 text-white flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-clash text-lg font-bold text-neutral-950 leading-tight flex items-center gap-2">
                    neoxis AI
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 font-neue text-[10px] font-medium text-emerald-600">
                      <span className="relative flex w-1.5 h-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 animate-ping opacity-60 motion-reduce:animate-none" />
                        <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-green-500" />
                      </span>
                      Live
                    </span>
                  </h3>
                  <p className="font-neue text-xs text-neutral-500 truncate">
                    Services · Pricing · Case studies
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleClear}
                  className={CLOSE_BUTTON_CLASS}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className={CLOSE_BUTTON_CLASS}
                  aria-label="Close assistant"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages — data-lenis-prevent keeps Lenis from hijacking chat scrolling */}
            <div
              data-lenis-prevent
              role="log"
              aria-live="polite"
              className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 py-5 space-y-4 select-text"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex gap-2.5 max-w-[90%]',
                    msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto',
                  )}
                >
                  <span
                    className={cn(
                      'w-8 h-8 shrink-0 rounded-full flex items-center justify-center',
                      msg.role === 'user'
                        ? 'bg-neutral-950 text-white'
                        : 'bg-white text-neutral-950 border border-black/10',
                    )}
                  >
                    {msg.role === 'user' ? (
                      <User className="w-3.5 h-3.5" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                  </span>
                  <div
                    className={cn(
                      'rounded-2xl px-4 py-2.5 font-neue text-sm leading-relaxed overflow-hidden',
                      msg.role === 'user'
                        ? 'bg-neutral-950 text-white rounded-tr-sm font-medium'
                        : 'bg-black/[0.04] border border-black/[0.06] text-neutral-900 rounded-tl-sm',
                    )}
                  >
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div className="max-w-none break-words space-y-2 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-2 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mb-2 [&_ol]:space-y-1 [&_li]:leading-relaxed [&_a]:text-neutral-950 [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-bold [&_code]:bg-black/[0.06] [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-xs [&_h3]:font-clash [&_h3]:text-sm [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:mb-1.5 [&_table]:w-full [&_table]:my-1 [&_th]:text-left [&_th]:font-semibold [&_th]:px-2 [&_th]:py-1.5 [&_th]:border-b [&_th]:border-black/10 [&_td]:px-2 [&_td]:py-1.5 [&_td]:align-top [&_td]:border-b [&_td]:border-black/[0.06]">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator — three dots, on-brand monochrome */}
              {isLoading && (
                <div className="flex gap-2.5 mr-auto max-w-[90%]">
                  <span className="w-8 h-8 shrink-0 rounded-full bg-white text-neutral-950 border border-black/10 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                  <div className="rounded-2xl rounded-tl-sm bg-black/[0.04] border border-black/[0.06] px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce motion-reduce:animate-none" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce motion-reduce:animate-none"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce motion-reduce:animate-none"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested prompts — ChipGroup-style pills */}
            {messages.length <= 2 && (
              <div className="px-5 sm:px-6 pb-3">
                <p className="font-neue text-[10px] font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  Suggested
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className={CHIP_CLASS}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input — ConnectModal field style + contact-form send button */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-4 sm:px-5 sm:py-4 border-t border-black/10 flex items-end gap-2 bg-white/40"
            >
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask about services & pricing…"
                disabled={isLoading}
                aria-label="Message the neoxis AI assistant"
                className="w-full resize-none min-h-[46px] max-h-[120px] bg-black/[0.04] border border-black/10 rounded-2xl px-4 py-3 font-neue text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900/40 transition-colors leading-relaxed overflow-y-auto"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                aria-label="Send message"
                className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white hover:bg-neutral-800 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
