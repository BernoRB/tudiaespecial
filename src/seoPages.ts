export type SeoQuestionAnswer = {
  question: string;
  answer: string;
};

export type SeoSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  language?: string;
  ogLocale?: string;
  publishedAt: string;
  updatedAt: string;
  h1: string;
  dek: string;
  shortAnswer: string;
  quickAnswers: SeoQuestionAnswer[];
  sections: SeoSection[];
  checklist: string[];
  faq: SeoQuestionAnswer[];
  relatedSlugs: string[];
};

const updatedAt = "2026-06-12";

export const seoPages: SeoPage[] = [
  {
    slug: "invitacion-boda-whatsapp",
    title: "Invitación de boda por WhatsApp",
    description: "Cómo usar una invitación de boda por WhatsApp sin perder elegancia, con RSVP, mapa, agenda y toda la información en un solo link.",
    keywords: ["invitación boda WhatsApp", "invitaciones digitales boda", "invitación online boda", "RSVP boda"],
    category: "Bodas",
    publishedAt: "2026-05-21",
    updatedAt,
    h1: "Invitación de boda por WhatsApp: elegante, clara y fácil de compartir",
    dek: "Una guía práctica para enviar la invitación de boda por WhatsApp sin que parezca improvisada.",
    shortAnswer: "Una invitación de boda por WhatsApp funciona mejor cuando no es una imagen suelta, sino un link con diseño, fecha, ubicación, agenda, regalos y confirmación de asistencia.",
    quickAnswers: [
      { question: "¿Sirve para una boda formal?", answer: "Sí. Si el diseño y el texto están cuidados, puede verse tan elegante como una invitación impresa." },
      { question: "¿Qué se manda por WhatsApp?", answer: "Se envía un link único acompañado por un mensaje corto y personal." },
      { question: "¿Puede tener RSVP?", answer: "Sí. El invitado puede confirmar asistencia desde la misma invitación." },
      { question: "¿Conviene enviar imagen o link?", answer: "Conviene enviar link: carga mejor, se actualiza y reúne toda la información." }
    ],
    sections: [
      {
        heading: "Qué debe incluir",
        paragraphs: ["La invitación debe resolver las dudas principales antes de que el invitado pregunte por chat. Eso reduce mensajes repetidos y mejora la organización."],
        bullets: ["Nombres de la pareja", "Fecha y horario", "Dirección con mapa", "Agenda o momentos importantes", "Código de vestimenta si aplica", "Confirmación de asistencia", "Datos de regalo o alias"]
      },
      {
        heading: "Cómo enviarla sin que se vea fría",
        paragraphs: ["Lo ideal es acompañar el link con una frase breve, humana y directa. No hace falta explicar todo en el mensaje: el link se encarga de ordenar la información."],
        bullets: ["Usar el nombre del invitado si es posible", "Evitar textos largos", "Pedir confirmación con una fecha límite", "Reenviar solo a quienes no respondieron"]
      },
      {
        heading: "Por qué mejora la organización",
        paragraphs: ["Cuando la invitación tiene RSVP, mapa y detalles del evento, los invitados llegan mejor informados. La pareja también evita revisar decenas de chats para saber quién confirmó."]
      }
    ],
    checklist: ["Preparar lista de invitados", "Definir texto de invitación", "Revisar dirección y mapa", "Probar el link en celular", "Enviar primero a familiares cercanos", "Hacer seguimiento de no confirmados"],
    faq: [
      { question: "¿Una invitación de boda por WhatsApp queda informal?", answer: "No necesariamente. La informalidad aparece cuando se manda una imagen básica o un texto desordenado. Un link diseñado puede verse cuidado y premium." },
      { question: "¿Cuándo conviene enviarla?", answer: "Para una boda, lo habitual es enviarla entre 2 y 4 meses antes, y recordar la confirmación unas semanas antes del evento." },
      { question: "¿Se puede cambiar la información después de enviada?", answer: "Sí. Si es una invitación web, se puede corregir un horario, dirección o texto sin reenviar una imagen nueva." }
    ],
    relatedSlugs: ["invitacion-digital-boda", "invitacion-rsvp", "cuando-enviar-invitaciones-digitales"]
  },
  {
    slug: "invitacion-digital-boda",
    title: "Invitación digital para boda",
    description: "Qué es una invitación digital para boda, qué secciones incluir y cómo usarla para que los invitados tengan toda la información clara.",
    keywords: ["invitación digital boda", "invitaciones digitales para casamiento", "invitación web boda", "boda online"],
    category: "Bodas",
    publishedAt: "2026-05-21",
    updatedAt,
    h1: "Invitación digital para boda: qué incluir y cómo hacerla útil",
    dek: "Una invitación de boda no debería ser solo linda: también tiene que evitar dudas, ordenar confirmaciones y facilitar el día del evento.",
    shortAnswer: "Una invitación digital para boda es una página web personalizada que reúne diseño, datos del evento, ubicación, RSVP, regalos y agenda en un solo link.",
    quickAnswers: [
      { question: "¿Qué formato tiene?", answer: "Normalmente es una página web responsive que se comparte por WhatsApp, email o redes." },
      { question: "¿Reemplaza a la invitación impresa?", answer: "Sí, en la mayoría de los casos. También puede convivir con una versión impresa si la boda es muy formal." },
      { question: "¿Qué datos no pueden faltar?", answer: "Fecha, horario, ubicación, nombres, RSVP y contacto ante dudas." },
      { question: "¿Cuánto tarda?", answer: "En TuDiaEspecial se entrega en 24 horas hábiles desde que están los datos." }
    ],
    sections: [
      {
        heading: "Secciones recomendadas",
        paragraphs: ["Una boda suele tener más información que otros eventos. Por eso conviene ordenar todo en secciones claras y cortas."],
        bullets: ["Portada con nombres y fecha", "Cuenta regresiva", "Ceremonia y fiesta", "Mapa", "Itinerario", "Galería", "Regalos", "Confirmación de asistencia"]
      },
      {
        heading: "Texto: elegante, pero entendible",
        paragraphs: ["El mejor texto de invitación combina tono emocional con información concreta. Si el invitado tiene que releer tres veces para entender, el texto está fallando."]
      },
      {
        heading: "El rol del RSVP",
        paragraphs: ["El RSVP es clave porque convierte la invitación en una herramienta de organización. Permite saber quién asiste, si lleva acompañante y si hay datos especiales que preguntar."]
      }
    ],
    checklist: ["Elegir estilo visual", "Confirmar horarios finales", "Definir si habrá una o varias ubicaciones", "Armar mensaje de envío", "Configurar RSVP", "Probar en Android y iPhone"],
    faq: [
      { question: "¿La invitación digital sirve para ceremonia civil e iglesia?", answer: "Sí. Puede incluir varias ubicaciones, horarios y explicaciones para cada momento de la boda." },
      { question: "¿Se puede agregar música?", answer: "Sí. La música puede acompañar la experiencia, siempre cuidando que no moleste ni dificulte la carga." },
      { question: "¿Puedo usarla para invitados del exterior?", answer: "Sí. El link se abre desde cualquier país y ayuda mucho cuando hay invitados que viajan." }
    ],
    relatedSlugs: ["invitacion-boda-whatsapp", "organizar-invitados-boda", "invitacion-digital-con-mapa"]
  },
  {
    slug: "invitacion-quinceanera",
    title: "Invitación digital para quinceañera",
    description: "Ideas y buenas prácticas para una invitación digital de quinceañera: diseño, texto, RSVP, ubicación, dress code y detalles importantes.",
    keywords: ["invitación quinceañera", "invitación digital 15 años", "invitaciones quince", "cumpleaños de 15"],
    category: "Quinces",
    publishedAt: "2026-05-21",
    updatedAt,
    h1: "Invitación digital para quinceañera: ideas, texto y secciones útiles",
    dek: "Una invitación de 15 tiene que sentirse especial, pero también tiene que explicar todo con claridad.",
    shortAnswer: "Una invitación digital de quinceañera debe incluir nombre, fecha, lugar, horario, dress code, RSVP y un estilo visual alineado con la fiesta.",
    quickAnswers: [
      { question: "¿Qué estilo conviene?", answer: "Depende de la fiesta: elegante, romántico, moderno, floral, glam o minimalista." },
      { question: "¿Debe tener dress code?", answer: "Sí, si hay una consigna de color, formalidad o vestimenta especial." },
      { question: "¿Puede tener fotos?", answer: "Sí. Una galería corta suma identidad sin hacer pesada la invitación." },
      { question: "¿Se puede enviar por WhatsApp?", answer: "Sí. Es el canal más práctico para adolescentes, familia y amigos." }
    ],
    sections: [
      {
        heading: "Qué información poner",
        paragraphs: ["La invitación debe responder las preguntas básicas sin llenar la portada de texto. Lo importante es jerarquizar."],
        bullets: ["Nombre de la cumpleañera", "Fecha y hora", "Salón o dirección", "Mapa", "Dress code", "Mensaje personal", "RSVP"]
      },
      {
        heading: "Cómo elegir el tono",
        paragraphs: ["Para una fiesta de 15, el texto puede ser más emocional o más moderno. Lo importante es que suene natural y que represente a la protagonista."]
      },
      {
        heading: "Confirmaciones y acompañantes",
        paragraphs: ["Si el cupo es cerrado, el RSVP ayuda a ordenar invitados y evitar confusiones. También permite preguntar si la persona asistirá sola o con acompañante."]
      }
    ],
    checklist: ["Definir paleta de colores", "Elegir fotos", "Confirmar salón", "Escribir mensaje corto", "Activar RSVP", "Enviar recordatorio antes de la fecha límite"],
    faq: [
      { question: "¿Cuándo se envía la invitación de 15?", answer: "Lo recomendable es enviarla entre 45 y 90 días antes, según la formalidad y cantidad de invitados." },
      { question: "¿Puede incluir lista de regalos?", answer: "Sí. Puede agregarse alias, datos de regalo o una frase discreta según el tono de la familia." },
      { question: "¿Se puede editar después?", answer: "Sí. En una invitación digital se pueden ajustar textos, horarios o imágenes después de publicada." }
    ],
    relatedSlugs: ["invitaciones-digitales-para-cumpleanos", "texto-para-invitacion-digital", "invitacion-rsvp"]
  },
  {
    slug: "invitacion-rsvp",
    title: "Invitación con RSVP online",
    description: "Qué es el RSVP online en una invitación digital, cómo funciona y por qué ayuda a organizar invitados sin perder mensajes.",
    keywords: ["RSVP online", "confirmación de asistencia", "invitación con RSVP", "confirmar asistencia evento"],
    category: "RSVP",
    publishedAt: "2026-05-21",
    updatedAt,
    h1: "Invitación con RSVP online: cómo confirmar asistencia sin caos",
    dek: "El RSVP convierte una invitación digital en una herramienta real de organización.",
    shortAnswer: "El RSVP online permite que cada invitado confirme asistencia desde la invitación y que el anfitrión vea las respuestas ordenadas, sin depender de mensajes sueltos.",
    quickAnswers: [
      { question: "¿Qué significa RSVP?", answer: "Es una solicitud de confirmación de asistencia." },
      { question: "¿Para qué sirve?", answer: "Sirve para saber quién va, quién no va y cuántos lugares reservar." },
      { question: "¿Puede preguntar alergias?", answer: "Sí. Se pueden sumar preguntas como menú, acompañantes o restricciones." },
      { question: "¿Reemplaza al chat?", answer: "No reemplaza el trato humano, pero evita perder datos importantes en conversaciones." }
    ],
    sections: [
      {
        heading: "Qué datos pedir",
        paragraphs: ["No conviene pedir demasiadas cosas. Un RSVP eficaz pregunta solo lo necesario para organizar el evento."],
        bullets: ["Nombre", "Asistencia sí o no", "Cantidad de acompañantes si aplica", "Restricción alimentaria", "Comentario opcional"]
      },
      {
        heading: "Por qué evita errores",
        paragraphs: ["Cuando las respuestas quedan centralizadas, hay menos riesgo de contar mal invitados, olvidar un mensaje o duplicar confirmaciones."]
      },
      {
        heading: "Cuándo cerrar confirmaciones",
        paragraphs: ["La fecha límite depende del evento, pero conviene dejar margen para pasar números al salón, catering o familia organizadora."]
      }
    ],
    checklist: ["Definir preguntas mínimas", "Poner fecha límite", "Aclarar si hay acompañantes", "Revisar respuestas semanalmente", "Enviar recordatorio a quienes faltan"],
    faq: [
      { question: "¿El invitado necesita instalar algo?", answer: "No. Abre el link desde el celular y confirma desde la invitación." },
      { question: "¿Se puede confirmar por WhatsApp igual?", answer: "Sí, pero lo ideal es volcar la respuesta al sistema para no perder control." },
      { question: "¿Sirve para cumpleaños chicos?", answer: "Sí. Es útil para cualquier evento donde necesites saber cuántas personas van." }
    ],
    relatedSlugs: ["confirmar-asistencia-por-whatsapp", "lista-de-invitados-online", "organizar-invitados-boda"]
  },
  {
    slug: "organizar-invitados-boda",
    title: "Cómo organizar invitados de boda",
    description: "Guía para organizar invitados de boda con lista online, RSVP, grupos, recordatorios y datos claros desde la invitación digital.",
    keywords: ["organizar invitados boda", "lista invitados boda", "RSVP boda", "confirmaciones boda"],
    category: "Bodas",
    publishedAt: "2026-05-21",
    updatedAt,
    h1: "Cómo organizar invitados de boda sin perder confirmaciones",
    dek: "La lista de invitados se vuelve más simple cuando la invitación, el RSVP y los recordatorios trabajan juntos.",
    shortAnswer: "Para organizar invitados de boda conviene usar una lista centralizada, enviar una invitación digital con RSVP y hacer seguimiento solo a quienes no confirmaron.",
    quickAnswers: [
      { question: "¿Por dónde empiezo?", answer: "Por una lista única con nombre, grupo familiar y contacto." },
      { question: "¿Cuándo pedir confirmación?", answer: "Desde el primer envío, con fecha límite visible." },
      { question: "¿Cómo evito duplicados?", answer: "Centralizando respuestas y evitando confirmar por varios canales a la vez." },
      { question: "¿Qué hago con indecisos?", answer: "Enviar un recordatorio amable antes de cerrar números." }
    ],
    sections: [
      {
        heading: "Armar una lista base",
        paragraphs: ["Antes de enviar invitaciones, conviene ordenar invitados por grupos: familia, amigos, trabajo y compromisos. Eso ayuda a revisar cupos y prioridades."]
      },
      {
        heading: "Usar RSVP para números reales",
        paragraphs: ["La confirmación online evita depender de memoria o chats dispersos. Además, permite detectar rápido qué grupos faltan responder."]
      },
      {
        heading: "Hacer seguimiento sin molestar",
        paragraphs: ["El seguimiento no tiene que ser intenso. Un mensaje breve y claro suele alcanzar si la invitación ya explica todo."],
        bullets: ["Primer envío con link", "Recordatorio a mitad de plazo", "Último aviso antes de cerrar lista"]
      }
    ],
    checklist: ["Crear lista única", "Separar invitados por grupo", "Definir cupos", "Enviar link con RSVP", "Registrar acompañantes", "Cerrar confirmaciones con margen"],
    faq: [
      { question: "¿Conviene confirmar por familia o por persona?", answer: "Depende del evento. Para bodas grandes, suele convenir por grupo familiar con nombres claros." },
      { question: "¿Qué fecha límite poner?", answer: "Idealmente 3 a 4 semanas antes de la boda, o antes si el salón lo solicita." },
      { question: "¿La invitación digital ayuda con mesas?", answer: "Ayuda porque ordena confirmados, aunque la distribución de mesas se trabaja aparte." }
    ],
    relatedSlugs: ["invitacion-rsvp", "lista-de-invitados-online", "invitacion-digital-boda"]
  },
  {
    slug: "invitacion-digital-vs-papel",
    title: "Invitación digital vs invitación de papel",
    description: "Comparación clara entre invitación digital e invitación de papel: costos, tiempos, cambios, RSVP, experiencia e impacto práctico.",
    keywords: ["invitación digital vs papel", "invitaciones digitales", "invitaciones de papel", "invitación online"],
    category: "Guías",
    publishedAt: "2026-05-21",
    updatedAt,
    h1: "Invitación digital vs papel: qué conviene para tu evento",
    dek: "La pregunta no es solo estética: también importan el tiempo, los cambios, la confirmación y la experiencia del invitado.",
    shortAnswer: "La invitación digital suele convenir cuando querés rapidez, cambios fáciles, RSVP y envío por WhatsApp; la de papel puede servir si buscás un objeto físico o ceremonial.",
    quickAnswers: [
      { question: "¿Cuál es más rápida?", answer: "La digital. Puede estar lista y enviada en mucho menos tiempo." },
      { question: "¿Cuál permite cambios?", answer: "La digital permite corregir datos después de enviada." },
      { question: "¿Cuál organiza mejor?", answer: "La digital, si incluye RSVP y secciones claras." },
      { question: "¿La de papel sigue teniendo sentido?", answer: "Sí, si querés una pieza física para entregar o guardar." }
    ],
    sections: [
      {
        heading: "Costos y tiempos",
        paragraphs: ["La invitación impresa implica diseño, impresión, coordinación y entrega. La digital reduce pasos y evita reimprimir ante cambios."]
      },
      {
        heading: "Experiencia del invitado",
        paragraphs: ["En el celular, el invitado puede abrir el mapa, confirmar asistencia y revisar detalles cuando lo necesita. Eso es difícil de lograr con papel."]
      },
      {
        heading: "Cuándo combinar ambas",
        paragraphs: ["En eventos muy formales, algunas familias usan una pieza impresa para ciertos invitados y una invitación digital para organizar la información completa."]
      }
    ],
    checklist: ["Comparar presupuesto total", "Pensar si habrá cambios", "Definir si necesitás RSVP", "Considerar invitados fuera de la ciudad", "Elegir el formato más práctico para tu público"],
    faq: [
      { question: "¿La invitación digital reemplaza totalmente al papel?", answer: "Sí, en la mayoría de los eventos. Lo importante es que esté bien diseñada y sea fácil de usar." },
      { question: "¿Es menos elegante?", answer: "No. La elegancia depende del diseño, la tipografía, el texto y la experiencia, no del soporte." },
      { question: "¿Qué formato es más ecológico?", answer: "La digital evita impresión, traslados y descartes de papel." }
    ],
    relatedSlugs: ["que-es-una-invitacion-digital", "cuanto-cuesta-invitacion-digital", "invitacion-boda-whatsapp"]
  },
  {
    slug: "que-es-una-invitacion-digital",
    title: "Qué es una invitación digital",
    description: "Definición simple de invitación digital, qué incluye, cómo se comparte y cuándo conviene usarla para eventos.",
    keywords: ["qué es una invitación digital", "invitaciones digitales", "invitación online", "invitación web"],
    category: "Guías",
    publishedAt: updatedAt,
    updatedAt,
    h1: "Qué es una invitación digital y para qué sirve",
    dek: "Una explicación directa para entender el formato antes de elegirlo para tu evento.",
    shortAnswer: "Una invitación digital es una página o link personalizado que reúne la información del evento y se comparte por WhatsApp, email o redes.",
    quickAnswers: [
      { question: "¿Es una imagen?", answer: "Puede ser una imagen, pero lo más útil es que sea una página con secciones." },
      { question: "¿Se abre en celular?", answer: "Sí. Debe estar pensada primero para móvil." },
      { question: "¿Sirve para cualquier evento?", answer: "Sí: bodas, quince, cumpleaños, bautismos, comuniones y eventos sociales." },
      { question: "¿Qué ventaja tiene?", answer: "Centraliza datos, permite cambios y facilita confirmaciones." }
    ],
    sections: [
      { heading: "Cómo funciona", paragraphs: ["Se crea una invitación con diseño personalizado y se entrega un link. Ese link se puede compartir con todos los invitados y abrir desde cualquier navegador."] },
      { heading: "Qué puede incluir", paragraphs: ["Además del diseño, puede incluir mapa, RSVP, música, galería, regalos, agenda, dress code y datos de contacto."], bullets: ["Portada", "Datos del evento", "Mapa", "Confirmación", "Regalos", "Preguntas frecuentes"] },
      { heading: "Cuándo conviene", paragraphs: ["Conviene cuando querés ahorrar tiempo, evitar errores de información y facilitar que los invitados tengan todo a mano."] }
    ],
    checklist: ["Definir tipo de evento", "Reunir datos básicos", "Elegir estilo visual", "Preparar lista de invitados", "Enviar el link con mensaje corto"],
    faq: [
      { question: "¿Necesito una app?", answer: "No. Una buena invitación digital se abre desde el navegador del celular." },
      { question: "¿Puedo enviarla por Instagram?", answer: "Sí. Podés compartir el link por WhatsApp, Instagram, email o cualquier canal." },
      { question: "¿Puede quedar online después del evento?", answer: "Sí, según el servicio contratado y el tiempo de publicación acordado." }
    ],
    relatedSlugs: ["como-hacer-invitacion-digital", "invitacion-digital-vs-papel", "cuanto-cuesta-invitacion-digital"]
  },
  {
    slug: "cuanto-cuesta-invitacion-digital",
    title: "Cuánto cuesta una invitación digital",
    description: "Precio de una invitación digital, qué factores influyen y cómo comparar propuestas sin mirar solo el número final.",
    keywords: ["cuánto cuesta una invitación digital", "precio invitación digital", "invitaciones digitales precio", "costo invitación online"],
    category: "Precios",
    publishedAt: updatedAt,
    updatedAt,
    h1: "Cuánto cuesta una invitación digital y qué debería incluir",
    dek: "El precio importa, pero conviene mirar también diseño, cambios, RSVP, soporte y velocidad de entrega.",
    shortAnswer: "Una invitación digital puede variar según diseño, secciones y soporte. En TuDiaEspecial el plan es de pago único e incluye diseño, link, RSVP, mapa y entrega rápida.",
    quickAnswers: [
      { question: "¿Qué encarece el precio?", answer: "Diseño a medida, muchas secciones, animaciones complejas o integraciones especiales." },
      { question: "¿Se paga por invitado?", answer: "En TuDiaEspecial no: se paga la invitación y se comparte con quienes quieras." },
      { question: "¿Incluye cambios?", answer: "Sí, los ajustes razonables de textos, imágenes o datos están contemplados." },
      { question: "¿Conviene lo más barato?", answer: "No siempre. Si no incluye soporte o RSVP, puede salir caro en organización." }
    ],
    sections: [
      { heading: "Qué comparar", paragraphs: ["No todas las invitaciones digitales son equivalentes. Una imagen con fecha y lugar no resuelve lo mismo que una página con RSVP, mapa y secciones editables."], bullets: ["Diseño responsive", "Mapa", "RSVP", "Tiempo de entrega", "Cambios incluidos", "Soporte por WhatsApp"] },
      { heading: "Precio único vs extras", paragraphs: ["Un precio claro evita sorpresas. Conviene saber desde el inicio si el servicio cobra por cambios, por secciones o por cantidad de invitados."] },
      { heading: "Valor real", paragraphs: ["El valor aparece cuando reduce preguntas repetidas, ordena confirmaciones y mejora la experiencia del invitado."] }
    ],
    checklist: ["Pedir precio final", "Revisar qué secciones incluye", "Confirmar si hay límite de invitados", "Consultar plazo de entrega", "Preguntar por cambios posteriores"],
    faq: [
      { question: "¿El precio depende de la cantidad de invitados?", answer: "En una invitación por link, normalmente no. El mismo enlace puede compartirse con muchos invitados." },
      { question: "¿Tiene costo mensual?", answer: "Depende del proveedor. En TuDiaEspecial el foco es pago único para el evento." },
      { question: "¿Qué pasa si cambio la dirección?", answer: "Se puede actualizar el contenido para que el link muestre la información correcta." }
    ],
    relatedSlugs: ["que-es-una-invitacion-digital", "invitacion-digital-vs-papel", "invitaciones-digitales-espana"]
  },
  {
    slug: "como-hacer-invitacion-digital",
    title: "Cómo hacer una invitación digital",
    description: "Pasos para hacer una invitación digital clara: datos, diseño, texto, RSVP, mapa, prueba en celular y envío.",
    keywords: ["cómo hacer invitación digital", "crear invitación digital", "hacer invitación online", "invitación web"],
    category: "Guías",
    publishedAt: updatedAt,
    updatedAt,
    h1: "Cómo hacer una invitación digital paso a paso",
    dek: "Antes de pensar en colores, conviene ordenar la información que el invitado realmente necesita.",
    shortAnswer: "Para hacer una invitación digital, reuní los datos del evento, elegí un estilo, redactá un texto corto, sumá mapa y RSVP, probá el link en celular y recién después enviá.",
    quickAnswers: [
      { question: "¿Qué necesito primero?", answer: "Fecha, horario, lugar, lista de invitados y tono del evento." },
      { question: "¿El texto debe ser largo?", answer: "No. Mejor breve, claro y con secciones para ampliar." },
      { question: "¿Hay que probarla?", answer: "Sí. Siempre conviene abrirla en celular antes de enviarla." },
      { question: "¿Quién puede hacerla?", answer: "Podés hacerla vos o pedir un diseño personalizado para ahorrar tiempo." }
    ],
    sections: [
      { heading: "Paso 1: ordenar datos", paragraphs: ["La mayoría de los errores nacen de información incompleta. Primero confirmá dirección, horario, dress code y datos de contacto."] },
      { heading: "Paso 2: definir diseño y tono", paragraphs: ["El diseño debe acompañar el tipo de evento. Una boda minimalista, un cumple infantil y una comunión necesitan lenguajes distintos."] },
      { heading: "Paso 3: publicar y enviar", paragraphs: ["Antes del envío masivo, probá el link con una persona de confianza. Revisá que el mapa abra bien y que el RSVP sea simple."] }
    ],
    checklist: ["Reunir datos", "Elegir estilo", "Escribir texto", "Agregar mapa", "Configurar RSVP", "Probar link", "Enviar por WhatsApp"],
    faq: [
      { question: "¿Puedo hacerla desde cero?", answer: "Sí, pero si querés buen diseño, RSVP y entrega rápida, suele convenir un servicio especializado." },
      { question: "¿Qué errores debo evitar?", answer: "Textos largos, mapa incorrecto, horarios confusos, falta de fecha límite para confirmar y diseño que no se lee en celular." },
      { question: "¿Cuánto tarda hacerla?", answer: "Depende del nivel de personalización. En TuDiaEspecial se trabaja con entrega rápida una vez recibidos los datos." }
    ],
    relatedSlugs: ["texto-para-invitacion-digital", "errores-en-invitaciones-digitales", "que-es-una-invitacion-digital"]
  },
  {
    slug: "invitaciones-digitales-para-cumpleanos",
    title: "Invitaciones digitales para cumpleaños",
    description: "Ideas para invitaciones digitales de cumpleaños: adultos, infantiles, 15, sorpresa, asado, fiesta y eventos familiares.",
    keywords: ["invitaciones digitales cumpleaños", "invitación digital cumple", "invitación cumpleaños WhatsApp", "cumpleaños online"],
    category: "Cumpleaños",
    publishedAt: updatedAt,
    updatedAt,
    h1: "Invitaciones digitales para cumpleaños: simples, lindas y prácticas",
    dek: "Un cumpleaños también puede tener una invitación cuidada, con ubicación, horario y confirmación en un solo lugar.",
    shortAnswer: "Una invitación digital de cumpleaños sirve para compartir fecha, lugar, horario, temática y confirmación por WhatsApp sin mandar mensajes largos.",
    quickAnswers: [
      { question: "¿Sirve para adultos?", answer: "Sí. Puede ser elegante, divertida, minimalista o temática." },
      { question: "¿Sirve para niños?", answer: "Sí. Es ideal para enviar a madres, padres y grupos del colegio." },
      { question: "¿Puede tener temática?", answer: "Sí. Puede adaptarse a colores, personajes, fiesta sorpresa o estilo del cumple." },
      { question: "¿Incluye RSVP?", answer: "Puede incluir confirmación para organizar comida, mesa o salón." }
    ],
    sections: [
      { heading: "Qué incluir", paragraphs: ["En cumpleaños, la información debe ser rápida de leer. Nadie quiere buscar dirección u horario entre mensajes viejos."], bullets: ["Nombre", "Edad si corresponde", "Fecha y hora", "Dirección", "Temática", "Qué llevar", "Confirmación"] },
      { heading: "Cumpleaños infantiles", paragraphs: ["Para cumples infantiles conviene aclarar si los adultos se quedan, si hay merienda, duración y si hay alguna indicación especial."] },
      { heading: "Cumpleaños adultos", paragraphs: ["Para adultos, puede sumar dress code, lista de regalos, alias o una consigna simple para la fiesta."] }
    ],
    checklist: ["Definir temática", "Confirmar lugar", "Aclarar horario de inicio y fin", "Agregar mapa", "Pedir confirmación", "Enviar recordatorio"],
    faq: [
      { question: "¿Cuándo enviarla?", answer: "Para cumpleaños, entre 2 y 4 semanas antes suele ser suficiente. Para eventos grandes, un poco antes." },
      { question: "¿Puede ser sorpresa?", answer: "Sí. Se puede aclarar en la invitación y cuidar el texto para que nadie arruine la sorpresa." },
      { question: "¿Se puede compartir en grupos?", answer: "Sí. El link funciona muy bien en grupos de WhatsApp." }
    ],
    relatedSlugs: ["invitacion-quinceanera", "invitacion-digital-con-mapa", "confirmar-asistencia-por-whatsapp"]
  },
  {
    slug: "invitacion-digital-para-bautismo",
    title: "Invitación digital para bautismo",
    description: "Qué incluir en una invitación digital para bautismo: ceremonia, festejo, mapa, horarios, padrinos, fotos y confirmación.",
    keywords: ["invitación digital bautismo", "invitaciones bautismo WhatsApp", "invitación bautismo online"],
    category: "Bautismos",
    publishedAt: updatedAt,
    updatedAt,
    h1: "Invitación digital para bautismo: qué poner y cómo enviarla",
    dek: "Una invitación de bautismo puede ser cálida, familiar y clara sin perder delicadeza.",
    shortAnswer: "Una invitación digital para bautismo debe incluir nombre, fecha, iglesia o ceremonia, festejo posterior, mapas y confirmación de asistencia.",
    quickAnswers: [
      { question: "¿Puede tener ceremonia y festejo?", answer: "Sí. Se pueden mostrar dos ubicaciones y horarios." },
      { question: "¿Conviene poner padrinos?", answer: "Sí, si la familia quiere destacarlos en la invitación." },
      { question: "¿Puede incluir fotos?", answer: "Sí. Una o pocas fotos suelen alcanzar." },
      { question: "¿Se envía por WhatsApp?", answer: "Sí. Es el canal más cómodo para familia y amigos." }
    ],
    sections: [
      { heading: "Información clave", paragraphs: ["La invitación debe separar ceremonia y celebración si ocurren en lugares distintos. Eso evita confusiones el día del evento."], bullets: ["Nombre", "Fecha", "Iglesia o lugar de ceremonia", "Festejo", "Mapa", "RSVP"] },
      { heading: "Tono y diseño", paragraphs: ["Los estilos suaves, cálidos y luminosos suelen funcionar bien para bautismos, pero pueden adaptarse al gusto de cada familia."] },
      { heading: "Confirmación", paragraphs: ["Pedir confirmación ayuda a organizar comida, mesa y cantidad de invitados, especialmente si el festejo es en casa o salón."] }
    ],
    checklist: ["Confirmar iglesia", "Confirmar festejo", "Elegir foto", "Revisar mapas", "Enviar a familiares", "Registrar confirmaciones"],
    faq: [
      { question: "¿Cuándo se envía?", answer: "Entre 3 y 6 semanas antes suele ser un buen margen." },
      { question: "¿Puede tener frase religiosa?", answer: "Sí. Se puede sumar una frase breve si acompaña el tono de la familia." },
      { question: "¿Sirve para bautismo y primer cumpleaños?", answer: "Sí. Se puede adaptar si ambos eventos se celebran juntos." }
    ],
    relatedSlugs: ["invitacion-digital-para-comunion", "invitacion-digital-con-mapa", "texto-para-invitacion-digital"]
  },
  {
    slug: "invitacion-digital-para-comunion",
    title: "Invitación digital para comunión",
    description: "Guía para invitaciones digitales de comunión: ceremonia, celebración, texto, fotos, mapa y confirmación de asistencia.",
    keywords: ["invitación digital comunión", "invitaciones comunión online", "invitación comunión WhatsApp"],
    category: "Comuniones",
    publishedAt: updatedAt,
    updatedAt,
    h1: "Invitación digital para comunión: ceremonia y festejo ordenados",
    dek: "Una comunión suele tener dos momentos: la ceremonia y el encuentro familiar. La invitación debe dejar ambos claros.",
    shortAnswer: "Una invitación digital para comunión reúne ceremonia, celebración, ubicación, horarios, fotos y confirmación en un link fácil de compartir.",
    quickAnswers: [
      { question: "¿Puede tener dos direcciones?", answer: "Sí. Es recomendable si hay ceremonia y festejo en lugares distintos." },
      { question: "¿Qué texto usar?", answer: "Un texto breve, cálido y respetuoso suele funcionar mejor." },
      { question: "¿Sirve para España?", answer: "Sí. Es un formato muy práctico para familias y celebraciones religiosas." },
      { question: "¿Puede tener RSVP?", answer: "Sí. Ayuda a organizar el festejo posterior." }
    ],
    sections: [
      { heading: "Datos importantes", paragraphs: ["En comuniones, el invitado necesita entender horario de ceremonia, dirección, festejo posterior y si debe confirmar asistencia."], bullets: ["Nombre", "Fecha", "Parroquia o lugar", "Festejo posterior", "Mapa", "Confirmación"] },
      { heading: "Diseño", paragraphs: ["Los diseños claros, delicados y con buena lectura móvil ayudan a mantener un tono familiar y cuidado."] },
      { heading: "Envío", paragraphs: ["El link se puede compartir por WhatsApp a familiares, grupos y amigos, acompañado por un mensaje simple."] }
    ],
    checklist: ["Confirmar parroquia", "Definir festejo", "Elegir estilo", "Agregar mapa", "Probar link", "Enviar por grupos familiares"],
    faq: [
      { question: "¿Cuándo enviarla?", answer: "Entre 4 y 8 semanas antes es un margen razonable, según la organización familiar." },
      { question: "¿Puede incluir foto del niño o niña?", answer: "Sí. Una foto cuidada puede hacerla más personal." },
      { question: "¿Se puede adaptar el vocabulario a España?", answer: "Sí. Se puede usar un tono más natural para España si el público está allí." }
    ],
    relatedSlugs: ["invitaciones-digitales-espana", "invitacion-digital-para-bautismo", "invitacion-digital-con-mapa"]
  },
  {
    slug: "texto-para-invitacion-digital",
    title: "Texto para invitación digital",
    description: "Cómo escribir el texto de una invitación digital: ejemplos, tono, información básica y errores a evitar.",
    keywords: ["texto invitación digital", "frases para invitaciones digitales", "mensaje invitación WhatsApp", "redactar invitación"],
    category: "Textos",
    publishedAt: updatedAt,
    updatedAt,
    h1: "Texto para invitación digital: cómo escribirlo claro y lindo",
    dek: "El texto no tiene que ser largo. Tiene que sonar natural y guiar al invitado.",
    shortAnswer: "Un buen texto para invitación digital presenta el evento, transmite el tono y deja la información detallada para las secciones del link.",
    quickAnswers: [
      { question: "¿Debe ser formal?", answer: "Depende del evento. Lo importante es que sea coherente con la celebración." },
      { question: "¿Cuánto debe durar?", answer: "Entre 1 y 3 frases en la portada suele alcanzar." },
      { question: "¿Dónde van los datos?", answer: "Los datos prácticos van en secciones: fecha, lugar, RSVP y mapa." },
      { question: "¿Qué evitar?", answer: "Evitar textos genéricos, muy largos o con información mezclada." }
    ],
    sections: [
      { heading: "Fórmula simple", paragraphs: ["Una estructura que funciona es: quién invita, qué se celebra y una frase de deseo o emoción. Después, la invitación puede mostrar los detalles por secciones."] },
      { heading: "Ejemplos de tono", paragraphs: ["Para boda: 'Queremos compartir este día con vos'. Para cumpleaños: 'Te esperamos para celebrar juntos'. Para comunión: 'Nos acompaña mucha alegría compartir este momento en familia.'"] },
      { heading: "Mensaje para WhatsApp", paragraphs: ["El mensaje que acompaña el link debe ser todavía más corto. Su función es invitar a abrir, no repetir toda la invitación."] }
    ],
    checklist: ["Definir tono", "Escribir una versión corta", "Leer en voz alta", "Separar datos prácticos", "Revisar acentos y nombres", "Probar el mensaje con el link"],
    faq: [
      { question: "¿Puedo usar humor?", answer: "Sí, si el evento y los invitados lo permiten. En eventos formales conviene moderarlo." },
      { question: "¿El texto de WhatsApp debe incluir fecha y lugar?", answer: "Puede incluirlos, pero no hace falta si el link lo muestra claro." },
      { question: "¿Conviene usar nombres completos?", answer: "En bodas y eventos formales, sí. En cumpleaños puede ser más informal." }
    ],
    relatedSlugs: ["como-hacer-invitacion-digital", "errores-en-invitaciones-digitales", "invitacion-quinceanera"]
  },
  {
    slug: "confirmar-asistencia-por-whatsapp",
    title: "Confirmar asistencia por WhatsApp",
    description: "Cómo pedir confirmación de asistencia por WhatsApp sin perder respuestas: mensajes, RSVP, recordatorios y fecha límite.",
    keywords: ["confirmar asistencia por WhatsApp", "mensaje RSVP WhatsApp", "confirmación asistencia evento"],
    category: "RSVP",
    publishedAt: updatedAt,
    updatedAt,
    h1: "Cómo confirmar asistencia por WhatsApp sin perder el control",
    dek: "WhatsApp es cómodo, pero las respuestas se pierden fácil si no hay un sistema detrás.",
    shortAnswer: "Para confirmar asistencia por WhatsApp conviene enviar un link con RSVP y usar el chat solo como recordatorio o canal de cercanía.",
    quickAnswers: [
      { question: "¿Sirve pedir 'confirmame por acá'?", answer: "Sirve para eventos chicos, pero se desordena rápido." },
      { question: "¿Qué mensaje usar?", answer: "Un mensaje corto con link y fecha límite de confirmación." },
      { question: "¿Cuándo recordar?", answer: "Una vez a mitad del plazo y otra antes del cierre." },
      { question: "¿Qué pasa con no respondidos?", answer: "Se les escribe directo con un mensaje amable y concreto." }
    ],
    sections: [
      { heading: "Mensaje recomendado", paragraphs: ["Un buen mensaje podría ser: 'Te comparto la invitación. Por favor confirmá desde el link antes del viernes así podemos organizarnos bien.'"] },
      { heading: "Por qué usar link", paragraphs: ["El link evita mezclar respuestas con conversaciones. También permite pedir datos adicionales sin escribirlos uno por uno."] },
      { heading: "Recordatorios", paragraphs: ["Los recordatorios funcionan mejor cuando son claros y no culpabilizan. El objetivo es cerrar números, no incomodar."] }
    ],
    checklist: ["Enviar link", "Poner fecha límite", "Revisar confirmados", "Filtrar no respondidos", "Enviar recordatorio", "Cerrar lista"],
    faq: [
      { question: "¿Puedo aceptar confirmaciones por audio?", answer: "Podés, pero conviene registrarlas en la lista central para evitar olvidos." },
      { question: "¿Qué hago si alguien confirma por otro familiar?", answer: "Anotalo en el mismo sistema y verificá acompañantes si aplica." },
      { question: "¿Es mejor usar formulario?", answer: "Para eventos medianos o grandes, sí. Es más ordenado que solo WhatsApp." }
    ],
    relatedSlugs: ["invitacion-rsvp", "lista-de-invitados-online", "organizar-invitados-boda"]
  },
  {
    slug: "lista-de-invitados-online",
    title: "Lista de invitados online",
    description: "Cómo usar una lista de invitados online para eventos: confirmados, pendientes, acompañantes, grupos y seguimiento.",
    keywords: ["lista de invitados online", "organizar invitados online", "lista confirmados evento", "RSVP online"],
    category: "Organización",
    publishedAt: updatedAt,
    updatedAt,
    h1: "Lista de invitados online: cómo ordenar confirmados y pendientes",
    dek: "La lista es el corazón de la organización. Si está desordenada, todo lo demás se vuelve más difícil.",
    shortAnswer: "Una lista de invitados online centraliza nombres, grupos, contactos y confirmaciones para saber en todo momento quién asistirá al evento.",
    quickAnswers: [
      { question: "¿Qué columnas usar?", answer: "Nombre, grupo, contacto, estado, acompañantes y notas." },
      { question: "¿Sirve para bodas?", answer: "Sí. Es especialmente útil en bodas y eventos con muchos invitados." },
      { question: "¿La lista reemplaza al RSVP?", answer: "No. El RSVP alimenta la lista con respuestas." },
      { question: "¿Qué estado conviene usar?", answer: "Invitado, confirmado, no asiste y pendiente." }
    ],
    sections: [
      { heading: "Estructura básica", paragraphs: ["Una lista simple pero consistente permite filtrar rápido y tomar decisiones. No hace falta complicarla con campos que no vas a usar."] },
      { heading: "Acompañantes", paragraphs: ["Conviene registrar acompañantes de forma explícita. Es una de las causas más comunes de diferencias en el número final."] },
      { heading: "Seguimiento", paragraphs: ["Con estados claros, los recordatorios dejan de ser masivos y se vuelven específicos para quienes faltan responder."] }
    ],
    checklist: ["Crear estados", "Cargar grupos", "Enviar invitación", "Revisar confirmados", "Separar pendientes", "Cerrar cantidad final"],
    faq: [
      { question: "¿Puedo usar una planilla?", answer: "Sí. Una planilla sirve, pero el RSVP online reduce carga manual." },
      { question: "¿Qué hago con invitados de último momento?", answer: "Agregalos a la lista antes de enviar o reenviar el link, para mantener el control." },
      { question: "¿Conviene compartir la lista?", answer: "Solo con quienes organizan. Evitá circular datos personales sin necesidad." }
    ],
    relatedSlugs: ["invitacion-rsvp", "organizar-invitados-boda", "confirmar-asistencia-por-whatsapp"]
  },
  {
    slug: "invitacion-digital-con-mapa",
    title: "Invitación digital con mapa",
    description: "Por qué agregar mapa a una invitación digital, cómo evitar errores de ubicación y qué datos sumar para que los invitados lleguen bien.",
    keywords: ["invitación digital con mapa", "invitación con ubicación", "mapa invitación WhatsApp", "Google Maps evento"],
    category: "Ubicación",
    publishedAt: updatedAt,
    updatedAt,
    h1: "Invitación digital con mapa: cómo lograr que todos lleguen bien",
    dek: "La dirección escrita no siempre alcanza. Un mapa correcto evita llegadas tarde y preguntas de último momento.",
    shortAnswer: "Una invitación digital con mapa permite abrir la ubicación exacta desde el celular y reduce errores de dirección, especialmente en salones, quintas o iglesias.",
    quickAnswers: [
      { question: "¿Qué mapa usar?", answer: "Google Maps suele ser el más práctico para compartir." },
      { question: "¿Alcanza con la dirección?", answer: "No siempre. El pin exacto evita errores." },
      { question: "¿Puede haber dos mapas?", answer: "Sí, por ejemplo ceremonia y fiesta." },
      { question: "¿Qué revisar?", answer: "Que el pin abra bien en celular y muestre el lugar correcto." }
    ],
    sections: [
      { heading: "Pin exacto", paragraphs: ["En eventos en quintas, salones o barrios cerrados, el pin es más importante que la dirección textual."] },
      { heading: "Indicaciones extra", paragraphs: ["Si el lugar tiene acceso especial, estacionamiento o entrada secundaria, conviene aclararlo en la invitación."] },
      { heading: "Varios momentos", paragraphs: ["Para bodas y comuniones puede haber ceremonia y festejo. La invitación debe separar cada mapa con horario y nombre del lugar."] }
    ],
    checklist: ["Abrir el pin en celular", "Revisar nombre del lugar", "Agregar dirección escrita", "Aclarar estacionamiento", "Separar ceremonia y fiesta", "Probar antes de enviar"],
    faq: [
      { question: "¿Puedo usar Waze?", answer: "Sí, pero Google Maps suele ser suficiente. Si tu público usa Waze, se puede sumar." },
      { question: "¿Qué pasa si el lugar no aparece?", answer: "Se puede usar un pin manual o una referencia clara." },
      { question: "¿Conviene mandar el mapa aparte?", answer: "No hace falta si la invitación ya lo incluye de forma visible." }
    ],
    relatedSlugs: ["invitacion-digital-boda", "invitacion-digital-para-bautismo", "como-hacer-invitacion-digital"]
  },
  {
    slug: "invitacion-digital-con-musica",
    title: "Invitación digital con música",
    description: "Cuándo conviene sumar música a una invitación digital, cómo elegir canción y cómo cuidar la experiencia en celular.",
    keywords: ["invitación digital con música", "invitación online con canción", "música invitación boda", "música invitación quince"],
    category: "Diseño",
    publishedAt: updatedAt,
    updatedAt,
    h1: "Invitación digital con música: cuándo suma y cuándo distrae",
    dek: "La música puede emocionar, pero debe estar al servicio de la experiencia.",
    shortAnswer: "La música en una invitación digital suma si es breve, opcional y coherente con el evento; no debería impedir leer ni hacer pesada la carga.",
    quickAnswers: [
      { question: "¿Conviene autoplay?", answer: "No siempre. En muchos celulares está bloqueado o puede molestar." },
      { question: "¿Qué canción elegir?", answer: "Una canción significativa y adecuada al tono del evento." },
      { question: "¿Hace más lenta la invitación?", answer: "Puede hacerlo si no está bien implementada." },
      { question: "¿Sirve para bodas?", answer: "Sí, especialmente si la canción tiene valor emocional." }
    ],
    sections: [
      { heading: "Música opcional", paragraphs: ["Lo más amable es que el invitado pueda activar la música. Así no se sorprende si abre el link en el trabajo o en la calle."] },
      { heading: "Elegir con criterio", paragraphs: ["La canción debe acompañar la estética. Una boda elegante, un cumple infantil y un quince no necesitan el mismo clima."] },
      { heading: "Rendimiento", paragraphs: ["La invitación debe cargar rápido aun si tiene música. La experiencia móvil sigue siendo prioridad."] }
    ],
    checklist: ["Elegir canción", "Decidir si será opcional", "Probar en celular", "Revisar volumen", "Priorizar carga rápida"],
    faq: [
      { question: "¿Puede sonar sola?", answer: "Depende del navegador y del dispositivo. Por experiencia, es mejor usar reproducción voluntaria." },
      { question: "¿Se puede cambiar la canción?", answer: "Sí, si el servicio permite editar la invitación." },
      { question: "¿La música es necesaria?", answer: "No. Es un extra emocional, no una obligación." }
    ],
    relatedSlugs: ["invitacion-digital-boda", "invitacion-quinceanera", "errores-en-invitaciones-digitales"]
  },
  {
    slug: "invitacion-digital-con-alias-regalo",
    title: "Invitación digital con alias para regalo",
    description: "Cómo incluir alias, cuenta o datos de regalo en una invitación digital de forma clara, discreta y elegante.",
    keywords: ["invitación digital alias regalo", "alias regalo boda", "datos de regalo invitación", "regalos invitación digital"],
    category: "Regalos",
    publishedAt: updatedAt,
    updatedAt,
    h1: "Invitación digital con alias para regalo: cómo ponerlo sin incomodar",
    dek: "Los datos de regalo pueden estar presentes de forma clara y discreta.",
    shortAnswer: "El alias de regalo conviene incluirlo en una sección específica, con una frase amable y sin mezclarlo con el texto principal de la invitación.",
    quickAnswers: [
      { question: "¿Queda mal poner alias?", answer: "No, si se presenta con buen tono y discreción." },
      { question: "¿Dónde ponerlo?", answer: "En una sección de regalos o datos útiles." },
      { question: "¿Debe estar en la portada?", answer: "No. Mejor evitarlo en la portada." },
      { question: "¿Puede tener CBU o cuenta?", answer: "Sí, siempre que esté claro y revisado." }
    ],
    sections: [
      { heading: "Frase sugerida", paragraphs: ["Una frase simple puede ser: 'Tu presencia es lo más importante. Si querés hacernos un regalo, te dejamos estos datos.'"] },
      { heading: "Claridad antes que adorno", paragraphs: ["El alias debe copiarse fácil. Evitá ponerlo en una imagen difícil de seleccionar o leer."] },
      { heading: "Revisión", paragraphs: ["Antes de publicar, verificá cada número y letra. Un error en el alias puede generar problemas reales."] }
    ],
    checklist: ["Elegir frase", "Revisar alias", "Separar sección regalos", "Probar lectura en celular", "Evitar datos sensibles innecesarios"],
    faq: [
      { question: "¿Puedo poner lista de regalos?", answer: "Sí. Puede incluirse un link externo o instrucciones breves." },
      { question: "¿Conviene decir 'lluvia de sobres'?", answer: "Depende del país y del tono. Si suena natural para tus invitados, puede usarse." },
      { question: "¿Se puede ocultar hasta cierta sección?", answer: "Sí. Lo ideal es que no sea lo primero que vea el invitado." }
    ],
    relatedSlugs: ["texto-para-invitacion-digital", "invitacion-digital-boda", "invitacion-digital-vs-papel"]
  },
  {
    slug: "cuando-enviar-invitaciones-digitales",
    title: "Cuándo enviar invitaciones digitales",
    description: "Cuándo enviar invitaciones digitales según el tipo de evento: boda, quince, cumpleaños, bautismo, comunión y fiesta familiar.",
    keywords: ["cuándo enviar invitaciones digitales", "cuándo mandar invitación boda", "cuándo enviar invitación cumpleaños"],
    category: "Planificación",
    publishedAt: updatedAt,
    updatedAt,
    h1: "Cuándo enviar invitaciones digitales según el evento",
    dek: "Enviar demasiado tarde complica la organización; enviar demasiado temprano puede hacer que la gente se olvide.",
    shortAnswer: "Para bodas conviene enviar entre 2 y 4 meses antes; para quince entre 45 y 90 días; para cumpleaños y bautismos, entre 3 y 6 semanas suele alcanzar.",
    quickAnswers: [
      { question: "¿Bodas?", answer: "Entre 2 y 4 meses antes, según viaje y formalidad." },
      { question: "¿Quinces?", answer: "Entre 45 y 90 días antes." },
      { question: "¿Cumpleaños?", answer: "Entre 2 y 4 semanas antes." },
      { question: "¿Bautismos o comuniones?", answer: "Entre 3 y 8 semanas antes, según organización familiar." }
    ],
    sections: [
      { heading: "La fecha límite de RSVP", paragraphs: ["No alcanza con enviar la invitación. También hay que definir hasta cuándo pueden confirmar para cerrar números a tiempo."] },
      { heading: "Eventos con viaje", paragraphs: ["Si hay invitados de otra ciudad o país, conviene enviar antes para que puedan organizar vuelos, alojamiento y agenda."] },
      { heading: "Recordatorios", paragraphs: ["Un recordatorio bien ubicado mejora las confirmaciones sin saturar. Lo ideal es escribir solo a quienes no respondieron."] }
    ],
    checklist: ["Definir fecha del evento", "Calcular margen para RSVP", "Enviar invitación", "Revisar pendientes", "Enviar recordatorio", "Cerrar lista"],
    faq: [
      { question: "¿Puedo enviar save the date digital?", answer: "Sí. Para bodas o eventos con viaje, puede enviarse antes de la invitación completa." },
      { question: "¿Qué pasa si todavía no tengo todos los datos?", answer: "Conviene esperar datos críticos como lugar y horario, o enviar un save the date sin prometer detalles." },
      { question: "¿Cuántos recordatorios mandar?", answer: "Uno o dos suele ser suficiente." }
    ],
    relatedSlugs: ["invitacion-boda-whatsapp", "invitacion-quinceanera", "confirmar-asistencia-por-whatsapp"]
  },
  {
    slug: "errores-en-invitaciones-digitales",
    title: "Errores comunes en invitaciones digitales",
    description: "Errores frecuentes al crear una invitación digital: texto largo, mala lectura móvil, mapa incorrecto, falta de RSVP y datos confusos.",
    keywords: ["errores invitaciones digitales", "invitación digital mal hecha", "mejorar invitación digital", "tips invitación online"],
    category: "Guías",
    publishedAt: updatedAt,
    updatedAt,
    h1: "Errores comunes en invitaciones digitales y cómo evitarlos",
    dek: "Una invitación puede ser linda y aun así fallar si el invitado no encuentra lo que necesita.",
    shortAnswer: "Los errores más comunes son texto largo, diseño que no se lee en celular, mapa incorrecto, falta de RSVP, horarios confusos y no probar el link antes de enviarlo.",
    quickAnswers: [
      { question: "¿Cuál es el error más grave?", answer: "Un dato incorrecto: fecha, hora, dirección o alias." },
      { question: "¿Qué falla en móvil?", answer: "Textos pequeños, botones difíciles y secciones muy cargadas." },
      { question: "¿El diseño puede perjudicar?", answer: "Sí. Si prioriza adorno sobre claridad, baja la utilidad." },
      { question: "¿Cómo prevenir?", answer: "Con checklist y prueba real en celular antes del envío." }
    ],
    sections: [
      { heading: "Información mezclada", paragraphs: ["Cuando todo aparece en un solo bloque, el invitado no sabe dónde mirar. Separar secciones mejora lectura y respuesta."] },
      { heading: "No probar el mapa", paragraphs: ["Un pin mal ubicado puede generar llegadas tarde. Siempre hay que abrir el link como lo abriría un invitado."] },
      { heading: "Olvidar el seguimiento", paragraphs: ["La invitación no termina al enviarla. Si tiene RSVP, hay que revisar pendientes y recordar con tiempo."] }
    ],
    checklist: ["Revisar fecha", "Revisar horario", "Abrir mapa", "Probar RSVP", "Leer en celular", "Enviar prueba a otra persona"],
    faq: [
      { question: "¿Conviene poner toda la información en la portada?", answer: "No. La portada debe invitar y el resto de la información debe estar ordenada en secciones." },
      { question: "¿Qué pasa si detecto un error después?", answer: "En una invitación web se puede corregir el contenido sin rediseñar todo." },
      { question: "¿Cómo sé si se entiende?", answer: "Pedile a alguien que no conoce el evento que abra el link y te diga fecha, hora y lugar." }
    ],
    relatedSlugs: ["como-hacer-invitacion-digital", "invitacion-digital-con-mapa", "texto-para-invitacion-digital"]
  },
  {
    slug: "invitaciones-digitales-espana",
    title: "Invitaciones digitales en España",
    description: "Invitaciones digitales para bodas, comuniones, cumpleaños y celebraciones en España: vocabulario, precio en euros y envío por WhatsApp.",
    keywords: ["invitaciones digitales España", "invitación digital boda España", "invitación comunión digital", "invitaciones online España"],
    category: "España",
    language: "es-ES",
    ogLocale: "es_ES",
    publishedAt: updatedAt,
    updatedAt,
    h1: "Invitaciones digitales en España: bodas, comuniones y celebraciones",
    dek: "Si tus invitados están en España, el vocabulario, el precio y el tono tienen que sentirse naturales para ellos.",
    shortAnswer: "En España, una invitación digital funciona muy bien para bodas, comuniones, cumpleaños y celebraciones porque se comparte por WhatsApp y reúne ubicación, confirmación y detalles en un enlace.",
    quickAnswers: [
      { question: "¿Qué precio tiene?", answer: "Para visitantes de España, la landing muestra el precio adaptado en euros: 30€." },
      { question: "¿Qué vocabulario cambia?", answer: "Se usan palabras como móvil, ordenador, celebración, costes y escríbenos." },
      { question: "¿Sirve para comuniones?", answer: "Sí. Es una de las celebraciones donde más orden aporta." },
      { question: "¿Se envía por WhatsApp?", answer: "Sí. Se comparte mediante un enlace fácil de abrir." }
    ],
    sections: [
      { heading: "Adaptar el tono", paragraphs: ["No hace falta traducir el español, pero sí ajustar pequeñas palabras para que la invitación no suene lejana. Eso mejora confianza y claridad."] },
      { heading: "Eventos habituales", paragraphs: ["Las invitaciones digitales encajan muy bien en bodas, comuniones, bautizos, cumpleaños y celebraciones familiares."], bullets: ["Bodas", "Comuniones", "Bautizos", "Cumpleaños", "Aniversarios", "Fiestas familiares"] },
      { heading: "Precio y contratación", paragraphs: ["El objetivo es que la persona entienda rápido qué recibe, cuánto paga y cómo obtiene el enlace para compartirlo con sus invitados."] }
    ],
    checklist: ["Usar precio en euros", "Revisar vocabulario", "Confirmar país de los invitados", "Probar link en móvil", "Enviar por WhatsApp"],
    faq: [
      { question: "¿Puedo contratar desde España?", answer: "Sí. La landing detecta España y muestra textos y precio adaptados." },
      { question: "¿La invitación funciona fuera de Argentina?", answer: "Sí. Es un enlace web, por lo que puede abrirse desde España u otros países." },
      { question: "¿Se adapta el contenido de la invitación?", answer: "Sí. Se puede escribir con vocabulario natural para España." }
    ],
    relatedSlugs: ["invitacion-digital-para-comunion", "cuanto-cuesta-invitacion-digital", "que-es-una-invitacion-digital"]
  }
];

const seoPageMap = new Map(seoPages.map((page) => [page.slug, page]));

export function getSeoPage(slug: string): SeoPage | undefined {
  return seoPageMap.get(slug);
}

export function getRelatedSeoPages(page: SeoPage): SeoPage[] {
  return page.relatedSlugs
    .map((slug) => getSeoPage(slug))
    .filter((relatedPage): relatedPage is SeoPage => Boolean(relatedPage))
    .slice(0, 3);
}
