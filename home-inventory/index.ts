(function () {
  // Set search-inventory display to none when nav-current is clicked and set inventory display to absolute
  document.getElementById("nav-current").addEventListener("click", function () {
    document.getElementById("search-inventory").style.display = "none";
    document.getElementById("inventory").style.display = "inline-block";
  });
  // Set inventory display to none when nav-search is clicked and set search-inventory display to absolute
  document.getElementById("nav-search").addEventListener("click", function () {
    document.getElementById("inventory").style.display = "none";
    document.getElementById("search-inventory").style.display = "inline-block";
  });
})();
