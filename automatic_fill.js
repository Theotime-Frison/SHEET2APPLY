function onEdit(e) {
  const feuille = e.source.getActiveSheet();
  if (feuille.getName() !== "DataBase") return;

  const activeCell = e.range;
  const activeRow = activeCell.getRow();
  const activeCol = activeCell.getColumn();
  const activeValue = activeCell.getValue();

  // Ne rien faire sur l'entête
  if (activeRow <= 1) return;

  // Récupération des colonnes
  const headers = feuille.getRange(1, 1, 1, feuille.getLastColumn()).getValues()[0];
  const col = {
    status: headers.indexOf("Status") + 1,
    entretiens: headers.indexOf("N_Interviews") + 1,
    creation_date: headers.indexOf("Creation_Date") + 1,
    application_date: headers.indexOf("Application_Date") + 1,
    langue: headers.indexOf("Language") + 1
  };

  // --- CAS 1 : DÉTECTION DE NOUVELLE SAISIE ---
  // Si on écrit quelque chose ET que la colonne date de création est vide
  if (activeValue !== "" && col.creation_date > 0) {
    const celluleDateCreation = feuille.getRange(activeRow, col.creation_date);

    // Si la date est vide, c'est que c'est le premier remplissage de la ligne
    if (celluleDateCreation.getValue() === "") {
      celluleDateCreation.setValue(new Date());

      // On en profite pour mettre le statut par défaut si la colonne existe
      if (col.status > 0) {
        const celluleStatus = feuille.getRange(activeRow, col.status);
        if (celluleStatus.getValue() === "") {
          celluleStatus.setValue("A Postuler");
        }
      }
      if (col.entretiens > 0) {
        const celluleEntretiens = feuille.getRange(activeRow, col.entretiens);
        if (celluleEntretiens.getValue() === "") {
          celluleEntretiens.setValue("0");
        }
      }
      if (col.langue > 0) {
        const celluleLangue = feuille.getRange(activeRow, col.langue);
        if (celluleLangue.getValue() === "") {
          celluleLangue.setValue("Français");
        }
      }
    }
  }

  // --- CAS 2 : PASSAGE EN "Envoyée" (Inchangé) ---
  if (col.status > 0 && activeCol === col.status && activeValue === "Candidaté") {
    if (col.application_date > 0) {
      feuille.getRange(activeRow, col.application_date).setValue(new Date());
    }
  }
}
