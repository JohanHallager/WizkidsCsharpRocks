import { Component, OnInit } from '@angular/core';
import { PredictionsService, apiNamesEnum } from '../services/predictions.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-predictions',
    templateUrl: './predictions.component.html',
    styleUrls: ['./predictions.component.css']
})
export class PredictionsComponent implements OnInit {

    searchTerm$ = new Subject<string>();
    WizkidsApiResults: Word[];
    dictionaryApiResults: Word[];

    constructor(private predictionsService: PredictionsService) {
        predictionsService.search(this.searchTerm$, apiNamesEnum.DictionaryApi)
            .subscribe(results => {
                console.log(results)
                this.dictionaryApiResults = results;
            });

        predictionsService.search(this.searchTerm$, apiNamesEnum.WizkidsApi)
            .subscribe(results => {
                console.log(results)
                this.WizkidsApiResults = results;
            });
    }

    ngOnInit() {
    }


    //onKey(event: any) {
    //    // event.target.value

    //    this.predictionsService.GetDictionaryWords(event.target.value, apiNamesEnum.DictionaryApi )
    //}

}
