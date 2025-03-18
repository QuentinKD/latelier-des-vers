let fileContent = "";
const importBtn = document.getElementById('import-btn');
const fileInput = document.getElementById('file-input');
const runBtn = document.getElementById('run-btn');
const exportBtn = document.getElementById('export-btn');
const pdfPreviewContainer = document.querySelector('.pdf-preview-container');
const pdfPreview = document.getElementById('pdf-preview');

// Cacher l'aperçu au départ
pdfPreviewContainer.style.display = "none";

importBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    fileContent = e.target.result;
    alert("Fichier importé avec succès !");
  };
  reader.readAsText(file);
});

runBtn.addEventListener('click', () => {
  if (!fileContent) {
    alert("Veuillez importer un fichier.");
    return;
  }

  fileContent = modifyFileContent(fileContent);

  alert("Le fichier a été modifié !");
  updatePdfPreview(fileContent);
  pdfPreviewContainer.style.display = "block"; // Afficher l'aperçu
});

function modifyFileContent(text) {
  return text; // À modifier selon le programme de traitement
}

exportBtn.addEventListener('click', () => {
  if (!fileContent) {
    alert("Veuillez d'abord modifier un fichier.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text(fileContent, 20, 30);
  doc.save("modified.pdf");
});

function updatePdfPreview(content) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text(content, 20, 30);

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  
  pdfPreview.src = url;
}
