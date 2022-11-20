import { ref } from 'vue' 
import { defineStore } from 'pinia';
 

export const indexStore = defineStore("rotas", () =>{
    const rotas = ref({ 
    }); 

    const recursos = ref({
       telaMobile:   false,
       sidebar:     false,
       telaContentAtual: 'DADOSEMPRESA',
       telaAtualNome: 'BEM-VINDO',
       baseApiHTTPS: 'https://easypedidos.sytes.net:8082',
       //baseApi: 'http://200.10.135.208:8080/evento',
       baseApi: 'http://localhost:4042'    ,
       databasecliente: '',
       method: 'get'  ,
       etapaPedido: 0,
       buttonAvancar: false,
       carregando: false,
       ip: '127.0.0.1',
       dominio: 'suapizzaria'
       
    }); 

    const dadosEmpresa = {}
    const grupoProdutos = ref ([ ]); 
    const dadosProdutos = ref ([ ]); 
    
  

    const produtos = ref ([ ]); 
    const itensSelecao = ref ([ ]);
    const adicionaisProduto = ref ([ ]);
    const adicionaisItensProduto = ref ([ ]);
    const adicionalSelecao = ref ([ ]); 
    const produtoSelect = ref ([ ]);     
 

    const ingredientesProduto = ref ([ ]);
    const listaAtualProd =ref ([ ]);
    const pizzaSelecao=ref ([ ]);
    const ingredientesSelecao = ref ([ ]);
    const listaPedidosCliente = ref ([ ]);
    
    const selectPedido = {
        cdpedido: 0,
        getnrsenha_entrega: 0
    }

         
    const pedidoAtual = ref ([ ]);

    const selectItem =ref({
        tipoEntrega: 0,
        codGrupo: 0, 
        qtdemax:0,
        qtdemin:0,
        totalPizzainSelecao: null,
        qtdeSomatoria: 1,
        cdcliente_end: 0,
        taxaentrega: 0,
        montagemrequerida: 0,
        requeropcional: 0,
        valortroco: 0,
        indexEndereco: 0,
        statusDefinido: 'EM ANDAMENTO'
        
     }); 
 
    const pedido = 
       { pedido: {
            cdcliente: 0,
            cdtaxaentrega: 48,
            cdendereco: 0,
            datahora_pedido: Date.now,
            cdplanopagamento: 0,            
            nomeplanopagamento: '',
            formapagamento: '',
            obs: '',
            tipopedido: 0,
            taxaentrega: 0,
            valorpedido: 0,
            valortroco: 0,
            pedidoitem: [ ]
        } 
    }

    const cliente = {
                      cdcliente: 0, 
                      fonecel: '',
                      nome: '',
                      enderecos: [
                                    {
                                        bairro: '',
                                        cdcliente_end: 0,
                                        cdmunicipio: 0,
                                        cdproduto: 0,
                                        cep: '',
                                        cidade: '',
                                        complementoendereco: '',
                                        idbairro: 0,
                                        logradouro: '',
                                        nomemunicipio: '',
                                        nrendereco: '',
                                        pontoreferencia: '',
                                        valorentrega: 0,
                                    }
                    ]
                    }

    const bairros = []

 

    const bairroUpdateCreate = {            
        cdcliente_end: 0,
        idbairro: 0,
        bairro: 'BUSCARNOME',            
        cep: '79799999',
        cidade: '',
        complemento: '',
        logradouro: '',
        nrendereco: '',
        valorentrega: 0,
        cdproduto: 0,
        validation: {
                        cidade: false,
                        complemento: false,
                        logradouro: false,
                        nrendereco: false,
                        validado: false,
                        optionSelect: false
                    } 

    }


    const formaspgto = []

    const formaPgtoDetalhe = {
        descricaoPgto: null,
        nomeplanopagamento: null,
        cdplanopagamento: null,
        chavepix: null,
        recebedorpix: null,
        tipochavepix: null,
        formapagamento: null,
        nomeplanopagamento: null
    }

    const validation = {
        nome: false,
    telefone: false,
   pagamento: false
}

const bairroSearch = ''
    
    return {
        rotas,
        recursos,
        dadosEmpresa,
        selectItem,
        grupoProdutos,
        produtos,
        produtoSelect,
        adicionaisProduto,
        adicionaisItensProduto, 
        pedido,
        itensSelecao,
        adicionalSelecao,
        ingredientesProduto,
        listaAtualProd,
        pizzaSelecao,
        ingredientesSelecao,
        cliente,
        formaspgto,
        formaPgtoDetalhe,
        bairros,
        bairroUpdateCreate,
        dadosProdutos,
        listaPedidosCliente,
        selectPedido,
        pedidoAtual,
        validation,
        bairroSearch
        
    }
});