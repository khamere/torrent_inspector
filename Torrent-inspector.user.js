// ==UserScript==
// @name         Torrent Inspector
// @namespace    dkokto.torrent.inspector
// @version      1.7.3
// @description  Torrent Inspector and automatic listing naming badges, extracted from the DKOKTO Scene Edition. Reads the page only; makes no requests.
// @author       🤖T.R.A.V.I.S (original Chungus Edition); DKOKTO personal customization
// @match        https://darkpeers.org/*
// @match        https://www.darkpeers.org/*
// @run-at       document-idle
// @updateURL    none
// @downloadURL  none
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const DPTI_CSS = "/* Standalone Torrent Inspector styling. Scoped to this script's own dialog,\n   launcher and listing badges; site theming is left untouched. */\n#dp-inspector-tools { position:fixed; right:14px; bottom:14px; z-index:2147482000; display:flex; gap:8px; }\n#dp-inspector-tools button { font:600 14px/1.2 \"Segoe UI\",system-ui,sans-serif; color:#f4e8ff; background:#3d2551; border:1px solid #a97fc6; border-radius:5px; padding:10px 14px; cursor:pointer; box-shadow:0 2px 10px #0009; }\n#dp-inspector-tools button:hover { background:#643784; }\n#dp-inspector-tools button:focus-visible { outline:2px solid #e8ceff; outline-offset:2px; }\n\n.dk-hub { box-sizing:border-box; width:min(940px,calc(100vw - 24px)); max-height:88dvh; padding:0; overflow:auto; background:#15101d; color:#f0e9f6; border:1px solid #af83c8; border-radius:6px; font:15px/1.5 \"Segoe UI\",system-ui,sans-serif; }\n.dk-hub::backdrop { background:#07040bcc; }\n.dk-hub header { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:16px 20px; background:linear-gradient(#392447,#20152b); }\n.dk-hub h2 { margin:0; font:600 22px Consolas,monospace; }\n.dk-hub-content { padding:16px 20px; }\n.dk-hub :is(button,input,select,textarea) { box-sizing:border-box; font:inherit; color:#f4e8ff; background:#24182f; border:1px solid #9873b0; border-radius:3px; padding:8px 10px; min-width:0; }\n.dk-hub button { cursor:pointer; }\n.dk-hub button:hover,.dk-hub button[aria-pressed=true] { background:#643784; }\n.dk-hub button:disabled { opacity:.5; cursor:default; }\n.dk-hub input:not([type=checkbox]),.dk-hub textarea { width:100%; }\n.dk-hub input[type=checkbox] { width:20px; height:20px; accent-color:#ad71d1; }\n.dk-hub label { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:8px; margin:12px 0; }\n.dk-hub a { color:#e0b6ff; overflow-wrap:anywhere; }\n.dk-hub :is(button,a,input,textarea,select,summary):focus-visible { outline:2px solid #e8ceff; outline-offset:2px; }\n.dk-hub .dk-row { display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin:10px 0; }\n.dk-hub .dk-row a { flex:1; min-width:140px; }\n.dk-hub pre { background:#0c0811; padding:12px; max-height:45dvh; overflow:auto; white-space:pre-wrap; overflow-wrap:anywhere; font:13px/1.5 Consolas,monospace; }\n.dk-hub table { width:100%; border-collapse:collapse; }\n.dk-hub th,.dk-hub td { text-align:left; padding:6px; border-bottom:1px solid #493357; }\n.dk-hub td label { font-size:0; margin:0; }\n.dk-hub td select { font-size:14px; width:100%; }\n.dk-hub-message { padding:0 20px 16px; color:#e2bcfc; white-space:pre-wrap; }\n.dk-hub details { padding:12px 0; border-top:1px solid #624771; }\n.dk-hub summary { cursor:pointer; }\n\n.dk-inspector-table { overflow-x:auto; max-width:100%; }\n.dk-hub .dk-inspector-table table { min-width:640px; font-size:13px; }\n.dk-hub .dk-inspector-table td { vertical-align:top; overflow-wrap:anywhere; max-width:240px; }\n.dk-inspector-checks { padding:10px 14px; background:#25182f; border-left:3px solid #bd91d9; }\n.dk-naming { border:1px solid #725587; padding:12px; margin:12px 0 20px; background:#1c1425; }\n.dk-naming .dk-naming-status { font-weight:700; color:#ead7ff; }\n.dk-naming .dk-naming-errors { border-left:3px solid #e9ad71; padding-left:24px; }\n.dk-naming li { margin:8px 0; }\n.dk-naming details { margin:12px 0; }\n.dk-naming summary { cursor:pointer; color:#dabcdf; }\n\n.dk-listing-bar { display:flex; flex-wrap:wrap; gap:8px 20px; align-items:center; padding:12px; margin:8px 0; background:#21162b; border:1px solid #725587; color:#f0e9f6; font:14px/1.5 'Segoe UI',sans-serif; }\n.dk-listing-bar label { display:flex; gap:8px; align-items:center; cursor:pointer; }\n.dk-listing-bar input[type=checkbox] { width:18px; height:18px; accent-color:#ad71d1; }\n.dk-listing-bar small { flex-basis:100%; color:#d2bedf; }\n.dk-listing-bar [role=status] { font-weight:600; }\nbutton.dk-listing-badge { display:inline-flex !important; align-items:center; justify-content:center; vertical-align:middle; flex-shrink:0; width:22px; height:22px; min-width:22px; padding:0 !important; margin:0 0 0 6px !important; border:1px solid currentColor !important; border-radius:4px !important; background:#160f1e !important; font:bold 15px/1 'Segoe UI',sans-serif !important; cursor:pointer; box-shadow:none !important; }\nbutton.dk-listing-badge[data-state=error] { color:#ff666d !important; }\nbutton.dk-listing-badge[data-state=pass] { color:#67df99 !important; }\nbutton.dk-listing-badge[data-state=review] { color:#f1c15b !important; }\nbutton.dk-listing-badge:focus-visible { outline:3px solid #eee !important; outline-offset:2px; }\n.dk-listing-dialog li { margin-block:8px; }\n.dk-listing-dialog h3 { overflow-wrap:anywhere; }\n\n@media(max-width:700px) {\n  #dp-inspector-tools { left:8px; right:8px; bottom:max(8px,env(safe-area-inset-bottom)); justify-content:center; }\n  #dp-inspector-tools button { min-height:44px; width:100%; }\n  .dk-hub { max-height:90dvh; }\n  .dk-hub header,.dk-hub-content { padding:12px; }\n  .dk-hub button { min-height:44px; }\n  .dk-hub input,.dk-hub select,.dk-hub textarea { font-size:16px; }\n  .dk-hub table tr { display:grid; grid-template-columns:1fr 1fr; padding:8px 0; }\n  .dk-hub table tr:first-child { display:none; }\n  .dk-hub table td { border:0; }\n  .dk-hub table td:first-child { grid-column:1/-1; }\n  .dk-hub .dk-inspector-table table tr { display:table-row; }\n  .dk-hub .dk-inspector-table table tr:first-child { display:table-row; }\n  .dk-hub .dk-inspector-table table td { border-bottom:1px solid #493357; }\n  button.dk-listing-badge { width:26px; height:26px; min-width:26px; font-size:17px !important; }\n}\n@media print { .dk-hub,#dp-inspector-tools { display:none !important; } }\n.dk-naming .dk-service-list { max-height:280px; overflow:auto; padding:6px 10px; background:#140e1c; border:1px solid #4b3559; border-radius:3px; }\n.dk-naming .dk-service-list p { margin:5px 0; overflow-wrap:anywhere; }\n.dk-naming .dk-service-list code { display:inline-block; min-width:96px; color:#e2bcfc; font:13px Consolas,monospace; }\n.dk-naming .dk-naming-service { margin:4px 0 8px; color:#cbb0e4; font:13px Consolas,monospace; }\nbutton.dk-listing-badge.dk-detail-badge { width:24px; height:24px; min-width:24px; font-size:16px !important; margin:0 0 0 8px !important; vertical-align:middle; }\n.dk-detail-links { display:flex; flex-wrap:wrap; align-items:center; gap:6px; margin:10px 0 14px; font:14px/1.5 \"Segoe UI\",system-ui,sans-serif; }\n.dk-detail-links .dk-detail-links-label { color:#c0adce; margin-right:2px; }\n.dk-detail-links a { padding:4px 9px; color:#e6cbff !important; background:#22162c; border:1px solid #6d5280; border-radius:3px; text-decoration:none; }\n.dk-detail-links a:hover { background:#3d2451; border-color:#c193e6; }\n.dk-detail-links a[data-exact=yes] { border-color:#9fdcb6; box-shadow:inset 0 0 0 1px #67df9933; }\n.dk-detail-links a:focus-visible,.dk-detail-links button:focus-visible { outline:2px solid #e8ceff; outline-offset:2px; }\n.dk-detail-links .dk-detail-copy { padding:4px 9px; color:#f0e4ff; background:#3a2350; border:1px solid #8a6aa3; border-radius:3px; cursor:pointer; font:inherit; }\n.dk-detail-links .dk-detail-copy:hover { background:#563173; }\n@media print { .dk-detail-links,.dk-detail-badge { display:none !important; } }\n.dk-listing-bar .dk-listing-audit { padding:5px 11px; color:#f0e4ff; background:#3a2350; border:1px solid #8a6aa3; border-radius:3px; cursor:pointer; font:inherit; }\n.dk-listing-bar .dk-listing-audit:hover { background:#563173; border-color:#c193e6; }\n.dk-hub .dk-listing-copy { margin-top:12px; }\n.dk-listing-dialog pre { max-height:50dvh; }\n.dk-listing-dialog pre { max-height:50dvh; }\n.dk-request-open { margin-left:6px; padding:2px 8px; color:#f0e4ff; background:#3a2350; border:1px solid #8a6aa3; border-radius:3px; cursor:pointer; font:12px/1.5 \"Segoe UI\",system-ui,sans-serif; vertical-align:middle; }\n.dk-request-open:hover { background:#563173; border-color:#c193e6; }\n.dk-request-open:focus-visible { outline:2px solid #e0bdff; outline-offset:2px; }\n.dk-hub .dk-tracker-group { margin:12px 0; padding:8px 12px 10px; border:1px solid #6d5280; border-radius:4px; }\n.dk-hub .dk-tracker-group legend { padding:0 6px; color:#d9c4e8; font-weight:600; }\n.dk-hub .dk-tracker-row { display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin:6px 0; }\n.dk-hub .dk-tracker-row label { display:flex; align-items:center; gap:6px; min-width:190px; margin:0; cursor:pointer; }\n.dk-hub .dk-tracker-row input[type=checkbox] { width:16px; height:16px; accent-color:#ad71d1; }\n.dk-hub .dk-tracker-url,.dk-hub .dk-tracker-row input[type=text] { flex:1; min-width:230px; padding:4px 6px; color:#efe4f7; background:#1b1222; border:1px solid #6d5280; border-radius:3px; font:12px/1.5 ui-monospace,Consolas,monospace; }\n.dk-hub .dk-tracker-row select { padding:4px 6px; color:#efe4f7; background:#1b1222; border:1px solid #6d5280; border-radius:3px; font:inherit; }\n@media print { .dk-request-open,.dk-request-bar,.dk-request-links { display:none !important; } }\n.dk-request-seen { margin-left:6px; color:#9fdcb6; font:12px/1.5 \"Segoe UI\",system-ui,sans-serif; white-space:nowrap; }\n.dk-request-float { position:absolute; z-index:2147483000; box-shadow:0 3px 10px #0009; }\n.dk-hub .dk-request-term { display:flex; flex-direction:column; gap:4px; margin:8px 0 4px; color:#d9c4e8; }\n.dk-hub .dk-request-term input { padding:6px 8px; color:#efe4f7; background:#1b1222; border:1px solid #6d5280; border-radius:3px; font:14px/1.5 \"Segoe UI\",system-ui,sans-serif; }\n.dk-listing-badge[data-state=error][data-banned=yes] { box-shadow:0 0 0 2px #ff6b6b88; }\n@media print { .dk-request-seen,.dk-request-float { display:none !important; } }\n.dk-hub .dk-request-step { min-width:220px; }\n.dk-hub .dk-request-step[disabled] { opacity:.6; cursor:default; }\n\n/* A badge rides beside the title without adding height to the row: in grouped and\n   compact listing views a taller badge overflowed onto the title below it. */\nbutton.dk-listing-badge { line-height:0 !important; max-height:22px; box-sizing:border-box; position:relative; top:-1px; }\nbutton.dk-listing-badge.dk-detail-badge { max-height:24px; top:0; }\n@media(max-width:700px) { button.dk-listing-badge { width:26px; height:26px; min-width:26px; font-size:17px !important; max-height:26px; } }\n";

