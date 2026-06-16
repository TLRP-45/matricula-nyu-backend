import { sum } from "./suma";

describe('calculadora', () => {
    it('debe sumar dos números', () =>{
        expect(sum(2,2)).toBe(4);
    });
});

/**
 * describe() - agrupa pruebas relacionadas
 * it() o test() - define una prueba individual
 * expect() - realiza una comprobación
 */