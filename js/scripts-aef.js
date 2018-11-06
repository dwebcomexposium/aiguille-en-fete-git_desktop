;(function($, window, document, undefined) {
	var $win             = $(window);
	var $doc             = $(document);
	var wrappedElements  = '.gla-item-title, .block.partner .link-view-all, .list-articles.slider .btn-primary, .nf-form-submit .btn-primary, .article_list .la-item .link-read-more, .article-wrapper h2, .article-wrapper h4, .focus1 a, .focus2 a';
	var animatedElements = '.la-list .la-item, .section, .section-promotions, .section-features, .social-sharing, .article-navigation, .cl-content';

	// quicklings header
	function cloneQuicklinks() {
		var $clone = $('.block.quicklinks').clone();

		$('.header__content').prepend($clone);
	}

	// Fix header
	function fixHeader(winST) {
		var $wrapper = $('.global-wrapper');
		var $header = $('.site-banner');
		var mainOT = $('#main').offset().top;

		if (winST > mainOT && !$header.hasClass('fixed')) {
			$wrapper.css({
				'paddingTop': $header.outerHeight()
			});

			$header.addClass('fixed');
		} else if (winST < mainOT) {
			$header.removeClass('fixed');

			$wrapper.css({
				'paddingTop': 0
			});
		}
	}

	
	function animateElement(winST) {
		var $animate = $(animatedElements);

		$animate.each(function(){
			var $this = $(this);
			var offset = $this.offset().top;

			if (winST + ($win.outerHeight() * 1.15) > offset) {
				$this.addClass('animated');
			}
		});

		if (winST + $win.outerHeight() > $('.site-footer').offset().top) {
			$animate.addClass('animated');
		}
	}

	// Check
	function hideElementsOnClick($target, element, className, innerElement) {
		element = typeof innerElement != 'undefined' ? innerElement : element;

		if (!$target.is(element + ', ' + element + ' *, .js-toggle.' + className + ', .js-toggle.' + className + ' *')) {
			$('.' + className).each(function(){
				$(this).removeClass(className);
			});
		}
	}

	// Prepare sliders
	function prepareSlider($slider) {
		var $sliderClone = $slider.clone();

		$slider.after($sliderClone);
		$slider.remove();

		$sliderClone
			.attr('style', '')
			.find('.slider-content')
				.attr('style', '');
	}

	// Start Slider
	function startSlider($slider, options) {
		var $slidesContainer = $slider.find('.slider-content');

		$slidesContainer.carouFredSel(options);
	}

	// Wrap button elements
	$(wrappedElements).wrapInner('<span></span>');

	// Quicklinks clone
	cloneQuicklinks();

	// Search 
	$('.gsf-trigger').on('click', function(e){
		e.preventDefault();

		var $this 		= $(this);
		var $searchForm = $('.global-search-form');

		$searchForm.toggleClass('search-visible');

		if ($searchForm.hasClass('search-visible')) {
			setTimeout(function() {
				$searchForm
					.find('.gsf-input')
						.focus();
			}, 50);
		}
	});

	// Tabs
	$('.tabs__nav a')
				.off('click')
				.on('click', function(e){
					e.preventDefault();

					var $this = $(this);

					$this
						.parent()
							.add($($this.attr('href')))
							.addClass('active')
							.siblings()
								.removeClass('active');
				});
	
	// Close elements 
	$doc.on('click', function(e){
		var $target = $(e.target);

		hideElementsOnClick($target, '.global-search-form', 'search-visible');
	});

	// Animated elements
	if (animatedElements != '') {
		$(animatedElements).addClass('animate');
	}

	// AEF pro partner
	if ($('.aefpro .block.partner').length) {
		$('.aefpro .block.partner .pg-item')
			.unwrap()
			.parent()
				.removeClass()
					.addClass('pg-item-group');
	}

	if ($('.article-title img').length) {
		$('.article-title').addClass('has-image');
	}

	// Newsletter 
	 if ($('.newsletter-form').length) {
	 	var $form = $('.newsletter-form');

	 	$form
	 		.detach()
	 		.appendTo('body');
	 	$form
	 		.find('.nf-form-input input')
	 		.attr('placeholder', 'Votre email');
	 	$form
	 		.find('.nf-main-content')
	 		.append('<a href="#" class="form-close"/>');

	 	$('[href*="#newsletter"]').on('click', function(e){
	 		e.preventDefault();

	 		$form.addClass('form-shown');
	 	});

	 	$doc.on('click', function(e){
	 		var $target = $(e.target);

	 		if (($target.is('.form-close, .form-close *') || !$target.is('.nf-main-content, .nf-main-content *, [href*="#newsletter"], [href*="#newsletter"] *')) && $form.hasClass('form-shown')) {
	 			e.preventDefault();

	 			$form.removeClass('form-shown');
	 		}

	 		if (!$target.is('.lang-switcher, .lang-switcher * ')) {
	 			$('.lang-switcher').removeClass('is-visible');
	 		}
	 	});

	 	if (window.location.href.indexOf('#newsletter') >= 0) {
	 		$form.addClass('form-shown');
	 	}
	 }

	// Check if 7 partner
	if ($('.block.partner .pg-item').length > 6) {
		$('.block.partner .pg-item-group').addClass('alt');
	}

	// Homepage slider
	if ($('.list-articles.slider .la-slider').length) {
		prepareSlider($('.list-articles.slider .la-slider'));

		$('.list-articles.slider .la-item img').wrap('<div class="la-item-image-container"></div>');
		$('.list-articles.slider .slider-pagin').after('<div class="slider__actions"><span class="slider__prev"><i class="ico-arrow-left"></i></span><span class="slider__next"><i class="ico-arrow-right"></i></span></div>');

		$win.on('load', function(){
			startSlider($('.list-articles.slider .la-slider'), {
				width: '100%',
				items: 1,
				responsive: true,
				scroll: { 
					fx: 'fade',
					duration: 900,
					onBefore: function() {
						$(this)
								.find('.la-item.active')
									.removeClass('active');
					},
					onAfter: function() {
						$(this)
								.find('.la-item:first-child')
									.addClass('active');
					}
				},
				swipe: {
					onTouch: true,
					onMouse: false
				},
				auto: {
					play: true,
					timeoutDuration: 7000
				},
				pagination: {
					container: '.list-articles.slider .slider-pagin'
				},
				prev: {
					button: '.list-articles.slider .slider__prev'
				},
				next: {
					button: '.list-articles.slider .slider__next'
				},
				onCreate: function() {
					$(this)
							.find('.la-item:first-child')
								.addClass('active');
				},
				infinite: true
			});
		});
	}

	// Home slider animations
	if ($('.list-articles.animations .la-slider').length) {
		$('.list-articles.animations .la-item:nth-child(even)').addClass('even');
		$('.list-articles.animations .la-item img').wrap('<div class="la-item-image-container"></div>');

		if ($('.list-articles.animations .la-item').length > 5) {
			$('.list-articles.animations .slider-pagin').after('<div class="slider__actions"><span class="slider__prev"><i class="ico-arrow-left-big"></i></span><span class="slider__next"><i class="ico-arrow-right-big"></i></span></div>');
		}

		$win.on('load', function(){
			startSlider($('.list-articles.animations .la-slider'), {
				width: '100%',
				items: 5,
				scroll: { 
					duration: 900,
					items: 1
				},
				swipe: {
					onTouch: true,
					onMouse: false
				},
				auto: {
					play: false
				},
				prev: {
					button: '.list-articles.animations .slider__prev'
				},
				next: {
					button: '.list-articles.animations .slider__next'
				},
				infinite: true
			});

		});
	}

	$win.on('load', function(){
		$('#main').addClass('loaded');
	}).on('load scroll', function(){
		var winST = $win.scrollTop();

		fixHeader(winST);
		animateElement(winST);
	});
})(jQuery, window, document);
