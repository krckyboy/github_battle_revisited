import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
    content: {
        textAlign: 'center',
        fontSize: '35px'
    }
}

//13.
class Loading extends Component {
    state = {
        text: this.props.text
    }

    static defaultProps = {
        text: 'Loading',
        speed: 300,
    }

    static propTypes = {
        text: PropTypes.string,
        speed: PropTypes.number,
    }

    componentDidMount() {
        this.updateUI()
    }

    updateUI = () => {
        const stopper = this.props.text + '...'
        this.interval = window.setInterval(() => {
            if (this.state.text === stopper) {
                this.setState({ text: this.props.text })
            } else {
                this.setState(prevState => {
                    const newState = {}
                    newState.text = prevState.text + '.'
                    return newState
                })
            }
        }, this.props.speed)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    render() {
        return (
            <p style={styles.content}>
                {this.state.text}
            </p>
        )
    }
}

export default Loading