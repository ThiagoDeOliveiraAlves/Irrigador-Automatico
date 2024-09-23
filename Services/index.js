import * as FileSystem from "expo-file-system";
import { DateTime, Duration } from "luxon";

//diretorio onde ficam os arquivos do banco de dados
const folderPath = FileSystem.documentDirectory + "/IrrigadorAutomatico";
//armazena os níveis de umidade mínimo e máximo
const humidityLevels = folderPath + "/HumidityLevels.txt"
//arquivo com o historico de irrigações
const irrigationData = folderPath + "/IrrigationData.txt";
//arquivo com os dados das bombas de água utilizadas
const waterPumpData = folderPath + "/WaterPumpData.txt";


//-----------------------------Será substituído--------------------------------//
/*
const path = FileSystem.documentDirectory + "/data";
//usada para salvar os niveis de umidade e os dados da bomba de água
const sysPath = FileSystem.documentDirectory + "/sysData";
*/
//----------------------------------------------------------------------------//

//cria o diretório e os arquivos necessários para armazenar os dados caso não existam
export async function criarArquivos(){
    try{
        let fileInfo = await FileSystem.getInfoAsync(folderPath);

        if(!fileInfo.exists){
            console.log("O diretório não existe. Criando pasta irrigadorAutomatico");
            //cria a pasta IrrigadorAutomatico
            await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true });

            //cria o arquivo HumidityLevels.txt
            await FileSystem.writeAsStringAsync(humidityLevels, "20-40");

            //cria o arquiuvo IrrigationData.txt
            await FileSystem.writeAsStringAsync(irrigationData, "");
            //cria o arquivo WaterPumpData.txt
            await FileSystem.writeAsStringAsync(waterPumpData, "1,0,0\n1,0,0");

            fileInfo = await FileSystem.getInfoAsync(folderPath);

            if(fileInfo.exists){
                console.log("Diretório Criado com Sucesso!");
            }
            else{
                console.log("ERRO: não foi possível criar o diretório");
            }
        } 
        else{
            //no caso de algum arquivo ter sido excluido//

            fileInfo = await FileSystem.getInfoAsync(humidityLevels);
            if(!fileInfo.exists){
                //cria e insere o valor padrão para níveis de umidade
                await FileSystem.writeAsStringAsync(humidityLevels, "20-40");
            }

            fileInfo = await FileSystem.getInfoAsync(irrigationData);
            if(!fileInfo.exists){
                await FileSystem.writeAsStringAsync(irrigationData, "");
            }

            fileInfo = await FileSystem.getInfoAsync(waterPumpData);
            if(!fileInfo.exists){
                await FileSystem.writeAsStringAsync(waterPumpData, "1,0,0\n1,0,0");
            }
        }     
    }
    catch (error){
        console.log("Erro: em criarArquivos -> " + error.mesage);
    }
}

//______________________________________Níveis de umidade - HumidityLevels.txt______________________________________//

//Salva os níveis de umidade mínima e máxima no banco de dados
export async function salvarNiveisUmidade(min, max) {
    try {
        let umidade = min + "-" + max;

        //cria o diretório e os arquivos caso não existam
        await criarArquivos();

        let fileInfo = await FileSystem.getInfoAsync(humidityLevels);  

        if (fileInfo.exists) {
            let content = "";
            content = await FileSystem.readAsStringAsync(humidityLevels);
            content = content.trim();
            //escreve os novos níveis de umidade
            await FileSystem.writeAsStringAsync(humidityLevels, umidade);

            console.log("Níveis de Umidade Atualizados:");
            console.log("De: " + content + "(mín-máx)");
            console.log("Para: " + umidade + "(mín-máx)");
        }
    }
    catch (error) {
        console.log("Erro: em salvarNiveisUmidade -> " + error.message);
    }
}

