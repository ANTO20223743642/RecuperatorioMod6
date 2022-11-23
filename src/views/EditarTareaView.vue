<template>
    <div class="container">
        <div class="abs-center">
            
            <form action="" @submit.prevent="guardar()">
                <div class="mb-3">
                    <label class="form-label">USUARIO</label>
                    <input type="text" v-model="tarea.Nombrecompleto" class="form-control">
                </div>
                <textarea style="width: 100%" v-model="tarea.Direccion"></textarea>
                <br>
                <textarea style="width: 100%" v-model="tarea.Celular"></textarea>
                <button type="submit" class="btn btn-primary m-2">Guardar</button>
                <button class="btn btn-light m-2">Cancelar</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'editarTareaView',
    data() {
        return {
            tarea:{
                Nombrecompleto: null,
                Direccion: null,
                Celular:null,
                terminado:null
            }
        }
    },
    methods: {
        getTarea(){
            axios({
                method: "get",
                url: process.env.VUE_APP_RUTA_API+"/Usuarios/"+this.$route.params.id
            })
            .then(response => {
                this.tarea = response.data;
            console.log(response);
            })
            .catch(e => console.log(e));
        },
        guardar(){
            axios({
                method: "patch",
                url: process.env.VUE_APP_RUTA_API+"/Usuarios/"+this.$route.params.id,
                data: this.tarea
            })
            .then(response => {
                this.$store.state.mensaje = {
                    texto: "La Edicion fue exitosamente",
                    tipo: "exito"
                };
                this.$store.dispatch('addMensajeAction');
                this.$router.push({name: 'Usuarios'});
            })
            .catch(e => console.log(e));
        }
    },
    computed: {
    },
    mounted() {
        this.getTarea()
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