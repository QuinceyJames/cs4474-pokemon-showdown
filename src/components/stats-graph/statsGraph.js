import React from "react";
import "./statsGraph.scss";
import {summarizePokemonStats , getPokemonInfo} from "../../utils/pokedex"
import Chart from 'chart.js'

export default class StatsGraph extends React.Component {

  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    var stats1 = this.buildStats(this.props.id)

    new Chart(myChartRef, {
      type: "radar",
      data: {
        //Bring in data
        labels: ["HP","Attack","Defence","Sp.Attack", "Sp.Defence", "Speed"],
        datasets: [
            {
                label: stats1.name,
                data: stats1.stats,
                backgroundColor: 'rgba(179,181,198,0.2)',
            }
        ]
      },
      options: {
        
        scale:{
          ticks:{
            min: 1,
            max: 255,
          }
      }
    }
  });
}

  buildStats(id){
    var pokemonData = {name: '',stats:[] }
    getPokemonInfo(id)
    .then(res => {
      console.log(res)
      pokemonData.name = res.name
      
      pokemonData = summarizePokemonStats(res.stats)
      
      console.log(pokemonData)
    })
    .catch(console.error)

    return pokemonData
  }

    render() {
      return (
        <div class="chart-container">
            <canvas
                id="statsChart"
                ref={this.chartRef}
            />
        </div>
      )
  }
}
