"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, Lightbulb, RotateCcw, Sparkles, Volume2 } from "lucide-react";

const lessonContent = {
  "a1-greetings": {
    level:"A1 · BEGINNER", course:"English Foundations", title:"Greetings and introductions",
    intro:"Learn how to greet someone, introduce yourself and ask a simple question.",
    objective:"By the end of this lesson, you can greet someone and say your name.",
    words:[{word:"Hello",type:"greeting",meaning:"Xin chào",example:"Hello, I'm Alex."},{word:"Good morning",type:"greeting",meaning:"Chào buổi sáng",example:"Good morning, everyone."},{word:"Nice to meet you",type:"expression",meaning:"Rất vui được gặp bạn",example:"Nice to meet you, Mia."},{word:"I'm...",type:"introduction",meaning:"Mình là...",example:"I'm Sam."}],
    dialogue:[{speaker:"Mia",line:"Hello! My name is Mia. What's your name?"},{speaker:"Sam",line:"Hi, I'm Sam. Nice to meet you."},{speaker:"Mia",line:"Nice to meet you too!"}],
    questions:[
      {prompt:"Which phrase is a friendly way to say hello in the morning?",options:["Good morning","Good night","See you later"],answer:0,explain:"“Good morning” is used as a greeting in the morning."},
      {prompt:"Complete the sentence: “_____ name is Alex.”",options:["Me","My","I"],answer:1,explain:"Use “My name is...” to introduce your name."},
      {prompt:"Someone says “Nice to meet you.” What is a suitable reply?",options:["I'm sleeping.","Nice to meet you too.","Good night yesterday."],answer:1,explain:"A natural response is “Nice to meet you too.”"}
    ]
  },
  "a1-daily-life": {
    level:"A1 · BEGINNER",course:"Everyday English",title:"Talk about your daily routine",intro:"Use simple present sentences to describe everyday activities.",objective:"By the end, you can describe a few things you do every day.",words:[{word:"Wake up",type:"verb",meaning:"Thức dậy",example:"I wake up at seven."},{word:"Have breakfast",type:"phrase",meaning:"Ăn sáng",example:"I have breakfast at home."},{word:"Go to school",type:"phrase",meaning:"Đi học",example:"I go to school by bus."},{word:"In the evening",type:"time phrase",meaning:"Vào buổi tối",example:"I read in the evening."}],dialogue:[{speaker:"Alex",line:"What time do you wake up?"},{speaker:"Linh",line:"I wake up at seven. Then I have breakfast."},{speaker:"Alex",line:"What do you do in the evening?"},{speaker:"Linh",line:"I do my homework and read a book."}],questions:[{prompt:"Choose the correct sentence.",options:["I wakes up at seven.","I wake up at seven.","I waking up at seven."],answer:1,explain:"With “I”, use the base verb: “I wake up”."},{prompt:"What does “have breakfast” mean?",options:["Ăn sáng","Đi ngủ","Đi học"],answer:0,explain:"“Have breakfast” means ăn sáng."},{prompt:"Complete: “She _____ to school every day.”",options:["go","goes","going"],answer:1,explain:"With he, she or it in the present simple, add -s or -es."}]
  }
};

type LessonKey = keyof typeof lessonContent;

