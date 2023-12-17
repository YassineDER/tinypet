import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snack: MatSnackBar) { }

    public alert(message: string, duration: number) {
        this.snack.open(message, "Close", { duration: 2000})
    }
}
