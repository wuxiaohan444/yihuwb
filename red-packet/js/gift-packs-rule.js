$(function() {
	$('.rule-item').css({
		'overflow': 'hidden',
		'height': '50px'
	})
	$('.rule-main .iconfont').click(function() {
		let parent = $(this).parent().parent();
		let re = parent.css('height') != '50px' ? '50px' : 'auto';
		parent.css('height', re);
		if($(this).attr('index') == 1) {
			$(this).attr('index', 2);
			$(this).removeClass('icon-xiangshang right')
			$(this).addClass('icon-weibiaoti35 right')
		} else {
			$(this).attr('index', 1);
			$(this).removeClass('icon-weibiaoti35 right')
			$(this).addClass('icon-xiangshang right')
		}
	})
})