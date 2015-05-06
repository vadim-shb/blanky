var languageModule = angular.module('languageModule', []).factory('$mod_lang', function() {
    var languageService = {
        langs: {
            ru: {
                languageName: 'Русский',

                // login page
                welcome: 'Добро пожаловать!',
                namePrompt: 'Имя:',
                passwordPrompt: 'Пароль:',
                emailPrompt: 'E-mail:',
                signUp: 'Зарегестрироваться'
            },

            en: {
                languageName: 'English',

                // login page
                welcome: 'Welcome!',
                namePrompt: 'Name:',
                passwordPrompt: 'Password:',
                emailPrompt: 'E-mail:',
                signUp: 'Sign up'
            }
        },

        loadCurrentLangFromLocalStorage: function() {
            var langInStorage = localStorage.getItem('lang');

            if (typeof langInStorage == 'undefined' || langInStorage == null) {
                langInStorage = 'en';
            }
            this.changeLang(langInStorage);

        },

        changeLang: function(lang) {
            this.currentLang = languageService.langs[lang];
            this.currentLangName = lang;
        },

        currentLang: {},
        currentLangName: ''
    };

    languageService.loadCurrentLangFromLocalStorage();
    return languageService;
});