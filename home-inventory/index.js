(function () {
    var navSearch = document.getElementById("nav-search");
    var navCurrent = document.getElementById("nav-current");
    var searchInventory = document.getElementById("search-inventory");
    var currentInventory = document.getElementById("inventory");
    var displaySearch = function () {
        // set searchInventory to display inline-block
        searchInventory.style.display = "inline-block";
        // set currentInventory to display none
        currentInventory.style.display = "none";
    };
    var displayCurrent = function () {
        // set searchInventory to display none
        searchInventory.style.display = "none";
        // set currentInventory to display inline-block
        currentInventory.style.display = "inline-block";
    };
    navSearch.addEventListener("click", displaySearch);
    navCurrent.addEventListener("click", displayCurrent);
})();
