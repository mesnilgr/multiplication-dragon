/* Course des Dragons — circuit « San Francisco » (décor stylisé et original)
   Embarcadero, Alcatraz, pont du Golden Gate, collines et maisons colorées, Twin Peaks, cable car, Coit Tower, pyramide du centre-ville. */
import{makeKit}from'./kit.js';
const GG={x:-360,zN:-470,zS:-110,t1:-340,t2:-180,deck:30,top:96,half:16};
const ALC=[150,-330],COIT=[225,-80],PYR=[335,70],CABLE={x:100,z0:-60,z1:300};
const HILLS=[[225,-80,34,55],[60,40,40,80],[-20,-40,36,60],[-150,300,70,110],[-200,-20,28,90],[-60,170,30,90],[260,260,26,110]];
const MARIN=[[-380,-660,85,140],[-140,-680,60,130],[-580,-620,60,150]];
function landH(x,z){/* péninsule : terre au sud de z=-150 entre x=-470 et x=470 ; Marin au nord de z=-420 */
  const e=Math.min(z+150,x+470,470-x);let h=-8;
  if(e>-40){const k=Math.max(0,Math.min(1,e/70));let hh=6;for(const[cx,cz,hgt,r]of HILLS)hh+=hgt*Math.exp(-(((x-cx)/r)**2+((z-cz)/r)**2));h=-8+(hh+8)*k}
  const m=-420-z;if(m>-40&&x<120){const k=Math.max(0,Math.min(1,m/70))*Math.max(0,Math.min(1,(120-x)/80));let hh=4;for(const[cx,cz,hgt,r]of MARIN)hh+=hgt*Math.exp(-(((x-cx)/r)**2+((z-cz)/r)**2));h=Math.max(h,-8+(hh+8)*k)}
  const da=Math.hypot(x-ALC[0],z-ALC[1]);if(da<40)h=Math.max(h,-8+22*Math.max(0,1-(da/40)**2));
  return h}
