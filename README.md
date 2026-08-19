# Skyttelogg

Offlinelogg för lerduveskytte — **nordisk skeet**, **hög fasan** och **trap**, registrerad
platta för platta. Byggd som en PWA (webbapp som installeras på hemskärmen). All data ligger
i telefonen, inget konto, ingen server, ingen täckning behövs.

## Filer

| Fil | Roll |
|---|---|
| `index.html` | Hela appen — HTML, CSS och JS i en fil |
| `manifest.json` | Gör appen installerbar på hemskärmen |
| `sw.js` | Service worker — cachar appen så den startar utan täckning |
| `icon-*.png` | Ikoner för hemskärmen |

## Så får du den i telefonen

### Alternativ 1 — GitHub Pages (rekommenderas, ~10 min, gratis)

Detta är det som ger en *riktig* installerbar offlineapp.

1. Skapa ett nytt repo på github.com, t.ex. `skyttelogg`. Sätt det till **Public**
   (Pages kräver det på gratiskontot).
2. Ladda upp alla filer i den här mappen till repots rot (`Add file → Upload files`).
3. `Settings → Pages → Build and deployment → Source: Deploy from a branch`,
   välj `main` och `/ (root)`. Spara.
4. Efter en minut ligger appen på `https://<ditt-användarnamn>.github.io/skyttelogg/`.
5. Öppna den adressen i **Chrome på telefonen** → menyn (⋮) → **Lägg till på startskärmen**
   / *Installera app*.
6. Öppna appen en gång med täckning. Service workern cachar allt. Därefter fungerar den
   utan nät — flygplansläge, ingen mast, spelar ingen roll.

När du vill uppdatera appen: ladda upp en ny `index.html` till repot. Höj samtidigt
`CACHE = "skyttelogg-v1"` i `sw.js` till `v2` — annars kan telefonen fortsätta visa
den gamla versionen.

### Alternativ 2 — testa direkt utan att publicera

Lägg `index.html` i telefonen (t.ex. via OneDrive) och öppna den i Chrome. Appen fungerar,
men service workern går inte att registrera från en lokal fil, så du får ingen
hemskärmsikon och lagringen är mindre pålitlig. **Bra för att känna på flödet, inte för
att lagra riktiga resultat.**

### Alternativ 3 — riktig Android-app senare

Om du vill ha den på Play Store eller nå kamera/sensorer kan samma HTML packas i en
`WebView`/Capacitor-skal, eller skrivas om i Kotlin + Compose + Room. Datamodellen
nedan är avsiktligt platt så den flyttar rakt in i en SQL-tabell.

## Vad appen gör

**Registrering i fält**
- Två stora knappar (`Träff` / `Bom`) som täcker halva skärmen — går att träffa med
  handskar utan att titta.
- Appen vet var i serien du är: station och plattyp visas i stort ovanför knapparna.
- Vid bom kan du snabbt ange var skottet gick (bakom / framför / över / under / vet ej).
  Kan stängas av i inställningarna.
- `+ Extra duva` för omskott (t.ex. första bommade duvan i serien som går om).
- `↶ Ångra` tar bort senaste registreringen.
- Pipraden längst upp visar hela serien i en blick — grönt, rött, tomt.
- Trap: separata knappar för träff på första och andra skottet.
- Hög fasan: stationsväljare som du kan flytta löpande under serien.
- Vibration som kvittens (kan stängas av).

**Statistik**
- Nyckeltal: träffprocent, snitt per serie med trend mot föregående fem, bästa serie,
  längsta träffsvit.
- **Träffprocent per station** ritad på en skeetbana. Färgskalan spänns över dina egna
  ytterlägen, så skillnaden mellan 88 % och 96 % faktiskt syns. Stationer med under fem
  registrerade plattor är grå istället för att låtsas vara statistik.
- Träffprocent per plattyp: enkel hög, enkel låg, dubbel första skottet, dubbel andra
  skottet, högtorn, trap. Det här är oftast den mest användbara vyn — andra skottet i
  dubblén är nästan alltid svagast.
