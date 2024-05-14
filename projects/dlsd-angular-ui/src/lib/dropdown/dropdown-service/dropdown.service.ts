import { ConnectedPosition, OverlayRef } from '@angular/cdk/overlay';
import {
  ElementRef,
  Injectable,
  InjectionToken,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { takeUntil } from 'rxjs';
import {
  ELEMENT_TEMPLATE_CONFIG,
  ElementTemplateComponent,
} from '../../element-template/element-template.component';
import overlayPositions, {
  OverlayPosition,
} from '../../overlay/overlay-positions';
import { OverlayService } from '../../overlay/overlay.service';
import {
  BaseDropdownConfig,
  DropdownOverlayConfig,
} from '../dropdown-interfaces';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  private intersectionObserver?: IntersectionObserver;
  private subDropdowns: DropdownOverlayConfig[] = [];
  private overlayRefs: OverlayRef[] = [];

  public get detach$() {
    return this.overlayService.detach$;
  }

  public get componentRef() {
    return this.overlayService.componentRef;
  }

  public get hasAttached() {
    return this.overlayService.hasAttached;
  }

  constructor(private overlayService: OverlayService) {}

  public attachSubDropdown<T extends BaseDropdownConfig, CT>(
    sourceRef: ElementRef,
    viewContainerRef: ViewContainerRef,
    component: Type<CT>,
    injectionToken: InjectionToken<T>,
    config: T
  ): void {
    this.detachSubDropdown();

    const positionStrategy = this.overlayService.defaultPositionStrategy(
      sourceRef.nativeElement,
      [
        overlayPositions.positionStrategyRight(),
        overlayPositions.positionStrategyLeft(),
      ]
    );
    const overlayRef = this.overlayService.createOverlayRef({
      positionStrategy,
      scrollStrategy: this.overlayService.scrollStrategies.reposition(),
    });
    const dropdownInjector = this.overlayService.createComponentInjector(
      injectionToken,
      config
    );
    const dropdownPortal = this.overlayService.createComponentPortal(
      component,
      dropdownInjector,
      viewContainerRef
    );
    overlayRef.attach(dropdownPortal);

    this.subscribeOutsideClickEvent(sourceRef, () => this.detachSubDropdown());
    const intersectionObserver = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        overlayRef.removePanelClass('hidden');
      } else {
        overlayRef.addPanelClass('hidden');
      }
    });
    intersectionObserver.observe(sourceRef.nativeElement);

    this.subDropdowns.push({
      overlayRef,
      intersectionObserver,
    });
  }

  public detachSubDropdown(): void {
    const subDropdown = this.subDropdowns.pop();
    if (!subDropdown?.overlayRef.hasAttached()) return;

    subDropdown.overlayRef.detach();
    subDropdown.intersectionObserver?.disconnect();
  }

  public attachDropdown<T extends BaseDropdownConfig, CT>(
    sourceRef: ElementRef,
    viewContainerRef: ViewContainerRef,
    component: Type<CT>,
    injectionToken: InjectionToken<T>,
    config: T
  ): void {
    this.detachDropdown();
    this.createOverlayWithPositions(sourceRef, config);
    this.createDropdownAndAttachToOverlay(
      viewContainerRef,
      component,
      injectionToken,
      config
    );
    if (config.attachElementRef) {
      this.attachSourceElement(sourceRef, viewContainerRef);
    }
    this.createIntersectionObserverAndObserve(sourceRef, this.overlayRefs);
    this.subscribeOutsideClickEvent(sourceRef, () => this.detachDropdown());
  }

  public detachDropdown(): void {
    this.intersectionObserver?.unobserve(
      this.overlayService.sourceNativeElement
    );
    this.overlayService.detachFromOverlay();
    let overlayRefs = this.overlayRefs.pop();
    while (overlayRefs) {
      overlayRefs.detach();
      overlayRefs = this.overlayRefs.pop();
    }
  }

  public attachSourceElement(
    sourceRef: ElementRef,
    viewContainerRef: ViewContainerRef
  ): void {
    const positionStrategy = this.overlayService.defaultPositionStrategy(
      sourceRef.nativeElement,
      [
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
          panelClass: 'column-active-element-overlay',
        },
      ]
    );
    const overlayRef = this.overlayService.createOverlayRef({
      positionStrategy,
      scrollStrategy: this.overlayService.scrollStrategies.reposition(),
      width: sourceRef.nativeElement.clientWidth,
    });
    const dropdownInjector = this.overlayService.createComponentInjector(
      ELEMENT_TEMPLATE_CONFIG,
      { viewContainerRef }
    );
    const elementRef = (sourceRef.nativeElement as HTMLElement).cloneNode(true);
    const dropdownPortal = this.overlayService.createComponentPortal(
      ElementTemplateComponent,
      dropdownInjector,
      viewContainerRef,
      [[elementRef]]
    );
    overlayRef.attach(dropdownPortal);
    this.overlayRefs.push(overlayRef);
  }

  private createOverlayWithPositions(
    sourceRef: ElementRef,
    config: BaseDropdownConfig
  ): void {
    const offsetY = config.targetRef
      ? sourceRef.nativeElement.getBoundingClientRect().top -
        config.targetRef.getBoundingClientRect().top
      : 0;
    const positions = this.getOverlayPositions(config, offsetY).map(
      (position) => {
        (position.panelClass as string[]).push(...config.hostCss);
        return { ...position, ...config.overridePositions };
      }
    );

    const positionStrategy = this.overlayService.defaultPositionStrategy(
      config.targetRef ?? sourceRef.nativeElement,
      positions
    );
    this.overlayService.createOverlay(sourceRef, {
      positionStrategy,
      scrollStrategy: this.overlayService.scrollStrategies.reposition(),
      hasBackdrop: config.hasBackdrop,
      backdropClass: 'dropdown-backdrop',
    });
  }

  private createDropdownAndAttachToOverlay<T>(
    viewContainerRef: ViewContainerRef,
    component: Type<unknown>,
    injectionToken: InjectionToken<T>,
    config: T
  ): void {
    const dropdownInjector = this.overlayService.createComponentInjector(
      injectionToken,
      config
    );
    const dropdownPortal = this.overlayService.createComponentPortal(
      component,
      dropdownInjector,
      viewContainerRef
    );
    this.overlayService.attachToOverlay(dropdownPortal);
  }

  private createIntersectionObserverAndObserve(
    elementRef: ElementRef,
    overlayRefs: OverlayRef[] = []
  ): void {
    if (!this.intersectionObserver) {
      this.intersectionObserver = new IntersectionObserver((e) => {
        if (e[0].isIntersecting) {
          this.overlayService.removePanelClass('hidden');
          overlayRefs.forEach((overlayRef) =>
            overlayRef.removePanelClass('hidden')
          );
        } else {
          this.overlayService.addPanelClass('hidden');
          overlayRefs.forEach((overlayRef) =>
            overlayRef.addPanelClass('hidden')
          );
        }
      });
    }
    this.intersectionObserver.observe(elementRef.nativeElement);
  }

  private subscribeOutsideClickEvent(
    sourceRef: ElementRef,
    callback: () => void
  ): void {
    this.overlayService.outsidePointerEvents$
      ?.pipe(takeUntil(this.overlayService.detach$))
      .subscribe((event: MouseEvent) => {
        if (sourceRef.nativeElement.contains(event.target)) return;
        callback();
      });
  }

  private getOverlayPositions(
    config: BaseDropdownConfig,
    offsetY = 0
  ): ConnectedPosition[] {
    if (!config.positions?.length) {
      return [
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          panelClass: ['bottom', ...config.hostCss],
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          panelClass: ['top', ...config.hostCss],
        },
      ];
    }

    const overlayPositionsArray: ConnectedPosition[] = [];

    for (const position of config.positions) {
      switch (position) {
        case OverlayPosition.LEFT:
          if (config.targetRef) {
            overlayPositionsArray.push({
              ...overlayPositions.positionStrategyLeft(),
              originY: 'top',
              overlayY: 'top',
              offsetY,
            });
          } else {
            overlayPositionsArray.push({
              ...overlayPositions.positionStrategyLeft(),
            });
          }
          break;
        case OverlayPosition.RIGHT:
          if (config.targetRef) {
            overlayPositionsArray.push({
              ...overlayPositions.positionStrategyRight(),
              originY: 'top',
              overlayY: 'top',
              offsetY,
            });
          } else {
            overlayPositionsArray.push({
              ...overlayPositions.positionStrategyRight(),
            });
          }
          break;
        case OverlayPosition.BOTTOM:
          overlayPositionsArray.push(overlayPositions.positionStrategyBottom());
          break;
        case OverlayPosition.TOP:
          overlayPositionsArray.push(overlayPositions.positionStrategyTop());
          break;
        default:
          break;
      }
    }
    return overlayPositionsArray;
  }
}
