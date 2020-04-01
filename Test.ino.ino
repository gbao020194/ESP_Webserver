#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include "SPIFFS.h"
#include <ESPmDNS.h>
// Replace with your network credentials
const char* ssid = "NGOVANTOAI";
const char* password = "toai1962";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

void setup(){
  // Serial port for debugging purposes
  Serial.begin(115200);

  // Initialize SPIFFS
  if(!SPIFFS.begin(true)){
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }
  //MDNS
  if (MDNS.begin("esp32")) { //esp32.local/
    Serial.println("MDNS responder started");
  }
  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  // Print ESP32 Local IP Address
  Serial.println(WiFi.localIP());

  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "Smart_Home.html", "text/html");
  });

  server.on("/Layout.css", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/Smart_Home.css", "text/css");
  });

  server.on("/Layout.js", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/Smart_Home.js", "text/js");
  });

  // Start server
  server.begin();
  MDNS.addService("http","tcp",80);
}
 
void loop(){
  
}
