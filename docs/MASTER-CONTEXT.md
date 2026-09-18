# TESOROS DEL TIEMPO — MASTER CONTEXT
## Documento maestro de marca, producto, UX/UI y roadmap

**Versión:** 1.0  
**Fecha:** 18 septiembre 2026  
**Proyecto:** e-commerce editorial para fundición artesanal y archivo numismático  
**Stack actual:** HTML + CSS + Vanilla JS, preparado para GitHub + Vercel  
**Editor:** VS Code

---

## 1. ESENCIA DEL PROYECTO

Tesoros del Tiempo no debe presentarse como una tienda genérica de metales. La web debe funcionar como una pieza editorial que convierte una materia con pasado en un objeto con identidad.

La idea central es:

> **No vendemos metal. Vendemos tiempo.**

El producto une tres capas:

1. **Origen:** detección, recuperación, chatarra agrícola/industrial y objetos encontrados.
2. **Transformación:** limpieza, selección, fundición, vertido y estampado manual.
3. **Objeto:** lingotes, piezas numismáticas y cápsulas de edición limitada.

El diferencial visual y narrativo es el **Proof of Work**: el valor no se explica solamente por el material, sino por el recorrido documentado que existe antes del objeto final.

---

## 2. POSICIONAMIENTO

### Territorio
- Fundición artesanal.
- Arqueología contemporánea.
- Numismática.
- Metal recuperado.
- Archivo.
- Objetos de edición limitada.
- Paisaje del Levante español.

### Personalidad
**Artesanal + intelectual + sobria + misteriosa + precisa.**

Evitar:
- estética de joyería de lujo convencional;
- lenguaje de inversión financiera;
- estética industrial fría;
- exceso de ornamento medieval;
- urgencia comercial agresiva.

La escasez debe sentirse como una consecuencia real del proceso, no como una técnica de presión.

---

## 3. IDENTIDAD VISUAL

### Paleta base

```css
--color-obsidian: #0A0A0A;
--color-ash: #171717;
--color-copper: #B87333;
--color-gold: #D4AF37;
--color-patina: #6B8E23;
--color-parchment: #E5E1D8;
```

### Tipografía
- **Cormorant Garamond:** títulos, citas, manifiesto, numeración editorial.
- **Space Grotesk:** interfaz, metadatos, navegación, precios y microcopy.

### Dirección artística
- Negro mineral.
- Cobre oxidado.
- Dorado utilizado con moderación.
- Textura analógica/grano.
- Fotografía con sombras profundas.
- Composición editorial de gran escala.
- Mucho espacio negativo.
- Líneas finas y etiquetas técnicas.
- Imperfección controlada.

---

## 4. SISTEMA DE DISEÑO

### Tokens
Todo color, radio, sombra, transición y escala recurrente debe vivir como variable CSS.

### Principios
1. **Materia antes que decoración.**
2. **Historia antes que catálogo.**
3. **Escasez real antes que urgencia artificial.**
4. **Microinteracción con propósito.**
5. **Mobile-first.**
6. **Accesibilidad sin romper la estética.**
7. **Cada elemento debe parecer parte del archivo/fundición.**

---

## 5. ARQUITECTURA DE LA HOME

### 01 — Loader
Entrada breve con monograma/sello y estado de carga.

Objetivo: crear transición entre pantalla y experiencia.

### 02 — Navegación
- Marca.
- Manifiesto.
- Drop.
- Archivo.
- CTA de acceso.

En móvil: navegación compacta y accesible.

### 03 — Hero
Mensaje:

**Historia Fundida.**

Submensaje: materia recuperada + transformación artesanal + edición limitada.

Debe sentirse más como portada de revista/archivo que como landing convencional.

### 04 — Marquee
Frase repetitiva de marca:

**RECUPERAR / PURIFICAR / FUNDIR / ESTAMPAR / CONSERVAR**

Sirve como respiración visual y refuerzo de identidad.

### 05 — Drop #004
Escaparate principal.

Datos planteados en el material actual:
- Serie Vinalopó.
- 15 unidades.
- Origen indicado como restos agrícolas y cableado industrial (1980–2005).
- Coordenadas indicadas en el material original: 38°16'01"N 0°41'54"W.

**Nota:** las afirmaciones de origen, composición, pureza, fechas, coordenadas y disponibilidad deben verificarse antes de publicación comercial.

### 06 — Revelado de origen
El producto debe permitir alternar entre:
- objeto terminado;
- materia/origen.

Desktop:
- hover opcional.

Móvil:
- botón/tap explícito.

