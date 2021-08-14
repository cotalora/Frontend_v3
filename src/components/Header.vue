<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="" v-on:click.prevent=SetInicio>Inicio</a>
        <a class="navbar-brand" href="" v-on:click.prevent=LogOut>Salir</a>
    </nav>
</template>

<style scoped>
    .navbar {
        padding: 1.5%;
    }
</style>

<script>
    export default {
        methods: {
            SetInicio() {
                this.$router.push('/organizations').catch(()=>{});
            },
            LogOut() {
                sessionStorage.clear();
                this.$router.push('/').catch(()=>{});
            }
        }
    }
</script>