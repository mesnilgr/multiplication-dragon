/* Course des Dragons — boîte à outils partagée pour les circuits chargés à la demande */
export function makeKit(ctx,seed0=1){const T=ctx.THREE,V=T.Vector3,{part,merge}=ctx;let seed=seed0;
  const rnd=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
  const W=ctx.W;const add=o=>{W.add(o);return o};
  const stone=new T.MeshStandardMaterial({vertexColors:true,roughness:.82,metalness:.03});
  const lam=new T.MeshLambertMaterial({vertexColors:true});
  const box=(w,h,d,col,x=0,y=0,z=0,ry=0)=>part(new T.BoxGeometry(w,h,d),col,[x,y+h/2,z],[0,ry,0]);
  const cyl=(rt,rb,h,seg,col,x=0,y=0,z=0)=>part(new T.CylinderGeometry(rt,rb,h,seg),col,[x,y+h/2,z]);
  const dome=(r,sy,col,x,y,z,seg=20)=>{const g=new T.SphereGeometry(r,seg,Math.ceil(seg/2),0,Math.PI*2,0,Math.PI/2);g.scale(1,sy,1);return part(g,col,[x,y,z])};
  const prismGeo=(len,w,h)=>{const g=new T.BufferGeometry();const l=len/2,q=w/2;const v=[[-l,0,-q],[l,0,-q],[l,h,0],[-l,h,0],[-l,0,q],[l,0,q]];const tri=[0,3,1,1,3,2,4,5,3,5,2,3,0,4,3,1,2,5];const P=[];tri.forEach(i=>P.push(...v[i]));g.setAttribute('position',new T.Float32BufferAttribute(P,3));g.computeVertexNormals();return g};
  const prism=(len,w,h,col,x=0,y=0,z=0,ry=0)=>part(prismGeo(len,w,h),col,[x,y,z],[0,ry,0]);
  const beam=(a,b,r0,r1,col,seg=4)=>{const d=new V(b[0]-a[0],b[1]-a[1],b[2]-a[2]),len=d.length();const g=new T.CylinderGeometry(r1,r0,len,seg,1);if(seg===4)g.rotateY(Math.PI/4);g.translate(0,len/2,0);g.applyQuaternion(new T.Quaternion().setFromUnitVectors(new V(0,1,0),d.normalize()));g.translate(a[0],a[1],a[2]);return part(g,col)};
  const colonnade=(P,n,r,h,col,cx,cy,cz,R,a0=0,a1=Math.PI*2)=>{for(let i=0;i<n;i++){const a=a0+(a1-a0)*(i+.5)/n;P.push(cyl(r,r*1.1,h,8,col,cx+Math.cos(a)*R,cy,cz+Math.sin(a)*R))}};
  const row=(P,n,r,h,col,x0,z0,x1,z1,y=0)=>{for(let i=0;i<n;i++){const t=n===1?.5:i/(n-1);P.push(cyl(r,r*1.1,h,8,col,x0+(x1-x0)*t,y,z0+(z1-z0)*t))}};
  const addMerged=(P,mat=stone)=>add(new T.Mesh(merge(P),mat));
  const ground=(color,size=4000,y=0)=>add(new T.Mesh(new T.PlaneGeometry(size,size).rotateX(-Math.PI/2).translate(0,y,0),new T.MeshLambertMaterial({color})));
  const flat=(cx,cz,w,d,color,y=.12,ry=0)=>{const m=new T.Mesh(new T.PlaneGeometry(w,d).rotateX(-Math.PI/2),new T.MeshLambertMaterial({color}));m.position.set(cx,y,cz);m.rotation.y=ry;return add(m)};
  const disk=(cx,cz,r,color,y=.14)=>{const m=new T.Mesh(new T.CircleGeometry(r,40).rotateX(-Math.PI/2),color==='water'?ctx.oceanMat:new T.MeshLambertMaterial({color}));m.position.set(cx,y,cz);return add(m)};
  const strip=(pts,y,mat,extra=0)=>{const side=[];for(let i=0;i<pts.length;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(pts.length-1,i+1)],p=pts[i];const dx=b[0]-a[0],dz=b[1]-a[1],l=Math.hypot(dx,dz)||1,nx=-dz/l,nz=dx/l,w=p[2]/2+extra;side.push([p[0]+nx*w,p[1]+nz*w,p[0]-nx*w,p[1]-nz*w])}
    const P=[];for(let i=0;i<side.length-1;i++){const a=side[i],b=side[i+1];P.push(a[0],y,a[1],b[0],y,b[1],a[2],y,a[3],a[2],y,a[3],b[0],y,b[1],b[2],y,b[3])}
    const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(P,3));g.computeVertexNormals();const m=new T.Mesh(g,mat);return add(m)};
  const water=(pts,y=.35)=>{const qm=new T.MeshLambertMaterial({color:0xb7ab92,side:T.DoubleSide});strip(pts,y-.15,qm,5);ctx.oceanMat.side=T.DoubleSide;return strip(pts,y,ctx.oceanMat)};
  const segD=(px,pz,a,b)=>{const dx=b[0]-a[0],dz=b[1]-a[1],l2=dx*dx+dz*dz||1;let t=((px-a[0])*dx+(pz-a[1])*dz)/l2;t=Math.max(0,Math.min(1,t));return Math.hypot(px-a[0]-dx*t,pz-a[1]-dz*t)};
  const polyD=(x,z,pts)=>{let m=1e9;for(let i=0;i<pts.length-1;i++)m=Math.min(m,segD(x,z,pts[i],pts[i+1])-(pts[i][2]||0)/2);return m};
  /* arbres instanciés : list = [x, z, échelle, y?] ; palette de feuillage */
  const trees=(list,pal=[0x5aa448,0x6dbb52],trunk=0x6b4a2f)=>{if(!list.length)return;const tg=merge([part(new T.CylinderGeometry(.12,.18,1.2,5),trunk,[0,.6,0]),part(new T.IcosahedronGeometry(.95,1),0xffffff,[0,1.9,0],0,[1,.9,1]),part(new T.IcosahedronGeometry(.6,1),0xf2f2f2,[.4,2.3,.2])]);
    const im=new T.InstancedMesh(tg,new T.MeshLambertMaterial({vertexColors:true,flatShading:true}),list.length);const c=new T.Color(),dm=ctx.dummy;
    list.forEach((t,i)=>{dm.position.set(t[0],t[3]||0,t[1]);dm.rotation.set(0,rnd()*6,0);dm.scale.setScalar(t[2]);dm.updateMatrix();im.setMatrixAt(i,dm.matrix);im.setColorAt(i,c.setHex(pal[Math.floor(rnd()*pal.length)]).multiplyScalar(.85+rnd()*.25))});return add(im)};
  /* façades : texture blanche teintée par la couleur de chaque instance */
  const facadeTex=type=>{const fc=document.createElement('canvas');fc.width=128;fc.height=128;const g=fc.getContext('2d');g.fillStyle='#ffffff';g.fillRect(0,0,128,128);
    if(type==='office'){for(let r=0;r<10;r++){g.fillStyle='#55677e';g.fillRect(0,6+r*12,128,7)}}
    else if(type==='house'){for(let r=0;r<2;r++)for(let c=0;c<3;c++){g.fillStyle='#fffdf5';g.fillRect(10+c*40,14+r*56,28,40);g.fillStyle='#4f6680';g.fillRect(14+c*40,18+r*56,20,32)}g.fillStyle='#fffdf5';g.fillRect(0,0,128,6);g.fillRect(0,62,128,5)}
    else if(type==='brick'){g.fillStyle='#ffffff';for(let r=0;r<3;r++)for(let c=0;c<3;c++){g.fillStyle='#f4efe6';g.fillRect(12+c*40,10+r*40,24,30);g.fillStyle='#3f4b5c';g.fillRect(15+c*40,13+r*40,18,24)}}
    else{for(let r=0;r<5;r++)for(let c=0;c<6;c++){g.fillStyle='#6a7488';g.fillRect(6+c*20,8+r*24,10,14)}}
    const t=new T.CanvasTexture(fc);t.colorSpace=T.SRGBColorSpace;t.anisotropy=2;return t};
  /* immeubles : list = [x, y, z, w, h, d, couleur] ; roof = 'gable' | 'hip' | 'flat' */
  const blocks=(list,{type='plain',roof='hip',roofColor=0x5d6878,roofH=[3,5]}={})=>{if(!list.length)return;const ft=facadeTex(type);
    const fm=new T.MeshLambertMaterial({map:ft}),tm=new T.MeshLambertMaterial({color:0x8a8172});
    const bm=new T.InstancedMesh(new T.BoxGeometry(1,1,1).translate(0,.5,0),[fm,fm,tm,tm,fm,fm],list.length);const c=new T.Color(),dm=ctx.dummy;let rm=null;
    if(roof!=='flat'){let rg;if(roof==='gable')rg=prismGeo(1,1,1);else{rg=new T.CylinderGeometry(.42,.72,1,4,1);rg.rotateY(Math.PI/4);rg.translate(0,.5,0)}rm=new T.InstancedMesh(rg,new T.MeshLambertMaterial({color:roofColor}),list.length)}
    list.forEach((b,i)=>{const ry=b[7]||0;dm.rotation.set(0,ry,0);dm.position.set(b[0],b[1],b[2]);dm.scale.set(b[3],b[4],b[5]);dm.updateMatrix();bm.setMatrixAt(i,dm.matrix);bm.setColorAt(i,c.setHex(b[6]));
      if(rm){dm.position.set(b[0],b[1]+b[4],b[2]);dm.scale.set(b[3]*(roof==='gable'?1.04:1),roofH[0]+rnd()*(roofH[1]-roofH[0]),b[5]*(roof==='gable'?1.06:1));dm.updateMatrix();rm.setMatrixAt(i,dm.matrix)}});
    add(bm);if(rm)add(rm)};
  /* placement en grille en évitant le circuit et les zones interdites */
  const grid=({x0,x1,z0,z1,step=44,w=[28,38],d=[28,38],h=[10,16],blocked=()=>false,baseY=()=>0,colors=[0xefe4cc],clear=20,keep=()=>true})=>{const out=[];
    for(let gx=x0;gx<=x1;gx+=step)for(let gz=z0;gz<=z1;gz+=step){const ww=w[0]+rnd()*(w[1]-w[0]),dd=d[0]+rnd()*(d[1]-d[0]),x=gx+(rnd()-.5)*4,z=gz+(rnd()-.5)*4,r=Math.max(ww,dd)*.55;if(!keep(x,z)||blocked(x,z,r))continue;
      const by=baseY(x,z),hh=h[0]+rnd()*(h[1]-h[0]);if(ctx.distToTrack2D(x,z,by+hh+clear)<r+clear)continue;out.push([x,by,z,ww,hh,dd,colors[Math.floor(rnd()*colors.length)]])}return out};
  const clouds=(list,alpha=.9)=>{const cl=ctx.makeBB(list.length,ctx.BBcloud,{map:ctx.cloudTex,order:1});list.forEach((p,i)=>{cl.A.pos.set([p[0],p[1],p[2]],i*3);cl.A.size[i]=p[3];cl.A.col.set([p[4]||1,p[4]||1,p[4]||1],i*3);cl.A.alpha[i]=p[5]??alpha});cl.dirty();return add(cl)};
  const puffRing=(n,rMin,rMax,yMin,yMax,cx=0,cz=0,size=[30,55])=>{const P=[];for(let i=0;i<n;i++){const a=rnd()*6.28,d=rMin+rnd()*(rMax-rMin),k=3+Math.floor(rnd()*3),x=cx+Math.cos(a)*d,z=cz+Math.sin(a)*d,y=yMin+rnd()*(yMax-yMin);for(let j=0;j<k;j++)P.push([x+(rnd()-.5)*40,y+(rnd()-.5)*8,z+(rnd()-.5)*40,size[0]+rnd()*(size[1]-size[0])])}return P};
  /* terrain en relief (vertex colors) */
  const terrain=(size,seg,hf,colf,cx=0,cz=0)=>{const g=new T.PlaneGeometry(size,size,seg,seg).rotateX(-Math.PI/2);const pa=g.attributes.position,col=[],c=new T.Color();
    for(let i=0;i<pa.count;i++){const x=pa.getX(i)+cx,z=pa.getZ(i)+cz,h=hf(x,z);pa.setY(i,h);colf(c,h,x,z);col.push(c.r,c.g,c.b)}g.translate(cx,0,cz);g.setAttribute('color',new T.Float32BufferAttribute(col,3));g.computeVertexNormals();return add(new T.Mesh(g,lam))};
  return{T,V,rnd,add,stone,lam,box,cyl,dome,prism,prismGeo,beam,colonnade,row,addMerged,ground,flat,disk,strip,water,segD,polyD,trees,blocks,grid,clouds,puffRing,terrain,part,merge}}
