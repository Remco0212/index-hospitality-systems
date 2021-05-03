import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GameModule } from "./features/game/game.module";
import { MenuModule } from "./features/menu/menu.module";
import { ScoreBoardModule } from "./features/scoreboard/scoreboard.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        GameModule,
        MenuModule,
        ScoreBoardModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
