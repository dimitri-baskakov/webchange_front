export default {
  currencies: {
    BTC: {
      example: '12pe45kGqQhP4zzf4PFLfSpAKoWGVF3gq2',
      exampleEmail: 'mymail@gmail.com',
      img: 'bitcoin.png',
      // key: 'btc',
      key: 'BTC',
      name: 'Bitcoin'
    },
    LTC: {
      example: 'LgWtB9V2zQ5VexdF9VkiAimKwyyRf1Fjd7',
      img: 'litecoin.png',
      // key: 'ltc',
      key: 'LTC',
      name: 'Litecoin'
    },
    ETH: {
      example: '0x08020cfd0d16fdde0e92002a313c05c49776a1fe',
      img: 'ethereum.png',
      // key: 'eth',
      key: 'ETH',
      name: 'Ethereum'
    },
    ETC: {
      example: '0x44e54d10118770615a53aa1612a9955771cc7540',
      img: 'ethereum-classic.png',
      // key: 'etc',
      key: 'ETC',
      name: 'Ethereum Classic'
    },
    BCH: {
      example: '1FRPZDUqPUcGZsmhWj47R4TJWEhnHebRGH',
      img: 'bitcoin-cash.png',
      // key: 'bch',
      key: 'BCH',
      name: 'Bitcoin Cash'
    },
    DASH: {
      example: 'Xfh68Ai8z2Nr8BnjZCHQ4XzV51jhJp24eb',
      img: 'dash.png',
      // key: 'dash',
      key: 'DASH',
      name: 'Dash'
    },
    XRP: {
      example: 'rUocf1ixKzTuEe34kmVhRvGqNCofY1NJzV',
      exampleDestinationTag: '1438028857',
      img: 'ripple.png',
      // key: 'xrp',
      key: 'XRP',
      name: 'Ripple'
    },
    XMR: {
      example: '4Hm3YrYNgczRAP7jbGCZ7vA8XwbBR8DWMU7Bm9FKZqjxQXPPcwMP1kDbK3mtBSdt2c6TmLCPiMSXa39uBiEBwkg4FVxevNi6hsLJrk5VBT',
      examplePaymentId: '77ccd2b5a3ae8003a58050497020f62b00000000000000000000000000000000',
      img: 'monero.png',
      // key: 'xmr',
      key: 'XMR',
      name: 'Monero'
    },
    ZEC: {
      example: 't1R8sdqTyArgHW9zMuxBB1s9sPXAJfA6Dcb',
      img: 'z-cash.png',
      // key: 'zec',
      key: 'ZEC',
      name: 'ZCash'
    },
    XEM: {
      example: 'NBXRN74CDW55GLFV7WEZRWNGZZJUQBEZHU3EHTHG',
      exampleMessage: '15389513869371',
      img: 'nem.png',
      // key: 'nem',
      key: 'XEM',
      name: 'Nem'
    },
    TRX: {
      example: '0xb9d0b19ed728b68f0574cceb6c31a121cff45192',
      img: 'tron.png',
      // key: 'tron',
      key: 'TRX',
      name: 'TRON'
    },
    SBER: {
      example: '4276 8401 0245 6868',
      img: 'sberbank.png',
      // key: 'sberbank',
      key: 'SBER',
      name: 'Сбербанк'
    },
    ALFA: {
      example: '1234 5432 5678 4509',
      img: 'alfabank.png',
      // key: 'alfabank',
      key: 'ALFA',
      name: 'Альфабанк'
    },
    VTB: {
      example: '4290 7800 4438 7540',
      img: 'vtb.png',
      // key: 'vtb',
      key: 'VTB',
      name: 'ВТБ'
    },
    RSST: {
      example: '5136 5598 3024 1851',
      img: 'russtandart.png',
      // key: 'russtandart',
      key: 'RSST',
      name: 'Русский Стандарт'
    },
    VSMC: {
      example: '5412 3456 7890 1234',
      exampleRecipientName: 'Иванов Иван Иванович',
      exampleBankName: 'Мособлкомбанк',
      img: 'visa.png',
      // key: 'visaMastercard',
      key: 'VSMC',
      name: 'Visa / Mastercard RUB'
    },
    QIWI: {
      example: '7 912 790 23 05',
      img: 'qiwi.png',
      // key: 'qiwi',
      key: 'QIWI',
      name: 'QIWI'
    }
  },
  currenciesCards: [
    'SBER',
    'ALFA',
    'VTB',
    'RSST',
    'VSMC'
  ],
  exchangeRequest: null,
  meta: {
    title: ''
  },
  sections: {
    partners: {
      inMenu: true,
      label: 'Партнёрка',
      loggedIn: null,
      slug: 'partners'
    },
    agreement: {
      inMenu: true,
      label: 'Соглашение',
      loggedIn: null,
      slug: 'agreement'
    },
    faq: {
      inMenu: true,
      label: 'FAQ',
      loggedIn: null,
      slug: 'faq'
    },
    contacts: {
      inMenu: true,
      label: 'Контакты',
      loggedIn: null,
      slug: 'contacts'
    },
    registration: {
      inMenu: true,
      label: 'Регистрация',
      loggedIn: false,
      slug: 'registration'
    },
    login: {
      inMenu: true,
      label: 'Вход',
      loggedIn: false,
      slug: 'login'
    },
    personalArea: {
      inMenu: true,
      label: 'Личный кабинет',
      loggedIn: true,
      sections: {
        wallets: {
          inMenu: true,
          label: 'Мои кошельки',
          loggedIn: true,
          slug: 'wallets'
        },
        history: {
          inMenu: true,
          label: 'История',
          loggedIn: true,
          slug: 'history'
        },
        referralProgram: {
          inMenu: true,
          label: 'Реферальная программа',
          loggedIn: true,
          slug: 'referral-program'
        },
        settings: {
          inMenu: true,
          label: 'Настройки',
          loggedIn: true,
          slug: 'settings'
        }
      },
      slug: 'personal-area'
    },
    logout: {
      inMenu: true,
      label: 'Выход',
      loggedIn: true,
      slug: 'logout'
    },
    passwordRecovery: {
      inMenu: false,
      label: 'Восстановление пароля',
      loggedIn: null,
      slug: 'password-recovery'
    },
    fillingInRequisites: {
      inMenu: false,
      label: 'Заполнение реквизитов',
      loggedIn: null,
      slug: 'filling-in-requisites'
    },
    payment: {
      inMenu: false,
      label: 'Оплата',
      loggedIn: null,
      slug: 'payment'
    }
  },
  rates: {},
  user: {}
}
