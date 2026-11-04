import {useEffect,useMemo,useState} from 'react'
import emailjs from '@emailjs/browser'

// ✏️ EDIT THESE
const CFG={
  her:'Prati',            // her name / nickname
  me:'Sachin',         // your name
  photo:'',
  emailjs:{serviceId:'service_8v2kt66',templateId:'template_lg3268n',publicKey:'RlFShGphjv0Z3fbeZ'}, // from emailjs.com               // optional: '/her.jpg' placed in /public
}
const LETTER=[
  {t:'Hey you…',m:`I wrote this for you, ${CFG.her}. Every word came straight from my heart, so read it slowly, okay?`},
  {t:'Your smile',m:'There is a moment when you smile and my whole day quietly fixes itself. I never told you, but I look for that moment all the time.'},
  {t:'With you',m:'Even boring things feel like adventures with you. Chai, silence, a walk to nowhere — you make ordinary days feel special.'},
  {t:'So…',m:'I\'m not great at big speeches. I just wanted to say that you matter to me more than I know how to say. Ready for one little question?'},
]
const ASKS=['Soch lo na, please 🥺','Itna cute banda mana karega? 🥹','Main tumhe hamesha khush rakhunga 💕','Chai meri taraf se, hamesha ☕','Dekho YES button bada ho gaya 😌','Ab toh haan bol hi do… 💗','Bas ek baar YES dabao na! 🙈']
const PROMISES='I promise to hold your hand through every good day and every bad one, to make you laugh when you need it, and to choose you — again and again.'

function Hearts({n=16}){
  const hs=useMemo(()=>Array.from({length:n},()=>({l:Math.random()*100,s:12+Math.random()*26,d:8+Math.random()*10,de:-Math.random()*14,e:Math.random()>.5?'💗':'♥'})),[n])
  return <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
    {hs.map((h,i)=><span key={i} className="absolute bottom-[-40px] text-pink-300/70" style={{left:h.l+'%',fontSize:h.s,animation:`floatUp ${h.d}s linear ${h.de}s infinite`}}>{h.e}</span>)}
  </div>
}

function sendMail(answers,final,attempts){
  const e=CFG.emailjs
  const params={
    her_name:CFG.her,
    q1:answers[0]||'-',q2:answers[1]||'-',q3:answers[2]||'-',
    final_answer:final,
    attempts:String(attempts),
    time:new Date().toLocaleString(),
  }
  return emailjs.send(e.serviceId,e.templateId,params,{publicKey:e.publicKey}).catch(err=>console.error('EmailJS failed',err))
}

function Loader({next}){
  const [p,setP]=useState(0)
  useEffect(()=>{if(p>=100)return;const t=setTimeout(()=>setP(x=>Math.min(100,x+1+Math.random()*3)),55);return()=>clearTimeout(t)},[p])
  const done=p>=100
  return <div className="w-full max-w-md text-center fade">
    <h1 className="font-head text-3xl md:text-4xl font-extrabold mb-8 leading-tight">{done?'Found 1 result':'Searching for the prettiest smile…'}</h1>
    {!done&&<>
      <div className="h-4 rounded-full bg-white/15 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-pink-300 to-rose-500 transition-all" style={{width:p+'%'}}/></div>
      <p className="mt-3 text-pink-200">{Math.floor(p)}%</p></>}
    {done&&<div className="glass rounded-3xl p-6 rise flex items-center gap-4">
      <div className="w-20 h-20 rounded-full bg-pink-200/20 flex items-center justify-center text-4xl overflow-hidden beat">{CFG.photo?<img src={CFG.photo} className="w-full h-full object-cover" alt=""/>:'😊'}</div>
      <div className="text-left flex-1"><p className="font-head text-xl font-bold">{CFG.her}</p><p className="text-sm text-pink-200">Prettiest smile · 100% match</p></div>
      <button className="btn !px-5 !py-2" onClick={next}>Add</button>
    </div>}
  </div>
}

