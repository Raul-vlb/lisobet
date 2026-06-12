import{n as e,t}from"./supabase-wYX4LGSx.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=t(`https://tdnrtkzhyvtnvkvqcjbe.supabase.co/`,`sb_publishable_jtvvF6xnHr-rKhlz7wGpIQ_FwhyGvfn`,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}});async function r(e,t){let{error:r}=await n.auth.signInWithPassword({email:e,password:t});if(r)throw r}async function i(e,t,r,i){let{error:a}=await n.auth.signUp({email:e,password:t,options:{data:{display_name:r,username:i}}});if(a)throw a}async function a(){let{error:e}=await n.auth.signOut();if(e)throw e}async function o(){let{data:e,error:t}=await n.from(`predictions`).select(`*`).order(`updated_at`,{ascending:!1});if(t)throw t;return e??[]}async function s(e,t,r){let{data:i}=await n.auth.getSession(),a=i.session?.user?.id;if(!a)throw Error(`Usuário não autenticado`);let{data:o,error:s}=await n.from(`predictions`).upsert({user_id:a,match_id:e,home_score:t,away_score:r,updated_at:new Date().toISOString()},{onConflict:`user_id,match_id`}).select().single();if(s)throw s;return o}async function c(){let{data:e,error:t}=await n.from(`match_results`).select(`*`).order(`updated_at`,{ascending:!1});if(t)throw t;return e??[]}async function l(e,t,r){let{data:i,error:a}=await n.from(`match_results`).upsert({match_id:e,home_score:t,away_score:r,updated_at:new Date().toISOString()},{onConflict:`match_id`}).select().single();if(a)throw a;return i}async function u(e,t){let{data:{user:r}}=await n.auth.getUser();if(!r)throw Error(`Usuário não autenticado`);let{error:i}=await n.auth.updateUser({data:{...e!==void 0&&{display_name:e},...t!==void 0&&{avatar_url:t}}});if(i)throw i;let{error:a}=await n.from(`profiles`).update({...e!==void 0&&{display_name:e},...t!==void 0&&{avatar_url:t}}).eq(`id`,r.id);if(a)throw console.error(`Erro ao salvar no banco:`,a),a}var d=[{id:`J1`,group:`A`,homeTeam:`MEX`,awayTeam:`RSA`,date:`2026-06-11`,time:`13:00 UTC-6`,stage:`group`},{id:`J2`,group:`A`,homeTeam:`KOR`,awayTeam:`CZE`,date:`2026-06-11`,time:`20:00 UTC-6`,stage:`group`},{id:`J3`,group:`A`,homeTeam:`CZE`,awayTeam:`RSA`,date:`2026-06-18`,time:`12:00 UTC-4`,stage:`group`},{id:`J4`,group:`A`,homeTeam:`MEX`,awayTeam:`KOR`,date:`2026-06-18`,time:`19:00 UTC-6`,stage:`group`},{id:`J5`,group:`A`,homeTeam:`CZE`,awayTeam:`MEX`,date:`2026-06-24`,time:`19:00 UTC-6`,stage:`group`},{id:`J6`,group:`A`,homeTeam:`RSA`,awayTeam:`KOR`,date:`2026-06-24`,time:`19:00 UTC-6`,stage:`group`},{id:`J7`,group:`B`,homeTeam:`CAN`,awayTeam:`BIH`,date:`2026-06-12`,time:`15:00 UTC-4`,stage:`group`},{id:`J8`,group:`B`,homeTeam:`QAT`,awayTeam:`SUI`,date:`2026-06-13`,time:`12:00 UTC-7`,stage:`group`},{id:`J9`,group:`B`,homeTeam:`SUI`,awayTeam:`BIH`,date:`2026-06-18`,time:`12:00 UTC-7`,stage:`group`},{id:`J10`,group:`B`,homeTeam:`CAN`,awayTeam:`QAT`,date:`2026-06-18`,time:`15:00 UTC-7`,stage:`group`},{id:`J11`,group:`B`,homeTeam:`SUI`,awayTeam:`CAN`,date:`2026-06-24`,time:`12:00 UTC-7`,stage:`group`},{id:`J12`,group:`B`,homeTeam:`BIH`,awayTeam:`QAT`,date:`2026-06-24`,time:`12:00 UTC-7`,stage:`group`},{id:`J13`,group:`C`,homeTeam:`BRA`,awayTeam:`MAR`,date:`2026-06-13`,time:`18:00 UTC-4`,stage:`group`},{id:`J14`,group:`C`,homeTeam:`HAI`,awayTeam:`SCO`,date:`2026-06-13`,time:`21:00 UTC-4`,stage:`group`},{id:`J15`,group:`C`,homeTeam:`SCO`,awayTeam:`MAR`,date:`2026-06-19`,time:`18:00 UTC-4`,stage:`group`},{id:`J16`,group:`C`,homeTeam:`BRA`,awayTeam:`HAI`,date:`2026-06-19`,time:`20:30 UTC-4`,stage:`group`},{id:`J17`,group:`C`,homeTeam:`SCO`,awayTeam:`BRA`,date:`2026-06-24`,time:`18:00 UTC-4`,stage:`group`},{id:`J18`,group:`C`,homeTeam:`MAR`,awayTeam:`HAI`,date:`2026-06-24`,time:`18:00 UTC-4`,stage:`group`},{id:`J19`,group:`D`,homeTeam:`USA`,awayTeam:`PAR`,date:`2026-06-12`,time:`18:00 UTC-7`,stage:`group`},{id:`J20`,group:`D`,homeTeam:`AUS`,awayTeam:`TUR`,date:`2026-06-13`,time:`21:00 UTC-7`,stage:`group`},{id:`J21`,group:`D`,homeTeam:`USA`,awayTeam:`AUS`,date:`2026-06-19`,time:`12:00 UTC-7`,stage:`group`},{id:`J22`,group:`D`,homeTeam:`TUR`,awayTeam:`PAR`,date:`2026-06-19`,time:`20:00 UTC-7`,stage:`group`},{id:`J23`,group:`D`,homeTeam:`TUR`,awayTeam:`USA`,date:`2026-06-25`,time:`19:00 UTC-7`,stage:`group`},{id:`J24`,group:`D`,homeTeam:`PAR`,awayTeam:`AUS`,date:`2026-06-25`,time:`19:00 UTC-7`,stage:`group`},{id:`J25`,group:`E`,homeTeam:`GER`,awayTeam:`CUW`,date:`2026-06-14`,time:`12:00 UTC-5`,stage:`group`},{id:`J26`,group:`E`,homeTeam:`CIV`,awayTeam:`ECU`,date:`2026-06-14`,time:`19:00 UTC-4`,stage:`group`},{id:`J27`,group:`E`,homeTeam:`GER`,awayTeam:`CIV`,date:`2026-06-20`,time:`16:00 UTC-4`,stage:`group`},{id:`J28`,group:`E`,homeTeam:`ECU`,awayTeam:`CUW`,date:`2026-06-20`,time:`19:00 UTC-5`,stage:`group`},{id:`J29`,group:`E`,homeTeam:`CUW`,awayTeam:`CIV`,date:`2026-06-25`,time:`16:00 UTC-4`,stage:`group`},{id:`J30`,group:`E`,homeTeam:`ECU`,awayTeam:`GER`,date:`2026-06-25`,time:`16:00 UTC-4`,stage:`group`},{id:`J31`,group:`F`,homeTeam:`NED`,awayTeam:`JPN`,date:`2026-06-14`,time:`15:00 UTC-5`,stage:`group`},{id:`J32`,group:`F`,homeTeam:`SWE`,awayTeam:`TUN`,date:`2026-06-14`,time:`20:00 UTC-6`,stage:`group`},{id:`J33`,group:`F`,homeTeam:`NED`,awayTeam:`SWE`,date:`2026-06-20`,time:`12:00 UTC-5`,stage:`group`},{id:`J34`,group:`F`,homeTeam:`TUN`,awayTeam:`JPN`,date:`2026-06-20`,time:`22:00 UTC-6`,stage:`group`},{id:`J35`,group:`F`,homeTeam:`JPN`,awayTeam:`SWE`,date:`2026-06-25`,time:`18:00 UTC-5`,stage:`group`},{id:`J36`,group:`F`,homeTeam:`TUN`,awayTeam:`NED`,date:`2026-06-25`,time:`18:00 UTC-5`,stage:`group`},{id:`J37`,group:`G`,homeTeam:`BEL`,awayTeam:`EGY`,date:`2026-06-15`,time:`12:00 UTC-7`,stage:`group`},{id:`J38`,group:`G`,homeTeam:`IRN`,awayTeam:`NZL`,date:`2026-06-15`,time:`18:00 UTC-7`,stage:`group`},{id:`J39`,group:`G`,homeTeam:`BEL`,awayTeam:`IRN`,date:`2026-06-21`,time:`12:00 UTC-7`,stage:`group`},{id:`J40`,group:`G`,homeTeam:`NZL`,awayTeam:`EGY`,date:`2026-06-21`,time:`18:00 UTC-7`,stage:`group`},{id:`J41`,group:`G`,homeTeam:`EGY`,awayTeam:`IRN`,date:`2026-06-26`,time:`20:00 UTC-7`,stage:`group`},{id:`J42`,group:`G`,homeTeam:`NZL`,awayTeam:`BEL`,date:`2026-06-26`,time:`20:00 UTC-7`,stage:`group`},{id:`J43`,group:`H`,homeTeam:`ESP`,awayTeam:`CPV`,date:`2026-06-15`,time:`12:00 UTC-4`,stage:`group`},{id:`J44`,group:`H`,homeTeam:`KSA`,awayTeam:`URU`,date:`2026-06-15`,time:`18:00 UTC-4`,stage:`group`},{id:`J45`,group:`H`,homeTeam:`ESP`,awayTeam:`KSA`,date:`2026-06-21`,time:`12:00 UTC-4`,stage:`group`},{id:`J46`,group:`H`,homeTeam:`URU`,awayTeam:`CPV`,date:`2026-06-21`,time:`18:00 UTC-4`,stage:`group`},{id:`J47`,group:`H`,homeTeam:`CPV`,awayTeam:`KSA`,date:`2026-06-26`,time:`19:00 UTC-5`,stage:`group`},{id:`J48`,group:`H`,homeTeam:`URU`,awayTeam:`ESP`,date:`2026-06-26`,time:`18:00 UTC-6`,stage:`group`},{id:`J49`,group:`I`,homeTeam:`FRA`,awayTeam:`SEN`,date:`2026-06-16`,time:`15:00 UTC-4`,stage:`group`},{id:`J50`,group:`I`,homeTeam:`IRQ`,awayTeam:`NOR`,date:`2026-06-16`,time:`18:00 UTC-4`,stage:`group`},{id:`J51`,group:`I`,homeTeam:`FRA`,awayTeam:`IRQ`,date:`2026-06-22`,time:`17:00 UTC-4`,stage:`group`},{id:`J52`,group:`I`,homeTeam:`NOR`,awayTeam:`SEN`,date:`2026-06-22`,time:`20:00 UTC-4`,stage:`group`},{id:`J53`,group:`I`,homeTeam:`NOR`,awayTeam:`FRA`,date:`2026-06-26`,time:`15:00 UTC-4`,stage:`group`},{id:`J54`,group:`I`,homeTeam:`SEN`,awayTeam:`IRQ`,date:`2026-06-26`,time:`15:00 UTC-4`,stage:`group`},{id:`J55`,group:`J`,homeTeam:`ARG`,awayTeam:`ALG`,date:`2026-06-16`,time:`20:00 UTC-5`,stage:`group`},{id:`J56`,group:`J`,homeTeam:`AUT`,awayTeam:`JOR`,date:`2026-06-16`,time:`21:00 UTC-7`,stage:`group`},{id:`J57`,group:`J`,homeTeam:`ARG`,awayTeam:`AUT`,date:`2026-06-22`,time:`12:00 UTC-5`,stage:`group`},{id:`J58`,group:`J`,homeTeam:`JOR`,awayTeam:`ALG`,date:`2026-06-22`,time:`20:00 UTC-7`,stage:`group`},{id:`J59`,group:`J`,homeTeam:`ALG`,awayTeam:`AUT`,date:`2026-06-27`,time:`21:00 UTC-5`,stage:`group`},{id:`J60`,group:`J`,homeTeam:`JOR`,awayTeam:`ARG`,date:`2026-06-27`,time:`21:00 UTC-5`,stage:`group`},{id:`J61`,group:`K`,homeTeam:`POR`,awayTeam:`COD`,date:`2026-06-17`,time:`12:00 UTC-5`,stage:`group`},{id:`J62`,group:`K`,homeTeam:`UZB`,awayTeam:`COL`,date:`2026-06-17`,time:`20:00 UTC-6`,stage:`group`},{id:`J63`,group:`K`,homeTeam:`POR`,awayTeam:`UZB`,date:`2026-06-23`,time:`12:00 UTC-5`,stage:`group`},{id:`J64`,group:`K`,homeTeam:`COL`,awayTeam:`COD`,date:`2026-06-23`,time:`20:00 UTC-6`,stage:`group`},{id:`J65`,group:`K`,homeTeam:`COL`,awayTeam:`POR`,date:`2026-06-27`,time:`19:30 UTC-4`,stage:`group`},{id:`J66`,group:`K`,homeTeam:`COD`,awayTeam:`UZB`,date:`2026-06-27`,time:`19:30 UTC-4`,stage:`group`},{id:`J67`,group:`L`,homeTeam:`ENG`,awayTeam:`CRO`,date:`2026-06-17`,time:`15:00 UTC-5`,stage:`group`},{id:`J68`,group:`L`,homeTeam:`GHA`,awayTeam:`PAN`,date:`2026-06-17`,time:`19:00 UTC-4`,stage:`group`},{id:`J69`,group:`L`,homeTeam:`ENG`,awayTeam:`GHA`,date:`2026-06-23`,time:`16:00 UTC-4`,stage:`group`},{id:`J70`,group:`L`,homeTeam:`PAN`,awayTeam:`CRO`,date:`2026-06-23`,time:`19:00 UTC-4`,stage:`group`},{id:`J71`,group:`L`,homeTeam:`PAN`,awayTeam:`ENG`,date:`2026-06-27`,time:`17:00 UTC-4`,stage:`group`},{id:`J72`,group:`L`,homeTeam:`CRO`,awayTeam:`GHA`,date:`2026-06-27`,time:`17:00 UTC-4`,stage:`group`}],f=[{id:`J73`,stage:`round32`,homeSlot:`2A`,awaySlot:`2B`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J90`,nextMatchSlot:`home`,loserMatchId:null},{id:`J74`,stage:`round32`,homeSlot:`1E`,awaySlot:`3rd-ABCDF`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J89`,nextMatchSlot:`home`,loserMatchId:null},{id:`J75`,stage:`round32`,homeSlot:`1F`,awaySlot:`2C`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J90`,nextMatchSlot:`away`,loserMatchId:null},{id:`J76`,stage:`round32`,homeSlot:`1C`,awaySlot:`2F`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J91`,nextMatchSlot:`home`,loserMatchId:null},{id:`J77`,stage:`round32`,homeSlot:`1I`,awaySlot:`3rd-CDFGH`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J89`,nextMatchSlot:`away`,loserMatchId:null},{id:`J78`,stage:`round32`,homeSlot:`2E`,awaySlot:`2I`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J91`,nextMatchSlot:`away`,loserMatchId:null},{id:`J79`,stage:`round32`,homeSlot:`1A`,awaySlot:`3rd-CEFHI`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J92`,nextMatchSlot:`home`,loserMatchId:null},{id:`J80`,stage:`round32`,homeSlot:`1L`,awaySlot:`3rd-EHIJK`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J92`,nextMatchSlot:`away`,loserMatchId:null},{id:`J81`,stage:`round32`,homeSlot:`1D`,awaySlot:`3rd-BEFIJ`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J94`,nextMatchSlot:`home`,loserMatchId:null},{id:`J82`,stage:`round32`,homeSlot:`1G`,awaySlot:`3rd-AEHIJ`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J94`,nextMatchSlot:`away`,loserMatchId:null},{id:`J83`,stage:`round32`,homeSlot:`2K`,awaySlot:`2L`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J93`,nextMatchSlot:`home`,loserMatchId:null},{id:`J84`,stage:`round32`,homeSlot:`1H`,awaySlot:`2J`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J93`,nextMatchSlot:`away`,loserMatchId:null},{id:`J85`,stage:`round32`,homeSlot:`1B`,awaySlot:`3rd-EFGIJ`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J96`,nextMatchSlot:`home`,loserMatchId:null},{id:`J86`,stage:`round32`,homeSlot:`1J`,awaySlot:`2H`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J95`,nextMatchSlot:`home`,loserMatchId:null},{id:`J87`,stage:`round32`,homeSlot:`1K`,awaySlot:`3rd-DEIJL`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J96`,nextMatchSlot:`away`,loserMatchId:null},{id:`J88`,stage:`round32`,homeSlot:`2D`,awaySlot:`2G`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J95`,nextMatchSlot:`away`,loserMatchId:null},{id:`J89`,stage:`round16`,homeSlot:`W74`,awaySlot:`W77`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J97`,nextMatchSlot:`home`,loserMatchId:null},{id:`J90`,stage:`round16`,homeSlot:`W73`,awaySlot:`W75`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J97`,nextMatchSlot:`away`,loserMatchId:null},{id:`J91`,stage:`round16`,homeSlot:`W76`,awaySlot:`W78`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J99`,nextMatchSlot:`home`,loserMatchId:null},{id:`J92`,stage:`round16`,homeSlot:`W79`,awaySlot:`W80`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J99`,nextMatchSlot:`away`,loserMatchId:null},{id:`J93`,stage:`round16`,homeSlot:`W83`,awaySlot:`W84`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J98`,nextMatchSlot:`home`,loserMatchId:null},{id:`J94`,stage:`round16`,homeSlot:`W81`,awaySlot:`W82`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J98`,nextMatchSlot:`away`,loserMatchId:null},{id:`J95`,stage:`round16`,homeSlot:`W86`,awaySlot:`W88`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J100`,nextMatchSlot:`home`,loserMatchId:null},{id:`J96`,stage:`round16`,homeSlot:`W85`,awaySlot:`W87`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J100`,nextMatchSlot:`away`,loserMatchId:null},{id:`J97`,stage:`quarterfinal`,homeSlot:`W89`,awaySlot:`W90`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J101`,nextMatchSlot:`home`,loserMatchId:null},{id:`J98`,stage:`quarterfinal`,homeSlot:`W93`,awaySlot:`W94`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J101`,nextMatchSlot:`away`,loserMatchId:null},{id:`J99`,stage:`quarterfinal`,homeSlot:`W91`,awaySlot:`W92`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J102`,nextMatchSlot:`home`,loserMatchId:null},{id:`J100`,stage:`quarterfinal`,homeSlot:`W95`,awaySlot:`W96`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J102`,nextMatchSlot:`away`,loserMatchId:null},{id:`J101`,stage:`semifinal`,homeSlot:`W97`,awaySlot:`W98`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J104`,nextMatchSlot:`home`,loserMatchId:`J103`},{id:`J102`,stage:`semifinal`,homeSlot:`W99`,awaySlot:`W100`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:`J104`,nextMatchSlot:`away`,loserMatchId:`J103`},{id:`J103`,stage:`third_place`,homeSlot:`L101`,awaySlot:`L102`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:null,nextMatchSlot:null,loserMatchId:null},{id:`J104`,stage:`final`,homeSlot:`W101`,awaySlot:`W102`,homeTeam:null,awayTeam:null,homeScore:null,awayScore:null,winner:null,loser:null,nextMatchId:null,nextMatchSlot:null,loserMatchId:null}];function p(){return new Map(f.map(e=>[e.id,{...e}]))}var ee=[{matchId:`J74`,eligibleGroups:[`A`,`B`,`C`,`D`,`F`]},{matchId:`J77`,eligibleGroups:[`C`,`D`,`F`,`G`,`H`]},{matchId:`J79`,eligibleGroups:[`C`,`E`,`F`,`H`,`I`]},{matchId:`J80`,eligibleGroups:[`E`,`H`,`I`,`J`,`K`]},{matchId:`J81`,eligibleGroups:[`B`,`E`,`F`,`I`,`J`]},{matchId:`J82`,eligibleGroups:[`A`,`E`,`H`,`I`,`J`]},{matchId:`J85`,eligibleGroups:[`E`,`F`,`G`,`I`,`J`]},{matchId:`J87`,eligibleGroups:[`D`,`E`,`I`,`J`,`L`]}],m={user:null,predictions:new Map,matchResults:new Map,groupMatches:d,standings:new Map,qualifiedTeams:new Map,knockoutMatches:p(),bestThirds:[],champion:null,loading:!0,initialized:!1,error:null},h=new Set;function te(e){return h.add(e),()=>h.delete(e)}function g(){let e=_();for(let t of h)t(e)}function _(){return m}function v(e){m=ne(m,e),e.type===`UPSERT_PREDICTION`||e.type===`SET_PREDICTIONS`||e.type===`SET_MATCH_RESULTS`?y():g()}function ne(e,t){switch(t.type){case`SET_USER`:return{...e,user:t.payload};case`SET_PREDICTIONS`:return{...e,predictions:t.payload};case`SET_MATCH_RESULTS`:return{...e,matchResults:t.payload};case`UPSERT_PREDICTION`:{let n=new Map(e.predictions);return n.set(t.payload.matchId,t.payload),{...e,predictions:n}}case`SET_LOADING`:return{...e,loading:t.payload};case`SET_ERROR`:return{...e,error:t.payload};case`SET_INITIALIZED`:return{...e,initialized:t.payload};case`RECALCULATE`:return e;default:return e}}function y(){e(async()=>{let{resolveWorldCup:e}=await import(`./worldCupResolver-D6D_pMRu.js`);return{resolveWorldCup:e}},[]).then(({resolveWorldCup:e})=>{let t=e(m.predictions,m.matchResults,m.groupMatches);m={...m,standings:t.standings,bestThirds:t.bestThirds,qualifiedTeams:t.qualifiedTeams,knockoutMatches:t.knockoutMatches,champion:t.champion},g()})}function b(e){v({type:`SET_USER`,payload:e})}function re(e){v({type:`SET_PREDICTIONS`,payload:e})}function ie(e){v({type:`UPSERT_PREDICTION`,payload:e})}function x(e){v({type:`SET_LOADING`,payload:e})}function ae(e){v({type:`SET_INITIALIZED`,payload:e})}function oe(e){v({type:`SET_MATCH_RESULTS`,payload:e})}var S=`lisobet:predictions:v1`;function C(){try{let e=localStorage.getItem(S);if(!e)return new Map;let t=JSON.parse(e);return new Map(t.map(e=>[e.matchId,e]))}catch{return new Map}}function se(e){try{let t=[...e.values()];localStorage.setItem(S,JSON.stringify(t))}catch{console.warn(`[LocalStorage] Falha ao salvar palpites`)}}function w(e){let t=C();return t.set(e.matchId,e),se(t),t}function ce(e,t){let n=new Map(e);for(let[r,i]of t){let t=e.get(r);if(!t||!t.updatedAt||!i.updatedAt){n.set(r,i);continue}let a=new Date(t.updatedAt).getTime(),o=new Date(i.updatedAt).getTime();n.set(r,o>=a?i:t)}return n}function T(e){return{id:e.id,userId:e.user_id,matchId:e.match_id,homeScore:e.home_score,awayScore:e.away_score,updatedAt:e.updated_at}}async function le(e,t,n,r){let i={userId:r,matchId:e,homeScore:t,awayScore:n,updatedAt:new Date().toISOString()};w(i);try{let r=T(await s(e,t,n));return w(r),r}catch(e){return console.warn(`[Predictions] Falha na sincronização remota:`,e),i}}async function E(e){let t=C();if(!e)return t;try{let e=await o();return ce(t,new Map(e.map(e=>[e.match_id,T(e)])))}catch(e){return console.warn(`[Predictions] Falha ao buscar do servidor:`,e),t}}var ue=`ab617d74-9d92-4d15-8804-fb2fa6e239da`.split(`,`).map(e=>e.trim()).filter(Boolean);function D(e){return ue.includes(e)}function de(e){let t=e.user_metadata??{};return{id:e.id,email:e.email??null,name:t.display_name??e.email??null,avatarUrl:t.avatar_url??t.picture??null,isAdmin:D(e.id)}}async function fe(){x(!0);let{data:{session:e}}=await n.auth.getSession();e?.user?(b(de(e.user)),await O(!0)):(re(await E(!1)),y()),n.auth.onAuthStateChange(async(e,t)=>{t?.user?(b(de(t.user)),e===`SIGNED_IN`&&(x(!0),await O(!0),x(!1))):b(null)}),x(!1),ae(!0)}async function O(e){try{re(await E(e)),y()}catch(e){console.error(`[Auth] Erro ao sincronizar palpites:`,e)}}async function pe(e,t){await r(e,t)}async function me(e,t,n,r){await i(e,t,n,r)}async function he(){await a(),b(null)}function ge(e){return new Date(e+`T12:00:00`).toLocaleDateString(`pt-BR`,{weekday:`short`,day:`2-digit`,month:`short`})}function k(e){if(!e.time)return new Date(e.date);let[t,n]=e.time.split(` `),r=n.replace(`UTC`,``),i=r.startsWith(`-`)?`-`:`+`,a=r.replace(/[+-]/,``);a.length===1&&(a=`0`+a);let o=`${e.date}T${t}:00${i}${a}:00`;return new Date(o)}function A(e){return e==null?`?`:String(e)}function j(e){return{group:`Fase de Grupos`,round32:`Oitavas de Final`,round16:`Quartas-Oitavas`,quarterfinal:`Quartas de Final`,semifinal:`Semifinal`,third_place:`3° Lugar`,final:`Final`}[e]}function M(e){return e?e.split(` `).slice(0,2).map(e=>e[0]).join(``).toUpperCase():`?`}function N(e,t=`info`,n=3e3){let r=document.getElementById(`toast-root`);if(!r)return;let i=document.createElement(`div`);i.className=`toast toast--${t}`,i.textContent=e,i.setAttribute(`role`,`alert`),i.setAttribute(`aria-live`,`polite`),r.appendChild(i),requestAnimationFrame(()=>{i.classList.add(`toast--visible`)}),setTimeout(()=>{i.classList.remove(`toast--visible`),i.addEventListener(`transitionend`,()=>i.remove(),{once:!0})},n)}function P(e,t,n){return Math.min(Math.max(e,t),n)}function _e(e){let t=`login`;function n(){e.innerHTML=`
      <div class="auth-view">
        <div class="auth-container">
          <div class="auth-logo">
            <span class="auth-logo-text">LISOBET</span>
            <p class="auth-logo-sub">⚽ Bolão · Copa do Mundo 2026</p>
          </div>

          <div class="auth-card">
            <h2 class="auth-title">
              ${t===`login`?`Entrar na sua conta`:`Criar conta`}
            </h2>

            <div class="auth-divider">com e-mail</div>

            <!-- Email Form -->
            <form class="auth-form" id="auth-form" novalidate>

              ${t===`register`?`
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
              `:``}

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
                  placeholder="${t===`login`?`••••••••`:`Mínimo 6 caracteres`}"
                  autocomplete="${t===`login`?`current-password`:`new-password`}"
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
                ${t===`login`?`Entrar`:`Criar conta`}
              </button>

            </form>

            <div class="auth-toggle">
              ${t===`login`?`Não tem conta? <button id="toggle-mode">Criar conta</button>`:`Já tem conta? <button id="toggle-mode">Entrar</button>`}
            </div>
          </div>
        </div>
      </div>
    `,r()}function r(){document.getElementById(`toggle-mode`)?.addEventListener(`click`,()=>{t=t===`login`?`register`:`login`,n()}),document.getElementById(`auth-form`)?.addEventListener(`submit`,async e=>{e.preventDefault();let n=document.getElementById(`email-input`)?.value?.trim(),r=document.getElementById(`password-input`)?.value,i=document.getElementById(`submit-btn`),a=document.getElementById(`form-error`);if(!(!n||!r)){if(t===`register`){let e=document.getElementById(`name-input`)?.value?.trim(),t=document.getElementById(`username-input`)?.value?.trim()?.toLowerCase();if(!e){a.textContent=`Informe seu nome.`,a.style.display=`block`;return}if(!t){a.textContent=`Informe um nome de usuário.`,a.style.display=`block`;return}if(t.length<3){a.textContent=`O usuário deve possuir pelo menos 3 caracteres.`,a.style.display=`block`;return}}i.disabled=!0,i.textContent=`Aguarde...`,a.style.display=`none`;try{t===`login`?await pe(n,r):(await me(n,r,document.getElementById(`name-input`).value.trim(),document.getElementById(`username-input`).value.trim().toLowerCase().replace(/^@/,``)),N(`Conta criada! Verifique seu e-mail.`,`success`,5e3))}catch(e){a.textContent=ve(e instanceof Error?e.message:`Erro desconhecido`),a.style.display=`block`,i.disabled=!1,i.textContent=t===`login`?`Entrar`:`Criar conta`}}})}n()}function ve(e){return e.includes(`Invalid login credentials`)?`E-mail ou senha incorretos.`:e.includes(`Email not confirmed`)?`Confirme seu e-mail antes de entrar.`:e.includes(`User already registered`)?`Este e-mail já está cadastrado.`:e.includes(`Password should be`)?`Senha deve ter pelo menos 6 caracteres.`:e.includes(`duplicate key`)?`Este usuário já está em uso.`:e.includes(`username`)?`Nome de usuário já cadastrado.`:e}var F=[{id:1,name:`México`,group:`A`,abbr:`MEX`,emoji:`🇲🇽`},{id:2,name:`Coreia do Sul`,group:`A`,abbr:`KOR`,emoji:`🇰🇷`},{id:3,name:`República Tcheca`,group:`A`,abbr:`CZE`,emoji:`🇨🇿`},{id:4,name:`África do Sul`,group:`A`,abbr:`RSA`,emoji:`🇿🇦`},{id:5,name:`Canadá`,group:`B`,abbr:`CAN`,emoji:`🇨🇦`},{id:6,name:`Bósnia e Herzegovina`,group:`B`,abbr:`BIH`,emoji:`🇧🇦`},{id:7,name:`Qatar`,group:`B`,abbr:`QAT`,emoji:`🇶🇦`},{id:8,name:`Suíça`,group:`B`,abbr:`SUI`,emoji:`🇨🇭`},{id:9,name:`Brasil`,group:`C`,abbr:`BRA`,emoji:`🇧🇷`},{id:10,name:`Marrocos`,group:`C`,abbr:`MAR`,emoji:`🇲🇦`},{id:11,name:`Escócia`,group:`C`,abbr:`SCO`,emoji:`🏴󠁧󠁢󠁳󠁣󠁴󠁿`},{id:12,name:`Haiti`,group:`C`,abbr:`HAI`,emoji:`🇭🇹`},{id:13,name:`Estados Unidos`,group:`D`,abbr:`USA`,emoji:`🇺🇸`},{id:14,name:`Paraguai`,group:`D`,abbr:`PAR`,emoji:`🇵🇾`},{id:15,name:`Austrália`,group:`D`,abbr:`AUS`,emoji:`🇦🇺`},{id:16,name:`Turquia`,group:`D`,abbr:`TUR`,emoji:`🇹🇷`},{id:17,name:`Alemanha`,group:`E`,abbr:`GER`,emoji:`🇩🇪`},{id:18,name:`Equador`,group:`E`,abbr:`ECU`,emoji:`🇪🇨`},{id:19,name:`Costa do Marfim`,group:`E`,abbr:`CIV`,emoji:`🇨🇮`},{id:20,name:`Curaçao`,group:`E`,abbr:`CUW`,emoji:`🇨🇼`},{id:21,name:`Holanda`,group:`F`,abbr:`NED`,emoji:`🇳🇱`},{id:22,name:`Japão`,group:`F`,abbr:`JPN`,emoji:`🇯🇵`},{id:23,name:`Tunísia`,group:`F`,abbr:`TUN`,emoji:`🇹🇳`},{id:24,name:`Suécia`,group:`F`,abbr:`SWE`,emoji:`🇸🇪`},{id:25,name:`Bélgica`,group:`G`,abbr:`BEL`,emoji:`🇧🇪`},{id:26,name:`Irã`,group:`G`,abbr:`IRN`,emoji:`🇮🇷`},{id:27,name:`Egito`,group:`G`,abbr:`EGY`,emoji:`🇪🇬`},{id:28,name:`Nova Zelândia`,group:`G`,abbr:`NZL`,emoji:`🇳🇿`},{id:29,name:`Espanha`,group:`H`,abbr:`ESP`,emoji:`🇪🇸`},{id:30,name:`Uruguai`,group:`H`,abbr:`URU`,emoji:`🇺🇾`},{id:31,name:`Arábia Saudita`,group:`H`,abbr:`KSA`,emoji:`🇸🇦`},{id:32,name:`Cabo Verde`,group:`H`,abbr:`CPV`,emoji:`🇨🇻`},{id:33,name:`França`,group:`I`,abbr:`FRA`,emoji:`🇫🇷`},{id:34,name:`Senegal`,group:`I`,abbr:`SEN`,emoji:`🇸🇳`},{id:35,name:`Noruega`,group:`I`,abbr:`NOR`,emoji:`🇳🇴`},{id:36,name:`Iraque`,group:`I`,abbr:`IRQ`,emoji:`🇮🇶`},{id:37,name:`Argentina`,group:`J`,abbr:`ARG`,emoji:`🇦🇷`},{id:38,name:`Áustria`,group:`J`,abbr:`AUT`,emoji:`🇦🇹`},{id:39,name:`Argélia`,group:`J`,abbr:`ALG`,emoji:`🇩🇿`},{id:40,name:`Jordânia`,group:`J`,abbr:`JOR`,emoji:`🇯🇴`},{id:41,name:`Portugal`,group:`K`,abbr:`POR`,emoji:`🇵🇹`},{id:42,name:`Colômbia`,group:`K`,abbr:`COL`,emoji:`🇨🇴`},{id:43,name:`Uzbequistão`,group:`K`,abbr:`UZB`,emoji:`🇺🇿`},{id:44,name:`Rep. Dem. do Congo`,group:`K`,abbr:`COD`,emoji:`🇨🇩`},{id:45,name:`Inglaterra`,group:`L`,abbr:`ENG`,emoji:`🏴󠁧󠁢󠁥󠁮󠁧󠁿`},{id:46,name:`Croácia`,group:`L`,abbr:`CRO`,emoji:`🇭🇷`},{id:47,name:`Gana`,group:`L`,abbr:`GHA`,emoji:`🇬🇭`},{id:48,name:`Panamá`,group:`L`,abbr:`PAN`,emoji:`🇵🇦`}],I=new Map(F.map(e=>[e.abbr,e]));new Map(F.map(e=>[e.id,e]));var ye=[`A`,`B`,`C`,`D`,`E`,`F`,`G`,`H`,`I`,`J`,`K`,`L`];function be(e){return F.filter(t=>t.group===e)}function xe(e){return e.yellowCards*1+e.redCards*3}function Se(e,t,n,r){let i=0,a=0,o=0;for(let s of n){let n=r.get(s.id);if(!n)continue;let c=s.homeTeam===e&&s.awayTeam===t,l=s.homeTeam===t&&s.awayTeam===e;if(!c&&!l)continue;let{homeScore:u,awayScore:d}=n;c?(o+=u,a+=u-d,u>d?i+=3:u===d&&(i+=1)):(o+=d,a+=d-u,d>u?i+=3:d===u&&(i+=1))}return{pointsA:i,goalDiffA:a,goalsForA:o}}function Ce(e,t,n,r){if(t.points!==e.points)return t.points-e.points;if(t.goalDiff!==e.goalDiff)return t.goalDiff-e.goalDiff;if(t.goalsFor!==e.goalsFor)return t.goalsFor-e.goalsFor;let i=Se(e.team.abbr,t.team.abbr,n,r);if(i.pointsA!==0)return-i.pointsA;if(i.goalDiffA!==0)return-i.goalDiffA;if(i.goalsForA!==0)return-i.goalsForA;let a=xe(e),o=xe(t);return a===o?e.team.abbr.localeCompare(t.team.abbr):a-o}function we(e,t,n){return[...e].sort((e,r)=>Ce(e,r,t,n))}function Te(e,t,n){let r=be(e),i=new Map(r.map(e=>[e.abbr,{team:e,played:0,won:0,drawn:0,lost:0,goalsFor:0,goalsAgainst:0,goalDiff:0,points:0,yellowCards:0,redCards:0}])),a=t.filter(t=>t.group===e);for(let e of a){let t=n.get(e.id);if(!t)continue;let r=i.get(e.homeTeam),a=i.get(e.awayTeam);if(!r||!a)continue;let{homeScore:o,awayScore:s}=t;r.goalsFor+=o,r.goalsAgainst+=s,a.goalsFor+=s,a.goalsAgainst+=o,r.played+=1,a.played+=1,o>s?(r.won+=1,r.points+=3,a.lost+=1):o<s?(a.won+=1,a.points+=3,r.lost+=1):(r.drawn+=1,r.points+=1,a.drawn+=1,a.points+=1)}for(let e of i.values())e.goalDiff=e.goalsFor-e.goalsAgainst;return we([...i.values()],a,n).map((e,t)=>({...e,position:t+1}))}function Ee(e,t){let n=[...new Set(F.map(e=>e.group))].sort(),r=new Map;for(let i of n)r.set(i,Te(i,e,t));return r}function De(e){return{winner:e[0]?.team??null,runnerUp:e[1]?.team??null,third:e[2]?.team??null}}function Oe(e,t,n){let r=t.filter(t=>t.group===e);return{filled:r.filter(e=>n.has(e.id)).length,total:r.length}}function ke(e){return/^1[A-L]$/.test(e)?`1° Grupo ${e[1]}`:/^2[A-L]$/.test(e)?`2° Grupo ${e[1]}`:e.startsWith(`3rd-`)?`3° Mel. (${e.slice(4).split(``).join(`/`)})`:e.startsWith(`W`)?`Venc. J${e.slice(1)}`:e.startsWith(`L`)?`Perdedor J${e.slice(1)}`:e}function L(e,t){return e?e.name:ke(t)}function R(e){return e?.emoji??`🏳️`}function z(e,t){return e?e.abbr:/^[12][A-L]$/.test(t)?t:t.startsWith(`3rd-`)?`3rd`:t.startsWith(`W`)?`W${t.slice(1)}`:t.startsWith(`L`)?`L${t.slice(1)}`:`?`}function Ae(e){return e.homeTeam!==null&&e.awayTeam!==null}function B(e,t){return[...e.values()].filter(e=>e.stage===t).sort((e,t)=>parseInt(e.id.slice(1))-parseInt(t.id.slice(1)))}function je(e){let t=[{stage:`round32`,label:`Oitavas`},{stage:`round16`,label:`Quartas-Oitavas`},{stage:`quarterfinal`,label:`Quartas`},{stage:`semifinal`,label:`Semifinal`}],n=[],r=[];for(let{stage:i,label:a}of t){let t=B(e,i),o=Math.ceil(t.length/2);n.push({stage:i,label:a,matches:t.slice(0,o)}),r.push({stage:i,label:a,matches:t.slice(o)})}let i=B(e,`final`);return{leftColumns:n,rightColumns:r.reverse(),finalColumn:i.length>0?{stage:`final`,label:`Final`,matches:i}:null}}var V=null;function Me(e,t,n){let r=I.get(e.homeTeam)??null,i=I.get(e.awayTeam)??null,a=_().predictions.get(e.id);H({matchId:e.id,homeTeam:r,awayTeam:i,homeSlot:e.homeTeam,awaySlot:e.awayTeam,date:e.date,stage:j(e.stage),existingHome:a?.homeScore,existingAway:a?.awayScore},t,n)}function Ne(e,t,n){let r=_().predictions.get(e.id);H({matchId:e.id,homeTeam:e.homeTeam,awayTeam:e.awayTeam,homeSlot:e.homeSlot,awaySlot:e.awaySlot,date:`2026-07-01`,stage:j(e.stage),existingHome:r?.homeScore,existingAway:r?.awayScore},t,n)}function H(e,t,n){U();let r=e.existingHome??0,i=e.existingAway??0,a=document.createElement(`div`);a.className=`modal-overlay`,a.setAttribute(`role`,`dialog`),a.setAttribute(`aria-modal`,`true`),a.setAttribute(`aria-label`,`Palpite do jogo`);let o=L(e.homeTeam,e.homeSlot),s=L(e.awayTeam,e.awaySlot),c=R(e.homeTeam),l=R(e.awayTeam),u=z(e.homeTeam,e.homeSlot),d=z(e.awayTeam,e.awaySlot),f=e.homeTeam&&e.awayTeam;a.innerHTML=`
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
            <span class="modal-team-flag">${c}</span>
            <span class="modal-team-name">${o}</span>
            <span class="modal-team-abbr">${u}</span>
          </div>
          <div class="modal-vs">VS</div>
          <div class="modal-team">
            <span class="modal-team-flag">${l}</span>
            <span class="modal-team-name">${s}</span>
            <span class="modal-team-abbr">${d}</span>
          </div>
        </div>

        ${f?``:`
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
              <div class="score-display" id="score-home">${r}</div>
              <button class="score-btn" id="inc-home" aria-label="Aumentar gols mandante">+</button>
            </div>
          </div>

          <span class="score-sep">×</span>

          <div class="score-input-wrap">
            <span class="score-input-label">${d}</span>
            <div class="score-input-controls">
              <button class="score-btn" id="dec-away" aria-label="Diminuir gols visitante">−</button>
              <div class="score-display" id="score-away">${i}</div>
              <button class="score-btn" id="inc-away" aria-label="Aumentar gols visitante">+</button>
            </div>
          </div>
        </div>

        <!-- Meta info -->
        <div class="modal-meta">
          <div class="modal-meta-item">📅 ${ge(e.date)}</div>
          <div class="modal-meta-item">🏆 ${e.stage}</div>
          ${t?``:`<div class="modal-meta-item" style="color:var(--color-warning)">⚠️ Faça login para salvar</div>`}
        </div>

        ${t?``:`
          <div style="padding:var(--space-3);background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:var(--radius-md);font-size:13px;color:var(--color-text-subtle);text-align:center;">
            Palpite salvo apenas localmente. Faça login para persistir na nuvem.
          </div>
        `}
      </div>

      <div class="modal-footer">
        <button class="btn btn--secondary" id="btn-cancel">Cancelar</button>
        <button class="btn btn--primary" id="btn-save" ${!f&&t?`disabled title="Aguardando times"`:``}>
          💾 Salvar Palpite
        </button>
      </div>
    </div>
  `;function p(){let e=a.querySelector(`#score-home`),t=a.querySelector(`#score-away`);e&&(e.textContent=String(r)),t&&(t.textContent=String(i))}a.querySelector(`#modal-close`)?.addEventListener(`click`,U),a.querySelector(`#btn-cancel`)?.addEventListener(`click`,U),a.querySelector(`#inc-home`)?.addEventListener(`click`,()=>{r=P(r+1,0,20),p()}),a.querySelector(`#dec-home`)?.addEventListener(`click`,()=>{r=P(r-1,0,20),p()}),a.querySelector(`#inc-away`)?.addEventListener(`click`,()=>{i=P(i+1,0,20),p()}),a.querySelector(`#dec-away`)?.addEventListener(`click`,()=>{i=P(i-1,0,20),p()}),a.querySelector(`#btn-save`)?.addEventListener(`click`,async()=>{let o=a.querySelector(`#btn-save`);if(o.disabled=!0,o.textContent=`Salvando...`,ie({userId:t?.id??`anonymous`,matchId:e.matchId,homeScore:r,awayScore:i,updatedAt:new Date().toISOString()}),t)try{await le(e.matchId,r,i,t.id),N(`✅ Palpite salvo!`,`success`,2e3)}catch{N(`⚠️ Erro ao salvar no servidor. Tente novamente.`,`error`)}else N(`💾 Palpite salvo localmente`,`info`,2e3);U(),n?.()}),a.addEventListener(`click`,e=>{e.target===a&&U()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&U()}),a.dataset.keyHandler=`true`,document.getElementById(`modal-root`)?.appendChild(a),V=a,requestAnimationFrame(()=>{a.querySelector(`#btn-save`)?.focus()})}function U(){V&&=(V.remove(),null)}function W(e,t){let{predictions:n,groupMatches:r,user:i}=t;e.innerHTML=`
    ${`
    <div class="bracket-top-bar">
      <div>
          <h1 class="bracket-top-title">⚽ Fase de Grupos</h1>
          <p class="page-subtitle">Clique em qualquer jogo para inserir seu palpite</p>
        </div>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          ${Pe(r,n)}
        </div>
    </div>
  `}
    <div class="main-content">
      ${Fe(t)}
      <div class="groups-layout">${ye.map(e=>Ie(e,t)).join(``)}</div>
    </div>
    ${ze(`groups`)}
  `,e.querySelectorAll(`[data-match-id]`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.dataset.matchId,a=r.find(e=>e.id===n);if(!a)return;let o=t.matchResults?.get(n);if(new Date>=k(a)||o!==void 0){N(`O tempo para palpites neste jogo já encerrou.`,`error`);return}Me(a,i,()=>{})})})}function Pe(e,t){let n=e.length,r=e.filter(e=>t.has(e.id)).length;return`
    <div style="text-align:right;">
      <div style="font-size:13px;color:var(--color-text-muted);margin-bottom:6px;">
        ${r} / ${n} palpites preenchidos
      </div>
      <div style="width:200px;height:6px;background:var(--color-bg-600);border-radius:99px;overflow:hidden;">
        <div style="height:100%;width:${n>0?Math.round(r/n*100):0}%;background:var(--gradient-brand);border-radius:99px;transition:width 0.4s ease;"></div>
      </div>
    </div>
  `}function Fe(e){let{bestThirds:t}=e;if(t.length===0)return``;let n=t.map((e,t)=>`
    <div class="best-third-item">
      <span class="best-third-rank">${t+1}°</span>
      <span class="best-third-flag">${e.team.emoji}</span>
      <span class="best-third-name">${e.team.name}</span>
      <span style="font-size:11px;color:var(--color-text-muted);">Gr.${e.group}</span>
      <span class="best-third-pts">${e.points}pts</span>
    </div>
  `).join(``);return`
    <div class="best-thirds-panel">
      <div class="best-thirds-title">
        🌟 Melhores Terceiros Classificados (${t.length}/8)
      </div>
      <div class="best-thirds-list">${n}</div>
    </div>
  `}function Ie(e,t){let{groupMatches:n,predictions:r,standings:i,matchResults:a}=t,o=i.get(e)??[],s=n.filter(t=>t.group===e),{filled:c,total:l}=Oe(e,n,r);return`
    <div class="group-card">
      <div class="group-header">
        <span class="group-title">GRUPO ${e}</span>
        <div class="group-progress">
          <span>${c}/${l}</span>
          <div class="group-progress-bar">
            <div class="group-progress-fill" style="width:${l>0?Math.round(c/l*100):0}%"></div>
          </div>
        </div>
      </div>

      <!-- Standings -->
      ${Le(o)}

      <!-- Matches -->
      <div class="matches-list">
        ${s.map(e=>Re(e,r,a)).join(``)} 
      </div>
    </div>
  `}function Le(e){return e.length===0?`<div style="padding:12px 20px;font-size:12px;color:var(--color-text-muted);">Sem palpites ainda</div>`:`
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
        <tbody>${e.map((e,t)=>`
      <tr class="${t===0?`row--qualifies-1st`:t===1?`row--qualifies-2nd`:t===2?`row--qualifies-3rd`:``}">
        <td>
          <div class="standings-team">
            <span class="standings-pos ${t===0?`standings-pos--1`:t===1?`standings-pos--2`:t===2?`standings-pos--3`:`standings-pos--4`}">${t+1}</span>
            <span class="standings-flag">${e.team.emoji}</span>
            <span class="standings-name">${e.team.abbr}</span>
          </div>
        </td>
        <td>${e.played}</td>
        <td>${e.won}</td>
        <td>${e.drawn}</td>
        <td>${e.lost}</td>
        <td>${e.goalsFor}</td>
        <td>${e.goalsAgainst}</td>
        <td style="color:${e.goalDiff>0?`var(--color-success)`:e.goalDiff<0?`var(--color-error)`:`inherit`}">
          ${e.goalDiff>0?`+`:``}${e.goalDiff}
        </td>
        <td class="standings-pts">${e.points}</td>
      </tr>
    `).join(``)}</tbody>
      </table>
    </div>
  `}function Re(e,t,n){let r=t.get(e.id),i=n.get(e.id),a=r!==void 0,o=i!==void 0,s=new Date>=k(e)||o,c=a?A(r.homeScore):`?`,l=a?A(r.awayScore):`?`,u=a?``:`match-score-value--empty`;return`
    <div
      class="match-card ${a?`has-prediction`:``} ${s?`is-locked`:``}"
      data-match-id="${e.id}"
      role="${s?`presentation`:`button`}"
      tabindex="${s?`-1`:`0`}"
      style="${s?`opacity: 0.85; cursor: not-allowed;`:``}"
    >
      <div class="match-team">
        <span class="match-team-flag">${G(e.homeTeam)}</span>
        <div class="match-team-info">
          <div class="match-team-abbr">${e.homeTeam}</div>
          <div class="match-team-name">${K(e.homeTeam)}</div>
        </div>
      </div>

      <div class="match-score-area">
        <div class="match-score">
          <div class="match-score-value ${u}">${c}</div>
          <div class="match-score-sep">–</div>
          <div class="match-score-value ${u}">${l}</div>
        </div>
        <div class="match-date">${ge(e.date)}</div>
        
        ${o?`<div style="margin-top:6px; font-size:11px; font-weight:bold; color:var(--color-success); background:var(--color-bg-900); padding:2px 6px; border-radius:4px;">⚽ Placar Oficial: ${i.homeScore} x ${i.awayScore}</div>`:s?`<div class="match-hint" style="color:var(--color-text-muted);">🔒 Encerrado</div>`:`<div class="match-hint">✏️ clique para palpitar</div>`}
      </div>

      <div class="match-team match-team--away">
        <span class="match-team-flag">${G(e.awayTeam)}</span>
        <div class="match-team-info" style="text-align:right;">
          <div class="match-team-abbr">${e.awayTeam}</div>
          <div class="match-team-name">${K(e.awayTeam)}</div>
        </div>
      </div>
    </div>
  `}function G(e){return I.get(e)?.emoji??`🏳️`}function K(e){return I.get(e)?.name??e}function ze(e){return`
    <nav class="mobile-nav" aria-label="Navegação">
      <button class="mobile-nav-btn ${e===`groups`?`active`:``}" data-view="groups">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
        </svg>
        <span>Grupos</span>
      </button>
      <button class="mobile-nav-btn ${e===`bracket`?`active`:``}" data-view="bracket">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 6h4v4H4zM10 4h4v4h-4zM16 6h4v4h-4zM6 10v4M18 10v4M8 14h8M12 14v4"/>
        </svg>
        <span>Mata-Mata</span>
      </button>
      <button class="mobile-nav-btn ${e===`admin`?`active`:``}" data-view="admin">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.07 4.93a10 10 0 1 0 0 14.14"/>
        </svg>
        <span>Admin</span>
      </button>
    </nav>
  `}function Be(e,t){let{knockoutMatches:n,user:r}=t,{leftColumns:i,rightColumns:a,finalColumn:o}=je(n),s=n.get(`J103`);e.innerHTML=`
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

      <div class="main-content">
        <!-- Main Bracket Scroll -->
        <div class="bracket-scroll-container">
          <div class="bracket-canvas" id="bracket-canvas">
            
            <div class="bracket-side">
              ${i.map(e=>q(e.label,e.matches,e.stage,!1,t)).join(``)}
            </div>

            <div class="bracket-center">
              ${o?q(o.label,o.matches,o.stage,!1,t):``}
            </div>

            <div class="bracket-side right-side">
              ${a.map(e=>q(e.label,e.matches,e.stage,!0,t)).join(``)}
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
                ${J(s)}
              </div>
            </div>
          </div>
        `:``}
      </div>
    </div>
  `,e.querySelectorAll(`[data-knockout-id]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.knockoutId,i=n.get(t);i&&Ne(i,r)})}),e.querySelectorAll(`[data-knockout-id]`).forEach(e=>{e.addEventListener(`keydown`,t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),e.click())})})}function q(e,t,n,r,i){let a=n===`final`,{champion:o}=i;if(a){let e=t[0];return`
      <div class="bracket-col ${r?`right-side`:``}">
        <div class="bracket-col-header">
          <div class="bracket-col-label">Final</div>
          <div class="bracket-col-count">MetLife Stadium · 19/07/2026</div>
        </div>
        <div class="bracket-matches">
          <div class="bracket-match-wrapper">${e?J(e,!0):``}</div>
          <div style="margin-top: 24px; padding: 0 16px;">
            ${Ve(o)}
          </div>
        </div>
      </div>
    `}let s=``;for(let e=0;e<t.length;e+=2){let n=t[e],r=t[e+1];s+=`
      <div class="bracket-match-pair">
        <div class="bracket-match-wrapper">${J(n)}</div>
        ${r?`<div class="bracket-match-wrapper">${J(r)}</div>`:``}
        ${r?`<div class="match-bridge"></div>`:``}
      </div>
    `}return`
    <div class="bracket-col ${r?`right-side`:``}">
      <div class="bracket-col-header">
        <div class="bracket-col-label">${e}</div>
        <div class="bracket-col-count">${t.length} jogo${t.length>1?`s`:``}</div>
      </div>
      <div class="bracket-matches">
        ${s}
      </div>
    </div>
  `}function J(e,t=!1){let n=Ae(e),r=e.homeScore!==null&&e.awayScore!==null;return`
    <div
      class="${[`bracket-match`,n?`available`:``,r?`has-prediction`:``,t?`is-final`:``,e.stage===`third_place`?`bracket-third`:``].filter(Boolean).join(` `)}"
      data-knockout-id="${e.id}"
      role="button"
      tabindex="0"
      aria-label="Palpite ${e.id}"
    >
      <div class="bracket-match-id">
        <span>${e.id}</span>
        <span class="bracket-match-stage-badge">${{round32:`R32`,round16:`R16`,quarterfinal:`QF`,semifinal:`SF`,third_place:`3P`,final:`FIN`}[e.stage]??e.stage}</span>
      </div>
      ${Y(e,`home`,r)}
      ${Y(e,`away`,r)}
    </div>
  `}function Y(e,t,n){let r=t===`home`?e.homeTeam:e.awayTeam,i=t===`home`?e.homeSlot:e.awaySlot,a=t===`home`?e.homeScore:e.awayScore,o=e.winner&&e.winner.id===r?.id,s=`bracket-team-row${o?` winner`:``}`,c=R(r),l=z(r,i),u=L(r,i),d=!r,f=n&&a!==null?A(a):`–`;return`
    <div class="${s}">
      <span class="bracket-team-flag">${c}</span>
      <div class="bracket-team-info">
        <span class="bracket-team-abbr${d?` placeholder`:``}">${l}</span>
        <span class="bracket-team-name">${d?u:``}</span>
      </div>
      <span class="bracket-score${o?` winner-score`:``}">${f}</span>
      <span class="bracket-winner-icon">✓</span>
    </div>
  `}function Ve(e){return e?`
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
    `}function He(e,t){let{user:n}=t;if(!n||!D(n.id)){e.innerHTML=`
      <div class="main-content">
        <div class="empty-state">
          <div class="empty-state-icon">🔒</div>
          <div class="empty-state-title">Acesso Restrito</div>
          <p class="empty-state-text">Esta área é exclusiva para administradores.</p>
        </div>
      </div>
    `;return}let r=t.predictions.size,i=t.groupMatches.length+t.knockoutMatches.size,a=t.champion;e.innerHTML=`
    <div class="main-content">
      <div class="page-header">
        <h1 class="page-title">⚙️ Painel Admin</h1>
        <p class="page-subtitle">Lisobet · Copa do Mundo FIFA 2026</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px;margin-bottom:32px;">
        ${X(`🎯`,`Palpites`,String(r),`salvos localmente`)}
        ${X(`⚽`,`Jogos`,String(i),`total do torneio`)}
        ${X(`👥`,`Grupos`,`12`,`A até L`)}
        ${X(`🏆`,`Campeão`,a?.abbr??`—`,a?.name??`não definido`)}
      </div>

      <div class="admin-grid">
        
        <div class="admin-card" style="grid-column:1/-1;">
          <div class="admin-card-title">🏆 Definir Resultados Oficiais</div>
          <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:16px;">
            Insira o placar real das partidas. Isso atualizará a tabela de classificação oficial e os pontos dos usuários.
          </p>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:400px;overflow-y:auto;padding-right:8px;">
            ${Ue(t)}
          </div>
        </div>

        <div class="admin-card">
          <div class="admin-card-title">📊 Estado do Torneio (Simulado pelos seus palpites)</div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${We(t)}
          </div>
        </div>

        <div class="admin-card">
          <div class="admin-card-title">🔧 Configuração</div>
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${Ge()}
          </div>
        </div>
      </div>
    </div>
  `,document.querySelectorAll(`.btn-save-result`).forEach(e=>{e.addEventListener(`click`,async e=>{let n=e.currentTarget.dataset.match;if(!n)return;let r=document.getElementById(`home-res-${n}`),i=document.getElementById(`away-res-${n}`);if(!r.value||!i.value){N(`Preencha os dois placares!`,`error`);return}try{let a=e.currentTarget,o=a.textContent;a.textContent=`...`,a.disabled=!0,await l(n,parseInt(r.value,10),parseInt(i.value,10)),t.matchResults?.set(n,{matchId:n,homeScore:parseInt(r.value),awayScore:parseInt(i.value)}),N(`Placar oficial salvo!`,`success`),a.textContent=o??`Salvar`,a.disabled=!1}catch(e){console.error(e),N(`Erro ao salvar no banco.`,`error`)}})})}function Ue(e){return e.groupMatches.map(t=>{let n=e.matchResults?.get(t.id);return`
      <div style="display:flex;align-items:center;justify-content:space-between;background:var(--color-bg-800);padding:8px 12px;border-radius:6px;">
        <div style="font-size:12px;color:var(--color-text-muted);width:40px;font-weight:bold;">${t.id}</div>
        <div style="flex:1;display:flex;align-items:center;justify-content:center;gap:12px;">
          <span style="font-weight:600;width:40px;text-align:right;">${t.homeTeam}</span>
          <input type="number" id="home-res-${t.id}" value="${n?.homeScore??``}" min="0" max="30" style="width:50px;text-align:center;background:var(--color-bg-900);border:1px solid var(--color-border);color:white;border-radius:4px;padding:4px;">
          <span style="color:var(--color-text-muted);">X</span>
          <input type="number" id="away-res-${t.id}" value="${n?.awayScore??``}" min="0" max="30" style="width:50px;text-align:center;background:var(--color-bg-900);border:1px solid var(--color-border);color:white;border-radius:4px;padding:4px;">
          <span style="font-weight:600;width:40px;text-align:left;">${t.awayTeam}</span>
        </div>
        <button class="btn btn--primary btn--sm btn-save-result" data-match="${t.id}" style="padding:4px 12px;font-size:12px;">Salvar</button>
      </div>
    `}).join(``)}function X(e,t,n,r){return`
    <div class="admin-card" style="text-align:center;padding:20px 16px;">
      <div style="font-size:28px;margin-bottom:8px;">${e}</div>
      <div style="font-size:24px;font-weight:800;color:var(--color-text);">${n}</div>
      <div style="font-size:13px;font-weight:600;color:var(--color-text-subtle);">${t}</div>
      <div style="font-size:11px;color:var(--color-text-muted);margin-top:4px;">${r}</div>
    </div>
  `}function We(e){return[...e.standings.entries()].map(([e,t])=>{let n=t[0],r=t[1];return`
      <div style="display:flex;align-items:center;justify-content:space-between;font-size:13px;">
        <span style="color:var(--color-text-muted);font-weight:700;">Grupo ${e}</span>
        <span>${n?`${n.team.emoji} ${n.team.abbr}`:`—`}</span>
        <span style="color:var(--color-text-muted);">${r?`${r.team.emoji} ${r.team.abbr}`:`—`}</span>
      </div>
    `}).join(``)||`<span style="color:var(--color-text-muted);font-size:13px;">Nenhum palpite preenchido</span>`}function Ge(){return`
    <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <span style="color:var(--color-text-muted);">Supabase</span>
        <span class="badge badge--green">Ativo</span>
      </div>
    </div>`}function Ke(e,t,n){let r=new Map;for(let n of e.values()){let e=t.get(n.matchId);if(!e)continue;let i=0;n.homeScore===e.homeScore&&n.awayScore===e.awayScore?i=3:Math.sign(n.homeScore-n.awayScore)===Math.sign(e.homeScore-e.awayScore)&&(i=1);let a=r.get(n.userId)??0;r.set(n.userId,a+i)}let i=new Map(n.map(e=>[e.id,e.name]));return Array.from(r.entries()).map(([e,t])=>({userId:e,score:t,name:i.get(e)||`Usuário`})).sort((e,t)=>t.score-e.score)}async function qe(e,t){e.innerHTML=`
    <div class="bracket-top-bar">
      <span class="bracket-top-title">🏆 Ranking dos lisos</span>
    </div>
    <div id="ranking-content" class="main-content">
      <p>Carregando ranking...</p>
    </div>
  `;let{data:r,error:i}=await n.from(`profiles`).select(`id, display_name, avatar_url`);if(i){console.error(`Erro ao buscar perfis:`,i);return}let a=(r||[]).map(e=>{let t=e.avatar_url;if(t&&!t.startsWith(`http`)){let{data:e}=n.storage.from(`avatars`).getPublicUrl(t);t=e.publicUrl}return{id:e.id,name:e.display_name,avatarUrl:t}});e.innerHTML=`
    <div class="bracket-top-bar">
      <span class="bracket-top-title">🏆 Ranking dos lisos</span>
    </div>
    <div class="main-content">
      <table class="ranking-table">
        <thead>
          <tr><th>Pos</th><th>Nome</th><th>Pontos</th></tr>
        </thead>
        <tbody>
          ${Ke(t.predictions,t.matchResults,a).map(e=>{let t=a.find(t=>t.id===e.userId);return{...e,avatarUrl:t?.avatarUrl||null}}).map((e,t)=>`
            <tr>
              <td>${t+1}°</td>
              <td>
                <span class="user">
                  <span class="user-avatar user-avatar--sm">
                    ${e.avatarUrl?`<img src="${e.avatarUrl}" alt="Avatar" loading="lazy" />`:`<span>${M(e.name??``)}</span>`}
                  </span>
                  ${e.name}
                </span>
              </td>
              <td class="score">${e.score}</td>
            </tr>
          `).join(``)}
        </tbody>
      </table>
    </div>
  `}var Je=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,Ye=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,Xe=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;function Ze(e){let t=document.getElementById(`profile-dropdown-btn`),n=document.getElementById(`profile-dropdown`);if(!(!n||!e.user)&&(n.classList.toggle(`visible`),n.classList.contains(`visible`))){let e=r=>{!n.contains(r.target)&&!t?.contains(r.target)&&(n.classList.remove(`visible`),document.removeEventListener(`click`,e))};document.addEventListener(`click`,e)}}function Qe(e,t){let{user:n}=e;if(!n)return;let r=document.getElementById(`modal-root`);if(!r)return;let i=document.createElement(`div`);i.className=`modal-overlay`,i.innerHTML=`
    <div class="modal-content profile-modal">
      <div class="modal-header">
        <h2>Editar Perfil</h2>
        <button class="modal-close-btn" aria-label="Fechar" id="close-profile-modal">
          ${Xe}
        </button>
      </div>

      <form id="edit-profile-form" class="profile-form">
        <div class="form-group">
          <label for="display-name">Nome</label>
          <input
            type="text"
            id="display-name"
            name="display-name"
            value="${n.name??``}"
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
            value="${n.email??``}"
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
            value="${n.avatarUrl??``}"
            placeholder="https://example.com/avatar.jpg"
            class="form-input"
          />
          <small>Link para uma imagem (JPG, PNG). Se vazio, usa iniciais do nome.</small>
        </div>

        ${n.avatarUrl?`
          <div class="form-group">
            <label>Pré-visualização do Avatar</label>
            <img src="${n.avatarUrl}" alt="Avatar preview" class="avatar-preview" />
          </div>
        `:``}

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
  `,r.appendChild(i);let a=i.querySelector(`#edit-profile-form`),o=i.querySelector(`#close-profile-modal`),s=i.querySelector(`#cancel-profile-btn`),c=()=>{i.remove()};o?.addEventListener(`click`,c),s?.addEventListener(`click`,c),a?.addEventListener(`submit`,async n=>{n.preventDefault();let r=i.querySelector(`#display-name`)?.value.trim()||null,o=i.querySelector(`#avatar-url`)?.value.trim()||null;if(!r){N(`Nome é obrigatório`,`error`);return}try{let n=a.querySelector(`button[type="submit"]`);n&&(n.disabled=!0),await u(r,o||void 0),e.user&&(e.user.name=r,e.user.avatarUrl=o,b(e.user)),N(`Perfil atualizado com sucesso!`,`success`),c(),t()}catch(e){console.error(`Erro ao atualizar perfil:`,e),N(`Erro ao atualizar perfil. Tente novamente.`,`error`);let t=a.querySelector(`button[type="submit"]`);t&&(t.disabled=!1)}}),i.addEventListener(`click`,e=>{e.target===i&&c()})}function $e(e){return`
    <div class="profile-dropdown-wrapper">
      <button class="profile-dropdown-trigger" id="profile-dropdown-btn" aria-label="Menu de perfil" title="Perfil">
        <span class="user-avatar user-avatar--sm">
          ${e.avatarUrl?`<img src="${e.avatarUrl}" alt="Avatar" loading="lazy" />`:`<span>${M(e.name??e.email)}</span>`}
        </span>
      </button>

      <div class="profile-dropdown" id="profile-dropdown">
        <div class="profile-dropdown-header">
          <div class="profile-dropdown-avatar">
            ${e.avatarUrl?`<img src="${e.avatarUrl}" alt="Avatar" loading="lazy" />`:`<span>${M(e.name??e.email)}</span>`}
          </div>
          <div class="profile-dropdown-info">
            <div class="profile-dropdown-name">${e.name??`Usuário`}</div>
            <div class="profile-dropdown-email">${e.email??``}</div>
          </div>
        </div>

        <div class="profile-dropdown-divider"></div>

        <button class="profile-dropdown-item" id="edit-profile-btn">
          ${Je}
          <span>Editar Perfil</span>
        </button>

        <button class="profile-dropdown-item profile-dropdown-item--danger" id="profile-logout-btn">
          ${Ye}
          <span>Sair</span>
        </button>
      </div>
    </div>
  `}function et(e,t,n){let r=document.getElementById(`profile-dropdown-btn`),i=document.getElementById(`edit-profile-btn`),a=document.getElementById(`profile-logout-btn`);r?.addEventListener(`click`,t=>{t.stopPropagation(),Ze(e)}),i?.addEventListener(`click`,t=>{t.stopPropagation(),document.getElementById(`profile-dropdown`)?.classList.remove(`visible`),Qe(e,n)}),a?.addEventListener(`click`,async e=>{e.stopPropagation();try{await t()}catch(e){console.error(`Erro ao fazer logout:`,e),N(`Erro ao sair`,`error`)}})}var tt=document.getElementById(`app`),nt=document.getElementById(`loading-screen`),rt=new Promise(e=>setTimeout(e,2e3)),Z=`groups`,it=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,at=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M4 6h4v4H4zM16 6h4v4h-4zM10 4h4v4h-4zM6 10v4h12v-4M12 14v4"/></svg>`,ot=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="8" r="4"/><path d="M12 14c-6 0-9 3-9 4h18c0-1-3-4-9-4z"/></svg>`,Q=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M6 9H4a2 2 0 0 1-2-2V5h4"/><path d="M18 9h2a2 2 0 0 0 2-2V5h-4"/><path d="M6 9c0 5.25 3 8 6 9 3-1 6-3.75 6-9"/><line x1="12" y1="18" x2="12" y2="21"/><line x1="9" y1="21" x2="15" y2="21"/></svg>`,st=`<svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><defs><linearGradient id="financeGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e3a8a" /><stop offset="50%" stop-color="#3b82f6" /><stop offset="100%" stop-color="#06b6d4" /></linearGradient></defs><path d="M0 0h24v24H0z" fill="none" /><path fill="url(#financeGradient)" d="M16 18v-2h2.6l-5.2-5.15l-4 4L2 7.4L3.4 6l6 6l4-4l6.6 6.6V12h2v6z"/></svg>`;function $(e){let{user:t,champion:n}=e,r=t&&D(t.id);tt.innerHTML=`
    <div class="app-layout">
      <!-- Navbar -->
      <nav class="navbar">
        <span class="navbar-brand"> ${st} LISOBET</span>

        <!-- Desktop Nav -->
        <div class="navbar-nav" id="desktop-nav">
          <button class="nav-btn ${Z===`groups`?`active`:``}" data-view="groups">
            ${it} Grupos
          </button>
          <button class="nav-btn ${Z===`bracket`?`active`:``}" data-view="bracket">
            ${at} Mata-Mata
          </button>
          <button class="nav-btn ${Z===`champion`?`active`:``}" data-view="champion">
            ${Q} Ranking
          </button>
          ${r?`
            <button class="nav-btn ${Z===`admin`?`active`:``}" data-view="admin">
              ${ot} Admin
            </button>
          `:``}
          ${n?`
            <div style="display:flex;align-items:center;gap:8px;padding:6px 12px;background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.2);border-radius:8px;font-size:13px;font-weight:600;color:var(--color-gold);">
              ${Q} ${n.emoji} ${n.name}
            </div>
          `:``}
        </div>

        <!-- User Area -->
        <div class="navbar-user">
          ${t?`
            <span class="user-name">${t.name??t.email??`Usuário`}</span>
            ${$e(t)}
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
        <button class="mobile-nav-btn ${Z===`groups`?`active`:``}" data-view="groups">
          ${it}
          <span>Grupos</span>
        </button>
        <button class="mobile-nav-btn ${Z===`bracket`?`active`:``}" data-view="bracket">
          ${at}
          <span>Mata-Mata</span>
        </button>
        <button class="mobile-nav-btn ${Z===`champion`?`active`:``}" data-view="champion">
          ${Q}
          <span>Ranking</span>
        </button>
      </nav>
    </div>
  `,ut(e),ct(e)}function ct(e){let t=document.getElementById(`view-container`);if(t)switch(Z){case`groups`:W(t,e);break;case`bracket`:Be(t,e);break;case`champion`:qe(t,e);break;case`admin`:He(t,e);break;default:W(t,e)}}function lt(e){Z=e,$(_()),window.scrollTo({top:0,behavior:`smooth`})}function ut(e){document.querySelectorAll(`[data-view]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.view;t&&lt(t)})}),e.user&&et(e,he,()=>$(_())),document.getElementById(`btn-login`)?.addEventListener(`click`,()=>{dt()}),document.getElementById(`mobile-login-btn`)?.addEventListener(`click`,()=>{e.user||dt()})}function dt(){tt.innerHTML=`<div id="auth-container"></div>`,_e(document.getElementById(`auth-container`))}var ft=null,pt=!0;te(e=>{if(e.loading&&!e.initialized)return;let t=e.user?.id??null,n=t!==ft;if(pt&&e.initialized||n){ft=t,pt=!1,$(e);return}document.getElementById(`view-container`)&&ct(e)});async function mt(){try{let e=await c();console.log(`1. Dados puros do Supabase:`,e);let t=new Map;e.forEach(e=>{t.set(e.match_id,{matchId:e.match_id,homeScore:e.home_score,awayScore:e.away_score,updatedAt:e.updated_at})}),console.log(`2. Map convertido:`,t),oe(t)}catch(e){console.error(`Falha ao sincronizar resultados do Supabase:`,e)}}async function ht(){try{await fe(),await mt()}catch(e){console.error(`[App] Initialization error:`,e),ae(!0),$(_()),N(`Erro de conexão. Funcionando em modo offline.`,`error`,5e3)}finally{await rt,nt.classList.add(`hidden`),setTimeout(()=>{nt.remove()},500)}}ht();export{p as i,De as n,ee as r,Ee as t};