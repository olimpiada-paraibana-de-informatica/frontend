import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,MatButtonModule,MatButtonToggleModule,MatCardModule,
  MatCheckboxModule,MatChipsModule,MatDatepickerModule,MatDialogModule,MatDividerModule,MatExpansionModule,
  MatGridListModule,  MatIconModule,  MatInputModule,  MatListModule,  MatMenuModule,  MatNativeDateModule,  MatPaginatorModule,  MatProgressBarModule,  MatProgressSpinnerModule,
  MatRadioModule,MatRippleModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,MatSnackBarModule, MatSortModule,MatStepperModule,  MatTooltipModule, MatToolbarModule, MatTableModule, MatOptionModule, MatSelectModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RemoveDialogComponent } from './components/remove-dialog/remove-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [RemoveDialogComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatAutocompleteModule,MatButtonModule,MatButtonToggleModule,MatCardModule,
    MatCheckboxModule,MatChipsModule,MatDatepickerModule,MatDialogModule,MatDividerModule,MatExpansionModule,
  MatGridListModule,  MatIconModule,  MatInputModule,  MatListModule,  MatMenuModule,  MatNativeDateModule,  MatPaginatorModule,  MatProgressBarModule,  MatProgressSpinnerModule,MatSelectModule,MatOptionModule,
  MatRadioModule,MatRippleModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,MatSnackBarModule, MatSortModule,MatStepperModule,  MatTooltipModule, MatTableModule,
  BrowserAnimationsModule, ReactiveFormsModule],
  exports: [MatToolbarModule,MatAutocompleteModule,MatButtonModule,MatButtonToggleModule,MatCardModule,
    MatCheckboxModule,MatChipsModule,MatDatepickerModule,MatDialogModule,MatDividerModule,MatExpansionModule,
    MatGridListModule,  MatIconModule,  MatInputModule,  MatListModule,  MatMenuModule,  MatNativeDateModule,  MatPaginatorModule,  MatProgressBarModule, HeaderComponent, MatProgressSpinnerModule,MatSelectModule,MatOptionModule,
    MatRadioModule,MatRippleModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,MatSnackBarModule, MatSortModule,MatStepperModule,  MatTooltipModule, MatTableModule,BrowserAnimationsModule, ReactiveFormsModule],
})
export class SharedModule { }
