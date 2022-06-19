import { Component, OnInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TemperatureLog } from 'src/app/models/temperature-log';
import { TemperatureLogService } from 'src/app/services/temperature-log.service';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit, OnDestroy {

  getTemperatureLogsSubscription: Subscription | undefined;

  private margin: number = 80;
  private width: number = 1050 - (this.margin * 2);
  private height: number = 400 - (this.margin * 2);

  constructor(
    private temperatureService: TemperatureLogService
  ) { }

  ngOnInit(): void {
    let tempSVG = this.createSVG("temperature");
    let humiditySVG = this.createSVG("humidity");

    this.getTemperatureLogsSubscription = this.temperatureService.getTemperatureLogs()
      .pipe(
        tap((logs) => this.drawBars(tempSVG, "temperature", logs)),
        tap((logs) => this.drawBars(humiditySVG, "humidity", logs))
    ).subscribe();
  };

  ngOnDestroy(): void {
    this.getTemperatureLogsSubscription?.unsubscribe();
  }

  private createSVG(type: string): d3.Selection<SVGGElement, unknown, HTMLElement, any> {
    return d3
      .select(`figure#${type}`)
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  };


  private drawBars(svg : any, type: string, data: TemperatureLog[]): void {
    // X Axis
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map((d : TemperatureLog) => d.timestamp.toString()))
      .padding(0.2);

    svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    var readings = data.map(d => d[type]);

    // Y Axis
    const y = d3.scaleLinear()
      .range([this.height, 0])
      .domain([Math.min(...readings) - 0.5, Math.max(...readings) + 0.5]);

    svg.append("g")
      .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d : TemperatureLog) => x(d.timestamp.toString()))
      .attr("y", (d : TemperatureLog) => y(d[type]))
      .attr("width", x.bandwidth())
      .attr("height", (d: TemperatureLog) => this.height - y(d[type]));

    // Put the reading above each bar, so it is easy to see the reading
    svg.selectAll("bars")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d : TemperatureLog) => x(d.timestamp.toString()))
      .attr("y", (d : TemperatureLog) => y(d[type]) - 20)
      .text((d: TemperatureLog) => d[type]);
  }

}
