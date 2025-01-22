import { Component, OnInit } from '@angular/core';
import { LoaderService } from './../services/loader.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-loader',
  standalone: false,
  
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit {
  isVisible: boolean = false;
  private loaderSubscription!: Subscription;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderSubscription = this.loaderService.loaderState$.subscribe(
      (state: boolean) => {
        this.isVisible = state;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
  }
}
