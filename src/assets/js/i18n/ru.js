// 中文语言包
import guide from './ru/rus-guide.js'
import handbook from './ru/rus-handbook'
import direct from './ru/direct.js'
import reference from './ru/rus-reference.js'
import entrust from './ru/rus-entrust.js'
import wallet from './ru/rus-wallet.js'
let ZH = {
  common: {
    success: 'Готово',
    noData: 'Нет данных',
    more: 'Еще',
    tip: 'Предупреждение'
  },
  header: {
    index: 'Главная',
    deposit: 'Пополнение',
    withdraw: 'Вывод',
    // notice: 'Оповещение',
    login: 'Вход',
    register: 'Выход',
    asset: 'активы',
    user: 'Аккаунт',
    logout: 'Выход',
    trade: 'Цифровой контракт',
    usdtTrade: 'контракт USDT',
    guide: 'Руководство',
    reference: 'Справочные материалы',
    information: 'Активы',
    newPlayer: 'История',
    userShow: 'Прибыльные',
    changeOldVersion: 'Старая версия',
    userSafe: 'Безопасность',
    devTool: 'Инструменты',
    invite: 'Мои приглашения',
    userAuth: 'Аутентификация ID',
    safeExit: 'Безопасный выход',
    lastLogin: 'Последний вход',
    marketableAssets: 'Подсчет чистых активов（{current}）',
    tradeHistory: 'Активы'
  },
  footer: {
    products: 'продукция',
    about_us: 'О нас',
    about_us_1: 'О компании',
    about_us_2: 'О команде',
    about_us_3: 'Свяжитесь с нами',
    about_us_4: 'Официальное оповещение',
    service_support: 'Тех.поддержка',
    service_support_1: 'API',
    service_support_2: 'Помощь',
    service_support_3: 'О цифровых активах',
    service_support_4: 'Инструкция о вводе валюты',
    service_support_5: 'SMARTChain',
    official_community: 'Официальные группы',
    official_community_1: 'Telegram',
    official_community_2: 'WeChat',
    official_community_3: 'QQ',
    downLoad: 'Загрузки',
    downLoad_1: 'iOS App',
    downLoad_2: 'Android App',
    downLoad_3: 'Google Play',
    follow: 'Подпишитесь',
    global: '58COIN GLOBAL'
  },
  //  未登录
  noSign: {
    sign_in: 'Вход',
    sign_up: 'Регистрация',
    no_sign: 'Вы еще не совершили вход',
    please: 'Пожалуйста\n',
    deal: ' и повторите снова'
  },
  // 提交委托
  trade: {
    titleName: 'Разместить ордер',
    placeOrderDefault: 'Контракты',
    placeOrderBTC: 'Bitcoin',
    unitChange: '',
    orderType: 'Тип',
    limit: 'Лимитный',
    market: 'Рыночный',
    entrustPlan: 'Триггерный',
    price: 'Цена',
    triggerPrice: 'Триг. цена',
    executePrice: 'Цена испол.',
    quantity: 'Позиции',
    buy: 'Пок.',
    long: 'Лонг',
    input: 'Введите',
    sell: 'Прод.',
    short: 'Шорт',
    cost: 'Маржа',
    layerCost: 'Маржа удерживающей позиции',
    orderValue: 'Сумма ордера',
    availableBalance: 'Баланс',
    // 传给弹窗的信息
    markPrice: 'Цена маркировки',
    positionAfter: 'Размер позиции после исполнения',
    title: 'Подтверждение',
    transfer: 'Перевод',
    buyIn: 'Пок.',
    doMore: 'Лонг',
    sellOut: 'Прод.',
    doNull: 'Шорт',
    openPosition: 'Откр.',
    closePosition: 'Зак.',
    error300016: 'Ошибка,. Попробуйте через $ сек. ',
    leverage: 'Плечо', // 0528
    latestDeal: 'Последняя цена',
    timeDeal: 'Фактическая цена',
    depth: 'Глубина слияния',
    latestPrice: 'Последняя цена',
    gains: 'Рост',
    // sizeMaxError: 'Кол-во заказов превышено',
    sizeMaxError: 'Недостаточно активов',
    sizeMinError: 'Количество меньше наименьшей единицы',
  },
  tradePrompt: {
    price: 'Введите корректную стоимость',
    size: 'Введите корректную позицию',
    triggerPrice: 'Введите корректную стоимость триггера',
    doPrice: 'Введите корректную стоимость исполнения'
  },
  transform: {
    from: 'от',
    turnOutAccount: 'Аккаунт отправителя',
    transferTo: 'Перести на',
    transferAccount: 'Cумма перевода',
    swapAccount: 'USDT Аккаунт',
    inputAccount: 'Кол-во на перевод',
    maxTransform: 'Макс. на перевод',
    allTransform: 'Перевести все',
    transform: 'Перевести',
    internalTransfer: 'Перевод на внутренние адреса без комиссий',
    tips: 'Совет：В состоянии поддержания позиции, после осуществления перевода',
    strongLevel: 'ваш уровень ликвидации будет пересчитан.',
    tipsContent: 'Чрезмерная сумма перевода увеличит риск ликвидации.\n' +
    '          Для того, чтобы избежать ненужных потерь, пожалуйста, зарезервируйте достаточный гарантийный фонд в своем аккаунте, чтобы справиться с колебаниями рынка.\n' +
    '          В состоянии поддержания позиции, можно перевести 60% баланса, не в состоянии поддержания позиции, можно перевести всю сумму.',
    same: 'Адреса отправителя и получателя не могут быть одинаковыми'
  },
  // 调节杠杆
  leverage: {
    title: 'Открытая позиция',
    contract: 'Контракт',
    ROE: 'ROE',
    all: 'Кр-мар',
    leverage: 'Кредитное плечо',
    fundingRatio: 'Финансирование',
    cross: 'Кросс-маржа', // 0515
    crossTimes: 'Кросс-маржа{times}X', // 0515
    tip1: 'Лонг = (1 – цена входа/цена маркировки) * кред.плечо',
    tip2: 'Шорт = (Цена входа/цена маркировки - 1) * кред.плечо',
    low: 'Мин.', // 0515
    high: 'Макс.', // 0515
    risk: 'Риски' // 0515
  },
  // Справочные материалы
  referenceInfo: {
    title: 'Справочные материалы',
    more: 'Еще',
    exchange: 'Обзор биржы',
    contract: 'Руководство по контрактам',
    markPrice: 'Маркировка справедливой цены',
    earnLoss: 'Руководство по прибыли и убыткам (PNL) ',
    fee: 'Комиссия',
    questions: 'Часто задаваемые вопросы',
  },
  // 行情信息
  productInfo: {
    markPrice: 'Цена марк.',
    lastPrice: 'Посл.цена',
    increase: 'Изм.',
    price: 'Цена открытых позиций',
    feeRatio: 'Финансирование',
    size: '24ч.объем',
    sizeBTC: '24ч.объем',
    highPrice: 'макс. цена',
    lowPrice: 'мин. цена'
  },
   // 委托
   createdEntrust: {
    submitOrder: 'Подать ордер',
    limit: 'Предельная',
    market: 'Рыночная',
    price: 'цена',
    positions: 'позиции',
    lot: 'лот',
    leverageInfo: "Кредитное плечо: в настоящее время используется несколько рычагов",
    limitInfo: 'Предельная цена: заказ, который должен быть выполнен по цене или по лучшей цене при исполнении. При размещении лимитного ордера вы должны указать конкретную цену.',
    buyable: 'Дост. на откр.',
    salable: 'Дост. на продажу',
    openlong: 'Откр. лонг',
    closelong: 'Закр. лонг',
    openshort: 'Откр. шорт',
    closeshort: 'Закр. шорт',
    // 确认委托弹出框
    A_confirmOrder : 'Подтверждение ордера',
    A_buy: 'Откр. поз. на покупку',
    A_contract: 'контракт',
    A_leverage: 'рычаг',
    A_direction: 'напр.',
    A_market: 'Рыноч. Цена',
    A_type: 'способ ордера',
    A_price: 'цена ордера',
    A_Amount: 'кол-во ордеров',
    A_margin: 'залог',
    A_riskLevel: 'текущ. Риск',
    A_ror: 'Доход',
    A_sell: 'Откр. поз. на продажу',
    A_limit: 'Предел. цена',
    A_buy_title: 'Покупка<span style="color:{color};">{num}</span>шт.{name}контрактов',
    A_sell_title: 'Продажа<span style="color:{color};">{num}</span>шт.{name}контрактов',
    A_buy_flat: 'Закрытие позиций на покупку',
    A_sell_flat: 'Закрытие позиций на продажу',
    marketInfo: 'Рыночная цена: для предотвращения злоупотребления и уменьшения потерь клиентов, предел рыночной цены будет установлен на уровне 3% от цены индекса. Если цена поднимается выше , операция не будет исполнена.',
    positiveNum: 'Введите полож. число',
    positiveInteger: 'Введите полож. число',
    importPrice: 'Введите цену',
    contractHand: 'Введите кол-во контрактов',
    noLeveling: 'Нет позиций',
    limitNum: 'Кол-во ордеров превышено',
    positions_tips: 'сумма значения позиции * ММ / текущий капитал (Если уровень риска составляет 100%, то запускается процесс ликвидации, обращайте внимание на уровень риска)',
    hand: 'Единица торгов (лот): также известный как мера контракта, это количество лотов, представленных в каждой сделке, торгуемой на бирже.',
    explosion: 'Эта цена исполнения может привести к ликвидации позиции',
    explosionConfirm: 'Продолжить ордер'
  },

  // 币种列表，最新成交列表
  tradeList: {
    latestPrice: 'Посл. цена',
    gains: 'Изменения',
    latestDeal: 'Последняя цена ',
    timeDeal: 'Фактическая цена ',
  },
  // 用户资产信息  我的合约资产
  asset: {
    contractAsset: 'Мои контрактные активы',
    currentAssets: 'Текущие активы',
    availableAssets: 'Доступные активы',
    margin: 'Залог',
    frozenDeposit: 'Заморож. маржа',
    unRelease: 'Нереализ. PNL',
    alreadyRealized: 'Реализовано',
    commissionFee: 'Комиссия',
    riskDegree: 'Риск',
    riskDegreeInfo: 'сумма значения позиции * ММ / текущий капитал (Если уровень риска составляет 100%, то запускается процесс ликвидации, обращайте внимание на уровень риска).',
    transform: 'Переведено',
    transfer: 'Перевод'
  },
  // 列表
  transactionList: {
    all: 'Все',
    chongzhi: 'Сброс',
    queding: 'Готово',
    zdjc: 'ADL',
    qpwt: 'ликвид. ордер',
    positions: 'Позиция',
    currentEntrustment: 'Текущий ордер',
    excuted: 'Исполненные',
    records: 'История отмен',
    closeAll: 'Закрыть позицию',
    batchCancel: 'Массовый вывод заказов',
    prompt: 'Закрытие всех позиций поддерживает только рыночные котировки, что может привести к большим рискам',
    currency: 'Валюта',
    openLeve: 'Ликвидация',
    commissionPrice: 'Цена',
    commissionAmount: 'Кол-во',
    retractable: 'Отменить',
    dealDone: 'Исполненные',
    status: 'Статус',
    time: 'Время',
    operate: 'Операция',
    type: 'Вид цены',
    reamaining: 'Остаток',
    excutedPrice: 'Цена исп.',
    excutedAmount: 'Кол-во исп.',
    fee: 'Комиссия',
    totalPosition: 'Всего',
    available: 'Доступно',
    avgPrice: 'Средняя цена',
    actualLeverage: 'Леверидж',
    occupationMargin: 'Залог',
    unrealisedPNL: 'PNL',
    profitability: 'Доходность',
    closePosition: 'Закр. позицию',
    total: 'Всего',
    expand: 'Раскрыть',
    collapse: 'Закрыть ',
    noPosition: 'Нет открытых позиций',
    noData: 'Нет данных',
    more: 'Лонг',
    less: 'Шорт',
    buy: 'Покупка',
    Sell: 'Продажа',
    // S_***  列表中用到的状态
    S_openPosition: 'Откр.',
    S_closePosition: 'Закр.',
    S_Unfilled: 'Не выполнено',
    S_PartialDeal: 'Частичная сделка',
    S_DealDone: 'Сделка выполнена',
    S_Revoked: 'Отменено',
    S_failure: 'Не удалось',
    S_LimitPrice: 'Предельная',
    S_MarketPrice: 'Рыночная',
    // A_**** 弹出框中用到的
    A_Confirm: 'Подтвердить',
    A_Cancel: 'Отмена',
    A_One_Title: 'Вы уверены, что хотите отменить этот ордер?',
    A_One_Info: 'при выполнении*, этот ордер будет отменен',
    A_All_FullFlat_Title: 'Вы уверены, что хотите закрыть все позиции?',
    A_All_FullFlat_Info: 'Все ваши позиции будут закрыты по рыночным ценам, и на ваш PNL будет влиять глубина рынка.',
    A_All_Cancel_Title: 'Вы уверены, чтобы отменить все заказы?',
    A_All_Cancel_Info: 'при выполнении*, все ордеры будут отменены',
    A_Close: 'Закрыть позицию',
    A_LimitPrice: 'Предельная',
    A_MarketPrice: 'Рыночная',
    A_Price: 'Цена',
    A_Amount: 'Кол-во',
    A_Hand: 'лот',
  },
  // 订单详情
  tradeDetailList: {
    position: 'Позиция',
    current: 'Текущие',
    already: 'Исполн.',
    record: 'Отмен.',
    planOrder: 'Триггерный',
    currencyPlan : 'Активные',
    historyPlan : 'История',
    information: 'Информация',
    contract: 'Контракт',
    contractTip: 'Код контракта',
    positionQty: 'Количество позиций',
    orderValue: 'Цена',
    positionOrderValue: 'Цена позиции',
    positionOrderValueTip: 'Цена контракта',
    entryPrice: 'Цена входа',
    entryPriceTip: 'Средняя цена покупки/продажи',
    markPrice: 'Цена марк.',
    markPriceTip: 'Последняя цена маркировки используется для расчета реализованного PNL и маржи. Может разниться с последней ценой исполнения. Не влияет на исполнение расчетов',
    liquidationPrice: 'Цена ликвидации',
    liquidationPriceTip: 'Когда цена маркировки контракта опускается ниже цены ликвидации (в случае длинных позиций) или поднимается выше цены ликвидации (в случае коротких позиций ) осуществляется ликвидация позиции',
    margin: 'Плечо',
    ratio: 'Ставка %',
    ratioTip1: 'Лонг = (1 – цена входа/цена маркировки) * кред.плечо',
    ratioTip2: 'Шорт = (цена входа/цена маркировки - 1) * кред.плечо',
    realised: 'Реал. PNL',
    unrealised: 'Нереал. PNL',
    unrealisedTip1: 'Нереализованный PNL (лонг) = кол-во позиций * （1/цена входа - 1/цена маркировки)',
    unrealisedTip2: 'Нереализованный PNL (шорт) = кол-во позиций * （1/цена маркировки - 1/цена входа)',
    more: '(лонг)',
    less: '(шорт)',
    piece: 'шт',
    operate: 'Операции',
    revocation: 'Отмена',
    size: 'Кол-во',
    price: 'Цена',
    completeDeal: 'Исполнено',
    surplus: 'Остаток',
    value: 'Стоимость',
    dealPrice: 'Цена испол.',
    entrustPrice: 'Цена ордера',
    executePrice: 'Цена испол.',
    triggerPrice: 'Триг.цена',
    type: 'Тип',
    status: 'Статус',
    date: 'Время',
    dealSize: 'Кол-во испол.',
    closed: 'Закрытые позиции',
    closedMark: '(закр.)', // 0528
    market: 'Рыночный',
    limit: 'Лимитный',
    batchRevocation: 'Отменить все',
    noPosition: 'Нет позиций',
    changeMargin: 'Изменение маржи',
    closePosition: 'Закрытие позиции',
    textPosition: 'Все открытые позиции будут закрыты',
    error300016: 'Ошибка. Попробуйте через {time} с.',
    revocationSuccess: 'Уже отменено',
    // 资产信息
    walletBalance: 'Баланс кошелька',
    walletBalanceTip: 'Баланс кошелька = Доступный баланс + Замор.маржа + Маржа позиций',
    marginBalance: 'Баланс маржи',
    usefulBalance: 'Доступно',
    usefulBalanceTip: 'Вы можете использовать маржу позиции', // 0601
    userEquity: 'Доход',
    userEquityTip: 'Ваши доходы от бессрочных контрактов',
    positionMargin: 'Маржа позиции', // 0601
    positionMarginTip: 'Маржа позиции при открытии',
    noData: 'Нет данных',
    // 0515
    closedLimit: 'Лимит. закр.',
    closedMarket: 'Рыноч. закр',
    none: 'Нет'
  },
  // information-list Глубина
  entrustList: {
    lastPrice: 'Посл.цена',
    size: 'Кол-во',
    BTC: 'Кол-во',
    price: 'Цена',
    amount: 'Объем',
    indexPrice: 'Цена индекса',
    fairPrice: 'Цена марк.',
    deep: 'глубина',
    bit: 'ед'
  },
  // history-list 历史成交
  historyList: {
    title: 'Исполнено',
    size: 'Количество',
    price: 'Цена',
    date: 'Время'
  },
  // 弹窗按钮
  layerButton: {
    cancel: 'Отмена',
    confirm: 'Ок'
  },
  // 委托(交易)弹窗
  layerTrade: {
    all: 'Кросс-маржа 100X',
    leverage: 'Кредитное плечо',
    title: 'Подтвердить',
    limit: 'Лимитный',
    market: 'Рыночный',
    buy: 'Покупка',
    sell: 'Продажа',
    cross: 'Кросс-маржа',
    textType1Coin: '{side} {size} {name} по {price} цене',
    textType1: '{side} {size} {name} по {price} цене',
    textType2Coin: '{side} {size} {name} по {type} цене',
    textType2: '{side} {size} {name} по {type} цене',
  },
  // 平仓弹窗
  layerClosed: {
    limit: 'Лимитный',
    market: 'Рыночный',
    buy: 'Покупка',
    sell: 'Продажа',
    textType1Coin: '{side} {size} {name} по {price} цене',
    textType1: '{side} {size} {name} по {price} цене',
    textType2Coin: '{side} {size} {name} по {type} цене',
    textType2: '{side} {size} {name} по {type} цене',
    text3: 'Позиции будут закрыты',
    text4: '*Все заказы будут отменены во время выполнения',
    text5: '*Заказ будет отменен во время выполнения'
  },
  layerMargin: {
    add: 'Увеличить маржу',
    reduce: 'Уменьшить маржу',
    position: 'Позиции',
    usefulMargin: 'Доступно маржи',
  },
  // 平仓弹窗 0515
  layerPositionClosed: {
    placeHolderPrice: 'Введите цену',
    placeHolderSize: 'Kоличество',
    all: 'Все',
    surplus: 'Незакр. Позиции',
    closed: 'Закрыть позиции',
    tip1: 'Ордер возможно активирует закрытие позиций. Продолжить?' // 0528
  },
  // 收益计算器
  calculate: {
    title: 'калькулятор дохода',
    profitCal: 'Прибыль',
    goalPriceCal: 'Целевая цена',
    liquidationCal: 'Цена ликвидации',
    contract: 'контракт',
    type: 'тип',
    leverage: 'леверидж',
    unit: 'единица',
    openPrice: 'стоимость открытия',
    closePrice: 'стоимостьа закрытия',
    amount: 'количество',
    balance: 'баланс',
    goalProfit: 'Цел. прибыль',
    useProfit: 'ожид. доходность',
    useProfitRate: 'ожид. норма доходности',
    calculate: 'посчитать',
    result: 'результат',
    margin: 'маржа',
    profit: 'доход',
    profitRate: 'ставка прибыли',
    goalClosePrice: 'целевая стоимость открытия(USD)',
    liquidationPrice: 'целевая стоимость закрытия(USD)',
    more: 'еще',
    less: 'меньше',
    piece: 'шт',
    tips: 'Примечание: Из-за наличия комиссионных сборов и ставок фонда в реальных транзакциях результаты расчетов могут не полностью соответствовать результатам торгов.',
    warningTips1: 'допустимый диапозон превышен, в случае нескольких ордеров, ожидаемый доход должен быть меньше количества открытых позиций',
    warningTips2: 'допустимый диапозон превышен, в случае нескольких ордеров,，ожидаемая норма прибыли не может превышать коэффициенты кредитного рычага',
  },

  // 右侧工具栏
  toolbar: {
    ewm: 'QR-код - скачайте приложение',
    ztqh: 'Ночной режим',
    userCenter: 'Аккаунт',
    announcement: 'Объявление',
    jsq: 'Калькулятор',
    yhfk: 'Обратная связь',
    lxkf: 'Обслуживание клиентов',
    hyzn: 'Руководство по контрактам',
    ewCode: 'QR-код'
  },
  // 公告弹窗
  layerAnnouncement: {
    title: 'Объявление'
  },
  panel: {
    text: 'Бессроч.'
  },
  // 推送弹窗 0515
  emerge: {
    prompt: 'Предупреждение',
    limit: 'Лимитный',
    market: 'Рыночный',
    buy: 'Покупка',
    sell: 'Продажа',
    leverage: 'Кредитное плечо',
    margin: 'Маржа',
    adjustLeverage: 'Уровень кредитного плеча',
    adjustMargin: 'Размер маржи',
    entrustSend: 'Ордер размещен',
    entrustSuccess: 'Ордер выполнен',
    entrustPart: 'Ордер частично исполнен',
    entrustAll: 'Ордер полностью исполнен',
    entrustFailed: 'Ошибка размещения',
    marketEntrustPart: 'Частичное исполнение по рыночной цене',
    revocationSuccess: 'Отменен',
    revocationBachSuccess: 'Успешная отмена партии',
    revocationFailed: 'Ошибка',
    text1: '{side} {type} {size} по {price}'
  },
  // trade index 0515
  index: {
    swap: 'SWAP-',
    titlePart: '-Ведущая глобальная торговая платформа цифровой валюты. ',
    titleAll: 'SWAP-Ведущая глобальная торговая платформа цифровой валюты. ',
    "spot": "Спот",
    "cloudy": "Хеш",
    "otc": "ОТС",
    "swap": "Своп",
    "spot_trading": "Спот",
    "futures": "Фьючерсы",
    "mine_pool": "Пул",
    "sign_in": "Вход",
    "sign_up": "Регистрация",
    "logout": "Выход",
    "user": "Аккаунт",
    "product-title1": "Ипотека",
    "product-title2": "Бессрочный контракт",
    "product-title3": "Финансирование валюты",
    "product-title4": "Валютная сделка",
    "product-title5": "Валюта OTC",
    "product_title1_c_1": "Восстановление цифровых активов",
    "product_title1_c_2": "Высокая ставка по ипотеке",
    "product_title1_c_3": "Низкая процентная ставка",
    "product_title1_c_4": "Повторное кредитование",
    "product_title1_c_5": "Неограниченное использование средств",
    "product_title1_c_6": "Решить проблему оборота капитала",
    "product_title2_c_1": "Самый удобный дизайн контрактов",
    "product_title2_c_2": "Нет фиксированного маржин-колл",
    "product_title2_c_3": "Нет сглаживания",
    "product_title2_c_4": "Нет расчетной даты",
    "product_title2_c_5": "Нет затрат при удержании позиции",
    "product_title2_c_6": "Отличная глубина и ликвидность",
    "product_title3_c_1": "Максимальное 3Х плечо",
    "product_title3_c_2": "Самая низкая процентная ставка",
    "product_title3_c_3": "Добавить кредитное плечо к основному капиталу",
    "product_title3_c_4": "Пространство для большой прибыли",
    "product_title3_c_5": "Поддержка лонгов и шортов",
    "product_title4_c_1": "Поддержка обмена цифровыми активами",
    "product_title4_c_2": "Низкая комиссия",
    "product_title4_c_3": "Сотни сделок",
    "product_title4_c_4": "Валюта чистой стоимости",
    "product_title4_c_5": "Эффективная комбинированная транзакция",
    "product_title5_c_1": "Поддержка юр. валюты для приобретения цифровых активов",
    "product_title5_c_2": "Нулевые операционные сборы",
    "product_title5_c_3": "Гарантия платформы",
    "product_title5_c_4": "Бесплатная реклама",
    "product_title5_c_5": "Гарантированная прибыль покупателей и продавцов",
    "btn": "Подробнее",
    "service_title": "58COIN  единая платформа обслуживания цифровых активов",
    "service_title1": "Первоклассные инновации",
    "service_title1_content1": "Первый бессрочный контракт",
    "service_title1_content2": "Первый ипотечный кредит",
    "service_title2": "Сильная финансовая устойчивость",
    "service_title2_content1": "Пул в десятке лучших в мире",
    "service_title2_content2": "Сидя на десятках тысяч BTC",
    "service_title3": "Поддержка высоких технологий",
    "service_title3_content1": "Основные члены от BAT, OKEx и т. Д.",
    "service_title3_content2": "Многоуровневое шифрование, высокая безопасность, высокая эффективность",
    "service_title33_content1": "Многоуровневое шифрование, высокая ",
    "service_title33_content2": "безопасность, высокая эффективность",
    "service_title4": "24ч служба поддержки клиентов",
    "service_title4_content1": "Миллионы пользователей мнгновенный ответ",
    "service_title4_content2": "Многоязычный сервис  связь без границ",
    "down_load_title": "В любое время и в любом месте   гладкая торговля",
    "down_load_content1": "посреднические сделки в режиме реального времени · мнгновенное пополнение/выведение средств",
    "down_load_content2": "ипотека контрактного плеча · Опыт Fingertip",
    "products": "Продукты",
    "about_us": "О нас",
    "about_us_1": "О компании",
    "about_us_2": "О команде",
    "about_us_3": "Свяжитесь с нами",
    "about_us_4": "Объявления",
    "service_support": "Поддержка",
    "service_support_1": "API",
    "service_support_2": "Помощь",
    "service_support_3": "О цифровых активах",
    "service_support_4": "Листинг валюты",
    "official_community": "Официальные сообщества",
    "official_community_1": "Telegram",
    "official_community_3": "QQ",
    "official_community_4": "WeChat",
    "official_community_5": "API",
    "follow": "Следите за новостями",
    "weChat": "Сканируйте код для входа в группу",
    "api": "Вступайте в API группу",
    "fee": "HOT ! ! !",
    "hot": "HOT",
    "returnTop": "Top",
    "see_more": "Подробнее",
    "downLoad": "Загрузки",
    "addSuccess": "Успешно добавлено"
  },
  // 充值状态
  depositStates: {
    WAIT: 'Ожидание поступления',
    WAIT_CONFIRM: 'Ожидание поступления',
    SUCCESSED: 'Пополнение завершено',
    FAILED: ' Ошибка пополнения'
  },
  source: {
    PC: 'Страница',
    API: 'API',
    IOS: 'IOS',
    Android: 'Android'
  },
  // 订单状态
  orderStatusList: {
    // name1: 'Все',
    name2: 'Не исполнено',
    name3: 'Ошибка',
    name4: 'Исполнено',
    name5: 'Отменено'
  },
  // 订单状态--计划委托
  planOrderStatusList: {
    name1: 'Не остановлено',
    name2: 'Остановлено',
    name3: 'Отменено'
  },
  // 订单类型
  orderTypeList: {
    'limit': 'Лимитный',
    'market': 'Рыночный',
    'plan': 'триггер'
  },
  // 爆仓类型
  orderLiquidationList: {
    'liquidation': 'Ликвидация ',
    'ADL': 'Авто-делевериджинг',
  },
  confirm: {
    cancel: 'Отмена',
    determine: 'Ок'
  },
  filter: {
    onPage: 'Пред.стр.',
    nextPage: 'След.стр.',
    select: 'Выберите',
    status: 'Статус',
    noData: 'Нет данных',
    undo: 'Отмена',
    buy: 'Покупка',
    sell: 'Продажа',
    marketPrice: 'Рыночный',
    withdrawal: 'Отмена',
    withdrawalAll: 'Отменить все ордера',
    viewHistoryWithdrawal: 'История ордеров',
    determineWithdrawal: 'Отменить данный тип ордеров',
    cancelAll: 'Вы уверены, что хотите отменить все ордеры?',
    wattNotCompletedListOne: 'Время',
    wattNotCompletedListTwo: 'Тип',
    wattNotCompletedListThree: 'Цена',
    wattNotCompletedListFour: 'Средняя цена исполнения',
    wattNotCompletedListFive: 'Количество',
    wattNotCompletedListSix: 'Количество исполнений',
    wattNotCompletedListSeven: 'Источние',
    wattNotCompletedListEight: 'Статус',
    wattNotCompletedListNine: 'Действия',
    wattNotCompletedListTen: 'Частичное исполнение',
    wattNotCompletedListEleven: 'Пара',
    type: 'Тип',
    remainAmount: 'Остаток',
    volume: 'Кол-во исполнений',
    entrustHistory: 'История',
    entrust: 'Не исполнено'
  },
  errorCode: {
    // '10': 'Ошибка входа',
    // '110': 'Пользователь не вошел в систему',
    // '101': 'Ошибка TOKEN',
    // '102': 'Ошибка',
    // '103': 'Слишком много попыток',
    // '115': 'Платежный пароль не установлен',
    // '201': 'Недостаточно данных :{parameter}',
    // '202': 'Не может быть пустым: {parameter}',
    // '203': 'Слишком короткие данные: {parameter}',
    // '204': 'Слишком длинные данные: {parameter}',
    // '205': 'Ошибка формата или типа: {parameter}',
    // '314': 'Слишком много попыток ввода платежного пароля',
    // '315': 'Платежный пароль заблокирован',
    // '316': 'Ошибка платежного пароля',
    // '9999': 'Ошибка системы',
    // '10000': 'Тайм-аут сети, попробуйте позже',
    // '30004': 'Цена или кол-во должны быть больше 0',
    // '30005': 'Кол-во меньше наименьшего количества',
    // '30006': 'Недостаточно средств',
    // '30018': 'Кол-во не может превышать 100',
    // '30019': 'Цена не может превышать1000',
    // '30023': 'Ошибка',
    // '30024': 'Ошибка',
    // '0002': 'Отменено',
    // '0003': 'Ордер размещен',
    // '00010': 'Пользователь не вошел в систему',
    // '100000': "Контракт не существует",
    601: "Неподдерживаемый тип валюты",
    602: "Недостаточно средств",
    603: "Аккаунты не могут буть одинаковыми",
    604: "Сумма трансфера не может быть ниже 0",
    605: "Достигнут лимит переводов",
    606: "У вас имеются не закрытые позиции, перевод невозможен",
    607: "Необходимо установить пару",
    608: "Ваша система не поддерживается сайтом",
    612: "Неверный тип монет",
    9999: "Ошибка системы",
    0: "Готово",
    100000: "Контракт не существует",
    200000: "Информация о рынке отсутствует",
    300000: "Ошибка направления",
    300001: "Ошибка типа",
    300002: "Цена меньше или равна 0",
    300003: "Количество меньше наименьшей единицы",
    300004: "Ошибка статуса",
    300005: "Ошибка типа времени",
    300006: "ORDER_FROM ошибка",
    300007: "Кол-во должно быть меньше 10000000",
    300008: "Не может превышать 100000",
    300009: "Кол-во не может превышать кол-ва открытых позиций", // 0515
    300010: "Закрытие позиции актив.цену ликвидации",
    300011: "В процессе расчета, торговля временно недоступно",
    300012: "Не существует",
    300013: "Нерациональная цена",
    300014: "Нерациональное количество",
    300015: "Недоступно. Не наступило время открытия",
    400000: "Нет позиций",
    400001: "Тип позиции не существует",
    400002: "Это действие приведет к закрытию по ликвид.цене",
    400003: "Мин.ед.изменения маржи 0.0001",
    400004: "При кросс-марж.изменение маржи необязательно",
    400005: "Недост.маржи позиции, нельзя уменьшить",
    400008: 'Нельзя изменить кредитное плечо', // 0515
    500000: "Ошибка входа",
    500001: "Тайм-аут входа",
    500002: "Пользователь не вошел в систему",
    500003: "Пользователь заморожен",
    500004: "Недостаточно средст",
    500005: "Не является ордером пользователя, вошедшего в систему",
    600000: "Тип валюты отсутствует",
    700000: "Слишком много попыток входа",
    700001: "Платежный пароль заблокирован",
    700002: "Неверный платежный пароль",
    800000: "Ошибка типа японской свечи",
    900000: "Недостаточно параметров",
    900001: "Ошибка типа или формата",
    999999: "Ошибка системы",
    100: 'Перевод выполнен',
    101: 'Не удалось',
    300: 'Разместить',
    301: 'Отмена',
    302: 'Отмена одного заказа',
    303: 'Отмена многих заказов',
    304: 'Позиция открыта',
    305: 'Позиция закрыта',
    306: 'Заказ отменен',
    307: 'Заказы отменены',
    400: 'Ликвидация',
    401: 'Выполнено',
    500: 'Авто-делевириджинг',
    600: 'Ночная комиссия',
    700: 'Финансовые свопы',
    10100000: "Не существует",
    10100001: "Нет данных",
    10200000: "Вход не выполнен",
    10200001: "Недостаточно средств",
    10200002: "Вошедший в систему пользователь не является пользователем заказа",
    10200003: "Торговый пароль установлен",
    10200006: "Пользователь не существует",
    10200007: "Транзакция заморожена",
    10200008: "Аккаунт заморожен",
    10300000: "Кол-во лотов превышено",
    10300001: "Колебания цен не могут превышать +-50% от цены индекса",
    10300002: "Превышено кол-во отложенных ордеров",
    10300003: "Кол-во закрытых позиций не может превышать кол-во позиций",
    10300004: "Ошибка статуса заказа",
    10300005: "Ошибка типа времени",
    10300006: "ORDER_FROM Ошибка",
    10300007: "Заказ не существует",
    10300008: "Отмена не выполнена. Кол-во доступных заказов равно 0",
    10300009: "Валютные свопы в процессе, приостановка сделок",
    10400000: "Нет позиций",
    10400002: "Действие запускает принудительное закрытие позиций",
    10500001: "Данные уже существуют",
    10500002: "Ошибка записи данных в базу данных",
    900000: "Параметр отсутствует",
    900001: "Ошибка формата или типа параметра",
    999999: "Ошибка системы"
  },
  // 推送错误码
  wsErrorCode: {
    // 20001: 'Ошибка. Недостаточно средств',
    // 20002: 'Недостаточно средств',
    // 20003: 'Запущена ликвидация, операция недоступна',
    // 20004: 'Ошибка. Недостаточно средств',
    // 20005: 'Недостаточно маржи. Уменьшение недоступно',
    // 30006: 'Нельзя исполнить рыночный ордер',
    // 30007: 'Не может превышать количества позиций', //  0515
    // 30008: 'Ошибка. Цена приведет к закрытию по ликвид.цене',
    // 30009: 'Кол-во ордеров достигло лимита',
    // 30010: 'Достигнут верхний лимит, система автом.отменит часть зак.позиций',
    // 40000: 'Позиция недоступна',
    // 40003: 'Нельзя изменить кредитное плечо' //  0515
    100: 'Перевод выполнен',
    101: 'Не удалось',
    300: 'Разместить',
    301: 'Отмена',
    302: 'Отмена одного заказа',
    303: 'Отмена многих заказов',
    304: 'Позиция открыта',
    305: 'Позиция закрыта',
    306: 'Заказ отменен',
    307: 'Заказы отменены',
    400: 'Ликвидация',
    401: 'Выполнено',
    500: 'Авто-делевириджинг',
    600: 'Ночная комиссия',
    700: 'Финансовые свопы',
    10100000: "Не существует",
    10100001: "Нет данных",
    10200000: "Вход не выполнен",
    10200001: "Недостаточно средств",
    10200002: "Вошедший в систему пользователь не является пользователем заказа",
    10200003: "Торговый пароль установлен",
    10200006: "Пользователь не существует",
    10200007: "Транзакция заморожена",
    10200008: "Аккаунт заморожен",
    10300000: "Кол-во лотов превышено",
    10300001: "Колебания цен не могут превышать +-50% от цены индекса",
    10300002: "Превышено кол-во отложенных ордеров",
    10300003: "Кол-во закрытых позиций не может превышать кол-во позиций",
    10300004: "Ошибка статуса заказа",
    10300005: "Ошибка типа времени",
    10300006: "ORDER_FROM Ошибка",
    10300007: "Заказ не существует",
    10300008: "Отмена не выполнена. Кол-во доступных заказов равно 0",
    10300009: "Валютные свопы в процессе, приостановка сделок",
    10400000: "Нет позиций",
    10400002: "Действие запускает принудительное закрытие позиций",
    10500001: "Данные уже существуют",
    10500002: "Ошибка записи данных в базу данных",
    900000: "Параметр отсутствует",
    900001: "Ошибка формата или типа параметра",
    999999: "Ошибка системы"
  },
  productList: {
    name1: 'Стандартный',
    text1: 'Лимитный',
    name2: 'IOC',
    text2: 'Лимитный(IOC)',
    name3: 'FOK',
    text3: 'Лимитный(FOK)',
    name4: 'Post-only',
    text4: 'Лимитный(Po)'
  },
  errorMessage: {
    error1: 'Введите число больше 0',
    error2: 'Введите число, содержащее',
    error3: 'наибольшее кол-во дробей',
    error4: 'Макс.к покупке',
    error5: 'Макс.к продаже',
    error6: "Введите правильный размер финансирования",
    error7: "Указанная минимальная сумма",
    error8: "Введите правильную сумму",
    error9: "Введите 2 -30 дней",
    error10: "Введите 6-значный торговый пароль",
    error11: "Наибольшее количество",
    error12: "Максимальная цена:",
    error13: "Не может превышать лимитную цену，",
    error14: "Не может превышать стоп цену，",
    turnOutAccount: "Выберите аккаунт",
    accountAddressDifferent: "Аккаунты не могут быть одинаковыми",
    turnIntoAccount: "Выберите аккаунт",
    transferAmount: "Введите правильную сумму",
    amount1: "Сумма должна быть больше 0",
    amount2: "Сумма не должна превышать макс.доступную сумму"
  },
  // 0608
  kLineType: {
    buttonName: 'Интервал',
    min: 'М',
    hours: 'Н',
    day: 'D',
    week: 'W',
  },
  tradeHistory: {
    all: 'Все',
    text: 'Пожалуйста, выберите сделку',
    selectContract: 'Наименование контракта',
    selectSite: 'Посмотреть сайт',
    contract: 'Контракт',
    size: 'Кол-во(шт)',
    dealSize: 'Исполнено',
    residue: 'Остаток',
    dealPrice: 'Цена исполн.',
    dealValue: 'Цена исполн.',
    type: 'Вид',
    entrustTime: 'Время',
    side: 'Лонг/Шорт',
    closeType: 'Откр./Закр.',
    more: 'Лонг',
    less: 'Шорт',
    open: 'Откр.',
    close: 'Закр.',
    entrustPrice: 'Цена',
    entrustSize: 'Кол-во',
    status: 'Статус',
    present: 'Баланс',
    in: 'Введено',
    out: 'Выведено',
    date: 'Дата'
  },
  // 合约指南
  guide: guide,
  // 合约指南新版
  handbook: handbook,
  // 合约新手指导
  direct: direct,
  // 参考信息
  reference: reference,
  // 委托订单
  entrust: entrust,
  // 余额
  wallet : wallet,
  // 订单详情
  orderDetail: {
    title: 'История',
    status1: 'Исполнено',
    status2: 'История',
    done: 'История сделок',
    cancel: 'История отме',
    asset: 'Активы',
  },
  // 合约赢家秀
  show: {
    text1: 'Делитесь отзывами',
    text2: 'Делитесь отзывами',
    spread: 'Подробнее>',
    backTop: 'Далее',
    getMore: 'Вверх'
  }

}

export default ZH