export default function LessonPage() {
  const params = useParams<{id:string}>();
  const lesson = useMemo(() => lessonContent[params.id as LessonKey] ?? lessonContent["a1-greetings"], [params.id]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const [step, setStep] = useState<"learn"|"practice"|"complete">("learn");
  const score = lesson.questions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0);
  const allAnswered = lesson.questions.every((_, index) => answers[index] !== undefined);

  function selectAnswer(questionIndex:number, optionIndex:number) {
    if (checked) return;
    setAnswers((current) => ({...current,[questionIndex]:optionIndex}));
  }

  return (
    <main className="lesson-page">
      <header className="lesson-topbar"><Link href="/courses" className="back-link"><ArrowLeft size={16}/> All courses</Link><div className="catalog-brand"><span className="catalog-brand-mark">S</span> SUN<span>AI</span></div><div className="lesson-top-label"><Sparkles size={14}/> Learn by doing</div></header>
      <div className="lesson-layout">
        <aside className="lesson-sidebar"><div className="lesson-side-title">YOUR LESSON</div><div className="lesson-side-course">{lesson.course}</div><div className="lesson-step-list"><div className={step==="learn"?"lesson-step active":"lesson-step"}><span>1</span><div><strong>Learn</strong><small>Words and examples</small></div></div><div className={step==="practice"?"lesson-step active":"lesson-step"}><span>2</span><div><strong>Practice</strong><small>Check your understanding</small></div></div><div className={step==="complete"?"lesson-step active":"lesson-step"}><span>3</span><div><strong>Complete</strong><small>Review your result</small></div></div></div><div className="lesson-side-tip"><Lightbulb size={18}/><strong>Learning tip</strong><p>Say each new phrase out loud. Speaking helps you remember it.</p></div></aside>

        <section className="lesson-main">
          <div className="lesson-progress-row"><span>{lesson.level}</span><span>{step==="learn"?"Part 1 of 3":step==="practice"?"Part 2 of 3":"Part 3 of 3"}</span></div>
          <div className="lesson-progress"><span style={{width:step==="learn"?"33.33%":step==="practice"?"66.66%":"100%"}}/></div>

          {step==="learn" ? <div className="lesson-content">
            <div className="lesson-eyebrow"><BookOpen size={14}/> MINI LESSON</div><h1>{lesson.title}</h1><p className="lesson-intro">{lesson.intro}</p>
            <div className="lesson-objective"><TargetIcon/><span><strong>Today's goal</strong>{lesson.objective}</span></div>
            <h2>Key words and phrases</h2>
            <div className="vocab-grid">{lesson.words.map((item) => <article className="vocab-card" key={item.word}><div className="vocab-card-top"><span>{item.type}</span><button type="button" aria-label={`Listen to ${item.word}`} onClick={() => {if ("speechSynthesis" in window) {window.speechSynthesis.cancel();window.speechSynthesis.speak(new SpeechSynthesisUtterance(item.word));}}}><Volume2 size={16}/></button></div><h3>{item.word}</h3><div className="vocab-meaning">{item.meaning}</div><p>{item.example}</p></article>)}</div>
            <h2>See it in a conversation</h2><div className="dialogue-card">{lesson.dialogue.map((line,index)=><div className={index%2===0?"dialogue-line left":"dialogue-line right"} key={index}><span>{line.speaker}</span><p>{line.line}</p></div>)}</div>
            <div className="lesson-actions"><span>Take your time. You can review these phrases again.</span><button type="button" className="course-start-button" onClick={()=>setStep("practice")}>Start practice <ArrowRight size={16}/></button></div>
          </div> : null}

          {step==="practice" ? <div className="lesson-content">
            <div className="lesson-eyebrow"><CheckCircle2 size={14}/> QUICK CHECK</div><h1>Let's practise!</h1><p className="lesson-intro">Choose the best answer for each question. You’ll see an explanation after checking.</p>
            <div className="quiz-list">{lesson.questions.map((question,index)=><article className="quiz-card" key={question.prompt}><div className="quiz-number">QUESTION {index+1} OF {lesson.questions.length}</div><h3>{question.prompt}</h3><div className="quiz-options">{question.options.map((option,optionIndex)=><button key={option} type="button" disabled={checked} className={`quiz-option ${answers[index]===optionIndex?"chosen":""} ${checked&&optionIndex===question.answer?"correct":checked&&answers[index]===optionIndex&&optionIndex!==question.answer?"incorrect":""}`} onClick={()=>selectAnswer(index,optionIndex)}><span>{String.fromCharCode(65+optionIndex)}</span>{option}{checked&&optionIndex===question.answer?<Check size={16}/>:null}</button>)}</div>{checked?<div className={answers[index]===question.answer?"answer-explanation good":"answer-explanation"}>{answers[index]===question.answer?"Correct!":"Not quite."} {question.explain}</div>:null}</article>)}</div>
            <div className="lesson-actions"><button type="button" className="lesson-text-button" onClick={()=>{setStep("learn");setChecked(false);}}> <ArrowLeft size={15}/> Review lesson</button>{checked?<button type="button" className="course-start-button" onClick={()=>setStep("complete")}>See my result <ArrowRight size={16}/></button>:<button type="button" className="course-start-button" disabled={!allAnswered} onClick={()=>setChecked(true)}>Check answers <CheckCircle2 size={16}/></button>}</div>
          </div>:null}

          {step==="complete" ? <div className="lesson-content completion-content"><div className="completion-icon"><CheckCircle2 size={42}/></div><div className="lesson-eyebrow">LESSON FINISHED</div><h1>Nice work!</h1><p className="lesson-intro">You’ve completed this practice session. Every small step helps you build confidence.</p><div className="score-panel"><span>Your practice score</span><strong>{score} / {lesson.questions.length}</strong><div className="score-track"><span style={{width:`${score/lesson.questions.length*100}%`}}/></div><small>{score===lesson.questions.length?"Excellent work!":score>0?"Good effort. Review the explanations and try again.":"Keep practising. You can do it!"}</small></div><div className="completion-actions"><button type="button" className="lesson-outline-button" onClick={()=>{setAnswers({});setChecked(false);setStep("practice");}}><RotateCcw size={15}/> Try again</button><Link href="/courses" className="course-start-button">Explore more courses <ArrowRight size={16}/></Link></div></div>:null}
        </section>
      </div>
    </main>
  );
}

function TargetIcon() {
  return <span className="objective-icon"><Sparkles size={17}/></span>;
}
