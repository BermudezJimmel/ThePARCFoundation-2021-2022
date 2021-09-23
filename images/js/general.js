'use strict';

jQuery(document).ready(function() {
 	var $ = jQuery,
		$window = $(window),
    	screenWidth = $window.width(),
        screenHeight = $window.height();

    $window.on('resize', function() {
        screenWidth = $window.width();
        screenHeight = $window.height();
    });

// IE<8 Warning
    if ($('html').hasClass('oldie')) {
        $('body').empty().html('Please, Update your Browser to at least IE8');
    }

// Disable Empty Links
    $('[href="#"], .btn.disabled').on('click', function(event) {
        event.preventDefault();
    });

// NiceScroll
	if($('[data-nicescroll]').length) {
		var scrollColor = $('[data-nicescroll]').data('nicescroll');

		$('html').niceScroll({
			cursorwidth: '16px',
			cursorminheight: 64,
			zindex: 9999,
			scrollspeed: 60,
			hidecursordelay: 2000
		});

		$('.nicescroll-cursors').addClass(scrollColor);
	}

// PrettyPhoto
	if ($('[data-prettyphoto]').length && screenWidth > 759) {
		$('[data-prettyphoto]').prettyPhoto();
	}

// Tooltip
    $("[data-toggle='tooltip']").tooltip();

// Placeholders
    if ($('[placeholder]').length) {
        $.Placeholder.init();
    }

// Styled Select
    if ($('select').length) {
        cuSel({changedEl: 'select', visRows: 6, itemPadding: 17});

		$('.form-control').each(function() {
			var $this = $(this);

			$this.on('change', 'input', function() {
				$this.addClass('has-value');
			});
		});
    }

// Styled Checkboxes, Radiobuttons
	$.fn.customInput = function() {
		$(this).each(function () {
			var container = $(this),
				input = container.find('input'),
				label = container.find('label');

			input.on('update', function() {
				input.is(':checked') ? label.addClass('checked') : label.removeClass('checked');
			})
			.trigger('update')
			.on('click', function() {
				$('input[name=' + input.attr('name') + ']').trigger('update');
			});
		});
	};

	$('.checkbox, .radio').customInput();

// Video Iframe ratio
	function videoRatio() {
		$('.video-player').each(function() {
			var $this = $(this),
				iframeAttrWidth = $this.attr('width'),
				iframeAttrHeight = $this.attr('height'),
				iframeWidth = $this.width(),
				iframeHeight = parseInt(iframeAttrHeight * iframeWidth / iframeAttrWidth, 10);

			$this.css('height', iframeHeight);
		});
	}

	videoRatio();

	$window.on('resize', function () {
		videoRatio();
	});

// Calendar
	$('.calendar').each(function (index) {
		var $this = $(this),
			id = $this.attr('id') ? $this.attr('id') : 'calendar-' + index;

			if (!$this.attr('id')) {
				$this.attr('id', id);
			}

		$('<div class="calendar-container" />')
			.insertAfter($this)
			.multiDatesPicker({
				dateFormat: 'yy-mm-dd',
				minDate: '-1y',
				maxDate: '+1y',
				altField: '#' + id,
				firstDay: 0,
				showOtherMonths: true
			}).prev().hide();
	});

// Main Slider
    $.fn.sliderApi = function() {
        var slider = $(this),
			items = slider.find('.item'),
            animateClass,
			testimage = items.eq(0).data('image');

		items.each(function () {
			var $this = $(this),
				imageUrl = $this.data('image');

			$this.css({
				height: screenHeight,
				lineHeight: screenHeight + 'px',
				backgroundImage: 'url(' + imageUrl + ')'
			});
		});

		$window.on('resize', function() {
			items.css({
				height: screenHeight,
				lineHeight: screenHeight + 'px'
			});
		});

		slider.append('<img src="' + testimage + '" alt="" class="testimage hidden">');
        slider.find('[data-animate-in], [data-animate-out]').addClass('animated');

        function animation(dir) {
            slider.find('.active [data-animate-' + dir + ']').each(function () {
                var $this = $(this);
				animateClass = $this.data('animate-' + dir);

				$this.addClass(animateClass);
            });
        }

		function animationReset(dir) {
			slider.find('[data-animate-' + dir + ']').each(function () {
				var $this = $(this);
				animateClass = $this.data('animate-' + dir);

				$this.removeClass(animateClass);
			});
		}

		if (Modernizr.cssanimations) {
			animation('in');

			slider.on('slid.bs.carousel', function () {
				animationReset('out');
				setTimeout(function () {
					animation('in');
				}, 0);
			});
			slider.on('slide.bs.carousel', function () {
				animationReset('in');
				setTimeout(function () {
					animation('out');
				}, 0);
			});
		}

        if (Modernizr.touch) {
            slider.find('.carousel-inner').swipe({
                swipeLeft: function() {
                    $(this).parent().carousel('prev');
                },
                swipeRight: function() {
                    $(this).parent().carousel('next');
                },
                threshold: 30
            })
        }
    };

	var mainSlider = $('#main-slider'),
		loader = $('.header').find('.loader');

	loader.removeClass('invisible');
	mainSlider.carousel({interval: 10000, pause: 'none'}).sliderApi();
	mainSlider.find('.testimage').on('load', function() {
		$(this).remove();
		loader.remove();
		mainSlider.removeClass('invisible').addClass('animated fadeIn');
		$('.navigation-placeholder, .content, .footer, .settings, .logo').removeClass('invisible');
	});

// Main Video
	var mainVideo = $('#main-video');

	mainVideo.sliderApi();
	$window.on('load', function() {
		$(this).remove();
		loader.remove();
		mainVideo.removeClass('invisible').addClass('animated fadeIn');
		$('.navigation-placeholder, .content, .footer, .settings, .logo').removeClass('invisible');
	});

	// Video in Header
	function resizeVideo() {
		$('.video-container').each(function () {
			var container = $(this),
				video = container.find('.video'),
				ratio = video.attr('width') / video.attr('height'),
				containerWidth = container.width(),
				containerHeight = container.height();

			if (containerWidth / containerHeight < ratio) {
				video.css({
					width: containerHeight * ratio,
					height: containerHeight
				});

				var videoWidth = video.width();

				video.css({
					marginLeft: (containerWidth - videoWidth) / 2
				});
			} else {
				video.css({
					width: containerWidth,
					height: containerWidth / ratio,
					marginLeft: 0
				});
			}
		});
	}

	$(window).on('load resize', function() {
		resizeVideo();
	});

// Main Header on Main Page
	var mainImage = $('#main-image');

	mainImage.sliderApi();
	mainImage.find('.testimage').on('load', function() {
		$(this).remove();
		loader.remove();
		mainImage.removeClass('invisible').addClass('animated fadeIn');
		$('.navigation-placeholder, .content, .footer, .settings, .logo').removeClass('invisible');
	});

// Main Header on Pages
	$.fn.headerApi = function() {
		var header = $(this),
			item = header.find('.item'),
			animateClass,
			testimage = item.data('image'),
			animated = false;

		item.css({
			backgroundImage: 'url(' + testimage + ')'
		});

		header.append('<img src="' + testimage + '" alt="" class="testimage hidden">');
		header.find('[data-animate-in], [data-animate-out]').addClass('animated');

		function animation() {
			header.find('[data-animate-in]').each(function () {
				var $this = $(this);
				animateClass = $this.data('animate-in');

				$this.addClass(animateClass);
				animated = true;
			});
		}

		function animationReset() {
			header.find('[data-animate-in]').each(function () {
				var $this = $(this);
				animateClass = $this.data('animate-in');

				$this.removeClass(animateClass);
				animated = false;
			});
		}

		if (Modernizr.cssanimations) {
			animation();

			$window.on('scroll', function() {
				if (header.length) {
					var top = header.offset().top,
						bottom = header.outerHeight() + top,
						scrollTop = $(this).scrollTop();
					top = top - screenHeight;

					if ((scrollTop > top) && (scrollTop < bottom)) {
						animation();
					} else {
						if (animated) {
							animationReset();
						}
					}
				}
			});
		}
	};

	var mainHeader = $('#main-header');

	mainHeader.headerApi();
	mainHeader.find('.testimage').on('load', function() {
		$(this).remove();
		loader.remove();
		mainHeader.removeClass('invisible').addClass('animated fadeIn');
		$('.settings, .logo').removeClass('invisible');
	});

// Image Gallery with Thumbs
	$.fn.imageSliderApi = function () {
		var slider = $(this),
			images = slider.find('.slider-images'),
			thumbs = slider.find('.slider-thumbs'),
			prev = slider.find('.prev'),
			next = slider.find('.next');

		images.find('li').removeClass();
		thumbs.find('li').removeClass();

		images.carouFredSel({
			prev : prev,
			next : next,
			circular: false,
			infinite: false,
			items: 1,
			auto: false,
			scroll: {
				fx: 'fade',
				onBefore: function() {
					var pos = $(this).triggerHandler('currentPosition');

					thumbs.find('li').removeClass('active');
					thumbs.find('li.item' + pos).addClass('active');
					if(pos < 1) {
						thumbs.trigger('slideTo', [pos, true]);
					} else {
						thumbs.trigger('slideTo', [pos - 1, true]);
					}
				}
			},
			onCreate: function() {
				images.find('li').each(function(i) {
					$(this).addClass('item' + i);
				});
			}
		}).trigger('slideTo', [0, true]);

		thumbs.carouFredSel({
			direction: 'up',
			auto: false,
			infinite: false,
			circular: false,
			scroll: {
				items : 1
			},
			onCreate: function() {
				thumbs.find('li').each(function(i) {
					$(this).addClass( 'item' + i ).on('click', function() {
						images.trigger('slideTo', [i, true]);
					});
				});
				thumbs.find('.item0').addClass('active');
			}
		});
	};

	var imageSlider = $('.thumbnail-slider');

	if(imageSlider.length) {
		imageSlider.each(function() {
			$(this).imageSliderApi();
		});

		$window.on('resize', function() {
			imageSlider.each(function() {
				$(this).imageSliderApi();
			});
		});
	}

// Mobile Menu (arladMenu)
    var myMenu = $('#navigation').html();

    $('body').prepend('<div id="arlad-menu" class="arlad-menu">' + myMenu + '<a href="#" id="arlad-menu-button" class="arlad-menu-button"></a></div>');

    var arladMenu = $('#arlad-menu'),
        arladMenuCall = $('#arlad-menu-button');

	function arladMenuSpy() {
		var activeMenuItemIndex = $('#navigation').find('.active').index();
		arladMenu.find('li').removeClass('active');

		if (activeMenuItemIndex != -1) {
			arladMenu.find('li').eq(activeMenuItemIndex).addClass('active');
		}
	}

    arladMenuCall.on('click', function(e) {
        e.preventDefault();
		arladMenuSpy();
        arladMenuCall.toggleClass('active');
        arladMenu.toggleClass('active');
    });
    $window.on('resize', function() {
        arladMenuCall.removeClass('active');
        arladMenu.removeClass('active');
    });
	$window.on('scroll', function() {
		arladMenuSpy();
	});
    $(document).on('click', function(e) {
        var clicked = $(e.target);
        if (arladMenu.hasClass('active') && !clicked.is('#arlad-menu-button') && !clicked.closest('#arlad-menu').length) {
            arladMenuCall.removeClass('active');
            arladMenu.removeClass('active');
        }
    });
	if (Modernizr.touch) {
		$('body').swipe({
			swipeLeft: function() {
				arladMenuCall.removeClass('active');
				arladMenu.removeClass('active');
			},
			threshold: 30
		})
	}

// Sticky Menu
	$.fn.stickyMenu = function() {
		var stickyMenu = $(this);

		function runStickyMenu() {
			stickyMenu.removeClass('sticky');

			var scrollTop = $window.scrollTop(),
				stickyMenuOffset = stickyMenu.offset().top;

			if (scrollTop > stickyMenuOffset) {
				stickyMenu.addClass('sticky');
			}
		}

		if(!stickyMenu.hasClass('sticky-menu-disabled')) {
			runStickyMenu();
		}

		$window.on('scroll', function () {
			if(!stickyMenu.hasClass('sticky-menu-disabled')) {
				runStickyMenu();
			}
		});
		$window.on('resize', function () {
			if(!stickyMenu.hasClass('sticky-menu-disabled')) {
				runStickyMenu();
			}
		});
	};

	$('.sticky-menu').each(function () {
		$(this).stickyMenu();
	});

// Parallax
	$.fn.parallax = function() {
		var parallax = $(this),
			xPos = parallax.data('position') ? parallax.data('position') : 'center',
			speed = parallax.data('speed') ? parallax.data('speed') : .1;

		function runParallax() {
			var scrollTop = $window.scrollTop(),
				offsetTop = parallax.offset().top,
				parallaxHeight = parallax.outerHeight();

			if (scrollTop + screenHeight > offsetTop && offsetTop + parallaxHeight > scrollTop) {
				var yPos = parseInt((offsetTop - scrollTop) * speed, 10);

				parallax.css({
					backgroundPosition: xPos + ' ' + yPos + 'px'
				});
			}
		}

		if (screenWidth > 1000 && !parallax.hasClass('parallax-disabled')) {
			parallax.css({
				backgroundAttachment: 'fixed'
			});
			runParallax();
		}
		$window.on('scroll', function () {
			if (screenWidth > 1000 && !parallax.hasClass('parallax-disabled')) {
				parallax.css({
					backgroundAttachment: 'fixed'
				});
				runParallax();
			}
		});
		$window.on('resize', function () {
			if (screenWidth > 1000 && !parallax.hasClass('parallax-disabled')) {
				parallax.css({
					backgroundAttachment: 'fixed'
				});
				runParallax();
			} else {
				parallax.css({
					backgroundPosition: '50% 0',
					backgroundAttachment: 'scroll'
				});
			}
		});
	};

	$('.parallax').each(function () {
		$(this).parallax();
	});

// Skills Counter
	$.fn.counter = function () {
		var counter = $(this),
			countTo = counter.text(),
			countTime = counter.data('duration') ? counter.data('duration') : 3,
			countStep = counter.data('step') ? counter.data('step') : .1,
			count = 0,
			counting = false;

		function countSkills() {
			counter.text('0');
			counting = true;

			var	interval = setInterval(function () {
				count = count + 1;
				counter.text(parseInt(countTo * count * countStep / countTime, 10));

				if (count >= countTime / countStep) {
					//counting = false;
					count = 0;
					clearInterval(interval);
				}
			}, countStep * 1000);
		}

		$window.on('scroll', function() {
			var top = counter.offset().top,
				bottom = counter.outerHeight() + top,
				scrollTop = $(this).scrollTop();
			top = top - screenHeight;

			if ((scrollTop > top) && (scrollTop < bottom)) {
				if (!counting) {
					countSkills();
				}
			} else {
				counting = false;
			}
		});
	};

	$('.counter').each(function () {
		$(this).counter();
	});

// Testimonials
	$.fn.testimonialsCarousel = function() {
		var container = $(this),
			testimonials = container.find('ul'),
			prev = container.find('.prev'),
			next = container.find('.next');

		testimonials.carouFredSel({
			swipe : {
				onTouch: true
			},
			prev: prev,
			next: next,
			items: {visible: 1},
			auto: {
				play: true,
				timeoutDuration: 10000
			},
			scroll: {
				items: 1,
				duration: 500,
				fx: "crossfade",
				pauseOnHover:true
			}
		})
	};

	$window.on('load', function() {
		$('.testimonials-slider').each(function () {
			$(this).removeClass('hidden').testimonialsCarousel();
		});
	});
	$window.on('resize', function() {
		$('.testimonials-slider').each(function () {
			$(this).testimonialsCarousel();
		});
	});

// Minigallery
	$.fn.miniGallery = function() {
		var container = $(this),
			gallery = container.find('ul'),
			prev = container.find('.prev'),
			next = container.find('.next');

		gallery.carouFredSel({
			swipe : {
				onTouch: true
			},
			prev: prev,
			next: next,
			auto: {
				play: true,
				timeoutDuration: 5000
			},
			scroll: {
				items: 1,
				duration: 500,
				pauseOnHover:true
			}
		})
	};

	$window.on('load', function() {
		$('.gallery').each(function () {
			$(this).miniGallery();
		});
	});
	$window.on('resize', function() {
		$('.gallery').each(function () {
			$(this).miniGallery();
		});
	});

// Portfolio Categories
	$.fn.portfolioCarousel = function () {
		var container = $(this),
			portfolio = container.find('ul'),
			prev = container.find('.prev'),
			next = container.find('.next');

		portfolio.carouFredSel({
			swipe : {
				onTouch: true
			},
			prev: prev,
			next: next,
			items: {visible: "variable"},
			auto: false,
			scroll: {
				items: 1,
				duration: 1000,
				easing: 'quadratic'
			}
		})
	};

	$window.on('load', function() {
		$('.portfolio-categories').each(function () {
			var $this = $(this);
			$this.removeClass('hidden').portfolioCarousel();
		});
	});
	$window.on('resize', function() {
		$('.portfolio-categories').each(function () {
			$(this).portfolioCarousel();
		});
	});

// Portfolio Sorting
	if($('.portfolio-list').length) {
		$window.on('load', function() {
			$('.portfolio-list').isotope({
				transitionDuration: '.6s'
			});
		});

		$window.on('resize', function() {
			$('.portfolio-list').isotope('layout');
		});

		$('.portfolio-categories').on('click', 'li', function() {
			var item = $(this),
				category = item.data('category'),
				search = category ? function() {
					var item = $(this),
						name = item.data('category') ? item.data('category') : '';
					return name.match(new RegExp(category));
				} : '*';

			item.addClass('active').siblings().removeClass('active');
			$('.portfolio-list').isotope({
				filter : search
			});
		});
	}

// Google Map
	if ($('#map').length) {
		var map = $("#map"),
			tooltip = map.siblings('.tooltip-holder').html(),
			location = map.data('location');

			map.gMap({
			markers: [{
				latitude: location[0],
				longitude: location[1],
				html: tooltip,
				popup: false,
				icon: {
					image: 'images/gmap-flag.png',
					iconsize: [64,64],
					iconanchor: [12,64],
					infowindowanchor: [0,0]
				}
			}],
			zoom: 15,
			scrollwheel: false
		});

		$('.show-map').on('click', function(e) {
			e.preventDefault();

			var container = $(this).closest('.location');

			if (Modernizr.cssanimations) {
				container.find('.map-overlay').addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
					$(this).removeClass('animated fadeOut').addClass('hidden');
					$(this).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
				});
			} else {
				container.find('.map-overlay').addClass('hidden');
			}

			container.find('.hide-map').addClass('active');
		});

		$('.hide-map').on('click', function(e) {
			e.preventDefault();

			var container = $(this).closest('.location');

			if (Modernizr.cssanimations) {
				container.find('.map-overlay').removeClass('hidden').addClass('animated fadeIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
					$(this).removeClass('animated fadeIn');
					$(this).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
				});
			} else {
				container.find('.map-overlay').removeClass('hidden');
			}

			container.find('.hide-map').removeClass('active');
		});
	}

