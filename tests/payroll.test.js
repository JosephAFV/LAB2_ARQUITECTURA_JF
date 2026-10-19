const {test}=require('node:test');
const assert=require('node:assert/strict');
const {calculate}=require('../shared/payroll');
test('ejemplo de la practica: redondear despues de multiplicar extras',()=>{const n=calculate({empleado_id:1,periodo:'2025-04',salario_base:1500,horas_extra:5,bono:100,descuentos:67.5});assert.equal(n.extras,46.88);assert.equal(n.neto,1579.38);});
test('rechaza entradas invalidas',()=>{for(const patch of [{periodo:'2025-13'},{salario_base:-1},{bono:'100'},{horas_extra:0.5},{empleado_id:0},{descuentos:Infinity}])assert.throws(()=>calculate({empleado_id:1,periodo:'2025-04',salario_base:1500,...patch}));});
test('sin adicionales',()=>assert.equal(calculate({empleado_id:1,periodo:'2025-04',salario_base:1000}).neto,1000));
