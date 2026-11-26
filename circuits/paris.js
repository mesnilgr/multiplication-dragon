/* Course des Dragons — circuit « Paris »
   Chargé à la demande juste avant la course. Décor stylisé et original :
   Arc de Triomphe, Champs-Élysées, tour Eiffel, Seine, Concorde, Louvre, Notre-Dame, Sacré-Cœur. */
let seed=2024;const rnd=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};

const ARC=[-520,-159],EIFFEL=[-430,260],OBEL=[-180,-40],LOUVRE=[60,-30],ND=[300,100],SC=[60,-470];
/* Seine : x, z, largeur */
const SEINE=[[900,230,46],[700,190,46],[520,150,46],[410,120,70],[300,100,74],[200,72,50],[80,45,46],[-60,35,46],[-180,30,46],[-300,62,46],[-400,140,46],[-480,205,46],[-545,262,46],[-630,345,46],[-760,470,46],[-900,600,46]];

const def={
  laps:2,ocean:false,
  cp:[[-300,22,-82],[-420,20,-124],[-520,18,-159],[-612,22,-192],[-684,32,-110],[-645,32,20],[-545,24,112],[-440,16,175],[-430,13,260],[-430,15,330],[-385,24,370],
      [-330,42,290],[-440,60,160],[-535,76,250],[-450,90,362],[-350,82,345],[-262,50,205],[-200,18,85],[-150,14,38],[-118,18,-8],[-62,26,-30],[-5,34,-30],[70,22,-30],[165,42,-28],
      [225,34,30],[300,62,140],[385,55,72],[362,48,-80],[252,72,-320],[150,95,-500],[60,100,-578],[-35,92,-492],[-120,60,-300],[-142,38,-130],[-185,26,-66],[-240,22,-61]],
  tight:[{p:[-520,18,-159],r:75},{p:[-430,13,260],r:75}],
  tick(t){if(this._boats){const B=this._boats;for(let i=0;i<B.list.length;i++){const b=B.list[i];b.u+=b.v*.0004;if(b.u>1)b.u-=1;if(b.u<0)b.u+=1;const p=riverAt(b.u),q=riverAt(Math.min(1,Math.max(0,b.u+.002*Math.sign(b.v))));
      B.d.position.set(p[0]+b.off*Math.cos(p[3]+1.57),.6,p[1]+b.off*Math.sin(p[3]+1.57));B.d.rotation.set(0,-Math.atan2(q[1]-p[1],q[0]-p[0]),0);B.d.updateMatrix();B.mesh.setMatrixAt(i,B.d.matrix)}B.mesh.instanceMatrix.needsUpdate=true}
    if(this._spark){const m=this._spark,a=m.A.alpha;const k0=m.k0;for(let i=k0;i<a.length;i++)a[i]=Math.random()<.18?1:a[i]*.85;m.geometry.attributes.iAlpha.needsUpdate=true}},
  async build(W,ctx){const T=ctx.THREE,V=T.Vector3,{part,merge}=ctx;seed=2024;
    const add=(geo,mat)=>{const m=new T.Mesh(geo,mat);W.add(m);return m};
    const stoneMat=new T.MeshStandardMaterial({vertexColors:true,roughness:.85,metalness:.02});
    const lam=new T.MeshLambertMaterial({vertexColors:true});
    const beam=(a,b,r0,r1,col)=>{const d=new V(b[0]-a[0],b[1]-a[1],b[2]-a[2]),len=d.length();const g=new T.CylinderGeometry(r1,r0,len,4,1);g.rotateY(Math.PI/4);g.translate(0,len/2,0);g.applyQuaternion(new T.Quaternion().setFromUnitVectors(new V(0,1,0),d.normalize()));g.translate(a[0],a[1],a[2]);return part(g,col)};
    const box=(w,h,d,col,x,y,z,ry)=>part(new T.BoxGeometry(w,h,d),col,[x,y+h/2,z],[0,ry||0,0]);
    const prism=(len,w,h,col,x,y,z,ry)=>{const g=new T.BufferGeometry();const l=len/2,q=w/2;const v=[[-l,0,-q],[l,0,-q],[l,h,0],[-l,h,0],[-l,0,q],[l,0,q]];
      const tri=[0,3,1,1,3,2, 4,5,3,5,2,3, 0,4,3, 1,2,5];const P=[];tri.forEach(i=>P.push(...v[i]));g.setAttribute('position',new T.Float32BufferAttribute(P,3));g.computeVertexNormals();return part(g,col,[x,y,z],[0,ry||0,0])};
    const hillH=(x,z)=>{const d=Math.hypot(x-SC[0],z-SC[1]);return 38*Math.exp(-((d/95)**2))};

    /* ---- sol, parcs, Seine ---- */
    const ground=new T.Mesh(new T.PlaneGeometry(4000,4000).rotateX(-Math.PI/2),new T.MeshLambertMaterial({color:0xcbc1ad}));W.add(ground);
    const parkMat=new T.MeshLambertMaterial({color:0x86b85c});
    const park=(cx,cz,w,d,ry)=>{const m=new T.Mesh(new T.PlaneGeometry(w,d).rotateX(-Math.PI/2),parkMat);m.position.set(cx,.12,cz);m.rotation.y=ry||0;W.add(m)};
    const champsDir=Math.atan2(ARC[1]-OBEL[1],ARC[0]-OBEL[0]);
    park(-108,-25,125,70,0);/* Tuileries */
    park(-372,345,70,190,-Math.atan2(420-260,-320+430)+Math.PI/2);/* Champ-de-Mars */
    {const cx=(ARC[0]+OBEL[0])/2,cz=(ARC[1]+OBEL[1])/2,len=Math.hypot(ARC[0]-OBEL[0],ARC[1]-OBEL[1]);const m=new T.Mesh(new T.PlaneGeometry(len,40).rotateX(-Math.PI/2),new T.MeshLambertMaterial({color:0xe3d9c3}));m.position.set(cx,.1,cz);m.rotation.y=-champsDir;W.add(m)}
    {const rv=[],qs=[];for(let i=0;i<SEINE.length;i++){const a=SEINE[Math.max(0,i-1)],b=SEINE[Math.min(SEINE.length-1,i+1)],p=SEINE[i];const dx=b[0]-a[0],dz=b[1]-a[1],l=Math.hypot(dx,dz),nx=-dz/l,nz=dx/l,w=p[2]/2;
        rv.push([p[0]+nx*w,p[1]+nz*w,p[0]-nx*w,p[1]-nz*w]);qs.push([p[0]+nx*(w+5),p[1]+nz*(w+5),p[0]-nx*(w+5),p[1]-nz*(w+5)])}
      const strip=(arr,y)=>{const P=[];for(let i=0;i<arr.length-1;i++){const a=arr[i],b=arr[i+1];P.push(a[0],y,a[1], b[0],y,b[1], a[2],y,a[3], a[2],y,a[3], b[0],y,b[1], b[2],y,b[3])}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(P,3));g.computeVertexNormals();return g};
      W.add(new T.Mesh(strip(qs,.2),new T.MeshLambertMaterial({color:0xb7a98e,side:T.DoubleSide})));
      const river=new T.Mesh(strip(rv,.35),ctx.oceanMat);river.material.side=T.DoubleSide;W.add(river)}
    await ctx.step(.45);

    const P=[];/* pièces de pierre fusionnées */
    /* ---- Arc de Triomphe ---- */
    {const s=ctx.nearestS(new V(ARC[0],18,ARC[1]));ctx.frame(s);const yaw=Math.atan2(ctx.F.T.x,ctx.F.T.z);const A=[];const C=0xe9ddc4,D=0xd4c6a8;
      for(const sx of[-1,1]){A.push(box(18,46,26,C,sx*23,0,0));A.push(box(10,14,1,D,sx*23,12,13.2),box(10,14,1,D,sx*23,12,-13.2))}
      A.push(box(65,1.8,27.5,D,0,45.5,0),box(64,11,26,C,0,47,0),box(65.5,1.6,27.5,D,0,58,0));
      for(let y=28;y<46;y+=2){const ym=y+1-28,hw=ym<14?Math.sqrt(196-ym*ym):0;if(hw<14){const w=14-hw;for(const sx of[-1,1])A.push(box(w,2,26,C,sx*(hw+w/2),y,0))}}
      A.push(part(new T.TorusGeometry(14.6,.9,6,24,Math.PI),D,[0,28,13.3]),part(new T.TorusGeometry(14.6,.9,6,24,Math.PI),D,[0,28,-13.3]));
      const g=merge(A);g.rotateY(yaw);g.translate(ARC[0],0,ARC[1]);P.push(g);
      /* place de l'Étoile */
      const ring=new T.Mesh(new T.RingGeometry(40,58,40).rotateX(-Math.PI/2),new T.MeshLambertMaterial({color:0xb9ad97}));ring.position.set(ARC[0],.15,ARC[1]);W.add(ring)}
    /* ---- Concorde ---- */
    {const[x,z]=OBEL;P.push(box(7,8,7,0x9a8f80,x,0,z));const sh=new T.CylinderGeometry(1.7,2.5,30,4);sh.rotateY(Math.PI/4);P.push(part(sh,0xd9b98a,[x,23,z]));const py=new T.ConeGeometry(2.4,3.4,4);py.rotateY(Math.PI/4);P.push(part(py,0xffcf40,[x,39.7,z]));
      for(const dz of[-26,26]){P.push(part(new T.CylinderGeometry(9,9,1.4,20),0x9fb3c0,[x+4,.7,z+dz]),part(new T.CylinderGeometry(1.2,1.6,6,10),0xc9b48a,[x+4,3,z+dz]),part(new T.CylinderGeometry(3.6,1.4,1.2,14),0xc9b48a,[x+4,6.2,z+dz]))}}
    /* ---- Louvre ---- */
    {const C=0xe3d6bc,R=0x56616f;const[x0,z0]=LOUVRE;
      const wing=(cx,cz,len,dep,ry)=>{P.push(box(len,22,dep,C,cx,0,cz,ry),prism(len,dep,8,R,cx,22,cz,ry))};
      wing(x0,z0+39,200,18,0);wing(x0,z0-39,200,18,0);wing(x0+95,z0,18,96,0);
      for(const[px,pz]of[[x0-100,z0+39],[x0-100,z0-39],[x0+95,z0+39],[x0+95,z0-39],[x0+20,z0+39],[x0+20,z0-39]]){P.push(box(22,27,22,C,px,0,pz));const r=new T.ConeGeometry(15.6,11,4);r.rotateY(Math.PI/4);P.push(part(r,R,[px,32.5,pz]))}
      const pg=new T.ConeGeometry(21,20,4);pg.rotateY(Math.PI/4);pg.translate(-5,10,-30);const glass=new T.Mesh(pg,new T.MeshStandardMaterial({color:0xa8dcf5,metalness:.9,roughness:.06,transparent:true,opacity:.85,flatShading:true}));W.add(glass);
      const e=[[-5-15,0,-45],[-5+15,0,-45],[-5+15,0,-15],[-5-15,0,-15]];for(const c of e)P.push(beam(c,[-5,20,-30],.25,.2,0x3b3f48));
      P.push(part(new T.BoxGeometry(70,.4,60),0xd8cdb4,[-5,.2,-30]))}
    /* ---- Notre-Dame + île de la Cité ---- */
    {const[x,z]=ND,C=0xdbd1ba,R=0x5b6573;const isl=new T.CylinderGeometry(1,1,2,28);isl.scale(92,1,24);P.push(part(isl,0xb9ae96,[x+10,.6,z]));
      const X=x-45;/* façade ouest */
      for(const sz of[-1,1]){P.push(box(13,47,13,C,X+6.5,1.6,z+sz*13.5),box(14,1.4,14,0xc9bea6,X+6.5,48.6,z+sz*13.5))}
      P.push(box(13,35,14,C,X+6.5,1.6,z),part(new T.CircleGeometry(4.6,20),0x6c4fa6,[X-.1,24,z],[0,-Math.PI/2,0]));
      for(const sz of[-1,1])for(let k=0;k<3;k++)P.push(box(.6,9,4,0x5a4a60,X-.2,3,z+(k-1)*13.5+sz*.0));
      P.push(box(72,30,22,C,X+49,1.6,z),prism(72,22,12,R,X+49,31.6,z),box(12,30,48,C,X+62,1.6,z),prism(48,12,12,R,X+62,31.6,z,Math.PI/2));
      P.push(part(new T.CylinderGeometry(11,11,28,16,1,false,0,Math.PI),C,[X+85,15.6,z],[0,-Math.PI/2,0]),part(new T.ConeGeometry(11.4,11,16,1,false,0,Math.PI),R,[X+85,35,z],[0,-Math.PI/2,0]));
      P.push(part(new T.CylinderGeometry(2.4,2.8,6,8),R,[X+62,46,z]),part(new T.ConeGeometry(2.4,30,8),R,[X+62,64,z]));
      for(let k=0;k<7;k++){const bx=X+20+k*10;for(const sz of[-1,1]){P.push(box(2.2,16,2.2,C,bx,1.6,z+sz*24));P.push(beam([bx,17,z+sz*24],[bx,27,z+sz*11.5],.7,.6,C))}}}
    /* ---- Montmartre + Sacré-Cœur ---- */
    {const hg=new T.PlaneGeometry(320,320,40,40).rotateX(-Math.PI/2);const pa=hg.attributes.position,col=[],c=new T.Color();
      for(let i=0;i<pa.count;i++){const x=pa.getX(i)+SC[0],z=pa.getZ(i)+SC[1],h=hillH(x,z);pa.setY(i,h);c.setHSL(.24,.38,.42+h/38*.12);col.push(c.r,c.g,c.b)}
      hg.translate(SC[0],0,SC[1]);hg.setAttribute('color',new T.Float32BufferAttribute(col,3));hg.computeVertexNormals();add(hg,lam);
      const[x,z]=SC,H=37,C=0xf7f4ec;
      P.push(box(32,20,40,C,x,H,z),box(18,14,12,C,x,H,z+24));
      for(let k=-1;k<=1;k++)P.push(part(new T.BoxGeometry(4,8,.6),0xb9b0a0,[x+k*6,H+5,z+30.1]));
      P.push(part(new T.CylinderGeometry(8,8.6,10,20),C,[x,H+25,z]));const dm=new T.SphereGeometry(8.8,20,12,0,Math.PI*2,0,Math.PI/2);dm.scale(1,1.55,1);P.push(part(dm,C,[x,H+30,z]));
      P.push(part(new T.CylinderGeometry(1.4,1.6,5,10),C,[x,H+45.5,z]),part(new T.ConeGeometry(1.6,4,10),C,[x,H+50,z]));
      for(const[dx,dz]of[[-12,-14],[12,-14],[-12,14],[12,14]]){P.push(part(new T.CylinderGeometry(3.4,3.6,5,12),C,[x+dx,H+22.5,z+dz]));const d2=new T.SphereGeometry(3.6,12,8,0,Math.PI*2,0,Math.PI/2);d2.scale(1,1.5,1);P.push(part(d2,C,[x+dx,H+25,z+dz]))}
      P.push(box(9,32,9,C,x,H,z-26),part(new T.SphereGeometry(4.6,12,8,0,Math.PI*2,0,Math.PI/2),C,[x,H+32,z-26]));
      for(let k=0;k<6;k++){const zz=z+34+k*9,hh=hillH(x,zz);P.push(box(26-k,1.2,7,0xe8e1d2,x,hh-.4,zz))}}
    /* ---- Tour Montparnasse (silhouette lointaine) ---- */
    P.push(box(26,78,16,0x3c4250,-170,0,520));
    add(merge(P),stoneMat);
    await ctx.step(.6);

    /* ---- Tour Eiffel ---- */
    const sparkle=[];
    {const[x,z]=EIFFEL,E=[],C=0x7d5a44,C2=0x8e6a52;const PR=[[0,31],[24,17.5],[50,9.5],[80,5],[112,2.2]];
      const Wd=y=>{for(let i=0;i<PR.length-1;i++){const a=PR[i],b=PR[i+1];if(y<=b[0]){const t=(y-a[0])/(b[0]-a[0]);return a[1]+(b[1]-a[1])*t}}return PR[PR.length-1][1]};
      const cn=(y,sx,sz)=>[x+sx*Wd(y),y,z+sz*Wd(y)];const SG=[[1,1],[1,-1],[-1,-1],[-1,1]];
      for(const[sx,sz]of SG){E.push(beam(cn(0,sx,sz),cn(24,sx,sz),4.6,3.4,C));E.push(beam([x+sx*25,0,z+sz*25],cn(24,sx,sz).map((v,i)=>i===1?v:v-(i===0?sx:sz)*3),2.2,1.8,C2))}
      const levels=[0,24,32,41,50,58,66,74,82,90,98,106,112];
      for(let i=1;i<levels.length-1;i++){const y0=levels[i],y1=levels[i+1],r=y0<50?.55:.4;
        for(let f=0;f<4;f++){const[a1,b1]=SG[f],[a2,b2]=SG[(f+1)%4];E.push(beam(cn(y0,a1,b1),cn(y1,a1,b1),r*2.4,r*2.2,C));
          E.push(beam(cn(y0,a1,b1),cn(y1,a2,b2),r,r,C2),beam(cn(y0,a2,b2),cn(y1,a1,b1),r,r,C2),beam(cn(y0,a1,b1),cn(y0,a2,b2),r,r,C))}}
      for(const sz of[-1,1]){E.push(part(new T.TorusGeometry(22,1.3,6,24,Math.PI),C2,[x,0,z+sz*22]));E.push(part(new T.TorusGeometry(22,1.3,6,24,Math.PI),C2,[x+sz*22,0,z],[0,Math.PI/2,0]))}
      E.push(box(40,3,40,C,x,24,z),box(42,1.2,42,0x6a4a38,x,27,z),box(22,2.2,22,C,x,50,z),box(23,.8,23,0x6a4a38,x,52.2,z),box(6,6,6,C2,x,110,z),part(new T.CylinderGeometry(.5,.9,12,6),C,[x,122,z]));
      add(merge(E),stoneMat);
      for(let i=0;i<60;i++){const y=4+rnd()*108,a=rnd()*6.28,w=Wd(y)+.6;sparkle.push([x+Math.cos(a)*w,y,z+Math.sin(a)*w,2.2+rnd()*1.6,0xfff1b0,.0])}
      sparkle.push([x,128,z,9,0xffe08a,.9])}
    await ctx.step(.72);

    /* ---- arbres ---- */
    const trees=[];
    {const ux=Math.cos(champsDir),uz=Math.sin(champsDir),len=Math.hypot(ARC[0]-OBEL[0],ARC[1]-OBEL[1]);
      for(let d=30;d<len-60;d+=11)for(const o of[-21,21])trees.push([OBEL[0]+ux*d-uz*o,OBEL[1]+uz*d+ux*o,3.2]);
      for(let i=0;i<8;i++)for(let j=0;j<5;j++)trees.push([-165+i*15+(j%2)*5,-52+j*13,2.8+rnd()*.6]);
      for(let i=0;i<9;i++)for(const o of[-30,30]){const t=i/8;const cx=-430+(-320+430)*t*1.1+20,cz=290+(420-260)*t*.95;trees.push([cx+o*.85,cz-o*.55,3])}
      for(let i=0;i<SEINE.length-1;i++){const a=SEINE[i],b=SEINE[i+1];const dx=b[0]-a[0],dz=b[1]-a[1],l=Math.hypot(dx,dz),nx=-dz/l,nz=dx/l;for(let d=0;d<l;d+=16)for(const sd of[-1,1]){const w=(a[2]/2+10)*sd;const tx=a[0]+dx*d/l+nx*w,tz=a[1]+dz*d/l+nz*w;if(Math.hypot(tx-ND[0],tz-ND[1])<60)continue;trees.push([tx,tz,2.6])}}}
    {const tg=merge([part(new T.CylinderGeometry(.12,.18,1.2,5),0x6b4a2f,[0,.6,0]),part(new T.IcosahedronGeometry(.95,1),0x5aa448,[0,1.9,0],0,[1,.9,1]),part(new T.IcosahedronGeometry(.6,1),0x6dbb52,[.4,2.3,.2])]);
      const im=new T.InstancedMesh(tg,new T.MeshLambertMaterial({vertexColors:true,flatShading:true}),trees.length);const c=new T.Color();
      trees.forEach((t,i)=>{ctx.dummy.position.set(t[0],0,t[1]);ctx.dummy.rotation.set(0,rnd()*6,0);ctx.dummy.scale.setScalar(t[2]);ctx.dummy.updateMatrix();im.setMatrixAt(i,ctx.dummy.matrix);im.setColorAt(i,c.setRGB(1,1,1).multiplyScalar(.8+rnd()*.35))});W.add(im)}

    /* ---- immeubles haussmanniens (instanciés) ---- */
    const segD=(px,pz,a,b)=>{const dx=b[0]-a[0],dz=b[1]-a[1],l2=dx*dx+dz*dz;let t=((px-a[0])*dx+(pz-a[1])*dz)/l2;t=Math.max(0,Math.min(1,t));return Math.hypot(px-a[0]-dx*t,pz-a[1]-dz*t)};
    const riverD=(x,z)=>{let m=1e9;for(let i=0;i<SEINE.length-1;i++)m=Math.min(m,segD(x,z,SEINE[i],SEINE[i+1])-SEINE[i][2]/2);return m};
    const blocked=(x,z,r)=>{if(riverD(x,z)<12+r)return true;
      if(segD(x,z,ARC,OBEL)<30+r)return true;if(Math.hypot(x-ARC[0],z-ARC[1])<62+r)return true;if(Math.hypot(x-EIFFEL[0],z-EIFFEL[1])<55+r)return true;
      if(segD(x,z,EIFFEL,[-310,435])<45+r)return true;if(Math.hypot(x-OBEL[0],z-OBEL[1])<48+r)return true;
      if(x>-175-r&&x<170+r&&z>-95-r&&z<30+r)return true;if(Math.hypot(x-ND[0],z-ND[1])<40+r&&riverD(x,z)<30)return true;
      if(Math.hypot(x-SC[0],z-SC[1])<52+r)return true;if(Math.hypot(x+170,z-520)<30)return true;return false};
    const B=[];
    for(let gx=-1000;gx<=900;gx+=44)for(let gz=-820;gz<=700;gz+=44){if(Math.hypot(gx*.8,gz)>900)continue;
      const w=30+rnd()*10,d=30+rnd()*10,x=gx+(rnd()-.5)*4,z=gz+(rnd()-.5)*4,r=Math.max(w,d)*.55;if(blocked(x,z,r))continue;
      const base=hillH(x,z),h=11+rnd()*6;if(ctx.distToTrack2D(x,z,base+h+20)<r+20)continue;B.push([x,base,z,w,h,d])}
    {const fc=document.createElement('canvas');fc.width=128;fc.height=128;const g=fc.getContext('2d');g.fillStyle='#efe4cc';g.fillRect(0,0,128,128);
      for(let r=0;r<5;r++)for(let c=0;c<6;c++){g.fillStyle=r===0?'#7d6a55':'#5f6f86';g.fillRect(6+c*20,8+r*24,10,14);if(r===1||r===4){g.fillStyle='#3d3a3a';g.fillRect(4+c*20,22+r*24,14,2)}}
      g.fillStyle='#d9ccb0';g.fillRect(0,0,128,4);
      const ft=new T.CanvasTexture(fc);ft.colorSpace=T.SRGBColorSpace;ft.anisotropy=2;
      const fm=new T.MeshLambertMaterial({map:ft}),tm=new T.MeshLambertMaterial({color:0x8a8172});
      const bm=new T.InstancedMesh(new T.BoxGeometry(1,1,1).translate(0,.5,0),[fm,fm,tm,tm,fm,fm],B.length);
      const rg=new T.CylinderGeometry(.42,.72,1,4,1);rg.rotateY(Math.PI/4);rg.translate(0,.5,0);const rm=new T.InstancedMesh(rg,new T.MeshLambertMaterial({color:0x5d6878}),B.length);
      const c=new T.Color(),dm=ctx.dummy;
      B.forEach((b,i)=>{dm.rotation.set(0,0,0);dm.position.set(b[0],b[1],b[2]);dm.scale.set(b[3],b[4],b[5]);dm.updateMatrix();bm.setMatrixAt(i,dm.matrix);bm.setColorAt(i,c.setHSL(.1,.25+rnd()*.15,.82+rnd()*.12));
        dm.position.set(b[0],b[1]+b[4],b[2]);dm.scale.set(b[3],4+rnd()*2,b[5]);dm.updateMatrix();rm.setMatrixAt(i,dm.matrix)});
      W.add(bm,rm)}
    await ctx.step(.86);

    /* ---- ponts ---- */
    {const BR=[];for(const i of[1,3,5,6,8,10,12]){const a=SEINE[i],b=SEINE[i+1];const mx=(a[0]+b[0])/2,mz=(a[1]+b[1])/2,ang=Math.atan2(b[1]-a[1],b[0]-a[0]);const len=Math.max(a[2],b[2])+16;
        const g=merge([box(len,1.6,9,0xd7cbb1,0,3.4,0),box(len,1.2,.6,0xbfb299,0,5,4.2),box(len,1.2,.6,0xbfb299,0,5,-4.2),box(3,3.4,8,0xc8bba1,-len/6,0,0),box(3,3.4,8,0xc8bba1,len/6,0,0)]);
        g.rotateY(-ang+Math.PI/2);g.translate(mx,0,mz);BR.push(g)}add(merge(BR),lam)}
    /* ---- bateaux-mouches ---- */
    {const bg=merge([box(14,1.6,4.4,0xf4f4f0,0,0,0),box(9,1.6,3.6,0x6fa6c9,-.5,1.6,0),box(9.4,.3,3.9,0xffffff,-.5,3.2,0)]);const n=4;const mesh=new T.InstancedMesh(bg,lam,n);mesh.frustumCulled=false;W.add(mesh);
      def._boats={mesh,d:new T.Object3D(),list:Array.from({length:n},(_,i)=>({u:.12+i*.21,v:i%2?1:-1,off:i%2?7:-7}))}}
    /* ---- nuages et lueurs ---- */
    {const puffs=[];for(let i=0;i<70;i++){const a=rnd()*6.28,d=200+rnd()*800;const n=3+Math.floor(rnd()*3),cx=Math.cos(a)*d,cz=Math.sin(a)*d,cy=150+rnd()*90;for(let k=0;k<n;k++)puffs.push([cx+(rnd()-.5)*40,cy+(rnd()-.5)*8,cz+(rnd()-.5)*40,30+rnd()*25])}
      const cl=ctx.makeBB(puffs.length,ctx.BBcloud,{map:ctx.cloudTex,order:1});puffs.forEach((p,i)=>{cl.A.pos.set([p[0],p[1],p[2]],i*3);cl.A.size[i]=p[3];cl.A.col.set([1,1,1],i*3);cl.A.alpha[i]=.9});cl.dirty();W.add(cl)}
    const lamp=[];for(let i=0;i<SEINE.length-1;i++){const a=SEINE[i],b=SEINE[i+1];lamp.push([(a[0]+b[0])/2,6,(a[1]+b[1])/2,5,0xffd890,.5])}
    const gm=ctx.trackGlows(W,[...lamp,...sparkle]);gm.k0=gm.A.alpha.length-sparkle.length;def._spark=gm;
    await ctx.step(.98)}
};
function riverAt(u){const n=SEINE.length-1,f=Math.max(0,Math.min(.9999,u))*n,i=Math.floor(f),t=f-i,a=SEINE[i],b=SEINE[i+1];return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,0,Math.atan2(b[1]-a[1],b[0]-a[0])]}
export default def;
