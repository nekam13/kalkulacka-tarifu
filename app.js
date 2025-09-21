// Mobile Tariff Calculator JavaScript - EXPANDED EDITION

const tariffData = [
  // ========== T-MOBILE (10 variants) ==========
  {operator: "T-Mobile", typ: "Předplacený", tarif: "Balíček 10 GB", cena_kc: 235, data_gb: 10, volani: "4,50 Kč/min", sms: "1,90 Kč", zavazek: "ne", studentsky: "ne", poznamka: "Současný stav uživatele", hodnoceni: 7, variantDesc: "Twist datový balíček s automatickou obnovou po 30 dnech.", tags: ["bez závazku"]},
  {operator: "T-Mobile", typ: "Předplacený", tarif: "Balíček 15 GB", cena_kc: 399, data_gb: 15, volani: "4,50 Kč/min", sms: "1,90 Kč", zavazek: "ne", studentsky: "ne", poznamka: "10+5 GB přes app", hodnoceni: 8, variantDesc: "Vyšší objem dat pro náročnější používání bez závazku.", tags: ["bez závazku"]},
  {operator: "T-Mobile", typ: "Předplacený", tarif: "Den neomezeně", cena_kc: 69, data_gb: 999, volani: "z kreditu", sms: "z kreditu", zavazek: "ne", studentsky: "ne", poznamka: "24 hodin", hodnoceni: 6, variantDesc: "Jednodenní neomezená data – hodí se na cestování a akce.", tags: ["bez závazku", "akce"]},
  {operator: "T-Mobile", typ: "Předplacený", tarif: "Týden neomezeně", cena_kc: 249, data_gb: 999, volani: "z kreditu", sms: "z kreditu", zavazek: "ne", studentsky: "ne", poznamka: "7 dní", hodnoceni: 7, variantDesc: "Týdenní neomezené surfování bez závazku.", tags: ["bez závazku"]},
  {operator: "T-Mobile", typ: "Student", tarif: "NextU 12 GB", cena_kc: 495, data_gb: 12, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ano", poznamka: "Do 26 let", hodnoceni: 8, variantDesc: "Studentský tarif s 12 GB a neomezeným voláním/SMS.", tags: ["student"]},
  {operator: "T-Mobile", typ: "Student", tarif: "NextU 20 GB", cena_kc: 595, data_gb: 20, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ano", poznamka: "Do 26 let", hodnoceni: 9, variantDesc: "Rozšířená studentská varianta s 20 GB dat.", tags: ["student"]},
  {operator: "T-Mobile", typ: "Klasický", tarif: "Next 5 GB", cena_kc: 595, data_gb: 5, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "Pořád online po vyčerpání", hodnoceni: 5, variantDesc: "Základní tarif s garantovaným připojením i po vyčerpání.", tags: []},
  {operator: "T-Mobile", typ: "Klasický", tarif: "Next 12 GB", cena_kc: 745, data_gb: 12, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "Pořád online po vyčerpání", hodnoceni: 6, variantDesc: "Standardní tarif s 12 GB a garantovaným připojením.", tags: []},
  {operator: "T-Mobile", typ: "Neomezený", tarif: "Next neomezeně (4 Mb/s)", cena_kc: 705, data_gb: 999, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "4 Mb/s rychlost", hodnoceni: 7, variantDesc: "Cenově dostupná neomezenka s omezenou rychlostí.", tags: []},
  {operator: "T-Mobile", typ: "Neomezený", tarif: "Next neomezeně Max", cena_kc: 995, data_gb: 999, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "Plná rychlost 5G", hodnoceni: 8, variantDesc: "Premium neomezená data s plnou rychlostí 5G.", tags: []},

  // ========== O2 (10 variants) ==========
  {operator: "O2", typ: "Student", tarif: "YOU 10 GB", cena_kc: 499, data_gb: 10, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ano", poznamka: "Do 26 let", hodnoceni: 8, variantDesc: "Studentský tarif pro mladé – 10 GB a neomezené volání/SMS.", tags: ["student"]},
  {operator: "O2", typ: "Student", tarif: "YOU 20 GB", cena_kc: 599, data_gb: 20, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ano", poznamka: "Do 26 let", hodnoceni: 9, variantDesc: "Rozšířená studentská verze s 20 GB dat.", tags: ["student"]},
  {operator: "O2", typ: "Předplacený", tarif: "TWIST 5 GB", cena_kc: 349, data_gb: 5, volani: "3,90 Kč/min", sms: "1,50 Kč", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 6, variantDesc: "Základní předplacený balíček s 5 GB dat.", tags: ["bez závazku"]},
  {operator: "O2", typ: "Předplacený", tarif: "TWIST 10 GB", cena_kc: 449, data_gb: 10, volani: "3,90 Kč/min", sms: "1,50 Kč", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 7, variantDesc: "Střední předplacený balíček s 10 GB dat.", tags: ["bez závazku"]},
  {operator: "O2", typ: "Klasický", tarif: "NEO+ Modrý 4 GB", cena_kc: 599, data_gb: 4, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "3x měsíčně neomezená data na 24h", hodnoceni: 6, variantDesc: "4 GB + bonus neomezených dnů třikrát měsíčně.", tags: []},
  {operator: "O2", typ: "Klasický", tarif: "NEO+ Bronzový 12 GB", cena_kc: 749, data_gb: 12, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "", hodnoceni: 6, variantDesc: "12 GB s neomezeným voláním a SMS.", tags: []},
  {operator: "O2", typ: "Datový", tarif: "Data+ 30 GB", cena_kc: 649, data_gb: 30, volani: "3,50 Kč/min", sms: "1,50 Kč", zavazek: "ano", studentsky: "ne", poznamka: "Pouze data", hodnoceni: 7, variantDesc: "Datový tarif pro tablety/modemy, volání se platí dle spotřeby.", tags: []},
  {operator: "O2", typ: "Datový", tarif: "Data+ 50 GB", cena_kc: 849, data_gb: 50, volani: "3,50 Kč/min", sms: "1,50 Kč", zavazek: "ano", studentsky: "ne", poznamka: "Pouze data", hodnoceni: 8, variantDesc: "Velký datový balíček pro náročné použití.", tags: []},
  {operator: "O2", typ: "Neomezený", tarif: "NEO+ Stříbrný (20 Mb/s)", cena_kc: 699, data_gb: 999, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "20 Mb/s rychlost", hodnoceni: 8, variantDesc: "Neomezenka s rychlostním limitem pro většinu aktivit.", tags: []},
  {operator: "O2", typ: "Neomezený", tarif: "NEO+ Zlatý (Max rychlost)", cena_kc: 899, data_gb: 999, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "Plná rychlost", hodnoceni: 9, variantDesc: "Premium neomezená data s maximální rychlostí.", tags: []},

  // ========== VODAFONE (10 variants) ==========
  {operator: "Vodafone", typ: "Student", tarif: "#jetovtobě Basic+ (4 Mb/s)", cena_kc: 487, data_gb: 999, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ano", poznamka: "ISIC sleva", hodnoceni: 9, variantDesc: "Studentská neomezenka s rychlostí 4 Mb/s.", tags: ["student"]},
  {operator: "Vodafone", typ: "Student", tarif: "#jetovtobě Super+ (20 Mb/s)", cena_kc: 657, data_gb: 999, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ano", poznamka: "ISIC sleva", hodnoceni: 9, variantDesc: "Rychlejší studentská neomezenka s 20 Mb/s.", tags: ["student"]},
  {operator: "Vodafone", typ: "Student", tarif: "#jetovtobě 15 GB", cena_kc: 387, data_gb: 15, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ano", poznamka: "ISIC sleva", hodnoceni: 8, variantDesc: "Studentský tarif s 15 GB a neomezeným voláním.", tags: ["student"]},
  {operator: "Vodafone", typ: "Předplacený", tarif: "Den neomezeně", cena_kc: 79, data_gb: 999, volani: "z kreditu", sms: "z kreditu", zavazek: "ne", studentsky: "ne", poznamka: "24 hodin", hodnoceni: 6, variantDesc: "Jednodenní neomezená data ve Vodafonu.", tags: ["bez závazku"]},
  {operator: "Vodafone", typ: "Předplacený", tarif: "Týden neomezeně", cena_kc: 269, data_gb: 999, volani: "z kreditu", sms: "z kreditu", zavazek: "ne", studentsky: "ne", poznamka: "7 dní", hodnoceni: 7, variantDesc: "Týdenní neomezená data na předplacence.", tags: ["bez závazku"]},
  {operator: "Vodafone", typ: "Předplacený", tarif: "Měsíc 20 GB", cena_kc: 599, data_gb: 20, volani: "4,90 Kč/min", sms: "1,90 Kč", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 7, variantDesc: "Měsíční předplacený balíček s 20 GB.", tags: ["bez závazku"]},
  {operator: "Vodafone", typ: "Klasický", tarif: "Red Basic 6 GB", cena_kc: 657, data_gb: 6, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "", hodnoceni: 5, variantDesc: "Základní Red tarif s 6 GB dat.", tags: []},
  {operator: "Vodafone", typ: "Klasický", tarif: "Red Extra 15 GB", cena_kc: 757, data_gb: 15, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "", hodnoceni: 7, variantDesc: "Rozšířený Red tarif s 15 GB dat.", tags: []},
  {operator: "Vodafone", typ: "Neomezený", tarif: "Red Basic+ (4 Mb/s)", cena_kc: 697, data_gb: 999, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "4 Mb/s rychlost", hodnoceni: 7, variantDesc: "Dostupná neomezenka s limitem rychlosti.", tags: []},
  {operator: "Vodafone", typ: "Neomezený", tarif: "Red Max (Plná rychlost)", cena_kc: 997, data_gb: 999, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "Max 5G rychlost", hodnoceni: 9, variantDesc: "Premium neomezený tarif s plnou 5G rychlostí.", tags: []},

  // ========== BLESKMOBIL (10 variants) ==========
  {operator: "BLESKmobil", typ: "Virtuální", tarif: "ULTRA30 60 GB (akce)", cena_kc: 299, data_gb: 60, volani: "z kreditu", sms: "z kreditu", zavazek: "ne", studentsky: "ne", poznamka: "Akce do konce roku", hodnoceni: 9, variantDesc: "Masivní porce dat bez závazku, ideální pro šetření.", tags: ["bez závazku", "akce"]},
  {operator: "BLESKmobil", typ: "Virtuální", tarif: "KLASIK 1 GB", cena_kc: 249, data_gb: 1, volani: "300 min", sms: "300", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 5, variantDesc: "Základní balíček pro méně náročné uživatele.", tags: ["bez závazku"]},
  {operator: "BLESKmobil", typ: "Virtuální", tarif: "TOP 4 GB", cena_kc: 399, data_gb: 4, volani: "neomezené", sms: "neomezené", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 7, variantDesc: "Střední balíček s neomezenými službami.", tags: ["bez závazku"]},
  {operator: "BLESKmobil", typ: "Virtuální", tarif: "STAR 12 GB", cena_kc: 499, data_gb: 12, volani: "neomezené", sms: "neomezené", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 8, variantDesc: "Vyvážený balíček pro pravidelné používání.", tags: ["bez závazku"]},
  {operator: "BLESKmobil", typ: "Virtuální", tarif: "POWER 25 GB", cena_kc: 599, data_gb: 25, volani: "neomezené", sms: "neomezené", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 8, variantDesc: "Silný balíček pro náročné uživatele.", tags: ["bez závazku"]},
  {operator: "BLESKmobil", typ: "Virtuální", tarif: "MAX 50 GB", cena_kc: 799, data_gb: 50, volani: "neomezené", sms: "neomezené", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 9, variantDesc: "Maximální balíček pro extrémní potřeby.", tags: ["bez závazku"]},
  {operator: "BLESKmobil", typ: "Virtuální", tarif: "VÍKEND 5 GB", cena_kc: 199, data_gb: 5, volani: "z kreditu", sms: "z kreditu", zavazek: "ne", studentsky: "ne", poznamka: "Pouze víkendy", hodnoceni: 6, variantDesc: "Speciální balíček pouze pro víkendové použití.", tags: ["bez závazku", "akce"]},
  {operator: "BLESKmobil", typ: "Virtuální", tarif: "RODINNÝ 8 GB", cena_kc: 449, data_gb: 8, volani: "500 min", sms: "500", zavazek: "ne", studentsky: "ne", poznamka: "Pro rodiny", hodnoceni: 7, variantDesc: "Rodinný balíček s rozumným objemem dat.", tags: ["bez závazku"]},
  {operator: "BLESKmobil", typ: "Virtuální", tarif: "FLEXI 15 GB", cena_kc: 549, data_gb: 15, volani: "1000 min", sms: "1000", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 8, variantDesc: "Flexibilní balíček s velkým množstvím minut.", tags: ["bez závazku"]},
  {operator: "BLESKmobil", typ: "Virtuální", tarif: "STUDENT 20 GB", cena_kc: 399, data_gb: 20, volani: "neomezené", sms: "neomezené", zavazek: "ne", studentsky: "ano", poznamka: "ISIC sleva", hodnoceni: 9, variantDesc: "Speciální studentský balíček s výhodnou cenou.", tags: ["bez závazku", "student"]},

  // ========== KAKTUS (10 variants) ==========
  {operator: "Kaktus", typ: "Virtuální", tarif: "KAKTUS 6 GB", cena_kc: 250, data_gb: 6, volani: "100 min", sms: "100", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 6, variantDesc: "Základní Kaktus balíček s 6 GB dat.", tags: ["bez závazku"]},
  {operator: "Kaktus", typ: "Virtuální", tarif: "KAKTUS 10 GB (akce)", cena_kc: 250, data_gb: 10, volani: "z kreditu", sms: "z kreditu", zavazek: "ne", studentsky: "ne", poznamka: "Akční cena", hodnoceni: 8, variantDesc: "Levný datový balíček na předplacence.", tags: ["bez závazku", "akce"]},
  {operator: "Kaktus", typ: "Virtuální", tarif: "KAKTUS 16 GB", cena_kc: 350, data_gb: 16, volani: "100 min", sms: "100", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 8, variantDesc: "Větší dávka dat s balíčkem minut a SMS.", tags: ["bez závazku"]},
  {operator: "Kaktus", typ: "Virtuální", tarif: "KAKTUS 25 GB", cena_kc: 450, data_gb: 25, volani: "200 min", sms: "200", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 8, variantDesc: "Silný balíček pro náročnější využití.", tags: ["bez závazku"]},
  {operator: "Kaktus", typ: "Virtuální", tarif: "KAKTUS Neomezený Mini", cena_kc: 599, data_gb: 999, volani: "z kreditu", sms: "z kreditu", zavazek: "ne", studentsky: "ne", poznamka: "1 Mb/s po 30 GB", hodnoceni: 7, variantDesc: "Neomezená data s omezením rychlosti po 30 GB.", tags: ["bez závazku"]},
  {operator: "Kaktus", typ: "Virtuální", tarif: "KAKTUS Den", cena_kc: 49, data_gb: 999, volani: "z kreditu", sms: "z kreditu", zavazek: "ne", studentsky: "ne", poznamka: "24 hodin", hodnoceni: 6, variantDesc: "Jednodenní neomezená data za super cenu.", tags: ["bez závazku", "akce"]},
  {operator: "Kaktus", typ: "Virtuální", tarif: "KAKTUS Týden", cena_kc: 199, data_gb: 999, volani: "z kreditu", sms: "z kreditu", zavazek: "ne", studentsky: "ne", poznamka: "7 dní", hodnoceni: 7, variantDesc: "Týdenní neomezená data pro krátkodobé potřeby.", tags: ["bez závazku"]},
  {operator: "Kaktus", typ: "Virtuální", tarif: "KAKTUS Student", cena_kc: 299, data_gb: 20, volani: "300 min", sms: "300", zavazek: "ne", studentsky: "ano", poznamka: "ISIC sleva", hodnoceni: 9, variantDesc: "Speciální studentská nabídka s 20 GB.", tags: ["bez závazku", "student"]},
  {operator: "Kaktus", typ: "Virtuální", tarif: "KAKTUS Familie", cena_kc: 399, data_gb: 30, volani: "500 min", sms: "500", zavazek: "ne", studentsky: "ne", poznamka: "Pro rodiny", hodnoceni: 8, variantDesc: "Rodinný balíček s velkým objemem dat.", tags: ["bez závazku"]},
  {operator: "Kaktus", typ: "Virtuální", tarif: "KAKTUS Flex", cena_kc: 349, data_gb: 12, volani: "neomezené", sms: "neomezené", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 8, variantDesc: "Flexibilní tarif s neomezeným voláním.", tags: ["bez závazku"]},

  // ========== ČEZ MOBIL (10 variants) ==========
  {operator: "ČEZ Mobil", typ: "Virtuální", tarif: "ČEZ 1,5 GB", cena_kc: 349, data_gb: 1.5, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "", hodnoceni: 5, variantDesc: "Základní tarif pro minimální spotřebu.", tags: []},
  {operator: "ČEZ Mobil", typ: "Virtuální", tarif: "ČEZ 3 GB", cena_kc: 449, data_gb: 3, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "", hodnoceni: 6, variantDesc: "Střední tarif pro běžné použití.", tags: []},
  {operator: "ČEZ Mobil", typ: "Virtuální", tarif: "ČEZ 8 GB", cena_kc: 549, data_gb: 8, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "", hodnoceni: 6, variantDesc: "Základní tarif s neomezeným voláním a 8 GB.", tags: []},
  {operator: "ČEZ Mobil", typ: "Virtuální", tarif: "ČEZ 15 GB", cena_kc: 649, data_gb: 15, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "", hodnoceni: 7, variantDesc: "Rozšířený tarif pro náročnější použití.", tags: []},
  {operator: "ČEZ Mobil", typ: "Virtuální", tarif: "ČEZ 25 GB", cena_kc: 749, data_gb: 25, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "", hodnoceni: 8, variantDesc: "Velký tarif pro náročné uživatele.", tags: []},
  {operator: "ČEZ Mobil", typ: "Virtuální", tarif: "ČEZ Neomezený", cena_kc: 699, data_gb: 999, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "", hodnoceni: 7, variantDesc: "Neomezená data v síti O2 pod značkou ČEZ.", tags: []},
  {operator: "ČEZ Mobil", typ: "Virtuální", tarif: "ČEZ Student 10 GB", cena_kc: 399, data_gb: 10, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ano", poznamka: "Do 26 let", hodnoceni: 8, variantDesc: "Studentský tarif s výhodnou cenou.", tags: ["student"]},
  {operator: "ČEZ Mobil", typ: "Virtuální", tarif: "ČEZ Energie+", cena_kc: 299, data_gb: 5, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "S dodávkou elektřiny", hodnoceni: 7, variantDesc: "Speciální cena pro zákazníky ČEZ energie.", tags: ["akce"]},
  {operator: "ČEZ Mobil", typ: "Virtuální", tarif: "ČEZ Data 50 GB", cena_kc: 799, data_gb: 50, volani: "4 Kč/min", sms: "2 Kč", zavazek: "ano", studentsky: "ne", poznamka: "Pouze data", hodnoceni: 8, variantDesc: "Datový tarif pro tablety a modemy.", tags: []},
  {operator: "ČEZ Mobil", typ: "Virtuální", tarif: "ČEZ Předplacený", cena_kc: 399, data_gb: 8, volani: "4,50 Kč/min", sms: "1,90 Kč", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 6, variantDesc: "Předplacená karta s 8 GB dat.", tags: ["bez závazku"]},

  // ========== EMTÉČKO (10 variants) ==========
  {operator: "Emtéčko", typ: "Virtuální", tarif: "Mini+", cena_kc: 89, data_gb: 0, volani: "100 min v síti", sms: "50 v síti", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 4, variantDesc: "Minimální balíček jen pro volání v síti.", tags: ["bez závazku"]},
  {operator: "Emtéčko", typ: "Virtuální", tarif: "START", cena_kc: 169, data_gb: 1, volani: "100 min v síti", sms: "100 v síti", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 5, variantDesc: "Základní balíček s 1 GB dat.", tags: ["bez závazku"]},
  {operator: "Emtéčko", typ: "Virtuální", tarif: "MIDI", cena_kc: 269, data_gb: 5, volani: "200 min v síti", sms: "200 v síti", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 6, variantDesc: "Střední balíček s 5 GB dat.", tags: ["bez závazku"]},
  {operator: "Emtéčko", typ: "Virtuální", tarif: "MAXI", cena_kc: 359, data_gb: 10, volani: "300 min v síti", sms: "300 v síti", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 6, variantDesc: "Cenově dostupný balíček pro méně náročné.", tags: ["bez závazku"]},
  {operator: "Emtéčko", typ: "Virtuální", tarif: "SUPER", cena_kc: 459, data_gb: 15, volani: "500 min v síti", sms: "500 v síti", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 7, variantDesc: "Rozšířený balíček s 15 GB.", tags: ["bez závazku"]},
  {operator: "Emtéčko", typ: "Virtuální", tarif: "ULTRA", cena_kc: 559, data_gb: 25, volani: "1000 min v síti", sms: "1000 v síti", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 8, variantDesc: "Velký balíček pro náročnější použití.", tags: ["bez závazku"]},
  {operator: "Emtéčko", typ: "Virtuální", tarif: "NEOMEZENÝ", cena_kc: 799, data_gb: 999, volani: "neomezené v síti", sms: "neomezené v síti", zavazek: "ne", studentsky: "ne", poznamka: "1 Mb/s po 50 GB", hodnoceni: 7, variantDesc: "Neomezená data s omezením rychlosti.", tags: ["bez závazku"]},
  {operator: "Emtéčko", typ: "Virtuální", tarif: "STUDENT", cena_kc: 299, data_gb: 12, volani: "400 min v síti", sms: "400 v síti", zavazek: "ne", studentsky: "ano", poznamka: "ISIC sleva", hodnoceni: 8, variantDesc: "Speciální studentská nabídka.", tags: ["bez závazku", "student"]},
  {operator: "Emtéčko", typ: "Virtuální", tarif: "RODINNÝ", cena_kc: 399, data_gb: 20, volani: "600 min v síti", sms: "600 v síti", zavazek: "ne", studentsky: "ne", poznamka: "Pro rodiny", hodnoceni: 8, variantDesc: "Rodinný balíček s velkým objemem dat.", tags: ["bez závazku"]},
  {operator: "Emtéčko", typ: "Virtuální", tarif: "VÍKEND", cena_kc: 199, data_gb: 8, volani: "200 min v síti", sms: "200 v síti", zavazek: "ne", studentsky: "ne", poznamka: "Pouze víkendy", hodnoceni: 6, variantDesc: "Speciální balíček pro víkendové použití.", tags: ["bez závazku", "akce"]}
];

// ============ ENHANCED UI FUNCTIONS ============
document.addEventListener('DOMContentLoaded', function () {
  setupEventListeners();
  updateDataValue();
  if (document.getElementById('operatorTariffs')) {
    loadOperatorArticles().then(() => renderOperatorDetail());
  }
});

function setupEventListeners() {
  const dataSlider = document.getElementById('dataSlider');
  const unlimitedData = document.getElementById('unlimitedData');
  if (dataSlider) dataSlider.addEventListener('input', updateDataValue);
  if (unlimitedData) unlimitedData.addEventListener('change', toggleUnlimitedData);
  document.querySelectorAll('input, select').forEach(el => el.addEventListener('change', updateSearchButton));
}

function updateDataValue() {
  const slider = document.getElementById('dataSlider');
  const val = document.getElementById('dataValue');
  if (slider && val) val.textContent = slider.value;
}

function toggleUnlimitedData() {
  const slider = document.getElementById('dataSlider');
  const unlimitedCheckbox = document.getElementById('unlimitedData');
  if (!slider || !unlimitedCheckbox) return;
  if (unlimitedCheckbox.checked) {
    slider.disabled = true;
    slider.style.opacity = '0.5';
    const val = document.getElementById('dataValue');
    if (val) val.textContent = '∞';
  } else {
    slider.disabled = false;
    slider.style.opacity = '1';
    updateDataValue();
  }
}

function updateSearchButton() {
  const button = document.querySelector('.search-button');
  if (button) {
    button.style.opacity = '1';
    button.disabled = false;
  }
}

// ============ FILTER + SCORE ============
function findBestTariffs() {
  const prefs = getUserPreferences();
  const filtered = filterTariffs(prefs);
  const sorted = sortTariffs(filtered, prefs);
  displayResults(sorted.slice(0, 5), prefs);
  displayComparisonTable(sorted.slice(0, 5));
  const rs = document.getElementById('resultsSection');
  const cs = document.getElementById('comparisonSection');
  if (rs) rs.style.display = 'block';
  if (cs) cs.style.display = 'block';
  if (rs) rs.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getUserPreferences() {
  const unlimitedData = document.getElementById('unlimitedData')?.checked || false;
  const slider = document.getElementById('dataSlider');
  const dataAmount = unlimitedData ? 999 : (slider ? parseInt(slider.value) : 10);
  return {
    dataAmount,
    unlimitedData,
    isStudent: document.getElementById('isStudent')?.checked || false,
    noContract: document.getElementById('noContract')?.checked || false,
    unlimitedCalls: document.getElementById('unlimitedCalls')?.checked || false,
    preferredOperator: document.getElementById('operatorSelect')?.value || 'all',
  };
}

function filterTariffs(p) {
  return tariffData.filter(t => {
    if (p.unlimitedData) {
      if (t.data_gb < 999) return false;
    } else {
      if (t.data_gb < p.dataAmount && t.data_gb < 999) return false;
    }
    if (p.noContract && t.zavazek === 'ano') return false;
    if (p.unlimitedCalls && !String(t.volani).includes('neomezené')) return false;
    if (p.preferredOperator !== 'all') {
      if (p.preferredOperator === 'virtual') {
        if (!['BLESKmobil', 'Kaktus', 'ČEZ Mobil', 'Emtéčko'].includes(t.operator)) return false;
      } else if (t.operator !== p.preferredOperator) return false;
    }
    return true;
  });
}

function sortTariffs(list, p) {
  return list.slice().sort((a, b) => score(b, p) - score(a, p));
}

function score(t, p) {
  let s = (t.hodnoceni || 7) * 10;
  s += Math.max(0, 1000 - (t.cena_kc || 0)) / 10;
  s += (t.data_gb >= 999) ? 50 : Math.min(t.data_gb || 0, 100);
  if (p.isStudent && (t.studentsky === 'ano' || String(t.poznamka).includes('ISIC'))) s += 30;
  if (p.noContract && t.zavazek === 'ne') s += 20;
  if (p.unlimitedCalls && String(t.volani).includes('neomezené')) s += 25;
  if (String(t.typ).includes('AKCE') || (t.tags && t.tags.includes('akce'))) s += 15;
  return s;
}

// ============ RESULTS RENDER ============
function displayResults(tariffs, prefs) {
  const c = document.getElementById('resultsContainer');
  if (!c) return;
  c.innerHTML = '';
  tariffs.forEach((t, i) => c.appendChild(createResultCard(t, i === 0, prefs)));
}

function createResultCard(t, isBest, prefs) {
  const card = document.createElement('div');
  card.className = `result-card ${getOperatorClass(t.operator)} ${isBest ? 'best' : ''}`;
  const dataText = (t.data_gb >= 999 ? 'Neomezená' : `${t.data_gb} GB`);
  const sav = calcSavingsText(t.cena_kc);
  const tagsHtml = (t.tags && t.tags.length) ? `<div class="result-tags">${t.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : '';

  card.innerHTML = `
    <div class="result-header">
      <div>
        <div class="result-operator">${t.operator}</div>
        <div class="result-tariff">${t.tarif}</div>
      </div>
      <div class="result-price">${t.cena_kc} Kč</div>
    </div>
    ${tagsHtml}
    <div class="result-details">
      <div class="detail-item"><div class="detail-label">Data</div><div class="detail-value">${dataText}</div></div>
      <div class="detail-item"><div class="detail-label">Volání</div><div class="detail-value">${t.volani}</div></div>
      <div class="detail-item"><div class="detail-label">SMS</div><div class="detail-value">${t.sms}</div></div>
      <div class="detail-item"><div class="detail-label">Závazek</div><div class="detail-value">${t.zavazek === 'ano' ? 'Ano' : 'Ne'}</div></div>
    </div>
    ${t.variantDesc ? `<div class="result-notes">ℹ️ ${t.variantDesc}</div>` : ''}
    ${t.poznamka ? `<div class="result-notes">💡 ${t.poznamka}</div>` : ''}
    <div class="result-rating"><span class="stars">${generateStars(t.hodnoceni || 7)}</span><span>(${t.hodnoceni || 7}/10)</span>${sav ? `<span style="margin-left:auto;color:var(--success-color);font-weight:600;">${sav}</span>` : ''}</div>
    ${isBest ? '<div style="background:var(--success-color);color:#fff;padding:0.5rem;text-align:center;border-radius:8px;margin-top:0.5rem;font-weight:600;">🏆 Nejlepší doporučení</div>' : ''}
  `;
  return card;
}

function calcSavingsText(price) {
  const current = 235;
  const diff = current - (price || 0);
  if (diff > 0) return `Úspora: ${diff} Kč/měs`;
  if (diff < 0) return `+${Math.abs(diff)} Kč/měs`;
  return '';
}

function displayComparisonTable(tariffs) {
  const tbody = document.querySelector('#comparisonTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  tariffs.forEach(t => {
    const tr = document.createElement('tr');
    const dataText = (t.data_gb >= 999 ? 'Neomezená' : `${t.data_gb} GB`);
    tr.innerHTML = `
      <td><strong>${t.operator}</strong></td>
      <td>${t.tarif}</td>
      <td><strong>${t.cena_kc} Kč</strong></td>
      <td>${dataText}</td>
      <td>${t.volani}</td>
      <td>${t.sms}</td>
      <td>${t.zavazek === 'ano' ? 'Ano' : 'Ne'}</td>
      <td>${generateStars(t.hodnoceni || 7)} (${t.hodnoceni || 7})</td>
    `;
    tbody.appendChild(tr);
  });
}

function generateStars(r) {
  const full = Math.floor((r || 7) / 2);
  const empty = 5 - full;
  return '★'.repeat(full) + '☆'.repeat(empty);
}

// ============ OPERATOR DETAIL ============
function getQueryParam(name) {
  try {
    return new URL(window.location.href).searchParams.get(name);
  } catch (e) {
    return null;
  }
}

function getOperatorClass(op) {
  const map = { 'T-Mobile': 'tmobile', 'O2': 'o2', 'Vodafone': 'vodafone', 'BLESKmobil': 'blesk', 'Kaktus': 'tmobile', 'ČEZ Mobil': 'o2', 'Emtéčko': 'o2' };
  return map[op] || '';
}

let operatorsProfiles = {};
let operatorArticles = {};

async function loadOperatorArticles() {
  try {
    const response = await fetch('data/operator-articles.json');
    if (response.ok) {
      operatorArticles = await response.json();
    }
  } catch (e) {
    console.log('Články operátorů se nepodařilo načíst');
  }
}

fetch('data/operators.json')
  .then(r => r.ok ? r.json() : {})
  .then(d => {
    operatorsProfiles = d || {};
    if (document.getElementById('operatorTariffs')) renderOperatorDetail();
  })
  .catch(() => {});

function renderOperatorDetail() {
  const op = getQueryParam('op');
  if (!op) return;

  const title = document.getElementById('operatorTitle');
  if (title) title.textContent = op;

  const info = document.getElementById('operatorInfo');
  const list = document.getElementById('operatorTariffs');
  if (!info || !list) return;

  const meta = (operatorsProfiles && operatorsProfiles[op]) || { desc: 'Informace nejsou k dispozici.', type: '—', network: '—', color: '' };
  const article = (operatorArticles && operatorArticles[op]) || { content: '' };

  info.classList.add('result-card', meta.color || '');
  const all = tariffData.filter(t => t.operator === op);

  info.innerHTML = `
    <div class="result-tariff">Přehled operátora</div>
    <p class="result-notes">${meta.desc}</p>
    ${article.content ? `<div class="operator-article">${article.content}</div>` : ''}
    <div class="result-details">
      <div class="detail-item"><div class="detail-label">Typ</div><div class="detail-value">${meta.type}</div></div>
      <div class="detail-item"><div class="detail-label">Síť</div><div class="detail-value">${meta.network}</div></div>
      <div class="detail-item"><div class="detail-label">Tarifů v databázi</div><div class="detail-value">${all.length}</div></div>
    </div>
    ${meta.pros ? `<div class="result-notes"><strong>Výhody:</strong> ${meta.pros.join(', ')}</div>` : ''}
    ${meta.cons ? `<div class="result-notes"><strong>Nevýhody:</strong> ${meta.cons.join(', ')}</div>` : ''}
  `;

  const cta = document.getElementById('ctaButtons');
  const links = meta.links || {};
  const linksSection = document.getElementById('linksSection');
  if (cta && (links.cenik || links.pokryti || links.eshop)) {
    cta.innerHTML = '';
    if (links.cenik) cta.innerHTML += `<a class="accent" href="${links.cenik}" target="_blank" rel="noopener">📄 Ceník</a>`;
    if (links.pokryti) cta.innerHTML += `<a class="secondary" href="${links.pokryti}" target="_blank" rel="noopener">🗺️ Pokrytí</a>`;
    if (links.eshop) cta.innerHTML += `<a href="${links.eshop}" target="_blank" rel="noopener">🛒 E‑shop</a>`;
    if (linksSection) linksSection.style.display = 'block';
  }

  const renderList = (items) => {
    list.innerHTML = '';
    items.forEach(t => {
      const dataText = (t.data_gb >= 999 ? 'Neomezená' : `${t.data_gb} GB`);
      const tagsHtml = (t.tags && t.tags.length) ? `<div class="result-tags">${t.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : '';
      const card = document.createElement('div');
      card.className = `result-card ${getOperatorClass(t.operator)}`;
      card.innerHTML = `
        <div class="result-header">
          <div>
            <div class="result-operator">${t.operator}</div>
            <div class="result-tariff">${t.tarif}</div>
          </div>
          <div class="result-price">${t.cena_kc} Kč</div>
        </div>
        ${tagsHtml}
        <div class="result-details">
          <div class="detail-item"><div class="detail-label">Data</div><div class="detail-value">${dataText}</div></div>
          <div class="detail-item"><div class="detail-label">Volání</div><div class="detail-value">${t.volani}</div></div>
          <div class="detail-item"><div class="detail-label">SMS</div><div class="detail-value">${t.sms}</div></div>
          <div class="detail-item"><div class="detail-label">Závazek</div><div class="detail-value">${t.zavazek === 'ano' ? 'Ano' : 'Ne'}</div></div>
        </div>
        ${t.variantDesc ? `<div class="result-notes">ℹ️ ${t.variantDesc}</div>` : ''}
        ${t.poznamka ? `<div class="result-notes">💡 ${t.poznamka}</div>` : ''}
        <div class="cta-buttons">
          ${links.cenik ? `<a href="${links.cenik}" target="_blank" rel="noopener">📋 Objednat</a>` : ''}
        </div>
      `;
      list.appendChild(card);
    });
  };

  renderList(all);

  const search = document.getElementById('tariffSearch');
  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.toLowerCase();
      const filtered = all.filter(t => 
        `${t.tarif} ${t.cena_kc} ${(t.tags || []).join(' ')}`.toLowerCase().includes(q)
      );
      renderList(filtered);
    });
  }

  // Add tag filter buttons
  const uniqueTags = [...new Set(all.flatMap(t => t.tags || []))];
  if (uniqueTags.length > 0) {
    const filterButtons = document.createElement('div');
    filterButtons.className = 'tag-filters';
    filterButtons.innerHTML = `
      <button class="tag-filter active" data-filter="all">Všechny</button>
      ${uniqueTags.map(tag => `<button class="tag-filter" data-filter="${tag}">${tag}</button>`).join('')}
    `;

    const searchContainer = search?.parentElement;
    if (searchContainer) {
      searchContainer.appendChild(filterButtons);

      filterButtons.addEventListener('click', (e) => {
        if (e.target.classList.contains('tag-filter')) {
          document.querySelectorAll('.tag-filter').forEach(btn => btn.classList.remove('active'));
          e.target.classList.add('active');

          const filter = e.target.dataset.filter;
          const filtered = filter === 'all' ? all : all.filter(t => t.tags && t.tags.includes(filter));
          renderList(filtered);
        }
      });
    }
  }
}
