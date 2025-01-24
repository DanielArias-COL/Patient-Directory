function generarCombinacionesPosibles(elementos, repeticiones) {
    let contador = 1; 
    let combinaciones = [];
  
    
    for (let i = 0; i < elementos; i++) {
      combinaciones.push(i.toString());
    }
  
    
    if (repeticiones === 1) {
      return combinaciones;
    }
  
    while (contador < repeticiones) {
      let combinacionesAuxiliares = [];

      for (let i = 0; i < elementos; i++) {
        for (let j = 0; j < combinaciones.length; j++) {
          combinacionesAuxiliares.push(combinaciones[j] + i);
        }
      }
  
      combinaciones = [...combinacionesAuxiliares]; 
      contador++;
    }
  
    return combinaciones;
}
  
function calcularMinimoMedicos(doctorCapacities, attentionHours) {
    let cantidadMedicos = 1;
    let control = 0;
    let resultado = -1; 
  
    while (control !== -1) {
        
        let combinacionesDePacientes = generarCombinacionesPosibles(
            doctorCapacities.length,
            cantidadMedicos
        );
  
        
        combinacionesDePacientes.forEach((combinacion) => {
            let sumaHoras = 0;
            let combinacionArray = Array.from(combinacion);
        
            for (let i = 0; i < cantidadMedicos; i++) {
                sumaHoras += doctorCapacities[parseInt(combinacionArray[i])];
            }
  
            
            if (sumaHoras === attentionHours) {
                resultado = cantidadMedicos;  
            }
        
            if (sumaHoras < attentionHours) {
                control += 1;
            }
        });
  
        if (resultado !== -1) {
            return resultado;  
        }
  
        if (control === 0) {
            control = -1;
        } else {
            control = 0;
        }
  
        cantidadMedicos++; 
    }
  
    return resultado; 
}

  const testCases = [
      { doctorCapacities: [3, 5, 8], attentionHours: 14, expected: 3 },
      { doctorCapacities: [10, 1, 3], attentionHours: 15, expected: 4 },
      { doctorCapacities: [2, 2, 2], attentionHours: 6, expected: 3 },
      { doctorCapacities: [10, 4, 13], attentionHours: 9, expected: -1 },
      { doctorCapacities: [1], attentionHours: 2, expected: 2 },
      { doctorCapacities: [], attentionHours: 1, expected: -1 },
  ];
  
  testCases.forEach(({ doctorCapacities, attentionHours, expected }, index) => {
      const result = calcularMinimoMedicos(doctorCapacities, attentionHours);
      console.log(
          `Prueba ${index + 1}: ` +
          `Capacidades: ${doctorCapacities}, Horas necesarias: ${attentionHours}, ` +
          `Esperado: ${expected}, Resultado: ${result}, ` +
          `¿Correcto? ${result === expected ? "✅" : "❌"}`
      );
  });
  