"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Award, BookOpen, Brain, CalendarDays, CheckCircle2, ChevronRight,
  Flame, Headphones, HelpCircle, Home, Languages, MessageCircle, Mic2,
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
  const [language, setLanguage] = useState<"en" | "vi">("en");
  const tr = (en: string, vi: string) => language === "vi" ? vi : en;
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
      const savedLanguage = (localStorage.getItem("sunai-language") as "en" | "vi") || "en";
      setLanguage(savedLanguage);
      setChat([{ from: "tutor", text: savedLanguage === "vi" ? "Xin chào! Mình là trợ lý học tập SUNAI. Bạn có thể hỏi mình về ngữ pháp, từ vựng hoặc giao tiếp tiếng Anh. (Trợ lý hiện đang ở chế độ demo.)" : "Hi! I’m your SUNAI study companion. Ask me about English grammar, vocabulary, or everyday conversations. (This tutor is currently in demo mode.)" }]);
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
          <div className="nav-label">{tr(group.title, group.title === "LEARNING SPACE" ? "KHÔNG GIAN HỌC TẬP" : "CÁ NHÂN")}</div>
          <nav className="nav-list" aria-label={group.title}>
            {group.items.map(({ label, icon: Icon }) => <button
              className={`nav-item ${activeNav === label ? "active" : ""}`} key={label}
              onClick={() => label === "My learning" ? window.location.assign("/courses") : go(label)} type="button"
              aria-current={activeNav === label ? "page" : undefined}>
              <Icon /><span>{tr(label, ({Overview:"Tổng quan","My learning":"Khóa học của tôi",Practice:"Luyện tập","AI Tutor":"Gia sư AI",Speaking:"Luyện nói",Dictionary:"Từ điển",Achievements:"Thành tích",Settings:"Cài đặt"} as Record<string,string>)[label] || label)}</span>{label === "AI Tutor" && <Sparkles size={13} style={{ marginLeft: "auto", color: "#ffc94a" }} />}
            </button>)}
          </nav>
        </div>)}
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><HelpCircle size={18} /></div>
            <strong>{tr("Need a little help?","Bạn cần hỗ trợ?")}</strong><p>{tr("Your learning journey is easier when you have a guide.","Hành trình học tập sẽ dễ dàng hơn khi có người đồng hành.")}</p>
            <button type="button" onClick={() => go("AI Tutor")}>{tr("Meet your AI tutor","Gặp gia sư AI")}</button>
          </div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="breadcrumb">{tr("Learning space","Không gian học tập")}&nbsp; / &nbsp;<strong>{tr(headerTitle, ({Overview:"Tổng quan","My learning":"Khóa học của tôi",Practice:"Luyện tập","AI Tutor":"Gia sư AI",Speaking:"Luyện nói",Dictionary:"Từ điển",Achievements:"Thành tích",Settings:"Cài đặt"} as Record<string,string>)[headerTitle] || headerTitle)}</strong></div>
          <div className="top-actions"><button className="language-switch" type="button" onClick={() => { const next = language === "en" ? "vi" : "en"; setLanguage(next); localStorage.setItem("sunai-language", next); }} aria-label="Switch language"><Languages size={15}/><span>{language === "en" ? "EN" : "VI"}</span><span className="language-chevron">⌄</span></button>
            <label className="top-search"><Search size={16} /><input aria-label={tr("Search courses","Tìm khóa học")} placeholder={tr("Search courses","Tìm khóa học")} value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") go("My learning"); }} /></label>
            <div className="notice-wrap"><button className="icon-button" type="button" aria-label={tr("Notifications","Thông báo")} onClick={() => setNoticeOpen(!noticeOpen)}><Bell size={17} /><span className="notification-dot" /></button>
              {noticeOpen && <div className="notice-popover"><strong>{tr("You’re all caught up!","Bạn đã xem hết thông báo!")}</strong><p>{tr("New learning reminders will appear here.","Nhắc nhở học tập mới sẽ hiển thị tại đây.")}</p></div>}
            </div>
            <div className="profile"><div className="avatar">S</div><div className="profile-copy"><strong>{tr("My learning space","Không gian học tập của tôi")}</strong><span>{tr("Welcome to SUNAI","Chào mừng đến với SUNAI")}</span></div></div>
          </div>
        </header>

        <div className="content">
          <div className="welcome-row"><div><div className="eyebrow">{tr(headerSubtitle[activeNav], ({Overview:"Hành trình tiếng Anh của bạn bắt đầu từ đây","My learning":"Chọn khóa học và tiếp tục tiến bộ",Practice:"Tự tin hơn qua những bài luyện tập ngắn","AI Tutor":"Người bạn đồng hành giải đáp tiếng Anh",Speaking:"Luyện phát âm và nói tiếng Anh",Dictionary:"Khám phá, hiểu và lưu từ mới",Achievements:"Ghi nhận từng bước tiến bộ",Settings:"Tùy chỉnh không gian học tập"} as Record<Section,string>)[activeNav])}</div><h1>{activeNav === "Overview" ? tr("Make today count.","Bắt đầu ngày mới đầy năng lượng.") : tr(activeNav, ({ "My learning":"Khóa học của tôi",Practice:"Luyện tập","AI Tutor":"Gia sư AI",Speaking:"Luyện nói",Dictionary:"Từ điển",Achievements:"Thành tích",Settings:"Cài đặt"} as Record<string,string>)[activeNav] || activeNav)}</h1><p>{activeNav === "Overview" ? tr("A little practice every day can take you a long way.","Chỉ cần luyện tập mỗi ngày, bạn sẽ tiến bộ từng chút một.") : tr(headerSubtitle[activeNav], ({Overview:"Hành trình tiếng Anh của bạn bắt đầu từ đây","My learning":"Chọn khóa học và tiếp tục tiến bộ",Practice:"Tự tin hơn qua những bài luyện tập ngắn","AI Tutor":"Người bạn đồng hành giải đáp tiếng Anh",Speaking:"Luyện phát âm và nói tiếng Anh",Dictionary:"Khám phá, hiểu và lưu từ mới",Achievements:"Ghi nhận từng bước tiến bộ",Settings:"Tùy chỉnh không gian học tập"} as Record<Section,string>)[activeNav])}</p></div>
            <div className="date-chip"><CalendarDays size={13} style={{ verticalAlign: "middle", marginRight: 7 }} />{tr("SUNAI Learning","Không gian SUNAI")}</div>
          </div>

          {activeNav === "Overview" && <Overview completed={completed} onGo={go} speak={speak} language={language} />}
          {activeNav === "Practice" && <section className="workspace-panel practice-panel">
            <div className="workspace-heading"><div><span className="eyebrow">{tr("DAILY PRACTICE","LUYỆN TẬP HẰNG NGÀY")}</span><h2>{tr("Quick English challenge","Thử thách tiếng Anh nhanh")}</h2><p>{tr("4 short questions to review grammar and vocabulary.","4 câu hỏi ngắn giúp ôn ngữ pháp và từ vựng.")}</p></div><div className="practice-counter">{practiceDone ? tr("Completed","Hoàn thành") : `${questionIndex + 1} / ${questions.length}`}</div></div>
            {!practiceDone ? <><div className="practice-progress"><span style={{ width: `${((questionIndex + (selected !== null ? 1 : 0)) / questions.length) * 100}%` }} /></div><div className="question-card"><span className="quiz-number">{tr("QUESTION","CÂU HỎI")} {questionIndex + 1}</span><h3>{questions[questionIndex].prompt}</h3><div className="quiz-options">{questions[questionIndex].options.map((option, index) => <button key={option} type="button" disabled={selected !== null} onClick={() => answerQuestion(index)} className={`quiz-option ${selected === index ? (index === questions[questionIndex].answer ? "correct" : "incorrect") : selected !== null && index === questions[questionIndex].answer ? "correct" : ""}`}><span>{String.fromCharCode(65 + index)}</span>{option}{selected !== null && index === questions[questionIndex].answer && <CircleCheck size={16} />}</button>)}</div>{selected !== null && <div className={`answer-explanation ${selected === questions[questionIndex].answer ? "good" : ""}`}>{selected === questions[questionIndex].answer ? tr("Correct! ","Chính xác! ") : tr("Not quite. ","Chưa đúng. ")}{questions[questionIndex].explain}</div>}</div><div className="workspace-actions"><span>{tr("Score:","Điểm:")} {score} {tr("correct","câu đúng")}</span><button className="primary-button" disabled={selected === null} onClick={nextQuestion}>{questionIndex === questions.length - 1 ? tr("Finish practice","Hoàn thành") : tr("Next question","Câu tiếp theo")} <ChevronRight size={16} /></button></div></> : <div className="practice-result"><div className="completion-icon"><Award size={34} /></div><h2>{tr("Practice complete!","Đã hoàn thành!")}</h2><p>{language === "vi" ? `Bạn trả lời đúng ${score}/${questions.length} câu hỏi.` : `You answered ${score} out of ${questions.length} questions correctly.`}</p><strong>{Math.round(score / questions.length * 100)}%</strong><button className="primary-button" onClick={resetPractice}><RotateCcw size={15} /> {tr("Try again","Thử lại")}</button></div>}
          </section>}

          {activeNav === "AI Tutor" && <section className="workspace-panel tutor-panel"><div className="workspace-heading"><div><span className="eyebrow">{tr("YOUR STUDY COMPANION","NGƯỜI BẠN ĐỒNG HÀNH")}</span><h2>{tr("Chat with SUNAI Tutor","Trò chuyện với gia sư SUNAI")}</h2><p>{tr("Ask about grammar, vocabulary, or how to build a sentence.","Hỏi về ngữ pháp, từ vựng hoặc cách đặt câu.")}</p></div><span className="demo-badge">{tr("DEMO MODE","CHẾ ĐỘ DEMO")}</span></div><div className="chat-window" aria-live="polite">{chat.map((item, index) => <div className={`chat-row ${item.from === "you" ? "chat-you" : ""}`} key={index}><div className="chat-avatar">{item.from === "you" ? "Y" : <Sparkles size={15} />}</div><div className="chat-bubble"><span>{item.from === "you" ? "YOU" : "SUNAI TUTOR"}</span><p>{item.text}</p></div></div>)}</div><form className="chat-composer" onSubmit={(e) => { e.preventDefault(); sendTutorMessage(); }}><input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder={tr("Ask an English question...","Đặt câu hỏi tiếng Anh...")} aria-label={tr("Message SUNAI Tutor","Nhắn tin cho gia sư SUNAI")} /><button className="primary-button" type="submit" disabled={!chatInput.trim()}><Send size={15} /> {tr("Send","Gửi")}</button></form><p className="feature-note">{language === "vi" ? "Lưu ý: đây là giao diện trợ lý demo, chưa kết nối mô hình AI/API nên câu trả lời đang dựa trên một số mẫu có sẵn." : "Note: this is a demo tutor interface. It is not connected to an AI model/API yet, so replies are based on a few built-in examples."}</p></section>}

          {activeNav === "Speaking" && <section className="workspace-panel"><div className="workspace-heading"><div><span className="eyebrow">{tr("SPEAKING STUDIO","PHÒNG LUYỆN NÓI")}</span><h2>{tr("Listen and repeat","Nghe và nhắc lại")}</h2><p>{tr("Hear a sentence, then practise saying it aloud.","Nghe một câu, sau đó luyện đọc thành tiếng.")}</p></div><div className="speaking-icon"><Mic2 size={23} /></div></div><label className="field-label" htmlFor="speaking-text">{tr("PRACTICE SENTENCE","CÂU LUYỆN TẬP")}</label><textarea id="speaking-text" className="speaking-textarea" value={speakingText} onChange={(e) => { setSpeakingText(e.target.value); }} rows={4} /><div className="speaking-actions"><button className="primary-button" type="button" onClick={() => speak(speakingText)} disabled={!speakingText.trim()}><Volume2 size={16} /> {tr("Listen to pronunciation","Nghe phát âm")}</button><button className="secondary-button" type="button" onClick={() => { setSpeakingText("Hello! My name is Alex. I enjoy learning English because it helps me connect with people around the world."); }}><RotateCcw size={15} /> {tr("Reset text","Đặt lại văn bản")}</button></div><div className="speaking-tip"><Headphones size={18} /><div><strong>{tr("Speaking tip","Mẹo luyện nói")}</strong><p>{tr("Listen","Nghe")} once for the overall meaning, then repeat slowly. Pay attention to word stress and sentence rhythm. SUNAI currently provides pronunciation playback; automatic speech scoring will be added in a later version.</p></div></div></section>}

          {activeNav === "Dictionary" && <section className="workspace-panel"><div className="workspace-heading"><div><span className="eyebrow">{tr("WORD EXPLORER","KHÁM PHÁ TỪ VỰNG")}</span><h2>{tr("English–Vietnamese Dictionary","Từ điển Anh – Việt")}</h2><p>{tr("Search useful words and save vocabulary for revision.","Tra cứu từ vựng và lưu lại để ôn tập.")}</p></div><div className="speaking-icon"><Languages size={23} /></div></div><label className="dictionary-search"><Search size={17} /><input value={dictionaryQuery} onChange={(e) => setDictionaryQuery(e.target.value)} placeholder={tr("Search a word or Vietnamese meaning...","Tìm từ tiếng Anh hoặc nghĩa tiếng Việt...")} aria-label={tr("Search dictionary","Tìm trong từ điển")} /></label><div className="dictionary-list">{filteredWords.map((item) => <article className="dictionary-entry" key={item.word}><div><div className="dictionary-word">{item.word}<em>{language === "vi" ? ({verb:"động từ",adjective:"tính từ",noun:"danh từ",conjunction:"liên từ"} as Record<string,string>)[item.type] || item.type : item.type}</em></div><strong>{item.meaning}</strong><p>{item.example}</p></div><div className="dictionary-actions"><button className="round-action" type="button" aria-label={`Pronounce ${item.word}`} onClick={() => speak(item.word)}><Volume2 size={16} /></button><button className={`round-action ${savedWords.includes(item.word) ? "saved" : ""}`} type="button" aria-label={`Save ${item.word}`} onClick={() => toggleSaved(item.word)}><Bookmark size={16} fill={savedWords.includes(item.word) ? "currentColor" : "none"} /></button></div></article>)}{filteredWords.length === 0 && <div className="empty-state">{tr("No matching words. Try another search.","Không tìm thấy từ phù hợp. Hãy thử từ khác.")}</div>}</div><div className="saved-count"><BookMarked size={15} /> {savedWords.length} {tr("saved words — stored on this device.","từ đã lưu — được lưu trên thiết bị này.")}</div></section>}

          {activeNav === "Achievements" && <section className="workspace-panel"><div className="workspace-heading"><div><span className="eyebrow">{tr("YOUR MILESTONES","CỘT MỐC CỦA BẠN")}</span><h2>{tr("Achievements","Thành tích")}</h2><p>{tr("Every completed activity is a step forward.","Mỗi hoạt động hoàn thành là một bước tiến.")}</p></div><div className="speaking-icon"><Trophy size={23} /></div></div><div className="achievement-summary"><div><strong>{completed}</strong><span>{tr("Practice sessions completed","Lượt luyện tập đã hoàn thành")}</span></div><div><strong>{savedWords.length}</strong><span>{tr("Words saved","Từ đã lưu")}</span></div><div><strong>{completed * 20}</strong><span>{tr("Estimated XP earned","XP ước tính đã nhận")}</span></div></div><div className="achievement-grid"><Achievement language={language} icon={<Star size={21} />} title={language === "vi" ? "Bước khởi đầu" : "First steps"} desc={language === "vi" ? "Hoàn thành lượt luyện tập đầu tiên." : "Complete your first practice session."} unlocked={completed >= 1} /><Achievement language={language} icon={<Flame size={21} />} title={language === "vi" ? "Kiên trì tiến bước" : "Keep it going"} desc={language === "vi" ? "Hoàn thành 5 lượt luyện tập." : "Complete 5 practice sessions."} unlocked={completed >= 5} /><Achievement language={language} icon={<BookOpen size={21} />} title={language === "vi" ? "Nhà sưu tập từ vựng" : "Word collector"} desc={language === "vi" ? "Lưu 5 từ vựng mới." : "Save 5 new vocabulary words."} unlocked={savedWords.length >= 5} /><Achievement language={language} icon={<Zap size={21} />} title={language === "vi" ? "Người học chăm chỉ" : "Dedicated learner"} desc={language === "vi" ? "Hoàn thành 10 lượt luyện tập." : "Complete 10 practice sessions."} unlocked={completed >= 10} /></div></section>}

          {activeNav === "Settings" && <section className="workspace-panel"><div className="workspace-heading"><div><span className="eyebrow">{tr("PREFERENCES","TÙY CHỈNH")}</span><h2>{tr("Learning settings","Cài đặt học tập")}</h2><p>{tr("Adjust your learning experience.","Tùy chỉnh trải nghiệm học tập.")}</p></div><div className="speaking-icon"><Settings2 size={23} /></div></div><div className="settings-list"><div className="setting-row"><div><strong>{tr("Daily learning reminder","Nhắc nhở học tập hằng ngày")}</strong><p>{tr("Show a reminder in your learning space.","Hiển thị lời nhắc trong không gian học tập.")}</p></div><button className={`toggle-switch ${settings.reminders ? "on" : ""}`} type="button" role="switch" aria-checked={settings.reminders} onClick={() => setSettings((s) => ({ ...s, reminders: !s.reminders }))}><span /></button></div><div className="setting-row"><div><strong>{tr("Sound and pronunciation","Âm thanh và phát âm")}</strong><p>{tr("Allow audio playback for vocabulary.","Cho phép phát âm thanh từ vựng.")}</p></div><button className={`toggle-switch ${settings.sound ? "on" : ""}`} type="button" role="switch" aria-checked={settings.sound} onClick={() => setSettings((s) => ({ ...s, sound: !s.sound }))}><span /></button></div><div className="setting-row"><div><strong>{tr("Daily learning goal","Mục tiêu học tập hằng ngày")}</strong><p>{tr("Choose how much time you want to spend learning.","Chọn thời gian bạn muốn dành cho việc học.")}</p></div><select value={settings.dailyGoal} onChange={(e) => setSettings((s) => ({ ...s, dailyGoal: e.target.value }))}><option value="10 minutes">{tr("10 minutes","10 phút")}</option><option value="15 minutes">{tr("15 minutes","15 phút")}</option><option value="20 minutes">{tr("20 minutes","20 phút")}</option><option value="30 minutes">{tr("30 minutes","30 phút")}</option></select></div><div className="setting-row"><div><strong>{tr("Current English level","Trình độ tiếng Anh hiện tại")}</strong><p>{tr("Used to personalise future learning recommendations.","Dùng để cá nhân hóa gợi ý học tập sau này.")}</p></div><select value={settings.level} onChange={(e) => setSettings((s) => ({ ...s, level: e.target.value }))}><option value="A1 - Beginner">{tr("A1 - Beginner","A1 - Cơ bản")}</option><option value="A2 - Elementary">{tr("A2 - Elementary","A2 - Sơ cấp")}</option><option value="B1 - Intermediate">{tr("B1 - Intermediate","B1 - Trung cấp")}</option><option value="B2 - Upper intermediate">{tr("B2 - Upper intermediate","B2 - Trung cấp cao")}</option><option value="C1 - Advanced">{tr("C1 - Advanced","C1 - Nâng cao")}</option><option value="C2 - Proficient">{tr("C2 - Proficient","C2 - Thành thạo")}</option></select></div></div><p className="feature-note">Các tuỳ chọn này hiện chỉ áp dụng trong phiên sử dụng; đồng bộ tài khoản và lưu cài đặt trên máy chủ sẽ được bổ sung khi tích hợp cơ sở dữ liệu.</p></section>}

          <footer className="workspace-footer">SUNAI · Learn Smarter. Speak Brighter.</footer>
        </div>
      </section>
    </main>
  );
}

