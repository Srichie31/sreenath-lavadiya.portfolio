import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-cursor',
  standalone: false,
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent implements OnInit {
  delay = 8;
  _x = 0;
  _y = 0;
  endX = window.innerWidth / 2;
  endY = window.innerHeight / 2;
  cursorVisible = true;
  cursorEnlarged = false;
  dotSize: any;
  outlineSize: number | undefined;
  $dot!: HTMLElement;
  $outline!: HTMLElement;

  ngOnInit() {
    this.$dot = document.querySelector('.cursor-dot')!;
    this.$outline = document.querySelector('.cursor-dot-outline')!;
    this.dotSize = this.$dot.offsetWidth;
    this.outlineSize = this.$outline.offsetWidth;

    this.animateDotOutline();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.cursorVisible = true;
    this.toggleCursorVisibility();

    this.endX = event.pageX;
    this.endY = event.pageY;
    this.$dot.style.top = this.endY + 'px';
    this.$dot.style.left = this.endX + 'px';
  }

  @HostListener('document:mouseenter')
  onMouseEnter() {
    this.cursorVisible = true;
    this.toggleCursorVisibility();
    this.$dot.style.opacity = '1';
    this.$outline.style.opacity = '1';
  }

  @HostListener('document:mouseleave')
  onMouseLeave() {
    this.cursorVisible = true;
    this.toggleCursorVisibility();
    this.$dot.style.opacity = '0';
    this.$outline.style.opacity = '0';
  }

  @HostListener('document:mousedown')
  onMouseDown() {
    this.cursorEnlarged = true;
    this.toggleCursorSize();
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.cursorEnlarged = false;
    this.toggleCursorSize();
  }

  animateDotOutline() {
    this._x += (this.endX - this._x) / this.delay;
    this._y += (this.endY - this._y) / this.delay;
    this.$outline.style.top = this._y + 'px';
    this.$outline.style.left = this._x + 'px';

    requestAnimationFrame(this.animateDotOutline.bind(this));
  }

  toggleCursorSize() {
    if (this.cursorEnlarged) {
      this.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
      this.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    } else {
      this.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
      this.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  }

  toggleCursorVisibility() {
    if (this.cursorVisible) {
      this.$dot.style.opacity = '1';
      this.$outline.style.opacity = '1';
    } else {
      this.$dot.style.opacity = '0';
      this.$outline.style.opacity = '0';
    }
  }
}
