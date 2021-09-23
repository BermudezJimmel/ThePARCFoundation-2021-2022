jQuery(document).ready(function() {
 	var $ = jQuery;

// Toggle Settings Panel
	var panel = $('.settings');

	panel.find('.settings-button').on('click', function(e) {
		e.preventDefault();
		panel.toggleClass('active');
	});
	$(document).on('click', function(e) {
		var clicked = $(e.target);
		if (panel.hasClass('active') && !clicked.is('.settings-button') && !clicked.closest('.settings').length) {
			panel.removeClass('active');
		}
	});

// Animation Control
	$('#set-animation').find('[type="radio"]').on('click', function() {
		var animationEffect = $(this).val(),
			animationItems = $('.scroll');

		if(animationEffect == 1) {
			animationItems.removeClass('scroll-once scroll-none');
		} else if(animationEffect == 2) {
			animationItems.removeClass('scroll-none').addClass('scroll-once');
		} else if(animationEffect == 3) {
			animationItems.removeClass('scroll-once').addClass('scroll-none');
		}
	});

// Parallax Control
	$('#set-parallax').on('change', function() {
		var parallax = $('.parallax');

		if($(this).is(':checked')) {
			parallax.removeClass('parallax-disabled');
		} else {
			parallax.addClass('parallax-disabled').css({
				backgroundPosition: '50% 0',
				backgroundAttachment: 'scroll'
			});
		}
	});

// Sticky Menu Control
	$('#set-menu').on('change', function() {
		var navigation = $('#navigation');

		if($(this).is(':checked')) {
			navigation.removeClass('sticky-menu-disabled');
			$(window).scroll();
		} else {
			navigation.removeClass('sticky').addClass('sticky-menu-disabled');
		}
	});

// Custom ScrollBar Control
	$('#set-scrollbar').on('change', function() {
		var navigation = $('#navigation');

		if($(this).is(':checked')) {
			$('html').niceScroll({
				cursorwidth: '16px',
				cursorminheight: 64,
				zindex: 9999,
				scrollspeed: 60,
				hidecursordelay: 2000
			});
		} else {
			$('html').getNiceScroll().remove();
		}
	});

// Color Schemes
	$('#set-color').find('[data-color]').on('click', function() {
		var color = $(this).data('color'),
			styleSheet = $('#color-scheme');

		if (color === '#') {
			styleSheet.attr('href', '#');
		} else {
			styleSheet.attr('href', 'style-' + color + '.css');
		}
	});
});
