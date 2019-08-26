import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { WasmCppComponent } from './wasm-cpp/wasm-cpp.component';
import { WasmCComponent } from './wasm-c/wasm-c.component';
import { WasmRustComponent } from './wasm-rust/wasm-rust.component';
import { JavascriptComponent } from './javascript/javascript.component';
import { ChartComponent } from './chart/chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    WasmCppComponent,
    WasmCComponent,
    WasmRustComponent,
    JavascriptComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
