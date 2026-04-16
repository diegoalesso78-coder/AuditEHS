export const STDS_BUILTIN = [
  {
    id: "STD-001", cod: "STD-001", titulo: "Riesgo Químico — SPP", cat: "quimico", items: [
      { id: "I1", n: "I", t: "Extracción/ventilación local operativa en zonas de uso de SPP" },
      { id: "I2", n: "I", t: "Contención de derrames disponible (cubetas, diques). Duchas y lavaojos operativos" },
      { id: "I3", n: "I", t: "SPP incompatibles separadas físicamente en depósito de almacenamiento" },
      { id: "A1", n: "A", t: "Hojas de Seguridad (SDS) actualizadas y accesibles para todo el personal" },
      { id: "A2", n: "A", t: "SPP en envases adecuados con etiqueta GHS visible y en buen estado" },
      { id: "A3", n: "A", t: "Prohibición fumar/llamas en zonas inflamables señalizada y respetada" },
      { id: "A4", n: "A", t: "Personal capacitado en peligros, primeros auxilios y emergencias con SPP" },
      { id: "A5", n: "A", t: "Monitoreo ambiental CMP/CMP-CPT realizado y documentado cuando aplica" },
      { id: "E1", n: "E", t: "Respirador con cartucho/filtro adecuado al tipo de contaminante" },
      { id: "E2", n: "E", t: "Guantes de protección química resistentes a la SPP manipulada" },
      { id: "E3", n: "E", t: "Lentes/careta facial para riesgo de salpicadura química" },
    ]
  },
  {
    id: "STD-002", cod: "STD-002", titulo: "Desagüe Industrial", cat: "instalaciones", items: [
      { id: "I1", n: "I", t: "Efluentes canalizados por conductos cerrados en zonas con riesgo de contaminación" },
      { id: "I2", n: "I", t: "Líquidos que pueden reaccionar entre sí canalizados por conductos SEPARADOS" },
      { id: "I3", n: "I", t: "Conductos sin desniveles que obstaculicen el tránsito o generen riesgo de caída" },
      { id: "A1", n: "A", t: "Efluentes evacuados a planta de tratamiento. Documentación de vuelcos disponible" },
      { id: "A2", n: "A", t: "Planta de tratamiento limpiada periódicamente según plan documentado" },
      { id: "A3", n: "A", t: "Personal que limpia planta con EPP específico asignado y capacitación documentada" },
      { id: "E1", n: "E", t: "Traje de protección química para tareas en planta de tratamiento" },
      { id: "E2", n: "E", t: "Guantes resistentes a efluentes + calzado impermeable con puntera de seguridad" },
    ]
  },
  {
    id: "STD-003", cod: "STD-003", titulo: "Ventilación — Calidad de Aire", cat: "instalaciones", items: [
      { id: "I1", n: "I", t: "Ventilación natural garantizada (aberturas operables) en todos los locales" },
      { id: "I2", n: "I", t: "Sistemas mecánicos dimensionados según caudales mínimos legales (Art. 66 Dec. 351/79)" },
      { id: "I3", n: "I", t: "Captación localizada en fuente para procesos generadores de contaminantes aéreos" },
      { id: "A1", n: "A", t: "Plan de mantenimiento preventivo de sistemas de ventilación con registros actualizados" },
      { id: "A2", n: "A", t: "Monitoreo ambiental periódico de contaminantes documentado" },
      { id: "A3", n: "A", t: "Sistemas sin ruidos anómalos, obstrucciones ni zonas de estancamiento" },
      { id: "E1", n: "E", t: "Respiradores cuando ventilación no garantiza concentraciones bajo CMP" },
      { id: "E2", n: "E", t: "Protección auditiva si los ventiladores generan ruido sobre el límite de exposición" },
    ]
  },
  {
    id: "STD-004", cod: "STD-004", titulo: "Máquinas — Resguardos y LOTO", cat: "maquinaria", items: [
      { id: "I1", n: "I", t: "Resguardos fijos/móviles en TODAS las zonas de atrapamiento — adecuados y sólidos" },
      { id: "I2", n: "I", t: "Resguardos móviles (puertas) impiden inicio de ciclo hasta que estén cerrados" },
      { id: "I3", n: "I", t: "Barreras IR de longitud adecuada; nadie puede quedar entre barrera y equipo" },
      { id: "I4", n: "I", t: "Parada de Emergencia señalizada, accesible, funcional con indicación lumínica/sonora" },
      { id: "I5", n: "I", t: "Sistema LOTO (bloqueo eléctrico/mecánico/hidráulico) disponible y protegido con llave" },
      { id: "A1", n: "A", t: "Procedimiento LOTO documentado y aplicado por todo el personal que interviene equipos" },
      { id: "A2", n: "A", t: "Inspección periódica de resguardos y dispositivos de seguridad con registro de desvíos" },
      { id: "A3", n: "A", t: "Capacitación de operadores en riesgos específicos y uso de dispositivos de seguridad" },
      { id: "A4", n: "A", t: "Prohibición documentada de retirar resguardos durante operación normal de la máquina" },
      { id: "E1", n: "E", t: "Lentes de seguridad con protección lateral para riesgo de proyecciones" },
      { id: "E2", n: "E", t: "Calzado de seguridad con puntera de acero en todos los puestos de operación" },
      { id: "E3", n: "E", t: "Ropa ceñida al cuerpo — sin partes sueltas en máquinas rotativas" },
    ]
  },
  {
    id: "STD-005", cod: "STD-005", titulo: "Izaje — Eslingas y Accesorios", cat: "izaje", items: [
      { id: "I1", n: "I", t: "Eslingas nylon: sin quemaduras, roturas, hoyos, costuras rotas ni abrasión excesiva" },
      { id: "I2", n: "I", t: "Eslingas acero: cable, ojales, ganchos, eslabones y guardacabos sin defectos" },
      { id: "I3", n: "I", t: "Todos los elementos con ID (precinto) y capacidad visible según modo de uso y ángulo" },
      { id: "A1", n: "A", t: "Inspección ANTES DE CADA USO por el operador + periódica por HST documentada" },
      { id: "A2", n: "A", t: "Elemento con desvío (NO OK): retirado de servicio inmediatamente, no reutilizar" },
      { id: "A3", n: "A", t: "Tabla de capacidades para cáncamos y grilletes disponible en el área de trabajo" },
      { id: "A4", n: "A", t: "Operadores habilitados con capacitación documentada en técnicas seguras de izaje" },
      { id: "E1", n: "E", t: "Casco con barbijo en zonas bajo carga suspendida" },
      { id: "E2", n: "E", t: "Guantes de cuero/anticorte para eslingas de acero + calzado con puntera de acero" },
    ]
  },
  {
    id: "STD-006", cod: "STD-006", titulo: "Aparejos y Polipastos", cat: "izaje", items: [
      { id: "I1", n: "I", t: "Gancho sin deformación, sin grietas, con seguro de retención ('lengüeta') operativo" },
      { id: "I2", n: "I", t: "Cable de acero sin alambres rotos, sin aplastamiento, con anclaje correcto al tambor" },
      { id: "I3", n: "I", t: "Freno de izaje funcional: retiene la carga nominal sin deriva" },
      { id: "I4", n: "I", t: "Poleas y rodamientos: giro libre sin ruido anormal, gargantas sin desgaste excesivo" },
      { id: "A1", n: "A", t: "Plan de inspección semestral ejecutado y documentado (All 606) con informe numerado" },
      { id: "A2", n: "A", t: "Capacidad nominal visible y legible en el equipo. Prohibido superar carga máxima" },
      { id: "A3", n: "A", t: "Defecto detectado: equipo fuera de servicio con señal visible hasta corrección documentada" },
      { id: "E1", n: "E", t: "Casco de seguridad en zonas bajo carga suspendida" },
      { id: "E2", n: "E", t: "Guantes de cuero + calzado con puntera de acero en operaciones de izaje" },
    ]
  },
  {
    id: "STD-007", cod: "STD-007", titulo: "Puente Grúa", cat: "izaje", items: [
      { id: "I1", n: "I", t: "Fines de carrera de izaje funcionales (prueba operativa verificada periódicamente)" },
      { id: "I2", n: "I", t: "Frenos de izaje y traslación (carro y puente): retención de carga sin deriva" },
      { id: "I3", n: "I", t: "Gancho, traviesa, crapodina, poleas, rodamientos y cable sin defectos (All 608)" },
      { id: "I4", n: "I", t: "Plataformas y escaleras de acceso: barandas completas, antideslizante en buen estado" },
      { id: "I5", n: "I", t: "Alineación ruedas del carro y del puente dentro de tolerancias dimensionales" },
      { id: "A1", n: "A", t: "Plan de inspección semestral ejecutado y documentado (All 608) con informe numerado" },
      { id: "A2", n: "A", t: "Operadores con habilitación vigente documentada en Lista de colaboradores" },
      { id: "A3", n: "A", t: "Zona de carga señalizada; personal no autorizado fuera del radio de acción" },
      { id: "A4", n: "A", t: "Comunicación operador/eslinguero mediante señales visuales/código definido" },
      { id: "E1", n: "E", t: "Casco de seguridad (operador y personal en zona de maniobra)" },
      { id: "E2", n: "E", t: "Guantes de cuero para manejo de eslingas + calzado con puntera de acero" },
      { id: "E3", n: "E", t: "Chaleco reflectivo en planta con circulación de autoelevadores" },
    ]
  },
  {
    id: "STD-008", cod: "STD-008", titulo: "Grúas Móviles", cat: "izaje", items: [
      { id: "I1", n: "I", t: "Pluma: sin deformaciones, fisuras ni desgaste visible" },
      { id: "I2", n: "I", t: "Sistema hidráulico: sin fugas, presión dentro de rango, válvulas de seguridad operativas" },
      { id: "I3", n: "I", t: "Izaje, elevación y extensión de pluma: prueba funcional satisfactoria" },
      { id: "I4", n: "I", t: "Cable de izaje: sin roturas de alambres, sin kinking ni aplastamiento" },
      { id: "A1", n: "A", t: "Plan de inspección trimestral ejecutado y documentado (All 610)" },
      { id: "A2", n: "A", t: "Tabla de cargas en cabina; operador conoce límites por radio y ángulo de pluma" },
      { id: "A3", n: "A", t: "Área de trabajo delimitada; personal no autorizado fuera del radio de caída" },
      { id: "E1", n: "E", t: "Casco, calzado con puntera y guantes en zona de maniobra" },
      { id: "E2", n: "E", t: "Chaleco de alta visibilidad en áreas de circulación de equipos" },
    ]
  },
  {
    id: "STD-009", cod: "STD-009", titulo: "Montacargas y Ascensores", cat: "izaje", items: [
      { id: "I1", n: "I", t: "Izaje y posicionamiento del equipo: prueba funcional satisfactoria" },
      { id: "I2", n: "I", t: "Puertas fijas y móviles en buen estado, sin deformaciones que impidan cierre correcto" },
      { id: "I3", n: "I", t: "Motor de izaje: sin anomalías; freno operativo y retiene carga nominal sin deriva" },
      { id: "I4", n: "I", t: "Rieles guía sin deformaciones, correctamente lubricados, sin objetos obstructores" },
      { id: "A1", n: "A", t: "Plan de inspección semestral ejecutado y documentado (All 607)" },
      { id: "A2", n: "A", t: "Capacidad máxima visible y legible. Prohibido superar carga nominal" },
      { id: "A3", n: "A", t: "Defecto: equipo fuera de servicio con señal visible hasta corrección aprobada" },
      { id: "E1", n: "E", t: "Calzado con puntera en operaciones de carga/descarga de la plataforma" },
      { id: "E2", n: "E", t: "Guantes para manejo de materiales durante carga de la plataforma" },
    ]
  },
  {
    id: "STD-010", cod: "STD-010", titulo: "Gas Natural — General", cat: "gas", items: [
      { id: "I1", n: "I", t: "Válvulas de bloqueo sectoriales de cierre rápido y manual accesibles en cada nave/local" },
      { id: "I2", n: "I", t: "Presión de distribución interna máxima 3,95 bar M dentro de locales de trabajo" },
      { id: "I3", n: "I", t: "PRS y PRM: presiones de entrada y salida dentro de valores límite según normativa" },
      { id: "I4", n: "I", t: "Juntas/cuplas dieléctricas entre cañería subterránea y aérea, en lugar accesible" },
      { id: "A1", n: "A", t: "Verificación semanal de presiones PRS/PRM documentada en All 617A" },
      { id: "A2", n: "A", t: "Prueba funcional semanal de llaves de paso: operativas y con manija presente" },
      { id: "A3", n: "A", t: "Procedimiento de emergencia ante fuga conocido: corte, evacuación, ventilación" },
      { id: "A4", n: "A", t: "Prohibición de fumar/llamas señalizada y respetada en zonas de instalaciones de gas" },
      { id: "E1", n: "E", t: "Detector de gas portátil (LEL) obligatorio en tareas de mantenimiento" },
      { id: "E2", n: "E", t: "Ropa y calzado antiestático en zonas con riesgo de atmósfera explosiva" },
    ]
  },
  {
    id: "STD-011", cod: "STD-011", titulo: "Herramientas Manuales", cat: "maquinaria", items: [
      { id: "I1", n: "I", t: "Herramientas eléctricas con doble aislación o tierra verificada; cable sin daños" },
      { id: "I2", n: "I", t: "Amoladoras con guarda en posición correcta; disco sin fisuras ni exceso de desgaste" },
      { id: "I3", n: "I", t: "Lugar específico de almacenamiento para herramientas (panel, caja, porta-herramientas)" },
      { id: "A1", n: "A", t: "Herramienta inspeccionada ANTES DE CADA USO: mango, filo, zonas de ajuste" },
      { id: "A2", n: "A", t: "Herramienta adecuada para cada tarea; prohibido sustituir una por otra" },
      { id: "A3", n: "A", t: "Herramientas defectuosas reportadas al supervisor y sustituidas inmediatamente" },
      { id: "A4", n: "A", t: "Transporte en caja/porta-herramientas; durante trabajo en lugar seguro" },
      { id: "A5", n: "A", t: "Personal capacitado en uso correcto de cada tipo de herramienta" },
      { id: "E1", n: "E", t: "Lentes/careta facial para amoladoras, siérras y taladros (proyecciones)" },
      { id: "E2", n: "E", t: "Guantes anticorte para filos; protección auditiva para herramientas neumáticas" },
      { id: "E3", n: "E", t: "Calzado de seguridad con puntera en todos los puestos con herramientas" },
    ]
  },
  {
    id: "STD-012", cod: "STD-012", titulo: "Almacenamiento — Autoelevadores", cat: "almacenamiento", items: [
      { id: "I1", n: "I", t: "Vías de circulación demarcadas; sendas peatonales y cruces señalizados con pintura" },
      { id: "I2", n: "I", t: "Accesos independientes peatón/autoelevador; espejos parabólicos en intersecciones" },
      { id: "I3", n: "I", t: "Pisos uniformes y limpios; iluminación mayor o igual a 250 Lux en vías" },
      { id: "I4", n: "I", t: "Estanterías sin daños estructurales conforme a estándar All 596-2/3/4/5" },
      { id: "I5", n: "I", t: "Rampas de carga seguras: bloqueo del camión, rampa en buen estado, barandas" },
      { id: "A1", n: "A", t: "Inspección de preuso del autoelevador (All 588) antes de cada turno" },
      { id: "A2", n: "A", t: "Operadores con habilitación vigente; examen oftalmológico vigente documentado" },
      { id: "A3", n: "A", t: "Cargas solo en áreas asignadas; pasillos libres de obstáculos y limpios" },
      { id: "A4", n: "A", t: "Prohibición de transportar personas en horquillas o sobre la carga" },
      { id: "A5", n: "A", t: "Velocidad máxima definida, señalizada y respetada en cada zona" },
      { id: "E1", n: "E", t: "Casco en zonas con riesgo de caída de objetos durante operaciones de izaje" },
      { id: "E2", n: "E", t: "Chaleco de alta visibilidad para operadores y peatones en zonas compartidas" },
      { id: "E3", n: "E", t: "Cinturón de seguridad del autoelevador: uso obligatorio en toda operación" },
    ]
  },
  {
    id: "STD-013", cod: "STD-013", titulo: "Máquinas Herramienta — Tornos/Fresadoras", cat: "maquinaria", items: [
      { id: "I1", n: "I", t: "Resguardo contra proyecciones y salpicaduras instalado y en posición correcta" },
      { id: "I2", n: "I", t: "Sistema de enclavamiento operativo: impide accionamiento con resguardos abiertos" },
      { id: "I3", n: "I", t: "Parada de emergencia accesible desde el puesto de operación; funcional" },
      { id: "I4", n: "I", t: "Espacio suficiente alrededor de cada máquina para realizar el trabajo seguro" },
      { id: "A1", n: "A", t: "Operador con ropa ceñida al cuerpo; cabello largo protegido (cofia/gorra)" },
      { id: "A2", n: "A", t: "Máquina DETENIDA antes de medir, limpiar o realizar cualquier ajuste" },
      { id: "A3", n: "A", t: "LOTO aplicado en mantenimiento, reparación y ajuste de piezas" },
      { id: "A4", n: "A", t: "Virutas removidas con cepillo/rastrillo; NUNCA con manos ni aire comprimido directo" },
      { id: "E1", n: "E", t: "Lentes con protección lateral — USO OBLIGATORIO en todo torneado y fresado" },
      { id: "E2", n: "E", t: "Guantes anticorte SOLO con máquina DETENIDA para remoción de virutas" },
      { id: "E3", n: "E", t: "Calzado con puntera de acero + protección auditiva si el nivel de ruido supera el límite" },
    ]
  },
  {
    id: "STD-014", cod: "STD-014", titulo: "Aparatos a Presión Sin Fuego", cat: "presion", items: [
      { id: "I1", n: "I", t: "Distancia mayor o igual a 0,60 m de muros medianeros; local NO usado como pasaje de personal" },
      { id: "I2", n: "I", t: "Manómetro: escala max = 2 x PMT; MARCA en presión de trabajo; conectado al circuito" },
      { id: "I3", n: "I", t: "Válvula de seguridad a resorte accesible, calibrada, con sello de inspección vigente" },
      { id: "I4", n: "I", t: "Elemento de corte automático por sobrepresión en generador de presión: funcional" },
      { id: "I5", n: "I", t: "Purga de fondo instalada y ejecutada con frecuencia definida en plan de mantenimiento" },
      { id: "A1", n: "A", t: "All 506 aprobado por HST ANTES de instalar cualquier recipiente nuevo o usado" },
      { id: "A2", n: "A", t: "All 592 completado con documentación técnica de válvula (norma ANSI/API/ASME)" },
      { id: "A3", n: "A", t: "Plan de mantenimiento preventivo documentado para cada recipiente; registros archivados" },
      { id: "A4", n: "A", t: "Regla 30 años: equipos con 30 o más años con ensayos de extensión de vida útil realizados" },
      { id: "A5", n: "A", t: "Tanques de aire: limpieza periódica + purga DIARIA de condensado, aceite y suciedad" },
      { id: "E1", n: "E", t: "Careta facial y guantes resistentes al calor para purgas y maniobras bajo presión" },
      { id: "E2", n: "E", t: "Calzado con puntera de acero + protección auditiva en sala de compresores" },
      { id: "E3", n: "E", t: "Detector de gas portátil cuando el fluido contenido sea gas inflamable o tóxico" },
    ]
  },
  {
    id: "STD-015", cod: "STD-015", titulo: "Gas Natural — Cañerías", cat: "gas", items: [
      { id: "I1", n: "I", t: "Cañerías enterradas: tapada mayor o igual a 600 mm, protección catódica, sin contacto con otras cañerías" },
      { id: "I2", n: "I", t: "Cañerías aéreas: soportes suficientes, aisladas de cañerías de agua, vapor y electricidad" },
      { id: "I3", n: "I", t: "Cruces de caminos internos: tapada mayor o igual a 1 metro O caño camisa según tipo de terreno" },
      { id: "I4", n: "I", t: "Cañerías con P mayor a 0,197 bar M encamisadas con ventilación exterior si cruzan oficinas" },
      { id: "A1", n: "A", t: "Tendido conforme a planos vigentes; toda modificación reflejada en planos actualizados" },
      { id: "A2", n: "A", t: "Inspección y prueba de pérdidas periódica documentada (detector de gas o agua jabonosa)" },
      { id: "A3", n: "A", t: "Procedimiento de emergencia ante fuga conocido y practicado por el personal del sector" },
      { id: "E1", n: "E", t: "Detector de gas portátil (LEL) antes de cualquier trabajo sobre cañerías de gas" },
      { id: "E2", n: "E", t: "Ropa y calzado antiestático en zonas con riesgo de atmósfera explosiva por gas" },
    ]
  },
  {
    id: "STD-016", cod: "STD-016", titulo: "Gas Natural — PRM", cat: "gas", items: [
      { id: "I1", n: "I", t: "PRM con componentes obligatorios: válvula 1/4v entrada, filtro seco, reguladores, manómetros, válvulas seguridad, sistema medición" },
      { id: "I2", n: "I", t: "Dispositivo de seguridad integrado: válvula bloqueo por sobrepresión + válvula alivio por venteo" },
      { id: "I3", n: "I", t: "Recinto PRM: mampostería mayor o igual a 150 mm, techo incombustible mayor o igual a 2700 mm, dos puertas metálicas de apertura exterior" },
      { id: "I4", n: "I", t: "Ventilación del recinto: mayor o igual a 5% superficie lateral (80% superior + 20% inferior en zona segura)" },
      { id: "I5", n: "I", t: "Iluminación antiexplosiva Clase 1 Div. 1 mayor o igual a 150 lux; extintor polvo seco 10 kg vigente" },
      { id: "A1", n: "A", t: "Verificación semanal de presiones PRM en All 617A: entrada menor a 3,7 kg, salida menor a 20 gr" },
      { id: "A2", n: "A", t: "Prueba funcional semanal de llaves de paso y manijas documentada en All 617A" },
      { id: "A3", n: "A", t: "Cartel PROHIBIDO FUMAR en acceso; ingreso solo personal autorizado con llave de seguridad" },
      { id: "A4", n: "A", t: "Plan de mantenimiento preventivo documentado para todos los componentes de la PRM" },
      { id: "E1", n: "E", t: "Detector de gas portátil (LEL/CH4) obligatorio antes de ingresar al recinto PRM" },
      { id: "E2", n: "E", t: "Ropa antiestática y calzado antiestático para todo trabajo dentro del recinto PRM" },
    ]
  },
  {
    id: "STD-017", cod: "STD-017", titulo: "Gas Natural — PRS", cat: "gas", items: [
      { id: "I1", n: "I", t: "PRS con componentes obligatorios: válvula bloqueo 1/4v, reguladores, manómetros con llaves, venteos manuales" },
      { id: "I2", n: "I", t: "Venteos de reguladores elevados a los cuatro vientos en zona segura exterior" },
      { id: "I3", n: "I", t: "Sin by-pass de regulación manual en la PRS (PROHIBIDO por normativa)" },
      { id: "A1", n: "A", t: "Verificación semanal de presiones PRS en All 617A; valores fuera de límite comunicados sin demora" },
      { id: "A2", n: "A", t: "Prueba funcional semanal de llaves de paso documentada; llave operativa y manija presente" },
      { id: "A3", n: "A", t: "PRS identificada (PRS Nro x), accesible y protegida; plan de mantenimiento activo y registrado" },
      { id: "E1", n: "E", t: "Detector de gas portátil (LEL) antes de cualquier intervención en la PRS" },
      { id: "E2", n: "E", t: "Ropa antiestática y guantes de cuero para maniobra de válvulas en la PRS" },
    ]
  },
  {
    id: "STD-018", cod: "STD-018", titulo: "Gas Natural — Artefactos Industriales", cat: "gas", items: [
      { id: "I1", n: "I", t: "Prebarrido: menor o igual a 360 kW mínimo 12 s; mayor a 360 kW mínimo 20 s con caudal de aire total" },
      { id: "I2", n: "I", t: "SESdeL (EN 298): seguridad positiva ante fallas internas; tiempos no modificables por operador" },
      { id: "I3", n: "I", t: "VAC NC según potencia: menor o igual a 720 kW = 2 en serie (cierre menor o igual a 1 s; apertura mayor o igual a 5 s)" },
      { id: "I4", n: "I", t: "Tren de válvulas: filtro mayor o igual a 50 micrones, manómetros, válvulas esféricas 1/4v, sin by-pass sobre VAC" },
      { id: "I5", n: "I", t: "Detector de llama (DdeL) UV/ionización/IR pulsante funcional y en posición correcta" },
      { id: "A1", n: "A", t: "Programa preventivo de mantenimiento documentado: quemadores, pilotos, VAC, presóstatos, DdeL" },
      { id: "A2", n: "A", t: "Prueba funcional periódica de cierre y rearranque para constatar funcionamiento de controles automáticos" },
      { id: "A3", n: "A", t: "Alarma visual y sonora operativa ante parada de seguridad (falta de llama, alta/baja presión)" },
      { id: "A4", n: "A", t: "Operadores capacitados en secuencias arranque/parada, alarmas y procedimiento de emergencia" },
      { id: "E1", n: "E", t: "Detector de gas portátil (LEL/CO) para inspecciones internas y trabajos en quemadores" },
      { id: "E2", n: "E", t: "Ropa ignífuga y careta facial para maniobras en hornos calientes o apertura de puertas de inspección" },
      { id: "E3", n: "E", t: "Calzado de seguridad con puntera y suela antideslizante resistente al calor en zonas de artefactos" },
    ]
  },
  {
    id: "STD-019", cod: "STD-019", titulo: "Cilindros de Gas — C.O. 58", cat: "presion", items: [
      { id: "I1", n: "I", t: "Cilindros sujetos en facilidades (cadenas/racks); capuchón en TODOS los no conectados" },
      { id: "I2", n: "I", t: "Gases inflamables separados físicamente de oxidantes (O2) en almacén — distancia mayor o igual a 6m o muro RF" },
      { id: "I3", n: "I", t: "Local con paredes resistentes al fuego; carteles visibles con peligros y disposición de recipientes" },
      { id: "I4", n: "I", t: "Alejados de sol directo, fuentes de calor e intensa humedad; temperatura local menor o igual a 50°C" },
      { id: "I5", n: "I", t: "Carro de traslado manual (Anexo 4 C.O. 58) disponible y utilizado en todos los traslados internos" },
      { id: "A1", n: "A", t: "Cilindros llenos y vacíos perfectamente separados e identificados; vacíos con capuchón colocado" },
      { id: "A2", n: "A", t: "PROHIBIDO almacenar tubos/cilindros (llenos o vacíos) en puestos de trabajo o producción" },
      { id: "A3", n: "A", t: "Acetileno: sin cobre en accesorios (Cu menor o igual a 70% en aleaciones); VERTICAL mayor o igual a 12h antes de usar" },
      { id: "A4", n: "A", t: "PROHIBIDO usar grasas/aceites en orificios o accesorios de cilindros de O2 o gases oxidantes" },
      { id: "A5", n: "A", t: "Elevación con autoelevador: SOLO con canasto específico (Anexo 3 C.O. 58)" },
      { id: "A6", n: "A", t: "Fecha de prueba hidráulica vigente visible en el cilindro; NO usar cilindros con prueba vencida" },
      { id: "E1", n: "E", t: "Lentes y guantes de cuero para conexión/desconexión de reguladores y mangueras" },
      { id: "E2", n: "E", t: "Careta facial completa para apertura de válvulas de alta presión" },
      { id: "E3", n: "E", t: "Detector de gas portátil (LEL según tipo de gas) antes de ingresar a locales de almacenamiento cerrados" },
    ]
  },
];

