"use client";

import { useState } from "react";
import {
  Award, BookOpen, Brain, CalendarDays, CheckCircle2,
  ChevronRight, Flame, Headphones, HelpCircle, Home, Languages,
  MessageCircle, Mic2, Search, Settings2, Sparkles, Star, Target,
  Trophy, Zap, Bell,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: Home },
  { label: "My learning", icon: BookOpen },
  { label: "Practice", icon: Brain },
  { label: "AI Tutor", icon: MessageCircle },
  { label: "Speaking", icon: Mic2 },
  { label: "Dictionary", icon: Languages },
];

const stats = [
  { label: "Learning streak", value: "0 days", icon: Flame, tone: "yellow" },
  { label: "Total XP", value: "0 XP", icon: Zap, tone: "blue" },
  { label: "Lessons completed", value: "0", icon: BookOpen, tone: "green" },
  { label: "Weekly goal", value: "0 / 5", icon: Target, tone: "purple" },
];

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [search, setSearch] = useState("");

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">S</div>
          <div className="brand-name">SUN<span>AI</span></div>
        </div>

        <div>
          <div className="nav-label">LEARNING SPACE</div>
          <nav className="nav-list" aria-label="Main navigation">
            {navItems.map(({ label, icon: Icon }) => (
              <button
                className={`nav-item ${activeNav === label ? "active" : ""}`}
                key={label}
                onClick={() => label === "My learning" ? window.location.assign("/courses") : setActiveNav(label)}
                type="button"
              >
                <Icon />
                <span>{label}</span>
                {label === "AI Tutor" && <Sparkles size={13} style={{ marginLeft: "auto", color: "#ffc94a" }} />}
              </button>
            ))}
          </nav>
        </div>

        <div>
          <div className="nav-label">PERSONAL</div>
          <nav className="nav-list" aria-label="Personal navigation">
            <button className="nav-item" type="button" onClick={() => setActiveNav("Achievements")}><Trophy /><span>Achievements</span></button>
            <button className="nav-item" type="button" onClick={() => setActiveNav("Settings")}><Settings2 /><span>Settings</span></button>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon"><HelpCircle size={18} /></div>
            <strong>Need a little help?</strong>
            <p>Your learning journey is easier when you have a guide.</p>
            <button type="button" onClick={() => setActiveNav("AI Tutor")}>Meet your AI tutor</button>
          </div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="breadcrumb">Learning space&nbsp; / &nbsp;<strong>{activeNav}</strong></div>
          <div className="top-actions">
            <label className="icon-button" aria-label="Search">
              <Search size={17} />
              <input
                aria-label="Search lessons"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search"
                style={{ position: "absolute", inset: 0, width: "100%", opacity: 0, cursor: "text" }}
              />
            </label>
            <button className="icon-button" type="button" aria-label="Notifications"><Bell size={17} /><span className="notification-dot" /></button>
            <div className="profile">
              <div className="avatar">S</div>
              <div className="profile-copy"><strong>My learning space</strong><span>Welcome to SUNAI</span></div>
            </div>
          </div>
        </header>

        <div className="content">
          <div className="welcome-row">
            <div>
              <div className="eyebrow">YOUR ENGLISH JOURNEY STARTS HERE</div>
              <h1>Make today count.</h1>
              <p>A little practice every day can take you a long way.</p>
            </div>
            <div className="date-chip"><CalendarDays size={13} style={{ verticalAlign: "middle", marginRight: 7 }} />Your learning dashboard</div>
          </div>

          <section className="hero">
            <div className="hero-copy">
              <div className="hero-tag"><Sparkles size={13} /> A brighter way to learn</div>
              <h2>Small steps. Big progress.</h2>
              <p>Build real-world English skills with bite-sized lessons, daily practice, and a learning path that grows with you.</p>
              <button className="primary-button" type="button" onClick={() => window.location.assign("/courses")}>
                Explore learning paths <ChevronRight size={16} />
              </button>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="sun-orbit">
                <div className="sun-core"><Star size={42} fill="currentColor" /></div>
                <div className="orbit-dot" />
              </div>
              <div className="floating-card"><Flame size={15} /> Start your streak</div>
            </div>
          </section>

          <div className="section-heading">
            <h3>Your learning at a glance</h3>
            <button type="button" onClick={() => setActiveNav("Achievements")}>View achievements <ChevronRight size={13} style={{ verticalAlign: "middle" }} /></button>
          </div>
          <section className="stats-grid" aria-label="Learning statistics">
            {stats.map(({ label, value, icon: Icon, tone }) => (
              <div className="stat-card" key={label}>
                <div className={`stat-icon ${tone}`}><Icon size={19} /></div>
                <div><span className="stat-value">{value}</span><span className="stat-label">{label}</span></div>
              </div>
            ))}
          </section>

          <div className="dashboard-grid">
            <section>
              <div className="section-heading">
                <h3>Pick up where you left off</h3>
                <button type="button" onClick={() => setActiveNav("My learning")}>All courses <ChevronRight size={13} style={{ verticalAlign: "middle" }} /></button>
              </div>
              <div className="panel">
                <div className="course-card">
                  <div className="course-art"><BookOpen size={27} /></div>
                  <div className="course-info">
                    <div className="course-level">STARTER PATH · A1</div>
                    <strong>English Foundations</strong>
                    <p>Build confidence with everyday English.</p>
                    <div className="progress-track"><div className="progress-fill" style={{ width: "0%" }} /></div>
                  </div>
                  <div className="course-percent">0%</div>
                </div>
                <p className="empty-note" style={{ margin: "15px 2px 0" }}>Your progress will appear here as you complete lessons. Start with the foundations and move forward at your own pace.</p>
              </div>

              <div className="section-heading"><h3>Explore how you can learn</h3></div>
              <div className="stats-grid" style={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}>
                <div className="stat-card"><div className="stat-icon blue"><Headphones size={19} /></div><div><span className="stat-value" style={{ fontSize: 13 }}>Listen</span><span className="stat-label">Train your listening</span></div></div>
                <div className="stat-card"><div className="stat-icon green"><Mic2 size={19} /></div><div><span className="stat-value" style={{ fontSize: 13 }}>Speak</span><span className="stat-label">Build speaking confidence</span></div></div>
              </div>
            </section>

            <section>
              <div className="section-heading"><h3>Recent activity</h3><button type="button">See all</button></div>
              <div className="panel">
                <div className="activity-list">
                  <div className="activity">
                    <div className="activity-icon"><CheckCircle2 size={17} /></div>
                    <div className="activity-copy"><strong>Your journey begins</strong><span>Your SUNAI learning space is ready</span></div>
                    <span className="activity-xp">Let's go</span>
                  </div>
                  <div className="activity">
                    <div className="activity-icon"><Award size={17} /></div>
                    <div className="activity-copy"><strong>First milestone</strong><span>Complete a lesson to earn your first XP</span></div>
                    <span className="activity-xp">+XP</span>
                  </div>
                </div>
              </div>

              <div className="section-heading"><h3>Daily inspiration</h3></div>
              <div className="panel" style={{ background: "#fffaf0", borderColor: "#f8edcf" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#b17a16", fontSize: 10, fontWeight: 800, letterSpacing: 1 }}><Sparkles size={14} /> A NOTE TO REMEMBER</div>
                <p style={{ color: "#5f5136", font: "700 15px Manrope, sans-serif", lineHeight: 1.6, margin: "13px 0 7px" }}>“Every expert was once a beginner.”</p>
                <span style={{ color: "#9a8969", fontSize: 10 }}>Keep showing up. Your future self will thank you.</span>
              </div>
            </section>
          </div>
          <footer style={{ textAlign: "center", color: "#9aa5b5", fontSize: 10, marginTop: 35 }}>SUNAI · Learn Smarter. Speak Brighter.</footer>
        </div>
      </section>
    </main>
  );
}
