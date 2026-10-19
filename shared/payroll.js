function calculate(body){
 const {empleado_id,periodo,salario_base,horas_extra=0,bono=0,descuentos=0}=body;
 if(!Number.isSafeInteger(empleado_id)||empleado_id<=0||typeof periodo!=='string'||!/^\d{4}-(0[1-9]|1[0-2])$/.test(periodo))throw Object.assign(new Error('empleado_id positivo y periodo YYYY-MM requeridos'),{status:400});
 if(![salario_base,horas_extra,bono,descuentos].every(n=>typeof n==='number'&&Number.isFinite(n)&&n>=0)||salario_base<=0||!Number.isInteger(horas_extra))throw Object.assign(new Error('Valores monetarios no negativos y horas enteras requeridos'),{status:400});
 const round=n=>Math.round((n+Number.EPSILON)*100)/100;
 const extras=round(horas_extra*salario_base/240*1.5);
 return {empleado_id,periodo,salario_base,horas_extra,bono,descuentos,valor_hora_extra:round(salario_base/240*1.5),extras,neto:round(salario_base+extras+bono-descuentos)};
}module.exports={calculate};
