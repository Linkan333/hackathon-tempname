# Studyhack

**Team:** Kristoffer Wahlbäck, Linus Nyberg, Rafael Al Najafi Nsaibia

### Tävlar i kategori:
**Bästa Helhetslösning**

---

## Projekt & Teknisk beskrivning

### Projektbeskrivning
Studyhack är en intelligent studieplattform som kombinerar **AI-genererat innehåll** med **Gamification** för att maximera elevers studieresultat. Vårt mål var att lösa problemet med passivt pluggande genom att skapa ett verktyg som inte bara ställer frågor, utan anpassar sig och belönar framsteg.

Kärnan i systemet är en **AI-driven Flashcard-generator** som automatiskt skapar studiematerial inom valda ämnen. För att hantera komplexa ämnen som matematik och fysik har vi implementerat stöd för **LaTeX** och **KaTeX**, vilket gör att vi kan rendera matematiska formler korrekt direkt i webbläsaren – något många vanliga studieappar misslyckas med.

### Tekniska Lösningar
Projektet är en fullstack-lösning där vi kombinerat modern frontend med en avancerad backend-logik.

**1. Multi-API Arkitektur (AI & Backend):**
Istället för att förlita oss på en enda källa använder systemet en orkestrering av flera API:er i bakgrunden.
* **Funktion:** Detta låter oss generera högkvalitativa, ämnesspecifika frågor dynamiskt.
* **Mass-API integration:** Genom att koppla samman olika datakällor säkerställer vi att frågorna är varierade och faktagranskade.

**2. Matematisk Rendering (KaTeX/LaTeX):**
En av våra största tekniska utmaningar var att visualisera matematik.
* **Lösning:** Vi implementerade **KaTeX** (ett snabbt matte-bibliotek) som parsar LaTeX-kod från AI:n och renderar det som snygg HTML. Detta möjliggör flashcards med komplexa ekvationer och formler utan att prestandan påverkas.

**3. Dynamiskt Gamification-system:**
Vi byggde ett eget system för progression för att öka användarengagemanget.
* **Dynamisk XP:** Systemet beräknar XP-belöningar baserat på uppgiftens svårighetsgrad och användarens streak.
* **Level-logik:** En algoritm övervakar framsteg i realtid och hanterar "Level Ups" med visuell feedback i gränssnittet.

**4. UI/UX:**
Frontend är byggd med fokus på "Clean EdTech Design". Vi använder CSS Variables för teman och Modaler för ett app-liknande flöde utan sidomladdningar.

---

### Externt producerade komponenter

För att kunna fokusera på vår unika logik har vi använt följande bibliotek:

* **KaTeX:** För rendering av matematiska formler (LaTeX). Valdes för sin snabbhet jämfört med MathJax.
* **OpenAI:** För generering av frågedata.
* **Google Fonts:** För typografi.

I övrigt är all spellogik, frontend-kod och API-hantering skriven av gruppen.

---

### Version
npm version: 11.6.2
nvm version: 0.39.7


### Environment variables
Create an .env file in the project root wich means /hackathon-tempname/.env
paste in your open ai api key from their website. You can get it here: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-proj


### Install

För att köra projektet lokalt:

1.  Klona detta repo.
2.  Skapa en fil som heter `.env` (om ni använder API-nycklar) och lägg in era nycklar där.
3.  Öppna projektet i VS Code.
4.  Kör `npm install` (om ni använder Node modules) annars hoppa till steg 5.
5.  sedan node server.js
