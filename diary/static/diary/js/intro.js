$(document).ready(load_page_content("/intro_pages/1", 
                                    load_intro_1_js, 
                                    display_submit=true));

var intro_data = {} 

function load_intro_1_js() {
    $('#page-submit').click(() => {
        load_page_content("/intro_pages/2", 
                          load_intro_2_js, 
                          display_submit=true);
    });

    $('#skip-intro').click(() => {
        window.location.assign("../")
    });
};

function load_intro_2_js() {
    $('#page-submit').click(() => {
        load_page_content("/intro_pages/3", 
                          load_intro_3_js,
                          display_sumbit=true);
    });
};

function load_intro_3_js() {
    $('#page-submit').click(() => {
        load_page_content("/plan_pages/1", load_plan_1_js)
    });
};

function load_plan_1_js() {

    disable_input_button('#grateful-form-input', '#grateful-form-button')
    var items_input = 0

    $('#grateful-form').submit(() => {

        const text_input = $('#grateful-form-input').val();
        items_input ++;

        const grateful_entry = $('<div>').addClass('grateful-entry')
        const grateful_number = $('<h5>')
            .addClass('grateful-number')
            .html(items_input + '. ')
        const grateful_text = $('<h5>')
            .addClass('grateful-text')
            .html(text_input)
        grateful_entry.append(grateful_number, grateful_text)
        $("#grateful-entries").append(grateful_entry);

        $("#grateful-form-number").html((items_input + 1) + '. ');
        $('#grateful-form-input').val("")

        intro_data['grateful_' + items_input] = text_input

        if (items_input == 3) {
            $('#grateful-form').css('display', 'none')
            $('#page-submit').css('display', 'block').focus()
        }

        disable_input_button('#grateful-form-input', '#grateful-form-button')
        return false;
    });

    $('#page-submit').click(() => {
        load_page_content("/intro_pages/4", 
                          load_intro_4_js,
                          display_submit=true);
    });
}

function load_intro_4_js() {
    $('#page-submit').click(() => {
        load_page_content("/plan_pages/2", load_plan_2_js)
    });
};

function load_plan_2_js() {

    disable_input_button('#goal-form-input', '#goal-form-button')
    var entering_goal_text = true;

    var descriptions = []
    var impacts = []

    $('#goal-form').submit(() => {

        text_input = $('#goal-form-input').val();

        if (entering_goal_text) {

            goal_entry = $('<div>').addClass('goal-entry')
            goal_text = $('<p>').addClass('goal-text').html(text_input)
            goal_entry.append(goal_text)
            $("#goal-entries").append(goal_entry);

            descriptions.push(text_input)

            $('#page-submit').css('display','none');
            $('#goal-form-input').attr(
                'placeholder', 
                'Write down the impact achieving this goal will have'
            )

        } else {

            goal_reason = $("<p>")
                .addClass('goal-reason-text')
                .html(text_input)
            $('#goal-entries').children().last().append(goal_reason);

            impacts.push(text_input);

            $('#page-submit').css('display', 'block');
            $('#goal-form-input').attr(
                'placeholder', 
                'Write something you hope to achieve with your day'
            );
        }

        entering_goal_text = !entering_goal_text;
        $('#goal-form-input').val("");
        disable_input_button('#goal-form-input', '#goal-form-button');

        return false;
    });

    $('#page-submit').click(() => {
        intro_data['descriptions'] = descriptions
        intro_data['impacts'] = impacts
        load_page_content("/intro_pages/5", 
                          load_intro_5_js,
                          display_submit=true);
    });
}

function load_intro_5_js() {
    $('#page-submit').click(() => {
        load_page_content("/plan_pages/3", load_plan_3_js,)
    });
};

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
        intro_data['good_deed'] = text_input;
        return false
    });

    $('#page-submit').click(() => {
        load_page_content("/intro_pages/6", 
                           load_intro_6_js,
                           display_submit=true)
    });

}

function load_intro_6_js() {
    $('#page-submit').click(() => {
        load_page_content("/plan_pages/4", load_plan_4_js);
    });
};

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
        intro_data['adventure'] = text_input;
        return false
    });

    $('#page-submit').click(() => {
        load_page_content("/intro_pages/7", 
                          load_intro_7_js,
                          display_submit=true)
    });
}

function load_intro_7_js() {
    $('#page-submit').click(() => {
        load_page_content("/intro_pages/8", 
                          load_intro_8_js, 
                          display_submit=true)
    });
};

function load_intro_8_js() {
    for (var i = 0; i < intro_data.descriptions.length; i ++) {
        description = $('<p>')
            .addClass('review_goal_text')
            .css('font-weight','bold');
        description.html(intro_data.descriptions[i]);

        impact = $('<p>')
            .addClass('review_goal_text')
            .css('font-style','italic');
        impact.html(intro_data.impacts[i]);

        goal_entry = $('<div>').addClass('review-goal-entry');
        goal_entry.append(description, impact);
        goal_entry.attr('data-completed', ""); 
        $('.goal-entries').append(goal_entry);
    }; 

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
        completed_goals = [];
        $('.review-goal-entry').each((idx, entry) => {
            if ($(entry).attr('data-completed') === "") {
                completed_goals.push(false)
            } else {
                completed_goals.push(true)
            }
        });
        intro_data['completed_goals'] = completed_goals;
        load_page_content("/intro_pages/9", 
                          load_intro_9_js,
                          display_submit=true);
    });

};

function load_intro_9_js() {
    $('#page-submit').click(() => {
        load_page_content("/intro_pages/10", load_review_10_js)
    });
};

