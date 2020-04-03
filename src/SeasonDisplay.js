import React from 'react';

const getSeason = (lat, month) => {
    if(month > 2 && month < 9 ) {
        return lat > 0 ? 'Summer' : 'Winter';
    } else {
        return lat > 0 ? 'Winter' : 'Summer';
    }
}

class SeasonDisplay extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { lat: null,  errMsg: null};
    // }

    state = { lat: null,  errMsg: null};

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errMsg: err.message })
        );
    }

    render(){
        let latStatus = this.state.lat && !this.state.errMsg;
        let errStatus = !this.state.lat && this.state.errMsg;

        const season = getSeason(this.state.lat, new Date().getMonth());

        return (
            <div>
                {latStatus ? <div>{season === 'Winter' ? 'Bur, it is chilly' : 'Lets hit the beach'}</div> : ''}
                {errStatus ? <div>Error: {this.state.errMsg}</div> : ''}
                {!latStatus && !errStatus ? <div>Loading...</div> : ''}
            </div>
        )
    }
}

export default SeasonDisplay;