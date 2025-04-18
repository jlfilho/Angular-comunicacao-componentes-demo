import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-filho',
  imports: [],
  templateUrl: './filho.component.html',
  styleUrl: './filho.component.scss'
})
export class FilhoComponent {
  nome = input<string>();
  mensagem = output<string>();

  enviarMensagem() {
    this.mensagem.emit(`Olá, ${this.nome()}! Esta é uma mensagem do componente filho.`);
  }
}
