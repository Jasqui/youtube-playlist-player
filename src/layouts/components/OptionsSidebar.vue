<template>
    <q-drawer
        :value="value"
        @input="$emit('input')"

        side="right"

        show-if-above
        
        :width="70"

        content-class="bg-primary"
        :breakpoint="300"
    >
        <q-img src="~assets/quasar-logo-full.svg" />
        <div class="absolute-bottom text-center">
            <q-btn
                icon="fas fa-cog"
                color="white"
                flat
                round
                dense
                size="lg"
            />    
        </div>
    </q-drawer>    
</template>

<script>
export default {
    name: 'OptionsSidebar',
    props: {
        value: Boolean
    }
}
</script>