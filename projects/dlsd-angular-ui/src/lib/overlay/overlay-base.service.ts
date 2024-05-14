import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ComponentRef,
  Injectable,
  InjectionToken,
  Injector,
  Type,
  ViewContainerRef,
  signal,
} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OverlayBaseService {
  private _overlayRef = signal<OverlayRef | undefined>(undefined);
  get overlayRef() {
    return this._overlayRef.asReadonly();
  }

  private _componentRef = signal<ComponentRef<unknown> | undefined>(undefined);
  get componentRef() {
    return this._componentRef.asReadonly();
  }

  private _detach$ = new Subject<void>();
  get detach$() {
    return this._detach$.asObservable();
  }

  get hasAttached() {
    return this.overlayRef()?.hasAttached();
  }

  constructor(protected overlay: Overlay) {}

  attachToOverlay<T>(componentPortal: ComponentPortal<T>): void {
    const overlayRef = this.overlayRef();
    if (!overlayRef || overlayRef.hasAttached()) return;

    const componentRef = overlayRef.attach(componentPortal);
    this._componentRef.set(componentRef);
  }

  createComponentInjector<T>(
    token: InjectionToken<T>,
    useValue: Partial<T>
  ): Injector {
    return Injector.create({
      providers: [
        {
          provide: token,
          useValue,
        },
      ],
    });
  }

  createComponentPortal<T>(
    component: Type<T>,
    injector?: Injector,
    viewContainerRef?: ViewContainerRef,
    projectableNodes?: Node[][]
  ): ComponentPortal<T> {
    return new ComponentPortal(
      component,
      viewContainerRef,
      injector,
      undefined,
      projectableNodes
    );
  }

  createOverlayRef(overlayConfig?: OverlayConfig): OverlayRef {
    return this.overlay.create(overlayConfig);
  }

  detachFromOverlay(): void {
    this._detach$.next();
    this._overlayRef()?.detach();
    this._componentRef()?.destroy();
    this._componentRef.set(undefined);
  }

  addPanelClass(className: string): void {
    return this._overlayRef()?.addPanelClass(className);
  }

  removePanelClass(className: string): void {
    return this._overlayRef()?.removePanelClass(className);
  }

  protected createAndSetOverlayRef(overlayConfig?: OverlayConfig): void {
    this._overlayRef.set(this.overlay.create(overlayConfig));
  }
}
