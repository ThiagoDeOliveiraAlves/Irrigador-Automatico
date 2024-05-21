import * as FileSystem from "expo-file-system";

const path = FileSystem.documentDirectory + "/data";

export function fetchAtualizarDecoder(data) {

}

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

export async function lerArquivo() {
    const content = await FileSystem.readAsStringAsync(path + "/data.txt");
    console.log("-- FUNÇÃO: LER ARQUIVO --");
    console.log("Conteudo do arquivo");
    console.log(content);
    return content;
}

export async function lerUltimaLinha() {
    try {

        const content = await FileSystem.readAsStringAsync(path + "/data.txt");
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

export async function apagarDados(){
    let fileInfo = await FileSystem.getInfoAsync(path);
    if (fileInfo.exists) {
    await FileSystem.writeAsStringAsync(path + "/data.txt", "");
    }
}