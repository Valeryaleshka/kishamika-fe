import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent implements AfterViewInit, OnDestroy {
  private hostElement = inject(ElementRef);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);
  private svg: any;
  private resizeObserver: ResizeObserver | null = null;
  private yValues = [815, 150, 250, 320, 400, 550, 325, 625];

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderChart(true);
      this.setupResizeObserver();
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.renderChart();
      });
      this.resizeObserver.observe(this.hostElement.nativeElement);
    }
  }

  private renderChart(isNew = false) {
    const element = this.hostElement.nativeElement;
    const containerWidth = element.clientWidth;
    const containerHeight = element.clientHeight;
    const yPad: number = 50;
    const xPad: number = 50;
    const yTicks: number = 4;
    const xValues = d3.range(0, this.yValues.length + 1);

    if (isNew) {
      this.svg = this.renderer.createElement('svg', 'http://www.w3.org/2000/svg');
      this.renderer.setAttribute(this.svg, 'width', '100%');
      this.renderer.setAttribute(this.svg, 'height', containerHeight.toString());
      this.renderer.setAttribute(this.svg, 'viewBox', `0 0 ${containerWidth} ${containerHeight}`);
      this.renderer.setAttribute(this.svg, 'preserveAspectRatio', 'xMinYMin meet');
      this.renderer.appendChild(element, this.svg);
    }

    while (this.svg.firstChild) {
      this.renderer.removeChild(this.svg, this.svg.firstChild);
    }

    this.renderer.setAttribute(this.svg, 'viewBox', `0 0 ${containerWidth} ${containerHeight}`);

    this.drawChart(containerWidth, containerHeight, this.yValues, xValues, yPad, xPad, yTicks);
  }

  private drawChart(
    width: number,
    height: number,
    yValues: number[],
    xValues: number[],
    yPad: number,
    xPad: number,
    yTicks: number,
  ) {
    // Define scales
    const xScale = d3
      .scaleBand()
      .domain(xValues.slice(0, yValues.length).map(String)) // Convert to strings for band scale
      .range([xPad, width - xPad])
      .padding(0.2); // Adjust padding between bars

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(yValues) ?? 0])
      .range([height - yPad, yPad]);

    // Define axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(yTicks);

    // Create groups for axes
    const xAxisGroup = this.renderer.createElement('g', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(xAxisGroup, 'class', 'xaxis');
    this.renderer.setAttribute(xAxisGroup, 'transform', `translate(0,${height - yPad})`);

    const yAxisGroup = this.renderer.createElement('g', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(yAxisGroup, 'class', 'yaxis');
    this.renderer.setAttribute(yAxisGroup, 'transform', `translate(${xPad},0)`);

    // Append axes groups to SVG
    this.renderer.appendChild(this.svg, xAxisGroup);
    this.renderer.appendChild(this.svg, yAxisGroup);

    // Render axes using d3
    d3.select(xAxisGroup).call(xAxis);
    d3.select(yAxisGroup).call(yAxis);

    // Remove the default domain path
    d3.select(xAxisGroup).select('.domain').remove();

    // Manually draw a straight line (no upward/downward ticks at ends)
    const xAxisLine = this.renderer.createElement('path', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(xAxisLine, 'class', 'domain');
    this.renderer.setAttribute(xAxisLine, 'stroke', 'black');
    this.renderer.setAttribute(xAxisLine, 'd', `M${xPad},0H${width - xPad}`); // Straight horizontal line
    this.renderer.appendChild(xAxisGroup, xAxisLine);

    // Remove the default domain path
    d3.select(yAxisGroup).select('.domain').remove();
    d3.select(xAxisGroup).selectAll('.tick line').remove();
    d3.select(yAxisGroup).selectAll('.tick line').remove();

    // Manually draw a straight line (no left/right ticks at ends)
    const yAxisLine = this.renderer.createElement('path', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(yAxisLine, 'class', 'domain');
    this.renderer.setAttribute(yAxisLine, 'stroke', 'black');
    this.renderer.setAttribute(yAxisLine, 'd', `M0,${yPad}V${height - yPad}`); // Straight vertical line
    this.renderer.appendChild(yAxisGroup, yAxisLine);

    // Create bars (centered under ticks)
    yValues.forEach((y, i) => {
      const rect = this.renderer.createElement('rect', 'http://www.w3.org/2000/svg');

      this.renderer.setAttribute(rect, 'x', (xScale(i.toString()) ?? 0).toString()); // Use band scale position
      this.renderer.setAttribute(rect, 'y', yScale(y).toString());
      this.renderer.setAttribute(rect, 'width', xScale.bandwidth().toString()); // Dynamic width
      this.renderer.setAttribute(rect, 'height', (yScale(0) - yScale(y)).toString());
      this.renderer.setAttribute(rect, 'fill', 'blue');

      this.renderer.appendChild(this.svg, rect);
    });
  }
}
