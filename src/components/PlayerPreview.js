import React, { Component } from 'react'
import PropTypes from 'prop-types'

// 12.
class PlayerPreview extends Component {
    static propTypes = {
        avatar: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }
    render() {
        return (
            <div>
                <div className="column">
                    <img className='avatar' src={this.props.avatar} alt={`Avatar for ${this.props.username}`} />
                    <h2 className='username'>@{this.props.username}</h2>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default PlayerPreview