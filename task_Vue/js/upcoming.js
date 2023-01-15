const{createApp}=Vue

/* console.log(createApp) */
createApp({

    data(){
        return {
            titulo:'¡¡¡Bienvenido a Vue!!!',
            eventos:[],
            condicion:true,
            eventsFuture:[],
            categories:[],
            filterCheckbox: [],
            searchText: "",
            eventosRespaldoFuturo: []
        }
    },
    created(){// let favoritos =  []
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
          .then(res => res.json())
          .then(data =>   {   this.eventos = data.events
           this.eventsFuture = this.eventos.filter(event => event.date > data.currentDate)
           console.log(this.eventsFuture)
           this.eventsFuture.forEach(element => !this.categories.includes(element.category)?this.categories.push(element.category):""
           
        
    );
           /*  eventos = data.events;
            console.log(eventos) */
            /* crearCheckbox(eventos, $categorys)
            imprimirCards(eventos, $cards)
            $search.addEventListener('keyup', filtrar)
            $categorys.addEventListener('change', filtrar) */
            console.log(this.categories)
            this.eventosRespaldoFuturo=this.eventsFuture
          })
          .catch(error => console.log(error));
         
          
            },
            computed: {
                filtrado() {
                    let filtros = this.eventosRespaldoFuturo.filter(evento => evento.name.toLowerCase().includes(this.searchText.toLowerCase()
                    ))
                    if (this.filterCheckbox.length) {
                        this.eventsFuture = filtros.filter(evento => this.filterCheckbox.includes(evento.category))
                    } else {
                        this.eventsFuture = filtros
                    }
                }
            }

        }).mount('#app')