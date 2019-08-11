(function() {
    var $leftSidebar = document.querySelector(".sidebar.left");
    var $rightSidebar = document.querySelector(".sidebar.right");
    var $layer = document.querySelector(".layer");
    var $leftSidebarToggler = document.querySelector(".navbar-toggler.left");
    var $rightSidebarToggler = document.querySelector(".navbar-toggler.right");
    var $closeRightSidebar = document.querySelector(".sidebar.right .close-sidebar");

    if ($leftSidebarToggler) {
        $leftSidebarToggler.addEventListener("click", function(e) {
            $leftSidebar.classList.add("open");
            $layer.classList.add("open");
        })
    }

    if ($rightSidebarToggler) {
        $rightSidebarToggler.addEventListener("click", function(e) {
            $rightSidebar.classList.add("open");
            $layer.classList.add("open");
        })
    }


    if ($layer) {
        $layer.addEventListener("click", function(e) {
            $layer.classList.remove("open");
            $leftSidebar.classList.remove("open");
            $rightSidebar.classList.remove("open");
        })
    }

    if ($closeRightSidebar) {
        $closeRightSidebar.addEventListener("click", function() {
            $layer.classList.remove("open");
            $rightSidebar.classList.remove("open");
        });
    }


})();