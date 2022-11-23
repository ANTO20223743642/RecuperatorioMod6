<template>
    <div>
        <h1>Usuarios</h1>
        <form @submit.prevent="agregarTarea()">
            <div class="input-group mb-3">
                <input type="text" class="form-control" v-model="tarea.Nombrecompleto" placeholder="Nuevo Usuario"
                    aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary" type="submit">Agregar</button>
            </div>
        </form>
        <h5>Buscador de Usuarios {{textoABuscar}}</h5>
        <form action="">
        <div class="input-group mb-3">
            <input type="text" v-model="textoABuscar" class="form-control" placeholder="Buscar Usuarios" >
            <button class="btn btn-outline-secondary" @click.prevent="getTareas()">Buscar</button>
        </div>
       </form> 

       <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                :checked="$store.state.soloTerminado" v-on:input="$store.state.soloTerminado = $event.target.checked">
            <label class="form-check-label" for="flexSwitchCheckChecked">Mostrar solo Activos
            </label>
        </div>

        <div class="accordion" id="accordionExample">

            <div class="accordion-item" v-for="(value, index) in lista">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        :data-bs-target="`#collapseTwo${index}`" aria-expanded="false"
                        :aria-controls="`collapseTwo${index}`">
                        <input type="checkbox" :checked="value.terminado"
                            @click="setearCheckbox(value.terminado, value.id)">
                        {{value.Nombrecompleto}}
                    </button>
                </h2>
                <div :id="`collapseTwo${index}`" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        {{value.Direccion}}
                        
                                                               {{value.Celular}}
                        <app-acciones @onAccion="irA($event, value.id)"></app-acciones>

                    </div>
                </div>
                
            </div>

        </div>


    </div>
</template>

<script>
import AppAcciones from '@/components/AppAcciones.vue';
export default {
    name: 'tareaView',
    data() {
        return {
            soloTeminado: false,
            textoABuscar: '',
            tarea: {
                Nombrecompleto: null,
                Direccion: null,
                Celular: null,
                terminado: false
            },
            tareas: []
        }
    },
    methods: {
        agregarTarea() {
            axios({
                method: "post",
                url: process.env.VUE_APP_RUTA_API+"/Usuarios",
                data: this.tarea
            })
                .then(response => {
                    console.log(response);
                    this.tarea.Nombrecompleto = null;
                    this.getTareas();
                })
                .catch(e => console.log(e));
        },
        getTareas() {
            axios({
                method: "get",
                url: process.env.VUE_APP_RUTA_API+"/Usuarios/?q="+this.textoABuscar
            })
                .then(response => {
                    this.tareas = response.data;
                    console.log(response);
                })
                .catch(e => console.log(e));
        },
        setearCheckbox(terminado, id) {
            axios({
                method: "patch",
                url: process.env.VUE_APP_RUTA_API+"/Usuarios/" + id,
                data: {
                    terminado: !terminado
                }
            })
                .then(response => {
                    console.log(response);
                })
                .catch(e => console.log(e));
        },
        irA(opcion, tarea_id) {
            if (opcion === 'editar') {
                this.$router.push({ name: 'editarTarea', params: { id: tarea_id } });
            } else {
                if (confirm("Esta seguro de eliminar al Usuario ?")) {
                    axios({
                        method: "delete",
                        url: process.env.VUE_APP_RUTA_API+"/Usuarios/" + tarea_id
                    })
                        .then(response => {
                            this.getTareas();
                            console.log(response);
                        })
                        .catch(e => console.log(e));
                }
            }
        },
        lista_(){
            
            if(this.$store.state.soloTerminado){
                return this.tareas.filter(item =>{
                    return item.terminado;
                });
            }
            return this.tareas;
        }
    },
    computed: {
        lista(){
            if(this.$store.state.soloTerminado){
                return this.tareas.filter(item =>{
                    return item.terminado;
                });
            }
            return this.tareas;
        }
    },
    mounted() {
        this.getTareas()
    },
    components: {
        AppAcciones
    }
}
</script>

<style>

</style>