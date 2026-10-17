"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight, Award, BookOpen, Brain, Check, ChevronDown, ChevronRight,
  Flame, Globe2, Headphones, Home, Languages, Menu, MessageCircle,
  Mic2, Play, Search, Sparkles, Star, Target, Trophy, Volume2, X,
} from "lucide-react";

type Lang = "en" | "vi";

const copy = {
  en: {
    nav: ["Overview", "My learning", "Practice", "AI Tutor", "Speaking", "Dictionary"],
    greeting: "Good afternoon, Alex 👋",
    headline: "Your next chapter starts",
    highlight: "with one small step.",
    sub: "A little practice today takes you closer to confident English tomorrow.",
    continue: "Continue learning", explore: "Explore courses", streak: "Day streak",
    minutes: "Minutes learned", points: "XP earned", progress: "Weekly progress",
    today: "Your learning path", viewAll: "View all", continueCourse: "Continue",
    daily: "Daily challenge", question: "Choose the best answer",
    check: "Check answer", correct: "Brilliant! That's correct.", wrong: "Not quite. Give it another try!",
    tutor: "Meet your AI study buddy", tutorSub: "Ask questions, practise conversations, and get friendly guidance.", ask: "Try asking: How do I use the present perfect?", openTutor: "Open AI Tutor",
    goal: "Daily goal", goalSub: "You're doing great. Keep your streak alive!", dragons: "Dragon rewards", dragonSub: "Every lesson helps your little dragon grow.",
    beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced",
    skills: "Skills to grow", vocab: "Vocabulary", grammar: "Grammar", listening: "Listening", speaking: "Speaking",
    search: "Search lessons, words...", language: "Language",
  },
  vi: {
    nav: ["Tổng quan", "Khóa học của tôi", "Luyện tập", "Gia sư AI", "Phát âm", "Từ điển"],
    greeting: "Chào buổi chiều, Alex 👋",
    headline: "Hành trình mới bắt đầu",
    highlight: "từ một bước nhỏ.",
    sub: "Một chút luyện tập hôm nay sẽ giúp bạn tự tin giao tiếp tiếng Anh hơn ngày mai.",
    continue: "Học tiếp", explore: "Khám phá khóa học", streak: "Ngày liên tiếp",
    minutes: "Phút đã học", points: "XP đạt được", progress: "Tiến độ tuần",
    today: "Lộ trình học tập", viewAll: "Xem tất cả", continueCourse: "Tiếp tục",
    daily: "Thử thách mỗi ngày", question: "Chọn đáp án phù hợp nhất",
    check: "Kiểm tra đáp án", correct: "Tuyệt vời! Bạn đã trả lời đúng.", wrong: "Chưa chính xác. Thử lại nhé!",
    tutor: "Người bạn đồng hành AI", tutorSub: "Đặt câu hỏi, luyện hội thoại và nhận hướng dẫn thân thiện.", ask: "Thử hỏi: Khi nào dùng thì hiện tại hoàn thành?", openTutor: "Mở gia sư AI",
    goal: "Mục tiêu hằng ngày", goalSub: "Bạn đang tiến bộ rất tốt. Hãy giữ chuỗi học nhé!", dragons: "Phần thưởng rồng", dragonSub: "Mỗi bài học giúp chú rồng nhỏ trưởng thành.",
    beginner: "Cơ bản", intermediate: "Trung cấp", advanced: "Nâng cao",
    skills: "Kỹ năng cần phát triển", vocab: "Từ vựng", grammar: "Ngữ pháp", listening: "Nghe", speaking: "Nói",
    search: "Tìm bài học, từ vựng...", language: "Ngôn ngữ",
  },
};

const courses = [
  { id: 1, level: "A1", title: "Everyday English", vi: "Tiếng Anh hằng ngày", detail: "Build confidence with simple conversations.", detailVi: "Tự tin với những đoạn hội thoại đơn giản.", progress: 68, color: "peach", icon: "☀️", tag: "START HERE" },
  { id: 2, level: "A2", title: "English for Travel", vi: "Tiếng Anh du lịch", detail: "Speak with confidence wherever you go.", detailVi: "Giao tiếp tự tin ở bất cứ nơi đâu.", progress: 32, color: "mint", icon: "🧭", tag: "POPULAR" },
  { id: 3, level: "B1", title: "Confident Conversations", vi: "Hội thoại tự tin", detail: "Share ideas and express your opinions.", detailVi: "Chia sẻ ý tưởng và bày tỏ quan điểm.", progress: 12, color: "lilac", icon: "💬", tag: "LEVEL UP" },
];

