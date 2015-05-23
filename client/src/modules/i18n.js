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
                signUp: 'Зарегестрироваться',
                msg_emailShouldBeFilledIn: 'E-mail должен быть заполнен',
                msg_invalidEmail: 'Не верный e-mail',
                msg_nameOfUserShouldBeFilledIn: 'Имя пользователя должно быть заполнено',
                msg_passwordShouldBeFilledIn: 'Пароль должен быть заполнен'
            },

            en: {
                languageName: 'English',

                // login page
                welcome: 'Welcome!',
                namePrompt: 'Name:',
                passwordPrompt: 'Password:',
                emailPrompt: 'E-mail:',
                signUp: 'Sign up',
                msg_emailShouldBeFilledIn: 'Email should be filled in',
                msg_invalidEmail: 'Invalid e-mail',
                msg_nameOfUserShouldBeFilledIn: 'Name of user should be filled in',
                msg_passwordShouldBeFilledIn: 'Password should be filled in'
            }
        },

        loadCurrentLangFromLocalStorage: function() {
            var langInStorage = localStorage.getItem('lang');

            if (typeof langInStorage == 'undefined' || langInStorage == null) {
                langInStorage = 'en';
            }
            this.setLang(langInStorage);

        },

        setLang: function(lang) {
            this.currentLang = this.langs[lang];
            this.currentLangName = lang;
        },

        currentLang: {},
        currentLangName: ''
    };

    languageService.loadCurrentLangFromLocalStorage();
    return languageService;
});