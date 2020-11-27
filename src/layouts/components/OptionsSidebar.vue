<template>
    <q-drawer
        :value="value"
        @input="$emit('input')"

        side="right"

        show-if-above
        
        :width="65"

        content-class="bg-primary"
        :breakpoint="300"
    >
        <div class="absolute-bottom z-top row q-pa-none">
            <div class="col-12 q-pr-md q-pl-sm">
                <q-separator color="white" />
            </div>
            <div class="col-12 flex flex-center q-pr-md q-pl-sm">
                <q-btn
                    icon="fas fa-cog"
                    color="white"
                    flat
                    class="full-width"
                    size="lg"
                />
            </div>
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