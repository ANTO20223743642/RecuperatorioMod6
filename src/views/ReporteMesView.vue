<template>
    <div>
        Seleccione el Mes a Reportar: 
       
        <tr v-for="(user, index) in Consumos">
                                <td>{{ user.id }}</td>
                                <td>{{ user.FechaLectura }}</td>
                                <td>{{ user.Cantidad}}</td>
                                <td>{{ user.TotalPagar }}</td>
                                
        </tr>
    </div>
</template>

<script>
    export default {
        name: 'Reporte1',
        data(){
            return {
                
            }
        },
        methods: {
            getConsumos(){
                axios
                /*
                .get("http://localhost:4444/Usuarios?_embed=Consumos")  
                  { esto no me funcionaba segun la documentacion asi se relaciona los esquemas de json}
                */
                .get("http://localhost:4444/Consumos")
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