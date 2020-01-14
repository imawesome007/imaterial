import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DashboardModule } from "./features/dashboard/dashboard.module";
import { MaterialModule } from "./shared/material-modules";
import { HttpClientModule } from "@angular/common/http";
import { HttpInterceptorProviders } from "./shared/http-interceptors/http-interceptor-providers";
import { TokenService } from "./shared/services/token.service";
import { GlobalLoaderService } from "./shared/services/global-loader.service";
import { LayoutModule } from "./shared/layout/layout-module";
import { DashBoardResolver } from "./features/dashboard/resolver/dashboard.resolver";
import { BomModule } from "./features/bom/bom.module";
// import { DialogOverviewExampleDialog } from './shared/models/add-project/dialog-overview-example-dialog.component';
// import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IndentDashboardModule } from "./features/indent/indent-dashboard.module";
import { GlobalStoreResolver } from "./features/global-store/Resolver/global-store.resolver";
import { BomResolver } from "./features/bom/bom.resolver";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    LayoutModule,
    BomModule
  ],
  providers: [
    HttpInterceptorProviders,
    TokenService,
    GlobalLoaderService,
    DashBoardResolver,
    BomResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
