// ==UserScript==
// @name         DarkPeers - Torrent Inspector
// @namespace    dkokto.darkpeers.inspector
// @version      1.18.0
// @description  Torrent Inspector and automatic listing naming badges, checked against DarkPeers or Zenith rules. Reads the page only; makes no requests.
// @author       🤖T.R.A.V.I.S (original Chungus Edition); DKOKTO personal customization
// @match        https://darkpeers.org/*
// @match        https://www.darkpeers.org/*
// Zenith is checked against its own rules, so the Inspector runs there too.
// One line to remove if it should stay on DarkPeers alone.
// @match        https://znth.cx/*
// @run-at       document-idle
// @updateURL    none
// @downloadURL  none
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const DPTI_CSS = "/* Standalone Torrent Inspector styling. Scoped to this script's own dialog,\n   launcher and listing badges; site theming is left untouched. */\n#dp-inspector-tools { position:fixed; right:14px; bottom:14px; z-index:2147482000; display:flex; gap:8px; }\n#dp-inspector-tools button { font:600 14px/1.2 \"Segoe UI\",system-ui,sans-serif; color:#f4e8ff; background:#3d2551; border:1px solid #a97fc6; border-radius:5px; padding:10px 14px; cursor:pointer; box-shadow:0 2px 10px #0009; }\n#dp-inspector-tools button:hover { background:#643784; }\n#dp-inspector-tools button:focus-visible { outline:2px solid #e8ceff; outline-offset:2px; }\n\n.dk-hub { box-sizing:border-box; width:min(940px,calc(100vw - 24px)); max-height:88dvh; padding:0; overflow:auto; background:#15101d; color:#f0e9f6; border:1px solid #af83c8; border-radius:6px; font:15px/1.5 \"Segoe UI\",system-ui,sans-serif; }\n.dk-hub::backdrop { background:#07040bcc; }\n.dk-hub header { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:16px 20px; background:linear-gradient(#392447,#20152b); }\n.dk-hub h2 { margin:0; font:600 22px Consolas,monospace; }\n.dk-hub-content { padding:16px 20px; }\n.dk-hub :is(button,input,select,textarea) { box-sizing:border-box; font:inherit; color:#f4e8ff; background:#24182f; border:1px solid #9873b0; border-radius:3px; padding:8px 10px; min-width:0; }\n.dk-hub button { cursor:pointer; }\n.dk-hub button:hover,.dk-hub button[aria-pressed=true] { background:#643784; }\n.dk-hub button:disabled { opacity:.5; cursor:default; }\n.dk-hub input:not([type=checkbox]),.dk-hub textarea { width:100%; }\n.dk-hub input[type=checkbox] { width:20px; height:20px; accent-color:#ad71d1; }\n.dk-hub label { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:8px; margin:12px 0; }\n.dk-hub a { color:#e0b6ff; overflow-wrap:anywhere; }\n.dk-hub :is(button,a,input,textarea,select,summary):focus-visible { outline:2px solid #e8ceff; outline-offset:2px; }\n.dk-hub .dk-row { display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin:10px 0; }\n.dk-hub .dk-row a { flex:1; min-width:140px; }\n.dk-hub pre { background:#0c0811; padding:12px; max-height:45dvh; overflow:auto; white-space:pre-wrap; overflow-wrap:anywhere; font:13px/1.5 Consolas,monospace; }\n.dk-hub table { width:100%; border-collapse:collapse; }\n.dk-hub th,.dk-hub td { text-align:left; padding:6px; border-bottom:1px solid #493357; }\n.dk-hub td label { font-size:0; margin:0; }\n.dk-hub td select { font-size:14px; width:100%; }\n.dk-hub-message { padding:0 20px 16px; color:#e2bcfc; white-space:pre-wrap; }\n.dk-hub details { padding:12px 0; border-top:1px solid #624771; }\n.dk-hub summary { cursor:pointer; }\n\n.dk-inspector-table { overflow-x:auto; max-width:100%; }\n.dk-hub .dk-inspector-table table { min-width:640px; font-size:13px; }\n.dk-hub .dk-inspector-table td { vertical-align:top; overflow-wrap:anywhere; max-width:240px; }\n.dk-inspector-checks { padding:10px 14px; background:#25182f; border-left:3px solid #bd91d9; }\n.dk-naming { border:1px solid #725587; padding:12px; margin:12px 0 20px; background:#1c1425; }\n.dk-naming .dk-naming-status { font-weight:700; color:#ead7ff; }\n.dk-naming .dk-naming-errors { border-left:3px solid #e9ad71; padding-left:24px; }\n.dk-naming li { margin:8px 0; }\n.dk-naming details { margin:12px 0; }\n.dk-naming summary { cursor:pointer; color:#dabcdf; }\n\n.dk-listing-bar { display:flex; flex-wrap:wrap; gap:8px 20px; align-items:center; padding:12px; margin:8px 0; background:#21162b; border:1px solid #725587; color:#f0e9f6; font:14px/1.5 'Segoe UI',sans-serif; }\n.dk-listing-bar label { display:flex; gap:8px; align-items:center; cursor:pointer; }\n.dk-listing-bar .dk-listing-rules,.dk-hub .dk-naming-site { display:flex; gap:8px; align-items:center; }\n.dk-listing-bar .dk-listing-rules select,.dk-hub .dk-naming-site select { padding:3px 6px; color:#efe4f7; background:#1b1222; border:1px solid #6d5280; border-radius:3px; font:inherit; }\n.dk-hub .dk-naming-site { margin:0 0 10px; font-weight:600; color:#d9c4e8; }\n.dk-listing-bar .dk-listing-rules-edit,.dk-hub .dk-naming-site button { padding:3px 9px; border:1px solid #6d5280; border-radius:3px; background:#2b1d36; color:#e6d6f2; cursor:pointer; font:inherit; }\n.dk-listing-bar .dk-listing-rules-edit:hover,.dk-hub .dk-naming-site button:hover { background:#3a2748; }\n.dk-profile-dialog { max-width:760px; width:92vw; }\n.dk-profile-tabs { display:flex; gap:8px; margin:0 0 14px; flex-wrap:wrap; }\n.dk-profile-tabs button { padding:6px 12px; border:1px solid #6d5280; border-radius:3px; background:#241730; color:#e6d6f2; cursor:pointer; font:inherit; }\n.dk-profile-tabs button[aria-pressed=true] { background:#5b3d75; border-color:#a97fc9; }\n.dk-profile-form { display:flex; flex-direction:column; gap:14px; }\n.dk-profile-field { display:flex; flex-direction:column; gap:5px; font-weight:600; color:#d9c4e8; }\n.dk-profile-field :is(input,textarea,select) { padding:7px 9px; border:1px solid #6d5280; border-radius:3px; background:#1b1222; color:#efe4f7; font:inherit; }\n.dk-profile-field textarea,.dk-profile-json { font:13px/1.5 Consolas,'Courier New',monospace; width:100%; box-sizing:border-box; }\n.dk-profile-json { padding:9px; border:1px solid #6d5280; border-radius:3px; background:#150e1d; color:#dcc9ec; }\n.dk-profile-field small,.dk-profile-recipes small,.dk-profile-count { font-weight:400; color:#b9a6c9; font-size:12px; }\n.dk-profile-count { color:#a9e3c0; }\n.dk-profile-recipes { border:1px solid #56406a; border-radius:4px; padding:12px; display:flex; flex-direction:column; gap:7px; }\n.dk-profile-recipes legend { padding:0 6px; color:#d9c4e8; font-weight:600; }\n.dk-profile-recipes label { display:flex; gap:9px; align-items:center; font-size:14px; }\n.dk-profile-installed { border:1px solid #56406a; border-radius:4px; padding:12px; display:flex; flex-direction:column; gap:7px; }\n.dk-profile-installed small { color:#b9a6c9; font-size:12px; }\n.dk-profile-file { display:inline-flex; align-items:center; gap:8px; font-size:13px; color:#d9c4e8; }\n.dk-profile-status:not(:empty) { padding:9px 11px; border-left:3px solid #7d5c96; background:#20152a; color:#e6d6f2; }\n.dk-profile-status[data-tone=bad] { border-color:#e07a7a; }\n.dk-profile-status[data-tone=good] { border-color:#7ad39a; }\n.dk-profile-status[data-tone=warn] { border-color:#e0c07a; }\n.dk-listing-decision { display:inline-flex; gap:6px; align-items:center; margin-left:8px; font-size:12px; }\n.dk-listing-decision select { padding:2px 5px; color:#efe4f7; background:#1b1222; border:1px solid #6d5280; border-radius:3px; font:inherit; }\n.dk-listing-decision[data-state=approved] select { border-color:#5fa87a; }\n.dk-listing-decision[data-state=rejected] select { border-color:#c97a7a; }\n.dk-listing-decision[data-state=asked] select { border-color:#c9b07a; }\n.dk-decision-mark { color:#b9a6c9; white-space:nowrap; }\n.dk-listing-badge[data-lead=yes] { margin:0 6px 0 0; }\n.dk-detail-page { display:block; padding:12px 14px; margin:10px 0; border:1px solid #5b406d; border-radius:4px; background:#1c1426; }\n.dk-detail-page ul { margin:8px 0 0; padding-left:20px; }\n.dk-detail-page li { margin:4px 0; color:#e0d2ec; font-size:13px; line-height:1.55; }\n.dk-detail-page li[data-severity=error] { color:#f0b5b5; }\n.dk-detail-page li[data-severity=error]::marker { color:#e07a7a; }\n.dk-detail-page li[data-severity=review]::marker { color:#e0c07a; }\n.dk-detail-page small { display:block; margin-top:9px; color:#a493b4; font-size:11.5px; }\n.dk-reply { margin-top:14px; border:1px solid #56406a; border-radius:4px; padding:10px 12px; }\n.dk-reply summary { cursor:pointer; font-weight:600; color:#d9c4e8; }\n.dk-reply p { color:#b9a6c9; font-size:13px; }\n.dk-reply-choice { padding:5px 11px; border:1px solid #6d5280; border-radius:3px; background:#241730; color:#e6d6f2; cursor:pointer; font:inherit; }\n.dk-reply-choice[aria-pressed=true] { background:#5b3d75; border-color:#a97fc9; }\n.dk-reply-text { width:100%; box-sizing:border-box; margin:10px 0; padding:9px; border:1px solid #6d5280; border-radius:3px; background:#150e1d; color:#efe4f7; font:13px/1.6 Consolas,'Courier New',monospace; }\n.dk-reply { margin-top:14px; border:1px solid #56406a; border-radius:4px; padding:10px 12px; }\n.dk-reply summary { cursor:pointer; font-weight:600; color:#d9c4e8; }\n.dk-reply p { color:#b9a6c9; font-size:13px; }\n.dk-reply-choice { padding:5px 11px; border:1px solid #6d5280; border-radius:3px; background:#241730; color:#e6d6f2; cursor:pointer; font:inherit; }\n.dk-reply-choice[aria-pressed=true] { background:#5b3d75; border-color:#a97fc9; }\n.dk-reply-text { width:100%; box-sizing:border-box; margin:10px 0; padding:9px; border:1px solid #6d5280; border-radius:3px; background:#150e1d; color:#efe4f7; font:13px/1.6 Consolas,'Courier New',monospace; }\n.dk-listing-log { display:inline-flex; gap:8px; align-items:center; }\n.dk-compare-sides { display:grid; grid-template-columns:1fr 1fr; gap:12px; }\n.dk-compare-side { display:flex; flex-direction:column; gap:5px; font-weight:600; color:#d9c4e8; }\n.dk-compare-side textarea { font:13px/1.5 Consolas,'Courier New',monospace; padding:8px; border:1px solid #6d5280; border-radius:3px; background:#150e1d; color:#dcc9ec; width:100%; box-sizing:border-box; }\n.dk-compare-table { display:flex; flex-direction:column; border:1px solid #56406a; border-radius:4px; overflow:hidden; margin:10px 0; }\n.dk-compare-row { display:grid; grid-template-columns:minmax(120px,1fr) minmax(0,1.2fr) minmax(0,1.2fr); gap:10px; padding:7px 10px; border-bottom:1px solid #3d2c4c; font-size:13px; }\n.dk-compare-row:last-child { border-bottom:none; }\n.dk-compare-row:nth-child(odd) { background:#1d1426; }\n.dk-compare-row [data-larger=yes] { color:#a9e3c0; }\n@media (max-width:700px){ .dk-compare-sides,.dk-compare-row { grid-template-columns:1fr; } }\n.dk-listing-bar input[type=checkbox] { width:18px; height:18px; accent-color:#ad71d1; }\n.dk-listing-bar small { flex-basis:100%; color:#d2bedf; }\n.dk-listing-bar [role=status] { font-weight:600; }\nbutton.dk-listing-badge { display:inline-flex !important; align-items:center; justify-content:center; vertical-align:middle; flex-shrink:0; width:22px; height:22px; min-width:22px; padding:0 !important; margin:0 0 0 6px !important; border:1px solid currentColor !important; border-radius:4px !important; background:#160f1e !important; font:bold 15px/1 'Segoe UI',sans-serif !important; cursor:pointer; box-shadow:none !important; }\nbutton.dk-listing-badge[data-state=error] { color:#ff666d !important; }\nbutton.dk-listing-badge[data-state=pass] { color:#67df99 !important; }\nbutton.dk-listing-badge[data-state=review] { color:#f1c15b !important; }\nbutton.dk-listing-badge:focus-visible { outline:3px solid #eee !important; outline-offset:2px; }\n.dk-listing-dialog li { margin-block:8px; }\n.dk-listing-dialog h3 { overflow-wrap:anywhere; }\n\n@media(max-width:700px) {\n  #dp-inspector-tools { left:8px; right:8px; bottom:max(8px,env(safe-area-inset-bottom)); justify-content:center; }\n  #dp-inspector-tools button { min-height:44px; width:100%; }\n  .dk-hub { max-height:90dvh; }\n  .dk-hub header,.dk-hub-content { padding:12px; }\n  .dk-hub button { min-height:44px; }\n  .dk-hub input,.dk-hub select,.dk-hub textarea { font-size:16px; }\n  .dk-hub table tr { display:grid; grid-template-columns:1fr 1fr; padding:8px 0; }\n  .dk-hub table tr:first-child { display:none; }\n  .dk-hub table td { border:0; }\n  .dk-hub table td:first-child { grid-column:1/-1; }\n  .dk-hub .dk-inspector-table table tr { display:table-row; }\n  .dk-hub .dk-inspector-table table tr:first-child { display:table-row; }\n  .dk-hub .dk-inspector-table table td { border-bottom:1px solid #493357; }\n  button.dk-listing-badge { width:26px; height:26px; min-width:26px; font-size:17px !important; }\n}\n@media print { .dk-hub,#dp-inspector-tools { display:none !important; } }\n.dk-naming .dk-service-list { max-height:280px; overflow:auto; padding:6px 10px; background:#140e1c; border:1px solid #4b3559; border-radius:3px; }\n.dk-naming .dk-service-list p { margin:5px 0; overflow-wrap:anywhere; }\n.dk-naming .dk-service-list code { display:inline-block; min-width:96px; color:#e2bcfc; font:13px Consolas,monospace; }\n.dk-naming .dk-naming-service { margin:4px 0 8px; color:#cbb0e4; font:13px Consolas,monospace; }\nbutton.dk-listing-badge.dk-detail-badge { width:24px; height:24px; min-width:24px; font-size:16px !important; margin:0 0 0 8px !important; vertical-align:middle; }\n.dk-detail-links { display:flex; flex-wrap:wrap; align-items:center; gap:6px; margin:10px 0 14px; font:14px/1.5 \"Segoe UI\",system-ui,sans-serif; }\n.dk-detail-links .dk-detail-links-label { color:#c0adce; margin-right:2px; }\n.dk-detail-links a { padding:4px 9px; color:#e6cbff !important; background:#22162c; border:1px solid #6d5280; border-radius:3px; text-decoration:none; }\n.dk-detail-links a:hover { background:#3d2451; border-color:#c193e6; }\n.dk-detail-links a[data-exact=yes] { border-color:#9fdcb6; box-shadow:inset 0 0 0 1px #67df9933; }\n.dk-detail-links a:focus-visible,.dk-detail-links button:focus-visible { outline:2px solid #e8ceff; outline-offset:2px; }\n.dk-detail-links .dk-detail-copy { padding:4px 9px; color:#f0e4ff; background:#3a2350; border:1px solid #8a6aa3; border-radius:3px; cursor:pointer; font:inherit; }\n.dk-detail-links .dk-detail-copy:hover { background:#563173; }\n@media print { .dk-detail-links,.dk-detail-badge { display:none !important; } }\n.dk-listing-bar .dk-listing-audit { padding:5px 11px; color:#f0e4ff; background:#3a2350; border:1px solid #8a6aa3; border-radius:3px; cursor:pointer; font:inherit; }\n.dk-listing-bar .dk-listing-audit:hover { background:#563173; border-color:#c193e6; }\n.dk-hub .dk-listing-copy { margin-top:12px; }\n.dk-listing-dialog pre { max-height:50dvh; }\n.dk-listing-dialog pre { max-height:50dvh; }\n.dk-request-open { margin-left:6px; padding:2px 8px; color:#f0e4ff; background:#3a2350; border:1px solid #8a6aa3; border-radius:3px; cursor:pointer; font:12px/1.5 \"Segoe UI\",system-ui,sans-serif; vertical-align:middle; }\n.dk-request-open:hover { background:#563173; border-color:#c193e6; }\n.dk-request-open:focus-visible { outline:2px solid #e0bdff; outline-offset:2px; }\n.dk-hub .dk-tracker-group { margin:12px 0; padding:8px 12px 10px; border:1px solid #6d5280; border-radius:4px; }\n.dk-hub .dk-tracker-group legend { padding:0 6px; color:#d9c4e8; font-weight:600; }\n.dk-hub .dk-tracker-row { display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin:6px 0; }\n.dk-hub .dk-tracker-row label { display:flex; align-items:center; gap:6px; min-width:190px; margin:0; cursor:pointer; }\n.dk-hub .dk-tracker-row input[type=checkbox] { width:16px; height:16px; accent-color:#ad71d1; }\n.dk-hub .dk-tracker-url,.dk-hub .dk-tracker-row input[type=text] { flex:1; min-width:230px; padding:4px 6px; color:#efe4f7; background:#1b1222; border:1px solid #6d5280; border-radius:3px; font:12px/1.5 ui-monospace,Consolas,monospace; }\n.dk-hub .dk-tracker-row select { padding:4px 6px; color:#efe4f7; background:#1b1222; border:1px solid #6d5280; border-radius:3px; font:inherit; }\n@media print { .dk-request-open,.dk-request-bar,.dk-request-links { display:none !important; } }\n.dk-request-seen { margin-left:6px; color:#9fdcb6; font:12px/1.5 \"Segoe UI\",system-ui,sans-serif; white-space:nowrap; }\n.dk-request-float { position:absolute; z-index:2147483000; box-shadow:0 3px 10px #0009; }\n.dk-hub .dk-request-term { display:flex; flex-direction:column; gap:4px; margin:8px 0 4px; color:#d9c4e8; }\n.dk-hub .dk-request-term input { padding:6px 8px; color:#efe4f7; background:#1b1222; border:1px solid #6d5280; border-radius:3px; font:14px/1.5 \"Segoe UI\",system-ui,sans-serif; }\n.dk-listing-badge[data-state=error][data-banned=yes] { box-shadow:0 0 0 2px #ff6b6b88; }\n@media print { .dk-request-seen,.dk-request-float { display:none !important; } }\n.dk-hub .dk-request-step { min-width:220px; }\n.dk-hub .dk-request-step[disabled] { opacity:.6; cursor:default; }\n\n/* A badge rides beside the title without adding height to the row: in grouped and\n   compact listing views a taller badge overflowed onto the title below it. */\nbutton.dk-listing-badge { line-height:0 !important; max-height:22px; box-sizing:border-box; position:relative; top:-1px; }\nbutton.dk-listing-badge.dk-detail-badge { max-height:24px; top:0; }\n@media(max-width:700px) { button.dk-listing-badge { width:26px; height:26px; min-width:26px; font-size:17px !important; max-height:26px; } }\n.dk-listing-bar .dk-listing-rules,.dk-hub .dk-naming-site { display:flex; gap:8px; align-items:center; }\n.dk-listing-bar .dk-listing-rules select,.dk-hub .dk-naming-site select { padding:3px 6px; color:#efe4f7; background:#1b1222; border:1px solid #6d5280; border-radius:3px; font:inherit; }\n.dk-hub .dk-naming-site { margin:0 0 10px; font-weight:600; color:#d9c4e8; }\n\n.dk-group-tag { color:#ffb454 !important; cursor:pointer; border-bottom:1px dotted currentColor; }\n.dk-group-tag:hover, .dk-group-tag:focus-visible { color:#ffd08a !important; outline:none; border-bottom-style:solid; }\n.dk-group-menu { position:absolute; z-index:2147483000; max-width:min(360px,92vw); padding:12px 14px; border:1px solid #7b5792; border-radius:8px; background:#160f1e; color:#eee; box-shadow:0 10px 30px #000a; font:14px/1.5 'Segoe UI',sans-serif; }\n.dk-group-menu strong { display:block; margin-bottom:6px; color:#ffb454; }\n.dk-group-menu ul { margin:0 0 10px; padding-left:18px; }\n.dk-group-menu li { margin-block:6px; }\n.dk-group-menu a { color:#dbc0ef; }\n.dk-group-menu small { display:block; color:#c8b9d2; }\n.dk-group-menu button { padding:5px 10px; border:1px solid #7b5792; border-radius:6px; background:#22162c; color:#eee; cursor:pointer; }\n.dk-listing-bar .dk-listing-groups-edit { padding:3px 9px; border:1px solid #6d5280; border-radius:3px; background:#2b1d36; color:#e6d6f2; cursor:pointer; font:inherit; }\n\n.dk-group-add { display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin:10px 0 6px; }\n.dk-group-add label { flex-basis:100%; color:#c8b9d2; font-size:12.5px; }\n.dk-group-add input { flex:1 1 130px; min-width:0; padding:5px 8px; border:1px solid #6d5280; border-radius:5px; background:#0f0a15; color:#eee; font:inherit; font-size:13px; }\n.dk-group-add small { flex-basis:100%; color:#f1c15b; font-size:12.5px; }\n";

// MediaInfo text/JSON interpretation only. No media conversion, account writes or network.
const DKOKTO_INSPECTOR = (() => {
    const key=s=>String(s).toLowerCase().replace(/[^a-z0-9]/g,'');
    const str=v=>v==null?'':String(v).trim();
    const field=(t,...names)=>names.map(n=>t.fields[key(n)]).find(Boolean)||'';
    const num=v=>{const m=str(v).replace(/[ ,\u00a0\u202f]/g,'').match(/^\d+(?:\.\d+)?/);return m?Number(m[0]):null;};
    // Menu holds the chapter list, which a full disc or REMUX is expected to carry.
    const empty=()=>({general:[],video:[],audio:[],text:[],menu:[]});
    function parse(raw) {
        if(typeof raw!=='string'||raw.length>2000000)throw Error('Use a MediaInfo text or JSON report under 2 MB.');
        const files=[];let file=empty(),track=null,recognized=0;
        const add=(type,fields)=>{if(!file[type])return;if(type==='general'&&file.general.length){files.push(file);file=empty();}track={fields};file[type].push(track);recognized++;if(recognized>1000)throw Error('Too many tracks in this report.');};
        if(raw.trim().startsWith('{')||raw.trim().startsWith('[')){
            let data;try{data=JSON.parse(raw);}catch{throw Error('Invalid MediaInfo JSON.');}
            const media=Array.isArray(data.media)?data.media:Array.isArray(data)?data:[data.media||data];
            for(const item of media){if(!Array.isArray(item?.track))continue;if(file.general.length||file.video.length||file.audio.length){files.push(file);file=empty();}
                for(const t of item.track){const type=str(t['@type']).toLowerCase(),fields={};for(const [k,v] of Object.entries(t))if(typeof v==='string'||typeof v==='number')fields[key(k)]=str(v);add(type,fields);}
            }
        }else{
            for(const line of raw.replace(/\r/g,'').split('\n')){
                const heading=line.trim().match(/^(General|Video|Audio|Text|Subtitle|Menu|Other|Image)(?:\s*#\d+)?\s*$/i);
                if(heading){const type=heading[1].toLowerCase();track=null;add(type==='subtitle'?'text':type,{});continue;}
                const m=line.match(/^\s*([^:]{1,100}?)\s*:\s*(.*)$/);if(track&&m){const k=key(m[1]);if(!track.fields[k])track.fields[k]=m[2].trim();}
            }
        }
        if(file.general.length||file.video.length||file.audio.length||file.text.length)files.push(file);
        if(!recognized||!files.length)throw Error('No MediaInfo tracks found. Paste the Text or JSON view from MediaInfo. BDInfo and localized field names are not supported yet.');
        return files;
    }
    function codec(t){const s=field(t,'Format','Codec ID');return /HEVC|H[ .]?265|V_MPEGH/i.test(s)?'HEVC / H.265':/AVC|H[ .]?264|V_MPEG4\/ISO\/AVC/i.test(s)?'AVC / H.264':/AV1/i.test(s)?'AV1':s||'Not reported';}
    function hdr(t){const format=field(t,'HDR format','HDR_Format'),transfer=field(t,'Transfer characteristics','transfer_characteristics');if(format)return format;if(/HLG|ARIB STD.B67/i.test(transfer))return 'HLG (transfer characteristic)';if(/PQ|SMPTE ST 2084/i.test(transfer))return 'PQ transfer; HDR format not reported';if(/BT\.?709/i.test(transfer))return 'SDR transfer (BT.709)';return 'Not reported';}
    const display=(value,unit)=>value?(/^\d+(?:\.\d+)?$/.test(value)?value+' '+unit:value):'Not reported';
    function rows(file){
        const general=file.general[0],container=general?field(general,'Format'):'',duration=general?display(field(general,'Duration'),'s'):'Not reported';
        const video=file.video.map((t,i)=>({track:i+1,codec:codec(t),width:num(field(t,'Width')),height:num(field(t,'Height')),depth:display(field(t,'Bit depth'),'bits'),frameRate:display(field(t,'Frame rate'),'FPS'),bitrate:display(field(t,'Bit rate'),'b/s'),scan:field(t,'Scan type')||'Not reported',hdr:hdr(t)}));
        const audio=file.audio.map((t,i)=>({track:i+1,language:field(t,'Language')||'Not reported',codec:field(t,'Format','Codec ID')||'Not reported',features:field(t,'Format commercial if any','Format_Commercial','Format additional features','Format_AdditionalFeatures'),channels:field(t,'Channel(s)','Channels')||'Not reported',title:field(t,'Title')||'',default:field(t,'Default')||'Not reported'}));
        const text=file.text.map((t,i)=>({track:i+1,language:field(t,'Language')||'Not reported',codec:field(t,'Format','Codec ID')||'Not reported',title:field(t,'Title')||'',default:field(t,'Default')||'Not reported',forced:field(t,'Forced')||'Not reported',hearingImpaired:field(t,'Hearing impaired','HearingImpaired')||'Not reported'}));
        return {container:container||'Not reported',duration,size:general?display(field(general,'File size'),'bytes'):'Not reported',bitrate:general?display(field(general,'Overall bit rate'),'b/s'):'Not reported',video,audio,text};
    }
    function warnings(name,file){
        const result=[],r=rows(file),label=name.match(/(?:^|[ ._\-])(360|480|576|720|1080|2160|4320)([pi])(?=$|[ ._\-])/i);
        if(!r.video.length)result.push('No video track reported; video naming claims cannot be checked.');
        if(r.video.length>1)result.push('Multiple video tracks: comparisons below use the first reported video track.');
        const v=r.video[0];if(v&&label){const h=Number(label[1]),w=({360:640,480:720,576:720,720:1280,1080:1920,2160:3840,4320:7680})[h];
            if(v.width&&v.height&&((v.width<w*.85&&v.height<h*.85)||v.width>w*1.15||v.height>h*1.15))result.push(`Naming conflict: ${label[1]}${label[2]} label versus ${v.width}×${v.height} pixels. Cropping/aspect ratio can affect resolution labels; review the source.`);
            if(label[2].toLowerCase()==='p'&&/interlaced/i.test(v.scan)||label[2].toLowerCase()==='i'&&/progressive/i.test(v.scan))result.push('Naming conflict: progressive/interlaced label disagrees with reported scan type.');
        }
        const token=(pattern)=>new RegExp('(?:^|[ ._-])(?:'+pattern+')(?=$|[ ._-])','i').test(name);
        const claimed=[token('x264|H[ .]?264|AVC')?'AVC':null,token('x265|H[ .]?265|HEVC')?'HEVC':null,token('AV1')?'AV1':null].filter(Boolean);
        if(v&&claimed.length===1&&/^(AVC|HEVC|AV1)/.test(v.codec)&&!v.codec.startsWith(claimed[0]))result.push(`Naming conflict: ${claimed[0]} in the name, but MediaInfo reports ${v.codec}.`);
        if(v&&token('HDR|HDR10|HDR10\\+|DV|DoVi')&&/^SDR/.test(v.hdr))result.push('Naming conflict: HDR/DV is claimed, but the video reports a BT.709 SDR transfer. Review the complete HDR fields.');
        else if(v&&token('HDR|HDR10|HDR10\\+|DV|DoVi')&&v.hdr==='Not reported')result.push('HDR/DV claim cannot be verified: HDR fields are missing. Bit depth alone does not prove HDR.');
        if(v&&token('DV|DoVi')&&!/Dolby Vision/i.test(v.hdr)&&v.hdr!=='Not reported'&&!/^SDR/.test(v.hdr))result.push('Dolby Vision is named but not confirmed in the reported HDR format.');
        if(token('Atmos')&&!file.audio.some(t=>/Atmos|JOC/i.test(Object.values(t.fields).join(' '))))result.push('Atmos is named but not confirmed in the audio fields. Channel count alone does not prove Atmos.');
        if(token('HDR10\\+')&&v&&!/HDR10\+|SMPTE ST 2094/i.test(v.hdr)&&v.hdr!=='Not reported')result.push('HDR10+ is named but not confirmed in the reported HDR format.');
        // The audio the title claims, against the track the report says is the default one.
        const main=r.audio.find(t=>/yes/i.test(t.default))||r.audio[0];
        const CODECS=[[/(?:^|[ ._-])(?:DD\+|DDP|E-?AC-?3)(?=$|[ ._-])/i,'E-AC-3',/E-?AC-?3|Enhanced AC-3/i],
            [/(?:^|[ ._-])DD(?=$|[ ._-])/i,'AC-3',/(?:^|[^E-])AC-?3|Dolby Digital/i],
            [/(?:^|[ ._-])TrueHD(?=$|[ ._-])/i,'TrueHD',/TrueHD|MLP ?FBA/i],
            [/(?:^|[ ._-])DTS-?HD ?MA(?=$|[ ._-])/i,'DTS-HD MA',/DTS.*(?:XLL|MA|Master Audio)/i],
            [/(?:^|[ ._-])FLAC(?=$|[ ._-])/i,'FLAC',/FLAC/i],
            [/(?:^|[ ._-])AAC(?=$|[ ._-])/i,'AAC',/AAC/i],
            [/(?:^|[ ._-])Opus(?=$|[ ._-])/i,'Opus',/Opus/i]];
        if(main) {
            const shown=[main.codec,main.features,main.title].filter(Boolean).join(' ');
            for(const [named,label,reported] of CODECS)
                if(named.test(name)&&!reported.test(shown)) {
                    result.push('Naming conflict: '+label+' is named, but the default audio track reports “'+String(main.codec).slice(0,40)+'”.');
                    break;
                }
            // Channels, as the title writes them against the count the report gives.
            const layout=name.match(/(?:^|[ ._-])([1-9])\.([01])(?=$|[ ._-])/);
            const count=Number(String(main.channels).match(/\d+/)?.[0]||0);
            if(layout&&count) {
                const claimed=Number(layout[1])+Number(layout[2]);
                if(claimed!==count)result.push('Naming conflict: '+layout[1]+'.'+layout[2]+' is named, but the default audio track reports '+count+' channel'+(count===1?'':'s')+'.');
            }
        }
        // Two audio languages are what Dual-Audio and MULTi mean.
        const spoken=new Set(r.audio.map(t=>String(t.language).trim().toLowerCase()).filter(value=>value&&value!=='not reported'));
        if(token('Dual-?Audio|MULTi')&&spoken.size===1)result.push('Dual-Audio/MULTi is named, but only one audio language is reported.');
        // A release whose audio is not English, with nothing to read it by.
        if(r.audio.length&&!r.text.length&&spoken.size&&![...spoken].some(value=>/^(?:en|eng|english)/.test(value)))
            result.push('The reported audio is '+[...spoken].join(', ')+' and no subtitle track is reported. Confirm subtitles, since the report showing none is not proof that none exist.');
        // A remux or full disc is expected to carry the source's chapters.
        if(token('REMUX')&&!(file.menu||[]).length)
            result.push('No chapter (Menu) section is reported. A REMUX is expected to carry the source’s chapters; confirm from the file rather than from this report alone.');
        return result;
    }
    const glossary={HDR:'High dynamic range. Look for HDR format and transfer metadata; 10-bit video alone is not proof of HDR.',DV:'Dolby Vision is an HDR format with additional metadata. A DV release label should be checked against the video HDR fields.',Atmos:'Dolby Atmos adds object-based audio metadata. A 5.1 or 7.1 channel count alone does not confirm Atmos.',REMUX:'A remux generally repackages existing encoded streams without re-encoding. MediaInfo alone cannot establish the source or prove that no earlier encoding occurred.','WEB-DL':'A source/release label for downloaded streaming media. Codec and resolution alone cannot verify the originating service or acquisition method.'};
    function summary(name,file){const r=rows(file),lines=[name||'Torrent inspection',`Container: ${r.container} | Duration: ${r.duration} | Size: ${r.size} | Overall bitrate: ${r.bitrate}`];
        for(const v of r.video)lines.push(`Video ${v.track}: ${v.codec} | ${v.width||'?'}×${v.height||'?'} | ${v.depth} | ${v.frameRate} | ${v.bitrate} | ${v.scan} | ${v.hdr}`);
        for(const a of r.audio)lines.push(`Audio ${a.track}: ${a.language} | ${a.codec}${a.features?' / '+a.features:''} | Channels: ${a.channels} | Default: ${a.default}${a.title?' | '+a.title:''}`);
        for(const s of r.text)lines.push(`Subtitle ${s.track}: ${s.language} | ${s.codec} | Default: ${s.default} | Forced: ${s.forced} | HI: ${s.hearingImpaired}${s.title?' | '+s.title:''}`);
        if(!r.audio.length)lines.push('Audio: no tracks reported');if(!r.text.length)lines.push('Subtitles: no tracks reported (not proof that none exist)');
        const checks=warnings(name,file);lines.push(...checks.map(w=>'Review: '+w),'Based on supplied MediaInfo; source and REMUX claims are not independently verified.');return lines.join('\n');
    }
    function readPage(doc){return [...doc.querySelectorAll('.torrent-mediainfo-dump code,.torrent-mediainfo-dump pre,code[x-ref="mediainfo"]')].filter(n=>!n.closest('#dkokto-hub')).map(n=>n.textContent.trim()).filter((t,i,a)=>t&&a.indexOf(t)===i);}
    function searchLink(name){const words=str(name).replace(/\s*[([](?:18|19|20)\d{2}[)\]]/g,'').replace(/[’']/g,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim().split(/\s+/).filter(Boolean);return words.length?'https://www.srrdb.com/browse/'+words.map(encodeURIComponent).join('/')+'/1':'https://www.srrdb.com/';}
    return {parse,rows,warnings,summary,readPage,glossary,searchLink};
})();

// Two MediaInfo reports, side by side, for a trump decision.
// It says what the two reports differ on and nothing more: it does not rank them, does not
// declare a winner, and does not know anything the reports do not say. Bitrates are
// compared as numbers where both sides give one; everything else is compared as text.
const DKOKTO_COMPARE = ((inspector) => {
    const num=value=>{const match=String(value??'').replace(/\s+/g,' ').match(/([\d.]+)\s*(k|M|G)?/i);
        if(!match)return 0;
        const scale={k:1e3,m:1e6,g:1e9}[String(match[2]||'').toLowerCase()]||1;
        return Number(match[1])*scale||0;};
    const bytes=value=>{const match=String(value??'').match(/([\d.]+)\s*(KiB|MiB|GiB|TiB|KB|MB|GB|TB|bytes?)/i);
        if(!match)return 0;
        const unit=String(match[2]).toLowerCase();
        const scale=unit.startsWith('ti')?1024**4:unit.startsWith('gi')?1024**3:unit.startsWith('mi')?1024**2:unit.startsWith('ki')?1024
            :unit.startsWith('t')?1e12:unit.startsWith('g')?1e9:unit.startsWith('m')?1e6:unit.startsWith('k')?1e3:1;
        return Number(match[1])*scale||0;};
    const languages=tracks=>[...new Set(tracks.map(track=>String(track.language||'').trim())
        .filter(value=>value&&!/^not reported$/i.test(value)))];
    const audioLine=track=>[track.language,track.codec,track.features,track.channels?track.channels+' ch':'']
        .filter(Boolean).join(' · ');
    // What one report says, reduced to the things a trump decision turns on.
    function read(file) {
        const rows=inspector.rows(file);
        const video=rows.video[0]||{};
        return {rows,container:rows.container,duration:rows.duration,size:rows.size,overall:rows.bitrate,
            resolution:video.width&&video.height?video.width+'×'+video.height:'Not reported',
            videoCodec:video.codec||'Not reported',videoBitrate:video.bitrate||'Not reported',
            depth:video.depth||'Not reported',frameRate:video.frameRate||'Not reported',hdr:video.hdr||'Not reported',
            audio:rows.audio.map(audioLine),audioLanguages:languages(rows.audio),
            subtitles:languages(rows.text),subtitleCount:rows.text.length,
            chapters:(file.menu||[]).length?'Reported':'Not reported'};
    }
    // A row is only a difference when the two sides actually say different things. Where
    // both give a number, the larger is named as larger — which is not the same as better.
    const FIELDS=[
        ['container','Container'],['resolution','Resolution'],['videoCodec','Video codec'],
        ['videoBitrate','Video bitrate','rate'],['depth','Bit depth'],['frameRate','Frame rate'],
        ['hdr','HDR'],['overall','Overall bitrate','rate'],['size','File size','bytes'],
        ['duration','Duration'],['chapters','Chapters']];
    function compare(left,right) {
        const a=read(left),b=read(right),rows=[],same=[];
        for(const [key,label,kind] of FIELDS) {
            const one=String(a[key]||'Not reported'),two=String(b[key]||'Not reported');
            const row={key,label,a:one,b:two,same:one===two};
            if(kind&&!row.same) {
                const first=kind==='bytes'?bytes(one):num(one),second=kind==='bytes'?bytes(two):num(two);
                if(first&&second)row.larger=first>second?'a':second>first?'b':'';
                if(first&&second&&first!==second)row.by=Math.round(Math.abs(first-second)/Math.max(first,second)*100)+'% '+
                    (kind==='bytes'?'larger':'higher');
            }
            (row.same?same:rows).push(row);
        }
        // Audio and subtitles are lists, so they are compared as sets rather than as text.
        const lists=[];
        const listRow=(label,left_,right_)=>{
            const missingFromB=left_.filter(value=>!right_.includes(value));
            const missingFromA=right_.filter(value=>!left_.includes(value));
            return {label,a:left_.length?left_.join(', '):'none reported',b:right_.length?right_.join(', '):'none reported',
                same:!missingFromA.length&&!missingFromB.length,onlyA:missingFromB,onlyB:missingFromA};
        };
        lists.push(listRow('Audio tracks',a.audio,b.audio));
        lists.push(listRow('Audio languages',a.audioLanguages,b.audioLanguages));
        lists.push(listRow('Subtitle languages',a.subtitles,b.subtitles));
        for(const row of lists)(row.same?same:rows).push(row);
        return {a,b,differences:rows,identical:same,anyDifference:rows.length>0};
    }
    // Paste-ready, in the same words the panel shows.
    function report(result,{titleA='Release A',titleB='Release B'}={}) {
        const lines=['Release comparison',titleA+'  vs  '+titleB,''];
        if(!result.anyDifference)lines.push('The two reports agree on every field compared.');
        for(const row of result.differences) {
            lines.push(row.label+':');
            lines.push('  A: '+row.a);
            lines.push('  B: '+row.b);
            if(row.by)lines.push('  '+(row.larger==='a'?'A':'B')+' is '+row.by+'.');
            if(row.onlyA?.length)lines.push('  Only A: '+row.onlyA.join(', '));
            if(row.onlyB?.length)lines.push('  Only B: '+row.onlyB.join(', '));
        }
        if(result.identical.length)lines.push('','Same on both: '+result.identical.map(row=>row.label).join(', ')+'.');
        lines.push('','Read from the two reports only. Which release is better, and whether either is a valid trump,',
            'is a judgement the reports cannot make: source, encode quality and provenance are not in them.');
        return lines.join('\n');
    }
    return {read,compare,report};
})(typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./inspector.js'):DKOKTO_INSPECTOR);

// What the torrent page itself says, checked against the release name.
// A page carries facts a title cannot: the TMDB title and year, the category, type and
// resolution the uploader chose, the file list, the original language, and whether a
// MediaInfo or BDInfo was posted. Where a rule for something is in hand it is cited and
// the finding is an error; where it is not, the finding says what the page shows and asks
// you to confirm it rather than inventing a rule. Pure: it is given facts, not a document.
const DKOKTO_PAGE = (() => {
    const VIDEO=/\.(?:mkv|mp4|m4v|avi|wmv|ts|m2ts|vob|mpg|mpeg|mov|flv|webm)$/i;
    const ALLOWED_CONTAINER=/\.(?:mkv|mp4|avi)$/i;
    const FULL_DISC=/(?:^|[ ._-])(?:Full[ ._-]?Disc|BD(?:25|50|66|100)|BDMV|VIDEO_TS)(?=$|[ ._-])/i;
    const SAMPLE=/(?:^|[\/ ._-])sample(?=$|[\/ ._-])|(?:^|[\/ ._-])(?:advert|trailer)(?=$|[\/ ._-])/i;
    // Scene names separate words with dots, so a comparison that only collapses spaces
    // reads "Dead.Silence.2007" as nothing like "Dead Silence". Dots and underscores are
    // separators here; whether the tracker wants them is a naming question, not this one.
    const norm=value=>String(value||'').toLowerCase()
        .replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/[–—]/g,'-')
        .replace(/[._]+/g,' ').replace(/\s+/g,' ').trim();
    const first=(value,length=60)=>{const text=String(value||'').trim();
        return text.length>length?text.slice(0,length)+'…':text;};
    const list=values=>[...new Set(values.map(value=>String(value||'').trim()).filter(Boolean))];
    const isEnglish=value=>/^en(?:g|glish)?\b/i.test(String(value||'').trim());

    // --- The title the page names ------------------------------------------------------
    function tmdbMatch(name='',{title='',year=''}={},profile='auto') {
        const issues=[],add=(severity,code,message)=>issues.push({severity,code,message});
        const release=norm(name),official=norm(title);
        if(!release||!official)return issues;
        const withoutThe=official.replace(/^the\s+/,'');
        const aka=release.match(/^(.+?)\s+aka\s+/);
        const starts=value=>release.startsWith(value);
        const akaHalf=aka?norm(aka[1]):'';
        const matched=starts(official)||starts(withoutThe+' ')||akaHalf===official||akaHalf===withoutThe
            ||akaHalf==='the '+official;
        if(!matched)
            add('error','page-title','The page names this “'+first(title)+'”, but the release name starts “'+
                first(name,50)+'”. The title element is the internationally recognised title, so one of the two is wrong.');
        else if(!starts(official)&&starts(withoutThe+' '))
            add('review','page-title-the','The page names this “'+first(title)+'”, and the release name leaves “The” off the front. Check which form the tracker lists it under.');
        // A year the page gives and the name does not carry at all. Editions and re-releases
        // legitimately differ, so this is a question rather than a correction.
        // Tested against the normalised name, so an underscore-separated one counts too.
        if(year&&profile==='movie'&&!new RegExp('(?:^|[ (])'+year+'(?=$|[ )])').test(release))
            add('review','page-year','The page gives the year as '+year+', which does not appear in the release name. Confirm which year this edition is.');
        return issues;
    }

    // --- What the uploader chose, against what the name says ---------------------------
    const TYPE_WORDS=[
        {declared:/full\s*disc|^disc$/i,named:/(?:^|[ ._-])(?:BDMV|VIDEO_TS|Full[ ._-]?Disc|BD(?:25|50|66|100))(?=$|[ ._-])/i,label:'a full disc'},
        {declared:/remux/i,named:/(?:^|[ ._-])REMUX(?=$|[ ._-])/i,label:'a REMUX'},
        {declared:/web-?dl/i,named:/(?:^|[ ._-])WEB-?DL(?=$|[ ._-])/i,label:'a WEB-DL'},
        {declared:/webrip/i,named:/(?:^|[ ._-])WEBRip(?=$|[ ._-])/i,label:'a WEBRip'},
        {declared:/hdtv/i,named:/(?:^|[ ._-])HDTV(?=$|[ ._-])/i,label:'an HDTV capture'}
    ];
    function declared(name='',{type='',resolution=''}={}) {
        const issues=[],add=(severity,code,message)=>issues.push({severity,code,message});
        const value=String(name||'');
        if(type) {
            const chosen=TYPE_WORDS.find(entry=>entry.declared.test(type));
            // An Encode is named by what it is not, so only a positive claim is compared.
            if(chosen&&!chosen.named.test(value)) {
                const other=TYPE_WORDS.find(entry=>entry!==chosen&&entry.named.test(value));
                add('error','page-type','The upload is filed as “'+first(type,30)+'”, but the release name '+
                    (other?'says '+other.label:'does not say '+chosen.label)+'. The two have to agree.');
            } else if(!chosen&&/encode/i.test(type)) {
                const other=TYPE_WORDS.find(entry=>entry.named.test(value)&&!/hdtv/i.test(entry.declared.source));
                if(other)add('error','page-type','The upload is filed as an Encode, but the release name says '+other.label+'.');
            }
        }
        if(resolution&&/^\d{3,4}[pi]$/i.test(resolution.trim())) {
            const named=value.match(/(?:^|[ ._-])(\d{3,4}[pi])(?=$|[ ._-])/i);
            if(named&&named[1].toLowerCase()!==resolution.trim().toLowerCase())
                add('error','page-resolution','The upload is filed as '+resolution.trim()+', but the release name says '+named[1]+'.');
            else if(!named&&!FULL_DISC.test(value))
                add('review','page-resolution-missing','The upload is filed as '+resolution.trim()+', which the release name does not say.');
        }
        return issues;
    }

    // --- The files, as the page lists them ---------------------------------------------
    const parseFile=path=>{
        const name=String(path||'').split('/').pop();
        const grab=pattern=>name.match(pattern)?.[1]||'';
        return {
            resolution:grab(/(?:^|[ ._-])(\d{3,4}[pi])(?=$|[ ._-])/i).toLowerCase(),
            source:grab(/(?:^|[ ._-])(WEB-?DL|WEBRip|BluRay|Blu-ray|BDRip|BRRip|REMUX|HDTV|UHDTV|SDTV|DVDRip|HDDVD)(?=$|[ ._-])/i).toLowerCase().replace('-',''),
            video:grab(/(?:^|[ ._-])(x26[45]|H[ .]?26[45]|AVC|HEVC|AV1|VC-1|MPEG-2|XviD)(?=$|[ ._-])/i).toLowerCase().replace(/[ .]/g,''),
            audio:grab(/(?:^|[ ._-])(DTS-?HD ?MA|TrueHD|DD\+|DDP|E-?AC-?3|AC-?3|DTS|FLAC|AAC|Opus|LPCM|MP3)(?=$|[ ._-])/i).toLowerCase().replace(/[-. ]/g,''),
            group:grab(/-([A-Za-z0-9][A-Za-z0-9._+-]{0,29})(?:\.[a-z0-9]{2,4})?$/i).toLowerCase()
        };
    };
    function structure(files=[],{category='',base='dp'}={}) {
        const issues=[],add=(severity,code,message)=>{if(!issues.some(i=>i.code===code))issues.push({severity,code,message});};
        const paths=list(files);
        if(!paths.length)return issues;
        const video=paths.filter(path=>VIDEO.test(path));
        if(!video.length)return issues;
        // The container, where a rule for it is in hand. Zenith names MKV, MP4 or AVI in
        // rule 3.5; the DarkPeers guide here does not state one, so it is a question there.
        const odd=video.filter(path=>!ALLOWED_CONTAINER.test(path));
        if(odd.length) {
            const kinds=list(odd.map(path=>(path.split('.').pop()||'').toUpperCase()));
            if(base==='zenith')add('error','page-container','Zenith allows MKV, MP4 or AVI (rule 3.5), and the file list holds '+kinds.join(', ')+'.');
            else add('review','page-container','The file list holds '+kinds.join(', ')+' rather than MKV, MP4 or AVI. The guide in hand states no container rule for this tracker, so check its upload rules.');
        }
        // A single film wrapped in a folder of its own.
        const folders=list(paths.filter(path=>path.includes('/')).map(path=>path.split('/')[0]));
        if(video.length===1&&folders.length===1&&/movie|film/i.test(category))
            add('review','page-folder','One film in a folder of its own (“'+first(folders[0],40)+'”). Some trackers want a single file with no wrapper — check this one’s rules.');
        if(paths.some(path=>SAMPLE.test(path)))
            add('review','page-extras','The file list holds what looks like a sample or trailer. Most trackers do not want extras in the torrent.');
        // A pack the files themselves disagree about.
        if(video.length>1) {
            const parsed=video.map(parseFile);
            const mixed=[];
            for(const [key,label] of [['resolution','resolution'],['source','source'],['video','video codec'],['audio','audio codec'],['group','release group']]) {
                const values=list(parsed.map(entry=>entry[key]));
                if(values.length>1)mixed.push(label+' ('+values.join(', ')+')');
            }
            if(mixed.length)
                add('review','page-pack','The files in this pack do not agree on '+mixed.join('; ')+
                    '. A pack is normally one source and one encode throughout — confirm this is deliberate.');
        }
        return issues;
    }

    // --- What was posted as evidence ---------------------------------------------------
    function evidence({hasMediaInfo=false,hasBdInfo=false,type='',name='',base='dp',video=true}={}) {
        const issues=[],add=(severity,code,message)=>issues.push({severity,code,message});
        if(!video)return issues;
        const isDisc=/full\s*disc|^disc$/i.test(type)||FULL_DISC.test(name);
        if(isDisc) {
            if(!hasBdInfo)add(hasMediaInfo?'review':'review','page-bdinfo',
                'This is filed as a full disc and no BDInfo is posted'+(hasMediaInfo?', only a MediaInfo':'')+'. A disc is normally described by its BDInfo.');
        } else if(hasBdInfo&&!hasMediaInfo)
            add('review','page-bdinfo-only','A BDInfo is posted but this is not filed as a full disc. Confirm which the upload actually is.');
        if(!hasMediaInfo&&!hasBdInfo) {
            if(base==='zenith')add('error','page-no-mediainfo','Zenith requires MediaInfo in the description for video (rule 3.4), and none is posted.');
            else add('review','page-no-mediainfo','No MediaInfo is posted on this page, so nothing in the title can be checked against the file.');
        }
        return issues;
    }

    // --- Languages, which the page knows and a title cannot ----------------------------
    function languages(name='',{original='',audio=[],subtitles=[]}={}) {
        const issues=[],add=(severity,code,message)=>issues.push({severity,code,message});
        const spoken=list(audio),subs=list(subtitles);
        const value=String(name||'');
        const dual=/(?:^|[ ._-])Dual[- ]?Audio(?=$|[ ._-])/i.test(value);
        const multi=/(?:^|[ ._-])MULTi(?=$|[ ._-])/i.test(value);
        const originalEnglish=isEnglish(original);
        if(!spoken.length)return issues;
        const hasEnglish=spoken.some(isEnglish);
        const hasOriginal=!original||spoken.some(language=>norm(language).startsWith(norm(original))||norm(original).startsWith(norm(language)));
        if(dual) {
            if(originalEnglish)add('error','page-dual-english','Dual-Audio is named, but the page gives the original language as English, so there is no second language for it to mean.');
            else if(spoken.length>2)add('error','page-dual-many','Dual-Audio is named, but the report has '+spoken.length+' audio languages ('+spoken.join(', ')+'). More than two is MULTi.');
            else if(spoken.length<2)add('error','page-dual-one','Dual-Audio is named, but only one audio language is reported ('+spoken[0]+').');
            else if(!hasEnglish)add('review','page-dual-english-missing','Dual-Audio is named and neither track is English ('+spoken.join(', ')+'). Confirm what the tag is meant to carry here.');
            else if(!hasOriginal)add('review','page-dual-original','Dual-Audio is named, and the original language the page gives ('+original+') is not among the audio tracks ('+spoken.join(', ')+').');
        }
        if(multi&&spoken.length<2)
            add('error','page-multi-one','MULTi is named, but only one audio language is reported ('+spoken[0]+').');
        if(!dual&&!multi&&spoken.length>2)
            add('review','page-multi-missing',spoken.length+' audio languages are reported ('+spoken.join(', ')+') and the name carries no MULTi.');
        if(!dual&&!multi&&spoken.length===2&&hasEnglish&&original&&!originalEnglish&&hasOriginal)
            add('review','page-dual-missing','English and the original language ('+original+') are both reported, which is what Dual-Audio describes. Confirm whether the tag belongs here.');
        if(!hasEnglish&&!subs.some(isEnglish))
            add('review','page-subtitles','The audio is '+spoken.join(', ')+' and no English subtitle track is reported'+
                (subs.length?' (subtitles: '+subs.join(', ')+')':'')+'. Most trackers require them for non-English audio — check this one’s rules.');
        return issues;
    }

    // Everything the page can say, in one call.
    function check(page={}) {
        const {name='',media={},type='',resolution='',category='',files=[],
            hasMediaInfo=false,hasBdInfo=false,original='',audio=[],subtitles=[],
            profile='auto',base='dp',video=true}=page;
        return [
            ...tmdbMatch(name,media,profile),
            ...declared(name,{type,resolution}),
            ...structure(files,{category,base}),
            ...evidence({hasMediaInfo,hasBdInfo,type,name,base,video}),
            ...languages(name,{original,audio,subtitles})
        ];
    }
    return {check,tmdbMatch,declared,structure,evidence,languages,parseFile};
})();

// Find the release name on a torrent page. A UNIT3D detail page shows the media
// title first (e.g. "Shiny Happy People (2023)") and the release name lower down,
// so the heading alone is not the title to check. Text only: nothing is fetched.
const DKOKTO_RELEASE_TITLE = (() => {
    const RES=/(?:^|[ ._])(?:360|480|576|720|1080|2160|4320)[pi](?=$|[ ._-])/i;
    const SOURCE=/(?:^|[ ._])(?:WEB-?DL|WEBRip|WEB|Blu-?Ray|BDRip|REMUX|UHDTV|HDTV|SDTV|DVDRip|DVD[59]|HD-?DVD|NTSC|PAL|CD|Vinyl|SACD|Cassette)(?=$|[ ._-])/i;
    const VIDEO=/(?:^|[ ._])(?:x26[45]|H[ .]?26[45]|HEVC|AVC|AV1|VP9|XviD|MPEG-2|VC-1)(?=$|[ ._-])/i;
    const AUDIO=/(?:^|[ ._])(?:DD[+]?|DDP|DTS(?:[ ._-]HD)?|TrueHD|AAC|FLAC|ALAC|LPCM|MP3|Opus|M4B|EPUB|PDF|AZW3|MOBI)(?=$|[ ._-])/i;
    const TAG=/-[A-Za-z0-9][A-Za-z0-9._]{1,29}$/;
    const NUMBERING=/(?:^|[ ._])(?:S\d{2}(?:E\d{2})?|(?:18|19|20)\d{2})(?=$|[ ._-])/;
    // Book and audiobook releases carry a format and a year instead of a resolution.
    const BOOKFMT=/(?:^|[ ._])(?:EPUB|PDF|AZW3|MOBI|FB2|CHM|DJVU|CBR|CBZ|KFX|LIT|PDB|RTF|M4B)(?=$|[ ._-])/i;
    // Site decorations — a personal-release flame, a staff star, an icon-font glyph — sit
    // inside the title element. They are not part of the release name, and a trailing one
    // silently broke the group tag and every check anchored to the end of the title.
    const DECORATION=/^[\s\p{Cf}\p{Co}\p{So}\p{Sk}]+|[\s\p{Cf}\p{Co}\p{So}\p{Sk}]+$/gu;
    // The site's own row labels sit inside the title element on some themes — a red NEW
    // after the group tag, a freeleech chip. Read as part of the name they mean the group
    // tag no longer closes the title, so every clean release was asked "no release group
    // tag closes the title". Only an upper-case label at the very end is dropped, so a
    // title with the word "new" in it is untouched.
    const LABELS=/(?:[\s·|,]+(?:NEW|FREELEECH|FREE\s*LEECH|(?:100|75|50|25)%\s*FREE|DOUBLE\s*UPLOAD|2X\s*UPLOAD|HIGH\s*SPEED|HIGHSPEED|STICKY|FEATURED|PERSONAL\s*RELEASE|BUMPED|REFUNDABLE|INTERNAL\s*RELEASE)\b)+$/;
    const clean=text=>{
        let value=String(text||'').replace(/\s+/g,' ').replace(DECORATION,'').trim();
        // A label and a decoration can sit together (NEW then a flame), so strip until settled.
        for(let pass=0;pass<3;pass++) {
            const before=value;
            value=value.replace(LABELS,'').replace(DECORATION,'').trim();
            if(value===before)break;
        }
        return value;
    };
    function looksLikeRelease(text) {
        const s=String(text||'').trim();
        if(s.length<8||s.length>400||/[\n\r]/.test(s))return false;
        if(/\.(?:mkv|mp4|m4v|avi|torrent)$/i.test(s))return false; // a filename, not a display title
        return RES.test(s)||SOURCE.test(s)&&(VIDEO.test(s)||AUDIO.test(s))||BOOKFMT.test(s)&&NUMBERING.test(s);
    }
    // Higher is more likely to be the release name rather than a nearby label.
    function score(text) {
        const s=String(text||'').trim();
        if(!looksLikeRelease(s))return 0;
        let total=1;
        if(RES.test(s))total+=3;
        if(SOURCE.test(s))total+=3;
        if(VIDEO.test(s))total+=2;
        if(AUDIO.test(s))total+=2;
        if(BOOKFMT.test(s))total+=2;
        if(TAG.test(s))total+=1;
        if(NUMBERING.test(s))total+=1;
        return total;
    }
    const SELECTOR='h1,h2,h3,h4,h5,strong,b,[class*="name"],[class*="title"],[class*="release"]';
    const SKIP='.dk-detail-links,.dk-request-links,.dk-request-bar,.dk-listing-dialog,.dk-hub,#dkokto-hub,#dkokto-tools,#dkokto-game-dialog,#dkokto-nav-dialog,#dkokto-banner,#dp-inspector-hub,#dp-inspector-tools,.torrent-mediainfo-dump,textarea,input,pre,code,nav,footer';
    // The element's own text, without this script's badge or lookup row.
    function textOf(node) {
        const copy=node.cloneNode(true);
        copy.querySelectorAll?.('.dk-listing-badge,.dk-detail-badge,.dk-detail-links').forEach(n=>n.remove());
        return clean(copy.textContent||'');
    }
    // A release name is short, so an element holding a whole section of the page is not
    // one. Checking the length first avoids cloning large subtrees on a busy page.
    const TOO_LONG=500;
    function find(doc=document) {
        let best=null;
        const nodes=[...(doc.querySelectorAll?.(SELECTOR)||[])].slice(0,400);
        // Each candidate is read and scored exactly once.
        const hits=[];
        for(const node of nodes) {
            if((node.textContent||'').length>TOO_LONG||node.closest?.(SKIP))continue;
            const text=textOf(node),value=score(text);
            if(value)hits.push({node,title:text,score:value});
        }
        for(const hit of hits) {
            // Prefer the innermost element holding the name, then the strongest match.
            if(hits.some(other=>other.node!==hit.node&&hit.node.contains(other.node)))continue;
            if(!best||hit.score>best.score||hit.score===best.score&&hit.title.length<best.title.length)best=hit;
        }
        if(best)return best;
        const fallback=doc.querySelector?.('.torrent__name')||doc.querySelector?.('h1');
        return fallback?{node:fallback,title:textOf(fallback),score:0}:null;
    }
    return {find,score,looksLikeRelease,textOf,clean};
})();

// Streaming-service abbreviations from the supplied DP list. Data only: the list
// records how a service is spelled in a title, never where a release came from.
// Several services have more than one accepted spelling, separated by " / ".
const DKOKTO_SERVICES = (() => {
    const DATA = `35MM|35mm.online
9NOW|9Now
A3P|Atresplayer
ABC|American Broadcasting Company
ACORN|ACORN TV
ADN|Anime Digital Network
AE|A&E (TV network)
AJAZ|Al Jazeera English
ALL4|Channel 4 (previously 4oD / All 4)
AMC|AMC (TV channel)
AMCP|AMC+
AMZN|Amazon Studios / Amazon Prime Video
ANGL|Angel Studios
ANLB|AnimeLab
ANPL|Animal Planet
APPS|Disney+ MENA
ARD|ARD (broadcaster)
ARTE|Arte
AS|Adult Swim
ATK|America's Test Kitchen
ATV|Apple TV (purchased/channel content)
ATVP|Apple TV+ (original content)
AUBC|Australian Broadcasting Corporation (ABC (AU) iView)
AMBC|Australian Broadcasting Corporation (ABC (US))
AOL|AOL
CORE / BCORE|Sony Pictures Core (formerly BRAVIA CORE)
BB / BRTB|BritBox
BK|Bentkey
BKPL|Blackpills
BNGE|Binge
BOOM|Boomerang (TV network)
BRAV|BravoTV
CBC|Canadian Broadcasting Corporation (CBC Gem)
CBS|CBS
CC|Comedy Central
CCGC|Comedians in Cars Getting Coffee
CHGD|CHRGD
CLBI|Club illico
CM|CineMember
CMT|Country Music Television
CMAX|Cinemax
CMOR|C More
CN|Cartoon Network
CNB|Cinobo
CNBC|CNBC
CNLP|Canal+
COOK|Cooking Channel
CR|Crunchyroll
CRAV|Crave
CRIT|Criterion Channel
CRKI|Chorki
CRKL|Crackle
CRZN|Curzon
CSPN|C-SPAN
CTV|CTV
CUR|Curiosity Stream
CW|The CW
CWS|CW Seed
DAZN|DAZN
DCU|DC Universe
DDY|Digiturk Dilediğin Yerde
DEST|Destination America
DF|DramaFever
DHF|Deadhouse Films
DISC|Discovery Channel
DIY|DIY Network
DOCC|Doc Club
DOCPLAY|DocPlay
DPLY|dplay (Discovery+)
DRPO|Dropout
DRTV|DR TV
DSCP|Discovery+
DSKI|Daisuki
DSNP / DSPA|Disney+
DSNY|Disney Networks
DTV|DirecTV Now (DirecTV Stream)
DW / DLWP|DailyWire+
EPIX|MGM+ (Epix)
ESPN|ESPN
ESQ|Esquire
ETTV|El Trece
ETV|E!
EYE|Eye Film Player
FAH / FAND / FNDG|Fandango at Home (formerly Vudu)
FAM|Family
FBW / FBWatch|Facebook Watch
FJR|Family Jr
FOOD|Food Network
FLMN|Filmin
FMIO|Filmio
FOX|Fox Broadcasting Company
FPT|FPT Play
FREE|Freeform
FUBO|FuboTV
FSTV|Fawesome TV
FTV|France.tv
FUNI|Funimation
FXTL|Foxtel Now
FYI|FYI Network
GC|NHL GameCenter
GAGA|GagaOOLala
GLBL|Global
GLOB|GloboSat Play
GLBO|Globoplay
GO90|go90
GPLAY|Google Play
HBO|HBO
HGM|Hungama OTT
HGTV|HGTV
HIDI|HIDIVE
HIST|History Channel
HLMK|Hallmark
HMAX / MAX|HBO Max (Max)
HPLAY|Hungama Play
HTSR / HS|Hotstar
HULU|Hulu
ID|Investigation Discovery
IFC|IFC
INFP|Infinity+
iP|BBC iPlayer
iQ / iQIYI|IQIYI
iT|iTunes
ITV / ITVX|ITV
IVI|Ivi.ru
JC|JioCinema
JHS|JioHotstar
JOYN|Joyn
JUAN|JuanFlix
KAYO|Kayo Sports
KCW / KOCOWA|Kocowa+
Le / LeTV|Le.com
KF|KlikFilm Productions
KNOW|Knowledge Network
KNPY|Kanopy
KPN|KPN
KS|Kaleidescape
LBXD|Letterboxd
LGP|Lionsgate Play
LIFE|Lifetime
LN|Love Nature
MA|Movies Anywhere
MBC|MBC
MMAX|ManoramaMAX
MNBC|MSNBC
MS|Microsoft Store
MTOD|Motor Trend OnDemand
MTV|MTV Networks
MUBI|Mubi
MY5|Channel 5
MX / MONOMAX|MONOMAX
NATG|National Geographic
NBA|NBA League Pass
NBC|National Broadcasting Company
NBLA|Nebula
NF|Netflix
NFB|National Film Board of Canada
NFL|NFL Network
NFLN|NFL Now
NICK|Nickelodeon
NOS|NOS / NOS Studios+
NOW|NOW
NPO|NPO Start
NRK|Norsk Rikskringkasting
ODK|OnDemandKorea
OFTV|OnlyFans TV
OPTO|OPTO
OSN|OSN+
OXGN|Oxygen
PA|Project Alpha
PBS|PBS
PBSK|PBS KIDS
PCOK|Peacock
PLAY|Google Play
PLUT|Pluto TV
PLUZ|Pluzz
PLYR|Player
PMNT|Paramount Network
PMTP|Paramount+
POGO|PokerGO
PSN|PlayStation Network
PUHU|puhutv
QIBI|Quibi
RED|YouTube Premium (formerly YouTube Red)
RKTN|Rakuten TV
ROKU|The Roku Channel
RSTR|Rooster Teeth
RTE|RTÉ
RTP / RTPPLAY|RTP
SAINA / SP|Saina Play
SBS|SBS On Demand (AU)
SESO|Seeso
SF|SF Anytime
SHAHID|Shahid
SHDR|Shudder
SHM|ShemarooMe
SHMI|Shomi
SHO|Showtime
SKSH|Sky Show (UK)
SKSP|Sky Sport (UK)
SKST|SkyShowtime
SKSTR|Sky Store (UK)
SLNG|Sling TV
SMAX|Showmax
SNET|Sportsnet
SNXT|Sun NXT
SPIK|Spike
SPRT|Sprout
SS|Simply South
STAN|Stan
STMZ|Streamz
STRP|Star+
STZ|Starz
SVT|Sveriges Television
SWER|SwearNet
SWEET|SWEET.TV
SYFY|SyFy
TBS|TBS
TEN|10Play (TenPlay)
TFOU|TFOU
TID|TrueID
TIMV|TIMvision
TK|Tentkotta
TLC|TLC
TOU|Ici TOU.TV
TRVL|Travel Channel
TUBI|TubiTV
TV3|TV3 (IE)
TV4|TV4 (SE)
TVING|TVING
TVL|TV Land
TVNZ|TVNZ
UFC|UFC
UKTV|UKTV
UNIV|Univision
UNXT|U-NEXT
USAN|USA Network
VDO|Vidio
VH1|VH1
VIAP|Viaplay
VICE|Viceland
VIKI|Viki
VIU|VIU
VLCT|Discovery Velocity
VLD|Videoland
VMEO|Vimeo
VMX|Vivamax
VRV|VRV (defunct, owned by Crunchyroll)
VTRN|VET Tv
VUDU|Vudu (defunct)
WNET|W Network
WTCH|Watcha
WME|WatchMe
WOWP|WOW Presents Plus
WWEN|WWE Network
XBOX|Xbox Video
XUMO|Xumo Play
YT|YouTube / YouTube Movies / YouTube TV
YHOO|Yahoo
YOUKU|YoukuTV
ZDF|ZDF
ZEE5|ZEE5`;

    const entries=[],index=new Map();
    for(const line of DATA.split('\n')) {
        const [left,name]=line.split('|');
        if(!left||!name)continue;
        const spellings=left.split('/').map(part=>part.trim()).filter(Boolean);
        const entry={abbr:spellings[0],aliases:spellings.slice(1),name:name.trim()};
        entries.push(entry);
        for(const spelling of spellings)if(!index.has(spelling.toLowerCase()))index.set(spelling.toLowerCase(),{...entry,spelling});
    }
    // Returns the listed spelling and service for a token, whatever case it was typed in.
    const find=token=>{const key=String(token||'').trim().toLowerCase();return key?index.get(key)||null:null;};
    const spellings=()=>[...index.values()].map(e=>e.spelling);
    const list=()=>entries.map(e=>({...e}));
    const describe=token=>{const hit=find(token);return hit?hit.spelling+' — '+hit.name:'';};
    return {find,list,spellings,describe,count:entries.length};
})();

// Tracker rule profiles you can add yourself, as data.
// A profile says who a tracker is (key, label, hosts), whose naming templates it follows
// (DarkPeers' or Zenith's), what its banned release group list holds, and any number of
// plain rules: a pattern that must or must not appear, for named categories, with your own
// severity and wording. Nothing here is fetched and nothing is executed: patterns are
// compiled as regular expressions and matched against a title, and a pattern that will not
// compile is refused with the reason rather than swallowed.
const DKOKTO_PROFILES = (() => {
    const KEY='dkokto_tracker_profiles_v1';
    const FORMAT='dkokto-tracker-rules';
    const RESERVED=['dp','zenith'];
    const LIMITS={profiles:12,bytes:262144,banned:1000,conditional:40,sources:20,rules:150,
        notes:20,hosts:12,pattern:300,message:600,label:40,resolutions:24};
    const SEVERITIES=['error','review'];
    const CATEGORIES=['movie','tv','disc','music','ebook','audiobook','software','any'];
    let backing=null;
    const storage=()=>{if(backing)return backing;try{return localStorage;}catch{return null;}};

    const text=(value,cap)=>typeof value==='string'?value.trim().slice(0,cap):'';
    // A pattern is only ever used to match; a bad one is reported, never ignored.
    function compile(pattern,where,errors) {
        const source=text(pattern,LIMITS.pattern);
        if(!source){errors.push(where+': the pattern is empty.');return null;}
        if(source.length>=LIMITS.pattern){errors.push(where+': the pattern is longer than '+LIMITS.pattern+' characters.');return null;}
        try{return new RegExp(source,'i');}
        catch(error){errors.push(where+': '+error.message);return null;}
    }
    function validate(input) {
        const errors=[],warnings=[];
        if(!input||typeof input!=='object'||Array.isArray(input))return {errors:['The profile must be a JSON object.'],warnings};
        if(input.format&&input.format!==FORMAT)errors.push('“format” should be "'+FORMAT+'".');
        const key=text(input.key,24).toLowerCase();
        if(!/^[a-z0-9][a-z0-9-]{1,23}$/.test(key))errors.push('“key” must be 2–24 characters: lowercase letters, digits and hyphens.');
        if(RESERVED.includes(key))errors.push('“'+key+'” is a built-in site. Choose another key.');
        const label=text(input.label,LIMITS.label)||key;
        const base=text(input.base,10).toLowerCase()||'dp';
        if(!RESERVED.includes(base))errors.push('“base” must be "dp" (DarkPeers templates) or "zenith" (Zenith templates).');
        const hosts=(Array.isArray(input.hosts)?input.hosts:[]).slice(0,LIMITS.hosts)
            .map(host=>text(host,80).toLowerCase().replace(/^https?:\/\//,'').replace(/\/.*$/,''))
            .filter(host=>/^[a-z0-9.-]+\.[a-z]{2,}$/.test(host));
        if(Array.isArray(input.hosts)&&hosts.length<input.hosts.length)
            warnings.push('Some hosts were not recognised as domain names and were left out.');

        const groups=input.groups&&typeof input.groups==='object'?input.groups:{};
        const banned=[];
        for(const entry of (Array.isArray(groups.banned)?groups.banned:[]).slice(0,LIMITS.banned)) {
            const name=text(Array.isArray(entry)?entry[0]:typeof entry==='string'?entry:entry?.name,40);
            if(!name)continue;
            const reason=text(Array.isArray(entry)?entry[1]:entry?.reason,120);
            const since=text(Array.isArray(entry)?entry[2]:entry?.since,20);
            banned.push(since?[name,reason,since]:reason?[name,reason]:[name]);
        }
        const conditional=[];
        for(const entry of (Array.isArray(groups.conditional)?groups.conditional:[]).slice(0,LIMITS.conditional)) {
            const name=text(entry?.name,40);if(!name)continue;
            const allow=compile(entry?.allowIf,'conditional group “'+name+'”',errors);if(!allow)continue;
            conditional.push({name,allow,allowed:text(entry?.allowed,120)||'the releases the list names',
                otherwise:text(entry?.otherwise,160)||'this title does not say so'});
        }
        const sources=[];
        for(const entry of (Array.isArray(groups.sources)?groups.sources:[]).slice(0,LIMITS.sources)) {
            const name=text(typeof entry==='string'?entry:entry?.name,40);if(!name)continue;
            const pattern=entry?.pattern?compile(entry.pattern,'source “'+name+'”',errors)
                :new RegExp('(?:^|[ ._])'+name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?=$|[ ._-])','i');
            if(pattern)sources.push({name,pattern});
        }

        const resolutions=(Array.isArray(input.resolutions)?input.resolutions:[]).slice(0,LIMITS.resolutions)
            .map(value=>text(value,8)).filter(value=>/^\d{3,4}[pi]$/i.test(value));

        const seen=new Set(),rules=[];
        for(const entry of (Array.isArray(input.rules)?input.rules:[]).slice(0,LIMITS.rules)) {
            const code=text(entry?.code,40).replace(/[^A-Za-z0-9._-]/g,'');
            const where='rule '+(code?'“'+code+'”':'(unnamed)');
            if(!code){errors.push(where+': every rule needs a “code”.');continue;}
            if(seen.has(code)){errors.push(where+': that code is used twice.');continue;}
            const message=text(entry?.message,LIMITS.message);
            if(!message){errors.push(where+': every rule needs a “message” saying what to do.');continue;}
            const severity=text(entry?.severity,10)||'error';
            if(!SEVERITIES.includes(severity)){errors.push(where+': “severity” must be "error" or "review".');continue;}
            const categories=(Array.isArray(entry?.profiles)?entry.profiles:['any']).map(value=>text(value,20));
            const unknown=categories.filter(value=>!CATEGORIES.includes(value));
            if(unknown.length){errors.push(where+': unknown categories '+unknown.join(', ')+'. Use '+CATEGORIES.join(', ')+'.');continue;}
            const forbid=entry?.forbid?compile(entry.forbid,where,errors):null;
            const require_=entry?.require?compile(entry.require,where,errors):null;
            if(!forbid&&!require_){errors.push(where+': give it a “forbid” or a “require” pattern.');continue;}
            seen.add(code);
            rules.push({code,severity,message,categories,forbid,require:require_});
        }
        const notes=[];
        for(const entry of (Array.isArray(input.notes)?input.notes:[]).slice(0,LIMITS.notes)) {
            const code=text(entry?.code,40).replace(/[^A-Za-z0-9._-]/g,'')||'note-'+notes.length;
            const message=text(entry?.message,LIMITS.message);
            if(!message)continue;
            const categories=(Array.isArray(entry?.profiles)?entry.profiles:['any']).map(value=>text(value,20))
                .filter(value=>CATEGORIES.includes(value));
            notes.push({code,message,categories:categories.length?categories:['any']});
        }
        if(errors.length)return {errors,warnings};
        return {errors,warnings,profile:{key,label,base,hosts,banned,conditional,sources,resolutions,rules,notes}};
    }
    // Back to the JSON you would paste, so a profile can be edited and shared.
    function toJSON(profile) {
        return {format:FORMAT,version:1,key:profile.key,label:profile.label,base:profile.base,hosts:[...profile.hosts],
            groups:{banned:profile.banned.map(entry=>[...entry]),
                conditional:profile.conditional.map(entry=>({name:entry.name,allowIf:entry.allow.source,allowed:entry.allowed,otherwise:entry.otherwise})),
                sources:profile.sources.map(entry=>({name:entry.name,pattern:entry.pattern.source}))},
            resolutions:[...profile.resolutions],
            rules:profile.rules.map(rule=>({code:rule.code,severity:rule.severity,profiles:[...rule.categories],
                ...(rule.forbid?{forbid:rule.forbid.source}:{}),...(rule.require?{require:rule.require.source}:{}),message:rule.message})),
            notes:profile.notes.map(note=>({code:note.code,profiles:[...note.categories],message:note.message}))};
    }
    function read() {
        try{
            const raw=JSON.parse(storage()?.getItem(KEY)||'[]');
            if(!Array.isArray(raw))return [];
            return raw.map(entry=>validate(entry).profile).filter(Boolean).slice(0,LIMITS.profiles);
        }catch{return [];}
    }
    let cache=null;
    const all=()=>cache||(cache=read());
    const get=key=>all().find(profile=>profile.key===key)||null;
    function write(list) {
        const text=JSON.stringify(list.map(toJSON));
        if(text.length>LIMITS.bytes)throw Error('Those profiles come to '+text.length+' characters, over the '+LIMITS.bytes+' this keeps.');
        try{storage()?.setItem(KEY,text);}catch{throw Error('The profile could not be saved in this browser.');}
        cache=null;
    }
    // Add or replace one profile, keeping the rest.
    function save(input) {
        const {errors,warnings,profile}=validate(input);
        if(errors.length)return {errors,warnings};
        const list=all().filter(entry=>entry.key!==profile.key);
        if(list.length>=LIMITS.profiles)return {errors:['That would be more than '+LIMITS.profiles+' added trackers. Remove one first.'],warnings};
        write([...list,profile]);
        return {errors:[],warnings,profile};
    }
    function remove(key){const list=all().filter(entry=>entry.key!==key);if(list.length===all().length)return false;write(list);return true;}
    function parse(source) {
        let value;
        try{value=JSON.parse(String(source||''));}
        catch(error){return {errors:['That is not valid JSON: '+error.message],warnings:[]};}
        return validate(value);
    }
    // A tracker's banned list, as you copied it off the page. The three shapes seen so far
    // are a tab-separated table with a header, columns split by runs of spaces, and a plain
    // list one per line or comma-separated. A placeholder date (01-01-1969, 1970-01-01) is
    // dropped rather than shown as if it meant something.
    const PLACEHOLDER=/^(?:01-01-1969|1969-01-01|1970-01-01|01-01-1970|n\/?a|-|unknown)$/i;
    const HEADER=/^(?:name|group|release group)$/i;
    function parseGroupList(source) {
        const rows=[],seen=new Set();
        const push=(name,reason,since)=>{
            const clean=text(name,40);
            if(!clean||HEADER.test(clean)||!/^[A-Za-z0-9][A-Za-z0-9._+ -]*$/.test(clean))return;
            const id=clean.toLowerCase();
            if(seen.has(id)||rows.length>=LIMITS.banned)return;
            seen.add(id);
            const why=text(reason,120),when=text(since,20);
            rows.push(when&&!PLACEHOLDER.test(when)?[clean,why,when]:why&&!PLACEHOLDER.test(why)?[clean,why]:[clean]);
        };
        for(const line of String(source||'').split(/[\r\n]+/).slice(0,LIMITS.banned+40)) {
            const trimmed=line.trim();
            if(!trimmed)continue;
            // A table row: tabs, runs of spaces, or pipes between the columns.
            const cells=(trimmed.includes('\t')?trimmed.split('\t'):trimmed.split(/\s{2,}|\s*\|\s*/))
                .map(cell=>cell.trim()).filter(Boolean);
            if(cells.length>1){push(cells[0],cells[1],cells[2]);continue;}
            // One cell: a single name, or several separated by commas.
            for(const name of (trimmed.includes(',')?trimmed.split(','):[trimmed]))push(name);
        }
        return rows;
    }
    // Rules a tracker commonly writes down, ready to tick rather than compose. Each is a
    // starting point: the wording is yours to edit once the profile is in.
    const RECIPES=[
        {id:'boxset',label:'No movie boxsets or collections',rule:{code:'boxset',severity:'error',profiles:['movie'],
            forbid:'(?:^|[ .])(?:Collection|Box[ .]?Sets?|Duology|Trilogy|Quadrilogy|Pentalogy|Anthology|Complete[ .]Series)(?=$|[ .-])',
            message:'This tracker takes no movie boxsets: upload each film separately.'}},
        {id:'season-collection',label:'No TV season collections',rule:{code:'season-collection',severity:'error',profiles:['tv'],
            forbid:'(?:^|[ .])(?:COMPLETE|S\\d{2}[ .-]*(?:-|to)[ .-]*S?\\d{2})(?=$|[ .-])',
            message:'This tracker takes no season collections: package each season on its own.'}},
        {id:'single-episode',label:'Single episodes only while a season is airing',rule:{code:'single-episode',severity:'review',profiles:['tv'],
            forbid:'(?:^|[ .])S\\d{2}E\\d{2}(?![E-]?\\d)',
            message:'A single episode is only allowed while the season is still airing. If it has ended, upload the season pack.'}},
        {id:'scene-dots',label:'No scene-style dot separators',rule:{code:'scene-dots',severity:'error',profiles:['any'],
            forbid:'^[^ ]*\\w+\\.\\w+\\.\\w+[^ ]*$',
            message:'Use words with spaces, not scene-style dot separators.'}},
        {id:'no-extension',label:'No file extension in the title',rule:{code:'extension',severity:'error',profiles:['any'],
            forbid:'\\.(?:mkv|mp4|m4v|avi|torrent)\\s*$',
            message:'Remove the file extension from the display title.'}},
        {id:'group-tag',label:'A release group tag closes the title',rule:{code:'group-tag',severity:'review',profiles:['movie','tv','disc'],
            require:'-\\s?[A-Za-z0-9][A-Za-z0-9._+-]{0,29}\\s*$',
            message:'No release group tag closes the title. Confirm the release is genuinely untagged.'}},
        {id:'web-service',label:'A streaming service before WEB-DL / WEBRip',rule:{code:'web-service',severity:'review',profiles:['movie','tv'],
            require:'(?:^|[ .])[A-Z][A-Za-z0-9+]{1,11}[ .]WEB-?(?:DL|Rip)(?=$|[ .-])',
            message:'Include the streaming-service abbreviation immediately before WEB-DL / WEBRip.'}},
        {id:'year',label:'A film title carries its year',rule:{code:'year',severity:'error',profiles:['movie'],
            require:'(?:^|[ .(])(?:18|19|20)\\d{2}(?=$|[ .)])',
            message:'Include the release year of the film.'}},
        {id:'no-archives',label:'No archives (RAR / ZIP / 7z)',rule:{code:'archive',severity:'error',profiles:['any'],
            forbid:'(?:^|[ .])(?:RAR|ZIP|7z|R\\d{2})(?=$|[ .-])',
            message:'This tracker takes no archived uploads.'}}
    ];
    // A profile assembled from the form, ready to validate like any other.
    function build({key,label,hosts,base,groupList,recipes=[],notes=[]}={}) {
        return {format:FORMAT,version:1,key:String(key||'').toLowerCase().trim(),label:String(label||'').trim(),
            base:base==='zenith'?'zenith':'dp',
            hosts:String(hosts||'').split(/[\s,]+/).map(host=>host.trim()).filter(Boolean),
            groups:{banned:parseGroupList(groupList),conditional:[],sources:[]},
            resolutions:[],
            rules:RECIPES.filter(recipe=>recipes.includes(recipe.id)).map(recipe=>recipe.rule),
            notes:notes.filter(Boolean).map((message,index)=>({code:'note-'+(index+1),profiles:['any'],message}))};
    }
    // What one rule says about a title, in the order the profile lists them.
    function evaluate(profile,title='',category='auto') {
        const issues=[],value=String(title||'');
        const applies=list=>list.includes('any')||list.includes(category);
        for(const rule of profile.rules) {
            if(!applies(rule.categories))continue;
            if(rule.forbid&&rule.forbid.test(value))issues.push({severity:rule.severity,code:profile.key+'-'+rule.code,message:rule.message});
            else if(rule.require&&!rule.require.test(value))issues.push({severity:rule.severity,code:profile.key+'-'+rule.code,message:rule.message});
        }
        for(const note of profile.notes)
            if(applies(note.categories))issues.push({severity:'review',code:profile.key+'-'+note.code,message:note.message});
        return issues;
    }
    // Note codes never colour a badge: they are standing reminders, not findings.
    const baseline=()=>all().flatMap(profile=>profile.notes.map(note=>profile.key+'-'+note.code));
    return {FORMAT,LIMITS,CATEGORIES,SEVERITIES,KEY,RECIPES,parseGroupList,build,
        validate,parse,save,remove,all,get,toJSON,evaluate,baseline,
        refresh(){cache=null;return all();},
        use(store){backing=store;cache=null;}};
})();

// Each tracker's list of low-quality and banned release groups, as supplied.
// A title is matched against the list of whichever site's rules you are checking
// under: this says what that list says, not whether a release is actually good,
// and it verifies nothing. The two lists overlap but are not the same, so a group
// banned on one site can be perfectly acceptable on the other.
const DKOKTO_GROUPS = ((profiles) => {
    const BANNED=['ARCADE','aXXo','BANDOLEROS','BONE','CM8','CrEwSaDe','CTFOH','dAV1nci','DNL','eranger2',
        'FaNGDiNG0','FGT','FiSTER','flower','GalaxyTV','Goki','H4XO','HD2DVD','HDTime','HorribleSubs','iHYTECH',
        'ION10','iPlanet','KiNGDOM','LAMA','MeGusta','mHD','mSD','NaNi','NhaNc3','nHD','nikt0','nSD','OFT',
        'PiTBULL','PRODJi','PSA','RARBG','Rifftrax','ROCKETRACCOON','SANTi','SARTRE','SasukeducK','SEEDSTER',
        'ShAaNiG','Sicario','STUTTERSHIT','Subsplease','SyncUp','TAoE','TGALAXY','TGx','TORRENTGALAXY','ToVaR',
        'Trix','TSP','TSPxL','ViSION','VXT','WAF','WKS','XDMovies','X0r','YIFY','YTS'];
    // Allowed only for what the list says they are allowed for.
    const CONDITIONAL=[
        {name:'EVO',allow:/(?:^|[ ._])WEB-?DL(?=$|[ ._-])/i,allowed:'WEB-DLs',otherwise:'this title does not say WEB-DL'},
        {name:'HDT',allow:/(?:^|[ ._])REMUX(?=$|[ ._-])/i,allowed:'Remuxes',otherwise:'this title does not say REMUX'}
    ];
    // BRrip is on the list as a source, not a group, so it is matched anywhere in the title.
    const SOURCES=[{name:'BRrip',pattern:/(?:^|[ ._])BR-?rip(?=$|[ ._-])/i}];
    // Zenith's own list, as supplied, with the reason it gives for each. It grants no
    // exceptions: EVO is banned outright there, and several groups DarkPeers bans
    // (Goki, ARCADE, PSA…) are not on it at all.
    const ZENITH=[['4K4U','Quality'],['Alcaide_Kira','Retagging'],['AROMA','Retagging'],['aXXo','Quality'],
        ['BiTOR','Faking DV/Atmos, Falsifying Mediainfo','03-06-2026'],['BRrip','Quality'],['CM8','Quality'],
        ['CrEwSaDe','Quality'],['d3g','Quality'],['DNL','Quality'],['EVO','Quality'],['FaNGDiNG0','Quality'],
        ['FGT','Retagging'],['FRDS','Quality'],['GalaxyTV','Quality'],['HD2DVD','Quality'],['HDTime','Quality'],
        ['Hi10','Re-encoding'],['ION10','Quality'],['iPlanet','Quality'],['KiNGDOM','Quality'],['LAMA','Retagging'],
        ['MeGusta','Quality'],['mHD','Quality'],['mSD','Quality'],['NhaNc3','Quality'],['nHD','Quality'],
        ['nikt0','Quality'],['nSD','Quality'],['OFT','Quality, nikt0 alt'],['PRODJi','Quality'],['RARBG','Quality'],
        ['SANTi','Quality'],['SPDVD','Modified full-discs'],['STUTTERSHIT','Quality'],['Telly','Retagging'],
        ['TGx','Quality'],['TSP','Quality'],['TSPxL','Quality'],['WAF','Quality'],['x0r','Quality'],
        ['YIFY','Quality'],['YTS','Quality']];
    const ZENITH_REASON=new Map(ZENITH.map(([name,reason,since])=>[name,reason+(since?', added '+since:'')]));
    // BRrip is on Zenith's list too, and is a source rather than a group tag.
    const ZENITH_NAMES=ZENITH.map(([name])=>name).filter(name=>name!=='BRrip');
    const said=name=>ZENITH_REASON.has(name)?' (Zenith’s reason: '+ZENITH_REASON.get(name)+')':'';
    const LISTS={
        dp:{banned:BANNED,conditional:CONDITIONAL,sources:SOURCES,
            group:name=>'The release group '+name+' is on the tracker’s banned and low-quality list: its releases must not be uploaded to DarkPeers.',
            source:name=>name+' is on the tracker’s low-quality list: those releases must not be uploaded to DarkPeers.',
            allowed:entry=>entry.name+' is allowed only for '+entry.allowed+', which this title says it is. The rest of the rule is still yours to check.',
            refused:entry=>entry.name+' is allowed only for '+entry.allowed+' on DarkPeers, and '+entry.otherwise+'.'},
        zenith:{banned:ZENITH_NAMES,conditional:[],sources:SOURCES,
            group:name=>'The release group '+name+' is on Zenith’s banned release groups list'+said(name)+': its releases must not be uploaded to Zenith.',
            source:name=>name+' is on Zenith’s banned release groups list'+said(name)+': those releases must not be uploaded to Zenith.',
            allowed:entry=>entry.name+' is allowed only for '+entry.allowed+'.',
            refused:entry=>entry.name+' is allowed only for '+entry.allowed+', and '+entry.otherwise+'.'}
    };
    const key=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,'');
    // A tracker you added brings its own list, phrased in its own name.
    function fromProfile(profile) {
        const reasons=new Map(profile.banned.filter(entry=>entry[1]).map(([name,reason,since])=>[name,reason+(since?', added '+since:'')]));
        const said=name=>reasons.has(name)?' ('+profile.label+'’s reason: '+reasons.get(name)+')':'';
        return {banned:profile.banned.map(([name])=>name),conditional:profile.conditional,sources:profile.sources,reasons,
            group:name=>'The release group '+name+' is on '+profile.label+'’s banned release groups list'+said(name)+': its releases must not be uploaded to '+profile.label+'.',
            source:name=>name+' is on '+profile.label+'’s banned release groups list'+said(name)+': those releases must not be uploaded to '+profile.label+'.',
            allowed:entry=>entry.name+' is allowed only for '+entry.allowed+', which this title says it is. The rest of the rule is still yours to check.',
            refused:entry=>entry.name+' is allowed only for '+entry.allowed+' on '+profile.label+', and '+entry.otherwise+'.'};
    }
    const made=new Map();
    function listFor(site) {
        if(LISTS[site])return LISTS[site];
        const profile=profiles.get(site);
        if(!profile)return LISTS.dp;
        // Rebuilt when the stored profile changes, so an edit takes effect without a reload.
        const stamp=profile.banned.length+':'+profile.conditional.length+':'+profile.sources.length+':'+profile.label;
        if(made.get(site)?.stamp!==stamp)made.set(site,{stamp,list:fromProfile(profile)});
        return made.get(site).list;
    }
    const keysOf=new Map();
    const indexOf=site=>{
        const chosen=listFor(site);
        if(!keysOf.has(chosen))keysOf.set(chosen,{
            banned:new Map(chosen.banned.map(name=>[key(name),name])),
            conditional:new Map(chosen.conditional.map(entry=>[key(entry.name),entry]))});
        return keysOf.get(chosen);
    };
    // Where a group name can appear: the trailing tag, or a bracketed tag anywhere
    // (anime releases and YTS put theirs in brackets).
    // A site decoration inside the title element (a flame, a star, an icon-font glyph) is
    // not part of the tag, and a trailing one hid the group entirely.
    const DECORATION=/^[\s\p{Cf}\p{Co}\p{So}\p{Sk}]+|[\s\p{Cf}\p{Co}\p{So}\p{Sk}]+$/gu;
    // A group name can contain spaces — "…x265-Goki TAoE" is one tag, not a tag and a stray
    // word — so everything after the closing hyphen is taken, up to four words. What tells
    // that from "…WEB-DL AAC 2.0 H.264", which has no tag at all, is that a technical token
    // is never part of a group name.
    const TECHNICAL=/^(?:\d{3,4}[pi]|(?:18|19|20)\d{2}|S\d{2}(?:E\d{2})?|E\d{2}|\d+\.\d+|BluRay|BDRip|BRRip|BDMV|ISO|WEB|WEBRip|WEBDL|DL|HDTV|UHDTV|SDTV|DVD|DVDRip|UHD|HD|SD|Rip|Disc|REMUX|Hybrid|x26[45]|H\.?26[45]|AVC|HEVC|AV1|XviD|DivX|VC-?1|MPEG-?\d?|DD|DDP|DD\+|AC3|EAC3|AAC|FLAC|DTS|DTS-HD|DTS-X|MA|TrueHD|Atmos|Opus|LPCM|PCM|MP3|Audio|HDR|HDR10|HDR10\+|DV|SDR|HLG|10bit|Hi10P|IMAX|REPACK|PROPER|EXTENDED|UNCUT|Remastered|Criterion|MULTi|SUBBED|DUBBED|Subs?|Dubs?|Complete|Season|Part|AKA|Edition|Cut|NTSC|PAL)$/i;
    function trailingTag(title) {
        const value=String(title||'').replace(DECORATION,'').trim();
        // Each hyphen in turn, earliest first, because a group name can hold hyphens of its
        // own (R-A-R-B-G) and the tag is whatever runs unbroken to the end from the first
        // hyphen that opens one. A tail carrying a technical token is not a tag: that is
        // what tells "…WEB-DL AAC 2.0 H.264" (no tag) from "…x265-Goki TAoE" (one tag).
        for(let at=value.indexOf('-');at>0;at=value.indexOf('-',at+1)) {
            // A real tag's hyphen has no space before it: " - The Beginning" is part of a
            // name, "x265-GRP" is a tag.
            if(/\s$/.test(value.slice(0,at)))continue;
            const tail=value.slice(at+1).trim();
            if(!tail||tail.length>40)continue;
            const words=tail.split(/\s+/);
            if(words.length>4||!/^[A-Za-z0-9]/.test(words[0]))continue;
            if(words.some(word=>TECHNICAL.test(word.replace(/[.,;:]+$/,''))))continue;
            return tail;
        }
        return '';
    }
    function tags(title) {
        const value=String(title||'').replace(DECORATION,'').trim(),found=[];
        const trailing=trailingTag(value);
        if(trailing)found.push(trailing);
        for(const match of String(value).matchAll(/[[(]([^\][()]{1,40})[\])]/g))found.push(match[1]);
        // "-YTS.MX" and "[YTS.MX]" are the same group as "YTS".
        for(const tag of [...found])if(tag.includes('.'))found.push(tag.split('.')[0]);
        return [...new Set(found.filter(Boolean))];
    }
    // The chosen site's verdict on one title, or null when nothing on that list matches.
    function find(title,{site='dp'}={}) {
        const chosen=listFor(site),index=indexOf(site);
        for(const source of chosen.sources)
            if(source.pattern.test(String(title||'')))
                return {tag:source.name,name:source.name,kind:'source',banned:true,site,
                    reason:chosen.source(source.name)};
        for(const tag of tags(title)) {
            const id=key(tag);
            if(!id)continue;
            const banned=index.banned.get(id);
            if(banned)return {tag,name:banned,kind:'group',banned:true,site,reason:chosen.group(banned)};
            const conditional=index.conditional.get(id);
            if(conditional)return {tag,name:conditional.name,kind:'group',conditional:true,site,
                banned:!conditional.allow.test(String(title||'')),
                reason:conditional.allow.test(String(title||''))
                    ?chosen.allowed(conditional):chosen.refused(conditional)};
        }
        // "Goki TAoE" is not the banned "Goki" — a different name is a different group, and
        // saying otherwise on a moderation tool would be an accusation, not a finding. But
        // the resemblance is worth a look, so it is raised as a question and named as one.
        const tag=trailingTag(title);
        if(tag&&/\s/.test(tag)) {
            const first=key(tag.split(/\s+/)[0]);
            const near=index.banned.get(first)||index.conditional.get(first)?.name;
            if(near)return {tag,name:typeof near==='string'?near:near.name,kind:'group',banned:false,
                near:true,site,
                reason:'The release group tag is “'+tag+'”, which begins with “'+
                    (typeof near==='string'?near:near.name)+'” — a name on this tracker’s banned list. '+
                    'They may be the same group written differently, or two different groups. '+
                    'Check before acting on it: this tool will not decide it for you.'};
        }
        return null;
    }
    return {find,tags,trailingTag,
        list:(site='dp')=>[...listFor(site).banned],
        conditional:(site='dp')=>listFor(site).conditional.map(entry=>({name:entry.name,allowed:entry.allowed})),
        sources:(site='dp')=>listFor(site).sources.map(entry=>entry.name),
        reason:(name,site='dp')=>site==='zenith'?ZENITH_REASON.get(name)||'':listFor(site).reasons?.get(name)||'',
        count:BANNED.length+CONDITIONAL.length+SOURCES.length};
})(typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./profiles.js'):DKOKTO_PROFILES);

// Which tracker's rules to check against. The naming guide is shared, but each site
// has upload rules of its own, so the ones that can be read from a title or a
// MediaInfo report are kept here, per site, and named as that site's rules.
// Nothing here is fetched: these are the rules as supplied.
const DKOKTO_RULES = ((profiles) => {
    const KEY='dkokto_rules_v1';
    const SITES=[
        {key:'dp',label:'DarkPeers',hosts:['darkpeers.org','www.darkpeers.org']},
        {key:'zenith',label:'Zenith',hosts:['znth.cx','www.znth.cx']}
    ];
    // Zenith 5.6 and 5.7, as supplied.
    const BANNED_AUTHORS=['J.R.R. Tolkien','Anne Perry','Simon Scarrow','Sara Gruen','Joan Elliott',
        'Alan Dart','Chris Mead','Paul Moore','Gavin Jones','Noah K Sturdevant','Benedict Brown',
        'Erika T Wurth','Randolph Lalonde','J. D. Salinger','Andrea Sfiligoi','Ana-Maria Babanica'];
    const BANNED_WORKS=['Four Against Darkness Expanded Edition','Four Against Darkness'];
    const loose=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,'');
    let backing=null;
    const storage=()=>{if(backing)return backing;try{return localStorage;}catch{return null;}};
    const host=()=>{try{return typeof location!=='undefined'?location.hostname.toLowerCase().replace(/^www\./,''):'';}catch{return '';}};
    const siteFor=name=>sites().find(site=>site.hosts.some(h=>h.replace(/^www\./,'')===String(name||'').toLowerCase().replace(/^www\./,'')))||null;
    // The two built-in sites, plus any tracker profile you have added.
    const added=()=>profiles.all().map(profile=>({key:profile.key,label:profile.label,hosts:profile.hosts,base:profile.base}));
    const sites=()=>[...SITES,...added()];
    const list=()=>sites().map(site=>({key:site.key,label:site.label}));
    // Which set of naming templates a site follows: its own, or the one its profile names.
    const baseOf=key=>key==='zenith'?'zenith':profiles.get(key)?.base||'dp';
    const labelOf=key=>sites().find(site=>site.key===key)?.label||'DarkPeers';
    // The site you chose, or the one you are standing on, or DarkPeers.
    function current() {
        try{
            const saved=storage()?.getItem(KEY);
            if(saved&&sites().some(site=>site.key===saved))return saved;
        }catch{}
        return siteFor(host())?.key||'dp';
    }
    function choose(key) {
        if(!sites().some(site=>site.key===key))return current();
        try{storage()?.setItem(KEY,key);}catch{}
        return key;
    }
    function forget(){try{storage()?.removeItem(KEY);}catch{}return current();}

    const DISC=/(?:^|[ .])(?:Blu-?Ray|BDMV|VIDEO_TS|Full[ .]Disc|DVD5|DVD9|HD-?DVD)(?=$|[ .-])/i;
    const BOXSET=/(?:^|[ .])(?:Collection|Box[ .]?Sets?|Duology|Trilogy|Quadrilogy|Pentalogy|Hexalogy|Anthology|Complete[ .]Series)(?=$|[ .-])/i;
    const COMPLETE=/(?:^|[ .])COMPLETE(?=$|[ .-])/i;
    const SEASON_RANGE=/(?:^|[ .])S\d{2}[ .-]*(?:-|to)[ .-]*S?\d{2}(?=$|[ .-])/i;
    // A single episode: S02E04, but not a double (S01E01E02) or a range (S01E01-02).
    const EPISODE=/(?:^|[ .])S\d{2}E\d{2}(?![E-]?\d)/i;
    const TRUEHD=/TrueHD/i, COMPAT=/(?:E-?AC-?3|AC-?3|DD\+?|DDP|Dolby Digital)/i;
    const CONTAINERS={matroska:'MKV','mpeg-4':'MP4',avi:'AVI',bdav:'disc',mpeg:'MPEG'};

    // What this site's rules can be checked for, from a title and (where present) the
    // MediaInfo report already on the page. Everything else in the rules is about the
    // upload itself and stays a human job.
    function check(title='',{site=current(),profile='auto',file=null}={}) {
        const issues=[],add=(severity,code,message)=>{if(!issues.some(i=>i.code===code))issues.push({severity,code,message});};
        // A tracker you added is checked against the rules its profile carries.
        const added=profiles.get(site);
        if(added)return profiles.evaluate(added,title,profile);
        if(site!=='zenith')return issues;
        const value=String(title||'');
        const video=['movie','tv','disc'].includes(profile);
        const book=profile==='ebook'||profile==='audiobook';

        if(book) {
            const flat=loose(value);
            const author=BANNED_AUTHORS.find(name=>flat.includes(loose(name)));
            if(author)add('error','zenith-banned-author',author+' is on Zenith’s banned authors list (rule 5.6), so this cannot be uploaded there.');
            const work=BANNED_WORKS.find(name=>flat.includes(loose(name)));
            if(work)add('error','zenith-banned-work','“'+work+'” is on Zenith’s banned works list (rule 5.7).');
        }
        if(profile==='movie'&&BOXSET.test(value))
            add('error','zenith-boxset','Zenith takes no movie boxsets (rule 2.2): upload each film separately.');
        if((profile==='tv'||profile==='disc')&&(COMPLETE.test(value)||SEASON_RANGE.test(value))&&!DISC.test(value))
            add('error','zenith-season-collection','Zenith takes no TV season collections (rule 2.3): package each season on its own. Full discs are the exception, since a disc may hold several seasons.');
        if(profile==='tv'&&EPISODE.test(value))
            add('review','zenith-episode','A single episode is only allowed while the season is still airing (rule 2.4). If the season has ended, upload the season pack.');

        // From the report already on the page, where there is one.
        if(file) {
            // The report as the Inspector parses it: tracks carrying a fields map.
            const of=track=>Object.values(track?.fields||{}).join(' ');
            const audio=(file.audio||[]);
            const main=audio[0];
            if(/REMUX/i.test(value)&&main&&TRUEHD.test(of(main))
                &&!audio.slice(1).some(track=>COMPAT.test(of(track))))
                add('error','zenith-truehd-compat','A REMUX whose main audio is TrueHD needs a retail AC-3 or E-AC-3 compatibility track (rule 3.8). The report shows no second track carrying one.');
            const containerName=String((file.general||[])[0]?.fields?.format||'');
            const container=containerName.toLowerCase();
            const known=Object.keys(CONTAINERS).find(name=>container.includes(name));
            const allowed=!container||CONTAINERS[known]==='MKV'||CONTAINERS[known]==='MP4'||CONTAINERS[known]==='AVI';
            const exception=DISC.test(value)||/(?:^|[ .])(?:HDTV|UHDTV|SDTV)(?=$|[ .-])/i.test(value);
            if(container&&!allowed&&!exception)
                add('review','zenith-container','Zenith allows MKV, MP4 or AVI (rule 3.5), and the report says the container is “'+containerName.slice(0,40)+'”. Full discs, and untouched HDTV/UHDTV (.ts) or SDTV (.ps/.mpg), are the exceptions.');
        }
        // Standing reminders: true of every Zenith upload, and not decidable from here.
        if(video||book||profile==='music')
            add('review','zenith-standing','Zenith rules this cannot check: whether it already exists there (rule 1), another tracker’s exclusivity (1.2), keeping the original group tag (1.4), no archives (2.1), and the description requirements — three source screenshots and MediaInfo for video (3.2, 3.4).');
        return issues;
    }
    // Zenith's own naming for books and music, which is nothing like DarkPeers'. Its
    // audiobook template is:
    //   Author - Title (Year) Language Edition {Narrator} [Source] Container Codec Bitrate
    // its ebook titles are Author - Series # - Title Year Language Edition Format Retail
    // with no brackets, and its music is a suggested shape rather than a required one.
    const AB_YEAR=/\((?:18|19|20)\d{2}\)/;
    const AB_NARRATOR=/\{([^{}]*)\}/;
    const AB_BRACKET=/\[([^\]]*)\]/;
    const AB_SOURCES=['WEB','CD','VINYL','Cassette'];
    const AB_CODECS=['AAC','USAC','MP3','FLAC','DDP'];
    const AB_LOSSY=/^(?:AAC|USAC|MP3|DDP)$/i;
    const EB_FORMATS=['EPUB','PDF','DJVU','MOBI','AZW3'];
    const word=(value,list)=>list.find(name=>new RegExp('(?:^|[ .])'+name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?=$|[ .])','i').test(value));
    function books(title='',profile='ebook') {
        const issues=[],add=(severity,code,message)=>{if(!issues.some(i=>i.code===code))issues.push({severity,code,message});};
        const value=String(title||'').trim();
        if(!/^\S.+?\s-\s\S/.test(value))
            add('error','zenith-name-author',profile==='music'?'Start with Artist - Album.':'Start with Author - Title, separated by " - ".');
        if(profile==='music') {
            // "Suggested format", in their words, with only the artist and album required.
            if(!/^.+?\s-\s.+?\s\((?:18|19|20)\d{2}\)\s-\s\[.+\]\s*$/.test(value))
                add('review','zenith-mu-form','Zenith suggests Artist - Album (Year) - [Format], with the format in square brackets; only the artist and album are required. Format can carry source, codec, bit depth and sample rate, e.g. - [CD FLAC 16bit-44kHz].');
            if(/\w+\.\w+\.\w+/.test(value)&&!value.includes(' - '))
                add('error','zenith-mu-scene','Zenith names music with words and spaces, not scene-style dot separators.');
            if(value.length>180)
                add('review','zenith-mu-length','Zenith caps the total path at 180 characters (folder plus subfolders plus filenames), and this title alone is '+value.length+'.');
            add('review','zenith-mu-files','Zenith rules this cannot check: track numbers and accurate song titles, the artist on various-artists tracks, disc numbering, no leading spaces, no nested folders, and the 180-character path limit.');
            return issues;
        }
        const after=value.replace(/^.*?\((?:18|19|20)\d{2}\)\s*/,'');
        if(profile==='audiobook') {
            if(!AB_YEAR.test(value))
                add('error','zenith-ab-year','Put the release year in parentheses after the title, e.g. (2024) — the year the audiobook was released, not the year the book was published.');
            // The language sits straight after the year, as an ISO-639-3 three-letter code.
            const code=after.match(/^([A-Za-z]{2,3})(?=$|[ .])/);
            if(!code)add('error','zenith-ab-language','Include the language after the year as an ISO-639-3 three-letter code, e.g. ENG.');
            else if(code[1].length!==3)
                add('error','zenith-ab-language-form','“'+code[1]+'” is a two-letter code; Zenith names ISO-639-3 three-letter codes, e.g. ENG. (Its own examples use EN, which contradicts the rule.)');
            const narrator=value.match(AB_NARRATOR);
            if(!narrator)add('error','zenith-ab-narrator','Name the narrator in braces, e.g. {Travis Baldree}.');
            else if(/,| and |&|;/i.test(narrator[1]))
                add('error','zenith-ab-narrator-one','Only the primary narrator is allowed — the first one listed — so “'+narrator[1].slice(0,40)+'” should name one person.');
            const source=AB_SOURCES.find(name=>new RegExp('(?:^|[ .])\\['+name+'\\](?=$|[ .])','i').test(value));
            if(!source) {
                const bracket=value.match(AB_BRACKET);
                add('error','zenith-ab-source',bracket
                    ?'“['+bracket[1].slice(0,20)+']” is not a Zenith source: use [WEB], [CD], [VINYL] or [Cassette].'
                    :'Include the source in square brackets: [WEB], [CD], [VINYL] or [Cassette].');
            }
            const codec=word(value,AB_CODECS);
            if(!codec)add('error','zenith-ab-codec','Include the codec: AAC, USAC, MP3, FLAC or DDP.');
            const container=word(value,['M4B']);
            if(codec&&/^(?:MP3|FLAC)$/i.test(codec)&&container)
                add('error','zenith-ab-container','Drop M4B: '+codec+' is a codec, not a container, so the container is omitted for it.');
            else if(codec&&!/^(?:MP3|FLAC)$/i.test(codec)&&!container)
                add('error','zenith-ab-container','Include the container M4B before the codec.');
            const bitrate=value.match(/(?:^|[ .])(\d{2,4})\s*([Kk][Bb][Pp][Ss])(?=$|[ .])/);
            if(codec&&AB_LOSSY.test(codec)&&!bitrate)
                add('error','zenith-ab-bitrate','Include the bitrate as xxxkbps, e.g. 128kbps.');
            else if(bitrate&&(bitrate[2]!=='kbps'||/\s/.test(bitrate[0].trim().slice(bitrate[1].length))))
                add('error','zenith-ab-bitrate-form','Write the bitrate as '+bitrate[1]+'kbps — lower case, no space.');
            add('review','zenith-ab-check','Zenith rules this cannot check: one primary author and narrator only, title case with no subtitle, the GraphicAudio (1 of 5) part naming where a title is split, and the track/chapter filenames.');
            return issues;
        }
        // Ebooks.
        if(/[[\]]/.test(value))
            add('error','zenith-eb-brackets','Zenith asks for no brackets in the torrent title. The brackets belong in the folder and file names, not here.');
        // A three-letter code that is not itself a format word: PDF is a format, not a language.
        const NOT_LANGUAGE=/^(?:PDF|WEB|NEW|THE|AND|OCR)$/i;
        const code=[...value.matchAll(/(?:^|[ .])([A-Z]{3})(?=$|[ .])/g)].some(m=>!NOT_LANGUAGE.test(m[1]));
        if(!code)add('error','zenith-eb-language','Include the language as a three-letter code, e.g. ENG.');
        const format=word(value,EB_FORMATS);
        if(!format)add('error','zenith-eb-format','Include the format: EPUB, PDF or DJVU, or MOBI or AZW3.');
        if(/#(?!\d)/.test(value))
            add('error','zenith-eb-series','A series number is written as Series #4 — the # takes a number straight after it.');
        add('review','zenith-eb-check','Zenith rules this cannot check: the official series name and numbering against Goodreads, the edition year for this specific edition, Retail only for an unmodified store copy, and the ISBN in the filenames (not in this title).');
        return issues;
    }
    // These are standing notes, not findings against this title: a badge stays green.
    const BUILTIN_BASELINE=['zenith-standing','zenith-episode','zenith-ab-check','zenith-eb-check','zenith-mu-files'];
    const BASELINE=BUILTIN_BASELINE;
    // Everything that is a standing note rather than a finding: the built-ins, plus the
    // notes each added profile carries.
    const baseline=()=>[...BUILTIN_BASELINE,...profiles.baseline()];
    // A profile may list the resolutions its tracker accepts; otherwise its base decides.
    const resolutions=site=>profiles.get(site)?.resolutions?.length?profiles.get(site).resolutions:null;
    return {list,labelOf,current,choose,forget,check,books,siteFor,baseOf,baseline,resolutions,added,BASELINE,KEY,
        bannedAuthors:()=>[...BANNED_AUTHORS],bannedWorks:()=>[...BANNED_WORKS],use(store){backing=store;}};
})(typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./profiles.js'):DKOKTO_PROFILES);

// Local checks against the user-supplied DP Naming Guide for beginners.
// A title/report is evidence, not proof of source history or upload compliance.
const DKOKTO_NAMING = ((inspector,services,groups,rules) => {
    const templates={
        movie:'Name AKA Original LOCALE Year [Cut / Ratio / Hybrid / REPACK] Resolution [Edition] SOURCE TYPE [Dub] Acodec Channels [Object / Hi10P / HDR] Vcodec-Tag',
        tv:'Name [disambiguating year] S## / S##E## / S##E##E## / S##E##-## Resolution SOURCE TYPE [Dub] Acodec Channels [Object / Hi10P / HDR] Vcodec-Tag',
        disc:'Name [AKA / LOCALE] Year or TV numbering [Cut / Ratio / Hybrid / REPACK] Resolution [Edition / Region / 3D] SOURCE [REMUX] [Hi10P / HDR] Vcodec [Dub] Acodec Channels [Object]-Tag',
        music:'Artist - Album (Year) - Format',
        audiobook:'Author - Name Year [Source] Format [Bitrate] ISBN [Retail]-Tag',
        ebook:'Author - Name Year [Edition] Format ISBN [Retail / Scan / OCR]',
        software:'The supplied guide specifies no title template for games/software; install and usage instructions must be in the description.'
    };
    // A title read from a page — or pasted out of one — can carry a site decoration at
    // either end: a personal-release flame, a staff star, an icon-font glyph. It is not
    // part of the release name, and a trailing one broke every check anchored to the end.
    const DECORATION=/^[\s\p{Cf}\p{Co}\p{So}\p{Sk}]+|[\s\p{Cf}\p{Co}\p{So}\p{Sk}]+$/gu;
    // Stripped before normalising as well as after: NFKC turns a trailing ™ into "TM".
    const norm=s=>String(s||'').replace(DECORATION,'').normalize('NFKC').replace(DECORATION,'').trim();
    const field=(t,...keys)=>keys.map(k=>t?.fields?.[k]).find(Boolean)||'';
    // DarkPeers lists its resolutions; Zenith accepts other progressive labels (540p was
    // seen on a real listing there), so only a malformed interlaced label is wrong.
    const LISTED_RESOLUTION={
        dp:/^(?:360[pi]?|480[pi]|576[pi]|720p|1080[pi]|2160p|4320p)$/i,
        zenith:/^(?:\d{3,4}p|480i|576i|1080i)$/i};
    const RESOLUTION_LIST={
        dp:'480i, 480p, 576i, 576p, 720p, 1080i, 1080p, 2160p, 4320p, and 360p only where nothing higher was released.',
        zenith:'a progressive label such as 540p, 720p, 1080p or 2160p, or 480i, 576i or 1080i when the source is interlaced.'};
    // A dotted scene name written out with spaces. The dots that belong — H.264 and a
    // channel layout such as 5.1 — are kept; every other one is a word separator.
    function spaced(value) {
        const parts=String(value||'').split('.'),out=[parts[0]];
        for(let index=1;index<parts.length;index++) {
            const previous=out[out.length-1],current=parts[index];
            const layout=/(?:^|[^\d])\d$/.test(previous)&&/^\d(?!\d)/.test(current);
            const codec=/(?:^|\s)H$/i.test(previous)&&/^26[45]/.test(current);
            if(layout||codec)out[out.length-1]=previous+'.'+current;
            else out.push(current);
        }
        return out.join(' ').replace(/\s+/g,' ').trim();
    }
    const hit=(s,pattern)=>new RegExp('(?:^|[ ._])('+pattern+')(?=$|[ ._-])','i').exec(s);
    const pos=m=>m?m.index+m[0].indexOf(m[1]):-1;
    const lang=s=>{const x=norm(s).toLowerCase();return ({en:'english',eng:'english',ja:'japanese',jpn:'japanese',de:'german',deu:'german',ger:'german',fr:'french',fra:'french',fre:'french',es:'spanish',spa:'spanish',sv:'swedish',swe:'swedish',da:'danish',dan:'danish',no:'norwegian',nor:'norwegian',fi:'finnish',fin:'finnish',pt:'portuguese',por:'portuguese',it:'italian',ita:'italian'})[x]||x;};
    // Split a music title into artist / album / year / format, tolerating the common
    // "Artist - Album Year Format-Tag" shape so the correction can be shown in full.
    function music(s) {
        const split=s.indexOf(' - ');
        const artist=split>0?s.slice(0,split).trim():'';
        const rest=split>0?s.slice(split+3).trim():s;
        const year=rest.match(/(?:^|[\s([])((?:18|19|20)\d{2})(?=[\s)\]]|$)/);
        if(!artist||!year)return {artist,year:year?.[1]||'',parenthesized:false,dashedFormat:false,format:'',tag:'',suggestion:''};
        const album=rest.slice(0,year.index).trim().replace(/[-–(\s]+$/,'');
        const after=rest.slice(year.index+year[0].length).replace(/^[)\]\s]+/,'');
        const parenthesized=/\((?:18|19|20)\d{2}\)/.test(rest.slice(Math.max(0,year.index-1),year.index+year[1].length+2));
        const dashedFormat=/^-\s/.test(after);
        let format=after.replace(/^-\s*/,'').trim();
        // A release-group tag follows a word, never a number: 16-44 and 24-bit are format, not tags.
        const tagMatch=format.match(/^(.*[^\s\d-])-([A-Za-z][A-Za-z0-9._]{1,29})$/);
        const tag=tagMatch?tagMatch[2]:'';
        if(tagMatch)format=tagMatch[1].trim();
        const suggestion=album&&format?artist+' - '+album+' ('+year[1]+') - '+format:'';
        return {artist,album,year:year[1],parenthesized,dashedFormat,format,tag,suggestion};
    }

    // "English Title AKA Original Title" — the guide's form, checked where it can be:
    // how it is written and where it sits. Whether a title needs one at all depends on
    // the film's original name, which is not on this page, so that stays a manual check
    // unless you supply the original title yourself.
    const AKA_SPACED=/(?:^|\s)AKA(?=\s)/;                       // the correct form
    const AKA_LOOSE=/(?:^|[\s.(\[-])(a\.?k\.?a\.?)(?=$|[\s.:)\]-])/i; // any way of writing it
    const TECHNICAL=/(?:^|[ .])(?:(?:18|19|20)\d{2}|S\d{2}(?:E\d{2})?|\\d{3,4}[pi]|REMUX|WEB-?DL|WEBRip|Blu-?Ray|HDTV|DVD(?:Rip|5|9)?)(?=$|[ .])/i;
    function akaCheck(title,add,options={},profile='movie') {
        if(!['movie','tv','disc'].includes(profile))return;   // music and book titles have no AKA
        const value=String(title||'');
        const written=[...value.matchAll(new RegExp(AKA_LOOSE.source,'gi'))];
        const original=String(options.originalTitle||'').replace(/\s+/g,' ').trim();
        if(!written.length) {
            // Only a supplied original title can prove one is missing.
            if(original&&!value.toLowerCase().startsWith(original.toLowerCase()))
                add('error','aka-missing','The original title differs from the name used, so the guide wants it here: '+
                    'Name AKA '+original+' — as “English Title AKA Original Title”.');
            return;
        }
        for(const [whole,form] of written.map(m=>[m[0],m[1]]))
            if(form!=='AKA')add('error','aka-form','Write it as “ AKA ” in capitals with a space either side, not “'+form+'”: Name AKA Original Title.');
        if(AKA_LOOSE.test(value)&&!AKA_SPACED.test(value)&&!written.some(m=>m[1]!=='AKA'))
            add('error','aka-form','Write it as “ AKA ” with a space either side: Name AKA Original Title.');
        // Everything after this is about the one written correctly.
        const at=value.search(AKA_SPACED);
        if(at<0)return;
        const before=value.slice(0,at).trim();
        const after=value.slice(at).replace(/^\s*AKA\s*/,'');
        if(!before)add('error','aka-empty','The name goes before AKA: Name AKA Original Title.');
        if(!after.trim())add('error','aka-empty','The original title goes after AKA: Name AKA Original Title.');
        // A second AKA is only right in a multi-title release, where each title repeats.
        if(written.length>1&&!value.includes(' / '))
            add('review','aka-repeat','More than one AKA in a single title. Repeat title, AKA, locale, year and cut per title only in a multiple-title release, separated by / .');
        // AKA belongs to the name, before the locale, year and everything technical.
        const technical=value.search(TECHNICAL);
        if(technical>=0&&at>technical)
            add('error','aka-position','AKA belongs directly after the name, before the locale and year: Name AKA Original LOCALE Year, then the technical part.');
        const other=after.split(new RegExp(TECHNICAL.source,'i'))[0].trim().replace(/[\s/]+$/,'');
        if(other&&before.toLowerCase()===other.toLowerCase())
            add('review','aka-same','The name and the AKA title read the same. AKA is for a title that differs — an original-language name, or another name it is known by.');
        if(original&&other&&other.toLowerCase()!==original.toLowerCase()&&before.toLowerCase()!==original.toLowerCase())
            add('error','aka-mismatch','The AKA reads “'+other+'”, but the original title you supplied is “'+original+'”.');
    }
    function check(name,options={},file=null){
        const issues=[],add=(severity,code,message)=>{if(!issues.some(i=>i.code===code))issues.push({severity,code,message});};
        let serviceLabel='';
        const s=norm(name);let profile=options.profile||'auto';
        // Which tracker's rules these checks are being read against.
        const site=options.rules||rules.current();
        // Which set of templates this site follows: its own, or the one its profile names.
        const base=rules.baseOf?rules.baseOf(site):(site==='zenith'?'zenith':'dp');
        if(s.length>1000)return {profile,template:'',issues:[{severity:'error',code:'length',message:'Use a title under 1,000 characters.'}],status:'Needs correction'};
        // Any well-formed resolution label is recognised, so one the guide does not list
        // is reported as the wrong value rather than as a missing resolution.
        const resolution=hit(s,'\\d{3,4}[pi]');
        const ep=hit(s,'S\\d{2}(?:E\\d{2}(?:E\\d{2}|-\\d{2})?)?');
        const date=s.match(/(?:^|\s)((?:19|20)\d{2}-\d{2}(?:-\d{2})?)(?=\s|$)/);
        const bookfmt=hit(s,'EPUB|PDF|AZW3|MOBI|FB2|HTML|CHM|DJVU|DOCX?|KFX|LIT|PDB|TXT|RTF|CBR|CBZ');
        if(profile==='auto')profile=ep||date?'tv':bookfmt?'ebook':/ - .+\((?:19|20)\d{2}\) - /u.test(s)?'music':resolution||hit(s,'WEB-DL|WEBRip|REMUX|BluRay|Blu-ray|DVDRip|HDTV|UHDTV|DVD5|DVD9')||file?.video?.length?'movie':'unknown';
        if(!s){add('error','empty','Enter the torrent display title to check.');return result();}
        // The chosen tracker's banned and low-quality group list, matched on the group tag alone.
        const group=groups.find(s,{site});
        if(group)add(group.banned?'error':'review',
            group.banned?'banned-group':group.near?'banned-group-near':'banned-group-allowed',group.reason);
        if(profile==='unknown'){add('review','profile','Choose a category. The title alone does not identify a reliable naming template.');return result();}
        if((options.profile||'auto')==='auto')add('review','inferred','Category inferred as '+profile+'. Confirm it in the category selector, especially for TV missing episode numbers.');
        if(name!==String(name).trim())add('error','spaces','Remove leading or trailing spaces from the display title.');
        if(/\.(?:mkv|mp4|m4v|torrent)$/i.test(s))add('error','extension','Remove the file extension from the tracker display title.');
        // A scene name separates every word with a dot. The guide's templates and every one
        // of its examples use spaces, and a dotted string is not the "internationally
        // recognised title" the Name element asks for.
        if(!/\s/.test(s)&&/\w\.\w/.test(s)&&s.length>20)
            add('error','scene-dots','This is a scene-style name, separated by dots throughout. The guide writes display titles with spaces: “'+
                spaced(s)+'”.');
        if(profile==='software'){add('review','instructions','Check that install and usage instructions are included in the description.');return result();}
        // Zenith's books and music follow templates of their own — an audiobook there is
        // Author - Title (Year) Language Edition {Narrator} [Source] Container Codec Bitrate —
        // so they are checked against those rather than against DarkPeers' templates.
        if(base==='zenith'&&(profile==='music'||profile==='ebook'||profile==='audiobook')){
            for(const issue of rules.books(s,profile))add(issue.severity,issue.code,issue.message);
            return result();
        }
        if(profile==='music'){
            if(!/^.+?\s-\s.+?\s\((?:18|19|20)\d{2}\)\s-\s\S.+$/.test(s)) {
                // Name the parts that differ from Artist - Album (Year) - Format, and offer the
                // same title rewritten. Nothing is renamed: this is text for you to apply.
                const parts=music(s),faults=[];
                if(!parts.artist)faults.push('separate the artist and album with " - "');
                if(!parts.year)faults.push('include the release year');
                else if(!parts.parenthesized)faults.push('put the year in parentheses, e.g. ('+parts.year+')');
                if(parts.year&&!parts.dashedFormat)faults.push('separate the format with " - " after the year');
                if(!parts.format)faults.push('include the format, e.g. WEB FLAC or CD FLAC 16-44');
                add('error','music-template','Use Artist - Album (Year) - Format'+(faults.length?': '+faults.join('; ')+'.':'. Format can include source, codec and quality.'));
                if(parts.suggestion)add('review','music-suggestion','Same title in the guide\u2019s form: '+parts.suggestion+(parts.tag?' \u2014 the music template has no release-group tag, so \u201C-'+parts.tag+'\u201D was dropped. Confirm before renaming anything.':'. Confirm before renaming anything.'));
            }
            if(/\w+\.\w+\.\w+/.test(s)&&!s.includes(' - '))add('error','scene-music','Use words with spaces for music titles, not scene-style dot separators.');
            add('review','music-files','Check files/folders separately: accurate song titles and track numbers (except single-track releases), artist on various-artists tracks, logical disc numbering, no leading spaces and total paths at most 180 characters.');
            add('review','music-facts','Verify artist, album, release/edition year and format against the release. These cannot be established from the display title.');return result();
        }
        if(profile==='ebook'||profile==='audiobook'){
            const fmt=profile==='ebook'?bookfmt:hit(s,'M4B|FLAC|ALAC|PCM|MP3|Opus|Vorbis|AAC');
            if(!/^\S.+?\s-\s\S/.test(s))add('error','author','Start with Author - Name.');
            // A year in brackets is a year: say what is actually wrong with it rather than
            // claiming it is missing. The bare form is DarkPeers' template; Zenith's book
            // titles are written differently and its own book template is not in hand, so
            // nothing is claimed about the form there.
            const bareYear=/(?:^|\s)(?:18|19|20)\d{2}(?=\s|$)/.test(s);
            const bracketYear=s.match(/[([{]((?:18|19|20)\d{2})[)\]}]/);
            if(!bareYear&&!bracketYear)add('error','book-year','Include the release year of this book/audiobook edition.');
            else if(!bareYear&&base!=='zenith')add('error','book-year-form','Write the release year plainly as “'+bracketYear[1]+'”, not “'+bracketYear[0]+'”: the template is Author - Name Year Format ISBN-Tag.');
            if(!fmt)add('error','book-format','Include a format from the guide: '+(profile==='ebook'?'EPUB, PDF, AZW3, MOBI, FB2, HTML, CHM, DJVU, DOC, DOCX, KFX, LIT, PDB, TXT, RTF, CBR or CBZ.':'M4B, FLAC, ALAC, PCM, MP3, Opus, Vorbis or AAC.'));
            const isbn=s.match(/(?:\bISBN(?:-1[03])?[: ]*)?\b((?:97[89][ -]?)?\d[\d -]{7,20}[\dX])\b/i);
            const isbnCandidates=[...s.matchAll(/(?:\d[ -]?){9}[\dX]|(?:\d[ -]?){12}\d/gi)].map(m=>m[0].replace(/[ -]/g,''));
            const asin=/\bB0[A-Z0-9]{8}\b/i.test(s);
            if(options.collection!=='yes'&&!isbnCandidates.some(v=>v.length===10||v.length===13)&&!(profile==='audiobook'&&asin))add('review','isbn','No ISBN/ASIN recognized. Include the ISBN for this edition; collections may omit it. Verify Audible identifiers with the publisher rather than inferring them.');
            if(isbn&&isbnCandidates.length)add('review','isbn-verify','Verify that the identifier belongs to this edition and format, not the physical book or a different audiobook.');
            if(profile==='audiobook'){
                if(fmt&&/MP3|AAC|Opus|Vorbis/i.test(fmt[1])&&!/\bVBR\b/i.test(s)&&!/(?:^|\s)(?:64|80|96|112|128|160|192|224|256|320|\d{2,4}\s*kbps)(?=\s|$)/i.test(s))add('review','bitrate','Lossy audiobooks require a bitrate in kbps, except VBR. Confirm bitrate/VBR and include it.');
                add('review','book-description','Check narrator and publisher in the description, logical chapter numbering, completeness, and the source for non-retail uploads. Speech-only content requires at least 64 kbps; lossy-to-lossy transcodes are prohibited by the guide.');
            }else add('review','book-description','Check publisher, source, language when non-English, page count for fixed-layout books, edition/series details where applicable, completeness and readable files.');
            if(options.collection==='yes')add('review','collection-books','Review collection rules: individual releases for three or fewer books, at least five for author packs, complete or explicitly incomplete series, and full-year magazine sets. Retail omnibus editions have an exception.');
            return result();
        }
        if(file)for(const [index,warning]of inspector.warnings(s,file).entries())add(/^Naming conflict: (?:(?:AVC|HEVC|AV1) in the name|progressive\/interlaced)/.test(warning)?'error':'review','media-'+index,warning);
        // Scope technical matching to the suffix, so title words like Life / Core / Hybrid are not tags.
        const firstTech=resolution?pos(resolution):hit(s,'WEB-DL|WEBRip|REMUX|BluRay|Blu-ray|NTSC|PAL|HDTV|UHDTV|SDTV|HDDVD|HD DVD')?.index??s.length;
        const before=s.slice(0,ep?pos(ep):date?date.index:firstTech);
        const years=[...before.matchAll(/(?:^|[ ._(])((?:18|19|20)\d{2})(?=$|[ ._)])/g)];
        const year=years.at(-1)?.[1]||'';
        const start=ep?pos(ep):date?date.index:year?years.at(-1).index:firstTech;
        const tail=s.slice(start),has=p=>hit(tail,p),knownTitle=norm(options.officialTitle);
        if(/[\p{L}]\.[\p{L}]/u.test(before))add('review','display-spacing','This looks like a filename with dot separators. Tracker display titles use readable words and preserve the official punctuation; do not blindly replace every period.');
        if(profile==='movie'&&!year)add('error','movie-year','Include the movie release year from TMDB after the title.');
        if(profile==='tv'){
            if(!ep&&!date)add('error','tv-number','Include TV numbering: S01, S01E02, S01E02E03, S01E02-04, or a daily-show date YYYY-MM-DD / YYYY-MM.');
            if(year&&options.tvYear!=='yes')add('review','tv-year','TV years are only included to distinguish series sharing a name. Remove the year unless this is needed.');
            if(/S\d+E\d+-E\d+/i.test(s))add('error','episode-range','Use S01E02E03 for a double episode, or S01E02-04 for a range; the guide does not use S01E02-E04.');
            if(/(?:^|[ ._])S\d(?:E|[ ._]|$)|E\d(?=[ ._]|$)/i.test(s))add('error','episode-padding','Use two-digit season and episode numbers, e.g. S01E02.');
            const rawEpisode=s.match(/(?:^|[ ._])(S\d+(?:E\d+)*(?:-E?\d+)?)(?=$|[ ._])/i)?.[1];
            if(rawEpisode&&!/^S\d{2}(?:E\d{2}(?:E\d{2}|-\d{2})?)?$/i.test(rawEpisode))add('error','episode-syntax','Episode token does not follow the guide. Use S01, S01E02, S01E02E03 or S01E02-04.');
            const range=s.match(/S(\d{2})E(\d{2})(?:E|-)(\d{2})(?!\d)/i);
            if(range&&Number(range[3])<=Number(range[2]))add('error','episode-order','The final episode must be after the first episode.');
            if(/S00E\d{2}|S\d{2}E00/i.test(s))add('review','special','Specials require the special name after numbering. Verify S00E## against TVDB, or use S##E00 for specials not on TVDB.');
            if(date){const parts=date[1].split('-').map(Number);if(parts[1]<1||parts[1]>12||parts.length===3&&(parts[2]<1||parts[2]>new Date(Date.UTC(parts[0],parts[1],0)).getUTCDate()))add('error','date','Daily-show date is not a valid calendar date.');}
            add('review','episode-verify','Verify episode mapping and pack completeness against the intended listing; numbers in a title do not establish which episodes the files contain.');
        }
        if(options.year&&year&&String(options.year)!==year)add('error','year-conflict','Title year '+year+' differs from the reference year '+options.year+'.');
        if(knownTitle){const canonical=s.slice(0,knownTitle.length);if(canonical.localeCompare(knownTitle,undefined,{sensitivity:'accent'})!==0)add('review','title-spelling','The title does not start with the supplied official title, including punctuation: '+knownTitle+'. Check AKA / locale and multi-title releases manually.');}
        else add('review','title-unverified','Verify the internationally recognized title, punctuation, release year, AKA and any required locale against TMDB. Add a reference title below to compare spelling.');
        akaCheck(s,add,options,profile);
        const type=has('REMUX|WEB-DL|WEBRip'),dvd=has('(?:NTSC[ ._]+|PAL[ ._]+)?DVD(?:Rip|5|9)?'),disc=!!(has('Blu-ray|DVD5|DVD9|HD[ ._]DVD')&&!type),remux=/REMUX/i.test(type?.[1]||'');
        const discFamily=disc||remux;const releaseKind=type?.[1]|| (disc?'Full disc':has('HDTV|UHDTV|SDTV')?'TV capture':'Encode');
        if(remux&&has('Blu-ray|HD[ ._]DVD|DVDRip|DVD5|DVD9'))add('error','remux-source','REMUX source spelling is BluRay, UHD BluRay, 3D BluRay, HDDVD, NTSC DVD or PAL DVD; full-disc/encode labels differ.');
        if(dvd&&!has('NTSC|PAL'))add('review','dvd-system','DVD source labels require NTSC or PAL. Confirm the system from the source.');
        if(dvd&&!discFamily&&!has('DVDRip'))add('error','dvd-encode','DVD encodes use NTSC DVDRip or PAL DVDRip.');
        if(!resolution&&!dvd)add('error','resolution','Include the video resolution (omitted for DVD sources).');
        if(dvd&&resolution)add('error','dvd-resolution','Omit the resolution label for DVD-sourced releases.');
        if(resolution&&/360/i.test(resolution[1]))add('review','360','360p is allowed only when no official release above 360p exists. Verify availability.');
        // A profile may list the resolutions its tracker accepts; otherwise its base decides.
        const listed=rules.resolutions?.(site);
        const allowedResolution=listed?listed.some(label=>label.toLowerCase()===String(resolution?.[1]||'').toLowerCase())
            :LISTED_RESOLUTION[base].test(resolution?.[1]||'');
        if(resolution&&!allowedResolution)
            add('error','resolution-value','“'+resolution[1]+'” is not a resolution the guide lists: '+(listed?listed.join(', ')+'.':RESOLUTION_LIST[base]));
        const video=has('MPEG-2|VC-1|H[ .]?264|H[ .]?265|x264|x265|AVC|HEVC|VP9|AV1|XviD');
        const audio=has('DTS[ ._-]HD[ ._]MA|DTS[ ._-]HD[ ._]HRA|DTS[ ._]Headphone:X|DTS:X|DTS-ES|DD[+][ ._]EX|DD[ ._]EX|DD[+]|DDP|DD|TrueHD|DTS|LPCM|FLAC|ALAC|AAC|Opus|MP3|MP2|Vorbis');
        const compactAudio=tail.match(/(?:^|[ ._])(DDP|DD\+|DD|AAC|TrueHD|FLAC)(\d{1,2}\.\d)(?=$|[ ._-])/i);
        const channels=has('[0-9]{1,2}[.][0-9]'),audioIndex=audio?pos(audio):compactAudio?compactAudio.index:-1;
        // A layout written with a space (DTS 3 1) is present but malformed. Report the
        // separator instead of claiming the layout is missing. Discrete layouts such as
        // 1.0, 2.1, 3.1, 4.1, 6.1 and 9.1 are accepted the same way as 2.0 / 5.1 / 7.1.
        const spacedChannels=!channels&&audio?tail.slice(pos(audio)+audio[1].length).match(/^[ ]([0-9]{1,2})[ ]([0-9])(?=$|[ ._-])/):null;
        const channelLabel=channels?.[1]||compactAudio?.[2]||'';
        const audioLabel=audio?.[1]||compactAudio?.[1]||'';
        if(compactAudio)add('error','audio-spacing','Separate audio codec and channels with a space, e.g. DD+ 5.1.');
        if(/DDP/i.test(audioLabel))add('error','ddp','The guide uses DD+ for Dolby Digital Plus, not DDP.');
        if(!audioLabel)add('error','audio-missing','Include the default audio codec using the guide’s labels.');
        if(!channelLabel&&spacedChannels)add('error','channel-spacing','Write the channel layout with a period: '+spacedChannels[1]+'.'+spacedChannels[2]+', not '+spacedChannels[1]+' '+spacedChannels[2]+'. The layout itself is fine — 3.1 and other discrete layouts are valid when they match the default audio track.');
        else if(!channelLabel)add('error','channels-missing','Include the default track’s discrete channel layout, e.g. 2.0 or 5.1. Do not infer an LFE channel from total channel count alone.');
        if(!video&&!(dvd&&discFamily))add('error','video-missing','Include the video codec using the spelling for this release type.');
        if(video){const v=video[1].replace(/[ .]/g,'').toLowerCase(),allowed=discFamily?['mpeg-2','vc-1','avc','hevc']:/WEB-DL/i.test(releaseKind)?['h264','h265','vp9','mpeg-2','av1']:/HDTV|UHDTV|SDTV/i.test(releaseKind)?['h264','h265','vp9','mpeg-2','av1','x264','x265','xvid']:['x264','x265','av1','xvid'];
            if(/^h26[45]$/.test(v)&&!/^H\.26[45]$/i.test(video[1]))add('error','h26-spelling','Use H.264 / H.265 with the period in the video codec label.');
            if(!allowed.includes(v))add('error','video-label','Video codec label '+video[1]+' does not match the guide for '+releaseKind+'. Expected: '+allowed.join(', ')+'. This is a naming distinction, not a conversion.');
            if(dvd&&discFamily)add('error','dvd-video','Omit the video codec for DVD full discs/remuxes.');
            if(audioIndex>=0&&(discFamily?pos(video)>audioIndex:pos(video)<audioIndex))add('error','core-order',discFamily?'Full disc/REMUX order is HDR, video codec, audio codec, channels, object tag.':'Encode/WEB/HDTV order is audio codec, channels, object tag, Hi10P/HDR, video codec.');
        }
        // The tag closes the title. The guide allows it to be omitted only when the release
        // has none, which cannot be read from a title, so this is a question rather than an
        // error. The last hyphen inside a token such as WEB-DL or DTS-HD is not a tag: a tag
        // runs unbroken to the end.
        // A group name may contain spaces (…x265-Goki TAoE), so the same reader decides here
        // as decides which group a title carries.
        if(!groups.trailingTag(tail))
            add('review','tag','No release group tag closes the title. The guide allows it to be omitted only where the release has none, so confirm this is genuinely untagged rather than the tag having been dropped.');
        if(audioIndex>=0&&channels&&pos(channels)<audioIndex)add('error','channel-order','Channels follow the audio codec.');
        if(type&&resolution&&pos(type)+start<pos(resolution))add('error','type-order','Resolution belongs before the source/type.');
        if(/WEB/i.test(type?.[1]||'')){
            const prefix=tail.slice(0,pos(type)).trim().replace(/[._]+$/,''),service=prefix.match(/(?:^|[ ._])([A-Z][A-Z0-9+]{1,11})$/i)?.[1];
            if(!service||/^(?:DS4K|HDR|REMUX|MULTI)$/i.test(service))add('review','web-service','Include and verify the streaming-service abbreviation immediately before WEB-DL / WEBRip. The service cannot be inferred from media tracks.');
            else if(/^PMT$/i.test(service))add('error','paramount','Use PMTP for Paramount (your configured convention).');
            else {
                // The supplied list records accepted spellings only. It cannot confirm that a
                // release actually came from that service.
                const listed=services.find(service);
                if(!listed)add('review','service-unknown','“'+service+'” is not in the supplied streaming-service list ('+services.count+' services). Check the abbreviation; a service missing from the list still needs its documented spelling.');
                else {
                    serviceLabel=listed.spelling+' — '+listed.name;
                    if(listed.spelling!==service)add('error','service-spelling','Use the listed spelling for '+listed.name+': '+listed.spelling+', not '+service+'.');
                }
            }
        }else if(!has('BluRay|Blu-ray|HDDVD|HD[ ._]DVD|DVD(?:Rip|5|9)?|HDTV|UHDTV|SDTV'))add('review','source','No source recognized. Verify the source and its guide-specific spelling.');
        if(options.downscale==='yes'&&/WEB|HDTV|UHDTV/i.test(releaseKind)&&!has('DS4K'))add('error','ds4k','The confirmed WEB/HDTV downscale requires DS4K.');
        if(options.downscale==='no'&&has('DS4K'))add('error','ds4k-conflict','DS4K conflicts with your “not downscaled” setting.');
        if(has('DS4K')&&has('UHD[ ._]BluRay'))add('error','ds4k-disc','Omit DS4K for UHD BluRay downscales; the source tag implies it.');
        const hdr=has('HDR10[+]|HDR[ ._]Vivid|DV|HDR|HLG|PQ10'),hi=has('Hi10P');
        if(hdr&&video&&pos(hdr)>pos(video))add('error','hdr-order','HDR belongs before the video codec.');
        if(hdr&&audioIndex>=0&&(discFamily?pos(hdr)>audioIndex:pos(hdr)<audioIndex))add('error','hdr-audio-order',discFamily?'For full disc/REMUX, HDR belongs before video and audio codecs.':'For encode/WEB/HDTV, HDR follows the audio details and precedes the video codec.');
        const object=has('Atmos|Auro3D');
        if(object&&channels&&pos(object)<pos(channels))add('error','object-order','Atmos/Auro3D follows the default audio channel layout.');
        if(type&&video&&pos(type)>pos(video))add('error','type-codec-order','The source/type belongs before the codec details.');
        if(hi&&hdr)add('error','hi-hdr','Hi10P is only for 10-bit SDR AVC/H.264/x264, not HDR.');
        if(hi&&video&&!/AVC|[Hx][ .]?264/i.test(video[1]))add('error','hi-codec','Hi10P applies only to AVC/H.264/x264.');
        const vtrack=file?.video?.[0],depth=Number.parseInt(field(vtrack,'bitdepth')),transfer=field(vtrack,'transfercharacteristics'),vfmt=field(vtrack,'format');
        if(vtrack){if(hi&&Number.isFinite(depth)&&depth!==10)add('error','hi-depth','Hi10P conflicts with the reported '+depth+'-bit video.');
            if(/AVC/i.test(vfmt)&&depth===10&&/709/.test(transfer)&&!hi)add('error','hi-required','Reported 10-bit SDR AVC requires Hi10P.');}
        const tracks=file?.audio||[],defaults=tracks.filter(t=>/^(yes|true|1)$/i.test(field(t,'default')));
        if(tracks.length&&defaults.length!==1)add('review','default-audio','MediaInfo does not identify exactly one default audio track. Confirm which track supplies the title’s audio codec, channels and object tag.');
        if(defaults.length===1){const t=defaults[0],f=field(t,'format'),expected=/^E-?AC-?3$/i.test(f)?'DD+':/^AC-?3$/i.test(f)?'DD':/^AAC/i.test(f)?'AAC':/^FLAC$/i.test(f)?'FLAC':/^MLP FBA|TrueHD/i.test(f)?'TrueHD':'';
            if(expected&&audioLabel&&!new RegExp('^'+expected.replace('+','\\+')+'(?: EX)?$','i').test(audioLabel)&&!(expected==='DD+'&&audioLabel==='DDP'))add('error','audio-conflict','Default audio reports '+f+'; expected title label '+expected+'.');
            const total=Number.parseInt(field(t,'channels'));if(channelLabel&&Number.isFinite(total)&&channelLabel.split('.').map(Number).reduce((a,b)=>a+b,0)!==total)add('error','channel-conflict','Title layout '+channelLabel+' does not total the default track’s '+total+' reported channels.');
            if(has('Atmos')&&!/Atmos|JOC/i.test(Object.values(t.fields).join(' ')))add('review','default-atmos','Atmos is not confirmed on the default audio track, even if another track has it.');
        }
        if(!disc){const original=lang(options.originalLanguage),langs=[...new Set(tracks.filter(t=>!/commentary|audio description|descriptive/i.test(field(t,'title'))).map(t=>lang(field(t,'language'))))];
            const unknown=langs.some(l=>!l||['und','zxx','not reported'].includes(l));
            if(original&&langs.length&&!unknown){let needed='';if(langs.length===1&&langs[0]===original)needed='none';else if(original!=='english'&&langs.length===1&&langs[0]==='english')needed='Dubbed';else if(original!=='english'&&langs.length===2&&langs.includes(original)&&langs.includes('english'))needed='Dual-Audio';else if(langs.length>=3&&langs.includes(original))needed='MULTi';else if(original==='english'&&langs.length===2&&langs.includes('english'))needed=langs.find(l=>l!=='english')+' MULTi';
                if(needed==='none'&&has('Dubbed|Dual-Audio|MULTi'))add('review','dub-unnecessary','Only original-language main audio was recognized; a Dub tag may be unnecessary.');
                else if(needed&&needed!=='none'&&!tail.toLowerCase().includes(needed.toLowerCase()))add('review','dub-tag','Language matrix suggests '+needed+'. Confirm commentary/audio-description classification and main audio languages.');
                else if(!needed)add('review','dub-matrix','Review this language combination against the guide’s Dub decision matrix.');
            }else add('review','dub-unverified','Original/main audio languages are not fully confirmed. Review Dubbed, Dual-Audio, MULTi or Language MULTi against the guide.');
        }
        if(options.collection==='yes'||s.includes(' / '))add('review','video-collection','For multiple titles, repeat title/AKA/locale/year/cut/ratio separated by /. Collection names end in Collection or Trilogy. Check every title and file separately.');
        add('review','provenance','Manually confirm source/service, cut, edition, Hybrid, REPACK/PROPER/RERip, any downscale and release group. Do not invent missing tags. This checker never renames files or certifies tracker compliance.');
        return result(discFamily?'disc':profile);
        function result(templateKey=profile){
            // The tracker's own upload rules, on top of the shared naming guide.
            for(const issue of rules.check(name,{profile,file,site:options.rules}))add(issue.severity,issue.code,issue.message);const errors=issues.filter(x=>x.severity==='error').length,reviews=issues.length-errors;return {profile,template:templates[templateKey]||'',issues,service:serviceLabel,status:errors?errors+' correction'+(errors===1?'':'s')+' needed':reviews?'No definite errors found · manual review remains':'No supported issues found'};}
    }
    function report(name,options,file){const r=check(name,options,file);return ['DP display-title naming review',name,'Category: '+r.profile,...(r.service?['Service: '+r.service]:[]),r.status,'Template: '+r.template,...r.issues.map(i=>(i.severity==='error'?'CORRECT':'REVIEW')+': '+i.message),'Rules: supplied DP Naming Guide for beginners; no live rules lookup or upload performed.'].join('\n');}
    return {check,report,templates,akaCheck};
})(typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./inspector.js'):DKOKTO_INSPECTOR,
   typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./services.js'):DKOKTO_SERVICES,
   typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./groups.js'):DKOKTO_GROUPS,
   typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./rules.js'):DKOKTO_RULES);

// The Tracker rules panel: build a profile from a form, paste one as JSON, or manage the
// ones already added. Everything stays in this browser; nothing is fetched or sent.
const DKOKTO_PROFILES_UI = ((profiles,rules) => {
    let dialog,body,onChange=()=>{},tab='build',status;
    const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
    const button=(label,fn,cls)=>{const b=el('button',label,cls);b.type='button';b.onclick=fn;return b;};
    const say=(message,tone='')=>{if(status){status.textContent=message;status.dataset.tone=tone;}};
    function field(parent,label,{tag='input',rows=0,placeholder='',value='',hint=''}={}) {
        const row=el('label',label,'dk-profile-field');
        const input=el(tag);
        if(tag==='textarea')input.rows=rows||4;else input.type='text';
        input.placeholder=placeholder;input.value=value;
        row.append(input);
        if(hint)row.append(el('small',hint));
        parent.append(row);
        return input;
    }
    function download(name,text) {
        const url=URL.createObjectURL(new Blob([text],{type:'application/json'}));
        const a=el('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    }
    async function copy(text) {
        try{await navigator.clipboard.writeText(text);say('Copied.');}
        catch{window.prompt('Copy this profile:',text);}
    }
    const report=result=>{
        if(result.errors.length){say(result.errors.join(' · '),'bad');return false;}
        if(result.warnings.length)say(result.warnings.join(' · '),'warn');
        return true;
    };
    function added(result,verb) {
        rules.choose(result.profile.key);
        onChange();
        say(result.profile.label+' '+verb+'. It is selected in the Rules list now.','good');
        draw();
    }

    // --- Build a profile from the form -------------------------------------------------
    function buildTab() {
        const form=el('div',undefined,'dk-profile-form');
        const key=field(form,'Short key',{placeholder:'aither',hint:'Lowercase letters, digits and hyphens. Used internally.'});
        const label=field(form,'Name',{placeholder:'Aither',hint:'What the Rules list shows.'});
        const hosts=field(form,'Site addresses',{placeholder:'aither.cc',hint:'Space or comma separated. Used to pick these rules automatically when you are on the site.'});
        const base=el('label','Naming templates','dk-profile-field');
        const baseInput=el('select');
        for(const [value,text] of [['dp','DarkPeers — scene-style video, book and music templates'],['zenith','Zenith — its audiobook, ebook and music templates']]){
            const option=el('option',text);option.value=value;baseInput.append(option);}
        base.append(baseInput,el('small','Whichever this tracker’s naming is closer to. The banned list and the rules below are yours either way.'));
        form.append(base);
        const list=field(form,'Banned release groups',{tag:'textarea',rows:6,
            placeholder:'Paste the tracker’s list here — the table, a name per line, or names separated by commas.',
            hint:'A pasted table is read as Name / Reason / Since. Placeholder dates such as 01-01-1969 are dropped.'});
        const parsed=el('small','',
            'dk-profile-count');
        list.addEventListener('input',()=>{const rows=profiles.parseGroupList(list.value);
            parsed.textContent=rows.length?rows.length+' groups read, first is “'+rows[0][0]+'”'+(rows[0][1]?' ('+rows[0][1]+')':'')+'.':'';});
        form.append(parsed);

        const recipes=el('fieldset',undefined,'dk-profile-recipes');
        recipes.append(el('legend','Rules to include'));
        const boxes=new Map();
        for(const recipe of profiles.RECIPES) {
            const row=el('label',recipe.label);
            const box=el('input');box.type='checkbox';box.value=recipe.id;
            row.prepend(box);recipes.append(row);boxes.set(recipe.id,box);
        }
        recipes.append(el('small','Starting points, in this tracker’s own words once added — edit the JSON afterwards to reword or add your own.'));
        form.append(recipes);
        const notes=field(form,'Standing note (optional)',{tag:'textarea',rows:2,
            placeholder:'Anything true of every upload there that a title cannot show.',
            hint:'Shown as a reminder on every check. It never turns a badge red.'});

        const actions=el('div',undefined,'dk-row');
        const draft=()=>profiles.build({key:key.value,label:label.value,hosts:hosts.value,base:baseInput.value,
            groupList:list.value,recipes:[...boxes].filter(([,box])=>box.checked).map(([id])=>id),
            notes:notes.value.split(/\n+/).map(line=>line.trim()).filter(Boolean)});
        actions.append(button('Add this tracker',()=>{
            const result=profiles.save(draft());
            if(report(result)&&result.profile)added(result,'added');
        },'dk-primary'));
        actions.append(button('Show the JSON',()=>{
            const result=profiles.validate(draft());
            if(!report(result))return;
            preview.value=JSON.stringify(profiles.toJSON(result.profile),null,2);preview.hidden=false;
            say('This is what would be added. Copy it, or add it above.');
        }));
        actions.append(button('Save as file',()=>{
            const result=profiles.validate(draft());
            if(!report(result))return;
            download((result.profile.key||'tracker')+'-rules.json',JSON.stringify(profiles.toJSON(result.profile),null,2));
        }));
        form.append(actions);
        const preview=el('textarea');preview.rows=10;preview.hidden=true;preview.className='dk-profile-json';
        form.append(preview);
        return form;
    }

    // --- Paste or load a profile -------------------------------------------------------
    function pasteTab() {
        const wrap=el('div',undefined,'dk-profile-form');
        const area=field(wrap,'Profile JSON',{tag:'textarea',rows:14,placeholder:'{ "format": "dkokto-tracker-rules", … }'});
        const actions=el('div',undefined,'dk-row');
        actions.append(button('Add this tracker',()=>{
            const parsed=profiles.parse(area.value);
            if(!report(parsed)||!parsed.profile)return;
            const result=profiles.save(parsed.profile?profiles.toJSON(parsed.profile):null);
            if(report(result)&&result.profile)added(result,'added');
        },'dk-primary'));
        actions.append(button('Check it',()=>{
            const parsed=profiles.parse(area.value);
            if(report(parsed))say('That profile is valid: '+parsed.profile.banned.length+' groups, '+parsed.profile.rules.length+' rules.','good');
        }));
        const file=el('input');file.type='file';file.accept='application/json,.json';
        file.onchange=async()=>{const chosen=file.files?.[0];if(!chosen)return;
            if(chosen.size>profiles.LIMITS.bytes){say('That file is larger than this keeps.','bad');return;}
            area.value=await chosen.text();say('Loaded '+chosen.name+'. Check it, then add it.');};
        const load=el('label','Load a .json file','dk-profile-file');load.append(file);
        actions.append(load);
        wrap.append(actions);
        wrap.append(el('p','A profile is data: patterns are matched against a title and nothing in it is ever run as code. A pattern that will not compile is refused with the reason.'));
        return wrap;
    }

    // --- What is installed -------------------------------------------------------------
    function installedTab() {
        const wrap=el('div',undefined,'dk-profile-form');
        const list=profiles.all();
        if(!list.length)wrap.append(el('p','No trackers added yet. Build one, or start from a built-in below.'));
        for(const profile of list) {
            const row=el('div',undefined,'dk-profile-installed');
            row.append(el('strong',profile.label),
                el('small',profile.key+' · '+(profile.hosts.join(', ')||'no addresses')+' · '+profile.banned.length+' groups · '+
                    profile.rules.length+' rules · '+(profile.base==='zenith'?'Zenith':'DarkPeers')+' templates'));
            const actions=el('div',undefined,'dk-row');
            actions.append(button('Copy JSON',()=>copy(JSON.stringify(profiles.toJSON(profile),null,2))));
            actions.append(button('Save as file',()=>download(profile.key+'-rules.json',JSON.stringify(profiles.toJSON(profile),null,2))));
            actions.append(button('Remove',()=>{
                if(!window.confirm('Remove '+profile.label+'? Its rules stop being offered.'))return;
                profiles.remove(profile.key);
                if(rules.current()===profile.key)rules.forget();
                onChange();say(profile.label+' removed.');draw();
            }));
            row.append(actions);wrap.append(row);
        }
        const starters=el('fieldset');starters.append(el('legend','Start from a built-in'));
        starters.append(el('p','A copy of DarkPeers’ or Zenith’s own profile, as JSON, to edit into a new tracker. Change the key and name — the built-ins themselves are not editable.'));
        const row=el('div',undefined,'dk-row');
        for(const key of ['dp','zenith'])
            row.append(button('Copy '+rules.labelOf(key)+'’s profile',()=>copy(JSON.stringify(starter(key),null,2))));
        starters.append(row);wrap.append(starters);
        return wrap;
    }
    // The built-in lists, expressed in the profile format so they can be a starting point.
    function starter(key) {
        const groups=typeof DKOKTO_GROUPS!=='undefined'?DKOKTO_GROUPS:null;
        const banned=(groups?.list(key)||[]).map(name=>{const reason=groups?.reason(name,key);return reason?[name,reason]:[name];});
        return {format:profiles.FORMAT,version:1,key:key==='dp'?'my-tracker':'my-other-tracker',
            label:'Copy of '+rules.labelOf(key),base:key,hosts:[],
            groups:{banned,conditional:(groups?.conditional(key)||[]).map(entry=>({name:entry.name,allowIf:'WEB-?DL',allowed:entry.allowed})),
                sources:(groups?.sources(key)||[]).map(name=>({name}))},
            resolutions:[],rules:[],notes:[]};
    }

    function draw() {
        if(!dialog)return;
        body.replaceChildren();
        const tabs=el('div',undefined,'dk-profile-tabs');
        for(const [id,label] of [['build','Build one'],['paste','Paste or load'],['installed','Added trackers ('+profiles.all().length+')']]) {
            const b=button(label,()=>{tab=id;say('');draw();});
            b.setAttribute('aria-pressed',String(tab===id));
            tabs.append(b);
        }
        body.append(tabs,tab==='build'?buildTab():tab==='paste'?pasteTab():installedTab());
    }
    function open(refresh) {
        onChange=typeof refresh==='function'?refresh:()=>{};
        if(!dialog) {
            dialog=el('dialog',undefined,'dk-hub dk-profile-dialog');
            dialog.setAttribute('aria-labelledby','dk-profile-title');
            const head=el('header'),title=el('h2','Tracker rules');title.id='dk-profile-title';
            head.append(title,button('Close',()=>dialog.close()));
            body=el('section',undefined,'dk-hub-content');
            status=el('p','','dk-profile-status');status.setAttribute('role','status');
            dialog.append(head,body,status);
            document.body.append(dialog);
        }
        say('');draw();
        if(!dialog.open)dialog.showModal();
    }
    return {open};
})(typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./profiles.js'):DKOKTO_PROFILES,
   typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./rules.js'):DKOKTO_RULES);

const DKOKTO_NAMING_UI = (() => {
    function mount({parent,title,getFile,el,field,button,guard,message,download}){
        const box=el('section',undefined,'dk-naming'),options={},output=el('div'),reference=el('details');
        box.append(el('h3','DP naming guide check'),el('p','Checks the tracker display title, not filenames. Based on your supplied guide; results do not certify an upload.'));
        function select(parent,label,key,items){const row=el('label',label),input=el('select');input.setAttribute('aria-label',label);for(const [value,text]of items){const option=el('option',text);option.value=value;input.append(option);}options[key]=items[0][0];input.onchange=()=>{options[key]=input.value;draw();};row.append(input);parent.append(row);return input;}
        select(box,'Naming category','profile',[['auto','Auto — infer from title/report'],['movie','Movie'],['tv','TV / season / episode'],['music','Music'],['audiobook','Audiobook'],['ebook','eBook'],['software','Game / software']]);
        reference.append(el('summary','Reference details and exceptions (optional)'));
        for(const [key,label]of [['officialTitle','Official title including punctuation (reference)'],['originalTitle','Original-language title, if it differs (checks the AKA)'],['year','Reference release year'],['originalLanguage','Original language (name or ISO code)']]){const input=field(reference,label);input.maxLength=key==='year'?4:300;input.onchange=()=>{options[key]=input.value.trim();draw();};}
        select(reference,'TV year needed to distinguish same-name shows?','tvYear',[['unknown','Not confirmed'],['yes','Yes — keep the disambiguating year'],['no','No — omit TV year']]);
        select(reference,'Confirmed WEB / HDTV downscale?','downscale',[['unknown','Unknown'],['yes','Yes'],['no','No']]);
        select(reference,'Collection / multiple titles?','collection',[['unknown','Not confirmed'],['yes','Yes'],['no','No']]);
        reference.append(el('p','Reference values are entered by you, not fetched or inferred as verified facts. Music/book file structure and descriptions require a separate review.'));
        const controls=el('div',undefined,'dk-row');controls.append(button('Check naming',draw),button('Copy naming review',guard(async()=>{await navigator.clipboard.writeText(DKOKTO_NAMING.report(title.value,options,getFile()));message('Naming review copied. No title was changed or posted.');})),button('Save naming review',()=>download('torrent-naming-review.txt',DKOKTO_NAMING.report(title.value,options,getFile()))));
        // Which tracker's rules apply. The naming guide is shared; the upload rules are not.
        const site=el('label','Rules of','dk-naming-site');
        const picker=el('select');picker.setAttribute('aria-label','Which tracker’s rules to check against');
        for(const entry of DKOKTO_RULES.list()){const option=el('option',entry.label);option.value=entry.key;picker.append(option);}
        picker.value=DKOKTO_RULES.current();
        picker.onchange=()=>{DKOKTO_RULES.choose(picker.value);draw();};
        const manage=el('button','Tracker rules…');manage.type='button';
        manage.setAttribute('aria-haspopup','dialog');
        manage.onclick=()=>DKOKTO_PROFILES_UI.open(()=>draw());
        site.append(manage);
        site.append(picker);
        box.insertBefore?.(site,box.firstChild);
        box.append(reference,controls,output);parent.append(box);
        if(site.parentElement!==box)box.prepend(site);
        function draw(){const result=DKOKTO_NAMING.check(title.value,options,getFile());output.replaceChildren();const status=el('p',result.status,'dk-naming-status');status.setAttribute('role','status');output.append(status);
            if(result.service)output.append(el('p','Service: '+result.service,'dk-naming-service'));
            const errors=result.issues.filter(i=>i.severity==='error'),reviews=result.issues.filter(i=>i.severity==='review');
            if(errors.length){const list=el('ul',undefined,'dk-naming-errors');errors.forEach(i=>list.append(el('li',i.message)));output.append(list);}
            if(reviews.length){const detail=el('details');detail.append(el('summary','Manual checks ('+reviews.length+')'));const list=el('ul');reviews.forEach(i=>list.append(el('li',i.message)));detail.append(list);output.append(detail);}
            if(result.template){const detail=el('details');detail.append(el('summary','Template · '+result.profile),el('p',result.template),el('p','Bracketed elements are conditional. A release group is omitted if none exists. Full disc/REMUX and encode/WEB ordering differ.'));output.append(detail);}
            drawDupes(result);
        }
        // Before you upload: is this exact release already on the trackers you are on?
        // Nothing is fetched — each link opens only when you click it.
        function drawDupes(result) {
            const name=title.value.trim();
            if(!name)return;
            const found=DKOKTO_REQUESTS_CORE.search({name,category:result.profile},{exact:true});
            const detail=el('details');detail.className='dk-naming-dupes';
            detail.append(el('summary','Already uploaded? · search this exact name ('+found.links.length+')'));
            if(!found.links.length) {
                detail.append(el('p',DKOKTO_TRACKERS.count()
                    ?'None of the trackers you have chosen carry '+result.profile+' releases.'
                    :'No trackers chosen yet. Pick them in the request cross-check settings and they are offered here too.'));
            } else {
                const row=el('div',undefined,'dk-row');
                for(const item of found.links) {
                    const a=el('a',item.label);a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';a.title=item.note;
                    row.append(a);
                }
                detail.append(row);
                const copy=el('button','Copy every link');copy.type='button';copy.className='dk-listing-copy';
                copy.onclick=async()=>{const text=found.links.map(item=>item.label+': '+item.url).join('\n');
                    try{await navigator.clipboard.writeText(text);copy.textContent='Copied';setTimeout(()=>copy.textContent='Copy every link',1500);}
                    catch{window.prompt('Copy the links:',text);}};
                detail.append(copy);
            }
            if(found.skipped.length)detail.append(el('p','Left out: '+found.skipped.map(item=>item.label+' ('+item.reason+')').join(', ')));
            detail.append(el('p','The exact release name is searched, so a match means that very release is already there. A different edition or group will not match — search the title itself for those.'));
            output.append(detail);
        }
        // Searchable copy of the supplied abbreviation list, for checking a title by hand.
        const services=el('details');services.append(el('summary','Streaming service abbreviations ('+DKOKTO_SERVICES.count+')'));
        const filter=field(services,'Filter services');filter.placeholder='AMZN, iPlayer, Disney…';filter.maxLength=60;
        const table=el('div',undefined,'dk-service-list');services.append(table,el('p','Spellings only, from your supplied list. Being listed does not confirm that a release came from that service.'));
        function drawServices(){const term=filter.value.trim().toLowerCase();table.replaceChildren();
            const rows=DKOKTO_SERVICES.list().filter(s=>!term||[s.abbr,...s.aliases,s.name].some(v=>v.toLowerCase().includes(term)));
            if(!rows.length){table.append(el('p','No service matches that text.'));return;}
            for(const row of rows.slice(0,300)){const line=el('p');line.append(el('code',[row.abbr,...row.aliases].join(' / ')),document.createTextNode(' '+row.name));table.append(line);}
            if(rows.length>300)table.append(el('p','Showing the first 300 of '+rows.length+' matches.'));
        }
        filter.oninput=drawServices;drawServices();box.append(services);
        title.addEventListener('change',draw);draw();return {draw};
    }
    return {mount};
})();

const DKOKTO_INSPECTOR_UI = (() => {
    function render({content,settings,save,message,guard,el,field,button,link,download}) {
        const engine=DKOKTO_INSPECTOR,torrent=location.pathname.match(/^\/torrents\/(\d+)\/?$/)?.[1];
        // Read the site's own title text only: this script's badge and lookup row live in
        // the same heading and must not become part of the name being checked.
        const pageTitle=()=>DKOKTO_RELEASE_TITLE.find(document)?.title||'';
        const title=field(content,'Release name to check',torrent?pageTitle():'');title.maxLength=500;
        content.append(el('p','Reads the MediaInfo already on this page. Results describe the report, not an independent scan of the media. Source, release group and REMUX claims cannot be proven from MediaInfo alone.'));
        const controls=el('div',undefined,'dk-row'),status=el('p'),results=el('div',undefined,'dk-inspector-results');status.setAttribute('role','status');
        const selector=el('select');selector.setAttribute('aria-label','MediaInfo file report');selector.hidden=true;
        const advanced=el('details');advanced.append(el('summary','Paste or review MediaInfo'));const raw=el('textarea');raw.rows=8;raw.maxLength=2000000;raw.setAttribute('aria-label','MediaInfo text or JSON');advanced.append(raw,button('Inspect pasted report',guard(()=>inspect(raw.value,'Pasted report'))));
        let files=[],index=0,origin='';
        const naming=DKOKTO_NAMING_UI.mount({parent:content,title,getFile:()=>files[index]||null,el,field,button,guard,message,download});
        const copy=button('Copy technical summary',guard(async()=>{await navigator.clipboard.writeText(engine.summary(title.value,files[index]));message('Technical summary copied. Raw file paths and your private notes are not included.');}));
        const exportButton=button('Save technical summary',()=>download('torrent-inspection.txt',engine.summary(title.value,files[index])));
        copy.disabled=true;exportButton.disabled=true;
        controls.append(button('Read MediaInfo from page',guard(read)),copy,exportButton);content.append(controls,status,selector,results,advanced);
        function table(label,columns,items){results.append(el('h3',label+' ('+items.length+')'));if(!items.length){results.append(el('p','No tracks reported. This does not prove that none exist.'));return;}
            const wrap=el('div',undefined,'dk-inspector-table'),t=el('table'),head=el('tr');for(const [,name]of columns)head.append(el('th',name));t.append(head);
            for(const item of items.slice(0,100)){const row=el('tr');for(const [key]of columns)row.append(el('td',strValue(item[key])));t.append(row);}wrap.append(t);results.append(wrap);if(items.length>100)results.append(el('p','Showing the first 100 tracks. The exported summary includes all parsed tracks.'));
        }
        function strValue(v){return v===null||v===undefined||v===''?'Not reported':String(v);}
        function draw(){naming.draw();results.replaceChildren();if(!files[index])return;const file=files[index],r=engine.rows(file),warnings=engine.warnings(title.value,file);
            status.textContent=origin+' · report '+(index+1)+' of '+files.length+'.';
            results.append(el('h3','General'),el('p',`Container: ${r.container} · Duration: ${r.duration} · Size: ${r.size} · Overall bitrate: ${r.bitrate}`));
            const checks=el('section',undefined,'dk-inspector-checks');checks.append(el('h3','Release-name review'));
            if(warnings.length){const list=el('ul');warnings.forEach(w=>list.append(el('li',w)));checks.append(list);}else checks.append(el('p','No conflicts found in the supported checks. Missing fields and source claims remain unverified.'));results.append(checks);
            table('Video',[['track','#'],['codec','Codec'],['width','Width'],['height','Height'],['depth','Depth'],['frameRate','Frame rate'],['bitrate','Bitrate'],['scan','Scan'],['hdr','HDR']],r.video);
            table('Audio',[['track','#'],['language','Language'],['codec','Codec'],['features','Features'],['channels','Channels'],['default','Default'],['title','Title']],r.audio);
            table('Subtitles',[['track','#'],['language','Language'],['codec','Codec'],['default','Default'],['forced','Forced'],['hearingImpaired','HI'],['title','Title']],r.text);
        }
        function inspect(value,label){files=[];copy.disabled=true;exportButton.disabled=true;selector.hidden=true;results.replaceChildren();status.textContent='';try{files=engine.parse(value);}catch(e){naming.draw();status.textContent=e.message;throw e;}index=0;origin=label;selector.replaceChildren();files.forEach((_,i)=>{const option=el('option','File report '+(i+1));option.value=String(i);selector.append(option);});selector.hidden=files.length<2;copy.disabled=false;exportButton.disabled=false;draw();}
        function read(){const reports=engine.readPage(document);if(!reports.length){files=[];naming.draw();results.replaceChildren();copy.disabled=true;exportButton.disabled=true;selector.hidden=true;status.textContent='No supported MediaInfo dump found on this page. Naming checks still work; paste a Text/JSON report below for media comparisons.';advanced.open=true;return;}raw.value=reports.join('\n\n');inspect(raw.value,'MediaInfo from page');}
        selector.onchange=()=>{index=Number(selector.value);draw();};
        // Two reports side by side, for a trump decision. It says what they differ on and
        // stops there: which is better is not something a report can settle.
        const trump=el('details');trump.className='dk-compare';
        trump.append(el('summary','Compare two releases · for a trump decision'));
        trump.append(el('p','Paste the MediaInfo of each. The comparison names what the two reports differ on — resolution, bitrate, audio, subtitles, chapters — and nothing more. Which release is better, and whether a trump is allowed, is yours to judge.'));
        const nameA=field(trump,'Release A name (optional)'),leftArea=el('textarea');
        leftArea.rows=6;leftArea.maxLength=2000000;leftArea.setAttribute('aria-label','MediaInfo for release A');
        const nameB=field(trump,'Release B name (optional)'),rightArea=el('textarea');
        rightArea.rows=6;rightArea.maxLength=2000000;rightArea.setAttribute('aria-label','MediaInfo for release B');
        const labelled=(text,area)=>{const wrap=el('label',text,'dk-compare-side');wrap.append(area);return wrap;};
        const sides=el('div',undefined,'dk-compare-sides');
        sides.append(labelled('Report A',leftArea),labelled('Report B',rightArea));
        trump.append(sides);
        const compareOut=el('div',undefined,'dk-compare-out');
        const useCurrent=button('Use the report on this page as A',guard(()=>{
            const pages=engine.readPage(document);
            if(!pages.length)throw Error('No MediaInfo was found on this page.');
            leftArea.value=pages[0];nameA.value=nameA.value||title.value;
            message('The report on this page is loaded as A.');
        }));
        const runCompare=guard(()=>{
            const left=engine.parse(leftArea.value)[0],right=engine.parse(rightArea.value)[0];
            if(!left||!right)throw Error('Paste a MediaInfo report on both sides.');
            const result=DKOKTO_COMPARE.compare(left,right);
            const text=DKOKTO_COMPARE.report(result,{titleA:nameA.value.trim()||'Release A',titleB:nameB.value.trim()||'Release B'});
            compareOut.replaceChildren();
            if(!result.anyDifference)compareOut.append(el('p','The two reports agree on every field compared.'));
            else {
                const table=el('div',undefined,'dk-compare-table');
                const head=el('div',undefined,'dk-compare-row');
                head.append(el('strong',''),el('strong',nameA.value.trim()||'A'),el('strong',nameB.value.trim()||'B'));
                table.append(head);
                for(const row of result.differences) {
                    const line=el('div',undefined,'dk-compare-row');
                    const a=el('span',row.a),b=el('span',row.b);
                    if(row.larger==='a')a.dataset.larger='yes';
                    if(row.larger==='b')b.dataset.larger='yes';
                    line.append(el('span',row.label+(row.by?' · '+row.by:'')),a,b);
                    table.append(line);
                }
                compareOut.append(table);
                if(result.identical.length)compareOut.append(el('p','Same on both: '+result.identical.map(row=>row.label).join(', ')+'.'));
            }
            const copyIt=button('Copy comparison',async()=>{
                try{await navigator.clipboard.writeText(text);message('Comparison copied.');}
                catch{window.prompt('Copy the comparison:',text);}});
            compareOut.append(copyIt);
            message('Compared the two reports. Neither is declared better: that is a judgement they cannot make.');
        });
        const compareRow=el('div',undefined,'dk-row');
        compareRow.append(button('Compare',runCompare),useCurrent);
        trump.append(compareRow,compareOut);
        content.append(trump);
        const glossary=el('details');glossary.append(el('summary','What do HDR, DV, Atmos, REMUX and WEB-DL mean?'));for(const [term,explanation]of Object.entries(engine.glossary)){glossary.append(el('h3',term),el('p',explanation));}content.append(glossary);
        if(torrent){const notes=el('section');notes.append(el('h3','My private notes · torrent #'+torrent),el('p','Saved only in this browser. Existing notes from the previous toolkit are preserved.'));const area=el('textarea');area.value=settings.notes[torrent]||'';area.rows=5;area.maxLength=20000;area.setAttribute('aria-label','Private torrent notes');controls.append(button('My notes',()=>{notes.scrollIntoView({block:'start'});area.focus();}));notes.append(area,button('Save private notes',guard(()=>{if(area.value.trim())settings.notes[torrent]=area.value;else delete settings.notes[torrent];save();message('Private notes saved for torrent #'+torrent+'. Nothing was posted to the tracker.');})));content.append(notes);}else content.append(el('p','Private notes are available on torrent detail pages. You can still inspect a pasted report here.'));
        const optional=el('p'),srr=link('Optional: search this title on srrDB',engine.searchLink(title.value));optional.append(srr);content.append(optional);title.onchange=()=>{srr.href=engine.searchLink(title.value);draw();};
        try{read();}catch(e){message(e.message);advanced.open=true;}
    }
    return {render};
})();

const DKOKTO_LISTING_CORE = ((naming,rules) => {
    function category(text){const value=String(text||'').trim().toLowerCase().replace(/[_-]+/g,' ');
        if(/\baudio\s*books?\b/.test(value))return 'audiobook';
        if(/\be\s*books?\b/.test(value))return 'ebook';
        if(/\b(?:movies?|films?)\b/.test(value))return 'movie';
        if(/\b(?:tv|television)\b/.test(value))return 'tv';
        if(/\bmusic\b/.test(value))return 'music';
        // Some panels label the row with its format rather than its category.
        if(/^(?:flac|alac|mp3|aac|opus|wav|vinyl)\b/.test(value))return 'music';
        if(/\b(?:games?|software|applications?)\b/.test(value))return 'software';
        return 'auto';
    }
    const FIXED=['inferred','title-unverified','dub-unverified','provenance','episode-verify','music-files','music-facts','book-description','isbn-verify'];
    // A standing note is a reminder, not a finding: the built-in ones, plus whatever an
    // added tracker's profile carries, which can change while the page is open.
    const baseline=()=>new Set([...FIXED,...(rules.baseline?rules.baseline():rules.BASELINE)]);
    // A page that shortens a long release name leaves a trailing ellipsis. Judging what is
    // left would invent faults — a cut-off group tag reads as no tag at all — so it is not
    // judged; the badge says the name is shortened here and points at the torrent page.
    const SHORTENED=/(?:…|\.\.\.)$/;
    function assess(title,categoryName=''){
        if(SHORTENED.test(String(title||'').trim())) {
            const review={profile:'unknown',template:'',issues:[],service:'',status:'Title shortened on this page'};
            return {state:'review',label:'Title is shortened here',review,errors:[],
                uncertain:[{severity:'review',code:'shortened',
                    message:'This page shows a shortened release name, so the title cannot be checked from here. Open the torrent page, where the full name is shown.'}],
                profile:'unknown',confident:false,shortened:true};
        }
        const profile=category(categoryName),review=naming.check(title,{profile});
        // A guessed movie needs a year and a technical suffix. A TV without numbering
        // must not acquire a red movie-year error just because a category was unavailable.
        const confident=profile!=='auto'||review.profile==='tv'||review.profile==='music'||review.profile==='ebook'||review.profile==='movie'&&/(?:18|19|20)\d{2}/.test(title)&&/\b(?:360|480|576|720|1080|2160|4320)[pi]\b/i.test(title);
        const notes=baseline();
        const errors=review.issues.filter(i=>i.severity==='error'),uncertain=review.issues.filter(i=>i.severity==='review'&&!notes.has(i.code));
        // A banned release group does not depend on the category, so it is red even
        // when the category could not be established.
        const forbidden=errors.some(issue=>issue.code==='banned-group');
        let state=forbidden?'error':!confident||review.profile==='unknown'||review.profile==='software'?'review':errors.length?'error':uncertain.length?'review':'pass';
        const label=state==='error'?(forbidden?'Banned release group':'Naming errors found'):state==='pass'?'Title checks passed':'Naming needs review';
        return {state,label,review,errors,uncertain,profile,confident};
    }
    return {category,assess};
})(typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./naming.js'):DKOKTO_NAMING,
   typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./rules.js'):DKOKTO_RULES);

// Paste-ready text for a tracker report and for an audit of loaded rows.
// Pure text: nothing here submits, sends or fetches anything.
const DKOKTO_REPORT = (() => {
    const FOOTER='Checked with the DKOKTO naming checker against the supplied DP naming guide. Display title only: media, source history and tracker approval are not verified.';
    const text=(v,max=400)=>String(v??'').replace(/\s+/g,' ').trim().slice(0,max);
    const suggestion=result=>result?.review?.issues?.find(i=>i.code==='music-suggestion')?.message
        ?.replace(/^Same title in the guide.s form:\s*/,'').replace(/\s+—.*$/,'').replace(/\.\s*Confirm before renaming anything\.$/,'')||'';

    // One release: what is wrong, in the words the guide uses.
    function report({title,url='',category='',result}) {
        if(!result?.review)return '';
        const lines=['Naming report · '+text(title)];
        if(url)lines.push('Link: '+text(url,300));
        lines.push('Category: '+(text(category,80)||'not shown on this page (inferred as '+(result.review.profile||result.profile)+')'));
        if(result.review.service)lines.push('Service: '+text(result.review.service,120));
        lines.push('Result: '+result.label,'');
        const errors=result.review.issues.filter(i=>i.severity==='error');
        const reviews=result.review.issues.filter(i=>i.severity==='review'&&i.code!=='music-suggestion');
        if(errors.length) {
            lines.push('Corrections ('+errors.length+'):');
            errors.forEach((issue,index)=>lines.push(' '+(index+1)+'. '+text(issue.message,300)));
        } else lines.push('No corrections found in the supported title checks.');
        const rewrite=suggestion(result);
        if(rewrite)lines.push('','Guide form: '+text(rewrite,300));
        if(!errors.length&&reviews.length) {
            lines.push('','Manual checks ('+reviews.length+'):');
            reviews.forEach((issue,index)=>lines.push(' '+(index+1)+'. '+text(issue.message,300)));
        }
        if(result.review.template)lines.push('','Template: '+text(result.review.template,300));
        lines.push('',FOOTER);
        return lines.join('\n');
    }

    // Many releases: what needs fixing across the rows that are loaded.
    function audit(rows=[],{page='',title='Naming audit'}={}) {
        const list=rows.filter(row=>row&&row.title&&row.result);
        const errors=list.filter(row=>row.result.state==='error');
        const reviews=list.filter(row=>row.result.state==='review');
        const passed=list.filter(row=>row.result.state==='pass');
        const head=[title+' · '+list.length+' loaded title'+(list.length===1?'':'s')];
        if(page)head.push('Page: '+text(page,300));
        head.push(errors.length+' with corrections · '+reviews.length+' needing review · '+passed.length+' passing','');
        const out=[...head];
        if(!list.length)return [title+' · no release titles were loaded on this page','',FOOTER].join('\n');
        const faults=new Map();
        for(const row of errors)for(const issue of row.result.errors||[])faults.set(issue.message,(faults.get(issue.message)||0)+1);
        if(faults.size) {
            out.push('By fault:');
            for(const [message,count] of [...faults].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])))out.push(' · ('+count+') '+text(message,300));
            out.push('');
        }
        if(errors.length) {
            out.push('Corrections:');
            errors.forEach((row,index)=>{
                out.push(' '+(index+1)+'. '+text(row.title));
                if(row.url)out.push('    '+text(row.url,300));
                for(const issue of row.result.errors||[])out.push('    - '+text(issue.message,300));
                const rewrite=suggestion(row.result);
                if(rewrite)out.push('    → '+text(rewrite,300));
            });
            out.push('');
        }
        if(reviews.length) {
            out.push('Needs review:');
            reviews.forEach((row,index)=>{
                out.push(' '+(index+1)+'. '+text(row.title));
                const why=row.result.uncertain?.[0]?.message||'Category or title information is insufficient for a definite answer.';
                out.push('    - '+text(why,300));
            });
            out.push('');
        }
        out.push(FOOTER);
        return out.join('\n');
    }
    return {report,audit,FOOTER};
})();

// A message to the uploader, built from what the check already found.
// It writes up the findings in a consistent, civil form: what is wrong, in the guide's own
// words, and what happens next. It invents no rules, adds no accusation, and asserts
// nothing the check did not find — the manual checks stay marked as things to confirm
// rather than as faults. Nothing is sent: the text is yours to read, edit and paste.
const DKOKTO_REPLY = (() => {
    const OUTCOMES=[
        {key:'changes',label:'Ask for changes',
            opening:'Thanks for the upload. Before this can go through, a few things in the title need correcting:',
            single:'Thanks for the upload. One thing in the title needs correcting before this can go through:',
            closing:'Rename it to match and I will take another look. Give me a shout if any of it is unclear.'},
        {key:'rejected',label:'Reject',
            opening:'Thanks for the upload. I am afraid this one cannot stay up as it is:',
            single:'Thanks for the upload. I am afraid this one cannot stay up as it is:',
            closing:'You are welcome to upload it again once that is sorted.'},
        {key:'approved',label:'Approve with notes',
            opening:'Approved — thanks for the upload. Two small things for next time:',
            single:'Approved — thanks for the upload. One small thing for next time:',
            closing:'Nothing to do here; it is only worth knowing for the next one.'},
        {key:'question',label:'Ask a question',
            opening:'Thanks for the upload. Before I approve it, could you confirm a couple of things?',
            single:'Thanks for the upload. Before I approve it, could you confirm one thing?',
            closing:'No rush — just let me know and I will get it moving.'}
    ];
    const find=key=>OUTCOMES.find(entry=>entry.key===key)||OUTCOMES[0];
    const clean=value=>String(value||'').replace(/\s+/g,' ').trim();
    const numbered=list=>list.map((text,index)=>(index+1)+'. '+text);
    // The findings, in the words the check used, so the uploader is told what the guide
    // says rather than a paraphrase of it.
    function build(result,{title='',url='',outcome='changes',site='',rewrite='',sign=''}={}) {
        const chosen=find(outcome);
        const errors=(result?.errors||result?.issues?.filter(issue=>issue.severity==='error')||[])
            .map(issue=>clean(issue.message)).filter(Boolean);
        const reviews=(result?.uncertain||result?.issues?.filter(issue=>issue.severity==='review')||[])
            .map(issue=>clean(issue.message)).filter(Boolean);
        const lines=[];
        const asked=chosen.key==='question';
        const points=asked?reviews:errors;
        // With nothing found, an opening about corrections would be a lie.
        if(!points.length&&chosen.key!=='approved')
            lines.push('Thanks for the upload.','',
                asked?'Nothing in the title needs changing. I have one thing to confirm before approving:'
                    :'The title checks pass, so nothing here needs correcting.');
        else lines.push(points.length===1?chosen.single:chosen.opening);
        lines.push('');
        if(clean(title))lines.push(clean(title));
        if(url)lines.push(url);
        if(clean(title)||url)lines.push('');
        if(points.length)lines.push(...numbered(points),'');
        if(clean(rewrite)&&chosen.key!=='approved')lines.push('The title in the guide’s form:',clean(rewrite),'');
        // The manual checks are things to confirm, and are never presented as faults.
        if(!asked&&reviews.length&&chosen.key!=='approved') {
            lines.push('Worth confirming as well — these are not necessarily wrong, they just '+
                'cannot be established from the title alone:');
            lines.push(...reviews.map(text=>'- '+text),'');
        }
        lines.push(chosen.closing);
        if(clean(sign))lines.push('','— '+clean(sign));
        // "DarkPeers’s" is not how anyone writes it.
        if(site)lines.push('','(Checked against '+clean(site)+(/s$/i.test(clean(site))?'’':'’s')+' rules.)');
        return lines.join('\n').replace(/\n{3,}/g,'\n\n').trim();
    }
    // Which outcome the findings suggest. It is a starting point, not a decision: the
    // moderator picks, and can pick any of them.
    function suggest(result) {
        const errors=result?.errors?.length||0;
        const banned=(result?.errors||[]).some(issue=>issue.code==='banned-group');
        if(banned)return 'rejected';
        if(errors)return 'changes';
        if(result?.uncertain?.length)return 'question';
        return 'approved';
    }
    return {OUTCOMES,build,suggest};
})();

// A running record of the naming results seen while browsing, so an audit can cover
// several pages. Only pages actually opened are recorded; nothing is fetched, and the
// record is kept in this browser under a bounded, allow-listed shape.
const DKOKTO_AUDIT_STORE = (() => {
    const KEY='dkokto_audit_v1',MAX_ROWS=2000,MAX_FAULTS=12;
    const text=(v,max=400)=>String(v??'').replace(/\s+/g,' ').trim().slice(0,max);
    const idOf=url=>{try{return new URL(url,'https://darkpeers.org').pathname.match(/^\/torrents\/(\d{1,12})\/?$/)?.[1]||'';}catch{return '';}};
    let backing=null;
    const storage=()=>{if(backing)return backing;try{return localStorage;}catch{return null;}};
    const MAX_PAGES=50;
    const valid=row=>!!row&&typeof row.title==='string'&&['error','review','pass'].includes(row.state);
    // Stored as {rows,pages}; an older plain array of rows is still read.
    function read() {
        const store=storage();if(!store)return {rows:[],pages:[]};
        try{
            const parsed=JSON.parse(store.getItem(KEY)||'null');
            if(Array.isArray(parsed))return {rows:parsed.filter(valid).slice(-MAX_ROWS),pages:[]};
            if(!parsed||typeof parsed!=='object')return {rows:[],pages:[]};
            return {rows:(Array.isArray(parsed.rows)?parsed.rows:[]).filter(valid).slice(-MAX_ROWS),
                pages:(Array.isArray(parsed.pages)?parsed.pages:[]).filter(v=>typeof v==='string').slice(-MAX_PAGES)};
        }catch{return {rows:[],pages:[]};}
    }
    function write(state) {
        const store=storage();if(!store)return state;
        try{store.setItem(KEY,JSON.stringify({rows:state.rows.slice(-MAX_ROWS),pages:state.pages.slice(-MAX_PAGES)}));}catch{}
        return state;
    }
    // Rows come from the badges already drawn: title, address, category and result.
    function record(rows=[],{page=''}={}) {
        const incoming=[];
        for(const row of rows) {
            if(!row?.title||!row.result?.state)continue;
            incoming.push({
                id:idOf(row.url||''),url:text(row.url||'',300),title:text(row.title),
                category:text(row.category||'',80),state:row.result.state,
                faults:(row.result.errors||[]).slice(0,MAX_FAULTS).map(issue=>text(issue.message,300)),
                reason:text(row.result.uncertain?.[0]?.message||'',300),page:text(page,300),seen:Date.now()
            });
        }
        if(!incoming.length)return count();
        const state=read(),kept=new Map();
        // Newer readings of the same torrent replace older ones; untracked rows key on title.
        for(const row of [...state.rows,...incoming])kept.set(row.id||('title:'+row.title),row);
        // The pages visited are remembered separately, so re-reading a row keeps the list.
        const seenPages=[...new Set([...state.pages,...(page?[text(page,300)]:[])])];
        write({rows:[...kept.values()],pages:seenPages});
        return kept.size;
    }
    const rows=()=>read().rows.map(row=>({...row,result:{state:row.state,label:row.state==='error'?'Naming errors found':row.state==='pass'?'Title checks passed':'Naming needs review',
        errors:(row.faults||[]).map(message=>({message})),uncertain:row.reason?[{message:row.reason}]:[],review:{issues:[],template:'',service:''}}}));
    const count=()=>read().rows.length;
    const pages=()=>read().pages;
    function clear(){const store=storage();try{store?.removeItem(KEY);}catch{}return 0;}
    return {record,rows,count,pages,clear,use(store){backing=store;},KEY};
})();

// What you decided about a pending torrent, so a sweep down the queue does not repeat
// itself and you can see what you have already handled. A state, a date and your own note,
// kept in this browser, bounded, and never sent anywhere. It records your decision — it
// does not make one, and it changes nothing on the tracker.
const DKOKTO_DECISIONS = (() => {
    const KEY='dkokto_decisions_v1',MAX=400,NOTE=500;
    const STATES=[['','Not decided'],['approved','Approved'],['rejected','Rejected'],['asked','Asked the uploader'],['skipped','Left for someone else']];
    const VALID=new Set(STATES.map(([state])=>state).filter(Boolean));
    const MARK={approved:'✓',rejected:'✕',asked:'✎',skipped:'→'};
    let backing=null;
    const storage=()=>{if(backing)return backing;try{return localStorage;}catch{return null;}};
    // A pending row often has no link, so the release name identifies it when there is no
    // torrent id to go on.
    function idOf(value,title='') {
        const id=String(value??'').match(/\/torrents\/(\d{1,12})(?:[/?#]|$)/);
        if(id)return 't'+id[1];
        const name=String(title||'').trim().replace(/\s+/g,' ').slice(0,160);
        return name?'n'+name:'';
    }
    function read() {
        const store=storage();if(!store)return {};
        try{
            const parsed=JSON.parse(store.getItem(KEY)||'null');
            if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))return {};
            const out={};
            for(const [id,entry] of Object.entries(parsed).slice(-MAX)) {
                if(typeof id!=='string'||id.length>200||!entry||typeof entry!=='object')continue;
                if(!VALID.has(entry.state))continue;
                const at=Number(entry.at);
                out[id]={state:entry.state,at:Number.isFinite(at)&&at>0?at:0,
                    note:typeof entry.note==='string'?entry.note.slice(0,NOTE):'',
                    title:typeof entry.title==='string'?entry.title.slice(0,200):''};
            }
            return out;
        }catch{return {};}
    }
    function write(state) {
        const store=storage();if(!store)return state;
        const entries=Object.entries(state).sort((a,b)=>(a[1].at||0)-(b[1].at||0)).slice(-MAX);
        try{store.setItem(KEY,JSON.stringify(Object.fromEntries(entries)));}catch{}
        return Object.fromEntries(entries);
    }
    // Setting the state to '' forgets the row rather than storing an empty decision.
    function set(id,{state='',note='',title=''}={},when=Date.now()) {
        if(!id)return null;
        const all=read();
        if(!state){delete all[id];write(all);return null;}
        if(!VALID.has(state))return all[id]||null;
        const entry={state,at:when,note:String(note||'').slice(0,NOTE),title:String(title||'').slice(0,200)};
        all[id]=entry;write(all);return entry;
    }
    const get=id=>id?read()[id]||null:null;
    const count=()=>Object.keys(read()).length;
    const clear=()=>{try{storage()?.removeItem(KEY);}catch{}};
    const day=at=>at?new Date(at).toISOString().slice(0,10):'';
    const labelOf=state=>STATES.find(([value])=>value===state)?.[1]||'Not decided';
    // Paste-ready, newest first, for a staff note or your own records.
    function report({page=''}={}) {
        const all=read();
        const rows=Object.entries(all).sort((a,b)=>(b[1].at||0)-(a[1].at||0));
        const lines=['Moderation log · '+rows.length+' recorded'];
        if(page)lines.push('From: '+page);
        lines.push('');
        if(!rows.length)lines.push('Nothing recorded yet.');
        for(const [id,entry] of rows) {
            lines.push(labelOf(entry.state)+' · '+day(entry.at)+' · '+(entry.title||id.replace(/^[tn]/,'')));
            if(entry.note)lines.push('  Note: '+entry.note);
        }
        lines.push('','Your own record, kept in this browser. It changes nothing on the tracker and was never sent anywhere.');
        return lines.join('\n');
    }
    return {STATES,MARK,KEY,idOf,set,get,count,clear,report,day,labelOf,
        all:()=>read(),use(store){backing=store;}};
})();

// Read loaded torrent titles only. No requests, crawling, downloads or tracker writes.
const DKOKTO_LISTING = (() => {
    const selector='a.torrent-search--list__name,a.torrent-card__link,.torrent-card__title a';
    // Panels such as the home page's Top torrents use their own markup, so a link to a
    // torrent whose text reads as a release name is checked as well.
    const loose='a[href*="/torrents/"]';
    // This script's own additions, on any page: watching them would wake the scan again.
    const own='.dk-group-menu,.dk-listing-badge,.dk-listing-decision,.dk-listing-bar,.dk-listing-dialog,.dk-detail-badge,.dk-detail-links,.dk-request-bar,.dk-request-links,.dk-request-open,#dkokto-request-dialog';
    // The chatbox and the ticker change constantly and never hold a listing, so their
    // churn is not a reason to look at the page again (a giveaway or chat script can
    // otherwise keep this awake).
    const noise='.chatbox,#chatbox,[class*="chatbox"],.ticker,[class*="ticker"],[class*="chat-"],#chat';
    const key='dkokto_listing_checks_v1',entries=new Map(),cache=new Map();
    let mounted=false,observer,timer,serial=0,bar,counts,logged,toggle,dialog,returnFocus;
    let enabled=true;try{enabled=localStorage.getItem(key)!=='off';}catch{}
    // The torrent list, and any other page that renders the same release rows
    // (a member's uploads, bookmarks, requests). Detail pages are handled separately.
    // A moderation queue such as /torrents/pending is a listing too. Its table is not
    // always the search table, so on those pages a link whose text reads as a release
    // name is enough. /torrents/<number> is a detail page and is handled separately.
    const SUB=/^\/torrents\/(?!\d+\/?$)[a-z][a-z0-9-]*(?:\/|$)/i;
    // A row's icons are links to the same torrent — comments, bookmark, download — carrying
    // no text or a single glyph. A release name has words and numbers in it, and that is
    // what is required of anything this badges. On a queue the row's own table is the
    // listing, so a name that does not read like a video release (an audiobook, say) still
    // counts — but an icon never does.
    // The badge lives inside the name on pages that render it as a block, so this script's
    // own text has to come out before a link is read — or the tick becomes part of the name
    // and the link stops looking like a release, which took the badge off again on the next
    // pass and put it back on the one after: a blinking badge, five times a second.
    function plainText(node) {
        if(!node)return '';
        // A name is usually plain text, and asking the DOM about it 200 times a pass is not
        // free. No child element means nothing of ours can be inside it.
        if(!node.firstElementChild)return node.textContent||'';
        if(!node.querySelector?.(own))return node.textContent||'';
        let text='';
        for(const child of node.childNodes) {
            if(child.nodeType===1){if(child.matches(own))continue;text+=plainText(child);}
            else if(child.nodeType===3)text+=child.nodeValue;
        }
        return text;
    }
    const readable=node=>{const text=DKOKTO_RELEASE_TITLE.clean(plainText(node));
        // Long enough to be a name, with letters, and either a space or a digit in it:
        // “Comments” and a glyph are neither, while “Unknown Release” and any real release
        // name are both.
        return text.length>=8&&/[A-Za-z]/.test(text)&&(/\s/.test(text)||/\d/.test(text));};
    const named=link=>valid(link)&&readable(link);
    const scores=link=>valid(link)&&DKOKTO_RELEASE_TITLE.score(plainText(link).trim())>0;
    const rowsPresent=()=>!!document.querySelector(selector)||queueTargets().length>0||[...document.querySelectorAll(loose)].some(scores);
    const listingPage=()=>/^\/torrents\/?$/.test(location.pathname)||
        (SUB.test(location.pathname)&&rowsPresent())||
        (/^\/(?:users\/[^/]+|bookmarks|requests|playlists)(?:\/|$)/.test(location.pathname)&&!!document.querySelector(selector));
    // On a queue the name is often plain text rather than a link, because the torrent is
    // not published yet. So there the row itself is the unit: the cell under "Name" is
    // taken, and its link used only if it has one.
    function queueTargets() {
        const found=[];
        for(const table of document.querySelectorAll('table')) {
            if(table.closest(own))continue;
            const head=table.querySelector('thead tr')||table.querySelector('tr');
            const index=head?[...head.children].findIndex(cell=>/^(?:name|title|torrent)$/i.test(cell.textContent.trim())):-1;
            for(const row of table.querySelectorAll('tbody tr')) {
                if(row===head||row.closest(own))continue;
                // A cell that holds a torrent link is the name cell, whatever its index:
                // a rowspan on an earlier column (a Type spanning two rows) shifts every
                // index on the rows below it, so the header position is only a fallback.
                // The name link, not the row's icon links: a comments or bookmark icon often
                // points at the same torrent and carries no text worth checking.
                const link=[...row.querySelectorAll('a')].find(named);
                const cell=link?link.closest('td,th'):row.children[index>=0?index:0];
                if(!cell||cell.tagName==='TH')continue;
                // Without a "Name" header to go on, only a real torrent link makes this a
                // release row: any other table on the page is left alone.
                if(index<0&&!link)continue;
                const target=link||cell;
                if(!target.textContent.trim())continue;
                found.push(target);
            }
        }
        return found;
    }
    function links() {
        const found=new Map();
        if(SUB.test(location.pathname))for(const target of queueTargets())found.set(target,true);
        for(const link of document.querySelectorAll(selector))if(valid(link)&&!link.closest(own))found.set(link,true);
        for(const link of document.querySelectorAll(loose)) {
            if(found.has(link)||!valid(link)||link.closest(own)||link.closest('#dkokto-tools,#dkokto-hub,#dkokto-nav-dialog,#dkokto-game-dialog,.dk-detail-links,.dk-hub'))continue;
            if(DKOKTO_RELEASE_TITLE.score(plainText(link).trim())>0)found.set(link,true);
        }
        // A row cell and the release-name link inside it are the same release. Badging both
        // gives the row two badges, the outer one landing at the end of the cell among the
        // row's own icons. Only the innermost is kept.
        // Nothing with no readable text in it is a release, whichever pass found it.
        for(const node of [...found.keys()])if(!readable(node))found.delete(node);
        const targets=[...found.keys()];
        return targets.filter(node=>{
            if(node.tagName==='A')return true;
            for(const inner of node.querySelectorAll('a'))if(found.has(inner))return false;
            return true;
        });
    }
    const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
    function getCategory(link){const row=link.closest('tr,.torrent-card'),category=row?.querySelector('.torrent-search--list__category,.torrent-card__category');
        const explicit=category?.textContent?.trim()||category?.querySelector('img')?.alt||category?.querySelector('[title]')?.title||'';
        if(explicit)return explicit;
        // A queue table labels its columns in a header row rather than by class, so the
        // cell under "Category" is read by position.
        const column=columnCategory(row);if(column)return column;
        const id=row?.getAttribute('data-category-id');if(id){for(const input of document.querySelectorAll('input[type=checkbox][value]'))if(input.value===id&&input.getAttribute('wire:model.live')==='categoryIds')return input.closest('label')?.textContent?.trim()||'';}
        return '';
    }
    function columnCategory(row) {
        const table=row?.closest?.('table');if(!table)return '';
        const head=table.querySelector('thead tr')||table.querySelector('tr');
        if(!head||head===row)return '';
        const index=[...head.children].findIndex(cell=>/^categor(?:y|ies)$/i.test(cell.textContent.trim()));
        if(index<0)return '';
        return (row.children[index]?.textContent||'').trim().slice(0,60);
    }
    function valid(link){try{const url=new URL(link.getAttribute('href'),location.href);return url.origin===location.origin&&/^\/torrents\/\d+\/?$/.test(url.pathname);}catch{return false;}}
    // Copy to clipboard with a visible result; falls back to a prompt.
    function copyButton(label,build) {
        const button=el('button',label);button.type='button';button.className='dk-listing-copy';
        button.onclick=async()=>{const value=build();
            try{await navigator.clipboard.writeText(value);button.textContent='Copied';setTimeout(()=>button.textContent=label,1400);}
            catch{window.prompt('Copy this text:',value);}};
        return button;
    }
    function explain(entry){if(!dialog){dialog=el('dialog',undefined,'dk-listing-dialog dk-hub');dialog.setAttribute('aria-labelledby','dk-listing-heading');document.body.append(dialog);dialog.addEventListener('close',()=>returnFocus?.isConnected&&returnFocus.focus());}
        returnFocus=entry.badge;dialog.replaceChildren();const head=el('header'),heading=el('h2','Torrent naming check');heading.id='dk-listing-heading';const close=el('button','Close');close.type='button';close.onclick=()=>dialog.close();head.append(heading,close);dialog.append(head);
        const body=el('section',undefined,'dk-hub-content'),r=entry.result;body.append(el('h3',entry.title),el('p',r.label),
            ...(entry.composed?[el('p','This page lists the release without the media title, so “'+entry.composed+'” was taken from the page heading and checked with it.')]:[]),el('p','Loaded title only · '+(entry.category||'category inferred from title')+'. Green means supported title checks passed, not verified media or tracker approval.'));
        if(!r.confident)body.append(el('p','The category is uncertain. Open the torrent and choose the correct naming category in Inspector before treating any finding as an error.'));
        for(const [kind,title]of [['error','Corrections'],['review','Manual checks']]){const issues=r.review.issues.filter(i=>i.severity===kind);if(issues.length){body.append(el('h3',title));const list=el('ul');for(const issue of issues)list.append(el('li',issue.message.replace('Add a reference title below to compare spelling.','Open Inspector to add a reference title and compare spelling.')));body.append(list);}}
        if(r.review.template)body.append(el('h3','Template'),el('p',r.review.template));
        // A pending row is often not a link yet, so there is nothing to open.
        const url=entry.link.href||'';
        if(url){const link=el('a','Open torrent for MediaInfo / Inspector');link.href=url;body.append(link);}
        body.append(copyButton('Copy report text',()=>DKOKTO_REPORT.report({title:entry.title,url,category:entry.category,result:r})));
        body.append(replySection(entry,url));
        dialog.append(body);if(!dialog.open)dialog.showModal();
    }
    function ensureBar(){if(!listingPage())return;const root=document.querySelector('.torrent-search__results')||document.querySelector('.torrent-search__component')||document.querySelector('main');if(!root)return;
        if(bar?.isConnected)return;bar=el('div',undefined,'dk-listing-bar');const label=el('label'),input=el('input');input.type='checkbox';input.checked=enabled;input.setAttribute('aria-label','Automatic torrent naming checks');toggle=input;label.append(input,document.createTextNode('Automatic naming checks'));input.onchange=()=>{enabled=input.checked;try{localStorage.setItem(key,enabled?'on':'off');}catch{}scan();};
        const audit=el('button','Audit loaded titles');audit.type='button';audit.className='dk-listing-audit';audit.setAttribute('aria-haspopup','dialog');
        audit.onclick=showAudit;
        // The moderation log, when there is one to show.
        const log=el('span',undefined,'dk-listing-log');
        const logCopy=el('button','Copy moderation log');logCopy.type='button';logCopy.className='dk-listing-copy';
        logCopy.onclick=async()=>{const text=DKOKTO_DECISIONS.report({page:location.origin+location.pathname});
            try{await navigator.clipboard.writeText(text);logCopy.textContent='Copied';setTimeout(()=>logCopy.textContent='Copy moderation log',1500);}
            catch{window.prompt('Copy the log:',text);}};
        const logClear=el('button','Clear log');logClear.type='button';logClear.className='dk-listing-copy';
        logClear.onclick=()=>{if(!window.confirm('Forget every recorded decision? This only clears your own record.'))return;
            DKOKTO_DECISIONS.clear();scan();};
        log.append(logCopy,logClear);
        // Which tracker's rules the badges are applying, switchable from here.
        const rules=el('label','Rules','dk-listing-rules'),picker=el('select');
        picker.setAttribute('aria-label','Which tracker’s rules to check against');
        const fill=()=>{picker.replaceChildren();
            for(const entry of DKOKTO_RULES.list()){const option=el('option',entry.label);option.value=entry.key;picker.append(option);}
            picker.value=DKOKTO_RULES.current();};
        fill();
        const recheck=()=>{cache.clear();for(const [,entry] of entries)entry.signature='';scan();};
        picker.onchange=()=>{DKOKTO_RULES.choose(picker.value);recheck();};
        rules.append(picker);
        // Add a tracker of your own, as rules rather than as code.
        const groupsButton=el('button','Internal groups…');groupsButton.type='button';groupsButton.className='dk-listing-groups-edit';
        groupsButton.setAttribute('aria-haspopup','dialog');
        groupsButton.title='Which tracker each release group is internal to — your own list';
        groupsButton.onclick=()=>DKOKTO_GROUP_TAG.editor(()=>{for(const node of document.querySelectorAll('.'+DKOKTO_GROUP_TAG.MENU))node.remove();});
        rules.append(groupsButton);
        const manage=el('button','Tracker rules…');manage.type='button';manage.className='dk-listing-rules-edit';
        manage.setAttribute('aria-haspopup','dialog');
        manage.title='Add a tracker by pasting its rules';
        manage.onclick=()=>DKOKTO_PROFILES_UI.open(()=>{fill();recheck();});
        rules.append(manage);
        const legend=el('span','✕ Naming error · ✓ Title checks pass · ? Review needed');counts=el('span');counts.setAttribute('role','status');counts.setAttribute('aria-live','polite');bar.append(label,rules,legend,audit,log,el('small','Loaded titles only. Click a badge for details; media and source history are not verified.'),counts);
        logged=el('span');logged.setAttribute('role','status');bar.append(logged);root.prepend(bar);
    }
    function auditRows() {
        const rows=[];
        for(const [link,entry] of entries)if(link.isConnected)rows.push({title:entry.title,url:link.href||'',category:entry.category,result:entry.result});
        return rows;
    }
    function showAudit() {
        const rows=auditRows(),here=location.origin+location.pathname+location.search;
        const text=DKOKTO_REPORT.audit(rows,{page:here});
        if(!dialog){dialog=el('dialog',undefined,'dk-listing-dialog dk-hub');dialog.setAttribute('aria-labelledby','dk-listing-heading');document.body.append(dialog);
            dialog.addEventListener('close',()=>returnFocus?.isConnected&&returnFocus.focus());}
        returnFocus=bar?.querySelector('.dk-listing-audit')||null;dialog.replaceChildren();
        const head=el('header'),heading=el('h2','Naming audit · loaded titles');heading.id='dk-listing-heading';
        const close=el('button','Close');close.type='button';close.onclick=()=>dialog.close();head.append(heading,close);dialog.append(head);
        const body=el('section',undefined,'dk-hub-content'),report=el('pre',text);
        body.append(el('p','Every release title loaded on this page, with the corrections and the manual checks each one needs. Nothing is reported or sent: copy the text and use it yourself.'),
            copyButton('Copy audit',()=>text),report);
        // Everything checked while browsing, so an audit can span several pages.
        const collected=DKOKTO_AUDIT_STORE.count();
        const kept=el('section');kept.append(el('h3','Collected while browsing ('+collected+')'));
        kept.append(el('p',collected?'Results from '+DKOKTO_AUDIT_STORE.pages().length+' page'+(DKOKTO_AUDIT_STORE.pages().length===1?'':'s')+' you have opened in this browser. Pages are only recorded when you open them; nothing is fetched in the background.':'Nothing collected yet. Open more pages of a listing and they are added here.'));
        const actions=el('div',undefined,'dk-row');
        if(collected) {
            actions.append(copyButton('Copy collected audit',()=>DKOKTO_REPORT.audit(DKOKTO_AUDIT_STORE.rows(),{page:DKOKTO_AUDIT_STORE.pages().join(' · '),title:'Naming audit · collected'})));
            const clear=el('button','Clear collected');clear.type='button';clear.className='dk-listing-copy';
            clear.onclick=()=>{DKOKTO_AUDIT_STORE.clear();dialog.close();};
            actions.append(clear);
        }
        kept.append(actions);body.append(kept);
        dialog.append(body);if(!dialog.open)dialog.showModal();
    }
    // A badge sits after a release-name link, but inside the cell when the name is plain
    // text: putting it after a <td> would land it in the next column.
    const ELLIPSIS=/(?:…|\.\.\.)$/;
    const inCell=target=>target.tagName==='TD'||target.tagName==='TH';
    // A badge normally follows the release-name link. Some pages render that name as a
    // block — the season-grouped "similar titles" page does — so a badge placed after it
    // lands on the next line, over the row below. Where that happens the badge rides
    // inside the name itself, where it cannot wrap away from the text it belongs to.
    const inside=(target,badge)=>badge.dataset.inside==='yes'&&badge.parentElement===target;
    const placed=(target,badge)=>badge.dataset.lead==='yes'?badge.nextElementSibling===target
        :inCell(target)||badge.dataset.inside==='yes'?badge.parentElement===target
        :badge.previousElementSibling===target;
    const place=(target,badge)=>{
        if(badge.dataset.lead==='yes')target.before(badge);
        else if(inCell(target)||badge.dataset.inside==='yes')target.append(badge);
        else target.after(badge);};
    // The nearest ancestor that clips what overflows it, which is what hides a badge sitting
    // after a long release name that the row shortens with an ellipsis.
    function clipper(node) {
        for(let el=node?.parentElement;el&&el!==document.body;el=el.parentElement) {
            const style=getComputedStyle(el);
            if(/hidden|clip|auto|scroll/.test(style.overflowX)||/ellipsis/.test(style.textOverflow))return el;
        }
        return null;
    }
    // Measured once, after the browser has laid the row out, and only for a badge that has
    // just been added: measuring every pass would force a reflow for every row.
    let settling=[],settleQueued=false;
    function settle(target,badge) {
        if(inCell(target)||inside(target,badge)||badge.dataset.lead==='yes'||!badge.isConnected)return;
        const name=target.getBoundingClientRect(),mark=badge.getBoundingClientRect();
        if(!name.height||!mark.height)return;
        // Clipped out of sight by a row that shortens a long name: the badge leads the name
        // instead, where nothing can cut it off.
        const box=clipper(target)?.getBoundingClientRect();
        if(box&&(mark.right>box.right+1||mark.left>=box.right-1||!mark.width)) {
            badge.dataset.lead='yes';target.before(badge);return;
        }
        if(mark.top>=name.bottom-1){badge.dataset.inside='yes';target.append(badge);}
    }
    function settleSoon(target,badge) {
        settling.push([target,badge]);
        if(settleQueued)return;
        settleQueued=true;
        const run=()=>{settleQueued=false;const queue=settling;settling=[];for(const [t,b] of queue)settle(t,b);};
        if(typeof requestAnimationFrame==='function')requestAnimationFrame(run);else setTimeout(run,0);
    }
    // The badge lives inside the name cell, so its own ✕/✓/? must not be read back as part
    // of the release name: that corrupted the title on every pass after the first.
    const titleOf=target=>{
        // Anything this script added inside the name — the badge, the decision control — is
        // not part of the release name.
        let text='';
        if(!inCell(target)&&(!target.firstElementChild||!target.querySelector?.(own)))text=target.textContent;
        else for(const node of target.childNodes)
            if(!(node.nodeType===1&&node.matches?.(own)))text+=node.textContent;
        const shown=DKOKTO_RELEASE_TITLE.clean(text);
        // Some pages shorten a long release name in the markup itself. Where the full name
        // is on the element as a title attribute, that is the one to check; otherwise the
        // shortened form is returned as it stands and is not judged as if it were whole.
        if(!ELLIPSIS.test(shown))return shown;
        const full=DKOKTO_RELEASE_TITLE.clean(target.getAttribute?.('title')||target.getAttribute?.('aria-label')||'');
        return full&&!ELLIPSIS.test(full)&&full.length>=shown.length-3?full:shown;
    };
    // On a moderation queue each row also carries what you decided about it. The control
    // is only added there: elsewhere a listing is not something you are deciding on.
    // A moderation queue, and not merely a page under /torrents/: a movie's own page groups
    // releases the same way but is nothing you are deciding on, and a control on every row
    // there is in the way.
    const QUEUE=/^\/torrents\/(?:pending|rejected|postponed|unapproved|moderation)(?:\/|$)/i;
    const queuePage=()=>QUEUE.test(location.pathname);
    let logNow=null;
    const logged_=id=>logNow?logNow[id]||null:DKOKTO_DECISIONS.get(id);
    function decisionControl(link,title,badge) {
        let control=badge.nextElementSibling?.classList?.contains('dk-listing-decision')?badge.nextElementSibling:null;
        // Off a queue, a row is not something you are deciding on, so any control from one
        // goes with it rather than lingering on an ordinary listing.
        if(!queuePage()){control?.remove();return;}
        const id=DKOKTO_DECISIONS.idOf(link.getAttribute?.('href')||link.href||'',title);
        if(!id)return;
        if(!control) {
            control=el('label',undefined,'dk-listing-decision');
            const select=el('select');select.setAttribute('aria-label','What you decided about '+title);
            for(const [value,text] of DKOKTO_DECISIONS.STATES){const option=el('option',text);option.value=value;select.append(option);}
            const mark=el('span',undefined,'dk-decision-mark');
            control.append(select,mark);
            select.onchange=()=>{
                const note=select.value==='rejected'||select.value==='asked'
                    ?window.prompt('A note for your own record (optional):','')||'':'';
                DKOKTO_DECISIONS.set(id,{state:select.value,note,title});
                logNow=null;paint();updateCounts();
            };
            badge.after(control);
        }
        const select=control.querySelector('select'),mark=control.querySelector('.dk-decision-mark');
        const paint=()=>{
            const current=logged_(id);
            if(select.value!==(current?.state||''))select.value=current?.state||'';
            const text=current?DKOKTO_DECISIONS.MARK[current.state]+' '+DKOKTO_DECISIONS.day(current.at):'';
            if(mark.textContent!==text)mark.textContent=text;
            const state=current?.state||'';
            if(control.dataset.state!==state)control.dataset.state=state;
            if(mark.title!==(current?.note||''))mark.title=current?.note||'';
        };
        paint();
    }
    // A movie's or show's own page lists its releases with the media title left off the row,
    // so the row alone cannot be judged. The heading carries it, and the two together are
    // the release name — which is what gets checked, and what the badge says it checked.
    const PART_ONLY=/^(?:\d{3,4}[pi]|Hybrid|REMUX|WEB-?DL|WEBRip|Blu-?Ray|BDMV|HDTV|UHDTV|SDTV|DVD)(?=$|[ ._-])/i;
    let headingAt=0,headingWas='';
    function mediaTitle() {
        const now=Date.now();
        if(now-headingAt<1000)return headingWas;
        headingAt=now;
        const heading=[...document.querySelectorAll('h1,h2,.torrent-search__title,.meta__title')]
            .map(node=>node.closest(own)?'':DKOKTO_RELEASE_TITLE.clean(node.textContent))
            .find(text=>/^[^\n]{2,120}$/.test(text)&&/\((?:18|19|20)\d{2}\)\s*$/.test(text));
        headingWas=heading?heading.replace(/\s*\(((?:18|19|20)\d{2})\)\s*$/,' $1'):'';
        return headingWas;
    }
    function fullName(shown) {
        if(!PART_ONLY.test(shown))return {title:shown,composed:''};
        const media=mediaTitle();
        return media?{title:media+' '+shown,composed:media}:{title:shown,composed:''};
    }
    function assess(link){const shownTitle=titleOf(link);
        const {title,composed}=fullName(shownTitle);
        const category=getCategory(link),signature=title+'\n'+category;let entry=entries.get(link);
        if(entry?.signature===signature&&entry.badge.isConnected&&placed(link,entry.badge))return;
        let result=cache.get(signature);if(!result){result=DKOKTO_LISTING_CORE.assess(title,category);cache.set(signature,result);if(cache.size>500)cache.delete(cache.keys().next().value);}
        if(!entry){const badge=el('button',undefined,'dk-listing-badge');badge.type='button';badge.setAttribute('aria-haspopup','dialog');entry={link,badge};badge.onclick=e=>{e.preventDefault();e.stopPropagation();explain(entry);};entries.set(link,entry);}
        Object.assign(entry,{title,category,signature,result,shownTitle,composed});entry.badge.dataset.state=result.state;entry.badge.textContent=result.state==='error'?'✕':result.state==='pass'?'✓':'?';
        // A banned release group is marked as such, not just as an error.
        const banned=result.errors.some(issue=>issue.code==='banned-group')?'yes':'no';
        if(entry.badge.dataset.banned!==banned)entry.badge.dataset.banned=banned;
        const detail=result.state==='error'?result.errors.map(i=>i.message).join('\n'):result.state==='review'?(result.uncertain[0]?.message||'Insufficient category/title information.'):'No errors in supported title checks. Media and source claims remain unverified.';
        entry.badge.title=result.label+(composed?'\nChecked as: '+title:'')+'\n'+detail;entry.badge.setAttribute('aria-label',result.label+' for '+title+'. Click for details.');const fresh=!entry.badge.isConnected;
        if(fresh||!placed(link,entry.badge))place(link,entry.badge);
        if(fresh)settleSoon(link,entry.badge);
        // The group tag, marked in the name itself — and left alone where another script has
        // already made it a link.
        const tag=DKOKTO_GROUPS.tags(shownTitle)[0]||'';
        if(tag)DKOKTO_GROUP_TAG.mark(link,tag);
    }
    // A message to the uploader, written from what the check already found. It is a draft:
    // it opens in a box you can edit before copying, and nothing is sent from here.
    function replySection(entry,url) {
        const wrap=el('details',undefined,'dk-reply');
        wrap.append(el('summary','Reply to the uploader'));
        const site=DKOKTO_RULES.labelOf(DKOKTO_RULES.current());
        let outcome=DKOKTO_REPLY.suggest(entry.result);
        const choices=el('div',undefined,'dk-row');
        const area=el('textarea');area.rows=12;area.className='dk-reply-text';
        area.setAttribute('aria-label','Draft reply to the uploader');
        const write=()=>{area.value=DKOKTO_REPLY.build(entry.result,{title:entry.title,url,outcome,site});};
        for(const choice of DKOKTO_REPLY.OUTCOMES) {
            const button=el('button',choice.label);button.type='button';button.className='dk-reply-choice';
            button.setAttribute('aria-pressed',String(choice.key===outcome));
            button.onclick=()=>{outcome=choice.key;
                for(const other of choices.children)other.setAttribute('aria-pressed',String(other===button));
                write();};
            choices.append(button);
        }
        write();
        wrap.append(el('p','Suggested from what the check found — pick a different outcome if you disagree. Edit the text before you send it: it is a draft, not a verdict, and nothing is sent from here.'),
            choices,area,copyButton('Copy reply',()=>area.value));
        return wrap;
    }
    function updateCounts(loading=false){if(!counts)return;const total={error:0,pass:0,review:0};for(const [link,e]of entries)if(link.isConnected)total[e.result.state]++;
        if(logged){const recorded=DKOKTO_DECISIONS.count();
            const text=recorded?recorded+' decision'+(recorded===1?'':'s')+' recorded in this browser':'';
            if(logged.textContent!==text)logged.textContent=text;}
        counts.textContent=enabled?(loading?'Checking loaded titles… ':entries.size?`${total.error} errors · ${total.pass} passed · ${total.review} need review`:'No release titles found. Use List or Card view; grouped posters may only show a show/movie name.'):'Checks disabled';}
    function scan(){clearTimeout(timer);timer=null;scannedAt=Date.now();const run=++serial;
        const list=links(),active=listingPage()||!!list.length;
        // A row is only something you decide on while you are on a queue. Leaving one takes
        // the controls with it, including on rows whose badge has not otherwise changed.
        logNow=queuePage()?DKOKTO_DECISIONS.all():null;
        if(!queuePage())for(const node of document.querySelectorAll('.dk-listing-decision'))node.remove();
        const live=new Set(active&&enabled?list:[]);
        for(const [link,e]of entries)if(!live.has(link)||!link.isConnected){e.badge.remove();entries.delete(link);}
        if(!listingPage())bar?.remove();
        if(!active){dialog?.close();return;}ensureBar();if(!enabled){updateCounts();return;}
        updateCounts(true);let index=0;const targets=list;
        function batch(){if(run!==serial||!enabled)return;
            for(let count=0;index<targets.length&&count<25;index++,count++) {
                const target=targets[index];
                if(!target.isConnected)continue;
                assess(target);
                // Kept in step even when the badge itself did not change, so coming back to
                // a queue restores the controls rather than leaving the rows bare.
                const entry=entries.get(target);
                if(entry)decisionControl(target,entry.title,entry.badge);
            }
            if(index<targets.length)setTimeout(batch,0);else {updateCounts();DKOKTO_AUDIT_STORE.record(auditRows(),{page:location.origin+location.pathname+location.search});}}
        batch();
    }
    // Pages that refresh themselves — the home page's comment panels, /torrents/similar —
    // replace their rows wholesale, taking every badge with them. Waiting the usual debounce
    // to put them back is what you see as a flicker. When the change is our own badges being
    // torn out, the row is judged again on the next frame instead. Rate-limited, so a page
    // rewriting itself continuously falls back to the ordinary debounce.
    let scannedAt=0;
    function schedule(restore=false) {
        if(restore&&Date.now()-scannedAt>200) {
            clearTimeout(timer);timer=null;
            if(typeof requestAnimationFrame==='function')requestAnimationFrame(()=>{if(!timer)scan();});
            else scan();
            return;
        }
        if(timer)return;timer=setTimeout(scan,180);
    }
    // On a busy page this guard ran a whole-document query for every batch of changes;
    // the answer barely moves, so it is re-asked at most twice a second.
    let looseAt=0,looseFound=false;
    const anyTorrentLink=()=>{const now=Date.now();if(now-looseAt>500){looseFound=!!document.querySelector(loose);looseAt=now;}return looseFound;};
    function mount(){if(mounted)return;mounted=true;scan();observer=new MutationObserver(records=>{if(!listingPage()&&!entries.size&&!bar?.isConnected&&!anyTorrentLink())return;const relevant=records.some(r=>{const node=r.target.nodeType===1?r.target:r.target.parentElement;if(!node||node.closest(own)||node.closest(noise))return false;
            if(r.type==='attributes')return node.matches(selector)||node.closest('.torrent-search__results,.torrent-search__component');
            if(r.type==='characterData')return !!node.closest(selector+',.torrent-search--list__category,.torrent-card__category');
            return [...r.removedNodes].some(n=>n.nodeType===1)||[...r.addedNodes].some(n=>n.nodeType===1&&!n.matches(own))||node.matches(selector);
            // Our own badge being carried off by a re-render, rather than an ordinary change.
            });const lost=records.some(r=>[...r.removedNodes].some(n=>n.nodeType===1&&(n.matches?.(own)||n.querySelector?.(own))));
            if(relevant)schedule(lost);});observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['href','data-category-id','alt']});
        window.addEventListener('popstate',schedule);document.addEventListener('livewire:navigated',schedule);
    }
    return {mount};
})();

// Pure address building for release lookups. No requests, no IDs invented: an ID is
// used only when the page already shows it, otherwise the link is a plain search.
const DKOKTO_LINKS_CORE = (() => {
    const TECH=/(?:^|[ ._])(?:(?:360|480|576|720|1080|2160|4320)[pi]|S\d{2}(?:E\d{2})?|(?:19|20)\d{2}-\d{2}(?:-\d{2})?|WEB-?DL|WEBRip|Blu-?Ray|REMUX|UHDTV|HDTV|SDTV|DVDRip|DVD[59]|NTSC|PAL|COMPLETE)(?=$|[ ._-])/i;
    const clean=s=>String(s||'').normalize('NFKC').replace(/[’']/g,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
    function parse(name) {
        const s=String(name||'').normalize('NFKC').trim();
        if(!s)return {title:'',year:'',season:'',episode:'',query:''};
        const cut=s.search(TECH);
        let head=(cut>0?s.slice(0,cut):s).trim();
        // Music: Artist - Album (Year) - Format
        const music=s.match(/^(.+?)\s-\s(.+?)\s\((?:18|19|20)(\d{2})\)\s-\s/);
        if(music)head=music[1]+' '+music[2];
        const episode=s.match(/(?:^|[ ._])S(\d{2})(?:E(\d{2}))?(?=$|[ ._-])/i);
        const years=[...head.matchAll(/(?:^|[ ._(])((?:18|19|20)\d{2})(?=$|[ ._)])/g)];
        const year=years.at(-1)?.[1]||'';
        if(year)head=head.slice(0,years.at(-1).index).trim();
        // Drop an AKA / alternative title and trailing separators.
        head=head.replace(/\s+AKA\s+.*$/i,'').replace(/[-–(\s]+$/,'').trim();
        return {title:head,year,season:episode?.[1]||'',episode:episode?.[2]||'',query:clean(head)};
    }
    const q=v=>encodeURIComponent(v);
    // ids: only what the page already links to.
    function links(name,{ids={},category=''}={}) {
        const p=parse(name),out=[],term=p.query||clean(name),tv=/tv|show|series|anime/i.test(category)||!!p.season;
        const anime=/anime/i.test(category),music=/music|audio\s*book|podcast/i.test(category),book=/book/i.test(category),game=/game|software|app/i.test(category);
        const add=(key,label,url,note='')=>{if(url)out.push({key,label,url,note});};
        if(!term)return out;
        const withYear=p.year?term+' '+p.year:term;
        add('dp','Search DarkPeers','/torrents?name='+q(term),'This tracker, same title');
        if(ids.imdb)add('imdb','IMDb','https://www.imdb.com/title/'+q(ids.imdb)+'/','From the ID on this page');
        else if(!music&&!book&&!game)add('imdb','IMDb','https://www.imdb.com/find/?q='+q(withYear)+'&s=tt');
        if(ids.tmdb&&(tv||!music))add('tmdb','TMDB','https://www.themoviedb.org/'+(tv?'tv':'movie')+'/'+q(ids.tmdb),'From the ID on this page');
        else if(!music&&!book&&!game)add('tmdb','TMDB','https://www.themoviedb.org/search?query='+q(withYear));
        if(tv&&!anime)ids.tvdb?add('tvdb','TVDb',/^\d+$/.test(ids.tvdb)?'https://thetvdb.com/dereferrer/series/'+q(ids.tvdb):'https://thetvdb.com/series/'+q(ids.tvdb),'From the ID on this page')
            :add('tvdb','TVDb','https://thetvdb.com/search?query='+q(term));
        if(anime)add('mal','MyAnimeList','https://myanimelist.net/search/all?q='+q(term));
        if(!music&&!book&&!game)add('trakt','Trakt','https://trakt.tv/search?query='+q(term));
        if(!tv&&!music&&!book&&!game&&!anime)add('letterboxd','Letterboxd','https://letterboxd.com/search/'+q(withYear)+'/');
        if(!music&&!book&&!game)add('justwatch','JustWatch','https://www.justwatch.com/us/search?q='+q(term),'Where it streams officially');
        if(!music&&!book&&!game)add('bluray','Blu-ray.com','https://www.blu-ray.com/search/?quicksearch=1&quicksearch_keyword='+q(ids.imdb||term)+'&section=theatrical',
            ids.imdb?'From the ID on this page':'');
        if(music)add('musicbrainz','MusicBrainz','https://musicbrainz.org/search?query='+q(term)+'&type=release');
        if(book)add('openlibrary','Open Library','https://openlibrary.org/search?q='+q(term));
        if(game)add('igdb','IGDB','https://www.igdb.com/search?type=1&q='+q(term));
        add('srrdb','srrDB','https://www.srrdb.com/browse/'+term.split(' ').filter(Boolean).map(q).join('/')+'/1','Scene release records');
        return out;
    }
    // Tracker searches for other versions of the same title. The site's name filter is
    // what does the matching; these only assemble the words, and every address stays
    // on this site. A search finding nothing is not evidence that nothing exists.
    function variants(name,{category=''}={}) {
        const p=parse(name),term=p.query||clean(name);
        if(!term||/music|book|game|software/i.test(category))return [];
        const s=String(name||'');
        const has=token=>new RegExp('(?:^|[ ._])'+token+'(?=$|[ ._-])','i').test(s);
        const out=[{key:'all',label:'All versions',url:'/torrents?name='+q(term),note:'Every release of this title on the tracker'}];
        const add=(key,label,token)=>{if(!has(token.replace(/\\/g,'')))out.push({key,label,url:'/torrents?name='+q(term+' '+label),note:'Tracker search: title plus '+label});};
        add('2160p','2160p','2160p');
        add('1080p','1080p','1080p');
        add('remux','REMUX','REMUX');
        add('bluray','BluRay','Blu-?Ray');
        add('webdl','WEB-DL','WEB-?DL');
        return out.slice(0,6);
    }
    function ids(doc) {
        const found={};
        for(const a of doc?.querySelectorAll?.('a[href]')||[]) {
            const href=a.getAttribute('href')||'';
            found.imdb??=href.match(/imdb\.com\/title\/(tt\d{6,10})/i)?.[1];
            found.tmdb??=href.match(/themoviedb\.org\/(?:movie|tv)\/(\d{1,9})/i)?.[1];
            found.tvdb??=href.match(/thetvdb\.com\/(?:dereferrer\/series\/|series\/)([A-Za-z0-9-]{1,60})/i)?.[1]
                ||href.match(/thetvdb\.com\/[^"']*?[?&]id=(\d{1,9})/i)?.[1];
        }
        for(const key of Object.keys(found))if(!found[key])delete found[key];
        return found;
    }
    return {parse,links,variants,ids};
})();

// Torrent detail page: the same naming badge used on the listing, plus a row of
// lookup links built from the title and the IDs already shown on the page.
// Reads the loaded page only; no requests, submissions or downloads.
const DKOKTO_DETAIL = (() => {
    let mounted=false,dialog,returnFocus,timer;
    const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
    const onPage=()=>/^\/torrents\/\d+\/?$/.test(location.pathname);
    // The page's first heading is the media title ("Shiny Happy People (2023)");
    // the release name sits elsewhere, so it is located by its own shape.
    const found=()=>DKOKTO_RELEASE_TITLE.find(document);
    function category() {
        const node=document.querySelector('.torrent__category,.meta__category,[class*="category"]');
        return node?.textContent?.trim()||document.querySelector('.torrent__meta-item img[alt]')?.getAttribute('alt')||'';
    }
    function explain(entry) {
        if(!dialog){dialog=el('dialog',undefined,'dk-listing-dialog dk-hub');dialog.setAttribute('aria-labelledby','dk-detail-heading');document.body.append(dialog);
            dialog.addEventListener('close',()=>returnFocus?.isConnected&&returnFocus.focus());}
        returnFocus=entry.badge;dialog.replaceChildren();
        const head=el('header'),heading=el('h2','Torrent naming check');heading.id='dk-detail-heading';
        const close=el('button','Close');close.type='button';close.onclick=()=>dialog.close();head.append(heading,close);dialog.append(head);
        const body=el('section',undefined,'dk-hub-content'),r=entry.result;
        body.append(el('h3',entry.title),el('p',r.label),el('p','Display title only · '+(entry.category||'category inferred from title')+'. Green means the supported title checks passed, not verified media or tracker approval.'));
        if(r.review.service)body.append(el('p','Service: '+r.review.service));
        for(const [kind,label] of [['error','Corrections'],['review','Manual checks']]) {
            const issues=r.review.issues.filter(i=>i.severity===kind);
            if(!issues.length)continue;
            body.append(el('h3',label));const list=el('ul');for(const issue of issues)list.append(el('li',issue.message));body.append(list);
        }
        if(r.review.template)body.append(el('h3','Template'),el('p',r.review.template));
        const open=el('button','Open Inspector for MediaInfo and notes');open.type='button';
        // Whichever shell is installed: the full toolkit, or the standalone inspector.
        open.onclick=()=>{dialog.close();
            if(typeof DKOKTO_WORKBENCH!=='undefined')DKOKTO_WORKBENCH.open('Inspector');
            else if(typeof DPTI_HOST!=='undefined')DPTI_HOST.open();};
        const copy=el('button','Copy report text');copy.type='button';copy.className='dk-listing-copy';
        copy.onclick=async()=>{const value=DKOKTO_REPORT.report({title:entry.title,url:location.origin+location.pathname,category:entry.category,result:r});
            try{await navigator.clipboard.writeText(value);copy.textContent='Copied';setTimeout(()=>copy.textContent='Copy report text',1400);}
            catch{window.prompt('Copy this text:',value);}};
        body.append(open,copy);dialog.append(body);if(!dialog.open)dialog.showModal();
    }
    function badge(node,title) {
        const result=DKOKTO_LISTING_CORE.assess(title,category());
        let entry=node._dkDetail;
        if(!entry){const button=el('button',undefined,'dk-listing-badge dk-detail-badge');button.type='button';button.setAttribute('aria-haspopup','dialog');
            entry={badge:button};node._dkDetail=entry;button.onclick=()=>explain(entry);}
        Object.assign(entry,{title,category:category(),result});
        // Only write when something actually changed: rewriting the badge on every pass
        // is itself a page change, which would wake this module again in a loop.
        const glyph=result.state==='error'?'✕':result.state==='pass'?'✓':'?';
        if(entry.badge.dataset.state!==result.state)entry.badge.dataset.state=result.state;
        if(entry.badge.textContent!==glyph)entry.badge.textContent=glyph;
        const banned=result.errors.some(issue=>issue.code==='banned-group')?'yes':'no';
        if(entry.badge.dataset.banned!==banned)entry.badge.dataset.banned=banned;
        const hint=result.label+'\n'+(result.state==='error'?result.errors.map(i=>i.message).join('\n'):result.state==='review'?(result.uncertain[0]?.message||'Insufficient category/title information.'):'No errors in the supported title checks.');
        if(entry.badge.title!==hint)entry.badge.title=hint;
        if(entry.badge.getAttribute('aria-label')!==result.label+'. Click for details.')entry.badge.setAttribute('aria-label',result.label+'. Click for details.');
        if(!entry.badge.isConnected)node.append(document.createTextNode(' '),entry.badge);
        // The group tag, marked in the name itself, opening where it is listed as internal.
        // Left alone where another script has already made it a link.
        try{const tag=DKOKTO_GROUPS.tags(title)[0]||'';if(tag)DKOKTO_GROUP_TAG.mark(node,tag);}catch{}
    }
    function linksRow(node,title) {
        // The request cross-check borrows the same row styling; those rows are not ours.
        const existing=document.querySelector('.dk-detail-links:not(.dk-detail-versions):not(.dk-request-links):not(.dk-detail-page)');
        const list=DKOKTO_LINKS_CORE.links(title,{ids:DKOKTO_LINKS_CORE.ids(document),category:category()});
        const signature=title+'\n'+list.map(l=>l.url).join('|');
        if(existing){if(existing.dataset.signature===signature)return;existing.remove();}
        if(!list.length)return;
        const row=el('nav',undefined,'dk-detail-links');row.dataset.signature=signature;row.setAttribute('aria-label','Release lookups');
        row.append(el('span','Look up:','dk-detail-links-label'));
        for(const link of list) {
            const a=el('a',link.label);a.href=link.url;a.title=(link.note?link.note+' · ':'')+'Opens '+link.label;
            if(link.url.startsWith('https://')){a.target='_blank';a.rel='noopener noreferrer';}
            if(link.note?.startsWith('From the ID'))a.dataset.exact='yes';
            row.append(a);
        }
        const copy=el('button','Copy title');copy.type='button';copy.className='dk-detail-copy';
        copy.onclick=async()=>{try{await navigator.clipboard.writeText(title);copy.textContent='Copied';setTimeout(()=>copy.textContent='Copy title',1200);}
            catch{window.prompt('Copy this release title:',title);}};
        row.append(copy);
        (node.parentElement||node).insertBefore(row,node.nextSibling);
        versionsRow(row,title);
    }
    // Other versions of the same title on this tracker: is there already something better?
    function versionsRow(after,title) {
        document.querySelector('.dk-detail-versions')?.remove();
        const list=DKOKTO_LINKS_CORE.variants(title,{category:category()});
        if(list.length<2)return;
        const row=el('nav',undefined,'dk-detail-links dk-detail-versions');row.setAttribute('aria-label','Other versions on this tracker');
        row.append(el('span','Other versions:','dk-detail-links-label'));
        for(const link of list) {
            const a=el('a',link.label);a.href=link.url;a.title=link.note+' · the tracker\u2019s own search does the matching';row.append(a);
        }
        after.after(row);
    }
    // --- What the page itself says ------------------------------------------------------
    // Read where UNIT3D puts it, with a fallback that looks for the same thing by shape, so
    // a theme that renames a class does not silently turn every check off.
    const textOf=node=>node?DKOKTO_RELEASE_TITLE.clean(node.textContent):'';
    function panelWith(word) {
        for(const panel of document.querySelectorAll('section.panelV2,div.panelV2,section,div')) {
            if(panel.closest(OURS))continue;
            const heading=panel.querySelector(':scope > .panel__heading,:scope > h2,:scope > header h2');
            if(heading&&new RegExp('\\b'+word+'\\b','i').test(heading.textContent||''))return panel;
        }
        return null;
    }
    const fieldOf=(...selectors)=>{
        for(const selector of selectors){const node=document.querySelector(selector);if(node&&!node.closest(OURS))return textOf(node);}
        return '';
    };
    function mediaOf() {
        const heading=fieldOf('h1.meta__title','.meta__title','.torrent__meta-title');
        const match=heading.match(/^(.*?)\s*\((\d{4})\)\s*$/);
        return match?{title:match[1].trim(),year:match[2]}:{title:heading,year:''};
    }
    function filesOf() {
        const paths=new Set();
        // The list tab gives whole paths; the tree gives names, which is enough for the
        // container and for whether a pack agrees with itself.
        for(const row of document.querySelectorAll('.dialog__form[data-tab="list"] table tbody tr')) {
            const cell=row.children[1]||row.children[0];
            const value=textOf(cell);
            if(value&&!/^\d+(?:\.\d+)?\s*(?:[KMGT]i?B|bytes)$/i.test(value))paths.add(value);
        }
        if(!paths.size)
            for(const node of document.querySelectorAll('.dialog__form[data-tab="hierarchy"] span[style*="word-break"],.torrent__files li,.dialog__form table tbody tr td:first-child')) {
                const value=textOf(node);
                if(value&&/\.[a-z0-9]{2,4}$/i.test(value))paths.add(value);
            }
        return [...paths].slice(0,2000);
    }
    const languagesFrom=(selector)=>[...document.querySelectorAll(selector)]
        .map(node=>node.getAttribute('alt')||node.getAttribute('title')||'')
        .map(value=>value.trim()).filter(Boolean);
    function pageFacts(name,profile) {
        const file=DKOKTO_INSPECTOR.readPage(document).map(text=>{try{return DKOKTO_INSPECTOR.parse(text)[0];}catch{return null;}}).find(Boolean);
        const rows=file?DKOKTO_INSPECTOR.rows(file):null;
        const audio=rows?rows.audio.map(track=>track.language).filter(value=>value&&!/^not reported$/i.test(value))
            :languagesFrom('.mediainfo__audio img');
        const subtitles=rows?rows.text.map(track=>track.language).filter(value=>value&&!/^not reported$/i.test(value))
            :languagesFrom('.mediainfo__subtitles img');
        return {
            name,profile,
            media:mediaOf(),
            type:fieldOf('li.torrent__type a','.torrent__type a','.torrent__type'),
            resolution:fieldOf('li.torrent__resolution a','.torrent__resolution a','.torrent__resolution'),
            category:fieldOf('li.torrent__category a','.torrent__category a','.torrent__category'),
            original:fieldOf('.work__language-link','.meta__language'),
            files:filesOf(),
            hasMediaInfo:!!panelWith('MediaInfo')||!!DKOKTO_INSPECTOR.readPage(document).length,
            hasBdInfo:!!panelWith('BDInfo'),
            audio,subtitles,
            video:['movie','tv','disc'].includes(profile),
            base:DKOKTO_RULES.baseOf?DKOKTO_RULES.baseOf(DKOKTO_RULES.current()):'dp'
        };
    }
    // The findings the page adds, under the badge, as their own row.
    function pageRow(node,name,profile) {
        const facts=pageFacts(name,profile);
        const issues=DKOKTO_PAGE.check(facts);
        const existing=document.querySelector('.dk-detail-page');
        const signature=issues.map(issue=>issue.code).join('|')+'#'+facts.files.length;
        if(existing&&existing.dataset.signature===signature)return;
        existing?.remove();
        if(!issues.length)return;
        const errors=issues.filter(issue=>issue.severity==='error');
        // Its own class only: sharing dk-detail-links made the lookup row mistake this for
        // itself, so a new lookup row was appended on every pass.
        const row=el('section',undefined,'dk-detail-page');
        row.dataset.signature=signature;
        row.setAttribute('aria-label','What this page says about the release');
        row.append(el('span',errors.length?'The page disagrees:':'From this page:','dk-detail-links-label'));
        const list=el('ul');
        for(const issue of issues){const item=el('li',issue.message);item.dataset.severity=issue.severity;list.append(item);}
        row.append(list);
        row.append(el('small','Read from this page: the title it names, what it was filed as, its file list, its MediaInfo and its languages. Where a rule is quoted it is the tracker’s; where none is, the finding says so.'));
        node.closest('h1,h2,h3,p,div,section,li')?.after(row);
    }
    function draw() {
        if(!onPage()){dialog?.close();document.querySelectorAll('.dk-detail-links:not(.dk-request-links),.dk-detail-page').forEach(n=>n.remove());return;}
        const hit=found();
        if(!hit||!hit.score||!hit.title){document.querySelectorAll('.dk-detail-links:not(.dk-request-links),.dk-detail-page').forEach(n=>n.remove());return;}
        badge(hit.node,hit.title);linksRow(hit.node,hit.title);
        try{pageRow(hit.node,hit.title,DKOKTO_LISTING_CORE.category(document.querySelector('li.torrent__category a')?.textContent||''));}catch{}
    }
    // A page that keeps changing (chat, timers) must not starve the redraw, and must
    // not be redrawn faster than a person can read: one pass per quarter second.
    function schedule(){if(timer)return;timer=setTimeout(()=>{timer=null;draw();},250);}
    // This script's own additions are ignored, or watching them would wake it again.
    // The chatbox and the ticker change constantly and never hold a listing, so their
    // churn is not a reason to look at the page again (a giveaway or chat script can
    // otherwise keep this awake).
    const NOISE='.chatbox,#chatbox,[class*="chatbox"],.ticker,[class*="ticker"],[class*="chat-"],#chat';
    const OURS='.dk-group-menu,.dk-detail-page,.dk-detail-links,.dk-detail-badge,.dk-listing-badge,.dk-listing-bar,.dk-listing-dialog,.dk-request-bar,.dk-request-links,.dk-request-open,#dkokto-request-dialog,#dkokto-hub,#dkokto-tools,#dkokto-game-dialog,#dkokto-nav-dialog,#dp-inspector-hub,#dp-inspector-tools';
    function mount() {
        draw();
        if(mounted)return;mounted=true;
        new MutationObserver(records=>{
            if(records.some(r=>{const n=r.target.nodeType===1?r.target:r.target.parentElement;return n&&!n.closest(OURS)&&!n.closest(NOISE);}))schedule();
        }).observe(document.body,{subtree:true,childList:true,characterData:true});
        window.addEventListener('popstate',schedule);document.addEventListener('livewire:navigated',schedule);
    }
    return {mount,draw};
})();

// The trackers you are a member of, and the address of each one's own search page.
// Addresses only: nothing is fetched, no account, cookie or API key is read, and no
// tracker is contacted until you click a link yourself. A search that finds nothing
// is not proof that nothing exists there — it is one site's own name search.
const DKOKTO_TRACKERS = (() => {
    const KEY='dkokto_trackers_v1',MAX_CUSTOM=40,MAX_URL=300;
    const KINDS=['general','video','movie','tv','anime','music','book','game'];
    // Most of these run UNIT3D, so their search is the same shape as this site's.
    const unit=(key,label,host,kind='video')=>({key,label,kind,search:'https://'+host+'/torrents?name={q}',software:'UNIT3D'});
    const site=(key,label,kind,search,imdb)=>({key,label,kind,search,...(imdb?{imdb}:{})});
    const CATALOGUE=[
        unit('aither','Aither','aither.cc'),
        unit('blu','Blutopia','blutopia.cc'),
        unit('fnp','FearNoPeer','fearnopeer.com'),
        unit('lst','LST','lst.gg'),
        unit('ulcx','Upload.cx','upload.cx'),
        unit('oe','OnlyEncodes+','onlyencodes.cc'),
        unit('otw','OldToonsWorld','oldtoons.world','anime'),
        unit('rfx','ReelFliX','reelflix.xyz','movie'),
        unit('huno','HUNO','hawke.uno'),
        unit('tik','Cinematik','cinematik.net','movie'),
        unit('shareisland','Shareisland','shareisland.org'),
        site('ptp','PassThePopcorn','movie','https://passthepopcorn.me/torrents.php?searchstr={q}','https://passthepopcorn.me/torrents.php?searchstr={imdb}'),
        site('btn','BroadcasTheNet','tv','https://broadcasthe.net/torrents.php?searchstr={q}'),
        site('hdb','HDBits','video','https://hdbits.org/browse.php?search={q}'),
        site('bhd','Beyond-HD','video','https://beyond-hd.me/torrents?search={q}'),
        site('mtv','MoreThanTV','tv','https://www.morethantv.me/torrents.php?searchstr={q}'),
        site('ant','Anthelion','movie','https://anthelion.me/torrents.php?searchstr={q}'),
        site('nbl','Nebulance','tv','https://nebulance.io/torrents.php?searchstr={q}'),
        site('ar','AlphaRatio','general','https://alpharatio.cc/torrents.php?searchstr={q}'),
        site('tl','TorrentLeech','general','https://www.torrentleech.org/torrents/browse/index/query/{q}'),
        site('ipt','IPTorrents','general','https://iptorrents.com/t?q={q}'),
        site('ab','AnimeBytes','anime','https://animebytes.tv/torrents.php?searchstr={q}'),
        site('red','Redacted','music','https://redacted.sh/torrents.php?searchstr={q}'),
        site('ops','Orpheus','music','https://orpheus.network/torrents.php?searchstr={q}'),
        site('mam','MyAnonaMouse','book','https://www.myanonamouse.net/tor/browse.php?tor%5Btext%5D={q}'),
        site('ggn','GazelleGames','game','https://gazellegames.net/torrents.php?searchstr={q}')
    ];
    // Addresses these sites have since moved away from. A saved override that matches one
    // is dropped on read, so a correction here reaches someone who already had it saved.
    const OUTDATED={tl:['https://www.torrentleech.org/torrents/browse/list/query/{q}']};
    let backing=null;
    const storage=()=>{if(backing)return backing;try{return localStorage;}catch{return null;}};
    const text=(v,max=80)=>String(v??'').replace(/\s+/g,' ').trim().slice(0,max);
    // An address is usable only if it is an https search page with a place for the term.
    function valid(url) {
        const value=String(url??'').trim();
        if(!value||value.length>MAX_URL||/\s/.test(value)||!/^https:\/\//i.test(value))return false;
        if(!/\{q\}|\{imdb\}/.test(value))return false;
        try{const parsed=new URL(value.replace(/\{q\}/g,'term').replace(/\{imdb\}/g,'tt0000001'));
            return parsed.protocol==='https:'&&parsed.hostname.includes('.');}catch{return false;}
    }
    const empty=()=>({enabled:[],search:{},custom:[],popups:''});
    function read() {
        const store=storage();if(!store)return empty();
        try{
            const parsed=JSON.parse(store.getItem(KEY)||'null');
            if(!parsed||typeof parsed!=='object')return empty();
            const custom=(Array.isArray(parsed.custom)?parsed.custom:[])
                .filter(entry=>entry&&typeof entry.key==='string'&&/^custom-[a-z0-9-]{1,40}$/.test(entry.key)&&text(entry.label)&&valid(entry.search))
                .slice(0,MAX_CUSTOM)
                .map(entry=>({key:entry.key,label:text(entry.label,60),kind:KINDS.includes(entry.kind)?entry.kind:'general',search:String(entry.search).trim(),custom:true}));
            const search={};
            for(const [key,value] of Object.entries(parsed.search&&typeof parsed.search==='object'?parsed.search:{})) {
                const address=String(value??'').trim();
                if(!/^[a-z0-9-]{1,48}$/.test(key)||!valid(address))continue;
                if((OUTDATED[key]||[]).includes(address))continue;
                search[key]=address;
            }
            const known=new Set([...CATALOGUE.map(t=>t.key),...custom.map(t=>t.key)]);
            const enabled=(Array.isArray(parsed.enabled)?parsed.enabled:[]).filter(key=>typeof key==='string'&&known.has(key)).slice(0,120);
            return {enabled,search,custom,popups:parsed.popups==='blocked'?'blocked':parsed.popups==='ok'?'ok':''};
        }catch{return empty();}
    }
    function write(state) {
        const store=storage();if(!store)return state;
        try{store.setItem(KEY,JSON.stringify({enabled:state.enabled.slice(0,120),search:state.search,popups:state.popups||'',custom:state.custom.slice(0,MAX_CUSTOM)
            .map(({key,label,kind,search})=>({key,label,kind,search}))}));}catch{}
        return state;
    }
    // Every tracker this browser knows about, with its address and whether you are on it.
    function list() {
        const state=read(),on=new Set(state.enabled);
        return [...CATALOGUE.map(entry=>({...entry,custom:false})),...state.custom]
            .map(entry=>({...entry,search:state.search[entry.key]||entry.search,edited:!!state.search[entry.key],on:on.has(entry.key)}));
    }
    const chosen=()=>list().filter(entry=>entry.on);
    const count=()=>read().enabled.length;
    function setEnabled(keys=[]) {
        const state=read(),known=new Set([...CATALOGUE.map(t=>t.key),...state.custom.map(t=>t.key)]);
        state.enabled=[...new Set(keys.filter(key=>known.has(key)))].slice(0,120);
        write(state);return state.enabled.length;
    }
    // A tracker that has moved, or whose search differs from the default, can be corrected.
    function setSearch(key,url) {
        const state=read(),base=[...CATALOGUE,...state.custom].find(entry=>entry.key===key);
        if(!base)return false;
        const value=String(url??'').trim();
        if(!value||value===base.search){delete state.search[key];write(state);return true;}
        if(!valid(value))return false;
        state.search[key]=value;write(state);return true;
    }
    function add({label='',search='',kind='general'}={}) {
        const name=text(label,60);
        if(!name||!valid(search))return null;
        const state=read();
        if(state.custom.length>=MAX_CUSTOM)return null;
        const slug=name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,30)||'site';
        let key='custom-'+slug,n=2,taken=new Set([...CATALOGUE.map(t=>t.key),...state.custom.map(t=>t.key)]);
        while(taken.has(key))key='custom-'+slug+'-'+n++;
        const entry={key,label:name,kind:KINDS.includes(kind)?kind:'general',search:String(search).trim(),custom:true};
        state.custom.push(entry);state.enabled.push(key);write(state);
        return entry;
    }
    function remove(key) {
        const state=read(),before=state.custom.length;
        state.custom=state.custom.filter(entry=>entry.key!==key);
        state.enabled=state.enabled.filter(k=>k!==key);
        delete state.search[key];write(state);
        return state.custom.length<before;
    }
    // Whether this browser refused a burst of tabs last time, so the next attempt can
    // offer the one-at-a-time route first instead of wasting a click.
    const popupsBlocked=()=>read().popups==='blocked';
    function notePopups(blocked) {
        const state=read(),value=blocked?'blocked':'ok';
        if(state.popups===value)return value;
        state.popups=value;write(state);return value;
    }
    function clear(){const store=storage();try{store?.removeItem(KEY);}catch{}return 0;}
    return {list,chosen,count,setEnabled,setSearch,add,remove,clear,valid,popupsBlocked,notePopups,OUTDATED,catalogue:()=>CATALOGUE.map(entry=>({...entry})),KINDS,KEY,use(store){backing=store;}};
})();

// Turns a DarkPeers request into one search link per tracker you are a member of.
// Pure address building: nothing is fetched, no tracker is asked anything, and no
// availability is claimed. Opening a link runs that site's own search, as you.
const DKOKTO_REQUESTS_CORE = ((links,trackers) => {
    // Which trackers can plausibly carry this kind of request.
    const CARRIES={
        general:['movie','tv','anime','music','book','game','unknown'],
        video:['movie','tv','anime','unknown'],
        movie:['movie','unknown'],
        tv:['tv','anime','unknown'],
        anime:['anime','unknown'],
        music:['music','unknown'],
        book:['book','unknown'],
        game:['game','unknown']
    };
    // What the title itself says, which is harder evidence than a category read off a
    // page: a resolution with a video codec is not a book, whatever the row said.
    const RES=/(?:^|[ ._])(?:360|480|576|720|1080|2160|4320)[pi](?=$|[ ._-])/i;
    const VIDEO=/(?:^|[ ._])(?:x26[45]|H[ .]?26[45]|HEVC|AVC|AV1|VP9|XviD|REMUX|WEB-?DL|WEBRip|Blu-?Ray|HDTV|DVDRip)(?=$|[ ._-])/i;
    const BOOKFMT=/(?:^|[ ._])(?:EPUB|AZW3|MOBI|FB2|CBR|CBZ|KFX|LIT|PDB|M4B)(?=$|[ ._-])/i;
    const MUSICFMT=/(?:^|[ ._])(?:FLAC|ALAC|MP3|AAC|Opus|Vinyl|SACD)(?=$|[ ._-])/i;
    const SEASON=/(?:^|[ ._])S\d{1,2}(?:E\d{1,3})?(?=$|[ ._-])/i;
    function fromName(name='') {
        const value=String(name||'');
        if(!value)return '';
        if(RES.test(value)&&VIDEO.test(value))return SEASON.test(value)?'tv':'movie';
        if(BOOKFMT.test(value))return 'book';
        if(MUSICFMT.test(value)&&/\s-\s.+\((?:18|19|20)\d{2}\)/.test(value))return 'music';
        if(SEASON.test(value))return 'tv';
        if(RES.test(value)||VIDEO.test(value))return SEASON.test(value)?'tv':'movie';
        return '';
    }
    function fromCategory(category='') {
        const value=String(category||'').toLowerCase().replace(/[_-]+/g,' ');
        if(/\b(?:audio\s*books?|e\s*books?|books?|comics?|magazines?)\b/.test(value))return 'book';
        if(/\bmusic\b|^(?:flac|mp3|alac|aac|vinyl)\b/.test(value))return 'music';
        if(/\b(?:games?|software|applications?|apps?)\b/.test(value))return 'game';
        if(/\banime\b/.test(value))return 'anime';
        if(/\b(?:movies?|films?)\b/.test(value))return 'movie';
        if(/\b(?:tv|television|shows?|series|episodes?)\b/.test(value))return 'tv';
        return '';
    }
    function kind(category='',name='') {
        const said=fromCategory(category),shown=fromName(name);
        if(!said)return shown||'unknown';
        if(!shown||said===shown)return said;
        // The two disagree. A category read off a row is often the wrong cell, or the
        // wrong row; a resolution and a codec in the title are not ambiguous at all.
        const video=shown==='movie'||shown==='tv';
        if(video&&(said==='book'||said==='music'||said==='game'))return shown;
        if(said==='anime'&&video)return 'anime';
        return said;
    }
    // A request name is usually a media title ("Shiny Happy People (2023) S02"),
    // sometimes a full release name. Both reduce to a title, a year and a season.
    function parse(name='',category='') {
        const parsed=links.parse(name);
        return {...parsed,kind:kind(category,name)};
    }
    // What to type into another tracker's search box.
    function term(parsed) {
        if(!parsed.query)return '';
        const parts=[parsed.query];
        if(parsed.season)parts.push('S'+parsed.season+(parsed.episode?'E'+parsed.episode:''));
        else if(parsed.year&&(parsed.kind==='movie'||parsed.kind==='music'||parsed.kind==='unknown'))parts.push(parsed.year);
        return parts.join(' ');
    }
    const fill=(template,values)=>String(template).replace(/\{(q|imdb)\}/g,(_,name)=>encodeURIComponent(values[name]??''));
    // One link per enabled tracker, plus the ones that were left out and why.
    // exact: search the release name as it stands, for finding the very same release
    // somewhere else, rather than the title/year/season a request reduces to.
    function search(request={},{list=null,ids={},exact=false}={}) {
        const parsed=parse(request.name||request.title||'',request.category||'');
        const raw=String(request.name||request.title||'').trim();
        const query=exact?raw:term(parsed),chosen=list||trackers.chosen();
        const out={parsed,term:query,links:[],skipped:[]};
        if(!query)return out;
        for(const tracker of chosen) {
            if(!(CARRIES[tracker.kind]||CARRIES.general).includes(parsed.kind)) {
                out.skipped.push({key:tracker.key,label:tracker.label,reason:'does not carry '+parsed.kind+' releases'});
                continue;
            }
            const byId=!exact&&!!(tracker.imdb&&ids.imdb);
            const url=fill(byId?tracker.imdb:tracker.search,{q:query,imdb:ids.imdb||''});
            if(!/^https:\/\//i.test(url)){out.skipped.push({key:tracker.key,label:tracker.label,reason:'its saved address is not a usable https search'});continue;}
            out.links.push({key:tracker.key,label:tracker.label,url,exact:byId,
                note:byId?'Searched by the IMDb ID on this page'
                    :(exact?'Searches this exact release name on ':'Searches “'+query+'” on ')+tracker.label});
        }
        return out;
    }
    // Paste-ready: the request, the term, and one addressable line per tracker.
    function report(request={},result=null) {
        const found=result||search(request);
        const lines=['Request: '+(request.name||request.title||'(no name)')];
        if(request.url)lines.push('On DarkPeers: '+request.url);
        if(request.category)lines.push('Category: '+request.category);
        lines.push('Search term: '+(found.term||'(none — the request name could not be read)'),'');
        if(!found.links.length)lines.push('No tracker searches: choose the trackers you are on first.');
        for(const link of found.links)lines.push(link.label+': '+link.url);
        if(found.skipped.length)lines.push('','Not searched: '+found.skipped.map(entry=>entry.label+' ('+entry.reason+')').join(', '));
        lines.push('','Links only — each search runs on that site, as you. Nothing here was fetched,',
            'and a search finding nothing is not proof that the release does not exist there.');
        return lines.join('\n');
    }
    return {kind,fromName,fromCategory,parse,term,search,report,CARRIES};
})(typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./links-core.js'):DKOKTO_LINKS_CORE,
   typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./trackers.js'):DKOKTO_TRACKERS);

// Which tracker a release group is internal to.
//
// Sources, in hand and cited rather than invented — all three supplied by the user, and all
// three community-maintained directories rather than any tracker's own staff list:
//   · InviteHawk "Internal Encoders / Groups from Private Trackers" (topic 154380), 9 Sep 2026
//   · rentry.org/internals — internal groups and their respective trackers, 9 Sep 2026
//   · pastes.io/yiahe8Xf — site / P2P groups table, 9 Sep 2026
// They disagree in places and go out of date, which is why every entry is offered as
// "listed as internal at" and the whole list can be replaced in Internal groups….
//
// Format: one tracker per line, "Tracker|group group group". A group written "NAME*" is
// marked inactive — retired or disbanded — by whichever source carried it. A group internal
// at several trackers appears on each line.
const DKOKTO_INTERNALS_DATA = `
1st Torrent|HuN-No1 HuN-TRiNiTY Hun-TvDay
24HD.cc|cpg
3ChangTrai|3cTMuSiC 3cTWeB 3cHaNgTrAj 3CT 3CuTi DoCuMeNtArY HDVNBits cal3ndar TBN 3CTeDU Legend LsD T4H
AfrBits|"Prodji RG"
Aither|ARTiCUN0 ATELiER Dooky Headpatter KHEZU Kitsune MainFrame NAN0 PiRAMiDHEAD Stelks VaLTiEL WiTCHCRAFT
Allotracker|ESiR LiberTeam LKT RAW
AlphaRatio|AR nikt0 x0r Chivaman OFT SM737
Anthelion|ANThELIa
AsianCinema|ARiN iZON3 KAWAiREMUX
AvistaZ|AppleTor HoneyG Imagine NEXT TRiToN ANDY Archie HBO iTsOK Luvmichelle MagicStar MMR MrHulk PandaMoon RSG
Awesome-HD|BMF decibeL D-Z0N3 FTW-HD HiFi NCmt OISTiLe TDD TeeHee ZQ BTT* de* drealiT* eXcommunicado* FoRM* G3N3* HDRemuX* NiBuRu* Penumbra* Positive* SaNcTi* SHeNTo* Senpai* xander*
Bajaunapeli|"Team B1P"
BD25|EuReKA
BDBits.org|BDbits
BeyondHD|BeyondHD BHDStudio BMF decibeL D-Z0N3 FLUX FraMeSToR HiFi iFT iROBOT Legacy MKVULTRA NCmt RPG TDD W4NK3R ZR 4KINGS* ALeSiO* FASM* FLAWL3SS* HDX* LoNeWolf* MOOSE* NibuRu* Nightripper* SC4R* SiPS* CRFW S0NNY ILP MiU BHD FL JayRoyal NOSiViD PHOENiX TheProne
BiGilT|CHT PWP VOD
Bit-HDTV|BitHD BluHD BluPanther Boom BReWeRS Grond HDxT HighCode MarGe PriMeHD WiNNy FLAWL3SS* LoRD
Bithorlo|BHO
BitHumen|Gianni No1 TRiNiTY
BitMeTV|biTMeTV
Blu-bits|3DNORD aZA BluHD JohnGalt LoNeWolf PriMeHD RealHD SWEMUX SYNERGY
Blu-Evolution|BluEvo Jack Jem Ruxi
Bluebird-HD|BLUEBIRD CMEGRoup
BlueTigers|ASPHiXiAS TeamSuW
Blutopia|BLURANiUM BLUTONiUM CultFilms JKP LEGi0N PmP ReCult WiLDCAT BaggerInc* YInMn* CONSORTiUM DAMN TeMPo Tux ISA
Broadcity|BdC
BTN|BTW HiSD iT00NZ KiNGS LAZY NTb TOMMY TVSmash CBM* dbR* ESPNtb* HiSQ* HPN* HRiP* iPRiP* JJ* kpbong* LoTV* PreBS* TOPKEK* TTVa* CMRG herkz TrollHD NTG
BwTracker|DUSIcTv DUS IcTv
capybarabr|BiOMA CapyLabs
CHDBits|CHDBits CHDHKTV CHDTV CHPAD CHWEB OneHD SGNB StBOX AREA11 CHD CHD3D CHDPAD
Cinemaz|TRiToN
ClearJAV|ClearJAV
CMCT|CMCT CMCTV
CN|TBH
CZteamTtracker|CzT
DanishBits|UNiTY UNiTYSERiER
DarkPeers|DarkSouls WhiskeyJack
Desi-Torrents|DDR DrC ExDR M2Tv TmG TeamTolly TDBB xDM DUS* IcTv*
DownRev|DownRev lonelywolf
Elite-pirates|AQOS
EliteHD|HDClub
ExtraTorrent|ETHD ETRG ettv
FearNoPeer|EiNSTEIN_SiR23 onlyfaffs HiFiWiFi SM737
Feedurneed|ACAB FooKaS
Filelist|playBD playHD playMUSIC playSD playTV playWEB playON playMB
FT3|FTX
Fuzer|FuzePacks FuzerHD FuzerSD Silver007 SPIL Sweet-Star
GKS|ESiR GKS LKT RAW
Greek-Team.cc|GLM GrLTv GTRD MtToG
HD-Bits.com|BobOki HDBriSe PLRVRTX
HD-MKV|mkvrg ShaqSalazar
HD-Only|4HDO DBHD KiKi MLN ONLY PEWE PHOENiX
HD-Space|Boss BluPanther CRiSPY HDCLUB HDSpace RightSiZE SpaceHD 4K4U Gh0st HDSTaRS HomeTheater KM aZA RipleyHD ShocK
HD-Spain|GrupoHDS
HD-SportBits|Reborn4HD
HD-Torrents|BiZKiT E.N.D HDT KRaLiMaRKo LoRD SumVision 557953* BaggerInc* BluDragon* DopeHD* DownRev* gc04* HB* HDBS* HiDt* HDMaNiAcS* HDVN* JM* JustHD* POH* SD* Slbenfica* StillChoosing* uRaMeSHi* ViSTA* ViSUALHD* HGN SPHD
HD-Unit3d|Archmage DeamoN GHiA HDU JoN Soltu UNiT3D
HD-Viet|HDViE
HD4FANS|beAst HDRemuX
HD4Free|GF44 LEGi0N MarGe
HDAccess|HDAccess
HDAhoy|YoHo
HDArea|EPiC HDApad HDArea HDATV
HDBits|AE AJ8 AJP Arucard AtZLIT AW Azul BBW BG BoK Cache Chotab CJ CRiSC Cristi Crow CtrlHD CyCR0 D4 DChighdef DeblocKING DiGG DiR DiRTY disc DBO DON DoNOLi EA EbP Eby ESiR ETH EucHD FANDANGO fLAMEhd FSK Ft4U fty Funner Geek GMoRK GoLDSToNE Green greenHD H2 h264iRMU HALYNA HDB HDC HDBiRD HDL HDxT hymen HZ iCO iLL IMDTHS iNFLiKTED iNK iOZO J4F JAVLiU JCH jTV k2 KolHD Krispy KTN KweeK Lesnick LiNG LolHD lulz M794 madoff MAGiC martic McFly MCR MdM MDR MeDDlER MMI Mondo Moshy Mojo NaRB NiP NiX nmd NorTV NTb NWO OAS ONYX pB PerfectionHD PHiN PiNG PiMP PiPicK Positive Prestige Prime PTer PXE QDP quaz QXE RDK123 REPTiLE RightSiZE RuDE RZF S26 SbR SG sJR SK Skazhutin SLO SMoKeR somedouches SbY SPEED SrS SSG SuBHD TayTO tBit ThD THORA tK TM toho Tree tRuAVC tRuEHD TSE TsH UioP UxO VanRay VietHD ViNYL WESTSiDE WiHD XSHD yadong1985 YanY Z (C)Z ExY H@M IDE KASHMiR MiBr Redux TOMMY TrollHD V Zim'D ZQ
HDCenter|HDC jTV NERDS pmHD Tvr
HDChina|beAst CMCT CrsS DIY HDC HDChina HDCTV HDWinG HDWTV iHD JOMA KiSHD LU9998 NGB OpenMV TAiCHi KHQ
HDCity|0DAY HDCITY NoPA NoVA TLF
HDClub|HDClub
HDCN|HDCN
HDEvo|HDEvo
HDFrench-Zone|HDZ
HDHome|HDBiger HDBigerTV
HDLeech|DGN HDL MeRCuRY
HDME|FourGHD HDme iCandy INTL LegacyHD MoBileHD Ruxi
HDPter|EPiC HDPad HDPter HDPterOST HDPTV Pbk
HDQueen|HDQueen PHD
HDRoad|HDRoad R2HD MySilu
HDRush|BluPanther HDRush JsR MZ0N3 PHDR PSYPHER TheVortex
HDSky|HDS HDSPad HDSTV
HDsource|HDS iNCEPTiON Ms89 muah OYHD ViaHD
HDStar|beAst HDS HDSPAD HDSTAR HDSTV
HDtime|HDTime
HDWing|HDWinG HDWTV HomeTheater iHD
Hebits|HebHD HebTV iSrael ZionHD ZionSD
Hon3yHD|Hon3y
HQMusic|HQM MRHQ OwL
HQSource|ELiTE
HUNO|HONE LSt PRPL QxR SEV SiGLA SMURF TAoE Vyndros
HypeRay|Geek HyPad Hyper Neon Original PureTV Tron TronTV iMusic
IceTorrents|SubZero
InfinityHD|flower fraktl NhanNguyen
intheShadow|Q0S Q0SWeb QOS
iPlay|iHD
IPT|CMRG d3g EVO CBM FLAWL3SS
ItaTorrents|ITT
iTS|Q0S
JoyHD|JoyHD
KHDBits|KiSHD
KrazyZone|KZANiME KZI KZMOViES LAZYFROG-KZ
LDU|KeBaB
LeechTurk|LTRG
LegacyHD|LEGi0N
LST|L0ST KIMJI coffee SQS Yuki
M-Team|BMDru HDStar HDTime KiSHD MPAD M-Team MTeamTV OneHD Pack StBOX CNHK* R2HD* TnP* MTeam3D MTeamPAD
MoreThanTV|E.N.D TEPES Dracula* GBL* MOLY* SOIL* VLAD* SMURF WDYM
Movie-Torrentz|m2g ViP3R
MySpleen|449 Atomsk MySpleen
Norbits|Norbits
NordicQuality|BANDOLEROS FiSTER PiTBULL UNDERDOGS
OldToonsWorld|OldT
OnlyEncodes+|BiNGUS Breeze DarQ "DarQ HONE" DBMS edge2020 edwood "Goki TAoE" Goki GRiMM noxxus OnlyWeb PrimeX Ralphy sCOOTER Vialle
OpenCD|KHQ LLM OpenCD
OurBits|FLTTH HosT OurBits OurPad OurTV PbK
PixelHD|Px3D PxEHD PxHD PxHD-Mobies PS3-TEAM* PxHDA
PolishSource|FiM iNTERnet PSiG
PolishTracker|PSiG AtM presa FARNA pawel2006 DeiX FGHJ SliMDiCK iNTERnet
PrivateHD|TRiToN Absinth* EPSiLON* HDBEE* MARBLECAKE* SiGMA* UTR-HD*
PTerClub|PTer PTerWEB AdBlue AREY BdC BMDru c0kE CatEDU cfandora JKCT KMX nLiBRA PTerMV PTerTV XPcl ZTR Kenobi iFT
PTN|OmertaHD SKALiWAGZ
PTP|PTP HRiP* TBB* HANDJOB O2STK CMRG ILP
RARBG|RARBG
ReelFliX|RFX SM737 XFR
ReleaseZone|RZ-RG
RevolutionTT|NPW
ScanBytes|ScanExclusive
SceneFZ|FZHD FZMusic
SDbits|CtrlSD HYPE MMI RR
SeedPool|Aisha LEGi0N MOONBLOOD OND seedpool SPx
Simpledevelopment|SiMPLE
Speed.cd|DiVERSiTY MutzNutz scott24
SpeedApp|41RGB ANDRONIKA EShare CRC FZ4K FZBD FZHD FZSD FZWEB HDMAN iREAL MOO NViDiON PiPS SP4K SPBD SPDVD SPHD SPSD SPTV SPWEB SubZero SPMusic
Superbits|EGEN GRANiTEN PANDEMONiUM VideoGod YOLO
TeamOS|TEAMOS
TeamTPTB|TPTB
TehConnection|BaH HaB MKu schwoom TCO TSDC
Telly|mkvCinemas Telly
TNTracker|DEFUSED LoC POE
TorrentBD|MRN KamiKaze ALiEN Grimmjaw NaNoMyTe GunGravE NG AP XZVN Galahal IHK DeathSs12 KISS ParVej PROPHET pyromancer TarTacular NyX JNH RUN MeGaTroN ANIMOUS ElPro ExCaLiBuR WiNT3R
TorrentLand|Castellano "Eml Team" EmlHDTeam
TorrentLeech|OFT 4K4U EPSiLON FLIGHTS RU4HD UnKn0wn TAoE
TorViet|EbP EPiK HDvB L2Bits LolHD KiD VietHD
TrackerHD|TRCKHD
TTG|BDClub DoA NGB OoKU WiKi ARiN BMDru DTKTV JX npuer TTG
UHDBits|DON ExREN HaB HDVN iFT JM LoRD KASHMiR LEGi0N MKVTeamZQ PIS POH PRiMaLHD TayTO UHDRemux JKP SwRd DKT EEEEE GoNeHD KHu LDX LHD LiquidHD $a!nt TCO VoLT
Upload.cx|BLOOM REWiND
Upscale Vault|UpscaleVault
Usenet|EuReKA Troll3D TrollHD TrollUHD
VNBits|VNB VNBIts
World-In-HD|FURAX GAIA Heman HGR LFN PULSE STEAL TMB WiHD
Xthor|CARPEDiEM JUSTFORFUN A3L BlackFlag BOUQUINE Giorgy NLX5 LiBE RTAD Poney ReBot ViKINGS FRATERNiTY WEEDS GHZ NEO SCiTiS BSD MYSTERiON Scaph ALLDAYiN CHiLL RiPiT DELiCiOUS CherryCoke DEMON iXTHOR QWERTZ LOOKSMAX SpiriTus DZ DavidGoodenough* Tokuchi* Yn1D* QUALiTY* LEGi*
XtremeZone|Werip XtremeHD
YUScene|R&H YUTeamHD
Ztracker|ARROW
`;

// Which tracker a release group is internal to.
//
// The list is data, not a judgement: it ships with the InviteHawk community directory the
// user supplied (see internals-data.js for the citation and date), and anything you paste
// over it replaces it. Nothing here is inferred — a group that is not on the list is
// reported as not on the list, never guessed at — and a directory can be stale, so every
// entry is offered as "listed as internal at", not as fact.
// No network, posting or account access in this module.
const DKOKTO_INTERNALS = (seed => {
    // LINK, not URL: a constant called URL would shadow the URL parser used just below.
    const KEY='dkokto_internal_groups_v1', MAX=2500, NAME=40, LABEL=48, LINK=300;
    // backing: swapped for a fake store in the Node checks, exactly as trackers.js allows.
    let backing=null;
    const store=()=>{if(backing)return backing;try{return window.localStorage;}catch{return null;}};
    const text=(value,max)=>String(value??'').replace(/\s+/g,' ').trim().slice(0,max);
    const key=name=>text(name,NAME).toLowerCase();
    // Only an address a browser can open on click, and only https: a group's home page is
    // a link, never a request this script makes.
    function safeUrl(value) {
        const raw=text(value,LINK);
        if(!raw)return '';
        try{const url=new URL(raw);return url.protocol==='https:'?url.href:'';}catch{return '';}
    }
    const valid=entry=>!!entry&&typeof entry==='object'&&!!text(entry.group,NAME)&&!!text(entry.tracker,LABEL);
    const clean=entry=>({group:text(entry.group,NAME),tracker:text(entry.tracker,LABEL),
        url:safeUrl(entry.url),inactive:entry.inactive===true});
    // A group can be internal at more than one tracker — DON at HDBits and UHDBits, LoRD at
    // Bit-HDTV, HD-Torrents and UHDBits — so the pair is what must be unique, not the name.
    function unique(list) {
        const seen=new Set(),out=[];
        for(const entry of Array.isArray(list)?list:[]) {
            if(!valid(entry))continue;
            const row=clean(entry),id=key(row.group)+' @ '+key(row.tracker);
            if(seen.has(id))continue;
            seen.add(id);out.push(row);
            if(out.length>=MAX)break;
        }
        return out;
    }
    // A group name as the directory writes it. "(inactive)" marks the entry before it, a
    // connecting word is not a group, and a name is short.
    const GROUP=/^[\p{L}\p{N}$@(][\p{L}\p{N}$@!'’.+_)-]{0,23}$/u;
    function groupTokens(line) {
        const out=[];
        // A group name can contain a space — "Goki TAoE", "DarQ HONE" — so a quoted name is
        // taken whole before the rest of the line is split on spaces.
        let rest=String(line||'');
        for(const match of rest.match(/"[^"]{1,40}"/g)||[]) {
            const name=match.slice(1,-1).trim();
            const starred=/\*$/.test(name);
            const bare=starred?name.slice(0,-1).trim():name;
            if(bare&&bare.length<=40)out.push({group:bare,inactive:starred});
            rest=rest.replace(match,' ');
        }
        for(const raw of rest.split(/\s+/)) {
            const token=raw.replace(/[.,;]+$/,'').trim();
            if(!token)continue;
            if(/^\(?inactive\)?\.?$/i.test(token)){if(out.length)out[out.length-1].inactive=true;continue;}
            // "NAME*" is how the shipped list marks what the directory calls inactive.
            const starred=/\*$/.test(token);
            if(/^(?:and|or|&)$/i.test(token))continue;
            // "(DKT" in the source is a stray bracket around a real name; "(C)Z" is a name.
            const bare=starred?token.slice(0,-1):token;
            const name=/^\([^)]*$/.test(bare)?bare.slice(1):bare;
            if(!name||!GROUP.test(name))continue;
            out.push({group:name,inactive:starred});
        }
        return out;
    }
    // Whatever shape the list arrives in, because directories are written by hand:
    //   Tracker|group group group      the form this ships in, and what it exports
    //   Tracker|groups|https://…       with one address for that whole tracker
    //   Group | Tracker | https://…    one group per line, with an optional address
    //   Tracker: group, group          a colon and a comma-separated list
    //   ## Tracker  /  **Tracker**     a heading, then the groups on the lines under it
    //   an icon line, the tracker, its groups (the InviteHawk page pasted whole)
    const HEADING=/^(?:#{1,6}\s+(.+?)\s*#*|\*\*(.+?)\*\*|__(.+?)__)$/;
    const SKIP=/^(?:internal\s+groups?.*|groups?|trackers?|index|contents?|table of contents|last updated.*|updated.*|source.*)$/i;
    function parse(input) {
        const rows=[];
        const lines=String(input||'').split(/\r?\n/).map(line=>line.trim());
        // A heading names the tracker whose groups follow it, until the next heading.
        let heading='';
        for(let i=0;i<lines.length;i++) {
            const line=lines[i];
            if(!line||/^[-|+=~_*\s]+$/.test(line)){heading=heading;continue;}
            if(/^\[/.test(line)||/^[A-Z0-9] Trackers$/i.test(line)||/^Tracker\s*→/.test(line))continue;
            // The pasted page: an icon line, then the tracker, then its groups.
            if(/^[\p{Extended_Pictographic}️\s]+$/u.test(line)) {
                const tracker=lines[i+1]||'',groups=lines[i+2]||'';
                if(tracker&&groups&&!/^\[/.test(tracker)) {
                    for(const token of groupTokens(groups))rows.push({...token,tracker:tracker.replace(/\s+/g,' ')});
                    i+=2;heading='';
                }
                continue;
            }
            // A heading on its own line names the tracker for the lines beneath it.
            const head=line.match(HEADING);
            if(head) {
                const name=text(head[1]||head[2]||head[3],LABEL);
                heading=SKIP.test(name)?'':name;
                continue;
            }
            // "Tracker: group, group, group" — the tracker and its groups on one line.
            const colon=line.match(/^([^:|]{1,48}?)\s*:\s*(.+)$/);
            // A tracker's name is short and is not a sentence lead-in, and its groups do not
            // end in a full stop — so "Note: these are the groups I know of." is prose.
            const leadIn=/^(?:note|notes|source|sources|updated|last updated|see|warning|credit|credits|disclaimer|edit)$/i;
            if(colon&&!/^https?$/i.test(colon[1])&&!leadIn.test(colon[1].trim())&&
               colon[1].trim().split(/\s+/).length<=4&&!/[.!?]$/.test(colon[2].trim())) {
                for(const token of groupTokens(colon[2].replace(/,/g,' ')))
                    rows.push({...token,tracker:colon[1]});
                continue;
            }
            // Under a heading, a bullet or a plain run of names belongs to that tracker.
            if(heading&&!/[|]/.test(line)) {
                const body=line.replace(/^[-*•·]\s*/,'').replace(/,/g,' ');
                const found=groupTokens(body);
                if(found.length){for(const token of found)rows.push({...token,tracker:heading});continue;}
            }
            const cells=line.replace(/^\||\|$/g,'').split(/\s*\|\s*|\t+/).map(cell=>cell.trim()).filter(Boolean);
            // Two cells is the directory form this ships in and exports: Tracker|groups.
            // Three, where the last is an address, gives that whole tracker its address:
            // Tracker|group group group|https://… — one line, not one per group.
            if(cells.length===2&&!/^https?:/i.test(cells[1])||
               cells.length===3&&/^https?:/i.test(cells[2])&&/\s/.test(cells[1])) {
                const url=cells.length===3?cells[2]:'';
                for(const token of groupTokens(cells[1]))rows.push({...token,tracker:cells[0],url});
                continue;
            }
            const parts=cells.length>=2?cells
                :line.split(/\s*,\s*|\s+[-–—]\s+/).map(cell=>cell.trim()).filter(Boolean);
            if(parts.length<2)continue;
            if(/^(?:group|release group)$/i.test(parts[0]))continue; // a header row
            const url=parts.find(cell=>/^https?:\/\//i.test(cell))||'';
            const rest=parts.filter(cell=>cell!==url);
            if(rest.length<2)continue;
            rows.push({group:rest[0].replace(/\s*\(inactive\)\s*$/i,''),tracker:rest[1],url,
                inactive:/\(inactive\)/i.test(rest[0])});
        }
        return unique(rows);
    }
    let seeded=null;
    const defaults=()=>seeded??=parse(seed||'');
    function saved() {
        const s=store();if(!s)return null;
        try{
            const raw=s.getItem(KEY);
            if(!raw)return null;
            const parsed=JSON.parse(raw);
            return Array.isArray(parsed)?unique(parsed):null;
        }catch{return null;}
    }
    // Your list if you have saved one, the shipped directory otherwise.
    const all=()=>saved()||defaults();
    const usingDefaults=()=>!saved();
    function save(list) {
        const rows=unique(list);
        const s=store();
        if(s)try{s.setItem(KEY,JSON.stringify(rows));}catch{}
        return rows;
    }
    const clear=()=>{const s=store();if(s)try{s.removeItem(KEY);}catch{}};
    // Append one group without touching the rest — the whole point being that adding a
    // group should never be a chance to lose the other four hundred.
    function add(group,tracker,url='') {
        const row={group:text(group,NAME),tracker:text(tracker,LABEL),url};
        if(!valid(row))return {added:false,reason:'A group and a tracker are both needed.',list:all()};
        const current=all();
        if(homes(row.group,current).some(entry=>key(entry.tracker)===key(row.tracker)))
            return {added:false,reason:row.group+' is already listed at '+row.tracker+'.',list:current};
        if(current.length>=MAX)return {added:false,reason:'The list is full at '+MAX+' entries.',list:current};
        return {added:true,list:save([...current,row])};
    }
    // Every tracker a tag is listed at, in list order. Matched however the tag is written.
    const homes=(tag,list=all())=>{const id=key(String(tag||'').replace(/^[-\s.]+|[-\s.]+$/g,''));
        return id?list.filter(row=>key(row.group)===id):[];};
    const find=(tag,list=all())=>homes(tag,list)[0]||null;
    // Exported in the compact directory form, which is also what the editor accepts back.
    function format(list) {
        const byTracker=new Map();
        for(const row of Array.isArray(list)?list:[]) {
            if(!valid(row))continue;
            const name=text(row.tracker,LABEL);
            if(!byTracker.has(name))byTracker.set(name,{groups:[],url:''});
            const bucket=byTracker.get(name);
            const label=text(row.group,NAME);
            bucket.groups.push((/\s/.test(label)?'"'+label+'"':label)+(row.inactive?' (inactive)':''));
            if(!bucket.url&&row.url)bucket.url=row.url;
        }
        return [...byTracker].map(([tracker,rows])=>
            tracker+'|'+rows.groups.join(' ')+(rows.url?'|'+rows.url:'')).join('\n');
    }
    return {all,save,clear,add,find,homes,parse,format,defaults,usingDefaults,KEY,MAX,
        use(fake){backing=fake;seeded=seeded;}};
})(typeof module!=='undefined'&&module.exports&&typeof require==='function'
    ?require('./internals-data.js'):(typeof DKOKTO_INTERNALS_DATA!=='undefined'?DKOKTO_INTERNALS_DATA:''));

// The release group tag, marked in the name and opened on click. It shows where the group
// is internal — from your own list, never invented — and searches for its other releases.
// Nothing is fetched: every entry is a link that opens only when you click it.
const DKOKTO_GROUP_TAG = ((internals,requests,trackers) => {
    const CLASS='dk-group-tag', MENU='dk-group-menu';
    let menu=null,openFor=null;
    const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
    function close() {
        if(menu){menu.remove();menu=null;}
        const was=openFor;openFor=null;
        if(was?.isConnected)was.setAttribute('aria-expanded','false');
    }
    // Same-origin search for the group's other releases here. A link, not a request.
    const hereSearch=tag=>'/torrents?name='+encodeURIComponent(tag);
    // A tracker's address, taken from the cross-check list you already keep rather than
    // guessed at: a private tracker's domain moves, and a wrong one is worse than none.
    // The directory's short name is matched against both the label and the key, so BTN
    // finds BroadcasTheNet and PTP finds PassThePopcorn.
    const flat=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,'');
    function trackerLink(name) {
        const target=flat(name);
        if(!target)return '';
        let list=[];
        try{list=trackers?.list?.()||[];}catch{list=[];}
        for(const site of list) {
            if(flat(site.label)!==target&&flat(site.key)!==target)continue;
            const address=String(site.search||'').split(/[?#]/)[0];
            try{const url=new URL(address);return url.protocol==='https:'?url.origin+'/':'';}catch{return '';}
        }
        return '';
    }
    // Names worth suggesting: the trackers already on your list, plus the ones the
    // cross-check knows. Suggestions only — anything you type is accepted.
    function trackerNames() {
        const names=new Set();
        for(const row of internals.all())names.add(row.tracker);
        try{for(const site of trackers?.list?.()||[])names.add(site.label);}catch{}
        return [...names].sort((a,b)=>a.localeCompare(b)).slice(0,300);
    }
    // Adding a group where you meet it: the menu that told you it had no home is also
    // where you give it one, so nothing else has to be opened and nothing is replaced.
    function addForm(tag,onAdded) {
        const wrap=el('form',undefined,'dk-group-add');
        const id='dk-group-add-'+Math.random().toString(36).slice(2,8);
        const label=el('label','Add '+tag+' to a tracker');label.htmlFor=id;
        const input=el('input');input.id=id;input.type='text';input.autocomplete='off';
        input.maxLength=48;input.placeholder='Tracker name';
        const listId=id+'-names',datalist=el('datalist');datalist.id=listId;
        for(const name of trackerNames()){const option=el('option');option.value=name;datalist.append(option);}
        input.setAttribute('list',listId);
        const go=el('button','Add');go.type='submit';
        const said=el('small');said.setAttribute('role','status');
        wrap.append(label,input,datalist,go,said);
        wrap.onsubmit=event=>{
            event.preventDefault();
            const result=internals.add(tag,input.value);
            if(!result.added){said.textContent=result.reason||'Not added.';input.focus();return;}
            onAdded?.();
        };
        return wrap;
    }
    function entries(tag) {
        const rows=[],homes=internals.homes(tag);
        // A group can be internal at several trackers, and the list says so rather than
        // picking one. "Listed as", not "is": this is a community directory, not a fact.
        for(const home of homes) {
            const href=home.url||trackerLink(home.tracker);
            rows.push({label:'Listed as internal at '+home.tracker+(home.inactive?' — marked inactive':''),
                href,note:href||!trackers?'':'no address on the list — add one in Internal groups…'});
        }
        if(!homes.length)rows.push({note:'No home tracker recorded for '+tag+
            '. Add one in Internal groups… if you know it.'});
        rows.push({label:'Releases by '+tag+' on this tracker',href:hereSearch(tag)});
        // The trackers you have chosen for the cross-check, searched for the group name
        // itself. Built by the same module as the request links, so one address list serves
        // both and a tracker that cannot carry the search is left out with its reason.
        let found={links:[]};
        try{found=requests.search({name:tag,category:''},{exact:true});}catch{found={links:[]};}
        for(const link of found.links.slice(0,12))rows.push({label:link.label,href:link.url});
        return rows;
    }
    function open(mark,tag) {
        close();
        menu=el('div',undefined,MENU);
        menu.setAttribute('role','dialog');
        menu.setAttribute('aria-label','Release group '+tag);
        menu.append(el('strong',tag));
        const list=el('ul');
        for(const row of entries(tag)) {
            const item=el('li');
            if(row.href) {
                const link=el('a',row.label);link.href=row.href;link.rel='noopener noreferrer';
                if(/^https?:/i.test(row.href))link.target='_blank';
                item.append(link);
            } else item.append(el('span',row.label||''));
            if(row.note)item.append(el('small',row.note));
            list.append(item);
        }
        menu.append(list);
        menu.append(addForm(tag,()=>open(mark,tag)));
        menu.append(el('small',internals.usingDefaults()
            ? 'From the internal-groups directory this ships with. Edit it in Internal groups…'
            : 'From your own internal-groups list.'));
        const shut=el('button','Close');shut.type='button';shut.onclick=close;menu.append(shut);
        document.body.append(menu);
        const box=mark.getBoundingClientRect();
        menu.style.top=(box.bottom+window.scrollY+6)+'px';
        menu.style.left=Math.max(8,Math.min(box.left+window.scrollX,window.scrollX+document.documentElement.clientWidth-menu.offsetWidth-8))+'px';
        openFor=mark;mark.setAttribute('aria-expanded','true');
        menu.querySelector('a,button')?.focus();
    }
    // Another script may already have made the tag a link — that is its element, not ours,
    // and taking it over is how two scripts end up fighting over the same text. Only a bare
    // text node ending in the tag is marked.
    function mark(node,tag) {
        if(!node||!tag||node.querySelector?.('.'+CLASS))return null;
        const needle='-'+String(tag);
        const lower=needle.toLowerCase();
        for(const child of node.childNodes)
            if(child.nodeType===1&&String(child.textContent||'').trim().toLowerCase().endsWith(String(tag).toLowerCase()))return null;
        const text=[...node.childNodes].reverse().find(child=>child.nodeType===3&&
            child.nodeValue.replace(/\s+$/,'').toLowerCase().endsWith(lower));
        if(!text)return null;
        const value=text.nodeValue, at=value.toLowerCase().lastIndexOf(lower);
        if(at<0)return null;
        const after=value.slice(at+needle.length);
        const span=el('span',value.substr(at+1,needle.length-1),CLASS);
        span.setAttribute('role','button');span.tabIndex=0;
        span.setAttribute('aria-haspopup','dialog');span.setAttribute('aria-expanded','false');
        span.title='Release group — click for its home tracker and other releases';
        const act=event=>{event.preventDefault();event.stopPropagation();
            if(openFor===span)close();else open(span,span.textContent);};
        span.onclick=act;
        span.onkeydown=event=>{if(event.key==='Enter'||event.key===' ')act(event);};
        text.nodeValue=value.slice(0,at+1);
        text.after(span);
        if(after)span.after(document.createTextNode(after));
        return span;
    }
    document.addEventListener('keydown',event=>{if(event.key==='Escape')close();});
    document.addEventListener('click',event=>{
        if(menu&&!event.target.closest('.'+MENU+',.'+CLASS))close();
    },true);
    // Your list, pasted in and kept here. Nothing ships with it: a group's home tracker is
    // not something this script can know, and inventing one would be worse than blank.
    let dialog=null;
    function editor(after) {
        if(!dialog) {
            dialog=el('dialog',undefined,'dk-listing-dialog dk-hub');
            dialog.setAttribute('aria-labelledby','dk-internals-heading');
            document.body.append(dialog);
        }
        dialog.replaceChildren();
        const head=el('header'),heading=el('h2','Internal groups');heading.id='dk-internals-heading';
        const shut=el('button','Close');shut.type='button';shut.onclick=()=>dialog.close();
        head.append(heading,shut);dialog.append(head);
        const body=el('section',undefined,'dk-hub-content');
        body.append(el('p','Which tracker each release group is internal to. One tracker per line — '+
            'Tracker|group group group — or a whole directory page pasted in as it stands. A group '+
            'followed by (inactive) is kept as inactive; a line of Group | Tracker | https://address '+
            'adds an address to open. Saving replaces the list that ships with the script; clearing '+
            'brings that back. It stays in this browser, nothing is fetched, and no group is assumed.'));
        const area=el('textarea');area.rows=12;area.className='dk-reply-text';
        area.setAttribute('aria-label','Internal groups, one per line');
        area.value=internals.format(internals.all());
        area.placeholder='AnoZu | SomeTracker | https://sometracker.example\nGROUP | AnotherTracker';
        body.append(area);
        // Adding one group appends; only Save list replaces the whole thing.
        const adder=el('form',undefined,'dk-group-add');
        const groupInput=el('input');groupInput.type='text';groupInput.maxLength=40;
        groupInput.placeholder='Group';groupInput.setAttribute('aria-label','Group name');
        const trackerInput=el('input');trackerInput.type='text';trackerInput.maxLength=48;
        trackerInput.placeholder='Tracker';trackerInput.setAttribute('aria-label','Tracker name');
        const addButton=el('button','Add');addButton.type='submit';
        const said=el('small');said.setAttribute('role','status');
        adder.append(groupInput,trackerInput,addButton,said);
        body.append(adder);
        const row=el('div',undefined,'dk-row'),count=el('small');
        const show=list=>{const trackers=new Set(list.map(row=>row.tracker)).size;
            count.textContent=list.length+' group'+(list.length===1?'':'s')+' across '+trackers+
                ' tracker'+(trackers===1?'':'s')+(internals.usingDefaults()?' — the list this ships with':' — your own list');};
        show(internals.all());
        adder.onsubmit=event=>{
            event.preventDefault();
            const result=internals.add(groupInput.value,trackerInput.value);
            said.textContent=result.added
                ? groupInput.value.trim()+' added to '+trackerInput.value.trim()+'.'
                : (result.reason||'Not added.');
            if(result.added){groupInput.value='';trackerInput.value='';
                area.value=internals.format(result.list);show(result.list);after?.();}
            groupInput.focus();
        };
        const save=el('button','Save list');save.type='button';
        save.onclick=()=>{const before=internals.all().length;
            const saved=internals.save(internals.parse(area.value));
            area.value=internals.format(saved);show(saved);
            said.textContent='Saved: '+saved.length+' entries'+
                (saved.length<before?' — '+(before-saved.length)+' fewer than before':'')+'.';
            after?.();};
        const clear=el('button','Clear list');clear.type='button';
        clear.onclick=()=>{internals.clear();area.value=internals.format(internals.all());show(internals.all());after?.();};
        row.append(save,clear);body.append(row,count);
        dialog.append(body);
        if(!dialog.open)dialog.showModal();
    }
    return {mark,close,editor,CLASS,MENU};
})(typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./internals.js'):DKOKTO_INTERNALS,
   typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./requests-core.js'):DKOKTO_REQUESTS_CORE,
   typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./trackers.js'):DKOKTO_TRACKERS);

// Which requests you have already cross-checked, so a sweep down the list does not
// repeat itself. Ids and dates only, kept in this browser, bounded and never sent.
const DKOKTO_REQUESTS_SEEN = (() => {
    const KEY='dkokto_requests_seen_v1',MAX=500;
    let backing=null;
    const storage=()=>{if(backing)return backing;try{return localStorage;}catch{return null;}};
    const idOf=value=>{const match=String(value??'').match(/(?:^|\/requests\/)(\d{1,12})\/?$/);return match?match[1]:'';};
    function read() {
        const store=storage();if(!store)return {};
        try{
            const parsed=JSON.parse(store.getItem(KEY)||'null');
            if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))return {};
            const out={};
            for(const [id,when] of Object.entries(parsed).slice(-MAX))
                if(/^\d{1,12}$/.test(id)&&Number.isFinite(Number(when))&&Number(when)>0)out[id]=Number(when);
            return out;
        }catch{return {};}
    }
    function write(state) {
        const store=storage();if(!store)return state;
        const entries=Object.entries(state).sort((a,b)=>a[1]-b[1]).slice(-MAX);
        try{store.setItem(KEY,JSON.stringify(Object.fromEntries(entries)));}catch{}
        return Object.fromEntries(entries);
    }
    function mark(value,when=Date.now()) {
        const id=idOf(value);if(!id)return '';
        const state=read();state[id]=when;write(state);return id;
    }
    const when=value=>{const id=idOf(value);return id?read()[id]||0:0;};
    const count=()=>Object.keys(read()).length;
    function clear(){const store=storage();try{store?.removeItem(KEY);}catch{}return 0;}
    // "8 Sep" — short enough to sit beside a request row.
    function label(value) {
        const at=when(value);
        if(!at)return '';
        try{return new Date(at).toLocaleDateString(undefined,{day:'numeric',month:'short'});}
        catch{return new Date(at).toISOString().slice(0,10);}
    }
    return {mark,when,label,count,clear,idOf,use(store){backing=store;},KEY,MAX};
})();

// Cross-check: for a request on this site — or the release on a torrent page, or any
// title you select — offer the same search on the trackers you are a member of.
// Reads the loaded page only. Nothing is fetched, submitted or downloaded; a tracker
// search opens in a new tab only when you click it, and runs on that site as you.
const DKOKTO_REQUESTS = (() => {
    // This script's own additions, on any page: watching them would wake this module again.
    const own='.dk-request-links,.dk-request-bar,.dk-request-open,.dk-request-seen,.dk-listing-dialog,.dk-listing-badge,.dk-listing-bar,.dk-detail-badge,.dk-detail-links,.dk-hub';
    // The chatbox and the ticker change constantly and never hold a listing, so their
    // churn is not a reason to look at the page again (a giveaway or chat script can
    // otherwise keep this awake).
    const noise='.chatbox,#chatbox,[class*="chatbox"],.ticker,[class*="ticker"],[class*="chat-"],#chat';
    // openedOn: where the dialog was opened, so a real navigation closes it and a
    // redraw does not.
    let mounted=false,dialog,returnFocus,timer,floating,openedOn='';
    const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
    const listPage=()=>/^\/requests\/?$/.test(location.pathname);
    const onePage=()=>/^\/requests\/\d+\/?$/.test(location.pathname);
    const torrentPage=()=>/^\/torrents\/\d+\/?$/.test(location.pathname);
    const active=()=>listPage()||onePage()||torrentPage();
    const isRequestLink=a=>{try{const url=new URL(a.getAttribute('href'),location.href);
        return url.origin===location.origin&&/^\/requests\/\d+\/?$/.test(url.pathname);}catch{return false;}};
    function rowCategory(node) {
        const row=node.closest('tr,.request-card,.panel,li')||document;
        // A real category cell first. An image's alt text is only trusted when it reads
        // like a category and not like a format, because on some layouts the first image
        // in a row is the format icon — and the first match in the document may not even
        // belong to this row.
        const FORMAT=/^(?:\d{3,4}[pi]|WEB-?DL|WEBRip|Blu-?Ray|REMUX|HDTV|DVD|Full Disc|Encode|FLAC|MP3|CB[RZ]|EPUB|PDF)\b/i;
        const cell=row.querySelector('[class*="category"]');
        const text=cell?.textContent?.trim()||cell?.querySelector?.('img[alt]')?.getAttribute('alt')||'';
        if(text)return text.slice(0,80);
        for(const image of row.querySelectorAll('img[alt]')) {
            const alt=(image.getAttribute('alt')||'').trim();
            if(alt&&alt.length<=40&&!FORMAT.test(alt))return alt.slice(0,80);
        }
        return '';
    }
    function pageTitle() {
        for(const heading of document.querySelectorAll('main h1,main h2,h1,h2')) {
            if(heading.closest(own))continue;
            const text=heading.textContent.replace(/\s+/g,' ').trim();
            if(text.length<3||text.length>300)continue;
            if(/^(?:requests?|torrents?|home|dashboard|forums?|search)$/i.test(text))continue;
            return {node:heading,title:text};
        }
        return null;
    }
    function pageCategory() {
        const node=document.querySelector('.request__category,.torrent__category,[class*="category"]');
        return (node?.textContent?.trim()||document.querySelector('main img[alt]')?.getAttribute('alt')||'').slice(0,80);
    }
    function copyButton(label,build,cls='dk-detail-copy') {
        const button=el('button',label);button.type='button';button.className=cls;
        button.onclick=async()=>{const value=build();
            try{await navigator.clipboard.writeText(value);button.textContent='Copied';setTimeout(()=>button.textContent=label,1400);}
            catch{window.prompt('Copy this text:',value);}};
        return button;
    }
    // Browsers allow one tab per click and refuse the rest of a burst. That is a limit,
    // not an error, so it is reported plainly and answered with a route that always
    // works: one click, one tracker, no browser permission needed.
    const openOne=link=>{try{return !!window.open(link.url,'_blank','noopener');}catch{return false;}};
    function openAll(links) {
        const opened=[],blocked=[];
        for(const link of links)(openOne(link)?opened:blocked).push(link);
        DKOKTO_TRACKERS.notePopups(blocked.length>0);
        return {opened,blocked};
    }
    const openedMessage=({opened,blocked})=>
        (opened.length?'Opened '+opened.length+' tab'+(opened.length===1?'':'s')+'. ':'')+
        (blocked.length?'Your browser blocked the other '+blocked.length+' — that is its one-tab-per-click limit, not an error. Open them one at a time below, or allow pop-ups for this site (the blocked-pop-up icon in the address bar) and Search all works in one go.'
            :opened.length?'Each one is that tracker’s own search.':'Nothing to open.');
    // One button that walks through the remaining trackers, one click each.
    function stepper(links,where,message) {
        where.querySelector('.dk-request-step')?.remove();
        let index=0;
        const button=el('button',undefined,'dk-request-step dk-listing-copy');button.type='button';
        const draw=()=>{
            if(index>=links.length){button.textContent='All '+links.length+' opened';button.disabled=true;return;}
            button.textContent='Open '+links[index].label+' ▸'+(links.length-index>1?' ('+(links.length-index)+' left)':'');
            button.title='Opens '+links[index].label+' in a new tab';
        };
        button.onclick=()=>{
            const link=links[index];
            if(!link)return;
            if(openOne(link)){index++;draw();if(index>=links.length&&message)message.textContent='All '+links.length+' opened, one click each.';}
            else if(message)message.textContent='Your browser refused even a single tab. Allow pop-ups for this site, or use “Copy every link” and paste them.';
        };
        draw();where.append(button);
        return button;
    }
    function ensureDialog(labelId) {
        if(!dialog){dialog=el('dialog',undefined,'dk-listing-dialog dk-hub');dialog.id='dkokto-request-dialog';document.body.append(dialog);
            dialog.addEventListener('close',()=>returnFocus?.isConnected&&returnFocus.focus());}
        dialog.setAttribute('aria-labelledby',labelId);dialog.replaceChildren();
        openedOn=location.pathname;
        return dialog;
    }
    function head(box,text,id) {
        const bar=el('header'),heading=el('h2',text);heading.id=id;
        const close=el('button','Close');close.type='button';close.onclick=()=>box.close();
        bar.append(heading,close);box.append(bar);
        return el('section',undefined,'dk-hub-content');
    }
    // Which trackers you are on, and the address of each one's search page.
    function settings(after) {
        const box=ensureDialog('dk-request-settings-heading');
        const body=head(box,'Trackers you are on','dk-request-settings-heading');
        body.append(el('p','Tick the trackers you have an account on. A request then offers the same search on each of them, opened in a new tab when you click it. Nothing is contacted in the background, no logins or keys are stored, and a search that finds nothing is not proof the release is not there.'));
        const message=el('p','','dk-hub-message');message.setAttribute('role','status');
        const entries=DKOKTO_TRACKERS.list(),boxes=new Map(),urls=new Map();
        const groups=[['video','Movies and TV'],['movie','Movies'],['tv','TV'],['anime','Anime'],['music','Music'],['book','Books'],['game','Games and software'],['general','General']];
        for(const [kind,label] of groups) {
            const mine=entries.filter(entry=>entry.kind===kind);
            if(!mine.length)continue;
            const group=el('fieldset',undefined,'dk-tracker-group'),legend=el('legend',label);group.append(legend);
            for(const entry of mine) {
                const row=el('div',undefined,'dk-tracker-row'),tick=el('label'),input=el('input');
                input.type='checkbox';input.checked=entry.on;boxes.set(entry.key,input);
                tick.append(input,document.createTextNode(entry.label+(entry.custom?' (added by you)':'')));
                const address=el('input');address.type='text';address.className='dk-tracker-url';address.value=entry.search;
                address.setAttribute('aria-label',entry.label+' search address');
                address.title='The site’s own search page. {q} is where the title goes; {imdb} an IMDb ID.';
                urls.set(entry.key,address);
                row.append(tick,address);
                if(entry.custom) {
                    const drop=el('button','Remove');drop.type='button';drop.className='dk-detail-copy';
                    drop.onclick=()=>{DKOKTO_TRACKERS.remove(entry.key);settings(after);};
                    row.append(drop);
                }
                group.append(row);
            }
            body.append(group);
        }
        // Anything not in the built-in list: name it and give its search address.
        const extra=el('fieldset',undefined,'dk-tracker-group'),legend=el('legend','Add another tracker');extra.append(legend);
        const name=el('input');name.type='text';name.placeholder='Tracker name';name.setAttribute('aria-label','Tracker name');
        const address=el('input');address.type='text';address.className='dk-tracker-url';
        address.placeholder='https://example.org/torrents?name={q}';address.setAttribute('aria-label','Search address');
        const kind=el('select');kind.setAttribute('aria-label','What it carries');
        for(const [value,text] of [['general','Everything'],['video','Movies and TV'],['movie','Movies'],['tv','TV'],['anime','Anime'],['music','Music'],['book','Books'],['game','Games']]) {
            const option=el('option',text);option.value=value;kind.append(option);
        }
        const addButton=el('button','Add');addButton.type='button';addButton.className='dk-detail-copy';
        addButton.onclick=()=>{
            if(!name.value.trim())return message.textContent='Give the tracker a name.';
            if(!DKOKTO_TRACKERS.valid(address.value))return message.textContent='The address must be an https search page containing {q} — for example https://example.org/torrents?name={q}.';
            save(false);
            if(!DKOKTO_TRACKERS.add({label:name.value,search:address.value,kind:kind.value}))return message.textContent='That tracker could not be added.';
            settings(after);
        };
        const row=el('div',undefined,'dk-tracker-row');row.append(name,address,kind,addButton);extra.append(row);
        body.append(extra);
        function save(close=true) {
            const keys=[];
            for(const [key,input] of boxes) {
                if(input.checked)keys.push(key);
                const value=urls.get(key)?.value?.trim();
                if(value&&!DKOKTO_TRACKERS.setSearch(key,value)){message.textContent='The address for '+key+' is not a usable https search, so it was left alone.';}
            }
            DKOKTO_TRACKERS.setEnabled(keys);
            if(close){box.close();draw();after?.();}
        }
        const done=el('button','Save');done.type='button';done.className='dk-listing-copy';done.onclick=()=>save(true);
        body.append(done,message);
        box.append(body);if(!box.open)box.showModal();
    }
    // The links for one title, with everything you can do with them.
    function show(request,{editable=false}={}) {
        const box=ensureDialog('dk-request-heading');
        const body=head(box,editable?'Search your trackers':'Is this already on your trackers?','dk-request-heading');
        const result=DKOKTO_REQUESTS_CORE.search(request,{ids:DKOKTO_LINKS_CORE.ids(document)});
        if(request.url)DKOKTO_REQUESTS_SEEN.mark(request.url);
        if(editable) {
            const label=el('label','Title to search');label.className='dk-request-term';
            const input=el('input');input.type='text';input.value=request.name||'';input.setAttribute('aria-label','Title to search');
            input.onchange=()=>show({...request,name:input.value},{editable:true});
            input.onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();show({...request,name:input.value},{editable:true});}};
            label.append(input);body.append(label);
            setTimeout(()=>input.focus(),0);
        } else body.append(el('h3',request.name));
        body.append(el('p',result.term?'Search term: “'+result.term+'” · '+result.parsed.kind+(request.source==='torrent'?' release':' request')+'. Each link opens that tracker’s own search in a new tab, signed in as you. Nothing is fetched from here.'
            :'That name could not be reduced to a searchable title, so no searches are offered.'));
        if(!DKOKTO_TRACKERS.count())body.append(el('p','No trackers chosen yet. Choose the ones you are a member of and they appear here.'));
        const message=el('p','','dk-hub-message');message.setAttribute('role','status');
        if(result.links.length) {
            const row=el('nav',undefined,'dk-detail-links dk-request-links');row.setAttribute('aria-label','Searches on your trackers');
            row.append(el('span','Search:','dk-detail-links-label'));
            for(const link of result.links) {
                const a=el('a',link.label);a.href=link.url;a.target='_blank';a.rel='noopener noreferrer';a.title=link.note;
                if(link.exact)a.dataset.exact='yes';
                row.append(a);
            }
            body.append(row);
        }
        if(result.skipped.length)body.append(el('p','Not offered: '+result.skipped.map(entry=>entry.label+' — '+entry.reason).join(' · ')+'.'));
        const actions=el('div',undefined,'dk-row');
        const stepRow=el('div',undefined,'dk-row');
        if(result.links.length) {
            // A browser that refused a burst before is offered the route that works first.
            const stepFirst=DKOKTO_TRACKERS.popupsBlocked();
            const all=el('button',stepFirst?'Try Search all '+result.links.length+' again':'Search all '+result.links.length+' trackers');
            all.type='button';all.className=stepFirst?'dk-detail-copy':'dk-listing-copy';
            all.onclick=()=>{
                const outcome=openAll(result.links);
                message.textContent=openedMessage(outcome);
                if(outcome.blocked.length)stepper(outcome.blocked,stepRow,message);
                else stepRow.querySelector('.dk-request-step')?.remove();
                if(request.url)DKOKTO_REQUESTS_SEEN.mark(request.url);draw();
            };
            actions.append(all);
            if(stepFirst) {
                stepper(result.links,stepRow,message);
                message.textContent='This browser blocked a burst of tabs last time, so they are offered one at a time — one click each, no permission needed.';
            }
        }
        actions.append(copyButton('Copy the search term',()=>result.term),
            copyButton('Copy every link',()=>DKOKTO_REQUESTS_CORE.report(request,result)));
        if(request.source==='torrent')actions.append(copyButton('Copy the release name',()=>request.name));
        const choose=el('button','Choose trackers');choose.type='button';choose.className='dk-detail-copy';
        choose.onclick=()=>settings(()=>show(request,{editable}));
        actions.append(choose);body.append(actions,stepRow,message);
        body.append(el('small','A search finding nothing is not proof that the release does not exist there — it is one site’s own name search. Check the rules of the other tracker before moving anything.'));
        box.append(body);if(!box.open)box.showModal();
    }
    function bar() {
        if(!listPage())return document.querySelector('.dk-request-bar')?.remove();
        const root=document.querySelector('main')||document.body;
        let node=document.querySelector('.dk-request-bar');
        if(!node){node=el('div',undefined,'dk-listing-bar dk-request-bar');root.prepend(node);}
        const chosen=DKOKTO_TRACKERS.count(),checked=DKOKTO_REQUESTS_SEEN.count();
        // Rebuilt only when something changed, so an idle page stays idle.
        const signature=chosen+'/'+checked;
        if(node.dataset.trackers===signature)return;
        node.dataset.trackers=signature;node.replaceChildren();
        node.append(el('span','Request cross-check'),
            el('span',chosen?chosen+' tracker'+(chosen===1?'':'s')+' saved':'No trackers chosen yet'));
        const choose=el('button',chosen?'Choose trackers':'Choose your trackers');choose.type='button';choose.className='dk-listing-audit';
        choose.setAttribute('aria-haspopup','dialog');choose.onclick=()=>{returnFocus=choose;settings();};
        node.append(choose);
        if(checked) {
            const clear=el('button','Clear '+checked+' checked');clear.type='button';clear.className='dk-listing-audit';
            clear.title='Forget which requests you have already cross-checked';
            clear.onclick=()=>{DKOKTO_REQUESTS_SEEN.clear();draw();};
            node.append(clear);
        }
        node.append(el('small','Each request row gets a search button, and a tick once you have checked it. Links only: nothing is fetched, and no other tracker is contacted until you click.'));
    }
    function rowButtons() {
        for(const link of document.querySelectorAll('a[href]')) {
            if(!isRequestLink(link)||link.closest(own))continue;
            const name=link.textContent.replace(/\s+/g,' ').trim();
            if(name.length<2)continue;
            let button=link.nextElementSibling?.classList?.contains('dk-request-open')?link.nextElementSibling:null;
            if(!button){button=el('button','⇗ trackers','dk-request-open');button.type='button';button.setAttribute('aria-haspopup','dialog');link.after(button);}
            button.title='Search this request on the trackers you are on';
            button.setAttribute('aria-label','Search “'+name+'” on the trackers you are on');
            button.onclick=event=>{event.preventDefault();event.stopPropagation();returnFocus=button;
                show({name,category:rowCategory(link),url:link.href});draw();};
            // A tick, and when, for a request you have already cross-checked.
            const stamp=DKOKTO_REQUESTS_SEEN.label(link.href);
            let mark=button.nextElementSibling?.classList?.contains('dk-request-seen')?button.nextElementSibling:null;
            if(!stamp){mark?.remove();continue;}
            if(!mark){mark=el('span',undefined,'dk-request-seen');button.after(mark);}
            const text='✓ '+stamp;
            if(mark.textContent!==text)mark.textContent=text;
            mark.title='You cross-checked this request on '+stamp;
        }
    }
    // A row of tracker searches under the title, on a request's page or a torrent page.
    function attachedRow() {
        const existing=document.querySelector('.dk-request-page');
        if(!onePage()&&!torrentPage()){existing?.remove();return;}
        const source=torrentPage()?'torrent':'request';
        const found=source==='torrent'?DKOKTO_RELEASE_TITLE.find(document):pageTitle();
        if(!found||!found.title||source==='torrent'&&!found.score){existing?.remove();return;}
        const request={name:found.title,category:pageCategory(),url:location.origin+location.pathname,source};
        const result=DKOKTO_REQUESTS_CORE.search(request,{ids:DKOKTO_LINKS_CORE.ids(document)});
        // Rebuilt only when something actually changed, so the page is not churned.
        const signature=found.title+'\n'+result.links.map(link=>link.url).join('|');
        if(existing){if(existing.dataset.signature===signature)return;existing.remove();}
        const row=el('nav',undefined,'dk-detail-links dk-request-links dk-request-page');row.dataset.signature=signature;
        row.setAttribute('aria-label','Search this title on your trackers');
        row.append(el('span',result.links.length?'On your trackers:':'Cross-check:','dk-detail-links-label'));
        for(const link of result.links.slice(0,12)) {
            const a=el('a',link.label);a.href=link.url;a.target='_blank';a.rel='noopener noreferrer';a.title=link.note;
            if(link.exact)a.dataset.exact='yes';
            row.append(a);
        }
        if(result.links.length>1) {
            const all=el('button','Search all');all.type='button';all.className='dk-detail-copy';
            all.title='Open every one of these searches in its own tab';
            all.onclick=()=>{
                const outcome=openAll(result.links);
                if(source==='request')DKOKTO_REQUESTS_SEEN.mark(request.url);
                // Whatever the browser refused is offered one at a time in the dialog.
                if(outcome.blocked.length){returnFocus=all;show(request);}
                draw();
            };
            row.append(all);
        }
        const more=el('button',result.links.length?'Details':'Choose your trackers');more.type='button';more.className='dk-detail-copy';
        more.setAttribute('aria-haspopup','dialog');
        more.onclick=()=>{returnFocus=more;result.links.length?show(request):settings(()=>draw());};
        row.append(more);
        // Under this script's own lookup rows where they exist, otherwise under the title.
        const rows=[...document.querySelectorAll('.dk-detail-links:not(.dk-request-links)')];
        const anchor=rows.at(-1)||found.node;
        (anchor.parentElement||anchor).insertBefore(row,anchor.nextSibling);
    }
    // Any title you select on this site, or Alt+Shift+T on its own.
    function selectionText() {
        let value='';
        try{value=String(window.getSelection?.()||'').replace(/\s+/g,' ').trim();}catch{value='';}
        return value.length>=4&&value.length<=300&&!/[\n\r]/.test(value)?value:'';
    }
    function askFor(name) {
        returnFocus=null;
        show({name:name||selectionText()||DKOKTO_RELEASE_TITLE.find(document)?.title||'',category:pageCategory()},{editable:true});
    }
    function floatButton() {
        const text=selectionText();
        if(!text||dialog?.open){floating?.remove();floating=null;return;}
        let range;try{range=window.getSelection().getRangeAt(0).getBoundingClientRect();}catch{range=null;}
        if(!range||!range.width&&!range.height){floating?.remove();floating=null;return;}
        if(!floating){floating=el('button','⇗ trackers','dk-request-open dk-request-float');floating.type='button';
            floating.setAttribute('aria-haspopup','dialog');document.body.append(floating);}
        floating.title='Search the selected title on the trackers you are on (Alt+Shift+T)';
        floating.style.top=(range.bottom+window.scrollY+6)+'px';
        floating.style.left=(range.left+window.scrollX)+'px';
        floating.onclick=()=>{const value=text;floating?.remove();floating=null;askFor(value);};
    }
    function draw() {
        if(!active()) {
            // The page additions belong to /requests and a torrent page; the dialog does
            // not. It is opened from Alt+Shift+T and from a selection, on any page — so a
            // redraw must never close it. Only leaving the page it was opened on does.
            document.querySelectorAll('.dk-request-bar,.dk-request-page,.dk-request-open,.dk-request-seen').forEach(node=>node.remove());
            floating=null;return;
        }
        bar();rowButtons();attachedRow();
    }
    function closeOnNavigation(){if(dialog?.open&&openedOn&&location.pathname!==openedOn)dialog.close();}
    // One pass per quarter second at most, and never starved by a page that keeps changing.
    function schedule(){if(timer)return;timer=setTimeout(()=>{timer=null;draw();},250);}
    function mount() {
        draw();
        if(mounted)return;mounted=true;
        new MutationObserver(records=>{
            if(records.some(record=>{const node=record.target.nodeType===1?record.target:record.target.parentElement;
                return node&&!node.closest(own)&&!node.closest(noise);}))schedule();
        }).observe(document.body,{subtree:true,childList:true,characterData:true});
        for(const event of ['popstate','livewire:navigated'])
            (event==='popstate'?window:document).addEventListener(event,()=>{closeOnNavigation();schedule();});
        window.addEventListener('keydown',event=>{
            if(event.altKey&&event.shiftKey&&event.code==='KeyT'&&!event.ctrlKey&&!event.metaKey&&!event.repeat) {
                event.preventDefault();askFor('');
            }
        });
        // The selection button is drawn only in response to selecting something.
        for(const type of ['mouseup','keyup'])document.addEventListener(type,event=>{
            if(event.target?.closest?.(own+',input,textarea'))return;
            setTimeout(floatButton,0);
        });
        document.addEventListener('scroll',()=>{if(floating){floating.remove();floating=null;}},{passive:true});
    }
    return {mount,draw,settings,ask:askFor};
})();

// Standalone host shell for the Torrent Inspector.
// Supplies the dialog, launcher, helpers and private-note storage that the
// inspector, naming and listing modules expect. No requests are made here.
const DPTI_HOST = (() => {
    const key='dp_torrent_inspector_v1',legacyKey='dkokto_workbench_v1';
    let settings={notes:{}},dialog,content,mounted=false;

    const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
    const button=(label,fn)=>{const b=el('button',label);b.type='button';b.onclick=fn;return b;};
    const link=(label,url)=>{const a=el('a',label);a.href=url;if(url.startsWith('https://')){a.target='_blank';a.rel='noopener noreferrer';}return a;};
    const message=text=>{const m=dialog?.querySelector('.dk-hub-message');if(m)m.textContent=text;};
    const guard=fn=>async()=>{try{await fn();}catch(e){message(e.message);}};
    function field(parent,label,value='',type='text'){const row=el('label',label),input=el('input');input.type=type;input.value=value;row.append(input);parent.append(row);return input;}
    function download(name,text){const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'})),a=link(name,url);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}

    // Allow-listed note storage only: numeric torrent IDs mapped to bounded text.
    function normalize(value){const notes={},source=value&&typeof value.notes==='object'&&value.notes?value.notes:{};
        for(const [id,note] of Object.entries(source).slice(0,200))if(/^\d{1,12}$/.test(id)&&typeof note==='string')notes[id]=note.slice(0,20000);
        return {notes};}
    function read(name){try{return JSON.parse(localStorage.getItem(name)||'null');}catch{return null;}}
    function load(){const own=normalize(read(key));
        // Read-only carry-over of notes written by the full DKOKTO toolkit; the
        // original entry is never modified or removed.
        if(!Object.keys(own.notes).length)Object.assign(own.notes,normalize(read(legacyKey)).notes);
        return own;}
    function save(){try{localStorage.setItem(key,JSON.stringify(settings));}catch{throw Error('Private notes could not be saved in this browser.');}}

    function open(){
        if(!dialog){dialog=el('dialog',undefined,'dk-hub');dialog.id='dp-inspector-hub';dialog.setAttribute('aria-labelledby','dp-inspector-title');
            const head=el('header'),title=el('h2','Torrent Inspector');title.id='dp-inspector-title';head.append(title,button('Close',()=>dialog.close()));
            content=el('section',undefined,'dk-hub-content');const status=el('p','','dk-hub-message');status.setAttribute('role','status');
            dialog.append(head,content,status);document.body.append(dialog);}
        settings=load();content.replaceChildren();message('');
        DKOKTO_INSPECTOR_UI.render({content,settings,save,message,guard,el,field,button,link,download});
        if(!dialog.open)dialog.showModal();
    }

    // The full DKOKTO Scene Edition already contains these modules. Running both
    // copies would duplicate badges and launchers, so this one steps aside.
    const fullEditionPresent=()=>!!document.querySelector('#dkokto-tools,.dk-toolkit-launch,.dk-listing-bar,.dk-listing-badge');

    function mount(){
        if(mounted)return;
        if(fullEditionPresent()){console.info('Torrent Inspector: the full DKOKTO edition is active on this page, so the standalone copy stayed inactive.');return;}
        mounted=true;settings=load();
        const tools=el('div',undefined,undefined);tools.id='dp-inspector-tools';
        const launch=button('Inspect torrent',()=>open());launch.className='dk-inspector-launch';launch.title='MediaInfo review and DP naming check · Alt+Shift+I';
        tools.append(launch);document.body.append(tools);
        window.addEventListener('keydown',e=>{if(e.altKey&&e.shiftKey&&e.code==='KeyI'&&!e.ctrlKey&&!e.metaKey){e.preventDefault();open();}});
        DKOKTO_LISTING.mount();
        DKOKTO_DETAIL.mount();
        DKOKTO_REQUESTS.mount();
    }
    return {mount,open,get:()=>settings};
})();

    // --- INIT ---
    function start() {
        const style = document.createElement('style');
        style.id = 'dp-inspector-style';
        style.textContent = DPTI_CSS;
        document.head.append(style);
        DPTI_HOST.mount();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once: true});
    else start();
})();