No depender nunca de `:hover` para información esencial.

### 07 — Barra de estadísticas
Ejemplos de lenguaje visual:
- UNIDADES.
- TEMPERATURA.
- PROCESO.
- ORIGEN.
- AÑO / SERIE.

Los valores reales deben configurarse desde los datos del producto.

### 08 — Manifiesto en tres actos

#### ACTO I — LA TIERRA
Lo encontrado.

> Antes de ser metal, fue otra cosa.

Paisaje, detección, agricultura, cableado, desgaste, óxido, tiempo.

#### ACTO II — EL FUEGO
La transformación.

> El fuego no borra la historia. La concentra.

Selección, limpieza, crisol, temperatura, vertido, enfriamiento.

#### ACTO III — EL ARCHIVO
La conservación.

> Lo que sobrevivió al tiempo ahora adquiere una forma que puede sobrevivirlo.

Numeración, sello, procedencia, lote y pieza.

### 09 — El Gremio
Captación de leads.

Promesa:
- acceso anticipado;
- avisos de drops;
- comunicación limitada;
- cero spam.

Pendiente: conectar formulario a proveedor real.

### 10 — Footer
- Legal.
- Contacto.
- Redes.
- Procedencia de marca.

---

## 6. UX / CONVERSIÓN

### Mobile-first
Prioridad absoluta.

La experiencia debe funcionar con:
- pulgar;
- una mano;
- conexión móvil;
- botones grandes;
- feedback inmediato.

### Producto
CTA claro:
**Añadir / Reservar / Acceder**

Evitar que la acción comercial quede escondida.

### Checkout
Para 15 unidades por drop, estudiar:
1. Stripe Checkout directo.
2. Shopify/Storefront headless.
3. Otra plataforma de comercio.

**Decisión todavía pendiente.**

No implementar un checkout ficticio en producción.

---

## 7. CAPTACIÓN — EL GREMIO

Funnel:

```text
Contenido / Redes
      ↓
Landing
      ↓
Manifiesto
      ↓
Drop / Producto
      ↓
El Gremio
      ↓
Acceso anticipado
      ↓
Drop
      ↓
Compra
      ↓
Archivo / siguiente Drop
```

Proveedor de email: pendiente de decisión.

Opciones a evaluar:
- Mailchimp.
- Klaviyo.
- Formspree/webhook como solución temporal.

---

## 8. ANIMACIÓN

La animación debe comunicar materia y tiempo, no parecer una plantilla tecnológica.

### Efectos
- reveal por scroll;
- parallax muy ligero;
- textura de ruido;
- hover magnético discreto;
- revelado del origen;
- contador;
- marquee;
- entrada de loader;
- cursor contextual en escritorio;
- transiciones de navegación.

### Regla
**Si una animación distrae del objeto, se elimina.**

### Accesibilidad
Respetar:

```css
@media (prefers-reduced-motion: reduce)
```

---

## 9. ARQUITECTURA DE ARCHIVOS

```text
tesoros-del-tiempo/
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── images/
│   ├── icons/
│   └── video/
└── docs/
    └── MASTER-CONTEXT.md
```

La primera iteración puede utilizar imágenes remotas de referencia. Antes del lanzamiento deben sustituirse por assets propios optimizados.

---

## 10. ROADMAP

### FASE 01 — IDENTIDAD + FRONTEND
- [x] Separar HTML/CSS/JS.
- [x] Tokens de diseño.
- [x] Mobile-first.
- [x] Manifiesto editorial.
- [x] Interacción táctil del producto.
- [x] Reveal animations.
- [x] Loader.
- [x] Marquee.
- [x] Estadísticas.
- [x] Sistema de sello/monograma.

### FASE 02 — PRODUCTO
- [ ] Definir catálogo real.
- [ ] Fichas de producto.
- [ ] Fotografías propias.
- [ ] Procedencia verificable.
- [ ] SKU/lotes.
- [ ] Stock real.
- [ ] Política de reservas.

### FASE 03 — COMERCIO
Elegir arquitectura:
- [ ] Stripe Checkout.
- [ ] Shopify headless.
- [ ] WooCommerce/headless.

### FASE 04 — CRM
- [ ] Formulario real.
- [ ] Doble opt-in si corresponde.
- [ ] Automatización.
- [ ] Segmentación por interés.
- [ ] Email previo al drop.

### FASE 05 — DEPLOY
```text
VS Code
  ↓
Git
  ↓
GitHub
  ↓
Vercel Preview
  ↓
Test móvil
  ↓
Merge main
  ↓
Producción
```

