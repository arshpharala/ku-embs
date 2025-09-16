// ================= HERO MENU TOGGLE =================
$(document).ready(function () {
	$(".hero__menu-toggle").on("click", function () {
		$(this).toggleClass("active");
	});
});

// ================= Carousel Swipe Helper =================
function enableSwipe(
	carouselId,
	prevBtnId = null,
	nextBtnId = null,
	customIndicators = false
) {
	const el = document.querySelector(carouselId);
	if (!el) return;

	const instance = new bootstrap.Carousel(el);
	let startX, endX;

	// Custom buttons
	if (prevBtnId) {
		document.getElementById(prevBtnId).addEventListener("click", () => {
			instance.prev();
		});
	}
	if (nextBtnId) {
		document.getElementById(nextBtnId).addEventListener("click", () => {
			instance.next();
		});
	}

	// Mouse drag
	el.addEventListener("mousedown", (e) => (startX = e.clientX));
	el.addEventListener("mouseup", (e) => {
		endX = e.clientX;
		if (startX - endX > 50) instance.next();
		else if (endX - startX > 50) instance.prev();
	});

	// Touch swipe
	el.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
	el.addEventListener("touchend", (e) => {
		endX = e.changedTouches[0].clientX;
		if (startX - endX > 50) instance.next();
		else if (endX - startX > 50) instance.prev();
	});

	// Extra: Custom indicators (for alumni)
	if (customIndicators) {
		el.addEventListener("slid.bs.carousel", function (e) {
			const index = e.to;
			document
				.querySelectorAll(".alumni-section .boxes .box")
				.forEach((box, i) => {
					box.classList.toggle("active", i === index);

					if (i === index) {
						if (!box.querySelector(".sub-box")) {
							const subBox = document.createElement("div");
							subBox.classList.add("sub-box");
							box.appendChild(subBox);
						}
					} else {
						const sub = box.querySelector(".sub-box");
						if (sub) sub.remove();
					}
				});
		});
	}

	return instance;
}

// ================= INIT CAROUSELS =================
// enableSwipe("#eventsCarousel"); // Events
// enableSwipe("#mediaCarousel", "mediaPrev", "mediaNext"); // Media
enableSwipe("#speakersCarousel", "speakersPrev", "speakersNext"); // Speakers
enableSwipe("#alumniCarousel", null, 'alumniNext', true);


