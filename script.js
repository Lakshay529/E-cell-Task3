let currentFilter = "all";

function setFilter(category) {
  currentFilter = category;

  let buttons = document.getElementsByClassName("filter-btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
    if (buttons[i].getAttribute("data-category") == category) {
      buttons[i].classList.add("active");
    }
  }

  filterStartups();
}

function filterStartups() {
  let input = document.getElementById("search-box").value.toLowerCase();
  let cards = document.getElementsByClassName("startup-card");
  let visibleCount = 0;

  for (let i = 0; i < cards.length; i++) {
    let cardText = cards[i].innerText.toLowerCase();
    let cardCategory = cards[i].getAttribute("data-category");

    let matchesSearch = cardText.includes(input);
    let matchesFilter = (currentFilter == "all" || cardCategory == currentFilter);

    if (matchesSearch && matchesFilter) {
      cards[i].style.display = "block";
      visibleCount = visibleCount + 1;
    } else {
      cards[i].style.display = "none";
    }
  }

  if (visibleCount == 0) {
    document.getElementById("no-results").style.display = "block";
  } else {
    document.getElementById("no-results").style.display = "none";
  }
}

function addStartup(event) {
  event.preventDefault();

  let name = document.getElementById("s-name").value.trim();
  let category = document.getElementById("s-category").value;
  let desc = document.getElementById("s-desc").value.trim();
  let link = document.getElementById("s-link").value.trim();

  document.getElementById("submit-error").innerHTML = "";

  if (name == "" || desc == "") {
    document.getElementById("submit-error").innerHTML = "Please enter a name and description";
    return;
  }

  let icon = "🚀";
  if (category == "EdTech") { icon = "&#x1F4DA;"; }
  if (category == "EV") { icon = "&#x26A1;"; }
  if (category == "FinTech") { icon = "&#x1F4B0;"; }

  let card = document.createElement("div");
  card.className = "startup-card";
  card.setAttribute("data-category", category);

  card.innerHTML =
    '<div class="card-icon">' + icon + '</div>' +
    '<div class="card-logo">' + name.charAt(0).toUpperCase() + '</div>' +
    '<h3>' + name + '</h3>' +
    '<p class="category">' + category + '</p>' +
    '<p>' + desc + '</p>' +
    '<a href="' + (link == "" ? "#" : link) + '">Visit Website</a>';

  document.getElementById("startup-list").appendChild(card);
  document.getElementById("submit-form").reset();
  filterStartups();
}