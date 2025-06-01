import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosAdminComponent } from './pagos-admin.component';

describe('PagosAdminComponent', () => {
  let component: PagosAdminComponent;
  let fixture: ComponentFixture<PagosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagosAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
