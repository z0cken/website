# z0cken Website
Das ist das Repository zur Website von https://z0cken.com/ - gehostet auf Github Pages. 
Die Website nutzt [Jekyll](https://jekyllrb.com/) als Website-Generator von [Github Pages](https://docs.github.com/en/github/working-with-github-pages) und [Materialize CSS](https://materializecss.com/) als Design Framework.

## Strukturierung

Die Stuktur ist teils von Jekyll vorgeschrieben. Für weitere Informationen siehe [Jekyll Dateistruktur](https://jekyllrb.com/docs/structure/).
- `./_includes` für [Jekyll Includes](https://jekyllrb.com/docs/includes/)
- `./_layouts` für [Jekyll Layouts](https://jekyllrb.com/docs/layouts/).
- `./assets` für Javascript und CSS. Pro Organisation wird nach Bedarf ein neues .js/.css File erstellt und auf der Seite eingebunden.
- `./resources` für statische Bilder & Dateien. Pro Organisation wird nach Bedarf ein eigener Sub-Ordner erstllt.
- `./<orga>` für die Seiten der jeweiligen Organisation:
  - `index.html` für die Hauptseite/Übersicht der Organisation.
  - OPTIONAL `./<orga>/_posts` für Beiträge der Organisation in HTML oder Markdown.

## Contribute

Änderungen erfolgen bevorzugt mittels GitHub Pull-Request.
Jede Organisation darf nur Dateien in ihrem eigenen Verzeichnis editieren. Andere Änderungen müssen angekündigt werden, ansonsten wird der Request ignoriert.

Bei eigenen Scripts und Style nutze den Namen bzw. Abkürzung der Organisation um Namenskonflikte zu verhindern.

## Templates
#### Websites
Die index.html der Organisation nutzt das `default` layout. Weiter nutzen alle Unterseiten das layout `subpage`. Dadurch sind auch pr0gramm.css und Materialize.css/js immer eingebunden. Javascript Komponenten werden automatisch initialisiert. 
```
---
layout: default
---

<!-- Use for custom styles
<link
  href="{{ site.baseurl }}/assets/css/CUSTOM_STYLE.css"
  type="text/css"
  rel="stylesheet"
  media="screen,projection"
/> -->

<main class="text-primary">
  
  Website content here...

  <!-- For custom scripts <script src="{{ site.baseurl }}/assets/js/CUSTOM_SCRIPT.js"></script> -->
</main>
```

#### Posts
Posts können als Markdown oder HTML Dokument im _posts Verzeichnis der Organisation hinzugefügt werden. Der Name der Datei ist dabei zu beachten: `YYYY-MM-DD-TITEL.md` 
Das Datum gibt an, ab wann der Beitrag zu sehen sein soll. Der Titel darf Leerzeichen enthalten und wird später automatisch als Titel des Posts hinzugefügt.
Das Layout ist Pflicht, Tags sind optional.
```
---
layout: post
tags: 
  - Tag1
  - Tag 2
  - ...
---

Post text here...
```