// Smooth Scroll to Anchors
	$('.anchor[href^="#"]').on('click', function(e) {
		e.preventDefault();
		var speed = 1,
			boost = 1,
			offset = 5,
			target = $(this).attr('href'),
			currPos = parseInt($window.scrollTop(), 10),
			targetPos = target!="#" && $(target).length==1 ? parseInt($(target).offset().top, 10)-offset : currPos,
			distance = targetPos-currPos,
			boost2 = Math.abs(distance*boost/1000);
		$("html, body").animate({ scrollTop: targetPos }, parseInt(Math.abs(distance/(speed+boost2)), 10));
	});

// Back to Top Button
	var toTop = $('#toTop'),
		becomeVisible = toTop.data('become-visible') ? toTop.data('become-visible') : 600;

	function backToTop() {
		if($window.scrollTop() > becomeVisible) {
			toTop.addClass('active');
		}
		else {
			toTop.removeClass('active');
		}
	}

	backToTop();

	$window.on('scroll', function() {
		backToTop();
	});

// Animate Things
	$(".scroll").each(function() {
		var block = $(this);

		$window.on('scroll', function() {
			var top = block.offset().top,
				bottom = block.outerHeight() + top,
				scrollTop = $(this).scrollTop();
			top = top - screenHeight;

			if ((scrollTop > top) && (scrollTop < bottom) && screenWidth > 1000 && !block.hasClass("scroll-none")) {
				if (!block.hasClass("animated")) {
					block.addClass("animated");
				}
			} else if(!block.hasClass("scroll-once")) {
				block.removeClass("animated");
			}
		});
	});

// Page Smooth Scroll
	var scrollTime = .4,
		scrollDistance = 200,
		mobile_ie = -1 !== navigator.userAgent.indexOf("IEMobile");

	function smoothScrollListener(event) {
		event.preventDefault();

		var delta = event.wheelDelta / 120 || -event.detail / 3,
			scrollTop = $window.scrollTop(),
			finalScroll = scrollTop - parseInt(delta * scrollDistance);

		TweenLite.to($window, scrollTime, {
			scrollTo: {
				y: finalScroll,
				autoKill: !0
			},
			ease: Power1.easeOut,
			autoKill: !0,
			overwrite: 5
		});

	}

	if (!$('html').hasClass('touch') && !mobile_ie) {

		if (window.addEventListener) {
			window.addEventListener('mousewheel', smoothScrollListener, false);
			window.addEventListener('DOMMouseScroll', smoothScrollListener, false);
		}
	}
});
