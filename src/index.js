import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

//provide path for our local file
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

//change YouTube API key
const API_KEY = ''; //todo: move it to a config file


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.search();
    }

    search(term) {
        term = term || '';

        YTSearch({
                key: API_KEY,
                term: term
            },
            (videos) => {
                this.setState({
                    videos: videos,
                    selectedVideo: videos.length ? videos[0] : null
                });
            }
        );
    }

    render() {
        return (
            <div>
                <SearchBar onSearchChange={this.search_onChange} />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList onVideoSelect={this.videoList_onVideoSelected} videos={this.state.videos}/>
            </div>
        );
    }

    search_onChange = (term) => {
        this.search(term);
    };

    videoList_onVideoSelected = (video) => {

        this.setState({
            selectedVideo: video
        });
    };
}

ReactDOM.render(<App />, document.querySelector('.container'));