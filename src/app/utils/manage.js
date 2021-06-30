import React, { Component } from "react"
import { withRouter } from "react-router-dom"

export default function manageHOC(BaseComponent) {
    class Restricted extends Component {
      render() {
        return <BaseComponent {...this.props} />
      }
    }
    return withRouter(Restricted);
}