function Letter({next}){
  const [open,setOpen]=useState(false),[i,setI]=useState(0)
  if(!open)return <div className="text-center fade">
    <p className="font-hand text-3xl mb-6">You have a letter ♥</p>
    <button onClick={()=>setOpen(true)} className="relative w-72 h-48 rounded-xl bg-gradient-to-br from-rose-200 to-pink-300 shadow-2xl wiggle" aria-label="Open letter">
      <div className="absolute inset-x-0 top-0 h-24 bg-rose-300 rounded-t-xl" style={{clipPath:'polygon(0 0,100% 0,50% 100%)'}}/>
      <span className="absolute left-1/2 top-[58px] -translate-x-1/2 text-4xl beat">❤️</span>
    </button>
    <p className="mt-6 text-pink-200 text-sm">Tap the envelope</p></div>
  const L=LETTER[i]
  return <div className="w-full max-w-lg rise">
    <div className="rounded-3xl p-7 md:p-10 text-rose-950 shadow-2xl" style={{background:'#fff4f1',minHeight:380}}>
      <div key={i} className="fade flex flex-col h-full min-h-[300px]">
        <h2 className="font-hand text-4xl text-rose-600 mb-4">{L.t}</h2>
        <p className="font-hand text-2xl md:text-3xl leading-snug flex-1">{L.m}</p>
        {i===LETTER.length-1&&<p className="font-hand text-2xl text-right mt-4">Yours, {CFG.me} ♥</p>}
      </div>
      <div className="flex items-center justify-between mt-6">
        <span className="text-rose-400 text-sm">{i+1} / {LETTER.length}</span>
        <button className="btn" onClick={()=>i<LETTER.length-1?setI(i+1):next()}>Next</button>
      </div>
    </div>
  </div>
}

function Quiz({next,onAnswer}){
  const QS=[
    {q:'Coffee date this weekend? ☕',a:['Yes, obviously ☕','Only if you pay 😜','Cold coffee for me 🧋']},
    {q:'Long walk with me? 🌙',a:['Yes, hold my hand 🤝','Ice cream on the way 🍦','Till sunset 🌅']},
    {q:'Late night talks? 📞',a:['Till 4 AM 🌌','Call me right now 😍','Text and call both 💬']},
  ]
  const [i,setI]=useState(0),[sel,setSel]=useState(null)
  const pick=a=>{setSel(a);onAnswer(i,`${QS[i].q} → ${a}`);setTimeout(()=>{setSel(null);i<QS.length-1?setI(i+1):next()},700)}
  const Q=QS[i]
  return <div key={i} className="w-full max-w-md text-center fade">
    <p className="text-pink-200 mb-2">Question {i+1} of {QS.length}</p>
    <h2 className="font-head text-3xl font-extrabold mb-6">{Q.q}</h2>
    <div className="flex flex-col gap-3">
      {Q.a.map(t=><button key={t} disabled={!!sel} onClick={()=>pick(t)} className={`glass rounded-2xl p-4 text-lg font-medium transition ${sel===t?'!bg-rose-500/60 scale-105':''}`}>{t}</button>)}
    </div>
    {sel&&<p className="mt-4 text-pink-200 fade">Noted. Perfect answer 💕</p>}
  </div>
}

function Intro({next}){
  return <div className="text-center fade glass rounded-[2rem] px-8 py-12 w-full max-w-md">
    <p className="text-pink-300 text-2xl mb-3">So…</p>
    <h2 className="font-head text-4xl font-extrabold mb-10">Ek Question Puchu?</h2>
    <button className="btn" onClick={next}>Haan Pucho</button>
  </div>
}

function Ask({onYes,onNo}){
  const MAX=5
  const [n,setN]=useState(0),[pos,setPos]=useState(null),[box,setBox]=useState(null)
  const dodge=()=>{
    if(n>=MAX||!box)return
    setN(x=>x+1)
    setPos({x:Math.random()*Math.max(0,box.clientWidth-190),y:Math.random()*Math.max(0,box.clientHeight-52)})
  }
  const last=n>=MAX
  const scale=Math.min(1+n*.1,1.5)
  return <div className="text-center fade glass rounded-[2rem] px-6 py-10 w-full max-w-md">
    <h2 className="font-head text-4xl font-extrabold mb-4 leading-tight">Kya Tum Meri Girlfriend Banogi? 💜</h2>
    <p className="h-6 text-pink-200 mb-4">{last?'Chance khatam… ab tumhari marzi 🥺':n>0?ASKS[n-1]:''}</p>
    <p className="text-xs text-pink-300 mb-2">{n>0&&!last?`Attempt ${n} of ${MAX}`:''}</p>
    <div ref={setBox} className="relative w-full h-48 overflow-hidden">
      <button className="btn absolute z-20 left-1/2 top-2" style={{transform:`translateX(-50%) scale(${scale})`}} onClick={()=>onYes(n)}>💗 YES</button>
      <button className="btn-ghost absolute z-10 whitespace-nowrap" onPointerEnter={dodge} onClick={last?()=>onNo(n):dodge}
        style={pos?{left:pos.x,top:pos.y,transition:'all .25s'}:{left:'50%',bottom:0,transform:'translateX(-50%)'}}>{last?'No 💔':'Please Soch Lo 🧡'}</button>
    </div>
  </div>
}

