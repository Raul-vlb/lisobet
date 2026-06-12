const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/worldCupResolver-CSTZuiDo.js","assets/supabase-J7ITh-P0.js"])))=>i.map(i=>d[i]);
import{c as Ie}from"./supabase-J7ITh-P0.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();const Me="https://tdnrtkzhyvtnvkvqcjbe.supabase.co/",$e="sb_publishable_jtvvF6xnHr-rKhlz7wGpIQ_FwhyGvfn",h=Ie(Me,$e,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}});async function Ae(e,a){const{error:t}=await h.auth.signInWithPassword({email:e,password:a});if(t)throw t}async function Je(e,a,t,n){const{error:o}=await h.auth.signUp({email:e,password:a,options:{data:{display_name:t,username:n}}});if(o)throw o}async function Ue(){const{error:e}=await h.auth.signOut();if(e)throw e}async function ke(){const{data:e,error:a}=await h.from("predictions").select("*").order("updated_at",{ascending:!1});if(a)throw a;return e??[]}async function Le(e,a,t){var s,i;const{data:n}=await h.auth.getSession(),o=(i=(s=n.session)==null?void 0:s.user)==null?void 0:i.id;if(!o)throw new Error("Usuário não autenticado");const{data:r,error:l}=await h.from("predictions").upsert({user_id:o,match_id:e,home_score:a,away_score:t,updated_at:new Date().toISOString()},{onConflict:"user_id,match_id"}).select().single();if(l)throw l;return r}async function Re(){const{data:e,error:a}=await h.from("match_results").select("*").order("updated_at",{ascending:!1});if(a)throw a;return e??[]}async function Pe(e,a,t){const{data:n,error:o}=await h.from("match_results").upsert({match_id:e,home_score:a,away_score:t,updated_at:new Date().toISOString()},{onConflict:"match_id"}).select().single();if(o)throw o;return n}async function Be(e,a){const{data:{user:t}}=await h.auth.getUser();if(!t)throw new Error("Usuário não autenticado");const{error:n}=await h.auth.updateUser({data:{...e!==void 0&&{display_name:e},...a!==void 0&&{avatar_url:a}}});if(n)throw n;const{error:o}=await h.from("profiles").update({...e!==void 0&&{display_name:e},...a!==void 0&&{avatar_url:a}}).eq("id",t.id);if(o)throw console.error("Erro ao salvar no banco:",o),o}const De="modulepreload",Ge=function(e){return"/lisobet/"+e},Z={},je=function(a,t,n){let o=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),s=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));o=Promise.allSettled(t.map(i=>{if(i=Ge(i),i in Z)return;Z[i]=!0;const d=i.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${u}`))return;const c=document.createElement("link");if(c.rel=d?"stylesheet":De,d||(c.as="script"),c.crossOrigin="",c.href=i,s&&c.setAttribute("nonce",s),document.head.appendChild(c),d)return new Promise((m,p)=>{c.addEventListener("load",m),c.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${i}`)))})}))}function r(l){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=l,window.dispatchEvent(s),!s.defaultPrevented)throw l}return o.then(l=>{for(const s of l||[])s.status==="rejected"&&r(s.reason);return a().catch(r)})},_e=[{id:"J1",group:"A",homeTeam:"MEX",awayTeam:"RSA",date:"2026-06-11",time:"13:00 UTC-6",stage:"group"},{id:"J2",group:"A",homeTeam:"KOR",awayTeam:"CZE",date:"2026-06-11",time:"20:00 UTC-6",stage:"group"},{id:"J3",group:"A",homeTeam:"CZE",awayTeam:"RSA",date:"2026-06-18",time:"12:00 UTC-4",stage:"group"},{id:"J4",group:"A",homeTeam:"MEX",awayTeam:"KOR",date:"2026-06-18",time:"19:00 UTC-6",stage:"group"},{id:"J5",group:"A",homeTeam:"CZE",awayTeam:"MEX",date:"2026-06-24",time:"19:00 UTC-6",stage:"group"},{id:"J6",group:"A",homeTeam:"RSA",awayTeam:"KOR",date:"2026-06-24",time:"19:00 UTC-6",stage:"group"},{id:"J7",group:"B",homeTeam:"CAN",awayTeam:"BIH",date:"2026-06-12",time:"15:00 UTC-4",stage:"group"},{id:"J8",group:"B",homeTeam:"QAT",awayTeam:"SUI",date:"2026-06-13",time:"12:00 UTC-7",stage:"group"},{id:"J9",group:"B",homeTeam:"SUI",awayTeam:"BIH",date:"2026-06-18",time:"12:00 UTC-7",stage:"group"},{id:"J10",group:"B",homeTeam:"CAN",awayTeam:"QAT",date:"2026-06-18",time:"15:00 UTC-7",stage:"group"},{id:"J11",group:"B",homeTeam:"SUI",awayTeam:"CAN",date:"2026-06-24",time:"12:00 UTC-7",stage:"group"},{id:"J12",group:"B",homeTeam:"BIH",awayTeam:"QAT",date:"2026-06-24",time:"12:00 UTC-7",stage:"group"},{id:"J13",group:"C",homeTeam:"BRA",awayTeam:"MAR",date:"2026-06-13",time:"18:00 UTC-4",stage:"group"},{id:"J14",group:"C",homeTeam:"HAI",awayTeam:"SCO",date:"2026-06-13",time:"21:00 UTC-4",stage:"group"},{id:"J15",group:"C",homeTeam:"SCO",awayTeam:"MAR",date:"2026-06-19",time:"18:00 UTC-4",stage:"group"},{id:"J16",group:"C",homeTeam:"BRA",awayTeam:"HAI",date:"2026-06-19",time:"20:30 UTC-4",stage:"group"},{id:"J17",group:"C",homeTeam:"SCO",awayTeam:"BRA",date:"2026-06-24",time:"18:00 UTC-4",stage:"group"},{id:"J18",group:"C",homeTeam:"MAR",awayTeam:"HAI",date:"2026-06-24",time:"18:00 UTC-4",stage:"group"},{id:"J19",group:"D",homeTeam:"USA",awayTeam:"PAR",date:"2026-06-12",time:"18:00 UTC-7",stage:"group"},{id:"J20",group:"D",homeTeam:"AUS",awayTeam:"TUR",date:"2026-06-13",time:"21:00 UTC-7",stage:"group"},{id:"J21",group:"D",homeTeam:"USA",awayTeam:"AUS",date:"2026-06-19",time:"12:00 UTC-7",stage:"group"},{id:"J22",group:"D",homeTeam:"TUR",awayTeam:"PAR",date:"2026-06-19",time:"20:00 UTC-7",stage:"group"},{id:"J23",group:"D",homeTeam:"TUR",awayTeam:"USA",date:"2026-06-25",time:"19:00 UTC-7",stage:"group"},{id:"J24",group:"D",homeTeam:"PAR",awayTeam:"AUS",date:"2026-06-25",time:"19:00 UTC-7",stage:"group"},{id:"J25",group:"E",homeTeam:"GER",awayTeam:"CUW",date:"2026-06-14",time:"12:00 UTC-5",stage:"group"},{id:"J26",group:"E",homeTeam:"CIV",awayTeam:"ECU",date:"2026-06-14",time:"19:00 UTC-4",stage:"group"},{id:"J27",group:"E",homeTeam:"GER",awayTeam:"CIV",date:"2026-06-20",time:"16:00 UTC-4",stage:"group"},{id:"J28",group:"E",homeTeam:"ECU",awayTeam:"CUW",date:"2026-06-20",time:"19:00 UTC-5",stage:"group"},{id:"J29",group:"E",homeTeam:"CUW",awayTeam:"CIV",date:"2026-06-25",time:"16:00 UTC-4",stage:"group"},{id:"J30",group:"E",homeTeam:"ECU",awayTeam:"GER",date:"2026-06-25",time:"16:00 UTC-4",stage:"group"},{id:"J31",group:"F",homeTeam:"NED",awayTeam:"JPN",date:"2026-06-14",time:"15:00 UTC-5",stage:"group"},{id:"J32",group:"F",homeTeam:"SWE",awayTeam:"TUN",date:"2026-06-14",time:"20:00 UTC-6",stage:"group"},{id:"J33",group:"F",homeTeam:"NED",awayTeam:"SWE",date:"2026-06-20",time:"12:00 UTC-5",stage:"group"},{id:"J34",group:"F",homeTeam:"TUN",awayTeam:"JPN",date:"2026-06-20",time:"22:00 UTC-6",stage:"group"},{id:"J35",group:"F",homeTeam:"JPN",awayTeam:"SWE",date:"2026-06-25",time:"18:00 UTC-5",stage:"group"},{id:"J36",group:"F",homeTeam:"TUN",awayTeam:"NED",date:"2026-06-25",time:"18:00 UTC-5",stage:"group"},{id:"J37",group:"G",homeTeam:"BEL",awayTeam:"EGY",date:"2026-06-15",time:"12:00 UTC-7",stage:"group"},{id:"J38",group:"G",homeTeam:"IRN",awayTeam:"NZL",date:"2026-06-15",time:"18:00 UTC-7",stage:"group"},{id:"J39",group:"G",homeTeam:"BEL",awayTeam:"IRN",date:"2026-06-21",time:"12:00 UTC-7",stage:"group"},{id:"J40",group:"G",homeTeam:"NZL",awayTeam:"EGY",date:"2026-06-21",time:"18:00 UTC-7",stage:"group"},{id:"J41",group:"G",homeTeam:"EGY",awayTeam:"IRN",date:"2026-06-26",time:"20:00 UTC-7",stage:"group"},{id:"J42",group:"G",homeTeam:"NZL",awayTeam:"BEL",date:"2026-06-26",time:"20:00 UTC-7",stage:"group"},{id:"J43",group:"H",homeTeam:"ESP",awayTeam:"CPV",date:"2026-06-15",time:"12:00 UTC-4",stage:"group"},{id:"J44",group:"H",homeTeam:"KSA",awayTeam:"URU",date:"2026-06-15",time:"18:00 UTC-4",stage:"group"},{id:"J45",group:"H",homeTeam:"ESP",awayTeam:"KSA",date:"2026-06-21",time:"12:00 UTC-4",stage:"group"},{id:"J46",group:"H",homeTeam:"URU",awayTeam:"CPV",date:"2026-06-21",time:"18:00 UTC-4",stage:"group"},{id:"J47",group:"H",homeTeam:"CPV",awayTeam:"KSA",date:"2026-06-26",time:"19:00 UTC-5",stage:"group"},{id:"J48",group:"H",homeTeam:"URU",awayTeam:"ESP",date:"2026-06-26",time:"18:00 UTC-6",stage:"group"},{id:"J49",group:"I",homeTeam:"FRA",awayTeam:"SEN",date:"2026-06-16",time:"15:00 UTC-4",stage:"group"},{id:"J50",group:"I",homeTeam:"IRQ",awayTeam:"NOR",date:"2026-06-16",time:"18:00 UTC-4",stage:"group"},{id:"J51",group:"I",homeTeam:"FRA",awayTeam:"IRQ",date:"2026-06-22",time:"17:00 UTC-4",stage:"group"},{id:"J52",group:"I",homeTeam:"NOR",awayTeam:"SEN",date:"2026-06-22",time:"20:00 UTC-4",stage:"group"},{id:"J53",group:"I",homeTeam:"NOR",awayTeam:"FRA",date:"2026-06-26",time:"15:00 UTC-4",stage:"group"},{id:"J54",group:"I",homeTeam:"SEN",awayTeam:"IRQ",date:"2026-06-26",time:"15:00 UTC-4",stage:"group"},{id:"J55",group:"J",homeTeam:"ARG",awayTeam:"ALG",date:"2026-06-16",time:"20:00 UTC-5",stage:"group"},{id:"J56",group:"J",homeTeam:"AUT",awayTeam:"JOR",date:"2026-06-16",time:"21:00 UTC-7",stage:"group"},{id:"J57",group:"J",homeTeam:"ARG",awayTeam:"AUT",date:"2026-06-22",time:"12:00 UTC-5",stage:"group"},{id:"J58",group:"J",homeTeam:"JOR",awayTeam:"ALG",date:"2026-06-22",time:"20:00 UTC-7",stage:"group"},{id:"J59",group:"J",homeTeam:"ALG",awayTeam:"AUT",date:"2026-06-27",time:"21:00 UTC-5",stage:"group"},{id:"J60",group:"J",homeTeam:"JOR",awayTeam:"ARG",date:"2026-06-27",time:"21:00 UTC-5",stage:"group"},{id:"J61",group:"K",homeTeam:"POR",awayTeam:"COD",date:"2026-06-17",time:"12:00 UTC-5",stage:"group"},{id:"J62",group:"K",homeTeam:"UZB",awayTeam:"COL",date:"2026-06-17",time:"20:00 UTC-6",stage:"group"},{id:"J63",group:"K",homeTeam:"POR",awayTeam:"UZB",date:"2026-06-23",time:"12:00 UTC-5",stage:"group"},{id:"J64",group:"K",homeTeam:"COL",awayTeam:"COD",date:"2026-06-23",time:"20:00 UTC-6",stage:"group"},{id:"J65",group:"K",homeTeam:"COL",awayTeam:"POR",date:"2026-06-27",time:"19:30 UTC-4",stage:"group"},{id:"J66",group:"K",homeTeam:"COD",awayTeam:"UZB",date:"2026-06-27",time:"19:30 UTC-4",stage:"group"},{id:"J67",group:"L",homeTeam:"ENG",awayTeam:"CRO",date:"2026-06-17",time:"15:00 UTC-5",stage:"group"},{id:"J68",group:"L",homeTeam:"GHA",awayTeam:"PAN",date:"2026-06-17",time:"19:00 UTC-4",stage:"group"},{id:"J69",group:"L",homeTeam:"ENG",awayTeam:"GHA",date:"2026-06-23",time:"16:00 UTC-4",stage:"group"},{id:"J70",group:"L",homeTeam:"PAN",awayTeam:"CRO",date:"2026-06-23",time:"19:00 UTC-4",stage:"group"},{id:"J71",group:"L",homeTeam:"PAN",awayTeam:"ENG",date:"2026-06-27",time:"17:00 UTC-4",stage:"group"},{id:"J72",group:"L",homeTeam:"CRO",awayTeam:"GHA",date:"2026-06-27",time:"17:00 UTC-4",stage:"group"}],Ne=[{id:"J73",stage:"round32",homeSlot:"2A",awaySlot:"2B",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J90",nextMatchSlot:"home",loserMatchId:null},{id:"J74",stage:"round32",homeSlot:"1E",awaySlot:"3rd-ABCDF",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J89",nextMatchSlot:"home",loserMatchId:null},{id:"J75",stage:"round32",homeSlot:"1F",awaySlot:"2C",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J90",nextMatchSlot:"away",loserMatchId:null},{id:"J76",stage:"round32",homeSlot:"1C",awaySlot:"2F",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J91",nextMatchSlot:"home",loserMatchId:null},{id:"J77",stage:"round32",homeSlot:"1I",awaySlot:"3rd-CDFGH",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J89",nextMatchSlot:"away",loserMatchId:null},{id:"J78",stage:"round32",homeSlot:"2E",awaySlot:"2I",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J91",nextMatchSlot:"away",loserMatchId:null},{id:"J79",stage:"round32",homeSlot:"1A",awaySlot:"3rd-CEFHI",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J92",nextMatchSlot:"home",loserMatchId:null},{id:"J80",stage:"round32",homeSlot:"1L",awaySlot:"3rd-EHIJK",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J92",nextMatchSlot:"away",loserMatchId:null},{id:"J81",stage:"round32",homeSlot:"1D",awaySlot:"3rd-BEFIJ",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J94",nextMatchSlot:"home",loserMatchId:null},{id:"J82",stage:"round32",homeSlot:"1G",awaySlot:"3rd-AEHIJ",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J94",nextMatchSlot:"away",loserMatchId:null},{id:"J83",stage:"round32",homeSlot:"2K",awaySlot:"2L",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J93",nextMatchSlot:"home",loserMatchId:null},{id:"J84",stage:"round32",homeSlot:"1H",awaySlot:"2J",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J93",nextMatchSlot:"away",loserMatchId:null},{id:"J85",stage:"round32",homeSlot:"1B",awaySlot:"3rd-EFGIJ",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J96",nextMatchSlot:"home",loserMatchId:null},{id:"J86",stage:"round32",homeSlot:"1J",awaySlot:"2H",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J95",nextMatchSlot:"home",loserMatchId:null},{id:"J87",stage:"round32",homeSlot:"1K",awaySlot:"3rd-DEIJL",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J96",nextMatchSlot:"away",loserMatchId:null},{id:"J88",stage:"round32",homeSlot:"2D",awaySlot:"2G",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J95",nextMatchSlot:"away",loserMatchId:null},{id:"J89",stage:"round16",homeSlot:"W74",awaySlot:"W77",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J97",nextMatchSlot:"home",loserMatchId:null},{id:"J90",stage:"round16",homeSlot:"W73",awaySlot:"W75",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J97",nextMatchSlot:"away",loserMatchId:null},{id:"J91",stage:"round16",homeSlot:"W76",awaySlot:"W78",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J99",nextMatchSlot:"home",loserMatchId:null},{id:"J92",stage:"round16",homeSlot:"W79",awaySlot:"W80",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J99",nextMatchSlot:"away",loserMatchId:null},{id:"J93",stage:"round16",homeSlot:"W83",awaySlot:"W84",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J98",nextMatchSlot:"home",loserMatchId:null},{id:"J94",stage:"round16",homeSlot:"W81",awaySlot:"W82",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J98",nextMatchSlot:"away",loserMatchId:null},{id:"J95",stage:"round16",homeSlot:"W86",awaySlot:"W88",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J100",nextMatchSlot:"home",loserMatchId:null},{id:"J96",stage:"round16",homeSlot:"W85",awaySlot:"W87",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J100",nextMatchSlot:"away",loserMatchId:null},{id:"J97",stage:"quarterfinal",homeSlot:"W89",awaySlot:"W90",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J101",nextMatchSlot:"home",loserMatchId:null},{id:"J98",stage:"quarterfinal",homeSlot:"W93",awaySlot:"W94",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J101",nextMatchSlot:"away",loserMatchId:null},{id:"J99",stage:"quarterfinal",homeSlot:"W91",awaySlot:"W92",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J102",nextMatchSlot:"home",loserMatchId:null},{id:"J100",stage:"quarterfinal",homeSlot:"W95",awaySlot:"W96",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J102",nextMatchSlot:"away",loserMatchId:null},{id:"J101",stage:"semifinal",homeSlot:"W97",awaySlot:"W98",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J104",nextMatchSlot:"home",loserMatchId:"J103"},{id:"J102",stage:"semifinal",homeSlot:"W99",awaySlot:"W100",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:"J104",nextMatchSlot:"away",loserMatchId:"J103"},{id:"J103",stage:"third_place",homeSlot:"L101",awaySlot:"L102",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:null,nextMatchSlot:null,loserMatchId:null},{id:"J104",stage:"final",homeSlot:"W101",awaySlot:"W102",homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:null,nextMatchSlot:null,loserMatchId:null}];function Oe(){return new Map(Ne.map(e=>[e.id,{...e}]))}const qa=[{matchId:"J74",eligibleGroups:["A","B","C","D","F"]},{matchId:"J77",eligibleGroups:["C","D","F","G","H"]},{matchId:"J79",eligibleGroups:["C","E","F","H","I"]},{matchId:"J80",eligibleGroups:["E","H","I","J","K"]},{matchId:"J81",eligibleGroups:["B","E","F","I","J"]},{matchId:"J82",eligibleGroups:["A","E","H","I","J"]},{matchId:"J85",eligibleGroups:["E","F","G","I","J"]},{matchId:"J87",eligibleGroups:["D","E","I","J","L"]}],Fe={user:null,predictions:new Map,matchResults:new Map,groupMatches:_e,standings:new Map,qualifiedTeams:new Map,knockoutMatches:Oe(),bestThirds:[],champion:null,loading:!0,initialized:!1,error:null};let S={...Fe};const N=new Set;function He(e){return N.add(e),()=>N.delete(e)}function pe(){const e=C();for(const a of N)a(e)}function C(){return S}function E(e){S=qe(S,e),e.type==="UPSERT_PREDICTION"||e.type==="SET_PREDICTIONS"||e.type==="SET_MATCH_RESULTS"?z():pe()}function qe(e,a){switch(a.type){case"SET_USER":return{...e,user:a.payload};case"SET_PREDICTIONS":return{...e,predictions:a.payload};case"SET_MATCH_RESULTS":return{...e,matchResults:a.payload};case"UPSERT_PREDICTION":{const t=new Map(e.predictions);return t.set(a.payload.matchId,a.payload),{...e,predictions:t}}case"SET_LOADING":return{...e,loading:a.payload};case"SET_ERROR":return{...e,error:a.payload};case"SET_INITIALIZED":return{...e,initialized:a.payload};case"RECALCULATE":return e;default:return e}}function z(){je(async()=>{const{resolveWorldCup:e}=await import("./worldCupResolver-CSTZuiDo.js");return{resolveWorldCup:e}},__vite__mapDeps([0,1])).then(({resolveWorldCup:e})=>{const a=e(S.predictions,S.matchResults,S.groupMatches);S={...S,standings:a.standings,bestThirds:a.bestThirds,qualifiedTeams:a.qualifiedTeams,knockoutMatches:a.knockoutMatches,champion:a.champion},pe()})}function A(e){E({type:"SET_USER",payload:e})}function he(e){E({type:"SET_PREDICTIONS",payload:e})}function We(e){E({type:"UPSERT_PREDICTION",payload:e})}function U(e){E({type:"SET_LOADING",payload:e})}function ge(e){E({type:"SET_INITIALIZED",payload:e})}function ze(e){E({type:"SET_MATCH_RESULTS",payload:e})}const ve="lisobet:predictions:v1";function fe(){try{const e=localStorage.getItem(ve);if(!e)return new Map;const a=JSON.parse(e);return new Map(a.map(t=>[t.matchId,t]))}catch{return new Map}}function Ve(e){try{const a=[...e.values()];localStorage.setItem(ve,JSON.stringify(a))}catch{console.warn("[LocalStorage] Falha ao salvar palpites")}}function Y(e){const a=fe();return a.set(e.matchId,e),Ve(a),a}function Ke(e,a){const t=new Map(e);for(const[n,o]of a){const r=e.get(n);if(!r||!r.updatedAt||!o.updatedAt){t.set(n,o);continue}const l=new Date(r.updatedAt).getTime(),s=new Date(o.updatedAt).getTime();t.set(n,s>=l?o:r)}return t}function ye(e){return{id:e.id,userId:e.user_id,matchId:e.match_id,homeScore:e.home_score,awayScore:e.away_score,updatedAt:e.updated_at}}async function Qe(e,a,t,n){const o={userId:n,matchId:e,homeScore:a,awayScore:t,updatedAt:new Date().toISOString()};Y(o);try{const r=await Le(e,a,t),l=ye(r);return Y(l),l}catch(r){return console.warn("[Predictions] Falha na sincronização remota:",r),o}}async function we(e){const a=fe();if(!e)return a;try{const t=await ke(),n=new Map(t.map(o=>[o.match_id,ye(o)]));return Ke(a,n)}catch(t){return console.warn("[Predictions] Falha ao buscar do servidor:",t),a}}const Ze="ab617d74-9d92-4d15-8804-fb2fa6e239da".split(",").map(e=>e.trim()).filter(Boolean);function V(e){return Ze.includes(e)}function X(e){const a=e.user_metadata??{};return{id:e.id,email:e.email??null,name:a.display_name??e.email??null,avatarUrl:a.avatar_url??a.picture??null,isAdmin:V(e.id)}}async function Ye(){U(!0);const{data:{session:e}}=await h.auth.getSession();if(e!=null&&e.user){const a=X(e.user);A(a),await ee(!0)}else{const a=await we(!1);he(a),z()}h.auth.onAuthStateChange(async(a,t)=>{if(t!=null&&t.user){const n=X(t.user);A(n),a==="SIGNED_IN"&&(U(!0),await ee(!0),U(!1))}else A(null)}),U(!1),ge(!0)}async function ee(e){try{const a=await we(e);he(a),z()}catch(a){console.error("[Auth] Erro ao sincronizar palpites:",a)}}async function Xe(e,a){await Ae(e,a)}async function ea(e,a,t,n){await Je(e,a,t,n)}async function aa(){await Ue(),A(null)}function be(e){return new Date(e+"T12:00:00").toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit",month:"short"})}function Te(e){if(!e.time)return new Date(e.date);const[a,t]=e.time.split(" ");let n=t.replace("UTC","");const o=n.startsWith("-")?"-":"+";let r=n.replace(/[+-]/,"");r.length===1&&(r="0"+r);const l=`${e.date}T${a}:00${o}${r}:00`;return new Date(l)}function O(e){return e==null?"?":String(e)}function Se(e){return{group:"Fase de Grupos",round32:"Oitavas de Final",round16:"Quartas-Oitavas",quarterfinal:"Quartas de Final",semifinal:"Semifinal",third_place:"3° Lugar",final:"Final"}[e]}function F(e){return e?e.split(" ").slice(0,2).map(a=>a[0]).join("").toUpperCase():"?"}function g(e,a="info",t=3e3){const n=document.getElementById("toast-root");if(!n)return;const o=document.createElement("div");o.className=`toast toast--${a}`,o.textContent=e,o.setAttribute("role","alert"),o.setAttribute("aria-live","polite"),n.appendChild(o),requestAnimationFrame(()=>{o.classList.add("toast--visible")}),setTimeout(()=>{o.classList.remove("toast--visible"),o.addEventListener("transitionend",()=>o.remove(),{once:!0})},t)}function k(e,a,t){return Math.min(Math.max(e,a),t)}function ta(e){let a="login";function t(){e.innerHTML=`
      <div class="auth-view">
        <div class="auth-container">
          <div class="auth-logo">
            <span class="auth-logo-text">LISOBET</span>
            <p class="auth-logo-sub">⚽ Bolão · Copa do Mundo 2026</p>
          </div>

          <div class="auth-card">
            <h2 class="auth-title">
              ${a==="login"?"Entrar na sua conta":"Criar conta"}
            </h2>

            <div class="auth-divider">com e-mail</div>

            <!-- Email Form -->
            <form class="auth-form" id="auth-form" novalidate>

              ${a==="register"?`
                <div class="form-group">
                  <label class="form-label" for="name-input">
                    Nome
                  </label>
                  <input
                    class="form-input"
                    id="name-input"
                    type="text"
                    placeholder="Seu nome"
                    autocomplete="name"
                    required
                  />
                </div>

                <div class="form-group">
                  <label class="form-label" for="username-input">
                    Usuário
                  </label>
                  <input
                    class="form-input"
                    id="username-input"
                    type="text"
                    placeholder="@usuario"
                    autocomplete="username"
                    required
                  />
                </div>
              `:""}

              <div class="form-group">
                <label class="form-label" for="email-input">
                  E-mail
                </label>
                <input
                  class="form-input"
                  id="email-input"
                  type="email"
                  placeholder="seu@email.com"
                  autocomplete="email"
                  required
                />
              </div>

              <div class="form-group">
                <label class="form-label" for="password-input">
                  Senha
                </label>
                <input
                  class="form-input"
                  id="password-input"
                  type="password"
                  placeholder="${a==="login"?"••••••••":"Mínimo 6 caracteres"}"
                  autocomplete="${a==="login"?"current-password":"new-password"}"
                  required
                  minlength="6"
                />
              </div>

              <div id="form-error"
                  class="form-error"
                  style="display:none">
              </div>

              <button
                type="submit"
                class="btn btn--primary btn--full"
                id="submit-btn">
                ${a==="login"?"Entrar":"Criar conta"}
              </button>

            </form>

            <div class="auth-toggle">
              ${a==="login"?'Não tem conta? <button id="toggle-mode">Criar conta</button>':'Já tem conta? <button id="toggle-mode">Entrar</button>'}
            </div>
          </div>
        </div>
      </div>
    `,n()}function n(){var o,r;(o=document.getElementById("toggle-mode"))==null||o.addEventListener("click",()=>{a=a==="login"?"register":"login",t()}),(r=document.getElementById("auth-form"))==null||r.addEventListener("submit",async l=>{var c,m,p,v,y,I,M,$;l.preventDefault();const s=(m=(c=document.getElementById("email-input"))==null?void 0:c.value)==null?void 0:m.trim(),i=(p=document.getElementById("password-input"))==null?void 0:p.value,d=document.getElementById("submit-btn"),u=document.getElementById("form-error");if(!(!s||!i)){if(a==="register"){const w=(y=(v=document.getElementById("name-input"))==null?void 0:v.value)==null?void 0:y.trim(),b=($=(M=(I=document.getElementById("username-input"))==null?void 0:I.value)==null?void 0:M.trim())==null?void 0:$.toLowerCase();if(!w){u.textContent="Informe seu nome.",u.style.display="block";return}if(!b){u.textContent="Informe um nome de usuário.",u.style.display="block";return}if(b.length<3){u.textContent="O usuário deve possuir pelo menos 3 caracteres.",u.style.display="block";return}}d.disabled=!0,d.textContent="Aguarde...",u.style.display="none";try{if(a==="login")await Xe(s,i);else{const w=document.getElementById("name-input").value.trim(),b=document.getElementById("username-input").value.trim().toLowerCase().replace(/^@/,"");await ea(s,i,w,b),g("Conta criada! Verifique seu e-mail.","success",5e3)}}catch(w){const b=w instanceof Error?w.message:"Erro desconhecido";u.textContent=oa(b),u.style.display="block",d.disabled=!1,d.textContent=a==="login"?"Entrar":"Criar conta"}}})}t()}function oa(e){return e.includes("Invalid login credentials")?"E-mail ou senha incorretos.":e.includes("Email not confirmed")?"Confirme seu e-mail antes de entrar.":e.includes("User already registered")?"Este e-mail já está cadastrado.":e.includes("Password should be")?"Senha deve ter pelo menos 6 caracteres.":e.includes("duplicate key")?"Este usuário já está em uso.":e.includes("username")?"Nome de usuário já cadastrado.":e}const D=[{id:1,name:"México",group:"A",abbr:"MEX",emoji:"🇲🇽"},{id:2,name:"Coreia do Sul",group:"A",abbr:"KOR",emoji:"🇰🇷"},{id:3,name:"República Tcheca",group:"A",abbr:"CZE",emoji:"🇨🇿"},{id:4,name:"África do Sul",group:"A",abbr:"RSA",emoji:"🇿🇦"},{id:5,name:"Canadá",group:"B",abbr:"CAN",emoji:"🇨🇦"},{id:6,name:"Bósnia e Herzegovina",group:"B",abbr:"BIH",emoji:"🇧🇦"},{id:7,name:"Qatar",group:"B",abbr:"QAT",emoji:"🇶🇦"},{id:8,name:"Suíça",group:"B",abbr:"SUI",emoji:"🇨🇭"},{id:9,name:"Brasil",group:"C",abbr:"BRA",emoji:"🇧🇷"},{id:10,name:"Marrocos",group:"C",abbr:"MAR",emoji:"🇲🇦"},{id:11,name:"Escócia",group:"C",abbr:"SCO",emoji:"🏴󠁧󠁢󠁳󠁣󠁴󠁿"},{id:12,name:"Haiti",group:"C",abbr:"HAI",emoji:"🇭🇹"},{id:13,name:"Estados Unidos",group:"D",abbr:"USA",emoji:"🇺🇸"},{id:14,name:"Paraguai",group:"D",abbr:"PAR",emoji:"🇵🇾"},{id:15,name:"Austrália",group:"D",abbr:"AUS",emoji:"🇦🇺"},{id:16,name:"Turquia",group:"D",abbr:"TUR",emoji:"🇹🇷"},{id:17,name:"Alemanha",group:"E",abbr:"GER",emoji:"🇩🇪"},{id:18,name:"Equador",group:"E",abbr:"ECU",emoji:"🇪🇨"},{id:19,name:"Costa do Marfim",group:"E",abbr:"CIV",emoji:"🇨🇮"},{id:20,name:"Curaçao",group:"E",abbr:"CUW",emoji:"🇨🇼"},{id:21,name:"Holanda",group:"F",abbr:"NED",emoji:"🇳🇱"},{id:22,name:"Japão",group:"F",abbr:"JPN",emoji:"🇯🇵"},{id:23,name:"Tunísia",group:"F",abbr:"TUN",emoji:"🇹🇳"},{id:24,name:"Suécia",group:"F",abbr:"SWE",emoji:"🇸🇪"},{id:25,name:"Bélgica",group:"G",abbr:"BEL",emoji:"🇧🇪"},{id:26,name:"Irã",group:"G",abbr:"IRN",emoji:"🇮🇷"},{id:27,name:"Egito",group:"G",abbr:"EGY",emoji:"🇪🇬"},{id:28,name:"Nova Zelândia",group:"G",abbr:"NZL",emoji:"🇳🇿"},{id:29,name:"Espanha",group:"H",abbr:"ESP",emoji:"🇪🇸"},{id:30,name:"Uruguai",group:"H",abbr:"URU",emoji:"🇺🇾"},{id:31,name:"Arábia Saudita",group:"H",abbr:"KSA",emoji:"🇸🇦"},{id:32,name:"Cabo Verde",group:"H",abbr:"CPV",emoji:"🇨🇻"},{id:33,name:"França",group:"I",abbr:"FRA",emoji:"🇫🇷"},{id:34,name:"Senegal",group:"I",abbr:"SEN",emoji:"🇸🇳"},{id:35,name:"Noruega",group:"I",abbr:"NOR",emoji:"🇳🇴"},{id:36,name:"Iraque",group:"I",abbr:"IRQ",emoji:"🇮🇶"},{id:37,name:"Argentina",group:"J",abbr:"ARG",emoji:"🇦🇷"},{id:38,name:"Áustria",group:"J",abbr:"AUT",emoji:"🇦🇹"},{id:39,name:"Argélia",group:"J",abbr:"ALG",emoji:"🇩🇿"},{id:40,name:"Jordânia",group:"J",abbr:"JOR",emoji:"🇯🇴"},{id:41,name:"Portugal",group:"K",abbr:"POR",emoji:"🇵🇹"},{id:42,name:"Colômbia",group:"K",abbr:"COL",emoji:"🇨🇴"},{id:43,name:"Uzbequistão",group:"K",abbr:"UZB",emoji:"🇺🇿"},{id:44,name:"Rep. Dem. do Congo",group:"K",abbr:"COD",emoji:"🇨🇩"},{id:45,name:"Inglaterra",group:"L",abbr:"ENG",emoji:"🏴󠁧󠁢󠁥󠁮󠁧󠁿"},{id:46,name:"Croácia",group:"L",abbr:"CRO",emoji:"🇭🇷"},{id:47,name:"Gana",group:"L",abbr:"GHA",emoji:"🇬🇭"},{id:48,name:"Panamá",group:"L",abbr:"PAN",emoji:"🇵🇦"}],B=new Map(D.map(e=>[e.abbr,e]));new Map(D.map(e=>[e.id,e]));const na=["A","B","C","D","E","F","G","H","I","J","K","L"];function ra(e){return D.filter(a=>a.group===e)}function ae(e){return e.yellowCards*1+e.redCards*3}function ia(e,a,t,n){let o=0,r=0,l=0;for(const s of t){const i=n.get(s.id);if(!i)continue;const d=s.homeTeam===e&&s.awayTeam===a,u=s.homeTeam===a&&s.awayTeam===e;if(!d&&!u)continue;const{homeScore:c,awayScore:m}=i;d?(l+=c,r+=c-m,c>m?o+=3:c===m&&(o+=1)):(l+=m,r+=m-c,m>c?o+=3:m===c&&(o+=1))}return{pointsA:o,goalDiffA:r,goalsForA:l}}function la(e,a,t,n){if(a.points!==e.points)return a.points-e.points;if(a.goalDiff!==e.goalDiff)return a.goalDiff-e.goalDiff;if(a.goalsFor!==e.goalsFor)return a.goalsFor-e.goalsFor;const o=ia(e.team.abbr,a.team.abbr,t,n);if(o.pointsA!==0)return-o.pointsA;if(o.goalDiffA!==0)return-o.goalDiffA;if(o.goalsForA!==0)return-o.goalsForA;const r=ae(e),l=ae(a);return r!==l?r-l:e.team.abbr.localeCompare(a.team.abbr)}function sa(e,a,t){return[...e].sort((n,o)=>la(n,o,a,t))}function da(e,a,t){const n=ra(e),o=new Map(n.map(i=>[i.abbr,{team:i,played:0,won:0,drawn:0,lost:0,goalsFor:0,goalsAgainst:0,goalDiff:0,points:0,yellowCards:0,redCards:0}])),r=a.filter(i=>i.group===e);for(const i of r){const d=t.get(i.id);if(!d)continue;const u=o.get(i.homeTeam),c=o.get(i.awayTeam);if(!u||!c)continue;const{homeScore:m,awayScore:p}=d;u.goalsFor+=m,u.goalsAgainst+=p,c.goalsFor+=p,c.goalsAgainst+=m,u.played+=1,c.played+=1,m>p?(u.won+=1,u.points+=3,c.lost+=1):m<p?(c.won+=1,c.points+=3,u.lost+=1):(u.drawn+=1,u.points+=1,c.drawn+=1,c.points+=1)}for(const i of o.values())i.goalDiff=i.goalsFor-i.goalsAgainst;const l=[...o.values()];return sa(l,r,t).map((i,d)=>({...i,position:d+1}))}function Wa(e,a){const t=[...new Set(D.map(o=>o.group))].sort(),n=new Map;for(const o of t)n.set(o,da(o,e,a));return n}function za(e){var a,t,n;return{winner:((a=e[0])==null?void 0:a.team)??null,runnerUp:((t=e[1])==null?void 0:t.team)??null,third:((n=e[2])==null?void 0:n.team)??null}}function ca(e,a,t){const n=a.filter(r=>r.group===e);return{filled:n.filter(r=>t.has(r.id)).length,total:n.length}}function ua(e){return/^1[A-L]$/.test(e)?`1° Grupo ${e[1]}`:/^2[A-L]$/.test(e)?`2° Grupo ${e[1]}`:e.startsWith("3rd-")?`3° Mel. (${e.slice(4).split("").join("/")})`:e.startsWith("W")?`Venc. J${e.slice(1)}`:e.startsWith("L")?`Perdedor J${e.slice(1)}`:e}function H(e,a){return e?e.name:ua(a)}function q(e){return(e==null?void 0:e.emoji)??"🏳️"}function W(e,a){return e?e.abbr:/^[12][A-L]$/.test(a)?a:a.startsWith("3rd-")?"3rd":a.startsWith("W")?`W${a.slice(1)}`:a.startsWith("L")?`L${a.slice(1)}`:"?"}function ma(e){return e.homeTeam!==null&&e.awayTeam!==null}function te(e,a){return[...e.values()].filter(t=>t.stage===a).sort((t,n)=>{const o=parseInt(t.id.slice(1)),r=parseInt(n.id.slice(1));return o-r})}function pa(e){const a=[{stage:"round32",label:"Oitavas"},{stage:"round16",label:"Quartas-Oitavas"},{stage:"quarterfinal",label:"Quartas"},{stage:"semifinal",label:"Semifinal"}],t=[],n=[];for(const{stage:r,label:l}of a){const s=te(e,r),i=Math.ceil(s.length/2);t.push({stage:r,label:l,matches:s.slice(0,i)}),n.push({stage:r,label:l,matches:s.slice(i)})}const o=te(e,"final");return{leftColumns:t,rightColumns:n.reverse(),finalColumn:o.length>0?{stage:"final",label:"Final",matches:o}:null}}let R=null;function ha(e,a,t){const n=B.get(e.homeTeam)??null,o=B.get(e.awayTeam)??null,l=C().predictions.get(e.id);xe({matchId:e.id,homeTeam:n,awayTeam:o,homeSlot:e.homeTeam,awaySlot:e.awayTeam,date:e.date,stage:Se(e.stage),existingHome:l==null?void 0:l.homeScore,existingAway:l==null?void 0:l.awayScore},a,t)}function ga(e,a,t){const o=C().predictions.get(e.id);xe({matchId:e.id,homeTeam:e.homeTeam,awayTeam:e.awayTeam,homeSlot:e.homeSlot,awaySlot:e.awaySlot,date:"2026-07-01",stage:Se(e.stage),existingHome:o==null?void 0:o.homeScore,existingAway:o==null?void 0:o.awayScore},a,t)}function xe(e,a,t){var y,I,M,$,w,b,K,Q;x();let n=e.existingHome??0,o=e.existingAway??0;const r=document.createElement("div");r.className="modal-overlay",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.setAttribute("aria-label","Palpite do jogo");const l=H(e.homeTeam,e.homeSlot),s=H(e.awayTeam,e.awaySlot),i=q(e.homeTeam),d=q(e.awayTeam),u=W(e.homeTeam,e.homeSlot),c=W(e.awayTeam,e.awaySlot),m=e.homeTeam&&e.awayTeam;r.innerHTML=`
    <div class="modal-box">
      <div class="modal-header">
        <div class="modal-title">
          <span>⚽</span>
          <span>Seu Palpite — ${e.matchId}</span>
        </div>
        <button class="modal-close btn btn--ghost btn--icon" id="modal-close" aria-label="Fechar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <!-- Teams -->
        <div class="modal-matchup">
          <div class="modal-team">
            <span class="modal-team-flag">${i}</span>
            <span class="modal-team-name">${l}</span>
            <span class="modal-team-abbr">${u}</span>
          </div>
          <div class="modal-vs">VS</div>
          <div class="modal-team">
            <span class="modal-team-flag">${d}</span>
            <span class="modal-team-name">${s}</span>
            <span class="modal-team-abbr">${c}</span>
          </div>
        </div>

        ${m?"":`
          <div style="text-align:center;padding:var(--space-4);color:var(--color-text-muted);font-size:14px;background:var(--color-bg-700);border-radius:var(--radius-md);margin-bottom:var(--space-5);">
            ⏳ Aguardando definição dos times desta partida...
          </div>
        `}

        <!-- Score Input -->
        <div class="modal-score-input">
          <div class="score-input-wrap">
            <span class="score-input-label">${u}</span>
            <div class="score-input-controls">
              <button class="score-btn" id="dec-home" aria-label="Diminuir gols mandante">−</button>
              <div class="score-display" id="score-home">${n}</div>
              <button class="score-btn" id="inc-home" aria-label="Aumentar gols mandante">+</button>
            </div>
          </div>

          <span class="score-sep">×</span>

          <div class="score-input-wrap">
            <span class="score-input-label">${c}</span>
            <div class="score-input-controls">
              <button class="score-btn" id="dec-away" aria-label="Diminuir gols visitante">−</button>
              <div class="score-display" id="score-away">${o}</div>
              <button class="score-btn" id="inc-away" aria-label="Aumentar gols visitante">+</button>
            </div>
          </div>
        </div>

        <!-- Meta info -->
        <div class="modal-meta">
          <div class="modal-meta-item">📅 ${be(e.date)}</div>
          <div class="modal-meta-item">🏆 ${e.stage}</div>
          ${a?"":'<div class="modal-meta-item" style="color:var(--color-warning)">⚠️ Faça login para salvar</div>'}
        </div>

        ${a?"":`
          <div style="padding:var(--space-3);background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:var(--radius-md);font-size:13px;color:var(--color-text-subtle);text-align:center;">
            Palpite salvo apenas localmente. Faça login para persistir na nuvem.
          </div>
        `}
      </div>

      <div class="modal-footer">
        <button class="btn btn--secondary" id="btn-cancel">Cancelar</button>
        <button class="btn btn--primary" id="btn-save" ${!m&&a?'disabled title="Aguardando times"':""}>
          💾 Salvar Palpite
        </button>
      </div>
    </div>
  `;function p(){const f=r.querySelector("#score-home"),J=r.querySelector("#score-away");f&&(f.textContent=String(n)),J&&(J.textContent=String(o))}(y=r.querySelector("#modal-close"))==null||y.addEventListener("click",x),(I=r.querySelector("#btn-cancel"))==null||I.addEventListener("click",x),(M=r.querySelector("#inc-home"))==null||M.addEventListener("click",()=>{n=k(n+1,0,20),p()}),($=r.querySelector("#dec-home"))==null||$.addEventListener("click",()=>{n=k(n-1,0,20),p()}),(w=r.querySelector("#inc-away"))==null||w.addEventListener("click",()=>{o=k(o+1,0,20),p()}),(b=r.querySelector("#dec-away"))==null||b.addEventListener("click",()=>{o=k(o-1,0,20),p()}),(K=r.querySelector("#btn-save"))==null||K.addEventListener("click",async()=>{const f=r.querySelector("#btn-save");f.disabled=!0,f.textContent="Salvando...";const J={userId:(a==null?void 0:a.id)??"anonymous",matchId:e.matchId,homeScore:n,awayScore:o,updatedAt:new Date().toISOString()};if(We(J),a)try{await Qe(e.matchId,n,o,a.id),g("✅ Palpite salvo!","success",2e3)}catch{g("⚠️ Erro ao salvar no servidor. Tente novamente.","error")}else g("💾 Palpite salvo localmente","info",2e3);x(),t==null||t()}),r.addEventListener("click",f=>{f.target===r&&x()});const v=f=>{f.key==="Escape"&&x()};document.addEventListener("keydown",v),r.dataset.keyHandler="true",(Q=document.getElementById("modal-root"))==null||Q.appendChild(r),R=r,requestAnimationFrame(()=>{var f;(f=r.querySelector("#btn-save"))==null||f.focus()})}function x(){R&&(R.remove(),R=null)}function oe(e,a){const{predictions:t,groupMatches:n,user:o}=a,r=`
    <div class="bracket-top-bar">
      <div>
          <h1 class="bracket-top-title">⚽ Fase de Grupos</h1>
          <p class="page-subtitle">Clique em qualquer jogo para inserir seu palpite</p>
        </div>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          ${va(n,t)}
        </div>
    </div>
  `,l=fa(a),s=na.map(i=>ya(i,a)).join("");e.innerHTML=`
    ${r}
    <div class="main-content">
      ${l}
      <div class="groups-layout">${s}</div>
    </div>
    ${Ta()}
  `,e.querySelectorAll("[data-match-id]").forEach(i=>{i.addEventListener("click",()=>{var v;const d=i.dataset.matchId,u=n.find(y=>y.id===d);if(!u)return;const c=(v=a.matchResults)==null?void 0:v.get(d),m=new Date,p=Te(u);if(m>=p||c!==void 0){g("O tempo para palpites neste jogo já encerrou.","error");return}ha(u,o,()=>{})})})}function va(e,a){const t=e.length,n=e.filter(r=>a.has(r.id)).length,o=t>0?Math.round(n/t*100):0;return`
    <div style="text-align:right;">
      <div style="font-size:13px;color:var(--color-text-muted);margin-bottom:6px;">
        ${n} / ${t} palpites preenchidos
      </div>
      <div style="width:200px;height:6px;background:var(--color-bg-600);border-radius:99px;overflow:hidden;">
        <div style="height:100%;width:${o}%;background:var(--gradient-brand);border-radius:99px;transition:width 0.4s ease;"></div>
      </div>
    </div>
  `}function fa(e){const{bestThirds:a}=e;if(a.length===0)return"";const t=a.map((n,o)=>`
    <div class="best-third-item">
      <span class="best-third-rank">${o+1}°</span>
      <span class="best-third-flag">${n.team.emoji}</span>
      <span class="best-third-name">${n.team.name}</span>
      <span style="font-size:11px;color:var(--color-text-muted);">Gr.${n.group}</span>
      <span class="best-third-pts">${n.points}pts</span>
    </div>
  `).join("");return`
    <div class="best-thirds-panel">
      <div class="best-thirds-title">
        🌟 Melhores Terceiros Classificados (${a.length}/8)
      </div>
      <div class="best-thirds-list">${t}</div>
    </div>
  `}function ya(e,a){const{groupMatches:t,predictions:n,standings:o,matchResults:r}=a,l=o.get(e)??[],s=t.filter(c=>c.group===e),{filled:i,total:d}=ca(e,t,n),u=d>0?Math.round(i/d*100):0;return`
    <div class="group-card">
      <div class="group-header">
        <span class="group-title">GRUPO ${e}</span>
        <div class="group-progress">
          <span>${i}/${d}</span>
          <div class="group-progress-bar">
            <div class="group-progress-fill" style="width:${u}%"></div>
          </div>
        </div>
      </div>

      <!-- Standings -->
      ${wa(l)}

      <!-- Matches -->
      <div class="matches-list">
        ${s.map(c=>ba(c,n,r)).join("")} 
      </div>
    </div>
  `}function wa(e){return e.length===0?'<div style="padding:12px 20px;font-size:12px;color:var(--color-text-muted);">Sem palpites ainda</div>':`
    <div style="overflow-x:auto;">
      <table class="standings-table">
        <thead>
          <tr>
            <th>Seleção</th>
            <th title="Jogos">J</th>
            <th title="Vitórias">V</th>
            <th title="Empates">E</th>
            <th title="Derrotas">D</th>
            <th title="Gols Pró">GP</th>
            <th title="Gols Contra">GC</th>
            <th title="Saldo">SG</th>
            <th title="Pontos">Pts</th>
          </tr>
        </thead>
        <tbody>${e.map((t,n)=>`
      <tr class="${n===0?"row--qualifies-1st":n===1?"row--qualifies-2nd":n===2?"row--qualifies-3rd":""}">
        <td>
          <div class="standings-team">
            <span class="standings-pos ${n===0?"standings-pos--1":n===1?"standings-pos--2":n===2?"standings-pos--3":"standings-pos--4"}">${n+1}</span>
            <span class="standings-flag">${t.team.emoji}</span>
            <span class="standings-name">${t.team.abbr}</span>
          </div>
        </td>
        <td>${t.played}</td>
        <td>${t.won}</td>
        <td>${t.drawn}</td>
        <td>${t.lost}</td>
        <td>${t.goalsFor}</td>
        <td>${t.goalsAgainst}</td>
        <td style="color:${t.goalDiff>0?"var(--color-success)":t.goalDiff<0?"var(--color-error)":"inherit"}">
          ${t.goalDiff>0?"+":""}${t.goalDiff}
        </td>
        <td class="standings-pts">${t.points}</td>
      </tr>
    `).join("")}</tbody>
      </table>
    </div>
  `}function ba(e,a,t){const n=a.get(e.id),o=t.get(e.id),r=n!==void 0,l=o!==void 0,s=new Date,i=Te(e),d=s>=i||l,u=r?O(n.homeScore):"?",c=r?O(n.awayScore):"?",m=r?"":"match-score-value--empty";return`
    <div
      class="match-card ${r?"has-prediction":""} ${d?"is-locked":""}"
      data-match-id="${e.id}"
      role="${d?"presentation":"button"}"
      tabindex="${d?"-1":"0"}"
      style="${d?"opacity: 0.85; cursor: not-allowed;":""}"
    >
      <div class="match-team">
        <span class="match-team-flag">${ne(e.homeTeam)}</span>
        <div class="match-team-info">
          <div class="match-team-abbr">${e.homeTeam}</div>
          <div class="match-team-name">${re(e.homeTeam)}</div>
        </div>
      </div>

      <div class="match-score-area">
        <div class="match-score">
          <div class="match-score-value ${m}">${u}</div>
          <div class="match-score-sep">–</div>
          <div class="match-score-value ${m}">${c}</div>
        </div>
        <div class="match-date">${be(e.date)}</div>
        
        ${l?`<div style="margin-top:6px; font-size:11px; font-weight:bold; color:var(--color-success); background:var(--color-bg-900); padding:2px 6px; border-radius:4px;">⚽ Placar Oficial: ${o.homeScore} x ${o.awayScore}</div>`:d?'<div class="match-hint" style="color:var(--color-text-muted);">🔒 Encerrado</div>':'<div class="match-hint">✏️ clique para palpitar</div>'}
      </div>

      <div class="match-team match-team--away">
        <span class="match-team-flag">${ne(e.awayTeam)}</span>
        <div class="match-team-info" style="text-align:right;">
          <div class="match-team-abbr">${e.awayTeam}</div>
          <div class="match-team-name">${re(e.awayTeam)}</div>
        </div>
      </div>
    </div>
  `}function ne(e){var a;return((a=B.get(e))==null?void 0:a.emoji)??"🏳️"}function re(e){var a;return((a=B.get(e))==null?void 0:a.name)??e}function Ta(e){return`
    <nav class="mobile-nav" aria-label="Navegação">
      <button class="mobile-nav-btn active" data-view="groups">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
        </svg>
        <span>Grupos</span>
      </button>
      <button class="mobile-nav-btn " data-view="bracket">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 6h4v4H4zM10 4h4v4h-4zM16 6h4v4h-4zM6 10v4M18 10v4M8 14h8M12 14v4"/>
        </svg>
        <span>Mata-Mata</span>
      </button>
      <button class="mobile-nav-btn " data-view="admin">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.07 4.93a10 10 0 1 0 0 14.14"/>
        </svg>
        <span>Admin</span>
      </button>
    </nav>
  `}function Sa(e,a){const{knockoutMatches:t,user:n}=a,{leftColumns:o,rightColumns:r,finalColumn:l}=pa(t),s=t.get("J103");e.innerHTML=`
    <div class="bracket-view">
      <!-- Top Bar -->
      <div class="bracket-top-bar">
        <span class="bracket-top-title">🏆 Mata-Mata · FIFA 2026</span>
        <span class="bracket-top-hint">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Clique em qualquer jogo para palpitar
        </span>
      </div>

      <!-- Main Bracket Scroll -->
      <div class="bracket-scroll-container">
        <div class="bracket-canvas" id="bracket-canvas">
          
          <div class="bracket-side">
            ${o.map(i=>j(i.label,i.matches,i.stage,!1,a)).join("")}
          </div>

          <div class="bracket-center">
            ${l?j(l.label,l.matches,l.stage,!1,a):""}
          </div>

          <div class="bracket-side right-side">
            ${r.map(i=>j(i.label,i.matches,i.stage,!0,a)).join("")}
          </div>

        </div>
      </div>

      <!-- Third Place -->
      ${s?`
        <div style="padding:16px 24px;border-top:1px solid var(--color-border);">
          <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:12px;">
            🥉 Disputa do 3° Lugar
          </div>
          <div style="display:flex;justify-content:flex-start;">
            <div class="bracket-third-place">
              ${P(s)}
            </div>
          </div>
        </div>
      `:""}
    </div>
  `,e.querySelectorAll("[data-knockout-id]").forEach(i=>{i.addEventListener("click",()=>{const d=i.dataset.knockoutId,u=t.get(d);u&&ga(u,n)})}),e.querySelectorAll("[data-knockout-id]").forEach(i=>{i.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),i.click())})})}function j(e,a,t,n,o){const r=t==="final",{champion:l}=o;if(r){const d=a[0];return`
      <div class="bracket-col ${n?"right-side":""}">
        <div class="bracket-col-header">
          <div class="bracket-col-label">Final</div>
          <div class="bracket-col-count">MetLife Stadium · 19/07/2026</div>
        </div>
        <div class="bracket-matches">
          <div class="bracket-match-wrapper">${d?P(d,!0):""}</div>
          <div style="margin-top: 24px; padding: 0 16px;">
            ${xa(l)}
          </div>
        </div>
      </div>
    `}let s="";for(let d=0;d<a.length;d+=2){const u=a[d],c=a[d+1];s+=`
      <div class="bracket-match-pair">
        <div class="bracket-match-wrapper">${P(u)}</div>
        ${c?`<div class="bracket-match-wrapper">${P(c)}</div>`:""}
        ${c?'<div class="match-bridge"></div>':""}
      </div>
    `}return`
    <div class="bracket-col ${n?"right-side":""}">
      <div class="bracket-col-header">
        <div class="bracket-col-label">${e}</div>
        <div class="bracket-col-count">${a.length} jogo${a.length>1?"s":""}</div>
      </div>
      <div class="bracket-matches">
        ${s}
      </div>
    </div>
  `}function P(e,a=!1){const t=ma(e),n=e.homeScore!==null&&e.awayScore!==null,o=["bracket-match",t?"available":"",n?"has-prediction":"",a?"is-final":"",e.stage==="third_place"?"bracket-third":""].filter(Boolean).join(" "),r={round32:"R32",round16:"R16",quarterfinal:"QF",semifinal:"SF",third_place:"3P",final:"FIN"};return`
    <div
      class="${o}"
      data-knockout-id="${e.id}"
      role="button"
      tabindex="0"
      aria-label="Palpite ${e.id}"
    >
      <div class="bracket-match-id">
        <span>${e.id}</span>
        <span class="bracket-match-stage-badge">${r[e.stage]??e.stage}</span>
      </div>
      ${ie(e,"home",n)}
      ${ie(e,"away",n)}
    </div>
  `}function ie(e,a,t){const n=a==="home"?e.homeTeam:e.awayTeam,o=a==="home"?e.homeSlot:e.awaySlot,r=a==="home"?e.homeScore:e.awayScore,l=e.winner&&e.winner.id===(n==null?void 0:n.id),s=`bracket-team-row${l?" winner":""}`,i=q(n),d=W(n,o),u=H(n,o),c=!n,m=t&&r!==null?O(r):"–";return`
    <div class="${s}">
      <span class="bracket-team-flag">${i}</span>
      <div class="bracket-team-info">
        <span class="bracket-team-abbr${c?" placeholder":""}">${d}</span>
        <span class="bracket-team-name">${c?u:""}</span>
      </div>
      <span class="bracket-score${l?" winner-score":""}">${m}</span>
      <span class="bracket-winner-icon">✓</span>
    </div>
  `}function xa(e){return e?`
    <div class="bracket-champion">
      <span class="bracket-champion-trophy">🏆</span>
      <span class="bracket-champion-label">Campeão</span>
      <span class="bracket-champion-flag">${e.emoji}</span>
      <span class="bracket-champion-name">${e.name}</span>
    </div>
  `:`
      <div class="bracket-champion">
        <span class="bracket-champion-trophy">🏆</span>
        <span class="bracket-champion-label">Campeão</span>
        <span class="bracket-champion-empty">Aguardando...</span>
      </div>
    `}function Ca(e,a){const{user:t}=a;if(!t||!V(t.id)){e.innerHTML=`
      <div class="main-content">
        <div class="empty-state">
          <div class="empty-state-icon">🔒</div>
          <div class="empty-state-title">Acesso Restrito</div>
          <p class="empty-state-text">Esta área é exclusiva para administradores.</p>
        </div>
      </div>
    `;return}const n=a.predictions.size,o=a.groupMatches.length+a.knockoutMatches.size,r=a.champion;e.innerHTML=`
    <div class="main-content">
      <div class="page-header">
        <h1 class="page-title">⚙️ Painel Admin</h1>
        <p class="page-subtitle">Lisobet · Copa do Mundo FIFA 2026</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px;margin-bottom:32px;">
        ${L("🎯","Palpites",String(n),"salvos localmente")}
        ${L("⚽","Jogos",String(o),"total do torneio")}
        ${L("👥","Grupos","12","A até L")}
        ${L("🏆","Campeão",(r==null?void 0:r.abbr)??"—",(r==null?void 0:r.name)??"não definido")}
      </div>

      <div class="admin-grid">
        
        <div class="admin-card" style="grid-column:1/-1;">
          <div class="admin-card-title">🏆 Definir Resultados Oficiais</div>
          <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:16px;">
            Insira o placar real das partidas. Isso atualizará a tabela de classificação oficial e os pontos dos usuários.
          </p>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:400px;overflow-y:auto;padding-right:8px;">
            ${Ea(a)}
          </div>
        </div>

        <div class="admin-card">
          <div class="admin-card-title">📊 Estado do Torneio (Simulado pelos seus palpites)</div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${Ia(a)}
          </div>
        </div>

        <div class="admin-card">
          <div class="admin-card-title">🔧 Configuração</div>
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${Ma()}
          </div>
        </div>
      </div>
    </div>
  `,document.querySelectorAll(".btn-save-result").forEach(l=>{l.addEventListener("click",async s=>{var c;const i=s.currentTarget.dataset.match;if(!i)return;const d=document.getElementById(`home-res-${i}`),u=document.getElementById(`away-res-${i}`);if(!d.value||!u.value){g("Preencha os dois placares!","error");return}try{const m=s.currentTarget,p=m.textContent;m.textContent="...",m.disabled=!0,await Pe(i,parseInt(d.value,10),parseInt(u.value,10)),(c=a.matchResults)==null||c.set(i,{matchId:i,homeScore:parseInt(d.value),awayScore:parseInt(u.value)}),g("Placar oficial salvo!","success"),m.textContent=p??"Salvar",m.disabled=!1}catch(m){console.error(m),g("Erro ao salvar no banco.","error")}})})}function Ea(e){return e.groupMatches.map(a=>{var n;const t=(n=e.matchResults)==null?void 0:n.get(a.id);return`
      <div style="display:flex;align-items:center;justify-content:space-between;background:var(--color-bg-800);padding:8px 12px;border-radius:6px;">
        <div style="font-size:12px;color:var(--color-text-muted);width:40px;font-weight:bold;">${a.id}</div>
        <div style="flex:1;display:flex;align-items:center;justify-content:center;gap:12px;">
          <span style="font-weight:600;width:40px;text-align:right;">${a.homeTeam}</span>
          <input type="number" id="home-res-${a.id}" value="${(t==null?void 0:t.homeScore)??""}" min="0" max="30" style="width:50px;text-align:center;background:var(--color-bg-900);border:1px solid var(--color-border);color:white;border-radius:4px;padding:4px;">
          <span style="color:var(--color-text-muted);">X</span>
          <input type="number" id="away-res-${a.id}" value="${(t==null?void 0:t.awayScore)??""}" min="0" max="30" style="width:50px;text-align:center;background:var(--color-bg-900);border:1px solid var(--color-border);color:white;border-radius:4px;padding:4px;">
          <span style="font-weight:600;width:40px;text-align:left;">${a.awayTeam}</span>
        </div>
        <button class="btn btn--primary btn--sm btn-save-result" data-match="${a.id}" style="padding:4px 12px;font-size:12px;">Salvar</button>
      </div>
    `}).join("")}function L(e,a,t,n){return`
    <div class="admin-card" style="text-align:center;padding:20px 16px;">
      <div style="font-size:28px;margin-bottom:8px;">${e}</div>
      <div style="font-size:24px;font-weight:800;color:var(--color-text);">${t}</div>
      <div style="font-size:13px;font-weight:600;color:var(--color-text-subtle);">${a}</div>
      <div style="font-size:11px;color:var(--color-text-muted);margin-top:4px;">${n}</div>
    </div>
  `}function Ia(e){return[...e.standings.entries()].map(([a,t])=>{const n=t[0],o=t[1];return`
      <div style="display:flex;align-items:center;justify-content:space-between;font-size:13px;">
        <span style="color:var(--color-text-muted);font-weight:700;">Grupo ${a}</span>
        <span>${n?`${n.team.emoji} ${n.team.abbr}`:"—"}</span>
        <span style="color:var(--color-text-muted);">${o?`${o.team.emoji} ${o.team.abbr}`:"—"}</span>
      </div>
    `}).join("")||'<span style="color:var(--color-text-muted);font-size:13px;">Nenhum palpite preenchido</span>'}function Ma(){return`
    <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <span style="color:var(--color-text-muted);">Supabase</span>
        <span class="badge badge--green">Ativo</span>
      </div>
    </div>`}function $a(e,a,t){const n=new Map;for(const r of e.values()){const l=a.get(r.matchId);if(!l)continue;let s=0;r.homeScore===l.homeScore&&r.awayScore===l.awayScore?s=3:Math.sign(r.homeScore-r.awayScore)===Math.sign(l.homeScore-l.awayScore)&&(s=1);const i=n.get(r.userId)??0;n.set(r.userId,i+s)}const o=new Map(t.map(r=>[r.id,r.name]));return Array.from(n.entries()).map(([r,l])=>({userId:r,score:l,name:o.get(r)||"Usuário"})).sort((r,l)=>l.score-r.score)}async function Aa(e,a){e.innerHTML=`
    <div class="bracket-top-bar">
      <span class="bracket-top-title">🏆 Ranking dos lisos</span>
    </div>
    <div id="ranking-content" class="main-content">
      <p>Carregando ranking...</p>
    </div>
  `;const{data:t,error:n}=await h.from("profiles").select("id, display_name, avatar_url");if(n){console.error("Erro ao buscar perfis:",n);return}const o=(t||[]).map(s=>{let i=s.avatar_url;if(i&&!i.startsWith("http")){const{data:d}=h.storage.from("avatars").getPublicUrl(i);i=d.publicUrl}return{id:s.id,name:s.display_name,avatarUrl:i}}),l=$a(a.predictions,a.matchResults,o).map(s=>{const i=o.find(d=>d.id===s.userId);return{...s,avatarUrl:(i==null?void 0:i.avatarUrl)||null}});e.innerHTML=`
    <div class="bracket-top-bar">
      <span class="bracket-top-title">🏆 Ranking dos lisos</span>
    </div>
    <div class="main-content">
      <table class="ranking-table">
        <thead>
          <tr><th>Pos</th><th>Nome</th><th>Pontos</th></tr>
        </thead>
        <tbody>
          ${l.map((s,i)=>`
            <tr>
              <td>${i+1}°</td>
              <td>
                <span class="user">
                  <span class="user-avatar user-avatar--sm">
                    ${s.avatarUrl?`<img src="${s.avatarUrl}" alt="Avatar" loading="lazy" />`:`<span>${F(s.name??"")}</span>`}
                  </span>
                  ${s.name}
                </span>
              </td>
              <td class="score">${s.score}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `}const Ja='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',Ua='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',ka='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';function La(e){const a=document.getElementById("profile-dropdown-btn"),t=document.getElementById("profile-dropdown");if(!(!t||!e.user)&&(t.classList.toggle("visible"),t.classList.contains("visible"))){const n=o=>{!t.contains(o.target)&&!(a!=null&&a.contains(o.target))&&(t.classList.remove("visible"),document.removeEventListener("click",n))};document.addEventListener("click",n)}}function Ra(e,a){const{user:t}=e;if(!t)return;const n=document.getElementById("modal-root");if(!n)return;const o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
    <div class="modal-content profile-modal">
      <div class="modal-header">
        <h2>Editar Perfil</h2>
        <button class="modal-close-btn" aria-label="Fechar" id="close-profile-modal">
          ${ka}
        </button>
      </div>

      <form id="edit-profile-form" class="profile-form">
        <div class="form-group">
          <label for="display-name">Nome</label>
          <input
            type="text"
            id="display-name"
            name="display-name"
            value="${t.name??""}"
            placeholder="Seu nome"
            maxlength="100"
            class="form-input"
          />
          <small>Máximo 100 caracteres</small>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            value="${t.email??""}"
            disabled
            class="form-input"
          />
          <small>Email não pode ser alterado</small>
        </div>

        <div class="form-group">
          <label for="avatar-url">URL do Avatar</label>
          <input
            type="url"
            id="avatar-url"
            name="avatar-url"
            value="${t.avatarUrl??""}"
            placeholder="https://example.com/avatar.jpg"
            class="form-input"
          />
          <small>Link para uma imagem (JPG, PNG). Se vazio, usa iniciais do nome.</small>
        </div>

        ${t.avatarUrl?`
          <div class="form-group">
            <label>Pré-visualização do Avatar</label>
            <img src="${t.avatarUrl}" alt="Avatar preview" class="avatar-preview" />
          </div>
        `:""}

        <div class="form-actions">
          <button type="button" class="btn btn--ghost" id="cancel-profile-btn">
            Cancelar
          </button>
          <button type="submit" class="btn btn--primary">
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  `,n.appendChild(o);const r=o.querySelector("#edit-profile-form"),l=o.querySelector("#close-profile-modal"),s=o.querySelector("#cancel-profile-btn"),i=()=>{o.remove()};l==null||l.addEventListener("click",i),s==null||s.addEventListener("click",i),r==null||r.addEventListener("submit",async d=>{var m,p;d.preventDefault();const u=((m=o.querySelector("#display-name"))==null?void 0:m.value.trim())||null,c=((p=o.querySelector("#avatar-url"))==null?void 0:p.value.trim())||null;if(!u){g("Nome é obrigatório","error");return}try{const v=r.querySelector('button[type="submit"]');v&&(v.disabled=!0),await Be(u,c||void 0),e.user&&(e.user.name=u,e.user.avatarUrl=c,A(e.user)),g("Perfil atualizado com sucesso!","success"),i(),a()}catch(v){console.error("Erro ao atualizar perfil:",v),g("Erro ao atualizar perfil. Tente novamente.","error");const y=r.querySelector('button[type="submit"]');y&&(y.disabled=!1)}}),o.addEventListener("click",d=>{d.target===o&&i()})}function Pa(e){return`
    <div class="profile-dropdown-wrapper">
      <button class="profile-dropdown-trigger" id="profile-dropdown-btn" aria-label="Menu de perfil" title="Perfil">
        <span class="user-avatar user-avatar--sm">
          ${e.avatarUrl?`<img src="${e.avatarUrl}" alt="Avatar" loading="lazy" />`:`<span>${F(e.name??e.email)}</span>`}
        </span>
      </button>

      <div class="profile-dropdown" id="profile-dropdown">
        <div class="profile-dropdown-header">
          <div class="profile-dropdown-avatar">
            ${e.avatarUrl?`<img src="${e.avatarUrl}" alt="Avatar" loading="lazy" />`:`<span>${F(e.name??e.email)}</span>`}
          </div>
          <div class="profile-dropdown-info">
            <div class="profile-dropdown-name">${e.name??"Usuário"}</div>
            <div class="profile-dropdown-email">${e.email??""}</div>
          </div>
        </div>

        <div class="profile-dropdown-divider"></div>

        <button class="profile-dropdown-item" id="edit-profile-btn">
          ${Ja}
          <span>Editar Perfil</span>
        </button>

        <button class="profile-dropdown-item profile-dropdown-item--danger" id="profile-logout-btn">
          ${Ua}
          <span>Sair</span>
        </button>
      </div>
    </div>
  `}function Ba(e,a,t){const n=document.getElementById("profile-dropdown-btn"),o=document.getElementById("edit-profile-btn"),r=document.getElementById("profile-logout-btn");n==null||n.addEventListener("click",l=>{l.stopPropagation(),La(e)}),o==null||o.addEventListener("click",l=>{var s;l.stopPropagation(),(s=document.getElementById("profile-dropdown"))==null||s.classList.remove("visible"),Ra(e,t)}),r==null||r.addEventListener("click",async l=>{l.stopPropagation();try{await a()}catch(s){console.error("Erro ao fazer logout:",s),g("Erro ao sair","error")}})}const Ce=document.getElementById("app"),le=document.getElementById("loading-screen"),Da=new Promise(e=>setTimeout(e,2e3));let T="groups";const se='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',de='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M4 6h4v4H4zM16 6h4v4h-4zM10 4h4v4h-4zM6 10v4h12v-4M12 14v4"/></svg>',Ga='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="8" r="4"/><path d="M12 14c-6 0-9 3-9 4h18c0-1-3-4-9-4z"/></svg>',_='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M6 9H4a2 2 0 0 1-2-2V5h4"/><path d="M18 9h2a2 2 0 0 0 2-2V5h-4"/><path d="M6 9c0 5.25 3 8 6 9 3-1 6-3.75 6-9"/><line x1="12" y1="18" x2="12" y2="21"/><line x1="9" y1="21" x2="15" y2="21"/></svg>',ja='<svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><defs><linearGradient id="financeGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e3a8a" /><stop offset="50%" stop-color="#3b82f6" /><stop offset="100%" stop-color="#06b6d4" /></linearGradient></defs><path d="M0 0h24v24H0z" fill="none" /><path fill="url(#financeGradient)" d="M16 18v-2h2.6l-5.2-5.15l-4 4L2 7.4L3.4 6l6 6l4-4l6.6 6.6V12h2v6z"/></svg>';function G(e){const{user:a,champion:t}=e,n=a&&V(a.id);Ce.innerHTML=`
    <div class="app-layout">
      <!-- Navbar -->
      <nav class="navbar">
        <span class="navbar-brand"> ${ja} LISOBET</span>

        <!-- Desktop Nav -->
        <div class="navbar-nav" id="desktop-nav">
          <button class="nav-btn ${T==="groups"?"active":""}" data-view="groups">
            ${se} Grupos
          </button>
          <button class="nav-btn ${T==="bracket"?"active":""}" data-view="bracket">
            ${de} Mata-Mata
          </button>
          <button class="nav-btn ${T==="champion"?"active":""}" data-view="champion">
            ${_} Ranking
          </button>
          ${n?`
            <button class="nav-btn ${T==="admin"?"active":""}" data-view="admin">
              ${Ga} Admin
            </button>
          `:""}
          ${t?`
            <div style="display:flex;align-items:center;gap:8px;padding:6px 12px;background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.2);border-radius:8px;font-size:13px;font-weight:600;color:var(--color-gold);">
              ${_} ${t.emoji} ${t.name}
            </div>
          `:""}
        </div>

        <!-- User Area -->
        <div class="navbar-user">
          ${a?`
            <span class="user-name">${a.name??a.email??"Usuário"}</span>
            ${Pa(a)}
          `:`
            <button class="btn btn--primary btn--sm" id="btn-login">
              Entrar
            </button>
          `}
        </div>
      </nav>

      <!-- View Container -->
      <main id="view-container" aria-live="polite">
        <!-- View rendered below -->
      </main>

      <!-- Mobile Nav -->
      <nav class="mobile-nav" aria-label="Navegação principal">
        <button class="mobile-nav-btn ${T==="groups"?"active":""}" data-view="groups">
          ${se}
          <span>Grupos</span>
        </button>
        <button class="mobile-nav-btn ${T==="bracket"?"active":""}" data-view="bracket">
          ${de}
          <span>Mata-Mata</span>
        </button>
        <button class="mobile-nav-btn ${T==="champion"?"active":""}" data-view="champion">
          ${_}
          <span>Ranking</span>
        </button>
      </nav>
    </div>
  `,Na(e),Ee(e)}function Ee(e){const a=document.getElementById("view-container");if(a)switch(T){case"groups":oe(a,e);break;case"bracket":Sa(a,e);break;case"champion":Aa(a,e);break;case"admin":Ca(a,e);break;default:oe(a,e)}}function _a(e){T=e;const a=C();G(a),window.scrollTo({top:0,behavior:"smooth"})}function Na(e){var a,t;document.querySelectorAll("[data-view]").forEach(n=>{n.addEventListener("click",()=>{const o=n.dataset.view;o&&_a(o)})}),e.user&&Ba(e,aa,()=>G(C())),(a=document.getElementById("btn-login"))==null||a.addEventListener("click",()=>{ce()}),(t=document.getElementById("mobile-login-btn"))==null||t.addEventListener("click",()=>{e.user||ce()})}function ce(){Ce.innerHTML='<div id="auth-container"></div>';const e=document.getElementById("auth-container");ta(e)}let ue=null,me=!0;He(e=>{var o;if(e.loading&&!e.initialized)return;const a=((o=e.user)==null?void 0:o.id)??null,t=a!==ue;if(me&&e.initialized||t){ue=a,me=!1,G(e);return}document.getElementById("view-container")&&Ee(e)});async function Oa(){try{const e=await Re();console.log("1. Dados puros do Supabase:",e);const a=new Map;e.forEach(t=>{a.set(t.match_id,{matchId:t.match_id,homeScore:t.home_score,awayScore:t.away_score,updatedAt:t.updated_at})}),console.log("2. Map convertido:",a),ze(a)}catch(e){console.error("Falha ao sincronizar resultados do Supabase:",e)}}async function Fa(){try{await Ye(),await Oa()}catch(e){console.error("[App] Initialization error:",e),ge(!0);const a=C();G(a),g("Erro de conexão. Funcionando em modo offline.","error",5e3)}finally{await Da,le.classList.add("hidden"),setTimeout(()=>{le.remove()},500)}}Fa();export{qa as T,Oe as b,Wa as c,za as g};
