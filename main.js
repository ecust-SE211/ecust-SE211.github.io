const app = () => {
	const frame = document.getElementById('frame');
	const zxq = document.getElementsByClassName('zxq')[0];
	const line = document.querySelector('.line path');
	const scoreLabel = document.getElementById('score')
	let score = 0;
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
	var initialTop = zxq.offsetTop;
	var initialLeft = zxq.offsetLeft;

	function checkPosition() {
		var currentTop = zxq.offsetTop;
		var currentLeft = zxq.offsetLeft;
		if (currentTop !== initialTop || currentLeft !== initialLeft) {
			initialTop = currentTop;
			initialLeft = currentLeft
			line.setAttribute('d', `M ${mouseX} ${mouseY} L ${currentLeft} ${currentTop}`);
		}
		requestAnimationFrame(checkPosition);
	}
	requestAnimationFrame(checkPosition);
	let dots = document.getElementsByClassName('dot');
	class dotBlock {
		constructor(ele) {
			this.ele = ele;
			this.xv = Math.random() * 3 + 2;
			this.yv = Math.random() * 3 + 2;
			this.setTransition()
		}
		setTransition() {
			console.log(`top ${5000/this.yv}ms linear, left ${5000/this.xv}ms linear`)
			this.ele.style.transition =
				`top ${5000/this.yv}ms linear, left ${5000/this.xv}ms linear`
		}
	}

	var dotBlocks = []
	for (let i = 0; i < dots.length; i++) {
		dotBlocks.push(new dotBlock(dots[i]))
	}

	function changePositon() {
		var currentTop = zxq.offsetTop;
		var currentLeft = zxq.offsetLeft;
		for (let i = 0; i < dotBlocks.length; i++) {
			let ele = dotBlocks[i].ele;
			let top = ele.offsetTop;
			let left = ele.offsetLeft;
			if (top == 0) {
				ele.style.top = "100%"
			} else if (top == window.innerHeight) {
				ele.style.top = "0%"
			}
			if (left == 0) {
				ele.style.left = "100%"
			} else if (left == window.innerWidth) {
				ele.style.left = "0%"
			}
		}
		for (let i = 0; i < dots.length; i++) {
			const dot = dots[i];
			let offsetX = dot.offsetLeft - currentLeft;
			let offsetY = dot.offsetTop - currentTop;
			if (Math.abs(offsetX) < 30 && Math.abs(offsetY) < 30) {
				scoreLabel.innerHTML = `SCORE: ${++score}`
				dot.style.transition =
					`top ${Math.abs(offsetX)*200}ms linear, left ${Math.abs(offsetY)*200}ms linear`
				if (offsetX > 0) {
					dot.style.left = "100%"
				} else {
					dot.style.left = "0%"
				}
				if (offsetY > 0) {
					dot.style.top = "100%"
				} else {
					dot.style.top = "0%"
				}
				continue
			}
		}
		setTimeout(requestAnimationFrame(changePositon), 200)
	}
	requestAnimationFrame(changePositon)
	window.addEventListener("contextmenu", (event) => {
		event.preventDefault();
	});
	window.addEventListener("mousedown", (event) => {
		if (event.button === 0) {
			console.log("左键按下了！");
			const ele = document.createElement("div")
			ele.classList.add("dot")
			frame.appendChild(ele);
			dotBlocks.push(new dotBlock(ele))
		} else if (event.button === 2) {
			if (dotBlocks.length > 0)
				frame.removeChild(dotBlocks.pop().ele)
		}
	})
}
window.onload = app;