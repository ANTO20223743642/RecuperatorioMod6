Vue.component(
    'persona',
    {
        template: 
        `
            <div>
                <p>Id: {{persona.id}}</p>
                <p>Nombre: {{persona.nombre}}</p>
                <p>Direccion: {{persona.direccion}}</p>
                <p>Celular: {{persona.celular}}</p>
            </div>
        `,
        props:["persona"]
    }
);