function load_page_content(loc, load_plan_js, display_submit=false) {
    $.get(loc,
          (result) => {
              $('.plan-page').html(result);
              load_plan_js();
              if (!display_submit) {
                   $('#page-submit').css('display','none');
              }
    });
}

function disable_input_button(input, button) {

    $(button).prop('disabled', true);
    $(input).focus();

    $(input).keyup(() => {
        if ($(input).val().length > 0) {
            $(button).prop('disabled', false);
        } else {
            $(button).prop('disabled', true);
        }
    })    
}

function submit_on_enter(input, form) {

    $(input).keypress((event) => {
        if (event.which == 13 && $(input).val().length > 5) {
            $(form).submit(); 
        }
    });
}