- Serieresultat över tid med rullande femserierssnitt.
- Fördelning av bommar: bakom/framför/över/under.
- Jämförelse per vapen, patron, choke, bana och väder — visas automatiskt så snart du har
  minst tio plattor på vardera alternativ.
- Alla filter går att kombinera med disciplin och tidsperiod.
- Avbrutna serier räknas inte in i snitt och bästa serie.

**Data**
- Export till JSON (fullständig säkerhetskopia, kan importeras igen) och CSV (en rad per
  platta — öppna i Excel om du vill räkna själv).
- Import kan antingen slås ihop med befintlig data eller ersätta allt.

## Kontrollera skjutordningen

Uppställningen för **nordisk skeet** i appen är:

| Station | Plattor |
|---|---|
| 1 | hög, låg, dubbel (hög → låg) |
| 2 | hög, låg, dubbel (hög → låg) |
| 3 | hög, låg |
| 4 | hög, låg |
| 5 | hög, låg |
| 6 | hög, låg, dubbel (låg → hög) |
| 7 | hög, låg, dubbel (låg → hög) |
| 8 | hög, låg, **+ en hög som platta 25** |

De första 24 följer beskrivningen av nationell skeet (enkelduvor har ersatt de svårare
dubbléerna jämfört med olympisk skeet). **Den 25:e plattan är min gissning** — vilken
platta den är varierar mellan beskrivningar. Rätta den under
`Mer → Serieuppställning → Nordisk skeet`; ändringen gäller nya serier och statistiken
följer med automatiskt.

Samma editor gäller alla discipliner. Formatet är en rad per platta:

```
station,typ[,dubbelnummer,skottnummer]
```

Typ är `hog`, `lag`, `torn` eller `trap`. Tom station betyder "välj i appen" (som hög fasan).
Plattor med samma dubbelnummer hör till samma dubblé, och skottnummer 1/2 säger vilket
skott i dubblén det är — det är den kopplingen som gör att statistiken kan skilja på
första och andra skottet.

## Lägga till en disciplin

I `index.html`, i `DISCIPLINES`-objektet:

```js
"sporting":{
  name:"Sporting", short:"Sporting", field:"annat", perTarget:2,
  stations:[1,2,3,4,5,6,7,8], pickStation:true,
  build:()=>Array.from({length:50},()=>({st:null,t:"torn",pair:null,ord:null})),
  note:"50 duvor, station väljs löpande."
}
```

Statistiken, historiken och exporten plockar automatiskt upp den nya disciplinen.

## Datamodell

```
DB
├── settings   { askDir, haptic, theme }
├── seq        { <disciplin-id>: [ … egen skjutordning … ] }
├── active     pågående pass (samma form som ett pass nedan)
└── sessions[] avslutade pass, senaste först
    ├── id, date, disc, place, gun, choke, ammo, weather, kind, note
    └── series[]
        ├── id, curSt
        ├── planned[]  { st, t, pair, ord, extra }
        └── shots[]    { st, t, pair, ord, extra, res, shotNo, dir, ts }
```

`planned` och `shots` har samma index — `shots[i]` är resultatet på `planned[i]`. Det gör
att du kan avbryta en serie var som helst och ändå veta exakt vilka plattor som är skjutna.

## Idéer för nästa version

- **Serier per pass som mål** — sätt ett mål (t.ex. "22/25") och se måluppfyllelse över tid.
- **Kommentar per platta** istället för bara per pass — "släppte kinden", "sköt för tidigt".
- **Foto av protokollet** som bilaga till passet.
- **Medskyttar** och enkel resultattavla för klubbtävlingar.
- **Träningsdagbok-vy** som blandar resultat med anteckningar kronologiskt.
- **Import av gamla resultat** från kalkylblad via CSV-läsning (exporten visar formatet).
- **Väder automatiskt** från position — men det kräver täckning, så det bör vara ett
  frivilligt komplement som fylls i i efterhand.
- **Bakåtjämförelse per station** — "station 7 har gått från 63 % till 78 % sedan mars".
- **Widget/genväg** som startar ett nytt pass direkt från hemskärmen.
