"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock3, Headphones,
  Languages, Mic2, Search, Sparkles, Star, Target,
} from "lucide-react";

type Level = "All" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

const levels: Level[] = ["All", "A1", "A2", "B1", "B2", "C1", "C2"];

const courses = [
  { id:"a1-greetings", level:"A1", title:"English Foundations", subtitle:"Start speaking with confidence", lessons:12, minutes:90, category:"Beginner", color:"blue", skills:["Vocabulary","Speaking"], description:"Greetings, introductions, numbers, everyday phrases and simple questions." },
  { id:"a1-daily-life", level:"A1", title:"Everyday English", subtitle:"English for your daily routine", lessons:10, minutes:75, category:"Beginner", color:"yellow", skills:["Vocabulary","Listening"], description:"Talk about your family, home, school, hobbies and daily activities." },
  { id:"a2-travel", level:"A2", title:"English for Travel", subtitle:"Feel ready for your next trip", lessons:14, minutes:110, category:"Elementary", color:"green", skills:["Communication","Listening"], description:"Ask for directions, book a room, order food and handle common travel situations." },
  { id:"a2-grammar", level:"A2", title:"Grammar in Action", subtitle:"Build stronger everyday sentences", lessons:16, minutes:130, category:"Elementary", color:"purple", skills:["Grammar","Writing"], description:"Practice past and future forms, comparisons, modal verbs and sentence patterns." },
  { id:"b1-conversation", level:"B1", title:"Confident Conversations", subtitle:"Keep conversations flowing", lessons:15, minutes:120, category:"Intermediate", color:"blue", skills:["Speaking","Communication"], description:"Share opinions, tell stories, make plans and respond naturally." },
  { id:"b1-reading", level:"B1", title:"Reading the Real World", subtitle:"Understand useful texts and ideas", lessons:12, minutes:100, category:"Intermediate", color:"yellow", skills:["Reading","Vocabulary"], description:"Explore articles, messages and stories while learning words in context." },
  { id:"b2-academic", level:"B2", title:"Academic English Skills", subtitle:"Express complex ideas clearly", lessons:18, minutes:150, category:"Upper-intermediate", color:"green", skills:["Writing","Reading"], description:"Develop structured arguments, formal vocabulary and critical reading skills." },
  { id:"b2-listening", level:"B2", title:"Listen Beyond the Words", subtitle:"Follow natural English more easily", lessons:14, minutes:115, category:"Upper-intermediate", color:"purple", skills:["Listening","Speaking"], description:"Practice main ideas, details, implied meaning and different speaking styles." },
  { id:"c1-fluency", level:"C1", title:"Advanced Fluency Lab", subtitle:"Speak with nuance and precision", lessons:20, minutes:180, category:"Advanced", color:"blue", skills:["Speaking","Vocabulary"], description:"Refine collocations, register, idioms and nuanced expression." },
  { id:"c2-mastery", level:"C2", title:"English Mastery", subtitle:"Explore the finest shades of meaning", lessons:18, minutes:170, category:"Proficient", color:"yellow", skills:["Reading","Writing"], description:"Work with demanding texts, subtle meanings and sophisticated communication." },
];

export default function CoursesPage() {
  const [level, setLevel] = useState<Level>("All");
  const [query, setQuery] = useState("");
  const [skill, setSkill] = useState("All skills");

  const filtered = useMemo(() => courses.filter((course) => {
    const matchesLevel = level === "All" || course.level === level;
    const searchText = `${course.title} ${course.subtitle} ${course.description} ${course.level}`.toLowerCase();
    const matchesQuery = searchText.includes(query.trim().toLowerCase());
    const matchesSkill = skill === "All skills" || course.skills.includes(skill);
    return matchesLevel && matchesQuery && matchesSkill;
  }), [level, query, skill]);

  return (
    <main className="catalog-page">
      <header className="catalog-topbar">
        <Link className="back-link" href="/"><ArrowLeft size={16}/> Dashboard</Link>
        <div className="catalog-brand"><span className="catalog-brand-mark">S</span> SUN<span>AI</span></div>
        <div className="catalog-top-note"><Sparkles size={15}/> Your learning, your pace</div>
      </header>

      <section className="catalog-hero">
        <div className="catalog-hero-copy">
          <div className="catalog-eyebrow"><BookOpen size={14}/> SUNAI LEARNING PATHS</div>
          <h1>Find your next step<br/><span>in English.</span></h1>
          <p>From your very first words to advanced communication, choose a path that matches your goals.</p>
          <div className="catalog-hero-points">
            <span><CheckCircle2 size={15}/> Beginner to proficient</span>
            <span><CheckCircle2 size={15}/> Learn at your own pace</span>
          </div>
        </div>
        <div className="catalog-hero-art" aria-hidden="true">
          <div className="catalog-orbit orbit-one"/><div className="catalog-orbit orbit-two"/>
          <div className="catalog-book"><BookOpen size={57}/></div>
          <div className="catalog-floating"><Star size={14} fill="currentColor"/> Keep growing</div>
        </div>
      </section>

      <section className="catalog-content">
        <div className="catalog-heading-row">
          <div><div className="catalog-eyebrow">EXPLORE COURSES</div><h2>Learning paths for every level</h2><p>Choose a level to discover courses designed around real-life English.</p></div>
          <div className="course-count"><strong>{filtered.length}</strong><span> courses</span></div>
        </div>

        <div className="catalog-filters">
          <div className="level-tabs" role="group" aria-label="Filter by English level">
            {levels.map((item) => <button key={item} type="button" className={level === item ? "level-tab selected" : "level-tab"} onClick={() => setLevel(item)}>{item === "All" ? "All levels" : item}</button>)}
          </div>
          <div className="catalog-filter-row">
            <label className="catalog-search"><Search size={17}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search courses..." aria-label="Search courses"/></label>
            <select className="skill-select" value={skill} onChange={(event) => setSkill(event.target.value)} aria-label="Filter by skill">
              <option>All skills</option><option>Vocabulary</option><option>Grammar</option><option>Listening</option><option>Speaking</option><option>Reading</option><option>Writing</option><option>Communication</option>
            </select>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="course-grid">
            {filtered.map((course) => (
              <article className="catalog-course-card" key={course.id}>
                <div className={`catalog-card-art ${course.color}`}>
                  <div className="catalog-level-pill">{course.level}</div>
                  {course.skills[0] === "Listening" ? <Headphones size={36}/> : course.skills[0] === "Speaking" ? <Mic2 size={36}/> : course.skills[0] === "Vocabulary" ? <Languages size={36}/> : <BookOpen size={36}/>}
                  <span className="catalog-art-label">{course.category}</span>
                </div>
                <div className="catalog-card-body">
                  <div className="catalog-skill-tags">{course.skills.map((item) => <span key={item}>{item}</span>)}</div>
                  <h3>{course.title}</h3><div className="catalog-subtitle">{course.subtitle}</div>
                  <p>{course.description}</p>
                  <div className="catalog-course-meta"><span><BookOpen size={14}/>{course.lessons} lessons</span><span><Clock3 size={14}/>{course.minutes} min</span></div>
                  <Link className="course-start-button" href={`/lesson/${course.id}`}>Explore course <ArrowRight size={15}/></Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="catalog-empty"><Search size={26}/><h3>No courses found</h3><p>Try another keyword, level or skill filter.</p><button type="button" onClick={() => {setLevel("All");setQuery("");setSkill("All skills");}}>Clear filters</button></div>
        )}
      </section>
      <footer className="catalog-footer">SUNAI · Learn Smarter. Speak Brighter.</footer>
    </main>
  );
}