const navIcons = [Home, BookOpen, Brain, MessageCircle, Mic2, Languages];

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("en");
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [choice, setChoice] = useState("has lived");
  const [query, setQuery] = useState("");
  const [tutorOpen, setTutorOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const t = copy[lang];
  const filtered = useMemo(() => courses.filter(c => (c.title + c.vi + c.detail).toLowerCase().includes(query.toLowerCase())), [query]);
  const answers = ["lives", "has lived", "is living"];
  const correct = choice === "has lived";

  function selectNav(i: number) {
    setSelected(i);
    setMobileNav(false);
    const ids = ["top", "courses", "practice", "tutor", "skills", "dictionary"];
    document.getElementById(ids[i])?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="aunora-shell" id="top">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand-lockup">
          <div className="brand-mark"><span>🐉</span></div>
          <div><strong>AUNORA</strong><small>LEARN • GROW • GLOW</small></div>
          <button className="close-nav" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={18}/></button>
        </div>
        <div className="side-label">{lang === "en" ? "LEARNING SPACE" : "KHÔNG GIAN HỌC TẬP"}</div>
        <nav className="side-nav">
          {t.nav.map((item, i) => { const Icon = navIcons[i]; return <button key={item} className={selected === i ? "nav-item active" : "nav-item"} onClick={() => selectNav(i)}><Icon size={18}/><span>{item}</span>{i === 3 && <span className="new-pill">AI</span>}</button>; })}
        </nav>
        <div className="sidebar-spacer"/>
        <div className="dragon-card">
          <div className="dragon-art">🐉</div>
          <strong>{t.dragons}</strong>
          <p>{t.dragonSub}</p>
          <div className="dragon-level"><span>LV. 04</span><span>320 / 500 XP</span></div>
          <div className="mini-track"><i/></div>
        </div>
        <div className="profile-row"><div className="avatar">A</div><div><strong>Alex Morgan</strong><small>{lang === "en" ? "A2 • Explorer" : "A2 • Nhà khám phá"}</small></div><ChevronDown size={16}/></div>
      </aside>

      {mobileNav && <button className="scrim" onClick={() => setMobileNav(false)} aria-label="Close navigation"/>}
      <section className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={21}/></button>
          <div className="crumb">AUNORA <ChevronRight size={14}/> <span>{t.nav[0]}</span></div>
          <div className="top-actions">
            <label className="search-box"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder={t.search}/><kbd>⌘ K</kbd></label>
            <button className="language-switch" onClick={() => setLang(lang === "en" ? "vi" : "en")}><Globe2 size={16}/>{lang === "en" ? "EN" : "VI"}<ChevronDown size={13}/></button>
            <button className="icon-button" aria-label="Notifications"><span className="notification-dot"/>✧</button>
          </div>
        </header>

        <div className="content-wrap">
          <section className="welcome-row">
            <div className="welcome-copy">
              <p className="eyebrow"><Sparkles size={14}/> {lang === "en" ? "YOUR PERSONAL LEARNING SPACE" : "KHÔNG GIAN HỌC TẬP CỦA BẠN"}</p>
              <h1>{t.greeting}</h1>
              <h2>{t.headline}<br/><em>{t.highlight}</em></h2>
              <p className="welcome-sub">{t.sub}</p>
              <div className="hero-actions"><a href="#courses" className="primary-button">{t.continue}<ArrowRight size={17}/></a><a href="#courses" className="text-button">{t.explore}</a></div>
            </div>
            <div className="hero-visual">
              <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
              <div className="hero-sun"><span>🐉</span></div>
              <div className="floating-note note-top"><Flame size={16}/> <b>7</b> {lang === "en" ? "day streak" : "ngày liên tiếp"}</div>
              <div className="floating-note note-bottom"><Star size={15} fill="currentColor"/> +40 XP</div>
              <div className="hero-caption">{lang === "en" ? "Your learning companion" : "Người bạn đồng hành"}</div>
            </div>
          </section>

          <section className="stats-grid">
            <article className="stat-card"><div className="stat-icon gold"><Flame size={19}/></div><div><small>{t.streak}</small><strong>7 <span>{lang === "en" ? "days" : "ngày"}</span></strong><em>+2 {lang === "en" ? "this week" : "tuần này"}</em></div></article>
            <article className="stat-card"><div className="stat-icon blue"><BookOpen size={19}/></div><div><small>{t.minutes}</small><strong>125 <span>min</span></strong><em>+18% {lang === "en" ? "this week" : "tuần này"}</em></div></article>
            <article className="stat-card"><div className="stat-icon violet"><Zap size={19}/></div><div><small>{t.points}</small><strong>840 <span>XP</span></strong><em>{lang === "en" ? "Top 15% learners" : "Top 15% người học"}</em></div></article>
            <article className="stat-card"><div className="stat-icon green"><Target size={19}/></div><div><small>{t.progress}</small><strong>78<span>%</span></strong><em>{lang === "en" ? "You're on track!" : "Bạn đang đúng tiến độ!"}</em></div></article>
          </section>

          <div className="section-grid">
            <section className="panel courses-panel" id="courses">
              <div className="section-heading"><div><p className="eyebrow">{lang === "en" ? "PICK UP WHERE YOU LEFT OFF" : "TIẾP TỤC HÀNH TRÌNH"}</p><h3>{t.today}</h3></div><button className="view-link">{t.viewAll}<ArrowRight size={15}/></button></div>
              <div className="course-list">
                {filtered.map(c => <article className="course-card" key={c.id}><div className={`course-icon ${c.color}`}>{c.icon}</div><div className="course-info"><div className="course-meta"><span className="level-tag">{c.level}</span><span className="course-tag">{c.tag}</span></div><h4>{lang === "en" ? c.title : c.vi}</h4><p>{lang === "en" ? c.detail : c.detailVi}</p><div className="progress-line"><i style={{width: c.progress + "%"}}/></div><small>{c.progress}% {lang === "en" ? "completed" : "hoàn thành"}</small></div><button className="round-arrow" aria-label="Continue course"><ArrowRight size={18}/></button></article>)}
                {filtered.length === 0 && <div className="empty-state">{lang === "en" ? "No matching courses found." : "Không tìm thấy khóa học phù hợp."}</div>}
              </div>
            </section>

            <section className="panel challenge-panel" id="practice">
              <div className="challenge-top"><span className="challenge-icon"><Brain size={18}/></span><span className="challenge-label">{t.daily}</span><span className="challenge-xp">+20 XP</span></div>
              <h3>{lang === "en" ? "A little grammar goes a long way." : "Một chút ngữ pháp tạo nên khác biệt."}</h3>
              <p className="question-text">{t.question}</p>
              <div className="question-box"><p>She _____ in London since 2020.</p><div className="answer-list">{answers.map(a => <button key={a} className={choice === a ? "answer-option chosen" : "answer-option"} onClick={() => {setChoice(a);setChecked(false);}}><span className="radio-dot"/>{a}</button>)}</div></div>
              {checked && <div className={correct ? "feedback good" : "feedback bad"}>{correct ? <Check size={15}/> : <X size={15}/>} {correct ? t.correct : t.wrong}</div>}
              <button className="check-button" onClick={() => setChecked(true)}>{t.check}<ChevronRight size={16}/></button>
            </section>
          </div>

          <div className="bottom-grid">
            <section className="tutor-banner" id="tutor"><div className="tutor-orb">✦</div><div className="tutor-copy"><span className="ai-label"><Sparkles size={13}/> AUNORA AI</span><h3>{t.tutor}</h3><p>{t.tutorSub}</p><button onClick={() => setTutorOpen(!tutorOpen)}>{t.openTutor}<ArrowRight size={16}/></button>{tutorOpen && <div className="tutor-reply">{lang === "en" ? "Hi! I'm your Aunora study buddy. I can explain grammar, suggest vocabulary, and help you practise. This is a preview chat." : "Xin chào! Mình là bạn học Aunora. Mình có thể giải thích ngữ pháp, gợi ý từ vựng và giúp bạn luyện tập. Đây là bản xem trước."}</div>}</div><div className="tutor-mascot">🐉</div></section>
            <section className="panel goal-panel"><div className="section-heading"><div><p className="eyebrow">{lang === "en" ? "SMALL STEPS, BIG WINS" : "TỪNG BƯỚC NHỎ, THÀNH QUẢ LỚN"}</p><h3>{t.goal}</h3></div><Award size={21} className="goal-award"/></div><div className="goal-number">18 <span>/ 25 min</span></div><div className="goal-track"><i/></div><p>{t.goalSub}</p></section>
          </div>

          <section className="skills-section" id="skills"><div className="section-heading"><div><p className="eyebrow">{lang === "en" ? "BALANCED LEARNING" : "HỌC TẬP TOÀN DIỆN"}</p><h3>{t.skills}</h3></div></div><div className="skill-cards"><div><BookOpen/><span>{t.vocab}</span><b>68%</b></div><div><Brain/><span>{t.grammar}</span><b>54%</b></div><div><Headphones/><span>{t.listening}</span><b>42%</b></div><div><Mic2/><span>{t.speaking}</span><b>36%</b></div></div></section>
          <footer className="footer"><span>© 2026 AUNORA</span><span>{lang === "en" ? "Learn • Grow • Glow" : "Học hỏi • Phát triển • Tỏa sáng"}</span></footer>
        </div>
      </section>
    </main>
  );
}
