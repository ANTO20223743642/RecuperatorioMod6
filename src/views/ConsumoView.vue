<template>
    <div>
        <h1>Consumos</h1>
        <form @submit.prevent="agregarTarea2()">
            <div class="input-group mb-3">
                <input type="text" class="form-control" v-model="tarea.FechaLectura" placeholder="Nueva Fecha"
                    aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary" type="submit">Agregar</button>
            </div>
        </form>
        <h5>Buscador de Consumos {{textoABuscar}}</h5>
        <form action="">
        <div class="input-group mb-3">
            <input type="text" v-model="textoABuscar" class="form-control" placeholder="Buscar Consumo" >
            <button class="btn btn-outline-secondary" @click.prevent="getTareas2()">Buscar</button>
        </div>
       </form> 

       <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked2"
                :checked="$store.state.soloTerminado" v-on:input="$store.state.soloTerminado = $event.target.checked">
            <label class="form-check-label" for="flexSwitchCheckChecked2">Mostrar solo Activos
            </label>
        </div>

        <div class="accordion" id="accordionExample2">

            <div class="accordion-item" v-for="(value, index) in lista">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        :data-bs-target="`#collapseTwo${index}`" aria-expanded="false"
                        :aria-controls="`collapseTwo${index}`">
                        <input type="checkbox" :checked="value.terminado"
                            @click="setearCheckbox2(value.terminado, value.id)">
                        {{value.FechaLectura}}
                    </button>
                </h2>
                <div :id="`collapseTwo${index}`" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample2">
                    <div class="accordion-body">
                        {{value.Cantidad}}
                        
                        {{value.TotalPagar}}
                        <app-acciones @onAccion="irA2($event, value.id)"></app-acciones>

                    </div>
                </div>
                
            </div>

        </div>


    </div>
</template>

<script>
import AppAcciones from '@/components/AppAcciones.vue';
export default {
    name: 'ConsumoView',
    data() {
        return {
            soloTeminado: false,
            textoABuscar: '',
            tarea: {
                Cantidad: null,
                FechaLectura: null,
                TotalPagar: null,
                terminado: false
            },
            tareas: []
        }
    },
    methods: {
        agregarTarea2() {
            axios({
                method: "post",
                url: process.env.VUE_APP_RUTA_API+"/Consumos",
                data: this.tarea
            })
                .then(response => {
                    console.log(response);
                    this.tarea.FechaLectura = null;
                    this.getTareas2();
                })
                .catch(e => console.log(e));
        },
        getTareas2() {
            axios({
                method: "get",
                url: process.env.VUE_APP_RUTA_API+"/Consumos/?q="+this.textoABuscar
            })
                .then(response => {
                    this.tareas = response.data;
                    console.log(response);
                })
                .catch(e => console.log(e));
        },
        setearCheckbox2(terminado, id) {
            axios({
                method: "patch",
                url: process.env.VUE_APP_RUTA_API+"/Consumos/" + id,
                data: {
                    terminado: !terminado
                }
            })
                .then(response => {
                    console.log(response);
                })
                .catch(e => console.log(e));
        },
        irA2(opcion, tarea_id) {
            if (opcion === 'editar') {
                this.$router.push({ name: 'editarConsumo', params: { id: tarea_id } });
            } else {
                if (confirm("Esta seguro de eliminar el Consumo ?")) {
                    axios({
                        method: "delete",
                        url: process.env.VUE_APP_RUTA_API+"/Consumos/" + tarea_id
                    })
                        .then(response => {
                            this.getTareas2();
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
        this.getTareas2()
    },
    components: {
        AppAcciones
    }
}
</script>

<style>

</style>