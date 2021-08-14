<template>
    <div>
        <Header/>
        <div class="float-container">

        <div class="float-child" style="text-align: left">
            <h1>TICKETS</h1>
            <h4>Historia: {{ $route.query.nombre }}</h4>
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Nombre</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nombre de Ticket" v-model="nombre" required>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Descripción</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Descripción de Ticket" v-model="descripcion" required>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Estado ticket</label>
                    <select class="form-control" id="exampleFormControlSelect1" v-model="estado">
                    <option value=1>Activo</option>
                    <option value=2>En Proceso</option>
                    <option value=3>Finalizado</option>
                    </select>
                </div>
                <button v-if="editarBtn" type="button" class="btn btn-primary" v-on:click="UpdateTicket(idTicketEditar)">Actualizar</button>
                <button v-else type="button" class="btn btn-primary" v-on:click="SetTicket()">Añadir</button>
            </form>
        </div>
        
        <div class="float-childt">
            <table class="table table-striped table-dark">
                <thead>
                    <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Estado</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ticket in ListaTicket" :key="ticket.idTicket">
                        <td>{{ ticket.nombre }}</td>
                        <td>{{ ticket.descripcion }}</td>
                        <td>{{ ticket.estadoTicket }}</td>
                        <td>
                            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModa" v-on:click="GetIdEditar(ticket.idTicket)">Editar</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModa" v-on:click="DelTickets(ticket.idTicket)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import axios from 'axios';

export default {
    name: "Tickets",
    data(){
        return {
            ListaTicket: [],
            idTicket: 0,
            nombre: "",
            descripcion: "",
            estado: 1,
            dataTicket: [],
            editarBtn: false,
            idTicketEditar: 0,
        }
    },
    components: {
        Header
    },
    mounted() {
        this.GetTickets();
    },
    methods: {
        UpdateTicket(id){
            axios.put('https://backend-apptest.herokuapp.com/user/' + sessionStorage.id + '/ticket/' + id, 
                this.dataTicket = {
                    nombreTicket: this.nombre,
                    descripcionTicket: this.descripcion,
                    idHistoria: this.$route.query.idHistoria,
                    idEstado: this.estado
                }, {
                headers: {
                    "authotization-header": sessionStorage.token,
                }
            })
            .then(data => {
                data;
                this.editarBtn = false;
                this.idTicketEditar = 0;
                this.nombre = '';
                this.descripcion = '';
                this.estado = 1;
                this.GetTickets();
            });
        },
        GetTicket(id) {
            axios.get('https://backend-apptest.herokuapp.com/user/' + sessionStorage.id + '/history/' + this.$route.query.idHistoria + '/ticket/' + id, {
                headers: {
                    "authotization-header": sessionStorage.token,
                }
            })
            .then(data => {
                this.nombre = data.data[0].nombre;
                this.descripcion = data.data[0].descripcion;
                this.estado = data.data[0].idEstado_fk;
            });
        },
        GetIdEditar(id) {
            this.idTicketEditar = id;
            this.editarBtn = true;
            this.GetTicket(id);
        },
        DelTickets(id) {
            axios.delete('https://backend-apptest.herokuapp.com/user/' + sessionStorage.id + '/history/' + this.$route.query.idHistoria + '/ticket/' + id, {
                headers: {
                    "authotization-header": sessionStorage.token,
                }
            })
            .then(data => {
                data;
                this.GetTickets();
            });
        },
        GetTickets(){
            axios.get('https://backend-apptest.herokuapp.com/user/' + sessionStorage.id + '/history/' + this.$route.query.idHistoria + '/ticket', {
                headers: {
                    "authotization-header": sessionStorage.token,
                }
            })
            .then(data => {
                this.ListaTicket = data.data;
            });
        },
        SetTicket() {
            axios.post('https://backend-apptest.herokuapp.com/user/' + sessionStorage.id + '/ticket', 
                this.dataTicket = {
                    nombreTicket: this.nombre,
                    descripcionTicket: this.descripcion,
                    idHistoria: this.$route.query.idHistoria,
                    idEstado: this.estado
                }, {
                headers: {
                    "authotization-header": sessionStorage.token,
                }
            })
            .then((data) => {
                data;
                this.dataTicket = [];
                this.nombre = '';
                this.descripcion = '';
                this.estado = 1;
                this.GetTickets();
            });
        }
    },
}
</script>

<style scoped>
.float-container {
    padding: 20px;
}

.float-child {
    width: 40%;
    float: left;
    padding: 20px;
}

.float-childt {
    width: 60%;
    float: left;
    padding: 20px;
} 

.btn {
    margin-top: 10px;
}
</style>