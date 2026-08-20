# Skyttelogg

Offlinelogg för lerduveskytte — **nationell skeet**, **olympisk skeet**, **hög fasan** och
**nordisk trap**. Byggd som en PWA (webbapp som installeras på hemskärmen). All data ligger i
telefonen, inget konto, ingen server, ingen täckning behövs.

Version 2.0 — bygger på specen *Prompt för skytteapp ver 2.2*, etapp 1.

## Filer

| Fil | Roll |
|---|---|
| `index.html` | Hela appen — HTML, CSS och JS i en fil |
| `manifest.json` | Gör appen installerbar på hemskärmen |
| `sw.js` | Service worker — cachar appen så den startar utan täckning |
| `icon-*.png` | Ikoner för hemskärmen |

## Uppdatera appen på telefonen

1. Lägg de nya filerna i repomappen.
2. GitHub Desktop → skriv en `Summary` → `Commit to main` → `Push origin`.
3. **Höj `CACHE`-numret i `sw.js`** varje gång du ändrar `index.html`, annars fortsätter
   telefonen visa den cachade gamla versionen. Just nu står det `skyttelogg-v2`.
4. Öppna appen på telefonen med täckning. Den hämtar den nya versionen i bakgrunden och
   visar den nästa gång du startar den. Vill du framtvinga det direkt: stäng appen helt
   och öppna igen.

Din registrerade data påverkas inte av en uppdatering. Den ligger i telefonens eget
lagringsutrymme, inte i appfilen.

## Skjutordningar

Alla fyra grenarna summerar till exakt 25 skott.

| Gren | Duvor | Option | Totalt |
|---|---|---|---|
| Nationell skeet | 24 | 1 | 25 |
| Olympisk skeet | 25 | 0 | 25 |
| Hög fasan | 23 | 2 | 25 |
| Nordisk trap | 25 | 0 | 25 |

**Nationell skeet** — station 1 och 2: torn, låda, dubblett torn/låda. Station 3, 4 och 5:
torn, låda. Station 6 och 7: torn, låda, dubblett låda/torn. Station 8: torn, låda.

**Olympisk skeet** — station 1, 2 och 3: torn, dubblett torn/låda. Station 4: torn, låda.
Station 5 och 6: låda, dubblett låda/torn. Station 7: dubblett låda/torn. Station 4 igen:
dubblett torn/låda, dubblett låda/torn. Station 8: torn, låda.

**Hög fasan** — station 1–7: torn, skottdubblett torn/låda. Station 8: torn, låda.

**Nordisk trap** — 5 stationer × 5 duvor. Du väljer startstation och appen roterar åt höger,
station 5 → station 1. En patron åt gången, alltså ett skott per duva.

Hela uppställningen finns att läsa i appen under `Mer → Om → Skjutordningar`.

## Option

Option är en extra patron och redovisas alltid separat — den ersätter aldrig det första
skottet i poängräkningen. En bom förblir en bom.

- **Nationell skeet:** en patron. Erbjuds på första bommade duvan. Har du träffat allt skjuts
  den på lådan från station 8.
- **Hög fasan:** två patroner, aldrig fler. Erbjuds på de två första bommarna. Patroner som
  är kvar när serien är slut skjuts på station 8 — låda först, sedan torn.
- **Olympisk skeet och nordisk trap:** ingen option. Knappen visas inte.

I protokollet efter varje serie har optionen en egen kolumn längst till höger, som i ett
pappersprotokoll.

## Två sätt att registrera

Under `Mer → Registrering` väljer du hur skeetgrenarna ska rapporteras:

**Per station** (standard) — du får hela stationens duvor på en skärm, markerar träff eller
bom på var och en och bekräftar med en knapp. Tänkt för lagskytte, där du inte hinner peta
på telefonen mellan skotten. Knappraden nere på skärmen är fast, så du behöver aldrig skrolla
för att komma vidare.

**Skott för skott** — en duva i taget med två stora knappar, som i version 1. Snabbare när du
skjuter ensam.

Nordisk trap rapporteras alltid skott för skott, enligt specen.

Prova båda på banan. Det går att växla mitt i ett pass utan att data påverkas — det är bara
presentationen som skiljer.

## Registrering i övrigt

- Vid bom anges var skottet gick i ett rutnät: bakom, före, över, under och kombinationerna,
  samt Vet ej. När du valt fälls rutnätet ihop till en rad så stationen får plats på skärmen.
- I nordisk trap kan du frivilligt registrera duvans bana i en matris med 15 rutor — höjd
  (hög, mid, låg) mot sida (långt vänster till långt höger). `Hoppa över` med ett tryck.
  Kan stängas av helt i inställningarna.
- Pipraden överst visar hela serien i en blick. Runda pipor är optioner.
- `↶` ångrar senaste registreringen, inklusive en option du ångrar dig om.

## Pass och serier

Ett pass innehåller en eller flera serier. Bana, väder, vapen, choke 1, choke 2, patron och
övrigt anges en gång per pass och gäller alla serier i det. Byter du vapen eller patron mitt
i, starta ett nytt pass.

Alla dessa fält har vallistor som fylls på automatiskt med det du skriver, och som går att
rensa under `Mer → Vallistor`.

Ett avslutat pass går att rätta eller radera under `Historik → Redigera`. En serie du avbryter
sparas som ofullständig — den räknas med i träffprocenten men inte i snitt per serie eller
bästa serie.

## Statistik

- Träffprocent, snitt per serie med trend, bästa serie och längsta träffsvit.
- Träffprocent per station ritad på en skeetbana sedd ovanifrån, med färgskalan spänd över
  dina egna ytterlägen. Optionsskott räknas inte in där, eftersom alla slutoptioner landar på
  station 8 och skulle snedvrida bilden.
- Träffprocent per duvtyp: enkel torn, enkel låda, dubblett första och andra skottet,
  skottdubblett första och andra skottet, trapduva och option.
- Serieresultat över tid med rullande femserierssnitt.
- Fördelning av bommar över de nio riktningarna.
- Träffprocent per duvbana i trap, för de duvor där du registrerat banan.
- Jämförelse per vapen, patron, choke 1, choke 2, bana och väder — visas så snart du har minst
  tio skott på vardera alternativ.

Insikter i klartext (”mest miss: över och bakom på station 4”) ligger i etapp 2.

## Export

`Mer → Säkerhetskopia`. JSON är den fullständiga säkerhetskopian och kan läsas tillbaka in i
appen, exempelvis vid telefonbyte. CSV har en rad per duva, inklusive optionsskott, missriktning
och duvbana, avsedd att öppnas i Excel. Spara filerna där du vill, till exempel i OneDrive.

## Data från version 1

Pass som registrerats i version 1 migreras automatiskt första gången du öppnar version 2:
hög och låg blir torn och låda, disciplin-id:n uppdateras, gamla extraduvor blir optioner och
choke hamnar i choke 1. Migreringen sker en gång och rör inte originalfilen på GitHub.

## Kvar till etapp 2

- Engelsk språkversion. Alla texter i appen går redan genom en stränglista (`STRINGS` i
  `index.html`) — engelska läggs till genom att fylla `STRINGS.en` med samma nycklar.
  De engelska trap-termerna ska vara hard left, mid-left, straight away, mid-right, hard right.
- Förfinad statistik med insikter i klartext.
