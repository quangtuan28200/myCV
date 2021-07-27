
//rest API--------------------------------------------------------------------------------------//
//deploy
var dataAPI = "https://quangtuan28200.github.io/myCV/data.json";
//dev
// var dataAPI = "../../data.json";
fetch(dataAPI)
    .then((response) => response.json())
    .then((data) => {
        var dataProfile = data.profile;
        var dataHello = data.hello;
        var dataResume = data.resume;
        var dataSkills = data.skills;
        var dataProjects = data.projects;

        //profile
        $('.header__wrap').append(profile(dataProfile));
        //hello
        renderDescription('#hello', dataHello);
        //resume
        renderDescription('#resume', dataResume.description);
        renderTimelineItem('.career', dataResume.career);
        renderTimelineItem('.education', dataResume.education);
        //skills
        renderTimelineItem('.pro', dataSkills.professional);
        renderTimelineItem('.add', dataSkills.additional);
        //project
        $('.projects-card').append(projects(dataProjects));
       
    })
    .then(()=>{
        setTimeout(() => {
            $('.loader').fadeOut(400);
        }, 400);
        hideNav()
    })
    .catch((err) => console.log(err))

//render
function renderDescription(selector, data) {
    $(`${selector} .section__title`).after(description(data));
}
function renderTimelineItem(selector, data) {
    $(`${selector} .timeline__title`).after(timelineItem(data))
}

//HTML
function profile(dataProfile) {
    return `
        <div class="header__avt">
            <img src="${dataProfile.avt}" alt="avatar">
        </div>
        <div class="header-profile">
            <p class="header-profile__name">${dataProfile.name}</p>
            <p class="header-profile__work">${dataProfile.work}</p>
            <div class="header-profile__contact">
                <dl>
                    <dt><i class="fas fa-user"></i></dt>
                    <dd>${dataProfile.gender}</dd>
                    <dt><i class="fas fa-calendar-alt"></i></dt>
                    <dd>${dataProfile.date}</dd>
                    <dt><i class="fas fa-phone-square-alt"></i></dt>
                    <dd><a href="tel:${dataProfile.phone}">${dataProfile.phone}</a></dd>
                    <dt><i class="fas fa-envelope"></i></dt>
                    <dd><a href="mailto:${dataProfile.email}">${dataProfile.email}</a></dd>
                    <dt><i class="fas fa-map-marked-alt"></i></dt>
                    <dd>${dataProfile.address}</dd>
                </dl>
            </div>
            <div class="header-profile__social">
                <a href="${dataProfile.socials.github}" target="blank"><i class="fab fa-github"></i></a>
                <a href="${dataProfile.socials.facebook}" target="blank"><i class="fab fa-facebook-square"></i></a>
            </div>
        </div>
    `
}
function description(data) {
    return `
        <p class="section__description">${data}</p>
    `
}
function timelineItem(data) {
    var htmlArr = $.map(data, function (el) {
        return `
            <div class="timeline__item">
                <div class="timeline__item-title">${el.title}</div>
                <div class="timeline__item-date">${el.date}</div>
                <p class="timeline__item-content">${el.content}</p>
            </div>
        `
    });
    return htmlArr.join('');
}
function projects(data) {
    function stacks(data) {
        var stackArr = $.map(data, function (stack) {
            return `<li>${stack}</li>`
        });
        return stackArr.join(''); 
    }
    var htmlArr = $.map(data, function (el) {
        return`
            <div class="projects-card__wr row no-gutters" data-tag="${el.tag}">
                <div class="projects-card__img col l-5 m-12 c-12">
                    <img src="${el.img}" alt="img">
                </div>
                <div class="projects-card__info col l-7 m-12 c-12">
                    <h3 class="projects-card__title">${el.title}</h3>
                    <p class="projects-card__date">${el.date}</p>
                    <p class="projects-card__description">${el.description}</p>
                    <p class="projects-card__stack">Used stack:</p>
                    <ul class="tags">
                       ${stacks(el.stacks)}
                    </ul>
                    <div class="projects-card__link">
                        <a href="${el.view}" target="blank"><i class="fas fa-eye"></i>view</a>
                        <a href="${el.sources}" class="" target="blank"><i class="fas fa-code"></i>source</a>
                    </div>
                </div>
            </div>
        `
    });
    return htmlArr.join('');
}

//click to hide nav
function hideNav() {
    $('.header__component, .header__nav').click(function (e) { 
        e.preventDefault();
        $('.header__component--cb, .header__nav--cb').prop('checked',false);
    });
    
    $(".header__component--btn, .header__nav--btn, .header__nav--wr, .header-profile a").click(function(e) {
        e.stopPropagation();
    });
}

//scroll event-----------------------------------------------------------------------------------------------------------//

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

//click to hide header__nav, header__component--------------------------------------------------------------------------------------//


