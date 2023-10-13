# Women Football League


Juego hecho con React que simula una liga de fútbol femenino. El juego usa MongoDB como base de datos para almacenar la información de equipos y jugadoras. El usuario podrá gestionar su equipo, cambiar alineaciones, invertir en entrenamientos y efectuar apuestas.

## Características
### Algoritmo de Simulación de Partidos

- Nivel de los equipos: 25%
- Número de partidos de las jugadoras: 10%
- Factor suerte: 25%
- Factor campo: 15%
- Expulsiones: 5%
- Clima: 20%


## Colección MongoDB: Equipos

- Cada jugadora tendrá habilidades específicas.


## Tabla de Clasificación

- Partidos ganados: 3 puntos
- Partidos perdidos: 0 puntos
- Partidos empatados: 1 punto
- Gol average

## Usuario Identificado

- Seleccionar equipo
- Manipular alineaciones
- Repartir presupuesto (1 millón de euros de inicio)
- Invertir en entrenamientos para mejorar el rendimiento.

## Apuestas

- Algoritmo convencional de apuestas
- Futuras Implementaciones versión multiplayer online.

## Arquitectura principal

womenleague/
|-- node_modules/
|-- src/
|   |-- assets/
|   |-- components/
|   |   |-- Team/
|   |   |-- Match/
|   |   |-- Leaderboard/
|   |   |-- Betting/
|   |-- contexts/
|   |   |-- TeamContext.js
|   |   |-- MatchContext.js
|   |-- hooks/
|   |   |-- useTeam.js
|   |   |-- useMatch.js
|   |-- models/
|   |   |-- Team.js
|   |   |-- Player.js
|   |-- pages/
|   |   |-- Home.js
|   |   |-- Dashboard.js
|   |   |-- Betting.js
|   |-- services/
|   |   |-- api.js (axios)
|   |-- App.js
|   |-- index.js
|-- vite.config.js
|-- package.json