"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  MicOff, 
  Paperclip, 
  Sparkles, 
  ExternalLink, 
  CheckSquare, 
  AlertTriangle, 
  Lightbulb, 
  RotateCcw, 
  Copy, 
  Check, 
  MessageSquare, 
  Clock, 
  Bookmark, 
  Plus, 
  ChevronRight,
  ShieldCheck,
  Landmark
} from "lucide-react";
import type { SevaAnswer } from "@/types/ai";
import { track } from "@/lib/track";
import type { Lang } from "@/lib/i18n";

type Msg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  data?: SevaAnswer;
  timestamp: string;
};

type Session = {
  id: string;
  title: string;
  date: string;
  messages: Msg[];
};

interface ChatProps {
  lang: Lang;
  initialSlug?: string;
  initialName?: string;
  dict: any;
}

export default function Chat({ lang, initialSlug, initialName, dict }: ChatProps) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | undefined>(initialSlug);
  const [name, setName] = useState<string | undefined>(initialName);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>("session-default");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedPrompts = [
    dict.suggested1,
    dict.suggested2,
    dict.suggested3,
    dict.suggested4,
  ];

  // Load chat history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sevaguide_chat_sessions");
      if (stored) {
        const parsed: Session[] = JSON.parse(stored);
        if (parsed.length > 0) {
          setSessions(parsed);
          setActiveSessionId(parsed[0].id);
          setMessages(parsed[0].messages);
        }
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  // Save current messages to active session in localStorage
  const saveSessionMessages = (newMessages: Msg[]) => {
    try {
      setSessions((prev) => {
        let updated: Session[];
        const existingIdx = prev.findIndex((s) => s.id === activeSessionId);
        const title = newMessages.length > 0 
          ? newMessages[0].text.slice(0, 32) + "..."
          : "Government Service Query";
        
        if (existingIdx >= 0) {
          updated = [...prev];
          updated[existingIdx] = {
            ...updated[existingIdx],
            title,
            messages: newMessages,
          };
        } else {
          updated = [
            {
              id: activeSessionId,
              title,
              date: "Today",
              messages: newMessages,
            },
            ...prev,
          ];
        }
        localStorage.setItem("sevaguide_chat_sessions", JSON.stringify(updated));
        return updated;
      });
    } catch {
      // Storage unavailable
    }
  };

  const handleNewChat = () => {
    const newId = `session-${Date.now()}`;
    setActiveSessionId(newId);
    setMessages([]);
    setSlug(undefined);
    setName(undefined);
    setError(null);
    setSidebarOpen(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSelectSession = (session: Session) => {
    setActiveSessionId(session.id);
    setMessages(session.messages);
    setSidebarOpen(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, busy]);

  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is supported in Google Chrome, Microsoft Edge, and Safari.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === "kn" ? "kn-IN" : "en-IN";
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        ask(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const ask = async (questionText: string) => {
    const message = questionText.trim();
    if (!message || busy) return;

    setError(null);
    setBusy(true);
    setInput("");

    try {
      track("ai_question", { slug, lang });
    } catch {}

    const userMsg: Msg = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMsgsWithUser = [...messages, userMsg];
    setMessages(newMsgsWithUser);
    saveSessionMessages(newMsgsWithUser);

    const historyPayload = messages.slice(-6).map((m) => ({
      role: m.role,
      content: m.text,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          lang,
          history: historyPayload,
          serviceSlug: slug,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || dict.errGeneric);
      }

      const assistantMsg: Msg = {
        id: `msg-${Date.now()}-assistant`,
        role: "assistant",
        text: data.answer,
        data,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      const updatedAll = [...newMsgsWithUser, assistantMsg];
      setMessages(updatedAll);
      saveSessionMessages(updatedAll);

      if (data.serviceSlug) {
        setSlug(data.serviceSlug);
        setName(data.serviceName);
      }
    } catch (err) {
      setError((err as Error).message || dict.errGeneric);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-130px)] min-h-[550px] w-full overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-card">
      {/* LEFT SIDEBAR: ChatGPT Style */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 flex-col border-r border-slate-200 bg-slate-50 p-4 transition-transform duration-300 md:static md:flex ${
          sidebarOpen ? "flex" : "hidden"
        }`}
      >
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <MessageSquare className="h-4 w-4 text-brand" />
            <span>Conversations</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-slate-400 hover:text-slate-600 md:hidden"
          >
            ✕
          </button>
        </div>

        {/* New Chat Button */}
        <button
          onClick={handleNewChat}
          className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-navy-900 border border-slate-200/90 shadow-sm hover:border-brand hover:text-brand transition-all"
        >
          <div className="flex items-center gap-2.5">
            <Plus className="h-4 w-4 text-brand" />
            <span>{dict.aiNewChat}</span>
          </div>
          <span className="rounded-md bg-brand-soft px-1.5 py-0.5 text-[10px] font-bold text-brand">
            +
          </span>
        </button>

        {/* Today's Conversations List */}
        <div className="mt-6 flex-1 space-y-1 overflow-y-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-2">
            {dict.aiToday}
          </span>
          {sessions.length === 0 ? (
            <p className="px-2 text-xs text-slate-400 italic">No past conversations</p>
          ) : (
            sessions.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSelectSession(s)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-colors ${
                  activeSessionId === s.id
                    ? "bg-white text-navy-900 font-bold border border-slate-200 shadow-sm"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}
              >
                <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{s.title}</span>
              </button>
            ))
          )}
        </div>

        {/* Quick Civic Portal Links Box */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3 text-xs space-y-2 mt-auto">
          <div className="flex items-center gap-1.5 font-bold text-navy-900">
            <Landmark className="h-3.5 w-3.5 text-brand" />
            <span>Karnataka Portals</span>
          </div>
          <div className="flex flex-col gap-1 text-[11px] text-slate-500">
            <a href="https://nadakacheri.karnataka.gov.in" target="_blank" rel="noreferrer" className="hover:text-brand flex items-center justify-between">
              <span>Nadakacheri (Certificates)</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
            <a href="https://bhoomi.karnataka.gov.in" target="_blank" rel="noreferrer" className="hover:text-brand flex items-center justify-between">
              <span>Bhoomi (RTC / Pahani)</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
            <a href="https://ssp.postmatric.karnataka.gov.in" target="_blank" rel="noreferrer" className="hover:text-brand flex items-center justify-between">
              <span>SSP (Scholarships)</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>
        </div>
      </aside>

      {/* MAIN CHAT AREA */}
      <div className="flex flex-1 flex-col h-full bg-white">
        {/* Top Chat Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 md:hidden"
            >
              <MessageSquare className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-white shadow-sm">
                <Bot className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-navy-900">SevaGuide AI Assistant</h2>
                  <span className="flex h-2 w-2 rounded-full bg-govgreen" />
                </div>
                <p className="text-[11px] text-slate-500">
                  {name ? `Focused on: ${name}` : "Grounded in Karnataka Civic Rules"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNewChat}
              className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              <RotateCcw className="h-3 w-3" />
              <span className="hidden sm:inline">{dict.aiNewChat}</span>
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="mx-auto max-w-2xl py-8 space-y-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-brand to-blue-500 text-white shadow-glow">
                <Sparkles className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-navy-900">
                  How can I help you with Government Services today?
                </h3>
                <p className="text-sm text-slate-500">
                  Ask about documents, income thresholds, application timelines, fees, or official portals.
                </p>
              </div>

              {/* Suggested Prompts Grid */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-left">
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => ask(prompt)}
                    className="group flex items-center justify-between rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 text-xs font-semibold text-slate-700 hover:border-brand hover:bg-brand-soft/40 hover:text-brand transition-all"
                  >
                    <span>{prompt}</span>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white shadow-sm">
                    <Bot className="h-5 w-5 text-blue-400" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-3xl p-5 space-y-4 ${
                    msg.role === "user"
                      ? "bg-brand text-white shadow-md rounded-tr-none"
                      : "bg-slate-50 border border-slate-200/80 text-navy-900 rounded-tl-none shadow-sm"
                  }`}
                >
                  {/* Message Main Text */}
                  <div className="text-sm leading-relaxed whitespace-pre-wrap font-normal">
                    {msg.text}
                  </div>

                  {/* SPECIAL UI COMPONENT 1: Official Portal Button */}
                  {msg.data?.officialUrl && (
                    <div className="pt-2">
                      <a
                        href={msg.data.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border-2 border-brand bg-white px-4 py-2 text-xs font-bold text-brand hover:bg-brand-soft transition-all shadow-sm"
                      >
                        <Landmark className="h-3.5 w-3.5" />
                        <span>{dict.openOfficialPortal}</span>
                      </a>
                    </div>
                  )}

                  {/* SPECIAL UI COMPONENT 2: Green Actionable Checklist */}
                  {msg.data?.checklistItems && msg.data.checklistItems.length > 0 && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 space-y-2.5">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs uppercase tracking-wider">
                        <CheckSquare className="h-4 w-4 text-govgreen" />
                        <span>{dict.cardChecklistTitle}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {msg.data.checklistItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs font-medium text-emerald-950">
                            <span className="text-govgreen font-bold">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* SPECIAL UI COMPONENT 3: Orange Important Warning */}
                  {msg.data?.importantNotes && msg.data.importantNotes.length > 0 && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/90 p-4 space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs uppercase tracking-wider">
                        <AlertTriangle className="h-4 w-4 text-govorange" />
                        <span>{dict.cardImportantTitle}</span>
                      </div>
                      <ul className="space-y-1">
                        {msg.data.importantNotes.map((note, idx) => (
                          <li key={idx} className="text-xs text-amber-950">
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* SPECIAL UI COMPONENT 4: Blue AI Pro Tip */}
                  {msg.data?.aiTip && (
                    <div className="rounded-2xl border border-blue-200 bg-blue-50/90 p-4 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-brand-dark text-xs uppercase tracking-wider">
                        <Lightbulb className="h-4 w-4 text-brand" />
                        <span>{dict.cardAiTipTitle}</span>
                      </div>
                      <p className="text-xs text-slate-800">
                        {msg.data.aiTip}
                      </p>
                    </div>
                  )}

                  {/* Footer Bar: Timestamp & Copy Button */}
                  <div className="flex items-center justify-between border-t border-slate-200/50 pt-2 text-[10px] text-slate-400">
                    <span>{msg.timestamp}</span>
                    {msg.role === "assistant" && (
                      <button
                        onClick={() => copyToClipboard(msg.text, msg.id)}
                        className="flex items-center gap-1 hover:text-navy-900 transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="h-3 w-3 text-govgreen" />
                            <span className="text-govgreen font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {msg.role === "user" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))
          )}

          {/* Typing Indicator */}
          {busy && (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-white">
                <Bot className="h-5 w-5 text-blue-400 animate-spin" />
              </div>
              <div className="rounded-2xl bg-slate-100 px-4 py-3 text-xs text-slate-600 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-brand animate-ping" />
                <span>{dict.aiThinking}</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="rounded-2xl bg-red-50 p-4 text-xs font-semibold text-red-900 border border-red-200">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* BOTTOM COMPOSER */}
        <div className="border-t border-slate-100 p-4 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex flex-1 items-center rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-1 focus-within:border-brand focus-within:bg-white focus-within:ring-2 focus-within:ring-brand/10 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={dict.aiComposerPlaceholder}
                maxLength={600}
                disabled={busy}
                className="w-full bg-transparent px-2 py-2 text-sm text-navy-900 placeholder-slate-400 focus:outline-none"
              />

              {/* Attach Prompt Helper Button */}
              <button
                type="button"
                onClick={() => setInput(suggestedPrompts[0])}
                title={dict.aiAttachTooltip}
                className="p-1.5 text-slate-400 hover:text-brand"
              >
                <Paperclip className="h-4 w-4" />
              </button>

              {/* Voice Input Button */}
              <button
                type="button"
                onClick={handleVoiceInput}
                title={dict.aiVoiceTooltip}
                className={`p-1.5 rounded-lg transition-colors ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "text-slate-400 hover:text-brand"
                }`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-sm hover:bg-brand-dark transition-all disabled:opacity-40 active:scale-95"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
