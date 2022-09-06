<template>
    <!-- view="lHh Lpr lFf" -->
  <q-layout
    :view="$route.name === 'index' ? 'lhh Lpr lff' : 'lHh Lpr lff'"
  >
      <!-- reveal -->
      <!-- :reveal-offset="50" -->
    <q-layout-header
      class="main-header"
    >
      <div
        class="row justify-center"
        style="max-width: 1350px; margin: 0 auto;"
      >
        <div class="col-xs-11">
          <q-toolbar
            :glossy="$q.theme === 'mat'"
            :inverted="false"
            class="main-toolbar q-pa-none"
            color="neutral"
          >
            <router-link to="/">
              <img
                alt="Webchange logo"
                src="statics/images/logo.png"
                width="170px"
              >
            </router-link>

            <q-toolbar-title>
            </q-toolbar-title>

            <!-- class="fit" -->
            <q-tabs
              align="right"
              class="main-nav-tabs"
              color="secondary"
              inverted
              v-show="$q.screen.gt.sm"
            >
                <!-- :label="section.label" -->
                <!-- :disabled="section.slug === $route.name" -->
              <q-route-tab
                :class="{ 'active-section': section.slug === $route.name }"
                :key="section.slug"
                :style="section.slug === $route.name ? 'cursor: default;' : ''"
                :to="`/${section.slug}`"
                class="main-nav-tab uppercase"
                slot="title"
                v-for="section in sections"
                v-if="section.inMenu && (section.loggedIn === null || section.loggedIn === loggedIn)"
              >
                <span
                  class="main-nav-tab__label q-title text-weight-bold"
                >
                  {{ section.label }}
                </span>
              </q-route-tab>
            </q-tabs>

            <q-btn
              @click="leftDrawerOpen = !leftDrawerOpen"
              aria-label="Menu"
              color="secondary"
              dense
              flat
              round
              v-show="$q.screen.lt.md"
            >
              <q-icon name="ion-menu"></q-icon>
            </q-btn>
          </q-toolbar>
        </div>
      </div>
      <div class="row justify-center bg-grey-9 full-width">
        <div
          class="col-xs-11"
          v-if="$route.name === 'personalArea'"
        >
          <q-tabs
            align="justify"
            color="grey-9"
            v-show="$q.screen.gt.xs"
          >
              <!-- :label="section.label" -->
              <!-- :disabled="section.slug === $route.name" -->
            <q-route-tab
              :class="{ 'bg-black': section.slug === $route.params.section }"
              :key="section.slug"
              :style="section.slug === $route.params.section ? 'cursor: default;' : ''"
              :to="`/personal-area/${section.slug}`"
              class="personal-area-tab text-grey-4"
              slot="title"
              v-for="section in sections.personalArea.sections"
            >
              <span
                class="main-nav-tab__label q-title"
              >
                {{ section.label }}
              </span>
            </q-route-tab>
          </q-tabs>
        </div>
      </div>
    </q-layout-header>

    <q-layout-drawer
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : 'bg-grey-9'"
      v-model="leftDrawerOpen"
    >
      <q-list
        class="bg-white text-secondary"
        inset-delimiter
        link
        no-border
      >
        <q-list-header>Меню</q-list-header>
          <!-- :disabled="section.slug === $route.name" -->
        <q-item
          :class="{ 'bg-secondary text-white': section.slug === $route.name }"
          :key="section.slug"
          :style="section.slug === $route.name ? 'cursor: default;' : ''"
          :to="`/${section.slug}`"
          class="uppercase"
          v-for="section in sections"
          v-if="section.inMenu && section.slug !== 'personal-area' && (section.loggedIn === null || section.loggedIn === loggedIn)"
        >
          <!-- <q-item-side icon="school"></q-item-side> -->
          <q-item-main :label="section.label"></q-item-main>
        </q-item>
      </q-list>
      <q-list
        class="text-white bg-grey-9"
        dark
        inset-delimiter
        link
        no-border
        v-if="loggedIn"
      >
        <q-list-header>Личный кабинет</q-list-header>
          <!-- v-if="section.loggedIn === null || section.loggedIn === loggedIn" -->
        <q-item
          :class="{ 'active-section bg-black text-white': section.slug === $route.params.section }"
          :key="section.slug"
          :style="section.slug === $route.params.section ? 'cursor: default;' : ''"
          :to="`/personal-area/${section.slug}`"
          class="uppercase"
          v-for="section in sections.personalArea.sections"
        >
          <!-- <q-item-side icon="school"></q-item-side> -->
          <q-item-main :label="section.label"></q-item-main>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container
      class="bg-tertiary"
    >
      <router-view></router-view>
    </q-page-container>

      <!-- reveal -->
      <!-- :reveal-offset="30" -->
    <q-layout-footer
      class="main-footer"
    >
      <div
        class="row justify-center"
        style="max-width: 1350px; margin: 0 auto;"
      >
        <div class="col-xs-11">
          <div class="row">
            <div
              class="col-xs-12 col-sm-6"
              :class="{ 'text-center': $q.screen.xs }"
            >
              <div>
                <img
                  v-if="false"
                  alt="webchange logo name"
                  src="statics/images/webchange.png"
                >
              </div>
              <div
                class="copy q-py-lg"
              >
                © Copyright 2017 - Webchange
              </div>
            </div>
            <div
              class="col-xs-12 col-sm-6"
              :class="{ 'text-center': $q.screen.xs, 'text-right': $q.screen.gt.xs }"
            >
              <br>
              <q-btn
                v-if="false"
                :href="link.href"
                :icon="link.icon"
                :key="link.name"
                color="grey"
                dense
                flat
                round
                target="_blank"
                type="a"
                v-for="link in socialLinks"
              ></q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-layout-footer>
  </q-layout>
