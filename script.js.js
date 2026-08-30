// Escala de Monotributo parametrizada (Valores de referencia editables)
const ESCALAS_MONOTRIBUTO = [
    { cat: 'A', servicios: 7500000, bienes: 7500000, cuotaServicios: 30000, cuotaBienes: 30000 },
    { cat: 'B', servicios: 11000000, bienes: 11000000, cuotaServicios: 35000, cuotaBienes: 35000 },
    { cat: 'C', servicios: 15500000, bienes: 15500000, cuotaServicios: 42000, cuotaBienes: 40000 },
    { cat: 'D', servicios: 21500000, bienes: 21500000, cuotaServicios: 54000, cuotaBienes: 50000 },
    { cat: 'E', servicios: 27000000, bienes: 27000000, cuotaServicios: 70000, cuotaBienes: 64000 },
    { cat: 'F', servicios: 33750000, bienes: 33750000, cuotaServicios: 92000, cuotaBienes: 80000 },
    { cat: 'G', servicios: 40500000, bienes: 40500000, cuotaServicios: 120000, cuotaBienes: 100000 },
    { cat: 'H', servicios: 51500000, bienes: 51500000, cuotaServicios: 220000, cuotaBienes: 175000 },
    { cat: 'I', servicios: null, bienes: 57500000, cuotaServicios: null, cuotaBienes: 250000 },
    { cat: 'J', servicios: null, bienes: 66000000, cuotaServicios: null, cuotaBienes: 310000 },
    { cat: 'K', servicios: null, bienes: 75000000, cuotaServicios: null, cuotaBienes: 390000 }
];

document.getElementById('btnCalcular').addEventListener('click', () => {
    const actividad = document.getElementById('actividad').value;
    const ingresoMensual = parseFloat(document.getElementById('ingresos').value);

    if (isNaN(ingresoMensual) || ingresoMensual <= 0) {
        alert('Por favor ingresá un monto válido.');
        return;
    }

    const ingresoAnual = ingresoMensual * 12;
    let categoriaEncontrada = null;

    // Buscar la categoría correspondiente según la actividad
    for (const escala of ESCALAS_MONOTRIBUTO) {
        const limite = actividad === 'servicios' ? escala.servicios : escala.bienes;
        
        if (limite !== null && ingresoAnual <= limite) {
            categoriaEncontrada = {
                letra: escala.cat,
                cuota: actividad === 'servicios' ? escala.cuotaServicios : escala.cuotaBienes
            };
            break;
        }
    }

    // Formatear montos a moneda local ARS
    const formatearMoneda = (val) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val);

    // Actualizar la interfaz de usuario
    document.getElementById('resAnual').innerText = formatearMoneda(ingresoAnual);
    const boxResultado = document.getElementById('resultado');
    const advertencia = document.getElementById('resAdvertencia');

    if (categoriaEncontrada) {
        document.getElementById('resCategoria').innerText = `Categoría ${categoriaEncontrada.letra}`;
        document.getElementById('resCuota').innerText = formatearMoneda(categoriaEncontrada.cuota);
        advertencia.classList.add('hidden');
    } else {
        document.getElementById('resCategoria').innerText = 'Excluido';
        document.getElementById('resCuota').innerText = 'N/A';
        advertencia.innerText = 'Atención: Tu facturación supera el límite máximo permitido para el Monotributo. Deberías evaluar el paso a Responsable Inscripto.';
        advertencia.classList.remove('hidden');
    }

    boxResultado.classList.remove('hidden');
});