<template>
    <div>
        <v-container with-background>
            <v-row>
                <v-col
                    v-for="n in 3"
                    :key="n"
                    cols="12"
                    sm="4"
                >
                    <v-sheet 
                    class="ma-2 pa-2"
                    rounded="rounded">
                        Col
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>