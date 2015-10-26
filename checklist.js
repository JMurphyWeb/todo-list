$(document).ready(function(){

  //variables\\
  //......................................................................................\\  
  var numRemTasks = localStorage.getItem("numberRemainTasks") || 0;


  //automatically run functions\\
  //......................................................................................\\
  
  //currently no disabling in place
  //$('#completed').prop('disabled',true);
  
  //retrieve old tasks from localstorage
  $('#main-list').html(localStorage.getItem("allTasks"));
  
  
  $('.checked').children('.cb').prop('checked', true);
  
  
  //set remaining tasks <p> element
  $('p').text('Tasks remaining: '+numRemTasks);

  //apply functionality to li old tasks
  applyFunctionality();

  //make list elements sortable
  $(function() {
    $( "#main-list" ).sortable({
      placeholder: "list-element"
    });
  });




  //Listeners\\
  //......................................................................................\\

  //submit a task
  $('#submit-task').click(function(){
    var textvalue = $('#user-input').val();
    if(textvalue!==''){
      $('#main-list').append('<li><input class="cb" type="checkbox"></input>'+'<span id="pp"> &nbsp;'+textvalue+'</span>'+'<span class="delmark">x</span>'+'</li>');                
      $('#user-input').val('');
      numRemTasks++;
      //now must add the task to local storage or update local storage.
      updateStorage();
      applyFunctionality();
    }
  });

  //enter pressed to submit task
  $('#user-input').keypress(function(e){
    if(e.which == 13){//Enter key pressed
      e.preventDefault();
      $('#submit-task').click();//Trigger search button click event
    }
  }); 

  //clear completed tasks
  $('#completed').click(function(){
    $('.checked').remove();
    updateStorage();
  });


//As new tasks are added to the list by the user or loaded from the localstorage
//the following function will be called each time
//which will give the appended list items the following functionality
  function applyFunctionality(){
    //hide delete buttons
    $('li').find('.delmark').hide();

    //if a checkbox is checked
    $('.cb').click(function(){
      if($(this).is(':checked')){ 
        $(this).parent('li').prop('class', 'checked');
        $(this).siblings('#pp').css('text-decoration','line-through');
        $(this).siblings('#pp').fadeTo(500,0.5,updateStorage);
        numRemTasks--;
        updateStorage();
        event.isPropagationStopped();
      }
      //checkbox is unchecked
      else { 
        $(this).parent('li').prop('class', '');
        $(this).siblings('#pp').css('text-decoration','none');
        $(this).siblings('#pp').fadeTo(500,1,updateStorage);
        numRemTasks++;
        updateStorage();
        event.isPropagationStopped();
      }
    })

    //Make all li elements listen for mouse enter
    //mouse enter li element show delete button
    $('li').mouseenter(function(){
      //show delmark and remove li if it is clicked
      $(this).children('.delmark').show();
      $(this).children('.delmark').mouseenter(function(){
        $(this).fadeTo(100,1);
        $(this).click(function(){
          $(this).parent().remove();
          numRemTasks--;
          updateStorage();
          event.isPropagationStopped();
        });
      });

      $(this).children('.delmark').mouseleave(function(){
        $(this).fadeTo(100,0.5);
      });
    }).mouseleave(function(){
      $(this).children('.delmark').hide();
    });
  }

  /*clear local storage
    $('#clear').click(function(){
      localStorage.clear();
      location.reload();
  }); */


  
  //Helper functions\\
  //......................................................................................\\

  //update localstorage with a change
  //also updates tasks remaining html element
  function updateStorage(){
    window.localStorage.setItem("numberRemainTasks", numRemTasks );
    $('p').text('Tasks remaining: '+numRemTasks);
    window.localStorage.setItem("allTasks", $('#main-list').html());
  }


  //hide delete marks on each li element
  function hideDeleteButtons(){
    $('li').find('.delmark').hide();
  }
  

});

