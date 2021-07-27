
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
        if (($(this).position().top - $(window).height()*0.4) <= scrollDistance) {
            //active effect
            $('.header__nav--wr a.active').removeClass('active');
            $('.header__nav--wr a').eq(i).addClass('active');
            
            //typing efftect
            var textLength = $(this).find('.section__title').text().length;
            $(this).find('.section__title').css('--step',textLength);

            //section__wr effect
            $(this).find('.section__wr').addClass('active');
        }
    });
});

//Loader--------------------------------------------------------------------------------------//

$( document ).ready(function() {
    $('.loader').fadeOut(800);
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
// $('a[data-view]').click(function (e) { 
//     e.preventDefault();
//     var dataView = $(this).data('view');
//     $('.projects-card__view').each(function (indexInArray, valueOfElement) { 
//         if($(this).data('view') === dataView){
//             $(this).find('.view__video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
//             $(this).fadeIn(400)
//         }
//     });
// });

// $('.projects-card__view').click(function (e) { 
//     e.preventDefault();
//     $('.view__video').each(function () { 
//         $(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*'); 
//     });
//     $(this).fadeOut(400);
// });

// $(".view__wr").click(function(e) {
//     e.stopPropagation();
// });

$('.header__component, .header__nav').click(function (e) { 
    e.preventDefault();
    $('.header__component--cb, .header__nav--cb').prop('checked',false);
});

$(".header__component--btn, .header__nav--btn, .header__nav--wr").click(function(e) {
    e.stopPropagation();
});




