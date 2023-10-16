<template>
    <v-container with-background>
        <v-progress-linear model-value="20" :height="12"></v-progress-linear>
        {{ progressMsg }}
    </v-container>
</template>

<script>
export default {
    setup () {
        
        const progressMsg = 'progressMsg message'    
        return {
            progressMsg
        }
    }
}
</script>

<style lang="scss" scoped>

</style>