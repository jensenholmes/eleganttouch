// ============================================================
// SmartSite Design — Modal Script
// Shared across ALL client demo sites
// ============================================================
//
// HOW TO USE IN A NEW SITE:
//   1. Copy modal.js and modal.css into your site folder
//   2. In your HTML <head>, add:
//        <link rel="stylesheet" href="modal.css">
//   3. Just before </body>, add your config + this script:
//
//        <script>
//          var SMARTSITE = {
//            businessName: "Client Business Name",
//            price: "£25",
//            paypalLink: "https://paypal.me/YOUR_LINK_HERE"
//          };
//        </script>
//        <script src="modal.js"></script>
//
//   That's it — the modal handles itself automatically.
//
// BEHAVIOUR:
//   - Shows on first page load
//   - "Browse Website" closes the modal
//   - Modal reopens every 5 clicks on the page
// ============================================================

(function () {

  // --- Config ---
  var CLICKS_TO_REOPEN = 5;

  // Read the SMARTSITE config set in the HTML (with fallbacks)
  var cfg = window.SMARTSITE || {};
  var businessName = cfg.businessName || "this business";
  var price        = cfg.price        || "£25";
  var paypalLink   = cfg.paypalLink   || "#";

  // --- State ---
  var isOpen     = false;
  var clickCount = 0;

  // --- Build the modal HTML ---
  function createModal() {
    var overlay = document.createElement("div");
    overlay.id = "ss-overlay";

    overlay.innerHTML =
      '<div id="ss-modal">' +
        '<span class="ss-tag">SmartSite Design</span>' +
        '<h2>Like what you see?</h2>' +
        '<p class="ss-body">' +
          'This website was built for <strong>' + businessName + '</strong>. ' +
          'Get it live today and start winning customers online.' +
        '</p>' +
        '<div class="ss-price">' +
          '<span class="ss-price-amount">' + price + '</span> ' +
          '<span class="ss-price-note">one-time</span>' +
        '</div>' +
        '<a href="' + paypalLink + '" class="ss-btn-buy" target="_blank" rel="noopener">' +
          'Buy Now &mdash; ' + price +
        '</a>' +
        '<button class="ss-btn-browse" id="ss-browse-btn">Browse Website</button>' +
        '<p class="ss-fine">One-time payment &bull; Hosted on your own subdomain &bull; No hidden fees</p>' +
      '</div>';

    return overlay;
  }

  // --- Show the modal ---
  function openModal() {
    document.getElementById("ss-overlay").classList.add("ss-visible");
    isOpen     = true;
    clickCount = 0;
  }

  // --- Hide the modal ---
  function closeModal() {
    document.getElementById("ss-overlay").classList.remove("ss-visible");
    isOpen     = false;
    clickCount = 0;
  }

  // --- Count clicks on the page; reopen every Nth click ---
  document.addEventListener("click", function (e) {
    // Ignore clicks while the modal is open
    if (isOpen) return;

    clickCount++;

    if (clickCount >= CLICKS_TO_REOPEN) {
      openModal();
    }
  });

  // --- Set everything up once the page is ready ---
  document.addEventListener("DOMContentLoaded", function () {

    // Inject the modal into the page
    var modal = createModal();
    document.body.appendChild(modal);

    // Show immediately on first load
    openModal();

    // "Browse Website" button — close modal and DON'T count this as a page click
    document.getElementById("ss-browse-btn").addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent this click from being counted
      closeModal();
    });

    // Clicking the dark background (outside the modal box) also closes it
    document.getElementById("ss-overlay").addEventListener("click", function (e) {
      if (e.target === this) {
        e.stopPropagation();
        closeModal();
      }
    });
  });

})();