### FASE 06 — MEDICIÓN
Instrumentar:
- visitas;
- scroll;
- interacción con origen;
- clicks CTA;
- altas de El Gremio;
- checkout iniciado;
- compra;
- abandono.

---

## 11. GIT / VERCEL

Regla operativa:

**Nunca trabajar subiendo carpetas manualmente a Vercel como método principal.**

Flujo:

```bash
git add .
git commit -m "feat: nueva iteracion visual"
git push
```

Después:
- revisar Preview;
- probar móvil;
- revisar consola;
- comprobar enlaces;
- revisar rendimiento;
- fusionar a `main`.

---

## 12. CHECKLIST ANTES DE LANZAR

### Visual
- [ ] No hay imágenes de placeholder.
- [ ] Logo/sello definitivo.
- [ ] Tipografías cargan.
- [ ] Contraste revisado.
- [ ] Estados hover/focus visibles.
- [ ] Mobile revisado.

### Comercial
- [ ] Precio real.
- [ ] Stock real.
- [ ] Impuestos/envío definidos.
- [ ] Checkout operativo.
- [ ] Email conectado.

### Legal
- [ ] Términos.
- [ ] Privacidad.
- [ ] Cookies si corresponde.
- [ ] Información de contacto.
- [ ] Condiciones de compra/devolución.

### Técnica
- [ ] HTTPS.
- [ ] Favicon.
- [ ] Open Graph.
- [ ] SEO básico.
- [ ] Analytics.
- [ ] Imágenes comprimidas.
- [ ] `prefers-reduced-motion`.
- [ ] Sin errores de consola.

---

## 13. VOZ DE MARCA

La voz debe ser:

**Precisa. Literaria. Material. Sobria.**

No decir:
> Compra nuestro increíble lingote artesanal.

Preferir:
> Una pieza de metal recuperado. Fundida una sola vez. Numerada para el archivo.

No decir:
> ¡Date prisa, quedan pocas!

Preferir:
> Quince piezas. Cuando el molde se enfría, el lote termina.

No abusar de:
- "premium";
- "exclusivo";
- "lujo";
- "único" sin contexto.

La propia historia del proceso debe justificar el valor.

---

## 14. MANIFIESTO — TEXTO BASE

### I. LA TIERRA

Todo empieza antes del fuego.

En un campo. En un taller. En una caja olvidada. Bajo una capa de tierra que no distingue entre lo que fue útil y lo que dejó de serlo.

Buscamos fragmentos.

No buscamos perfección.

Buscamos materia con memoria.

Cada hallazgo contiene una pequeña contradicción: fue fabricado para cumplir una función y terminó convertido en residuo. Nosotros intervenimos en ese intervalo.

Lo recogemos. Lo limpiamos. Lo separamos.

Y entonces empieza otra historia.

### II. EL FUEGO

El metal entra en el crisol sin prometer nada.

El calor elimina algunas cosas y revela otras.

La fundición no es un borrado. Es una concentración.

La materia cambia de forma, pero conserva las marcas de su recorrido: densidades, vetas, líneas de enfriamiento, pequeñas imperfecciones.

Por eso cada vertido es irrepetible.

No buscamos que dos piezas parezcan iguales.

Buscamos que cada una pueda demostrar que ocurrió.

### III. EL ARCHIVO

Después del fuego queda un objeto.

Lo numeramos.

Lo sellamos.

Lo fechamos.

Y lo incorporamos al archivo.

Porque el verdadero valor de una pieza no termina cuando sale del molde. Empieza cuando alguien puede preguntar de dónde viene y existe una respuesta.

Tesoros del Tiempo es ese intento:

convertir materia olvidada en memoria tangible.

**No vendemos metal. Vendemos tiempo.**

---

## 15. PRINCIPIO FUNDAMENTAL

La web debe hacer que el visitante piense:

> **“Quiero saber de dónde salió esto.”**

Y después:

> **“Quiero conservarlo.”**

Ese es el puente entre historia, producto y conversión.

---

## 16. PENDIENTES CRÍTICOS

1. Arquitectura real de pagos.
2. Proveedor de email.
3. Assets fotográficos propios.
4. Datos verificables de procedencia.
5. Fecha real del Drop #004.
6. Catálogo definitivo.
7. Política de stock/reserva.
8. Legal.
9. Dominio y cuentas sociales.
10. Analítica.

Hasta resolverlos, la web debe considerarse **prototipo avanzado / preproducción**, no e-commerce listo para cobrar.

git add .
git commit -m "feat: nueva iteracion visual"
git push