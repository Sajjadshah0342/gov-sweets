(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

/* whatsapp chat widget code */

let wsStarted = false;
let wsStep = 0;
let wsIsCustom = false;

let wsOrder = {
  category: "",
  item: "",
  quantity: "",
  address: ""
};

/* =========================
   TOGGLE CHAT
========================= */
function wsToggleChat() {
  let widget = document.getElementById("wsChatWidget");

  if (widget.style.display === "block") {
    widget.style.display = "none";
  } else {
    widget.style.display = "block";

    if (!wsStarted) {
      wsStartChat();
      wsStarted = true;
    }
  }
}

/* =========================
   MESSAGE
========================= */
function wsAddMsg(text, type) {
  let div = document.createElement("div");
  div.className = "ws-msg " + type;
  div.innerText = text;
  document.getElementById("wsChatBox").appendChild(div);
}

/* =========================
   OPTIONS
========================= */
function wsShowOptions(list) {
  let options = document.getElementById("wsOptions");
  options.innerHTML = "";
  options.style.display = "flex";

  list.forEach(text => {
    let btn = document.createElement("button");
    btn.className = "ws-btn";
    btn.innerText = text;
    btn.onclick = () => wsHandleInput(text);
    options.appendChild(btn);
  });
}

/* =========================
   START CHAT (RESET SAFE)
========================= */
function wsStartChat() {
  wsStep = 0;
  wsIsCustom = false;

  wsOrder = {
    category: "",
    item: "",
    quantity: "",
    address: ""
  };

  document.getElementById("wsChatBox").innerHTML = "";
  document.getElementById("wsOptions").style.display = "flex";
  document.getElementById("wsCustomInputBox").style.display = "none";
  document.getElementById("wsAddressBox").style.display = "none";

  wsAddMsg("What would you like to order?", "ws-bot");

  wsShowOptions(["Sweets 🍩", "Food 🍽️"]);
}

/* =========================
   HANDLE INPUT
========================= */
function wsHandleInput(input) {

  wsAddMsg(input, "ws-user");

  /* STEP 0 CATEGORY */
  if (wsStep === 0) {

    if (input.includes("Sweets")) {
      wsOrder.category = "Sweets";
      wsStep = 1;

      wsAddMsg("Choose your sweets:", "ws-bot");

      wsShowOptions([
        "Gulab Jamun","Barfi","Ras Gula","Jalebi","Kheer","Gajar Halwa",
        "Moti Chor Lado","Kalakand","Mixed Sweets","Soan Papdi",
        "Cham Cham","Besan Ladoo","Milk Cake","Coconut Barfi",
        "Imarti","Others"
      ]);

    } else if (input.includes("Food")) {
      wsOrder.category = "Food";
      wsStep = 1;

      wsAddMsg("Choose your food:", "ws-bot");

      wsShowOptions([
        "Chicken Karai","Goat Karai","Beef Karai",
        "Chicken Tandoori Leg","Chicken Chapli Kabab",
        "Shami Kabab","Lamb Chops 3pc","Chicken Kabab",
        "Chicken Biryani","Beef Biryani","Mutton Biryani",
        "Chicken Fried Rice","Beef Burger","Chicken Burger",
        "Naan","Roti","Paratha","Fish Fry","Haleem","Other Food"
      ]);
    }

    return;
  }

  /* STEP 1 ITEM */
  if (wsStep === 1) {

    if (input === "Other Food" || input === "Others") {
      wsIsCustom = true;
      wsStep = 1;

      document.getElementById("wsOptions").style.display = "none";
      document.getElementById("wsCustomInputBox").style.display = "block";

      wsAddMsg("Please type what you want:", "ws-bot");
      return;
    }

    wsOrder.item = input;
    wsStep = 2;

    wsAddMsg("Select quantity:", "ws-bot");
    wsShowOptions(["1","2","3","4","5","6","7","8","9","10+"]);
    return;
  }

  /* STEP 2 QUANTITY */
  if (wsStep === 2) {
    wsOrder.quantity = input;
    wsStep = 3;

    wsAddMsg("Please enter your delivery address:", "ws-bot");

    document.getElementById("wsOptions").style.display = "none";
    document.getElementById("wsAddressBox").style.display = "block";

    setTimeout(() => {
      if (window.google && document.getElementById("wsAddressInput")) {
        initAddressAutocomplete();
      }
    }, 300);

    return;
  }
}

/* =========================
   CUSTOM INPUT
========================= */
function wsSubmitCustom() {

  let val = document.getElementById("wsCustomInput").value.trim();

  if (!val) return alert("Please enter item");

  wsOrder.item = val;
  wsIsCustom = false;
  wsStep = 2;

  wsAddMsg(val, "ws-user");

  document.getElementById("wsCustomInputBox").style.display = "none";

  wsAddMsg("Select quantity:", "ws-bot");

  wsShowOptions(["1","2","3","4","5","6","7","8","9","10+"]);
}

/* =========================
   ADDRESS INPUT
========================= */
function wsSubmitAddress() {

  let addr = document.getElementById("wsAddressInput").value.trim();

  if (!addr) return alert("Please enter address");

  wsOrder.address = addr;

  wsAddMsg(addr, "ws-user");

  document.getElementById("wsAddressBox").style.display = "none";

  wsSendToWhatsApp();
}

/* =========================
   BACK BUTTON (FIXED)
========================= */
function wsGoBack() {

  if (wsStep === 0) return;

  if (wsStep === 3) {
    wsStep = 2;
    document.getElementById("wsAddressBox").style.display = "none";

    wsAddMsg("Select quantity again:", "ws-bot");
    wsShowOptions(["1","2","3","4","5","6","7","8","9","10+"]);
    return;
  }

  wsStep--;

  document.getElementById("wsChatBox").innerHTML = "";

  if (wsStep === 0) {
    wsStartChat();
    return;
  }

  if (wsStep === 1) {

    wsAddMsg("Choose again:", "ws-bot");

    let list = wsOrder.category === "Sweets"
      ? ["Gulab Jamun","Barfi","Ras Gula","Jalebi","Kheer","Gajar Halwa",
         "Moti Chor Lado","Kalakand","Mixed Sweets","Soan Papdi",
         "Cham Cham","Besan Ladoo","Milk Cake","Coconut Barfi","Imarti","Others"]
      : ["Chicken Karai","Goat Karai","Beef Karai","Chicken Tandoori Leg",
         "Chicken Chapli Kabab","Shami Kabab","Lamb Chops 3pc",
         "Chicken Kabab","Chicken Biryani","Beef Biryani","Mutton Biryani",
         "Chicken Fried Rice","Beef Burger","Chicken Burger","Naan",
         "Roti","Paratha","Fish Fry","Haleem","Other Food"];

    wsShowOptions(list);
  }

  if (wsStep === 2) {
    wsAddMsg("Select quantity again:", "ws-bot");
    wsShowOptions(["1","2","3","4","5","6","7","8","9","10+"]);
  }
}

/* =========================
   WHATSAPP
========================= */
function wsSendToWhatsApp() {

  let message =
`🍽️ New Order:
Category: ${wsOrder.category}
Item: ${wsOrder.item}
Quantity: ${wsOrder.quantity}
Address: ${wsOrder.address}

Please confirm order.`;

  let phone = "19293863884";

  let url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}

/* =========================
   GOOGLE AUTOCOMPLETE
========================= */
function initAddressAutocomplete() {
  const input = document.getElementById("wsAddressInput");
  if (!input) return;

  let box = document.createElement("div");
  box.id = "wsSuggestBox";
  box.style.cssText = `
    position:absolute;
    background:#fff;
    width:100%;
    border:1px solid #ddd;
    max-height:150px;
    overflow-y:auto;
    z-index:99999;
  `;

  input.parentNode.appendChild(box);

  input.addEventListener("input", async function () {
    let query = input.value;

    if (query.length < 3) {
      box.innerHTML = "";
      return;
    }

    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`;

    try {
      let res = await fetch(url);
      let data = await res.json();

      box.innerHTML = "";

      data.forEach(place => {
        let div = document.createElement("div");

        div.innerText = place.display_name;
        div.style.cssText = `
          padding:8px;
          cursor:pointer;
          font-size:13px;
          border-bottom:1px solid #eee;
        `;

        div.onclick = () => {
          input.value = place.display_name;
          box.innerHTML = "";
        };

        box.appendChild(div);
      });

    } catch (e) {
      console.log("Address error", e);
    }
  });
}


