// Runs in <head> before any image is parsed, so photos sharpen on their own load event instead of
// waiting for hydration; without JavaScript the attribute is never set and photos show as usual.
// decode() first, so a large photo is ready to paint before its transition starts.
export const blurUpScript = `document.documentElement.setAttribute('data-blur-up-ready','');['load','error'].forEach(function(type){document.addEventListener(type,function(event){var target=event.target;if(target.tagName!=='IMG'||!target.hasAttribute('data-blur-up'))return;var mark=function(){target.setAttribute('data-loaded','')};if(type==='load'&&target.decode)target.decode().then(mark,mark);else mark()},true)})`
