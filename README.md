## Irrigador Automático

#### Vídeo do sistema: 
#### Registro de testes: https://1drv.ms/w/c/11003e87cfbcc96d/EaLHpej2h81Ovfr5hyHNWkgBq5SkPecqjYCpnD6vC409gA?e=1whbhg

### Sumário
- [Descrição do sistema](#descrição-do-sistema)
- [Componentes utilizados](#componentes-utilizados)
- [Linguagens de programação utilizadas](#linguagens-de-programação-utilizadas)
- [Framework utilizado](#framework-utilizado)
- [Softwares utilizados](#softwares-utilizados)
- [Regras de negócio](#regras-de-negócio)
- [Requisitos funcionais](#requisitos-funcionais)
- [Requisitos não funcionais](#requisitos-não-funcionais)
- [Diagrama de casos de uso](#diagrama-de-casos-de-uso)
- [Imagens do sistema](#imagens-do-sistema)
  - [Imagens do aplicativo](#imagens-do-aplicativo)
  - [Imagens do circuito](#imagens-do-circuito)


___

#### Descrição do sistema:

O Smart Irrigator irriga o solo de forma automática de acordo com os níveis de umidade mínima e máxima definidas pelo usuário. O sistema consiste em um aplicativo desenvolvido com React Native e um ESP8266 (um microcontrolador) configurado como Web Server, capaz de receber e responder requisições HTTP. 

No aplicativo, o usuário precisa primeiramente especificar a URL do ESP8266 (em “Gerenciar ESP8266”), após isso, na tela de início, basta clicar no botão de conectar e o aplicativo irá tentar sincronizar com o microcontrolador. Quando a sincronização é bem-sucedida, o app exibe a mensagem “Sincronizado”, caso ocorra algum erro, é exibida a mensagem “Erro de comunicação. Não sincronizado”. 

Na tela de Início, o usuário pode acompanhar o nível de umidade do solo, o status da bomba (Ligada ou Desligada) e verificar se o app está ou não sincronizado com o microcontrolador.  

Acessando o menu, o usuário pode navegar entre as telas do app. Na tela “Definir níveis de umidade” o usuário pode especificar os níveis de umidade mínimo e máximo que o microcontrolador deve considerar para realizar as irrigações. No menu, ao clicar em “Gerenciar bomba”, é exibido uma tela onde o usuário pode especificar as características da bomba de água, como a potência (em watts) e a vazão (em litros por hora). Nessa mesma tela, o usuário tem acesso ao controle manual, habilitando esse controle, o sistema para de irrigar o sistema de forma automática e passa o controle para o usuário, que pode ligar e desligar a bomba de água através dos botões do app. 

O aplicativo também permite gerar gráficos referente ao consumo de água e energia nos períodos especificados pelo usuário. 

#### Componentes utilizados:

- 1 NodeMCU ESP8266; 

- 1 Módulo Relé de 1 canal 5V; 

- 1 Diodo IN4007; 

- 1 Protoboard; 

- Jumpers; 

- 1 Bomba de água; 

- 1 Módulo sensor de umidade do solo; 

- 1 Transistor BC548; 

- 1 Resistor 1K ohms ¼W. 

#### Linguagens de programação utilizadas:

- C++; 

- JavaScript. 

 

#### Framework utilizado:

- React native. 

#### Softwares utilizados:

- IDE Arduino; 

- Visual Studio Code. 

 

#### Regras de negócio:

1. O sistema deve cadastrar os dados de uma única bomba de água; 

2. Por padrão, enquanto o usuário não alterar os níveis de umidade mínima e máxima, estes atributos devem valer respectivamente 20% e 40%; 

3. O aplicativo deve sincronizar com um único esp8266; 

4. O sistema deve permitir o cadastro de no máximo 15 sensores de umidade.

 

#### Requisitos funcionais: 

1. O sistema deve usar o ESP8266 como um Web Server capaz de receber e responder requisições HTTP para controle e monitoramento;

2. O sistema deve medir o nível de umidade do solo através do ESP8266 e permitir que ele envie esses dados ao aplicativo quando solicitado; 

3. O sistema deve exibir no aplicativo o nível de umidade do solo retornado pelo ESP8266; 

4. O sistema deve identificar o status da bomba de água (“Ligada” ou “Desligada”) por meio do ESP8266 e enviar essas informações ao aplicativo quando solicitado;

5. O sistema deve exibir no aplicativo o status da bomba de água (“Ligada” ou “Desligada”) retornado pelo ESP8266; 

6. O sistema deve sincronizar automaticamente o nível de umidade e o status da bomba de água entre o aplicativo e o ESP8266 a cada intervalo de tempo de no máximo 5 segundos; 

7. O sistema deve cessar as requisições de sincronização e notificar o usuário após 3 tentativas malsucedidas seguidas, permitindo novas requisições apenas mediante solicitação do usuário;

8. O sistema deve permitir que o usuário configure os níveis de umidade mínima e máxima do solo pelo aplicativo e envie esses dados ao ESP8266;

9. O sistema deve salvar os níveis de umidade mínima e máxima enviados pelo aplicativo na memória EEPROM do ESP8266; 

10. O sistema deve ligar a bomba de água automaticamente quando a umidade do solo estiver abaixo do nível mínimo e desligá-la quando atingir o nível máximo, caso o controle manual esteja desativado; 

11. O sistema deve permitir que o usuário especifique a vazão (em litros por hora) e a potência (em watts) da bomba de água utilizada através do aplicativo; 

12. O sistema deve registrar as datas e horários de início e término das irrigações pelo ESP8266 e permitir que esses dados sejam enviados ao aplicativo quando solicitado; 

13. O sistema deve salvar no aplicativo os registros de irrigação retornados pelo ESP8266; 

14. O sistema deve gerar gráficos no aplicativo referentes ao consumo de água (em litros) e energia (em kWh) com base em um período especificado pelo usuário; 

15. O sistema deve permitir que o usuário escolha a unidade de tempo para exibição dos gráficos de consumo, com as opções de diário, dias, semanas e meses; 

16. O sistema deve incluir a funcionalidade de controle manual no aplicativo, permitindo que o usuário ligue e desligue a bomba de água por meio de botões e suspenda a irrigação automática quando ativado; 

17. O sistema deve salvar os dados no aplicativo em arquivos no formato “txt”;

18. O sistema deve permitir que o usuário cadastre mais de um sensor de umidade do solo.

 

#### Requisitos não funcionais: 

1. O sistema deve ser intuitivo e fácil de usar, promovendo uma experiência acessível para o usuário. 

2. O sistema deve apresentar telas simples e objetivas, focando na clareza das informações. 

3. O sistema deve garantir que as opções de navegação estejam claramente identificadas e facilmente acessíveis por meio do menu. 

4. O sistema deve disponibilizar a interface em português. 

5. O sistema deve adotar uma cor de fundo escura nas telas do aplicativo para minimizar o cansaço visual do usuário. 

6. O sistema deve utilizar uma paleta de cores composta por tons de verde, azul e branco, garantindo uma interface visualmente agradável. 


## Diagrama de casos de uso:
![Diagrama de casos de uso SmartIrrigator](https://github.com/user-attachments/assets/381e5472-8d6e-43a5-9300-f0afe98dcdbf)


## Imagens do sistema:

### Imagens do aplicativo:


#### 1. Tela de início
![1- Tela de início](https://github.com/user-attachments/assets/261d00da-7159-4e40-baa7-ecd18def0a6d)


#### 2. Menu
![6 - Menu](https://github.com/user-attachments/assets/df7eb403-5037-4e93-b442-05916cf32168)


#### 3. Tela para definir níveis de umidade: 
![2- Definir niveis](https://github.com/user-attachments/assets/a070420b-59b8-454c-b56d-0fae52f9cf4a)


#### 4. Tela para gerenciar a bomba de água e controle manual: 
![3- 1 Gerenciar bomba (Superior)](https://github.com/user-attachments/assets/b4e940d3-3a77-41fa-9483-4e8f6bee0202)
![3- 1 Gerenciar bomba (Inferior)](https://github.com/user-attachments/assets/63eca1cd-c46a-48fd-a259-c303a1df0cd7)


#### 5. Tela para gerar gráficos: 
![4- 1- Gerar grafico (Superior)](https://github.com/user-attachments/assets/22ea1c66-e37e-4047-be94-edbcc3598d24)
![4- 1- Gerar grafico (Inferior)](https://github.com/user-attachments/assets/5c310bd8-0b80-49f7-9baa-2a715a7b3146)


#### 6. Tela para especificar o endreço do ESP8266: 
![5- Gerenciar Esp](https://github.com/user-attachments/assets/eba7fb97-cb30-4893-ad07-f9edd87706bf)


### Imagens do circuito:

#### 1. ESP8266 no protoboard:
![Esp8266 na protoboard e modulo rele](https://github.com/user-attachments/assets/9bf959f1-d8d0-46d0-82db-e09debe31cec)

#### 2. Módulo relé:
![Modulo rele](https://github.com/user-attachments/assets/ee936003-7035-400d-9eb0-3a115dfd4723)


#### 3. Sensor de umidade do solo (espetado na terra):
![Sensor de umidade do solo 3](https://github.com/user-attachments/assets/4a557171-21b9-44c7-bd4a-f3a99e155162)


#### 4. Bomba de água:
![Bomba de agua 1](https://github.com/user-attachments/assets/a7a2b55d-5489-4675-ac5d-3fc03c67d5f0)


#### 5. Circuito completo:
![Circuito completo 2](https://github.com/user-attachments/assets/8ae58d01-9fc3-44fa-8f1b-01ccc70e16d9)

#### 6. Solo sendo irrigado:
![Solo sendo irrigado](https://github.com/user-attachments/assets/703139f0-f418-458d-bdb7-3275687b0a80)


### Observações:
O único requisito funcional não implementado foi o de adicionar sensores. Isso pois o microcontrolador utilizado possui apenas uma porta analógica (tipo de porta necessária para receber as leituras do sensor). Uma possível solução para esse problema é acoplar um circuito integrado que funcione como comutador e ajustar o código.
