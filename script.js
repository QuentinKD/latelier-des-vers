let fileContent = "";

const importBtn = document.getElementById('import-btn');
const fileInput = document.getElementById('file-input');
const runBtn = document.getElementById('run-btn');
const exportBtn = document.getElementById('export-btn');

// --- 1) IMPORT DU FICHIER ---
importBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    fileContent = e.target.result; // Stockage du contenu du fichier dans la variable
    alert("Fichier importé avec succès !");
  };
  reader.readAsText(file);
});

// --- 2) LANCER LE PROGRAMME DE MODIFICATION ---
runBtn.addEventListener('click', () => {
  if (!fileContent) {
    alert("Veuillez d'abord importer un fichier texte.");
    return;
  }

  // Appel de la fonction de modification
  fileContent = modifyFileContent(fileContent);

  alert("Le fichier a été modifié (placeholder).");
});

// Fonction placeholder pour la modification du texte
function modifyFileContent(text) {
  // TODO: implémenter le programme de modification
  return text; 
}

// --- 3) EXPORT EN PDF ---
exportBtn.addEventListener('click', () => {
  if (!fileContent) {
    alert("Veuillez d'abord importer et modifier un fichier.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    unit: "pt",
    format: "a4"
  });

  // Ecriture du PDF
  doc.text(fileContent, 20, 30);

  // Téléchargement du PDF
  doc.save("modified.pdf");
});
