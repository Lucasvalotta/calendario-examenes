# 📅 Calendario de exámenes

Un calendario para anotar los exámenes de la facu.

## Cómo anotar un examen

1. Abrí el calendario (la página de GitHub Pages de este repo).
2. Tocá **＋ Anotar examen**.
3. Completá materia, fecha (DD/MM/AAAA), hora, tipo y aula, y tocá **Create / Submit**.
4. Volvé al calendario: el examen aparece en el día que corresponde (puede tardar unos segundos).

## Cómo borrar o cambiar un examen

- **Borrar:** abrí el examen (en el calendario tocá el examen → "Editar / borrar") y tocá **Close issue**.
- **Cambiar:** en esa misma página, editá el texto del examen (los tres puntitos → *Edit*).

## Cómo funciona

Cada examen es un *issue* de GitHub con la etiqueta `examen`. La página `index.html`
lee los issues abiertos y los dibuja en el calendario. No hay base de datos ni servidor.