function Achievement({ icon, title, desc, unlocked, language }: { icon: ReactNode; title: string; desc: string; unlocked: boolean; language: "en" | "vi" }) {
  return <article className={`achievement-card ${unlocked ? "unlocked" : ""}`}><div className="achievement-icon">{unlocked ? icon : <Lock size={19} />}</div><div><strong>{title}</strong><p>{desc}</p><span>{unlocked ? (language === "vi" ? "ĐÃ MỞ KHÓA" : "UNLOCKED") : (language === "vi" ? "CHƯA MỞ KHÓA" : "NOT YET UNLOCKED")}</span></div></article>;
}

function Overview({ completed, onGo, speak, language }: { completed: number; onGo: (section: Section) => void; speak: (text: string) => void; language: "en" | "vi" }) {
  const stats = [
    { label: "Learning streak", value: "0 days", icon: Flame, tone: "yellow" },
    { label: "Estimated XP", value: `${completed * 20} XP`, icon: Zap, tone: "blue" },
    { label: "Practice sessions", value: String(completed), icon: BookOpen, tone: "green" },
    { label: "Weekly goal", value: `${Math.min(completed, 5)} / 5`, icon: Target, tone: "purple" },
  ];
  return <>
    <section className="hero"><div className="hero-copy"><div className="hero-tag"><Sparkles size={13} /> {language === "vi" ? "Cách học thông minh hơn" : "A brighter way to learn"}</div><h2>{language === "vi" ? "Bước nhỏ, tiến bộ lớn." : "Small steps. Big progress."}</h2><p>{language === "vi" ? "Phát triển kỹ năng tiếng Anh thực tế qua bài học ngắn, luyện tập mỗi ngày và lộ trình học phù hợp với bạn." : "Build real-world English skills with bite-sized lessons, daily practice, and a learning path that grows with you."}</p><button className="primary-button" type="button" onClick={() => window.location.assign("/courses")}>{tr("Explore learning paths","Khám phá lộ trình học")} <ChevronRight size={16} /></button></div><div className="hero-art" aria-hidden="true"><div className="sun-orbit"><div className="sun-core"><Star size={42} fill="currentColor" /></div><div className="orbit-dot" /></div><div className="floating-card"><Flame size={15} /> {language === "vi" ? "Bắt đầu chuỗi ngày học" : "Start your streak"}</div></div></section>
    <div className="section-heading"><h3>{tr("Your learning at a glance","Tổng quan tiến độ học tập")}</h3><button type="button" onClick={() => onGo("Achievements")}>{tr("View achievements","Xem thành tích")} <ChevronRight size={13} /></button></div>
    <section className="stats-grid" aria-label="Learning statistics">{stats.map(({ label, value, icon: Icon, tone }) => <div className="stat-card" key={label}><div className={`stat-icon ${tone}`}><Icon size={19} /></div><div><span className="stat-value">{value}</span><span className="stat-label">{language === "vi" ? ({"Learning streak":"Chuỗi ngày học","Estimated XP":"XP ước tính","Practice sessions":"Lượt luyện tập","Weekly goal":"Mục tiêu tuần"} as Record<string,string>)[label] : label}</span></div></div>)}</section>
    <div className="dashboard-grid"><section><div className="section-heading"><h3>{tr("Pick up where you left off","Tiếp tục bài học trước")}</h3><button type="button" onClick={() => window.location.assign("/courses")}>{tr("All courses","Tất cả khóa học")} <ChevronRight size={13} /></button></div><div className="panel"><div className="course-card"><div className="course-art"><BookOpen size={27} /></div><div className="course-info"><div className="course-level">{tr("STARTER PATH · A1","LỘ TRÌNH CƠ BẢN · A1")}</div><strong>{tr("English Foundations","Nền tảng tiếng Anh")}</strong><p>{tr("Build confidence with everyday English.","Tự tin giao tiếp tiếng Anh hằng ngày.")}</p><div className="progress-track"><div className="progress-fill" style={{ width: "0%" }} /></div></div><div className="course-percent">0%</div></div><p className="empty-note" style={{ margin: "15px 2px 0" }}>{tr("Your course progress will appear here as you complete lessons.","Tiến độ khóa học sẽ hiển thị tại đây khi bạn hoàn thành bài học.")}</p></div><div className="section-heading"><h3>{tr("Explore how you can learn","Khám phá cách học")}</h3></div><div className="quick-links"><button onClick={() => onGo("Practice")}><Brain size={18} /><span><strong>{tr("Practice","Luyện tập")}</strong><small>{tr("Test your knowledge","Kiểm tra kiến thức")}</small></span><ChevronRight size={15} /></button><button onClick={() => onGo("Speaking")}><Mic2 size={18} /><span><strong>{tr("Speaking","Luyện nói")}</strong><small>{tr("Train pronunciation","Luyện phát âm")}</small></span><ChevronRight size={15} /></button></div></section><section><div className="section-heading"><h3>{tr("Recent activity","Hoạt động gần đây")}</h3><button type="button" onClick={() => onGo("Achievements")}>{tr("See all","Xem tất cả")}</button></div><div className="panel"><div className="activity-list"><div className="activity"><div className="activity-icon"><CheckCircle2 size={17} /></div><div className="activity-copy"><strong>{tr("Your journey begins","Hành trình của bạn bắt đầu")}</strong><span>{tr("Your SUNAI learning space is ready","Không gian học SUNAI đã sẵn sàng")}</span></div><span className="activity-xp">{language === "vi" ? "Chào mừng" : "Welcome"}</span></div><div className="activity"><div className="activity-icon"><Award size={17} /></div><div className="activity-copy"><strong>{tr("Practice sessions","Lượt luyện tập")}</strong><span>{language === "vi" ? `Đã hoàn thành ${completed} lượt` : `${completed} completed so far`}</span></div><span className="activity-xp">+{completed * 20} XP</span></div></div></div><div className="section-heading"><h3>{tr("Daily inspiration","Cảm hứng mỗi ngày")}</h3></div><div className="panel inspiration"><div><Sparkles size={14} /> {language === "vi" ? "ĐIỀU ĐÁNG GHI NHỚ" : "A NOTE TO REMEMBER"}</div><p>“Every expert was once a beginner.”</p><span>{tr("Keep showing up. Your future self will thank you.","Hãy kiên trì. Bạn của tương lai sẽ cảm ơn bạn.")}</span><button type="button" onClick={() => speak("Every expert was once a beginner.")}><Volume2 size={14} /> {tr("Listen","Nghe")}</button></div></section></div>
  </>;
}
