import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };


    static propTypes = {
        match: PropTypes.object
    };
    componentDidMount() {
        const { params } = this.props.match;
        // first reinstate our localStorage
        const localStorageRef = localStorage.getItem(params.storeID);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        console.log(localStorageRef);
        this.ref = base.syncState(`${params.storeID}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        console.log(this.state.order);
        localStorage.setItem(this.props.match.params.storeID, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        //1. Take a copy of the existing state
        const fishes = { ...this.state.fishes };
        // 2. Add our new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        //3. Set the new fishes object to state
        this.setState({ fishes })
    };
    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    updateFish = (key, updateFish) => {
        // 1. take a copy of the current state
        const fishes = { ...this.state.fishes };
        // 2. Update that state
        fishes[key] = updateFish;
        // 3. set that state
        this.setState({ fishes });
    };

    deleteFish = (key) => {
        // 1. take a copy of state
        const fishes = { ...this.state.fishes };
        // 2. update the state
        fishes[key] = null;
        // 3. update state
        this.setState({ fishes });
    }

    addToOrder = (key) => {
        // 1. take a copy of state
        const order = { ...this.state.order };
        // 2. either add to the order, or update the number of the order
        order[key] = order[key] + 1 || 1;
        // 3. call setState to update our state object
        this.setState({ order });
    };

    removeFromOrder = key => {
        // 1. take a copy of state
        const order = { ...this.state.order };
        // 2. remove item from order
        delete order[key];
        // 3. call setState to update our state object
        this.setState({ order });

    }

    render() {
        return (
            <div className='catch-of-the-day'>
                <div className='menu'>
                    <Header tagline='Fresh Seafood Market' />
                    <ul className='fishes'>
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish
                                key={key}
                                index={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder} />
                        ))}
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    sotreID={this.props.match.params.storeID}
                />
            </div>
        );
    }
}

export default App;