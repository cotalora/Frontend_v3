<template>
    <div>
        <Header/>
        <div class="float-container">

        <div class="float-child" style="text-align: left">
            <h1>PROYECTOS</h1>
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Nombre</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nombre del proyecto" v-model="nombre" required>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Descripción</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Descripción del proyecto" v-model="descripcion" required>
                </div>
                <button type="button" class="btn btn-primary" v-on:click="SetProyecto()">Añadir</button>
            </form>
        </div>
        
        <div class="float-childt">
            <table class="table table-striped table-dark">
                <thead>
                    <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="proyecto in ListaProyectos" :key="proyecto.idProyecto">
                        <td>{{ proyecto.nombre }}</td>
                        <td>{{ proyecto.descripcion }}</td><td>
                            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModa" v-on:click="SetToHistories(proyecto.idProyecto, proyecto.nombre)">Historias</button>
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
    name: "organizations",
    data(){
        return {
            ListaProyectos: [],
            idProyecto: 0,
            nombre: "",
            descripcion: "",
            dataProyecto: []
        }
    },
    components: {
        Header
    },
    mounted() {
        this.GetProyectos();
    },
    methods: {
        GetProyectos(){
            axios.get('https://backend-apptest.herokuapp.com/user/' + sessionStorage.id + '/project', {
                headers: {
                    "authotization-header": sessionStorage.token,
                }
            })
            .then(data => {
                this.ListaProyectos = data.data;
            });
        },
        SetProyecto() {
            axios.post('https://backend-apptest.herokuapp.com/user/' + sessionStorage.id + '/project', 
                this.dataProyecto = {
                    nombre: this.nombre,
                    descripcion: this.descripcion,
                    idUsuario: sessionStorage.id
                }, {
                headers: {
                    "authotization-header": sessionStorage.token,
                }
            })
            .then(data => {
                console.log(data);
                this.dataProyecto = [];
                this.nombre = '';
                this.descripcion = '';
                this.GetProyectos();
            });
        },
        SetToHistories(id, nombre) {
            this.$router.push({path: '/histories', query: {idProyecto: id, nombrePro: nombre}}).catch(()=>{});
        },
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