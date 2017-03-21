(function(window) {
    'use strict';
    var App = window.App || {};
    var Validation = {
        isCompanyEmail: function(email) {
            console.log('In mail validation');
            return /.+@bignerdranch\.com$/.test(email);

        },
        isDecaf: function(coffeeOrder, caffeineStrength) {
            console.log('In custom validation');
            //  var str= 'decaf';
            if (/decaf/.test(coffeeOrder) && caffeineStrength >= '20') {
                console.log('In custom decaf validation');
                return false;

            } else {
                return true;
            }

        }
    };


    App.Validation = Validation;
    window.App = App;
})(window);
