export const STDS_BUILTIN = [
  {
    id: "STD-001", cod: "STD-001", titulo: "Riesgo Químico — SPP", cat: "quimico", items: [
      { id: "I1", n: "I", t: "Ventilación/Extracción: Sistemas operativos en zonas de manipulación de SPP." },
      { id: "I2", n: "I", t: "Contención de derrames: Cubetas y diques disponibles. Lavaojos/duchas operativos." },
      { id: "I3", n: "I", t: "Almacenamiento: SPP incompatibles separadas físicamente con señalización clara." },
      { id: "A1", n: "A", t: "SDS: Hojas de seguridad actualizadas (SGA/GHS) accesibles en el punto de uso." },
      { id: "A2", n: "A", t: "Etiquetado: Envases con identificación reglamentaria, legible y en buen estado." },
      { id: "A3", n: "A", t: "Señalización: Prohibición de fumar/llamas en zonas inflamables respetada." },
      { id: "A4", n: "A", t: "Capacitación: Personal instruido en peligros específicos y respuesta a emergencias." },
      { id: "A5", n: "A", t: "Monitoreo: Registros de mediciones ambientales (CMP) dentro de límites legales." },
      { id: "E1", n: "E", t: "Protección Respiratoria: Uso de filtros/cartuchos específicos al contaminante." },
      { id: "E2", n: "E", t: "Protección Manual: Guantes de material resistente a la sustancia manipulada." },
      { id: "E3", n: "E", t: "Protección Ocular: Lentes o careta facial para evitar salpicaduras químicas." },
    ]
  },
  {
    id: "STD-002", cod: "STD-002", titulo: "Desagüe Industrial", cat: "instalaciones", items: [
      { id: "I1", n: "I", t: "Canalización: Efluentes conducidos por conductos cerrados sin libre escurrimiento." },
      { id: "I2", n: "I", t: "Segregación: Líquidos reactivos canalizados por conductos independientes." },
      { id: "I3", n: "I", t: "Estado de Pisos: Conductos sin desniveles ni obstrucciones que generen caídas." },
      { id: "A1", n: "A", t: "Gestión de Vuelcos: Evacuación a planta de tratamiento con registros vigentes." },
      { id: "A2", n: "A", t: "Mantenimiento: Limpieza periódica de cámaras y plantas según programa." },
      { id: "A3", n: "A", t: "Acceso y Seguridad: Plantas con iluminación, ventilación y acceso seguro." },
      { id: "E1", n: "E", t: "EPP Específico: Traje químico, guantes y calzado impermeable para limpieza." },
    ]
  },
  {
    id: "STD-003", cod: "STD-003", titulo: "Ventilación — Higiene Industrial", cat: "instalaciones", items: [
      { id: "I1", n: "I", t: "Ventilación Natural: Aberturas operables según cubaje y número de personas." },
      { id: "I2", n: "I", t: "Ventilación Mecánica: Sistemas dimensionados según caudales mínimos legales." },
      { id: "I3", n: "I", t: "Captación Localizada: Extracción efectiva en la fuente generadora del contaminante." },
      { id: "I4", n: "I", t: "Reemplazo de Aire: Entradas de aire adecuadas para compensar la extracción." },
      { id: "A1", n: "A", t: "Mantenimiento Preventivo: Filtros limpios y ductos sin obstrucciones ni ruidos." },
      { id: "A2", n: "A", t: "Calidad de Aire: Concentración de O2 y contaminantes dentro de valores admisibles." },
      { id: "E1", n: "E", t: "Refuerzo EPP: Respiradores en zonas donde el sistema no garantiza el CMP." },
    ]
  },
  {
    id: "STD-004", cod: "STD-004", titulo: "Seguridad en Máquinas (All 376E)", cat: "maquinaria", items: [
      { id: "I1", n: "I", t: "Retención: Prensas con dispositivos mecánicos/hidráulicos (cilindros con válvulas)." },
      { id: "I2", n: "I", t: "Falla Neumática: Válvulas de seguridad para evitar movimientos por corte de energía." },
      { id: "I3", n: "I", t: "Resguardos: Fijos (con herramienta) o móviles (enclavados) en zonas de peligro." },
      { id: "I4", n: "I", t: "Barreras IR: Longitud adecuada y posicionadas para evitar el 'bypass'." },
      { id: "I5", n: "I", t: "Accionamiento Bimanual: Obliga uso de ambas manos; imposible accionar con una sola." },
      { id: "I6", n: "I", t: "Parada de Emergencia: Señalizada, accesible y con indicadores visuales/sonoros." },
      { id: "I7", n: "I", t: "Reinicio Seguro: Máquina requiere rearme manual tras parada o falla de seguridad." },
      { id: "A1", n: "A", t: "CATA: Sistema de bloqueo disponible, señalizado y con candados." },
      { id: "A2", n: "A", t: "Unidad FRL: Manómetros operativos, presión correcta y purga funcional." },
      { id: "A3", n: "A", t: "CATA: Estándares de bloqueo aplicados correctamente en intervenciones." },
      { id: "E1", n: "E", t: "Vestimenta: Ropa ceñida al cuerpo, sin partes sueltas ni colgantes." },
      { id: "E2", n: "E", t: "EPP Ocular: Lentes con protección lateral fija para riesgo de proyecciones." },
    ]
  },
  {
    id: "STD-005", cod: "STD-005", titulo: "Accesorios para Izar (All 495B)", cat: "izaje", items: [
      { id: "I1", n: "I", t: "Cáncamos: Sin deformación, desgaste o aplastamiento (>10% del plano)." },
      { id: "I2", n: "I", t: "Rosca de Perno: Atornilla libremente hasta el tope sin juegos holgados." },
      { id: "I3", n: "I", t: "Grilletes: Perno original, sin deformaciones y con ID visible." },
      { id: "I4", n: "I", t: "Eslingas Nylon: Sin quemaduras térmicas/químicas, cortes ni costuras rotas." },
      { id: "I5", n: "I", t: "Eslingas Acero: Sin alambres rotos (>10 en paso), aplastamiento o corrosión." },
      { id: "I6", n: "I", t: "Eslingas Cadena: Eslabones sin fisuras, elongación ni salpicaduras de soldadura." },
      { id: "A1", n: "A", t: "Identificación: Precinto de inspección vigente y capacidad nominal visible." },
      { id: "A2", n: "A", t: "Ayuda Visual: Tabla de capacidades según modo de uso disponible en el área." },
      { id: "A3", n: "A", t: "Segregación: Elementos deteriorados (NO OK) retirados físicamente e inutilizados." },
      { id: "E1", n: "E", t: "Casco y Barbijo: Uso obligatorio durante toda la maniobra de izaje." },
      { id: "E2", n: "E", t: "Guantes y Calzado: Protección de extremidades según el accesorio (cuero/acero)." },
    ]
  },
  {
    id: "STD-006", cod: "STD-006", titulo: "Aparejos y Polipastos", cat: "izaje", items: [
      { id: "I1", n: "I", t: "Gancho: Sin fisuras ni deformaciones, con lengüeta de seguridad operativa." },
      { id: "I2", n: "I", t: "Freno de Izaje: Retiene la carga nominal sin deslizamiento (deriva)." },
      { id: "I3", n: "I", t: "Cable/Cadena: Lubricación adecuada y sin daños estructurales visibles." },
      { id: "I4", n: "I", t: "Fines de Carrera: Operativos para limitar el recorrido superior/inferior." },
      { id: "A1", n: "A", t: "Inspección Periódica: Registro semestral vigente conforme a norma All 606/607." },
      { id: "A2", n: "A", t: "Habilitación: Equipo con número SIM y carga máxima visible." },
      { id: "E1", n: "E", t: "Seguridad Personal: Casco activo en el radio de operación de la carga." },
    ]
  },
  {
    id: "STD-007", cod: "STD-007", titulo: "Puentes Grúa (All 608)", cat: "izaje", items: [
      { id: "I1", n: "I", t: "Fines de Carrera: Pruebas funcionales de izaje y traslación conformes." },
      { id: "I2", n: "I", t: "Pasteca: Ganchos, poleas y rodamientos sin defectos dimensionales." },
      { id: "I3", n: "I", t: "Acceso: Plataformas y escaleras con barandas completas y antideslizante." },
      { id: "I4", n: "I", t: "Estructura: Rieles alineados y vigas sin fisuras visibles." },
      { id: "A1", n: "A", t: "Habilitación: Operador con carnet vigente y capacitación técnica." },
      { id: "A2", n: "A", t: "Señalización: Zona de maniobra delimitada; prohibido tránsito bajo carga." },
      { id: "A3", n: "A", t: "Comunicación: Código de señales visuales definido entre operador y ayudante." },
      { id: "E1", n: "E", t: "Uniforme: Chaleco reflectivo obligatorio en plantas con tráfico mixto." },
    ]
  },
  {
    id: "STD-008", cod: "STD-008", titulo: "Grúas Móviles (All 610)", cat: "izaje", items: [
      { id: "I1", n: "I", t: "Brazo Pluma: Sin deformaciones, fisuras ni reparaciones no autorizadas." },
      { id: "I2", n: "I", t: "Hidráulica: Sin fugas en cilindros, mangueras en buen estado y válvulas flaps." },
      { id: "I3", n: "I", t: "Apoyos: Patas estabilizadoras funcionales con platos y tacos de reparto." },
      { id: "I4", n: "I", t: "Alarmas: Bocina, alarma de reversa y balizas operativas." },
      { id: "A1", n: "A", t: "Tabla de Carga: Curva de capacidades legible en cabina según radio y ángulo." },
      { id: "A2", n: "A", t: "Planificación: Registro trimestral de inspección al día." },
      { id: "E1", n: "E", t: "Protección: Casco con barbijo para todo el personal en zona de izaje." },
    ]
  },
  {
    id: "STD-009", cod: "STD-009", titulo: "Montacargas y Ascensores (All 607)", cat: "izaje", items: [
      { id: "I1", n: "I", t: "Puertas Externas: Enclavamiento mecánico y eléctrico funcional (no abre si no está ahí)." },
      { id: "I2", n: "I", t: "Puertas Internas: Operativas y mantienen la cabina aislada en movimiento." },
      { id: "I3", n: "I", t: "Sistema de Tracción: Poleas, cables y fijaciones sin desgaste excesivo." },
      { id: "I4", n: "I", t: "Freno y Posicionamiento: El equipo se detiene a nivel del piso sin saltos." },
      { id: "I5", n: "I", t: "Parada de Emergencia: Botón 'Stop' dentro de cabina y en salas de máquinas." },
      { id: "A1", n: "A", t: "Certificación: Informe de inspección semestral disponible." },
      { id: "A2", n: "A", t: "Carga Nominal: Cartel de capacidad de personas o kg claramente visible." },
      { id: "E1", n: "E", t: "Maniobra: Calzado de seguridad y guantes para carga/descarga de materiales." },
    ]
  },
  {
    id: "STD-010", cod: "STD-010", titulo: "Gas Natural — Plantas Regulación", cat: "gas", items: [
      { id: "I1", n: "I", t: "Componentes PRM: Válvula 1/4v, filtro seco, reguladores y manómetros presentes." },
      { id: "I2", n: "I", t: "Seguridad PRS: Venteos elevados a los 4 vientos en zona segura exterior." },
      { id: "I3", n: "I", t: "By-pass: Inexistencia de regulación manual en bypass (PROHIBIDO)." },
      { id: "I4", n: "I", t: "Recinto: Mampostería >150mm, puertas con apertura exterior y ventilación." },
      { id: "I5", n: "I", t: "Iluminación: Instalación antiexplosiva (Clase 1 Div 1) y nivel >150 lux." },
      { id: "A1", n: "A", t: "Operaciones: Cartel de maniobra e identificación de válvulas en sitio." },
      { id: "A2", n: "A", t: "Monitoreo: Verificación semanal de presiones registrada (All 617A)." },
      { id: "A3", n: "A", t: "Emergencia: Extintor de polvo seco 10kg base potásica vigente." },
      { id: "E1", n: "E", t: "Acceso Seguro: LEL manual antes del ingreso a recintos cerrados." },
      { id: "E2", n: "E", t: "Ropa: Uso de materiales que no generen estática en zona de riesgo." },
    ]
  },
  {
    id: "STD-011", cod: "STD-011", titulo: "Herramientas Manuales (All 612)", cat: "maquinaria", items: [
      { id: "I1", n: "I", t: "Estado General: Mangos sin astillas, filos rectos y sin rebabas en cabezas." },
      { id: "I2", n: "I", t: "Herramientas Eléctricas: Aislamiento íntegro, enchufe con tierra y sin cables pelados." },
      { id: "I3", n: "I", t: "Amoladoras/Sierras: Protector de disco instalado y cubriendo >180º de periferia." },
      { id: "I4", n: "I", t: "Aire Comprimido: Mangueras sin erosión, acoples rápidos y fusibles de aire." },
      { id: "I5", n: "I", t: "Cuchillos: Provistos de fundas, guardas de mano y puntas adecuadas." },
      { id: "A1", n: "A", t: "Almacenamiento: Lugar específico para cada herramienta tras el uso." },
      { id: "A2", n: "A", t: "Capacitación: Personal entrenado en la selección correcta de herramienta por tarea." },
      { id: "A3", n: "A", t: "Mantenimiento: Herramientas defectuosas retiradas de servicio inmediatamente." },
      { id: "E1", n: "E", t: "Protección Ocular: Gafas de seguridad obligatorias ante riesgo de proyección." },
      { id: "E2", n: "E", t: "Protección Auditiva: Uso necesario si se operan herramientas neumáticas." },
    ]
  },
  {
    id: "STD-012", cod: "STD-012", titulo: "Logística y Almacenamiento (All 596)", cat: "almacenamiento", items: [
      { id: "I1", n: "I", t: "Orden y Limpieza: Vías de circulación libres de obstáculos y pisos limpios." },
      { id: "I2", n: "I", t: "Demarcación: Sendas peatonales y líneas de pasillo claramente visibles." },
      { id: "I3", n: "I", t: "Estanterías: Sin desaplomes, largueros con gatillos y sin daños en bastidores." },
      { id: "I4", n: "I", t: "Unidad de Carga: Pallets sin roturas, mercadería estable y fajada." },
      { id: "I5", n: "I", t: "Iluminación: Nivel >250 lux en pasillos y zonas de tránsito." },
      { id: "I6", n: "I", t: "Rampas: Con barandas laterales, superficie plana y sin deformaciones." },
      { id: "A1", n: "A", t: "Preuso: Inspección diaria del autoelevador (All 588) completada." },
      { id: "A2", n: "A", t: "Habilitación: Conductores con carnet oficial y examen de agudeza visual." },
      { id: "A3", n: "A", t: "Velocidad: Respeto a límites de velocidad y giros sin derrapes." },
      { id: "E1", n: "E", t: "Seguridad: Cinturón de seguridad colocado en todo momento de operación." },
      { id: "E2", n: "E", t: "Visibilidad: Chaleco reflectivo obligatorio tanto para peatón como conductor." },
    ]
  },
  {
    id: "STD-013", cod: "STD-013", titulo: "Máquina Herramienta (All 619A)", cat: "maquinaria", items: [
      { id: "I1", n: "I", t: "Torno/Fresas: Resguardos contra proyección de virutas instalados operativos." },
      { id: "I2", n: "I", t: "Taladro Mecánico: Mandril sin proyecciones y poleas cubiertas." },
      { id: "I3", n: "I", t: "Esmeril Pedestal: Vidrio inastillable limpio y distancia a piedra <3mm." },
      { id: "I4", n: "I", t: "Mandos: Botoneras de arranque/parada identificadas y de fácil alcance." },
      { id: "A1", n: "A", t: "Hábitos: Máquina detenida totalmente para limpieza o medición." },
      { id: "A2", n: "A", t: "Orden: Superficie de trabajo libre de herramientas y materiales sueltos." },
      { id: "A3", n: "A", t: "Remoción de Virutas: Uso exclusivo de cepillo o rastrillo (prohibido manos)." },
      { id: "E1", n: "E", t: "Vestimenta: Ropa ceñida, cabello recogido y prohibición de guantes en piezas móviles." },
      { id: "E2", n: "E", t: "Protección Facial: Anteojos de seguridad con protección lateral obligatorios." },
    ]
  },
  {
    id: "STD-014", cod: "STD-014", titulo: "Aparatos a Presión (All 506)", cat: "presion", items: [
      { id: "I1", n: "I", t: "Manómetro: Rango adecuado, marca de presión de trabajo y conectado." },
      { id: "I2", n: "I", t: "Válvula Seguridad: Calibrada, visible, sin obstrucciones y con sello vigente." },
      { id: "I3", n: "I", t: "Emplazamiento: Separación >0.60m de muros y alejado de locales de pasaje." },
      { id: "I4", n: "I", t: "Purga: Sistema de purga diaria operativo (aceite/condensado/suciedad)." },
      { id: "A1", n: "A", t: "Ensayos: Registros de PH (Pruebas Hidráulicas) y UT (Espesores) al día." },
      { id: "A2", n: "A", t: "Vida Útil: Documentación de extensión de vida realizada en equipos >30 años." },
      { id: "A3", n: "A", t: "Mantenimiento: Plan preventivo documentado para cada recipiente." },
      { id: "E1", n: "E", t: "Puesto: Protector auditivo en sala de compresores/generadores." },
    ]
  },
  {
    id: "STD-015", cod: "STD-015", titulo: "Gas Natural — Cañerías (All 598A)", cat: "gas", items: [
      { id: "I1", n: "I", t: "Soportes: Anclajes suficientes que previenen esfuerzos térmicos y vibración." },
      { id: "I2", n: "I", t: "Aislamiento: Cañería sin contacto con agua, vapor o cables eléctricos." },
      { id: "I3", n: "I", t: "Cruces: Tapada >1m en caminos internos o uso de caño camisa protector." },
      { id: "I4", n: "I", t: "Enterrados: Protección catódica instalada y tapada mínima reglamentaria." },
      { id: "A1", n: "A", t: "Planos: Trazado acorde a planos vigentes aprobados." },
      { id: "A2", n: "A", t: "Estanqueidad: Pruebas de hermeticidad periódicas con registros archivados." },
      { id: "E1", n: "E", t: "Prevención: Detector LEL disponible para tareas de intervención." },
    ]
  },
  {
    id: "STD-016", cod: "STD-016", titulo: "Seguridad Legal (Decreto 351/79)", cat: "instalaciones", items: [
      { id: "I1", n: "I", t: "Sanitarios: Cantidad proporcional, agua fría/caliente y puertas de privacidad." },
      { id: "I2", n: "I", t: "Vestuarios: Armarios individuales dobles para ropa de calle/trabajo (tóxicos)." },
      { id: "I3", n: "I", t: "Comedor/Cocina: Ubicación aislada, captación de humos y condiciones de higiene." },
      { id: "I4", n: "I", t: "Medicina/HST: Locales dedicados con sala de espera y consultorio enfermería." },
      { id: "I5", n: "I", t: "Construcciones: Estructuras con cálculo resistente y materiales incombustibles." },
      { id: "A1", n: "A", t: "Gestión: Planificación HPE (Higiene y Seguridad) actualizada y disponible." },
      { id: "A2", n: "A", t: "Higiene: Programa de control de plagas y limpieza general registrado." },
    ]
  },
  {
    id: "STD-017", cod: "STD-017", titulo: "Cilindros de Gas (CO-58)", cat: "presion", items: [
      { id: "I1", n: "I", t: "Sujeción: Cilindros sujetos con cadenas o racks; capuchón en no conectados." },
      { id: "I2", n: "I", t: "Segregación: Inflamables separados físicamente de oxidantes (O2) >6m." },
      { id: "I3", n: "I", t: "Almacén: Paredes resistentes al fuego y alejados del sol directo (>50ºC)." },
      { id: "I4", n: "I", t: "Traslado: Uso obligatorio de carro específico; cilindros siempre verticales." },
      { id: "A1", n: "A", t: "Identificación: Cilindros con prueba hidráulica vigente y etiqueta de gas." },
      { id: "A2", n: "A", t: "Gestión Vacíos: Cilindros vacíos marcados y separados con capuchón puesto." },
      { id: "E1", n: "E", t: "Maniobra: Gafas y guantes de cuero para reguladores; careta para aperturas." },
    ]
  },
  {
    id: "STD-018", cod: "STD-018", titulo: "Gas Natural — Artefactos (All 597A)", cat: "gas", items: [
      { id: "I1", n: "I", t: "Prebarrido: Duración >12s-20s según potencia antes del encendido." },
      { id: "I2", n: "I", t: "Seguridad Llama: SESdeL positivo (EN 298); detector UV/IR funcional." },
      { id: "I3", n: "I", t: "Válvulas Cierre: Sistema VAC NC en serie con estanqueidad automática." },
      { id: "I4", n: "I", t: "Conexión Eléctrica: Cables antillama, borneras identificadas y toma tierra." },
      { id: "A1", n: "A", t: "Mantenimiento: Programa preventivo de quemadores y pilotos registrado." },
      { id: "A2", n: "A", t: "Alarmas: Aviso sonoro/visual ante falla de llama o presión extrema." },
      { id: "E1", n: "E", t: "Operación: Ropa ignífuga y detector CO para inspección de hornos." },
    ]
  },
  {
    id: "STD-019", cod: "STD-019", titulo: "Higiene Ambiental", cat: "instalaciones", items: [
      { id: "I1", n: "I", t: "Iluminación: Niveles medidos y conformes a tarea (Lux) según normativa." },
      { id: "I2", n: "I", t: "Ruido: Aislamiento de fuentes sonoras o cabinas para operadores." },
      { id: "I3", n: "I", t: "Temperatura: Sistemas de aclimatación operativos en zonas de estrés térmico." },
      { id: "A1", n: "A", t: "Mediciones: Protocolos anuales de iluminación y ruido vigentes." },
      { id: "A2", n: "A", t: "Control: Exámenes médicos periódicos realizados según riesgo de exposición." },
      { id: "E1", n: "E", t: "EPP Auditivo: Protectores conforme al nivel de ruido (atenuación verificada)." },
    ]
  },
];

