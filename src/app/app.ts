import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CurrencyPipe, CommonModule } from '@angular/common';

export interface Movimiento {
  descripcion: string;
  monto: number;
  tipo: 'ingreso' | 'gasto';
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CurrencyPipe, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('calculadora-presupuesto');

  // movimientos: Movimiento[] = [
  //   { descripcion: 'Salario', monto: 3000, tipo: 'ingreso' },
  //   { descripcion: 'Alquiler', monto: 1000, tipo: 'gasto' },
  //   { descripcion: 'Comida', monto: 500, tipo: 'gasto' },
  //   { descripcion: 'Freelance', monto: 800, tipo: 'ingreso' },
  // ];

  movimientos: Movimiento[] = [];

  borrador: Movimiento = {
    descripcion: '',
    monto: 0,
    tipo: 'gasto',
  };

  agregarMovimiento() {
    if (this.borrador.monto > 0 && this.borrador.descripcion.trim() !== '') {
      this.movimientos.push({ ...this.borrador });

      this.borrador.descripcion = '';
      this.borrador.monto = 0;

      console.log('¡Guardado con éxito!', this.movimientos);
    } else {
      alert('papi, ingresa algo papi');
    }
  }

  get totalPresupuesto(): number {
    let total = 0;
    this.movimientos.forEach(item => {
      if (item.tipo === 'ingreso') {
        total += item.monto;
      } else {
        total -= item.monto;
      }
    });
    return total;
  }
}
