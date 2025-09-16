// ================= Shared Tiny Slider Config =================
const baseConfig = {
	gutter: 20,
	speed: 1000,
	slideBy: 1,
	mouseDrag: true,
	autoplay: true,
	loop: true,
	autoplayButtonOutput: false,
	nav: false,
};

// ================= Event Slider =================
const eventSlider = tns({
	...baseConfig,
	container: ".event-slider",
	items: 3,
	controls: false,
	responsive: {
		0: { items: 1 },
		768: { items: 2 },
		1440: { items: 3 },
	},
});

// ================= Media Slider =================
const mediaSlider = tns({
	...baseConfig,
	container: ".media-slider",
	items: 3,
	controlsContainer: "#media-slider-controls",
	controls: true,
	responsive: {
		0: { items: 1 },
		768: { items: 2 },
		1440: { items: 3 },
	},
});

// // ================= Alumni Slider (Vertical) =================
// const alumni = tns({
// 	...baseConfig,
// 	container: ".alumni-carousel",
// 	items: 1,
// 	axis: "vertical",
// 	controls: false,
// });

// ================= Alumni Helper Function =================
function updateAlumniNav(current) {
  // Remove all active states
  $(".alumni-section .boxes .box").removeClass("active-box");

  // Add active state to all boxes with the same index
  $(".alumni-section .boxes").each(function () {
    $(this).find(".box").eq(current).addClass("active-box");
  });
}

// ================= Alumni Arrow =================
$("body").on("click", ".alumniNext", function () {
  alumni.goTo("next");

  // Sync after slide change
  alumni.events.on("indexChanged", function (info) {
    updateAlumniNav(info.index);
  });
});

// ================= Alumni Nav Boxes =================
$("body").on("click", ".alumni-section .boxes .box", function () {
  const current = $(this).index();

  // Move slider
  alumni.goTo(current);

  // Sync active state
  updateAlumniNav(current);
});

