import React, { Component } from 'react'
import axios from 'axios'
import './styles.css'
import ChartWrapper from './components/ChartWrapper'

class App extends Component {

  state = {
    data: [],
    loading: false
  }

  componentDidMount = async () => {
    this.setState({ loading: true })

    await axios("https://v2-api.sheety.co/20cbb764b5782c3bee3e01960eea9c1b/kabum/year2011")
      .then(result => this.setState({ data: result.data["year2011"], loading: false }))
      .catch(error => console.log(error))
  }

  render() {

    const { data, loading } = this.state

    return (
      <div>
        <h1>Kabum Dashboard</h1>
        {loading ? 'Carregando...' : (
          <ChartWrapper data={data} />
        )}
      </div >
    )
  }
}

export default App;