export const CONDUCTAS_BUILTIN = [
  { id: "C1", cat: "EPP", t: "Casco y Barbijo: Uso correcto y ajuste permanente." },
  { id: "C2", cat: "EPP", t: "Protección Ocular: Uso de lentes/careta ante riesgo de proyección." },
  { id: "C3", cat: "EPP", t: "Protección Auditiva: Tapones/copas colocados en áreas ruidosas." },
  { id: "C4", cat: "EPP", t: "Protección Manual: Guantes adecuados al riesgo de la tarea." },
  { id: "C5", cat: "EPP", t: "Calzado de Seguridad: Cordones atados y puntera de acero íntegra." },
  { id: "C6", cat: "Posición", t: "Línea de Fuego: Fuera del radio de acción de partes móviles." },
  { id: "C7", cat: "Posición", t: "Ergonomía: Postura neutra y técnica correcta de levantamiento." },
  { id: "C8", cat: "Posición", t: "Distancias: Mantenimiento de espacio seguro con equipos móviles." },
  { id: "C9", cat: "Herramientas", t: "Uso Correcto: Herramienta empleada solo para su fin diseñado." },
  { id: "C10", cat: "Herramientas", t: "Estado: Sin indicios de daño, grietas o piezas sueltas." },
  { id: "C11", cat: "Procedimientos", t: "Estándar de Trabajo: Cumplimiento de pasos críticos y permisos." },
  { id: "C12", cat: "Procedimientos", t: "CATA: Bloqueo y verificación de energía cero efectivo." },
  { id: "C13", cat: "Entorno", t: "Orden y Limpieza: Área libre de derrames y materiales sueltos." },
  { id: "C14", cat: "Entorno", t: "Segregación: Residuos y materiales almacenados correctamente." },
];

