(function(exports, DATA) {

    var carModel = {
            id: '',
            code: '',
            codeContext: '',
            vendorCode: '',
            vendorName: '',
            airConditionInd: '',
            transmissionType: '',
            fuelType: '',
            driveType: '',
            passengerQuantity: '',
            passengerCount: '',
            baggageQuantity: '',
            doorCount: '',
            name: '',
            pictureURL: '',
            rateTotalAmount: '',
            estimatedTotalAmount: '',
            currencyCode: '',
            status: ''
        },
        vendorModel = {
            name: '',
            code: ''
        };

    // Function to return 5+ as 5.1
    var getPassengerQty = function(n) {
        'use strict';
        var result = n;
        if (n.indexOf('+') != -1) {
            result = n.replace('+', '.1');
        }
        return result;
    };

    // Sucess callback for request
    exports.sucess = function(response) {
        'use strict';
        var data = JSON.parse(response)[0],
            carList = [],
            vendorList = [],
            i = 0,
            j = 0;

        for (i = 0; i < data.VehAvailRSCore.VehVendorAvails.length; i++) {
            vendorModel = {
                name: data.VehAvailRSCore.VehVendorAvails[i].Vendor['@Name'],
                code: data.VehAvailRSCore.VehVendorAvails[i].Vendor['@Code'],
            };
            vendorList.push(vendorModel);

            for (j = 0; j < data.VehAvailRSCore.VehVendorAvails[i].VehAvails.length; j++) {
                var vehicalAvailable = data.VehAvailRSCore.VehVendorAvails[i].VehAvails[j];
                carModel = {
                    id: vehicalAvailable.Vehicle['@Code'] + '-' + data.VehAvailRSCore.VehVendorAvails[i].Vendor['@Code'],

                    code: vehicalAvailable.Vehicle['@Code'],

                    codeContext: vehicalAvailable.Vehicle['@CodeContext'],

                    vendorCode: data.VehAvailRSCore.VehVendorAvails[i].Vendor['@Code'],

                    vendorName: data.VehAvailRSCore.VehVendorAvails[i].Vendor['@Name'],

                    airConditionInd: vehicalAvailable.Vehicle['@AirConditionInd'],

                    transmissionType: vehicalAvailable.Vehicle['@TransmissionType'],

                    fuelType: vehicalAvailable.Vehicle['@FuelType'],

                    driveType: vehicalAvailable.Vehicle['@DriveType'],

                    passengerQuantity: getPassengerQty(vehicalAvailable.Vehicle['@PassengerQuantity']),

                    passengerCount: vehicalAvailable.Vehicle['@PassengerQuantity'],

                    baggageQuantity: vehicalAvailable.Vehicle['@BaggageQuantity'],

                    doorCount: vehicalAvailable.Vehicle['@DoorCount'],

                    name: vehicalAvailable.Vehicle.VehMakeModel['@Name'],

                    pictureURL: vehicalAvailable.Vehicle.PictureURL,

                    rateTotalAmount: parseFloat(vehicalAvailable.TotalCharge['@RateTotalAmount']),

                    estimatedTotalAmount: parseFloat(vehicalAvailable.TotalCharge['@EstimatedTotalAmount']),

                    currencyCode: vehicalAvailable.TotalCharge['@CurrencyCode'],

                    status: vehicalAvailable['@Status']
                }
                carList.push(carModel);
            }
        }
        DATA.CAR_LIST = carList;
        DATA.VENDOR_LIST = vendorList;
        DATA.SEARCH = data.VehAvailRSCore.VehRentalCore;
    };

    // Error call back for request
    exports.error = function() {

    };

})(this.DATAPARSER = {}, DATA);