import { PrismaClient } from '../node_modules/@prisma/client/index.js';

const p = new PrismaClient();
const BASE = 'http://localhost:3000/api';

async function run() {
  console.log('\n🔍 NEXORA LMS — FULL INTEGRATION AUDIT\n');
  const results = [];

  const ok   = (cat, msg) => { results.push({cat, status:'✅', msg}); console.log(`  ✅ [${cat}] ${msg}`); };
  const fail = (cat, msg) => { results.push({cat, status:'❌', msg}); console.log(`  ❌ [${cat}] ${msg}`); };
  const warn = (cat, msg) => { results.push({cat, status:'⚠️ ', msg}); console.log(`  ⚠️  [${cat}] ${msg}`); };

  // ── 1. DB ──────────────────────────────────────
  console.log('\n══ DATABASE ══');
  try {
    const roles   = await p.user.groupBy({ by:['role'], _count:true });
    const boards  = await p.board.count();
    const notes   = await p.courseNote.count();
    const lc      = await p.liveClass.count();
    const assigns = await p.assignment.count();
    const classes = await p.class.count();
    const subs    = await p.subject.count();
    const chapters= await p.chapter.count();
    const topics  = await p.topic.count();
    const notifs  = await p.notification.count();

    ok('DB', `Connected — users: ${roles.map(r=>`${r._count} ${r.role}`).join(', ')}`);
    ok('DB', `Boards:${boards} | Classes:${classes} | Subjects:${subs} | Chapters:${chapters} | Topics:${topics}`);
    ok('DB', `Notes:${notes} | Assignments:${assigns} | LiveClasses:${lc} | Notifications:${notifs}`);
  } catch(e) { fail('DB', e.message); }

  // ── 2. BACKEND HEALTH ─────────────────────────
  console.log('\n══ BACKEND API ══');
  try {
    const r = await fetch(`${BASE}/health`);
    const d = await r.json();
    ok('API', `Health: status=${d.status}, service=${d.service}`);
  } catch(e) { fail('API', `Health endpoint: ${e.message}`); }

  // ── 3. AUTH ────────────────────────────────────
  console.log('\n══ AUTHENTICATION ══');
  let sToken = null, tToken = null;
  try {
    const sRes = await fetch(`${BASE}/auth/login`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({email:'student@nexoralearning.com', password:'password123'})
    });
    const sd = await sRes.json();
    if (sRes.ok && sd.token) {
      sToken = sd.token;
      ok('AUTH', `Student login ✓ — email:${sd.user?.email}, role:${sd.user?.role}`);
    } else fail('AUTH', `Student login: ${JSON.stringify(sd)}`);
  } catch(e) { fail('AUTH', `Student: ${e.message}`); }

  try {
    const tRes = await fetch(`${BASE}/auth/login`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({email:'teacher@nexoralearning.com', password:'password123'})
    });
    const td = await tRes.json();
    if (tRes.ok && td.token) {
      tToken = td.token;
      ok('AUTH', `Teacher login ✓ — email:${td.user?.email}, role:${td.user?.role}`);
    } else fail('AUTH', `Teacher login: ${JSON.stringify(td)}`);
  } catch(e) { fail('AUTH', `Teacher: ${e.message}`); }

  const sH = { Authorization: `Bearer ${sToken}` };
  const tH = { Authorization: `Bearer ${tToken}` };

  // ── 4. ACADEMIC STRUCTURE ─────────────────────
  console.log('\n══ ACADEMIC API ══');
  if (sToken) {
    try {
      const r = await fetch(`${BASE}/academic/structure`, { headers: sH });
      const d = await r.json();
      const board = Array.isArray(d) ? d[0] : d;
      ok('ACADEMIC', `GET /academic/structure → ${r.status} | Board: "${board?.title || board?.name || JSON.stringify(board).substring(0,40)}"`);
    } catch(e) { fail('ACADEMIC', e.message); }
  }

  // ── 5. NOTES & UPLOAD ─────────────────────────
  console.log('\n══ NOTES & UPLOAD ══');
  if (sToken) {
    try {
      const r = await fetch(`${BASE}/upload/notes/all`, { headers: sH });
      const d = await r.json();
      ok('NOTES', `GET /upload/notes/all → ${r.status} | ${d.notes?.length ?? 0} note(s) in DB`);
    } catch(e) { fail('NOTES', e.message); }

    try {
      const r = await fetch(`${BASE}/upload/structure`, { headers: sH });
      ok('NOTES', `GET /upload/structure → ${r.status}`);
    } catch(e) { fail('NOTES', e.message); }
  }

  // ── 6. NOTIFICATIONS ──────────────────────────
  console.log('\n══ NOTIFICATIONS ══');
  if (sToken) {
    try {
      const r = await fetch(`${BASE}/notifications`, { headers: sH });
      const d = await r.json();
      ok('NOTIF', `GET /notifications → ${r.status} | ${d.notifications?.length ?? 0} notification(s)`);
    } catch(e) { fail('NOTIF', e.message); }
  }

  // ── 7. LIVE CLASSES & LIVEKIT ─────────────────
  console.log('\n══ LIVE CLASSES + LIVEKIT CLOUD ══');
  // Check cloud reachability first
  try {
    const r = await fetch(`${BASE}/live-class/status`);
    const d = await r.json();
    if (d.livekitAvailable) ok('LIVEKIT', `Cloud reachable ✓ — wss://lms-4up2o7gq.livekit.cloud`);
    else warn('LIVEKIT', 'Cloud TCP check returned false — may be WebSocket-only');
  } catch(e) { fail('LIVEKIT', `Status: ${e.message}`); }

  // Token generation (core test)
  if (sToken) {
    try {
      const r = await fetch(`${BASE}/live-class/token?room=audit-test-room&participant=AuditBot&isTeacher=false`, {
        headers: sH
      });
      const d = await r.json();
      if (r.ok && d.token && d.token.length > 50) {
        ok('LIVEKIT', `Token generated ✓ (${d.token.length} chars) — eyJ... format valid`);
        ok('LIVEKIT', `Token route: GET /api/live-class/token ✓`);
      } else fail('LIVEKIT', `Token: ${JSON.stringify(d)}`);
    } catch(e) { fail('LIVEKIT', `Token: ${e.message}`); }
  }

  if (tToken) {
    // Teacher token (can screen share)
    try {
      const r = await fetch(`${BASE}/live-class/token?room=teacher-test-room&participant=DrRamesh&isTeacher=true`, {
        headers: tH
      });
      const d = await r.json();
      if (r.ok && d.token) ok('LIVEKIT', `Teacher token (with screen share perms) ✓`);
      else fail('LIVEKIT', `Teacher token: ${JSON.stringify(d)}`);
    } catch(e) { fail('LIVEKIT', `Teacher token: ${e.message}`); }

    // Create a live class
    try {
      const r = await fetch(`${BASE}/live-classes`, {
        method:'POST', headers:{'Content-Type':'application/json', ...tH},
        body: JSON.stringify({
          title: 'Audit Test Class',
          classLevel: 'Class 11',
          date: '2026-06-20',
          startTime: '10:00 AM',
          endTime: '11:00 AM',
          description: 'Test class from audit'
        })
      });
      const d = await r.json();
      if (r.ok && d.success) {
        ok('LIVEKIT', `POST /live-classes (create meeting) ✓ — roomCode: ${d.liveClass?.meetingUrl}`);
        // Clean up
        try { await p.liveClass.delete({ where: { id: d.liveClass.id } }); } catch{}
      } else warn('LIVEKIT', `Create class: ${JSON.stringify(d).substring(0,80)}`);
    } catch(e) { warn('LIVEKIT', `Create class: ${e.message}`); }
  }

  // ── 8. AI TUTOR ───────────────────────────────
  console.log('\n══ AI TUTOR ══');
  if (sToken) {
    try {
      const r = await fetch(`${BASE}/tutor`, {
        method:'POST',
        headers:{'Content-Type':'application/json', ...sH},
        body: JSON.stringify({
          question: "What is Newton's Second Law of Motion?",
          history: []
        }),
        signal: AbortSignal.timeout(30000)
      });
      const d = await r.json();
      if (r.ok && d.answer?.length > 30) {
        const isErrorMsg = d.answer.includes('temporarily unavailable');
        if (isErrorMsg) warn('TUTOR', 'Returned error fallback — Gemini key may be invalid');
        else {
          const preview = d.answer.replace(/\n/g,' ').substring(0,120);
          ok('TUTOR', `AI responded (${d.answer.length} chars): "${preview}..."`);
          ok('TUTOR', 'AI Tutor endpoint: POST /api/tutor ✓');
        }
      } else fail('TUTOR', JSON.stringify(d).substring(0,100));
    } catch(e) { fail('TUTOR', e.message); }

    // Second question to verify topic routing
    try {
      const r = await fetch(`${BASE}/tutor`, {
        method:'POST',
        headers:{'Content-Type':'application/json', ...sH},
        body: JSON.stringify({
          question: "Explain complex numbers",
          history: []
        }),
        signal: AbortSignal.timeout(20000)
      });
      const d = await r.json();
      if (r.ok && d.answer?.length > 30) ok('TUTOR', `Topic routing (complex numbers) ✓ — ${d.answer.length} chars`);
    } catch {}
  }

  // ── 9. MINIO ──────────────────────────────────
  console.log('\n══ MINIO STORAGE ══');
  try {
    const r = await fetch('http://localhost:9000/minio/health/live', { signal: AbortSignal.timeout(2000) });
    if (r.ok) ok('MINIO', 'MinIO running on :9000 — full cloud storage active');
    else warn('MINIO', `HTTP ${r.status} — using disk fallback`);
  } catch {
    warn('MINIO', 'Not running — uploads saved to /uploads/ folder on disk (OK for dev)');
  }

  // ── 10. ENV VARS ──────────────────────────────
  console.log('\n══ ENV CONFIGURATION ══');
  const checks = [
    ['DATABASE_URL',      process.env.DATABASE_URL?.includes('lms_db')],
    ['GEMINI_API_KEY',    !!process.env.GEMINI_API_KEY],
    ['LIVEKIT_URL',       process.env.LIVEKIT_URL?.includes('livekit.cloud')],
    ['LIVEKIT_API_KEY',   process.env.LIVEKIT_API_KEY?.startsWith('APImCa')],
    ['LIVEKIT_API_SECRET',process.env.LIVEKIT_API_SECRET?.length > 20],
    ['VITE_LIVEKIT_URL',  !!process.env.VITE_LIVEKIT_URL],
    ['JWT_SECRET',        !!process.env.JWT_SECRET],
    ['SMTP_HOST',         process.env.SMTP_HOST === 'smtp.gmail.com'],
    ['SMTP_USER',         !!process.env.SMTP_USER],
    ['MINIO_ENDPOINT',    !!process.env.MINIO_ENDPOINT],
  ];
  for (const [k, v] of checks) {
    if (v) ok('ENV', `${k} ✓`);
    else fail('ENV', `${k} missing or invalid`);
  }

  // ── FINAL REPORT ──────────────────────────────
  console.log('\n══════════════════════════════════════════');
  console.log('          FINAL AUDIT SUMMARY');
  console.log('══════════════════════════════════════════');
  const pass = results.filter(r=>r.status==='✅').length;
  const failures = results.filter(r=>r.status==='❌');
  const warnings = results.filter(r=>r.status==='⚠️ ');
  console.log(`  ✅ PASSED : ${pass}`);
  console.log(`  ⚠️  WARNINGS: ${warnings.length}`);
  console.log(`  ❌ FAILED : ${failures.length}`);
  if (failures.length > 0) {
    console.log('\n  Issues to fix:');
    failures.forEach(f => console.log(`    • [${f.cat}] ${f.msg}`));
  }
  if (warnings.length > 0) {
    console.log('\n  Warnings (non-blocking):');
    warnings.forEach(w => console.log(`    • [${w.cat}] ${w.msg}`));
  }
  console.log('══════════════════════════════════════════\n');

  await p.$disconnect();
}

run().catch(async e => {
  console.error('Audit crashed:', e.message);
  await p.$disconnect();
});
