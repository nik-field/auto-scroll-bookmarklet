# auto-scroll-bookmarklet
A bookmarklet that auto-scrolls a webpage and lets you set speed and distance. Uses an ease-in-out animation. Originally intended to help do screen recordings to create more dynamic showcases of webpages.

## Minified Bookmarklet
Copy the code below, create a new bookmark and paste this code as the URL. I recommend using developer tools and toggling the device toolbar/responsive mode to allow you to adjust the screen dimensions then setting up your screen recorder before finally clicking the bookmarklet and entering your settings. Hitting ESC kills the animation.

```js
javascript:!function(e,n){let t,o,i=5,l=n.body.scrollHeight,s=1;const r=function(e){let n="Enter delay (in seconds), distance to scroll (in pixels) and the scroll scrollSpeed (in seconds).\n\nRun the script a second time with options 0 0 0 to reset the page.\n\nExample:\n\n1 800 5 or 1 50% 5";e&&(n=e+"\n\n"+n);let t=prompt(n);if(null!==t)if(""!==t){if(!/\d{1,} \d{1,}%* \d{1,}/.test(t))return r("Whoops. Input invalid: "+t);c(t.split(" "))}else c([s,l,i])};function c(t){e.addEventListener("keydown",u),e.addEventListener("keyup",p,!1),t&&([s,l,i]=t),setTimeout(d,1e3*s,l.includes("%")?.01*l.slice(0,-1)*(n.body.scrollHeight-e.innerHeight):l,i)}function d(n,i){let l=0,s=0,r=0,c=n-l,d=i/(60*i);o=setInterval(function(){var t,a,u;if(t=s+=d,a=l,u=c,(r=(t/=i/2)<1?u/2*t*t+a:-u/2*(--t*(t-2)-1)+a)>=n)return clearInterval(o),void e.scrollTo(0,n);e.scrollTo({top:Math.round(r),left:0,behavior:"instant"})},1e3/60),t=!0}const a=[];function u(e){a[e.keyCode]=!0,a[27]&&(t?(clearInterval(o),t=!1):d())}function p(e){delete a[e.keyCode]}r()}(window,document);
```

### Example
![Example](https://user-images.githubusercontent.com/47613489/148300721-41d51a94-5908-4397-833d-915d0bab57f3.gif)

# Credits
⭐️ Borrows heavily from [lorenjohnson's](https://gist.github.com/lorenjohnson) gist [chrome-autoscroll-bookmarklet.js](https://gist.github.com/lorenjohnson/a99ea9e913858a28db603f9d008a604c) and [RayBB's fork](https://gist.github.com/RayBB/359bb5946ac3c45e355bcf238e49a66e)

🤖 Easing function from akinuri on [JS Fiddle](https://jsfiddle.net/akinuri/o2tdv7pg/)

👍 Prompt logic is from [3mediaweb's gist](https://gist.github.com/3mediaweb/3b71c42664f53d2c303e3a3d3aba53ef)

