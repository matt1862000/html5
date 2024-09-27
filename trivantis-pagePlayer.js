﻿
		/*
 * Copyright (C) 2007 Trivantis Corporation
 */

	
var arDomEvents=['onclick','oncontextmenu','ondblclick','onkeydown','onmousedown','onmousemove','onmouseup',n];var arSkipAttrs=['webkitIndexedDB','sessionStorage','localStorage','webkitStorageInfo'];function jsPagePlayer(){var A=this;A.activePage=n;A.arLoadedPages=[];A.window=window;A.document=document;A.iPageCap=5;A.bAllowPreload=f;A.bLoadingPage=f;A.nextPageToLoad=n;A.timeoutArr=[];A.timeoutCap=10;A.bFirstPage=t;A.debug=0;A.bForceReload=f;};jsPagePlayer.prototype.togglePreload=function(A,B){if(typeof B=='undefined') B=5;this.bAllowPreload=A;this.iPageCap=B;};jsPagePlayer.prototype.loadPage=function(A,B){var C=this;A=A||firstPageName;if(C.revertPublish()) window.location.href=A;C.bLoadingPage=true;var D=C.getLoadedPage(A);if(D==u) if(C.arLoadedPages.length==C.iPageCap) C.cleanupLoadedPages();if (D==u){D=new jsPage(A);D.loadPage(A,function(E) { if (B) B(E);});C.addPage(D);};return D;};jsPagePlayer.prototype.updateTitleBar=function(A){var B=document.getElementsByTagName("title");var C=A.iframe.contentDocument.getElementsByTagName("title");if(C.length>0) B[0].text=C[0].text;};jsPagePlayer.prototype.revertPublish=function(){var A=navigator.appName;var v;var B;var C=false;if(A=="Netscape") A="ns";else if(A=="Microsoft Internet Explorer") A="ie";v=parseInt(navigator.appVersion,10);B=(A=="ie"&&v>=4);if(B&&(document.documentMode==8||document.documentMode==7||document.documentMode==6||document.documentMode==5)) C=true;return C;};jsPagePlayer.prototype.pageIsCrossDomain=function(A){var B=false;try{if (A.iframe.contentDocument||A.iframe.contentWindow.document) {}}catch(e){B=true;};return B;};jsPagePlayer.prototype.gotoPageSkip=function (A){function endsWith(D,E){return D.indexOf(E)==(D.length-E.length);};var B=location.href.split('?')[0];var C=indexHtmlName||'';if (!endsWith(B,C)) B+=(!endsWith(B,'/')?'/':'')+C;location.href=B+'?jmptopg='+A;};jsPagePlayer.prototype.gotoPage=function (A,B){if (window.console&&this.debug>0) console.log('jsPagePlayer.gotoPage - ['+A+']  bLoadingPage: ['+this.bLoadingPage+']');if(this.bLoadingPage){this.nextPageToLoad=A;return;};var C=this,D,E=window.currentPage?window.currentPage.name:n;var F=window.currentPage;if(comparePageNameAndScroll(A,E)) return;if (F) F.preHidePage();D=C.getLoadedPage(A);C.updateWindowValues(F);if(window.currentPage&&window.currentPage.iframe&&window.currentPage.iframe.contentWindow.finish) window.currentPage.iframe.contentWindow.finish();if ((window.currentPage=D)==u){D=C.loadPage(A,function() {if(C.pageIsCrossDomain(D)){window.location.href=A;return;}else if(pageIsUsingWebAddress (D.name)){window.location.href=A;return;};if(window.history&&window.history.pushState&&window.history.replaceState){if(E&&!B&&history.state&&history.state.status) window.history.pushState(history.state,"","");histPageName=A;var G={  status:histPageName };window.history.replaceState(G,"","");};var H=C.getPgTransDir(E,A);D.preShowPage(H,F);D.showPage(H,F,function() {C.doHidePage(F,D);F=u;});});window.currentPage=C.activePage=D;}else{var H=C.getPgTransDir(E,A);D.preShowPage(H,F);C.activePage=D;D.showPage(H,F,function() { C.doHidePage(F,D);});}};jsPagePlayer.prototype.getCurrentPage=function (){return window.currentPage;};jsPagePlayer.prototype.doHidePage=function (A,B){var C=this;if(A){if(B&&!C.bLoadingPage) A.hidePage(B);else setTimeout(function() { C.doHidePage (A,B);},150);}};jsPagePlayer.prototype.addPage=function (A){if (this.getLoadedPage(A.name)==u) this.arLoadedPages.push(A);};jsPagePlayer.prototype.getLoadedPage=function (A){var B=n;for (var i=0;i<this.arLoadedPages.length;i++){if (this.arLoadedPages[i].name==A){B=this.arLoadedPages[i];break;}};return B;};jsPagePlayer.prototype.showPageDone=function(A){if(A.iframe.contentWindow.bPageLoaded){jsOpaUtils.setUpPage(A,true);window.scrollTo(0,0);if (A.name.indexOf("#")!=-1){var B=A.name.substring(A.name.indexOf("#")+1,A.name.length);if(B!="top") window.scroll(0,getTopofObj(document.getElementById(B)));};if (this.nextPageToLoad){var C=this.nextPageToLoad;this.nextPageToLoad=n;pagePlayer.gotoPage(C);}}else{var D=this;setTimeout(function(){D.showPageDone(A);},500);}};jsPagePlayer.prototype.hidePageDone=function(A){var B=this;if(A.div.style.visibility=='hidden'){A.removeStyleTags();if(!this.bAllowPreload) this.cleanupLoadedPages();}else setTimeout(function(){B.hidePageDone(A);},300);};jsPagePlayer.prototype.updateIDForShow=function(A,B){var C=null;for(var D=0;D<B.length;D++){var E=B[D];if(E.nodeName.toLowerCase().indexOf("map")>-1) if(E.name.indexOf(A.idChange)>-1) E.name=E.name.replace(A.idChange,"");if(E.id&&E.id.indexOf(A.idChange)>-1) E.id=E.id.replace(A.idChange,"");C=E.children||E.childNodes;if(C) this.updateIDForShow(A,C);C=null;}};jsPagePlayer.prototype.createMEPlayer=function (A,B,C){return jsOpaUtils.createMediaElemPlayer(A,B,C);};jsPagePlayer.prototype.getPageIdx=function(A){for (var i=0;i<this.arLoadedPages.length;i++){if (this.arLoadedPages[i].name==A) return this.arLoadedPages[i].pageIdx;};return-1;};jsPagePlayer.prototype.getPageByDivID=function (A){var B=null;for(var i=0;i<this.arLoadedPages.length;i++){if (this.arLoadedPages[i].div.id==A){B=this.arLoadedPages[i];break;}};return B;};jsPagePlayer.prototype.getPgTransDir=function (A,B){var C=1;if (A&&B) C=this.getPageIdx(B)>this.getPageIdx(A)?1:-1;return C;};jsPagePlayer.prototype.trivOnFocus=function (){if(this.activePage) if(this.activePage.iframe.contentWindow.trivOnFocus) this.activePage.iframe.contentWindow.trivOnFocus();};jsPagePlayer.prototype.PrepPreloadPage=function (A){if(A){jsOpaUtils.setupPreloadedPage(A);}};jsPagePlayer.prototype.checkForObjectExistance=function (A){var B=null;var C=A;if(this.arLoadedPages.length>1){for(var i=0;i<this.arLoadedPages.length;i++){C+=this.arLoadedPages[i].idChange;B=document.getElementById(C);if(B) break;else C=A;}};return B;};jsPagePlayer.prototype.updateWindowValues=function(A){if(A){if (window.__arAddedAttribs){if (window.console&&this.debug>1) console.log('Deleting attribs from top window (originally from ['+window.__arAddedAttribs.pageName+']) : '+window.__arAddedAttribs.length);for (var i=0;i<window.__arAddedAttribs.length;i++) window[window.__arAddedAttribs[i]]=u;window.__arAddedAttribs=[];}}};jsPagePlayer.prototype.cleanupLoadedPages=function(){var A=this.activePage.name;var B=0;var C=0;if(this.arLoadedPages.length==this.iPageCap){for(B=0;B<this.arLoadedPages.length;B++){if(this.arLoadedPages[B].name==A) break;};if(B>=this.arLoadedPages.length/2){for (var D=0;D<B;D++){var E=this.arLoadedPages[D];E.deletePage();this.arLoadedPages.splice(D,1);D--;C++;if(C==2) break;}}else{for (var D=this.arLoadedPages.length-1;D>B;D--){var E=this.arLoadedPages[D];E.deletePage();this.arLoadedPages.pop();D=this.arLoadedPages.length;C++;if(C==2) break;}}}else{for(B=0;B<this.arLoadedPages.length;B++){if(this.arLoadedPages[B].name==A) continue;else{var E=this.arLoadedPages[B];E.deletePage();this.arLoadedPages.splice(B,1);B--;}}}};jsPagePlayer.prototype.checkoutMediaElem=function (A){A=A.toLowerCase();var B=triv$('#mediaPool',getDisplayDocument().body);var C=triv$(A,B)[0];if (C){var D=C.parentElement;triv$(C).remove();triv$('source',C).remove();var E=(D.__origAttribs=D.__origAttribs||{});var F=(E[A]=E[A]||[]);if (F.length==0) for (var x in C) F.push(x);};return C;};jsPagePlayer.prototype.checkinMediaElem=function(A){A=A.get?A.get(0):A;var B=A.id;var C=f;var D=triv$('#mediaPool',getDisplayDocument().body);if (D[0]){triv$('source',A).remove();triv$('track',A).remove();triv$(A).removeAttr('id name src style controls hidden autoplay loop');if (A.__listeners) for (var i=0;i<A.__listeners.length;i++){var E=A.__listeners[i];A.removeEventListener(E.type,E.listener);};delete A.__listeners;triv$(A).appendTo(D);var F=document.createElement('source');F.src='media/blank.mp4';var G=document.createElement('track');triv$(G).attr('srclang','en');triv$(G).attr('kind','subtitles');triv$(F).appendTo(A);triv$(G).appendTo(A);C=t;};var H=A.tagName.toLowerCase();var I=A.parentElement.__origAttribs&&A.parentElement.__origAttribs[H];for (var x in A){if (triv$.inArray(x,I)==-1){delete A[x];if (window.console) console.log('cleaning up after ME, id: ['+B+'], deleted attrib: '+x);}};return C;};function getBasePageName(A){var B=A.match(/(.*)\..*/);return B&&B.length>0?A.match(/(.*)\..*/)[1]:A;};function jsPage(A){this.name=A;this.arWindowHandlers={};this.arBodyHandlers={};this.cssName=A+"_CSS_";this.linkName=A+"_Link_";this.idChange="_"+this.name;};jsPage.prototype.loadPage=function(A,B){var C=this,D=document.createElement('div'),E=document.createElement('div'),F=document.createElement('iframe'),G=getBasePageName(A),H=F.style;D.style.visibility="hidden";D.style.display="none";D.style.position="absolute";D.style.overflow="hidden";F.id='ifr_'+G;F.scrolling='no';F.src=A;F.onload=function(){C.trivPage=C.iframe.contentWindow.trivPage;E.id='page'+F.contentWindow.trivPageId+'anchorFront';C.trivPage.anchorFrontDiv=E;C.iframe.contentWindow.updateAnchorDiv();var I=triv$('#wndPage.fInd',C.iframe.contentWindow.document);var J=C.trivPage.rcdGetAttData().focusColor,K=C.trivPage.rcdGetAttData().focusWidth;if(I.length>0) C.trivPage.div.className='fInd';var L=C.trivPage.rcdGetAttData().font;C.pageIdx=C.trivPage.rcdGetAttData().pageIdx;if (B) B(C);if(L) setTrivantisTextDefaults({"mT":L.marginTop,"mB":L.marginBottom,"lh":L.lineHeight});setTimeout(function() {if(J&&K){C.iframe.contentWindow.theApp.updateFocusCssColor(J,'trivantis-common.css');C.iframe.contentWindow.theApp.updateFocusCssWidth(K,'trivantis-common.css');}},300);};H.width='100%';H.height='100%';H.border='0px';H.overflow='hidden';H.visibility='hidden';H.left="0px";H.top="0px";C.div=D;C.anchorFrontDiv=E;C.iframe=F;D.appendChild(F);document.body.insertBefore(D,document.body.firstChild);document.body.appendChild(E);};jsPage.prototype.preShowPage=function(A,B){trivArExec(this.iframe.contentWindow.arWnds,function(C) { C.onPreShowPage();});};jsPage.prototype.showPage=function(A,B,C){var D=this;var E=D.div;var F=D.iframe;var G=F.contentDocument.getElementById('wndPage');F.contentWindow.init_page();pagePlayer.updateTitleBar(D);E.style.visibility="hidden";if(G){for (var i=0;i<G.style.length;i++){var H=G.style[i];if (H!='visibility') E.style[H]=G.style[H];}};var I=E.children||E.childNodes;if(I) pagePlayer.updateIDForShow(this,I);D.copyStyleTags();jsOpaUtils.completeRCDLoad(D);if (F.contentWindow.applyPageCSSStyle) F.contentWindow.applyPageCSSStyle(E);D.arWindowHandlers={};D.arBodyHandlers={};var J=[];var K=[];for (var i=0;i<arDomEvents.length;i++){var L=arDomEvents[i];if (L){var M=F.contentWindow[L];if (M){window[L]=M;D.arWindowHandlers[L]=M;F.contentWindow[L]=u;J.push(L);};M=F.contentDocument.body[L];if (M){document.body[L]=M;D.arBodyHandlers[L]=M;F.contentDocument.body[L]=u;K.push(L);}}};if (window.console&&pagePlayer.debug>1){console.log('Moved window handlers from iframe to top: '+D.name+'  ['+J+']');console.log('Moved body handlers from iframe to top:   '+D.name+'  ['+K+']');};window.__arAddedAttribs=[];for (var N in F.contentWindow){if(triv$.inArray(N,arSkipAttrs)==-1&&window[N]==u&&F.contentWindow[N]!=u){window.__arAddedAttribs.push(N);window[N]=F.contentWindow[N];}};window.__arAddedAttribs.pageName=D.name;if (window.console&&pagePlayer.debug>1) console.log('Assigned attribs from ['+D.name+'] to top window: '+window.__arAddedAttribs.length);if(pagePlayer.bAllowPreload) D.startPreload();E.style.visibility="";D.anchorFrontDiv.style.visibility='';pagePlayer.bLoadingPage=false;if (window.console&&pagePlayer.debug>0) console.log('jsPage.showPage - loading done ['+D.name+']');D.firePageTransition(n,A,B,function(){pagePlayer.showPageDone(D);if(!D.bFirstPage) E.focus();D.bFirstPage=f;if (C) C();E.style.zIndex="";trivArExec(arWnds,function(O) { O.onShowPage();});});};jsPage.prototype.startPreload=function(){var A=[];thePage=null;var B=function(G){G.hidePage();};var C=pagePlayer.activePage.iframe.contentWindow.arWnds;var D=/trivExitPage\s*\(\s*['|"](.*?)['|"]/;trivArExec(C,function(H){trivArExec(H.cwObj.arChld,function(I){var E=D.exec(I.actItem.toString());if (E&&triv$.inArray(E[1],A)==-1&&!pagePlayer.getLoadedPage(E[1])) A.push(E[1]);});});for(var F=0;F<A.length;F++){if(pagePlayer.arLoadedPages.length==pagePlayer.iPageCap) break;thePage=pagePlayer.loadPage(A[F],B);pagePlayer.PrepPreloadPage(thePage);}};jsPage.prototype.copyStyleTags=function(){var A=this.iframe;var B=A.contentDocument.head;var C=A.contentDocument.body;var D=B.getElementsByTagName('style');var E=0;for (var i=0;i<D.length;i++){var F=D[i];var G=document.createElement('style');G.type='text/css';if(F.id) G.id=this.cssName+F.id;else{G.id=this.cssName+E;E++;};if(document.getElementById(G.id)) G=document.getElementById(G.id);G.innerHTML=F.innerHTML;document.head.insertBefore(G,document.head.firstChild);};D=C.getElementsByTagName('style');for (var i=0;i<D.length;i++){var F=D[i];var G=document.createElement('style');G.type='text/css';if(F.id) G.id=this.cssName+F.id;else{G.id=this.cssName+E;E++;};if(document.getElementById(G.id)) G=document.getElementById(G.id);G.innerHTML=F.innerHTML;document.head.appendChild(G);};D=B.getElementsByTagName('link');for (var i=0;i<D.length;i++){var F=D[i];if(F.rel!='stylesheet') continue;var G=document.createElement('link');G.rel='stylesheet';G.type='text/css';if(F.id) G.id=this.linkName+F.id;else{G.id=this.linkName+E;E++;};if(document.getElementById(G.id)) G=document.getElementById(G.id);G.href=F.href;document.head.appendChild(G);}};jsPage.prototype.removeStyleTags=function(){var A=document.head.getElementsByTagName('style');for (var i=0;i<A.length;i++){var B=A[i];if(B.id){if(B.id.indexOf(this.cssName)==0){document.head.removeChild(B);i--;}}};A=document.head.getElementsByTagName('link');for (var i=0;i<A.length;i++){var B=A[i];if(B.rel!='stylesheet') continue;if(B.id){if(B.id.indexOf(this.linkName)==0){document.head.removeChild(B);i--;}}}};jsPage.prototype.preHidePage=function(){var A=this;jsOpaUtils.stopMedia(A);trivArExec(A.iframe.contentWindow.arWnds,function(H) { H.onPreHidePage();});var B=[];var C=[];for (var D in A.arBodyHandlers){var E=A.arBodyHandlers[D];A.iframe.contentDocument.body[D]=E;C.push(D);};for (var D in A.arWindowHandlers){var E=A.arWindowHandlers[D];A.iframe.contentWindow[D]=E;B.push(D);};if (window.console&&pagePlayer.debug>1){console.log('Restoring body event handler to iframe:   '+A.name+'  ['+C+']');console.log('Restoring window event handler to iframe: '+A.name+'  ['+B+']');};trivPage.clearDragMouseEvents();};jsPage.prototype.hidePage=function(A){var B=this;trivArExec(B.iframe.contentWindow.arWnds,function(C) { C.onHidePage();});B.div.style.visibility="hidden";B.anchorFrontDiv.style.visibility="hidden";pagePlayer.hidePageDone(B);};jsPage.prototype.deletePage=function(){var A=this,B=A.iframe&&A.iframe.contentWindow?A.iframe.contentWindow.clearJqCache:n;if (B) B();A.iframe.onload=u;theApp.cleanDOMTree (A.div);theApp.cleanDOMTree (A.anchorFrontDiv);A.div.parentElement.removeChild(A.div);A.anchorFrontDiv.parentElement.removeChild(A.anchorFrontDiv);delete A.div;delete A.trivPage;delete A.anchorFrontDiv;delete A.iframe;};jsPage.prototype.firePageTransition=function(A,B,C,D){var E=this;if (trivPage.hasPageTrans()){E.__pageInTrans=t;if(E.iframe.contentWindow.bPageLoaded){var F=E.div.style.backgroundColor;var G=E.div.style.zIndex;E.div.style.backgroundColor=F||document.body.style.backgroundColor;E.div.style.zIndex="99999";E.anchorFrontDiv.style.zIndex="99999";trivPage.doPageTrans(B,C,function(){E.__pageInTrans=f;E.div.style.backgroundColor=F;E.div.style.zIndex=G;E.iframe.contentWindow.updateAnchorDiv();if (D) D();});}else{setTimeout(function(){E.firePageTransition();},100);}}else if (D) D();};function getQueryParams(A) {if(typeof(A)=="undefined"||A==null) A=document.location.search;A=A.split("+").join(" ");var B={},C,D=/[?&]?([^=]+)=([^&]*)/g;while ((C=D.exec(A))!=u) {B[decodeURIComponent(C[1])]=decodeURIComponent(C[2]);};return B;};if(window.history&&window.history.pushState&&window.history.replaceState){window.onpopstate=function(A) {if(A.state.status){setTimeout(function(){saveVariable('TrivantisEPS','T');pagePlayer.gotoPage(A.state.status,true);},100);}};};function getTopofObj(A) {var B=0;if (A&&A.offsetParent) {do {B+=A.offsetTop;} while ((A=A.offsetParent)!=u);};return B;};function comparePageNameAndScroll (A,B){if(A==n||B==n) return false;else if (A==B) return true;else{var C="";var D=B;var E=false;if(A.indexOf("#")!=-1) C=A.substring(A.indexOf("#")+1,A.length);if(D.indexOf("#")!=-1) D=D.substring(0,D.indexOf("#"));if(A.indexOf (D)==0||A.indexOf('#')==0) E=true;if(C!=""&&E){if(C=="top") window.scrollTo(0,0);else window.scrollTo(0,getTopofObj(document.getElementById(C)));};return E;}};function pageIsUsingWebAddress(A){if(A.indexOf('http://')!=-1||A.indexOf('https://')!=-1) return true;else return false;};
