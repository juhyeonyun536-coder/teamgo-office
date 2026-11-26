import {getStore} from '@netlify/blobs';
export default async (req)=>{
 const respond=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
 try{
 const url=new URL(req.url); if(url.searchParams.has('board'))return respond({error:'Not found'},404); const month=url.searchParams.get('month');
 if(!/^\d{4}-\d{2}$/.test(month||''))return respond({error:'Invalid month'},400);
 const store=getStore({name:'teamgo-office-v2',consistency:'strong'}), prefix='schedule/';
 const read=async()=>{const {blobs}=await store.list({prefix:prefix+month});return (await Promise.all(blobs.map(b=>store.get(b.key,{type:'json'})))).filter(Boolean)};
 if(req.method==='GET')return respond(await read());
 if(!['POST','DELETE'].includes(req.method))return respond({error:'Method'},405);
 const b=await req.json();if(!b||typeof b.id!=='string'||! /^[\w-]{1,100}$/.test(b.id))return respond({error:'Invalid ID'},400);
 if(!b.id.startsWith(month))return respond({error:'Invalid date'},400);
 const key=prefix+b.id;
 if(req.method==='DELETE'){await store.delete(key);return respond(await read())}
 {if(!/^\d{4}-\d{2}-\d{2}$/.test(b.date||'')||!b.id.startsWith(b.date+'_')||!['연차','오전 반차','오후 반차','외근','외부 미팅','업무 마감','회식','생일','기타','회의실 예약'].includes(b.kind))return respond({error:'Invalid schedule'},400);if(b.kind==='회의실 예약'){if(!/^\d{2}:\d{2}$/.test(b.time||'')||!/^\d{2}:\d{2}$/.test(b.end||'')||b.time>=b.end||!Number.isInteger(b.count)||b.count<1||b.count>6)return respond({error:'Invalid reservation'},400);if((await read()).some(x=>x.id!==b.id&&x.kind===b.kind&&x.date===b.date&&x.time<b.end&&b.time<x.end))return respond({error:'Conflict'},409)}}
 if(!['주현님','이사님','소현님','팀장님','대표님','전체 직원'].includes(b.name))return respond({error:'Invalid name'},400);
 await store.setJSON(key,b);return respond(await read());
 }catch(e){console.error(e);return respond({error:'Server error'},500)}
};
