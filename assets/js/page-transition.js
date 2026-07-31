(function(){
  "use strict";
  function isEligible(link,event){if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return false;if(!link||link.hasAttribute('download')||link.dataset.noTransition!==undefined||link.target==='_blank')return false;var href=link.getAttribute('href')||'';if(!href||href[0]==='#'||/^(mailto:|tel:|javascript:)/i.test(href))return false;var url=new URL(link.href,location.href);return url.origin===location.origin&&!(url.pathname===location.pathname&&url.hash)}
  function init(){var layer=document.querySelector('.transition-layer');if(!layer)return;document.addEventListener('click',function(e){var link=e.target.closest('a');if(!isEligible(link,e))return;e.preventDefault();layer.classList.add('is-covering');setTimeout(function(){location.href=link.href},520)});window.addEventListener('pageshow',function(){layer.classList.remove('is-covering')})}
  window.PageTransition={init:init};
})();
