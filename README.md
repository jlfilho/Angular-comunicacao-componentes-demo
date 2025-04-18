## 📘 **Tutorial: Comunicação entre Componentes no Angular 19**

### 🎯 **Objetivo**
Demonstrar como um componente pai envia dados para um componente filho usando `signal input()` e como o filho emite eventos para o pai usando `EventEmitter`.

---

## 🏗️ Estrutura do Projeto

```
comunicacao-componentes/
├── app/
│   ├── app.component.ts         → Componente Pai
│   ├── app.component.html
│   ├── filho/
│   │   ├── filho.component.ts   → Componente Filho
│   │   ├── filho.component.html
```

---

## 1️⃣ Criando o Projeto

```bash
ng new comunicacao-componentes-demo
cd comunicacao-componentes-demo
ng generate component filho
```

---
## 2️⃣ Componente Filho: `filho.component.ts`

```ts
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
```

### 📄 filho.component.html

```html
<h2>Componente Filho</h2>
<p>Recebi o nome: <strong>{{ nome() }}</strong></p>

<button (click)="enviarMensagem()">Enviar mensagem para o pai</button>
```

### 📄 filho.component.scss

```scss
:host {
  display: block;
  padding: 1.5rem;
  margin: 1rem auto;
  max-width: 400px;
  background-color: #f3f4f6; // cinza claro
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1f2937; // cinza escuro
}

p {
  font-size: 1.1rem;
  margin-bottom: 1rem;

  strong {
    color: #2563eb; // azul forte
  }
}

button {
  background-color: #2563eb;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1d4ed8;
  }

  &:active {
    background-color: #1e40af;
  }
}
```

---

## 3️⃣ Componente Pai: `app.component.ts`

```ts
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
```

### 📄 app.component.html

```html
<h1>Componente Pai</h1>
<p>Nome atual: {{ nomeUsuario() }}</p>

<input #nomeInput type="text" (input)="atualizarNome(nomeInput.value)" placeholder="Digite um nome" />

<p>{{ menagemFilho() }}</p>

<hr />

<app-filho
  [nome]="nomeUsuario()"
  (mensagem)="onMensagemRecebida($event)">
</app-filho>
<router-outlet />
```

### 📄 app.component.scss

```scss
:host {
  display: block;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #111827;
  text-align: center;
}

p {
  font-size: 1.1rem;
  margin: 1rem 0;
  color: #374151;

  &:last-of-type {
    font-style: italic;
    color: #1d4ed8; // azul vivo para destacar a mensagem recebida
  }
}

input {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #2563eb;
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
}

hr {
  margin: 2rem 0;
  border: none;
  border-top: 1px solid #e5e7eb;
}
``


---

## 4 ✅ Publicar no GitHub Pages

```bash
ng add angular-cli-ghpages

ng deploy <nome-projeto> --base-href=/<nome-repositorio>/
```

Substitua `<nome-projeto>` e `<nome-repositorio>` pelos nomes reais utilizados no seu projeto/repositório.

---

## ✅ Resultado Esperado

- O usuário digita um nome no componente pai.
- Esse nome é **passado como signal** para o componente filho via `[nome]="nomeUsuario"`.
- O filho **exibe o nome** e, ao clicar no botão, **emite um evento** com uma mensagem para o pai.
- O pai **recebe e trata o evento** via `(mensagem)="onMensagemRecebida($event)"`.

---

## 🧠 Dica

- `@Input() x = input(defaultValue)` permite criar **signals reativos** que respondem a mudanças no pai.
- `InputSignal<T>` é útil para acessar o valor com `x()` dentro do componente.
- `EventEmitter<T>` continua sendo a forma padrão de emitir eventos customizados de filho para pai.