export const CONDUCTAS_BUILTIN = [
  { id: "C1", cat: "EPP", t: "Uso correcto de casco y barbijo" },
  { id: "C2", cat: "EPP", t: "Uso de protección ocular/facial" },
  { id: "C3", cat: "EPP", t: "Uso de protección auditiva" },
  { id: "C4", cat: "EPP", t: "Uso de guantes adecuados a la tarea" },
  { id: "C5", cat: "EPP", t: "Calzado de seguridad en buen estado" },
  { id: "C6", cat: "Posición", t: "Evita 'Línea de Fuego' (atrapamiento/golpe)" },
  { id: "C7", cat: "Posición", t: "Postura ergonómica al levantar/mover cargas" },
  { id: "C8", cat: "Posición", t: "Mantiene distancia segura de equipos móviles" },
  { id: "C9", cat: "Herramientas", t: "Uso de herramienta correcta para el trabajo" },
  { id: "C10", cat: "Herramientas", t: "Herramientas en buen estado (no hechizas)" },
  { id: "C11", cat: "Procedimientos", t: "Sigue el estándar de trabajo/permiso" },
  { id: "C12", cat: "Procedimientos", t: "Aplica LOTO/Bloqueo cuando corresponde" },
  { id: "C13", cat: "Entorno", t: "Mantiene orden y limpieza en el área" },
  { id: "C14", cat: "Entorno", t: "Almacenamiento seguro de materiales" },
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
      if(sh.getLastRow()===0) sh.appendRow(["ID","Fecha","Inspector","Sitio","UDN","Área","Puesto","Estación","Seguros","Riesgos","Total","% Seguro","Detalle"]);
      sh.appendRow([d.id,d.date,d.inspector,d.sitio,d.udn,d.area,d.puesto,d.estacion,d.safe,d.risk,d.total,d.pct,JSON.stringify(d.results)]);
      return json({ok:true});
    }
    let sh=SS.getSheetByName("Inspecciones")||SS.insertSheet("Inspecciones");
    if(sh.getLastRow()===0) sh.appendRow(["ID","Fecha","Inspector","Sitio","UDN","Área","Puesto","Estación","Código","Estándar","Categoría","% Cumpl.","Ítems","Desvíos","Prob.IPER"]);
    sh.appendRow([d.id,d.date,d.inspector,d.sitio,d.udn,d.area,d.puesto,d.estacion,d.stdId,d.titulo,d.cat,d.pct,d.count,d.total,d.iper]);
    return json({ok:true});
  }catch(err){return json({ok:false,error:err.message});}
}
function json(obj){return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);}`;
