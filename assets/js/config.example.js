/* ============================================================
   config.example.js — 프론트 공개 설정 템플릿
   ============================================================
   사용법 (프로덕션):
     cp assets/js/config.example.js assets/js/config.js
     값을 채운 뒤 config.js 는 커밋해도 됩니다 (민감 키 없음).

   사용법 (로컬):
     cp assets/js/config.example.js assets/js/config.local.js
     아래 LOCAL 주석 블록 값으로 덮어쓰기
     index.html 에 config.local.js 를 추가 (config.js 다음)
     config.local.js 는 git 에 올리지 않습니다.
   ============================================================ */

window.SITE_CONFIG = {
  /* 프로덕션 — Supabase 대시보드 Project Settings → API */
  contactFunctionUrl: 'https://<project-ref>.supabase.co/functions/v1/contact',
  supabaseAnonKey: '<anon_public_key>',
  turnstileSiteKey: '<turnstile_site_key>',
  monthlyLimit: 1500
};

/* --- LOCAL: 로컬 테스트 시 config.local.js 에서 아래처럼 덮어쓰기 ---
Object.assign(window.SITE_CONFIG, {
  contactFunctionUrl: 'http://127.0.0.1:54321/functions/v1/contact',
  supabaseAnonKey: '<anon_key — supabase status 또는 원격 대시보드>',
  turnstileSiteKey: '1x00000000000000000000AA'
});
--- */