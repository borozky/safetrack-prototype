class CourseModule {

    /**
     * @param {string} description
     * @param {string} duedate
     * @param {number?} daysOverdue
     */
    constructor(description, duedate, daysOverdue = 0) {
        this.description = description;
        this.daysOverdue = daysOverdue;
        this.duedate = duedate;
    }


    html () {
        return `
        <div class="course-module${this.daysOverdue > 0 ? ' course-module-overdue' : ''}">
            ${this.daysOverdue > 0 ? `<span class="badge">${this.daysOverdue} DAY(S) OVERDUE</span>` : ``}
            <div class="course-module-inner">
                <div class="course-module-content">
                    <div class="course-module-description">
                        ${this.description}
                    </div>
                    <div class="course-module-meta">
                        <p>
                            <a href="#"><b><i class="fa fa-2x fa-book"></i></b></a>
                            <a href="#"><b><i class="fa fa-2x fa-puzzle-piece"></i></b></a>
                            <a href="#"><b><i class="fa fa-2x fa-pencil-square"></i></b></a>
                        </p>
                        <p>
                            <span class="badge badge-secondary">DUE DATE: ${this.duedate}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}

class CourseModuleList {
    /**
     * @param {{[key:string]: any, description: string, duedate: string, daysOverdue: number}[]} moduleList
     */
    constructor(title, moduleList = []) {
        this.title = title;
        this.moduleList = moduleList;
    }

    html() {
        var courseModules = this.moduleList.map(m => {
            var courseModule = new CourseModule(m.description, m.duedate, m.daysOverdue);
            return courseModule.html();
        }).join('');

        return `
            <h3>${this.title}</h3>
            ${courseModules}
        `
    }
}

// setup javascript to handle left and right mobile sidebar
(function() {
    var $leftSidebar = document.querySelector(".sidebar.left");
    var $rightSidebar = document.querySelector(".sidebar.right");
    var $layer = document.querySelector(".layer");
    var $leftSidebarToggler = document.querySelector(".navbar-toggler.left");
    var $rightSidebarToggler = document.querySelector(".navbar-toggler.right");
    var $closeRightSidebar = document.querySelector(".sidebar.right .close-sidebar");

    var OPEN_CLASS = "open";

    // open left sidebar
    if ($leftSidebarToggler) {
        $leftSidebarToggler.addEventListener("click", function(e) {
            $leftSidebar.classList.add(OPEN_CLASS);
            $layer.classList.add(OPEN_CLASS);
        })
    }

    // open right sidebar
    if ($rightSidebarToggler) {
        $rightSidebarToggler.addEventListener("click", function(e) {
            $rightSidebar.classList.add(OPEN_CLASS);
            $layer.classList.add(OPEN_CLASS);
        })
    }

    // close sidebar by clicking the dark layer
    if ($layer) {
        $layer.addEventListener("click", function(e) {
            $layer.classList.remove(OPEN_CLASS);
            $leftSidebar.classList.remove(OPEN_CLASS);
            $rightSidebar.classList.remove(OPEN_CLASS);
        })
    }

    // close right sidebar by clicking the "X" button
    if ($closeRightSidebar) {
        $closeRightSidebar.addEventListener("click", function() {
            $layer.classList.remove(OPEN_CLASS);
            $rightSidebar.classList.remove(OPEN_CLASS);
        });
    }
})();


$(function() {

    /**
     * Append the course modules' parent el to list of course.
     * This is a needed so that list of course modules will be displayed
     * below the course div
     *
     * @param {HTMLDivElement} $courseModules
     * @param {number} index
     */
    function appendCourseModulesToCourseList($courseModules, index) {
        var $coursesList = $(".course-list").eq(0);
        var len = $coursesList.find(".course").length;
        if (len - 1 < index) {
            $courseModules.appendTo($coursesList);
        } else {
            $(".course-list > .course").eq(index).after($courseModules);
        }
    }

    /**
     * Determines where course modules' parent element will be placed.
     * The window's width will be accounted.
     *
     * This is a needed so that list of course modules will be displayed
     * below the course div
     *
     * @param {HTMLDivElement} $courseModules
     */
    function relocateCourseModule($courseModules) {
        var sourceIndex = parseInt($courseModules.attr("data-course-index") || 0);
        var width = $(window).width();
        var cols = 1;
        if (width <= 575) { // at this width, courses are displayed in 1 column
            cols = 1;
        } else if (width <= 1075) {
            cols = 2;
        } else {
            cols = 3 + Math.floor((width - 1075) / 275);
        }

        var useIndex = (cols * Math.ceil((sourceIndex + 1) / cols)) - 1;
        appendCourseModulesToCourseList($courseModules, useIndex);
    }


    /**
     * Populate `.course-module-list-inner` with course modules
     *
     * @param {HTMLElement} $courseModule
     * @param {string} title
     * @param {any[]} courseModules
     */
    function loadCourseModules($courseModule, title, courseModules = []) {
        var courseModuleList = new CourseModuleList(title, courseModules);
        $courseModule.find(".course-module-list-inner").html(courseModuleList.html());
    }


    /**
     * Initialisation
     */
    function init() {

        // Relocate course modules on ready and on resize
        relocateCourseModule($(".course-module-list").eq(0));
        $(window).resize(function() {
            var $modules = $(".course-module-list").eq(0);
            relocateCourseModule($modules);
        })

        // Handle clicks on "You have 2 modules"
        // Use event delegation in-case courses are dynamically loaded
        $(".course-list").on("click", ".toggle-module", function(e) {
            e.preventDefault()

            var $moduleList = $(".course-module-list").eq(0);
            var sourceIndex = parseInt($(this).attr("data-course-index") || 0);
            var courseDescription = $(this).attr("data-course-description");
            var courseModules = JSON.parse($(this).attr("data-course-modules"));

            $moduleList.attr("data-course-index", sourceIndex);
            relocateCourseModule($moduleList);
            loadCourseModules($moduleList, courseDescription, courseModules);
            $moduleList.collapse('toggle');
        });

    }

    init();
})



