import { NgModule } from "@angular/core";
import { LayoutPageComponent } from "./pages/layout-page/layout-page";
import { MoviesRoutingModule } from "./movies-routing-module";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material-module";

@NgModule({
  declarations : [
    LayoutPageComponent
  ],
  imports : [
    CommonModule,
    MoviesRoutingModule,
    MaterialModule
  ]
})
export class MoviesModule {}
