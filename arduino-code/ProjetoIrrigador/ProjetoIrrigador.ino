#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
//bibliotecas para pegar o horário atual
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <TimeLib.h>
#include <EEPROM.h>

#define umidadeInput A0
//é a porta digital D01
#define bombaInput 5

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

const char* ssid = "*****";
const char* password = "******";

float umidadeAtual;
int umidadeON = 20;
int umidadeOFF = 40;
bool bombaStatus = false;
bool controleManual = false;
String historicoIrrigacao;
String horarioON [30];
String horarioOFF [30];
int i = 0;


ESP8266WebServer server(80);

void handleRoot() {
  server.send(200, "text/plain", "conectado");
}

void handleNotFound() {
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
}

float calcularUmidade(){
  uint16_t valor = analogRead(umidadeInput);
  float umidade = (valor - 380) / 6.44;
  umidade = 100 - umidade;

  return(umidade);
}

void handleAtualizar() {
  Serial.println("handleUmidadeAtual foi requisitada!!");
  String data;
  float umidade = calcularUmidade();
  if(umidade <0){
    data = "0;" + String(bombaStatus? 1 : 0);
    server.send(200, "text/plain", data);//Envia a umidade e o estado da bomba separado por ";". Exemplo: 50;1
  }
  else if(umidade > 100){
    data = "100;" + String(bombaStatus? 1 : 0);
    server.send(200, "text/plain", data);
  }
  else{
    Serial.println("Umidade do solo: " +  String(umidade) + "%");
    data = String(umidade, 0) + ";" + (bombaStatus? "1" : "0"); // Limita a duas casas decimais
    Serial.println("Dado enviado: " + data);
    server.send(200, "text/plain", data);
  }
}

void handleEnviarDadosIrrigacao(){
    server.send(200, "text/plain", historicoIrrigacao);
    historicoIrrigacao = "";
}

void handleDefinirNiveis(){
  Serial.println("API definir níveis de umidade foi requisitada");
  String data = server.arg("plain");
  Serial.println("Valor recebido: " + data);
  int index = data.indexOf(";");
  //precisei colocar 1, index porque data vem com aspas
  umidadeON = (data.substring(1, index)).toInt();
  umidadeOFF = (data.substring(index + 1)).toInt();
  EEPROM.write(1, umidadeON);
  EEPROM.write(2, umidadeOFF);
  EEPROM.commit();
  Serial.println("Umidade On: " + String(umidadeON));
  Serial.println("Umidade OFF: " + String(umidadeOFF));
  server.send(200, "text/plain", String(true));
}

void handleLigarControleManual(){
  controleManual = true;
  Serial.println("--Controle manual habilitado--");
  server.send(200, "text/plain", "Controle manual habilitado");
}
void handleDesligarControleManual(){
  controleManual = false;
    Serial.println("--Controle manual desabilitado--");
    server.send(200, "text/plain", "Controle manual desabilitado");
}

void handleLigarBomba(){
  Serial.println("Ligar bomba foi requisitado");
  if(controleManual == true){
    if(bombaStatus == false){
      bombaStatus = true;
      digitalWrite(bombaInput, HIGH);
      //SALVA NO HISTÓRICO O MOMENTO QUE ELA LIGOU
      setHistoricoOn();
      server.send(200, "text/plain", "Bomba de água foi ligada");
      return;
    }
    server.send(200, "text/plain", "A bomba já está ligada");
    return;
  }
  server.send(200, "text/plain", "Habilite o controle manual");

}

void handleDesligarBomba(){
  Serial.println("Desligar bomba foi requisitado");

  if(controleManual == true){
    if(bombaStatus == true){
      bombaStatus = false;
      digitalWrite(bombaInput, LOW);
      //SALVA NO HISTÓRICO O MOMENTO QUE ELA DESLIGOU
      setHistoricoOff();
      server.send(200, "text/plain", "Bomba de água foi desligada");
      return;
    }
    server.send(200, "text/plain", "A bomba já está desligada");
    return;
  }
  server.send(200, "text/plain", "Habilite o controle manual");
}

void setHistoricoOn(){
  timeClient.update();
  time_t date = timeClient.getEpochTime();

  //formatação da data
  char buffer [20];
  sprintf(buffer, "%02d%02d%04d %02d:%02d:%02d",
    day(date), month(date), year(date),
    hour(date), minute(date), second(date));

  historicoIrrigacao += String(buffer);
}

void setHistoricoOff(){
  timeClient.update();
  historicoIrrigacao += "-" + timeClient.getFormattedTime() + ";";
}

void setup() {
  pinMode(bombaInput, OUTPUT);
  Serial.begin(115200);

  EEPROM.begin(512); 
  
  if(EEPROM.read(0) == 0){
    EEPROM.write(1, umidadeON);
    EEPROM.write(2, umidadeOFF);
    EEPROM.write(0, 1);
    EEPROM.commit();
  }
  else{
    umidadeON = EEPROM.read(1);
    umidadeOFF = EEPROM.read(2);
  }
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if (MDNS.begin("esp8266")) {
    Serial.println("MDNS responder started");
  }

  server.on("/", HTTP_GET, handleRoot);
  server.on("/atualizar", HTTP_GET, handleAtualizar);
  server.on("/definirNiveis", HTTP_POST, handleDefinirNiveis);
  server.on("/enviarDadosIrrigacao", HTTP_GET, handleEnviarDadosIrrigacao);
  server.on("/ligarControleManual", HTTP_POST, handleLigarControleManual);
  server.on("/desligarControleManual", HTTP_POST, handleDesligarControleManual);
  server.on("/ligarBomba", HTTP_POST, handleLigarBomba);
  server.on("/desligarBomba", HTTP_POST, handleDesligarBomba);
  server.onNotFound(handleNotFound);
  server.begin();
  Serial.println("HTTP server started");

  timeClient.begin();
  timeClient.setTimeOffset(-10800); //horário de brasília
}

void loop() {
  server.handleClient();
  if (millis() % 2000 == 0) { // Verifica a cada 2 segundos
    umidadeAtual = calcularUmidade();
    if(controleManual == false){
    // Verifica se a bomba deve ser ligada ou desligada. usar o estado da bomba vai ajudar a garantir que sejam salvos somente um horário por ativação e um para desativação.
      if (bombaStatus == false && umidadeAtual < umidadeON) {
        setHistoricoOn();
        Serial.println("Variavel historico de irrigação: ON -->" + historicoIrrigacao);
        bombaStatus = true;
        digitalWrite(bombaInput, HIGH);
      } else if (bombaStatus == true && umidadeAtual >= umidadeOFF) {
        bombaStatus = false;
        setHistoricoOff();
        Serial.println("Variavel historico de irrigação: OFF -->" + historicoIrrigacao);
        digitalWrite(bombaInput, LOW);
      }
    }
  }
}