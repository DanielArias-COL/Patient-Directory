

doctorCapacities = [3, 5, 8];
attentionHours = 14;


console.log(calcularMinimoDoctors(doctorCapacities, attentionHours));


function calcularMinimoDoctors(doctorCapacities, attentionHours) {
    doctorCapacities.sort((a, b) => b - a);

    let countAttentionHours = 0;  
    for (let i = 0; i < doctorCapacities.length; i++) {
        countAttentionHours += doctorCapacities[i]; 
        if (countAttentionHours >= attentionHours) {
            return i + 1; 
        }
    }

    return -1;  
}
