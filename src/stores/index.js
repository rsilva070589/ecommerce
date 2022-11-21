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

    const itemSelect = ref ({
        cdproduto: 'DEFAULT', 
        descricao: 'DEFAULT',        
        precofinalvenda: 0,
        detalhes: 0,        
        qtde: 1,
        obsItem: 'DEFAULT',
        index: null,
        urlprincipal: null        
    });

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
        statusDefinido: 'EM ANDAMENTO',
        urlprincipal: 'null'
        
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



function addItemCarrinho() {


    if (this.selectItem.qtdemax >= 1) {    
        this.recursos.etapaPedido=2;
        this.recursos.telaAtualNome='OPCIONAIS E INGREDIENTES'
    } else {
        this.recursos.etapaPedido=3
        this.recursos.telaAtualNome='CARRINHO'  
        this.recursos.alertaCarrinho=false
            this.pizzaSelecao[0].adicionais=adicionalSelecao
            this.pizzaSelecao[0].ingredientes=ingredientesSelecao 
            this.pizzaSelecao.forEach(dados => {                
            this.pedido.pedido.pedidoitem.push(dados)
                        }) 
    }     
    }

function formataDinheiro(item) {
        let venda = item;
        if (!!venda && venda.toString().includes(",")) {
          venda = venda.toString().replace(",", ".");
        }
        return parseFloat(venda)
          .toFixed(2)
          .replace(".", ",")
          .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
      }


function selecaoProduto (cdproduto, precofinalvenda, descricao, index, qtdemax, urlprincipal)  {   
        var numeroARemover = cdproduto;
        let itemExiste = this.pizzaSelecao.findIndex(obg => obg.cdproduto  == numeroARemover)
      if (   this.pizzaSelecao.length >= this.selectItem.qtdemax
          && this.selectItem.qtdemax > 0
          && itemExiste < 0
      ) {
       console.log('limite atingido')
      } else{
         if (itemExiste < 0)
           {       
           console.log('add o item:  '+cdproduto + ' ' + descricao + ' index: '+index)  
        
               
           this.pizzaSelecao.push(          
                   {
                   'cdproduto': cdproduto,
                   'descricao': descricao,
                   'observacao': 'observacao teste componente Produtos',
                   'isadicionalprod': 'n',
                   'valorunitario': precofinalvenda,
                   'quantidade': 1,
                   'valortotal': precofinalvenda * 1,
                   'url': urlprincipal
                   }
               )
               this.listaAtualProd[index].select=true
    
         }else {
           console.log('remove o item:  '+cdproduto + ' ' + descricao)
           this.listaAtualProd[index].select=false
           var numeroARemover = cdproduto;
           var indice = this.pizzaSelecao.findIndex(obg => obg.cdproduto  == numeroARemover)
           this.pizzaSelecao.splice(indice, 1);      
         }   
        

      }  
      }  
      


function totalPedido ()  {

    /** somatoria de Todos os adicionais */
      const ArrayProv = []
      var pitem = this.pedido.pedido?.pedidoitem?.map(a => {    
        
        var t = a.adicionais?.filter(f => f.isadicionalprod == 's')
          
        var x = t?.map(i => {return i.valortotal}) || 0    
        //console.log(x)
        var soma = 0;
          for(var i = 0; i < x.length; i++) {
              soma += x[i];
          }      
          ArrayProv.push(soma)    
         
      })
    
      
      var totalAdicionais = 0;
      for(var i = 0; i < ArrayProv.length; i++) {
        totalAdicionais += ArrayProv[i];
      }
    /** fim somatoria de Todos os adicionais */
     
    
          var somarPizza = this.pedido.pedido.pedidoitem.map(pedidoitem => {
          return (pedidoitem.valorunitario * pedidoitem.quantidade) // + somaAdic      
          }) 
          let totalpizzas = 0
          for(let i in somarPizza) {
            totalpizzas += somarPizza[i] 
          }
           
          this.pedido.pedido.valorpedido =  totalpizzas +totalAdicionais
      
    } 


    function somar() {
        var somarAdicionais = this.adicionalSelecao.map(item => {
        return(item.valorunitario * item.quantidade)
        })
      let soma = 0
      for(let i in somarAdicionais) {
        soma += somarAdicionais[i] 
      }
      return soma + this.pizzaSelecao[0].quantidade * this.pizzaSelecao[0].valorunitario
    }    
    
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
        bairroSearch,
        itemSelect,
        
        addItemCarrinho,
        formataDinheiro,
        selecaoProduto, 
        totalPedido,
        somar
        
    }
});