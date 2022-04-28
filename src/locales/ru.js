export default {
    translation: {
        header: {
            title: 'Hexlet Chat',
            logOut: 'Выйти'
        },
        channels: {
            title: 'Каналы',
            remove: 'Удалить',
            rename: 'Переименовать',
            addBtn: '+'
        },
        messages: {
            typePlaceholder: 'Введите сообщение...',
            sendBtn: 'Send',
            counter: {
                key_zero: '{{count}} сообщений',
                key_one: '{{count}} сообщение',
                key_few: '{{count}} сообщения',
                key_many: '{{count}} сообщений',
                key_other: '{{count}} сообщений',
            },
        },
        signIn: {
            title: 'Войти',
            namePlaceholder: 'Ваш ник',
            passwordPlaceholder: 'Пароль',
            submitBtn: 'Войти',
            footer: {
                text: 'Нет аккаунта?',
                linkText: 'Регистрация',
            },
        },
        signUp: {
            title: 'Регистрация',
            namePlaceholder: 'Имя пользователя',
            passwordPlaceholder: 'Пароль',
            confirmPasswordPlaceholder: 'Подтвердите пароль',
            submitBtn: 'Зарегистрироваться',
        },
        formErrors: {
            required: 'Обязательное поле',
            from3To20: 'От 3 до 20 символов',
            incorrectUserData: 'Неверные имя пользователя или пароль',
            atLeast6: 'Не менее 6 символов',
            passwordsMatch: 'Пароли должны совпадать',
            userexists: 'Такой пользователь уже существует',
            mustBeUnique: 'Должно быть уникальным'
        },
        modals: {
            addChannel: {
                title: 'Добавить канал',
                cancleBtn: 'Отменить',
                submitBtn: 'Отправить',
            },
            removeChannel: {
                title: 'Удалить канал',
                bodyText: 'Уверены?',
                cancleBtn: 'Отменить',
                submitBtn: 'Удалить',
            },
            renameChannel: {
                title: 'Переименовать канал',
                cancleBtn: 'Отменить',
                submitBtn: 'Отправить',
            }
        },
        notFoundPage: {
            title: 'Страница не найдена',
            body: {
                text: 'Но вы можете перейти',
                link: 'на главную страницу'
            }
        },
        notify: {
            error: {
                connect: 'Ошибка соединения',
            },
            success: {
                addChannel: 'Канал создан',
                removeChannel: 'Канал удалён',
                renameChannel: 'Канал переименован',
            }
        },
    }
}