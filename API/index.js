import {salvarHistoricoIrrigacao} from "../Services";

//const baseUrl = "http:/192.168.0.56";
const baseUrl = "http:/192.168.43.34";

//GET
export async function fetchAtualizar(){
    try{
        const response = await fetch(baseUrl + "/atualizar");
        const data = await response.text();
        console.log(data);
        return(data);
    }
    catch(error){
        console.log("Erro de comunicação");
    }
}

//POST
export async function fetchDefinirNiveisUmidade(umidade){
    fetch(baseUrl + "/definirNiveis",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(umidade)
    })
}

//GET
export async function fetchGetHistoricoIrrigacao(){
    try{
        const response = await fetch(baseUrl + "/enviarDadosIrrigacao");
        const data = await response.text();
        console.log("Get Historico de irrigação: " + data);
        salvarHistoricoIrrigacao();
        return data;
    }
    catch(error){
        console.log("Erro de comunicação");
    }
}

export async function fetchLigarControleManual(){
    try{
        const response = await fetch(baseUrl + "/ligarControleManual", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
        })
        const result = await response.text();
        console.log(result);
    }
    catch(error){
        console.log(error);
    }
}
export async function fetchDesLigarControleManual(){
    try{
        const response = await fetch(baseUrl + "/desligarControleManual", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
        })
        const result = await response.text();
        console.log(result);
    }
    catch(error){
        console.log(error);
    }
}

export async function fetchLigarBomba(){
    try{
        const response = await fetch(baseUrl + "/ligarBomba", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
        })
        const result = await response.text();
        console.log("Ligar bomba: " + result);
    }
    catch(error){
        console.log(error);
    }
}
export async function fetchDesligarBomba(){
    try{
        const response = await fetch(baseUrl + "/desligarBomba", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            }
        });
        const result = await response.text();
        console.log("Desligar bomba: " + result);
    }
    catch(error){
        console.log(error);
    }
}