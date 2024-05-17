import * as FileSystem from "expo-file-system";

const path = FileSystem.documentDirectory + "/data";

export function fetchAtualizarDecoder(data){
    
}

export async function salvarHistoricoIrrigacao(response){
    const arr = response.split(";");
    const len = arr.length;
    let newData = "";
    try{
        let fileInfo = await FileSystem.getInfoAsync(path);
        
        if(fileInfo.exists){
            console.log("-------O arquivo existe-------");
            console.log("Dados no vetor: ")
            for(let count = 0; count<(len); count++){
                newData += String("\n" + arr[count]);
                console.log(String(arr[count]));
            }
            let fullData = await FileSystem.readAsStringAsync(path + "/data.txt");
            fullData += newData;
            await FileSystem.writeAsStringAsync(path + "/data.txt", fullData);
            //await FileSystem.writeAsStringAsync(path + "/data.txt", newData);


        }
        else{
            console.log("O arquivo não existe");
            //criando o diretório e o arquivo
            console.log("criando o diretório...");
            await FileSystem.makeDirectoryAsync(path, { intermediates: true });
            /*antes de escrever, é preciso armazenar o texto do arquivo, concatenar esse texto com os novos dados 
            para então sim escrever no arquivo, porque senão, os dados anteriores serão perdidos*/
            await FileSystem.writeAsStringAsync(path + "/data.txt", "");
            fileInfo = await FileSystem.getInfoAsync(path);
            if(fileInfo.exists){
                console.log("Diretório criado com sucesso");
            }
            else{
                console.log("Erro ao criar o diretório");
            }
        }
    }catch(error){
        console.log(error.message);
    }
}

export async function lerArquivo(){
    const content = await FileSystem.readAsStringAsync(path + "/data.txt");
    console.log("Conteudo do arquivo");
    console.log(content);
    return content;
}

export async function lerUltimaLinha(){
    try{
        const content = await FileSystem.readAsStringAsync(path + "/data.txt");
        const lines = content.split("\n");
        const lastLine = lines[lines.length - 1];
        return lastLine;
    }
    catch(error){
        console.log("Erro: " + error);
    }
}