(function (exports) {

	var month
	
	// 2014-09-22T10:00:00Z format accepted
	exports.getObject = function( datetime ) {

		var date = {
			day : '',
			month : '',
			year : '',
			HH : '',
			mm : ''
		},
		datetime_split = datetime.split('T'),
		date_split = datetime_split[0].split('-'),
		time_split = datetime_split[1].split(':');


		date = {
			day : date_split[2],
			month: date_split[1],
			year: date_split[0],
			HH: time_split[0],
			mm: time_split[1]
		};

		return date;
	};
})(this.DATE = {});