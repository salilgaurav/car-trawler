window.onload = function() {

    //register router
    window.addEventListener(
        "hashchange",
        function() {
            utils.router()
        }
    );

    // We are going to call for loading data the very first thing 
    // to do in application
    var url = config.api_key,
        x = new XMLHttpRequest();

    x.onreadystatechange = function() {
        if (x.readyState == XMLHttpRequest.DONE) {
            if (x.status == 200) {
                // Calling DATAPARSER to parse JSON Data into appropriate format
                // DATAPARSER  will have local copy of data;
                DATAPARSER.sucess(
                    x.responseText
                );
                utils.router();
            } else {
                DATAPARSER.error(
                    x.responseText
                );
            }
        }
    };

    x.open('GET', url, true);

    x.send(); 

};