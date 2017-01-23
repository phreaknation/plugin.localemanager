# Phaser Locale Plugin
By Joel Dies


**This is not 100% documented but is on its way to being 100% documented.**

If you wish to use this plugin in a commercial product, or get the full source.
TBD

## Including in a project
Include the script into your html page.

Required Modules:

 + [Utilities](https://github.com/phreaknation/phreaknation.utilities)
 + [AJV](https://github.com/epoberezkin/ajv) [CDNJS](https://cdnjs.cloudflare.com/ajax/libs/ajv/4.11.2/ajv.min.js)
 + [Lodash](lodash.com) [CDNJS](https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js)


```
<script src="/path/to/plugin/ajv.min.js"></script>
<script src="/path/to/plugin/lodash.min.js"></script>

<script src="/path/to/plugin/phreaknation.utilities.min.js"></script>
<script src="/path/to/plugin/phreaknation.manager.registry.min.js"></script>
```

In your create of your phaser project.

```
game.plugins.add(PhreakNation.Plugins.RegistryManager);
```


#### Example:
```
var registry;
(function() {
  'use strict';

  var state = function state(game) {};

  state.prototype = {
    ...
    create: function () {
      ...
      localeman = this.game.plugins.add(PhreakNation.Plugins.LocaleManager);
      
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

                  localeman.load(data);

                  localeman.setLocale(locale);

                  binding = localeman.getBinding(locale);
                  localeName = localeman.getLocaleNames()[binding];
                  word = localeman.getWord('du_hast');

                  console.log('Getting from the dictionary `%s` in `%s`. Locale set to  `%s`', word, localeName, locale);

                  locale = 'de';
                  localeman.setLocale(locale);

                  binding = localeman.getBinding(locale);
                  localeName = localeman.getLocaleNames()[binding];
                  word = localeman.getWord('du_hast');

                  console.log('Getting from the dictionary `%s` in `%s`. Locale set to  `%s`', word, localeName, locale);
              }
          },
      });
      ...
    },
    ...
  };

  window.MyGame.states.MyState = state;
})();
```

## Calls

### version()
Return the plugin version.

#### Example:
```
localeman.version();
```

### description()
Return a description of this plugin.

#### Example:
```
localeman.description();
```

### getAllLocales()
Grabs all locales from the loaded locale object.
#### Example:
```
var localeList = localeman.getAllLocales();
```

### getBinding(locale)
Gets the current binding of the locale if there is one. Otherwise, returns the locale.
#### Example:
```
// {string} [locale=]    String locale.

var locale = localeman.getBinding('en-us');
```

### getBound(locale, getBinding)
Gets the current bound locale object.
#### Example:
```
// {string} [locale=]    String locale.
// {boolean} [getBinding=false]    If set, returns the binding.

var binding = localeman.getBound('en-us');

```

### getLocale()
Gets the currently set locale.
#### Example:
```
var locale = localeman.getLocale();

```

### getLocaleNames(locale)
Grabs the available names for the set locale.
#### Example:
```
// {string} [locale=]    String locale.

var localNames = localeman.getLocaleNames('en-us');
```

### getWord(key, locale)

#### Example:
```
/// {string} key    The dictionary key you wish to use.
// {string} [locale=]    String locale.

var word = localeman.getWord('du_hast');
```

### isBound(locale)
Checks to see if the locale is bound to another locale.
#### Example:
```
// {string} [locale=]    String locale.

var bound = localeman.isBound('en-us')
```

### load(data, merge)
Loads a locale object to be used.
#### Example:
```
// {object} data    The locale object data to be used.
// {boolean} [merge=false]    Merges the previous locale data and the new data.

var data = {...};

localeman.load(data);
```

### setLocale(locale)
Sets the default locale.
#### Example:
```
// {string} [locale=]    String locale.

localeman.setLocale('en-us');
```
