# 📅 Calendario de exámenes

Calendario para anotar los exámenes de la facu: https://lucasvalotta.github.io/calendario-examenes/

## Cómo se usa

- **Anotar:** tocá **＋ Anotar examen** o tocá un día del calendario.
- **Ver, editar o borrar:** tocá el examen en el calendario o en la lista de próximos.
- La primera vez te pide la **clave**; queda guardada en ese celular o compu.

## Dónde se guardan los datos

En una planilla de Google Sheets, a través de un pequeño script (`google-apps-script.gs`).

### Configuración (una sola vez)

1. Creá una planilla nueva en https://sheets.new
2. Menú **Extensiones → Apps Script**. Borrá lo que hay, pegá el contenido de `google-apps-script.gs`
   y cambiá `CLAVE` por la clave que quieras. Guardá (💾).
3. **Implementar → Nueva implementación** → tipo **Aplicación web**:
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
4. Autorizá los permisos (si aparece "Google no verificó esta app": *Configuración avanzada → Ir a … (no seguro)*).
5. Copiá la **URL de la aplicación web** (termina en `/exec`) y ponela en `API_URL` dentro de `index.html`.
