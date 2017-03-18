(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    window.achievements = {};
    var achievements = window.achievements;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find the matching selector' + selector);
        }
    }

    function achievementTrack(email, achievement) {
        if (achievements['email'] === email) {
            achievements['achievement'] = achievement;
        } else {
            achievements['email'] = email;
            achievements['achievement'] = achievement;
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var data = {};
            var achievementUnlocked;
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log('Data Value:' + item.name + 'is' + item.value);
            });

            console.log(data);
            fn(data);
            //  if (data['size'] == 'extraLarge' && data['flavor'] != '' && data['strength'] > 60) {
            //    $('#myModal').modal('show');
            //  }
            if (data['size'] === 'extraLarge') {

                if (data['strength'] > '60') {
                    if (data['flavor'] === 'caramel') {
                        achievementUnlocked = 'Caramel Cream';
                        $('#myModal .modal-title').text(' Unlocked Caramel Cream');
                        $('#myModal').modal();
                    }
                    if (data['flavor'] === 'almond') {
                        achievementUnlocked = 'Almond Milk';
                        $('#myModal .modal-title').text('Unlocked Almond Milk ');

                        $('#myModal').modal();
                    }
                    if (data['flavor'] === 'mocha') {
                        achievementUnlocked = 'Chocolate Cream';
                        $('#myModal .modal-title').text(' Unlocked Mocha');

                        $('#myModal').modal();
                    }
                }
            }

            $('.btn-yes').click(function() {
                data['flavor'] = achievementUnlocked;
                achievementTrack(data['emailAddress'], achievementUnlocked);
                //achievement = '';
            });
            this.reset();
            this.elements[0].focus();
        });
    };

    $('#emailInput').change(function() {
        if ($('#emailInput').val() === achievements['email']) {
            var value = '';
            if (achievements.achievement === 'Chocolate Cream') {
                value = 'chocolate-cream';
            }

            if (achievements.achievement === 'Caramel Cream') {
                value = 'caramel-cream';
            }

            if (achievements.achievement === 'Almond Milk') {
                value = 'almond-milk';
            }
            $('#flavorAchievement').append('<option value=' + value + '>' + achievements.achievement + '</option>');
        }
    });

    FormHandler.prototype.displayValueOnslide = function() {
        console.log('Setting Slder Value');
        this.$formElement.on('change', function() {

            //event.preventDefault();
            var sliderValue = $(this).val();
            console.log('Slider value:' + sliderValue);
            $('#sliderLevel').html(sliderValue);
            if (sliderValue < 20) {
                $('#sliderStrengthColor').css({
                    'color': 'green'
                });
            } else if (sliderValue > 20 && sliderValue < 60) {
                $('#sliderStrengthColor').css({
                    'color': 'yellow'
                });
            } else {
                $('#sliderStrengthColor').css({
                    'color': 'red'
                });
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
