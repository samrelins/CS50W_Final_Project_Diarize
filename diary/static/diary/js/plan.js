$(document).ready(load_page_content('/plan_pages/1', load_plan_1_js))

/* function that creates an ajax request to load each plan page's HTML 
and then calls the function to load the page's javascript */
var plan_data = new FormData();
var csrf_token = $("[name='csrfmiddlewaretoken']").val();
plan_data.append("csrfmiddlewaretoken", csrf_token)

function load_plan_1_js() {

    disable_input_button('#grateful-form-input', '#grateful-form-button')
    var items_input = 0

    $('#grateful-form').submit(() => {

        const text_input = $('#grateful-form-input').val();
        items_input ++;

        const grateful_entry = $('<div>').addClass('grateful-entry')
        const grateful_number = $('<h5>').addClass('grateful-number').html(items_input + '. ')
        const grateful_text = $('<h5>').addClass('grateful-text').html(text_input)
        grateful_entry.append(grateful_number, grateful_text)
        $("#grateful-entries").append(grateful_entry);

        $("#grateful-form-number").html((items_input + 1) + '. ');
        $('#grateful-form-input').val("")

        plan_data.append('grateful_' + items_input, text_input)

        if (items_input == 3) {
            $('#grateful-form').css('display', 'none')
            $('#page-submit').css('display', 'block').focus()
        }

        disable_input_button('#grateful-form-input', '#grateful-form-button')
        return false;
    });

    $('#page-submit').click(() => {
        load_page_content('/plan_pages/2', load_plan_2_js);
    });
}

function load_plan_2_js() {

    disable_input_button('#goal-form-input', '#goal-form-button')
    var entering_goal_text = true;

    $('#goal-form').submit(() => {

        text_input = $('#goal-form-input').val();

        if (entering_goal_text) {

            goal_entry = $('<div>').addClass('goal-entry')
            goal_text = $('<p>').addClass('goal-text').html(text_input)
            goal_entry.append(goal_text)
            $("#goal-entries").append(goal_entry);

            plan_data.append('descriptions', text_input)

            $('#page-submit').css('display','none');
            $('#goal-form-input').attr('placeholder', 
                                       'Write down the impact achieving this goal will have')
        } else {

            goal_reason = $("<p>").addClass('goal-reason-text').html(text_input)
            $('#goal-entries').children().last().append(goal_reason);

            plan_data.append('impacts', text_input);

            $('#page-submit').css('display', 'block');
            $('#goal-form-input').attr('placeholder', 
                                       'Write something you hope to achieve with your day');
        }

        entering_goal_text = !entering_goal_text;
        $('#goal-form-input').val("");
        disable_input_button('#goal-form-input', '#goal-form-button');

        return false;
    });

    $('#page-submit').click(() => {
        load_page_content('/plan_pages/3', load_plan_3_js);
    });
}

function load_plan_3_js() {
    disable_input_button('.deed-adventure-form-input', 
                         '.deed-adventure-form-button') 
    
    submit_on_enter('.deed-adventure-form-input', 
                    '.deed-adventure-form')

    $('.deed-adventure-form').submit(() => {
        text_input = $('.deed-adventure-form-input').val();
        good_deed_entry = $('<p>').html(text_input)
        $('.deed-adventure-entry').append(good_deed_entry)
        $('.deed-adventure-form').css('display', 'none')
        $('#page-submit').css('display', 'block').focus()
        plan_data.append('good_deed', text_input)
        return false
    });

    $('#page-submit').click(() => {
        load_page_content('/plan_pages/4', load_plan_4_js);
    });

}

function load_plan_4_js() {
    disable_input_button('.deed-adventure-form-input', 
                         '.deed-adventure-form-button') 
    
    submit_on_enter('.deed-adventure-form-input', 
                    '.deed-adventure-form')

    $('.deed-adventure-form').submit(() => {
        text_input = $('.deed-adventure-form-input').val();
        good_deed_entry = $('<p>').html(text_input);
        $('.deed-adventure-entry').append(good_deed_entry);
        $('.deed-adventure-form').css('display', 'none');
        $('#page-submit').css('display', 'block').focus();
        plan_data.append('adventure', text_input)
        return false
    });

    $('#page-submit').click(() => {
        $.ajax({url: "/plan_entry", 
                type: 'POST',
                data: plan_data, 
                processData: false,
                contentType: false,
                success: () => {window.location.assign("/")},
        });
    });
}