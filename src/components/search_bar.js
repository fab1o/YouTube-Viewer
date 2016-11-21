import React, {Component} from 'react';

// const SearchBar = () => { //functional component
//
//     return <input />;
//
// };

class SearchBar extends Component { //class component

    constructor(props) {
        super(props);

        this.state = {
            term: '',
            searchCounter: 0
        };
    }

    render() {

        const videoSearch = this.debounce((term) => {
            this.onInputChange(term)
        }, 500);

        return (
            <div className="search-bar">
                <div className="col-md-10">
                    <input onChange={event => videoSearch(event.target.value)}/>
                </div>
                <div className="counter col-md-2">
                    Searches: {this.state.searchCounter}
                </div>
            </div>
        );
    }

    onInputChange(term) {

        this.setState({
            term: term,
            searchCounter: this.state.searchCounter + 1
        });

        this.props.onSearchChange(term);
    }

    debounce(func, wait) {
        let timeout, context = this;
        return function () {

            let args = arguments;

            clearTimeout(timeout);

            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args);
            }, wait);

            if (!timeout)
                func.apply(context, args);
        };
    };

}

export default SearchBar;
