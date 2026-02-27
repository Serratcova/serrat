//Cuando la página carga, ejecua esta instrucción
document.addEventListener("DOMContentLoaded", async () => {
  await loadComponents();  //Carga el header y el footer

  document.querySelectorAll('.nav-link').forEach(
    link => link.href.endsWith(location.pathname.split('/').pop() || 'index.html') && link.classList.add('active'));

  //Detectar en que pagina estamos y cargar su contenido
  const pageId = document.body.id;

  if(document.getElementById('drivers-container')) renderDrivers();
  if(document.getElementById('teams-container')) renderTeams();
  if(document.getElementById('history-container')) renderHistory();
  if(document.getElementById('seasons-container')) renderSeasons();
  if(document.getElementById('home-form')) renderHome();
});




// Funciones para cargar HTMLs
async function loadComponents() {
  const loadHTML = async (elementId, filePath) => {
    const element = document.getElementById(elementId);
    const response = await fetch(filePath);
    element.innerHTML = await response.text();
  };

  await loadHTML("header-placeholder", "components/header.html");
  await loadHTML("footer-placeholder", "components/footer.html");
  }
  // renderHistory
  function renderHistory() {
  const element = document.getElementById('history-container');
  element.innerHTML = window.historyf1.map(function(item) {
    let image ='';
    image = `<img src="${item.img}"
            class="img-fluid rounded mb-3 shadow-sm w-100"
            style="max-height:400px; object-fit:cover;">`;
    return `
    <div class="timeline-item">
      ${image}
      <div class="timeline-year">${item.year}</div>
      <h4 class="h4">${item.title}</h4>
      <p class="mb-0">${item.description}</p>
    </div>`;
    }).join('');
  }
    // renderTeams
  function renderTeams() {
  const element = document.getElementById('teams-container');
  element.innerHTML = window.teamsf1.map(function(item) {
    return `
    <div class="col-md-4 mb-4">
      <div class="card h-100 shadow-sm">

        <img src="${item.logo}" 
             class="card-img-top"
             style="height:180px; object-fit:contain; padding:20px;">

        <div class="card-body">
          <h5 class="card-title mb-1">${item.name}</h5>
          <p class="text-muted mb-0">${item.country}</p>
        </div>
      </div>
    </div>`;
  }).join('');
}
