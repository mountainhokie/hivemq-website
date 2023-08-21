$(document).ready(function () {
  $("a").on("click", function (e) {
    // Only include hash values
    if (this.hash !== "") {
      e.preventDefault();
      const hash = this.hash;
      const scrollToPos = $(hash).offset().top;

      $("html, body").animate(
        {
          scrollTop: scrollToPos,
        },
        800,
        function () {
          // Add hash to URL when done scrolling
          window.location.hash = hash;
        }
      );
    }
  });

  const tocHeight = $(".toc-content").outerHeight() * 0.78;
  $(".toc").css({
    "margin-top": tocHeight + "px",
  });
});
