"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Award, BookOpen, Brain, CalendarDays, CheckCircle2, ChevronRight,
  Flame, HelpCircle, Home, Languages, MessageCircle, Mic2,
  Search, Settings2, Sparkles, Star, Target, Trophy, Zap, Bell,
  Send, Volume2, RotateCcw, Bookmark, BookMarked, CircleCheck, Lock,
} from "lucide-react";

type Section = "Overview" | "My learning" | "Practice" | "AI Tutor" | "Speaking" | "Dictionary" | "Achievements" | "Settings";

const navGroups = [
  { title: "LEARNING SPACE", items: [
    { label: "Overview" as Section, icon: Home },
    { label: "My learning" as Section, icon: BookOpen },
    { label: "Practice" as Section, icon: Brain },
    { label: "AI Tutor" as Section, icon: MessageCircle },
    { label: "Speaking" as Section, icon: Mic2 },
    { label: "Dictionary" as Section, icon: Languages },
  ]},
  { title: "PERSONAL", items: [
    { label: "Achievements" as Section, icon: Trophy },
    { label: "Settings" as Section, icon: Settings2 },
  ]},
];

const words = [
  { word: "achieve", type: "verb", meaning: "đạt được", example: "You can achieve your goals with practice." },
  { word: "confident", type: "adjective", meaning: "tự tin", example: "She feels confident when speaking English." },
  { word: "improve", type: "verb", meaning: "cải thiện", example: "Reading every day can improve your vocabulary." },
  { word: "journey", type: "noun", meaning: "hành trình", example: "Learning a language is a long journey." },
  { word: "opportunity", type: "noun", meaning: "cơ hội", example: "This is a great opportunity to learn." },
  { word: "environment", type: "noun", meaning: "môi trường", example: "A quiet environment helps me study." },
  { word: "reliable", type: "adjective", meaning: "đáng tin cậy", example: "A reliable friend always keeps their promises." },
  { word: "communicate", type: "verb", meaning: "giao tiếp", example: "English helps people communicate worldwide." },
  { word: "curious", type: "adjective", meaning: "ham tìm hiểu", example: "Curious learners ask good questions." },
  { word: "although", type: "conjunction", meaning: "mặc dù", example: "Although it was late, we kept studying." },
];

