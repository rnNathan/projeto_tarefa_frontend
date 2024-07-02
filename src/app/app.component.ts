import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RodapeComponent } from './shared/components/rodape/rodape.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, RodapeComponent]
})
export class AppComponent {
  title = 'projeto_tarefa_frontend';
}
