/* const { CreateApp } = Vue
CreateApp({
  data() {
    return {
      eventos: [],
      eventsFuture: [],
      eventosRespaldoFuturo: [],
      assistance: {},
      estimate: []


    }
  }, created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then(res => res.json())
      .then(data => {
        this.eventos = data.events
        this.events = this.eventos.filter(event => event.date < data.currentDate)
        console.log(this.events)
        this.events.forEach(element => !this.assistance.includes(element.assistance) ? this.assistance.push(element.category) : ""


        );
      }
    },
})   */
const { createApp } = Vue
createApp({

  data() {
    return {
      eventosFuturos: [],
      eventosPasados: []
    }
  },
  created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then((res) => res.json())
      .then((data) => {
        let eventos = data.events;
        let fechaActual = data.currentDate;
        this.eventosFuturos = eventos.filter((objeto) => objeto.date > fechaActual);
        this.eventosPasados = eventos.filter((objeto) => objeto.date < fechaActual);
        this.eventosPasados.map((i) => {
          i.percentageAssitance = (i.assistance / i.capacity) * 100;
        });
      })
      .catch((error) => console.log(error));
  },
  methods: {
    printTableOne(container, prop2, prop1, prop3) {
      container.innerHTML += `<tr> <td>${prop1[0].name} with ${prop1[0].percentageAssitance.toFixed(2)}%.</td> <td>${prop2[0].name} with ${prop2[0].percentageAssitance.toFixed(2)}%.</td> <td>${prop3[0].name} with ${prop3[0].capacity.toLocaleString()}.</td> </tr> `;
    },
    logicaTablaUno() {
      let minorAssistance = [...this.eventosPasados].sort(
        (a, b) => a.percentageAssitance - b.percentageAssitance
      );
      let majorAssistance = [...this.eventosPasados].sort(
        (a, b) => b.percentageAssitance - a.percentageAssitance
      );
      let majorCapacity = [...this.eventosPasados].sort(
        (a, b) => b.capacity - a.capacity
      );
      this.printTableOne(this.$refs.ñ, minorAssistance, majorAssistance, majorCapacity);
    },
    printTables(container, array) {
      array.forEach((e) => {
        container.innerHTML += `<tr> <td>${e.category}</td> <td>$${e.earn.toLocaleString()}</td> <td>${e.percentageAssitance.toFixed(2)}%</td> </tr> `;
      });
    },
    logicaTablas(typeEvent, prop, container) {
      typeEvent.map((e) => {
        e.earn = e[prop] * e.price;
        e.percentageAssitance = (e[prop] / e.capacity) * 100;
      });
      let sorted = [...typeEvent].sort((a, b) => b.earn - a.earn);
      this.printTables(container, sorted);
    }
  },//Ejecuto las funciones para mostrar los datos en las tablas correspondientes en el html
  mounted() {
    this.logicaTablaUno();
    this.logicaTablas(this.eventosFuturos, "estimate", this.$refs.row2);
    this.logicaTablas(this.eventosPasados, "assistance", this.$refs.row3);
  }
}).mount('#app')





