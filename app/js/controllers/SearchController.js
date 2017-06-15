// This is the SearchResult page controller
// It has templates for SearchResult page and actions events function done by user on SearchResult page
(function(exports) {

    // The function to genrate search result list
    // passed data is an aray of car-model from DATA_PARSER
    exports.generateListView = function(data, params) {
        'use strict';
        var template = '',
            i;

        if (params) {
            // Sorting based on property on url
            if (params.hasOwnProperty('sortBy')) {
                data = sortData(data, mapper[params['field']], params['sortBy']);
                preSelectSortBox(params);
                
            }
            if (params.hasOwnProperty('filter')) {
                data = filterData(data, params['filter']);
                preSelectCheckBox(params['filter']);
            }
        } else {
            // Default sort by price low to high
            data = sortData(data, mapper['price'], 'low');
        }

        for (i = 0; i < data.length; i++) {

            template += "<div class='search-results__list-wrapper'>" +
                "<a href='#car?id=" + data[i].id + "'>" +
                "<div class='search-result__list-item'>" +
                "<div class='search-result__list-item-wrapper'>" +
                "<div class='grid'>" +
                "<div class='car-img-grid'>" +
                "<div class='car-img-wrapper'>" +
                "<img src=" + data[i].pictureURL + ">" +
                "</div>" +
                "</div>" +
                "<div class='car-description-grid'>" +
                "<div class='car-details-wrapper'>" +
                "<div class='grid'>" +
                "<div class='car-description'>" +
                "<label>" + data[i].name + "</label>" +
                "<div class='car-properties'>" +
                "<div class='car-properties-block'>" +
                "<ul>" +
                "<li class='strike-" + data[i].airConditionInd + "'>air-conditioned, </li>" +
                "<li>"+data[i].transmissionType+", </li>" +
                "<li>"+ data[i].fuelType+"</li>" +
                "<ul>" +
                "</div>" +
                "<div class='car-properties-block'>" +
                "<ul>" +
                "<li><span class='person'>" + data[i].passengerCount + " passengers</span>, </li>" +
                "<li><span class='baggage'>" + data[i].baggageQuantity + " baggage</span>, </li>" +
                "<li><span class='doors'>" + data[i].doorCount + " doors</span></li>" +
                "<ul>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='car-provider'>" +
                "<span class='text-label'>Provided by:</span><span class='provider-text'>" + data[i].vendorName + "</span>" +
                "</div>" +
                "</div>" +
                "<div class='car-price-grid'>" +
                "<div class='car-price-wrapper'>" + 
                "<div class='car-price-container'>" +
                "<div class='car-price-box'>"+
                "<label class='price-label'>" +
                    "Total price" + 
                "</label>"+ 
                "<label class='price-cost'>" +"<span class='currency-code'>"+data[i].currencyCode+"</span>"+
                    data[i].rateTotalAmount +  
                "</label>"+  
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</a>" +
                "</div>";

        }

        utils.render('search-results__list-container', template);
    };

    // The function to generate filter panel on page
    // Passed data is the Vendor list for filter
    exports.generateFilterView = function(data) {
        'use strict';

        var vendorTemplate = '',
            i;

        for (i = 0; i < data.length; i++) {

            vendorTemplate += "<label>" +
                "<input class='filter-box' type='checkbox' name='vendors' value='" + data[i].code + "' id='"+ data[i].code + "'" + ">" + data[i].name +
                "</label>";
        }


        var template = "<div class='search-results__filter-container'>" +
            "<div class='search-resulst__filter-wrapper'>" +
            "<div class='filters'>" +
            "<form>" +

            "<div class='filter-criteria'>" +
            "<span>Vendors</span>" +
            vendorTemplate +
            "</div>" +

            "</form>" +

            "</div>" +
            "</div>" +
            "</div>";

        utils.render('search-results__filter', template);
        bindFilterEvent();

    };

    // The mounting of search result page 
    // The above two templates are called in it.
    exports.generateSearchPage = function() {
        'use strict';
        var template = "<div id='search-results'>" +
            "<div id='search-criteria__container'>" +
            "</div>" +
            "<div id='search-results__container'>" +
            "<div class='grid'>" +
            "<div class='grid-one-fourth'>" +
            "<div id='search-results__filter'>" +
            "</div>" +
            "</div>" +
            "<div class='grid-three-fourth'>" +
            "<div id='search-results__sorts'>" +
            "<div class='search-results__sorts-title'><span class='title'>sort by</span><span class='strike'></span></div>" +
            "<input type='button' value='price' id='price' class='sort-btn low price'><span class='icon'></span>" +
            "<input type='button' value='person' id='person' class='sort-btn person'><span class='icon'></span>" +
            "<input type='button' value='baggage' id='baggage' class='sort-btn baggage'><span class='icon'></span>" +
            "<input type='button' value='doors' id='doors' class='sort-btn doors'><span class='icon'></span>" +
            "</div>" +
            "<div id='search-results__list'>" +
            "<div id='search-results__list-container'>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
        utils.render('main-container', template);
        bindSortEvent();
    };

    exports.generateLegend = function(search) {
        'use strict';
        var date_pickup = DATE.getObject(search['@PickUpDateTime']),
            date_return = DATE.getObject(search['@ReturnDateTime']);
        var template = "<div class='legend-container'>" +
            "<div class='grid'>" +
            "<div class='pickup-point'>" +
            "<label>Pickup</label>" +
            "<div class='place'>" + search.PickUpLocation['@Name'] + "</div>" +
            "<div class='time'><span>" + date_pickup.day + "</span>-" + date_pickup.month + "-" + date_pickup.year + " | " + date_pickup.HH + ":" + date_pickup.mm + "</div>" +
            "</div>" +
            "<div class='return-point'>" +
            "<label>Return</label>" +
            "<div class='place'>" + search.ReturnLocation['@Name'] + "</div>" +
            "<div class='time'><span>" + date_return.day + "</span>-" + date_return.month + "-" + date_return.year + " | " + date_return.HH + ":" + date_return.mm + "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
        utils.render('search-criteria__container', template);
    };


    // Function to bind click event to button for sorting
    var bindSortEvent = function() {
        'use strict';
        var $sortBtn = document.getElementsByClassName('sort-btn'),
            i;

        for (i = 0; i < $sortBtn.length; i++) {

            $sortBtn[i].addEventListener('click', function(e) {

                var $this = e.srcElement,
                    hash = window.location.hash;


                if ($this.classList.contains('low')) {

                    $this.classList.remove('low');
                    cleanSortBtn();

                    $this.classList.add('high');


                    hash = '?field=' + e.srcElement.id + '&sortBy=high&' + generateFilterString();


                } else {

                    $this.classList.remove('high');
                    cleanSortBtn();

                    $this.classList.add('low');

                    hash = '?field=' + e.srcElement.id + '&sortBy=low&' + generateFilterString();

                }
                window.location.hash = hash;
            });
        }
    };

    // Remove all low high class from all the sort buttons
    var cleanSortBtn = function() {
        'use strict';
        var $sortBtn = document.getElementsByClassName('sort-btn'),
            i;
        for (i = 0; i < $sortBtn.length; i++) {
            $sortBtn[i].classList.remove('low');
            $sortBtn[i].classList.remove('high');
        }
    };

    // Filter property mapper 
    var mapper = {
        'price': 'rateTotalAmount',
        'person': 'passengerCount',
        'baggage': 'baggageQuantity',
        'doors': 'doorCount'
    };

    // Function to sort array
    var sortData = function(data, property, sortBy) {
        'use strict';
        if (sortBy == 'high') {
            property = '-' + property;
        }
        return data.sort(dynamicSort(property));
    };

    // Funtion to sort based on property
    var dynamicSort = function(property) {
        'use strict';
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function(a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    };


    // Filter event bind
    var bindFilterEvent = function() {
        'use strict';
        var $filters = document.getElementsByClassName('filter-box'),
            i;
        for (i = 0; i < $filters.length; i++) {
            $filters[i].addEventListener('click', function(e) {
                var hash = window.location.hash;
                if (hash.indexOf('?')) {
                    if (hash.indexOf('filter') != -1) {
                        window.location.hash = hash.substr(0, hash.indexOf('filter')) + generateFilterString();
                    } else {
                        window.location.hash = hash + '?' + generateFilterString();
                    }
                } else {
                    window.location.hash = '?' + generateFilterString();
                }
            });
        }

    };

    // Generate string for filter
    var generateFilterString = function() {
        'use strict';
        var result = 'filter=',
            $filters = document.getElementsByClassName('filter-box'),
            i;
        for (i = 0; i < $filters.length; i++) {
            if ($filters[i].checked) {
                result += $filters[i].value + '+';
            }
        }
        // Remove the last + character and send it
        return result.substring(0, result.length - 1);
    };

    // Filter data based on filter selected
    var filterData = function(data, filterString) {
        'use strict';
        var result = [],
            i;
        for (i = 0; i < data.length; i++) {
            if (filterString.includes(data[i].vendorCode)) {
                result.push(data[i]);
            }
        }
        return result;
    };

    // Preselect checkboxes
    var preSelectCheckBox = function(filterString) {
        'use strict';
        var split_filterString = filterString.split('+'),
            i;
        for( i = 0 ; i < split_filterString.length ; i++ ){
            document.getElementById(split_filterString[i]).checked = true;
        }

    };

    // Preselect Sort
    var preSelectSortBox = function(params) {
        cleanSortBtn();
        var $ele = document.getElementById(params['field']);
        if( params['sortBy'] == 'low' ) {
            $ele.classList.add('low');
        }else {
            $ele.classList.add('high');
        }
    };



})(this.SearchResultController = {});