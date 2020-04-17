#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include "SPIFFS.h"
#include <ESPmDNS.h>
#include <Arduino_JSON.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

// Replace with your network credentials
const char* ssid = "NGOVANTOAI";
const char* password = "toai1962";
#define LED 2
int i = 0;
String database;
String Status;
JSONVar myObject;
unsigned long previousMillis = 0;
const long interval = 1000;

// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);
// Variables to save date and time
int Hours, Minute;
String timeStamp, hourStamp, minuteStamp;


// Create AsyncWebServer object on port 80
AsyncWebServer server(80);
AsyncWebSocket ws("/test");

void onWsEvent(AsyncWebSocket * server, AsyncWebSocketClient * client, AwsEventType type, void * arg, uint8_t *data, size_t len) {

  if (type == WS_EVT_CONNECT) {
    Serial.println("Websocket client connection received");

  } else if (type == WS_EVT_DISCONNECT) {
    Serial.println("Client disconnected");
    Serial.println("-----------------------");
    //digitalWrite(LED, LOW);
  } else if (type == WS_EVT_DATA) {
    database = "";
    Serial.print("Data received: ");

    for (int i = 0; i < len; i++) {
      database += ((char) data[i]);
    }
    Serial.println(database);
    demoParse(database);
  }
}

void demoParse(String payload) {
  Serial.println("parse");
  Serial.println("=====");
  myObject = JSON.parse(payload);
  // JSON.typeof(jsonVar) can be used to get the type of the var
  if (JSON.typeof(myObject) == "undefined") {
    Serial.println("Parsing input failed!");
    return;
  }
}

void toggolLight() {
  int pin = (int) myObject[i]["portBT"];
  String Status = (const char*) myObject[i]["statusBT"];
  if (Status == "OFF")  digitalWrite(pin, LOW);
  else if (Status == "ON")digitalWrite(pin, HIGH);
}

void setup() {
  // Serial port for debugging purposes
  Serial.begin(115200);
  // Initialize SPIFFS
  if (!SPIFFS.begin(true)) {
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

  ws.onEvent(onWsEvent);
  server.addHandler(&ws);
  // Route for root / web page
  server.on("/Main.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(SPIFFS, "/Main.html", "text/html");
  });

  server.on("/Button.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(SPIFFS, "/Button.html", "text/html");
  });

  server.on("/Main.js", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(SPIFFS, "/Main.js", "text/javascript");
  });

  server.on("/Button.js", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(SPIFFS, "/Button.js", "text/javascript");
  });

  server.on("/Style.css", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(SPIFFS, "/Style.css", "text/css");
  });

  server.on("/Temperature.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(SPIFFS, "/Temperature.html", "text/html");
  });

  server.on("/Temperature.js", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(SPIFFS, "/Temperature.js", "text/javascript");
  });

  // Start server
  server.begin();
  MDNS.addService("http", "tcp", 80);
  pinMode(2, OUTPUT); pinMode(4, OUTPUT); pinMode(5, OUTPUT); pinMode(18, OUTPUT);
  digitalWrite(2, LOW); digitalWrite(4, LOW); digitalWrite(5, LOW); digitalWrite(18, LOW);
  // Initialize a NTPClient to get time
  timeClient.begin();
  // Set offset time in seconds to adjust for your timezone, for example:
  // GMT +7 = 3600x7
  timeClient.setTimeOffset(25203);
}

void loop() {
  Hours = timeClient.getHours();
  Minute = timeClient.getMinutes();
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    if (!timeClient.update()) {
      timeClient.forceUpdate();
    }
    if (i < myObject.length()) {
      //if (myObject[i].hasOwnProperty("setTimer")) {
      timeStamp = (const char*) myObject[i]["setTimer"];
      if (timeStamp == "") {
        toggolLight();
      }
      else {
        int splitT = timeStamp.indexOf(":");
        hourStamp = timeStamp.substring(0, splitT);
        minuteStamp = timeStamp.substring(splitT + 1, timeStamp.length());
        if (hourStamp.toInt() == (int)Hours) {
          if (minuteStamp.toInt() == (int)Minute) {
            toggolLight();
          }
        }
      }
      //}
      i++;
    }
    else i = 0;
  }
}
