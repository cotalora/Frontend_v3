<template>
    <div>
        <Header/>
        <div class="float-container">

        <div class="float-child" style="text-align: left">
            <h1>HISTORIAS</h1>
            <h4>Proyecto: {{ $route.query.nombrePro }}</h4>
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Nombre</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nombre de historia" v-model="nombre" required>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Descripción</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Descripción de Ticket" v-model="descripcion" required>
                </div>
                <br>
                <h4 v-if="!editarBtn">Primer Ticket</h4>
                <div v-if="!editarBtn" class="form-group">
                    <label for="exampleInputPassword1">Nombre Ticket</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Descripción de Ticket" v-model="nombreTicket" required>
                </div>
                <div v-if="!editarBtn" class="form-group">
                    <label for="exampleInputPassword1">Descripción Ticket</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Descripción de Ticket" v-model="descripcionTicket" required>
                </div>
                <button v-if="editarBtn" type="button" class="btn btn-primary" v-on:click="UpdateHistoria(idHistoriaEditar)">Actualizar</button>
                <button v-else type="button" class="btn btn-primary" v-on:click="SetHistoria()">Añadir</button>
            </form>
        </div>
        
        <div class="float-childt">
            <table class="table table-striped table-dark">
                <thead>
                    <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="historia in ListaHistorias" :key="historia.idHistoria">
                        <td>{{ historia.nombre }}</td>
                        <td>{{ historia.descripcion }}</td>
                        <td>
                            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModa" v-on:click="GetIdEditar(historia.idHistoria)">Editar</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModa" v-on:click="SetToTickets(historia.idHistoria, historia.nombre)">Tickets</button>
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
    name: "Histories",
    data(){
        return {
            ListaHistorias: [],
            idProyecto: 0,
            nombre: "",
            descripcion: "",
            nombreTicket: "",
            descripcionTicket: "",
            dataHistoria: [],
            editarBtn: false,
            idHistoriaEditar: 0
        }
    },
    components: {
        Header
    },
    mounted() {
        this.GetHostorias();
    },
    methods: {
        SetToTickets(id, nom) {
            this.$router.push({path: '/tickets', query: {idHistoria: id, nombre: nom}}).catch(()=>{});
        },
        UpdateHistoria(id){
            axios.put('https://backend-apptest.herokuapp.com/user/' + sessionStorage.id + '/project/' + this.$route.query.idProyecto + '/history/' + id, 
                this.dataHistoria = {
                    nombre: this.nombre,
                    descripcion: this.descripcion,
                    idHistoria: id
                }, {
                headers: {
                    "authotization-header": sessionStorage.token,
                }
            })
            .then(data => {
                data;
                this.editarBtn = false;
                this.idHistoriaEditar = 0;
                this.nombre = '';
                this.descripcion = '';
                this.GetHostorias();
            });
        },
        GetHistoria(id) {
            axios.get('https://backend-apptest.herokuapp.com/user/' + sessionStorage.id + '/project/' + this.$route.query.idProyecto + '/history/' + id, {
                headers: {
                    "authotization-header": sessionStorage.token,
                }
            })
            .then(data => {
                this.nombre = data.data[0].nombre;
                this.descripcion = data.data[0].descripcion;
            });
        },
        GetIdEditar(id) {
            this.idHistoriaEditar = id;
            this.editarBtn = true;
            this.GetHistoria(id);
        },
        GetHostorias(){
            axios.get('https://backend-apptest.herokuapp.com/user/' + sessionStorage.id + '/project/' + this.$route.query.idProyecto + '/history', {
                headers: {
                    "authotization-header": sessionStorage.token,
                }
            })
            .then(data => {
                this.ListaHistorias = data.data;
            });
        },
        SetHistoria() {
            axios.post('https://backend-apptest.herokuapp.com/user/' + sessionStorage.id + '/history', 
                this.dataHistoria = {
                    nombre: this.nombre,
                    descripcion: this.descripcion,
                    idProyecto: this.$route.query.idProyecto,
                    nombreTicket: this.nombreTicket,
                    descripcionTicket: this.descripcionTicket
                }, {
                headers: {
                    "authotization-header": sessionStorage.token,
                }
            })
            .then((data) => {
                data;
                this.dataHistoria = [];
                this.nombre = '';
                this.descripcion = '';
                this.nombreTicket = '';
                this.descripcionTicket = '';
                this.GetHostorias();
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