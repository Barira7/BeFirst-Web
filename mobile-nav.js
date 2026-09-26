(function(){
  var nav=document.querySelector('nav .nav-in')||document.querySelector('nav');
  var links=document.querySelector('.nav-links');
  if(!nav||!links||document.querySelector('.menu-btn'))return;
  var b=document.createElement('button');
  b.className='menu-btn';b.type='button';
  b.setAttribute('aria-label','Open menu');b.textContent='\u2630';
  nav.appendChild(b);
  b.addEventListener('click',function(){
    var open=links.classList.toggle('open');
    b.textContent=open?'\u2715':'\u2630';
    b.setAttribute('aria-label',open?'Close menu':'Open menu');
  });
  links.addEventListener('click',function(e){
    if(e.target.closest('a')){links.classList.remove('open');b.textContent='\u2630';}
  });
})();
