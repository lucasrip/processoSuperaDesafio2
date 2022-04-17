import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { Cliente } from '../shared/cliente';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

    formCliente:FormGroup = new FormGroup({});
    result:string = "";
    filds:any[] =['nome','email','idade','dataNasc','genero','cargo','qtd','senha','notificacao'];

  constructor( private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createForm(new Cliente());
    const getCliente:any = localStorage.getItem("cliente")||{};
    const objParse=JSON.parse(getCliente);


    if(Object.keys(objParse).length === 0)
    {
     this.habilitaCampos();
    }
    else  
    {
   
       this.filds.map(fild=>{
        this.setNewValue(objParse[fild],fild)
       })

      this.desabilitaCampos();
    }
   
  }

   onSubmit()
   {   
   const [nome,senha] = ['nome','senha'].map(campo=>this.getValue(campo))

   const verificaCampos =  this.formBuilder.group({
    nome: [nome, Validators.required],
    senha: [senha, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10)
    ]],
  })

  const status = this.formCliente.controls["nome"].status === "VALID";
  const camposValidados = verificaCampos.status === "VALID";

   if(camposValidados && status)
   {
    this.controlaAlert("Cadastrado Com Sucesso","sucesso");
  
      localStorage.setItem("cliente",JSON.stringify(this.formCliente.value));
      this.desabilitaCampos();
   }
    const nomeRequired = verificaCampos.value.nome === ""?"o campo nome nao pode ficar vazio\n":"";
    const senhaRequired =  verificaCampos.value.senha === ""?"o campo senha nao pode ficar vazio\n":"";
    const tamanhoSenha = verificaCampos.value.senha.length < 5 
    || verificaCampos.value.senha.length > 10?"a senha deve ter entre 5 e 10 caracteres\n":"";

    const erros = ""+ nomeRequired + senhaRequired + tamanhoSenha;
  
    erros !== "" &&this.controlaAlert(erros,"erro")
   }

   controlaAlert(mensagem:string,className:string)
   {


    setTimeout(()=>{
        document.querySelector(".mostraFeedback")?.classList.add(className);
    this.result =mensagem;

    },1000,true)
  

    setTimeout(()=>{
     document.querySelector(".mostraFeedback")?.classList.remove(className);
     this.result="";
    },7000,true)
   }


   getValue(campo:string)
   {
      return this.formCliente.get(campo)?.value;
   }

   setNewValue(newValue:any,campo:any)
   {
    return this.formCliente.controls[campo].setValue(newValue);
   }

   habilitaCampos()
   {
      
       this.filds.map(fild=>{
       this.formCliente.controls[fild].enable();
      })
   }
 
   desabilitaCampos()
   {
    this.filds.map(field=>{
       this.formCliente.controls[field].disable();
      })
    
   }
 

   verificaNome(campo:string)
   {
     const  campoValue =this.getValue(campo).replace(/(\d)/,'')
     .replace(/\b([a-zA-Z])$/,(value = '$1') =>value.toUpperCase())

     this.setNewValue(campoValue,campo)

   }
   verificaIdade(campo:any)
   {
    const  campoValue =this.getValue(campo).replace(/\D/g,'')
    this.setNewValue(campoValue,campo)
   }

   verificaQtd(campo:any)
   {
    const  campoValue =this.getValue(campo)
  
    const newValue =campoValue < 0 ?0:campoValue;
    this.setNewValue(newValue,campo)
   }

   limpaForm()
   {
    this.habilitaCampos();
    this.formCliente.reset(new Cliente);
   }

   createForm(cliente:Cliente)
  {
    this.formCliente = new FormGroup({
        nome:new FormControl(cliente.nome),
        idade:new FormControl(cliente.idade),
        qtd:new FormControl(cliente.qtd),
        dataNasc:new FormControl(cliente.dataNasc),
        senha:new FormControl(cliente.senha),
        email:new FormControl(cliente.email),
        genero:new FormControl(cliente.genero),
        cargo:new FormControl(cliente.cargo),
        ativo:new FormControl(cliente.ativo),
        notificacao:new FormControl(cliente.notificacao)
    })
  }
}

// email: [email, [Validators.required,Validators.email]]

// console.log(this.formCliente.value)
//  this.formCliente.get("nome").setValue("sadasda")
// this.createForm(new Cliente())
// this.formCliente.reset(new Cliente)

// console.log(this.formCliente.patchValue({"nome":"lucas"}))

// this.myForm.get('myCheckbox').valueChanges
//     .subscribe(value => {
//       if(value) {
//         this.myForm.get('myEmailField').setValidators(Validators.required)
//       } else {
//         this.myForm.get('myEmailField').clearValidators();
//       }
//     }
// );


//   this.formCliente = this.formBuilder.group({
//   nome: [null, Validators.required],
//   senha: [null, Validators.required],
//   idade: [null, Validators.required],
//   qtd: ['', Validators.required],
//   email: ['', Validators.required],
//   dataNasc: ['', Validators.required],
//   cargo: ['', Validators.required],
//   notificacao: ['', Validators.required],
//   genero: ['', Validators.required]
// })


