"use strict";(self.webpackChunkyuewu_dev=self.webpackChunkyuewu_dev||[]).push([[5905],{57134:(it,_,a)=>{a.r(_),a.d(_,{default:()=>lt});var e=a(53547),c=a(22551),F=a(96315),Ce=a(85018),ee=a(4585),Te=a(67109),ve=a(53979),b=a(11047),w=a(29728),xe=a(49066),y=a(41580),Ze=a(27361),v=a.n(Ze),$e=a(18721),Me=a.n($e),Re=a(18446),te=a.n(Re),ke=a(11700),ne=a.n(ke),A=a(22072),O=a(16550),De=a(45697),n=a.n(De),oe=a(38939),ae=a(8060),le=a(79031),P=a(37909),h=a(75515),Le=a(49386),re=a(26478),B=a(13588),E=a(54863),f=a(5002),Ie=a(70968),Ae=a(52624),ie=a(44915);function V({isActive:t,icon:o}){return e.createElement(b.k,{alignItems:"center",background:t?"primary200":"neutral200",justifyContent:"center",height:8,width:8,borderRadius:"50%"},e.createElement(Ae.J,{as:ie.c[o]||ie.c.cube,height:5,width:5}))}V.defaultProps={isActive:!1,icon:"Cube"},V.propTypes={isActive:n().bool,icon:n().string};const se=(0,E.default)(y.x)`
  position: absolute;
  display: none;
  top: 5px;
  right: ${(0,c.pxToRem)(8)};

  svg {
    width: ${(0,c.pxToRem)(10)};
    height: ${(0,c.pxToRem)(10)};

    path {
      fill: ${({theme:t})=>t.colors.primary600};
    }
  }
`,Be=(0,E.default)(b.k)`
  width: ${(0,c.pxToRem)(140)};
  height: ${(0,c.pxToRem)(80)};
  position: relative;
  border: 1px solid ${({theme:t})=>t.colors.neutral200};
  background: ${({theme:t})=>t.colors.neutral100};
  border-radius: ${({theme:t})=>t.borderRadius};
  max-width: 100%;

  &.active,
  &:focus,
  &:hover {
    border: 1px solid ${({theme:t})=>t.colors.primary200};
    background: ${({theme:t})=>t.colors.primary100};

    ${se} {
      display: block;
    }

    ${h.Z} {
      color: ${({theme:t})=>t.colors.primary600};
    }

    /* > ComponentIcon */
    > div:first-child {
      background: ${({theme:t})=>t.colors.primary200};
      color: ${({theme:t})=>t.colors.primary600};

      svg {
        path {
          fill: ${({theme:t})=>t.colors.primary600};
        }
      }
    }
  }
`;function j({component:t,dzName:o,index:l,isActive:r,isInDevelopmentMode:d,onClick:s}){const{modifiedData:p,removeComponentFromDynamicZone:x}=(0,B.Z)(),{schema:{icon:T,displayName:C}}=v()(p,["components",t],{schema:{}}),u=i=>{i.stopPropagation(),x(o,l)};return e.createElement(Be,{alignItems:"center",direction:"column",className:r?"active":"",borderRadius:"borderRadius",justifyContent:"center",paddingLeft:4,paddingRight:4,shrink:0,onClick:s,role:"tab",tabIndex:r?0:-1,cursor:"pointer","aria-selected":r,"aria-controls":`dz-${o}-panel-${l}`,id:`dz-${o}-tab-${l}`},e.createElement(V,{icon:T,isActive:r}),e.createElement(y.x,{marginTop:1,maxWidth:"100%"},e.createElement(h.Z,{variant:"pi",fontWeight:"bold",ellipsis:!0},C)),d&&e.createElement(se,{as:"button",onClick:u},e.createElement(Ie.Z,null)))}j.defaultProps={component:null,isActive:!1,isInDevelopmentMode:!1,onClick(){}},j.propTypes={component:n().string,dzName:n().string.isRequired,index:n().number.isRequired,isActive:n().bool,isInDevelopmentMode:n().bool,onClick:n().func};const Fe=j,ce=E.default.tr`
  &.component-row,
  &.dynamiczone-row {
    position: relative;
    border-top: none !important;

    table tr:first-child {
      border-top: none;
    }

    > td:first-of-type {
      padding: 0 0 0 ${(0,c.pxToRem)(20)};
      position: relative;

      &::before {
        content: '';
        width: ${(0,c.pxToRem)(4)};
        height: calc(100% - 40px);
        position: absolute;
        top: -7px;
        left: 1.625rem;
        border-radius: 4px;

        ${({isFromDynamicZone:t,isChildOfDynamicZone:o,theme:l})=>o?`background-color: ${l.colors.primary200};`:t?`background-color: ${l.colors.primary200};`:`background: ${l.colors.neutral150};`}
      }
    }
  }

  &.dynamiczone-row > td:first-of-type {
    padding: 0;
  }
`;function K({customRowComponent:t,component:o,isFromDynamicZone:l,isNestedInDZComponent:r,firstLoopComponentUid:d}){const{modifiedData:s}=(0,B.Z)(),{schema:{attributes:p}}=v()(s,["components",o],{schema:{attributes:[]}});return e.createElement(ce,{isChildOfDynamicZone:l,className:"component-row"},e.createElement("td",{colSpan:12},e.createElement(pe,{customRowComponent:t,items:p,targetUid:o,firstLoopComponentUid:d||o,editTarget:"components",isFromDynamicZone:l,isNestedInDZComponent:r,isSub:!0,secondLoopComponentUid:d?o:null})))}K.defaultProps={component:null,customRowComponent:null,firstLoopComponentUid:null,isFromDynamicZone:!1,isNestedInDZComponent:!1},K.propTypes={component:n().string,customRowComponent:n().func,firstLoopComponentUid:n().string,isFromDynamicZone:n().bool,isNestedInDZComponent:n().bool};const de=K,we=(0,E.default)(F.Z)`
  width: ${(0,c.pxToRem)(32)};
  height: ${(0,c.pxToRem)(32)};
  padding: ${(0,c.pxToRem)(9)};
  border-radius: ${(0,c.pxToRem)(64)};
  background: ${({theme:t})=>t.colors.primary100};
  path {
    fill: ${({theme:t})=>t.colors.primary600};
  }
`,Se=(0,E.default)(y.x)`
  height: ${(0,c.pxToRem)(90)};
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`,Ne=(0,E.default)(b.k)`
  width: 100%;
  overflow-x: auto;
`,Pe=(0,E.default)(y.x)`
  padding-top: ${(0,c.pxToRem)(90)};
`,Ue=(0,E.default)(b.k)`
  flex-shrink: 0;
  width: ${(0,c.pxToRem)(140)};
  height: ${(0,c.pxToRem)(80)};
  justify-content: center;
  align-items: center;
`;function H({customRowComponent:t,components:o,addComponent:l,name:r,targetUid:d}){const{isInDevelopmentMode:s}=(0,B.Z)(),[p,x]=(0,e.useState)(0),{formatMessage:T}=(0,A.Z)(),C=i=>{p!==i&&x(i)},u=()=>{l(r)};return e.createElement(ce,{className:"dynamiczone-row",isFromDynamicZone:!0},e.createElement("td",{colSpan:12},e.createElement(Se,{paddingLeft:8},e.createElement(Ne,{gap:2},s&&e.createElement("button",{type:"button",onClick:u},e.createElement(Ue,{direction:"column",alignItems:"stretch",gap:1},e.createElement(we,null),e.createElement(h.Z,{variant:"pi",fontWeight:"bold",textColor:"primary600"},T({id:(0,f.Z)("button.component.add"),formatMessage:"Add a component"})))),e.createElement(b.k,{role:"tablist",gap:2},o.map((i,m)=>e.createElement(Fe,{key:i,dzName:r,index:m,component:i,isActive:p===m,isInDevelopmentMode:s,onClick:()=>C(m)}))))),e.createElement(Pe,null,o.map((i,m)=>{const g={customRowComponent:t,component:i};return e.createElement(y.x,{id:`dz-${r}-panel-${m}`,role:"tabpanel",tabindex:0,"aria-labelledby":`dz-${r}-tab-${m}`,key:i,style:{display:p===m?"block":"none"}},e.createElement("table",null,e.createElement("tbody",null,e.createElement(de,{...g,isFromDynamicZone:!0,targetUid:d,key:i}))))}))))}H.defaultProps={addComponent(){},components:[],customRowComponent:null,name:null},H.propTypes={addComponent:n().func,components:n().instanceOf(Array),customRowComponent:n().func,name:n().string,targetUid:n().string.isRequired};const ze=H,We=(0,E.default)(y.x)`
  table {
    width: 100%;
    white-space: nowrap;
  }

  thead {
    border-bottom: 1px solid ${({theme:t})=>t.colors.neutral150};

    tr {
      border-top: 0;
    }
  }

  tr {
    border-top: 1px solid ${({theme:t})=>t.colors.neutral150};

    & td,
    & th {
      padding: ${({theme:t})=>t.spaces[4]};
    }

    & td:first-of-type,
    & th:first-of-type {
      padding: 0 ${({theme:t})=>t.spaces[1]};
    }
  }

  th,
  td {
    vertical-align: middle;
    text-align: left;
    color: ${({theme:t})=>t.colors.neutral600};
    outline-offset: -4px;
  }
`,Oe=(0,E.default)(y.x)`
  height: ${24/16}rem;
  width: ${24/16}rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: ${10/16}rem;
    width: ${10/16}rem;
  }

  svg path {
    fill: ${({theme:t,color:o})=>t.colors[`${o}600`]};
  }
`,Ve=(0,E.default)(y.x)`
  border-radius: 0 0 ${({theme:t})=>t.borderRadius} ${({theme:t})=>t.borderRadius};
  display: block;
  width: 100%;
  border: none;
  position: relative;
  left: -0.25rem;
`,me=({children:t,icon:o,color:l,...r})=>e.createElement(Ve,{paddingBottom:4,paddingTop:4,as:"button",type:"button",...r},e.createElement(b.k,null,e.createElement(Oe,{color:l,"aria-hidden":!0,background:`${l}200`},o),e.createElement(y.x,{paddingLeft:3},e.createElement(h.Z,{variant:"pi",fontWeight:"bold",textColor:`${l}600`},t))));me.propTypes={color:n().string.isRequired,children:n().string.isRequired,icon:n().node.isRequired};const je=me;function J({addComponentToDZ:t,customRowComponent:o,editTarget:l,firstLoopComponentUid:r,isFromDynamicZone:d,isMain:s,isNestedInDZComponent:p,isSub:x,items:T,secondLoopComponentUid:C,targetUid:u}){const{formatMessage:i}=(0,A.Z)(),{trackUsage:m}=(0,c.useTracking)(),{isInDevelopmentMode:g,modifiedData:L,isInContentTypeView:M}=(0,B.Z)(),{onOpenModalAddField:k}=(0,re.Z)(),Z=()=>{m("hasClickedCTBAddFieldBanner"),k({forTarget:l,targetUid:u})};return u?T.length===0&&s?e.createElement(oe.i,{colCount:2,rowCount:2},e.createElement(ae.h,null,e.createElement(le.Tr,null,e.createElement(P.Th,null,e.createElement(h.Z,{variant:"sigma",textColor:"neutral600"},i({id:"global.name",defaultMessage:"Name"}))),e.createElement(P.Th,null,e.createElement(h.Z,{variant:"sigma",textColor:"neutral600"},i({id:"global.type",defaultMessage:"Type"}))))),e.createElement(c.EmptyBodyTable,{action:e.createElement(w.z,{onClick:Z,size:"L",startIcon:e.createElement(F.Z,null),variant:"secondary"},i({id:(0,f.Z)("table.button.no-fields"),defaultMessage:"Add new field"})),colSpan:2,content:M?{id:(0,f.Z)("table.content.no-fields.collection-type"),defaultMessage:"Add your first field to this Collection-Type"}:{id:(0,f.Z)("table.content.no-fields.component"),defaultMessage:"Add your first field to this component"}})):e.createElement(We,null,e.createElement(y.x,{paddingLeft:6,paddingRight:s?6:0,...s&&{style:{overflowX:"auto"}}},e.createElement("table",null,s&&e.createElement("thead",null,e.createElement("tr",null,e.createElement("th",null,e.createElement(h.Z,{variant:"sigma",textColor:"neutral600"},i({id:"global.name",defaultMessage:"Name"}))),e.createElement("th",{colSpan:"2"},e.createElement(h.Z,{variant:"sigma",textColor:"neutral600"},i({id:"global.type",defaultMessage:"Type"}))))),e.createElement("tbody",null,T.map(R=>{const{type:I}=R,S=o;return e.createElement(e.Fragment,{key:R.name},e.createElement(S,{...R,isNestedInDZComponent:p,targetUid:u,editTarget:l,firstLoopComponentUid:r,isFromDynamicZone:d,secondLoopComponentUid:C}),I==="component"&&e.createElement(de,{...R,customRowComponent:o,targetUid:u,isNestedInDZComponent:d,editTarget:l,firstLoopComponentUid:r}),I==="dynamiczone"&&e.createElement(ze,{...R,customRowComponent:o,addComponent:t,targetUid:u}))})))),s&&g&&e.createElement(Le.c,{icon:e.createElement(F.Z,null),onClick:Z},i({id:(0,f.Z)(`form.button.add.field.to.${L.contentType?L.contentType.schema.kind:l||"collectionType"}`),defaultMessage:"Add another field"})),x&&g&&e.createElement(je,{icon:e.createElement(F.Z,null),onClick:Z,color:d?"primary":"neutral"},i({id:(0,f.Z)("form.button.add.field.to.component"),defaultMessage:"Add another field"}))):e.createElement(oe.i,{colCount:2,rowCount:2},e.createElement(ae.h,null,e.createElement(le.Tr,null,e.createElement(P.Th,null,e.createElement(h.Z,{variant:"sigma",textColor:"neutral600"},i({id:"global.name",defaultMessage:"Name"}))),e.createElement(P.Th,null,e.createElement(h.Z,{variant:"sigma",textColor:"neutral600"},i({id:"global.type",defaultMessage:"Type"}))))),e.createElement(c.EmptyBodyTable,{colSpan:2,content:{id:(0,f.Z)("table.content.create-first-content-type"),defaultMessage:"Create your first Collection-Type"}}))}J.defaultProps={addComponentToDZ(){},customRowComponent:null,firstLoopComponentUid:null,isFromDynamicZone:!1,isNestedInDZComponent:!1,isMain:!1,isSub:!1,items:[],secondLoopComponentUid:null,targetUid:null},J.propTypes={addComponentToDZ:n().func,customRowComponent:n().func,editTarget:n().string.isRequired,firstLoopComponentUid:n().string,isFromDynamicZone:n().bool,isNestedInDZComponent:n().bool,isMain:n().bool,items:n().instanceOf(Array),secondLoopComponentUid:n().string,targetUid:n().string,isSub:n().bool};const pe=J;var ue=a(12028),Ke=a(20022),He=a(49358);const Je=(0,E.default)(y.x)`
  position: absolute;
  left: -1.125rem;
  top: 0px;

  &:before {
    content: '';
    width: ${4/16}rem;
    height: ${12/16}rem;
    background: ${({theme:t,color:o})=>t.colors[o]};
    display: block;
  }
`,Xe=E.default.svg`
  position: relative;
  flex-shrink: 0;
  transform: translate(-0.5px, -1px);

  * {
    fill: ${({theme:t,color:o})=>t.colors[o]};
  }
`,ge=t=>e.createElement(Je,null,e.createElement(Xe,{width:"20",height:"23",viewBox:"0 0 20 23",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t},e.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M7.02477 14.7513C8.65865 17.0594 11.6046 18.6059 17.5596 18.8856C18.6836 18.9384 19.5976 19.8435 19.5976 20.9688V20.9688C19.5976 22.0941 18.6841 23.0125 17.5599 22.9643C10.9409 22.6805 6.454 20.9387 3.75496 17.1258C0.937988 13.1464 0.486328 7.39309 0.486328 0.593262H4.50974C4.50974 7.54693 5.06394 11.9813 7.02477 14.7513Z"})));ge.propTypes={color:n().string.isRequired};const Ge=ge,X=({content:t})=>ne()(t);X.defaultProps={content:null},X.propTypes={content:n().string};const Qe=X,Ye=(0,E.default)(y.x)`
  position: relative;
`;var qe=a(68314);const G=({type:t,customField:o,repeatable:l})=>{const{formatMessage:r}=(0,A.Z)();let d=t;return["integer","biginteger","float","decimal"].includes(t)?d="number":["string"].includes(t)&&(d="text"),o?e.createElement(h.Z,null,r({id:(0,f.Z)("attribute.customField"),defaultMessage:"Custom field"})):e.createElement(h.Z,null,r({id:(0,f.Z)(`attribute.${d}`),defaultMessage:t}),"\xA0",l&&r({id:(0,f.Z)("component.repeatable"),defaultMessage:"(repeatable)"}))};G.defaultProps={customField:null,repeatable:!1},G.propTypes={type:n().string.isRequired,customField:n().string,repeatable:n().bool};const _e=G;function Q({configurable:t,customField:o,editTarget:l,firstLoopComponentUid:r,isFromDynamicZone:d,name:s,onClick:p,relation:x,repeatable:T,secondLoopComponentUid:C,target:u,targetUid:i,type:m}){const{contentTypes:g,isInDevelopmentMode:L,removeAttribute:M}=(0,B.Z)(),{formatMessage:k}=(0,A.Z)(),Z=m==="relation"&&x.includes("morph"),R=["integer","biginteger","float","decimal"].includes(m)?"number":m,I=v()(g,[u],{}),S=v()(I,["schema","displayName"],""),N=v()(I,"plugin"),q=u?"relation":R,U=()=>{Z||t!==!1&&p(l,C||r||i,s,m,o)};let D;return C&&r?D=2:r?D=1:D=0,e.createElement(Ye,{as:"tr",...(0,c.onRowClick)({fn:U,condition:L&&t&&!Z})},e.createElement("td",{style:{position:"relative"}},D!==0&&e.createElement(Ge,{color:d?"primary200":"neutral150"}),e.createElement(b.k,{paddingLeft:2,gap:4},e.createElement(qe.Z,{type:q,customField:o}),e.createElement(h.Z,{fontWeight:"bold"},s))),e.createElement("td",null,u?e.createElement(h.Z,null,k({id:(0,f.Z)(`modelPage.attribute.${Z?"relation-polymorphic":"relationWith"}`),defaultMessage:"Relation with"}),"\xA0",e.createElement("span",{style:{fontStyle:"italic"}},e.createElement(Qe,{content:S}),"\xA0",N&&`(${k({id:(0,f.Z)("from"),defaultMessage:"from"})}: ${N})`)):e.createElement(_e,{type:m,customField:o,repeatable:T})),e.createElement("td",null,L?e.createElement(b.k,{justifyContent:"flex-end",...c.stopPropagation},t?e.createElement(b.k,{gap:1},!Z&&e.createElement(ue.h,{onClick:U,label:`${k({id:"app.utils.edit",defaultMessage:"Edit"})} ${s}`,noBorder:!0,icon:e.createElement(ee.Z,null)}),e.createElement(ue.h,{onClick:z=>{z.stopPropagation(),M(l,s,C||r||"")},label:`${k({id:"global.delete",defaultMessage:"Delete"})} ${s}`,noBorder:!0,icon:e.createElement(Ke.Z,null)})):e.createElement(He.Z,null)):e.createElement(y.x,{height:(0,c.pxToRem)(32)})))}Q.defaultProps={configurable:!0,customField:null,firstLoopComponentUid:null,isFromDynamicZone:!1,onClick(){},relation:"",repeatable:!1,secondLoopComponentUid:null,target:null,targetUid:null,type:null},Q.propTypes={configurable:n().bool,customField:n().string,editTarget:n().string.isRequired,firstLoopComponentUid:n().string,isFromDynamicZone:n().bool,name:n().string.isRequired,onClick:n().func,relation:n().string,repeatable:n().bool,secondLoopComponentUid:n().string,target:n().string,targetUid:n().string,type:n().string};const et=(0,e.memo)(Q),tt=t=>{let o;switch(t){case"date":case"datetime":case"time":case"timestamp":o="date";break;case"integer":case"biginteger":case"decimal":case"float":o="number";break;case"string":case"text":o="text";break;case"":o="relation";break;default:o=t}return o};var nt=a(98432);const ot={collectionTypesConfigurations:[{action:"plugin::content-manager.collection-types.configure-view",subject:null}],componentsConfigurations:[{action:"plugin::content-manager.components.configure-layout",subject:null}],singleTypesConfigurations:[{action:"plugin::content-manager.single-types.configure-view",subject:null}]},Y=({disabled:t,isTemporary:o,isInContentTypeView:l,contentTypeKind:r,targetUid:d})=>{const{formatMessage:s}=(0,A.Z)(),{push:p}=(0,O.k6)(),{collectionTypesConfigurations:x,componentsConfigurations:T,singleTypesConfigurations:C}=ot,u=s({id:"content-type-builder.form.button.configure-view"});let i=x;const m=()=>(o||p(l?`/content-manager/collectionType/${d}/configurations/edit`:`/content-manager/components/${d}/configurations/edit`),!1);return l&&r==="singleType"&&(i=C),l||(i=T),e.createElement(c.CheckPermissions,{permissions:i},e.createElement(w.z,{startIcon:e.createElement(nt.Z,null),variant:"tertiary",onClick:m,disabled:o||t},u))};Y.defaultProps={contentTypeKind:"collectionType",isInContentTypeView:!0,isTemporary:!1,targetUid:""},Y.propTypes={disabled:n().bool.isRequired,contentTypeKind:n().string,isInContentTypeView:n().bool,isTemporary:n().bool,targetUid:n().string};const at=(0,e.memo)(Y),lt=()=>{const{initialData:t,modifiedData:o,isInDevelopmentMode:l,isInContentTypeView:r,submitData:d}=(0,B.Z)(),{formatMessage:s}=(0,A.Z)(),{trackUsage:p}=(0,c.useTracking)(),x=(0,O.$B)("/plugins/content-type-builder/:kind/:currentUID"),{onOpenModalAddComponentsToDZ:T,onOpenModalAddField:C,onOpenModalEditField:u,onOpenModalEditSchema:i,onOpenModalEditCustomField:m}=(0,re.Z)(),g=r?"contentType":"component",L=[g,"schema","attributes"],M=v()(o,[g,"uid"]),k=v()(o,[g,"isTemporary"],!1),Z=v()(o,[g,"schema","kind"],null),R=v()(o,L,[]),I=Me()(t,[g,"plugin"]),S=!te()(o,t),N=r?"contentType":"component",q=$=>{T({dynamicZoneTarget:$,targetUid:M})},U=async($,fe,ye,he,Ee)=>{const be=tt(he);Ee?m({forTarget:$,targetUid:fe,attributeName:ye,attributeType:be,customFieldUid:Ee}):u({forTarget:$,targetUid:fe,attributeName:ye,attributeType:be,step:he==="component"?"2":null})};let D=v()(o,[g,"schema","displayName"],"");const z=v()(o,[g,"schema","kind"],""),W=x?.params.currentUID==="create-content-type";!D&&W&&(D=s({id:(0,f.Z)("button.model.create"),defaultMessage:"Create new collection type"}));const rt=()=>{const $=z||g;$==="collectionType"&&p("willEditNameOfContentType"),$==="singleType"&&p("willEditNameOfSingleType"),i({modalType:g,forTarget:g,targetUid:M,kind:$})};return e.createElement(e.Fragment,null,e.createElement(O.NL,{message:s({id:(0,f.Z)("prompt.unsaved")}),when:S}),e.createElement(ve.T,{id:"title",primaryAction:l&&e.createElement(b.k,{gap:2},!W&&e.createElement(w.z,{startIcon:e.createElement(F.Z,null),variant:"secondary",onClick:()=>{C({forTarget:N,targetUid:M})}},s({id:(0,f.Z)("button.attributes.add.another")})),e.createElement(w.z,{startIcon:e.createElement(Ce.Z,null),onClick:()=>d(),type:"submit",disabled:te()(o,t)},s({id:"global.save",defaultMessage:"Save"}))),secondaryAction:l&&!I&&!W&&e.createElement(w.z,{startIcon:e.createElement(ee.Z,null),variant:"tertiary",onClick:rt},s({id:"app.utils.edit",defaultMessage:"Edit"})),title:ne()(D),subtitle:s({id:(0,f.Z)("listView.headerLayout.description"),defaultMessage:"Build the data architecture of your content"}),navigationAction:e.createElement(c.Link,{startIcon:e.createElement(Te.Z,null),to:"/plugins/content-type-builder/"},s({id:"global.back",defaultMessage:"Back"}))}),e.createElement(xe.D,null,e.createElement(b.k,{direction:"column",alignItems:"stretch",gap:4},e.createElement(b.k,{justifyContent:"flex-end"},e.createElement(b.k,{gap:2},e.createElement(at,{key:"link-to-cm-settings-view",targetUid:M,isTemporary:k,isInContentTypeView:r,contentTypeKind:Z,disabled:W}))),e.createElement(y.x,{background:"neutral0",shadow:"filterShadow",hasRadius:!0},e.createElement(pe,{items:R,customRowComponent:$=>e.createElement(et,{...$,onClick:U}),addComponentToDZ:q,targetUid:M,editTarget:N,isMain:!0})))))}}}]);
