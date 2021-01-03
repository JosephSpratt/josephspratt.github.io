$(document).ready(function() {
   
    // Open Pack
$(document).on("click","a",function(e) {
        e.preventDefault();
        $(this).addClass('active');
        $('#card').addClass('active');
    });

    // Close Pack
$(document).on("click","#card.active",function(e) {
        e.preventDefault();
        $(this).removeClass('active');
        $('a').removeClass('active');
    });

});