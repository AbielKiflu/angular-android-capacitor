import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Barcode';
  barcode: string = ''; 

  async openScanner() {
    try {
      const permission = await BarcodeScanner.checkPermission({ force: true });

      if (permission.granted) {
        const result = await BarcodeScanner.startScan();

        if (result.hasContent) {
          this.barcode = result.content;
          console.log('Scanned barcode:', this.barcode);
        }
      } else {
        console.error('Camera permission denied');
      }
    } catch (error) {
      console.error('Error opening the scanner:', error);
    }
  }
 }