const questions = [
  { prompt: "Choose the correct sentence.", options: ["She go to school every day.", "She goes to school every day.", "She going to school every day."], answer: 1, explain: "Với chủ ngữ ngôi thứ ba số ít, động từ hiện tại đơn thêm -s/-es." },
  { prompt: "What is the meaning of “confident”?", options: ["Tự tin", "Lo lắng", "Buồn ngủ"], answer: 0, explain: "Confident có nghĩa là tự tin." },
  { prompt: "Complete: I have lived here ___ 2020.", options: ["for", "since", "during"], answer: 1, explain: "Dùng since với một mốc thời gian cụ thể." },
  { prompt: "Choose the past form of “teach”.", options: ["teached", "taught", "teaching"], answer: 1, explain: "Teach là động từ bất quy tắc; quá khứ là taught." },
];

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState<Section>("Overview");
  const [search, setSearch] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [practiceDone, setPracticeDone] = useState(false);
  const [dictionaryQuery, setDictionaryQuery] = useState("");
  const [savedWords, setSavedWords] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chat, setChat] = useState([{ from: "tutor", text: "Hi! I’m your SUNAI study companion. Ask me about English grammar, vocabulary, or everyday conversations. (Bản trợ lý hiện đang ở chế độ demo.)" }]);
  const [speakingText, setSpeakingText] = useState("Hello! My name is Alex. I enjoy learning English because it helps me connect with people around the world.");
  const [settings, setSettings] = useState({ reminders: true, sound: true, dailyGoal: "15 minutes", level: "A1 - Beginner" });
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    try {
      setSavedWords(JSON.parse(localStorage.getItem("sunai-saved-words") || "[]"));
      setCompleted(Number(localStorage.getItem("sunai-completed-lessons") || "0"));
    } catch { /* Keep the page usable if browser storage is unavailable. */ }
  }, []);

  const filteredWords = useMemo(() => words.filter((item) =>
    (item.word + " " + item.meaning + " " + item.example).toLowerCase().includes(dictionaryQuery.toLowerCase())
  ), [dictionaryQuery]);

  const go = (section: Section) => {
    setActiveNav(section);
    setSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const speak = (text: string) => {
    if (!settings.sound || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.88;
    window.speechSynthesis.speak(utterance);
  };

  const toggleSaved = (word: string) => {
    const next = savedWords.includes(word) ? savedWords.filter((item) => item !== word) : [...savedWords, word];
    setSavedWords(next);
    localStorage.setItem("sunai-saved-words", JSON.stringify(next));
  };

  const answerQuestion = (choice: number) => {
    if (selected !== null) return;
    setSelected(choice);
    if (choice === questions[questionIndex].answer) setScore((value) => value + 1);
  };

  const nextQuestion = () => {
    if (questionIndex === questions.length - 1) {
      setPracticeDone(true);
      const next = completed + 1;
      setCompleted(next);
      localStorage.setItem("sunai-completed-lessons", String(next));
      return;
    }
    setQuestionIndex((value) => value + 1);
    setSelected(null);
  };

  const resetPractice = () => { setQuestionIndex(0); setSelected(null); setScore(0); setPracticeDone(false); };

  const sendTutorMessage = () => {
    const message = chatInput.trim();
    if (!message) return;
    const lower = message.toLowerCase();
    let reply = "Good question! Try breaking the sentence into its subject, verb, and object. If you share a full example, I can help you understand it. (Đây là phản hồi mẫu của chế độ demo.)";
    if (lower.includes("hello") || lower.includes("hi")) reply = "Hello! 😊 Let’s practise English together. You can ask me about vocabulary, grammar, or sentence structure.";
    else if (lower.includes("present simple") || lower.includes("hiện tại đơn")) reply = "Present Simple dùng cho thói quen và sự thật. Ví dụ: “I study English every day.” Với he/she/it, động từ thường thêm -s hoặc -es.";
    else if (lower.includes("past simple") || lower.includes("quá khứ đơn")) reply = "Past Simple diễn tả hành động đã kết thúc trong quá khứ. Ví dụ: “I visited my grandparents yesterday.”";
    else if (lower.includes("vocabulary") || lower.includes("từ vựng")) reply = "Một cách học từ vựng hiệu quả: học từ trong câu, tự đặt ví dụ, rồi ôn lại sau một ngày. Bạn có thể mở Dictionary để lưu từ mới.";
    setChat((items) => [...items, { from: "you", text: message }, { from: "tutor", text: reply }]);
    setChatInput("");
  };

  const headerTitle = activeNav === "Overview" ? "Learning space" : activeNav;
  const headerSubtitle: Record<Section, string> = {
    Overview: "Your English journey starts here",
    "My learning": "Choose a course and keep moving forward",
    Practice: "Build confidence with quick exercises",
    "AI Tutor": "A friendly place to ask English questions",
    Speaking: "Practise saying English sentences aloud",
    Dictionary: "Discover, understand, and save new words",
    Achievements: "Celebrate every step of your progress",
    Settings: "Make your learning space work for you",
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <button className="brand brand-button" type="button" onClick={() => go("Overview")} aria-label="SUNAI home">
          <div className="brand-mark">S</div><div className="brand-name">SUN<span>AI</span></div>
        </button>
        {navGroups.map((group) => <div key={group.title}>
          <div className="nav-label">{group.title}</div>
          <nav className="nav-list" aria-label={group.title}>
            {group.items.map(({ label, icon: Icon }) => <button
              className={`nav-item ${activeNav === label ? "active" : ""}`} key={label}
              onClick={() => label === "My learning" ? window.location.assign("/courses") : go(label)} type="button"
              aria-current={activeNav === label ? "page" : undefined}>
              <Icon /><span>{label}</span>{label === "AI Tutor" && <Sparkles size={13} style={{ marginLeft: "auto", color: "#ffc94a" }} />}
            </button>)}
          </nav>
        </div>)}
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><HelpCircle size={18} /></div>
            <strong>Need a little help?</strong><p>Your learning journey is easier when you have a guide.</p>
            <button type="button" onClick={() => go("AI Tutor")}>Meet your AI tutor</button>
          </div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="breadcrumb">Learning space&nbsp; / &nbsp;<strong>{headerTitle}</strong></div>
          <div className="top-actions">
            <label className="top-search"><Search size={16} /><input aria-label="Search courses" placeholder="Search courses" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") go("My learning"); }} /></label>
            <div className="notice-wrap"><button className="icon-button" type="button" aria-label="Notifications" onClick={() => setNoticeOpen(!noticeOpen)}><Bell size={17} /><span className="notification-dot" /></button>
              {noticeOpen && <div className="notice-popover"><strong>You’re all caught up!</strong><p>New learning reminders will appear here.</p></div>}
            </div>
            <div className="profile"><div className="avatar">S</div><div className="profile-copy"><strong>My learning space</strong><span>Welcome to SUNAI</span></div></div>
          </div>
        </header>

        <div className="content">
          <div className="welcome-row"><div><div className="eyebrow">{headerSubtitle[activeNav]}</div><h1>{activeNav === "Overview" ? "Make today count." : activeNav}</h1><p>{activeNav === "Overview" ? "A little practice every day can take you a long way." : headerSubtitle[activeNav]}</p></div>
            <div className="date-chip"><CalendarDays size={13} style={{ verticalAlign: "middle", marginRight: 7 }} />SUNAI Learning</div>
          </div>

          {activeNav === "Overview" && <Overview completed={completed} onGo={go} speak={speak} />}
          {activeNav === "Practice" && <section className="workspace-panel practice-panel">
            <div className="workspace-heading"><div><span className="eyebrow">DAILY PRACTICE</span><h2>Quick English challenge</h2><p>4 short questions to review grammar and vocabulary.</p></div><div className="practice-counter">{practiceDone ? "Completed" : `${questionIndex + 1} / ${questions.length}`}</div></div>
            {!practiceDone ? <><div className="practice-progress"><span style={{ width: `${((questionIndex + (selected !== null ? 1 : 0)) / questions.length) * 100}%` }} /></div><div className="question-card"><span className="quiz-number">QUESTION {questionIndex + 1}</span><h3>{questions[questionIndex].prompt}</h3><div className="quiz-options">{questions[questionIndex].options.map((option, index) => <button key={option} type="button" disabled={selected !== null} onClick={() => answerQuestion(index)} className={`quiz-option ${selected === index ? (index === questions[questionIndex].answer ? "correct" : "incorrect") : selected !== null && index === questions[questionIndex].answer ? "correct" : ""}`}><span>{String.fromCharCode(65 + index)}</span>{option}{selected !== null && index === questions[questionIndex].answer && <CircleCheck size={16} />}</button>)}</div>{selected !== null && <div className={`answer-explanation ${selected === questions[questionIndex].answer ? "good" : ""}`}>{selected === questions[questionIndex].answer ? "Correct! " : "Not quite. "}{questions[questionIndex].explain}</div>}</div><div className="workspace-actions"><span>Score: {score} correct</span><button className="primary-button" disabled={selected === null} onClick={nextQuestion}>{questionIndex === questions.length - 1 ? "Finish practice" : "Next question"} <ChevronRight size={16} /></button></div></> : <div className="practice-result"><div className="completion-icon"><Award size={34} /></div><h2>Practice complete!</h2><p>You answered {score} out of {questions.length} questions correctly.</p><strong>{Math.round(score / questions.length * 100)}%</strong><button className="primary-button" onClick={resetPractice}><RotateCcw size={15} /> Try again</button></div>}
          </section>}

          {activeNav === "AI Tutor" && <section className="workspace-panel tutor-panel"><div className="workspace-heading"><div><span className="eyebrow">YOUR STUDY COMPANION</span><h2>Chat with SUNAI Tutor</h2><p>Ask about grammar, vocabulary, or how to build a sentence.</p></div><span className="demo-badge">DEMO MODE</span></div><div className="chat-window" aria-live="polite">{chat.map((item, index) => <div className={`chat-row ${item.from === "you" ? "chat-you" : ""}`} key={index}><div className="chat-avatar">{item.from === "you" ? "Y" : <Sparkles size={15} />}</div><div className="chat-bubble"><span>{item.from === "you" ? "YOU" : "SUNAI TUTOR"}</span><p>{item.text}</p></div></div>)}</div><form className="chat-composer" onSubmit={(e) => { e.preventDefault(); sendTutorMessage(); }}><input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask an English question..." aria-label="Message SUNAI Tutor" /><button className="primary-button" type="submit" disabled={!chatInput.trim()}><Send size={15} /> Send</button></form><p className="feature-note">Lưu ý: đây là giao diện trợ lý demo, chưa kết nối mô hình AI/API nên câu trả lời đang dựa trên một số mẫu có sẵn.</p></section>}

          {activeNav === "Speaking" && <section className="workspace-panel"><div className="workspace-heading"><div><span className="eyebrow">SPEAKING STUDIO</span><h2>Listen and repeat</h2><p>Hear a sentence, then practise saying it aloud.</p></div><div className="speaking-icon"><Mic2 size={23} /></div></div><label className="field-label" htmlFor="speaking-text">PRACTICE SENTENCE</label><textarea id="speaking-text" className="speaking-textarea" value={speakingText} onChange={(e) => { setSpeakingText(e.target.value); }} rows={4} /><div className="speaking-actions"><button className="primary-button" type="button" onClick={() => speak(speakingText)} disabled={!speakingText.trim()}><Volume2 size={16} /> Listen to pronunciation</button><button className="secondary-button" type="button" onClick={() => { setSpeakingText("Hello! My name is Alex. I enjoy learning English because it helps me connect with people around the world."); }}><RotateCcw size={15} /> Reset text</button></div><div className="speaking-tip"><Headphones size={18} /><div><strong>Speaking tip</strong><p>Listen once for the overall meaning, then repeat slowly. Pay attention to word stress and sentence rhythm. SUNAI currently provides pronunciation playback; automatic speech scoring will be added in a later version.</p></div></div></section>}

          {activeNav === "Dictionary" && <section className="workspace-panel"><div className="workspace-heading"><div><span className="eyebrow">WORD EXPLORER</span><h2>English–Vietnamese Dictionary</h2><p>Search useful words and save vocabulary for revision.</p></div><div className="speaking-icon"><Languages size={23} /></div></div><label className="dictionary-search"><Search size={17} /><input value={dictionaryQuery} onChange={(e) => setDictionaryQuery(e.target.value)} placeholder="Search a word or Vietnamese meaning..." aria-label="Search dictionary" /></label><div className="dictionary-list">{filteredWords.map((item) => <article className="dictionary-entry" key={item.word}><div><div className="dictionary-word">{item.word}<em>{item.type}</em></div><strong>{item.meaning}</strong><p>{item.example}</p></div><div className="dictionary-actions"><button className="round-action" type="button" aria-label={`Pronounce ${item.word}`} onClick={() => speak(item.word)}><Volume2 size={16} /></button><button className={`round-action ${savedWords.includes(item.word) ? "saved" : ""}`} type="button" aria-label={`Save ${item.word}`} onClick={() => toggleSaved(item.word)}><Bookmark size={16} fill={savedWords.includes(item.word) ? "currentColor" : "none"} /></button></div></article>)}{filteredWords.length === 0 && <div className="empty-state">No matching words. Try another search.</div>}</div><div className="saved-count"><BookMarked size={15} /> {savedWords.length} saved words — stored on this device.</div></section>}

          {activeNav === "Achievements" && <section className="workspace-panel"><div className="workspace-heading"><div><span className="eyebrow">YOUR MILESTONES</span><h2>Achievements</h2><p>Every completed activity is a step forward.</p></div><div className="speaking-icon"><Trophy size={23} /></div></div><div className="achievement-summary"><div><strong>{completed}</strong><span>Practice sessions completed</span></div><div><strong>{savedWords.length}</strong><span>Words saved</span></div><div><strong>{completed * 20}</strong><span>Estimated XP earned</span></div></div><div className="achievement-grid"><Achievement icon={<Star size={21} />} title="First steps" desc="Complete your first practice session." unlocked={completed >= 1} /><Achievement icon={<Flame size={21} />} title="Keep it going" desc="Complete 5 practice sessions." unlocked={completed >= 5} /><Achievement icon={<BookOpen size={21} />} title="Word collector" desc="Save 5 new vocabulary words." unlocked={savedWords.length >= 5} /><Achievement icon={<Zap size={21} />} title="Dedicated learner" desc="Complete 10 practice sessions." unlocked={completed >= 10} /></div></section>}

          {activeNav === "Settings" && <section className="workspace-panel"><div className="workspace-heading"><div><span className="eyebrow">PREFERENCES</span><h2>Learning settings</h2><p>Adjust your learning experience.</p></div><div className="speaking-icon"><Settings2 size={23} /></div></div><div className="settings-list"><div className="setting-row"><div><strong>Daily learning reminder</strong><p>Show a reminder in your learning space.</p></div><button className={`toggle-switch ${settings.reminders ? "on" : ""}`} type="button" role="switch" aria-checked={settings.reminders} onClick={() => setSettings((s) => ({ ...s, reminders: !s.reminders }))}><span /></button></div><div className="setting-row"><div><strong>Sound and pronunciation</strong><p>Allow audio playback for vocabulary.</p></div><button className={`toggle-switch ${settings.sound ? "on" : ""}`} type="button" role="switch" aria-checked={settings.sound} onClick={() => setSettings((s) => ({ ...s, sound: !s.sound }))}><span /></button></div><div className="setting-row"><div><strong>Daily learning goal</strong><p>Choose how much time you want to spend learning.</p></div><select value={settings.dailyGoal} onChange={(e) => setSettings((s) => ({ ...s, dailyGoal: e.target.value }))}><option>10 minutes</option><option>15 minutes</option><option>20 minutes</option><option>30 minutes</option></select></div><div className="setting-row"><div><strong>Current English level</strong><p>Used to personalise future learning recommendations.</p></div><select value={settings.level} onChange={(e) => setSettings((s) => ({ ...s, level: e.target.value }))}><option>A1 - Beginner</option><option>A2 - Elementary</option><option>B1 - Intermediate</option><option>B2 - Upper intermediate</option><option>C1 - Advanced</option><option>C2 - Proficient</option></select></div></div><p className="feature-note">Các tuỳ chọn này hiện chỉ áp dụng trong phiên sử dụng; đồng bộ tài khoản và lưu cài đặt trên máy chủ sẽ được bổ sung khi tích hợp cơ sở dữ liệu.</p></section>}

          <footer className="workspace-footer">SUNAI · Learn Smarter. Speak Brighter.</footer>
        </div>
      </section>
    </main>
  );
}

function Achievement({ icon, title, desc, unlocked }: { icon: ReactNode; title: string; desc: string; unlocked: boolean }) {
  return <article className={`achievement-card ${unlocked ? "unlocked" : ""}`}><div className="achievement-icon">{unlocked ? icon : <Lock size={19} />}</div><div><strong>{title}</strong><p>{desc}</p><span>{unlocked ? "UNLOCKED" : "NOT YET UNLOCKED"}</span></div></article>;
}

function Overview({ completed, onGo, speak }: { completed: number; onGo: (section: Section) => void; speak: (text: string) => void }) {
  const stats = [
    { label: "Learning streak", value: "0 days", icon: Flame, tone: "yellow" },
    { label: "Estimated XP", value: `${completed * 20} XP`, icon: Zap, tone: "blue" },
    { label: "Practice sessions", value: String(completed), icon: BookOpen, tone: "green" },
    { label: "Weekly goal", value: `${Math.min(completed, 5)} / 5`, icon: Target, tone: "purple" },
  ];
  return <>
    <section className="hero"><div className="hero-copy"><div className="hero-tag"><Sparkles size={13} /> A brighter way to learn</div><h2>Small steps. Big progress.</h2><p>Build real-world English skills with bite-sized lessons, daily practice, and a learning path that grows with you.</p><button className="primary-button" type="button" onClick={() => window.location.assign("/courses")}>Explore learning paths <ChevronRight size={16} /></button></div><div className="hero-art" aria-hidden="true"><div className="sun-orbit"><div className="sun-core"><Star size={42} fill="currentColor" /></div><div className="orbit-dot" /></div><div className="floating-card"><Flame size={15} /> Start your streak</div></div></section>
    <div className="section-heading"><h3>Your learning at a glance</h3><button type="button" onClick={() => onGo("Achievements")}>View achievements <ChevronRight size={13} /></button></div>
    <section className="stats-grid" aria-label="Learning statistics">{stats.map(({ label, value, icon: Icon, tone }) => <div className="stat-card" key={label}><div className={`stat-icon ${tone}`}><Icon size={19} /></div><div><span className="stat-value">{value}</span><span className="stat-label">{label}</span></div></div>)}</section>
    <div className="dashboard-grid"><section><div className="section-heading"><h3>Pick up where you left off</h3><button type="button" onClick={() => window.location.assign("/courses")}>All courses <ChevronRight size={13} /></button></div><div className="panel"><div className="course-card"><div className="course-art"><BookOpen size={27} /></div><div className="course-info"><div className="course-level">STARTER PATH · A1</div><strong>English Foundations</strong><p>Build confidence with everyday English.</p><div className="progress-track"><div className="progress-fill" style={{ width: "0%" }} /></div></div><div className="course-percent">0%</div></div><p className="empty-note" style={{ margin: "15px 2px 0" }}>Your course progress will appear here as you complete lessons.</p></div><div className="section-heading"><h3>Explore how you can learn</h3></div><div className="quick-links"><button onClick={() => onGo("Practice")}><Brain size={18} /><span><strong>Practice</strong><small>Test your knowledge</small></span><ChevronRight size={15} /></button><button onClick={() => onGo("Speaking")}><Mic2 size={18} /><span><strong>Speaking</strong><small>Train pronunciation</small></span><ChevronRight size={15} /></button></div></section><section><div className="section-heading"><h3>Recent activity</h3><button type="button" onClick={() => onGo("Achievements")}>See all</button></div><div className="panel"><div className="activity-list"><div className="activity"><div className="activity-icon"><CheckCircle2 size={17} /></div><div className="activity-copy"><strong>Your journey begins</strong><span>Your SUNAI learning space is ready</span></div><span className="activity-xp">Welcome</span></div><div className="activity"><div className="activity-icon"><Award size={17} /></div><div className="activity-copy"><strong>Practice sessions</strong><span>{completed} completed so far</span></div><span className="activity-xp">+{completed * 20} XP</span></div></div></div><div className="section-heading"><h3>Daily inspiration</h3></div><div className="panel inspiration"><div><Sparkles size={14} /> A NOTE TO REMEMBER</div><p>“Every expert was once a beginner.”</p><span>Keep showing up. Your future self will thank you.</span><button type="button" onClick={() => speak("Every expert was once a beginner.")}><Volume2 size={14} /> Listen</button></div></section></div>
  </>;
}
