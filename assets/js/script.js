
$(document).ready(function() {
    $('.btn-outline-primary').click(function() {
        $('.btn-outline-primary').removeClass('active');
        $(this).addClass('active');
        $('#quiz-option').val($(this).data('value'));
    });

    $('#quiz-form').submit(function(event) {
        event.preventDefault();
        // Handle form submission
        alert('Selected option: ' + $('#quiz-option').val());
    });

    $('#play-now').click(function() {
        const selectedLevel = $('#level-select').val();
        if (selectedLevel === "Select Level") {
            alert('Please select a level to start the quiz.');
        } else {
            // Handle starting the quiz with the selected level
            alert('Starting quiz at level: ' + selectedLevel);
        }
    });
});
