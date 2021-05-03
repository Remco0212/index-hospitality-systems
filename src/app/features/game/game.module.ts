import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterModule, Routes } from "@angular/router";
import { DroppingObjectComponent } from "./components/dropping-object.component";
import { GameOverComponent } from "./dialogs/gameover.component";
import { GameComponent } from "./pages/game.component";

const routes: Routes = [
    {
        path: "",
        component: GameComponent
    }
];

@NgModule({
    declarations: [GameComponent, GameOverComponent, DroppingObjectComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    entryComponents: [GameOverComponent],
    exports: [RouterModule]
})
export class GameModule {}