// MediaInfo text/JSON interpretation only. No media conversion, account writes or network.
const DKOKTO_INSPECTOR = (() => {
    const key=s=>String(s).toLowerCase().replace(/[^a-z0-9]/g,'');
    const str=v=>v==null?'':String(v).trim();
    const field=(t,...names)=>names.map(n=>t.fields[key(n)]).find(Boolean)||'';
    const num=v=>{const m=str(v).replace(/[ ,\u00a0\u202f]/g,'').match(/^\d+(?:\.\d+)?/);return m?Number(m[0]):null;};
    const empty=()=>({general:[],video:[],audio:[],text:[]});
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
        return (copy.textContent||'').replace(/\s+/g,' ').trim();
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
    return {find,score,looksLikeRelease,textOf};
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

// The tracker's list of low-quality and banned release groups, as supplied.
// A title is matched against it by its group tag alone: this says what the list
// says, not whether a release is actually good, and it verifies nothing.
const DKOKTO_GROUPS = (() => {
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
    const key=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,'');
    const BANNED_KEYS=new Map(BANNED.map(name=>[key(name),name]));
    const CONDITIONAL_KEYS=new Map(CONDITIONAL.map(entry=>[key(entry.name),entry]));
    // Where a group name can appear: the trailing tag, or a bracketed tag anywhere
    // (anime releases and YTS put theirs in brackets).
    function tags(title) {
        const value=String(title||'').trim(),found=[];
        const trailing=value.match(/-\s?([A-Za-z0-9][A-Za-z0-9._+-]{0,29})\s*$/);
        if(trailing)found.push(trailing[1]);
        for(const match of String(value).matchAll(/[[(]([^\][()]{1,40})[\])]/g))found.push(match[1]);
        // "-YTS.MX" and "[YTS.MX]" are the same group as "YTS".
        for(const tag of [...found])if(tag.includes('.'))found.push(tag.split('.')[0]);
        return [...new Set(found.filter(Boolean))];
    }
    // The list's verdict on one title, or null when nothing on the list matches.
    function find(title) {
        for(const source of SOURCES)
            if(source.pattern.test(String(title||'')))
                return {tag:source.name,name:source.name,kind:'source',banned:true,
                    reason:source.name+' is on the tracker’s low-quality list: those releases must not be uploaded to DarkPeers.'};
        for(const tag of tags(title)) {
            const id=key(tag);
            if(!id)continue;
            const banned=BANNED_KEYS.get(id);
            if(banned)return {tag,name:banned,kind:'group',banned:true,
                reason:'The release group '+banned+' is on the tracker’s banned and low-quality list: its releases must not be uploaded to DarkPeers.'};
            const conditional=CONDITIONAL_KEYS.get(id);
            if(conditional)return {tag,name:conditional.name,kind:'group',conditional:true,
                banned:!conditional.allow.test(String(title||'')),
                reason:conditional.allow.test(String(title||''))
                    ?conditional.name+' is allowed only for '+conditional.allowed+', which this title says it is. The rest of the rule is still yours to check.'
                    :conditional.name+' is allowed only for '+conditional.allowed+' on DarkPeers, and '+conditional.otherwise+'.'};
        }
        return null;
    }
    return {find,tags,list:()=>[...BANNED],conditional:()=>CONDITIONAL.map(entry=>({name:entry.name,allowed:entry.allowed})),
        sources:()=>SOURCES.map(entry=>entry.name),count:BANNED.length+CONDITIONAL.length+SOURCES.length};
})();

// Local checks against the user-supplied DP Naming Guide for beginners.
// A title/report is evidence, not proof of source history or upload compliance.
const DKOKTO_NAMING = ((inspector,services,groups) => {
    const templates={
        movie:'Name AKA Original LOCALE Year [Cut / Ratio / Hybrid / REPACK] Resolution [Edition] SOURCE TYPE [Dub] Acodec Channels [Object / Hi10P / HDR] Vcodec-Tag',
        tv:'Name [disambiguating year] S## / S##E## / S##E##E## / S##E##-## Resolution SOURCE TYPE [Dub] Acodec Channels [Object / Hi10P / HDR] Vcodec-Tag',
        disc:'Name [AKA / LOCALE] Year or TV numbering [Cut / Ratio / Hybrid / REPACK] Resolution [Edition / Region / 3D] SOURCE [REMUX] [Hi10P / HDR] Vcodec [Dub] Acodec Channels [Object]-Tag',
        music:'Artist - Album (Year) - Format',
        audiobook:'Author - Name Year [Source] Format [Bitrate] ISBN [Retail]-Tag',
        ebook:'Author - Name Year [Edition] Format ISBN [Retail / Scan / OCR]',
        software:'The supplied guide specifies no title template for games/software; install and usage instructions must be in the description.'
    };
    const norm=s=>String(s||'').normalize('NFKC').trim();
    const field=(t,...keys)=>keys.map(k=>t?.fields?.[k]).find(Boolean)||'';
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
    function check(name,options={},file=null){
        const issues=[],add=(severity,code,message)=>{if(!issues.some(i=>i.code===code))issues.push({severity,code,message});};
        let serviceLabel='';
        const s=norm(name);let profile=options.profile||'auto';
        if(s.length>1000)return {profile,template:'',issues:[{severity:'error',code:'length',message:'Use a title under 1,000 characters.'}],status:'Needs correction'};
        const resolution=hit(s,'(?:360|480|576|720|1080|2160|4320)[pi]');
        const ep=hit(s,'S\\d{2}(?:E\\d{2}(?:E\\d{2}|-\\d{2})?)?');
        const date=s.match(/(?:^|\s)((?:19|20)\d{2}-\d{2}(?:-\d{2})?)(?=\s|$)/);
        const bookfmt=hit(s,'EPUB|PDF|AZW3|MOBI|FB2|HTML|CHM|DJVU|DOCX?|KFX|LIT|PDB|TXT|RTF|CBR|CBZ');
        if(profile==='auto')profile=ep||date?'tv':bookfmt?'ebook':/ - .+\((?:19|20)\d{2}\) - /u.test(s)?'music':resolution||hit(s,'WEB-DL|WEBRip|REMUX|BluRay|Blu-ray|DVDRip|HDTV|UHDTV|DVD5|DVD9')||file?.video?.length?'movie':'unknown';
        if(!s){add('error','empty','Enter the torrent display title to check.');return result();}
        // The tracker's banned and low-quality group list, matched on the group tag alone.
        const group=groups.find(s);
        if(group)add(group.banned?'error':'review',group.banned?'banned-group':'banned-group-allowed',group.reason);
        if(profile==='unknown'){add('review','profile','Choose a category. The title alone does not identify a reliable naming template.');return result();}
        if((options.profile||'auto')==='auto')add('review','inferred','Category inferred as '+profile+'. Confirm it in the category selector, especially for TV missing episode numbers.');
        if(name!==String(name).trim())add('error','spaces','Remove leading or trailing spaces from the display title.');
        if(/\.(?:mkv|mp4|m4v|torrent)$/i.test(s))add('error','extension','Remove the file extension from the tracker display title.');
        if(profile==='software'){add('review','instructions','Check that install and usage instructions are included in the description.');return result();}
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
            if(/\w\.\w\.\w/.test(s)&&!s.includes(' - '))add('error','scene-music','Use words with spaces for music titles, not scene-style dot separators.');
            add('review','music-files','Check files/folders separately: accurate song titles and track numbers (except single-track releases), artist on various-artists tracks, logical disc numbering, no leading spaces and total paths at most 180 characters.');
            add('review','music-facts','Verify artist, album, release/edition year and format against the release. These cannot be established from the display title.');return result();
        }
        if(profile==='ebook'||profile==='audiobook'){
            const fmt=profile==='ebook'?bookfmt:hit(s,'M4B|FLAC|ALAC|PCM|MP3|Opus|Vorbis|AAC');
            if(!/^\S.+?\s-\s\S/.test(s))add('error','author','Start with Author - Name.');
            if(!/(?:^|\s)(?:18|19|20)\d{2}(?=\s|$)/.test(s))add('error','book-year','Include the release year of this book/audiobook edition.');
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
        const type=has('REMUX|WEB-DL|WEBRip'),dvd=has('(?:NTSC[ ._]+|PAL[ ._]+)?DVD(?:Rip|5|9)?'),disc=!!(has('Blu-ray|DVD5|DVD9|HD[ ._]DVD')&&!type),remux=/REMUX/i.test(type?.[1]||'');
        const discFamily=disc||remux;const releaseKind=type?.[1]|| (disc?'Full disc':has('HDTV|UHDTV|SDTV')?'TV capture':'Encode');
        if(remux&&has('Blu-ray|HD[ ._]DVD|DVDRip|DVD5|DVD9'))add('error','remux-source','REMUX source spelling is BluRay, UHD BluRay, 3D BluRay, HDDVD, NTSC DVD or PAL DVD; full-disc/encode labels differ.');
        if(dvd&&!has('NTSC|PAL'))add('review','dvd-system','DVD source labels require NTSC or PAL. Confirm the system from the source.');
        if(dvd&&!discFamily&&!has('DVDRip'))add('error','dvd-encode','DVD encodes use NTSC DVDRip or PAL DVDRip.');
        if(!resolution&&!dvd)add('error','resolution','Include the video resolution (omitted for DVD sources).');
        if(dvd&&resolution)add('error','dvd-resolution','Omit the resolution label for DVD-sourced releases.');
        if(resolution&&/360/i.test(resolution[1]))add('review','360','360p is allowed only when no official release above 360p exists. Verify availability.');
        if(resolution&&/720i|2160i|4320i|360i/i.test(resolution[1]))add('error','resolution-value','This resolution label is not listed in the guide.');
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
        function result(templateKey=profile){const errors=issues.filter(x=>x.severity==='error').length,reviews=issues.length-errors;return {profile,template:templates[templateKey]||'',issues,service:serviceLabel,status:errors?errors+' correction'+(errors===1?'':'s')+' needed':reviews?'No definite errors found · manual review remains':'No supported issues found'};}
    }
    function report(name,options,file){const r=check(name,options,file);return ['DP display-title naming review',name,'Category: '+r.profile,...(r.service?['Service: '+r.service]:[]),r.status,'Template: '+r.template,...r.issues.map(i=>(i.severity==='error'?'CORRECT':'REVIEW')+': '+i.message),'Rules: supplied DP Naming Guide for beginners; no live rules lookup or upload performed.'].join('\n');}
    return {check,report,templates};
})(typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./inspector.js'):DKOKTO_INSPECTOR,
   typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./services.js'):DKOKTO_SERVICES,
   typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./groups.js'):DKOKTO_GROUPS);

const DKOKTO_NAMING_UI = (() => {
    function mount({parent,title,getFile,el,field,button,guard,message,download}){
        const box=el('section',undefined,'dk-naming'),options={},output=el('div'),reference=el('details');
        box.append(el('h3','DP naming guide check'),el('p','Checks the tracker display title, not filenames. Based on your supplied guide; results do not certify an upload.'));
        function select(parent,label,key,items){const row=el('label',label),input=el('select');input.setAttribute('aria-label',label);for(const [value,text]of items){const option=el('option',text);option.value=value;input.append(option);}options[key]=items[0][0];input.onchange=()=>{options[key]=input.value;draw();};row.append(input);parent.append(row);return input;}
        select(box,'Naming category','profile',[['auto','Auto — infer from title/report'],['movie','Movie'],['tv','TV / season / episode'],['music','Music'],['audiobook','Audiobook'],['ebook','eBook'],['software','Game / software']]);
        reference.append(el('summary','Reference details and exceptions (optional)'));
        for(const [key,label]of [['officialTitle','Official title including punctuation (reference)'],['year','Reference release year'],['originalLanguage','Original language (name or ISO code)']]){const input=field(reference,label);input.maxLength=key==='year'?4:300;input.onchange=()=>{options[key]=input.value.trim();draw();};}
        select(reference,'TV year needed to distinguish same-name shows?','tvYear',[['unknown','Not confirmed'],['yes','Yes — keep the disambiguating year'],['no','No — omit TV year']]);
        select(reference,'Confirmed WEB / HDTV downscale?','downscale',[['unknown','Unknown'],['yes','Yes'],['no','No']]);
        select(reference,'Collection / multiple titles?','collection',[['unknown','Not confirmed'],['yes','Yes'],['no','No']]);
        reference.append(el('p','Reference values are entered by you, not fetched or inferred as verified facts. Music/book file structure and descriptions require a separate review.'));
        const controls=el('div',undefined,'dk-row');controls.append(button('Check naming',draw),button('Copy naming review',guard(async()=>{await navigator.clipboard.writeText(DKOKTO_NAMING.report(title.value,options,getFile()));message('Naming review copied. No title was changed or posted.');})),button('Save naming review',()=>download('torrent-naming-review.txt',DKOKTO_NAMING.report(title.value,options,getFile()))));
        box.append(reference,controls,output);parent.append(box);
        function draw(){const result=DKOKTO_NAMING.check(title.value,options,getFile());output.replaceChildren();const status=el('p',result.status,'dk-naming-status');status.setAttribute('role','status');output.append(status);
            if(result.service)output.append(el('p','Service: '+result.service,'dk-naming-service'));
            const errors=result.issues.filter(i=>i.severity==='error'),reviews=result.issues.filter(i=>i.severity==='review');
            if(errors.length){const list=el('ul',undefined,'dk-naming-errors');errors.forEach(i=>list.append(el('li',i.message)));output.append(list);}
            if(reviews.length){const detail=el('details');detail.append(el('summary','Manual checks ('+reviews.length+')'));const list=el('ul');reviews.forEach(i=>list.append(el('li',i.message)));detail.append(list);output.append(detail);}
            if(result.template){const detail=el('details');detail.append(el('summary','Template · '+result.profile),el('p',result.template),el('p','Bracketed elements are conditional. A release group is omitted if none exists. Full disc/REMUX and encode/WEB ordering differ.'));output.append(detail);}
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
        const glossary=el('details');glossary.append(el('summary','What do HDR, DV, Atmos, REMUX and WEB-DL mean?'));for(const [term,explanation]of Object.entries(engine.glossary)){glossary.append(el('h3',term),el('p',explanation));}content.append(glossary);
        if(torrent){const notes=el('section');notes.append(el('h3','My private notes · torrent #'+torrent),el('p','Saved only in this browser. Existing notes from the previous toolkit are preserved.'));const area=el('textarea');area.value=settings.notes[torrent]||'';area.rows=5;area.maxLength=20000;area.setAttribute('aria-label','Private torrent notes');controls.append(button('My notes',()=>{notes.scrollIntoView({block:'start'});area.focus();}));notes.append(area,button('Save private notes',guard(()=>{if(area.value.trim())settings.notes[torrent]=area.value;else delete settings.notes[torrent];save();message('Private notes saved for torrent #'+torrent+'. Nothing was posted to the tracker.');})));content.append(notes);}else content.append(el('p','Private notes are available on torrent detail pages. You can still inspect a pasted report here.'));
        const optional=el('p'),srr=link('Optional: search this title on srrDB',engine.searchLink(title.value));optional.append(srr);content.append(optional);title.onchange=()=>{srr.href=engine.searchLink(title.value);draw();};
        try{read();}catch(e){message(e.message);advanced.open=true;}
    }
    return {render};
})();

const DKOKTO_LISTING_CORE = ((naming) => {
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
    const baseline=new Set(['inferred','title-unverified','dub-unverified','provenance','episode-verify','music-files','music-facts','book-description','isbn-verify']);
    function assess(title,categoryName=''){
        const profile=category(categoryName),review=naming.check(title,{profile});
        // A guessed movie needs a year and a technical suffix. A TV without numbering
        // must not acquire a red movie-year error just because a category was unavailable.
        const confident=profile!=='auto'||review.profile==='tv'||review.profile==='music'||review.profile==='ebook'||review.profile==='movie'&&/(?:18|19|20)\d{2}/.test(title)&&/\b(?:360|480|576|720|1080|2160|4320)[pi]\b/i.test(title);
        const errors=review.issues.filter(i=>i.severity==='error'),uncertain=review.issues.filter(i=>i.severity==='review'&&!baseline.has(i.code));
        // A banned release group does not depend on the category, so it is red even
        // when the category could not be established.
        const forbidden=errors.some(issue=>issue.code==='banned-group');
        let state=forbidden?'error':!confident||review.profile==='unknown'||review.profile==='software'?'review':errors.length?'error':uncertain.length?'review':'pass';
        const label=state==='error'?(forbidden?'Banned release group':'Naming errors found'):state==='pass'?'Title checks passed':'Naming needs review';
        return {state,label,review,errors,uncertain,profile,confident};
    }
    return {category,assess};
})(typeof module!=='undefined'&&module.exports&&typeof require==='function'?require('./naming.js'):DKOKTO_NAMING);

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

// Read loaded torrent titles only. No requests, crawling, downloads or tracker writes.
const DKOKTO_LISTING = (() => {
    const selector='a.torrent-search--list__name,a.torrent-card__link,.torrent-card__title a';
    // Panels such as the home page's Top torrents use their own markup, so a link to a
    // torrent whose text reads as a release name is checked as well.
    const loose='a[href*="/torrents/"]';
    // This script's own additions, on any page: watching them would wake the scan again.
    const own='.dk-listing-badge,.dk-listing-bar,.dk-listing-dialog,.dk-detail-badge,.dk-detail-links,.dk-request-bar,.dk-request-links,.dk-request-open,#dkokto-request-dialog';
    // The chatbox and the ticker change constantly and never hold a listing, so their
    // churn is not a reason to look at the page again (a giveaway or chat script can
    // otherwise keep this awake).
    const noise='.chatbox,#chatbox,[class*="chatbox"],.ticker,[class*="ticker"],[class*="chat-"],#chat';
    const key='dkokto_listing_checks_v1',entries=new Map(),cache=new Map();
    let mounted=false,observer,timer,serial=0,bar,counts,toggle,dialog,returnFocus;
    let enabled=true;try{enabled=localStorage.getItem(key)!=='off';}catch{}
    // The torrent list, and any other page that renders the same release rows
    // (a member's uploads, bookmarks, requests). Detail pages are handled separately.
    const listingPage=()=>/^\/torrents\/?$/.test(location.pathname)||
        (/^\/(?:users\/[^/]+|bookmarks|requests|playlists)(?:\/|$)/.test(location.pathname)&&!!document.querySelector(selector));
    function links() {
        const found=new Map();
        for(const link of document.querySelectorAll(selector))if(valid(link)&&!link.closest(own))found.set(link,true);
        for(const link of document.querySelectorAll(loose)) {
            if(found.has(link)||!valid(link)||link.closest(own)||link.closest('#dkokto-tools,#dkokto-hub,#dkokto-nav-dialog,#dkokto-game-dialog,.dk-detail-links,.dk-hub'))continue;
            if(DKOKTO_RELEASE_TITLE.score(link.textContent.trim())>0)found.set(link,true);
        }
        return [...found.keys()];
    }
    const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
    function getCategory(link){const row=link.closest('tr,.torrent-card'),category=row?.querySelector('.torrent-search--list__category,.torrent-card__category');
        const explicit=category?.textContent?.trim()||category?.querySelector('img')?.alt||category?.querySelector('[title]')?.title||'';
        if(explicit)return explicit;
        const id=row?.getAttribute('data-category-id');if(id){for(const input of document.querySelectorAll('input[type=checkbox][value]'))if(input.value===id&&input.getAttribute('wire:model.live')==='categoryIds')return input.closest('label')?.textContent?.trim()||'';}
        return '';
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
        const body=el('section',undefined,'dk-hub-content'),r=entry.result;body.append(el('h3',entry.title),el('p',r.label),el('p','Loaded title only · '+(entry.category||'category inferred from title')+'. Green means supported title checks passed, not verified media or tracker approval.'));
        if(!r.confident)body.append(el('p','The category is uncertain. Open the torrent and choose the correct naming category in Inspector before treating any finding as an error.'));
        for(const [kind,title]of [['error','Corrections'],['review','Manual checks']]){const issues=r.review.issues.filter(i=>i.severity===kind);if(issues.length){body.append(el('h3',title));const list=el('ul');for(const issue of issues)list.append(el('li',issue.message.replace('Add a reference title below to compare spelling.','Open Inspector to add a reference title and compare spelling.')));body.append(list);}}
        if(r.review.template)body.append(el('h3','Template'),el('p',r.review.template));
        const link=el('a','Open torrent for MediaInfo / Inspector');link.href=entry.link.href;
        body.append(link,copyButton('Copy report text',()=>DKOKTO_REPORT.report({title:entry.title,url:entry.link.href,category:entry.category,result:r})));
        dialog.append(body);if(!dialog.open)dialog.showModal();
    }
    function ensureBar(){if(!listingPage())return;const root=document.querySelector('.torrent-search__results')||document.querySelector('.torrent-search__component')||document.querySelector('main');if(!root)return;
        if(bar?.isConnected)return;bar=el('div',undefined,'dk-listing-bar');const label=el('label'),input=el('input');input.type='checkbox';input.checked=enabled;input.setAttribute('aria-label','Automatic torrent naming checks');toggle=input;label.append(input,document.createTextNode('Automatic naming checks'));input.onchange=()=>{enabled=input.checked;try{localStorage.setItem(key,enabled?'on':'off');}catch{}scan();};
        const audit=el('button','Audit loaded titles');audit.type='button';audit.className='dk-listing-audit';audit.setAttribute('aria-haspopup','dialog');
        audit.onclick=showAudit;
        const legend=el('span','✕ Naming error · ✓ Title checks pass · ? Review needed');counts=el('span');counts.setAttribute('role','status');counts.setAttribute('aria-live','polite');bar.append(label,legend,audit,el('small','Loaded titles only. Click a badge for details; media and source history are not verified.'),counts);root.prepend(bar);
    }
    function auditRows() {
        const rows=[];
        for(const [link,entry] of entries)if(link.isConnected)rows.push({title:entry.title,url:link.href,category:entry.category,result:entry.result});
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
    function assess(link){const title=link.textContent.trim(),category=getCategory(link),signature=title+'\n'+category;let entry=entries.get(link);
        if(entry?.signature===signature&&entry.badge.isConnected&&entry.badge.previousElementSibling===link)return;
        let result=cache.get(signature);if(!result){result=DKOKTO_LISTING_CORE.assess(title,category);cache.set(signature,result);if(cache.size>500)cache.delete(cache.keys().next().value);}
        if(!entry){const badge=el('button',undefined,'dk-listing-badge');badge.type='button';badge.setAttribute('aria-haspopup','dialog');entry={link,badge};badge.onclick=e=>{e.preventDefault();e.stopPropagation();explain(entry);};entries.set(link,entry);}
        Object.assign(entry,{title,category,signature,result});entry.badge.dataset.state=result.state;entry.badge.textContent=result.state==='error'?'✕':result.state==='pass'?'✓':'?';
        // A banned release group is marked as such, not just as an error.
        const banned=result.errors.some(issue=>issue.code==='banned-group')?'yes':'no';
        if(entry.badge.dataset.banned!==banned)entry.badge.dataset.banned=banned;
        const detail=result.state==='error'?result.errors.map(i=>i.message).join('\n'):result.state==='review'?(result.uncertain[0]?.message||'Insufficient category/title information.'):'No errors in supported title checks. Media and source claims remain unverified.';
        entry.badge.title=result.label+'\n'+detail;entry.badge.setAttribute('aria-label',result.label+' for '+title+'. Click for details.');if(!entry.badge.isConnected||entry.badge.previousElementSibling!==link)link.after(entry.badge);
    }
    function updateCounts(loading=false){if(!counts)return;const total={error:0,pass:0,review:0};for(const [link,e]of entries)if(link.isConnected)total[e.result.state]++;
        counts.textContent=enabled?(loading?'Checking loaded titles… ':entries.size?`${total.error} errors · ${total.pass} passed · ${total.review} need review`:'No release titles found. Use List or Card view; grouped posters may only show a show/movie name.'):'Checks disabled';}
    function scan(){clearTimeout(timer);timer=null;const run=++serial;
        const list=links(),active=listingPage()||!!list.length;
        const live=new Set(active&&enabled?list:[]);
        for(const [link,e]of entries)if(!live.has(link)||!link.isConnected){e.badge.remove();entries.delete(link);}
        if(!listingPage())bar?.remove();
        if(!active){dialog?.close();return;}ensureBar();if(!enabled){updateCounts();return;}
        updateCounts(true);let index=0;const targets=list;
        function batch(){if(run!==serial||!enabled)return;for(let count=0;index<targets.length&&count<25;index++,count++)if(targets[index].isConnected)assess(targets[index]);
            if(index<targets.length)setTimeout(batch,0);else {updateCounts();DKOKTO_AUDIT_STORE.record(auditRows(),{page:location.origin+location.pathname+location.search});}}
        batch();
    }
    function schedule(){if(timer)return;timer=setTimeout(scan,180);}
    // On a busy page this guard ran a whole-document query for every batch of changes;
    // the answer barely moves, so it is re-asked at most twice a second.
    let looseAt=0,looseFound=false;
    const anyTorrentLink=()=>{const now=Date.now();if(now-looseAt>500){looseFound=!!document.querySelector(loose);looseAt=now;}return looseFound;};
    function mount(){if(mounted)return;mounted=true;scan();observer=new MutationObserver(records=>{if(!listingPage()&&!entries.size&&!bar?.isConnected&&!anyTorrentLink())return;const relevant=records.some(r=>{const node=r.target.nodeType===1?r.target:r.target.parentElement;if(!node||node.closest(own)||node.closest(noise))return false;
            if(r.type==='attributes')return node.matches(selector)||node.closest('.torrent-search__results,.torrent-search__component');
            if(r.type==='characterData')return !!node.closest(selector+',.torrent-search--list__category,.torrent-card__category');
            return [...r.removedNodes].some(n=>n.nodeType===1)||[...r.addedNodes].some(n=>n.nodeType===1&&!n.matches(own))||node.matches(selector);
        });if(relevant)schedule();});observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['href','data-category-id','alt']});
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
    }
    function linksRow(node,title) {
        // The request cross-check borrows the same row styling; those rows are not ours.
        const existing=document.querySelector('.dk-detail-links:not(.dk-detail-versions):not(.dk-request-links)');
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
    function draw() {
        if(!onPage()){dialog?.close();document.querySelectorAll('.dk-detail-links:not(.dk-request-links)').forEach(n=>n.remove());return;}
        const hit=found();
        if(!hit||!hit.score||!hit.title){document.querySelectorAll('.dk-detail-links:not(.dk-request-links)').forEach(n=>n.remove());return;}
        badge(hit.node,hit.title);linksRow(hit.node,hit.title);
    }
    // A page that keeps changing (chat, timers) must not starve the redraw, and must
    // not be redrawn faster than a person can read: one pass per quarter second.
    function schedule(){if(timer)return;timer=setTimeout(()=>{timer=null;draw();},250);}
    // This script's own additions are ignored, or watching them would wake it again.
    // The chatbox and the ticker change constantly and never hold a listing, so their
    // churn is not a reason to look at the page again (a giveaway or chat script can
    // otherwise keep this awake).
    const NOISE='.chatbox,#chatbox,[class*="chatbox"],.ticker,[class*="ticker"],[class*="chat-"],#chat';
    const OURS='.dk-detail-links,.dk-detail-badge,.dk-listing-badge,.dk-listing-bar,.dk-listing-dialog,.dk-request-bar,.dk-request-links,.dk-request-open,#dkokto-request-dialog,#dkokto-hub,#dkokto-tools,#dkokto-game-dialog,#dkokto-nav-dialog,#dp-inspector-hub,#dp-inspector-tools';
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
    function search(request={},{list=null,ids={}}={}) {
        const parsed=parse(request.name||request.title||'',request.category||'');
        const query=term(parsed),chosen=list||trackers.chosen();
        const out={parsed,term:query,links:[],skipped:[]};
        if(!query)return out;
        for(const tracker of chosen) {
            if(!(CARRIES[tracker.kind]||CARRIES.general).includes(parsed.kind)) {
                out.skipped.push({key:tracker.key,label:tracker.label,reason:'does not carry '+parsed.kind+' releases'});
                continue;
            }
            const exact=!!(tracker.imdb&&ids.imdb);
            const url=fill(exact?tracker.imdb:tracker.search,{q:query,imdb:ids.imdb||''});
            if(!/^https:\/\//i.test(url)){out.skipped.push({key:tracker.key,label:tracker.label,reason:'its saved address is not a usable https search'});continue;}
            out.links.push({key:tracker.key,label:tracker.label,url,exact,
                note:exact?'Searched by the IMDb ID on this page':'Searches “'+query+'” on '+tracker.label});
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
