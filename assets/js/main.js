//rest API--------------------------------------------------------------------------------------//
//deploy
var dataAPI = "https://quangtuan28200.github.io/myCV/dataVN.json";
//dev
// var dataAPI = "../../dataVN.json";
fetch(dataAPI)
  .then((response) => response.json())
  .then((data) => {
    var dataProfile = data.profile;
    var dataHello = data.hello;
    var dataResume = data.resume;
    var dataSkills = data.skills;
    var dataProjects = data.projects;
    var dataDownload = data.download;

    //profile
    $(".header__wrap").append(profile(dataProfile));
    //hello
    renderDescription("#hello", dataHello);
    // renderDownloadBtn(dataDownload);
    //resume
    // renderDescription("#resume", dataResume.description);
    renderTimelineItem(".career", dataResume.career);
    renderTimelineItem(".education", dataResume.education);
    //skills
    renderTimelineItem(".pro", dataSkills.professional);
    renderTimelineItem(".add", dataSkills.additional);
    //project
    $(".projects-card").append(projects(dataProjects));
  })
  .then(() => {
    setTimeout(() => {
      $(".loader").fadeOut(400);
    }, 400);
  })
  .catch((err) => console.log(err));

//render
function renderDescription(selector, data) {
  $(`${selector} .section__title`).after(description(data));
}
function renderDownloadBtn(data) {
  $(".section__description").after(dowloadBtn(data));
}
function renderTimelineItem(selector, data) {
  $(`${selector} .timeline__title`).after(timelineItem(data));
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
                <a href="${dataProfile.socials.github}" target="_blank"><i class="fab fa-github"></i></a>
                <a href="${dataProfile.socials.facebook}" target="_blank"><i class="fab fa-facebook-square"></i></a>
            </div>
        </div>
    `;
}
function description(data) {
  return `
        <p class="section__description">${data}</p>
    `;
}
function dowloadBtn(data) {
  return `
        <a target="_blank" href="${data}"  class="section__btn site-btn" ><i class="fas fa-download"></i>dowload cv</a>
    `;
}
function timelineItem(data) {
  var htmlArr = $.map(data, function (el) {
    return `
            <div class="timeline__item">
                <div class="timeline__item-title">${el.title}</div>
                <div class="timeline__item-date">${el.date}</div>
                <p class="timeline__item-content">${el.content}</p>
            </div>
        `;
  });
  return htmlArr.join("");
}
function projects(data) {
  function stacks(data) {
    var stackArr = $.map(data, function (stack) {
      return `<li>${stack}</li>`;
    });
    return stackArr.join("");
  }
  var htmlArr = $.map(data, function (el) {
    return `
            <div class="projects-card__wr row no-gutters" data-tag="${el.tag}">
                <div class="projects-card__img col l-5 m-12 c-12">
                    <a href="${el.view}" target="_blank">
                        <img src="${el.img}" alt="img">
                    </a>
                </div>
                <div class="projects-card__info col l-7 m-12 c-12">
                    <div class="projects-card__detail">
                        <h3 class="projects-card__title">${el.title}</h3>
                        <p class="projects-card__date">${el.date}</p>
                        <p class="projects-card__description">${
                          el.description
                        }</p>
                        <p class="projects-card__stack">Used stack:</p>
                        <ul class="tags">
                        ${stacks(el.stacks)}
                        </ul>
                    </div>
                    <div class="projects-card__link">
                        <a href="${
                          el.view
                        }" target="_blank"><i class="fas fa-eye"></i>view</a>
                        <a href="${
                          el.sources
                        }" target="_blank"><i class="fas fa-code"></i>source</a>
                    </div>
                </div>
            </div>
        `;
  });
  return htmlArr.join("");
}

//scroll event-----------------------------------------------------------------------------------------------------------//

$(window).scroll(function () {
  var scrollDistance = $(window).scrollTop();
  if (scrollDistance > 0) {
    $(".header__nav").addClass("header__nav--active");
  } else {
    $(".header__nav").removeClass("header__nav--active");
  }
  $("html").attr("scroll", scrollDistance);
  // $('.header__component').attr('width', $('.header__component').width())
});
//-----------------------------------------------------------------------------------------------------------//

//ACTIVE BTN WHEN SCROLL
$("a[data-scroll]").click(function (e) {
  e.preventDefault();

  //active effect
  // $('a[data-scroll].active').removeClass('active');
  // $(this).addClass('active');

  //get name selector tag a
  var target = "#" + $(this).data("scroll");
  //get selector a
  var $target = $(target);
  //Animate the scroll to, include easing lib if you want more fancypants easings
  $("html, body")
    .stop()
    .animate({
      scrollTop: $target.offset().top - 30,
    });
});

$(window).scroll(function () {
  var scrollDistance = $(window).scrollTop();
  // Assign active class to nav links while scolling
  $(".page-section").each(function (i) {
    if ($(window).scrollTop() > 0) {
      if ($(this).position().top - $(window).height() * 0.4 <= scrollDistance) {
        //active effect
        $(".header__nav a.active").removeClass("active");
        $(".header__nav a").eq(i).addClass("active");

        //typing efftect
        var textLength = $(this).find(".section__title").text().length;
        $(this).find(".section__title").css("--step", textLength);

        //section__wr effect
        $(this).find(".section__wr").addClass("active");
      }
    } else {
      $(".header__nav a.active").removeClass("active");
    }
  });
});

//project redirect--------------------------------------------------------------------------------------//

$("a[data-target-tag]").click(function (e) {
  e.preventDefault();
  var target = $(this).data("target-tag");

  $("a[data-target-tag].active").removeClass("active");
  $(this).addClass("active");

  $(".projects-card__wr[data-tag]").each(function () {
    var tag = $(this).data("tag");
    if (target == "all") {
      $(this).fadeIn(800);
    } else {
      $(this).css("display", "none");
      if (target === tag) {
        $(this).fadeIn(800);
      }
    }
  });
});

//change lang ----------------------------------------------------------------------------------------
var tnum = "en";

$(document).ready(function () {
  $(document).click(function (e) {
    $(".translate_wrapper, .more_lang").removeClass("active");
  });

  $(".translate_wrapper .current_lang").click(function (e) {
    e.stopPropagation();
    $(this).parent().toggleClass("active");

    setTimeout(function () {
      $(".more_lang").toggleClass("active");
    }, 5);
  });

  $(".more_lang .lang").click(function () {
    $(this).addClass("selected").siblings().removeClass("selected");
    $(".more_lang").removeClass("active");

    let lang = $(this).children().text();

    $(".current_lang .lang-txt").text(lang);
  });
});

function getData(lang) {
  return lang === "vn" ? "../../dataVN.json" : "../../dataEN.json";
}

//back to top ----------------------------------------------------------------------------------------
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.documentElement.scrollTop > 100) {
    $("#backToTop").fadeIn();
    document.getElementById("backToTop").style.bottom = "60px";
  } else {
    document.getElementById("backToTop").style.bottom = "40px";
    $("#backToTop").fadeOut();
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  $("html, body").animate({ scrollTop: 0 }, 300);
}
