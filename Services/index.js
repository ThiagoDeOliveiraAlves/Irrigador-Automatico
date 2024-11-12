import * as FileSystem from "expo-file-system";
import { DateTime, Duration } from "luxon";

//diretorio onde ficam os arquivos do banco de dados
const folderPath = FileSystem.documentDirectory + "/IrrigadorAutomatico";
//armazena a url do ESP8266
const espUrl = folderPath + "/Esp8266Url.txt";
//armazena os níveis de umidade mínimo e máximo
const humidityLevels = folderPath + "/HumidityLevels.txt"
//arquivo com o historico de irrigações
const irrigationData = folderPath + "/IrrigationData.txt";
//arquivo com os dados das bombas de água utilizadas
const waterPumpData = folderPath + "/WaterPumpData.txt";

//cria o diretório e os arquivos necessários para armazenar os dados caso não existam
export async function criarArquivos(){
    try{
        let fileInfo = await FileSystem.getInfoAsync(folderPath);

        if(!fileInfo.exists){
            console.log("O diretório não existe. Criando pasta irrigadorAutomatico");
            //cria a pasta IrrigadorAutomatico
            await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true });
            
            //cria o arquivo Esp8266Url.txt
            await FileSystem.writeAsStringAsync(espUrl, "");

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

            fileInfo = await FileSystem.getInfoAsync(espUrl);
            if(!fileInfo.exists){
                await FileSystem.writeAsStringAsync(espUrl, "");
            }

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

//______________________________________Url do ESP8266______________________________________//
export async function saveEspUrl(url){
    try{
        await criarArquivos();

        let fileInfo = await FileSystem.getInfoAsync(espUrl);  
        if(fileInfo.exists){
            url = url.trim();
            let content = "";
            content = await FileSystem.readAsStringAsync(espUrl);
            content = content.trim();
            //escreve a nova url
            await FileSystem.writeAsStringAsync(espUrl, url);

            console.log("URL do esp foi atualizada");
            console.log("De: " + content);
            console.log("Para: " + url);
        }
    }
    catch(error){
        console.log("Erro: em saveEspUrl -> " + error.message);
    }
}

export async function getEspUrl(){
    try{
        await criarArquivos();

        let fileInfo = await FileSystem.getInfoAsync(espUrl);
        if (fileInfo.exists) {  
            let url = "";
            url = await FileSystem.readAsStringAsync(espUrl);
            url = url.trim();
            console.log("url do esp: " + url);
            return url;
        }
    }
    catch(error){
        console.log("Erro: em getEspUrl -> " + error.message);
    }
}

//______________________________________Níveis de umidade - HumidityLevels.txt______________________________________//

//Salva os níveis de umidade mínima e máxima no banco de dados
export async function saveHumidityLevels(min, max) {
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
        console.log("Erro: em saveHumidityLevels -> " + error.message);
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
export async function setWaterPumpData(flowRate, power) {
    try {
        let dados = flowRate + "," + power;

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

//retorna a vazao da bomba de água que possui o Id especificado
export async function getWPFlowRateById(id){
    try{
        criarArquivos();

        let waterPumpArr = await FileSystem.readAsStringAsync(waterPumpData);
        let lines = waterPumpArr.split("\n");
        let flowRate = 0;

        for(let i = 0; i< lines.length; i++){  
            let lineData = lines[i].split(",");
            if(id == lineData[0]){
                flowRate = lineData[1];
                return flowRate;
            }
        }
        console.log("O id especificado não existe");
        return flowRate;
    }
    catch(error){
        console.log("Erro: em getWPFlowRateById -> " + error.mesage);
    }
}

//retorna a potência da bomba de água que possui o Id especificado
export async function getWPPowerById(id){
    try{
        criarArquivos();

        let waterPumpArr = await FileSystem.readAsStringAsync(waterPumpData);
        let lines = waterPumpArr.split("\n");
        let power = 0;

        for(let i = 0; i< lines.length; i++){  
            let lineData = lines[i].split(",");
            if(id == lineData[0]){
                power = lineData[2];
                return power;
            }
        }
        console.log("O id especificado não existe");
        return flowRate;
    }
    catch(error){
        console.log("Erro: em getWPPowerById -> " + error.mesage);
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

//salva o histórico de irrigações no banco de dados
export async function saveIrrigationHistory(response) {
    try {
        if (response.length >= 9) {

            await criarArquivos();

            let fileInfo = await FileSystem.getInfoAsync(irrigationData);

            if (fileInfo.exists) {

                const arr = response.split(";");

                let content = "";
                content = await FileSystem.readAsStringAsync(irrigationData);
                content = content.trim();

                let pos = 0;
                let data = "";
                let hasFinishTime = false;

                let currentWaterPumpId = await getCurrentWPId();

                let allReg = content.split("\n")
                let lastPos = allReg.length;
                let lastReg = allReg[lastPos - 1];

                //Se sim, significa que o primeiro dado é o horário que a irrigação terminou
                if (arr[pos].charAt(0) == "-") { 
                    //verificando a consistência do último registro salvo no database   
                    if(lastReg.length > 10 && !(lastReg.includes('-'))){
                        console.log("inclui o - ? " + lastReg.includes('-'));
                        data += arr[pos];
                        pos++;
                        hasFinishTime = true;
                    }
                    else{
                        console.log("Descartando o horario de termino enviado");
                        pos++;
                    }
                    
                }

                //Para não pular a primeira linha caso o arquivo esteja vazio
                if(content.length < 1){
                    //para que uma linha não fique com somente o horário de término caso haja.
                    data = "";

                    data += currentWaterPumpId + " " + arr[pos];
                    pos++
                }

                if(!lastReg.includes('-') && !hasFinishTime){
                    //inconsistência no database (o ultimo reg do database possuiu somente horario de inicio, e o eesp nao enviou seu horario de termino), correção
                    console.log("inconsistência identificada: " + lastReg);
                    content = allReg[0];
                    for (let i = 1; i < (allReg.length - 1); i++) { 
                        if(allReg[i].length > 1){
                            content += "\n" + allReg[i];
                        }
                    }
                }

                //adicionando os registros restantes com quebra de linha
                for (pos; pos < arr.length; pos++) {  
                    if(arr[pos].length > 16){
                        data +="\n" + currentWaterPumpId + " " + arr[pos];
                    }
                }

                content += data;
                //salvando no banco de dados
                await FileSystem.writeAsStringAsync(irrigationData, content);
            }
        }
        else {
            console.log("Não há dados para serem salvos");
        }
    }
    catch (error) {
        console.log("Erro: em saveIrrigationHistory -> " + error.message);
    }
}

//imprime e retorna os registros de irrigações
export async function getIrrigationData() {
    try{
        await criarArquivos();

        const content = await FileSystem.readAsStringAsync(irrigationData);
        console.log("---Imprimindo IrrigationData.txt---");
        console.log(content);
        console.log("-------------------------------------");
        
        return content;   
    } 
    catch(error){
        console.log("Erro: em getIrrigationData -> " + error.message);
    } 
}

//Apaga todos os registros de irrigações
export async function deleteAllIrrigationData() {
    try{
        let fileInfo = await FileSystem.getInfoAsync(irrigationData);
        if (fileInfo.exists) {
            await FileSystem.writeAsStringAsync(irrigationData, "");
        }
    }
    catch(error){
        console.log("Erro: em deleteAllIrrigationData -> " + error.message);
    }
}

//usada para pegar somente o Id de um registro de irrigação
export function getRegId(register){
    let aux = register.split(" ");
    return aux[0];
}

//usada para pegar somente a Data de um registro de irrigação
export function getRegDate(register){
    let aux = register.split(" ");
    return aux[1];
}

//usada para pegar somente o Periodo de um registro de irrigação
export function getRegPeriod(register){
    let aux = register.split(" ");
    return aux[2];
}

//__________________________________________________________________________________________________________________//
//______________________________________________Calculos_____________________________________________//

//Calcula o período de uma irrigação
export function calcPeriod(time) {
    try {
        if(time.length > 9){
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
        else{
            throw new Error("O período fornecido é inválido");
        }
    }
    catch (error) {
        console.log("Erro: em calcPeriod -> " + error.message);
        return 0;
    }
}

//Retorna todos os registros de irrigações baseado no período especificado
export async function getAllDataPeriod(startDate, endDate, format) {
    try {
        const arr = [];
        if(format == "daily"){
            endDate = startDate;
        }

        console.log("--Função getAllDataPeriod--");
        let content = await getIrrigationData();
        content = content.trim();
        const lines = content.split("\n");
        let lineStart = -1;
        let lineEnd = -1;
        const len = lines.length;
        //const arr = [];
        //usaremos para verificar se a data de início e de término especificada  foram encontradas
        let foundSDate = false;
        let foundEDate = false;
        let formatedSDate = DateTime.fromFormat(startDate, "ddMMyyyy");
        let formatedEDate = DateTime.fromFormat(endDate, "ddMMyyyy");

        if (formatedSDate > formatedEDate) {
            throw new Error("A data de início deve ser inferior ou igual a data de término");
        }

        for (let i = 0; i < len; i++) {
            const lineDate = getRegDate(lines[i]);
            const thisDate = DateTime.fromFormat(lineDate, "ddMMyyyy");

            if (lineDate == startDate && foundSDate == false) {
                foundSDate = true;
                lineStart = i;
            }

            //caso a data inicial especificada não seja encontrada
            if (!foundSDate && thisDate > formatedSDate) {
                foundSDate = true;
                lineStart = i
            }

            /*<------Identifica a posição do último registro que possui a mesma data de término 
            (existem mais de um registro com a mesma data, é necessário pegar o último)---------*/
            if (lineDate == endDate)  {
                lineEnd = i;
            }

            //{CONDICAO A}
            //se verdadeiro, significa que encontramos o ULTIMO registro com a mesma data de termino
            if(lineEnd != -1 && thisDate > formatedEDate){
                foundEDate = true
            }
            //-----------------------------------------------------------------------------------/>

            //caso a data final especificada não seja encontrada
            if (!foundEDate && thisDate > formatedEDate) {
                //entao pegaremos a linha anterior, pois é menor que a data final
                if (i > 0) {
                    lineEnd = i - 1;
                    foundEDate = true;
                }
                else{
                    throw new Error("Não existem registros dentro do período informado");
                }
                    
            }

            //caso estivermos no fim do arquivo e foundEDate ainda ser falso
            else if (foundEDate == false && i + 1 == len) {
                /*significa que a data final já foi encontrada, 
                porém por estar no fim do arquivo, a {CONDICAO A} não foi executada*/
                if(lineEnd != -1){
                    foundEdate = true;
                }
                //significa que o último registro do banco possui data inferior a data de termino especificada
                else{
                    lineEnd = i;
                    foundEDate = true;
                }
                    
            }
            if (foundSDate && foundEDate) {
                break;
            }
        }
            
        //As condicoes a seguir servem para verificar se existem registros dentro do periodo especificado.
        let lineDate = getRegDate(lines[lineEnd]);
        let thisDate = DateTime.fromFormat(lineDate, "ddMMyyyy");
            
        if(thisDate > formatedEDate || lineStart == -1 || lineStart > lineEnd){
            throw new Error("Não existem registros dentro do período informado");
        }
        
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
    catch (error) {
        console.error("Erro: em getAllDataPeriod -> " + error.message);
        let arr = [];
        return arr;
    }  
}

//irá retornar um vetor com os dados das irrigações (com ececao dos horarios) e os períodos que a bomba de água ficou ligada
export function dashboardIrrigationPeriod(arr, format) {
    try {
        const periodArr = [];
        const len = arr.length;
        let wPId = 0;
        let period = 0;

        if (format == "weeks") {
            for (let i = 0; i < len; i++) {
                let thisDate = DateTime.fromFormat(getRegDate(arr[i]), "ddMMyyyy");

                const week = thisDate.weekNumber;
                const year = thisDate.weekYear;
                const wPId = getRegId(arr[i]);
                period = getRegPeriod(arr[i]);
                period = calcPeriod(period);
                 
                let dataPeriod = wPId + " " + week + year + " " + period;

                periodArr.push(dataPeriod);
            }
            return periodArr;
        }
        else if (format == "months") {
            for (let i = 0; i < len; i++) {
                let thisDate = DateTime.fromFormat(getRegDate(arr[i]), "ddMMyyyy");

                const month = thisDate.month;
                const year = thisDate.year;
                const wPId = getRegId(arr[i]);
                period = getRegPeriod(arr[i]);
                period = calcPeriod(period);
                 
                let dataPeriod = wPId + " " + month + "/" + year + " " + period;
                periodArr.push(dataPeriod);
            }
            return periodArr;
        }
        else{
            for (let i = 0; i < len; i++) {
                if(arr[i] != ""){
                    wPId = getRegId(arr[i]);
                    let thisDate = getRegDate(arr[i]);
                    period = getRegPeriod(arr[i]);
                    period = calcPeriod(period);
                    let dataPeriod = wPId + " " + thisDate + " " + period;
                    periodArr.push(dataPeriod);
                }
            }
            return periodArr;  
        }
    }
    catch (error) {
        console.error("Erro: em dashboardIrrigationPeriod -> " + error.message);
        let arr = [];
        return arr;
    }
}

//retorna um vetor com as datas de acordo com o formato solicitado
export function dashboardIrrigationDate(arr, format) {
    try {
        const len = arr.length;

        if (format == "daily") {
            //obs: tem que ver se o vetor não possui posições vazias.
            //nesse caso, teremos que armazenar os horários ao invés das datas
            let timeArr = [];
            let period = 0;
            for(let item of arr){
               if(item.length != 0){
                let period = getRegPeriod(item);
                    timeArr.push(period);
                }
            }
            
            return timeArr;
        }
        else if (format == "days") {

            console.log("Format: days");
            console.log("Datas (dateArr): ");

            let dateArr = [];
            let previousPos = 0;

            for (let i = 0; i < len; i++) {
                //pegando a data
                let date = getRegDate(arr[i]);
                let aux = DateTime.fromFormat(date, "ddMMyyyy");
                let formatedDate = aux.toFormat("dd/MM/yyyy");
                if(i > 0){
                    //verificando se a data atual é diferente da data anterior
                    if(formatedDate != dateArr[previousPos]){
                       dateArr.push(formatedDate); 
                       previousPos++;
                    }      
                }
                else{
                    dateArr.push(formatedDate);
                }     
            }

            return dateArr;
        }
        else if (format == "weeks") {
            let dateArr = [];
            let lastDate = 0;
            let firstDate = getRegDate(arr[0]);
            let date = DateTime.fromFormat(firstDate, "ddMMyyyy");

            let week1 = date.weekNumber;
            let year1 = date.weekYear;

            let aux3 = getStartAndEndOfWeek(week1, year1);

            //para o caso de a data de início informada não ser a data correspondente a data do início de sua semana
            aux3 = aux3.substring(11);
            aux3 = date.toFormat("dd/MM/yyyy") + "-" + aux3;
            dateArr.push(aux3);

            for (let i = 0; i < len; i++) {
                let dateAux = getRegDate(arr[i]);

                let thisDate = DateTime.fromFormat(dateAux, "ddMMyyyy");

                week1 = date.weekNumber;
                const week2 = thisDate.weekNumber;

                year1 = date.weekYear;
                const year2 = thisDate.weekYear;

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
                    lastDate = getRegDate(arr[i]);
                }  
            }
            //substituindo a data referente ao fim da semana pela data da última irrigação feita no sistema (dentro do período que o usuário informou)
            let dateArrLength = dateArr.length;
            aux3 = dateArr[dateArrLength - 1];
            //console.log("Imprimindo o aux3: " + aux3);
            aux3 = aux3.substring(0, 11);
            let aux4 = DateTime.fromFormat(lastDate, "ddMMyyyy")
            aux3 = aux3 + aux4.toFormat("dd/MM/yyyy");
            dateArr[dateArrLength - 1] = aux3;

            return dateArr;
        }
        else if (format == "months") {
            let monthYearArr = [];
            let firstDate = getRegDate(arr[0]);
            firstDate = DateTime.fromFormat(firstDate, "ddMMyyyy");
            let previousMonth = firstDate.month;
            if(previousMonth < 10){
                previousMonth = "0" + previousMonth;
            }
            let previousYear = firstDate.year;
            let previousMonthYear = previousMonth + "/" + previousYear;
            
            monthYearArr.push(previousMonthYear);

            for(let i = 1; i < arr.length; i++){
                if(arr[i] != ""){
                    let thisDate = getRegDate(arr[i]);
                    thisDate = DateTime.fromFormat(thisDate, "ddMMyyyy");
                    let thisMonth = thisDate.month;
                    if(thisMonth < 10){
                        thisMonth = "0" + thisMonth;
                    }
                    let thisYear = thisDate.year;
                    let thisMonthYear = thisMonth + "/" + thisYear;

                    if(thisMonthYear != previousMonthYear){
                        previousMonthYear = thisMonthYear;
                        monthYearArr.push(thisMonthYear);
                    }
                }
            }
            return monthYearArr;
        }
    }
    catch (error) {
        console.error("Erro em dashboardIrrigationDate: " + error.message);
        let arr = [];
        return arr;
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
export async function calcWaterLiters(arr, format) {
    /*O valor da vazão é especificado em litros por hora. Transformamos o periodo de segundos para horas e calculamos a quantidade de água bombeada*/  
    try {
        let waterLitersArr = [];

        if(format == "daily"){
            for(let i = 0; i < arr.length; i++){
                if(arr[i] != ""){
                    let period = getRegPeriod(arr[i]);
                    let wpId = getRegId(arr[i]);
                    let wpFlowRate = await getWPFlowRateById(wpId);

                    let waterLiters = (parseFloat(period) / 3600) * parseFloat(wpFlowRate);
                    waterLiters = parseFloat(waterLiters.toFixed(4));

                    waterLitersArr.push(waterLiters);
                }
            }
        }
        else{
            let previousDate = getRegDate(arr[0]);
            let previousWLArrId = 0
            for(let i = 0; i < arr.length; i++){
                if(arr[i] != ""){
                    let thisDate = getRegDate(arr[i]);
                    let wpId = getRegId(arr[i]);
                    let period = getRegPeriod(arr[i]);
                    let waterLiters = 0;
                    

                    let wpFlowRate = await getWPFlowRateById(wpId);
                    console.log("wpFlowRate = " + wpFlowRate);

                    if(thisDate == previousDate){          
                        waterLiters = (parseFloat(period) / 3600) * parseFloat(wpFlowRate);
                        if(waterLitersArr.length > 0){
                            waterLiters += parseFloat(waterLitersArr[previousWLArrId]);
                            waterLitersArr[previousWLArrId] = waterLiters;
                        }
                        else{
                            waterLitersArr.push(waterLiters);
                        }

                    }
                    else{
                        previousDate = thisDate;
                        previousWLArrId++;
                        waterLiters = (parseFloat(period) / 3600) * parseFloat(wpFlowRate);
                        waterLitersArr.push(waterLiters);
                    }
                }
            }
        }

        return waterLitersArr;

    }
    catch (error) {
        console.error("Erro: em calcWaterLiters -> " + error.message);
        let arr = [];
        return arr;
    }
}

//retorna um vetor com o valor de KWH usado
export async function calcKWH(arr, format){
    try {
        let kwhArr = [];
        let previousDate = getRegDate(arr[0]);
        let previousKwhArrId = 0

        if(format == "daily"){
            for(let i = 0; i < arr.length; i++){
                if(arr[i] != ""){
                    let wpId = getRegId(arr[i]);
                    let period = getRegPeriod(arr[i]);
                    let kwh = 0;

                    let wpPower = await getWPPowerById(wpId);
                    //transformando W em KWH
                    wpPower = parseFloat(wpPower)/1000;

                    kwh = (parseFloat(period) / 3600) * parseFloat(wpPower);
                    kwh = parseFloat(kwh.toFixed(8));
                    //kwh = parseFloat(kwh);

                    kwhArr.push(kwh);
                }
            }
        }
        else{
            for(let i = 0; i < arr.length; i++){
                if(arr[i] != ""){
                    let thisDate = getRegDate(arr[i]);
                    let wpId = getRegId(arr[i]);
                    let period = getRegPeriod(arr[i]);
                    let kwh = 0;     

                    let wpPower = await getWPPowerById(wpId);
                    //transformando W em KWH
                    wpPower = parseFloat(wpPower)/1000;
                    

                    if(thisDate == previousDate){          
                        kwh = (parseFloat(period) / 3600) * parseFloat(wpPower);

                        if(kwhArr.length > 0){
                            kwh += parseFloat(kwhArr[previousKwhArrId]);
                            kwhArr[previousKwhArrId] = kwh;

                        }
                        else{
                            kwhArr.push(kwh);
                        }
                    }
                    else{
                        previousDate = thisDate;
                        previousKwhArrId++;
                        kwh = (parseFloat(period) / 3600) * parseFloat(wpPower);
                        kwhArr.push(kwh);
                    }
                }
            }
        }
        return kwhArr;
    }
    catch(error){
        console.error("Ero: em calcKWH -> " + error.mesage);
        let arr = [];
        return arr;
    }
}