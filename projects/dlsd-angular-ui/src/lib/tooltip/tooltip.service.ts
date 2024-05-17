import { ConnectedPosition } from '@angular/cdk/overlay';
import { ElementRef, Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, filter, fromEvent, takeUntil, timer } from 'rxjs';
import overlayPositions from '../overlay/overlay-positions';
import { OverlayService } from '../overlay/overlay.service';
import {
  TOOLTIP_CONFIG,
  TooltipContext,
  TooltipTemplateComponent,
} from './tooltip-template/tooltip-template.component';

interface TooltipArrowOffsets {
  x?: number;
  y?: number;
  calculateY?: boolean;
  calculateX?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TooltipService {
  private readonly position$ = new BehaviorSubject<{
    arrowX: number;
    arrowY: number;
  }>({ arrowX: 0, arrowY: 0 });

  constructor(private overlayService: OverlayService) {}

  public attachTooltip(
    sourceRef: ElementRef,
    viewContainerRef: ViewContainerRef,
    context: TooltipContext,
    arrowOffsets: {
      x?: number;
      y?: number;
      calculateY?: boolean;
      calculateX?: boolean;
    } = { x: 0, y: 0 },
    delay = 0
  ): void {
    this.detachTooltip();
    this.subscribeMouseEvent(sourceRef);

    timer(delay)
      .pipe(takeUntil(this.overlayService.detach$))
      .subscribe(() => {
        this.createOverlayWithPositions(sourceRef);
        this.createTooltipAndAttachToOverlay(context, viewContainerRef);

        setTimeout(() => {
          this.overlayService.componentRef()?.changeDetectorRef.detectChanges();
          this.nextPosition(
            sourceRef,
            this.overlayService.overlayElementRect!,
            arrowOffsets
          );
          this.subscribeOutsideClickEvent(sourceRef);
        });
      });
  }

  public detachTooltip(): void {
    this.overlayService.detachFromOverlay();
  }

  private createTooltipAndAttachToOverlay(
    context: TooltipContext,
    viewContainerRef: ViewContainerRef
  ): void {
    const tooltipInjector = this.overlayService.createComponentInjector(
      TOOLTIP_CONFIG,
      {
        context,
        position$: this.position$.asObservable(),
        close: () => this.detachTooltip(),
      }
    );
    const tooltipPortal = this.overlayService.createComponentPortal(
      TooltipTemplateComponent,
      tooltipInjector,
      viewContainerRef
    );
    this.overlayService.attachToOverlay(tooltipPortal);
    this.overlayService.componentRef()?.onDestroy(() => {
      this.detachTooltip();
    });
  }

  private createOverlayWithPositions(sourceRef: ElementRef): void {
    // const overlayPositions = this.getOverlayPositions().map((position) => ({
    //   ...position,
    //   panelClass: [...(position.panelClass as string[]), ...hostCss],
    //   ...overridePositions,
    // }));
    const positionStrategy = this.overlayService.defaultPositionStrategy(
      sourceRef.nativeElement,
      [overlayPositions.positionStrategyTop()]
    );
    this.overlayService.createOverlay(sourceRef, {
      positionStrategy,
      scrollStrategy: this.overlayService.scrollStrategies.close(),
      hasBackdrop: false,
    });
  }

  private getOverlayPositions(): ConnectedPosition[] {
    return [overlayPositions.positionStrategyTop()];
  }

  private calculateArrowPositions(
    elementRef: ElementRef,
    overlayElementRect: DOMRect,
    arrowOffsetX = 0,
    arrowOffsetY = 0,
    calculateX = true,
    calculateY = true
  ): { arrowX: number; arrowY: number } {
    const elementRect = elementRef.nativeElement.getBoundingClientRect();
    const arrowX = calculateX
      ? elementRect.left -
        overlayElementRect.left +
        elementRect.width / 2 -
        arrowOffsetX -
        4
      : -4;
    const arrowY = calculateY
      ? overlayElementRect.height / 2 -
        (elementRect.top - overlayElementRect.top) / 2 +
        arrowOffsetY
      : 0;
    return { arrowX, arrowY };
  }

  private nextPosition(
    elementRef: ElementRef,
    overlayElementRect: DOMRect,
    arrowOffsets: TooltipArrowOffsets
  ): void {
    const arrowPositions = this.calculateArrowPositions(
      elementRef,
      overlayElementRect,
      arrowOffsets.x,
      arrowOffsets.y,
      arrowOffsets.calculateX,
      arrowOffsets.calculateY
    );
    this.position$.next(arrowPositions);
  }

  private subscribeMouseEvent(elementRef: ElementRef): void {
    fromEvent(elementRef.nativeElement, 'mouseleave')
      .pipe(
        takeUntil(this.overlayService.detach$),
        filter((event): event is MouseEvent => !!event)
      )
      .subscribe((event) => {
        const target = event.relatedTarget as HTMLElement | null;
        if (target?.id === 'cdk-overlay-1') return;

        this.detachTooltip();
      });
  }

  private subscribeOutsideClickEvent(sourceRef: ElementRef): void {
    this.overlayService.outsidePointerEvents$
      ?.pipe(takeUntil(this.overlayService.detach$))
      .subscribe((event: MouseEvent) => {
        if (sourceRef.nativeElement.contains(event.target)) return;
        this.detachTooltip();
      });
  }
}