//imprime e retorna os dados do arquivo HumidityLevels.txt
export async function getHumidityLevels(){
    try{
        await criarArquivos();

        let fileInfo = await FileSystem.getInfoAsync(humidityLevels);
        if (fileInfo.exists) {

            console.log("---Imprimindo o HumidityLevels.txt---");   
            let content = "";
            content = await FileSystem.readAsStringAsync(humidityLevels);
            content = content.trim();
            console.log(content);
            console.log("-------------------------------------");
            return content;
        }
    }
    catch(error){
        console.log("Erro: em getHumidityLevels -> " + error.message);
    }
}
//__________________________________________________________________________________________________________________//

//_________________________________________Bomba de água - WaterPumpData.txt________________________________________//

//Salva a vazão e a potência da bomba d'água no banco de dados
export async function setWaterPumpData(vazao, potencia) {
    try {
        let dados = vazao + "," + potencia;

        //cria o diretório e os arquivos caso não existam
        await criarArquivos();


        let fileInfo = await FileSystem.getInfoAsync(waterPumpData);

        if (fileInfo.exists) {
            let isUpdated = false;
            let content = "";
            content = await FileSystem.readAsStringAsync(waterPumpData);
            content = content.trim();
            let lines = content.split("\n");
            
            //verifica se existe algum registro com os mesmo dados
            for(let i = 1; i < lines.length; i++){
                let lineArr = lines[i].split(",");
                let vazPot = lineArr[1] + "," + lineArr[2]; 
                //caso haja, atualiza somente  primeira linha (representa a bomba de água atual)
                if(dados == vazPot){
                    //atualizando primeira linha
                    lines[0] = lineArr[0] + "," + dados;
                    isUpdated = true;
                    break;
                }
            }

            //caso o registro seja novo
            if(!isUpdated){
                let id = lines.length;
                let newData = id + "," + dados;
                //atualiza a primeira linha
                lines[0] = newData;
                //cria um novo registro com os dados infrmados
                lines.push(newData);
            }

            content = "";

            for(let i = 0; i < lines.length; i++){
                lines[i] += "\n" ;
                content += lines[i];
            }

            //salva os dados no banco de dados
            await FileSystem.writeAsStringAsync(waterPumpData, content);
        }
    }
    catch (error) {
        console.log("Erro: em salvarDadosBombaAgua -> " + error.message);
    }
}

//imprime e retorna todos os registros do arquivo WaterPumpData.txt
export async function getWaterPumpData(){
    try{
        await criarArquivos();

        console.log("---Imprimindo o WaterPumpData.txt---");   
        let content = "";
        content = await FileSystem.readAsStringAsync(waterPumpData);
        console.log(content);
        console.log("------------------------------------");
        return content;
    }
    catch(error){
        console.log("Erro: em getWaterPumpData -> " +error.message);
    }
}

//imprime e retorna os dados da bomba de agua atual
export async function getCurrentWPData(){
    try{
        criarArquivos();

        let waterPumpArr = await FileSystem.readAsStringAsync(waterPumpData);
        console.log("----Dados da bomba de água atual----");
        console.log("Id,Vazão,Potência");
        let lines = waterPumpArr.split("\n");
        console.log(lines[0]);
        return lines[0];
    }
    catch(error){
        console.log("Erro: em getCurrentWPData -> " + error.mesage);
    }
}

//imprime e retorna o ID da bomba de agua atual
export async function getCurrentWPId(){
    try{
        criarArquivos();

        let waterPumpArr = await FileSystem.readAsStringAsync(waterPumpData);
        let lines = waterPumpArr.split("\n");
        let lineData = lines[0].split(",");
        let id = lineData[0];
        console.log("---ID da bomba de água atual---");
        console.log(id);
        console.log("----------------------------------");
        return id;
    }
    catch(error){
        console.log("Erro: em getCurrentWPId -> " + error.mesage);
    }
}

//imprime e retorna a vazao da bomba de agua atual
export async function getCurrentWPFlowRate(){
    try{
        criarArquivos();

        let waterPumpArr = await FileSystem.readAsStringAsync(waterPumpData);
        let lines = waterPumpArr.split("\n");
        let lineData = lines[0].split(",");
        let flowRate = lineData[1];
        console.log("---Vazao da bomba de água atual---");
        console.log(flowRate);
        console.log("----------------------------------");
        return flowRate;
    }
    catch(error){
        console.log("Erro: em getCurrentWPFlowRate -> " + error.mesage);
    }
}

