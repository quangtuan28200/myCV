
//SCROLL CSS

// The debounce function receives our function as a parameter
// const debounce = (fn) => {

//     // This holds the requestAnimationFrame reference, so we can cancel it if we wish
//     let frame;

//     // The debounce function returns a new function that can receive a variable number of arguments
//     return (...params) => {

//         // If the frame variable has been defined, clear it now, and queue for next frame
//         if (frame) {
//             cancelAnimationFrame(frame);
//         }

//         // Queue our function call for the next frame
//         frame = requestAnimationFrame(() => {

//             // Call our function and pass any params we received
//             fn(...params);
//         });

//     }
// };


// // Reads out the scroll position and stores it in the data attribute
// // so we can use it in our stylesheets
// const storeScroll = () => {
//     document.documentElement.dataset.scroll = window.scrollY;
// }

// // Listen for new scroll events, here we debounce our `storeScroll` function
// document.addEventListener('scroll', debounce(storeScroll), { passive: true });

// // Update scroll position for first time
// storeScroll();



$(window).scroll(function() {
    var scrollDistance = $(window).scrollTop();
    $('html').attr('scroll', scrollDistance)
    // $('.header__component').attr('width', $('.header__component').width())
});
//-----------------------------------------------------------------------------------------------------------//

//ACTIVE BTN WHEN SCROLL
$('a[data-scroll]').click(function(e) {
	e.preventDefault();
	var target = ( '#' + $(this).data('scroll') );
	var $target = $(target);
	//Animate the scroll to, include easing lib if you want more fancypants easings
	$('html, body').stop().animate({
	    'scrollTop': $target.offset().top
	});
}); 

$(window).scroll(function() {
    var scrollDistance = $(window).scrollTop();

    // Assign active class to nav links while scolling
    $('.page-section').each(function(i) {
        // console.log($(this).position().top,scrollDistance)
        if ($(this).position().top <= scrollDistance) {
            $('.header__nav--wr a.active').removeClass('active');
            $('.header__nav--wr a').eq(i).addClass('active');
            
            var title = $(this).find('.section__title');
            // your custome placeholder goes here!
            var originText = title.text(),
            phCount = 0;
            console.log(originText)

            // title.text("");
            // printLetter(originText, title);

            function printLetter(text, el){
                var arr = text.split("");
                var currentText = el.text()
                var replace = currentText + arr[phCount];

                setTimeout(function () {
                    // print  text
                    el.text(replace)
                    // increase loop count
                    phCount++;
                    // run loop until placeholder is fully printed
                    if (phCount < arr.length) {
                        printLetter(text, el);
                    }
                }, 100);
            }
        }
    });
});

//Loader--------------------------------------------------------------------------------------//

$( document ).ready(function() {
    setTimeout(() => {
        $('.loader').fadeOut(800);
    }, 500);
});

//project redirect--------------------------------------------------------------------------------------//

$('a[data-target-tag]').click(function(e) {
	e.preventDefault();
	var target = $(this).data('target-tag');
    
    $('a[data-target-tag].active').removeClass('active');
    $(this).addClass('active');

    $('.projects-card__wr[data-tag]').each(function () { 
        var tag = $(this).data('tag');
        if(target == 'all'){
            $(this).fadeIn(800);
        }else{
            $(this).css('display','none');
            if(target === tag){
                $(this).fadeIn(800);
            }
        }
    });
}); 

//show view_wr--------------------------------------------------------------------------------------//
$('a[data-view]').click(function (e) { 
    e.preventDefault();
    var dataView = $(this).data('view');
    $('.projects-card__view').each(function (indexInArray, valueOfElement) { 
        if($(this).data('view') === dataView){
            $(this).find('.view__video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
            $(this).fadeIn(400)
        }
    });
});

$('.projects-card__view').click(function (e) { 
    e.preventDefault();
    $('.view__video').each(function () { 
        $(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*'); 
    });
    $(this).fadeOut(400);
});

$(".view__wr").click(function(e) {
    e.stopPropagation();
});

//typing effect--------------------------------------------------------------------------------------//

// $('.section__title').each(function () { 
//     // your custome placeholder goes here!
//     var originText = $(this).text(),
//     phCount = 0;

//     $(this).text("");
//     printLetter(originText, $(this));

//     function printLetter(text, el){
//         var arr = text.split("");
//         var currentText = el.text()
//         var replace = currentText + arr[phCount];

//         setTimeout(function () {
//             // print  text
//             el.text(replace)
//             // increase loop count
//             phCount++;
//             // run loop until placeholder is fully printed
//             if (phCount < arr.length) {
//                 printLetter(text, el);
//             }
//         }, 100);
//     }
// });




