<template>
    <div>
        Usuario a Reportar :   {{$route.params.id}}
        <input type="text" v-model="textoABuscar" class="form-control" placeholder="Buscar Usuarios" >
            <button class="btn btn-outline-secondary" @click.prevent="getUsuarios()">Buscar</button> 
    </div>
    
    <tr v-for="(user, index) in Usuarios">
       
        <element v-if="index < 6 ">
                                <td>{{ user.id }}</td>
                                <td>{{ user.NombreCompleto }}</td>
                                <td>{{ user.Direccion}}</td>
                                <td>{{ user.Celular }}</td>
                                
        </element>                       
    </tr>
</template>
 
<script>
    export default {
        name: 'Reporte2',
        data(){
            return {

            }
        },
        methods: {
            getUsuarios(){
                axios
                /* 
                .get("http://localhost:4444/Usuarios?_embed=Consumos")  
                  { esto no me funcionaba segun la documentacion asi se relaciona los esquemas de json}
                */
                .get(process.env.VUE_APP_RUTA_API + "/Usuarios")
                .then(response => console.log(response))
                .catch(e=>console.log(e))
            }
        },
        computed: {
        },
        mounted(){
        },
        components: {
        }
    }
</script>

<style>

</style>