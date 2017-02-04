/* global console */
/* global _ */
/* global ajv */
/* global Phaser */
/* global PhreakNation */
var inspector;
var manLocale;
(function() {
    'use strict';

    var state = function state(game) {};

    state.prototype = {
        preload: function () {
            this.game.scale.setResizeCallback(function() {
              window.adjust();
            });

            this.game.input.maxPointers = 1;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.refresh();
        },

        create: function () {
            inspector = this.game.plugins.add(Phaser.Plugin.Inspector);

            console.log('Loading Locale Manager...');
            manLocale = this.game.plugins.add(PhreakNation.Plugins.LocaleManager);
            _.callURL({
                method: 'GET',
                URL: '/assets/locale/locales.json',
                callback: function(resp, status) {
                    var data = JSON.parse(resp || '{}');
                    if (_.isObject(data)) {
                        var locale = 'en-us';
                        var word;
                        var binding;
                        var localeName;

                        manLocale.load(data);

                        manLocale.setLocale(locale);

                        binding = manLocale.getBinding(locale);
                        localeName = manLocale.getLocaleNames()[binding];
                        word = manLocale.getWord('du_hast');

                        console.log('Getting from the dictionary `%s` in `%s`. Locale set to  `%s`', word, localeName, locale);

                        locale = 'de';
                        manLocale.setLocale(locale);

                        binding = manLocale.getBinding(locale);
                        localeName = manLocale.getLocaleNames()[binding];
                        word = manLocale.getWord('du_hast');

                        console.log('Getting from the dictionary `%s` in `%s`. Locale set to  `%s`', word, localeName, locale);
                    }
                },
            });

            this.game.stage.backgroundColor = 0x444444;
            this.game.stage.backgroundColor = '#004a80';
            this.cursors = this.input.keyboard.createCursorKeys();
            this.game.input.mouse.capture = true;
        },

        update: function () {},

        render: function () {},
    };

    window.MyGame.states.Base = state;
})();
