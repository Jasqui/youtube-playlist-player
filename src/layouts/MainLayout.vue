<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header> -->

    <playlist-sidebar v-model="leftDrawerOpen"/>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import PlaylistSidebar from './components/PlaylistSidebar.vue';

export default {
  name: 'MainLayout',
  components: { PlaylistSidebar },
  data () {
    return {
      leftDrawerOpen: true
    }
  }
}
</script>
