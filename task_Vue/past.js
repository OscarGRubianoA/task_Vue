const{createApp}=Vue

/* console.log(createApp) */
createApp({

    data(){
        return {
            titulo:'¡¡¡Bienvenido a Vue!!!',
            eventos:[],
            condicion:true,
            eventsPast:[],
            categories:[],
            filterCheckbox: [],
            searchText: "",
            eventosRespaldoPasado: []
        }
    },
    created(){// let favoritos =  []
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
          .then(res => res.json())
          .then(data =>   {   this.eventos = data.events
           this.eventsPast = this.eventos.filter(event => event.date < data.currentDate)
           console.log(this.eventsPast)
           this.eventsPast.forEach(element => !this.categories.includes(element.category)?this.categories.push(element.category):""
        
    );
           /*  eventos = data.events;
            console.log(eventos) */
            /* crearCheckbox(eventos, $categorys)
            imprimirCards(eventos, $cards)
            $search.addEventListener('keyup', filtrar)
            $categorys.addEventListener('change', filtrar) */
            console.log(this.categories)
            this.eventosRespaldoPasado=this.eventsPast 
          })
          .catch(error => console.log(error));
         
          
            },
            computed: {
                filtrado() {
                    let filtros = this.eventosRespaldoPasado.filter(evento => evento.name.toLowerCase().includes(this.searchText.toLowerCase()
                    ))
                    if (this.filterCheckbox.length) {
                        this.eventsPast = filtros.filter(evento => this.filterCheckbox.includes(evento.category))
                    } else {
                        this.eventsPast = filtros
                    }
                }
            }

        }).mount('#app')