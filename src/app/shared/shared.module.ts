import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,MatButtonModule,MatButtonToggleModule,MatCardModule,
  MatCheckboxModule,MatChipsModule,MatDatepickerModule,MatDialogModule,MatDividerModule,MatExpansionModule,
  MatGridListModule,  MatIconModule,  MatInputModule,  MatListModule,  MatMenuModule,  MatNativeDateModule,  MatPaginatorModule,  MatProgressBarModule,  MatProgressSpinnerModule,
  MatRadioModule,MatRippleModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,MatSnackBarModule, MatSortModule,MatStepperModule,  MatTooltipModule, MatToolbarModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    MatToolbarModule,
    MatAutocompleteModule,MatButtonModule,MatButtonToggleModule,MatCardModule,
    MatCheckboxModule,MatChipsModule,MatDatepickerModule,MatDialogModule,MatDividerModule,MatExpansionModule,
  MatGridListModule,  MatIconModule,  MatInputModule,  MatListModule,  MatMenuModule,  MatNativeDateModule,  MatPaginatorModule,  MatProgressBarModule,  MatProgressSpinnerModule,
  MatRadioModule,MatRippleModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,MatSnackBarModule, MatSortModule,MatStepperModule,  MatTooltipModule,
  BrowserAnimationsModule],
  exports: [MatToolbarModule,MatAutocompleteModule,MatButtonModule,MatButtonToggleModule,MatCardModule,
    MatCheckboxModule,MatChipsModule,MatDatepickerModule,MatDialogModule,MatDividerModule,MatExpansionModule,
    MatGridListModule,  MatIconModule,  MatInputModule,  MatListModule,  MatMenuModule,  MatNativeDateModule,  MatPaginatorModule,  MatProgressBarModule,  MatProgressSpinnerModule,
    MatRadioModule,MatRippleModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,MatSnackBarModule, MatSortModule,MatStepperModule,  MatTooltipModule,BrowserAnimationsModule],
})
export class SharedModule { }
