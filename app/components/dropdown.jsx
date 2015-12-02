import React, { Component ,PropTypes} from 'react';
import ReacDom from 'react-dom';
import classnames from 'classnames';
export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        document.addEventListener('click', this.handlePageClick.bind(this), false);
    }

    static defaultProps = {
        width: 120,
        emptyText: '请选择',
        data: [{
            text: '请选择',
            value: null
        }]
    }
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        })).isRequired,
        onChange: PropTypes.func,
        emptyText: '',
        width: PropTypes.number
    }
    state = {
        isOpen: false,
        value: null,
        text: this.props.emptyText
    }

    componentWillReceiveProps(props) {
        if (props.data != this.props.data) {
            var item = {
                text: this.props.emptyText,
                value: null
            };
            this.handleChange(item)
            this.setState(item);
        }
    }
    handlePageClick (e) {

        if (ReacDom.findDOMNode(this).contains(e.target)) {
            return;
        }
        this.setState({
            isOpen:false
        })
    }
    handleChange = (item)=> {
        const onChange = this.props.onChange;
        item = {...item};
        if (item.value == null) {
            item.text = "";
        }
        onChange && onChange(item);
    }
    handleOpen = (e) => {
        const isOpen = this.state.isOpen;
        this.setState({isOpen: !isOpen});
    }
    hanldeChoose = (item)=> {
        this.handleChange(item);
        this.setState(item);
    }
    renderOptions = (data) => {
        const self = this;
        const currentValue = this.state.value;
        if (data.length == 0) {
            data = [{
              text:this.state.emptyText,value:null
            }]
        }
        return data.map((item)=> {
            var className = classnames(
                {"current": item.value == currentValue}
            );
            return <li
                className={className}
                key={item.value}
                onClick={this.hanldeChoose.bind(self,item)}
            >{item.text}</li>
        });
    }

    render() {
        const {isOpen,text} = this.state;
        const {data,width}= this.props;
        var className = classnames("br-dropdown",
            {"br-dropdown-open": isOpen}
        );
        return (
            <div className={className}
                 style={{width:width}}
                 onClick={this.handleOpen}>
                <div className="br-dropdown-selection">
                    <div className="br-dropdown-text">
                        {text}
                    </div>
                    <div className="br-dropdown-arrow">
                    </div>
                </div>
                <div className="br-dropdown-menu">
                    <ul>
                        {this.renderOptions(data)}
                    </ul>
                </div>
            </div>
        );
    }
}