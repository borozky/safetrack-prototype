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

$(function() {

    function appendElementToCourseList($element, index) {
        var $coursesList = $(".course-list").eq(0);
        var len = $coursesList.find(".course").length;
        if (len - 1 < index) {
            $element.appendTo($coursesList);
        } else {
            $(".course-list > .course").eq(index).after($element);
        }
    }

    function relocateCourseModule($element) {
        var sourceIndex = parseInt($element.attr("data-course-index") || 0);
        var width = $(window).width();
        var cols = 1;
        if (width <= 575) {
            cols = 1;
        } else if (width <= 1075) {
            cols = 2;
        } else {
            cols = 3 + Math.floor((width - 1075) / 275)
        }

        var row = Math.ceil((sourceIndex + 1) / cols);

        var useIndex = (cols * Math.ceil((sourceIndex + 1) / cols)) - 1
        console.log({sourceIndex, row, cols, useIndex})
        appendElementToCourseList($element, useIndex);
    }

    function loadCourseModules($courseModule, title, courseModules = []) {
        var courseModuleList = new CourseModuleList(title, courseModules);
        $courseModule.find(".course-module-list-inner").html(courseModuleList.html());
    }


    relocateCourseModule($(".course-module-list").eq(0));

    $(window).resize(function() {
        var $modules = $(".course-module-list").eq(0)
        relocateCourseModule($modules);
    })

    $(".course-list").on("click", ".toggle-module", function(e) {
        e.preventDefault()

        var $moduleList = $(".course-module-list").eq(0);
        var sourceIndex = parseInt($(this).attr("data-course-index") || 0);
        var courseDescription = $(this).attr("data-course-description");
        var courseModules = JSON.parse($(this).attr("data-course-modules"));

        $moduleList.attr("data-course-index", sourceIndex);
        relocateCourseModule($moduleList)
        loadCourseModules($moduleList, courseDescription, courseModules);
        $moduleList.collapse('toggle')
    })
})



