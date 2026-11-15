import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Sprout, MapPin, Satellite, Sun, CloudRain, Droplets, Leaf, Handshake,
  Mic, Volume2, LocateFixed, ArrowUpRight, Check, AlertTriangle, Globe2,
  Tractor, Search, Wheat, Bean, TreePine, ShieldCheck, Radio, Navigation,
  Gauge, X, Languages, RefreshCw, MapPinned, Waves, CircleHelp, Play, Pause
} from 'lucide-react';
import './style.css';

const COPY = {
  darija: {
    nav1:'الأرض ديالي', nav2:'معطيات ناسا', nav3:'دورة المحاصيل', nav4:'LandMatch',
    eyebrow:'NASA EARTH DATA · FARMER-FIRST', hero:'فلاحة أذكى، بقرارات مبنية على المعطيات', intro:'TerraWise كيجمع معطيات ناسا ومعلومات الأرض ديالك باش يعاونك تقارن الاختيارات وتحافظ على الماء والتربة.', cta:'بدا دابا', heroNote:'المعطيات كتعاونك، والقرار الأخير ديالك.',
    fieldTitle:'عرّفنا على الأرض ديالك', fieldSub:'حدد الموقع ديال الأرض باش نجيبو المؤشرات المناخية القريبة منها.', location:'موقع الأرض', gps:'استعمل موقعي الحالي', or:'أو قلب على المنطقة بالاسم', searchPlace:'مثلاً: تارودانت، شيشاوة، أكادير...', search:'قلب على الموقع', searching:'كنقلبو على الموقع...', area:'المساحة', hectares:'هكتار', water:'مصدر الماء', rain:'مطرية', drip:'السقي بالتنقيط', well:'بئر / مصدر آخر', crop:'شنو كتزرع أو ناوي تزرع؟',
    nasaTitle:'شنو كتقول معطيات NASA؟', nasaSub:'مؤشرات مناخية للمنطقة اللي حددتي، ماشي قياس مباشر للتربة ديالك.', temperature:'معدل الحرارة', rainfall:'التساقطات السنوية التقديرية', humidity:'الرطوبة النسبية', loading:'كنجيبو معطيات NASA POWER...', noLocation:'حدد الموقع ديال الأرض باش تبان المؤشرات هنا.', source:'المصدر: NASA POWER · Climatology', dataNote:'هاد الأرقام كتصف مناخ المنطقة على نطاق واسع. ما كتقيسش كل نقطة فالحقل، وما كتغنيش على تحليل التربة.',
    planTitle:'قارن بين 3 استراتيجيات', planSub:'كل اختيار عندو فوائد ومخاطر. خاص التحقق من نوع التربة والموسم والسوق المحلي.', existing:'الدورة الحالية', waterPlan:'تدبير الماء', soilPlan:'تنويع المحاصيل', benefit:'الفائدة المحتملة', risk:'شنو خاصك تنتبه ليه', listen:'سمع الشرح',
    landTitle:'LandMatch — قلب على أرض مناسبة', landSub:'البحث كيتبدل حسب الموقع اللي حددتي، ماشي حسب لائحة مدن ثابتة.', radius:'نطاق البحث', find:'قلب على الأراضي القريبة', listings:'نتائج تجريبية قريبة من موقعك', demo:'مثال تجريبي', demoNote:'هاد الأراضي غير أمثلة باش نورّيو طريقة المطابقة. ماشي عروض كراء حقيقية وما كاينش تواصل مع ملاك فعليين.', noListings:'حدد الموقع أولاً باش نحسبو المسافات.', distance:'المسافة التقريبية', size:'المساحة', waterSource:'الماء', contact:'تفاصيل تجريبية',
    voiceTitle:'تقدر تهضر مع TerraWise', voiceSub:'استعمل الميكرو باش تقول فين كاينة الأرض أو شنو بغيتي تزرع. تقدر حتى تسمع الشرح بالصوت.', startVoice:'بدا الهضرة', stopVoice:'وقف', sayIntro:'سمّعني كيفاش خدام', listening:'كنسمع ليك دابا...', heard:'فهمنا هاد الكلام', voiceTip:'ملاحظة: التعرف على الدارجة كيتعلق بدعم المتصفح والجهاز. إلا ما خدمش الميكرو، كتب المنطقة يدوياً. الصوت المسموع كيتعلق بالأصوات العربية المثبتة.',
    gpsError:'ما قدرناش نحددو الموقع. تأكد من إذن الموقع، أو استعمل البحث بالاسم.', secure:'باش يخدم GPS خاص تفتح الموقع عبر localhost أو HTTPS، وتسمح للمتصفح بالوصول للموقع.', geoDenied:'رفضتي إذن الموقع. فعّلو من إعدادات الموقع فالمتصفح أو قلب على المنطقة بالاسم.', geoUnavailable:'الموقع غير متاح دابا. جرّب البحث بالاسم.', geoTimeout:'تحديد الموقع خدا وقت طويل. عاود المحاولة أو استعمل البحث بالاسم.', geocodeError:'ما لقيناش هاد المنطقة. جرب اسم مدينة أو جماعة قريبة.', nasaError:'ما قدرناش نجيبو بيانات NASA دابا. تحقق من الإنترنت وعاود المحاولة.', speechUnsupported:'المتصفح ديالك ما كيدعمش التعرف على الكلام. جرب Chrome أو كتب المنطقة.', speechError:'الميكرو ما خدمش. تأكد من الإذن ومن إعدادات الصوت.', micDenied:'خاصك تسمح للمتصفح يستعمل الميكرو من إعدادات الموقع.', ttsError:'ما قدرناش نشغلو الصوت. تأكد من صوت الجهاز.', ttsUnavailable:'ما كاين حتى صوت مناسب مثبت فالجهاز. تقدر تكمل باستعمال النص.',
    footer:'TerraWise أداة مساعدة لاتخاذ القرار، وما كتعوضش تحليل التربة أو نصيحة المهندس الفلاحي.', privacy:'الموقع ما كيتستعملش حتى كتوافق.',
  },
  english: {
    nav1:'My field', nav2:'NASA data', nav3:'Crop rotation', nav4:'LandMatch',
    eyebrow:'NASA EARTH DATA · FARMER-FIRST', hero:'Smarter farming, guided by real-world data', intro:'TerraWise combines NASA Earth observations with your field details to help compare options and protect water and soil.', cta:'Get started', heroNote:'Data supports your judgement. You make the decision.',
    fieldTitle:'Tell us about your field', fieldSub:'Set your field location to retrieve nearby climate indicators.', location:'Field location', gps:'Use my current location', or:'Or search for an area by name', searchPlace:'e.g. Taroudant, Chichaoua, Agadir...', search:'Find location', searching:'Searching for location...', area:'Field size', hectares:'hectares', water:'Water source', rain:'Rain-fed', drip:'Drip irrigation', well:'Well / other', crop:'What do you grow or plan to grow?',
    nasaTitle:'What does NASA data tell us?', nasaSub:'Regional climate indicators for your selected location, not direct soil measurements.', temperature:'Average temperature', rainfall:'Estimated annual rainfall', humidity:'Relative humidity', loading:'Loading NASA POWER data...', noLocation:'Set your field location to see indicators here.', source:'Source: NASA POWER · Climatology', dataNote:'These figures describe broad regional climate. They do not measure every point in your field and do not replace soil testing.',
    planTitle:'Compare three strategies', planSub:'Each option has benefits and trade-offs. Validate soil type, season and local market conditions.', existing:'Current rotation', waterPlan:'Water management', soilPlan:'Crop diversity', benefit:'Potential benefit', risk:'What to watch for', listen:'Listen to explanation',
    landTitle:'LandMatch — find suitable land', landSub:'Search is centred on your selected location, not a fixed list of cities.', radius:'Search radius', find:'Find nearby land', listings:'Illustrative results near your location', demo:'DEMO', demoNote:'These are sample listings to demonstrate matching. They are not real rental offers and do not connect to actual owners.', noListings:'Set your location first to calculate distances.', distance:'Approx. distance', size:'Size', waterSource:'Water', contact:'Demo details',
    voiceTitle:'Talk to TerraWise', voiceSub:'Use the microphone to say where your field is or what you want to grow. You can also listen to guidance.', startVoice:'Start speaking', stopVoice:'Stop', sayIntro:'Play an explanation', listening:'Listening now...', heard:'We heard', voiceTip:'Note: Darija recognition depends on browser and device support. If the microphone does not work, type the area. Spoken output depends on installed Arabic voices.',
    gpsError:'Could not determine your location. Check permission or search by area name.', secure:'GPS requires localhost or HTTPS and browser location permission.', geoDenied:'Location permission was denied. Enable it in browser site settings or search by area name.', geoUnavailable:'Location is currently unavailable. Try searching by name.', geoTimeout:'Location request timed out. Try again or search by name.', geocodeError:'We could not find that area. Try a nearby town or municipality.', nasaError:'Could not load NASA data. Check your connection and retry.', speechUnsupported:'Speech recognition is not supported by this browser. Try Chrome or type the area.', speechError:'The microphone did not work. Check permission and audio settings.', micDenied:'Allow microphone access in your browser site settings.', ttsError:'Could not play audio. Check your device volume.', ttsUnavailable:'No suitable installed voice was found. You can continue using text.',
    footer:'TerraWise supports decision-making; it does not replace soil testing or advice from an agronomist.', privacy:'Your location is only accessed with permission.',
  }
};

