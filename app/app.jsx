import React, { Component } from 'react';
import Dropdown from './components/dropdown.jsx';
import {cityData} from './city';


var regionsData = cityData.map(function (item) {
    return item.region;
});
export default class App extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        regions: regionsData,
        states: [],
        citys: [],
        showText:{
            region:"",
            state:"",
            city:""
        }
    }
    handleRegionChange = (item)=> {
        this.setState({
            states: item.state,
            showText:{
                ...this.state.showText,region:item.text
            }
        })
    }
    handleStateChange = (item)=> {
        this.setState({
            citys: item.city,
            showText:{
                ...this.state.showText,state:item.text
            }
        });
    }
    handleCityChange=(item)=>{
        this.setState({
            showText:{
                ...this.state.showText,city:item.text
            }
        });
    }
    render() {
        const {regions,states,citys,showText}  = this.state;
        return (
            <div>
                <h1>
                    省市区联动~
                </h1>
                <div>
                    <Dropdown data={regions}
                              onChange={this.handleRegionChange}
                              />
                    <Dropdown data={states}
                              onChange={this.handleStateChange}
                              />
                    <Dropdown data={citys}
                              onChange={this.handleCityChange}
                               />
                </div>
                <h3>
                    {showText.region}-{showText.state}-{showText.city}
                </h3>
            </div>

        );
    }
}