import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavTabsComponent } from './common/nav-tabs/nav-tabs.component';
import { HomeComponent } from './home/home.component';
import { RoutingModuleComponent } from './routing-module/routing-module.component';
import { SkillsComponent } from './skills/skills.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutComponent } from './about/about.component';
import { WorkComponent } from './work/work.component';
import { ContactComponent } from './contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CursorComponent } from './cursor/cursor.component';
@NgModule({
  declarations: [
    AppComponent,
    NavTabsComponent,
    HomeComponent,
    RoutingModuleComponent,
    SkillsComponent,
    AboutComponent,
    WorkComponent,
    ContactComponent,
    CursorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
