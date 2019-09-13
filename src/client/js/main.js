  let c = document.getElementById('c'),
  h = document.getElementById('head'),
  a = document.getElementById('ab'),
  st = document.getElementById('start'),
  lob = document.getElementById('lob');

  function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}
  function checkElem() {
    if(isElementInViewport(a)){
      console.log("yes");
      a.classList.add("aboutV");
      a.classList.remove("about");
    }
    if(isElementInViewport(c)){
      c.classList.add("accountV");
      c.classList.remove("account");
    }
  }
  if(!lob){
    setInterval(checkElem, 100);

    start.addEventListener('click', (e) => {
      console.log("test");
      window.location.href = "/lobbies.html";
    });
  }
