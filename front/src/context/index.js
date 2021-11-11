import React, { Component } from 'react'

const Context = React.createContext()

class Provider extends Component {
  state = {
    totalData : [],
  }


  setData = (arg) => {
    this.setState({totalData : arg})
  }

  render() {
    const { children } = this.props
    const { totalData } = this.state
    const { setData } = this

    return (
      <Context.Provider
        value={{
          totalData,
          setData,
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

export default Context

export { Provider }