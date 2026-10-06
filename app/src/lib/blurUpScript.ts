// Runs in <head> before any image is parsed, so photos sharpen on their own load event instead of
// waiting for hydration; without JavaScript the attribute is never set and photos show as usual.
export const blurUpScript = `document.documentElement.setAttribute('data-blur-up-ready','');['load','error'].forEach(function(type){document.addEventListener(type,function(event){var target=event.target;if(target.tagName==='IMG'&&target.hasAttribute('data-blur-up'))target.setAttribute('data-loaded','')},true)})`
