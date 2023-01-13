const { createApp } = Vue
/* console.log(createApp) */
createApp({

    data() {
        return {
            titulo: '¡¡¡Bienvenido a Vue!!!',
            eventos: [],
            condicion: true,
            categories: [],
            filterCheckbox: [],
            searchText: "",
            eventosRespaldo: []
        }
    },
    created() {
        /* let eventos; */
        // let favoritos =  []
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then(res => res.json())
            .then(data => {
                this.eventos = data.events
                this.eventos.forEach(element => !this.categories.includes(element.category) ? this.categories.push(element.category) : ""

                );
                /*  eventos = data.events;
                 console.log(eventos) */
                /* crearCheckbox(eventos, $categorys)
                imprimirCards(eventos, $cards)
                $search.addEventListener('keyup', filtrar)
                $categorys.addEventListener('change', filtrar) */
                this.eventosRespaldo = this.eventos
                console.log(this.eventos)
                console.log(this.categories)
            })
            .catch(error => console.log(error));


    },
    computed: {
        filtrado() {
            let filtros = this.eventosRespaldo.filter(evento => evento.name.toLowerCase().includes(this.searchText.toLowerCase()
            ))
            if (this.filterCheckbox.length) {
                this.eventos = filtros.filter(evento => this.filterCheckbox.includes(evento.category))
            } else {
                this.eventos = filtros
            }
        }
    }
}).mount('#app')
