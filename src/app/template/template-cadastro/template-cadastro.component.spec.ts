import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCadastroComponent } from './template-cadastro.component';

describe('TemplateCadastroComponent', () => {
  let component: TemplateCadastroComponent;
  let fixture: ComponentFixture<TemplateCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
