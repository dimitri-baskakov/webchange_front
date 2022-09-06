<template>
  <q-page
    class="bg-tertiary"
    padding
    style="max-width: 1350px; margin: 0 auto;"
  >
    <!-- todo: удалить -->
    <h4
      v-if="false"
    >
      {{ $q.screen.xl ? 'xl' : ($q.screen.lg ? 'lg' : ($q.screen.md ? 'md' : ($q.screen.sm ? 'sm' : ($q.screen.xs ? 'xs' : '')))) }} - {{ $q.screen.width }}
    </h4>
    <q-modal
      class="text-center"
      minimized
      v-model="addWalletOpened"
    >
      <div class="q-pa-md">
        <h5 class="no-margin no-padding">Добавление кошелька или карты</h5>
        <q-select
          :options="currenciesArray"
          stack-label="Выберите валюту, карту или кошелек"
          class="text-black q-my-lg"
          clearable
          color="white"
          inverted
          radio
          v-model="userWalletNew.currency"
        ></q-select>
        <q-input
          autofocus
          color="white"
          class="text-bold q-my-lg"
          inverted-light
          stack-label="Укажите номер кошелька или карты"
          type="text"
          v-model="userWalletNew.walletId"
        ></q-input>
        <q-btn
          @click.native="addUserWallet"
          color="secondary"
          label="Добавить"
        ></q-btn>
        <q-btn
          @click="addWalletOpened = false"
          class="q-ml-md"
          color="grey"
          label="Закрыть"
        ></q-btn>
      </div>
    </q-modal>
    <div class="row justify-center">
      <div
        class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
        style="line-height: 1.65"
      >
        <h3
          class="text-bold text-secondary text-center q-mt-none"
          style="font-size: 140%;"
        >
          {{ pageTitle }}
        </h3>
        <div
          class="row justify-center text-grey-8"
          v-if="$route.params.section === 'wallets' || !$route.params.section"
        >
          <div class="col-xs-12 col-sm-9 col-md-4 col-lg-3 col-xl-3 text-center">
            <div
              :key="key"
              v-for="(currency, key) in currencies"
            >
              <div
                @click="activeCurrency.key = key, activeCurrency.show = !activeCurrency.show"
                :class="[ activeCurrency.key === key ? 'border-primary' : 'border-white' ]"
                class="row cursor-pointer items-center bg-white round-borders text-grey-9 text-left q-py-sm q-my-xs"
                v-if="$q.screen.gt.sm || (!activeCurrency.show || (activeCurrency.key === key && activeCurrency.show))"
              >
                <div class="col-3 flex flex-center text-center">
                  <img
                    :src="`statics/images/logos/${currency.img}`"
                    size="27px"
                  >
                </div>
                <div class="col-9 text-left">
                  <span>
                    {{ currency.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-9 col-md-7 col-lg-8 col-xl-8 offset-md-1 offset-lg-1 offset-xl-1 text-center">
            <q-list
              class="round-borders no-padding"
            >
                <!-- :label="userWallet.name || `Ваш кошелек №${index + 1}`" -->
                <!-- icon-toggle -->
                <!-- :avatar="`statics/images/logos/${currencies[userWallet.currency].img}`" -->
                <!-- opened -->
                <!-- v-if="userWallet.currency === activeCurrency.key" -->
              <q-collapsible
                :key="userWallet.id"
                class="bg-white round-borders q-mb-sm"
                v-for="(userWallet, index) in userWallets.filter(userWallet => (userWallet.currency === activeCurrency.key))"
              >
                <template slot="header">
                  <q-item-side>
                    <img
                      :src="`statics/images/logos/${currencies[userWallet.currency].img}`" alt=""
                      width="35px"
                    >
                  </q-item-side>
                  <q-item-main>
                    <p
                      class="q-pt-sm"
                      @click.stop
                    >
                      {{ userWallet.name || (currenciesCards.indexOf(userWallet.currency) === -1 ? 'Ваш кошелек' : 'Ваша карта') + ` №${index + 1}` }}
                      <q-popup-edit
                        @save="editUserWallet(userWallet, 'name')"
                        buttons
                        v-model="userWallet.name"
                      >
                        <q-field>
                          <q-input v-model="userWallet.name">
                          </q-input>
                        </q-field>
                      </q-popup-edit>
                    </p>
                  </q-item-main>
                </template>
                <div class="ellipsis text-left">
                  <p>
                    {{ currencies[activeCurrency.key].name }}
                    <span v-if="currenciesCards.indexOf(userWallet.currency) === -1 && userWallet.currency !== 'QIWI'"> адрес:</span>
                    <span v-else-if="userWallet.currency === 'QIWI'"> кошелек:</span>
                    <span v-else> номер карты:</span>
                    <span>
                      {{ userWallet.walletId || currencies[userWallet.currency].example }}
                      <q-popup-edit
                        @save="editUserWallet(userWallet, 'walletId')"
                        buttons
                        v-model="userWallet.walletId"
                      >
                        <q-field>
                          <q-input
                            :placeholder="currencies[userWallet.currency].example"
                            v-model="userWallet.walletId"
                          >
                          </q-input>
                        </q-field>
                      </q-popup-edit>
                    </span>
                  </p>
                  <!-- XRP, XMR, XEM -->
                  <p v-if="userWallet.currency === 'XRP'">
                    Destination Tag:
                    <span>
                      {{ userWallet.destinationTag || 'без Destination Tag' }}
                      <q-popup-edit
                        @save="editUserWallet(userWallet, 'destinationTag')"
                        buttons
                        v-model="userWallet.destinationTag"
                      >
                        <q-field>
                          <q-input
                            :placeholder="currencies[userWallet.currency].exampleDestinationTag"
                            v-model="userWallet.destinationTag"
                          >
                          </q-input>
                        </q-field>
                      </q-popup-edit>
                    </span>
                  </p>
                  <p v-if="userWallet.currency === 'XMR'">
                    Payment ID:
                    <span>
                      {{ userWallet.paymentId || 'без Payment ID' }}
                      <q-popup-edit
                        @save="editUserWallet(userWallet, 'paymentId')"
                        buttons
                        v-model="userWallet.paymentId"
                      >
                        <q-field>
                          <q-input
                            :placeholder="currencies[userWallet.currency].examplePaymentId"
                            v-model="userWallet.paymentId"
                          >
                          </q-input>
                        </q-field>
                      </q-popup-edit>
                    </span>
                  </p>
                  <p v-if="userWallet.currency === 'XEM'">
                    Message:
                    <span>
                      {{ userWallet.message || 'без Message' }}
                      <q-popup-edit
                        @save="editUserWallet(userWallet, 'message')"
                        buttons
                        v-model="userWallet.message"
                      >
                        <q-field>
                          <q-input
                            :placeholder="currencies[userWallet.currency].exampleMessage"
                            v-model="userWallet.message"
                          >
                          </q-input>
                        </q-field>
                      </q-popup-edit>
                    </span>
                  </p>
                  <p v-if="currenciesCards.indexOf(userWallet.currency) >= 0">
                    ФИО отправителя:
                    <span>
                      {{ userWallet.recipientName || currencies['VSMC'].exampleRecipientName }}
                      <q-popup-edit
                        @save="editUserWallet(userWallet, 'recipientName')"
                        buttons
                        v-model="userWallet.recipientName"
                      >
                        <q-field>
                          <q-input
                            :placeholder="currencies['VSMC'].exampleRecipientName"
                            v-model="userWallet.recipientName"
                          >
                          </q-input>
                        </q-field>
                      </q-popup-edit>
                    </span>
                  </p>
                  <p v-if="userWallet.currency === 'VSMC'">
                    Название банка:
                    <span>
                      {{ userWallet.bankName || currencies[userWallet.currency].exampleBankName }}
                      <q-popup-edit
                        @save="editUserWallet(userWallet, 'bankName')"
                        buttons
                        v-model="userWallet.bankName"
                      >
                        <q-field>
                          <q-input
                            :placeholder="currencies[userWallet.currency].exampleBankName"
                            v-model="userWallet.bankName"
                          >
                          </q-input>
                        </q-field>
                      </q-popup-edit>
                    </span>
                  </p>
                    <!-- hide-underline -->
                  <q-uploader
                    :url="'webchange.org/api/v1/uploader'"
                    auto-expand
                    stack-label="Загрузить фотографию для верификации"
                    v-if="currenciesCards.indexOf(userWallet.currency) >= 0"
                  >
                  </q-uploader>
                  <!-- <div
                    class="q-body-1 text-left"
                  >
                    <q-checkbox
                      checked-icon="ion-checkbox-outline"
                      color="secondary"
                      unchecked-icon="ion-square-outline"
                      v-model="userWallet.withoutDestinationTag"
                    >
                      &nbsp; Без Destination tag
                    </q-checkbox>
                  </div> -->
                  <q-btn
                    @click="removeUserWallet(userWallet.id)"
                    class="q-mt-lg q-py-sm q-px-md uppercase"
                    size="xs"
                  >
                    <span class="q-subheading text-bold">
                      Удалить
                    </span>
                  </q-btn>
                </div>
              </q-collapsible>
              <div
                v-if="!userWallets.filter(userWallet => (userWallet.currency === activeCurrency.key)).length"
              >
                Нет сохраненных кошельков
              </div>
            </q-list>
            <q-btn
              @click="addWalletOpened = true"
              class="q-mt-lg q-py-sm q-px-md uppercase"
              color="secondary"
              size="lg"
            >
              <span class="q-subheading text-bold">
                Добавить кошелек
              </span>
            </q-btn>
          </div>
        </div>
        <div
          :style="$q.screen.gt.sm ? 'font-size: 90%;' : 'font-size: 80%;'"
          class="row justify-center text-grey-8"
          v-if="$route.params.section === 'history'"
        >
          <div class="col-xs-12 col-sm-11 col-md-12 col-lg-12 col-xl-12 text-center">
              <!-- opened -->
            <q-collapsible
              :key="history.id"
              class="bg-white ellipsis round-borders q-mb-sm"
              v-for="history in userWalletsHistories"
            >
              <template slot="header">
                <q-item-main>
                  <div class="row">
                    <div
                      :class="{ 'text-center': $q.screen.lt.md, 'text-left': $q.screen.gt.sm }"
                      class="col-xs-12 col-sm-12 col-md-1 col-lg-2"
                    >
                      <!-- {{ history.walletId }} -->
                      {{ history.requestNumber }}
                    </div>
                      <!-- :class="{ 'text-center': $q.screen.xs, 'text-left': $q.screen.gt.xs }" -->
                    <div
                      class="col-xs-12 col-sm-12 col-md-3 col-lg-2 text-center"
                    >
                      {{ history.createdAt }}
                    </div>
                      <!-- :class="{ 'text-right': $q.screen.xs, 'flex flex-center': $q.screen.gt.xs }" -->
                    <div
                      class="col-xs-12 col-sm-12 col-md-2 col-lg-2 flex flex-center"
                      v-if="$q.screen.gt.sm"
                    >
                      <img
                        :src="`statics/images/logos/${currencies[history.currencyFrom].img}`"
                        size="27px"
                      >
                      <q-icon
                        class="q-mx-xs"
                        name="ion-arrow-round-forward"
                        size="30px"
                      ></q-icon>
                      <img
                        :src="`statics/images/logos/${currencies[history.currencyTo].img}`"
                        size="27px"
                      >
                    </div>
                    <div
                      class="col-5 text-right"
                      v-if="$q.screen.lt.md"
                    >
                      <img
                        :src="`statics/images/logos/${currencies[history.currencyFrom].img}`"
                        size="27px"
                      >
                    </div>
                    <div
                      class="col-2 flex flex-center"
                      v-if="$q.screen.lt.md"
                    >
                      <q-icon
                        :style="$q.screen.lt.md ? 'opacity: 0' : ''"
                        class="q-mx-xs"
                        name="ion-arrow-round-forward"
                        size="30px"
                      ></q-icon>
                    </div>
                    <div
                      class="col-5 text-left"
                      v-if="$q.screen.lt.md"
                    >
                      <img
                        :src="`statics/images/logos/${currencies[history.currencyTo].img}`"
                        size="27px"
                      >
                    </div>
                    <div
                      class="col-xs-12 col-sm-12 col-md-5 col-lg-4 text-center"
                      v-if="$q.screen.gt.sm"
                    >
                      <span>
                        {{ history.amount.valueFrom }} {{ history.amount.currencyFrom }}
                      </span>
                      <q-icon
                        class="q-mx-xs"
                        name="ion-arrow-round-forward"
                        size="30px"
                      ></q-icon>
                      <span>
                        {{ history.amount.valueTo }} {{ history.amount.currencyTo }}
                      </span>
                    </div>
                    <div
                      class="col-5 text-right"
                      v-if="$q.screen.lt.md"
                    >
                      <span>
                        {{ history.amount.valueFrom }}<br>{{ history.amount.currencyFrom }}
                      </span>
                    </div>
                    <div
                      class="col-2 text-center"
                      v-if="$q.screen.lt.md"
                    >
                      <q-icon
                        class="q-mx-xs"
                        name="ion-arrow-round-forward"
                        size="30px"
                      ></q-icon>
                    </div>
                    <div
                      class="col-5 text-left"
                      v-if="$q.screen.lt.md"
                    >
                      <span>
                        {{ history.amount.valueTo }}<br>{{ history.amount.currencyTo }}
                      </span>
                    </div>
                    <div
                      :class="{ 'text-left': $q.screen.gt.sm, 'text-center': $q.screen.lt.md }"
                      class="col-xs-12 col-sm-12 col-md-1 col-lg-2"
                    >
                      <span>
                        {{ history.status }}
                      </span>
                    </div>
                  </div>
                </q-item-main>
              </template>
              <div
                class="row"
                v-if="$q.screen.gt.sm"
              >
                <div class="flex flex-center">
                  <img
                    :src="`statics/images/logos/${currencies[history.currencyFrom].img}`"
                    size="27px"
                  >&nbsp;
                  {{ history.addressFrom }}
                  <q-icon
                    class="q-mx-xs"
                    name="ion-arrow-round-forward"
                    size="30px"
                  ></q-icon>
                  <img
                    :src="`statics/images/logos/${currencies[history.currencyTo].img}`"
                    size="27px"
                  >&nbsp;
                  {{ history.addressTo }}
                </div>
              </div>
              <div
                class="row"
                v-if="$q.screen.lt.md"
              >
                <div class="col-12 text-left">
                  <img
                    :src="`statics/images/logos/${currencies[history.currencyFrom].img}`"
                    size="27px"
                  >
                </div>
                <div class="col-12 text-left">
                  {{ history.addressFrom }}
                </div>
                <div class="col-12 text-left">
                  <q-icon
                    class="q-mx-xs"
                    name="ion-arrow-round-down"
                    size="30px"
                  ></q-icon>
                </div>
                <div class="col-12 text-left">
                  <img
                    :src="`statics/images/logos/${currencies[history.currencyTo].img}`"
                    size="27px"
                  >
                </div>
                <div class="col-12 text-left">
                  {{ history.addressTo }}
                </div>
              </div>
              <div class="row">
                <p class="text-left">
                  <strong>Заявка создана: </strong>{{ history.createdAt }}
                  <br>
                  <strong>Заявка выполнена: </strong>{{ history.completedAt }}
                  <br>
                  <strong>Курс обмена: </strong>
                  <span>
                    {{ history.amount.rateFrom }} {{ history.amount.currencyFrom }}
                  </span>
                  =
                  <span>
                    {{ history.amount.rateTo }} {{ history.amount.currencyTo }}
                  </span>
                </p>
              </div>
            </q-collapsible>
            <div
              v-if="!userWalletsHistories.length"
              class="row items-center bg-white round-borders text-grey-9 text-center q-py-sm q-my-xs q-px-sm"
            >
              <div
                class="col-12"
              >
                У Вас пока нет заявок
              </div>
            </div>
          </div>
        </div>
        <div
          class="row justify-center text-grey-8"
          v-if="$route.params.section === 'referral-program'"
        >
          <div class="col-12">
            <h6 class="q-mb-md q-mt-none text-center">
              Условия
            </h6>
            <p class="text-center">
              Повседневная практика показывает, что консультация с широким активом требуют от нас анализа систем массового участия. Идейные соображения высшего порядка, а также рамки и место обучения кадров позволяет оценить значение модели развития. С другой стороны постоянный количественный рост и сфера нашей активности играет важную роль в формировании существенных финансовых и административных условий. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности обеспечивает широкому кругу (специалистов) участие в формировании существенных финансовых и административных условий. Задача организации, в особенности же консультация с широким активом позволяет выполнять важные задания по разработке соответствующий условий активизации.
            </p>
            <!-- :actions="[
              { label: 'Копировать', handler: () => { this.$q.notify('Скопировано в буфер обмена') } }
            ]" -->
            <div
              color="white"
              class="row bg-white full-width overflow-hidden q-mb-sm q-pa-md round-borders"
            >
              <div
                :class="$q.screen.lt.md ? 'text-center' : ''"
                class="col-xs-12 col-sm-12 col-md-9 text-grey-9"
              >
                <q-icon
                  size="35px"
                  name="ion-link"
                  class="q-mr-md"
                >
                </q-icon>
                <span class="non-selectable text-bold text-secondary">Ваша реферальная ссылка:</span>
                <br v-if="$q.screen.lt.md">
                <span class="q-px-sm text-grey-9">{{ userReferral.reference }}</span>
                <input
                  type="hidden"
                  ref="referral"
                  :value="userReferral.reference"
                >
              </div>
              <div
                :class="$q.screen.gt.sm ? 'text-right' : 'text-center'"
                class="col-xs-12 col-sm-12 col-md-3"
              >
                <q-btn
                  @click.stop.prevent="copyReferral"
                  class="uppercase"
                  color="secondary"
                  size="md"
                >
                  Скопировать
                </q-btn>
              </div>
            </div>
            <h6 class="q-mb-md q-mt-xl text-center">
              Статистика
            </h6>
            <div class="bg-white round-borders full-width q-mb-sm q-px-md q-py-sm">
              <div class="">
                <strong>Количество переходов по ссылке:</strong> {{ userReferral.linkClicks }}
              </div>
            </div>
              <!-- opened -->
            <q-collapsible
              class="bg-white round-borders q-mb-sm"
            >
              <template slot="header">
                <q-item-main>
                  <div class="row">
                    <div class="col text-left">
                      <strong>Рефералов зарегистрировано:</strong> {{ userReferral.referrals.length || 0 }}
                    </div>
                  </div>
                </q-item-main>
              </template>
              <div class="row">
                <!-- todo: если будет id, надо :key="referral.id" -->
                <div
                  :key="index"
                  class="col-xs-12 col-sm-6 col-md-4"
                  v-for="(referral, index) in userReferral.referrals"
                >
                  {{ referral.email }}
                </div>
              </div>
            </q-collapsible>
              <!-- opened -->
            <q-collapsible
              class="bg-white round-borders q-mb-sm"
            >
              <template slot="header">
                <q-item-main>
                  <div class="row">
                    <div class="col text-left">
                      <strong>Начислено (со времени последнего снятия):</strong>
                      {{ userReferral.accruals.reduce((prev, cur) => {
                        return prev + cur.payment.value
                      }, 0) || 0 }}
                      {{ userReferral.accruals[0].payment.currency || 'USD' }}
                    </div>
                  </div>
                </q-item-main>
              </template>
              <div
                :class="$q.screen.xs ? 'q-mb-md' : ''"
                :key="accrual.id"
                :style="$q.screen.gt.sm ? 'font-size: 90%;' : 'font-size: 80%;'"
                class="row q-mb-xs"
                v-for="accrual in userReferral.accruals"
              >
                <div class="col-xs-6 col-sm-2 col-md-2 text-left">
                  <strong>{{ accrual.referralEmail }}</strong>
                </div>
                <div
                  :class="$q.screen.lt.md ? 'text-right' : 'text-center'"
                  class="col-xs-6 col-sm-2 col-md-2"
                >
                  <span>
                    {{ accrual.date }}
                  </span>
                </div>
                <div
                  class="col-sm-2 col-md-2 flex flex-center"
                  v-if="$q.screen.gt.xs"
                >
                  <img
                    :src="`statics/images/logos/${currencies[accrual.currencyFrom].img}`"
                    size="27px"
                  >
                  <q-icon
                    class="q-mx-xs"
                    name="ion-arrow-round-forward"
                    size="30px"
                  ></q-icon>
                  <img
                    :src="`statics/images/logos/${currencies[accrual.currencyTo].img}`"
                    size="27px"
                  >
                </div>
                <div
                  class="col-sm-4 col-md-4 text-center"
                  v-if="$q.screen.gt.xs"
                >
                  <span>
                    {{ accrual.amount.valueFrom }} {{ accrual.amount.currencyFrom }}
                  </span>
                  <q-icon
                    class="q-mx-xs"
                    name="ion-arrow-round-forward"
                    size="30px"
                  ></q-icon>
                  <span>
                    {{ accrual.amount.valueTo }} {{ accrual.amount.currencyTo }}
                  </span>
                </div>
                <div
                  class="col-5 text-right"
                  v-if="$q.screen.xs"
                >
                  <img
                    :src="`statics/images/logos/${currencies[accrual.currencyFrom].img}`"
                    size="27px"
                  >
                </div>
                <div
                  class="col-2 flex flex-center"
                  v-if="$q.screen.xs"
                >
                  <q-icon
                    class="q-mx-xs"
                    name="ion-arrow-round-forward"
                    size="30px"
                  ></q-icon>
                </div>
                <div
                  class="col-5 text-left"
                  v-if="$q.screen.xs"
                >
                  <img
                    :src="`statics/images/logos/${currencies[accrual.currencyTo].img}`"
                    size="27px"
                  >
                </div>
                <div
                  class="col-5 text-right"
                  v-if="$q.screen.xs"
                >
                  <span>
                    {{ accrual.amount.valueFrom }} {{ accrual.amount.currencyFrom }}
                  </span>
                </div>
                <div
                  class="col-2 flex flex-center"
                  v-if="$q.screen.xs"
                >
                  <q-icon
                    class="q-mx-xs"
                    name="ion-arrow-round-forward"
                    size="30px"
                    style="opacity: 0;"
                  ></q-icon>
                </div>
                <div
                  class="col-5 text-left"
                  v-if="$q.screen.xs"
                >
                  <span>
                    {{ accrual.amount.valueTo }} {{ accrual.amount.currencyTo }}
                  </span>
                </div>
                <div
                  :class="$q.screen.xs ? 'text-center' : 'text-left'"
                  class="col-xs-12 col-sm-2 col-md-2"
                >
                  <span>
                    {{ accrual.payment.value }} {{ accrual.payment.currency }}
                  </span>
                </div>
                <hr
                  style="width: 100%;"
                  v-if="$q.screen.lt.md"
                >
              </div>
            </q-collapsible>
              <!-- opened -->
            <q-collapsible
              class="bg-white round-borders q-mb-sm"
            >
              <template slot="header">
                <q-item-main>
                  <div class="row">
                    <div class="col text-left">
                      <strong>Ваш доход (все выплаты):</strong>
                      {{ userReferral.profits.reduce((prev, cur) => {
                        return prev + cur.payment.value
                      }, 0) || 0 }}
                      {{ userReferral.profits[0].payment.currency || 'USD' }}
                    </div>
                  </div>
                </q-item-main>
              </template>
              <div
                :class="$q.screen.xs ? 'q-mb-md' : ''"
                :key="profit.id"
                :style="$q.screen.gt.sm ? 'font-size: 90%;' : 'font-size: 80%;'"
                class="row q-mb-xs"
                v-for="profit in userReferral.profits"
              >
                <div class="col-xs-12 col-sm-3 text-left">
                  <strong>{{ profit.date }}</strong>
                </div>
                <div
                  :class="$q.screen.xs ? 'row text-left' : 'flex flex-center'"
                  class="col-xs-12 col-sm-7"
                >
                  <div class="flex flex-center">
                    <img
                      :src="`statics/images/logos/${currencies[profit.currency].img}`"
                      size="27px"
                    >
                    {{ profit.walletId }}
                  </div>
                </div>
                <div class="col-xs-12 col-sm-2 text-left">
                  <span>
                    {{ profit.payment.value }} {{ profit.payment.currency }}
                  </span>
                </div>
                <hr
                  style="width: 100%;"
                  v-if="$q.screen.xs"
                >
              </div>
            </q-collapsible>
          </div>
        </div>
        <div
          class="row justify-center text-grey-8"
          v-if="$route.params.section === 'settings'"
        >
          <div class="col-xs-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 text-center">
            <h6 class="q-mt-none">
              Сменить пароль
            </h6>
            <form
              @submit.prevent="changePassword"
              action="#"
              class="container text-center"
            >
              <q-input
                :error="$v.form.passwordOld.$error"
                @blur="$v.form.passwordOld.$touch"
                autofocus
                class="text-bold q-my-lg"
                color="white"
                inverted-light
                stack-label="Старый пароль"
                type="password"
                v-model="form.passwordOld"
              ></q-input>
              <q-input
                :error="$v.form.password.$error"
                @blur="$v.form.password.$touch"
                class="text-bold q-my-lg"
                color="white"
                inverted-light
                stack-label="Новый пароль"
                type="password"
                v-model="form.password"
              ></q-input>
              <q-input
                :error="$v.form.passwordConfirmation.$error"
                @blur="$v.form.passwordConfirmation.$touch"
                class="text-bold q-my-lg"
                color="white"
                inverted-light
                stack-label="Повторите новый пароль"
                type="password"
                v-model="form.passwordConfirmation"
              ></q-input>
              <q-btn
                class="q-py-sm q-px-md uppercase"
                color="secondary"
                size="lg"
                type="submit"
              >
                <span class="q-subheading text-bold">
                  Изменить
                </span>
              </q-btn>
            </form>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  required,
  sameAs
} from 'vuelidate/lib/validators'