function load_review_10_js() {
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
        intro_data['improvement'] = text_input;
        return false
    });

    $('#page-submit').click(() => {
        load_page_content("/intro_pages/11", 
                          load_intro_11_js,
                          display_submit=true);
    });
}

function load_intro_11_js() {
    $('#page-submit').click(() => {
        load_page_content("/intro_pages/12", load_intro_12_js)
    });
};

function load_intro_12_js() {

    $('#page-submit').css('display','none');
    $('#new-deed-form').css('display', "none")
    $('#impact-form').css('display', 'none')
    $('.goal-text').html(intro_data.good_deed)

    $('#yes-button').click(() => {
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
        intro_data['good_deed'] = text_input;
        new_deed_entry = $('<p>').addClass('review-goal-text')
            .html(text_input);
        $('#good-deed')
            .html(new_deed_entry)
            .css('display', 'block')
            .toggleClass('completed-goal');
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
        intro_data['good_deed_impact'] = text_input;
        good_deed_entry = $('<p>').html(text_input);
        $('#impact-entry').append(good_deed_entry);
        $('#impact-form').css('display', 'none');
        $('#page-submit').css('display', 'block').focus();
        return false
    });

    $('#page-submit').click(() => {
        load_page_content("/intro_pages/13", 
                          load_intro_13_js,
                          display_submit=true)
    });
}

function load_intro_13_js() {
    $('#page-submit').click(() => {
        load_page_content("/intro_pages/14", load_intro_14_js)
    });
};

function load_intro_14_js() {
    $('#page-submit').css('display','none');
    disable_input_button('#memory-form-input', 
                         '#memory-form-button')
    $('#memory-form').css('display', 'none');
    $('.goal-text').html(intro_data.adventure)

    $('#yes-button').click(() => {
        intro_data['adventure_done'] = true;
        $('.review-goal-entry').toggleClass("completed-goal");
        $('.goal-text').attr('class', 'review-goal-text');
        $('#adventure-yn').css('display', 'none');
        $('#memory-form').css('display', 'block').focus();
        $('#memory-form-input').focus();
    });

    $('#no-button').click(() => {
        intro_data['adventure_done'] = false;
        $('.review-goal-entry').css('border-color', 'lightgray');
        $('.goal-text').css('color', 'lightgray');
        $('#adventure-yn').css('display', 'none');
        $('#memory-form').css('display', 'block').focus();
        $('#memory-form-input').focus();
    });

    var great_things = []

    $('#memory-form').submit(() => {
        text_input = $('#memory-form-input').val();
        great_things.push(text_input)
        goal_entry = $('<div>').addClass('goal-entry')
        goal_text = $('<p>').addClass('goal-text').html(text_input)
        goal_entry.append(goal_text)
        $('#memory-entries').append(goal_entry)
        $('#memory-form-input').val("")
        $('#page-submit').css('display', 'block');
        return false
    });

    $('#page-submit').click(() => {
        intro_data['great_things'] = great_things;
        load_page_content("/intro_pages/15", 
                          load_intro_15_js,
                          display_submit=true);
    });
}

function load_intro_15_js() {

    var date = new Date()
    $('.entry-page-title-subtext').html(date.toDateString())

    for (var i = 1; i <= 3; i++) {
        grateful_entry = $('<div>').addClass('col-md-4');
        grateful_entry.html(
            String(i) + '. ' +intro_data['grateful_' + String(i)]
        );
        $('.grateful').append(grateful_entry);
    }

    for (var i = 0; i < intro_data.descriptions.length; i++) {
        if (intro_data.completed_goals[i]) {
            goal_entry = $('<div>')
                .addClass("goal-entry entry-page-goal-entry success")
            description = $('<p>')
                .html(intro_data.descriptions[i])
                .addClass("goal-description")
            impact = $('<p>')
                .html(intro_data.impacts[i])
                .addClass("goal-reason")
            goal_text = $('<div>').append(description, impact)
            check = $('#check').clone()
            goal_entry.append(goal_text, check)
            $('.goal-entries').append(goal_entry)
        }
    }

    for (var i = 0; i < intro_data.descriptions.length; i++) {
        if (!intro_data['completed_goals'][i]) {
            goal_entry = $('<div>')
                .addClass("goal-entry entry-page-goal-entry fail")
            description = $('<p>').html(intro_data.descriptions[i])
                .addClass("goal-description")
            impact = $('<p>')
                .html(intro_data.impacts[i])
                .addClass("goal-reason")
            goal_text = $('<div>').append(description, impact)
            cross = $('#cross').clone()
            goal_entry.append(goal_text, cross)
            $('.goal-entries').append(goal_entry)
        }
    }

    $('.improvement').append(intro_data.improvement)

    $('.good-description').append(intro_data.good_deed)
    $('.good-impact').append(intro_data.good_deed_impact)

    if (intro_data.adventure_done) {
        adventure_entry = $('<p>').html(intro_data.adventure)
        check = $('#check').clone()
        $('.different-entry').append(adventure_entry, check)
        $('.different-entry').toggleClass('success')
    } else {
        adventure_entry = $('<p>').html(intro_data.adventure)
        cross = $('#cross').clone()
        $('.different-entry').append(adventure_entry, cross)
        $('.different-entry').toggleClass('fail')
    }

    for (var i = 0; i < intro_data.great_things.length; i++) {
        great_thing = $('<p>').addClass('col-md-4')
            .html(intro_data.great_things[i])
        $('.great-things').append(great_thing)
    }

    $('#page-submit').click(() => {
        window.location.assign("../")
    });
};
