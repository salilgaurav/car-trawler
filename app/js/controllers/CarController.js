(function (exports) {
	
	exports.generateCarView = function (params) {
		'use strict';
		var data = getCarInfo(params['id']);

		var template = "<div class='center-div'>"+
						"<div class='search-results__list-wrapper'>" +
                "<div class='search-result__list-item'>" +
                "<div class='search-result__list-item-wrapper'>" +
                "<div class='grid'>" +
                "<div class='car-img-grid'>" +
                "<div class='car-img-wrapper'>" +
                "<img src=" + data.pictureURL + ">" +
                "</div>" +
                "</div>" +
                "<div class='car-description-grid'>" +
                "<div class='car-details-wrapper'>" +
                "<div class='grid'>" +
                "<div class='car-description'>" +
                "<label>" + data.name + "</label>" +
                "<div class='car-properties'>" +
                "<div class='car-properties-block'>" +
                "<ul>" +
                "<li class='strike-true'>air-conditioned, </li>" +
                "<li>"+data.transmissionType+", </li>" +
                "<li>"+ data.fuelType+"</li>" +
                "<ul>" +
                "</div>" +
                "<div class='car-properties-block'>" +
                "<ul>" +
                "<li><span class='person'>" + data.passengerCount + " passengers</span>, </li>" +
                "<li><span class='baggage'>" + data.baggageQuantity + " baggage</span>, </li>" +
                "<li><span class='doors'>" + data.doorCount + " doors</span></li>" +
                "<ul>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='car-provider'>" +
                 "<span class='text-label'>Provided by:</span><span class='provider-text'>" + data.vendorName + "</span>" +
                "</div>" +
                "</div>" +
                "<div class='car-price-grid'>" +
                "<div class='car-price-wrapper'>" + 
                "<div class='car-price-container'>" +
                "<div class='car-price-box'>"+
                "<label class='price-label'>" +
                    "Total price" + 
                "</label>"+ 
                "<label class='price-cost'>" +"<span class='currency-code'>"+data.currencyCode+"</span>"+
                    data.rateTotalAmount +   
                "</label>"+  
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>"+
                "<div class='continue-btn-holder'>"+
                "<input type='button' class='continue-btn' value='BOOK NOW'>"+
                "</div>"+
                "<div class='back-btn-holder'>"+
                "<input type='button' class='back-btn' value='back'>"+
                "</div>"+
				"</div>";

                utils.render('main-container', template);
	};

	var getCarInfo = function( id ) {
		'use strict';
		var i;
		for( i = 0 ; i < DATA.CAR_LIST.length ; i++ ) {
			if( DATA.CAR_LIST[i].id == id ) {
				return DATA.CAR_LIST[i];
			}
		}
	};
})(this.CarController = {});