"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { FaComments, FaPaperPlane, FaTimes } from "react-icons/fa";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const LAUNCH_LABEL = "Chat with JOVIRA Assist";
const INTRO_MESSAGE =
  "Hello! I'm your AI-powered assistant, happy to help plan your celebration.";

const INITIAL_SUGGESTIONS = [
  "What packages do you offer?",
  "How do I book a consultation?",
  "Do you have Grab 'n Go options?",
];

// Matches the trailing followups line, tolerating the model wrapping the label in markdown bold (e.g. "**FOLLOWUPS:**").
const FOLLOWUP_REGEX = /\*{0,2}\s*FOLLOWUPS:\s*\*{0,2}/g;

// Splits a trailing "FOLLOWUPS: a | b | c" line from the assistant's reply.
function splitFollowups(text: string): { main: string; suggestions: string[] } {
  const regex = new RegExp(FOLLOWUP_REGEX);
  let match: RegExpExecArray | null;
  let lastMatch: RegExpExecArray | null = null;
  while ((match = regex.exec(text)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    return { main: text, suggestions: [] };
  }

  const main = text.slice(0, lastMatch.index).trim();
  const rest = text
    .slice(lastMatch.index + lastMatch[0].length)
    .replace(/\*+$/, "");
  const suggestions = rest
    .split("|")
    .map((item) => item.replace(/^\*+|\*+$/g, "").trim())
    .filter(Boolean)
    .slice(0, 3);

  return { main, suggestions };
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, error } = useChat();

  const isBusy = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [open, messages, isBusy]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isBusy) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  function handleSuggestionClick(question: string) {
    if (isBusy) return;
    sendMessage({ text: question });
  }

  const lastMessage = messages[messages.length - 1];
  const lastFollowups =
    !isBusy && lastMessage?.role === "assistant"
      ? splitFollowups(
          lastMessage.parts
            .filter((part) => part.type === "text")
            .map((part) => part.text)
            .join(""),
        ).suggestions
      : [];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={LAUNCH_LABEL}
        aria-expanded={open}
        className={`fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-deep text-surface shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep ${
          open
            ? "pointer-events-none scale-0 opacity-0"
            : "scale-100 opacity-100"
        }`}
      >
        <FaComments size={22} aria-hidden="true" />
      </button>

      <div
        role="dialog"
        aria-modal="true"
        aria-label={LAUNCH_LABEL}
        className={`fixed inset-0 z-50 flex justify-end transition-opacity sm:inset-auto sm:bottom-5 sm:right-5 sm:top-5 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full w-full flex-col overflow-hidden border border-border bg-surface shadow-2xl sm:h-full sm:w-[420px] sm:rounded-[4px]">
          <header className="flex items-center justify-between gap-3 border-b border-border bg-ink px-5 py-4 text-surface">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sun">
                JOVIRA Assist
              </p>
              <p className="text-xs text-surface/70">
                Ask about services, packages & booking
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="inline-flex h-9 w-9 items-center justify-center rounded-[4px] text-surface/80 transition-colors hover:bg-surface/10 hover:text-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
            >
              <FaTimes aria-hidden="true" />
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            <ChatBubble role="assistant" text={INTRO_MESSAGE} />
            {messages.length === 0 && (
              <SuggestionChips
                questions={INITIAL_SUGGESTIONS}
                onSelect={handleSuggestionClick}
              />
            )}
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                role={message.role === "user" ? "user" : "assistant"}
                text={
                  splitFollowups(
                    message.parts
                      .filter((part) => part.type === "text")
                      .map((part) => part.text)
                      .join(""),
                  ).main
                }
              />
            ))}
            {isBusy && <ChatBubble role="assistant" text="Thinking…" pending />}
            {error && (
              <ChatBubble
                role="assistant"
                text="Something went wrong reaching the assistant. Please try again in a moment, or reach out through our consultation form."
              />
            )}
            {lastFollowups.length > 0 && (
              <SuggestionChips
                questions={lastFollowups}
                onSelect={handleSuggestionClick}
              />
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-border bg-surface px-3 py-3"
          >
            <label htmlFor="jovira-chat-input" className="sr-only">
              Message
            </label>
            <div className="flex w-full items-center gap-2 rounded-[4px] border border-border bg-background pl-4 pr-1.5 py-1.5 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-deep">
              <input
                id="jovira-chat-input"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a question…"
                disabled={isBusy}
                className="min-w-0 flex-1 bg-transparent py-2 text-base text-foreground placeholder:text-foreground/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isBusy || !input.trim()}
                aria-label="Send message"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] bg-brand-deep text-surface transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <FaPaperPlane size={14} aria-hidden="true" />
              </button>
            </div>
          </form>
          <p className="border-t border-border bg-muted px-4 py-2 text-center text-[11px] leading-snug text-foreground/60">
            AI can make mistakes. Please verify important details before
            booking.
          </p>
        </div>
      </div>
    </>
  );
}

function SuggestionChips({
  questions,
  onSelect,
}: {
  questions: string[];
  onSelect: (question: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {questions.map((question) => (
        <button
          key={question}
          type="button"
          onClick={() => onSelect(question)}
          className="rounded-full border border-border-warm bg-surface px-3 py-1.5 text-left text-xs text-foreground/80 transition-colors hover:border-brand-deep hover:text-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
        >
          {question}
        </button>
      ))}
    </div>
  );
}

// Keeps markdown styling consistent with the bubble's text colour (user bubbles are on a dark background).
function markdownComponents(isUser: boolean): Components {
  const linkClass = isUser
    ? "underline decoration-surface/60 underline-offset-2 hover:decoration-surface"
    : "underline decoration-brand-deep/50 underline-offset-2 hover:decoration-brand-deep";

  return {
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    ul: ({ children }) => (
      <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>
    ),
    li: ({ children }) => <li>{children}</li>,
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    a: ({ children, href }) => (
      <a href={href} target="_blank" rel="noreferrer" className={linkClass}>
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="rounded-[3px] bg-foreground/10 px-1 py-0.5 text-[0.85em]">
        {children}
      </code>
    ),
  };
}

function ChatBubble({
  role,
  text,
  pending,
}: {
  role: "user" | "assistant";
  text: string;
  pending?: boolean;
}) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-[4px] px-3 py-2 text-sm leading-relaxed ${
          isUser ? "bg-brand-deep text-surface" : "bg-muted text-foreground"
        } ${pending ? "italic text-foreground/60" : ""}`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents(isUser)}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}
