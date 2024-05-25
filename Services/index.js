import * as FileSystem from "expo-file-system";
import {DateTime, Duration} from "luxon";



const path = FileSystem.documentDirectory + "/data";

//A ser desenvolvida
export function fetchAtualizarDecoder(data) {
}

//salva o histórico de irrigações no banco de dados
export async function salvarHistoricoIrrigacao(response) {
    try {
        if (response.length >= 9) {
            let fileInfo = await FileSystem.getInfoAsync(path);
            if (fileInfo.exists) {
                await salvarHistorico(response);
            }
            else {
                console.log("--O ARQUIVO NÃO EXISTE--");
                console.log("Criando diretório...");
                await FileSystem.makeDirectoryAsync(path, { intermediates: true });
                /*antes de escrever, é preciso armazenar o texto do arquivo, concatenar esse texto com os novos dados 
                para então sim escrever no arquivo, porque senão, os dados anteriores serão perdidos*/
                await FileSystem.writeAsStringAsync(path + "/data.txt", "");
                fileInfo = await FileSystem.getInfoAsync(path);
                if (fileInfo.exists) {
                    console.log("Diretório criado com sucesso");
                    await salvarHistorico(response);
                }
                else {
                    console.log("Erro ao criar o diretório");
                }
            }
        }
        else {
            console.log("Não há dados para serem salvos");
        }
    }
    catch (error) {
        console.log("Erro: " + error.message);
    }
}

//função usada em salvarHistoricoIrrigacao para salvar os dados da irrigação no banco de dados
export async function salvarHistorico(response) {
    try {
        const arr = response.split(";");
        let content = "";
        content = await FileSystem.readAsStringAsync(path + "/data.txt");
        content = content.trim();
        let count = 0;
        let data = "";
        //Se sim, significa que o primeiro dado é o horário que a irrigação terminou
        if (arr[0].charAt(0) == "-") {
            //content = content.concat(arr[0] + ";");
            data += arr[0] + ";";
            count++;
        }
        let lastLine = await lerUltimaLinha();
        let lastDate = lastLine.substring(0, 9);

        for (count; count < arr.length; count++) {
            let dateArr = arr[count].substring(0, 9);
            //Testa se a irrigação foi feita no mesmo dia que o último registro salvo no histórico
            if (dateArr == lastDate) {
                console.log("Registro: " + arr[count]);
                let formatedData = arr[count].substring(9);
                //se falso, significa que o dado possui apenas o horario de inicio (logo não devemos por ;).
                if(formatedData.length > 8){
                    formatedData += ";";
                }
                data += formatedData;
                lastDate = dateArr;
            }
            else {
                if(count == arr.length - 1){
                    data += "\n" + arr[count];
                }
                else{
                    data += "\n" + arr[count] + ";";  
                }
                lastDate = dateArr;
            }
        }
        content += data;
        await FileSystem.writeAsStringAsync(path + "/data.txt", content);
    }
    catch (error) {
        console.log("Erro: " + error.message);
    }
}

//retorna os dados do banco de dados
export async function lerArquivo() {
    const content = await FileSystem.readAsStringAsync(path + "/data.txt");
    console.log("-- FUNÇÃO: LER ARQUIVO --");
    return content;
}

//retorna o último registro do banco de dados
export async function lerUltimaLinha() {
    try {

        const content = await lerArquivo();
        const lines = content.split("\n");
        let lastLine = lines[lines.length - 1];
        if(lines.length > 1){
            if(lastLine.length < 2){
                lastLine = lines[lines.length - 2];
            }
        }
        
        return lastLine;
    }
    catch (error) {
        console.log("Erro: " + error);
    }
}
//Apaga todos os dados do banco de dados
export async function apagarDados(){
    let fileInfo = await FileSystem.getInfoAsync(path);
    if (fileInfo.exists) {
    await FileSystem.writeAsStringAsync(path + "/data.txt", "");
    }
}

//Calcula o período de uma irrigação
export default function calcPeriod(time){
    if(time.length > 17){
        time = time.substring(0, 17);
        console.log("Tirando o ; do tempo: " + time);
    }
    const timeArr = time.split("-"); 
    const sTime = timeArr[0].split(":");
    const eTime = timeArr[1].split(":");
    const startTime = DateTime.fromObject({hour: sTime[0], minute: sTime[1], second: sTime[2]});
    const endTime = DateTime.fromObject({hour: eTime[0], minute: eTime[1], second: eTime[2]});
    const period = endTime.diff(startTime, ['second']);

    
    if(period.seconds < 0){
        let aux = 86400 + period.seconds;
        return aux;
    }

    //teste
    graficoData("hoje");
    return (period.seconds);
}

