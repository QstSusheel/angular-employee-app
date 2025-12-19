import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private toastr: ToastrService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  success(message: string, title?: string) {
    if (this.isBrowser) {
      this.toastr.success(message, title);
    }
  }

  error(message: string, title?: string) {
    if (this.isBrowser) {
      this.toastr.error(message, title);
    }
  }
}
