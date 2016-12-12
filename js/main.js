window.onload=(function(){
  'usr stirct';
var HEIGHT=document.documentElement.clientHeight;

  function Dom(el){
    this.dom = document.querySelectorAll(el);
  }
  Dom.prototype = {
    constructor : Dom,
    map : function(cb){
      [].map.call(this.dom,cb);
    },
    click : function(cb){
        this.map(function(v){
          v.onclick = cb;
        })
    },
    addClass : function(className){
      this.map(function(v){
        var classNames = v.className.split(' ');
            index = classNames.indexOf(className);
        if(index < 0)
          classNames.push(className);
        v.className=classNames.join(' ');
      })
    },
    removeClass : function(className){
      this.map(function(v){
        var classNames = v.className.split(' ');
            index = classNames.indexOf(className);
        if(index >= 0)
          classNames.splice(index,1);
        v.className=classNames.join(' ');
      })
    },
    toggleClass : function(className){
      this.map(function(v){
        var classNames = v.className.split(' ');
            index = classNames.indexOf(className);
        if(index < 0){
          classNames.push(className);
        }else{
          classNames.splice(index,1);
        }
        v.className=classNames.join(' ');
      })
    },
    toggle : function(){
      this.map(function(v){
        var display=v.style.display;
        if(display == 'none')
          v.style.display = "inline-block";
        else v.style.display = "none";
      })
    },
    show : function(){
        this.map(function(v){
          v.style.display = "inline-block";
        })
    },
    hide : function(){
      this.map(function(v){
        v.style.display = "none";
      })
    },
    css : function(property,value){
      this.map(function(v){
        v.style.setProperty(property,value);
      })
    }
  }
  function $(id){
    return document.getElementById(id);
  }
  var sidebar = new Dom('#sidebar');
      mask = new Dom('.mask');
      toggleSidebarEl = new Dom('.toggle-sidebar');
      backTop = new Dom('#backTop');
      nav = new Dom('nav');
      workView = new Dom('#workView');

      body = $('body');
      scrollbar = $('scrollbar');
      bar = $('bar');
      content = $('content');
      scale = content.clientHeight/HEIGHT;

      body.style.height=HEIGHT+'px';
      scrollbar.style.height=HEIGHT+'px';
      bar.style.height=HEIGHT/scale+'px'

      toggleSidebarEl.click(function(){
        sidebar.toggleClass('show');
        mask.toggle();
      });

      mask.hide();
      mask.click(function(){
        sidebar.removeClass('show');
        workView.hide();
        mask.hide();
      });

      new Dom('#sidebar a').click(function(){
        workView.show();
      });

      new Dom('.toolbar span:nth-child(1)').click(function(){
        workView.hide();
      })

      function toggleSidebar(){
        sidebar.toggleClass('show');
        mask.Toggle();
      }
      if(document.addEventListener){
document.addEventListener('DOMMouseScroll',scrollFunc,false);
}//W3C
window.onmousewheel=document.onmousewheel=scrollFunc;
function scrollFunc(){
  console.log(1);
}
      body.onscroll = toggleBar;
      var startY=null;
          startTop=null;
          startScrollTop=null;
      bar.onmousedown = function(e){
        body.onscroll=null;
        startY = e.clientY;
        startTop = parseFloat(bar.style.top);
        startScrollTop=body.scrollTop;
        body.style.cssText=' -webkit-user-select: none;  -moz-user-select: none;  -ms-user-select: none;  -o-user-select: none;  user-select: none;';
        onmousemove = function(e){
          nowTop = (startTop + (e.clientY-startY));
          if(nowTop >= 0 && nowTop <= (HEIGHT - bar.clientHeight)){
            body.scrollTop = startScrollTop + (e.clientY-startY)*scale;
            bar.style.top = nowTop + 'px';
          }

        }
      }
      window.onmouseup = function(e){
        console.log('xxx');
        startY = e.clientY;
        onmousemove = null;
        body.onscroll=toggleBar;
      }
     toggleBar();
     function toggleBar(){ 
       if(body.scrollTop>750){
         backTop.show();
         nav.addClass('fixed');
       }else{
         backTop.hide();
       }
       if(body.scrollTop>50){
         nav.addClass('fixed');
       }else{
         nav.removeClass('fixed');
       }
       bar.style.top=body.scrollTop/scale+'px';
     }

     var isScroll=false;
     backTop.click(function(){
       if(!isScroll){
         isScroll=true;
         var scrollTop=body.scrollTop;
         var t=setInterval(function(){
           body.scrollTop=scrollTop;
           scrollTop-=30;
           if(scrollTop<0){
             clearInterval(t);
             isScroll=false;
           }
         },1)
       }
     });

})();