const def={
  laps:2,ocean:true,oceanY:0,
  cp:[[435,20,-60],[410,22,-170],[300,20,-280],[195,18,-370],[90,22,-390],[-40,28,-410],[-170,36,-455],[-280,42,-470],[-360,42,-410],[-360,42,-340],[-360,40,-260],[-360,42,-180],[-360,40,-100],
      [-320,48,-25],[-230,56,60],[-170,82,200],[-150,104,300],[-60,88,335],[40,72,262],[100,66,160],[100,66,40],[140,78,-40],[225,88,-82],[310,64,-20],[395,34,40],[452,22,20]],
  tight:[{p:[-360,42,-340],r:60},{p:[-360,42,-180],r:60}],
  tick(t){const C=this._cars;if(C){for(let i=0;i<C.list.length;i++){const c=C.list[i];c.u+=c.v*.0012;if(c.u>1){c.u=1;c.v=-c.v}if(c.u<0){c.u=0;c.v=-c.v}const z=CABLE.z0+(CABLE.z1-CABLE.z0)*c.u,x=CABLE.x+(c.v>0?3:-3);C.d.position.set(x,landH(x,z)+.2,z);C.d.rotation.set(0,0,0);C.d.updateMatrix();C.mesh.setMatrixAt(i,C.d.matrix)}C.mesh.instanceMatrix.needsUpdate=true}
    const B=this._beacon;if(B){const a=B.A.alpha;a[B.k0]=.5+.5*Math.sin(t*3);B.geometry.attributes.iAlpha.needsUpdate=true}},
  async build(W,ctx){const K=makeKit(ctx,415),T=K.T;
    /* ---- terre et collines ---- */
    K.terrain(2000,110,landH,(c,h,x,z)=>{if(h<1.2)c.setHex(0xd9c79a);else if(z<-400||h>48)c.setHSL(.24,.32,.36+Math.min(h,90)/90*.12);else c.setHSL(.12,.18,.72)},0,-100);
    await ctx.step(.45);
    const P=[];
    /* ---- Golden Gate ---- */
    {const O=0xc23a2b,x=GG.x,H=GG.half;
      P.push(K.box(32,2.4,GG.zS-GG.zN+40,O,x,GG.deck-2.4,(GG.zN+GG.zS)/2),K.box(32,1.2,GG.zS-GG.zN+40,0x4a4a4a,x,GG.deck,(GG.zN+GG.zS)/2));
      for(const tz of[GG.t1,GG.t2]){for(const sx of[-1,1]){P.push(K.box(6,GG.top+8,7,O,x+sx*H,-8,tz));for(let k=0;k<4;k++)P.push(K.box(3,1.2,8.6,0xa83226,x+sx*H,14+k*20,tz))}
        for(const y of[64,80,93])P.push(K.box(2*H,4,5,O,x,y,tz));P.push(K.box(2*H+8,6,12,0x9aa3ad,x,-8,tz))}
      /* câbles porteurs + suspentes */
      const cab=(z0,z1,y0,y1,sag,sx)=>{const n=24;let prev=null;for(let i=0;i<=n;i++){const t=i/n,z=z0+(z1-z0)*t,y=y0+(y1-y0)*t-sag*4*t*(1-t);const p=[x+sx*H,y,z];if(prev)P.push(K.beam(prev,p,.7,.7,O));if(i%2===0&&i>0&&i<n&&y-GG.deck>2)P.push(K.beam([x+sx*H,GG.deck,z],[x+sx*H,y,z],.18,.18,O));prev=p}};
      for(const sx of[-1,1]){cab(GG.t1,GG.t2,GG.top,GG.top,58,sx);cab(GG.zN,GG.t1,GG.deck+4,GG.top,10,sx);cab(GG.t2,GG.zS,GG.top,GG.deck+4,10,sx)}}
    /* ---- Alcatraz ---- */
    {const[x,z]=ALC,y=13;P.push(K.box(34,9,14,0xd8d2c4,x,y,z),K.prism(34,14,3,0x8b7f72,x,y+9,z),K.box(12,6,10,0xcfc8b8,x-20,y-1,z+12),K.cyl(1.6,2.2,20,8,0xf2efe6,x+16,y,z-10),K.cyl(2.2,2.2,3,8,0x333333,x+16,y+20,z-10))}
    /* ---- Coit Tower ---- */
    {const[x,z]=COIT,y=landH(x,z);P.push(K.cyl(4.2,4.6,24,14,0xf1ece0,x,y,z),K.cyl(5,5,2,14,0xe2dccd,x,y+24,z),K.box(16,4,16,0xe2dccd,x,y,z))}
    /* ---- pyramide et tours du centre ---- */
    {const[x,z]=PYR,y=landH(x,z);const pg=new T.CylinderGeometry(.6,10.5,92,4);pg.rotateY(Math.PI/4);P.push(K.part(pg,0xf4f2ec,[x,y+46,z]),K.cone?null:K.beam([x,y+92,z],[x,y+104,z],.6,.15,0xf4f2ec))}
    /* ---- Bay Bridge (silhouette) ---- */
    {const G=0x9aa3ad;P.push(K.box(900,2,18,G,900,26,40));for(const bx of[560,720,880])for(const sz of[-1,1]){P.push(K.box(4,70,4,G,bx,-6,40+sz*8))}
      for(const[a,b]of[[480,560],[560,720],[720,880],[880,960]]){const n=10;for(let i=0;i<n;i++){const t0=i/n,t1=(i+1)/n,f=t=>64-34*4*t*(1-t);for(const sz of[-1,1])P.push(K.beam([a+(b-a)*t0,f(t0),40+sz*8],[a+(b-a)*t1,f(t1),40+sz*8],.5,.5,G))}}}
    K.addMerged(P.filter(Boolean));
    await ctx.step(.6);
    /* ---- maisons colorées sur les collines ---- */
    const blocked=(x,z,r)=>{if(landH(x,z)<2.5||landH(x+r,z)<2||landH(x-r,z)<2||landH(x,z+r)<2||landH(x,z-r)<2)return true;
      if(Math.abs(x-CABLE.x)<12+r&&z>CABLE.z0-10&&z<CABLE.z1+10)return true;if(Math.hypot(x-COIT[0],z-COIT[1])<22+r)return true;if(Math.hypot(x-PYR[0],z-PYR[1])<24+r)return true;
      if(Math.abs(x-GG.x)<30+r&&z<GG.zS+40)return true;return false};
    const pastel=[0xf7c8d0,0xbfe3f0,0xf8e3a6,0xc9e8c2,0xe0cdf5,0xffd9b0,0xf4f0e6,0xa9d6e5];
    const houses=K.grid({x0:-460,x1:300,z0:-140,z1:560,step:24,w:[12,16],d:[16,20],h:[7,11],blocked,baseY:landH,colors:pastel,clear:16,keep:(x,z)=>!(x>270&&z<200)});
    K.blocks(houses,{type:'house',roof:'gable',roofColor:0x6a5d6e,roofH:[3,5]});
    const towers=K.grid({x0:290,x1:460,z0:-40,z1:300,step:30,w:[16,24],d:[16,24],h:[26,70],blocked,baseY:landH,colors:[0xc9d3dd,0xb8c4cf,0xe2e2dc,0x9fb0c0],clear:18});
    K.blocks(towers,{type:'office',roof:'flat'});
    {const tr=[];for(let i=0;i<260;i++){const x=-460+K.rnd()*760,z=-140+K.rnd()*700,h=landH(x,z);if(h<2.5||blocked(x,z,0)&&h<2.5)continue;if(ctx.distToTrack2D(x,z,h+30)<20)continue;tr.push([x,z,2.2+K.rnd(),h])}
      for(let i=0;i<220;i++){const x=-640+K.rnd()*760,z=-680+K.rnd()*260,h=landH(x,z);if(h<3)continue;tr.push([x,z,3+K.rnd()*1.5,h])}
      K.trees(tr,[0x4f8f45,0x5d9c4c,0x3f7f3c])}
    await ctx.step(.78);
    /* ---- cable cars ---- */
    {const cg=K.merge([K.box(4,3.2,8,0xb33a2e,0,0,0),K.box(3.6,1.4,7.4,0xf3e6c8,0,2.2,0),K.box(4.4,.5,8.6,0x5a3b2a,0,3.2,0)]);const n=3,mesh=new T.InstancedMesh(cg,K.lam,n);mesh.frustumCulled=false;W.add(mesh);
      const rail=[];for(let z=CABLE.z0;z<CABLE.z1;z+=8){const a=landH(CABLE.x,z),b=landH(CABLE.x,z+8);rail.push(K.beam([CABLE.x,a+.1,z],[CABLE.x,b+.1,z+8],1.8,1.8,0x8a8172))}K.addMerged(rail,K.lam);
      def._cars={mesh,d:new T.Object3D(),list:[{u:.1,v:1},{u:.55,v:-1},{u:.85,v:1}]}}
    /* ---- brouillard sous le pont et nuages ---- */
    {const fog=[];for(let i=0;i<46;i++){const z=GG.zN-60+K.rnd()*(GG.zS-GG.zN+120),x=GG.x-140-K.rnd()*260;fog.push([x,4+K.rnd()*16,z,34+K.rnd()*30,1,.75])}
      for(let i=0;i<16;i++)fog.push([GG.x-30+K.rnd()*60,6+K.rnd()*10,GG.zN+K.rnd()*(GG.zS-GG.zN),26+K.rnd()*16,1,.55]);
      K.clouds([...fog,...K.puffRing(55,300,900,150,230)])}
    const extra=[[ALC[0]+16,y0(ALC)+24,ALC[1]-10,9,0xfff0a0,.9]];
    {for(const tz of[GG.t1,GG.t2])for(const sx of[-1,1])extra.push([GG.x+sx*GG.half,GG.top+9,tz,4,0xff5040,.8])}
    const gm=ctx.trackGlows(W,extra);gm.k0=gm.A.alpha.length-extra.length;def._beacon=gm;
    await ctx.step(.98)}
};
function y0(p){return landH(p[0],p[1])}
export default def;
