window.onload = function() {
	// 顶部搜索区域颜色加深
	deepen();

	// 秒杀倒计时
	countdown();

	// 滑动窗口
	slide();
};

function deepen() {
	var topSearch = document.querySelector(".jd-top");
	var slider = document.querySelector(".jd-slider");
	var height = slider.offsetHeight;

	window.onscroll = function() {
		var bodyScrollTop = document.documentElement.scrollTop ||
			document.body.scrollTop;
		var opacity = 0;
		var maxOpacity = 0.8;

		if (bodyScrollTop > height) {
			opacity = maxOpacity;
		}
		else {
			opacity = bodyScrollTop / height * maxOpacity;
		}

		topSearch.style.background = "rgba(255, 0, 0," + opacity + ")";
	};
}

var seckill = document.querySelector(".jd-seckill");
var timeSpans = seckill.querySelectorAll("span");
var time = 5 * 60 * 60 + 1;
var timer;

function countdown() {
	if (time <= 0) {
		clearTimeout(timer);
		return;
	}

	time --;

	var hour = Math.floor(time / 3600);
	var minute = Math.floor(time / 60) % 60;
	var second = time % 60;

	timeSpans[0].innerHTML = Math.floor(hour / 10);
	timeSpans[1].innerHTML = hour % 10;
	timeSpans[3].innerHTML = Math.floor(minute / 10);
	timeSpans[4].innerHTML = minute % 10;
	timeSpans[6].innerHTML = Math.floor(second / 10);
	timeSpans[7].innerHTML = second % 10;

	timer = setTimeout(countdown, 1000);
}

function slide() {
	var slider = document.querySelector(".jd-slider");
	var sliderPics = slider.querySelector("ul");
	var sliderBtnsParent = slider.querySelector(".jd-slider-btns");
	var sliderBtns = sliderBtnsParent.querySelectorAll("span");
	var sliderWidth = slider.offsetWidth;
	var index = 1;
	var sliderLoop;

	window.onresize = function() {
		if (sliderLoop !== null) {
			clearInterval(sliderLoop);
		}
		sliderWidth = slider.offsetWidth;
		removeTransition();
		setTransform(-index * sliderWidth);
		sliderLoop = setInterval(sliderLoopDeal, 3000);
	};

	addTransition = function() {
		sliderPics.style.transition = "all, 0.3s";
		sliderPics.style.webkitTransition = "all, 0.3s";
	};

	removeTransition = function() {
		sliderPics.style.transition = "none";
		sliderPics.style.webkitTransition = "none";
	};

	setTransform = function(x) {
		sliderPics.style.transform = "translateX(" + x + "px)";
		sliderPics.style.webkitTransform = "translateX(" + x + "px)";
	};

	setPoint = function() {
		for (let i = 0; i < sliderBtns.length; i++) {
			sliderBtns[i].className = "";
		}
		sliderBtns[index - 1].className = "alive";
	};

	sliderLoopDeal = function() {
		index++;
		addTransition();
		setTransform(-index * sliderWidth);
	};

	sliderLoop = setInterval(sliderLoopDeal, 3000);


	slideEnd = function() {
		if (index >= 9) {
			index = 1;
		}
		if (index <= 0) {
			index = 8;
		}
		removeTransition();
		setTransform(-index * sliderWidth);
		setPoint();
	};

	sliderPics.addEventListener("transitionend", slideEnd);
	sliderPics.addEventListener("webkitTransitionEnd", slideEnd);


	var startX;
	var currentX;
	var endX;
	var distanceX;

	sliderPics.addEventListener("touchstart", function(e) {
		clearInterval(sliderLoop);
		startX = e.changedTouches[0].clientX;
	});

	sliderPics.addEventListener("touchmove", function(e) {
		currentX = e.changedTouches[0].clientX;
		distanceX = currentX - startX;
		setTransform(-index * sliderWidth + distanceX);
	});

	sliderPics.addEventListener("touchend", function(e) {
		endX = e.changedTouches[0].clientX;
		distanceX = endX - startX;

		if (Math.abs(distanceX) > (sliderWidth / 3)) {
			if (distanceX < 0) {
				index++;
			}
			else {
				index--;
			}
		}
		
		addTransition();
		setTransform(-index * sliderWidth);
		sliderLoop = setInterval(sliderLoopDeal, 3000);
	});
}