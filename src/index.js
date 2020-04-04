import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {

    state = { lat: null,  errMsg: null};

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errMsg: err.message })
        );
    }

    

    renderContent() {

        const latStatus = this.state.lat && !this.state.errMsg;
        const errStatus = !this.state.lat && this.state.errMsg;
        
        if(latStatus) {
            return <SeasonDisplay lat={this.state.lat} />;
        }
        if(errStatus) {
            return <div>Error: {this.state.errMsg}</div>;
        }
        return <Spinner msg='Please allow location request..' />;

    }

    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));