function Broken({back}){
  return <div className="text-center fade glass rounded-[2rem] px-7 py-12 w-full max-w-md">
    <div className="text-7xl mb-4 grayscale">💔</div>
    <h2 className="font-head text-3xl font-extrabold mb-3">Oh… okay.</h2>
    <p className="text-pink-200 mb-8">Thank you for being honest. I'll always value you as someone special in my life.</p>
    <button className="btn-ghost" onClick={back}>Wait, I clicked wrong 🥺</button>
  </div>
}

function Confetti(){
  const items=useMemo(()=>Array.from({length:70},()=>({l:Math.random()*100,t:Math.random()*80+5,x:(Math.random()-.5)*200,y:(Math.random()-.5)*200,r:Math.random()*360+'deg',s:18+Math.random()*26,d:Math.random()*1.5,e:['💖','💗','🎉','✨','🌹','💕','🎊'][Math.floor(Math.random()*7)]})),[])
  return <div className="fixed inset-0 pointer-events-none overflow-hidden z-20" aria-hidden>
    {items.map((c,i)=><span key={i} className="absolute" style={{left:c.l+'%',top:c.t+'%',fontSize:c.s,'--x':c.x+'px','--y':c.y+'px','--r':c.r,animation:`pop 2.4s ease-out ${c.d}s infinite`}}>{c.e}</span>)}
  </div>
}

function Yes({next}){
  return <div className="text-center rise glass rounded-[2rem] px-7 py-10 w-full max-w-lg relative z-10">
    <div className="text-6xl beat mb-3">💑</div>
    <h2 className="font-head text-4xl font-extrabold mb-3">It's official! 🎉</h2>
    <p className="text-lg mb-5">{CFG.her}, you're now officially my girlfriend — and I'm the luckiest guy alive.</p>
    <p className="font-hand text-2xl text-pink-200 mb-7">“{PROMISES}”</p>
    <button className="btn" onClick={next}>Next</button>
  </div>
}

function Timer({start}){
  const [now,setNow]=useState(Date.now())
  useEffect(()=>{const t=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(t)},[])
  const s=Math.max(0,Math.floor((now-start)/1000))
  const u=[['Days',Math.floor(s/86400)],['Hours',Math.floor(s%86400/3600)],['Minutes',Math.floor(s%3600/60)],['Seconds',s%60]]
  return <div className="text-center fade w-full max-w-2xl">
    <div className="text-5xl beat mb-4">❤️</div>
    <h2 className="font-head text-3xl md:text-5xl font-extrabold mb-2">Together since</h2>
    <p className="text-pink-200 mb-8">{new Date(start).toLocaleString([], {dateStyle:'long',timeStyle:'short'})}</p>
    <div className="grid grid-cols-4 gap-2 md:gap-5">
      {u.map(([l,v])=><div key={l} className="glass rounded-2xl py-5 md:py-8"><div className="font-head text-3xl md:text-6xl font-extrabold">{String(v).padStart(2,'0')}</div><div className="text-xs md:text-base text-pink-200 mt-1">{l}</div></div>)}
    </div>
    <p className="font-hand text-3xl mt-10">and this is just the beginning, {CFG.her} ♥</p>
  </div>
}

export default function App(){
  const saved=(()=>{try{return Number(localStorage.getItem('acceptedAt'))||0}catch{return 0}})()
  const [start,setStart]=useState(saved)
  const [step,setStep]=useState(saved?6:0)
  const go=()=>setStep(s=>s+1)
  const [answers,setAnswers]=useState([])
  const onAnswer=(i,v)=>setAnswers(a=>{const b=[...a];b[i]=v;return b})
  const yes=(n=0)=>{sendMail(answers,'YES 💗 (said yes)',n);const t=Date.now();try{localStorage.setItem('acceptedAt',String(t))}catch{};setStart(t);setStep(5)}
  const props={next:go,onYes:yes,onNo:(n=5)=>{sendMail(answers,'NO 💔 (clicked No)',n);setStep(7)},onAnswer,back:()=>setStep(4),start}
  const S=[Loader,Letter,Quiz,Intro,Ask,Yes,Timer,Broken][step]
  return <main className="min-h-screen flex items-center justify-center p-5 relative">
    <Hearts/>{step===5&&<Confetti/>}
    <div className="relative z-10 w-full flex justify-center"><S key={step} {...props}/></div>
  </main>
}
