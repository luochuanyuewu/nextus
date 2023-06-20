(self.webpackChunkyuewu_dev=self.webpackChunkyuewu_dev||[]).push([[2081],{44174:a=>{function i(n,t,e,s){for(var d=-1,r=n==null?0:n.length;++d<r;){var o=n[d];t(s,o,e(o),n)}return s}a.exports=i},47443:(a,i,n)=>{var t=n(42118);function e(s,d){var r=s==null?0:s.length;return!!r&&t(s,d,0)>-1}a.exports=e},1196:a=>{function i(n,t,e){for(var s=-1,d=n==null?0:n.length;++s<d;)if(e(t,n[s]))return!0;return!1}a.exports=i},48983:(a,i,n)=>{var t=n(40371),e=t("length");a.exports=e},81119:(a,i,n)=>{var t=n(89881);function e(s,d,r,o){return t(s,function(l,u,g){d(o,l,r(l),g)}),o}a.exports=e},41848:a=>{function i(n,t,e,s){for(var d=n.length,r=e+(s?1:-1);s?r--:++r<d;)if(t(n[r],r,n))return r;return-1}a.exports=i},42118:(a,i,n)=>{var t=n(41848),e=n(62722),s=n(42351);function d(r,o,l){return o===o?s(r,o,l):t(r,e,l)}a.exports=d},62722:a=>{function i(n){return n!==n}a.exports=i},45652:(a,i,n)=>{var t=n(88668),e=n(47443),s=n(1196),d=n(74757),r=n(23593),o=n(21814),l=200;function u(g,c,v){var M=-1,h=e,_=g.length,f=!0,E=[],x=E;if(v)f=!1,h=s;else if(_>=l){var j=c?null:r(g);if(j)return o(j);f=!1,h=d,x=new t}else x=c?[]:E;n:for(;++M<_;){var p=g[M],O=c?c(p):p;if(p=v||p!==0?p:0,f&&O===O){for(var P=x.length;P--;)if(x[P]===O)continue n;c&&x.push(O),E.push(p)}else h(x,O,v)||(x!==E&&x.push(O),E.push(p))}return E}a.exports=u},55189:(a,i,n)=>{var t=n(44174),e=n(81119),s=n(67206),d=n(1469);function r(o,l){return function(u,g){var c=d(u)?t:e,v=l?l():{};return c(u,o,s(g,2),v)}}a.exports=r},23593:(a,i,n)=>{var t=n(58525),e=n(50308),s=n(21814),d=1/0,r=t&&1/s(new t([,-0]))[1]==d?function(o){return new t(o)}:e;a.exports=r},42351:a=>{function i(n,t,e){for(var s=e-1,d=n.length;++s<d;)if(n[s]===t)return s;return-1}a.exports=i},88016:(a,i,n)=>{var t=n(48983),e=n(62689),s=n(21903);function d(r){return e(r)?s(r):t(r)}a.exports=d},21903:a=>{var i="\\ud800-\\udfff",n="\\u0300-\\u036f",t="\\ufe20-\\ufe2f",e="\\u20d0-\\u20ff",s=n+t+e,d="\\ufe0e\\ufe0f",r="["+i+"]",o="["+s+"]",l="\\ud83c[\\udffb-\\udfff]",u="(?:"+o+"|"+l+")",g="[^"+i+"]",c="(?:\\ud83c[\\udde6-\\uddff]){2}",v="[\\ud800-\\udbff][\\udc00-\\udfff]",M="\\u200d",h=u+"?",_="["+d+"]?",f="(?:"+M+"(?:"+[g,c,v].join("|")+")"+_+h+")*",E=_+h+f,x="(?:"+[g+o+"?",o,c,v,r].join("|")+")",j=RegExp(l+"(?="+l+")|"+x+E,"g");function p(O){for(var P=j.lastIndex=0;j.test(O);)++P;return P}a.exports=p},7739:(a,i,n)=>{var t=n(89465),e=n(55189),s=Object.prototype,d=s.hasOwnProperty,r=e(function(o,l,u){d.call(o,u)?o[u].push(l):t(o,u,[l])});a.exports=r},47037:(a,i,n)=>{var t=n(44239),e=n(1469),s=n(37005),d="[object String]";function r(o){return typeof o=="string"||!e(o)&&s(o)&&t(o)==d}a.exports=r},50308:a=>{function i(){}a.exports=i},84238:(a,i,n)=>{var t=n(280),e=n(64160),s=n(98612),d=n(47037),r=n(88016),o="[object Map]",l="[object Set]";function u(g){if(g==null)return 0;if(s(g))return d(g)?r(g):g.length;var c=e(g);return c==o||c==l?g.size:t(g).length}a.exports=u},7334:(a,i,n)=>{var t=n(79833);function e(s){return t(s).toLowerCase()}a.exports=e},44908:(a,i,n)=>{var t=n(45652);function e(s){return s&&s.length?t(s):[]}a.exports=e},53192:(a,i,n)=>{"use strict";n.d(i,{m:()=>o});var t=n(85893),e=n(54863),s=n(11276);const d=`${232/16}rem`,r=(0,e.default)(s.r)`
  width: ${d};
  background: ${({theme:l})=>l.colors.neutral100};
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid ${({theme:l})=>l.colors.neutral200};
  z-index: 1;
`,o=({ariaLabel:l,...u})=>(0,t.jsx)(r,{"aria-label":l,as:"nav",...u})},42876:(a,i,n)=>{"use strict";n.d(i,{p:()=>E});var t=n(85893),e=n(53547),s=n(97184),d=n(54863),r=n(7801),o=n(2504),l=n(96556),u=n(70004),g=n(41580),c=n(8509),v=n(49123),M=n(11047),h=n(75515),_=n(12028);const f=(0,d.default)(u.i)`
  width: ${24/16}rem;
  background-color: ${({theme:x})=>x.colors.neutral200};
`,E=({as:x="h2",label:j,searchLabel:p="",searchable:O=!1,onChange:P=()=>{},value:I="",onClear:C=()=>{},onSubmit:B=()=>{},id:y})=>{const[m,R]=(0,e.useState)(!1),L=(0,l.D)(m),b=(0,o.M)(y),T=(0,e.useRef)(void 0),A=(0,e.useRef)(void 0);(0,e.useEffect)(()=>{m&&T.current&&T.current.focus(),L&&!m&&A.current&&A.current.focus()},[m,L]);const S=()=>{R(D=>!D)},U=D=>{C(D),T.current.focus()},K=D=>{D.relatedTarget?.id!==b&&R(!1)},W=D=>{D.key===r.y.ESCAPE&&R(!1)};return m?(0,t.jsxs)(g.x,{paddingLeft:4,paddingTop:5,paddingBottom:2,paddingRight:4,children:[(0,t.jsx)(c.U,{children:(0,t.jsx)(v.w,{name:"searchbar",value:I,onChange:P,placeholder:"e.g: strapi-plugin-abcd",onKeyDown:W,ref:T,onBlur:K,onClear:U,onSubmit:B,clearLabel:"Clear",size:"S",children:p})}),(0,t.jsx)(g.x,{paddingLeft:2,paddingTop:4,children:(0,t.jsx)(f,{})})]}):(0,t.jsxs)(g.x,{paddingLeft:6,paddingTop:6,paddingBottom:2,paddingRight:4,children:[(0,t.jsxs)(M.k,{justifyContent:"space-between",alignItems:"flex-start",children:[(0,t.jsx)(h.Z,{variant:"beta",as:x,children:j}),O&&(0,t.jsx)(_.h,{ref:A,onClick:S,label:p,icon:(0,t.jsx)(s.Z,{})})]}),(0,t.jsx)(g.x,{paddingTop:4,children:(0,t.jsx)(f,{})})]})}},52305:(a,i,n)=>{"use strict";n.d(i,{E:()=>M});var t=n(85893),e=n(53547),s=n(71818),d=n(54863),r=n(41580),o=n(75515),l=n(11047),u=n(63507);const g=(0,d.default)(r.x)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: ${({theme:h})=>h.colors.neutral800};
  svg > * {
    fill: ${({theme:h})=>h.colors.neutral600};
  }

  &.active {
    ${({theme:h})=>`
      background-color: ${h.colors.primary100};
      border-right: 2px solid ${h.colors.primary600};
      svg > * {
        fill: ${h.colors.primary700};
      }
      ${o.Z} {
        color: ${h.colors.primary700};
        font-weight: 500;
      }
      `}
  }

  &:focus-visible {
    outline-offset: -2px;
  }
`,c=(0,d.default)(s.Z)`
  width: ${12/16}rem;
  height: ${4/16}rem;
  * {
    fill: ${({theme:h,$active:_})=>_?h.colors.primary600:h.colors.neutral600};
  }
`,v=d.default.div`
  svg {
    height: ${12/16}rem;
    width: ${12/16}rem;
  }
`,M=e.forwardRef(({children:h,icon:_=null,withBullet:f=!1,as:E=u.f,isSubSectionChild:x=!1,...j},p)=>(0,t.jsxs)(g,{as:E,icon:_,background:"neutral100",paddingLeft:x?9:7,paddingBottom:2,paddingTop:2,ref:p,...j,children:[(0,t.jsxs)(l.k,{children:[_?(0,t.jsx)(v,{children:_}):(0,t.jsx)(c,{}),(0,t.jsx)(r.x,{paddingLeft:2,children:(0,t.jsx)(o.Z,{as:"span",children:h})})]}),f&&(0,t.jsx)(r.x,{as:l.k,paddingRight:4,children:(0,t.jsx)(c,{$active:!0})})]}))},29489:(a,i,n)=>{"use strict";n.d(i,{D:()=>_});var t=n(85893),e=n(53547),s=n(54863),d=n(12645),r=n(11047),o=n(41580),l=n(75515);const u=(0,s.default)(r.k)`
  border: none;
  padding: 0;
  background: transparent;
`,g=s.default.div`
  display: flex;
  align-items: center;
  transform: rotateX(${({rotated:f})=>f?"0deg":"180deg"});
`,c=({collapsable:f=!1,label:E,onClick:x=()=>{},ariaExpanded:j,ariaControls:p})=>f?(0,t.jsxs)(u,{as:"button",onClick:x,"aria-expanded":j,"aria-controls":p,textAlign:"left",children:[(0,t.jsx)(o.x,{paddingRight:1,children:(0,t.jsx)(l.Z,{variant:"sigma",textColor:"neutral600",children:E})}),f&&(0,t.jsx)(g,{rotated:j,children:(0,t.jsx)(d.Z,{"aria-hidden":!0})})]}):(0,t.jsx)(u,{children:(0,t.jsx)(o.x,{paddingRight:1,children:(0,t.jsx)(l.Z,{variant:"sigma",textColor:"neutral600",children:E})})});var v=n(2504),M=n(30190);const h=(0,s.default)(o.x)`
  svg {
    height: ${4/16}rem;
    path {
      fill: ${({theme:f})=>f.colors.neutral500};
    }
  }
`,_=({collapsable:f=!1,label:E,badgeLabel:x,children:j,id:p})=>{const[O,P]=(0,e.useState)(!0),I=(0,v.M)(p);return(0,t.jsxs)(r.k,{direction:"column",alignItems:"stretch",gap:1,children:[(0,t.jsx)(h,{paddingLeft:6,paddingTop:2,paddingBottom:2,paddingRight:4,children:(0,t.jsxs)(o.x,{position:"relative",paddingRight:x?6:0,children:[(0,t.jsx)(c,{onClick:()=>{P(C=>!C)},ariaExpanded:O,ariaControls:I,collapsable:f,label:E}),x&&(0,t.jsx)(M.C,{backgroundColor:"neutral150",textColor:"neutral600",position:"absolute",right:0,top:"50%",transform:"translateY(-50%)",children:x})]})}),(!f||O)&&(0,t.jsx)("ol",{id:I,children:e.Children.map(j,(C,B)=>(0,t.jsx)("li",{children:C},B))})]})}},34446:(a,i,n)=>{"use strict";n.d(i,{Z:()=>r});var t=n(85893),e=n(53547),s=n(41580),d=n(11047);const r=({children:o,spacing:l=2,horizontal:u=!1,...g})=>(0,t.jsx)(s.x,{paddingTop:2,paddingBottom:4,children:(0,t.jsx)(d.k,{as:"ol",gap:l,direction:u?"row":"column",alignItems:u?"center":"stretch",...g,children:e.Children.map(o,(c,v)=>(0,t.jsx)("li",{children:c},v))})})}}]);
