// Initialize app
var $$ = Dom7;

var myApp = new Framework7({
    precompileTemplates: true,
    template7Pages: true,
    material: true,
    swipePanel: 'left',
     onPageInit: function (page) {
           
            $$.getJSON('http://dev.esoftix.com/basic/web/api/get-category', {}, function (data) {          
                 var HTML = Template7.templates.jobCategoryMenuTemplate({category_list:data});
                 $$("#job_category_menu").html(HTML);
            });

             $$.getJSON('http://dev.esoftix.com/basic/web/api/get-location', {}, function (data) {          
                 var HTML = Template7.templates.jobLocationMenuTemplate({location_list:data});
                 $$("#job_province_menu").html(HTML);
            });

     }
});

$$(document).on('ajaxStart', function () {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});


// If we need to use custom DOM library, let's save it to $$ variable:


// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;
    
    if (page.name === 'job_category') {
        $$.getJSON('http://dev.esoftix.com/basic/web/api/get-all-category', {}, function (data) {          
                 var HTML = Template7.templates.jobCategoryListTemplate({category_list:data});
                 $$(".job_category_list").html(HTML);
        });

    }

    if (page.name === 'job_by_category') {
         $$.getJSON('http://dev.esoftix.com/basic/web/api/get-job', {category_id:page.query.category_id}, function (data) {          
            var myList = myApp.virtualList('.list-block.job_list_' + page.query.category_id + '.virtual-list', {
            items:data,
            searchAll: function (query, items) {
                    var foundItems = [];
                    for (var i = 0; i < items.length; i++) {
                        // Check if title contains query string
                        if (items[i].job_title.toLowerCase().indexOf(query.trim().toLowerCase()) >= 0) foundItems.push(i);
                    }
                    return foundItems; 
             },
            template: '<li class="job_list">' +
                        //'<a href="job_detail.html?id={{id}}&job_title={{job_title}}" class="item-link item-content">' +
                            '<div class="item-inner">' +
                            ' <div class="item-title-row">' +
                            '    <div class="item-title">{{job_title}}</div>' +
                            '  </div> ' +
                            '  <div class="item-text">{{company_name}} @ {{location_name}} <br/> 1 day ago</div>' +
                            '</div>' +
                          //'</a>' +
                        '</li>'
            });
        });
        $$('.job_list').on('click', function () {
          alert(1);
        });
    }

    if (page.name === 'job_by_location') {
        $$.getJSON('http://dev.esoftix.com/basic/web/api/get-job', {location_id:page.query.location_id}, function (data) {          
            var myList = myApp.virtualList('.list-block.job_list_' + page.query.location_id + '.virtual-list', {
            items:data,
            searchAll: function (query, items) {
                    var foundItems = [];
                    for (var i = 0; i < items.length; i++) {
                        // Check if title contains query string
                        if (items[i].job_title.toLowerCase().indexOf(query.trim().toLowerCase()) >= 0) foundItems.push(i);
                    }
                    return foundItems; 
             },
            template: '<li>' +
                        '<a href="job_detail.html?id={{id}}&job_title={{job_title}}" class="item-link item-content">' +
                            '<div class="item-inner">' +
                            ' <div class="item-title-row">' +
                            '    <div class="item-title">{{job_title}}</div>' +
                            '  </div> ' +
                            '  <div class="item-text">{{company_name}} @ {{location_name}} <br/> 1 day ago</div>' +
                            '</div>' +
                          '</a>' +
                        '</li>'
            });
        });
  
    }

    if (page.name === 'job_location') {
         $$.getJSON('http://dev.esoftix.com/basic/web/api/get-all-location', {}, function (data) {          
            var myList = myApp.virtualList('.list-block.location_' + page.query.id + '.virtual-list', {
            items:data,
            searchAll: function (query, items) {
                    var foundItems = [];
                    for (var i = 0; i < items.length; i++) {
                        // Check if title contains query string
                        if (items[i].location.toLowerCase().indexOf(query.trim().toLowerCase()) >= 0) foundItems.push(i);
                    }
                    return foundItems; 
             },
            template:  '<li> ' +
                '<a href="job_by_location.html?location_id={{id}}&location_name={{location}}" class="item-link close-panel"> ' +
                '  <div class="item-content"> ' +
                '        <div class="item-inner"> ' +
                '            <div class="item-title">{{location}}</div> ' +
                '            <div class="item-after"><span class="badge">{{total_job_count}}</span></div> ' +
                '        </div> ' +
                '    </div> ' +
                '</a> ' +
            '</li> '
            });
        });
  
    }

    //Job Detail
    if(page.name==='job_detail'){

        mainView.router.load({
            url: 'job_detail.html',
            context: {
              tel: '(999)-111-22-33',
              email: 'contact@john.doe'
            }
        });
    }


})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    
})



