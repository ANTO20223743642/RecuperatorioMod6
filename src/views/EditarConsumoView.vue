<template>
    <div class="container">
        <div class="abs-center">
            
            <form action="" @submit.prevent="guardar2()">
                <div class="mb-3">
                    <label class="form-label">CONSUMOS</label>
                    <input type="text" v-model="tarea2.FechaLectura" class="form-control">
                </div>
                <textarea style="width: 100%" v-model="tarea2.Cantidad"></textarea>
                <textarea style="width: 100%" v-model="tarea2.TotalPagar"></textarea>
                <button type="submit" class="btn btn-primary m-2">Guardar</button>
                <button class="btn btn-light m-2">Cancelar</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'editarConsumoView',
    data() {
        return {
            tarea2:{
                FechaLectura: null,
                Cantidad: null,
                TotalPagar:null,
                terminado:null
            }
        }
    },
    methods: {
        getTarea2(){
            axios({
                method: "get",
                url: process.env.VUE_APP_RUTA_API+"/Consumos/"+this.$route.params.id
            })
            .then(response => {
                this.tarea2 = response.data;
            console.log(response);
            })
            .catch(e => console.log(e));
        },
        guardar2(){
            axios({
                method: "patch",
                url: process.env.VUE_APP_RUTA_API+"/Consumos/"+this.$route.params.id,
                data: this.tarea2
            })
            .then(response => {
                this.$store.state.mensaje = {
                    texto: "La Edicion fue exitosa",
                    tipo: "exito"
                };
                this.$store.dispatch('addMensajeAction');
                this.$router.push({name: 'Consumos'});
            })
            .catch(e => console.log(e));
        }
    },
    computed: {
    },
    mounted() {
        this.getTarea2()
    },
    components: {
    }
}
</script>

<style scoped>
form {
    max-width: 400px;
}
</style>