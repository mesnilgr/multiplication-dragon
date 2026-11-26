/* Course des Dragons — circuit « Washington » (décor stylisé et original)
   National Mall : Capitole, Washington Monument, Maison-Blanche, Lincoln Memorial, Potomac, Tidal Basin et cerisiers, Jefferson Memorial, château du Smithsonian. */
import{makeKit}from'./kit.js';
const CAP=[500,0],MON=[0,0],WH=[0,-320],LIN=[-470,0],JEF=[60,280],TB=[0,230],SMI=[220,95];
const POTO=[[-700,-600,120],[-640,-300,120],[-600,-60,120],[-590,120,120],[-520,330,130],[-380,470,130],[-200,560,130],[40,640,140]];
const def={
  laps:2,ocean:false,
  cp:[[380,22,0],[220,20,-5],[80,24,5],[35,32,50],[-45,46,45],[-55,62,-35],[15,78,-58],[58,94,5],[25,110,52],[-40,104,30],[-60,82,-90],[-20,52,-200],[0,42,-262],
      [-120,40,-330],[-300,36,-220],[-420,30,-60],[-480,42,0],[-560,30,80],[-525,20,220],[-380,18,320],[-200,22,345],[-60,26,315],[60,54,280],[200,36,220],[360,32,150],[520,58,100],[640,68,0],[540,60,-115],[430,36,-70]],
  tight:[],
  tick(t){const F=this._flags;if(F){const a=F.A.alpha;for(let i=F.k0;i<a.length;i++)a[i]=.55+.45*Math.sin(t*4+i);F.geometry.attributes.iAlpha.needsUpdate=true}},
  async build(W,ctx){const K=makeKit(ctx,1776),T=K.T;const MARBLE=0xf3f0e8,STONE=0xe4dfd2;
    K.ground(0xc8c3b2);
    /* pelouses du Mall, allées, bassins */
    K.flat(10,0,1000,150,0x7fb85a,.1);for(const z of[-48,48])K.flat(10,z,1000,10,0xe6dcc6,.14);
    K.flat(0,-300,170,130,0x86bf60,.12);K.flat(-250,0,330,40,0x7cb257,.13);
    K.water(POTO);K.disk(TB[0],TB[1],95,'water',.3);
    {const m=new T.Mesh(new T.PlaneGeometry(330,22).rotateX(-Math.PI/2),ctx.oceanMat);m.position.set(-265,.32,0);W.add(m)}
    K.disk(-80,0,26,'water',.3);
    await ctx.step(.45);
    const P=[];
    /* ---- Washington Monument + drapeaux ---- */
    {const[x,z]=MON;const sh=new T.CylinderGeometry(5.2,8.6,134,4);sh.rotateY(Math.PI/4);P.push(K.part(sh,MARBLE,[x,67,z]));const py=new T.ConeGeometry(7.35,8,4);py.rotateY(Math.PI/4);P.push(K.part(py,MARBLE,[x,138,z]));
      P.push(K.cyl(30,32,1.2,40,0xd9d2c0,x,0,z));for(let i=0;i<50;i++){const a=i/50*Math.PI*2;P.push(K.cyl(.18,.22,12,5,0xdddddd,x+Math.cos(a)*24,0,z+Math.sin(a)*24))}}
    /* ---- Capitole ---- */
    {const[x,z]=CAP;P.push(K.box(60,22,200,MARBLE,x,0,z),K.box(66,2,206,STONE,x,22,z),K.box(36,10,60,MARBLE,x-30,0,z));
      K.row(P,10,1.3,20,MARBLE,x-48,z-28,x-48,z+28,2);P.push(K.prism(60,16,7,STONE,x-48,22,z,Math.PI/2));
      for(const sz of[-1,1]){K.row(P,8,1.1,18,MARBLE,x-31,z+sz*60,x-31,z+sz*95,2);P.push(K.prism(30,10,5,STONE,x-31,22,z+sz*78,Math.PI/2))}
      P.push(K.cyl(26,28,8,32,MARBLE,x,24,z),K.cyl(21,21,16,32,MARBLE,x,32,z));K.colonnade(P,24,1,14,MARBLE,x,32,z,23.5);
      P.push(K.cyl(23.5,23.5,2,32,STONE,x,46,z),K.dome(20,1.25,MARBLE,x,48,z,28),K.cyl(3.4,3.6,8,12,MARBLE,x,71,z),K.dome(3.6,1.3,MARBLE,x,79,z,12),K.cyl(.8,1,6,8,0x6b6b6b,x,83,z))}
    /* ---- Maison-Blanche ---- */
    {const[x,z]=WH;P.push(K.box(66,20,28,0xfbfbf7,x,0,z),K.box(68,2,30,STONE,x,20,z),K.box(70,1.4,32,0xeeeeea,x,22,z));
      K.colonnade(P,8,.9,18,0xfbfbf7,x,2,z+14,10,0,Math.PI);P.push(K.cyl(11,11,1.6,20,STONE,x,20,z+14));
      K.row(P,6,.9,18,0xfbfbf7,x-8,z-16,x+8,z-16,2);P.push(K.prism(20,6,5,0xfbfbf7,x,22,z-16));
      P.push(K.cyl(.25,.3,10,5,0xcccccc,x,23,z),K.box(5,3,.3,0xd23a3a,x+2.6,30,z));for(const sx of[-1,1])P.push(K.box(40,10,18,0xf7f7f2,x+sx*55,0,z-4))
      P.push(K.cyl(6,6,1.2,20,0xcfd8de,x,0,z+70))}
    /* ---- Lincoln Memorial ---- */
    {const[x,z]=LIN;P.push(K.box(46,6,70,STONE,x,0,z),K.box(36,18,60,MARBLE,x,6,z),K.box(42,6,66,MARBLE,x,24,z),K.box(36,2.4,60,STONE,x,30,z));
      for(const sz of[-1,1])K.row(P,12,1.1,18,MARBLE,x-19,z+sz*31,x+19,z+sz*31,6);for(const sx of[-1,1])K.row(P,8,1.1,18,MARBLE,x+sx*19,z-27,x+sx*19,z+27,6);
      for(let k=0;k<5;k++)P.push(K.box(6,1.2*(5-k),60-k*4,STONE,x+26+k*5,0,z))}
    /* ---- Jefferson Memorial ---- */
    {const[x,z]=JEF;P.push(K.cyl(26,28,6,32,STONE,x,0,z),K.cyl(17,17,18,28,MARBLE,x,6,z));K.colonnade(P,20,1,18,MARBLE,x,6,z,21);
      P.push(K.cyl(22,22,3,32,STONE,x,24,z),K.dome(20,.75,MARBLE,x,27,z,28));K.row(P,6,1.1,18,MARBLE,x-12,z-26,x+12,z-26,6);P.push(K.prism(28,10,6,MARBLE,x,24,z-26))}
    /* ---- Smithsonian Castle ---- */
    {const[x,z]=SMI,R=0x9c4a3c,D=0x6e3a32;P.push(K.box(90,18,22,R,x,0,z),K.prism(90,22,7,D,x,18,z));
      for(const[dx,h]of[[-48,30],[48,26],[0,38],[16,44]]){P.push(K.box(10,h,10,R,x+dx,0,z));const c=new T.ConeGeometry(7.5,10,4);c.rotateY(Math.PI/4);P.push(K.part(c,D,[x+dx,h+5,z]))}}
    /* ---- Mémorial WWII (piliers) ---- */
    {K.colonnade(P,28,1.4,9,STONE,-80,0,0,34)}
    K.addMerged(P);
    await ctx.step(.62);
    /* ---- cerisiers autour du Tidal Basin + arbres du Mall ---- */
    {const pink=[];for(let i=0;i<110;i++){const a=i/110*Math.PI*2,r=104+K.rnd()*14;pink.push([TB[0]+Math.cos(a)*r,TB[1]+Math.sin(a)*r,2.6+K.rnd()])}
      K.trees(pink,[0xffb7d5,0xff9ec7,0xffc9df,0xffffff]);
      const gr=[];for(let x=-430;x<=420;x+=14)for(const z of[-62,-74,62,74]){if(Math.abs(x)<60||Math.abs(x+80)<40)continue;gr.push([x,z,2.8+K.rnd()*.6])}
      for(let i=0;i<120;i++){const x=-80+K.rnd()*160,z=-380+K.rnd()*130;if(Math.abs(x)<40&&z>-345&&z<-295)continue;gr.push([x,z,2.6+K.rnd()])}
      for(let i=0;i<200;i++){const t=K.rnd()*(POTO.length-1),j=Math.floor(t),f=t-j,a=POTO[j],b=POTO[j+1],sd=K.rnd()<.5?-1:1;const dx=b[0]-a[0],dz=b[1]-a[1],l=Math.hypot(dx,dz);const w=a[2]/2+10+K.rnd()*30;gr.push([a[0]+dx*f-dz/l*w*sd,a[1]+dz*f+dx/l*w*sd,2.8+K.rnd()])}
      K.trees(gr)}
    /* ---- bâtiments fédéraux et maisons de briques ---- */
    {const blocked=(x,z,r)=>{if(Math.abs(z)<95+r&&x>-520&&x<640)return true;if(K.polyD(x,z,POTO)<20+r)return true;if(Math.hypot(x-TB[0],z-TB[1])<130+r)return true;if(Math.hypot(x-JEF[0],z-JEF[1])<60+r)return true;
        if(Math.abs(x-WH[0])<110+r&&z>-420-r&&z<-230+r)return true;if(Math.hypot(x-CAP[0],z-CAP[1])<150+r)return true;if(Math.hypot(x-LIN[0],z-LIN[1])<80+r)return true;return false};
      const inner=(x,z)=>Math.abs(x)<520&&Math.abs(z)<340;
      K.blocks(K.grid({x0:-520,x1:640,z0:-520,z1:440,step:60,w:[40,56],d:[34,48],h:[14,22],blocked,colors:[0xe8e2d4,0xdcd6c6,0xece6d8],clear:18,keep:inner}),{type:'plain',roof:'flat'});
      K.blocks(K.grid({x0:-560,x1:900,z0:-900,z1:720,step:30,w:[14,20],d:[18,24],h:[8,12],blocked,colors:[0xb5574a,0xa8513f,0xc06a52,0x9c4b40,0xd8cfc0],clear:16,keep:(x,z)=>!inner(x,z)&&Math.hypot(x*.8,z)<900&&!(x<-560)}),{type:'brick',roof:'gable',roofColor:0x4a4f58,roofH:[3,4]})}
    await ctx.step(.82);
    K.clouds(K.puffRing(60,300,900,160,240));
    const flags=[];for(let i=0;i<50;i++){const a=i/50*Math.PI*2;flags.push([MON[0]+Math.cos(a)*24,12.4,MON[1]+Math.sin(a)*24,2.2,i%2?0xff4a4a:0xffffff,.8])}
    flags.push([MON[0],146,MON[1],10,0xff3030,.9]);
    const gm=ctx.trackGlows(W,flags);gm.k0=gm.A.alpha.length-flags.length;def._flags=gm;
    await ctx.step(.98)}
};
export default def;
