(function(){
  "use strict";
  function text(selector,value){document.querySelectorAll(selector).forEach(function(el){el.textContent=value})}
  function attr(selector,name,value){document.querySelectorAll(selector).forEach(function(el){el.setAttribute(name,value)})}
  function fillSelect(selector,items,placeholder){document.querySelectorAll(selector).forEach(function(select){if(select.options.length>1)return;items.forEach(function(item){var option=document.createElement('option');option.value=item;option.textContent=item;select.appendChild(option)});if(select.options[0])select.options[0].textContent=placeholder})}
  function render(){var c=window.SITE_CONFIG;if(!c)return;
    text('[data-config="brand.name"]',c.brand.name);text('[data-config="brand.tagline"]',c.brand.tagline);text('[data-config="contact.email"]',c.contact.email);text('[data-config="contact.address"]',c.contact.address);text('[data-config="advertise.title"]',c.advertise.title);text('[data-config="advertise.text"]',c.advertise.text);text('[data-config="footer.description"]',c.footer.description);text('[data-config="footer.copyright"]',c.footer.copyright);
    attr('[data-config-href="contact.email"]','href','mailto:'+c.contact.email);attr('[data-config-src="brand.logoDark"]','src',c.brand.logoDark);attr('[data-config-src="brand.logoLight"]','src',c.brand.logoLight);
    fillSelect('[name="inquiry_type"]',c.forms.inquiryOptions,'Select an inquiry type');fillSelect('[name="service"]',c.forms.serviceOptions,'Select a service');fillSelect('[name="product_stage"]',c.forms.stageOptions,'Select a stage (optional)');fillSelect('[name="timeline"]',c.forms.timelineOptions,'Select a timeline (optional)');
    var schema=document.querySelector('[data-site-schema]');if(schema){try{var data=JSON.parse(schema.textContent);data.name=c.brand.legalName;data.email=c.contact.email;data.address={"@type":"PostalAddress","streetAddress":c.contact.address};schema.textContent=JSON.stringify(data)}catch(e){}}
  }
  window.ConfigRender={render:render};
})();
