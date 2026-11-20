// ============================================================
//  Calendario de exámenes — "base de datos" en Google Sheets
//  Pegá este código en Extensiones > Apps Script de tu planilla.
// ============================================================

// Clave para poder anotar, editar o borrar exámenes.
// Cambiala por la que quieras (y pasásela a tu novia).
const CLAVE = "cambiame";

const HOJA = "Examenes";
const COLUMNAS = ["id", "fecha", "materia", "hora", "tipo", "lugar", "notas"];

function hoja_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(HOJA);
  if (!sh) {
    sh = ss.insertSheet(HOJA);
    sh.getRange("A:G").setNumberFormat("@"); // todo como texto
    sh.appendRow(COLUMNAS);
    sh.setFrozenRows(1);
  }
  return sh;
}

function texto_(v, formato) {
  if (v instanceof Date) return Utilities.formatDate(v, Session.getScriptTimeZone(), formato);
  return String(v ?? "");
}

function listar_() {
  const filas = hoja_().getDataRange().getValues().slice(1);
  return filas.filter(f => f[0]).map(f => ({
    id: String(f[0]),
    fecha: texto_(f[1], "yyyy-MM-dd"),
    materia: texto_(f[2]),
    hora: texto_(f[3], "HH:mm"),
    tipo: texto_(f[4]),
    lugar: texto_(f[5]),
    notas: texto_(f[6]),
  }));
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return json_({ ok: true, examenes: listar_() });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents || "{}");
    if (CLAVE && d.clave !== CLAVE) return json_({ ok: false, error: "clave" });

    const sh = hoja_();
    const fila = ex => [ex.fecha, ex.materia, ex.hora, ex.tipo, ex.lugar, ex.notas].map(v => String(v ?? ""));

    if (d.accion === "probar") {
      // solo verifica la clave
    } else if (d.accion === "agregar") {
      const r = sh.getLastRow() + 1;
      sh.getRange(r, 1, 1, 7).setNumberFormat("@").setValues([[Utilities.getUuid(), ...fila(d.examen)]]);
    } else if (d.accion === "editar" || d.accion === "borrar") {
      const ids = sh.getRange(1, 1, sh.getLastRow(), 1).getValues().map(r => String(r[0]));
      const i = ids.indexOf(String(d.id));
      if (i < 1) return json_({ ok: false, error: "no_encontrado" });
      if (d.accion === "borrar") sh.deleteRow(i + 1);
      else sh.getRange(i + 1, 2, 1, 6).setNumberFormat("@").setValues([fila(d.examen)]);
    } else {
      return json_({ ok: false, error: "accion" });
    }
    return json_({ ok: true, examenes: listar_() });
  } finally {
    lock.releaseLock();
  }
}