//Retorna todos os registros de irrigações baseado no período especificado
export async function getAllDataPeriod(startDate, endDate){
    try{
        console.log("--Função getAllDataPeriod--");
        let content = await lerArquivo();
        content = content.trim();
        const lines = content.split("\n");
        let lineStart = -1;
        let lineEnd = -1;
        const len = lines.length;
        const arr = [];
        //usaremos para verificar se a data de início e de término especificada  foram encontradas
        let foundSDate = false;
        let foundEDate = false;
        let formatedSDate = DateTime.fromFormat(startDate, "ddMMyyyy");
        let formatedEDate = DateTime.fromFormat(endDate, "ddMMyyyy");

        if(formatedSDate > formatedEDate){
            throw new Error("A data de início deve ser inferior ou igual a data de término");
        }

        if(startDate != endDate){
            for(let i = 0; i < len; i++){
                const lineDate = lines[i].substring(0, 8);
                const thisDate = DateTime.fromFormat(lineDate, "ddMMyyyy");

                if(lineDate == startDate){
                    foundSDate = true;
                    lineStart = i;
                }
                
                //caso a data inicial especificada não seja encontrada
                if(!foundSDate && thisDate > formatedSDate){
                    foundSDate = true;
                    lineStart = i
                }

                if(lineDate == endDate){
                    foundEDate = true;
                    lineEnd = i;
                }
                //caso a data final especificada não seja encontrada
                if(!foundEDate && thisDate > formatedEDate){
                    //entao pegaremos a linha anterior, pois é menor que a data final
                    if(i > 0){  
                        lineEnd = i-1;
                        foundEDate = true;
                    } 
                }
                //caso estivermos no fim do arquivo e a condição acima não foi verdadeira
                else if(foundEDate == false && i+1 == len){
                    lineEnd = i;
                    foundEDate = true;
                }
                if(foundSDate && foundEDate){
                    break;
                }
            }
        }
        else{
            for(let i = 0; i < len; i++){
                const lineDate = lines[i].substring(0, 8);
                const thisDate = DateTime.fromFormat(lineDate, "ddMMyyyy");

                if(lines[i].substring(0, 8) == startDate){
                    foundDate = true;
                    lineStart = i;
                    lineEnd = i;
                    break;
                }
                
                //caso a data inicial especificada não seja encontrada
                if(!foundSDate && thisDate > formatedSDate){
                    foundSDate = true;
                    lineStart = i
                    lineEnd = i;
                    break;
                }
            }
        }
        
        if (lineStart != -1 && lineEnd != -1){
            console.log("LineStart: " + lineStart);
            console.log("LineEnd: " + lineEnd);
            if(lineStart == lineEnd){
                arr.push(lines[lineStart]);
            }
            else{
                for(lineStart; lineStart <= lineEnd; lineStart++){
                    arr.push(lines[lineStart]);
                }
            }

            return arr;
        }
    }
    catch(error){
        console.log("Erro: " + error.message);
    }
}

//possível função útil
export function dashboardFormat(arr){
    const len = arr.length;
    if(len == 1){
        return "day";
    }
    if(len < 28){
        return "days"
    }
    else if(len >= 28 && len < 56){
        return "weeks"
    }
    else if(len >= 56){
        return "months"
    }
}

//A ser desenvolvido
export async function dashboardIrrigationPeriod(arr, format){
    const len = arr.length;
    const periodArr = [];
    let aux1 = 0;
    if(format == "day"){
        //obs: tem que ver se o vetor não possui posições vazias
        
    }
    else if(format == "days"){
        for(let i = 0; i < len; i++){
            //retirando a data
            arr[i] = arr[i].substring(9);
            
            const aux2 = arr[i].split(";");
            for(j = 0; j < aux2.length; j++){
                aux1 += calcPeriod(aux2[j]);
            }
            periodArr.push(aux1);
            aux = 0;
        }
    }
    else if(format == "weeks"){

    }
    else if(format == "months"){

    }
}

//A ser desenvolvido
export async function generateDashboard(){

}


