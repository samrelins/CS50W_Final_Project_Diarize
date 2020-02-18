$(document).ready(load_page_content('review_pages/1', 
                                    load_review_1_js, 
                                    display_submit=true))

var review_data = new FormData();
var csrf_token = $("[name='csrfmiddlewaretoken']").val();
review_data.append("csrfmiddlewaretoken", csrf_token)

/*function containing the js specific to page1 of the plan page */
function load_review_1_js() {
    $('.review-goal-entry').each((idx, entry) => {
        $(entry).click(() => {
            $(entry).toggleClass('completed-goal');
            if ($(entry).attr('data-completed') === "") {
                $(entry).attr('data-completed', 'True');
            } else {
                $(entry).attr('data-completed', '');
            }
        });
    });

    $('#page-submit').click(() => {
        $('.review-goal-entry').each((idx, entry) => {
            review_data.append('goals_completed', $(entry).attr('data-completed'));
        });
        load_page_content('review_pages/2', load_review_2_js);
    });

}

function load_review_2_js() {

    $('#page-submit').css('display','none');
    disable_input_button('.deed-adventure-form-input', 
                         '.deed-adventure-form-button'); 
    
    submit_on_enter('.deed-adventure-form-input', 
                    '.deed-adventure-form');


    $('.deed-adventure-form').submit(() => {
        text_input = $('.deed-adventure-form-input').val();
        good_deed_entry = $('<p>').html(text_input);
        $('.deed-adventure-entry').append(good_deed_entry);
        $('.deed-adventure-form').css('display', 'none');
        $('#page-submit').css('display', 'block').focus();
        review_data.append('improvement', text_input);
        return false
    });

    $('#page-submit').click(() => {
        load_page_content('review_pages/3', load_review_3_js);
    });
}

function load_review_3_js() {

    $('#page-submit').css('display','none');
    $('#new-deed-form').css('display', "none")
    $('#impact-form').css('display', 'none')

    $('#yes-button').click(() => {
        review_data.append('deed', "")
        $('#good-deed').toggleClass("completed-goal")
        $('.goal-text').attr('class', "review-goal-text")
        $('#good-deed-yn').css('display', 'none')
        $('#impact-form').css('display', 'block')
        $('#impact-form-input').focus()
    });

    $('#no-button').click(() => {
        $('#good-deed').css('display', 'none')
        $('#good-deed-yn').css('display', 'none')
        $('.explanation-text').css('display', 'none')

        $('.alt-explanation-text').css('display', 'block')
        $('#new-deed-form').css('display', 'block')
        $('#new-deed-form-input').focus()
    });
        
    disable_input_button('#new-deed-form-input', 
                         '#new-deed-form-button') 
    
    submit_on_enter('#new-deed-form-input', 
                    '#new-deed-form') 

    $('#new-deed-form').submit(() => {
        text_input = $('#new-deed-form-input').val();
        review_data.append('deed', text_input);
        new_deed_entry = $('<p>').addClass('review-goal-text').html(text_input);
        $('#good-deed').html(new_deed_entry).css('display', 'block').toggleClass('completed-goal');
        $('#new-deed-form').css('display', 'none');
        $('#impact-form').css('display', 'block');
        $('#impact-form-input').focus(); return false;
    });

    disable_input_button('#impact-form-input', 
                         '#impact-form-button') 
    
    submit_on_enter('#impact-form-input', 
                    '#impact-form') 
                    

    $('#impact-form').submit(() => {
        text_input = $('#impact-form-input').val();
        review_data.append('impact', text_input);
        good_deed_entry = $('<p>').html(text_input);
        $('#impact-entry').append(good_deed_entry);
        $('#impact-form').css('display', 'none');
        $('#page-submit').css('display', 'block').focus();
        return false
    });

    $('#page-submit').click(() => {
        load_page_content('review_pages/4', load_review_4_js)
    });
}

function load_review_4_js() {

    $('#page-submit').css('display','none');
    disable_input_button('#memory-form-input', 
                         '#memory-form-button')

    $('#memory-form').css('display', 'none');

    $('#yes-button').click(() => {
        review_data.append('adventure_done', 'True');
        $('.review-goal-entry').toggleClass("completed-goal");
        $('.goal-text').attr('class', 'review-goal-text');
        $('#adventure-yn').css('display', 'none');
        $('#memory-form').css('display', 'block').focus();
        $('#memory-form-input').focus();
    });

    $('#no-button').click(() => {
        review_data.append('adventure_done', "")
        $('.review-goal-entry').css('border-color', 'lightgray');
        $('.goal-text').css('color', 'lightgray');
        $('#adventure-yn').css('display', 'none');
        $('#memory-form').css('display', 'block').focus();
        $('#memory-form-input').focus();
    });

    $('#memory-form').submit(() => {
        text_input = $('#memory-form-input').val();
        review_data.append('great_things', text_input)
        goal_entry = $('<div>').addClass('goal-entry')
        goal_text = $('<p>').addClass('goal-text').html(text_input)
        goal_entry.append(goal_text)
        $('#memory-entries').append(goal_entry)
        $('#memory-form-input').val("")
        $('#page-submit').css('display', 'block');
        return false
    });

    $('#page-submit').click(() => {
        $.ajax({url: "/review_entry", 
                type: 'POST',
                data: review_data, 
                processData: false,
                contentType: false,
                success: () => {window.location.assign("/")},
        });
    });
}