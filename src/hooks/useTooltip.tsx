import * as d3 from 'd3';

type TooltipType = d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;

function useTooltip() {
  const createTooltip = () =>
    d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('border', 'solid 2px')
      .style('border-radius', '5px')
      .style('display', 'flex')
      .style('flex-direction', 'column')
      .style('gap', '3px')
      .style('padding', '5px');

  const showTooltip = (Tooltip: TooltipType) => Tooltip.style('opacity', 1);
  const hideTooltip = (Tooltip: TooltipType) => Tooltip.style('opacity', 0);
  const setTooltipContent = (Tooltip: TooltipType, title: string, text: string) => {
    Tooltip.html(`<p><u>${title}</u></p><p>${text}</p>`);
  };
  const setTooltipPosition = (Tooltip: TooltipType, mouseX: number, mouseY: number) => {
    Tooltip.style('left', `${mouseX + 20}px`).style('top', `${mouseY - 30}px`);
  };

  return {
    createTooltip,
    showTooltip,
    setTooltipContent,
    setTooltipPosition,
    hideTooltip,
  };
}

export default useTooltip;
