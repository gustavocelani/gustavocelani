/***************************************************************************************************************************************************/
/* Maintained by Gustavo Celani */
/* Copyright 2023 All rights reserved */
/***************************************************************************************************************************************************/
const globalVersion = 0.2;

/***************************************************************************************************************************************************/
/* iOS Devices Supported Background Attachment */
/***************************************************************************************************************************************************/
['iPhone', 'iPad', 'iPod'].forEach(iosDevice => {
    if (navigator.userAgent.includes(iosDevice)) {
        ['#header', '#gustavo', '#treinamento', '#treinamentos', '#leads', '#product', '#general', '#bio', '#palestras'].forEach(parallaxSection => {
            $(parallaxSection).addClass('ios-device');
        })
    }
});

/***************************************************************************************************************************************************/
/* Start JQuery */
/***************************************************************************************************************************************************/
(function($) {
    "use strict";

    /***************************************************************************************************************************************************/
    /* Preloader */
    /***************************************************************************************************************************************************/
    $(window).on('load', function() {
        function hidePreloader() {
            var preloader = $('.spinner-wrapper');
            setTimeout(function() {
                preloader.fadeOut(500);
            }, 500);
        }

        // Set Copyright Version Text
        $('#copyright-version-text').html('Developed and Maintained By <span class="blue">Gustavo Celani</span> - v' + globalVersion)

        // Videos
        youtubeVideoSetup("rootme-youtube-player", "6oRoklr0Fd8");

        // Dynamically Populated Content
        populateTestimonials();
        populateAgendaSlider();
        populateImagesSlider();

        // Starting Animations and Interactions
        startLightboxAnimation();
        startImageSlider();
        startCardSlider();
        hidePreloader();
    });

    /***************************************************************************************************************************************************/
    /* Navbar Scripts */
    /* jQuery to collapse the navbar on scroll */
    /***************************************************************************************************************************************************/
    $(window).on('scroll load', function() {
        if ($(".navbar").offset().top > 20) {
            $(".fixed-top").addClass("top-nav-collapse");
        } else {
            $(".fixed-top").removeClass("top-nav-collapse");
        }
    });

    /***************************************************************************************************************************************************/
    /* jQuery for page scrolling feature - requires jQuery Easing plugin */
    /***************************************************************************************************************************************************/
    $(function() {
        $(document).on('click', 'a.page-scroll', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 600, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    /***************************************************************************************************************************************************/
    /* Closes the responsive menu on menu item click */
    /***************************************************************************************************************************************************/
    $(".navbar-nav li a").on("click", function(event) {
        if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });

    /***************************************************************************************************************************************************/
    /* Rotating Text - Morphtext */
    /***************************************************************************************************************************************************/
    $("#js-rotating").Morphext({
        // The [in] animation type. Refer to Animate.css for a list of available animations.
        animation: "fadeIn",
        // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
        separator: ",",
        // The delay between the changing of each phrase in milliseconds.
        speed: 2000,
        complete: function () {
            // Called after the entrance animation is executed.
        }
    });

    /***************************************************************************************************************************************************/
    /* Card Slider - Swiper (Testimonials) */
    /***************************************************************************************************************************************************/
    function startCardSlider(){
        var cardSlider = new Swiper('.card-slider', {
            autoplay: {
                delay: 4000,
                disableOnInteraction: false
            },
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            slidesPerView: 2,
            spaceBetween: 20,
            breakpoints: {
                // when window is <= 992px
                992: {
                    slidesPerView: 1
                },
                // when window is <= 768px
                768: {
                    slidesPerView: 1
                }
            }
        });
    }

    /***************************************************************************************************************************************************/
    /* Image Slider - Swiper (Jornada) */
    /***************************************************************************************************************************************************/
    function startImageSlider() {
        var imageSlider = new Swiper('.image-slider', {
            autoplay: {
                delay: 2000,
                disableOnInteraction: false
            },
            loop: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            spaceBetween: 30,
            slidesPerView: 4,
            breakpoints: {
                // when window is <= 380px
                380: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                // when window is <= 516px
                516: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                // when window is <= 768px
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // when window is <= 992px
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                // when window is <= 1200px
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 30
                },
            }
        });
    }

    /***************************************************************************************************************************************************/
    /* Image Slider - Magnific Popup */
    /***************************************************************************************************************************************************/
    $('.popup-link').magnificPopup({
        removalDelay: 300,
        type: 'image',
        callbacks: {
            beforeOpen: function() {
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure ' + this.st.el.attr('data-effect'));
            },
            beforeClose: function() {
                $('.mfp-figure').addClass('fadeOut');
            }
        },
        gallery:{
            enabled:true //enable gallery mode
        }
    });

    /***************************************************************************************************************************************************/
    /* Lightbox - Magnific Popup */
    /***************************************************************************************************************************************************/
    function startLightboxAnimation() {
        $('.popup-with-move-anim').magnificPopup({
            type: 'inline',
            fixedContentPos: false, /* keep it false to avoid html tag shift with margin-right: 17px */
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        });
    }

    /***************************************************************************************************************************************************/
    /* Counter - CountTo */
    /***************************************************************************************************************************************************/
    var a = 0;
    $(window).scroll(function() {
        if ($('#counter').length) { // checking if CountTo section exists in the page
            var oTop = $('#counter').offset().top - window.innerHeight;
            if (a == 0 && $(window).scrollTop() > oTop) {
                $('.counter-value').each(function() {
                    var $this = $(this),
                    countTo = $this.attr('data-count');
                    $({
                        countNum: $this.text()
                    }).animate({
                        countNum: countTo
                    },
                    {
                        duration: 6000,
                        easing: 'swing',
                        step: function() {
                            $this.text($this.hasClass('plus') ? Math.floor(this.countNum) + '+' : Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text($this.hasClass('plus') ? this.countNum + '+' : this.countNum);
                            //alert('finished');
                        }
                    });
                });
                a = 1;
            }
        }
    });

    /***************************************************************************************************************************************************/
    /* Move Form Fields Label When User Types for input and textarea fields */
    /***************************************************************************************************************************************************/
    $("input, textarea").keyup(function(){
        if ($(this).val() != '') {
            $(this).addClass('notEmpty');
        } else {
            $(this).removeClass('notEmpty');
        }
    });

    /***************************************************************************************************************************************************/
    /* Back To Top Button */
    /***************************************************************************************************************************************************/
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    $(window).scroll(function() {
        if ($(window).scrollTop() > 700) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });

    /***************************************************************************************************************************************************/
    /* Removes Long Focus On Buttons */
    /***************************************************************************************************************************************************/
    $(".button, a, button").mouseup(function() {
        $(this).blur();
    });

    /***************************************************************************************************************************************************/
    /* YouTube Videos */
    /***************************************************************************************************************************************************/
    function youtubeVideoSetup(elemnetId, videoId) {
        const youtubeVideos = document.getElementsByClassName(elemnetId)
        for (let i = 0; i < youtubeVideos.length; i++) {
            youtubeVideos[i].src = 'https://www.youtube.com/embed/' + videoId
                + '?autoplay=1' // Auto Play
                + '&controls=1' // YouTube Controls
                + '&rel=0'      // Related Videos
                + '&loop=1'     // Loop
                + '&fs=1'       // Full Screen
        }
    }

    /***************************************************************************************************************************************************/
    /* Dynamically Populate Testimonials */
    /***************************************************************************************************************************************************/
    function populateTestimonials() {
        var testimonials = [
            {
                "author": "Rodrigo",
                "position": "Security Engineer - Canonical",
                "img": "rodrigo.jpeg",
                "msg": "Trabalhei com o Gustavo e ele sempre foi muito claro e objetivo, além de conseguir trazer conhecimento para todos os níveis com muita praticidade. Uma excelente oportunidade para estar em contato com um conteúdo atual e necessário."
            },
            {
                "author": "Rafaela",
                "position": "Full-Stack Developer - Sicoob Credimepi",
                "img": "rafaela.jpeg",
                "msg": "Participei da sua palestra incrível no HackTown! Ela me impactou tanto despertando meu interesse por cibersegurança que vou iniciar uma pós graduação na área!"
            },
            {
                "author": "Erik",
                "position": "Engineering Manager - Afterverse",
                "img": "erik.jpeg",
                "msg": "Recomendo não só para quem quer ingressar ou prosperar na área de cybersecurity, mas também, para profissionais de tecnologia que querem ampliar seus conhecimentos e aplicar as melhores práticas de cybersecurity."
            },
        ]

        var testimonialHtmlEntry = '';
        testimonials.forEach(testimonial => {
            testimonialHtmlEntry += '\
                <!-- Testimonial -->\n\
                <div class="swiper-slide">\n\
                    <div class="card">\n\
                        <img class="card-image" src="images/testimonials/' + testimonial['img'] + '">\n\
                        <div class="card-body">\n\
                            <p class="testimonial-text">"' + testimonial['msg'] + '"</p>\n\
                            <p class="testimonial-author">' + testimonial['author'] + '<br><span class="blue">' + testimonial['position'] + '</span></p>\n\
                        </div>\n\
                    </div>\n\
                </div> <!-- end of slide -->\n\n'
        });

        $('#testimonials-slider').html(testimonialHtmlEntry);
    }

    /***************************************************************************************************************************************************/
    /* Dynamically Populate Agenda */
    /***************************************************************************************************************************************************/
    function populateAgendaSlider() {
        var images = [
            'profile04.jpg',
            'profile05.jpg',
            'profile01.png',
        ]

        var imagesHtmlEntry = ''
        images.forEach(image => {
            imagesHtmlEntry += '\
            <div class="swiper-slide ">\n\
                <a target="_blank" href="images/gustavo/' + image + '" download>\n\
                    <img class="img-fluid" src="images/gustavo/' + image + '">\n\
                </a>\n\
            </div>\n\n'
        });

        $('#images-slider').html(imagesHtmlEntry);
    }

    /***************************************************************************************************************************************************/
    /* Dynamically Populate Imagens & Recursos Graficos */
    /***************************************************************************************************************************************************/
    function populateImagesSlider() {
        var events = [
            {
                'img': '2023 - MindTheSec.jpeg',
                'url': 'https://www.mindthesec.com.br/',
                'txt': 'Mind The Sec 2023'
            },
            {
                'img': '2023 - Cybersecurity Talks.png',
                'url': 'https://cybersecuritytalks.com.br',
                'txt': 'Cybersecurity Talks 2023'
            },
            {
                'img': '2023 - HackTown.png',
                'url': 'https://hacktown.com.br/',
                'txt': 'HackTown 2023'
            },
            {
                'img': '2023 - CompSoft.png',
                'url': 'https://inatel.br/compsoft',
                'txt': 'CompSoft 2023'
            },
        ]

        var agendaHtmlEntry = ''
        events.forEach(event => {
            agendaHtmlEntry += '\
            <div class="swiper-slide">\n\
                <a target="_blank" href="' + event['url'] + '">\n\
                    <img class="img-fluid" src="images/agenda/' + event['img'] + '">\n\
                    <p class="p-large" style="margin-top: 1rem;">' + event['txt'] + '</p>\n\
                </a>\n\
            </div>\n\n'
        });

        $('#agenda-slider').html(agendaHtmlEntry);
    }

})(jQuery);
