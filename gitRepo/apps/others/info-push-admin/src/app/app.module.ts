import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NbThemeModule } from '@nebular/theme';
import { AppComponent } from './app.component';
import { NbSidebarModule, NbLayoutModule, NbSidebarService } from '@nebular/theme';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly

import { ThemeModule } from './@theme/theme.module';
import { CoreModule } from './@core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot([], { useHash: true }),

    BrowserModule,
    NbLayoutModule,
    NbSidebarModule,
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' })

  ],
  providers: [NbSidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
