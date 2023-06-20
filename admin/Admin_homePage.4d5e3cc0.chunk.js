"use strict";(self.webpackChunkyuewu_dev=self.webpackChunkyuewu_dev||[]).push([[3981],{91550:(I,y,n)=>{n.r(y),n.d(y,{default:()=>He});var e=n(53547),T=n(94998),s=n(54863),W=n(64593),j=n(16550),l=n(22551),d=n(41580),D=n(17034),O=n(185),b=n(11276),v=n(67819);const w=n.p+"7e9af4fb7e723fcebf1f.svg";var A=n(39645);const F=t=>Object.entries(t).every(([,a])=>Object.entries(a).every(([,o])=>o));var E=n(22072),c=n(11047),g=n(75515),P=n(29728),Z=n(37323),z=n(45697),i=n.n(z),N=n(96392),V=n(89285),u=n(99872);const S=({type:t,title:a,number:o,content:r,hasLine:m})=>{const{formatMessage:p}=(0,E.Z)();return e.createElement(d.x,null,e.createElement(c.k,null,e.createElement(d.x,{minWidth:(0,l.pxToRem)(30),marginRight:5},e.createElement(N.Z,{type:t,number:o})),e.createElement(g.Z,{variant:"delta",as:"h3"},p(a))),e.createElement(c.k,{alignItems:"flex-start"},e.createElement(c.k,{justifyContent:"center",minWidth:(0,l.pxToRem)(30),marginBottom:3,marginTop:3,marginRight:5},m&&e.createElement(V.Z,{type:t,minHeight:t===u.lW?(0,l.pxToRem)(85):(0,l.pxToRem)(65)})),e.createElement(d.x,{marginTop:2},t===u.lW&&r)))};S.defaultProps={content:void 0,number:void 0,type:u.VM,hasLine:!0},S.propTypes={content:i().node,number:i().number,title:i().shape({id:i().string,defaultMessage:i().string}).isRequired,type:i().oneOf([u.lW,u.hx,u.VM]),hasLine:i().bool};const $=S,K=(t,a)=>t===-1||a<t?u.hx:a>t?u.VM:u.lW,L=({sections:t,currentSectionKey:a})=>{const o=t.findIndex(r=>r.key===a);return e.createElement(d.x,null,t.map((r,m)=>e.createElement($,{key:r.key,title:r.title,content:r.content,number:m+1,type:K(o,m),hasLine:m!==t.length-1})))};L.defaultProps={currentSectionKey:void 0},L.propTypes={sections:i().arrayOf(i().shape({key:i().string.isRequired,title:i().shape({id:i().string,defaultMessage:i().string}).isRequired,content:i().node})).isRequired,currentSectionKey:i().string};const U=L;var J=n(64729);const Q=()=>{const{guidedTourState:t,setSkipped:a}=(0,l.useGuidedTour)(),{formatMessage:o}=(0,E.Z)(),{trackUsage:r}=(0,l.useTracking)(),m=Object.entries(J.Z).map(([f,h])=>({key:f,title:h.home.title,content:e.createElement(l.LinkButton,{onClick:()=>r(h.home.trackingEvent),to:h.home.cta.target,endIcon:e.createElement(Z.Z,null)},o(h.home.cta.title))})),x=m.map(f=>({isDone:Object.entries(t[f.key]).every(([,h])=>h),...f})).find(f=>!f.isDone)?.key,H=()=>{a(!0),r("didSkipGuidedtour")};return e.createElement(d.x,{hasRadius:!0,shadow:"tableShadow",paddingTop:7,paddingRight:4,paddingLeft:7,paddingBottom:4,background:"neutral0"},e.createElement(c.k,{direction:"column",alignItems:"stretch",gap:6},e.createElement(g.Z,{variant:"beta",as:"h2"},o({id:"app.components.GuidedTour.title",defaultMessage:"3 steps to get started"})),e.createElement(U,{sections:m,currentSectionKey:x})),e.createElement(c.k,{justifyContent:"flex-end"},e.createElement(P.z,{variant:"tertiary",onClick:H},o({id:"app.components.GuidedTour.skip",defaultMessage:"Skip the tour"}))))};var X=n(80994),R=n(36182),Y=n(76840),q=n(11039),_=n(16860),ee=n(11462),te=n(50515),ne=n(57750),oe=n(17772);const ae=(0,s.default)(Y.Z)`
  path {
    fill: #7289da !important;
  }
`,le=(0,s.default)(q.Z)`
  > path:first-child {
    fill: #ff4500;
  }
`,M=(0,s.default)(_.Z)`
  > path:first-child {
    fill: #4945ff;
  }
  > path:nth-child(2) {
    fill: #fff;
  }
  > path:nth-child(4) {
    fill: #9593ff;
  }
`,ie=(0,s.default)(ee.Z)`
  path {
    fill: #1da1f2 !important;
  }
`,re=(0,s.default)(te.Z)`
  > path:first-child {
    fill: #231f20;
  }
  > path:nth-child(2) {
    fill: #fff9ae;
  }
  > path:nth-child(3) {
    fill: #00aeef;
  }
  > path:nth-child(4) {
    fill: #00a94f;
  }
  > path:nth-child(5) {
    fill: #f15d22;
  }
  > path:nth-child(6) {
    fill: #e31b23;
  }
`,se=[{name:{id:"app.components.HomePage.community.links.github",defaultMessage:"Github"},link:"https://github.com/strapi/strapi/",icon:e.createElement(ne.Z,{fill:"#7289DA"}),alt:"github"},{name:{id:"app.components.HomePage.community.links.discord",defaultMessage:"Discord"},link:"https://discord.strapi.io/",icon:e.createElement(ae,null),alt:"discord"},{name:{id:"app.components.HomePage.community.links.reddit",defaultMessage:"Reddit"},link:"https://www.reddit.com/r/Strapi/",icon:e.createElement(le,null),alt:"reddit"},{name:{id:"app.components.HomePage.community.links.twitter",defaultMessage:"Twitter"},link:"https://twitter.com/strapijs",icon:e.createElement(ie,null),alt:"twitter"},{name:{id:"app.components.HomePage.community.links.forum",defaultMessage:"Forum"},link:"https://forum.strapi.io",icon:e.createElement(re,null),alt:"forum"},{name:{id:"app.components.HomePage.community.links.blog",defaultMessage:"Blog"},link:"https://strapi.io/blog?utm_source=referral&utm_medium=admin&utm_campaign=career%20page",icon:e.createElement(M,null),alt:"blog"},{name:{id:"app.components.HomePage.community.links.career",defaultMessage:"We are hiring!"},link:"https://strapi.io/careers?utm_source=referral&utm_medium=admin&utm_campaign=blog",icon:e.createElement(M,null),alt:"career"}],ce=(0,s.default)(X.Q)`
  display: flex;
  align-items: center;
  border: none;

  svg {
    width: ${({theme:t})=>t.spaces[6]};
    height: ${({theme:t})=>t.spaces[6]};
  }

  span {
    word-break: keep-all;
  }
`,de=(0,s.default)(b.r)`
  row-gap: ${({theme:t})=>t.spaces[2]};
  column-gap: ${({theme:t})=>t.spaces[4]};
`,me=()=>{const{formatMessage:t}=(0,E.Z)(),{communityEdition:a}=(0,l.useAppInfo)(),o=[...se,{icon:e.createElement(M,null),link:a?"https://discord.strapi.io":"https://support.strapi.io/support/home",name:{id:"Settings.application.get-help",defaultMessage:"Get help"}}];return e.createElement(d.x,{as:"aside","aria-labelledby":"join-the-community",background:"neutral0",hasRadius:!0,paddingRight:5,paddingLeft:5,paddingTop:6,paddingBottom:6,shadow:"tableShadow"},e.createElement(d.x,{paddingBottom:7},e.createElement(c.k,{direction:"column",alignItems:"stretch",gap:5},e.createElement(c.k,{direction:"column",alignItems:"stretch",gap:3},e.createElement(g.Z,{variant:"delta",as:"h2",id:"join-the-community"},t({id:"app.components.HomePage.community",defaultMessage:"Join the community"})),e.createElement(g.Z,{textColor:"neutral600"},t({id:"app.components.HomePage.community.content",defaultMessage:"Discuss with team members, contributors and developers on different channels"}))),e.createElement(R.r,{href:"https://feedback.strapi.io/",isExternal:!0,endIcon:e.createElement(oe.Z,null)},t({id:"app.components.HomePage.roadmap",defaultMessage:"See our road map"})))),e.createElement(de,null,o.map(({icon:r,link:m,name:p})=>e.createElement(v.P,{col:6,s:12,key:p.id},e.createElement(ce,{size:"L",startIcon:r,variant:"tertiary",href:m,isExternal:!0},t(p))))))},ue=(0,s.default)(g.Z)`
  word-break: break-word;
`,B=({hasCreatedContentType:t,onCreateCT:a})=>{const{formatMessage:o}=(0,E.Z)();return e.createElement("div",null,e.createElement(d.x,{paddingLeft:6,paddingBottom:10},e.createElement(c.k,{direction:"column",alignItems:"flex-start",gap:5},e.createElement(g.Z,{as:"h1",variant:"alpha"},o(t?{id:"app.components.HomePage.welcome.again",defaultMessage:"Welcome \u{1F44B}"}:{id:"app.components.HomePage.welcome",defaultMessage:"Welcome on board!"})),e.createElement(ue,{textColor:"neutral600",variant:"epsilon"},o(t?{id:"app.components.HomePage.welcomeBlock.content.again",defaultMessage:"We hope you are making progress on your project! Feel free to read the latest news about Strapi. We are giving our best to improve the product based on your feedback."}:{id:"app.components.HomePage.welcomeBlock.content",defaultMessage:"Congrats! You are logged as the first administrator. To discover the powerful features provided by Strapi, we recommend you to create your first Content type!"})),t?e.createElement(R.r,{isExternal:!0,href:"https://strapi.io/blog"},o({id:"app.components.HomePage.button.blog",defaultMessage:"See more on the blog"})):e.createElement(P.z,{size:"L",onClick:a,endIcon:e.createElement(Z.Z,null)},o({id:"app.components.HomePage.create",defaultMessage:"Create your first Content type"})))))};B.defaultProps={hasCreatedContentType:void 0,onCreateCT:void 0},B.propTypes={hasCreatedContentType:i().bool,onCreateCT:i().func};const pe=B;var ge=n(45349),fe=n(34023),he=n(18540),Ee=n(76863);const ke=n.p+"27d16aefee06412db90a.png",ye=n.p+"bb3108f7fd1e6179bde1.svg",ve=n.p+"bb4d0d527bdfb161bc5a.svg",Ce=s.default.a`
  text-decoration: none;
`,Te=(0,s.default)(d.x)`
  background-image: url(${({backgroundImage:t})=>t});
`,be=(0,s.default)(c.k)`
  background: rgba(255, 255, 255, 0.3);
`,Se=()=>{const{formatMessage:t}=(0,E.Z)(),{trackUsage:a}=(0,l.useTracking)();return e.createElement(Ce,{href:"https://cloud.strapi.io",target:"_blank",rel:"noopener noreferrer nofollow",onClick:()=>{a("didClickOnTryStrapiCloudSection")}},e.createElement(c.k,{shadow:"tableShadow",hasRadius:!0,padding:6,background:"neutral0",position:"relative",gap:6},e.createElement(Te,{backgroundImage:ke,hasRadius:!0,padding:3},e.createElement(be,{width:(0,l.pxToRem)(32),height:(0,l.pxToRem)(32),justifyContent:"center",hasRadius:!0,alignItems:"center"},e.createElement("img",{src:ye,alt:t({id:"app.components.BlockLink.cloud",defaultMessage:"Strapi Cloud"})}))),e.createElement(c.k,{gap:1,direction:"column",alignItems:"start"},e.createElement(c.k,null,e.createElement(g.Z,{fontWeight:"semiBold",variant:"pi"},t({id:"app.components.BlockLink.cloud",defaultMessage:"Strapi Cloud"}))),e.createElement(g.Z,{textColor:"neutral600"},t({id:"app.components.BlockLink.cloud.content",defaultMessage:"A fully composable, and collaborative platform to boost your team velocity."})),e.createElement(d.x,{src:ve,position:"absolute",top:0,right:0,as:"img"}))))},C=s.default.a`
  text-decoration: none;
`,Le=()=>{const{formatMessage:t}=(0,E.Z)(),{trackUsage:a}=(0,l.useTracking)(),o=r=>{a(r)};return e.createElement(c.k,{direction:"column",alignItems:"stretch",gap:5},e.createElement(Se,null),e.createElement(C,{href:"https://strapi.io/resource-center",target:"_blank",rel:"noopener noreferrer nofollow",onClick:()=>o("didClickonReadTheDocumentationSection")},e.createElement(l.ContentBox,{title:t({id:"global.documentation",defaultMessage:"Documentation"}),subtitle:t({id:"app.components.BlockLink.documentation.content",defaultMessage:"Discover the essential concepts, guides and instructions."}),icon:e.createElement(ge.Z,null),iconBackground:"primary100"})),e.createElement(C,{href:"https://strapi.io/starters",target:"_blank",rel:"noopener noreferrer nofollow",onClick:()=>o("didClickonCodeExampleSection")},e.createElement(l.ContentBox,{title:t({id:"app.components.BlockLink.code",defaultMessage:"Code example"}),subtitle:t({id:"app.components.BlockLink.code.content",defaultMessage:"Learn by using ready-made starters for your projects."}),icon:e.createElement(fe.Z,null),iconBackground:"warning100"})),e.createElement(C,{href:"https://strapi.io/blog/categories/tutorials",target:"_blank",rel:"noopener noreferrer nofollow",onClick:()=>o("didClickonTutorialSection")},e.createElement(l.ContentBox,{title:t({id:"app.components.BlockLink.tutorial",defaultMessage:"Tutorials"}),subtitle:t({id:"app.components.BlockLink.tutorial.content",defaultMessage:"Follow step-by-step instructions to use and customize Strapi."}),icon:e.createElement(he.Z,null),iconBackground:"secondary100"})),e.createElement(C,{href:"https://strapi.io/blog",target:"_blank",rel:"noopener noreferrer nofollow",onClick:()=>o("didClickonBlogSection")},e.createElement(l.ContentBox,{title:t({id:"app.components.BlockLink.blog",defaultMessage:"Blog"}),subtitle:t({id:"app.components.BlockLink.blog.content",defaultMessage:"Read the latest news about Strapi and the ecosystem."}),icon:e.createElement(Ee.Z,null),iconBackground:"alternative100"})))};var Me=function(){return window&&window.strapi&&window.strapi.isEE?n(94018).Z:n(67875).Z}(),Be=(0,s.default)(d.x).withConfig({displayName:"HomePage__LogoContainer",componentId:"sc-1md9zz4-0"})(["position:absolute;top:0;right:0;img{width:","rem;}"],150/16),xe=function(){var a=(0,A.G)(),o=a.collectionTypes,r=a.singleTypes,m=a.isLoading,p=(0,l.useGuidedTour)(),x=p.guidedTourState,H=p.isGuidedTourVisible,f=p.isSkipped;Me();var h=!F(x)&&H&&!f,Pe=(0,j.k6)(),Ze=Pe.push,Re=function(G){G.preventDefault(),Ze("/plugins/content-type-builder/content-types/create-content-type")},Ge=(0,e.useMemo)(function(){var k=function(Ie){return Ie.filter(function(We){return We.isDisplayed})};return k(o).length>1||k(r).length>0},[o,r]);return m?e.createElement(l.LoadingIndicatorPage,null):e.createElement(D.A,null,e.createElement(T.Z,{id:"HomePage.helmet.title",defaultMessage:"Homepage"},function(k){return e.createElement(W.q,{title:k[0]})}),e.createElement(O.o,null,e.createElement(Be,null,e.createElement("img",{alt:"","aria-hidden":!0,src:w})),e.createElement(d.x,{padding:10},e.createElement(b.r,null,e.createElement(v.P,{col:8,s:12},e.createElement(pe,{onCreateCT:Re,hasCreatedContentType:Ge}))),e.createElement(b.r,{gap:6},e.createElement(v.P,{col:8,s:12},h?e.createElement(Q,null):e.createElement(Le,null)),e.createElement(v.P,{col:4,s:12},e.createElement(me,null))))))};const He=(0,e.memo)(xe)},67875:(I,y,n)=>{n.d(y,{Z:()=>T});const T=()=>null}}]);
