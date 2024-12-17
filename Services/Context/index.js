import React, { createContext, useEffect, useRef, useState } from "react";
import { fetchAtualizar, fetchGetHistoricoIrrigacao } from "../../API";

export const UmidadeContext  = createContext();

export const UmidadeProvider = ({ children }) => {
    const [umidadeMedia, setUmidadeMedia] = React.useState(0);
    const [bombaStatus, setBombaStatus] = React.useState(null);
    const [tentativas, setTentativas] = React.useState(0);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [isConnected, setIsConnected] = React.useState(false);
    const [isFetching, setIsFetching] = React.useState(false);


    const conectar = () => {
        console.log("Reiniciar tentativas chamado");
        setTentativas(0);
        setIsFetching(false);
    }

    useEffect(() => {
        if(isFetching) return;
        
        if(tentativas >= 3){
          setAlertMessage("Erro de comunicação. Não sincronizado");
          setIsConnected(false);
          return;
        }

        setIsFetching(true);

        const fetchUmidade = async () => {
          try {
            console.log("Chamando... tentativa: " + tentativas);
            [umidadeData] = await Promise.all([
              fetchAtualizar(),
              fetchGetHistoricoIrrigacao()
            ]);
            const data = await umidadeData;
            const dataArray = data.split(';');
            
            setUmidadeMedia(dataArray[0]);
            setBombaStatus(dataArray[1] === '1');
            setAlertMessage("Sincronizado");
            setIsConnected(true);            
            //aplica um intervalo para que seja feita a próxima requisição
            setTimeout(() => {
              setTentativas(0);
              setIsFetching(false);
          }, 2000);
          
          } catch (error) {
            console.error('Erro ao buscar dados de umidade:', error);
            setTentativas(tentativas + 1);
            setBombaStatus(null);
            setUmidadeMedia(0);
            setAlertMessage("Erro de comunicação. Não sincronizado");
            setIsConnected(false);

            setTimeout(() => {
              setIsFetching(false);
            }, 2000);
          }
        };

        fetchUmidade();
  
    }, [tentativas, isFetching]);

        /*
        const intervalId = setInterval(fetchUmidade, 2000);
        
        return () => clearInterval(intervalId);
    },[tentativas]);
    */

    return (
        <UmidadeContext.Provider value={{ umidadeMedia, bombaStatus, tentativas, alertMessage, isConnected, conectar }}>
          {children}
        </UmidadeContext.Provider>
      );
    };