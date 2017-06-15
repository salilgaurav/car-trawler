(function(exports) {

    // Private function to extract parameters from url in key value pair
    var extract_params = function(params_string) {
        'use strict';
        var params = {},
            raw_params = params_string.split('&'),
            j = 0,
            i;

        for (i = raw_params.length - 1; i >= 0; i--) {

            var url_params = raw_params[i].split('=');

            if (url_params.length == 2) {

                params[url_params[0]] = url_params[1];

            } else if (url_params.length == 1) {

                params[j] = url_params[0];

                j += 1;
            }
        }

        return params;
    };



    // Router function 
    exports.router = function(route, data) {
        'use strict';
        route = route || location.hash.slice(1) || 'root';

        var temp = route.split('?'),
            route_split = temp.length,
            function_to_invoke = temp[0] || false,
            params = {};

        if (route_split > 1) {
            params = extract_params(temp[1]);
        }
  
        if (function_to_invoke) {
            // Routing of application
            switch (function_to_invoke) {
                case 'root':
                    SearchResultController.generateSearchPage();
                    SearchResultController.generateListView(DATA.CAR_LIST);
                    SearchResultController.generateFilterView(DATA.VENDOR_LIST , params);
                    SearchResultController.generateLegend(DATA.SEARCH);
                    break;
                case 'car':
                    // Go to car view only if id param with value is there
                    if( params['id'] ) {
                        CarController.generateCarView(params);
                    }else {
                        window.location.hash = '#';
                    } 
                    
                    break;
            }

        } else {
            // Checking the condition whether we have to re-add
            // all the views or specific views
            // this by default is root page
            if (!document.getElementById('search-results')) {

                SearchResultController.generateSearchPage();

                SearchResultController.generateFilterView(DATA.VENDOR_LIST);

                SearchResultController.generateLegend(DATA.SEARCH);

            } else {

                if (document.getElementsByClassName('filters').length == 0) {

                    SearchResultController.generateFilterView(DATA.VENDOR_LIST);

                }
            }

            SearchResultController.generateListView(DATA.CAR_LIST , params);
        }
    };

    // Function to render ui
    // Pass elementid and innerHTMl content
    exports.render = function(element_id, content) {
        'use strict';
        document.getElementById(element_id).innerHTML = content;
    };

})(this.utils = {});