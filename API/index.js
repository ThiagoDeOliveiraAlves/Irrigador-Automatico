import {saveIrrigationHistory} from "../Services";

const baseUrl = "http:/192.168.0.56";
//const baseUrl = "http:/192.168.43.34";

//função usada para definir um tempo limite de espera de uma requisição
async function fetchWithTimeout(fetchFunction, timeout = 5000) {
    return Promise.race([
        fetchFunction(),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Tempo limite excedido")), timeout)
        )
    ]);
}

// GET
export async function fetchAtualizar() {
    try {
        const fetchFunction = () => fetch(baseUrl + "/atualizar");
        const response = await fetchWithTimeout(fetchFunction, 5000); // Timeout de 5 segundos
        const data = await response.text();
        return data;
    } catch (error) {
        console.log("Erro de comunicação:", error.message);
        throw error;
    }
}

//POST
export async function fetchDefinirNiveisUmidade(umidade){
    try{
        let isSucceeded = false;
        const response = await fetch(baseUrl + "/definirNiveis",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(umidade)
        });
        const data = await response.text();
        console.log("Testando o retorno da API: " + data);
        if(data == "1"){
            isSucceeded = true;
        }

        return isSucceeded;
    }
    catch(error){
        console.log("Erro em fetchDefinirNiveisUmidade -> " + error);
        return false;
    }
}

//GET
export async function fetchGetHistoricoIrrigacao(){
    try{
        const fetchFunction = () => fetch(baseUrl + "/enviarDadosIrrigacao");
        const response = await fetchWithTimeout(fetchFunction, 5000);
        const data = await response.text();
        if(data.length > 1){
           saveIrrigationHistory(data); 
        }
        
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
        return result;
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
        return result;
    }
    catch(error){
        console.log(error);
    }
}