<template>
  <div id="app" class="container mt-6">

    

  <h2 class="text-center mb-4">Sistema de Gerenciamento de Pessoas</h2>

  <form @submit.prevent="salvarPessoa" class="mb-4">
        <div class="mb-3">
          <label class="form-label">Nome:</label>
          <input class="form-control" v-model="novaPessoa.nome" placeholder="Informe o nome" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Email:</label>
          <input class="form-control" v-model="novaPessoa.email" placeholder="Informe o email" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Idade:</label>
          <input class="form-control" v-model="novaPessoa.idade" type="number" placeholder="Informe o idade" required>
        </div>

        <button class="btn btn-primary" type="submit">
         {{ editando ? 'Atualizar' : 'Salvar' }} 
        </button>

      </form>

      <h2 class="text-center">Listagem de Pessoas</h2>

      <ul class="list-group">
    <li v-for="pessoa in pessoas" :key="pessoa.id" class="list-group-item d-flex justify-content-between align-item">
      
        <h6><span class="badge text-bg-secondary">Nome: {{ pessoa.nome }}</span></h6>
        <h6><span class="badge text-bg-secondary">Idade:{{ pessoa.idade }}</span></h6>
        <h6><span class="badge text-bg-secondary">Email: {{ pessoa.email }}</span></h6>
      
        <div>
        <button class="btn btn-sm btn-warning me-2" @click="editarPessoa(pessoa)">Editar</button>
        <button class="btn btn-sm btn-danger" @click="deletarPessoa(pessoa.id)">Excluir</button>
      </div>
      
    </li>
  </ul>

      
  </div>
</template>
<script>
import PessoaServices from './services/PessoaServices'

export default {
  name: 'App',
  data(){
    return{
      pessoas:[],
      editando: false,
      pessoaEditadaId: null,
      novaPessoa:{
        nome: '',
        email: '',
        idade: ''
      }
    }
  },
  methods:{
    async carregarListagemPessoas()
    {
    try
    {
    const response = await PessoaServices.listarTodasPessoas();
    this.pessoas = response.data;
    }catch(error)
    {
      console.error("Erro ao listar todas as pessoas: ",error);
    }
  },
  async deletarPessoa(id)
  {
    try {
      await PessoaServices.deletarPessoaId(id);
      await this.carregarListagemPessoas();
    } catch (error) {
      console.error("Erro ao deletar pessoa: ", error);
      }
    },
     editarPessoa(pessoa)
    {
      this.editando = true;
      this.pessoaEditadaId = pessoa.id;
      this.novaPessoa = {...pessoa};
    },
    resetarCampos()
    {
      this.novaPessoa = {nome: '', idade:' ', email: ''}
      this.editando = false;
      this.pessoaEditadaId = null;
    },
    async salvarPessoa()
    {
      if(this.editando)
      {
        await PessoaServices.editarPessoa(this.pessoaEditadaId, this.novaPessoa)
      }else{
        await PessoaServices.salvarPessoa(this.novaPessoa)
      }
      this.resetarCampos()

      await this.carregarListagemPessoas();
    },
  },
     async mounted()
    {
      await this.carregarListagemPessoas();
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 20px;

}
</style>
