$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1500,
        adaptiveHeight: false,
        arrows: true,
        prevArrow: '<button type="button" class="prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="next"><img src="icons/right.svg"></button>',
        responsive: [
            {
              breakpoint: 992,
              settings: {
                dots: false,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 400
              }
            },
            {
                breakpoint: 600,
                settings: {
                  dots: false,
                  arrows: false,
                  autoplay: true,
                  autoplaySpeed: 300
                }
              },
          ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item_back');

    //modal
    
    $('[data-modal=consultation] ').on('click', function () {
      $('.overlay, #consultation').fadeIn("slow");
    });
    $('.modal__close').on('click' , function() {
      $('.overlay, #consultation, #thinks, #order').fadeOut('fast');
    })
    $('.button_mini').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn("slow");
      })
    });
    //validate
    function validateForms(form) {
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста введите свое имя",
            minlength: jQuery.validator.format("Введите {0} символов")
          },
          email: {
            required: "Пожалуйста введите свою почту",
            email: "Неправильно введен адрес почты"
          },
          phone: "Пожалуйста введите номер телефона",
        }
      });
    };
    validateForms('#consultation-form');
    validateForms('#order form');
    validateForms('#consultation form');
  //маска для ввода номера телефона
    $('input[name=phone]').mask("+7 (999) 999-9999");
// отправка формы
    $('form').submit(function(e) {
      e.preventDefault();                 //е отключает стандартное поведение браузера перезагрузки страницы не будет
      $.ajax({
        type:"POST",
        url:"mailer/smart.php",
        data:$(this).serialize()
      }).done(function() {
        $(this).find('input').val('');
        $('#consultation, #order').fadeOut();
        $('.overlay, #thinks').fadeIn('slow');

        $('form').trigger('reset');

        return false;
      });
    });

    //плавный скролл
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn('');
      } else {
        $('.pageup').fadeOut('');
      }
    });

    // скрипт плавного прокручивания вверх страницы, готовый скрипт с CDN
    $("a[href='#up']").click(function() {
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });
    new WOW().init();
  });

// const slider = tns({
//   container: '.carousel__inner',
//   items: 1,
//   slideBy: 'page',
//   autoplay: false,
//   controls:false,
//   nav:false,
// });

// document.querySelector('.prev').addEventListener('click' , function () {
//   slider.goTo('prev');
// });

// document.querySelector('.next').addEventListener('click' , function () {
//   slider.goTo('prev');
// });