//imprime e retorna a potencia da bomba de agua atual
export async function getCurrentWPPower(){
    try{
        criarArquivos();

        let waterPumpArr = await FileSystem.readAsStringAsync(waterPumpData);
        let lines = waterPumpArr.split("\n");
        let lineData = lines[0].split(",");
        let power = lineData[2];
        console.log("---Potência da bomba de água atual---");
        console.log(power);
        console.log("----------------------------------");
        return power;
    }
    catch(error){
        console.log("Erro: em getCurrentWPL -> " + error.mesage);
    }
}

//apaga os dados do arquivo WaterPumpData.txt
export async function deleteAllWPData(){
    try{
        await FileSystem.writeAsStringAsync(waterPumpData, "1,0,0\n1,0,0");
        console.log("Os dados do WaterPumpData.txt foram deletados com sucesso!");
    }
    catch(error){
        console.log("Erro: em deleteAllWaterPumpData -> " + error.message);
    }
}

//__________________________________________________________________________________________________________________//

//____________________________________Registro de irrigações - IrrigationData.txt___________________________________//


//<------------------------------V--Parcialmentte atualizadas--V------------------------------>\\

//salva o histórico de irrigações no banco de dados
export async function salvarHistoricoIrrigacao(response) {
    try {
        if (response.length >= 9) {

            await criarArquivos();

            let fileInfo = await FileSystem.getInfoAsync(irrigationData);

            if (fileInfo.exists) {
                await salvarHistorico(response);
            }
        }
        else {
            console.log("Não há dados para serem salvos");
        }
    }
    catch (error) {
        console.log("Erro: em salvarHistoricoIrrigacao -> " + error.message);
    }
}

//função usada em salvarHistoricoIrrigacao para salvar os dados da irrigação no banco de dados
export async function salvarHistorico(response) {
    try {
        const arr = response.split(";");

        let content = "";
        content = await FileSystem.readAsStringAsync(irrigationData);
        content = content.trim();

        let pos = 0;
        let data = "";

        let waterPumpArr = await FileSystem.readAsStringAsync(waterPumpData);
        let currentWaterPumpId = waterPumpArr[0].substring(1);

        //Se sim, significa que o primeiro dado é o horário que a irrigação terminou
        if (arr[pos].charAt(0) == "-") {
            //content = content.concat(arr[0] + ";");
            data += arr[pos];
            pos++;
        }

        //Para não pular a primeira linha caso o arquivo esteja vazio
        if(content.length < 1 && data.length < 1){
            data += currentWaterPumpId + " " + arr[pos];
            pos++
        }

        //adicionando os registros restantes com quebra de linha
        for (pos; pos < arr.length; pos++) { 
            data +="\n" + currentWaterPumpId + " " + arr[pos];
        }

        content += data;
        //salvando no banco de dados
        await FileSystem.writeAsStringAsync(irrigationData, content);
    }
    catch (error) {
        console.log("Erro: em salvarHistorico -> " + error.message);
    }
}

//retorna os dados do banco de dados
export async function getIrrigationData() {
    try{
        await criarArquivos();

        const content = await FileSystem.readAsStringAsync(irrigationData);
        console.log("---Imprimindo o HumidityLevels.txt---");
        console.log(content);
        console.log("-------------------------------------");
        
        return content;   
    } 
    catch(error){
        console.log("Erro: em getIrrigationData -> " + error.message);
    } 
}

//__________________________________________________________________________________________________________________//

//<------------------------------V--Não atualizadas--V------------------------------>\\