const CROPS = [
  {id:'wheat', ar:'القمح', en:'Wheat', Icon:Wheat}, {id:'barley', ar:'الشعير', en:'Barley', Icon:Wheat},
  {id:'chickpea', ar:'الحمص', en:'Chickpea', Icon:Bean}, {id:'lentil', ar:'العدس', en:'Lentils', Icon:Bean},
  {id:'olive', ar:'الزيتون', en:'Olive', Icon:TreePine}, {id:'corn', ar:'الذرة', en:'Corn', Icon:Sprout}
];

function App(){
  const [lang,setLang]=useState('darija'); const d=lang==='darija'; const t=COPY[lang];
  const [place,setPlace]=useState(''); const [coords,setCoords]=useState(null); const [locationLabel,setLocationLabel]=useState('');
  const [area,setArea]=useState(''); const [crop,setCrop]=useState('wheat'); const [water,setWater]=useState('rain');
  const [nasa,setNasa]=useState(null); const [nasaLoading,setNasaLoading]=useState(false); const [locLoading,setLocLoading]=useState(false);
  const [radius,setRadius]=useState(50); const [message,setMessage]=useState(''); const [transcript,setTranscript]=useState(''); const [listening,setListening]=useState(false);
  const [voiceStatus,setVoiceStatus]=useState(''); const recognitionRef=useRef(null);
  const [speechReady,setSpeechReady]=useState(false);

  useEffect(()=>{document.documentElement.lang=d?'ar':'en';document.documentElement.dir=d?'rtl':'ltr';},[d]);
  useEffect(()=>{const check=()=>setSpeechReady(!!(window.speechSynthesis&&window.speechSynthesis.getVoices().length));check();window.speechSynthesis?.addEventListener?.('voiceschanged',check);return()=>window.speechSynthesis?.removeEventListener?.('voiceschanged',check)},[]);

  const loadNASA=async c=>{
    setNasaLoading(true);setNasa(null);
    try{
      const url=`https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=T2M,PRECTOTCORR,RH2M&community=AG&longitude=${encodeURIComponent(c.lon)}&latitude=${encodeURIComponent(c.lat)}&format=JSON`;
      const response=await fetch(url); if(!response.ok) throw new Error('NASA API');
      const json=await response.json(); const p=json?.properties?.parameter;
      const vals={temp:Number(p?.T2M?.ANN),rain:Number(p?.PRECTOTCORR?.ANN),hum:Number(p?.RH2M?.ANN)};
      if(!Number.isFinite(vals.temp)||!Number.isFinite(vals.rain)||!Number.isFinite(vals.hum)) throw new Error('Missing NASA values');
      setNasa({temp:vals.temp.toFixed(1),rain:Math.round(vals.rain*365),hum:Math.round(vals.hum)});
    }catch(e){setNasa({error:true});setMessage(t.nasaError)}finally{setNasaLoading(false)}
  };
  const acceptLocation=async(c,label)=>{setCoords(c);setLocationLabel(label);setPlace(label);setMessage('');await loadNASA(c)};
  const useGPS=()=>{
    setMessage('');
    if(!window.isSecureContext){setMessage(t.secure);return}
    if(!navigator.geolocation){setMessage(t.geoUnavailable);return}
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(async pos=>{
      const c={lat:pos.coords.latitude,lon:pos.coords.longitude};
      let label=`${c.lat.toFixed(4)}, ${c.lon.toFixed(4)}`;
      try{const r=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${c.lat}&lon=${c.lon}`);if(r.ok){const j=await r.json();label=j.name||j.address?.town||j.address?.city||j.address?.village||label}}catch{}
      setLocLoading(false);acceptLocation(c,label);
    },err=>{setLocLoading(false);setMessage(err.code===1?t.geoDenied:err.code===2?t.geoUnavailable:err.code===3?t.geoTimeout:t.gpsError)},{enableHighAccuracy:false,timeout:18000,maximumAge:60000});
  };
  const searchLocation=async()=>{
    const q=place.trim();if(!q)return;setLocLoading(true);setMessage('');
    try{
      const r=await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&addressdetails=1&q=${encodeURIComponent(q)}`,{headers:{'Accept-Language':d?'ar,en':'en'}});
      if(!r.ok)throw new Error('Geocoding failed');const results=await r.json();if(!results.length)throw new Error('Not found');
      const item=results[0];const c={lat:Number(item.lat),lon:Number(item.lon)};if(!Number.isFinite(c.lat)||!Number.isFinite(c.lon))throw new Error('Bad coordinates');
      await acceptLocation(c,item.name||item.display_name.split(',')[0]);
    }catch(e){setMessage(t.geocodeError)}finally{setLocLoading(false)}
  };

  const say=txt=>{
    if(!('speechSynthesis' in window)||!('SpeechSynthesisUtterance' in window)){setMessage(t.ttsUnavailable);return}
    const synth=window.speechSynthesis;synth.cancel();const voices=synth.getVoices();
    const candidates=d?voices.filter(v=>/^ar/i.test(v.lang)):voices.filter(v=>/^en/i.test(v.lang));
    const voice=candidates.find(v=>d?/ar-(MA|SA|AE|EG)/i.test(v.lang):/^en-US/i.test(v.lang))||candidates[0];
    if(d&&!voice)setVoiceStatus(t.ttsUnavailable);else setVoiceStatus('');
    const u=new SpeechSynthesisUtterance(txt);u.lang=d?(voice?.lang||'ar'): 'en-US';u.rate=.9;u.pitch=1;if(voice)u.voice=voice;
    u.onerror=()=>setMessage(t.ttsError);try{synth.speak(u)}catch{setMessage(t.ttsError)}
  };
  const startVoice=()=>{
    const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!Recognition){setMessage(t.speechUnsupported);return}
    try{
      if(recognitionRef.current){recognitionRef.current.stop();recognitionRef.current=null}
      const rec=new Recognition();recognitionRef.current=rec;rec.lang=d?'ar-MA':'en-US';rec.interimResults=true;rec.continuous=false;rec.maxAlternatives=1;
      rec.onstart=()=>{setListening(true);setMessage('')};
      rec.onresult=e=>{let final='';for(let i=e.resultIndex;i<e.results.length;i++){const s=e.results[i][0].transcript;if(e.results[i].isFinal)final+=s}if(final){setTranscript(final);setPlace(final)}};
      rec.onerror=e=>{setListening(false);setMessage(e.error==='not-allowed'?t.micDenied:t.speechError)};
      rec.onend=()=>{setListening(false);recognitionRef.current=null};rec.start();
    }catch{setListening(false);setMessage(t.speechError)}
  };
  const stopVoice=()=>{recognitionRef.current?.stop();setListening(false)};

  const dist=(a,b)=>{const rad=x=>x*Math.PI/180;const dl=rad(b.lat-a.lat),dn=rad(b.lon-a.lon);const h=Math.sin(dl/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dn/2)**2;return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h))};
  const demoListings=useMemo(()=>{
    if(!coords)return[];
    // Illustrative nearby sample points are generated around the farmer's selected coordinates.
    const samples=[{dy:.035,dx:.028,ha:'2.4',water:'Well',soil:'Loam'},{dy:-.052,dx:.061,ha:'4.0',water:'Rain-fed',soil:'Clay loam'},{dy:.071,dx:-.045,ha:'1.8',water:'Drip',soil:'Sandy loam'},{dy:-.018,dx:-.083,ha:'3.2',water:'Rain-fed',soil:'Unknown'}];
    return samples.map((s,i)=>({id:i+1,lat:coords.lat+s.dy,lon:coords.lon+s.dx,size:s.ha,water:s.water,soil:s.soil,km:dist(coords,{lat:coords.lat+s.dy,lon:coords.lon+s.dx})})).filter(x=>x.km<=radius).sort((a,b)=>a.km-b.km);
  },[coords,radius]);
  const selected=CROPS.find(c=>c.id===crop)||CROPS[0];const CropIcon=selected.Icon;
  const plans=d?[
    {title:'الدورة الحالية',desc:'خلي نفس المحصول أو نفس النمط الحالي كخط أساس للمقارنة.',good:'كتحافظ على الممارسة اللي عارفها الفلاح.',risk:'الاستمرار بنفس النمط يقدر يزيد الضغط على التربة والماء.'},
    {title:'تدبير الماء',desc:'قارن إدخال محصول أقل طلباً للماء أو تعديل توقيت الزراعة حسب الموسم.',good:'ممكن يخفف الضغط على موارد الماء.',risk:'خاص اختيار المحصول يكون مناسب للتربة والسوق المحلي.'},
    {title:'تنويع المحاصيل',desc:'درس التناوب مع البقوليات والمحاصيل المختلفة حسب دورة زراعية محلية.',good:'التنويع يقدر يساعد فتنظيم الدورة الزراعية.',risk:'النتيجة كتختلف حسب الأمراض والتربة والتدبير.'}
  ]:[
    {title:'Current rotation',desc:'Keep the current crop or pattern as a baseline for comparison.',good:'Preserves a familiar farming practice.',risk:'Repeating the same pattern can increase pressure on soil and water.'},
    {title:'Water-aware strategy',desc:'Consider a less water-demanding crop or adjust planting timing to the season.',good:'May reduce pressure on water resources.',risk:'The crop must still fit local soil and market conditions.'},
    {title:'Crop diversity',desc:'Explore rotation with legumes and different crops based on a locally suitable plan.',good:'Diversity may support a more balanced rotation.',risk:'Results depend on disease pressure, soil and management.'}
  ];

  return <div className="app">
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark"><Sprout size={22}/></span><span>Terra<span>Wise</span></span></a>
      <nav><a href="#field">{t.nav1}</a><a href="#nasa">{t.nav2}</a><a href="#rotation">{t.nav3}</a><a href="#land">{t.nav4}</a></nav>
      <button className="language" onClick={()=>setLang(d?'english':'darija')}><Languages size={16}/>{d?'English':'الدارجة'}</button>
    </header>
    <main id="top">
      <section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="live-dot"/>{t.eyebrow}</div><h1>{t.hero}</h1><p>{t.intro}</p><div className="hero-actions"><a className="button primary" href="#field">{t.cta}<ArrowUpRight size={17}/></a><button className="button glass" onClick={()=>say(`${t.hero}. ${t.intro}`)}><Volume2 size={17}/>{t.sayIntro}</button></div><div className="hero-note"><ShieldCheck size={17}/>{t.heroNote}</div></div>
        <div className="hero-visual"><div className="visual-glow"/><div className="earth-card"><div className="earth-top"><span>FIELD INTELLIGENCE</span><Satellite size={19}/></div><div className="field-art"><div className="sun-disc"/><div className="field-row row-a"/><div className="field-row row-b"/><div className="field-row row-c"/><div className="field-row row-d"/><div className="field-row row-e"/><div className="field-horizon"/></div><div className="earth-bottom"><span><span className="signal"/> EARTH OBSERVATION</span><b>01 / 03</b></div></div><div className="floating-chip chip-one"><Droplets size={16}/><span>WATER<br/><b>INSIGHTS</b></span></div><div className="floating-chip chip-two"><Leaf size={16}/><span>SOIL<br/><b>RESILIENCE</b></span></div></div>
      </section>
      <section className="trust-strip"><div><span className="trust-icon"><Satellite/></span><span><b>NASA Earth data</b><small>{d?'مؤشرات مناخية':'Climate indicators'}</small></span></div><div><span className="trust-icon"><Droplets/></span><span><b>{d?'الماء والتربة':'Water & soil'}</b><small>{d?'قرارات واعية بالموارد':'Resource-aware decisions'}</small></span></div><div><span className="trust-icon"><Handshake/></span><span><b>LandMatch</b><small>{d?'مطابقة حسب الموقع':'Location-based matching'}</small></span></div></section>

      <section className="section" id="field"><div className="section-heading"><div className="section-number">01 <span> / FIELD PROFILE</span></div><h2>{t.fieldTitle}</h2><p>{t.fieldSub}</p></div>
        <div className="field-layout"><article className="panel field-panel"><div className="panel-heading"><span className="panel-icon"><MapPinned/></span><div><h3>{t.location}</h3><p>{t.privacy}</p></div></div>
          <button className="gps-button" onClick={useGPS} disabled={locLoading}><LocateFixed size={18}/>{locLoading?t.searching:t.gps}<ArrowUpRight size={17}/></button>
          <div className="or-divider"><span>{t.or}</span></div>
          <div className="search-location"><MapPin size={18}/><input value={place} onChange={e=>setPlace(e.target.value)} onKeyDown={e=>e.key==='Enter'&&searchLocation()} placeholder={t.searchPlace}/><button onClick={searchLocation} disabled={locLoading} aria-label={t.search}><Search size={18}/></button></div>
          {locationLabel&&<div className="location-confirm"><Check size={15}/><span>{locationLabel}</span><small>{coords?.lat.toFixed(3)}, {coords?.lon.toFixed(3)}</small></div>}
          <div className="form-grid"><label>{t.area}<div className="input-box"><input type="number" min="0" step="0.1" value={area} onChange={e=>setArea(e.target.value)} placeholder="2.5"/><span>{t.hectares}</span></div></label><label>{t.water}<div className="water-options"><button className={water==='rain'?'active':''} onClick={()=>setWater('rain')}><CloudRain/><span>{t.rain}</span></button><button className={water==='drip'?'active':''} onClick={()=>setWater('drip')}><Droplets/><span>{t.drip}</span></button><button className={water==='well'?'active':''} onClick={()=>setWater('well')}><Waves/><span>{t.well}</span></button></div></label></div>
        </article>
        <article className="panel crop-panel"><div className="panel-heading"><span className="panel-icon"><Sprout/></span><div><h3>{t.crop}</h3><p>{d?'اختار المحصول من اللائحة.':'Choose a crop to explore.'}</p></div></div><div className="crop-grid">{CROPS.map(c=>{const Icon=c.Icon;return <button key={c.id} className={crop===c.id?'crop-option active':'crop-option'} onClick={()=>setCrop(c.id)}><Icon size={23}/><span>{d?c.ar:c.en}{crop===c.id&&<Check size={14}/>}</span></button>})}</div><div className="crop-selected"><span><CropIcon size={20}/></span><div><small>{d?'المحصول المختار':'SELECTED CROP'}</small><b>{d?selected.ar:selected.en}</b></div><button onClick={()=>say(d?selected.ar:selected.en)} aria-label="Listen to crop"><Volume2 size={17}/></button></div></article></div>
      </section>

      <section className="section" id="nasa"><div className="section-heading"><div className="section-number">02 <span> / NASA EARTH OBSERVATIONS</span></div><h2>{t.nasaTitle}</h2><p>{t.nasaSub}</p></div><article className="panel nasa-panel"><div className="nasa-header"><div className="nasa-brand"><span className="nasa-mark"><Satellite/></span><span><b>NASA POWER</b><small>Prediction Of Worldwide Energy Resources</small></span></div><span className="source-tag">{t.source}</span></div>
        {!coords&&!nasaLoading?<div className="empty-data"><span><Navigation size={24}/></span><b>{t.noLocation}</b></div>:nasaLoading?<div className="empty-data"><RefreshCw className="spin"/><b>{t.loading}</b></div>:nasa?.error?<div className="empty-data"><CircleHelp size={25}/><b>{t.nasaError}</b><button className="retry" onClick={()=>coords&&loadNASA(coords)}>{d?'عاود المحاولة':'Retry'}</button></div>:nasa&&<div className="metrics"><div className="metric-card"><span className="metric-icon"><Sun/></span><small>{t.temperature}</small><b>{nasa.temp}<em>°C</em></b><i>T2M</i></div><div className="metric-card"><span className="metric-icon"><CloudRain/></span><small>{t.rainfall}</small><b>{nasa.rain}<em> mm</em></b><i>PRECTOTCORR × 365</i></div><div className="metric-card"><span className="metric-icon"><Droplets/></span><small>{t.humidity}</small><b>{nasa.hum}<em>%</em></b><i>RH2M</i></div></div>}
        <div className="data-caution"><AlertTriangle size={17}/><p>{t.dataNote}</p></div>
      </article></section>

      <section className="section" id="rotation"><div className="section-heading"><div className="section-number">03 <span> / ROTATION PLANNER</span></div><h2>{t.planTitle}</h2><p>{t.planSub}</p></div><div className="strategy-grid">{plans.map((p,i)=>{const Icon=[Sprout,Droplets,Leaf][i];return <article className="strategy-card" key={p.title}><div className="strategy-head"><span className="strategy-icon"><Icon size={22}/></span><small>STRATEGY 0{i+1}</small></div><h3>{p.title}</h3><p>{p.desc}</p><div className="strategy-point good"><Check size={16}/><span><b>{t.benefit}</b><small>{p.good}</small></span></div><div className="strategy-point caution"><AlertTriangle size={16}/><span><b>{t.risk}</b><small>{p.risk}</small></span></div><button className="listen-link" onClick={()=>say(`${p.title}. ${p.desc}. ${t.benefit}: ${p.good}. ${t.risk}: ${p.risk}`)}><Volume2 size={16}/>{t.listen}</button></article>})}</div>
        <div className="validation-note"><ShieldCheck size={18}/><span>{d?'هاد المقارنة أولية. خاص تحليل التربة والتحقق مع مختص محلي قبل اعتماد أي دورة.':'This is an initial comparison. Soil testing and local expert validation are needed before adopting a rotation.'}</span></div>
      </section>

      <section className="section" id="land"><div className="section-heading"><div className="section-number">04 <span> / LANDMATCH</span></div><h2>{t.landTitle}</h2><p>{t.landSub}</p></div><article className="panel land-panel"><div className="land-controls"><label>{t.radius}<select value={radius} onChange={e=>setRadius(Number(e.target.value))}><option value={20}>20 km</option><option value={50}>50 km</option><option value={100}>100 km</option><option value={250}>250 km</option></select></label><button className="gps-button compact" onClick={()=>coords?setMessage(''):useGPS()}><Navigation size={17}/>{t.find}</button></div>
        {coords?<><div className="map-frame"><iframe title="OpenStreetMap location" loading="lazy" src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon-.16}%2C${coords.lat-.12}%2C${coords.lon+.16}%2C${coords.lat+.12}&layer=mapnik&marker=${coords.lat}%2C${coords.lon}`}/><a href={`https://www.openstreetmap.org/?mlat=${coords.lat}&mlon=${coords.lon}#map=11/${coords.lat}/${coords.lon}`} target="_blank" rel="noreferrer">Open map <ArrowUpRight size={13}/></a></div><div className="listing-head"><h3>{t.listings}</h3><span>{demoListings.length} {d?'نتائج':'results'}</span></div>{demoListings.length?<div className="land-results">{demoListings.map((x,i)=><div className="land-result" key={x.id}><div className="land-thumb"><span className="demo-pill">{t.demo}</span><div className="field-lines"/></div><div className="land-info"><b>{d?`قطعة أرض تجريبية ${String(i+1).padStart(2,'0')}`:`Sample field ${String(i+1).padStart(2,'0')}`}</b><span>{t.size}: {x.size} ha · {t.waterSource}: {x.water}</span><small>{t.distance}: {x.km.toFixed(1)} km · Soil: {x.soil}</small></div><button onClick={()=>setMessage(t.demoNote)}>{t.contact}</button></div>)}</div>:<div className="empty-data"><MapPin size={24}/><b>{d?'ما كايناش أمثلة داخل هاد المسافة. زيد نطاق البحث.':'No sample points in this radius. Increase the search radius.'}</b></div>}</>:<div className="empty-data"><MapPin size={25}/><b>{t.noListings}</b><button className="retry" onClick={()=>document.getElementById('field')?.scrollIntoView({behavior:'smooth'})}>{t.fieldTitle}</button></div>}
        <p className="demo-disclaimer">{t.demoNote}</p>
      </article></section>

      <section className="voice-section"><div className="voice-orb"><Mic size={30}/></div><div className="voice-main"><div className="section-number">05 <span> / VOICE ASSISTANT</span></div><h2>{t.voiceTitle}</h2><p>{t.voiceSub}</p><div className="voice-controls"><button className="button primary" onClick={say.bind(null,`${t.hero}. ${t.intro} ${t.dataNote}`)}><Volume2 size={17}/>{t.sayIntro}</button><button className="button outline" onClick={listening?stopVoice:startVoice}><Mic size={17}/>{listening?t.stopVoice:t.startVoice}</button></div>{listening&&<div className="listening-state"><span className="pulse-dot"/>{t.listening}</div>}{transcript&&<div className="transcript"><b>{t.heard}:</b> {transcript}</div>}{voiceStatus&&<small className="voice-status">{voiceStatus}</small>}<small className="voice-tip"><Radio size={14}/>{t.voiceTip}</small></div></section>
      <div className="footer-note"><ShieldCheck size={20}/><p>{t.footer}</p></div>
    </main>
    <footer><span className="footer-brand"><Sprout size={18}/> TerraWise</span><span>NASA Space Apps Challenge 2026 · Field Shift</span></footer>
    {message&&<div className="toast" role="status"><span>{message}</span><button onClick={()=>setMessage('')} aria-label="Close"><X size={17}/></button></div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
