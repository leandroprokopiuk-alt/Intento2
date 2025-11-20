
(function cargarProvincias() {
    const select = document.getElementById('Destinos');
    if (!select) return;

    select.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Seleccione una provincia…';
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    fetch('https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre')
        .then(response => {
            if (!response.ok) throw new Error('HTTP ' + response.status);
            return response.json();
        })
        .then(data => {
            const provincias = Array.isArray(data) ? data : (data.provincias) || [];
            provincias.forEach(provincia => {
                const option = document.createElement('option');
                option.value = provincia.id;
                option.textContent = provincia.nombre;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error cargando provincias:', error);
            // Opción de error visible
            const opt = document.createElement('option');
            opt.value = '';
            opt.textContent = 'No se pudieron cargar las provincias';
            opt.disabled = true;
            select.appendChild(opt);
        });
})();