//retorna o último registro do banco de dados
export async function lerUltimaLinha() {
    try {

        const content = await lerArquivo();
        const lines = content.split("\n");
        let lastLine = lines[lines.length - 1];
        if (lines.length > 1) {
            if (lastLine.length < 2) {
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
export async function apagarDados() {
    let fileInfo = await FileSystem.getInfoAsync(path);
    if (fileInfo.exists) {
        await FileSystem.writeAsStringAsync(path + "/data.txt", "");
    }
}

//Calcula o período de uma irrigação
export default function calcPeriod(time) {
    try {
        if (time.length > 17) {
            time = time.substring(0, 17);
            console.log("Tirando o ; do tempo: " + time);
        }
        const timeArr = time.split("-");
        const sTime = timeArr[0].split(":");
        const eTime = timeArr[1].split(":");
        const startTime = DateTime.fromObject({ hour: sTime[0], minute: sTime[1], second: sTime[2] });
        const endTime = DateTime.fromObject({ hour: eTime[0], minute: eTime[1], second: eTime[2] });
        const period = endTime.diff(startTime, ['second']);


        if (period.seconds < 0) {
            let aux = 86400 + period.seconds;
            return aux;
        }
        return (period.seconds);
    }
    catch (error) {
        console.log("Erro em calcPeriod: " + error.message)
    }
}

//Retorna todos os registros de irrigações baseado no período especificado
export async function getAllDataPeriod(startDate, endDate) {
    try {
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

        if (formatedSDate > formatedEDate) {
            throw new Error("A data de início deve ser inferior ou igual a data de término");
        }

        if (startDate != endDate) {
            for (let i = 0; i < len; i++) {
                const lineDate = lines[i].substring(0, 8);
                const thisDate = DateTime.fromFormat(lineDate, "ddMMyyyy");

                if (lineDate == startDate) {
                    foundSDate = true;
                    lineStart = i;
                }

                //caso a data inicial especificada não seja encontrada
                if (!foundSDate && thisDate > formatedSDate) {
                    foundSDate = true;
                    lineStart = i
                }

                if (lineDate == endDate) {
                    foundEDate = true;
                    lineEnd = i;
                }
                //caso a data final especificada não seja encontrada
                if (!foundEDate && thisDate > formatedEDate) {
                    //entao pegaremos a linha anterior, pois é menor que a data final
                    if (i > 0) {
                        lineEnd = i - 1;
                        foundEDate = true;
                    }
                }
                //caso estivermos no fim do arquivo e a condição acima não foi verdadeira
                else if (foundEDate == false && i + 1 == len) {
                    lineEnd = i;
                    foundEDate = true;
                }
                if (foundSDate && foundEDate) {
                    break;
                }
            }
        }
        else {
            for (let i = 0; i < len; i++) {
                const lineDate = lines[i].substring(0, 8);
                const thisDate = DateTime.fromFormat(lineDate, "ddMMyyyy");

                if (lines[i].substring(0, 8) == startDate) {
                    foundDate = true;
                    lineStart = i;
                    lineEnd = i;
                    break;
                }

                //caso a data inicial especificada não seja encontrada
                if (!foundSDate && thisDate > formatedSDate) {
                    foundSDate = true;
                    lineStart = i
                    lineEnd = i;
                    break;
                }
            }
        }

        if (lineStart != -1 && lineEnd != -1) {
            if (lineStart == lineEnd) {
                arr.push(lines[lineStart]);
            }
            else {
                for (lineStart; lineStart <= lineEnd; lineStart++) {
                    arr.push(lines[lineStart]);
                }
            }

            return arr;
        }
    }
    catch (error) {
        console.log("Erro em getAllDataPeriod: " + error.message);
    }
}

//possível função útil
export function dashboardFormat(arr) {
    const len = arr.length;
    if (len == 1) {
        return "day";
    }
    if (len < 28) {
        return "days"
    }
    else if (len >= 28 && len < 56) {
        return "weeks"
    }
    else if (len >= 56) {
        return "months"
    }
}


//irá retornar um vetor com os períodos que a bomba de água ficou ligada
export function dashboardIrrigationPeriod(arr, format) {
    try {
        const len = arr.length;
        const periodArr = [];
        let period = 0;
        if (format == "daily") {
            //obs: tem que ver se o vetor não possui posições vazias
            /*Aqui na verdade vamos ter que guardar os períodos em posições diferentes, no caso, iremos mostrar um 
            gráfico do dia com todas as irrigações feitas no dia, nesse caso, também teremos que fazer com que a função
            dashboardIrrigationDate armazene os horários ao invés da data*/
            arr[0] = arr[0].substring(9);
            const aux2 = arr[0].split(";");
            for (let i = 0; i < aux2.length; i++) {
                if (aux2[i] != "") {
                    period = calcPeriod(aux2[i]);
                    console.log(i + "- Periodo: " + period);
                    periodArr.push(period);
                    period = 0;
                }
            }
            return periodArr;
        }
        else if (format == "days") {
            for (let i = 0; i < len; i++) {
                //retirando a data
                arr[i] = arr[i].substring(9);

                const aux2 = arr[i].split(";");
                for (let j = 0; j < aux2.length; j++) {
                    if (aux2[j] != "") {
                        period += calcPeriod(aux2[j]);
                    }
                }
                periodArr.push(period);
                period = 0;
            }
            return periodArr;
        }
        else if (format == "weeks") {
            let date = DateTime.fromFormat(arr[0].substring(0, 8), "ddMMyyyy");

            for (let i = 0; i < len; i++) {
                let thisDate = DateTime.fromFormat(arr[i].substring(0, 8), "ddMMyyyy");

                const week1 = date.weekNumber;
                const week2 = thisDate.weekNumber;

                const year1 = date.weekYear;
                const year2 = thisDate.weekYear;

                let dateAux = arr[i].substring(0, 8);

                arr[i] = arr[i].substring(9);
                //verifica se essas datas pertencem a mesma semana
                if (week1 == week2 && year1 == year2) {
                    const aux2 = arr[i].split(";");
                    for (let j = 0; j < aux2.length; j++) {
                        if (aux2[j] != "") {
                            period += calcPeriod(aux2[j]);
                        }
                    }
                    //para comparar com a próxima data
                    if (arr[i].length != "") {
                        date = DateTime.fromFormat(dateAux, "ddMMyyyy");
                    }
                }
                else {
                    if (arr[i].length != "") {
                        date = DateTime.fromFormat(dateAux, "ddMMyyyy");
                    }
                    periodArr.push(period);
                    period = 0;
                    const aux2 = arr[i].split(";");
                    for (let j = 0; j < aux2.length; j++) {
                        if (aux2[j] != "") {
                            period += calcPeriod(aux2[j]);
                        }
                    }

                }
                //garante que ao chegarmos no último registro, o período seja atribuido caso não havia sido.
                if (i == len - 1 && period != 0) {
                    periodArr.push(period);
                }
            }
            return periodArr;
        }
        else if (format == "months") {

        }
    }
    catch (error) {
        console.log("Erro em dashboardIrrigationPeriod: " + error.message);
    }
}

export function dashboardIrrigationDate(arr, format) {
    try {
        const len = arr.length;

        if (format == "daily") {
            //obs: tem que ver se o vetor não possui posições vazias
            //nesse caso, teremos que armazenar os horários ao invés das datas
            const dateArr = arr[0].split(";");
            dateArr[0] = dateArr[0].substring(9);

            return dateArr;
        }
        else if (format == "days") {
            let dateArr = []
            for (let i = 0; i < len; i++) {
                //pegando a data
                let date = arr[i].substring(0, 8);
                let aux = DateTime.fromFormat(date, "ddMMyyyy");
                let aux1 = aux.toFormat("dd/MM/yyyy");
                dateArr.push(aux1);
            }
            return dateArr;
        }
        else if (format == "weeks") {
            let dateArr = [];
            let lastDate = 0;
            let firstDate = arr[0].substring(0, 8);
            let date = DateTime.fromFormat(firstDate, "ddMMyyyy");

            let week1 = date.weekNumber;
            let year1 = date.weekYear;

            let aux3 = getStartAndEndOfWeek(week1, year1);

            //para o caso de a data de início informada não ser a data correspondente a data do início de sua semana
            aux3 = aux3.substring(11);
            aux3 = date.toFormat("dd/MM/yyyy") + "-" + aux3;
            dateArr.push(aux3);

            for (let i = 0; i < len; i++) {

                let thisDate = DateTime.fromFormat(arr[i].substring(0, 8), "ddMMyyyy");

                week1 = date.weekNumber;
                const week2 = thisDate.weekNumber;

                year1 = date.weekYear;
                const year2 = thisDate.weekYear;

                let dateAux = arr[i].substring(0, 8);

                //verifica se essas datas pertencem a mesma semana e mesmo ano
                if (week1 == week2 && year1 == year2) {
                    //para comparar com a próxima data
                    if (arr[i].length != "") {
                        date = DateTime.fromFormat(dateAux, "ddMMyyyy");
                    }
                }
                else {
                    if (arr[i].length != "") {
                        dateArr.push(getStartAndEndOfWeek(week2, year2));
                        date = DateTime.fromFormat(dateAux, "ddMMyyyy");
                    }
                }
                if (arr[i].length > "") {
                    lastDate = arr[i].substring(0, 8);
                }
            }
            //substituindo a data referente ao fim da semana pela data da última irrigação feita no sistema (dentro do período que o usuário informou)
            let dateArrLength = dateArr.length;
            aux3 = dateArr[dateArrLength - 1];
            aux3 = aux3.substring(0, 11);
            let aux4 = DateTime.fromFormat(lastDate, "ddMMyyyy")
            aux3 = aux3 + aux4.toFormat("dd/MM/yyyy");
            dateArr[dateArrLength - 1] = aux3;

            return dateArr;
        }
        else if (format == "months") {

        }
    }
    catch (error) {
        console.log("Erro em dashboardIrrigationDate: " + error.message);
    }
}

//retorna uma string contendo a data de início e fim de uma semana
export function getStartAndEndOfWeek(weekNumber, year) {
    let startOfYear = DateTime.fromObject({ year: year, month: 1, day: 1 });
    //data referente ao início da semana (segunda-feira)
    let startOfWeek = startOfYear.plus({ week: weekNumber - 1 }).startOf("week");
    //data referente ao fim da semana (domingo)
    let endOfWeek = startOfWeek.plus({ days: 6 });

    let startAndEndOfWeek = startOfWeek.toFormat("dd/MM/yyyy") + "-" + endOfWeek.toFormat("dd/MM/yyyy");
    return startAndEndOfWeek;
}

//retorna um vetor com a quantidade de litros de água usada
export async function calcWaterLiters(arr) {
    /*O valor da vazão é especificado em litros por hora. Transformamos o periodo de segundos para horas e calculamos a quantidade de água bombeada*/
    try {
        let dadosBomba = await getDadosBomba();
        let dadosBombaArr = dadosBomba.split("-");
        let vazao = parseFloat(dadosBombaArr[0]);
        let litrosAgua = [];
        let aux = 0;

        for (let i = 0; i < arr.length; i++) {
            if(arr[i] != ""){
                aux = (parseFloat(arr[i]) / 3600) * vazao;
                aux = parseFloat(aux.toFixed(4));
                litrosAgua.push(aux);
                console.log(litrosAgua[i]);
            }
        }
        return litrosAgua;
    }
    catch (error) {
        console.log("Erro em calcWaterLiters: " + error.message);
    }
}

export async function calcKWH(arr){
    try {
        let dadosBomba = await getDadosBomba();
        let dadosBombaArr = dadosBomba.split("-");
        let potencia = parseFloat(dadosBombaArr[1]);
        let kwh = [];
        let aux = 0;
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] != ""){
                //transformação da W para KW (potencia/1000)
                aux = (parseFloat(arr[i]) / 3600) * potencia/1000;
                aux = parseFloat(aux.toFixed(4));
                kwh.push(aux);
                console.log(kwh[i]);
            }
        }
        return kwh;

    }
    catch(error){
        console.log("Ero em calcKWH: " + error.mesage);
    }
}