export default {
  components: {
  },
  computed: {
    currencies: function () {
      return this.$store.getters['data/currencies']
    },
    currenciesCards: function () {
      return this.$store.getters['data/currenciesCards']
    },
    currenciesArray: function () {
      var tempCurrenciesArray = Object.values(this.$store.getters['data/currencies']).map(currency => {
        return {
          label: currency.name,
          value: currency.key
          // value: currency.key.toUpperCase()
        }
      })
      return tempCurrenciesArray
    },
    pageTitle () {
      return this.$store.getters['data/metaTitle']
    },
    'userWalletNew.currency': function () {
      return {
        label: this.activeCurrency.name,
        value: this.activeCurrency.key
        // value: this.activeCurrency.key.toUpperCase()
      }
    },
    userReferral () {
      return this.$store.getters['data/userReferral']
    },
    userWallets () {
      return this.$store.getters['data/userWallets']
    },
    userWalletsHistories () {
      return this.$store.getters['data/userWalletsHistories']
    }
  },
  data: () => ({
    activeCurrency: {
      amount: null,
      key: 'BTC',
      show: false
    },
    addWalletOpened: false,
    agreementChecked: true,
    form: {
      passwordOld: '',
      password: '',
      passwordConfirmation: ''
    },
    // referral: '',
    userWalletNew: {
      // currency: {},
      walletId: ''
    },
    withoutDestinationTag: false,
    withoutMessage: false,
    withoutPaymentId: false
  }),
  methods: {
    addUserWallet () {
      this.$store.dispatch('data/addUserWallet', this.userWalletNew)
        .then(response => {
          this.userWalletNew.walletId = ''
          this.userWalletNew.currency = {}
        }, error => {
          // todo: удалить или заменить
          this.$q.notify({
            icon: 'ion-warning',
            message: error.response.message || 'Кошелек сохранить не удалось',
            timeout: 5000
          })
        })
    },
    changePassword () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Не все поля заполнены верно.')
        return
      }
      this.$store.dispatch('auth/changePassword', this.form)
        .then(response => {
          this.form.passwordOld =
          this.form.password =
          this.form.passwordConfirmation = ''
          this.$router.push('/personal-area')
        }, error => {
          // todo: удалить или заменить
          this.$q.notify({
            icon: 'ion-warning',
            message: `Ошибка ${error}`,
            timeout: 5000
          })
          this.form.passwordOld =
          this.form.password =
          this.form.passwordConfirmation = ''
          this.$router.push('/personal-area')
        })
    },
    copyReferral () {
      let testingCodeToCopy = this.$refs.referral
      testingCodeToCopy.setAttribute('type', 'text')
      testingCodeToCopy.select()
      try {
        var successful = document.execCommand('copy')
        if (successful) {
          this.$q.notify({
            message: 'Ссылка скопирована в буфер обмена.',
            type: 'positive'
          })
        } else {
          this.$q.notify({
            message: 'Cкопируйте ссылку вручную.',
            type: 'negative'
          })
        }
      } catch (err) {
        this.$q.notify('Cкопируйте ссылку вручную. Ваш браузер не поддерживает копирование в буфер обмена.')
      }
      /* unselect the range */
      testingCodeToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    },
    editUserWallet (wallet, field) {
      this.$store.dispatch('data/editUserWallet', {
        wallet: wallet,
        field: field
      })
        .then(undefined, error => {
          // todo: удалить или заменить
          this.$q.notify({
            icon: 'ion-warning',
            message: error.response.message || 'Кошелек сохранить не удалось',
            timeout: 5000
          })
        })
    },
    getUserInfo () {
      this.$store.dispatch('data/getUserInfo')
        .then(undefined, error => {
          if (error.response.status >= 500) {
            this.$q.notify({
              icon: 'ion-alert',
              message: 'Не удалось получить информацию. Ошибка сервера.',
              timeout: 7000,
              type: 'negative'
            })
            return
          }
          let messages = Array.from(Object.values(error.response.data)).flat()
          messages.forEach(function (message) {
            if (typeof message === 'string') {
              this.$q.notify({
                icon: 'ion-alert',
                message: message,
                timeout: 7000,
                type: 'negative'
              })
            }
          }.bind(this))
        })
    },
    removeUserWallet (id) {
      this.$store.dispatch('data/removeUserWallet', id)
        .then(undefined, error => {
          // todo: удалить или заменить
          this.$q.notify({
            icon: 'ion-warning',
            message: error.response.message || 'Кошелек удалить не удалось',
            timeout: 5000
          })
        })
    }
  },
  mounted () {
    this.getUserInfo()
  },
  validations: {
    form: {
      passwordOld: {
        required
      },
      password: {
        required
      },
      passwordConfirmation: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  }
}
</script>

<style>
</style>
