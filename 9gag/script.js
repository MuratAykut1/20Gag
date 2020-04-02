  
function dropdownMenu() {
    document.getElementById("#dropdown-menu").classList.toggle("show");
  }

  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') ) {
      var dropdowns = document.getElementsByClassName("popup-menu");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
 }
