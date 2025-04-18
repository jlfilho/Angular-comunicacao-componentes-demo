import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilhoComponent } from './filho/filho.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FilhoComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'comunicacao-componentes-demo';
  nomeUsuario = signal('João');
  menagemFilho = signal('');

  atualizarNome(novoNome: string) {
    this.nomeUsuario.set(novoNome);
  }

  onMensagemRecebida(mensagem: string = '') {
    this.menagemFilho.set(`Mensagem do filho: ${mensagem}`);
  }
}
