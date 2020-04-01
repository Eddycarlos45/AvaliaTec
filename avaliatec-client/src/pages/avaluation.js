import React, { Component } from 'react';
import axios from 'axios';

export default class avaluation extends Component {
    state = {
        avaluation: null
    }
     componentDidMount() {
        axios.get('/form')
            .then(res => {
                console.log(res.data)
                this.setState({
                    avaluation: res.data
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        let recentAvaluations = this.state.avaluation ? (
            this.state.avaluation.map((file) => <p>{file.course}{file.theme}</p>)
        ) : (<p>Loading...</p>)
        return (
            <div>
                {recentAvaluations[0]}
            </div>
        )
    }
}