export const CATS: Record<string, { label: string, icon: string, color: string }> = {
  quimico: { label: "Químico", icon: "⚗", color: "#7c3aed" },
  instalaciones: { label: "Instalaciones", icon: "🏭", color: "#0369a1" },
  maquinaria: { label: "Maquinaria", icon: "⚙", color: "#92400e" },
  izaje: { label: "Izaje", icon: "🏗", color: "#065f46" },
  almacenamiento: { label: "Almacenamiento", icon: "📦", color: "#166534" },
  presion: { label: "Presión", icon: "🔥", color: "#9f1239" },
  gas: { label: "Gas Natural", icon: "💨", color: "#0c4a6e" },
};

export const SCRIPT = `const SS = SpreadsheetApp.getActiveSpreadsheet();
function doGet(e) {
  const a=(e.parameter||{}).action||"ping";
  if(a==="standards"){
    const sh=SS.getSheetByName("Estándares");
    if(!sh) return json({ok:false,error:"Hoja no encontrada"});
    const rows=sh.getDataRange().getValues();
    const data=rows.slice(1).filter(r=>r[0]&&r[6]);
    const map={};
    data.forEach(r=>{
      const id=r[0]+"";
      if(!map[id]) map[id]={id,cod:r[1]+"",titulo:r[2]+"",cat:r[3]+"",items:[]};
      map[id].items.push({id:r[4]+"",n:(r[5]+"").toUpperCase(),t:r[6]+""});
    });
    return json({ok:true,standards:Object.values(map),ts:new Date().toISOString()});
  }
  if(a==="conductas"){
    const sh=SS.getSheetByName("Conductas_Config");
    if(!sh) return json({ok:false,error:"Hoja no encontrada"});
    const rows=sh.getDataRange().getValues();
    const data=rows.slice(1).filter(r=>r[0]&&r[2]);
    const list=data.map(r=>({id:r[0]+"",cat:r[1]+"",t:r[2]+""}));
    return json({ok:true,conductas:list,ts:new Date().toISOString()});
  }
  if(a==="plan"){
    const sh=SS.getSheetByName("Plan");
    if(!sh) return json({ok:false,error:"Hoja no encontrada"});
    const rows=sh.getDataRange().getValues();
    const data=rows.slice(1).filter(r=>r[0]&&r[1]);
    const list=data.map(r=>({fecha:r[0],inspector:r[1],tipo:r[2],stdId:r[3],lugar:r[4]}));
    return json({ok:true,plan:list,ts:new Date().toISOString()});
  }
  if(a==="sync_history"){
    const h=[];
    const shI=SS.getSheetByName("Inspecciones");
    if(shI){
      const rows=shI.getDataRange().getValues();
      rows.slice(1).filter(r=>r[0]).forEach(r=>{
        h.push({id:r[0]+"",date:r[1],type:"estandar",stdId:r[8]+"",pct:r[11],total:r[14],iper:r[15],context:{inspector:r[2],sitio:r[3],udn:r[4],area:r[5],puesto:r[6],estacion:r[7]}});
      });
    }
    const shC=SS.getSheetByName("Conductas");
    if(shC){
      const rows=shC.getDataRange().getValues();
      rows.slice(1).filter(r=>r[0]).forEach(r=>{
        h.push({id:r[0]+"",date:r[1],type:"conducta",safe:r[8],risk:r[9],total:r[10],pct:r[11],context:{inspector:r[2],sitio:r[3],udn:r[4],area:r[5],puesto:r[6],estacion:r[7]}});
      });
    }
    return json({ok:true,history:h.sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime()).slice(0,50)});
  }
  return json({ok:true,status:"conectado",ts:new Date().toISOString()});
}
function doPost(e){
  try{
    const d=JSON.parse(e.postData.contents);
    if(d.action==="seed"){
      let sh=SS.getSheetByName("Estándares")||SS.insertSheet("Estándares");
      sh.clearContents();
      sh.appendRow(["STD_ID","CÓDIGO","TÍTULO","CATEGORÍA","ÍTEM_ID","NIVEL","TEXTO"]);
      const rows=[];
      d.standards.forEach(s=>s.items.forEach(i=>rows.push([s.id,s.cod,s.titulo,s.cat,i.id,i.n,i.t])));
      if(rows.length) sh.getRange(2,1,rows.length,7).setValues(rows);
      return json({ok:true,count:rows.length});
    }
    if(d.action==="seed_conductas"){
      let sh=SS.getSheetByName("Conductas_Config")||SS.insertSheet("Conductas_Config");
      sh.clearContents();
      sh.appendRow(["ID","CATEGORÍA","CONDUCTA"]);
      const rows=d.conductas.map(c=>[c.id,c.cat,c.t]);
      if(rows.length) sh.getRange(2,1,rows.length,3).setValues(rows);
      return json({ok:true,count:rows.length});
    }
    if(d.action==="seed_plan"){
      let sh=SS.getSheetByName("Plan")||SS.insertSheet("Plan");
      sh.clearContents();
      sh.appendRow(["Fecha","Inspector","Tipo (estandar/conducta)","ID Estándar (si aplica)","Lugar"]);
      sh.appendRow([new Date().toLocaleDateString(),"Inspector Ejemplo","estandar","e1","Nave Principal"]);
      return json({ok:true});
    }
    if(d.type==="conducta"){
      let sh=SS.getSheetByName("Conductas")||SS.insertSheet("Conductas");
      if(sh.getLastRow()===0) sh.appendRow(["ID","Fecha","Inspector","Sitio","UDN","Área","Puesto","Estación","Seguros","Riesgos","Total_Items","%_Seguro","Detalle","Observaciones"]);
      sh.appendRow([d.id, d.date, d.inspector, d.sitio, d.udn, d.area, d.puesto, d.estacion, d.safe, d.risk, d.total, d.pct, d.detalle, d.observaciones]);
      return json({ok:true});
    }
    let sh=SS.getSheetByName("Inspecciones")||SS.insertSheet("Inspecciones");
    if(sh.getLastRow()===0) sh.appendRow(["ID","Fecha","Inspector","Sitio","UDN","Área","Puesto","Estación","Código_Estándar","Nombre_Estándar","Categoría","%_Cumplimiento","Total_Items","Cant_Desvíos","Suma_Puntos","Prob_IPER","Observaciones"]);
    sh.appendRow([d.id, d.date, d.inspector, d.sitio, d.udn, d.area, d.puesto, d.estacion, d.stdId, d.titulo, d.cat, d.pct, d.count, d.qDesvios, d.total, d.iper, d.observaciones]);
    return json({ok:true});
  }catch(err){return json({ok:false,error:err.message});}
}
function json(obj){return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);}`;
