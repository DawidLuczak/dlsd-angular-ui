import {
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  PositionStrategy,
  ScrollStrategy,
} from '@angular/cdk/overlay';
import { ElementRef, Injectable } from '@angular/core';
import { OverlayBaseService } from './overlay-base.service';

@Injectable({
  providedIn: 'root',
})
export class OverlayService extends OverlayBaseService {
  private _sourceRef?: ElementRef;

  get sourceNativeElement() {
    return this._sourceRef?.nativeElement;
  }

  get overlayElementRect() {
    return this.overlayRef()?.overlayElement.getBoundingClientRect();
  }

  get outsidePointerEvents$() {
    return this.overlayRef()?.outsidePointerEvents();
  }

  get detachments$() {
    return this.overlayRef()?.detachments();
  }

  get scrollStrategies() {
    return this.overlay.scrollStrategies;
  }

  constructor(protected override overlay: Overlay) {
    super(overlay);
  }

  public createOrUpdateOverlayWithPositions(
    sourceRef: ElementRef,
    positionStrategy: ConnectedPosition[],
    scrollStrategy: ScrollStrategy
  ): void {
    if (!this.overlayRef()) {
      this.createOverlayWithPositions(
        sourceRef,
        positionStrategy,
        scrollStrategy
      );
    } else {
      this.updateOverlayWithPositions(
        sourceRef,
        positionStrategy,
        scrollStrategy
      );
    }
  }

  public createOrUpdateOverlay(
    sourceRef: ElementRef,
    overlayConfig: OverlayConfig
  ): void {
    if (!this.overlayRef()) {
      this.createOverlay(sourceRef, overlayConfig);
    } else if (this._sourceRef !== sourceRef) {
      this.updateOverlay(sourceRef, overlayConfig);
    }
  }

  public createOverlay(
    sourceRef: ElementRef,
    overlayConfig: OverlayConfig
  ): void {
    this._sourceRef = sourceRef;
    this.createAndSetOverlayRef(overlayConfig);
  }

  public createOverlayWithPositions(
    sourceRef: ElementRef,
    positions: ConnectedPosition[],
    scrollStrategy: ScrollStrategy
  ): void {
    const positionStrategy = this.defaultPositionStrategy(
      sourceRef.nativeElement,
      positions
    );
    this.createOverlay(sourceRef, { positionStrategy, scrollStrategy });
  }

  public updateOverlay(
    sourceRef: ElementRef,
    overlayConfig: OverlayConfig
  ): void {
    this._sourceRef = sourceRef;
    this.overlayRef()?.updatePositionStrategy(overlayConfig.positionStrategy!);
    this.overlayRef()?.updateScrollStrategy(overlayConfig.scrollStrategy!);
  }

  public updateOverlayWithPositions(
    sourceRef: ElementRef,
    positions: ConnectedPosition[],
    scrollStrategy: ScrollStrategy
  ): void {
    const positionStrategy = this.defaultPositionStrategy(
      sourceRef.nativeElement,
      positions
    );
    this.updateOverlay(sourceRef, { positionStrategy, scrollStrategy });
  }

  public defaultPositionStrategy(
    elementRef: HTMLElement,
    positions: ConnectedPosition[],
    viewportMargin = 8
  ): PositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(elementRef)
      .withFlexibleDimensions(true)
      .withViewportMargin(viewportMargin)
      .withPositions(positions);
  }
}
