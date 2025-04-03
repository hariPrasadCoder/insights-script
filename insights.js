(function () {
  const script = document.createElement("script");
  script.src = "https://app.posthog.com/static/array.js";
  document.head.appendChild(script);

  script.onload = function () {
    window.posthog = window.posthog || [];
    const clientId = document.currentScript.getAttribute("data-project");

    window.posthog.init("phc_kLiYSRLtrulVfpgAXUATSD0uqJ3kgidQ6pbfG9jMCcd", {
      api_host: "https://app.posthog.com",
      loaded: function (ph) {
        ph.identify(clientId);
      },
    });

    // Track CTA clicks
    document.querySelectorAll("[data-cta]").forEach((btn) => {
      btn.addEventListener("click", () => {
        posthog.capture("cta_clicked", {
          label: btn.innerText,
        });
      });
    });

    // Scroll tracking
    window.addEventListener("scroll", function () {
      let scrollPercent =
        (window.scrollY + window.innerHeight) / document.body.scrollHeight;
      if (scrollPercent > 0.75) {
        posthog.capture("scroll_75_percent");
      }
    });
  };
})();
