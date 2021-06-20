import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { sampleData } from './sampleData'

@Component({
    selector: 'x-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

    results: any[] = [];
    minDate = new Date(sampleData[0].name);
    maxDate = new Date(sampleData[sampleData.length-1].name);
    dateRange = new FormGroup({
        start: new FormControl(),
        end: new FormControl()
    });
    legend: boolean = true;
    showLabels: boolean = true;
    animations: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showYAxisLabel: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Date';
    yAxisLabel: string = 'Value';
    timeline: boolean = true;
    colorScheme = {
        domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    };

    dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {

        if (dateRangeEnd.value){

            const rangedSeries = sampleData.filter((item)=>{
                const date = new Date(item.name)
                const start = new Date(dateRangeStart.value)
                const end = new Date(dateRangeEnd.value)
                return date.getTime() >= start.getTime() && date.getTime() <= end.getTime()
            })
    
            this.results = [
                {
                    name: 'Items',
                    series: rangedSeries
                }
            ]
        }
    }

    formatSeries(data: any[]) {
        return [
            {
                name: 'Items',
                series: data
            }
        ]
    }

    dateFormatter(value: string) {
        const date = new Date(value)
        return date.toLocaleDateString("en-US")
    }
    
    ngOnInit() {
        this.results = this.formatSeries(sampleData)

        this.dateRange.patchValue({
            start: this.minDate,
            end: this.maxDate
        });

    }

}
