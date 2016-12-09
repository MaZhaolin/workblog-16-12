;$(function(){
  'usr stirct';
  var sidebar = $('#sidebar');
      mask = $('.mask');
      toggleSidebarEl = $('.toggle-sidebar');
      win = $(window);
      backTop = $('#backTop');
      body=$('html,body');
      workView=$('#workView');

  toggleSidebarEl.click(function(){
    sidebar.addClass('show');
    mask.show();
  });

  mask.click(function(){
    sidebar.removeClass('show');
    workView.hide();
    mask.hide();
  });

  $('#sidebar a').click(function(){
    workView.show();
  });

  $('.toolbar span:nth-child(1)').click(function(){
    workView.hide();
  })

  function toggleSidebar(){
    sidebar.toggleClass('show');
    mask.fadeToggle();
  }

  win.scroll(function(){
    if(win.scrollTop()>win.height()){
      backTop.show();
      $('nav').addClass('fixed');
    }else{
      backTop.hide();
      $('nav').removeClass('fixed');
    }
  });

  backTop.click(function(){
    $('html,body').animate({scrollTop:0},800);
  });

})
