import React, { ChangeEvent } from 'react'

export interface AppProps {}

export interface AppState {
  name: string
}

export default class App extends React.Component<AppProps, AppState> {
  state = {
    name: 'gutchom'
  }

  constructor() {
    super()
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    this.setState({ name: e.target.value })
  }

  render() {
    return (
      <div className="app">
        <h1>Hello, World!</h1>
        <input className="text-input"
               type="text"
               value={this.state.name}
               onChange={this.handleInputChange} />
      </div>
    )
  }
}
