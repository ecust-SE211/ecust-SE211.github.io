const app = () => {
	const zxq = document.getElementsByClassName('zxq')[0];
	const line = document.querySelector('.line path');
	var mouseX = 0;
	var mouseY = 0;
	window.addEventListener('mousemove', debounce((event) => {
		mouseX = event.pageX;
		mouseY = event.pageY;
		const x2 = zxq.offsetLeft;
		const y2 = zxq.offsetTop;
		zxq.style.left = `${mouseX}px`;
		zxq.style.top = `${mouseY}px`;
	}, 20, false, 20))

	// 获取初始位置
	var initialTop = zxq.offsetTop;
	var initialLeft = zxq.offsetLeft;

	// 实时监听位置变化
	function checkPosition() {
		var currentTop = zxq.offsetTop;
		var currentLeft = zxq.offsetLeft;
		if (currentTop !== initialTop || currentLeft !== initialLeft) {
			initialTop = currentTop;
			initialLeft = currentLeft
			line.setAttribute('d', `M ${mouseX} ${mouseY} L ${currentLeft} ${currentTop}`);
		}

		// 继续监听
		requestAnimationFrame(checkPosition);
	}

	// 启动监听
	requestAnimationFrame(checkPosition);
}
window.onload = app;