</template>

<script>
export default {
  computed: {
    loggedIn () {
      return this.$store.getters['auth/loggedIn']
    },
    sections () {
      return this.$store.getters['data/sections']
    }
  },
  data () {
    return {
      // leftDrawerOpen: this.$q.platform.is.desktop
      leftDrawerOpen: false,
      // personalAreaSections: [
      //   {
      //     label: 'Мои кошелькиq',
      //     slug: 'wallets'
      //   },
      //   {
      //     label: 'История',
      //     slug: 'history'
      //   },
      //   {
      //     label: 'Реферальная программа',
      //     slug: 'referral-program'
      //   },
      //   {
      //     label: 'Настройки',
      //     slug: 'settings'
      //   }
      // ],
      // sections: [
      //   {
      //     label: 'Партнёрка',
      //     loggedIn: null,
      //     slug: 'partners'
      //   },
      //   {
      //     label: 'Соглашение',
      //     loggedIn: null,
      //     slug: 'agreement'
      //   },
      //   {
      //     label: 'FAQ',
      //     loggedIn: null,
      //     slug: 'faq'
      //   },
      //   {
      //     label: 'Контакты',
      //     loggedIn: null,
      //     slug: 'contacts'
      //   },
      //   {
      //     label: 'Регистрация',
      //     loggedIn: false,
      //     slug: 'registration'
      //   },
      //   {
      //     label: 'Вход',
      //     loggedIn: false,
      //     slug: 'login'
      //   },
      //   {
      //     label: 'Личный кабинет',
      //     loggedIn: true,
      //     slug: 'personal-area'
      //   },
      //   {
      //     label: 'Выход',
      //     loggedIn: true,
      //     slug: 'logout'
      //   }
      // ],
      socialLinks: [
        {
          href: '//facebook.com',
          icon: 'ion-logo-facebook',
          name: 'Facebook'
        },
        {
          href: '',
          icon: 'ion-logo-twitter',
          name: 'Twitter'
        },
        {
          href: '',
          icon: 'ion-logo-linkedin',
          name: 'Linkedin'
        },
        {
          href: '',
          icon: 'ion-logo-pinterest',
          name: 'Pinterest'
        },
        {
          href: '',
          icon: 'ion-logo-googleplus',
          name: 'Google Plus'
        },
        {
          href: '',
          icon: 'ion-logo-instagram',
          name: 'Instagram'
        },
        {
          href: '',
          icon: 'ion-logo-vk',
          name: 'ВКонтакте'
        }
      ]
    }
  },
  name: 'MainLayout'
}
</script>

<style>
</style>
